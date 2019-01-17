# 自主避障

*自主避障* 使飞机沿预定路线前进时，能够自动绕开障碍物。

该功能需要运行计算机视觉软件的机载计算机。 该软件对期望路线重新规划，在导航绕开障碍物，并选取最佳路径。

自主避障适用于自动化模式，目前仅支持多旋翼飞行器的 [任务Missions](#mission_mode) 和 [Offboard](#offboard_mode) 模式。

本文将阐述怎样在这两种模式中设置自主避障功能。

## Offboard模式避障 {#offboard_mode}

PX4在 [Offboard模式](../flight_modes/offboard.md) 中支持避障功能。

期望路径来自在配套计算机上运行的一个 [ROS](http://dev.px4.io/en/ros/) 节点。 并传递给自主避障模块（另一个ROS节点）。 避障软件将规划路径通过 `SET_POSITION_TARGET_LOCAL_NED` 消息流发送给飞行控制栈。

> **Note** 唯一需要PX4这边的设置是将PX4切换到 *Offboard 模式* 。 PX4飞控并不知道发送 `SET_POSITION_TARGET_LOCAL_NED` 消息的信息源来自哪一个MAVLink系统。

功能测试所使用的软硬件是：运行*local_planner* 或 *global_planner*软件的 [Intel Aero](../complete_vehicles/intel_aero.md) 。 自主避障功能也支持Gazebo仿真测试。 配置方法详见[Intel Aero > Obstacle Avoidance](../complete_vehicles/intel_aero.md#obstacle-avoidance) 和[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)两个Github代码仓库。

## 任务模式避障 {#mission_mode}

PX4支持 [任务模式](../flight_modes/mission.md) 避障，需要使用一台独立的运行避障软件的机载计算机配合。

要启用自主避障功能，只需将PX4的 [MPC_OBS_AVOID](../advanced_config/parameter_reference.md#MPC_OBS_AVOID) [设置](../advanced_config/parameters.md)为1即可。 PX4通过MAVLink的[路径规划协议](https://mavlink.io/en/services/trajectory.html)（Trajectory 接口）实现与避障软件的交互，[#详见后文](#mission_avoidance_interface)。 PX4兼容所有符合此接口的避障系统。

功能测试所使用的软硬件是：运行*local_planner* 或 *global_planner*软件的 [Intel Aero](../complete_vehicles/intel_aero.md) 。 自主避障功能也支持Gazebo仿真测试。 配置方法详见[Intel Aero > Obstacle Avoidance](../complete_vehicles/intel_aero.md#obstacle-avoidance) 和[PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance)两个Github代码仓库。

### 任务模式的变化

开启自主避障功能的任务模式的行为有*些许不同*。

激活避障之后的不同之处有：

- 飞机距离目标航点小于阈值半径，即判定为抵达，不考虑航向。 
  - 在普通任务模式下，飞机必须沿某一航向抵达目标航点（比如从上一航点沿直线靠近）。 开启避障模式后该约束失效，因为避障算法接管了飞机的航向控制，飞机只是根据当前视野进行移动。 
- 一旦判定为到达某航点（即距离航点小于阈值半径），PX4就开始切换新的当前航点与下一个航点。
- 如果一个航点在某个障碍物*之内*，有可能无法抵达（任务将被阻塞）。 
  - 如果飞机在上一航点与当前航点连线上的投影经过了当前航点，阈值半径将被放大，当前航点将被标记为抵达。
  - 如果载具只能进入x-y方向的阈值半径，高度方向的可接受阈值将被修改，然后任务将继续（即使无法进入高度的可接受半径）。
- （由 *QGroundControl*或PX4）预设的任务模式速度将被忽略。 速度将由避障软件决定： 
  - *local planner* 任务速度约 3m/s。
  - *global planner* 任务速度约 1~1.5 m/s。

如果PX4接收不到期望点，自主避障功能将被关闭，PX4将恢复普通[任务模式](../flight_modes/mission.md)。

### 任务模式避障接口 {#mission_avoidance_interface}

将`MPC_OBS_AVOID` 设置为 `1` 即会在PX4上开启任务模式。

PX4将期望轨迹封装在 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 消息中，以 5Hz 的频率发送给机载计算机。

各字段定义如下：

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 3
- 当前飞机信息： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED坐标系下的载具位置
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED 坐标系下速度设定值
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: x-y-z NED 坐标系下加速度设定值
  - `pos_yaw[0]`: 当前航向角
  - `vel_yaw[0]`: NaN

- 当前航点：
  
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: x-y-z NED 坐标系下的 *当前* 任务航点位置坐标
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: 航向设定值
  - `vel_yaw[1]`: 偏航速率设定值

- 下一个航点：
  
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: x-y-z NED 坐标系 *下一个* 任务航点位置坐标
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: 航向设定值
  - `vel_yaw[2]`: 偏航速率设定值
- 所有其它字段都是NaN(未定义)。 

PX4期望在整个任务期间 (不论障碍物是否存在) 都能接收到由`TRAJECTORY_REPRESENTATION_WAYPOINTS` 消息发送的目标期望点信息。

来自避障软件的消息各字段定义如下：

- `time_usec`: UNIX纪元时间戳
- `valid_points`: 1
- 当前飞机信息： 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED坐标系下的载具位置设定值
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: x-y-z NED 坐标系下速度设定值
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 航向角设定值
  - `vel_yaw[0]`: 偏航速率设定值
- 所有其它字段都是NaN(未定义)。 

目标期望点的发送频率，由规划软件的能力和用户设置决定。

> **Note** 目前 *local planner* 发送消息的频率约 30Hz，可以保证载具的移动速度为 3 m/s。 *global planner* 发送消息的频率约为 10Hz ，任务速度只能达到 1-1.5 m/s。

下文将对避障功能进行更详细的描述，包括PX4飞控和来自ROS的消息流的行为。

#### 任务模式更详细的行为描述

当QGC向飞控上传一个任务并将 `MPC_OBS_AVOID` 设置为 `1`，PX4将uORB消息 `vehicle_trajectory_waypoint_desired` 填充如下：

数组 `waypoints`：

- *index 0 :*
  
  - position: x-y-z NED 坐标系下的位置
  - velocity: x-y-z 由主动飞行控制栈产生的 NED 坐标系下的速度设定值
  - Acceleration: 飞机加速度
  - Yaw: 飞机航向角
  - Yaw_speed: NaN

- *index 1:*
  
  - position: x-y-z NED 坐标系下当前任务航点位置
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: 航向设定值
  - Yaw_speed: 偏航速率设定值

- *Index 2:*
  
  - position: x-y-z NED 坐标系下 下一个任务航点位置
  - Velocity: NaN
  - Acceleration: NaN
  - Yaw: 航向设定值
  - Yaw_speed: 偏航速率设定值

其余index均填充为NaN。

`vehicle_trajectory_waypoint_desired` 消息被映射到 MAVLink 消息 `TRAJECTORY_REPRESENTATION_WAYPOINTS`（见上[避障接口](#mission_avoidance_interface)所述）。 消息发送频率为5Hz。

MAVROS 将 MAVLink 消息转换成 ROS 消息 `mavros_msgs::trajectory` ，并将坐标系从北东地 (NED) 转换到 东北天 (ENU)。 此消息由ROS话题 `/mavros/trajectory/desired` 发布。

在避障软件这端，算法将规划一条到航点的路径。

经避障算法优化后的位置或速度设定值，可能由以下两个ROS消息发送给飞控固件： `mavros_msgs::trajectory` (同时包含速度和位置设定值)，由ROS 消息 `/mavros/trajectory/generated` 发布 `nav_msgs::Path` (只有位置设定值)，由 ROS 消息 `/mavros/trajectory/path` 发布

MAVROS 将设定值的坐标系从 ENU 转换到 NED，并将 ROS 消息转换成 MAVLink 消息 `TRAJECTORY_REPRESENTATION_WAYPOINTS`。

在PX4飞控这端，接收到的 `TRAJECTORY_REPRESENTATION_WAYPOINTS` 消息被转换成uORB消息 `vehicle_trajectory_waypoint`。 航点队列包含了所有未定义字段，但不包含index 0，消息内容如下：

- Position: 位置设定值
- Velocity: 速度设定值
- acceleration: NaN（飞控固件暂不支持加速度设定值）
- Yaw: 航向设定值
- Yaw_speed: 偏航速率设定值

以上设定值将作为飞控位置控制器的跟踪目标。

<!-- ## Further Information -->

<!-- @mrivi is expert! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->