# 장애물 회피

*장애물 회피* 기능을 사용하여 계획된 경로를 비행시 장애물 주위를 탐색 할 수 있습니다.

이 기능을 사용하려면 컴퓨터 비전 소프트웨어를 실행하는 보조 컴퓨터가 필요합니다. 이 소프트웨어는 주어진 원하는 궤적에 대한 경로, 매핑 및 장애물 주변 탐색을 제공하여 최적의 경로를 제공합니다.

장애물 회피는 자동 모드를위한 것이며 현재 [임무](#mission_mode) 및 [오프 보드 모드](#offboard_mode)의 멀티콥터에 지원됩니다.

두 모드에서 기능을 설정하고 활성화하는 방법에 대하여 설명합니다.

@[유투브](https://youtu.be/PrGt7pKj3tI)

## Limitations/Capabilities

- The maximum speed for obstacle avoidance is currently approximately 3 m/s (due to the cost of computing the avoidance path).
  
:::note
Obstacle avoidance can use the *local planner* planner emits messages at ~30Hz and can move at around 3 m/s) or global planner (emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s).
:::

<span id="offboard_mode"></span>

## Offboard Mode Avoidance

PX4 supports obstacle avoidance in [Offboard mode](../flight_modes/offboard.md).

The desired route comes from a [ROS](../ros/README.md) node running on a companion computer. This is passed into an obstacle avoidance module (another ROS node). The avoidance software sends the planned path to the flight stack as a stream of `SET_POSITION_TARGET_LOCAL_NED` messages.

The only required PX4-side setup is to put PX4 into *Offboard mode*.

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

<span id="mission_mode"></span>

## Mission Mode Avoidance

PX4 supports obstacle avoidance in [Mission mode](../flight_modes/mission.md), using avoidance software running on a separate companion computer.

### Mission Progression

Mission behaviour with obstacle avoidance enabled is *slightly different* to the original plan.

The difference when avoidance is active are:

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

:::note
`COM_OBS_AVOID` also enables [Safe Landing](../computer_vision/safe_landing.md) and any other features that use the PX4 [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.
:::

## Companion Computer Setup

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

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