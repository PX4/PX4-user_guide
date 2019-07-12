# 自主避障

*自主避障* 使飞机沿预定路线前进时，能够自动绕开障碍物。

该功能需要运行计算机视觉软件的机载计算机。 该软件对期望路线重新规划，在导航绕开障碍物，并选取最佳路径。

自主避障适用于自动化模式，目前仅支持多旋翼飞行器的 [任务Missions](#mission_mode) 和 [Offboard](#offboard_mode) 模式。

本文将阐述怎样在这两种模式中设置自主避障功能。

{% youtube %}https://youtu.be/PrGt7pKj3tI{% endyoutube %}

## Limitations/Capabilities

- The maximum speed for obstacle avoidance is currently approximately 3 m/s (due to the cost of computing the avoidance path).
  
  > **Note** Obstacle avoidance can use the *local planner* planner emits messages at ~30Hz and can move at around 3 m/s) or global planner (emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s).

## Offboard Mode Avoidance {#offboard_mode}

PX4 supports obstacle avoidance in [Offboard mode](../flight_modes/offboard.md).

The desired route comes from a [ROS](http://dev.px4.io/en/ros/) node running on a companion computer. This is passed into an obstacle avoidance module (another ROS node). The avoidance software sends the planned path to the flight stack as a stream of `SET_POSITION_TARGET_LOCAL_NED` messages.

The only required PX4-side setup is to put PX4 into *Offboard mode*.

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

## Mission Mode Avoidance {#mission_mode}

PX4 supports obstacle avoidance in [Mission mode](../flight_modes/mission.md), using avoidance software running on a separate companion computer.

### 任务模式的变化

开启自主避障功能的任务模式的行为有*些许不同*。

激活避障之后的不同之处有：

- A waypoint is "reached" when the vehicle is within the acceptance radius, regardless of its heading. 
  - This differs from normal missions, in which the vehicle must reach a waypoint with a certain heading (i.e. in a "close to" straight line from the previous waypoint). This constraint cannot be fulfilled when obstacle avoidance is active because the obstacle avoidance algorithm has full control of the vehicle heading, and the vehicle always moves in the current field of view. 
- PX4 starts emitting a new current/next waypoint once the previous waypoint is reached (i.e. as soon as vehicle enters its acceptance radius).
- If a waypoint is *inside* an obstacle it may unreachable (and the mission will be stuck). 
  - If the vehicle projection on the line previous-current waypoint passes the current waypoint, the acceptance radius is enlarged such that the current waypoint is set as reached
  - If the vehicle within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
- The original mission speed (as set in *QGroundControl*/PX4) is ignored. The speed will be determined by the avoidance software: 
  - *local planner* mission speed is around 3 m/s.
  - *global planner* mission speed is around 1-1.5 m/s.

If PX4 stops receiving setpoint updates for more than half a second it will switch into [Hold mode](../flight_modes/hold.md).

### PX4 Configuration

Obstacle avoidance is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

> **Note** `COM_OBS_AVOID` also enables [Safe Landing](../computer_vision/safe_landing.md) and any other features that use the PX4 [Path Planning Offoard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.

## Companion Computer Setup

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

Obstacle avoidance in missions can use either the *local planner* or *global planner* (the local planner is recommended/better performing).

## Obstacle Avoidance Interface {#interface}

PX4 uses the [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) for integrating path planning services from a companion computer (including [Obstacle Avoidance in missions](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), and future services).

The interface (messages sent) between PX4 and the companion are *exactly* the same as for any other path planning services.

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi is expert! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for mavlink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->