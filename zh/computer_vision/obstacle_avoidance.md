# 避障功能

*避障功能* 使飞机沿预定路线前进时，能够自动绕开障碍物。

该功能需要运行计算机视觉软件的机载计算机。 该软件对期望路线重新规划，在导航绕开障碍物，并选取最佳路径。

避障功能适用于自动化模式，目前仅支持多旋翼飞行器的 [任务Missions](#mission_mode) 和 [Offboard](#offboard_mode) 模式。

本文将阐述怎样在这两种模式中设置自主避障功能。

## Offboard模式避障 {#offboard_mode}

PX4在 [Offboard模式](../flight_modes/offboard.md) 中支持避障功能。

期望路径来自在配套计算机上运行的一个 [ROS](http://dev.px4.io/en/ros/) 节点。 并传递给自主避障模块（另一个ROS节点）。 避障软件将规划路径通过 `SET_POSITION_TARGET_LOCAL_NED` 消息流发送给飞行控制栈。

> **Note** 唯一需要PX4这边的设置是将PX4切换到 *Offboard 模式* 。 PX4飞控并不知道发送 `SET_POSITION_TARGET_LOCAL_NED` 消息的信息源来自哪一个MAVLink系统。

功能测试所使用的软硬件是：运行*local_planner* 或 *global_planner*软件的 [Intel Aero](../flight_controller/intel_aero.md) 。 避障功能也支持Gazebo仿真测试。 配置方法详见[Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) 和[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)两个Github代码仓库。

## 任务模式避障 {#mission_mode}

PX4支持 [任务模式](../flight_modes/mission.md) 避障，需要使用一台独立的运行避障软件的机载计算机配合。

要启用自主避障功能，只需将PX4的 [MPC_OBS_AVOID](../advanced_config/parameter_reference.md#MPC_OBS_AVOID) [设置](../advanced_config/parameters.md)为1即可。 PX4 communicates with the obstacle avoidance software using an implementation of the MAVLink [Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) (Trajectory Interface) which is [#described below](#mission_avoidance_interface). Provided an avoidance system complies with this interface it can be used with PX4.

The tested companion computer platform is [Intel Aero](../flight_controller/intel_aero.md) running either the *local_planner* or *global_planner* avoidance software. 避障功能也支持Gazebo仿真测试。 配置方法详见[Intel Aero > Obstacle Avoidance](../flight_controller/intel_aero.md#obstacle-avoidance) 和[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)两个Github代码仓库。

### Mission Progression

Mission behaviour with obstacle avoidance enabled is *slightly different* to the original plan.

激活避障之后的不同之处有：

- A waypoint is "reached" when the vehicle is within the acceptance radius, regardless of its heading. 
  - This differs from normal missions, in which the vehicle must reach a waypoint with a certain heading (i.e. in a "close to" straight line from the previous waypoint). This constraint cannot be fulfilled when bstacle avoidance is active because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- PX4 starts emitting a new current/next waypoint once the previous waypoint is reached (i.e. as soon as vehicle enters its acceptance radius).
- If a waypoint is *inside* an obstacle it may unreachable (and the mission will be stuck). 
  - If the vehicle projection on the line previous-current waypoint passes the current waypoint, the acceptance radius is enlarged such that the current waypoint is set as reached
  - If the vehicle within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
- The original mission speed (as set in *QGroundControl*/PX4) is ignored. The speed will be determined by the avoidance software: 
  - *local planner* mission speed is around 3 m/s.
  - *global planner* mission speed is around 1-1.5 m/s.

如果PX4接收不到期望点，避障功能将被关闭，PX4将恢复普通[任务模式](../flight_modes/mission.md)。

### 任务模式避障接口 {#mission_avoidance_interface}

Mission mode is enabled on PX4 by setting `MPC_OBS_AVOID` to `1`.

PX4 sends the desired trajectory to the companion computer in [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.

The fields are set as shown:

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 3
- Current vehicle information: 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: x-y-z NED acceleration setpoint
  - `pos_yaw[0]`: Current yaw angle
  - `vel_yaw[0]`: NaN

- 当前航点：
  
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of *current* mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: Yaw setpoint
  - `vel_yaw[1]`: Yaw speed setpoint

- Next waypoint:
  
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of *next* mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: Yaw setpoint
  - `vel_yaw[2]`: Yaw speed setpoint
- All other indices/fields are set as NaN. 

PX4 expects to receive target setpoints in a stream of `TRAJECTORY_REPRESENTATION_WAYPOINTS` messages for the duration of the mission (not just when there are obstacles).

The fields for the message from the avoidance software are set as shown:

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 1
- 当前飞机信息： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED vehicle local position setpoint
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED velocity setpoint
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: Yaw angle setpoint
  - `vel_yaw[0]`: Yaw speed setpoint
- All other indices/fields are set as NaN. 

The rate at which target setpoints are sent depends on the capabilities of the planning software and the desired speed.

> **Note** Currently the *local planner* emits messages at ~30Hz and can move at around 3 m/s. The *global planner* emits messages at ~10Hz and mission speed is around 1-1.5 m/s.

The paragraphs below describe the behaviour in greater detail, covering the internal PX4 behaviour and message flow through ROS.

#### Mission模式更详细的行为描述

When a mission is uploaded from QGC and the parameter `MPC_OBS_AVOID` is set to `1`, PX4 fills the uORB message `vehicle_trajectory_waypoint_desired` as described below:

数组 `waypoints`：

- *index 0 :*
  
  - position: x-y-z NED vehicle local position
  - velocity: x-y-z NED velocity setpoint generated by the active FlightTask
  - Acceleration: vehicle acceleration
  - Yaw: vehicle yaw
  - Yaw_speed: NaN

- *index 1:*
  
  - position: x-y-z NED local coordinates of the current mission waypoint
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: yaw setpoint
  - Yaw_speed: yaw speed setpoint

- *Index2:*
  
  - position: x-y-z NED local coordinates of the next mission waypoint
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: yaw setpoint
  - Yaw_speed: yaw speed setpoint

The remaining indices are filled with NaN.

The message `vehicle_trajectory_waypoint_desired` is mapped into the MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [avoidance interface](#mission_avoidance_interface) above). The messages are sent at 5Hz.

MAVROS translates the MAVLink message into a ROS message called `mavros_msgs::trajectory` and does the conversion from NED to ENU frames. Messages are published on the ROS topic `/mavros/trajectory/desired`

On the avoidance side, the algorithm plans a path to the waypoint.

The position or velocity setpoints generated by the obstacle avoidance to get collision free to the waypoint can be sent to the Firmware with two ROS messages: `mavros_msgs::trajectory` (both velocity and position set points) on ROS topic `/mavros/trajectory/generated` `nav_msgs::Path` (only position setpoints) on ROS topic `/mavros/trajectory/path`

MAVROS converts the set points from ENU to NED frame and translates the ROS messages into a MAVLink message `TRAJECTORY_REPRESENTATION_WAYPOINTS`.

On the PX4 side, incoming `TRAJECTORY_REPRESENTATION_WAYPOINTS` are translated into uORB `vehicle_trajectory_waypoint` messages. The array waypoints contains all NAN expect for index 0:

- Position: position setpoint
- Velocity: velocity setpoint
- acceleration: NaN (acceleration setpoints are not supported by the Firmware)
- Yaw: yaw setpoint
- Yaw_speed: yaw speed setpoint

The setpoints are tracked by the multicopter position controller.

<!-- ## Further Information -->

<!-- @mrivi is expert! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->