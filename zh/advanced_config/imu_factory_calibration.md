# IMU/指南针工厂校准

PX4 OEM制造商可以执行IMU和罗盘工厂校准，以便将加速度计、陀螺仪和磁力计校准的数值存储到持久存储器中（通常是EEPROM）。 这将确保最终用户总是能够重置车辆配置并调整到安全状态以供飞行。

此程序将把以下参数写入到 `/fs/mtd_caldata`: [CAL_AC\*](../advanced_config/parameter_reference.md#CAL_ACC0_ID), [CAL_GYRO\*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID), [CAL_MAG\*](../advanced_config/parameter_reference.md#CAL_MAG0_ID) 当参数被设置（或重置）为其默认值时，此数据将被使用。

:::warning
此功能依赖于FMU具有专用的EEPROM芯片或具有足够空间存储数据的附带IMU PCBA。 PX4将数据存储到`/fs/mtd_caldata`，需要时会创建文件。
:::

::: info
这些值不能存储在[机体配置](../dev_airframes/adding_a_new_frame.md)中，因为它们会因设备而异（机体配置定义了适用于同一类型所有机体的参数集，例如启用的传感器、[自动驾驶仪方向](../config/flight_controller_orientation.md)和PID调整）。
:::

## 执行工厂校准

1. 将参数 [SYS_FAC_CAL_MODE](../advanced_config/parameter_reference.md#SYS_FAC_CAL_MODE) 设置为1。
1. 执行所有IMU校准：[加速计](../config/accelerometer.md#performing-the-calibration)，[陀螺仪](../config/gyroscope.md#performing-the-calibration)和[磁力计](../config/compass.md#performing-the-calibration)。
1. 重启飞行器. 这将把所有`CAL_ACC*`、`CAL_GYRO*`和`CAL_MAG*`参数写入`/fs/mtd_caldata`。
1. 将参数 `SYS_FAC_CAL_MODE` 设置回0（默认值）。

::: info
如果您只想对加速度计和陀螺仪进行出厂校准，您可以将[SYS_FAC_CAL_MODE](../advanced_config/parameter_reference.md#SYS_FAC_CAL_MODE)设置为2，这样磁力计会被忽略。
:::

随后的用户校准将像往常一样生效（工厂校准数据仅用于参数默认值）。

## 更多信息：

- [QGroundControl 用户手册 > 传感器](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/sensors_px4.html)
