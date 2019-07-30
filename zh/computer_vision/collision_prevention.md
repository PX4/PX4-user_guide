# 防撞功能

*防撞*功能用于自动减速或制动，以免飞机撞上障碍物。

It can be enabled for multicopter vehicles in [Position mode](../flight_modes/position_mc.md), and can use sensor data from an offboard companion computer, a rangefinder attached to the flight controller, or both (fused).

> **Warning**如果您的飞机速度太快，防撞功能可能无法达到预期效果。 (在编写本文档的阶段) 此功能仅在速度不超过4m/s的飞机上测试过。

## 综述

要在PX4上开启/配置*防撞*功能，请设置参数：最小安全间距（[MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D)）。

The feature requires obstacle information from either an external system (sent using the MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

> **Note** Multiple sensors can be used to get information about, and prevent collisions with, objects *around* the vehicle. If multiple sources supply data for the *same* orientation, the system uses the data that reports the smallest distance to an object.

飞机一旦检测到障碍物就开始制动。 朝向障碍物的速度设定值将线性降低，在达到最小安全距离时将降低为零。 如果 (由于过冲或者外力) 飞机越过最小安全距离，动力系统将启动反向推力使飞机远离障碍物。

但只有 *朝向* 障碍物的速度分量才会受到影响。 如果遥控器发出沿障碍物切线方向移动的指令，将正常执行。 因此，如果载具以一定角度接近障碍物，载具会逐渐减速，直到最小安全距离，然后沿着平行于表面的方向“滑行”，直到原运动方向恢复畅通。

当 *防撞*功能主动调整速率设定值时，通过 *QGroundControl* 用户会收到通知。

## PX4 (软件) 设置

Enabled collision prevention by [setting the following parameter](../advanced_config/parameters.md) in *QGroundControl*:

- [MPC_COL_PREV_D](../advanced_config/parameter_reference.md#MPC_COL_PREV_D) - 设置最小安全距离（飞机靠近障碍物的最小距离）。 设置为负值将禁用 *防撞* 功能。
    
    调参应根据*期望* 的最小距离与飞机大致的速度。

If you are using a distance sensor attached to your flight controller for collision prevention, it will need to be [attached and configured](#rangefinder) as described in the next section. If you are using a companion computer to provide obstacle information see [companion setup](#companion).

## PX4 Distance Sensor {#rangefinder}

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using `MPC_COL_PREV_D`).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

<!-- ROTATION_FORWARD_FACING - Does it matter what angles? - ie is collision prevention active in 3 D? -->

Other sensors may be enabled, but this requires modification of driver code to set the sensor orientation and field of view.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using `MPC_COL_PREV_D`.
- Modify the driver to set the orientation. This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor *module.yaml* file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the *field of view* in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

> **Tip** You can see the required modifications from the [feature PR](https://github.com/PX4/Firmware/pull/12179). Please contribute back your changes!

## Companion Setup {#companion}

If using a companion computer, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages when an obstacle is detected.

The minimum rate at which messages *must* be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

> **Info** Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 30Hz (the maximum rate supported by the vision system). The system may work well at significantly higher speeds and lower frequency distance updates.

The tested hardware/software platform is [Auterion IF750A](https://auterion.com/if750a/) reference multicopter running the *local_planner* avoidance software from the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo.

The hardware and software should be set up as described in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) repo. In order to emit `OBSTACLE_DISTANCE` messages you must use the *rqt_reconfigure* tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo设置

*Collision Prevention* can also be tested using Gazebo. See [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) for setup instructions.

<!-- PR companion collision prevention (initial): https://github.com/PX4/Firmware/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/Firmware/pull/12179 -->