# 안전 착륙

*안전 착륙* 기능은 비행기가 평평한 곳에 착륙할 수 있게 합니다.

이 기능은 적절한 비전 소프트웨어를 실행하는 보조 컴퓨터가있는 멀티콥터의 [착륙 모드](../flight_modes/land.md) 및 [임무 모드](../flight_modes/mission.md)에서 활성화 할 수 있습니다. 멀티콥터 모드의 VTOL에서도 사용할 수 있습니다.

착륙 명령을 받으면 기체는 먼저 표면을 측정할 수있는 높이로 하강합니다 (보조 컴퓨터 `loiter_height` 매개 변수). 착륙 영역이 충분히 평평하지 않은 경우에는 비행기는 정사각형 나선형 패턴으로 바깥쪽으로 이동하여 주기적으로 정지하여 너무 거칠지 않은 착륙 지점을 다시 검색합니다. 

@[유투브](https://youtu.be/9SuJYcT0Mgc)

## 제약 사항과 성능

안전 착륙은 거친 지형에서 평평한 지역을 찾기 위해 설계되었습니다.

- Landing on a road is not prevented; if a car is detected it will be "forgotten" once it moves past.
- Landing on water may occur if using radar or ultrasound sensors, but should not occur if using stereo cameras or LIDAR. 
  - The system will only land if it is able to detect ground. For stereo cameras, water that is rough enough to have sufficient distinguishing features for analysis will not be flat enough to land on.

## PX4 Configuration

Safe landing is enabled within PX4 by [setting](../advanced_config/parameters.md) the [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID) to 1.

:::note
`COM_OBS_AVOID` also enables [Obstacle Avoidance in Missions](../computer_vision/obstacle_avoidance.md#mission_mode) and any other features that use the [Path Planning Offboard Interface](../computer_vision/path_planning_interface.md) (Trajectory Interface) to integrate external path planning services with PX4.
:::

## Companion Computer Setup

Companion-side setup and configuration is provided in the [PX4/avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github repo.

This covers the common setup for obstacle avoidance and collision prevention, and includes specific sections for using the *safe landing planner* (which provides companion-side support for this feature):

* [Simulation setup](https://github.com/PX4/avoidance#safe-landing-planner)
* [Harware setup](https://github.com/PX4/avoidance#safe-landing-planner-1)

The configuration information includes, among other things, how to set up safe landing for different cameras, sizes of vehicles, and the height at which the decision to land or not is taken.

<span id="interface"></span>

## 안전 착륙 인터페이스

PX4 uses the [Path Planning Interface](../computer_vision/path_planning_interface.md) for integrating path planning services from a companion computer (including [Obstacle Avoidance in missions](../computer_vision/obstacle_avoidance.md#mission_mode), [Safe Landing](../computer_vision/safe_landing.md), and future services).

The interface (messages sent) between PX4 and the companion are exactly the same as for any other path planning services. Note however that the safe landing planner only uses information in Point 0 of the `TRAJECTORY_REPRESENTATION_WAYPOINTS` message for the desired path.

## 지원 하드웨어

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

## 추가 정보

* [비전 및 보드 외부 제어 인터페이스](https://youtu.be/CxIsJWtVaTA?t=963) (PX4 개발자 서밋 2019: Martina Rivizzigno, Auterion Computer Vision Engineer)
* [PX4/avoidance](https://github.com/PX4/avoidance) 
  * [모의 시험 환경 설정 > 안전 착륙 계획](https://github.com/PX4/avoidance#safe-landing-planner)
  * [하드웨어 설정 > 안전 착륙 계획](https://github.com/PX4/avoidance#ssafe-landing-planner-1)