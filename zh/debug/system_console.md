# PX4 系统控制台

The system console allows low-level access to the system, debug output and analysis of the system boot process. The most convenient way to connect it is by using a [Dronecode probe](https://shop.titaneliteinc.com/index.php?route=product/product&product_id=1294), but a plain FTDI cable can be used as well.

> **Tip** The console should be used for debugging if the system won't boot. The [MAVLink Shell](../debug/mavlink_shell.md) may otherwise be more suitable, as it is much easier to set up and can be used for [many of the same tasks](../debug/consoles.md#console_vs_shell).


## System Console vs. Shells

The console is made available through a (board-specific) UART that can be connected to a computer USB port using a [3.3V FTDI](https://www.digikey.com/product-detail/en/TTL-232R-3V3/768-1015-ND/1836393) cable. This allows the console to be accessed using a terminal application.

Pixhawk controller manufacturers are expected to expose the console UART and SWD (JTAG) debug interfaces through a dedicated *debug port* that complies with the [Pixhawk Connector Standard](#pixhawk_debug_port). Unfortunately some boards predate this standard or a non-compliant.

> **Tip** Developers targeting a number of different boards may wish to use a *debug adapter* to simplify connecting multiple boards. For example, the [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation) comes with connectors for the [Pixhawk Debug Port](#pixhawk_debug_port) and several other boards.

There can be several shells, either running on a dedicated UART, or via MAVLink. Since MAVLink provides more flexibility, the shell is nowadays only used [via MAVLink](#mavlink_shell).


### Connecting via Dronecode Probe

The developer kit comes with a breakout board with three pins to access the console. Connect the bundled FTDI cable to the header and the breakout board to the expansion connector.
- [3DR Pixhawk v1 Flight Controller](../flight_controller/pixhawk.md#console-port) (also applies to [mRo Pixhawk](../flight_controller/mro_pixhawk.md#debug-ports), [Holybro pix32](../flight_controller/holybro_pix32.md#debug-port))
- [Pixhawk 1/2](../flight_controller/pixhawk3_pro.md#debug-port)
- [Pixracer](../flight_controller/pixracer.md#debug-port)

- [Snapdragon Flight](../flight_controller/snapdragon_flight.md):
  - [FTDI](../flight_controller/snapdragon_flight_advanced.md#over-ftdi)
  - [Console Debug](../flight_controller/snapdragon_flight_advanced.md#dsp-debug-monitorconsole)

<a id="pixhawk_debug_port"></a>

### Connecting via FTDI 3.3V Cable

Connect the 6-pos JST SH 1:1 cable to the Dronecode probe or connect the individual pins of the cable to a FTDI cable like this:

The system console can be accessed through the Dronecode probe or an FTDI cable. Both options are explained in the section below.

| Pixracer / Pixhawk v3 | -         | FTDI | -             |
| --------------------- | --------- | ---- | ------------- |
| 2                     | + 5v (红色) |      | N/C           |
| 2                     | UART7 Tx  | 5    | FTDI RX （黄色）  |
| 3                     | UART7 Rx  | 4    | FTDI TX （橙色）  |
| 4（黑）                  | SWDIO     |      | N/C           |
| 6                     | SWCLK     |      | N/C           |
| 6                     | GND       | 1    | FTDI GND (黑色) |

## 打开控制台

连接控制台连接后，请使用您选择的默认串口工具或下面描述的默认工具：

### Linux / Mac OS: Screen

在 Ubuntu 上安装 screen （mac os 已经安装了它）：

```bash
sudo apt-get install screen
```

* 串口：pixhawk v1/pixracer 使用 57600 波特率
* 串口：骁龙飞控使用115200波特率

将 Screen 的波特率、8个数据位、1个停止位设置好，连接到正确的串行端口（使用 `ls/dev/tty*`，并观察拔下/复制 usb 设备时发生的变化）。 Connect screen at BAUDRATE baud, 8 data bits, 1 stop bit to the right serial port (use `ls /dev/tty*` and watch what changes when unplugging / replugging the USB device). Common names are `/dev/ttyUSB0` and `/dev/ttyACM0` for Linux and `/dev/tty.usbserial-ABCBD` for Mac OS.

```bash
screen /dev/ttyXXX BAUDRATE 8N1
```

### Windows: PuTTY

下载 [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) 并启动它。

然后选择 "串行连接", 并将端口参数设置为:

* 57600 波特率
* 8 数据位
* 1 个停止位
