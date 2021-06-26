# 라즈베리 파이 OS 기반 파일럿파이

## 개발자 가이드

### 운영체제 이미지

항상 최신의 공식 [Raspberry Pi OS Lite](https://downloads.raspberrypi.org/raspios_lite_armhf_latest) 이미지를 사용하는 것을 권장합니다.

설치를 위히 라즈베리파이에 SSH 연결이 가능하여야 합니다.

### 접근 설정 (선택 사항)

#### 호스트명과 mDNS

mDNS 사용하면, IP 주소 대신 호스트명으로 라즈베리파이에 연결할 수 있습니다.

```sh
sudo raspi-config
```

**Network Options > Hostname**로 이동하십시오. 설정하고 종료합니다. [비밀번호 없는 인증](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)도 설정 가능합니다.

### 운영체제 설정

#### config.txt

```sh
sudo nano /boot/config.txt
```

파일을 다음의 내용으로 변경합니다.

```sh
# enable sc16is752 overlay
dtoverlay=sc16is752-spi1
# enable I2C-1 and set the frequency to 400KHz
dtparam=i2c_arm=on,i2c_arm_baudrate=400000
# enable spidev0.0
dtparam=spi=on
# enable RC input
enable_uart=1
# enable I2C-0
dtparam=i2c_vc=on
# switch Bluetooth to miniuart
dtoverlay=miniuart-bt
```

#### cmdline.txt

```sh
sudo raspi-config
```

**Interfacing Options > Serial > login shell = No > hardware = Yes**. 로그인 셸없이 UART를 활성화합니다.

```sh
sudo nano /boot/cmdline.txt
```

마지막 단어 뒤에 `isolcpus=2`를 추가합니다. 전체 파일은 다음과 같습니다.

```sh
console=tty1 root=PARTUUID=xxxxxxxx-xx rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait isolcpus=2
```

이것은 리눅스 커널이 CPU 코어 2에서 프로세스를 예약하지 않도록 지시합니다. 나중에 해당 코어에서 PX4를 수동으로 실행합니다.

재부팅하고 라즈베리파이에 SSH로 로그인합니다.

UART 인터페이스를 확인합니다.

```sh
ls /dev/tty*
```

`/dev/ttyAMA0`, `/dev/ttySC0` 및 `/dev/ttySC1` 파일이 있어야합니다.

I2C 인터페이스를 확인합니다.

```sh
ls /dev/i2c*
```

`/dev/i2c-0` 와 `/dev/i2c-1` 파일이 있어야 합니다.

SPI 인터페이스를 확인합니다.

```sh
ls /dev/spidev*
```

`/dev/spidev0.0` 파일이 있어야 합니다.

#### rc.local

In this section we will configure the auto-start script in **rc.local**.

```sh
sudo nano /etc/rc.local
```

Append below content to the file above `exit 0`:

```sh
echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/pi/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/pi/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport
```

Save and exit.

:::note
Don't forget to turn off the switch when it is not needed.
:::

#### CSI camera

:::note
Enable CSI camera will stop anything works on I2C-0.
:::

```sh
sudo raspi-config
```

**Interfacing Options > Camera**

### Building the code

To get the *very latest* version onto your computer, enter the following command into a terminal:

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
This is all you need to do just to build the latest code.
:::

#### Cross build for Raspberry Pi OS

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

or

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

Build the executable file:

```sh
cd PX4-Autopilot
make scumaker_pilotpi_default
```

Then upload it with:

```sh
make scumaker_pilotpi_default upload
```

Connect over ssh and run it with:

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

Now PX4 is started with multi-rotor configuration.

If you encountered the similar problem executing `bin/px4` on your Pi as following:

```
bin/px4: /lib/xxxx/xxxx: version `GLIBC_2.29' not found (required by bin/px4)
```

Then you should compile with docker instead.

Before proceeding to next step, clear the existing building at first:

```sh
rm -rf build/scumaker_pilotpi_default
```

### Alternative build method (using docker)

The following method can provide the same tool-sets deployed in CI.

If you are compiling for the first time with docker, please refer to the [offical docs](../test_and_ci/docker.md#prerequisites).

Execute the command in PX4-Autopilot folder:

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```

:::note
mDNS is not supported within docker. You must specify the correct IP address every time when uploading.
:::

:::note
If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too. Just remove `upload` target.
:::

It is also possible to just compile the code with command:

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

### Post-configuration

You need to check these extra items to get your vehicle work properly.

#### Mixer file

Mixer file is defined in `pilotpi_xx.conf`:

```sh
mixer load /dev/pwm_output0 etc/mixers/quad_x.main.mix
```

All available mixers are stored in `etc/mixers`. You can create one by yourself as well.

#### External compass

In the startup script(`*.config`), you will find

```sh
# external GPS & compass
gps start -d /dev/ttySC0 -i uart -p ubx -s
#hmc5883 start -X
#ist8310 start -X
```

Uncomment the correct one for your case. Not sure which compass comes up with your GPS module? Execute the following commands and see the output:

```sh
sudo apt-get update
sudo apt-get install i2c-tools
i2cdetect -y 0
```

Sample output:

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- 0e -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- 1e -- 
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
70: -- -- -- -- -- -- -- --
```

`1e` indicates a HMC5883 based compass is mounted on external I2C bus. Similarly, IST8310 has a value of `0e`.

:::note
Generally you only have one of them. Other devices will also be displayed here if they are connected to external I2C bus.(`/dev/i2c-0`)
:::
