---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/raspberry_pi_pilotpi_rpios
---

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

이 섹션에서는 **rc.local** 자동 시작 스크립트를 설정합니다.

```sh
sudo nano /etc/rc.local
```

`exit 0` 줄 위에 아래 내용을 추가합니다.

```sh
echo "25" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio25/direction
if [ $(cat /sys/class/gpio/gpio25/value) -eq 1 ] ; then
        echo "Launching PX4"
        cd /home/pi/px4 ; nohup taskset -c 2 ./bin/px4 -d -s pilotpi_mc.config 2 &> 1 > /home/pi/px4/px4.log &
fi
echo "25" > /sys/class/gpio/unexport
```

저장후 종료합니다.

:::note
필요 없는 경우에는 스위치를 꺼는 것을 잊지 마십시오.
:::

#### CSI 카메라

:::note
Enable CSI 카메라는 I2C-0에서 작동하는 모든 것을 중지합니다.
:::

```sh
sudo raspi-config
```

**Interfacing Options > Camera**

### 코드 빌드

터미널에 다음 명령을 실행하여 *최신* 버전의 소스를 복제하십시오.

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```

:::note
최신 코드를 빌드하는 과정입니다. 
:::

#### Raspberry Pi OS용 크로스 빌드

다음을 사용하여 라즈베리파이의 IP(또는 호스트 이름)를 설정합니다.

```sh
export AUTOPILOT_HOST=192.168.X.X
```

또는

```sh
export AUTOPILOT_HOST=pi_hostname.local
```

실행 파일을 빌드하십시오.

```sh
cd PX4-Autopilot
make scumaker_pilotpi_default
```

다음 명령으로 업로드하십시오.

```sh
make scumaker_pilotpi_default upload
```

ssh에서 다음을 명령어를 실행하십시오.

```sh
cd px4
sudo taskset -c 2 ./bin/px4 -s pilotpi_mc.config
```

이제 PX4는 다중로터 설정으로 시작합니다.

라즈베리파이에서 `bin/px4`를 실행시 다음과 같은 유사한 문제가 발생한 경우:

```
bin/px4: /lib/xxxx/xxxx: version `GLIBC_2.29' not found (required by bin/px4)
```

docker로 컴파일하여야 합니다.

다음 단계로 진행하기 전에 먼저 기존 빌드를 삭제합니다.

```sh
rm -rf build/scumaker_pilotpi_default
```

### 대체 빌드 방법 (도커 사용)

다음 방법은 CI에 배포된 동일한 도구 세트를 제공할 수 있습니다.

If you are compiling for the first time with docker, please refer to the [official docs](../test_and_ci/docker.md#prerequisites).

PX4-Autopilot 폴더에서 다음 명령을 실행합니다.

```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
```

:::note
mDNS는 docker에서 지원하지 않습니다. 업로드시에 올바른 IP 주소를 설정하여야합니다.
:::

:::note IDE가 ninja 빌드를 지원하지 않는 경우 `NO_NINJA_BUILD = 1` 옵션을 사용하십시오. 업로드하지 않고도 컴파일할 수 있습니다. `upload` 대상을 제거하십시오.
:::

다음 명령으로 코드를 컴파일합니다.

```sh
./Tools/docker_run.sh "make scumaker_pilotpi_default"
```

### 사후 설정

기체가 제대로 작동하려면 이러한 추가 항목을 확인하여야 합니다.

#### 믹서 파일

믹서 파일은 `pilotpi_xx.conf`에 정의되어 있습니다.

```sh
mixer load /dev/pwm_output0 etc/mixers/quad_x.main.mix
```

사용 가능한 모든 믹서는 `etc/mixers`에 저장됩니다. 직접 만들 수도 있습니다.

#### 외부 나침반

시작 스크립트(`*. config`)에서 다음을 찾을 수 있습니다.

```sh
# external GPS & compass
gps start -d /dev/ttySC0 -i uart -p ubx -s
#hmc5883 start -X
#ist8310 start -X
```

사용자의 환경에 맞추어 주석을 적절하게 제거하십시오. GPS 모듈과 함께 제공되는 나침반이 확실하지 않습니까? 다음 명령을 실행하고 출력을 확인합니다.

```sh
sudo apt-get update
sudo apt-get install i2c-tools
i2cdetect -y 0
```

샘플 출력:

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

`1e`는 HMC5883 기반 나침반이 외부 I2C 버스에 장착되어 있음을 나타냅니다. 마찬가지로, IST8310의 값은 `0e`입니다.

:::note
일반적으로 그중 하나에 나타납니다. 외부 I2C 버스에 연결된 경우 다른 장치도 여기에 같이 표시됩니다. (`/dev/i2c-0`)
:::
