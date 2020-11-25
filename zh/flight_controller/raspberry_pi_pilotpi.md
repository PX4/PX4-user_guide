# 树莓派 PilotPi 拓展板

*PilotPi* 是一套支持树莓派直接运行 PX4 各项功能的拓展板方案。 它是一个低成本但高度可扩展的平台，从 Linux 和 PX4 两侧不断获得更新。 也不需要专有驱动，因为所有组件都有来自树莓派和 PX4 社区的上游支持。

:::warning
PX4 support for this flight controller is [experimental](../flight_controller/autopilot_experimental.md).
:::

The *PilotPi* shield is a fully functional solution to run PX4 autopilot directly on Raspberry Pi. It is designed to be a low-cost but highly scalability platform with continuous updates from both Linux and PX4 sides. No proprietary driver is required, as all components have upstream support from RPi and PX4 community. PCB and schematic are open source as well.

![PilotPi with RPi 4B](../../assets/flight_controller/pilotpi/hardware-pilotpi4b.png)

## 概览

* 支持的树莓派：
  * 树莓派 2B/3B/3B+/4B
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
  * 3~6S 电池 具有内置电压监测
  * 通过USB线启动树莓派
* 市场状态： *准备生产*

## 连接性

Shield provides:

* 16 x PWM 输出通道
* GPS 连接器
* 数传连接器
* 外部I2C总线连接器（**Note:** 与CSI摄像头冲突）
* 遥控输入口（SBUS 协议）
* 3 x 0~5V ADC 通道
* 2\*8 2.54mm 排插，引出未使用的 GPIO

Direct accessible from RPi:

* 4x USB 连接器
* CSI 连接器(**Note:** 与外部 I2C 总线冲突
* 其它

## 推荐接线

![PilotPi PowerPart wiring](../../assets/flight_controller/pilotpi/pilotpi_pwr_wiring.png)

![PilotPi SensorPart wiring](../../assets/flight_controller/pilotpi/pilotpi_sens_wiring.png)

## 针脚定义

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](mailto:lhf2613@gmail.com)。

### 连接器

#### GPS 连接器

映射到 `/dev/i2c-0`

| 针脚 | 信号  | 电压   |
| -- | --- | ---- |
| 1  | VCC | +5V  |
| 2  | TX  | +3v3 |
| 3  | RX  | +3v3 |
| 4  | NC  | +3v3 |
| 5  | NC  | +3v3 |
| 6  | GND | GND  |

#### 数传连接器

遥控输入映射到 `/dev/ttyAMA0` ，且在RX 线上有硬件反向开关。

| 针脚 | 信号   | 电压   |
| -- | ---- | ---- |
| 1  | VCC  | +5V  |
| 2  | TX   | +3v3 |
| 3  | RX   | +3v3 |
| 4  | CTS  | +3v3 |
| 5  | RTS: | +3v3 |
| 6  | GND  | GND  |

#### 外部 I2C 总线连接器

此开关将决定 RX 线的信号反相： `UART_RX = SW xor RC_INPUT`

| 针脚 | 信号  | 电压       |
| -- | --- | -------- |
| 1  | VCC | +5V      |
| 2  | SCL | +3v3(上拉) |
| 3  | SDA | +3v3(上拉) |
| 4  | GND | GND      |

#### 遥控 & ADC 2/3/4

ADC3 和 ADC4 的 VCC 被以下设备驱动：

| 针脚 | 信号  | 电压       |
| -- | --- | -------- |
| 1  | RC  | +3V3~+5V |
| 2  | VCC | +5V      |
| 3  | GND | GND      |

- ADC1 内部连接到分压电路以监测电池电压。
- ADC2 空闲。
- ADC3 可以连接模拟量空速计。
- ADC4 在 ADC 和 VCC 之间有一个跳线帽，监测系统电压。

| 针脚 | 信号   | 电压     |
| -- | ---- | ------ |
| 1  | ADCx | 0V~+5V |
| 2  | VCC  | +5V    |
| 3  | GND  | GND    |

> **Warning** PX4 [实验性地](../flight_controller/autopilot_experimental.md) 支持此飞行控制器。

#### 拓展板顶部引出的未使用的GPIO

| 拓展板Pin | BCM号 | WiringPi号 | 树莓派Pin |
| ------ | ---- | --------- | ------ |
| 1      | 3V3  | 3v3       | 3V3    |
| 2      | 5V   | 5V        | 5V     |
| 3      | 4    | 7         | 7      |
| 4      | 14   | 15        | 8      |
| 5      | 17   | 0         | 11     |
| 6      | 27   | 2         | 13     |
| 7      | 22   | 3         | 15     |
| 8      | 23   | 4         | 16     |
| 9      | 7    | 11        | 26     |
| 10     | 5    | 21        | 29     |
| 11     | 6    | 22        | 31     |
| 12     | 12   | 26        | 32     |
| 13     | 13   | 23        | 33     |
| 14     | 16   | 27        | 36     |
| 15     | 26   | 25        | 37     |
| 16     | GND  | GND       | GND    |

### 开关

#### 遥控信号反相器

This switch will decide the signal polarity of RX line: `UART_RX = SW xor RC_INPUT`

* 开启：适合SBUS(反转信号)
* 关闭：保留

#### 参考压

根据具体操作系统选择以下指南：
* 开启开关时：由REF5050驱动
* 关闭开关时：从树莓派5V取电

#### 启动模式

This switch is connected to Pin22(BCM25). System rc script will check its value and decide whether PX4 should start alongside with system booting or not.

* 开启：开机自启 PX4
* 关闭：不启动 PX4

## 开发者快速指南

Refer to specific instructions for the OS running on your RPi:
- [Raspberry Pi OS Lite (armhf)](raspberry_pi_pilotpi_rpios.md)
- [Ubuntu 服务器(arm64 & armhf)](raspberry_pi_pilotpi_ubuntu_server.md)
