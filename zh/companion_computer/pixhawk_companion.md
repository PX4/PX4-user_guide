# Pixhawk系列的配套计算机

Pixhawk与配套计算机(Raspberry Pi，Odroid，Tegra K1) 的交互方式只有一种：通过串口2 `TELEM 2`。 消息格式是MAVLINK。

## Pixhawk设置

在 任何 [可配置的串口 ](https://docs.px4.io/en/peripherals/serial_configuration.html)上使能MAVLink消息。

> **Tip** `TELEM 2` 一般用作与配套计算机通信。

要在`TELEM 2` 上配置默认的配套计算机消息流，请设置以下参数：
* [MAV_1_CONFIG](../advanced/parameter_reference.md#MAV_1_CONFIG) = `TELEM 2` (`MAV_1_CONFIG`总是配置为 `TELEM 2` 端口)
* [MAV_1_MODE](../advanced/parameter_reference.md#MAV_1_MODE) = `Onboard`
* [SER_TEL2_BAUD](../advanced/parameter_reference.md#SER_TEL2_BAUD) = `921600`（建议在像日志流或FastRTPS之类的应用，使用 921600 或更高）

更多信息，请参考 [MAVLink Peripherals (GCS/OSD/Companion)](https://docs.px4.io/en/peripherals/mavlink_peripherals.html)。


## 配套计算机设置

为了接收 mavlink消息, 配套计算机需要运行一些与串行端口对话的软件。 最常见的选择有:

  * [MAVROS](../ros/mavros_installation.md) 与ros 节点通信
  * C/C++ example code </0> 连接自定义代码
  * [MAVLink Router](https://github.com/intel/mavlink-router) (recommended) or [MAVProxy](http://mavproxy.org) to route MAVLink between serial and UDP

## 硬件设置

按照以下说明连接串行端口。 所有 pixhawk 串行端口都以 3.3 v 电平工作，同时与5v 电平兼容。

> **Warning** 许多现代配套计算机在其硬件 UART 上只支持 1.8 V 级别，3.3 V 电平可能会损坏配套计算机。 推荐使用一个电平转换器。 在大多数情况下， 可访问的硬件串行端口已经具有与之关联的一些功能 (调制解调器或控制台)，并且需要在 linux*重新配置*， 然后才能使用它们。

安全的选择是使用 ftdi 芯片 usb 到串行适配器板和下面的接线方式。 这种方式有效且容易设置。

|  | TELEM2 |           | FTDI |                    |
|  | ------ | --------- | ---- | ------------------ |
|  | 1      | + 5v (红色) |      | 请勿连接！              |
|  | 2      | Tx (输出)   | 5    | FTDI RX (黄色) (输入)  |
|  | 3      | Rx（输入）    | 4    | FTDI TX (橙色) (输出)  |
|  | 4      | CTS（输入）   | 6    | FTDI RTS (绿色) (输出) |
|  | 5      | RTS（输出）   | 2    | FTDI RTS (棕色) (输出) |
|  | 6      | GND       | 1    | FTDI GND (黑色)      |

## Linux系统上的软件设置

在 linux 上, usb ftdi 的默认名称将类似于 `\dev\ttyUSB0`。 如果您在 usb 或 arduino 上连接了第二个 ftdi, 它将注册为 `\dev\ttyUSB1`。 为了避免第一次插入和第二个插头之间的混淆, 我们建议您创建一个从 `ttyUSBx` 到友好名称的符号链接, 具体取决于 usb 设备的供应商和产品 ID。

使用 `lsusb`指令，我们可以获得供应商和产品 ID。

```sh
$lsusb
    总线006 设备002：ID 0BDA:8153 Realtek 半导体公司
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

Arduino 是 `Bus 003 Device 004: ID 2341:0042 Arduino SA Mega 2560 R3 (CDC ACM)`

Pixhawk 是 `Bus 003 Device 005: ID 26ac:0011`

> **Note** 如果你没找到你是设备，拔掉，执行 `lsusb`，再插上， 再次执行`lsusb`，查看增加的设备。

最终，我们可以在文件中创建一个新的UDEV规则，文件名是`/etc/udev/rules.d/99-pixhawk.rules` 。 文件能把idVendor和idProduct改成你的。

```sh
SUBSYSTEM=="tty", ATTRS{idVendor}=="2341", ATTRS{idProduct}=="0042", SYMLINK+="ttyArduino"
    SUBSYSTEM=="tty", ATTRS{idVendor}=="26ac", ATTRS{idProduct}=="0011", SYMLINK+="ttyPixhawk"
```

最后, 在 **reboot** 后, 您可以确定您的设备名, 并将 `/dev/ttyPixhawk`替换掉在脚本中的 `/dev/ttyUSB0`。

> **Note** 请务必通过 `usermod` 将自己添加到 `tty`和`dialout` 组, 以避免必须以 root 身份执行脚本。

```sh
usermod -a -G tty ros-user
    usermod -a -G dialout ros-user
```
