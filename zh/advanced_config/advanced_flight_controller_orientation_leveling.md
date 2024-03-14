# 飞控方向的高级调参

方向和水平可以用参数手动调整，以校正传感器板的小误差或者校准误差。

If there is a persistent drift bias (often seen in multirotors but not limited to them), it is a good strategy to trim it with the help of these fine-tuning offset angle parameters, instead of using the trimmers of your RC Transmitter. 对于基本设置，请遵循下面链接的说明：

:::note
These instructions are "advanced", and not recommended for regular users (the broad tuning is generally sufficient).
:::

## 方向参数设置

如果存在持续的漂移偏差(通常存在于多旋翼中，但不仅限于多旋翼)，一个比较好的方法是可以通过微调偏移角度参数的帮助，去除该偏差，而不是使用遥控发射器的微调器。 这样，飞机在完全自主的飞行中将保持调整修正。

更改方向参数：

The other parameters can then be set in order to fine-tune the orientation of the IMU sensors relative to the board itself.

You can locate the parameters in QGroundControl as shown below:

1. Open QGroundControl menu: **Settings > Parameters > Sensor Calibration**.
1. The parameters as located in the section as shown below (or you can search for them):

   ![FC Orientation QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## Parameter Summary

- [SENS_BOARD_ROT](../advanced_config/parameter_reference.md#SENS_BOARD_ROT): Rotation of the FMU board relative to the vehicle frame.
- [SENS_BOARD_X_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_X_OFF): Rotation, in degrees, around PX4FMU's X axis or Roll axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
- [SENS_BOARD_Y_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Y_OFF): Rotation, in degrees, around PX4FMU's Y axis or Pitch axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
- [SENS_BOARD_Z_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Z_OFF): Rotation, in degrees, around PX4FMU's Z axis Yaw axis. Positive angles increase in CCW direction, negative angles increase in CW direction.
