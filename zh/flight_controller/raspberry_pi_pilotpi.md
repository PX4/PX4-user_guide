# 树莓派 PilotPi 拓展板

> **Warning** PX4 不生产这款且也不生产任何自动驾驶仪。 若需要硬件支持或咨询合规问题，请联系 [制造商](mailto:lhf2613@gmail.com)。

<span></span>
> **Warning** PX4 [实验性地](../flight_controller/autopilot_experimental.md) 支持此飞行控制器。

*PilotPi* 是一套支持树莓派直接运行 PX4 各项功能的拓展板方案。 它是一个低成本但高度可扩展的平台，从 Linux 和 PX4 两侧不断获得更新。 也不需要专有驱动，因为所有组件都有来自树莓派和 PX4 社区的上游支持。 PCB 和原理图开源。

![安装在树莓派4B的PilotPi拓展板](../../assets/flight_controller/pilotpi/hardware-pilotpi4b.png)

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

扩展板提供：

* 16 x PWM 输出通道
* GPS 连接器
* 数传连接器
* 外部I2C总线连接器（**Note:** 与CSI摄像头冲突）
* 遥控输入口（SBUS 协议）
* 3 x 0~5V ADC 通道
* 2\*8 2.54mm 排插，引出未使用的 GPIO

连接到树莓派：

* 4x USB 连接器
* CSI 连接器(**Note:** 与外部 I2C 总线冲突
* 其它

## 推荐接线

![电源部分接线](../../assets/flight_controller/pilotpi/pilotpi_pwr_wiring.png)

![传感器部分接线](../../assets/flight_controller/pilotpi/pilotpi_sens_wiring.png)

## 针脚定义

> **Warning** 它仍然使用旧的 1.25 连接器。 接线兼容Pixhawk 2.4.8

### 连接器

#### GPS 连接器

映射到 `/dev/ttySC0`

| 针脚 | 信号  | 电压   |
| -- | --- | ---- |
| 1  | VCC | +5V  |
| 2  | TX  | +3v3 |
| 3  | RX  | +3v3 |
| 4  | NC  | +3v3 |
| 5  | NC  | +3v3 |
| 6  | GND | GND  |

#### 数传连接器

映射到 `/dev/ttySC0`

| 针脚 | 信号   | 电压   |
| -- | ---- | ---- |
| 1  | VCC  | +5V  |
| 2  | TX   | +3v3 |
| 3  | RX   | +3v3 |
| 4  | CTS  | +3v3 |
| 5  | RTS: | +3v3 |
| 6  | GND  | GND  |

#### 外部 I2C 总线连接器

映射到 `/dev/i2c-0`

| 针脚 | 信号  | 电压       |
| -- | --- | -------- |
| 1  | VCC | +5V      |
| 2  | SCL | +3v3(上拉) |
| 3  | SDA | +3v3(上拉) |
| 4  | GND | GND      |

#### 遥控 & ADC 2/3/4

遥控输入映射到 `/dev/ttyAMA0` ，且在RX 线上有硬件反向开关。

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

> **Note** ADC3 和 ADC4 有一个替代的 VCC 源。 当开启“Vref” 开关时，'VCC' 将由REF5050 驱动.

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

此开关将决定 RX 线的信号反相： `UART_RX = SW xor RC_INPUT`

* 开启：适合SBUS(反转信号)
* 关闭：保留

#### 参考压

ADC3 和 ADC4 的 VCC 被以下设备驱动：
* 开启开关时：由REF5050驱动
* 关闭开关时：从树莓派5V取电

#### 启动模式

此开关连接到树莓派 Pin22(BCM25)。 系统 rc 脚本将检查其电平并决定是否在与系统开机时自动启动PX4。

* 开启：开机自启 PX4
* 关闭：不启动 PX4

## 开发者快速指南

根据具体操作系统选择以下指南：
- [Raspberry Pi OS Lite (armhf)](raspberry_pi_pilotpi_rpios.md)
- [Ubuntu 服务器(arm64 & armhf)](raspberry_pi_pilotpi_ubuntu_server.md)
