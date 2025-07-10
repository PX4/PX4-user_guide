---
canonicalUrl: https://docs.px4.io/main/en/companion_computer/pixhawk_companion
---

# Companion Computer for Pixhawk Series

Interfacing a companion computer (Raspberry Pi, Odroid, Tegra K1) to Pixhawk-family boards always works the same way: They are interfaced using a serial port to `TELEM 2`, the port intended for this purpose.
The message format on this link is [MAVLink](https://mavlink.io/en/).

## Pixhawk Setup

Enable MAVLink on any [configurable serial port](../peripherals/serial_configuration.md).

:::tip
Typically the `TELEM 2` port is used for a companion computer.
:::

To set up the default companion computer message stream on `TELEM 2`, set the following parameters:
* [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = `TELEM 2` (`MAV_1_CONFIG` is often used to map the `TELEM 2` port)
* [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = `Onboard`
* [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600` (921600 or higher recommended for applications like log streaming or FastRTPS)

For more information see [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md).


## Companion Computer Setup

In order to receive MAVLink, the companion computer needs to run some software talking to the serial port. 
The most common options are:

  * [MAVROS](../ros/mavros_installation.md) to communicate to ROS nodes
  * [C/C++ example code](https://github.com/mavlink/c_uart_interface_example) to connect custom code
  * [MAVLink Router](https://github.com/intel/mavlink-router) (recommended) or [MAVProxy](https://ardupilot.org/mavproxy/) to route MAVLink between serial and UDP

## Hardware setup

Wire the serial port according to the instructions below. All Pixhawk serial ports operate at 3.3V and are 5V level compatible.

:::warning
Many modern companion computers only support 1.8V levels on their hardware UART and can be damaged by 3.3V levels.
Use a level shifter.
In most cases the accessible hardware serial ports already have some function (modem or console) associated with them and need to be *reconfigured in Linux* before they can be used.
:::

The safe bet is to use an FTDI Chip USB-to-serial adapter board and the wiring below. This always works and is easy to set up.

TELEM2 | | FTDI | &nbsp 
--- | --- | --- | ---
1 | +5V (red)| | DO NOT CONNECT!
2 | Tx  (out)| 5 | FTDI RX (yellow) (in)
3 | Rx  (in) | 4 | FTDI TX (orange) (out)
4 | CTS (in) | 6 | FTDI RTS (green) (out)
5 | RTS (out)| 2 | FTDI CTS (brown) (in)
6 | GND     | 1 | FTDI GND (black)

## Software setup on Linux

On Linux the default name of a USB FTDI would be like `\dev\ttyUSB0`. If you have a second FTDI linked on the USB or an Arduino, it will registered as `\dev\ttyUSB1`. To avoid the confusion between the first plugged and the second plugged, we recommend you to create a symlink from `ttyUSBx` to a friendly name, depending on the Vendor and Product ID of the USB device. 

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

:::note
If you do not find your device, unplug it, execute `lsusb`, plug it, execute `lsusb` again and see the added device.
:::

Therefore, we can create a new UDEV rule in a file called `/etc/udev/rules.d/99-pixhawk.rules` with the following content, changing the idVendor and idProduct to yours.

```sh
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0042", SYMLINK+="ttyArduino"
SUBSYSTEM=="tty", ATTRS{idVendor}=="26ac", ATTRS{idProduct}=="0011", SYMLINK+="ttyPixhawk"
```

Finally, after a **reboot** you can be sure to know which device is what and put `/dev/ttyPixhawk` instead of `/dev/ttyUSB0` in your scripts.

:::note
Be sure to add yourself in the `tty` and `dialout` groups via `usermod` to avoid to have to execute scripts as root.
:::

```sh
usermod -a -G tty ros-user
usermod -a -G dialout ros-user
```
