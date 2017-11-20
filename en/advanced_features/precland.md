# Precision Landing

PX4 supports precision landing for multicopters with the [IRLock](https://irlock.com/products/ir-lock-sensor-precision-landing-kit) sensor, an IRLock beacon, and a downward facing range sensor.
This enables landing with a precision of roughly 10 cm, as opposed to the precision given by GPS, which may be several meters.

A precision landing can be initiated by entering the Precision Land flight mode, or as part of a mission uploaded via MAVLink.

## Setup
### Hardware Setup
Install the IRLock sensor according to the official [IRLock guide](https://irlock.readme.io/v2.0/docs). Ensure that the sensor's x axis is aligned with the vehicle's y axis and the sensor's y axis aligned with the vehicle's -x direction. (This is the case if the camera is pitched down 90 degrees from facing forward.)

Install a [range sensor](../getting_started/sensor_selection.md#distance).
Note that many infrared based range sensors do not perform well in the presence of the IRLock beacon.
A sensor that has been found to work well is the LidarLite v3.
Also refer to the IRLock guide for suggested sensors.

### Software Setup
Precision landing requires the modules `irlock` and `landing_target_estimator` which are not included in the firmware by default.
Add them by adding or uncommenting the following lines in the relevant [config](https://github.com/PX4/Firmware/tree/master/cmake/configs) of your flight controller:

```
drivers/irlock
modules/landing_target_estimator
```

Start the two modules by [customizing the system startup](https://dev.px4.io/en/advanced/system_startup.html#starting-additional-applications).

## Parameters
Precision landing is configured with parameters of the `landing_target_estimator` and `navigator`, which are found in the "Landng target estimator" and "Precision land" groups, respectively.
The most important parameters are discussed below.

The parameter `LTEST_MODE` determines if the beacon is assumed to be stationary or moving.
If `LTEST_MODE` is set to moving (e.g. it is installed on a vehicle on which the multicopter is to land), beacon measurements are only used to generate position setpoints in the precision landing controller.
If `LTEST_MODE` is set to stationary, the beacon measurements are also used by LPE.

The parameters `LTEST_SCALE_X` and `LTEST_SCALE_Y` can be used to scale beacon measurements before they are used to estimate the beacon's position and velocity relative to the vehicle.
Measurement scaling may be necessary due to lens distortions of the IRLock sensor.
Note that `LTEST_SCALE_X` and `LTEST_SCALE_Y` are considered in the sensor frame, not the vehicle frame.

To calibrate these scale parameters, set `LTEST_MODE` to moving, fly your multicopter above the beacon and perform forward-backward and left-right motions with the vehicle, while [logging](https://dev.px4.io/en/log/logging.html#configuration) `landing_target_pose` and `vehicle_local_position`.
Then, compare `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel` to `vehicle_local_position.vx` and `vehicle_local_position.vy`, respectively (both measurements are in NED frame). If the estimated beacon velocities are consistently smaller or larger than the vehicle velocities, adjust the scale parameters to compensate.

If you are observing slow sideways oscillations of the vehicle while doing a precision landing with `LTEST_MODE` set to stationary, the beacon measurements are likely scaled too high and you should reduce the scale parameter in the relevant direction.

## Precision Land Modes
A precision landing can be configured to either be "required" or "opportunistic". The choice of mode affects how a precision landing is performed.

When a precision landing is "required", a search procedure is initiated if the beacon is not visible at the beginning of the precision land procedure. The search procedure consists of climbing to an altitude specified with the `PLD_SRCH_ALT` parameter. If the beacon is still not visible at the search altitude and after a serach timeout (`PLD_SRCH_TOUT`) has passed, a normal landing is initiated at the current position.
As soon as the beacon is visible during the search procedure, the search is stopped and the precision land approach is started.

When a precision landing is "opportunistic", no search procedure is used. If the beacon is visible at the beginning of the precision land procedure, the precision land approach is started. If it is not visible at the beginning, the vehicle falls back to a normal landing at the current position immediately.

The following section describes how to configure the precision land mode.

## Performing a precision landing
### Via Command
Precision landing can be initiated through the command line interface with
```
commander mode auto:precland
```
In this case, the precision landing is always considered "required".

### In a Mission
Precision landing can be initiated as part of a mission by appropriately setting `param2` of a `MAV_CMD_NAV_LAND`.
Depeding on the value of `param2`, the landing behavior is different.

- `param2` = 0: Normal landing without using the beacon.
- `param2` = 1: Opportunistic precision landing.
- `param2` = 2: Required precision landing.

## Working Principle
### Landing Target Estimator
The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon. In other words, the measurements are the x and y components of the vector pointing towards the beacon, where the z component has length 1.
This means that scaling the measurement by the distance from the camera to the beacon results in the vector from the camera to the beacon.
This relative position is then rotated into the north-aligned, level body frame using the vehicle's attitude estimate.
Both x and y components of the relative position measurement are filtered in separate Kalman Filters, which act as simple low-pass filters that also produce a velocity estimate and allow for outlier rejection.

The `landing_target_estimator` publishes the estimated relative position and velocity, whenever a new `irlock_report` is fused into the estimate. Nothing is published if the beacon is not seen or beacon measurements are rejected.
The landing target estimate is published in the `landing_target_pose` uORB message.

### Enhanced Vehicle Position Estimation
> **Note** Enhanced vehicle position estimation is currently only supported with LPE.

If the beacon is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the beacon measurements.
This is done by fusing the beacon's velocity as a measurement of the negative velocity of the vehicle.

### Precision Land Procedure
The precision land procedure consists of three phases.

1. Horizontal approach: The vehicle approaches the beacon horizontally while keeping its current altitude. Once the position of the beacon relative to the vehicle is below a threshold (`PLD_HACC_RAD`), the next phase is entered. If the beacon is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).
2. Descent over beacon: The vehicle descends, while remaining centered over the beacon. If the beacon is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).
3. Final approach: When the vehicle is close to the ground (closer than `PLD_FAPPR_ALT`), it descends while remaining centered over the beacon. If the beacon is lost during this phase, the descent is continued independent of the kind of precision landing.

Search procedures are initiated in 1. and 2. a maximum of `PLD_MAX_SRCH` times.

![](../../assets/precision_land/precland-flow-diagram.png)

## Simulation
Precision landing with the IRLock sensor and beacon can be simulated in [SITL Gazebo](https://dev.px4.io/en/simulation/gazebo.html).

To start the simulation with the world that contains a IRLock beacon and a vehicle with a range sensor and IRLock camera, run:

```
make posix_sitl_default gazebo_iris_irlock
```
This runs PX4 with the default configuration, i.e. using EKF2. Therefore, enhanced vehicle position estimation is not supported. To test out this feature, run:

```
make posix_sitl_lpe gazebo_iris_irlock
```

You can change the location of the beacon either by moving it in the Gazebo GUI or by changing its location in the [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42).