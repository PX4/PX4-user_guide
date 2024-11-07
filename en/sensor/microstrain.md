# MicroStrain (INS, IMU, VRU, ARHS)

MicroStrain by HBK provides high-performance inertial sensors engineered for reliability and precision in challenging environments.
Widely used across industries like aerospace, robotics, industrial automation, and research, MicroStrain sensors are optimized for real-time, accurate motion tracking and orientation data.

![CV7](../../assets/hardware/sensors/inertial/microstrain_3dm_cv7_hbk.png)

The driver currently supports the following hardware:

- [`MicroStrain CV7-AHRS`](https://www.microstrain.com/inertial-sensors/3dm-cv7-ahrs): Inertial Measurement Unit (IMU) and Attitude Heading Reference System (AHRS)
- [`MicroStrain CV7-AR`](https://www.microstrain.com/inertial-sensors/3dmcv7-ar): Inertial Measurement Unit (IMU) and Vertical Reference Unit (VRU)

For more information, including user manuals and datasheets, please refer to the sensors product page.

## Where to Buy

MicroStrain sensors can be purchased through HBK's official [MicroStrain product page](https://www.microstrain.com/inertial-sensors/all-sensors) or through authorized distributors globally.
For large orders, custom requirements, or technical inquiries, reach out directly to [sales](https://www.microstrain.com/contact-sales)

## Hardware Setup

### Wiring

Connect the main UART port of the MicroStrain sensor to any unused serial port on the flight controller.
This port needs to be specified while starting the device.

### Mounting

The MicroStrain sensor can be mounted in any orientation.
The default coordinate system uses X for the front, Y for the right, and Z for down, with directions marked on the device.

## Firmware Configuration

### PX4 Configuration

To use the MicroStrain driver:

1. Include the module in firmware in the [kconfig board configuration](../hardware/porting_guide_config.md#px4-board-configuration-kconfig) by setting the kconfig variables: `CONFIG_DRIVERS_INS_MICROSTRAIN` or `CONFIG_COMMON_INS`.
2. Update the [EKF2_MULTI_IMU](../advanced_config/parameter_reference.md#EKF2_MULTI_IMU) parameter to account for the added MicroStrain sensor.
3. To prioritize MicroStrain sensor output, adjust the priority level of individual sensors from 0-100 using the following parameters:

   - [CAL_ACCn_PRIO](../advanced_config/parameter_reference.md#CAL_ACC0_PRIO)
   - [CAL_GYROn_PRIO](../advanced_config/parameter_reference.md#CAL_GYRO0_PRIO)
   - [CAL_MAGn_PRIO](../advanced_config/parameter_reference.md#CAL_MAG0_PRIO)
   - [CAL_BAROn_PRIO](../advanced_config/parameter_reference.md#CAL_BARO0_PRIO)

   where `n` corresponds to the index of the corresponding sensor.

   ::: tip
   Sensors can be identified by their device id, which can be found by checking the parameters:

   - [CAL_ACCn_ID](../advanced_config/parameter_reference.md#CAL_ACC0_ID)
   - [CAL_GYROn_ID](../advanced_config/parameter_reference.md#CAL_GYRO0_ID)
   - [CAL_MAGn_ID](../advanced_config/parameter_reference.md#CAL_MAG0_ID)
   - [CAL_BAROn_ID](../advanced_config/parameter_reference.md#CAL_BARO0_ID)

   :::

4. Reboot and start the driver

## MicroStrain Configuration

By default, accel and gyro data will be published 500 Hz, magnetometer at 50 Hz, and barometric pressure at 50 Hz.
This can be changed by adjusting the following parameters

- [MS_IMU_RATE_HZ](../advanced_config/parameter_reference.md#MS_IMU_RATE_HZ)
- [MS_MAG_RATE_HZ](../advanced_config/parameter_reference.md#MS_MAG_RATE_HZ)
- [MS_BARO_RATE_HZ](../advanced_config/parameter_reference.md#MS_BARO_RATE_HZ)

The driver will automatically configure data outputs based on the specific sensor model and available data streams.

## Published Data

The MicroStrain driver publishes sensor data which can be found on the following UOrb topics:

- [sensor_accel](../msg_docs/SensorAccel.md)
- [sensor_gyro](../msg_docs/SensorGyro.md)
- [sensor_mag](../msg_docs/SensorMag.md)
- [sensor_baro](../msg_docs/SensorBaro.md)

::: tip
Published topics can be viewed using the `listener` command.
:::

