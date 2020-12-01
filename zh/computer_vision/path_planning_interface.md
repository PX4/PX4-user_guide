# 路径规划接口

PX4使用多个MAVLink接口来整合机载计算机的路径规划服务（包括在执行航线任务时避障，[安全着陆](../computer_vision/safe_landing.md)和未来服务）：

- 有两个 [MAVLink 路径规划协议](https://mavlink.io/en/services/trajectory.html) 接口： 
  - [TRAJECTORY_REPRESTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): 被 PX4 用于发送 *期望路径*。 可能会被路径规划软件用于向 PX4 发送 *所规划路径* 的设定点数据流。
  - [TRAJECTORY_REPRESTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) 可能（或者）被路径规划软件用来以贝塞尔曲线的形式向PX4发送*所规划路径*。 曲线表示给定时间段内机体（移动的）位置设定值。
- [HEARTBEAT/连接协议](https://mavlink.io/en/services/heartbeat.html) 用于检测“生命证明”。
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) and [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) 分别用来发送飞行器本地位置和高度。

如果 [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID) ，那么 PX4 的路径规划功能会在自动模式 （着陆、起飞、持有、飞行任务、返回）下启用 。 在这些模式中，路径规划软件将为 PX4 提供预设航点；如果软件无法支持特定的飞行模式，则必须将设定值从机体上向下一个位置镜像。

> **提示** 所有通过 MAVLink 在 PX4 UORB 话题和 ROS 话题间双向传送的消息流都记录在 [PX4/evidence > Message Flows](https://github.com/PX4/avoidance#message-flows) 文件中：

所有使用此接口的服务均发送并且接收相同类型/格式的消息。 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。

> **提示** 推荐使用 [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) 来开发路径规划软件。 它预安装了 [ PX4 避障](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 软件，可以用作您自己算法的基础。

## PX4 配置

通过将 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) [设置](../advanced_config/parameters.md)为 1 即可启用 PX4 的路径规划功能。

## 机载计算机设置

机载计算机端的硬件设置和软硬件配置在 Github 代码仓库 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 中已经提供。

实际需要的设置/配置取决于所用的规划器。

> **警告** 一次只能有一个规划期在机载计算机上运行（在写入时）。 这意味着不能在同一个机体上同时启用不同规划器的上位机功能。 （例如，在一个机体启用避障和防撞时，就不能执行安全着陆了，反之亦然）。

<span id="waypoint_interface"></span>

## 轨迹接口

PX4 将 *期望路径* 的相关信息发送给机载计算机（当在 *自动* 模式下，`COM_OBS_AVOID=1` 时）， 并从路径规划软件接收*所规划路径* 的设定点数据流。

The desired path information is sent by PX4 using [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages, as described below in [PX4 Waypoint Interface](#px4_waypoint_interface).

Path planner software sends back setpoints for the *planned path* using either `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [Companion Waypoint Interface](#companion_waypoint_interface)) or [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) (see [Companion Bezier Trajectory Interface](#bezier_interface)). The difference is that the waypoint just specifies the next setpoint destination, while the bezier trajectory describes the exact vehicle motion (i.e. a setpoint that moves in time).

> **Warning** Route planning software should not mix these interfaces while executing a task (PX4 will use the last received message of either type).

<span id="px4_waypoint_interface"></span>

### PX4 Waypoint Interface

PX4 sends the desired path in [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages at 5Hz.

The fields set by PX4 as shown:

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 3
- Point 0 - Current waypoint *type adapted* by FlightTaskAutoMapper (see [notes below](#type_adapted)): 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: Type adapted x-y-z NED local position of *current* mission waypoint.
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: Type adapted x-y-z NED local velocity of *current* mission waypoint.
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 当前航向角
  - `vel_yaw[0]`: NaN
  - `command[0]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint. 
- Point 1 - Current waypoint (Unmodified/not type adapted)): 
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED 坐标系下的 *当前* 任务航点位置坐标
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: 航向设定值
  - `vel_yaw[1]`: 偏航速率设定值
  - `command[1]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the current waypoint.
- Point 2 - Next waypoint in local coordinates (unmodified/not type adapted): 
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED 坐标系 *下一个* 任务航点位置坐标
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: 航向设定值
  - `vel_yaw[2]`: 偏航速率设定值
  - `command[2]`: The [MAVLink Command](https://mavlink.io/en/messages/common.html#mav_commands) for the next waypoint.
- 所有其它字段都是NaN(未定义)。

<span id="type_adapted"></span>
备注：

- Point 0 is the current waypoint/target modified based on the type of target. For example, it makes sense when landing to specify the target x, y coordinates and a descent velocity. To achieve this `FlightTaskAutoMapper` modifies land waypoints in Point 0 to set the z component of position to NAN and the z-velocity to a desired value.
- Point 1 and 2 are not used by the safe landing planner.
- Point 1 is used by local and global planner.

<span id="companion-failure-handling"></span>

#### Handling of Companion Failure

PX4 safely handles the case where messages are not received from the offboard system:

- If no planner is running and `COM_OBS_AVOID` is enabled at/from boot: 
  - preflight checks will fail (irrespective of vehicle mode) and it won't fly until `COM_OBS_AVOID` is set to 0.
- If no planner is running and `COM_OBS_AVOID` is enabled after boot: 
  - the vehicle will run normally in manual modes.
  - if you switch to an autonomous mode (e.g. Land Mode) it will immediately fall back to [Hold mode](../flight_modes/hold.md).
- When external path planning is enabled: 
  - if the `HEARTBEAT` is lost PX4 will emit a status message (which is displayed in *QGroundControl*) stating either "Avoidance system lost" or "Avoidance system timeout" (depending on the vehicle state). This is irrespective of the current flight mode.
  - if a trajectory message is not received for more than 0.5 seconds and the vehicle is in an autonomous mode (Return, Mission, Takeoff, Land), the vehicle will switch into [Hold mode](../flight_modes/hold.md). > **Note** A planner must always provide points in this timeframe. 
    - A planner will mirror back setpoints it receives when the vehicle is in a mode/state for which it doesn't provide path planning. (i.e. the vehicle will follow its desired path, delayed by a very small amount).
  - If the execution time of the last-supplied bezier trajectory expires during path planning (when using the [Bezier Trajectory Interface](#bezier_interface)), this is treated the same as not getting a new message within 0.5 seconds (i.e. vehicle switches to [Hold mode](../flight_modes/hold.md)).

<span id="companion_waypoint_interface"></span>

## Companion Waypoint Interface

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages that have the setpoint in Point 0.

The fields for the messages from the companion computer are set as shown:

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 1
- 当前飞机信息： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED坐标系下的载具位置设定值
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED 坐标系下速度设定值
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 航向角设定值
  - `vel_yaw[0]`: 偏航速率设定值
  - `command[0]`: NaN.
- 所有其它字段都是NaN(未定义)。

A planner that implements this interface must:

- Emit setpoints at more than 2Hz when receiving messages from PX4. PX4 will enter [Hold mode](../flight_modes/hold.md) if no message is received for more than 0.5s.
- Mirror back setpoints it receives when it doesn't support planning for the current vehicle state (e.g. the local planner would mirror back messages sent during safe landing, because it does not support Land mode).

<span id="bezier_interface"></span>

## Companion Bezier Trajectory Interface

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) messages.

The message defines the path that the vehicle should follow in terms of a curve (defined by the control points), starting at the message `timestamp` and reaching the final point after time `delta`. PX4 calculates its new setpoint (the expected current position/velocity/acceleration along the curve) using the time that the message was sent, the current time, and the total time for the curve (delta).

> **Note** For example, say the message was sent 0.1 seconds ago and `delta` (curve duration) is 0.3s. PX4 can calculate its setpoint at the 0.1s position in the curve.

In more detail, the `TRAJECTORY_REPRESENTATION_BEZIER` is parsed as follows:

- The number of bezier control points determines the degree of the bezier curve. For example, 3 points makes a quadratic bezier curve with constant acceleration.
- The bezier curve must be the same degree in x, y, z, and yaw, with all bezier control points finite
- The `delta` array should have the value corresponding with the last bezier control point indicate the duration that the waypoint takes to execute the curve to that point, from beginning to end. Other values in the `delta` array are ignored.
- The timestamp of the MAVLink message should be the time that the curve starts, and communication delay and clock mismatch will be compensated for on the flight controller via the timesync mechanism.
- The control points should all be specified in local coordinates ([MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- Bezier curves expire after the execution time of the bezier curve has been reached. Ensure that new messages are sent at a high enough rate/with long enough execution time that this does not happen (or the vehicle will switch to Hold mode).

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi and @jkflying are the experts! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for MAVLink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->