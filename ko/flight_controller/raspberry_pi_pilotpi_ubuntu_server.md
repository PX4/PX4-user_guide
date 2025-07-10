---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/raspberry_pi_pilotpi_ubuntu_server
---

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

이 섹션에서는 **rc.local** 자동 시작 스크립트를 설정합니다. 이 파일은 Ubuntu OS에 설치시에는 존재하지 않으므로, 생성하여야합니다.



```sh
sudo nano /etc/rc.local
```


아래 내용을 파일에 추가하십시오.



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


저장후 종료합니다. 그런 다음 권한을 설정하십시오.



```sh
sudo chmod +x /etc/rc.local
```


:::note
필요 없는 경우에는 전원 스위치를 꺼는 것을 잊지 마십시오!
:::



#### CSI 카메라

:::warning
Enable CSI 카메라는 I2C-0에서 작동하는 모든 것을 중지합니다.
:::



```sh
sudo nano /boot/firmware/usercfg.txt
```


파일 끝에 다음 내용을 추가합니다.



```sh
start_x=1
```




### 코드 빌드

터미널에 다음 명령을 실행하여 *최신* 버전의 소스를 복제하십시오.



```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
```


:::note
최신 코드를 빌드하는 과정입니다.
:::



#### 라즈베리파이 업로드 대상 설정

다음을 사용하여 라즈베리파이의 IP(또는 호스트 이름)를 설정합니다.



```sh
export AUTOPILOT_HOST=192.168.X.X
```


또는



```sh
export AUTOPILOT_HOST=pi_hostname.local
```


사용자 이름을 설정하여야 합니다.



```sh
export AUTOPILOT_USER=ubuntu
```




#### armhf 타겟용 빌드

실행 파일을 빌드하십시오.



```sh
cd Firmware
make scumaker_pilotpi_default
```


다음 명령으로 업로드하십시오:



```sh
make scumaker_pilotpi_default upload
```




#### armhf용 대체 빌드 방법 (도커 사용)

docker로 처음 컴파일하는 경우에는 [공식 문서](../test_and_ci/docker.md#prerequisites)를 참조하십시오.

firmware 폴더에서 다음 명령을 실행합니다.



```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_default upload"
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




#### arm64 타겟용 빌드

:::note
이 단계에서는 `aarch64-linux-gnu` 도구 체인을 설치하여야 합니다.
:::

실행 파일을 빌드하십시오.



```sh
cd PX4-Autopilot
make scumaker_pilotpi_arm64
```


다음 명령으로 업로드하십시오:



```sh
make scumaker_pilotpi_arm64 upload
```




#### arm64용 대체 빌드 방법 (도커 사용)

docker로 처음 컴파일하는 경우에는 [공식 문서](../test_and_ci/docker.md#prerequisites)를 참조하십시오.

`PX4-Autopilot` 폴더에서 다음 명령을 실행합니다.



```sh
./Tools/docker_run.sh "export AUTOPILOT_HOST=192.168.X.X; export AUTOPILOT_USER=ubuntu; export NO_NINJA_BUILD=1; make scumaker_pilotpi_arm64 upload"
```


:::note
mDNS는 docker에서 지원하지 않습니다. 업로드시 마다 IP 주소를 설정하여야 합니다.
:::

:::note IDE가 ninja 빌드를 지원하지 않는 경우 `NO_NINJA_BUILD = 1` 옵션을 사용하십시오. `upload` 대상을 제거하면, 업로드하지 않고도 컴파일할 수 있습니다.
:::

다음 명령으로 코드를 컴파일합니다.



```sh
./Tools/docker_run.sh "make scumaker_pilotpi_arm64"
```




#### 수동 PX4 실행

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
rm -rf build/scumaker_pilotpi_*
```


그런 다음 위의 해당 부분에서 계속 진행합니다.



### 사후 설정

[여기](raspberry_pi_pilotpi_rpios.md)의 지침을 참조하십시오.
