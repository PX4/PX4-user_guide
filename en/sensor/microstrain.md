# MicroStrain (INS, IMU, VRU, ARHS)

MicroStrain by HBK provides high-performance inertial sensors engineered for reliability and precision in challenging environments.
Widely used across industries like aerospace, robotics, industrial automation, and research, MicroStrain sensors are optimized for real-time, accurate motion tracking and orientation data.

![CV7](../../assets/hardware/sensors/inertial/microstrain_3dm_cv7_hbk.png)

The driver currently supports the following hardware:

- [`MicroStrain CV7-AHRS`](https://www.microstrain.com/inertial-sensors/3dm-cv7-ahrs): Inertial Measurement Unit (IMU) and Attitude Heading Reference System (AHRS)
- [`MicroStrain CV7-AR`](https://www.microstrain.com/inertial-sensors/3dmcv7-ar): Inertial Measurement Unit (IMU) and Vertical Reference Unit (VRU)
- [`MicroStrain CV7-INS`](https://www.microstrain.com/inertial-sensors/3dmcv7-ins): Inertial Measurement Unit (IMU) and Inertial Navigation System (INS).

PX4 can use these sensors to provide raw IMU data for EKF2 or to replace EKF2 as an external INS.
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
2. Configure the driver mode by setting [MS_MODE](../advanced_config/parameter_reference.md#MS_MODE)
   - To use the MicroStrain sensor to provide raw IMU data to EKF2
     1. Set [MS_MODE](../advanced_config/parameter_reference.md#MS_MODE) to 0
     2. Update the [EKF2_MULTI_IMU](../advanced_config/parameter_reference.md#EKF2_MULTI_IMU) parameter to account for the added MicroStrain sensor.
     3. Enable EKF2 by setting [EKF_EN]((../advanced_config/parameter_reference.md#MS_MODE)) to 1
     4. To prioritize MicroStrain sensor output, adjust the priority level of individual sensors from 0-100 using the following parameters:

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

   - To use the MicroStrain sensor as an external INS
     1. Set [MS_MODE](../advanced_config/parameter_reference.md#MS_MODE) to 1
     2. Disable EKF2 by setting [EKF_EN]((../advanced_config/parameter_reference.md#MS_MODE)) to 0 

3. Reboot and start the driver
   - `microstrain start -d <port>`

## MicroStrain Configuration

1. Rates:
   - By default, accel and gyro data will be published 500 Hz, magnetometer at 50 Hz, and barometric pressure at 50 Hz.
     This can be changed by adjusting the following parameters

     - [MS_IMU_RATE_HZ](../advanced_config/parameter_reference.md#MS_IMU_RATE_HZ)
     - [MS_MAG_RATE_HZ](../advanced_config/parameter_reference.md#MS_MAG_RATE_HZ)
     - [MS_BARO_RATE_HZ](../advanced_config/parameter_reference.md#MS_BARO_RATE_HZ)

   - Similarly global position, local position, attitude and odometry will be published at 250 Hz by default.
     This can be changed by adjusting

     - [MS_FILT_RATE_HZ](../advanced_config/parameter_reference.md#MS_IMU_RATE_HZ)

   - The driver will automatically configure data outputs based on the specific sensor model and available data streams.

2. Aiding measurements:
   - If supported, GNSS position and velocity aiding are always enabled.
   - Internal magnetometer aiding, Internal heading aiding and External heading aiding are disabled by default and can be enabled using the following parameters

     - [MS_INT_MAG_EN](../advanced_config/parameter_reference.md#MS_INT_MAG_EN)
     - [MS_INT_HEAD_EN](../advanced_config/parameter_reference.md#MS_INT_HEAD_EN)
     - [MS_EXT_HEAD_EN](../advanced_config/parameter_reference.md#MS_EXT_HEAD_EN)

   ::: tip
   If the MicroStrain sensor does not support these aiding sources but they are enabled. Initialization of the sensor will fail.

   :::

3. Initial heading alignment:
   - Initial heading alignment is set to kinematic by default and can be changed by adjusting

     - [MS_ALIGNMENT](../advanced_config/parameter_reference.md#MS_ALIGNMENT)

4. Sensor to vehicle transform:
   - If the sensor is mounted in a different orientation to the vehicle frame. A sensor to vehicle transform can be enabled using

     - [MS_SVT_EN](../advanced_config/parameter_reference.md#MS_SVT_EN)

   - The transform is described by setting the following parameters

     - [MS_SENSOR_ROLL](../advanced_config/parameter_reference.md#MS_SENSOR_ROLL)
     - [MS_SENSOR_PTCH](../advanced_config/parameter_reference.md#MS_SENSOR_PTCH)
     - [MS_SENSOR_YAW](../advanced_config/parameter_reference.md#MS_SENSOR_YAW)

5. IMU ranges:
   - The ranges of the accelerometer and gyroscope on the device are configurable. They can be changed by adjusting the following parameters

     - [MS_ACCEL_RANGE](../advanced_config/parameter_reference.md#MS_ACCEL_RANGE)
     - [MS_GYRO_RANGE](../advanced_config/parameter_reference.md#MS_GYRO_RANGE)

   ::: tip
   The available range settings depend on the [sensor](https://www.microstrain.com/inertial-sensors/all-sensors) and can be found in the corresponding user manual.
   By default the ranges will not be changed.

   :::

6. Lever arm offsets:
   - The lever arm offset for the external GNSS receiver can be changed by adjusting the following parameters

     - [GNSS_OFFSET1_X](../advanced_config/parameter_reference.md#GNSS_OFFSET1_X)
     - [GNSS_OFFSET1_Y](../advanced_config/parameter_reference.md#GNSS_OFFSET1_Y)
     - [GNSS_OFFSET1_Z](../advanced_config/parameter_reference.md#GNSS_OFFSET1_Z)

   - In the case of a dual antenna setup, the following parameters can be adjusted for the second GNSS receiver

     - [GNSS_OFFSET2_X](../advanced_config/parameter_reference.md#GNSS_OFFSET2_X)
     - [GNSS_OFFSET2_Y](../advanced_config/parameter_reference.md#GNSS_OFFSET2_Y)
     - [GNSS_OFFSET2_Z](../advanced_config/parameter_reference.md#GNSS_OFFSET2_Z)



## Published Data

The MicroStrain driver will always publish sensor data to the following UOrb topics:

- [sensor_accel](../msg_docs/SensorAccel.md)
- [sensor_gyro](../msg_docs/SensorGyro.md)
- [sensor_mag](../msg_docs/SensorMag.md)
- [sensor_baro](../msg_docs/SensorBaro.md)

If used as an external INS replacing EKF2, it publishes:

- [vehicle_global_position](../msg_docs/VehicleGlobalPosition.md)
- [vehicle_local_position](../msg_docs/VehicleLocalPosition.md)
- [vehicle_attitude](../msg_docs/VehicleAttitude.md)
- [vehicle_odometry](../msg_docs/VehicleOdometry.md)

otherwise the same data is published to the following topics

- `external_ins_global_position`
- `external_ins_attitude`
- `external_ins_local_position`
  
::: tip
Published topics can be viewed using the `listener` command.
:::

