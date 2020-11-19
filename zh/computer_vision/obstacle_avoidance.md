# 自主避障

*自主避障* 使飞机沿预定路线前进时，能够自动绕开障碍物。

该功能需要运行计算机视觉软件的机载计算机。 该软件对期望路线重新规划，在导航绕开障碍物，并选取最佳路径。

自主避障适用于自动化模式，目前仅支持多旋翼飞行器的 [任务Missions](#mission_mode) 和 [Offboard](#offboard_mode) 模式。

本文将阐述怎样在这两种模式中设置自主避障功能。

{% youtube %}https://youtu.be/PrGt7pKj3tI{% endyoutube %}

## Limitations/Capabilities

- The maximum speed for obstacle avoidance is currently approximately 3 m/s (due to the cost of computing the avoidance path).
  
  > **Note** Obstacle avoidance can use the *local planner* planner emits messages at ~30Hz and can move at around 3 m/s) or global planner (emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s).

<span id="offboard_mode"></span>

## Offboard模式避障

PX4 supports obstacle avoidance in [Offboard mode](../flight_modes/offboard.md).

期望路径来自在配套计算机上运行的一个 [ROS](../ros/README.md) 节点。 并传递给自主避障模块（另一个ROS节点）。 避障软件将规划路径通过 `SET_POSITION_TARGET_LOCAL_NED` 消息流发送给飞行控制栈。

The only required PX4-side setup is to put PX4 into *Offboard mode*.

机载计算机端的硬件设置和软硬件配置在 Github 代码仓库 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 中已经提供。

<span id="mission_mode"></span>

## 任务模式避障

PX4支持 [任务模式](../flight_modes/mission.md) 避障，需要使用一台独立的运行避障软件的机载计算机配合。

### 任务模式的变化

开启自主避障功能的任务模式的行为有*些许不同*。

激活避障之后的不同之处有：

- 飞机距离目标航点小于阈值半径，即判定为抵达，不考虑航向。 
  - 在普通任务模式下，飞机必须沿某一航向抵达目标航点（比如从上一航点沿直线靠近）。 This constraint cannot be fulfilled when obstacle avoidance is active because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- 一旦判定为到达某航点（即距离航点小于阈值半径），PX4就开始切换新的当前航点与下一个航点。
- 如果一个航点在某个障碍物*之内*，有可能无法抵达（任务将被阻塞）。 
  - 如果飞机在上一航点与当前航点连线上的投影经过了当前航点，阈值半径将被放大，当前航点将被标记为抵达。
  - 如果载具只能进入x-y方向的阈值半径，高度方向的可接受阈值将被修改，然后任务将继续（即使无法进入高度的可接受半径）。
- （由 *QGroundControl*或PX4）预设的任务模式速度将被忽略。 速度将由避障软件决定： 
  - *local planner* 任务速度约 3m/s。
  - *global planner* 任务速度约 1~1.5 m/s。

If PX4 stops receiving setpoint updates for more than half a second it will switch into [Hold mode](../flight_modes/hold.md).

### PX4 配置

Obstacle avoidance is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

> **Note** `COM_OBS_AVOID` also enables [Safe Landing](../computer_vision/safe_landing.md) and any other features that use the PX4 [Path Planning Offoard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.

## 机载计算机设置

机载计算机端的硬件设置和软硬件配置在 Github 代码仓库 [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 中已经提供。

Obstacle avoidance in missions can use either the *local planner* or *global planner* (the local planner is recommended/better performing).

<span id="interface"></span>

## Obstacle Avoidance Interface

PX4 uses the [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) for integrating path planning services from a companion computer (including [Obstacle Avoidance in missions](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), and future services).

The interface (messages sent) between PX4 and the companion are *exactly* the same as for any other path planning services.

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi is expert! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->