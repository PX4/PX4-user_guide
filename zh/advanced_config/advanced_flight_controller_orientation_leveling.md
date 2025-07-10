---
canonicalUrl: https://docs.px4.io/main/zh/advanced_config/advanced_flight_controller_orientation_leveling
---

# 飞控方向的高级调参

可以通过手动调参来修正无人机的方向和地平线水准，以校正传感器芯片存在的微小不对准或校准误差。

:::note
不推荐普通用户使用该教程。 对于基本设置，请遵循下面链接的说明：
* [飞行控制器方向](../config/flight_controller_orientation.md)
* [水平校准](../config/level_horizon_calibration.md) :::

如果存在持续的漂移偏差(通常存在于多旋翼中，但不仅限于多旋翼)，一个比较好的方法是可以通过微调偏移角度参数的帮助，去除该偏差，而不是使用遥控发射器的微调器。 这样，飞机在完全自主的飞行中将保持调整修正。

## 方向参数设置

更改方向参数：

1. Open QGroundControl menu: **Settings > Parameters > Sensor Calibration**.
2. 更改以下参数： ![FC Orientation QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)


## 参数信息

The **SENS_BOARD_ROT** parameter defines the rotation relative to the platform, while the X,Y and Z fine tuning offsets are fixed relative to the board itself. 实质上是微调的偏移量被添加到了 SENS_BOARD_ROT 角度中， 为了获得飞控的偏航，俯仰和横滚方向的总偏移角度。

**SENS_BOARD_ROT**

该参数定义了 FMU 飞控板相对于飞机平台的旋转角。 可选值有：

- 0 = 无旋转
- 1 = 偏航 45°
- 2 = 偏航 90°
- 3 = 偏航 135°
- 4 = 偏航 180°
- 5 = 偏航 225°
- 6 = 偏航 270°
- 7 = 偏航 315°
- 8 = 滚转 180°
- 9 = 滚转 180°, 偏航 45°
- 10 = 滚转 180°, 偏航 90°
- 11 = 滚转 180°, 偏航 135°
- 12 = 俯仰 180°
- 13 = 滚转 180°, 偏航 225°
- 14 = 滚转 180°, 偏航 270°
- 15 = 滚转 180°, 偏航 315°
- 16 = 滚转 90°
- 17 = 滚转 90°, 偏航 45°
- 18 = 滚转 90°, 偏航 90°
- 19 = 滚转 90°, 偏航 135°
- 20 = 滚转 270°
- 21 = 滚转 270°, 偏航 45°
- 22 = 滚转 270°, 偏航 90°
- 23 = 滚转 270°, 偏航 135°
- 24 = 俯仰 90°
- 25 = 俯仰角 270°


**SENS_BOARD_X_OFF**

绕 PX4FMU 的 X 轴或者 横滚轴旋转角度。 正角度增加在逆时针方向，负角度增加在顺时针方向。

**SENS_BOARD_Y_OFF**

绕 PX4FMU 的 Y 轴或者俯仰轴旋转角度。 正角度增加在逆时针方向，负角度增加在顺时针方向。

**SENS_BOARD_Z_OFF**

绕 PX4FMU 的 Z 轴或者偏航轴旋转角度。 正角度增加在逆时针方向，负角度增加在顺时针方向。
