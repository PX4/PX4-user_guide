# 장애물 회피

*장애물 회피* 기능을 사용하여 계획된 경로를 비행시 장애물 주위를 탐색 할 수 있습니다.

이 기능을 사용하려면 컴퓨터 비전 소프트웨어를 실행하는 보조 컴퓨터가 필요합니다. 이 소프트웨어는 주어진 원하는 궤적에 대한 경로, 매핑 및 장애물 주변 탐색을 제공하여 최적의 경로를 제공합니다.

장애물 회피는 자동 모드를위한 것이며 현재 [임무](#mission_mode) 및 [오프 보드 모드](#offboard_mode)의 멀티콥터에 지원됩니다.

두 가지 모드에서 기능을 설정하고 활성화하는 방법에 대하여 설명합니다.

@[유투브](https://youtu.be/PrGt7pKj3tI)

## 제약 사항과 성능

- 장애물 회피를 위한 최대 속도는 현재 약 3m/s입니다 (회피 경로 계산 비용으로 인해).
  
:::note
장애물 회피는 *로컬 플래너*를 사용하면 약 30Hz에서 메시지를 전송하고 약 3m/s로 이동할 수 있습니다. 글로벌 플래너를 사용하면 약 10Hz에서 메시지를 전송하고 장애물 회피 임무 속도는 약 1~1.5 m/s입니다.
:::

<span id="offboard_mode"></span>

## 오프보드 모드 회피

PX4는 [오프 보드 모드](../flight_modes/offboard.md)에서 장애물 회피를 지원합니다.

원하는 경로는 보조 컴퓨터에서 실행되는 [ROS](../ros/README.md) 노드에서 가져옵니다. 이것은 장애물 회피 모듈 (다른 ROS 노드)로 전달됩니다. 회피 소프트웨어는 `SET_POSITION_TARGET_LOCAL_NED` 메시지의 스트림으로 비행 스택에 계획된 경로를 전송합니다.

유일한 필수 PX4 설정은 PX4를 *오프보드 모드*로 설정하는 것입니다.

보조 컴퓨터 하드웨어와 소프트웨어 구성과 설정은 [PX4 회피](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github 저장소에서 제공됩니다.

<span id="mission_mode"></span>

## 임무 모드 회피

PX4는 보조 컴퓨터의 회피 소프트웨어를 사용하여 [임무 모드](../flight_modes/mission.md)에서 장애물 회피를 지원합니다.

### 임무 수행

장애물 회피가 활성화된 임무 동작은 원래의 계획과 *약간의 차이*가 납니다.

회피가 활성화된 경우 차이점은 다음과 같습니다.

- 웨이포인트는 기체의 방향과 관계없이 허용 반경내에 있을 때 "도달"한 것으로 간주됩니다. 
  - 이것은 기체의 특정 방향 (즉, 이전 웨이포인트에서 "가까운"직선)으로 웨이포인트에 도달해야하는 일반 임무와의 차이점입니다. 장애물 회피 알고리즘이 기체 방향을 완전히 제어하고, 기체는 항상 현재 시야에서 움직이기 때문에 장애물 회피가 활성화된 경우이 제약 조건을 충족할 수 없습니다. 
- PX4는 이전 웨이포인트에 도달하면 (즉, 차량이 허용 반경에 진입하자마자) 새로운 현재/다음 웨이포인트를 방출하기 시작합니다.
- 웨이포인트가 장애물 *안쪽*에 있으면 도달할 수 없을 수 있습니다 (미션이 중단됨). 
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