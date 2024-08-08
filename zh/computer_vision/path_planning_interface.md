# 路径规划接口

PX4 uses a number of MAVLink interfaces for integrating path planning services from a companion computer (including [obstacle avoidance in missions](../computer_vision/obstacle_avoidance.md#mission-mode-avoidance), [safe landing](../computer_vision/safe_landing.md), and future services):

- There are two [MAVLink Path Planning Protocol](https://mavlink.io/en/services/trajectory.html) interfaces:

  - [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS): Used by PX4 to send the _desired path_. May be used by path planning software to send PX4 a stream of setpoints for the _planned path_.
  - [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) may (alternatively) be used by path planning software to send PX4 the _planned path_ as a bezier curve. 曲线表示给定时间段内机体（移动的）位置设定值。

- The [HEARTBEAT/Connection Protocol](https://mavlink.io/en/services/heartbeat.html) is used for "proof of life" detection.

  ::: info The companion computer must have a component id of [MAV_COMP_ID_OBSTACLE_AVOIDANCE](https://mavlink.io/en/messages/common.html#MAV_COMP_ID_OBSTACLE_AVOIDANCE) and be streaming a [HEARTBEAT](https://mavlink.io/en/messages/common.html#HEARTBEAT) with [HEARTBEAT.system_status=MAV_STATE_ACTIVE](https://mavlink.io/en/messages/common.htmlMAV_STATE_ACTIVE) in order to arm while obstacle avoidance is enabled (otherwise the vehicle will fail the prearm check: `Avoidance system not ready`). 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。

- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) 和 [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE) 分别用来发送机体本地位置和高度。

如果 [COM_OBS_AVOID=1](../advanced_config/parameter_reference.md#COM_OBS_AVOID)，那么 PX4 的路径规划功能会在自动化模式 （着陆Landing、起飞Takeoff、保持Hold、任务Mission、返回Return）下启用 。 在这些模式中，路径规划软件将为 PX4 提供预设航点；如果软件无法支持特定的飞行模式，则必须将设定值从机体上向下一个位置镜像。

:::tip
The message flows from PX4 UORB topics, through MAVLink, to ROS and back again are all documented in [PX4/PX4-Avoidance > Message Flows](https://github.com/PX4/PX4-Avoidance#message-flows).
:::

所有使用此接口的服务均发送并且接收相同类型/格式的消息。 Developers can therefore use this interface to create their own new companion-side path planning services or tweak the existing planner software.

:::note
推荐使用 [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) 来开发路径规划软件。 It comes with [PX4 avoidance](https://github.com/PX4/PX4-Avoidance) software pre-installed and can be used as the base for your own algorithms.
:::

## PX4 配置

实际需要的设置/配置取决于所用的规划器。

## 机载计算机设置

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

实际需要的设置/配置取决于所用的规划器。

:::warning
Only one planner can run on the companion computer at a time (at the time of writing). This means that offboard features that use different planners cannot be enabled on the same vehicle at the same time (e.g., a vehicle can support obstacle avoidance and collision prevention, but not also safe landing - or vice versa). 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。

<a id="waypoint_interface"></a>

## 轨迹接口

PX4 sends information about the _desired path_ to the companion computer (when `COM_OBS_AVOID=1`, in _auto_ modes), and receives back a stream of setpoints for the _planned path_ from the path planning software.

期望路径信息由 PX4 通过使用 [TRAJECTORY_REPRESTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息来发送，如下文 [PX4 航点接口](#px4_waypoint_interface) 所述。

Path planner software sends back setpoints for the _planned path_ using either `TRAJECTORY_REPRESENTATION_WAYPOINTS` (see [Companion Waypoint Interface](#companion_waypoint_interface)) or [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) (see [Companion Bezier Trajectory Interface](#bezier_interface)). 不同之处在于，前者航点参数只是指定下一个设定的目标航点，而贝塞尔轨迹则描述精确的车辆运动（即随时间变化的设定点）。

:::warning
路由规划软件在执行任务时不应混用这些接口（PX4 将使用最近收到的任意类型的消息）。
:::

<a id="px4_waypoint_interface"></a>

### PX4 航点接口

PX4 将期望路径封装在 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息中，以 5Hz 的频率发送。

PX4 中各字段定义如下：

- `time_usec`: UNIX 纪元时间戳
- `valid_points`: 3
- Point 0 - Current waypoint _type adapted_ by FlightTaskAutoMapper (see [notes below](#type_adapted)):
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: Type adapted x-y-z NED local position of _current_ mission waypoint.
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: Type adapted x-y-z NED local velocity of _current_ mission waypoint.
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 当前航向角
  - `vel_yaw[0]`: NaN
  - `command[0]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands)
- Point 1 - 当前航点（未修改/未调整类型）：
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED local position of _current_ mission waypoint
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: 航向设定值
  - `vel_yaw[1]`: 偏航速率设定值
  - `command[1]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands)
- Point 2 - 局部坐标系中的下一个航点 (未修改/未调整类型)：
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED local position of _next_ mission waypoint
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: 航向设定值
  - `vel_yaw[2]`: 偏航速率设定值
  - `command[2]`: 当前航点的 [MAVLink 命令](https://mavlink.io/en/messages/common.html#mav_commands)
- 所有其它字段都是NaN(未定义)。

<a id="type_adapted"></a>

路径规划软件（在机载计算机上运行）*可以* 以[TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息流的形式发送所规划路径给 PX4，消息流中包含 Point 0 设定航点。

- Point 0 是当前根据目标类型所修改的目标航点/目标。 例如，在着陆时指定目标的 x、y 坐标和降落速度是合理的。 为了实现这一点，`FlightTaskAutoMapper` 修改 Point 0 中的着陆点，将 z 轴位置的分量设置为 NAN，将 z 轴速度设置为期望值。
- Points 1 and 2 are not used by the safe landing planner.
- Point 1 is used by local and global planners.

<a id="companion-failure-handling"></a>

#### 机载计算机的失效处理

实现此接口的规划器必须：

- 如果规划器均未运行并且 `COM_OBS_AVOID` 在/从启动时处于启用状态：
  - 航前自检将失败（无论机体模式如何），在 `COM_OBS_AVOID` 设置为 0 之前，机体不会起飞。
- 如果规划器均未运行并且 `COM_OBS_AVOID` 在启动后处于启用状态：
  - 机体将以手动方式正常运行。
  - if you switch to an autonomous mode (e.g. Land Mode) it will immediately fall back to [Hold mode](../flight_modes_mc/hold.md).
- When external path planning is enabled:
  - if the `HEARTBEAT` is lost PX4 will emit a status message (which is displayed in _QGroundControl_) stating either "Avoidance system lost" or "Avoidance system timeout" (depending on the vehicle state). 这项提醒与当前的飞行模式无关。
  - if a trajectory message is not received for more than 0.5 seconds and the vehicle is in an autonomous mode (Return, Mission, Takeoff, Land), the vehicle will switch into [Hold mode](../flight_modes_mc/hold.md). ::: info A planner must always provide points in this timeframe.
  - A planner will mirror back setpoints it receives when the vehicle is in a mode/state for which it doesn't provide path planning. (i.e. the vehicle will follow its desired path, delayed by a very small amount). 因此，开发者可以使用这个接口来创建自己新的机载计算机端路径规划服务，或调整现有的规划者软件。
  - If the execution time of the last-supplied Bezier trajectory expires during path planning (when using the [Bezier Trajectory Interface](#bezier_interface)), this is treated the same as not getting a new message within 0.5 seconds (i.e. vehicle switches to [Hold mode](../flight_modes_mc/hold.md)).

<a id="companion_waypoint_interface"></a>

## 机载航点接口

The path planning software (running on the companion computer) _may_ send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) messages that have the setpoint in Point 0.

来自机载计算机的消息字段设置如下：

- `time_usec`: UNIX 纪元时间戳
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

- 从 PX4 接收消息时，以超过 2Hz 的频率发出设定点。 PX4 will enter [Hold mode](../flight_modes_mc/hold.md) if no message is received for more than 0.5s.
- Mirror back setpoints it receives when it doesn't support planning for the current vehicle state (e.g. the local planner would mirror back messages sent during safe landing because it does not support Land mode).

<a id="bezier_interface"></a>

## 机载贝塞尔曲线轨迹接口

The path planning software (running on the companion computer) _may_ send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) messages.

消息定义了无人机应遵循的路径（由控制点定义），从消息 `时间戳` 开始，在时间 `delta` 后到达终点。 PX4 使用消息发送时间、当前时间和贝塞尔曲线的总时间（delta）计算其新的轨迹设定点（沿曲线趋势来预测的当前位置/速度/加速度）。

::: info For example, say the message was sent 0.1 seconds ago, and `delta` (curve duration) is 0.3s. PX4 可以在曲线中以 0.1 秒间隔的精度计算其轨迹设定点。
:::

更详细地讲，`TRAJECTORY_REPRESENTATION_BEZIER` 被解析为：

- The number of Bezier control points determines the degree of the Bezier curve. For example, 3 points make a quadratic Bezier curve with constant acceleration.
- The Bezier curve must be the same degree in x, y, z, and yaw, with all Bezier control points finite
- The `delta` array should have the value corresponding with the last Bezier control point to indicate the duration that the waypoint takes to execute the curve to that point, from beginning to end. 其他 `delta` 数组中的值将被忽略。
- MAVLink 消息的时间戳应为曲线开始的时间，通信延迟和时钟不匹配将通过时间同步机制在飞行控制器上进行补偿。
- 所有控制点都应该在局部坐标系中指定（[MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)）。
- Bezier curves expire after the execution time of the Bezier curve has been reached. Ensure that new messages are sent at a high enough rate and with a long enough execution time. If this does not happen the vehicle will switch to Hold mode.

## 支持的硬件

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- ## Further Information -->
<!-- @mrivi and @jkflying are the experts! -->
