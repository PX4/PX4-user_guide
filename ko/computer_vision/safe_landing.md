---
canonicalUrl: https://docs.px4.io/main/ko/computer_vision/safe_landing
---

# 안전 착륙

*안전 착륙* 기능은 비행기가 평평한 곳에 착륙할 수 있게 합니다.

이 기능은 적절한 비전 소프트웨어를 실행하는 보조 컴퓨터가있는 멀티콥터의 [착륙 모드](../flight_modes/land.md) 및 [임무 모드](../flight_modes/mission.md)에서 활성화 할 수 있습니다. 멀티콥터 모드의 VTOL에서도 사용할 수 있습니다.

착륙 명령을 받으면 기체는 먼저 표면을 측정할 수있는 높이로 하강합니다 (보조 컴퓨터 `loiter_height` 매개 변수). 착륙 영역이 충분히 평평하지 않은 경우에는 비행기는 정사각형 나선형 패턴으로 바깥쪽으로 이동하여 주기적으로 정지하여 너무 거칠지 않은 착륙 지점을 다시 검색합니다.

@[유투브](https://youtu.be/9SuJYcT0Mgc)

## 제약 사항과 성능

안전 착륙은 거친 지형에서 평평한 지역을 찾기 위해 설계되었습니다.

- 도로에 착륙하는 것은 방지되지는 않습니다. 자동차가 감지되어 지나가면 "잊혀집니다".
- 레이더 또는 초음파 센서를 사용하는 경우 물에 착륙 할 수 있지만, 스테레오 카메라 또는 LIDAR를 사용하는 경우 발생하지 않아야 합니다.
  - 시스템은 접지를 감지할 수있는 경우에만 착륙합니다. 스테레오 카메라의 경우 분석을 위한 충분한 구별 기능을 가질 수 있을 정도로 거친 물은 착륙하기에 충분히 평평하지 않습니다.


## PX4 설정

안전 착륙은 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID)를 1로 [설정](../advanced_config/parameters.md)하여 PX4내에서 활성화됩니다.

:::note
`COM_OBS_AVOID`는 [안전 착륙](../computer_vision/obstacle_avoidance.md#mission_mode) 및 PX4 [경로 계획 오프 보드 인터페이스](../computer_vision/path_planning_interface.md) (추적 인터페이스)를 사용하는 기타 기능을 활성화하여 외부 경로 계획 서비스를 PX4와 통합합니다.
:::

## 보조 컴퓨터 설정

Companion-side setup and configuration is provided in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) Github repo.

여기에는 장애물 회피 및 충돌 방지를위한 일반적인 설정이 포함되며 *안전 착륙 플래너* (이 기능은 보조컴퓨터에서 제공)를 사용하기위한 특정 섹션이 포함됩니다.
* [시뮬레이션 설정](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
* [Hardware setup](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)

구성 정보에는 다양한 카메라, 차량 크기 및 착륙 여부를 결정하는 높이에 대한 안전 착륙을 설정 방법이 포함하고 있습니다.


<span id="interface"></span>
## 안전 착륙 인터페이스

PX4는 [임무중 장애물 회피](../computer_vision/obstacle_avoidance.md#mission_mode), [안전 착륙](../computer_vision/safe_landing.md) 및 향후 서비스를 포함하여 보조 컴퓨터의 경로 계획 서비스를 통합하기 위하여 [경로 계획 오프 보드 인터페이스](../computer_vision/path_planning_interface.md)를 사용합니다.

PX4와 보조 컴퓨터간의 인터페이스(전송된 메시지)는 다른 경로 계획 서비스와 정확히 동일합니다. 그러나 안전 착륙 계획자는 원하는 경로에 대한 `TRAJECTORY_REPRESENTATION_WAYPOINTS` 메시지의 Point 0에있는 정보만 사용합니다.


## 지원 하드웨어

Tested companion computers and cameras are listed in [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

## 추가 정보

* [비전 및 보드 외부 제어 인터페이스](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 개발자 서밋 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance)
  * [시뮬레이션 설정 > 안전 착륙 플래너](https://github.com/PX4/PX4-Avoidance#safe-landing-planner)
  * [하드웨어 설정 > 안전 착륙 플래너](https://github.com/PX4/PX4-Avoidance#safe-landing-planner-1)
