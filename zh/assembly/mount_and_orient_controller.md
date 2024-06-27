# 安装固定飞控

飞控应尽可能的安装在靠近载具重力中心(CoG)，顶部朝上，并且_箭头标记_的方向指向载具前方。 [振动隔离](#vibration-isolation)通常是必需的，您应遵循制造商的建议。 若以这种方式安装，则无需进行进一步的PX4配置。

## 安装方向

几乎所有的飞控都会由一个_指向箭头标记_ （如下图所示）。 飞控应该顶部朝上安装在机架上，并使箭头指向与载具的前向一致（在所有的飞行器机架：固定翼、多旋翼、垂直起降、地面载具等上都是如此）。

![飞控朝向标记](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![飞控安装方向](../../assets/qgc/setup/sensor/fc_orientation_1.png)

::: info If the controller cannot be mounted in the recommended/default orientation due to physical constraints, you will need to configure the autopilot software with the orientation that you actually used: [Flight Controller Orientation](../config/flight_controller_orientation.md). 一部分型号的飞控板提供了内置的减振；另一些型号则提供了*减振泡沫*，垫在载具和飞控之间以起到减振作用。

## 安装位置

The flight controller should be placed on the frame as close as possible to the centre-of-gravity.

If you can't mount the controller in this position, then you should [configure](../advanced_config/parameters.md) the following parameters to set offset relative to the CoG: [EKF2_IMU_POS_X](../advanced_config/parameter_reference.md#EKF2_IMU_POS_X), [EKF2_IMU_POS_Y](../advanced_config/parameter_reference.md#EKF2_IMU_POS_Y), [EKF2_IMU_POS_Z](../advanced_config/parameter_reference.md#EKF2_IMU_POS_Z) (for the default EKF2 estimator).

Note that if you don't set these offsets then EKF2 position/velocity estimates will be at the IMU location rather that at the CoG. This may result in undesirable oscillations, depending on how far away the IMU is from the CoG.

::: details
Explanation
To understand the impact of not setting these offsets, consider the case when the flight controller (IMU) is in front of the CoG, you're flying in position mode, and there is a forward pitching motion around the CoG.
The altitude estimate will go down, because the IMU has in fact moved down.
As a reaction, the altitude controller will give more thrust to compensate.
The amplitude depends on how far the IMU is located from the CoG.
It might be negligible, but it is still some unneeded control effort that is constantly applied.
If the offsets are specified, a pure pitch motion would not create any change in the altitude estimate so there will be less parasitic corrections.
:::

## 振动隔离

Flight Control boards with in-built accelerometers or gyros are sensitive to vibrations. Some boards include in-built vibration-isolation, while others come with _mounting foam_ that you can use to isolate the controller from the vehicle.

![Pixhawk 减振泡沫](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) _Vibration damping foam_

You should use the mounting strategy recommended in your flight controller documentation.

:::tip
[使用Flight Review进行日志分析 > 振动](../log/flight_review.md#vibration) 解释如何检测振动水平是否可以接受。如果遇到了问题，[振动隔离](../assembly/vibration_isolation.md)提供了一些可能的解决办法。
:::
