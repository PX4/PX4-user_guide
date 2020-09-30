# 安装固定飞控

## 安装方向

基本上所有的飞控都会标示*指向箭头*（如下图所示）。 飞控应该顶部朝上安装在机架上，并使箭头指向与载具的前向一致（在所有的飞行器机架：固定翼、多旋翼、垂直起降、地面载具等上都是如此）。

![飞控朝向标记](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![飞控安装方向](../../assets/qgc/setup/sensor/fc_orientation_1.png)

> **注意** 如果飞控不能按照推荐/默认的方向安装 （比如受限于物理尺寸），那么就需要在自驾仪软件中配置你实际采用的安装方向：[飞行控制器方向](../config/flight_controller_orientation.md).

## 振动隔离

飞控板载的加速度计和陀螺仪对振动很敏感。 一部分型号的飞控板提供了内置的减振；另一些型号则提供了*减振泡沫*，垫在载具和飞控之间以起到减振作用。

![Pixhawk减振泡沫](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) 减振泡沫

应遵循飞控文档中建议的安装方式。

> **Tip** [使用Flight Review进行日志分析 > 振动](../log/flight_review.md#vibration) 解释如何检测振动水平是否可以接受。如果遇到了问题，[振动隔离](../assembly/vibration_isolation.md)提供了一些可能的解决办法。