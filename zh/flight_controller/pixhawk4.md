# Pixhawk 4

*Pixhawk 4*<sup>&reg;</sup> 是一款高端自驾仪，由 Holybro<sup>&reg;</sup> 与 PX4 团队联合设计打造。 它对 PX4 1.8 版作了优化，适用于学术和商业开发者。

它基于 [Pixhawk 项目](https://pixhawk.org/) 的 **FMUv5** 开放硬件设计，在 [NuttX](http://nuttx.org) 操作系统上运行 PX4。

<img src="../../assets/flight_controller/pixhawk4/pixhawk4_hero_upright.jpg" width="200px" title="Pixhawk4 正侧面图" /> <img src="../../assets/flight_controller/pixhawk4/pixhawk4_logo_view.jpg" width="420px" title="Pixhawk 4 图像" />

## 总览

* 主 FMU 处理器：STM32F765 
  * 32 位 Arm® Cortex®-M7，216MHz，2MB 储存，512KB RAM
* IO 处理器：STM32F100 
  * 32 位 Arm® Cortex®-M3，24MHz，8KB SRAM
* 板载传感器： 
  * 加速度计 / 陀螺仪：ICM-20689
  * 加速度计 / 陀螺仪：BMI055
  * 磁力计：IST8310
  * 气压计：MS5611
* GPS：ublox Neo-M8N GPS/GLONASS 接收器；集成磁力计 IST8310
* 接口： 
  * 8-16 路PWM输出（8路来自 IO，8路来自 FMU）
  * FMU 上有 3 路专用 PWM/Capture 输入
  * 用于 CPPM 的专用遥控输入
  * 用于 Spektrum / DSM 与 有模拟 / PWM RSSI 的 S.Bus 的专用遥控输入
  * 专用 S.Bus 舵机输出
  * 5 个通用串行接口
  * 3 个 I2C 接口
  * 4 路 SPI 总线
  * 多达 2 路 CAN 总线用于带串口的电调
  * 两路电池电压 / 电流模拟输入口
* 电源系统： 
  * 电源模块输出：4.9~5.5V
  * USB 电源输入：4.75~5.25V
  * 舵机轨道输入：0~36V
* 重量和尺寸： 
  * 重量：15.8g
  * 尺寸：44x84x12mm
* 其它特性： 
  * 工作温度：-40 ~ 85°C

更多信息可以在 [Pixhawk 4 技术数据表](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)中找到。

## 采购

中国大陆用户请从官方代理商“思动智能”的淘宝店“地面售货站”购买。境外用户从 [Holybro](https://shop.holybro.com/pixhawk-4beta-launch_p1089.html) 购买。

## 连接器

![Pixhawk 4 连接器](../../assets/flight_controller/pixhawk4/pixhawk4-connectors.jpg)

> **Warning** **DSM/SBUS RC** 与 **PPM RC** 接口仅可用于遥控接收机。 这两个接口已经供电！ 不要把舵机、电源、电池（或是连接了这些设备的接收机）连接到上面。

## 针脚定义

[在此下载](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf) *Pixhawk 4* 的针脚定义。

## 尺寸

![Pixhawk 4 尺寸](../../assets/flight_controller/pixhawk4/pixhawk4_dimensions.jpg)

## 额定电压

*Pixhawk 4* 可以实现电源三度冗余。 三个供电轨道为：**POWER1**，**POWER2** 和 **USB**。

> **Note** 输出电源轨 **FMU PWM OUT** 和 **IO PWM OUT**（0V至36V）不为飞控板供电（并且不由其供电）。 您必须在 **POWER1**、**POWER2** 或 **USB** 任一接口中接入电源，否则飞控板将会断电。

**正常运行最大额定值**

在以下条件下，所有电源将按此顺序用于为系统供电：

1. **POWER1** 和 **POWER2** 输入电压（4.9 v 至 5.5 v）
2. **USB** 输入电压（4.75 v 至 5.25 v）

**绝对最大额定值**

在以下条件下，系统不会获得任何供电（不可运行），但不会损坏。

1. **POWER1** 与 **POWER2** 输入（可运行范围 4.1V 至 5.7V，0V 至 10V 不会损坏）
2. **USB** 输入（可运行范围 4.1V 至 5.7V，0V 至 6V 不会损坏）
3. 舵机输入：**FMU PWM OUT** 和 **I/O PWM OUT** 的 VDD_SERVO 针脚 （0V 至 42V 不会损坏）

## 组装 / 设置

[Pixhawk 4 快速接线指南](../assembly/quick_start_pixhawk4.md) 提供如何组装所需的/重要的外设包含 GPS，电源管理板等的说明。

## 编译固件

> **Tip** 大多数用户不需要构建此固件！ 它是预构建的，并在连接适当的硬件时由 *QGroundControl* 自动安装。

为此目标 [编译 PX4](https://dev.px4.io/en/setup/building_px4.html)：

    make px4_fmu-v5_default
    

## 调试接口

本系统的串行控制台和 SWD 接口运行在 **FMU 调试** 接口，同时 I/O 控制台与SWD接口可以通过 **I/O 调试** 接口访问。 为了能访问这些接口，用户需要移除 *Pixhawk 4* 的外壳。

这两个端口都有标准的串口针脚，可以连接到标准的 FTDI 连接线上（3.3V，但它有5V 耐受性），或连接到 [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation) 上。 针脚定义使用标准的 Dronecode 调试连接器针脚定义。 有关如何连接此端口的详细信息，请参阅 [接线](https://dev.px4.io/en/debug/system_console.html) 页面。

## 外部设备

* [数字空速传感器](https://drotek.com/shop/en/home/848-sdp3x-airspeed-sensor-kit-sdp33.html)
* [数传电台模块](../telemetry/README.md)
* [测距仪/距离传感器](../sensor/rangefinders.md)

## 支持的平台 / 机身

任何可用普通遥控舵机系统或 Futaba S-Bus 舵机系统控制的多旋翼、固定翼、无人车、无人船。 全部可支持的机型可见 [机型参考](../airframes/airframe_reference.md)。

## 更多信息

* [Pixhawk 4 技术数据表](https://github.com/PX4/px4_user_guide/raw/master/assets/flight_controller/pixhawk4/pixhawk4_technical_data_sheet.pdf)
* [FMUv5 参考设计 pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)
* [Pixhawk 4 Wiring QuickStart](../assembly/quick_start_pixhawk4.md)
* [Pixhawk 4 Pinouts](http://www.holybro.com/manual/Pixhawk4-Pinouts.pdf) (Holybro)
* [Pixhawk 4 Quick Start Guide (Holybro)](http://www.holybro.com/manual/Pixhawk4-quickstartguide.pdf)