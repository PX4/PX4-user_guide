---
canonicalUrl: https://docs.px4.io/main/ru/advanced_features/precland
---

# Precision Landing

PX4 supports precision landing for *multicopters* (from PX4 v1.7.4) using the [IR-LOCK Sensor](https://irlock.com/products/ir-lock-sensor-precision-landing-kit), an IR beacon (e.g. [IR-LOCK MarkOne](https://irlock.com/collections/markone)), and a downward facing range sensor. This enables landing with a precision of roughly 10 cm (GPS precision, by contrast, may be as large as several meters).

A precision landing can be initiated by entering the *Precision Land* flight mode, or as part of a [mission](#mission).

## Setup

### Hardware Setup

Install the IR-LOCK sensor by following the [official guide](https://irlock.readme.io/v2.0/docs). Ensure that the sensor's x axis is aligned with the vehicle's y axis and the sensor's y axis aligned with the vehicle's -x direction (this is the case if the camera is pitched down 90 degrees from facing forward).

Install a [range/distance sensor](../getting_started/sensor_selection.md#distance) (the *LidarLite v3* has been found to work well).

:::note
Many infrared based range sensors do not perform well in the presence of the IR-LOCK beacon. Refer to the IR-LOCK guide for other compatible sensors.
:::

### Firmware Configuration

Precision landing requires the modules `irlock` and `landing_target_estimator`, which are not included in the PX4 firmware by default. They can be included by adding (or uncommenting) the following lines in the relevant configuration file for your flight controller (e.g. [PX4-Autopilot/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)):

    drivers/irlock
    modules/landing_target_estimator
    

The two modules should also be started on system boot. For instructions see: [customizing the system startup](../concept/system_startup.md#customizing-the-system-startup).

## Software Configuration (Parameters)

Precision landing is configured with the `landing_target_estimator` and `navigator` parameters, which are found in the "Landing target estimator" and "Precision land" groups, respectively. The most important parameters are discussed below.

The parameter [LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE) determines if the beacon is assumed to be stationary or moving. If `LTEST_MODE` is set to moving (e.g. it is installed on a vehicle on which the multicopter is to land), beacon measurements are only used to generate position setpoints in the precision landing controller. If `LTEST_MODE` is set to stationary, the beacon measurements are also used by the vehicle position estimator (EKF2 or LPE).

The parameters [LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) and [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y) can be used to scale beacon measurements before they are used to estimate the beacon's position and velocity relative to the vehicle. Measurement scaling may be necessary due to lens distortions of the IR-LOCK sensor. Note that `LTEST_SCALE_X` and `LTEST_SCALE_Y` are considered in the sensor frame, not the vehicle frame.

To calibrate these scale parameters, set `LTEST_MODE` to moving, fly your multicopter above the beacon and perform forward-backward and left-right motions with the vehicle, while [logging](../dev_log/logging.md#configuration) `landing_target_pose` and `vehicle_local_position`. Then, compare `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel` to `vehicle_local_position.vx` and `vehicle_local_position.vy`, respectively (both measurements are in NED frame). If the estimated beacon velocities are consistently smaller or larger than the vehicle velocities, adjust the scale parameters to compensate.

If you observe slow sideways oscillations of the vehicle while doing a precision landing with `LTEST_MODE` set to stationary, the beacon measurements are likely scaled too high and you should reduce the scale parameter in the relevant direction.

## Precision Land Modes

A precision landing can be configured to either be "required" or "opportunistic". The choice of mode affects how a precision landing is performed.

### Required Mode

In *Required Mode* the vehicle will search for a beacon if none is visible when landing is initiated. The vehicle will perform a precision landing if a beacon is located.

The search procedure consists of climbing to the search altitude ([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). If the beacon is still not visible at the search altitude and after a search timeout ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT)), a normal landing is initiated at the current position.

### Opportunistic Mode

In *Opportunistic Mode* the vehicle will use precision landing *if* (and only if) the beacon is visible when landing is initiated. If it is not visible the vehicle immediately performs a *normal* landing at the current position.

## Performing a Precision Landing

:::note
Due to a limitation in the current implementation of the position controller, precision landing is only possible with a valid global position.
:::

### Via Command

Precision landing can be initiated through the command line interface with

    commander mode auto:precland
    

In this case, the precision landing is always considered "required".

<span id="mission"></span>

### In a Mission

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `param2` = 0: Normal landing without using the beacon.
- `param2` = 1: *Opportunistic* precision landing.
- `param2` = 2: *Required* precision landing.

## Simulation

Precision landing with the IR-LOCK sensor and beacon can be simulated in [SITL Gazebo](../simulation/gazebo.md).

To start the simulation with the world that contains a IR-LOCK beacon and a vehicle with a range sensor and IR-LOCK camera, run:

    make px4_sitl gazebo_iris_irlock
    

You can change the location of the beacon either by moving it in the Gazebo GUI or by changing its location in the [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42).

## Operating Principles

### Landing Target Estimator

The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon. In other words, the measurements are the x and y components of the vector pointing towards the beacon, where the z component has length "1". This means that scaling the measurement by the distance from the camera to the beacon results in the vector from the camera to the beacon. This relative position is then rotated into the north-aligned, level body frame using the vehicle's attitude estimate. Both x and y components of the relative position measurement are filtered in separate Kalman Filters, which act as simple low-pass filters that also produce a velocity estimate and allow for outlier rejection.

The `landing_target_estimator` publishes the estimated relative position and velocity whenever a new `irlock_report` is fused into the estimate. Nothing is published if the beacon is not seen or beacon measurements are rejected. The landing target estimate is published in the `landing_target_pose` uORB message.

### Enhanced Vehicle Position Estimation

If the beacon is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the beacon measurements. This is done by fusing the beacon's velocity as a measurement of the negative velocity of the vehicle.

### Precision Land Procedure

The precision land procedure consists of three phases:

1. **Horizontal approach:** The vehicle approaches the beacon horizontally while keeping its current altitude. Once the position of the beacon relative to the vehicle is below a threshold ([PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)), the next phase is entered. If the beacon is lost during this phase (not visible for longer than [PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

2. **Descent over beacon:** The vehicle descends, while remaining centered over the beacon. If the beacon is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

3. **Final approach:** When the vehicle is close to the ground (closer than [PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), it descends while remaining centered over the beacon. If the beacon is lost during this phase, the descent is continued independent of the kind of precision landing.

Search procedures are initiated in 1. and 2. a maximum of [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH) times.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)