---
canonicalUrl: https://docs.px4.io/main/zh/computer_vision/obstacle_avoidance
---

# 自主避障

*Obstacle Avoidance* enables a vehicle to navigate around obstacles when following a preplanned path.

该功能需要运行计算机视觉软件的机载计算机。 该软件对期望路线重新规划，在导航绕开障碍物，并选取最佳路径。

自主避障适用于自动化模式，目前仅支持多旋翼飞行器的 [任务Missions](#mission_mode) 和 [Offboard](#offboard_mode) 模式。

本文将阐述怎样在这两种模式中设置自主避障功能。

@[youtube](https://youtu.be/PrGt7pKj3tI)


## 局限 / 能力

- 自主避障的最大速度当前约为 3m/s（由于计算避障路径的开销）。

:::note
Obstacle avoidance can use the *local planner* planner emits messages at ~30Hz and can move at around 3 m/s) or global planner (emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s).
:::


<span id="offboard_mode"></span>
## Offboard模式避障

PX4 在 [Offboard 模式](../flight_modes/offboard.md)中支持自主避障功能。

期望路径来自在配套计算机上运行的一个 [ROS](../ros/README.md) 节点。 并传递给自主避障模块（另一个 ROS 节点）。 避障软件将规划路径通过 `SET_POSITION_TARGET_LOCAL_NED` 消息流发送给飞行控制栈。

The only required PX4-side setup is to put PX4 into *Offboard mode*.

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.


<span id="mission_mode"></span>
## 任务模式避障

PX4支持 [任务模式](../flight_modes/mission.md) 避障，需要使用一台独立的运行避障软件的机载计算机配合。

### 任务模式的变化

Mission behaviour with obstacle avoidance enabled is *slightly different* to the original plan.

激活避障之后的不同之处有：
- 飞机距离目标航点小于阈值半径，即判定为抵达，不考虑航向。
  - 在普通任务模式下，飞机必须沿某一航向抵达目标航点（比如从上一航点沿直线靠近）。 开启自主避障后该约束失效，因为避障算法完全控制了飞机的航向，并且飞机始终在当前视野中移动。
- 一旦判定为到达某航点（即距离航点小于阈值半径），PX4 就开始切换新的当前航点与下一个航点。
- If a waypoint is *inside* an obstacle it may unreachable (and the mission will be stuck).
  - 如果飞机在上一航点与当前航点连线上的投影经过了当前航点，阈值半径将被放大，当前航点将被标记为抵达。
  - 如果载具只能进入x-y方向的阈值半径，高度方向的可接受阈值将被修改，然后任务将继续（即使无法进入高度的可接受半径）。
- The original mission speed (as set in *QGroundControl*/PX4) is ignored. 速度将由避障软件决定：
  - *local planner* mission speed is around 3 m/s.
  - *global planner* mission speed is around 1-1.5 m/s.

如果 PX4 停止接收设定点更新超过半秒钟， 将切换到 [保持Hold 模式](../flight_modes/hold.md)。


### PX4 配置

PX4 通过 [设置](../advanced_config/parameters.md) 参数 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) 为1 来使能自主避障功能。

:::note
`COM_OBS_AVOID` 还使能了 [安全着陆](../computer_vision/safe_landing.md)，以及使用了 PX4 [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) （轨迹接口）将外部路径规划服务与 PX4 集成的其他功能。
:::

## 机载计算机设置

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

Obstacle avoidance in missions can use either the *local planner* or *global planner* (the local planner is recommended/better performing).


<span id="interface"></span>
## 自主避障接口

PX4 使用 [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) 集成机载计算机中的路径规划服务（包括 [任务中自主避障](../computer_vision/obstacle_avoidance.md#mission_mode)，[安全着陆](../computer_vision/safe_landing.md) 以及更多的服务）。

The interface (messages sent) between PX4 and the companion are *exactly* the same as for any other path planning services.

## 支持的硬件

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).


<!-- ## Further Information -->
<!-- @mrivi is expert! -->
<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->
<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->
