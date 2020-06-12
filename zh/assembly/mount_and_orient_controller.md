# 安装固定飞控

## 安装方向

基本上所有的飞控都会标示*指向箭头*（如下图所示）。 飞控应该顶部朝上安装在机架上，并使箭头指向与载具的前向一致（在所有的飞行器机架：固定翼、多旋翼、垂直起降、地面载具等上都是如此）。

![FC Heading Mark](../../images/fc_heading_mark_1.png)

![FC Orientation](../../images/fc_orientation_1.png)

> **注意** 如果飞控不能按照推荐/默认的方向安装 （比如受限于物理尺寸），那么就需要在自驾仪软件中配置你实际采用的安装方向：[飞行控制器方向](../config/flight_controller_orientation.md).

## 振动隔离

飞控板载的加速度计和陀螺仪对振动很敏感。 Some boards include in-built vibration-isolation, while others come with *mounting foam* that you can use to isolate the controller from the vehicle.

![Pixhawk Mounting foam](../../images/3dr_anti_vibration_mounting_foam.png) *Vibration damping foam*

You should use the mounting strategy recommended in your flight controller documentation.

> **Tip** [Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to test whether vibration levels are acceptable, and [Vibration Isolation](../assembly/vibration_isolation.md) suggests a number of possible solutions if there is a problem.