# 飞行控制器的朝向的高级调参

可以通过手动调参来修正无人机的方向和地平线水准，以校正传感器芯片存在的微小不对准或校准误差。

:::note
These instructions are not recommended for regular users. For basic settings stick to the instructions linked below:

- [飞行控制器方向](../config/flight_controller_orientation.md)
- [Level Horizon Calibration](../config/level_horizon_calibration.md)
:::

If there is a persistent drift bias (often seen in multirotors but not limited to them), it is a good strategy to trim it with the help of this fine-tuning offset angle parameters instead of using the trimmers of your RC Transmitter. This way when in fully autonomous flight the aircraft will maintain the trimming.

## 方向参数设置

To change the orientation parameters:

1. 打开 QGroundControl 菜单: **Settings > Parameters > Sensor Calibration**.
2. 更改以下参数： ![FC Orientation QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## 参数信息

The **SENS_BOARD_ROT** parameter defines the rotation relative to the platform, while the X,Y and Z fine tuning offsets are fixed relative to the board itself. What happens is that the fine tuning offsets are added to the SENS_BOARD_ROT angle in order to get the total offset angles for the Yaw, Pitch and Roll orientation of the flight controller.

**SENS_BOARD_ROT**

This parameter defines the rotation of the FMU board relative to the platform. Possible values are:

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

Rotation, in degrees, around PX4FMU's X axis or Roll axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Y_OFF**

Rotation, in degrees, around PX4FMU's Y axis or Pitch axis. Positive angles increase in CCW direction, negative angles increase in CW direction.

**SENS_BOARD_Z_OFF**

Rotation, in degrees, around PX4FMU's Z axis Yaw axis. Positive angles increase in CCW direction, negative angles increase in CW direction.