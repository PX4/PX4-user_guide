# Pixhawk 3 Pro

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](https://store-drotek.com/)。

The Pixhawk<sup>&reg;</sup> 3 Pro is based on the FMUv4 hardware design (Pixracer) with some upgrades and additional features. The board was designed by [Drotek<sup>&reg;</sup>](https://drotek.com) and PX4.

![Pixhawk 3 Pro hero image](../../assets/hardware/hardware-pixhawk3_pro.jpg)

> **Note** The main hardware documentation is here: https://drotek.gitbook.io/pixhawk-3-pro/hardware

<span></span>

> **Tip** This autopilot is [supported](../flight_controller/autopilot_pixhawk_standard.md) by the PX4 maintenance and test teams.

## 总览

- Microcontroller: **STM32F469**; Flash size is **2MiB**, RAM size is **384KiB**
- **ICM-20608-G** gyro / accelerometer
- **MPU-9250** gyro / accelerometer / magnetometer
- **LIS3MDL** compass
- Sensors connected via two SPI buses (one high rate and one low-noise bus)
- Two I2C buses
- Two CAN buses
- Voltage / battery readings from two power modules
- FrSky<sup>&reg;</sup> Inverter
- 8 Main + 6 AUX PWM outputs (Separate IO chip, PX4IO)
- microSD (logging)
- S.BUS / Spektrum / SUMD / PPM input
- JST GH user-friendly connectors: same connectors and pinouts as Pixracer

## Where to buy

From [Drotek store](https://store.drotek.com/) (EU) :

- [Pixhawk 3 Pro (Pack)](https://store.drotek.com/autopilots/844-pixhawk-3-pro-pack.html)
- [Pixhawk 3 Pro](https://store.drotek.com/autopilots/821-pixhawk-pro-autopilot-8944595120557.html)

From [readymaderc](https://www.readymaderc.com) (USA) :

- [Pixhawk 3 Pro](https://www.readymaderc.com/products/details/pixhawk-3-pro-flight-controller)

## 编译固件

> **Tip** 多数用户不需要自己构建固件！ 它是预构建的，并在连接适当的硬件时由 *QGroundControl* 自动安装。

为此目标 [编译 PX4](../dev_setup/building_px4.md)：

    make px4_fmu-v4pro_default
    

## Debug调试端口

The board has FMU and IO debug ports as shown below.

![Debug Ports](../../assets/flight_controller/pixhawk3pro/pixhawk3_pro_debug_ports.jpg)

The pinouts and connector comply with the [Pixhawk Standard Debug Port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug) (JST SM06B connector).

| 针脚   | 信号               | 电压    |
| ---- | ---------------- | ----- |
| 2    | VCC TARGET SHIFT | +3.3V |
| 2    | UART7 Tx         | +3.3V |
| 3    | UART7 Rx         | +3.3V |
| 4（黑） | SWDIO            | +3.3V |
| 6    | SWCLK            | +3.3V |
| 6    | GND              | GND   |

For information about wiring and using this port see:

- [PX4 System Console](../debug/system_console.md#pixhawk_debug_port) (Note, the FMU console maps to UART7).
- [SWD (JTAG) Hardware Debugging Interface](../debug/swd_debug.md)

## Serial Port Mapping

| UART   | 设备         | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | WiFi                  |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |