---
canonicalUrl: https://docs.px4.io/main/ko/flight_controller/raspberry_pi_navio2
---

# Raspberry Pi 2/3 Navio2 자동조종장치

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://emlid.com/)에 문의하십시오.
:::

:::warning
이 비행 콘트롤러에 대한 PX4는 [테스트 단계](../flight_controller/autopilot_experimental.md)입니다.
:::

Raspberry Pi 2/3 Navio2 자동조종장치의 개발 개요 문서입니다. 이를 통해 PX4를 빌드하고 Raspberry Pi로 전송하거나 빌드할 수 있습니다.

![라즈베리파이 이미지](../../assets/hardware/hardware-rpi2.jpg)


## 운영체제 이미지

[Navio 2용 Emlid RT Raspbian 이미지](https://docs.emlid.com/navio2/configuring-raspberry-pi)를 사용하십시오. 기본 이미지에는 아래 표시된 대부분의 설정이 완료되어 있습니다.

:::warning
시스템  커널을 업그레이드 하지마십시오. 업그레이드하면 필요한 HW 지원이 없는 새 커널을 설치할 수 있습니다. `ls /sys/class/pwm`으로 확인할 수 있습니다. 디렉토리가 비어 있으면 안됩니다.
:::

## 접근 설정

Raspbian 이미지에는 이미 SSH 설정이 되어있습니다. 사용자 이름은 "pi"이고, 비밀번호는 "raspberry"입니다. 네트워크를 통해 RPi2/3에 연결한 다음(이더넷은 기본적으로 DHCP와 함께 제공되도록 설정 됨) WiFi 액세스 설정을 할 수 있습니다. 이 가이드에서는 사용자 이름과 암호가 기본값으로 유지된다고 가정합니다.

RPi2/3를 설정하여 로컬 Wi-Fi에 연결하려면 [이 가이드](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)를 참고하십시오.

네트워크에서 라즈베리파이의 IP 주소를 검색한 다음, SSH를 사용하여 연결할 수 있습니다.

```sh
ssh pi@<IP-ADDRESS>
```

## 파일시스템 확장

OS를 설치후 [파일시스템을 확장](https://www.raspberrypi.org/documentation/configuration/raspi-config.md)하여 SD 카드에 전영역을 확보하십시오.

## Navio RGB 오버레이 비활성화

기존 Navio RGB 오버레이는 PX4에서 RGB Led 용으로 사용하는 GPIO를 요구합니다. `navio-rgb` 오버레이를 활성화하는 줄에 주석을 달아 `/boot/config.txt`를 편집합니다.
```
#dtoverlay=navio-rgb
```

## 호스트명 변경

네트워크에있는 다른 라즈베리파이와 충돌을 방지하려면 기본 호스트 이름을 변경하는 것이 좋습니다. 설정 예제에서는 "px4autopilot"을 사용하였습니다. SSH를 통해 라즈베리파이에 연결하고 아래의 지침을 따르십시오.

호스트명 파일을 편집합니다.

```sh
sudo nano /etc/hostname
```

`raspberry</ 0>를 원하는 호스트명으로 변경하십시오(제한된 문자가 있는 한 단어 적용).</p>

<p spaces-before="0">다음으로 호스트 파일을 변경해야합니다.</p>

<pre><code class="sh">sudo nano /etc/hosts
`</pre>
`127.0.1.1 raspberry` 항목을 `127.0.1.1 <YOURNEWHOSTNAME>`로 변경합니다.

완료후 라즈베리파이를 재부팅하여 네트워크에 다시 연결합니다.

## Avahi 설정 (Zeroconf)

라즈베리파이에 쉽게 연결하려면 호스트 이름을 직접 지정하여 모든 네트워크에서 쉽게 접근할 수 있는 Avahi(Zeroconf)를 설정하는 것이 좋습니다.

```sh
sudo apt-get install avahi-daemon
sudo insserv avahi-daemon
```
다음으로 Avahi 설정 파일을 편집합니다.

```sh
sudo nano /etc/avahi/services/multiple.service
```
다음 내용을 파일에 추가하십시오.

```xml
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
        <name replace-wildcards="yes">%h</name>
        <service>
                <type>_device-info._tcp</type>
                <port>0</port>
                <txt-record>model=RackMac</txt-record>
        </service>
        <service>
                <type>_ssh._tcp</type>
                <port>22</port>
        </service>
</service-group>

```
데몬 다시 시작합니다.

```sh
sudo /etc/init.d/avahi-daemon restart
```
이제, 완료되었습니다. 네트워크의 모든 컴퓨터에서 호스트 이름으로 라즈베리파이에 직접 접근할 수 있어야 합니다.

:::tip
검색하려면 호스트 이름에 .local을 추가해야 하는 경우도 있습니다.
:::

## SSH 공개키 설정

PX4 실행 파일을 보드에 자동으로 푸시하려면 라즈베리파이에 암호가 필요없는 접근 방법을 설정하여야합니다. 이를 위하여 공개키 인증 방법을 사용합니다.

새 SSH 키를 생성하려면 다음 명령을 입력하십시오. `<YOURNANME>@<YOURDEVICE>`에 적절한 호스트 이름을 선택하십시오.  여기서는 `pi@px4autopilot`을 사용하였습니다.

이 명령은 HOST 개발 컴퓨터에서 실행되어야합니다.

```sh
ssh-keygen -t rsa -C pi@px4autopilot
```
이 명령을 입력하면 키를 저장할 위치를 묻는 메시지가 표시됩니다. Enter를 눌러 기본 위치($HOME/.ssh/id_rsa)에 저장하는 것이 좋습니다.

이제 홈 폴더의 `.ssh` 디렉토리에 `id_rsa`와 `id_rsa.pub` 파일이 표시됩니다.

```sh
ls ~/.ssh
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```
`id_rsa` 파일은 개인키입니다. 이 파일은 개발 컴퓨터에 보관하십시오. `id_rsa.pub` 파일은 공개키입니다. 이것은 연결 대상 컴퓨터에 보관합니다.

공개키를 라즈베리파이에 복사하려면 다음 명령을 사용하여 authorized_keys 파일에 공개키를 추가하고 SSH를 통해 전송합니다.

```sh
cat ~/.ssh/id_rsa.pub | ssh pi@px4autopilot 'cat >> .ssh/authorized_keys'
```

이번에는 암호(기본적으로 "raspberry")로 인증하여야 합니다.

이제, `ssh pi@px4autopilot`을 실행하면 비밀번호 프롬프트없이 연결됩니다.

"`Agent admitted failure to sign using the key.`" 메시지가 표시되면 RSA 또는 DSA ID를 인증 에이전트 ssh-agent에 추가하고 다음 명령을 실행합니다.

```sh
ssh-add
```
그래도 작동하지 않으면, `rm ~/.ssh/id*`로 키를 삭제하고 위의 과정을 다시 진행하십시오.

## 파일 전송 테스트
SCP를 사용하여 네트워크(WiFi 또는 이더넷)를 통하여 개발 컴퓨터에서 대상 보드로 파일을 전송합니다.

설정을 테스트하려면 지금 네트워크를 통해 개발 PC에서 라즈베리파이로 파일을 푸시해보십시오. 라즈베리파이에 네트워크 접근 권한이 있는 지 확인후, SSH를 사용할 수 있습니다.

```sh
echo "Hello" > hello.txt
scp hello.txt pi@px4autopilot:/home/pi/
rm hello.txt
```
"hello.txt"파일을 라즈베리파이의 홈 폴더에 복사합니다. 파일이 실제로 복사되었는지 확인후, 다음 단계로 진행합니다.


## 코드 빌드

아래와 같이 개발 컴퓨터( "크로스 컴파일러" 빌드)에서 소스 코드를 빌드하거나, 라즈베리파이에서( "네이티브" 빌드)에서 빌드할 수 있습니다.


### 크로스 컴파일러 빌드

먼저 개발 컴퓨터에 [Ubunto 개발 환경](../dev_setup/dev_env_linux.md)을 설치하십시오.

다음을 사용하여 라즈베리파이의 IP(또는 호스트 이름)를 설정합니다.

```sh
export AUTOPILOT_HOST=192.168.X.X
```
또는
```sh
export AUTOPILOT_HOST=pi_hostname.domain
```

:::note
환경변수는 빌드전에 설정하여야합니다. 그렇지 않으면, `make upload` 과정에서 라즈베리파이 컴퓨터를 검색할 수 없습니다.
:::

실행 파일을 빌드하십시오.

```sh
cd PX4-Autopilot
make emlid_navio2 # for cross-compiler build
```

px4 실행 파일은 **build/emlid_navio2_native/** 디렉토리에 위치합니다. ssh로 라즈베리파에에 연결 가능 여부를 확인하십시오. [라즈베리파이에 접근 방법](#setting-up-access)을 참고하십시오.

다음 명령으로 업로드하십시오.

```sh
cd PX4-Autopilot
make emlid_navio2 upload # for cross-compiler build
```

그리고 SSH로 루트 계정으로 접근하여 다음 명령을 실행하십시오.

```sh
cd ~/px4
sudo ./bin/px4 -s px4.config
```

### 네이티브 빌드

네이티브 빌드는 라즈베리파이에서 실행하는 빌드입니다. 다른 옵션은 크로스 컴파일한 PX4 실행 파일를 라즈베리파이에 직접 푸시하는 것입니다.

Pi에서 아래의 명령을 실행하여 라즈베리파이에서 빌드 시스템을 설정합니다.

```sh
sudo apt-get update
sudo apt-get install cmake python-empy
```

펌웨어를 라즈베리파이에 직접 복제한 다음, 기본 대상(`emlid_navio2_native`)을 빌드합니다.

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
cd PX4-Autopilot
make emlid_navio2_native
```

px4 실행 파일은 **build/emlid_navio2_default/** 디렉토리에 위치합니다. 다음 명령어를 실행하십시오:

```sh
sudo ./build/emlid_navio2_native/px4 build/emlid_navio2_native/etc -s ./posix-configs/rpi/px4.config
```

px4를 실행한 성공적인 빌드 화면은 다음과 같습니다:

```sh

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

## 자동 실행

px4를 자동으로 시작하려면 **/etc/rc.local** 파일의 `exit 0` 앞 줄에 아래 내용을 추가합니다. 네이티브 빌드를 사용하는 경우 적절하게 변경하십시오.
```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```
