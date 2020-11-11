# 树莓派 PilotPi 拓展板

> **Warning** PX4不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](mailto:lhf2613@gmail.com)。

<span></span>
> **Warning** PX4 [实验性的](../flight_controller/autopilot_experimental.md) 支持此飞行控制器。

*PilotPi* 是一套支持树莓派直接运行PX4各项功能的拓展板。 它是一个低成本但高度可扩展的平台，从Linux和PX4两侧不断获得更新。 也不需要专有驱动，因为所有组件都有来自树莓派和 PX4 社区的上游支持。 PCB和原理图开源。

![PilotPi with RPi 4B](../../assets/flight_controller/pilotpi/hardware-pilotpi4b.png)

## 概览

* 支持的树莓派：
  * 树莓派2B/3B/3B+/4B
* 支持的操作系统：
  * Raspberry Pi OS
  * Ubuntu Server (armhf/arm64)
* 加速度计/角速度计：
  * ICM42688P
* 磁力计：
  * IST8310
* 气压计：
  * MS5611
* PWM：
  * PCA9685
* ADC：
  * ADS1115
* 电源：
  * 3~6S电池 具有内置电压监测
  * 通过USB线启动树莓派
* 市场状态： *准备生产*

## 连接性

扩展板提供：

* 16 x PWM 输出通道
* GPS 连接器
* 数传连接器
* 外部I2C总线连接器（**Note:** 与CSI摄像头冲突）
* 遥控输入口（SBUS协议）
* 3 x 0~5V ADC通道
* 2\*8 2.54mm unused GPIO connector

Direct accessible from RPi:

* 4x USB connector
* CSI connector(**Note:** conflict with external I2C bus)
* etc.

## Recommended Wiring

![PilotPi PowerPart wiring](../../assets/flight_controller/pilotpi/pilotpi_pwr_wiring.png)

![PilotPi SensorPart wiring](../../assets/flight_controller/pilotpi/pilotpi_sens_wiring.png)

## Pinout

> **Warning** It still uses old GH1.25 connectors. Wiring is compatible with Pixhawk 2.4.8

### Connectors

#### GPS connector

Mapped to `/dev/ttySC0`

| Pin | Signal | Volt |
| --- | ------ | ---- |
| 1   | VCC    | +5V  |
| 2   | TX     | +3v3 |
| 3   | RX     | +3v3 |
| 4   | NC     | +3v3 |
| 5   | NC     | +3v3 |
| 6   | GND    | GND  |

#### Telemetry connector

Mapped to `/dev/ttySC1`

| Pin | Signal | Volt |
| --- | ------ | ---- |
| 1   | VCC    | +5V  |
| 2   | TX     | +3v3 |
| 3   | RX     | +3v3 |
| 4   | CTS    | +3v3 |
| 5   | RTS    | +3v3 |
| 6   | GND    | GND  |

#### External I2C connector

Mapped to `/dev/i2c-0`

| Pin | Signal | Volt          |
| --- | ------ | ------------- |
| 1   | VCC    | +5V           |
| 2   | SCL    | +3v3(pullups) |
| 3   | SDA    | +3v3(pullups) |
| 4   | GND    | GND           |

#### RC & ADC2/3/4

RC is mapped to `/dev/ttyAMA0` with signal inverter switch on RX line.

| Pin | Signal | Volt     |
| --- | ------ | -------- |
| 1   | RC     | +3V3~+5V |
| 2   | VCC    | +5V      |
| 3   | GND    | GND      |

- ADC1 is internally connected to voltage divider for battery voltage monitoring.
- ADC2 is left unused.
- ADC3 can be connected to an analog airspeed sensor.
- ADC4 has a jumper cap between ADC and VCC, to monitor system voltage level.

| Pin | Signal | Volt   |
| --- | ------ | ------ |
| 1   | ADCx   | 0V~+5V |
| 2   | VCC    | +5V    |
| 3   | GND    | GND    |

> **Note** ADC3 & 4 have an alternative VCC source When 'Vref' switch is on, 'VCC' pin is driven by REF5050.

#### Unused GPIO available on top of the board

| Shield Pin | BCM | WiringPi | RPi Pin |
| ---------- | --- | -------- | ------- |
| 1          | 3V3 | 3v3      | 3V3     |
| 2          | 5V  | 5V       | 5V      |
| 3          | 4   | 7        | 7       |
| 4          | 14  | 15       | 8       |
| 5          | 17  | 0        | 11      |
| 6          | 27  | 2        | 13      |
| 7          | 22  | 3        | 15      |
| 8          | 23  | 4        | 16      |
| 9          | 7   | 11       | 26      |
| 10         | 5   | 21       | 29      |
| 11         | 6   | 22       | 31      |
| 12         | 12  | 26       | 32      |
| 13         | 13  | 23       | 33      |
| 14         | 16  | 27       | 36      |
| 15         | 26  | 25       | 37      |
| 16         | GND | GND      | GND     |

### Switches

#### RC Inverter

This switch will decide the signal polarity of RX line: `UART_RX = SW xor RC_INPUT`

* On: suitable with SBUS (signal inverted)
* Off: preserved

#### Vref

ADC 3 & 4 will have VCC driven by:
* Vref output from REF5050 if on
* 5V pin directly from RPi if off

#### Boot Mode

This switch is connected to Pin22(BCM25). System rc script will check its value and decide whether PX4 should start alongside with system booting or not.

* On: start PX4 automatically
* Off: don' t start PX4

## Developer Quick Start

Refer to specific instructions for the OS running on your RPi:
- [Raspberry Pi OS Lite (armhf)](raspberry_pi_pilotpi_rpios.md)
- [Ubuntu Server (arm64 & armhf)](raspberry_pi_pilotpi_ubuntu_server.md)
