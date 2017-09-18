# Raspberry Pi 2/3 Navio2 Autopilot

![](../../assets/hardware/hardware-rpi2.jpg)

## 개발자를 위한 바로 시작하기

### OS Image

[Emlid RT Raspbian image for Navio 2](https://docs.emlid.com/navio2/Navio-APM/configuring-raspberry-pi/) 사용합니다.
기본 이미지는 아래와 같은 셋업 절차가 이미 수행된 상태입니다.

**중요**: 시스템을 업그레이드하지 마세요.(정확히 말하면 커널 업데이트) 업그레이드를 하는 경우, 새로 설치하는 커널의 경우 필요한 하드웨어 지원이 빠진 상태로 설치될 수 있습니다.(`ls /sys/class/pwm`로 확인할 수 있는데 해당 디렉토리는 비어 있으면 안됩니다)

### 접근 셋업하기

Raspbian 이미지는 SSH 셋업을 이미 포함하고 있습니다. username은 "pi"고 password는 "raspberry"입니다. 네트워크(이더넷은 기본으로 DHCP로 설정) 상에서 RPi2/3에 연결하고 다음으로 WiFi access를 설정합니다. username과 password는 기본설정으로 되어 있다고 가정합니다.

local wifi에 접속하기 위해서 RPi2/3 셋업은 다음을 참고합니다. [this guide](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md).

여러분의 Pi의 IP 주소를 찾고 SSH를 이용해서 연결할 수 있습니다.

<div class="host-code"></div>

```sh
ssh pi@<IP-ADDRESS>
```

### 파일시스템 확장하기

OS를 설치하고 연결한 후, [expand the Filesystem](https://www.raspberrypi.org/documentation/configuration/raspi-config.md)을 하면 SD카드에서 공간을 확보하게 됩니다.

### Navio RGB Overlay 비활성화

기존 Navio RGB overlay는 RGB Led를 위해서 PX4가 사용하는 GPIO가 필요합니다.
`navio-rgb` overlay를 활성화시키기 위해서 `/boot/config.txt` 파일의 해당 라인을 코멘트처리합니다.
```
#dtoverlay=navio-rgb
```

### hostname 변경

네트워크 상에 있는 다른 RPi와 충돌을 피하기 위해서 기본 hostname을 변경하는 것을 권장합니다. 여기 설정에서는 "px4autopilot"을 사용합니다. SSH를 통해 Pi에 연결하고 아래와 같은 절차를 따라합니다.

hostname 파일 수정 :

```sh
sudo nano /etc/hostname
```

```raspberry``` 대신 여러분이 원하는 이름으로 변경합니다. (글자수가 길지 않은 한단어)

다음으로 host 파일을 변경합니다 :

```sh
sudo nano /etc/hosts
```
엔트리 ```127.0.1.1 raspberry```를 ```127.0.1.1 <YOURNEWHOSTNAME>```로 변경합니다.

이제 Pi를 reboot하면 네트워크에 새로 접속되게 됩니다.

### Avahi 셋업 (Zeroconf)

Pi에 더 쉽게 연결하기 위해서 Avahi (Zeroconf)으로 설정하는 것을 추천합니다. 직접 hostname을 지정하면 다른 네트워크에 쉽게 Pi에 접근하도록 할 수 있습니다.

```sh
sudo apt-get install avahi-daemon
sudo insserv avahi-daemon
```
다음으로 Avahi 설정 파일 수정하기

```sh
sudo nano /etc/avahi/services/multiple.service
```
파일에 다음을 추가 :

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
daemon 재시작

```sh
sudo /etc/init.d/avahi-daemon restart
```
이제 끝났습니다. 네트워크의 다른 컴퓨터에서 hostname으로 바로 Pi에 접속할 수 있게 되었습니다.


> **Tip** .local 을 hostname에 추가해야할 수도 있습니다.

### SSH Public-Key 설정

PX4 개발 환경이 자동으로 실행파일을 보드로 올리는 것을 허용하기 위해서 RPi에 패스워드 없이 사용하도록 설정해야 합니다. 이를 위해서 public-key 인증 방법을 사용합니다.

새로운 SSH key를 생성하기 위해 다음과 같은 명령을 입력합니다.(```<YOURNANME>@<YOURDEVICE>```와 같은 hostname을 선택) 여기서는 ```pi@px4autopilot```를 사용합니다.

이 명령들은 HOST 개발 컴퓨터에서 실행해야 합니다!

<div class="host-code"></div>

```sh
ssh-keygen -t rsa -C pi@px4autopilot
```
이 명령을 입력하면 key를 어디에 저장할 것인지 묻습니다. 추천하는 방법은 그냥 Enter를 입력하여 기본 위치($HOME/.ssh/id_rsa)에 저장하도록 하는 것입니다.

이제 home 폴더의 ```.ssh``` 디렉토리에 있는 ```id_rsa```와 ```id_rsa.pub``` 파일을 살펴봅시다. :

<div class="host-code"></div>

```sh
ls ~/.ssh
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```

```id_rsa``` 파일은 private key입니다. 이를 개발 컴퓨터에 저장합니다.
```id_rsa.pub``` 파일은 public key입니다. 접속하고자 하는 타겟에 저장합니다.

public key를 Raspberry Pi로 복사하기 위해서, public key를 Pi에 있는 authorized_keys 파일에 붙여는 명령은 아래와 같습니다. SSH를 이용해서 보내게 됩니다. :

<div class="host-code"></div>

```sh
cat ~/.ssh/id_rsa.pub | ssh pi@px4autopilot 'cat >> .ssh/authorized_keys'
```

이번에 password로 인증을 진행해야 합니다. (기본은 "raspberry")

이제 ```ssh pi@px4autopilot```를 하고 password 프롬프트 없이 연결되어야 합니다.

"```Agent admitted failure to sign using the key.```"라는 메시지가 나오면 인증 에이전트와 ssh 에이전트에 RSA나 DSA 식별자를 추가하기 위해서 다음 명령을 사용합니다. :

<div class="host-code"></div>

```sh
ssh-add
```
동작하지 않는 경우, ```rm ~/.ssh/id*```의 key를 삭제하고 다시 지시를 따라합니다.

### file transfer 테스팅
SCP를 사용해서 네트워크(WiFi나 이더넷) 상에서 개발 컴퓨터에서 타겟 보드로 파일을 전송합니다.

설정을 테스트하기 위해서 파일을 개발 PC에서 Pi로 전달합니다. Pi가 네트워크에 접속되어 있는지 확인하고 SSH를 사용합니다.

<div class="host-code"></div>

```sh
echo "Hello" > hello.txt
scp hello.txt pi@px4autopilot:/home/pi/
rm hello.txt
```
"hello.txt" 파일을 RPi의 home 폴더로 복사해야 합니다. 파일이 실제로 복사되었는지 확인하고 다음 단계로 넘어갑니다.

### Native builds (선택)

여러분이 원한다면 Pi에서 직접 PX4 빌드를 실행할 수 있습니다. 이를 *native* 빌드라고 합니다. 다른 옵션은 Pi를 위해서 cross-compile이 가능한 개발용 컴퓨터에서 빌드하고 PX4 실행 바이너리를 직접 Pi에 넣는 것입니다. 이를 *cross-compiler* 빌드라 부르고 진행 속도가 빠르고 사용이 쉽기 때문에 개발자에게 추천하는 방식입니다.

cross-compile 설정을 위해서 이 단계는 건너뛰어도 됩니다.

아래 단계들로 Pi에 빌드 시스템을 구축합니다. Pi에서 이 명령들을 실행해야 합니다!

```sh
sudo apt-get update
sudo apt-get install cmake python-empy
```

다음으로 Firmware을 직접 Pi에서 clone합니다.

### 코드 빌드하기

[standard build system installation](../setup/dev_env_linux.md)를 참조합니다.
