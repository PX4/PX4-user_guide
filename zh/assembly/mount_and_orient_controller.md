---
canonicalUrl: https://docs.px4.io/main/zh/assembly/mount_and_orient_controller
---

# 安装固定飞控

## 安装方向

Almost all Flight Controllers have a *heading mark arrow* (shown below). 飞控应该顶部朝上安装在机架上，并使箭头指向与载具的前向一致（在所有的飞行器机架：固定翼、多旋翼、垂直起降、地面载具等上都是如此）。

![飞控朝向标记](../../assets/qgc/setup/sensor/fc_heading_mark_1.png)

![飞控安装方向](../../assets/qgc/setup/sensor/fc_orientation_1.png)

飞控板载的加速度计和陀螺仪对振动很敏感。 一部分型号的飞控板提供了内置的减振；另一些型号则提供了*减振泡沫*，垫在载具和飞控之间以起到减振作用。

## 振动隔离

Flight Control boards with in-built accelerometers or gyros are sensitive to vibrations. Some boards include in-built vibration-isolation, while others come with *mounting foam* that you can use to isolate the controller from the vehicle.

![Pixhawk Mounting foam](../../assets/hardware/mounting/3dr_anti_vibration_mounting_foam.png) *Vibration damping foam*

You should use the mounting strategy recommended in your flight controller documentation.

:::tip
[Log Analysis using Flight Review > Vibration](../log/flight_review.md#vibration) explains how to test whether vibration levels are acceptable, and [Vibration Isolation](../assembly/vibration_isolation.md) suggests a number of possible solutions if there is a problem. :::
