# Розширені варіанти налаштування Linux

## Використання адаптерів з програмування JTAG

Користувачам Linux потрібно явно дозволити доступ до USB шини для адаптерів програмування JTAG.

:::note
Для Archlinux: замінить групу користувачів plugdev на групу uucp в нижченаведених командах:::

Просто запустіть `ls` в режимі `sudo` для того, щоб переконатися, що команди нижче виконаються:

```sh
sudo ls
```

Тоді з тимчасово отриманими правами `sudo` запустіть наступну команду:

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

Вашого користувача потрібно додати до групи **plugdev**:

```sh
sudo usermod -a -G plugdev $USER
```
