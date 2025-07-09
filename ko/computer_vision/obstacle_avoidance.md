---
canonicalUrl: https://docs.px4.io/main/ko/computer_vision/obstacle_avoidance
---

# 장애물 회피

*장애물 회피* 기능을 사용하여 계획된 경로를 비행시 장애물 주위를 탐색 할 수 있습니다.

이 기능을 사용하려면 컴퓨터 비전 소프트웨어를 실행하는 보조 컴퓨터가 필요합니다. 이 소프트웨어는 주어진 원하는 궤적에 대한 경로, 매핑 및 장애물 주변 탐색을 제공하여 최적의 경로를 제공합니다.

장애물 회피는 자동 모드를위한 것이며 현재 [임무](#mission_mode) 및 [오프 보드 모드](#offboard_mode)의 멀티콥터에 지원됩니다.

두 가지 모드에서 기능을 설정하고 활성화하는 방법에 대하여 설명합니다.


## 제약 사항과 성능

- 장애물 회피를 위한 최대 속도는 현재 약 3m/s입니다 (회피 경로 계산 비용으로 인해).

:::note
Obstacle avoidance can use the *local planner* (emits messages at ~30Hz and can move at around 3 m/s) or *global planner* (emits messages at ~10Hz and mission speed with obstacle avoidance is around 1-1.5 m/s).
:::


<a id="offboard_mode"></a>

## 오프보드 모드 회피

PX4는 [오프 보드 모드](../flight_modes/offboard.md)에서 장애물 회피를 지원합니다.

원하는 경로는 보조 컴퓨터에서 실행되는 [ROS](../ros/README.md) 노드에서 가져옵니다. 이것은 장애물 회피 모듈 (다른 ROS 노드)로 전달됩니다. 회피 소프트웨어는 `SET_POSITION_TARGET_LOCAL_NED` 메시지의 스트림으로 비행 스택에 계획된 경로를 전송합니다.

PX4는 [오프 보드 모드](../flight_modes/offboard.md)에서 장애물 회피를 지원합니다.

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.


<a id="mission_mode"></a>

## 임무 모드 회피

PX4는 보조 컴퓨터의 회피 소프트웨어를 사용하여 [임무 모드](../flight_modes/mission.md)에서 장애물 회피를 지원합니다.

### 임무 수행

PX4는 보조 컴퓨터의 회피 소프트웨어를 사용하여 [임무 모드](../flight_modes/mission.md)에서 장애물 회피를 지원합니다.

회피가 활성화된 경우 차이점은 다음과 같습니다.
- 웨이포인트는 기체의 방향과 관계없이 허용 반경내에 있을 때 "도달"한 것으로 간주됩니다.
  - 이것은 기체의 특정 방향 (즉, 이전 웨이포인트에서 "가까운"직선)으로 웨이포인트에 도달해야하는 일반 임무와의 차이점입니다. 장애물 회피 알고리즘이 기체 방향을 완전히 제어하고, 기체는 항상 현재 시야에서 움직이기 때문에 장애물 회피가 활성화된 경우이 제약 조건을 충족할 수 없습니다.
- PX4 starts emitting a new current/next waypoint once the previous waypoint is reached (i.e. as soon as the vehicle enters its acceptance radius).
- If a waypoint is *inside* an obstacle it may be unreachable (and the mission will be stuck).
  - 이전-현재 웨이포인트 라인의 기체 투영이 현재 웨이포인트를 통과하면 수락 반경이 확대되어 현재 웨이포인트에 도달한 것으로 설정됩니다.
  - If the vehicle is within the x-y acceptance radius, the altitude acceptance is modified such that the mission progresses (even if it is not in the altitude acceptance radius).
- 원래의 미션 속도 (*QGroundControl*/PX4에 설정 됨)는 무시됩니다. 속도는 회피 소프트웨어에 의해 결정됩니다.
  - *로컬 플래너* 임무 속도는 약 3m/s입니다.
  - *글로벌 플래너* 임무 속도는 약 1~1.5m/s입니다.

If PX4 stops receiving setpoint updates for more than half a second it will switch into [Hold mode](../flight_modes_mc/hold.md).


### PX4 설정

장애물 회피는 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID)를 1로 [설정](../advanced_config/parameters.md)하여 PX4 내에서 활성화됩니다.

:::note
`COM_OBS_AVOID`는 [안전 착륙](../computer_vision/safe_landing.md) 및 PX4 [경로 계획 오프 보드 인터페이스](../computer_vision/path_planning_interface.md) (추적 인터페이스)를 사용하는 기타 기능을 활성화하여 외부 경로 계획 서비스를 PX4와 통합합니다.
:::

## 보조 컴퓨터 설정

Companion-side hardware setup and hardware/software configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

보조 컴퓨터 하드웨어와 소프트웨어 구성과 설정은 [PX4 회피](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github 저장소에서 제공됩니다.


<a id="interface"></a>

## 장애물 회피 인터페이스

PX4는 [임무중 장애물 회피](../computer_vision/obstacle_avoidance.md#mission_mode), [안전 착륙](../computer_vision/safe_landing.md) 및 향후 서비스를 포함하여 보조 컴퓨터의 경로 계획 서비스를 통합하기 위하여 [경로 계획 오프 보드 인터페이스](../computer_vision/path_planning_interface.md)를 사용합니다.

PX4는 [임무중 장애물 회피](../computer_vision/obstacle_avoidance.md#mission_mode), [안전 착륙](../computer_vision/safe_landing.md) 및 향후 서비스를 포함하여 보조 컴퓨터의 경로 계획 서비스를 통합하기 위하여 [경로 계획 오프 보드 인터페이스](../computer_vision/path_planning_interface.md)를 사용합니다.

## 지원 하드웨어

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

