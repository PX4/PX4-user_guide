# Використання комп'ютера-компаньйона з контролерами Pixhawk

PX4, що працює на контролерах польоту серії Pixhawk, може підключатися до супутнього комп'ютера за допомогою будь-якого вільного конфігурованого послідовного порту, включаючи Ethernet-порт (якщо підтримується).

See [Companion Computers](../companion_computer/index.md) for information about supported hardware and general setup.

## Програмне забезпечення супутнього комп'ютера

На супутньому комп'ютері має бути встановлене програмне забезпечення, яке зв'язується з диспетчером польоту і спрямовує трафік на наземні станції та в хмару.

Common options are listed in [Companion Computers > Companion Computer Setup](../companion_computer/index.md#companion-computer-software).

## Налаштування Ethernet

Ethernet - рекомендоване з'єднання, якщо воно підтримується вашим польотним контролером.
See [Ethernet Setup](../advanced_config/ethernet_setup.md) for instructions.

## Налаштування послідовного порту

Ці інструкції пояснюють, як налаштувати з'єднання, якщо ви не використовуєте Ethernet.

### Конфігурація Pixhawk

PX4 expects companion computers to connect via `TELEM2` for offboard control.
Порт конфігурується за замовчуванням для інтерфейсу за допомогою MAVLink.

Якщо використовується MAVLink, іншої конфігурації з боку PX4 не потрібно.
To use MAVLink on another port, and/or disable it on `TELEM2`, see [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md) and [Serial Port Configuration](../peripherals/serial_configuration.md).

To use [ROS 2/uXRCE-DDS](../ros2/user_guide.md) instead of MAVLink on `TELEM2`, disable MAVLink on the port and then enable the uXRCE-DDS client on `TELEM2`(see [uXRCE-DDS > Starting the client](../middleware/uxrce_dds.md#starting-the-client)).

### Налаштування апаратної частини послідовного порту

Якщо ви підключаєтеся за допомогою послідовного порту, підключіть порт згідно з інструкціями нижче.
Всі послідовні порти Pixhawk працюють на напрузі 3,3 В і сумісні з рівнем 5 В.

:::warning
Many modern companion computers only support 1.8V levels on their hardware UART and can be damaged by 3.3V levels.
Використовуйте рівні перетворювачі.
In most cases the accessible hardware serial ports already have some function (modem or console) associated with them and need to be _reconfigured in Linux_ before they can be used.
:::

A safe and easy to set up option is to use an FTDI Chip USB-to-serial adapter board to connect from `TELEM2` on the Pixhawk to the USB port on the companion computer.
The `TELEM2` to FTDI wiring map is shown below.

| TELEM2 |                                | FTDI | &amp;nbsp;                               |
| ------ | ------------------------------ | ---- | ------------------------------------------------------------ |
| 1      | +5V (red)   |      | DO NOT CONNECT!                                              |
| 2      | Tx (out)    | 5    | FTDI RX (yellow) (in)  |
| 3      | Rx (in)     | 4    | FTDI TX (orange) (out) |
| 4      | CTS (вхід)  | 6    | FTDI RTS (green) (out) |
| 5      | RTS (вивід) | 2    | FTDI CTS (brown) (in)  |
| 6      | GND                            | 1    | FTDI GND (black)                          |

You may also be able to directly connect `TELEM2` directly to a companion computer serial port.
This is demonstrated for the Raspberry Pi in [Raspberry Pi Companion with Pixhawk](../companion_computer/pixhawk_rpi.md).

### Налаштування програмного забезпечення для USB-послідовного порту на Linux

On Linux the default name of a USB FTDI would be like `\dev\ttyUSB0`.
If you have a second FTDI linked on the USB or an Arduino, it will registered as `\dev\ttyUSB1`.
To avoid the confusion between the first plugged and the second plugged, we recommend you to create a symlink from `ttyUSBx` to a friendly name, depending on the Vendor and Product ID of the USB device.

Using `lsusb` we can get the vendor and product IDs.

```sh
$ lsusb

Bus 006 Device 002: ID 0bda:8153 Realtek Semiconductor Corp.
Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 002: ID 05e3:0616 Genesys Logic, Inc.
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)
Bus 003 Device 005: ID 26ac:0011
Bus 003 Device 002: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 001 Device 002: ID 0bda:8176 Realtek Semiconductor Corp. RTL8188CUS 802.11n WLAN Adapter
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

The Arduino is `Bus 003 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)`

The Pixhawk is `Bus 003 Device 005: ID 26ac:0011`

:::info
If you do not find your device, unplug it, execute `lsusb`, plug it, execute `lsusb` again and see the added device.
:::

Therefore, we can create a new UDEV rule in a file called `/etc/udev/rules.d/99-pixhawk.rules` with the following content, changing the idVendor and idProduct to yours.

```sh
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0042", SYMLINK+="ttyArduino"
SUBSYSTEM=="tty", ATTRS{idVendor}=="26ac", ATTRS{idProduct}=="0011", SYMLINK+="ttyPixhawk"
```

Finally, after a **reboot** you can be sure to know which device is what and put `/dev/ttyPixhawk` instead of `/dev/ttyUSB0` in your scripts.

:::info
Be sure to add yourself in the `tty` and `dialout` groups via `usermod` to avoid to have to execute scripts as root.
:::

```sh
usermod -a -G tty ros-user
usermod -a -G dialout ros-user
```
