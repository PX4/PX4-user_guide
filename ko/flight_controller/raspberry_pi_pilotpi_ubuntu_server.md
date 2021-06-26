# 우분투 서버 기반 파일럿파이

:::warning
라즈베리파이 4B의 우분투 서버는 많은 전류를 소비하고 많은 열을 발생합니다. 이 하드웨어를 사용시에는 고열 방출과 고전력 소비 환경을 고려하여 설계되었습니다.
:::

## 개발자 가이드

### 운영체제 이미지

armhf와 arm64 arch가 모두 지원됩니다.

#### armhf

- [Ubuntu Server 18.04.5 for RPi2](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi2.img.xz)
- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi3.img.xz.zsync)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-armhf+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 2/3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img.xz)

#### arm64

- [Ubuntu Server 18.04.5 for RPi3](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi3.img.xz)
- [Ubuntu Server 18.04.5 for RPi4](https://cdimage.ubuntu.com/releases/18.04.5/release/ubuntu-18.04.5-preinstalled-server-arm64+raspi4.img.xz)
- [Ubuntu Server 20.04.1 for RPi 3/4](https://cdimage.ubuntu.com/releases/20.04.1/release/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img.xz)

#### 최신 운영체제

새로운 업데이트 버전은 공식 [cdimage](https://cdimage.ubuntu.com/releases/) 페이지를 참조하십시오.

### 최초 부팅

라즈베리파이의 WiFi를 처음 설정시 홈 라우터와 라즈벡리파이, 모니터와 키보드 사이에 유선 이더넷 연결을 사용하는 것이 편리합니다.

#### 부팅전 과정

SD 카드를 컴퓨터에 장착하고 네트워크 설정을 수정합니다.

공식 가이드</ 0>를 참고하십시오.</p> 

이제 SD 카드를 라즈베리파이에 삽입하고, 처음으로 부팅하십시오. 유선 이더넷을 통한 SSH 연결하거나 또는 키보드 및 모니터를 통하여 라즈베리파이 쉘 액세스 권한을 확인하십시오.



#### WiFi 지역

먼저 필요한 패키지를 설치하십시오.



```sh
sudo apt-get install crda
```


`/etc/default/crda` 파일을 편집하여 WiFi 지역을 설정하십시오. [참고 목록](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm)



```sh
sudo nano /etc/default/crda
```


라즈베리파이는 재부팅후 WiFi 네트워크에 연결할 수 있습니다.



#### 호스트명과 mDNS

먼저 호스트 이름을 설정합니다.



```sh
sudo nano /etc/hostname
```


호스트 이름을 적절하게 변경하십시오. 그런 다음 mDNS에 필요한 패키지를 설치합니다.



```sh
sudo apt-get update
sudo apt-get install avahi-daemon
```


재부팅합니다.



```sh
sudo reboot
```


위의 작업 후 WiFi 접근성을 회복하십시오.



```sh
ssh ubuntu@pi_hostname.local
```




#### 무 비밀번호 인증 (선택 사항)

[비밀번호 없는 인증](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)도 설정 가능합니다. 



### 운영체제 설정



#### config.txt

우분투의 해당 파일은 `/boot/firmware/usercfg.txt` 입니다.



```sh
sudo nano /boot/firmware/usercfg.txt
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

우분투 서버 20.04 에서:



```sh
sudo nano /boot/firmware/cmdline.txt
```


우분투 서버 18.04 이전 버전에서는 `nobtcmd.txt`와 `btcmd.txt`를 모두 수정하여야 합니다.



```sh
sudo nano /boot/firmware/nobtcmd.txt
```


`console=/dev/ttyAMA0,115200`을 찾아 제거하여, 직렬 인터페이스에서 로그인 쉘을 비활성화합니다.

마지막 단어 뒤에 `isolcpus=2`를 추가합니다. 그러면 전체 파일이 다음과 같이 표시됩니다.



```sh
net.ifnames=0 dwc_otg.lpm_enable=0 console=tty1 root=LABEL=writable rootfstype=ext4 elevator=deadline rootwait fixrtc isolcpus=2
```


위의 줄은 Linux 커널이 CPU 코어 2에서 프로세스를 예약하지 않음을 나타냅니다. 나중에 해당 코어에서 PX4를 수동으로 실행합니다.

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

이 섹션에서는 **rc.local** 자동 시작 스크립트를 설정합니다. 이 파일은 새로운 Ubuntu OS에 없기 때문에 생성하여야합니다.



```sh
sudo nano /etc/rc.local
```


Append the content below to the file:



```sh
#!/bin/sh

echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/ubuntu/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/ubuntu/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport

exit 0
```


Save and exit. Then set the correct permissions:



```sh
sudo chmod +x /etc/rc.local
```


:::note
Don't forget to turn off the switch when it is not needed!
:::



#### CSI camera

:::warning
Enable CSI camera will stop anything works on I2C-0.
:::



```sh
sudo nano /boot/firmware/usercfg.txt
```


Append the following line at the end of file:



```sh
start_x=1
```




### Building the code

To get the *very latest* version onto your computer, enter the following command into a terminal:



```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```


:::note
This is all you need to do just to build the latest code.
:::



#### Set RPi upload target

Set the IP (or hostname) of your RPi using:



```sh
export AUTOPILOT_HOST=192.168.X.X
```


or



```sh
export AUTOPILOT_HOST=pi_hostname.local
```


Additionally, we need to set the username:



```sh
export AUTOPILOT_USER=ubuntu
```




#### Build for armhf target

Build the executable file:



```sh
cd Firmware
make scumaker_pilotpi_default
```


Then upload it with:



```sh
make scumaker_pilotpi_default upload
```




#### Alternative build method for armhf (using docker)

If you are compiling for the first time with docker, please refer to the [offical docs](../test_and_ci/docker.md#prerequisites).

Execute the command in firmware folder:



```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
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




#### Build for arm64 target

:::note
This step requires `aarch64-linux-gnu` tool-chain to be installed.
:::

Build the executable file:



```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```


Then upload it with:



```sh
make scumaker_pilotpi_arm64 upload
```




#### Alternative build method for arm64 (using docker)

If you are compiling for the first time with docker, please refer to the [offical docs](../test_and_ci/docker.md#prerequisites).

Execute the command in `PX4-Autopilot` folder:



```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```


:::note
mDNS is not supported within docker. You must specify the correct IP address everytime when uploading.
:::

:::note
If your IDE doesn't support ninja build, `NO_NINJA_BUILD=1` option will help. You can compile without uploading too - just remove the `upload` target.
:::

It is also possible to just compile the code with command:



```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```




#### Manually run PX4

Connect over SSH and run it with:



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
rm -rf build/scumaker_pilotpi_*
```


Then go back to the corresponding chapter above.



### Post-configuration

Please refer to the instructions [here](raspberry_pi_pilotpi_rpios.md)
