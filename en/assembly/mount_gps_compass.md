# Mounting the GPS/Compass

The GPS/Compass should be mounted on the frame as far away from other electronics as possible, with the direction marker pointing towards the front of the vehicle.
The diagram below shows the heading marker on the Pixhawk 4 and compass.

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

The compass can also be mounted in any _supported_ orientation, where the supported orientations can be seen in [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT), and uses the same convention for [orienting the flight controller](../config/flight_controller_orientation.md#orientation-definition).

If you're using the normal [Compass Calibration](../config/compass.md) process the parameter [CAL_MAG_ROT_AUTO](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO) is enabled, and the orientation should be detected automatically.

If your compass can't be oriented in any of the supported orientations, you can use a [custom rotation](#custom_magnetometer_rotation) as documented below.

:::warning
If you mount the compass at an orientation that isn't supported, for example `Yaw 30`, PX4 will detect the closest supported value. This will result in errors/warnings, even if the calibration appeared to succeed.
:::

### Custom magnetometer orientation

By selecting the `Custom Euler Angle` in the orientation setting for your magnetometer, you can specify any rotation using [CAL_MAGn_ROLL](../advanced_config/parameter_reference.md#CAL_MAG1_ROLL), [CAL_MAGn_PITCH](../advanced_config/parameter_reference.md#CAL_MAG1_PITCH) and [CAL_MAGn_YAW](../advanced_config/parameter_reference.md#CAL_MAG1_YAW) parameters.

The roll/pitch/yaw are defined as documented [here](../config/flight_controller_orientation.md#orientation-definition).

To configure the custom orientation correctly, do the following:
1. Set the [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) parameter to `Custom Euler Angle`
2. Set the magnetometer's custom roll/pitch/yaw appropriately
3. Follow the [compass calibration procedure](../config/compass.md#performing-the-calibration)

After this, you should have a calibrated magnetometer with a custom specified rotation.
