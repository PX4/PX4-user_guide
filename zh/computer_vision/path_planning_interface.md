# 路径规划接口

PX4 使用数个 MAVLink 接口来整合机载计算机的路径规划服务（包括在执行航线任务时避障，[安全着陆](../computer_vision/safe_landing.md)和未来的一些服务）：

- 有两个 [MAVLink 路径规划协议](https://mavlink.io/en/services/trajectory.html) 接口： 
  - [TRAJECTORY_REPRESTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): 被 PX4 用于发送 *期望路径*。 可能会被路径规划软件用于向 PX4 发送 *所规划路径* 的设定点数据流。
  - [TRAJECTORY_REPRESTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) 可能（或者）被路径规划软件用来以贝塞尔曲线的形式向PX4发送*所规划路径*。 曲线表示给定时间段内机体（移动的）位置设定值。
- [HEARTBEAT（心跳包）/连接协议](https://mavlink.io/en/services/heartbeat.html) 用于检测“生命证明”。
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) 和 [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) 分别用来发送机体本地位置和高度。

如果 [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID)，那么 PX4 的路径规划功能会在自动化模式 （着陆Landing、起飞Takeoff、保持Hold、任务Mission、返回Return）下启用 。 在这些模式中，路径规划软件将为 PX4 提供预设航点；如果软件无法支持特定的飞行模式，则必须将设定值从机体上向下一个位置镜像。

> **Tip** 所有通过 MAVLink 在 PX4 UORB 话题和 ROS 话题间双向传送的消息流都记录在 [PX4/evidence > Message Flows](https://github.com/PX4/avoidance#message-flows) 文件中：

所有使用此接口的服务均发送并且接收相同类型/格式的消息。 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。

> **Tip** 推荐使用 [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) 来开发路径规划软件。 它预安装了 [ PX4 避障](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 软件，可以用作您自己算法的基础。

## PX4 配置

通过将 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) [设置](../advanced_config/parameters.md)为 1 即可启用 PX4 的路径规划功能。

## 机载计算机设置

机载计算机端的硬件设置和软硬件配置在 Github 代码仓库 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 中已经提供。

实际需要的设置/配置取决于所用的规划器。

> **Warning** 一次只能有一个规划期在机载计算机上运行（在写入时）。 这意味着不能在同一个机体上同时启用不同规划器的上位机功能。 （例如，在一个机体启用避障和防撞时，就不能执行安全着陆了，反之亦然）。

<span id="waypoint_interface"></span>

## 轨迹接口

PX4 将 *期望路径* 的相关信息发送给机载计算机（当在 *自动* 模式下，`COM_OBS_AVOID=1` 时）， 并从路径规划软件接收*所规划路径* 的设定点数据流。

期望路径信息由 PX4 通过使用 [TRAJECTORY_REPRESTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息来发送，如下文 [PX4 航点接口](#px4_waypoint_interface) 所述。

路径规划器软件通过 `TRAJECTORY_REPRESTATION_WAYPOINTS` （参见 [Companion Waypoint Interface](#companion_waypoint_interface) ）或 [TRAJECTORY_REPRESTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) （参见 [Companion Bezier Tracjectory Interface](#bezier_interface) ）返回 *所规划路径* 的设置点。 不同之处在于，前者航点参数只是指定下一个设定的目标航点，而贝塞尔轨迹则描述精确的车辆运动（即随时间变化的设定点）。

> **警告** 路由规划软件在执行任务时不应混用这些接口（PX4 将使用最近收到的任意类型的消息）。

<span id="px4_waypoint_interface"></span>

### PX4 航点接口

PX4将期望轨迹封装在 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息中，以 5Hz 的频率发送给机载计算机。

PX4 中各字段定义如下：

- `time_usec`: UNIX 纪元时间戳
- `valid_points`: 3
- Point 0 - 由 FlightTaskAutoMapper 发布的适应格式的当前航点（见以下注释）： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED 坐标系下适应格式的 *当前* 任务航点位置坐标
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED 坐标系下适应格式的 *当前* 任务航点速度坐标
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 当前航向角
  - `vel_yaw[0]`: NaN
  - `command[0]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands) 
- Point 1 - 当前航点（未修改/未调整类型）： 
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED 坐标系下的 *当前* 任务航点位置坐标
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: 航向设定值
  - `vel_yaw[1]`: 偏航速率设定值
  - `command[1]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands)
- Point 2 - 局部坐标系中的下一个航点 (未修改/未调整类型)： 
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED 坐标系 *下一个* 任务航点位置坐标
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: 航向设定值
  - `vel_yaw[2]`: 偏航速率设定值
  - `command[2]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands)
- 所有其它字段都是NaN(未定义)。

<span id="type_adapted"></span>
备注：

- Point 0 是当前根据目标类型所修改的目标航点/目标。 例如，在着陆时指定目标的 x、y 坐标和降落速度是合理的。 为了实现这一点，`FlightTaskAutoMapper` 修改 Point 0 中的着陆点，将 z 轴位置的分量设置为 NAN，将 z 轴速度设置为期望值。
- 安全着陆规划器中没有用到 Point 1 和 2。
- 局部和全局规划器中用到了 Point 1。

<span id="companion-failure-handling"></span>

#### 机载计算机的失效处理

通过以下措施，PX4 安全地处理未从机载计算机系统接收到消息的情况：

- 如果规划器均未运行并且 `COM_OBS_AVOID` 在/从启动时处于启用状态： 
  - 航前自检将失败（无论机体模式如何），在 `COM_OBS_AVOID` 设置为 0 之前，机体不会起飞。
- 如果规划器均未运行并且 `COM_OBS_AVOID` 在启动后处于启用状态： 
  - 机体将以手动方式正常运行。
  - 如果您切换到自动模式（例如着陆模式），机体将立即切回到 [保持模式](../flight_modes/hold.md)。
- 当启用外部路径规划时： 
  - 如果 `HEARTBEAT` 丢失，PX4 将会发出状态消息(显示在 *QGroundControl* 中)，声明“避障系统丢失”或“避障系统超时”（取决于机体状态）。 这项提醒与当前的飞行模式无关。
  - 如果超过 0.5 秒未收到轨迹信息并且机体处于自动模式（返航、任务、起飞、着陆），则机体将切换到[保持模式](../flight_modes/hold.md)。 > **Note** 规划器在此时间段内必须始终提供航点信息。 
    - 当机体处于不提供路径规划的模式/状态时，规划器将镜像其接收到的设置航点。 （即车辆将沿着期望路径行驶，且延迟时间很小）。
  - 如果上次提供的贝塞尔轨迹的执行时间在路径规划期间超时（当使用[贝塞尔轨迹接口](#bezier_interface)时），这将被视为在 0.5 秒内没有收到新消息（即机体切换到[保持模式](../flight_modes/hold.md)）。

<span id="companion_waypoint_interface"></span>

## 机载航点接口

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

## 机载贝塞尔曲线轨迹接口

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

## 支持的硬件

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi and @jkflying are the experts! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for MAVLink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->