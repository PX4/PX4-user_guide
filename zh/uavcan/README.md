# UAVCAN 介绍

![UAVCAN Logo](../../assets/uavcan/uavcan_logo_transparent.png)

[UAVCAN](http://uavcan.org)是一个板载网络, 它允许自动驾驶仪连接到航空电子设备。 它支持如下硬件:

* Motor controllers
  * [Zubax Orel 20](https://zubax.com/product/zubax-orel-20) :::note Runs [Sapog Firmware](https://github.com/px4/sapog) (open source). Based on [Sapog Reference Hardware](https://github.com/PX4/Hardware/tree/master/sapog_reference_hardware).
:::
* Airspeed sensors
  * [Thiemar空速传感器](https://github.com/thiemar/airspeed)
* 用于GPS和GLONASS的GNSS接收器
  * [Zubax GNSS](https://zubax.com/products/gnss_2)
* Power monitors
  * [Pomegranate Systems Power Module](../power_module/pomegranate_systems_pm.md)
  * [CUAV CAN PMU Power Module](../power_module/cuav_can_pmu.md)

相比玩具级设备, 它使用可靠的差分信号, 并支持通过总线进行固件升级。 所有电调提供状态反馈并实现现场定向控制\(FOC\).

以下说明提供了一个分步指南, 用于连接和设置通过uavcan连接的电调和GPS的四轮车。 选择的硬件是Pixhawk 2.1、Zubax orrel 20电调和Zubax GNSS GPS模块。
:::

## 初始设置

第一步是将所有启用uavcan的设备与飞行控制器连接。 下图显示了如何连接所有组件。

### 布线

The first step is to connect all UAVCAN enabled devices with the flight controller. The following diagram displays how to wire all components. The used Zubax devices all support a redundant CAN interface in which the second bus is optional but increases the robustness of the connection.

![UAVCAN Wiring](../../assets/uavcan/uavcan_wiring.png)

接下来, 按照 [UAVCAN配置](../uavcan/node_enumeration.md)中的说明激活固件中的uavcan功能。 断电重连。

### 固件设置

根据使用的硬件, 在uavcan设备上执行固件更新是合理的。 这可以通过uavcan本身和px4固件来完成。 有关详细信息, 请参阅 [UAVCAN firmware](../uavcan/node_firmware.md) 中的说明。 You can now continue with the general setup and calibration.

如果提供了匹配的固件, px4中间件将自动升级uavcan节点上的固件。 过程和要求在[UAVCAN firmware](../uavcan/node_firmware.md)页面上进行了描述。 For more details please refer to the instructions in [UAVCAN Firmware](../uavcan/node_firmware.md).

## 升级节点固件

每个电机控制器的id和旋转方向可以在安装后在一个简单的设置例程中分配:[UAVCAN节点枚举](../uavcan/node_enumeration.md)。 用户可以通过QGroundControl启动该例程。

## 枚举和配置电机控制器

The ID and rotational direction of each motor controller can be assigned after installation in a simple setup routine: [UAVCAN Node Enumeration](../uavcan/node_enumeration.md). The routine can be started by the user through QGroundControl.

## 相关链接

* [首页](http://uavcan.org)
* [技术规范](https://uavcan.org/specification/)
* [实现和教程](http://uavcan.org/Implementations)
