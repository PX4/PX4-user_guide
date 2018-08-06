# 高级飞行控制器方向调整

方向和地平线水平可以手动微调的参数, 以纠正传感器板小错位或轻微校准误差。

> **Note**对于常规用户, 不建议使用这些说明。 对于基本设置, 坚持以下链接的说明:

- [Flight Controller Orientation](../config/flight_controller_orientation.md)
- [Level Horizon Calibration](../config/level_horizon_calibration.md) 

如果存在持续漂移偏差 (通常在 multirotors 中看到但不限于它们), 则最好的策略是在微调偏移角度参数的帮助下修剪它, 而不是使用 RC 发射机的修剪器。 This way when in fully autonomous flight the aircraft will maintain the trimming.

## 手机方向参数

To change the orientation parameters:

1. Open QGroundControl menu: **Settings > Parameters > Sensor Calibration**.
2. Change the parameters as shown below: ![FC Orientation QGC v2](../../images/fc_orientation_qgc_v2.png)

## Parameter information

** SENS_BOARD_ROT ** 参数定义相对于平台的旋转, 而 X、Y 和 Z 微调偏移相对于主板本身是固定的。 将微调偏移量添加到 SENS_BOARD_ROT 角, 以获得飞行控制器偏航、俯仰和滚动方向的总偏移角。

**SENS_BOARD_ROT**

This parameter defines the rotation of the FMU board relative to the platform. Possible values are:

- 0 = No rotation
- 1 = Yaw 45°
- 2 = 偏航90°
- 3 = Yaw 135°
- 4 = Yaw 180°
- 5 = Yaw 225°
- 6 = Yaw 270°
- 7 = Yaw 315°
- 8 = Roll 180°
- 9 = Roll 180°, Yaw 45°
- 10 = Roll 180°, Yaw 90°
- 11 = Roll 180°, Yaw 135°
- 12 = Pitch 180°
- 13 = Roll 180°, Yaw 225°
- 14 = Roll 180°, Yaw 270°
- 15 = Roll 180°, Yaw 315°
- 16 = Roll 90°
- 17 = Roll 90°, Yaw 45°
- 18 = Roll 90°, Yaw 90°
- 19 = Roll 90°, Yaw 135°
- 20 = Roll 270°
- 21 = Roll 270°, Yaw 45°
- 22 = Roll 270°, Yaw 90°
- 23 = Roll 270°, Yaw 135°
- 24 = Pitch 90°
- 25 = Pitch 270°

**SENS_BOARD_X_OFF**

Rotation, in degrees, around PX4FMU's X axis or Roll axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Y_OFF**

Rotation, in degrees, around PX4FMU's Y axis or Pitch axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Z_OFF**

Rotation, in degrees, around PX4FMU's Z axis Yaw axis. Positive angles increase in CCW direction, negative angles increase in CW direction.