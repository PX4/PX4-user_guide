# 接线指南

本快速入门指南演示如何为 [Cube](../flight_controller/pixhawk-2.md)<sup>&reg;</sup> 飞行控制器供电以及如何连接中央的外部设备。

<img src="../../assets/flight_controller/cube/pixhawk2_cube_hero.png" width="400px" />

## 配件

Cube在[购买时](../flight_controller/pixhawk-2.md#stores)提供大多数（所有）您需要的配件。

![Cube 附件](../../assets/flight_controller/cube/cube_accessories.jpg)

一些套件不包括GPS，需要您单独购买（[如下所示](#gps)）。

## 接线图概览

下图显示如何连接重要的传感器和外设。 我们将在下面各节中介绍它们的细节。

![Cube - 接线概述](../../assets/flight_controller/cube/cube_wiring_overview.jpg)

1. [数传系统](#telemetry) — 允许您计划/运行任务，实时控制和监控飞行器状态。 典型的包括数传、平板电脑/PC、地面站软件。
2. [蜂鸣器](#buzzer) — 提供声音信号显示UAV目前的状态。
3. [远程控制接收系统](#rc_control) — 连接手持发射器能够手动操控飞行（如图所述是一个PWM 接收器能包括 PWM->PPM 转换器）。
4. （专用） [安全开关](#safety_switch) — 按下以解锁和锁定电机。 如果您没有使用推荐的内置安全开关的 [GPS](#gps) 时，安全开关是必须的。
5. [GPS、罗盘、LED、安全开关](#gps) — 推荐的GPS模块包括GPS、罗盘、LED 和安全开关。 
6. [电源系统](#power) — 电源线和电机ESC。 包括锂电池、电源模块和可选的电源报警系统（如果电池电量低于预定时发出警报）。 

<span></span>

> **Tip** 有关更多可用端口的详细信息，请参阅 [Cube > Ports](../flight_controller/pixhawk-2.md#ports)。

## 飞控的安装和方向

安装电路时尽可能靠近飞行器的重心， 理想情况是安装方向向上箭头指向飞行器前方 （注意电路上的 *微小的*箭头）。

![Cube 安装 - 朝向](../../assets/flight_controller/cube/cube_mount_front.jpg)

> **Note** 如飞行控制器不能被安装在推荐/默认的方向（例如，由于空间限制）你需要更改自动驾驶仪软件来配置实际的安装方向： [飞行控制器方向](../config/flight_controller_orientation.md)。

Cube可以使用减振泡沫板安装（包括在套件中）或者用螺钉安装。 在Cube的附件中有安装螺钉，是为1.8mm厚的框架板设计的。 用户定制螺钉应该是M2.5，长度6mm~7.55mm。

![Cube 安装 - 安装板](../../assets/flight_controller/cube/cube_mount_plate_screws.jpg)

## GPS + 罗盘 + 安全开关 + LED {#gps}

推荐的 GPS 在 *Here* and [Here+](../gps_compass/rtk_gps_hex_hereplus.md)，其中都包含一个GPS模块、罗盘、安全开关和 [LEDs](../getting_started/led_meanings.md)。

> **Note** 模块之间的差别是 *Here+* 支持通过 [RTK](../advanced_features/rtk-gps.md) 实现厘米级定位。 除此以外在使用/安装是相同的。

模块在安装时应尽可能远离其他电子元器件，方向标记朝向飞行器前方（将罗盘和其他电子元器件分开可以减少干扰）。 它必须使用8-针电缆连接到 `GPS1` 端口。

下图显示了模块及其连接方式。

![Cube 连接图](../../assets/flight_controller/cube/here_plus_connector.png)

> **Note** GPS模块内集成的安全开关 *默认是启用的*（当启用时，PX4将不会让您解锁飞行器）。 如需关闭安全开关，请按住安全开关1秒钟。 您可以在完成任务后再次按下安全开关以启用并锁定飞行器 （因为这是出于安全考虑的机制，无论出于何种原因，您将无法通过遥控器或地面站来远程解锁您的载具）。

<span></span>

> **Tip** 如果您想要使用旧的6-线GPS模块，套件将使用电缆来连接GPS和 [安全开关](#safety_switch)。

## 安全开关 {#safety_switch}

*专用的* Cube 安全开关只有在您使用推荐的 [GPS](#gps) 时是必须的（包含一个内部的安全开关）。

如果您在没有GPS的情况下飞行，您必须将安全开关连接到 `GPS1` 端口为了能解锁和起飞飞行器（或者如果使用旧的6-GPS时通过提供的电缆）。

## 蜂鸣器

蜂鸣器提供声音信号显示无人机状态。 它应该按照如图所示的方式连接到USB端口（不需要进一步的配置）。

![Cube 蜂鸣器](../../assets/flight_controller/cube/cube_buzzer.jpg)

## 无线电遥控 {#rc_control}

如果您想要 *手动* 控制您的飞行器，需要使用[remote control (RC) radio system](../getting_started/rc_transmitter_receiver.md) （PX4在自动飞行模式下可以不需要遥控器）。

您需要 [选择一个兼容的发射/接收机](../getting_started/rc_transmitter_receiver.md) 并 *对频* 使它们能够通信 (对频方法参考发射/接收机的说明书)。

下面介绍如何连接不同种类的接收机。

### PPM-SUM / Futaba S.Bus 接收机

使用提供的3-线电缆，连接 ground(-),power(+),and signal(S) wires 到 RC 针。

![Cube - RCIN](../../assets/flight_controller/cube/cube_rc_in.jpg)

### Spektrum Satellite 接收机

Spektrum DSM, DSM2, and DSM-X Satellite RC 接收机连接到 **SPKT/DSM** 端口。

![Cube - Spektrum](../../assets/flight_controller/cube/cube_rc_spektrum.jpg)

### PWM 接收机

Cube 不能之间连接 PPM or PWM 接收机， *每个通道有独立的连接线*。 因此PWM 接收机必须连接到 **RCIN** 端口 *通过* 一个 PPM 解码模块，可以在 hex.aero 或者proficnc.com 网站购买。

## 电源 {#power}

Cube 通常通过电源模块使用锂电池供电 (LiPo) (随套件提供)，连接在 **POWER1** 端口。 电源模块提供可靠的供应和电压/电流显示，并可单独为在多旋翼飞行器驱动电机的ESCs供电。

下图显示了一种典型多旋翼飞行器的电源设置。

![Power 设置 - MC](../../assets/flight_controller/cube/cube_wiring_power_mc.jpg)

<!-- HOw is the power rail powered for servos - power rail? Plane/Vtol would be cool to show here too -->

## 数传系统（可选） {#telemetry}

数传系统允许您通过地面站对飞行器进行通信、监控和控制 (例如，您可以指定无人机飞行到指定位置或上传新的任务)。

通信通道通过 [数传电台](../telemetry/README.md)。 机载无线数传模块应该连接到 **TELEM1** 端口（如果连接在这个端口，则无需进一步配置）。 另一个数传模块连接到您的地面站电脑或移动设备 （通常通过USB连接）。

![数传电台](../../assets/flight_controller/cube/cube_schematic_telemetry.jpg)

## SD 卡（可选）

SD卡通常用来 [记录并分析飞行数据](../getting_started/flight_reporting.md)。 下图显示将SD卡插入Cube（如果尚未插入）。

![Cube - 安装SD卡](../../assets/flight_controller/cube/cube_sdcard.jpg)

> **Tip** [强烈推荐使用](https://dev.px4.io/en/log/logging.html#sd-cards)SanDisk Extreme U3 32GB（开发者指南）。

## 电机

电机和舵机按照 [机架参考列表](../airframes/airframe_reference.md) 中为您的飞机指定的顺序连接至 **MAIN** 和 **AUX** 端口。

![Cube - 电机连接](../../assets/flight_controller/cube/cube_main_aux_outputs.jpg)

> **Note**本参考列出了所有支持的空中和地面机架的接口与电机/舵机的映射关系（如果您的机架没有在参考列表里，您可以使用对应类型的“通用”机架）。

<span></span>

> **Caution** 该参考列表并不是与机架类型完全匹配的（例如，您不能将油门应用在其他所有机型的输出端口上）。 请确保为您的飞行器使用正确的映射。

## 其它外设

针对可选/非通用组件的接线与配置，在 [外围设备](../peripherals/README.md) 独立主题中有详细的内容介绍。

## 配置

使用 [QGroundContro](http://qgroundcontrol.com/) 进行配置。

下载、安装和运行 *QGroundControl* 后，按照如图所示的方式将您的电脑和飞控连接。

![Cube - USB 连接到电脑](../../assets/flight_controller/cube/cube_usb_connection.jpg)

一般配置信息在以下内容中介绍：Autopilot Configuration</0 >。</p> 

QuadPlane的特定配置在以下内容中介绍：[QuadPlane VTOL Configuration](../config_vtol/vtol_quad_configuration.md)。

<!-- what about config of other vtol types and plane. Do the instructions in these ones above apply for tailsitters etc? -->

## 更多信息

- [Cube](../flight_controller/pixhawk-2.md) <!-- - [pixhawk2 user manual copy]()  // fold out insert shipped with doc /assets/flight_controller/cube/cube_mount_front/pixhawk2 user manual copy.pdf -->
    
    <!-- - [Cube Quickstart]() (HEX) -->