# IMU Factory Calibration

If you are an OEM building a PX4-based end-product, you may wish to ensure end users can always reset vehicle configurations and tuning to a safe, flying state. PX4 supports a factory calibration procedure to achieve this, where critical IMU calibration parameters are written into `/fs/mtd_caldata` which is typically an onboard EEPROM chip, making them persistent in the event of a full parameter reset.

:::note
This feature is dependent on the availability of a dedicated EEPROM chip on the FMU (or accompanying IMU PCBA). This storage must be available at `/fs/mtd_caldata`.
:::

## Difference to Airframe Configuration
An airframe configuration is the collection of parameters which are applicable across all vehicles of the same type. This includes things like sensor set, [autopilot rotation](flight_controller_orientation.md) and PID tuning. 

Some parameters can vary from device to device, and therefore need to be treated differently. These parameters include the accelerometer, gyroscope and magnetometer biases.

This procedure will write the following parameters into persistent EEPROM:
- `CAL_ACC*`
- `CAL_MAG*`
- `CAL_GYRO*`

## Performing the Factory Calibration 

1. Set the parameter `SYS_FAC_CAL_MODE` to 1.
1. Perform all IMU calibrations: [accelerometer](accelerometer.md#performing-the-calibration) [gyroscope](gyroscope.md#performing-the-calibration) and [magnetometer](compass.md#performing-the-calibration)
1. Reboot the vehicle. This will write all `CAL_ACC*`, `CAL_GYRO*` and `CAL_MAG*` parameters into `/fs/mtd_caldata`.
1. Set the parameter `SYS_FAC_CAL_MODE` back to 0 (default).


:::note
Subsequent calibrations will still take effect as usual. The factory calibration is only used when all parameters are reset.
:::

## Further Information

* [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/master/en/SetupView/sensors_px4.html)
