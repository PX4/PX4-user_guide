# Raspberry Pi 2/3 Navio2 자동조종장치

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://emlid.com/)에 문의하십시오.
:::

:::warning
이 비행 콘트롤러에 대한 PX4는 [테스트 단계](../flight_controller/autopilot_experimental.md)입니다.
:::

Raspberry Pi 2/3 Navio2 자동조종장치의 개발 개요 문서입니다. 이를 통해 PX4를 빌드하고 Raspberry Pi로 전송하거나 빌드할 수 있습니다.

![Ra Pi Image](../../assets/hardware/hardware-rpi2.jpg)

## 운영체제 이미지

[Navio 2용 Emlid RT Raspbian 이미지](https://docs.emlid.com/navio2/configuring-raspberry-pi)를 사용하십시오. 기본 이미지에는 아래 표시된 대부분의 설정이 완료되어 있습니다.

:::warning
시스템 커널을 업그레이드 하지마십시오. 업그레이드하면 필요한 HW 지원이 없는 새 커널을 설치할 수 있습니다. `ls /sys/class/pwm`으로 확인할 수 있습니다. 디렉토리가 비어 있으면 안됩니다.
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

    #dtoverlay=navio-rgb
    

## 호스트명 변경

네트워크에있는 다른 라즈베리파이와 충돌을 방지하려면 기본 호스트 이름을 변경하는 것이 좋습니다. 설정에 "px4 autopilot"을 사용했습니다. SSH를 통해 라즈베리파이에 연결하고 아래의 지침을 따르십시오.

호스트명 파일을 편집합니다.

```sh
sudo nano /etc/hostname
```

`raspberry</ 0>를 원하는 호스트명으로 변경하십시오(제한된 문자가 있는 한 단어 적용).</p>

<p>다음으로 호스트 파일을 변경해야합니다.</p>

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

In order to allow the PX4 development environment to automatically push executables to your board, you need to configure passwordless access to the RPi. We use the public-key authentication method for this.

To generate new SSH keys enter the following commands (Choose a sensible hostname such as `<YOURNANME>@<YOURDEVICE>`. Here we have used `pi@px4autopilot`)

These commands need to be run on the HOST development computer!

```sh
ssh-keygen -t rsa -C pi@px4autopilot
```

Upon entering this command, you'll be asked where to save the key. We suggest you save it in the default location ($HOME/.ssh/id_rsa) by just hitting Enter.

Now you should see the files `id_rsa` and `id_rsa.pub` in your `.ssh` directory in your home folder:

```sh
ls ~/.ssh
authorized_keys  id_rsa  id_rsa.pub  known_hosts
```

The `id_rsa` file is your private key. Keep this on the development computer. The `id_rsa.pub` file is your public key. This is what you put on the targets you want to connect to.

To copy your public key to your Raspberry Pi, use the following command to append the public key to your authorized_keys file on the Pi, sending it over SSH:

```sh
cat ~/.ssh/id_rsa.pub | ssh pi@px4autopilot 'cat >> .ssh/authorized_keys'
```

Note that this time you will have to authenticate with your password ("raspberry" by default).

Now try `ssh pi@px4autopilot` and you should connect without a password prompt.

If you see a message "`Agent admitted failure to sign using the key.`" then add your RSA or DSA identities to the authentication agent, ssh-agent and the execute the following command:

```sh
ssh-add
```

If this did not work, delete your keys with `rm ~/.ssh/id*` and follow the instructions again.

## Testing file transfer

We use SCP to transfer files from the development computer to the target board over a network (WiFi or Ethernet).

To test your setup, try pushing a file from the development PC to the Pi over the network now. Make sure the Pi has network access, and you can SSH into it.

```sh
echo "Hello" > hello.txt
scp hello.txt pi@px4autopilot:/home/pi/
rm hello.txt
```

This should copy over a "hello.txt" file into the home folder of your RPi. Validate that the file was indeed copied, and you can proceed to the next step.

## Building the Code

Either build the source code on your development computer ("cross-compiler" build) or build it on the RaPi ("native" build) as shown below.

### Cross-compiler Build

First install the [standard developer environment on your Ubunto development computer](../dev_setup/dev_env_linux.md).

Set the IP (or hostname) of your RPi using:

```sh
export AUTOPILOT_HOST=192.168.X.X
```

or

```sh
export AUTOPILOT_HOST=pi_hostname.domain
```

:::note
The value of the environment variable should be set before the build, or `make upload` will fail to find your RPi.
:::

Build the executable file:

```sh
cd PX4-Autopilot
make emlid_navio2 # for cross-compiler build
```

The "px4" executable file is in the directory **build/emlid_navio2_default/**. Make sure you can connect to your RPi over ssh, see [instructions how to access your RPi](#setting-up-access).

Then upload it with:

```sh
cd PX4-Autopilot
make emlid_navio2 upload # for cross-compiler build
```

Then, connect over ssh and run it with (as root):

```sh
cd ~/px4
sudo ./bin/px4 -s px4.config
```

### Native Build

A native build is one that you run directly on the Pi (the other option is to run builds on a development computer which cross-compiles for the Pi, and pushes the PX4 executable binary directly to the Pi).

Run these commands on the Pi to setup the build system on the Pi.

```sh
sudo apt-get update
sudo apt-get install cmake python-empy
```

Clone the Firmware directly onto the Pi then build the native build target (`emlid_navio2_native`).

```sh
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
cd PX4-Autopilot
make emlid_navio2_native
```

The "px4" executable file is in the directory **build/emlid_navio2_native/**. Run it directly with:

```sh
sudo ./build/emlid_navio2_native/px4 build/emlid_navio2_native/etc -s ./posix-configs/rpi/px4.config
```

A successful build followed by executing px4 will give you something like this:

```sh
<br />______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

## Autostart

To autostart px4, add the following to the file **/etc/rc.local** (adjust it accordingly if you use native build), right before the `exit 0` line:

```sh
cd /home/pi && ./bin/px4 -d -s px4.config > px4.log
```