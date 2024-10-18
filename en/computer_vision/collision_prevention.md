# Collision Prevention

_Collision Prevention_ may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes_mc/position.md), and can use sensor data from an offboard companion computer, offboard rangefinders over MAVLink, a rangefinder attached to the flight controller, or any combination of the above.

Collision prevention may restrict vehicle maximum speed if the sensor range isn't large enough!
It also prevents motion in directions where no sensor data is available (i.e. if you have no rear-sensor data, you will not be able to fly backwards).

:::tip
If high flight speeds are critical, consider disabling collision prevention when not needed.
:::

:::tip
Ensure that you have sensors/sensor data in all directions that you want to fly (when collision prevention is enabled).
:::

## Overview

_Collision Prevention_ is enabled on PX4 by setting the parameter for minimum allowed approach distance ([CP_DIST](#CP_DIST)).

The feature requires obstacle information from an external system (sent using the MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) and/or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

::: info
Multiple sensors can be used to get information about, and prevent collisions with, objects _around_ the vehicle.
If multiple sources supply data for the _same_ orientation, the system uses the data that reports the smallest distance to an object.
:::

The vehicle restricts the current velocity in order to slow down as it gets closer to obstacles and adapts the acceleration setpoint in order to disallow collision trajectories.
In order to move away from (or parallel to) an obstacle, the user must command the vehicle to move toward a setpoint that does not bring the vehicle closer to the obstacle.
The algorithm will make minor adjustments to the setpoint direction if it is determined that a "better" setpoint exists within a fixed margin on either side of the requested setpoint.

Users are notified through _QGroundControl_ while _Collision Prevention_ is actively controlling velocity setpoints.

PX4 software setup is covered in the next section.
If you are using a distance sensor attached to your flight controller for collision prevention, it will need to be attached and configured as described in [PX4 Distance Sensor](#rangefinder).
If you are using a companion computer to provide obstacle information see [companion setup](#companion).

## PX4 (Software) Setup

Configure collision prevention by [setting the following parameters](../advanced_config/parameters.md) in _QGroundControl_:

| Parameter                                                                                          | Description                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)                   | Set the minimum allowed distance (the closest distance that the vehicle can approach the obstacle). Set negative to disable _collision prevention_. <br>> **Warning** This value is the distance to the sensors, not the outside of your vehicle or propellers. Be sure to leave a safe margin! |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)                | Set the sensor and velocity setpoint tracking delay. See [Delay Tuning](#delay_tuning) below.                                                                                                                                                                                                   |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)    | Set the angle (to both sides of the commanded direction) within which the vehicle may deviate if it finds fewer obstacles in that direction. See [Guidance Tuning](#angle_change_tuning) below.                                                                                                 |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | Set to 1 to allow the vehicle to move in directions where there is no sensor coverage (default is 0/`False`).                                                                                                                                                                                   |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)    | Set to `Acceleration based` (default), Implementation in  `Direct velocity` or `Smoothed velocity` has been removed.                                                                                                                                                                                                                   |

## Algorithm Description

The data from all sensors are fused into an internal representation of 36 sectors around the vehicle, each containing either the sensor data and information about when it was last observed, or an indication that no data for the sector was available.
When the vehicle is commanded to move in a particular direction, all sectors in the hemisphere of that direction are checked to see if the movement will bring the vehicle closer to any obstacles.
If so, the vehicle velocity is restricted.

This velocity restriction takes into account both the inner velocity loop tuned by [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P), as well as the [jerk-optimal velocity controller](../config_mc/mc_jerk_limited_type_trajectory.md) via [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR).
The velocity is restricted such that the vehicle will stop in time to maintain the distance specified in [CP_DIST](#CP_DIST).
The range of the sensors for each sector is also taken into account, limiting the velocity via the same mechanism.
the restricted velocity is then transformed into an acceleration with [MPC_XY_VEL_P_ACC](../advanced_config/parameter_reference.md#MPC_XY_VEL_P_ACC).

::: info
If there is no sensor data in a particular direction, velocity in that direction is restricted to 0 (preventing the vehicle from crashing into unseen objects).
If you wish to move freely into directions without sensor coverage, this can be enabled by setting [CP_GO_NO_DATA](#CP_GO_NO_DATA) to 1.
:::

The delay associated with collision prevention, both in the vehicle tracking velocity setpoints and in receiving sensor data from external sources, is conservatively estimated via the [CP_DELAY](#CP_DELAY) parameter.
This should be [tuned](#delay_tuning) to the specific vehicle.

If the sectors adjacent to the commanded sectors are 'better' by a significant margin, the direction of the requested input can be modified by up to the angle specified in [CP_GUIDE_ANG](#CP_GUIDE_ANG).
This helps to fine-tune user input to 'guide' the vehicle around obstacles rather than getting stuck against them.

### Range Data Loss

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning _No range data received, no movement allowed_.
This will force the velocity setpoints in xy to zero.
After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes_mc/hold.md).
If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes_mc/position.md) (e.g. to _Altitude mode_ or _Stabilized mode_).

If you have multiple sensors connected and you lose connection to one of them, you will still be able to fly inside the field of view (FOV) of the reporting sensors.
The data of the faulty sensor will expire and the region covered by this sensor will be treated as uncovered, meaning you will not be able to move there.

:::warning
Be careful when enabling [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), which allows the vehicle to fly outside the area with sensor coverage.
If you lose connection to one of multiple sensors, the area covered by the faulty sensor is also treated as uncovered and you will be able to move there without constraint.
:::

### CP_DELAY Delay Tuning {#delay_tuning}

There are two main sources of delay which should be accounted for: _sensor delay_, and vehicle _velocity setpoint tracking delay_.
Both sources of delay are tuned using the [CP_DELAY](#CP_DELAY) parameter.

The _sensor delay_ for distance sensors connected directly to the flight controller can be assumed to be 0.
For external vision-based systems the sensor delay may be as high as 0.2s.

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop.
The delay between the actual velocity and the velocity setpoint can then be measured from the logs.
The tracking delay is typically between 0.1 and 0.5 seconds, depending on vehicle size and tuning.

:::tip
If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.
:::

### CP_GUIDE_ANG Guidance Tuning {#angle_change_tuning}

Depending on the vehicle, type of environment and pilot skill different amounts of guidance may be desired.
Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded.
Increasing this parameter will let the vehicle choose optimal directions to avoid obstacles, making it easier to fly through tight gaps and to keep the minimum distance exactly while going around objects.

If this parameter is too small the vehicle may feel 'stuck' when close to obstacles, because only movement away from obstacles at minimum distance are allowed.
If the parameter is too large the vehicle may feel like it 'slides' away from obstacles in directions not commanded by the operator.
From testing, 30 degrees is a good balance, although different vehicles may have different requirements.

::: info
The guidance feature will never direct the vehicle in a direction without sensor data.
If the vehicle feels 'stuck' with only a single distance sensor pointing forwards, this is probably because the guidance cannot safely adapt the direction due to lack of information.
:::

## PX4 Distance Sensor {#rangefinder}

### Lanbao PSK-CM8JL65-CC5

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

### LightWare LiDAR SF45 Rotating Lidar

PX4 v1.14 (and later) supports the [LightWare LiDAR SF45](https://www.lightwarelidar.com/shop/sf45-b-50-m/) rotating lidar which provides 320 degree sensing.

The SF45 must be connected via a UART/serial port and configured as described below (In addition to the [collision prevention setup](#px4-software-setup)).

[LightWare Studio](https://www.lightwarelidar.com/resources-software) configuration:

- In the LightWare Studio app enable scanning, set the scan angle, and change the baud rate to `921600`.

PX4 Configuration:

- Add the [lightware_sf45_serial](../modules/modules_driver_distance_sensor.md#lightware-sf45-serial) driver in [menuconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup):
  - Under **drivers > Distance sensors** select `lightware_sf45_serial`.
  - Recompile and upload to the flight controller.
- [Set the following parameters](../advanced_config/parameters.md) via QGC:
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to.
    Make sure GPS or Telemetry are not enabled on this port.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

The obstacle overlay in QGC will look like this:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Rangefinder Support

Other sensors may be enabled, but this requires modification of driver code to set the sensor orientation and field of view.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- Modify the driver to set the orientation.
  This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179).
Please contribute back your changes!
:::

## Companion Setup {#companion}

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

::: info
Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system).
The system may work well at significantly higher speeds and lower frequency distance updates.
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
This repository is archived/no longer maintained.
For more information on hardware and software setup see: [PX4/PX4-Avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo Simulation

_Collision Prevention_ can be tested using [Gazebo](../sim_gazebo_gz/index.md) with the [x500_lidar](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar) model.
To do this, start a simulation with the x500 lidar model by running the following command:

```sh
make px4_sitl gz_x500_lidar
```

Next, adjust the relevant parameters to the appropriate values and add arbitrary obstacles to your simulation world to test the collision prevention functionality.

The diagram below shows how the simulation looks when viewed in Gazebo.

![RViz image of collision detection using the x500_lidar model in Gazebo](../../assets/simulation/gazebo/vehicles/x500_lidar_viz.png)

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->
<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
<!-- using rangefinder? -->
