---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_advanced_linux
---

# 고급 Linux 사용 사례

## JTAG 프로그래밍 어댑터 사용

Linux 사용자는 JTAG 프로그래밍 어댑터용 USB 버스에 대한 액세스를 허용하여야 합니다.

:::note
Archlinux의 경우: 다음 명령에서 그룹 plugdev를 uucp로 변경합니다.
:::

`sudo` 모드에서 간단한 `ls`를 실행하여, 아래 명령이 실행되는 지 확인합니다.

```sh
sudo ls
```

그런 다음 `sudo` 권한을 일시적으로 부여한 후에, 다음 명령을 실행합니다.

```sh
cat > $HOME/rule.tmp <<_EOF
# All 3D Robotics (includes PX4) devices
SUBSYSTEM=="usb", ATTR{idVendor}=="26AC", GROUP="plugdev"
# FTDI (and Black Magic Probe) Devices
SUBSYSTEM=="usb", ATTR{idVendor}=="0483", GROUP="plugdev"
# Olimex Devices
SUBSYSTEM=="usb",  ATTR{idVendor}=="15ba", GROUP="plugdev"
_EOF
sudo mv $HOME/rule.tmp /etc/udev/rules.d/10-px4.rules
sudo /etc/init.d/udev restart
```

사용자를 **plugdev** 그룹에 추가하여야 합니다.

```sh
sudo usermod -a -G plugdev $USER
```
