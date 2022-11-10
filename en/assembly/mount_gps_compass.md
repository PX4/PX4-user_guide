# Mounting a GPS/Compass

GPS/Compasses should be mounted on the frame as far away from other electronics as possible, with the direction marker pointing towards the front of the vehicle.
If mounted in this way you can immediately proceed to [compass calibration](../config/compass.md#performing-the-calibration).

The diagram below shows the heading marker on the Pixhawk 4 and compass.

![Connect compass/GPS to Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_compass_gps.jpg)

## Compass Orientation

The compass can be mounted in any of the standard MAVLink orientations defined in [MAV_SENSOR_ORIENTATION](https://mavlink.io/en/messages/common.html#MAV_SENSOR_ORIENTATION). 
The orientation follows the same frame convention as when [orienting the flight controller](../config/flight_controller_orientation.md#orientation-definition).

If you're using the normal [Compass Calibration](../config/compass.md) process (with parameter [CAL_MAG_ROT_AUTO](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO) enabled), the orientation should be detected automatically.
Otherwise you can directly select the appropriate value in [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) for up to three compasses.

If your compass can't be oriented in any of the standard orientations, you can use a [custom rotation](#custom_orientation) as documented below.

:::warning
PX4 will automatically (by default) detect the closest _standard_ orientation if you perform a normal calibration.
If the orientation is not one of the standard values (for example `Yaw 30`) the calibration will be inaccurate even if it appears to succeed.
This can result in errors, warnings, and poor flight performance.
:::

### Custom Orientation

You can use a custom orientation by first selecting `Custom Euler Angle` in `CAL_MAGn_ROT` for your magnetometer.  
You can then set any rotation using the [CAL_MAGn_ROLL](../advanced_config/parameter_reference.md#CAL_MAG1_ROLL), [CAL_MAGn_PITCH](../advanced_config/parameter_reference.md#CAL_MAG1_PITCH) and [CAL_MAGn_YAW](../advanced_config/parameter_reference.md#CAL_MAG1_YAW) parameters.

The roll/pitch/yaw are defined as documented [here](../config/flight_controller_orientation.md#orientation-definition).

To configure a custom orientation and calibrate the compass:

1. Set the [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG1_ROT) parameter to `Custom Euler Angle`
2. Set the magnetometer's correct custom roll/pitch/yaw
3. Follow the [compass calibration procedure](../config/compass.md#performing-the-calibration)
