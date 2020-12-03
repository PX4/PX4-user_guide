# 路径规划接口

PX4 使用数个 MAVLink 接口来整合机载计算机的路径规划服务（包括在执行航线任务时避障，[安全着陆](../computer_vision/safe_landing.md)和未来的一些服务）：

- 有两个 [MAVLink 路径规划协议](https://mavlink.io/en/services/trajectory.html) 接口： 
  - [TRAJECTORY_REPRESTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): 被 PX4 用于发送 *期望路径*。 可能会被路径规划软件用于向 PX4 发送 *所规划路径* 的设定点数据流。
  - [TRAJECTORY_REPRESTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) 可能（或者）被路径规划软件用来以贝塞尔曲线的形式向PX4发送*所规划路径*。 曲线表示给定时间段内机体（移动的）位置设定值。
- [HEARTBEAT（心跳包）/连接协议](https://mavlink.io/en/services/heartbeat.html) 用于检测“生命证明”。
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) 和 [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) 分别用来发送机体本地位置和高度。

如果 [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID)，那么 PX4 的路径规划功能会在自动化模式 （着陆Landing、起飞Takeoff、保持Hold、任务Mission、返回Return）下启用 。 在这些模式中，路径规划软件将为 PX4 提供预设航点；如果软件无法支持特定的飞行模式，则必须将设定值从机体上向下一个位置镜像。

:::tip
这些消息流来自 PX4 的 UORB 主题， 通过 MAVLink 到 ROS，再回传，都在记录在下列文档中：[PX4/avoidance > Message Flows](https://github.com/PX4/avoidance#message-flows)。 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。

所有使用此接口的服务均发送并且接收相同类型/格式的消息。 因此，开发者可以使用这个接口来创建自己新的机载计算机侧的路径规划服务，或调整现有的规划者软件。

:::note
推荐使用 [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) 来开发路径规划软件。 它预安装了 [ PX4 避障](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 软件，可以用作您自己算法的基础。
:::

## PX4 配置

实际需要的设置/配置取决于所用的规划器。

## 机载计算机设置

机载计算机侧的硬件设置和硬件/软件配置在 Github 仓库 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 中已经提供。

实际需要的设置/配置取决于所用的规划器。

:::warning
一次只能有一个规划期在机载计算机上运行（在写入时）。 This means that offboard features that use different planners cannot be enabled on the same vehicle. a vehicle at the same time (e.g. a vehicle can support obstacle avoidance and collision prevent, but not also safe landing - or visa versa).
:::

<span id="waypoint_interface"></span>

## 轨迹接口

PX4 sends information about the *desired path* to the companion computer (when `COM_OBS_AVOID=1`, in *auto* modes), and receives back a stream of setpoints for the *planned path* from the path planning software.

PX4将期望轨迹封装在 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息中，以 5Hz 的频率发送给机载计算机。

Path planner software sends back setpoints for the *planned path* using either `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [Companion Waypoint Interface](#companion_waypoint_interface)) or [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) (see [Companion Bezier Trajectory Interface](#bezier_interface)). The difference is that the waypoint just specifies the next setpoint destination, while the bezier trajectory describes the exact vehicle motion (i.e. a setpoint that moves in time).

:::warning
Route planning software should not mix these interfaces while executing a task (PX4 will use the last received message of either type).
:::

<span id="px4_waypoint_interface"></span>

### PX4 航点接口

通过以下措施，PX4 安全地处理未从机载计算机系统接收到消息的情况：

The fields set by PX4 as shown:

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
路径规划软件（在机载计算机上运行）*可以* 以[TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息流的形式发送所规划路径给 PX4，消息流中包含 Point 0 设定航点。

- Point 0 是当前根据目标类型所修改的目标航点/目标。 例如，在着陆时指定目标的 x、y 坐标和降落速度是合理的。 为了实现这一点，`FlightTaskAutoMapper` 修改 Point 0 中的着陆点，将 z 轴位置的分量设置为 NAN，将 z 轴速度设置为期望值。
- 安全着陆规划器中没有用到 Point 1 和 2。
- 局部和全局规划器中用到了 Point 1。

<span id="companion-failure-handling"></span>

#### 机载计算机的失效处理

实现此接口的规划器必须：

- 如果规划器均未运行并且 `COM_OBS_AVOID` 在/从启动时处于启用状态： 
  - 航前自检将失败（无论机体模式如何），在 `COM_OBS_AVOID` 设置为 0 之前，机体不会起飞。
- 如果规划器均未运行并且 `COM_OBS_AVOID` 在启动后处于启用状态： 
  - 机体将以手动方式正常运行。
  - 如果您切换到自动模式（例如着陆模式），机体将立即切回到 [保持模式](../flight_modes/hold.md)。
- 当启用外部路径规划时： 
  - 如果 `HEARTBEAT` 丢失，PX4 将会发出状态消息(显示在 *QGroundControl* 中)，声明“避障系统丢失”或“避障系统超时”（取决于机体状态）。 这项提醒与当前的飞行模式无关。
  - if a trajectory message is not received for more than 0.5 seconds and the vehicle is in an autonomous mode (Return, Mission, Takeoff, Land), the vehicle will switch into [Hold mode](../flight_modes/hold.md). :::note A planner must always provide points in this timeframe.
  - A planner will mirror back setpoints it receives when the vehicle is in a mode/state for which it doesn't provide path planning. (i.e. the vehicle will follow its desired path, delayed by a very small amount).
:::
  - If the execution time of the last-supplied bezier trajectory expires during path planning (when using the [Bezier Trajectory Interface](#bezier_interface)), this is treated the same as not getting a new message within 0.5 seconds (i.e. vehicle switches to [Hold mode](../flight_modes/hold.md)).

<span id="companion_waypoint_interface"></span>

## 机载航点接口

路径规划软件（运行在机载计算机上）*可以*将计划的路径作为 [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) 消息流发送给 PX4。

The fields for the messages from the companion computer are set as shown:

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 1
- 当前飞机信息： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED坐标系下的载具位置设定值
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED 坐标系下速度设定值
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 航向角设定值
  - `vel_yaw[0]`: 偏航速率设定值
  - `command[0]`: NaN
- 所有其它字段都是NaN(未定义)。

更详细地讲，`TRAJECTORY_REPRESENTATION_BEZIER` 被解析为：

- 从 PX4 接收消息时，以超过 2Hz 的频率发出设定点。 如果超过 0.5 秒没有收到消息，PX4 将进入[保持模式](../flight_modes/hold.md)。
- 当不支持对当前机体状态进行规划时，镜像回规划器收到的设定点值（例如，由于不支持着陆模式，局部路径规划器把安全着陆期间发送的信息镜像回去）。

<span id="bezier_interface"></span>

## 机载贝塞尔曲线轨迹接口

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) messages.

The message defines the path that the vehicle should follow in terms of a curve (defined by the control points), starting at the message `timestamp` and reaching the final point after time `delta`. PX4 calculates its new setpoint (the expected current position/velocity/acceleration along the curve) using the time that the message was sent, the current time, and the total time for the curve (delta).

:::note
For example, say the message was sent 0.1 seconds ago and `delta` (curve duration) is 0.3s. PX4 can calculate its setpoint at the 0.1s position in the curve.
:::

In more detail, the `TRAJECTORY_REPRESENTATION_BEZIER` is parsed as follows:

- 贝塞尔控制点的数目决定贝塞尔曲线的曲度。 例如，3个控制点可构成具有恒定加速度的二次贝塞尔曲线。
- 贝塞尔曲线在 x、y、z 和偏航中的阶数必须相同，且所有贝塞尔控制点都是有限的。
- 在`delta` 数组中，应保存与最后一个贝塞尔控制点相对应的值，表示在执行曲线过程中，从航点到该点所需的总计持续时间。 其他 `delta` 数组中的值将被忽略。
- MAVLink 消息的时间戳应为曲线开始的时间，通信延迟和时钟不匹配将通过时间同步机制在飞行控制器上进行补偿。
- 所有控制点都应该在局部坐标系中指定（[MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)）。
- 贝塞尔曲线在超过执行时间后将过期。 确保以足够高的速率/足够长的执行时间发送新消息，以免发生这种情况（否则机体将切换到保持模式）。

## 支持的硬件

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi and @jkflying are the experts! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for MAVLink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->