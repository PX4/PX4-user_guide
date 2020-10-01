# 정밀 랜딩

PX4는 [IR-LOCK 센서](https://irlock.com/products/ir-lock-sensor-precision-landing-kit), IR 비컨 (예 [IR-LOCK MarkOne](https://irlock.com/collections/markone)), 그리고 하향 범위 센서를 사용한 *멀티콥터* (PX4 v1.7.4 이상)의 정밀 착륙을 지원합니다. 정밀 착륙은 약 10 cm 이내의 오차로 착륙할 수 있게 합니다 (GPS 착륙은 수 미터의 오차를 가질 수 있습니다).

정밀 착륙은 *Precision Land* 비행 모드나 [미션](#mission)의 일부로 시작할 수 있습니다.

## 설정

### 하드웨어 설정

[ 공식 설명서 ](https://irlock.readme.io/v2.0/docs)에 따라 IR-LOCK 센서를 장착하십시오. 센서의 x축이 기체의 y축과 정렬되어 있는지, 센서의 y축이 기체의 -x 방향과 정렬되어 있는지 확인하십시오 (카메라에서 전방으로 90도 기울인 경우).

[ 범위/거리 센서 ](../getting_started/sensor_selection.md#distance)(* LidarLite v3 *)를 설치해도 문제가 없습니다.

> **참고** 많은 적외선 기반 범위 센서는 IR-LOCK 비컨 센서와 같이 사용할 때 성능이 좋지 않습니다. 호환 가능한 다른 센서는 IR-LOCK 설명서를 참조하십시오.

### 펌웨어 구성

정밀 착륙은 기본적으로 PX4 펌웨어에 포함되지 않은 모듈 `irlock` 및 `landing_target_estimator`가 필요합니다. They can be included by adding (or uncommenting) the following lines in the relevant configuration file for your flight controller (e.g. [Firmware/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/Firmware/blob/master/boards/px4/fmu-v5/default.cmake)):

    drivers/irlock
    modules/landing_target_estimator
    

시스템 부팅 시에도 두 모듈은 반드시 시작되어야 합니다. 지침은 [사용자 정의 시스템 시작](https://dev.px4.io/master/en/concept/system_startup.html#customizing-the-system-startup)을 참조하십시오.

## 소프트웨어 구성(파라미터)

Precision landing is configured with the `landing_target_estimator` and `navigator` parameters, which are found in the "Landing target estimator" and "Precision land" groups, respectively. 가장 중요한 파라미터는 아래에 설명되어 있습니다.

매개 변수 [LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)는 비컨이 정지하거나 또는 움직이는지 결정합니다. `LTEST_MODE `이 이동으로 설정된 경우(예: 착륙할 멀티콥터에 설치된 경우), 비컨 측정은 정밀 랜딩 컨트롤러에서 목표 좌표를 생성하는 데에만 사용됩니다. `LTEST_MODE`가 고정으로 설정되면 비컨 측정은 기체 위치 추정기 (EKF2 또는 LPE)에서도 사용됩니다.

기체에 대한 비컨의 상대 위치와 속도를 추정하기 전에, 매개 변수 [LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) 및 [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y)로 비컨 측정의 스케일을 조정할 수 있습니다. IR-LOCK 센서의 렌즈 왜곡으로 인해 측정 스케일링이 필수적일 수 있습니다. `LTEST_SCALE_X`및 ` LTEST_SCALE_Y`은 기체 프레임이 아니라 센서 프레임을 기준으로 생각해야 합니다.

이러한 스케일 매개변수를 캘리브레이션하려면, `LTEST_MODE`를 moving으로 설정하고, `landing_target_pose`와 `vehicle_local_position` 을 [로깅](https://dev.px4.io/master/en/log/logging.html#configuration)하는 동안 비컨 위로 멀티콥터를 날려 전후좌우로 기체를 움직이십시오. 그런 다음, `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel`를 각각 `vehicle_local_position.vx` and `vehicle_local_position.vy`와 비교하십시오 (각각의 측정은 NED 프레임에서 이루어집니다). 추정된 비컨 속도가 기체 속도보다 일관되게 작거나 크면 스케일 파라미터를 조정하여 캘리브레이션합니다.

`LTEST_MODE`를 정지로 설정하고 정밀 착륙을 하는 도중 기체의 측면에 진동이 나타난다면, 비콘 측정 값이 너무 높게 조정되었을 가능성이 있으므로 관련 방향에서 스케일 매개변수를 줄여야합니다.

## 정밀 착륙 모드

정밀 착륙은 "필수" 또는 "가능성 탐색"으로 설정할 수 있습니다. 이러한 모드 선택은 정밀 착륙 실행에 영향을 미칩니다.

### 필수 모드

*필수 모드*에서 착륙을 시작할 때 아무런 신호를 찾을 수 없다면 기체가 비컨을 찾기 시작합니다. 비컨을 찾는 경우에 기체는 정밀 착륙을 실행합니다.

이런 탐색 과정은 탐색 고도까지 상승하는 것으로 구성됩니다 ([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). 기체가 비컨을 탐색 고도에서 찾을 수 없고, 탐색시간 초과 ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT))이후, 현재 위치에서 일반 착륙을 시작합니다.

### 가능성 탐색 모드

*가능성 탐색 모드*에서는 기체가 착륙이 시행될 때 비컨이 가시적이라면 정밀 착륙을 사용합니다. 비컨이 보이지 않으면, 기체는 즉시 현재 위치에서 *일반* 착륙을 수행합니다.

## 정밀 착륙 수행

> **참고** 현재 좌표 컨트롤러 구현의 한계로, 정밀 착륙은 유효한 GPS 측정 좌표에서만 가능합니다.

### 커맨드를 사용한 수행

정밀 착륙은 아래의 명령으로 시작할 수 있습니다

    commander mode auto:precland
    

이 경우, 정밀 착륙은 "필수" 모드로 간주됩니다.

<span id="mission"></span>

### In a Mission

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `param2` = 0: 비컨 사용 없이 일반 착륙
- `param2` = 1: *가능성 탐색* 모드 정밀 착륙
- `param2` = 1: *필수* 모드 정밀 착륙

## 시뮬레이션

Precision landing with the IR-LOCK sensor and beacon can be simulated in [SITL Gazebo](https://dev.px4.io/master/en/simulation/gazebo.html).

To start the simulation with the world that contains a IR-LOCK beacon and a vehicle with a range sensor and IR-LOCK camera, run:

    make px4_sitl gazebo_iris_irlock
    

You can change the location of the beacon either by moving it in the Gazebo GUI or by changing its location in the [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42).

## 작동 원리

### 착륙 목표 추정

The `landing_target_estimator` takes measurements from the `irlock` driver as well as the estimated terrain height to estimate the beacon's position relative to the vehicle.

The measurements in `irlock_report` contain the tangent of the angles from the image center to the beacon. In other words, the measurements are the x and y components of the vector pointing towards the beacon, where the z component has length "1". This means that scaling the measurement by the distance from the camera to the beacon results in the vector from the camera to the beacon. This relative position is then rotated into the north-aligned, level body frame using the vehicle's attitude estimate. Both x and y components of the relative position measurement are filtered in separate Kalman Filters, which act as simple low-pass filters that also produce a velocity estimate and allow for outlier rejection.

The `landing_target_estimator` publishes the estimated relative position and velocity whenever a new `irlock_report` is fused into the estimate. Nothing is published if the beacon is not seen or beacon measurements are rejected. The landing target estimate is published in the `landing_target_pose` uORB message.

### 고급 기체 위치 추정

If the beacon is specified to be stationary using the parameter `LTEST_MODE`, the vehicle's position/velocity estimate can be improved with the help of the beacon measurements. This is done by fusing the beacon's velocity as a measurement of the negative velocity of the vehicle.

### 정밀 착륙 과정

The precision land procedure consists of three phases:

1. **수평 접근 방식:** 기체는 현재 고도를 유지하면서 비컨에 수평으로 접근합니다. 기체에 대한 비컨 위치가 임계값([PLD_HACC_RAD ](../advanced_config/parameter_reference.md#PLD_HACC_RAD)) 미만인 경우 다음 단계가 입력됩니다. 이 단계에서 비컨이 일정 시간([PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT) 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

2. **비컨 위로 하강:** 기체는 비컨의 중앙에 위치하여 하강합니다. 이 단계에서 비컨이 일정 시간(`PLD_BTOUT` 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

3. **최종 접근 방식:** 기체가 지면과 가까울 때 ([PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), 기체는 비컨의 중앙에 위치하여 하강합니다. 만약 비컨이 이 단계에서 잡히지 않는다면, 기체는 정밀 착륙의 모드와 무관하게 계속 하강합니다.

Search procedures are initiated in 1. and 2. a maximum of [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH) times.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)