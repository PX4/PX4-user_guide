# 정밀 랜딩

PX4는 [IR-LOCK 센서](https://irlock.com/products/ir-lock-sensor-precision-landing-kit), IR 비컨 (예 [IR-LOCK MarkOne](https://irlock.com/collections/markone)), 그리고 하향 범위 센서를 사용한 *멀티콥터* (PX4 v1.7.4 이상)의 정밀 착륙을 지원합니다. 정밀 착륙은 약 10 cm 이내의 오차로 착륙할 수 있게 합니다 (GPS 착륙은 수 미터의 오차를 가질 수 있습니다).

정밀 착륙은 *Precision Land* 비행 모드나 [미션](#mission)의 일부로 시작할 수 있습니다.

## 설정

### 하드웨어 설정

[ 공식 가이드 ](https://irlock.readme.io/v2.0/docs)에 따라 IR-LOCK 센서를 장착하십시오. 센서의 x축이 기체의 y축과 정렬되어 있는지, 센서의 y축이 기체의 -x 방향과 정렬되어 있는지 확인하십시오 (카메라에서 전방으로 90도 기울인 경우).

[ 범위/거리 센서 ](../getting_started/sensor_selection.md#distance)(* LidarLite v3 *)를 설치해도 문제가 없습니다.

> **참고** 많은 적외선 기반 범위 센서는 IR-LOCK 비컨 센서와 같이 사용할 때 성능이 좋지 않습니다. 호환 가능한 다른 센서는 IR-LOCK 가이드를 참조하십시오.

### 펌웨어 구성

정밀 착륙은 기본적으로 PX4 펌웨어에 포함되지 않은 모듈 `irlock` 및 `landing_target_estimator`가 필요합니다. 비행 제어기와 관련된 [config](https://github.com/PX4/Firmware/tree/master/cmake/configs)에 다음 라인을 추가하여 (또는 주석 마크를 지워서) 모듈을 포함(include)시킬 수 있습니다.

    drivers/irlock
    modules/landing_target_estimator
    

시스템 부팅 시에도 두 모듈은 반드시 시작되어야 합니다. 지침은 [사용자 정의 시스템 시작](https://dev.px4.io/master/en/concept/system_startup.html#customizing-the-system-startup)을 참조하십시오.

## 소프트웨어 구성(파라미터)

정밀 착륙은 `landing_target_estimator ` 및 `navigator` 매개변수를 사용하여 구성됩니다. 위의 매개변수는 각각 "Landing target estimator"와 "Precision land" 그룹에서 찾을 수 있습니다. 가장 중요한 파라미터는 아래에 설명되어 있습니다.

매개 변수 [LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)는 비컨이 정지하거나 또는 움직이는지 결정합니다. `LTEST_MODE `이 이동으로 설정된 경우(예: 착륙할 멀티콥터에 설치된 경우), 비컨 측정은 정밀 랜딩 컨트롤러에서 목표 좌표를 생성하는 데에만 사용됩니다. `LTEST_MODE`가 고정으로 설정되면 비컨 측정은 기체 위치 추정기 (EKF2 또는 LPE)에서도 사용됩니다.

기체에 대한 비컨의 상대 위치와 속도를 추정하기 전에, 매개 변수 [LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) 및 [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y)로 비컨 측정의 스케일을 조정할 수 있습니다. IR-LOCK 센서의 렌즈 왜곡으로 인해 측정 스케일링이 필수적일 수 있습니다. `LTEST_SCALE_X`및 ` LTEST_SCALE_Y`은 기체 프레임이 아니라 센서 프레임을 기준으로 생각해야 합니다.

이러한 스케일 매개변수를 보정하려면, `LTEST_MODE`을 이동으로 설정하고, 비컨 위로 멀티콥터를 날려 전후좌우로 기체를 움직이십시오. 동작을 수행하는 중에 logging<1>, `landing_target_pose`와 `vehicle_local_position`이 설정되어야 합니다. 그런 다음, `landing_target_pose.vx_rel` and `landing_target_pose.vy_rel`를 각각 `vehicle_local_position.vx` and `vehicle_local_position.vy`와 비교하십시오 (각각의 측정은 NED 프레임에서 이루어집니다). 추정된 비컨 속도가 기체 속도보다 일관되게 작거나 크면 스케일 파라미터를 조정하여 보정합니다.</p> 

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

### 미션에서의 수행 {#mission}

정밀 착륙은 `param2`을 적절히 설정해 [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND)를 사용하여 [미션](../flying/missions.md)의 일부로 시작됩니다.

- `param2` = 0: 비컨 사용 없이 일반 착륙
- `param2` = 1: *가능성 탐색* 모드 정밀 착륙
- `param2` = 1: *필수* 모드 정밀 착륙

## 시뮬레이션

IR-LOCK 센서와 비컨을 사용한 정밀 착륙은 [SITL Gazebo ](https://dev.px4.io/en/simulation/gazebo.html)에서 시뮬레이션할 수 있습니다.

IR-LOCK 비컨과 범위 센서와 IR-LOCK 카메라가 장착된 기체를 사용하여 시뮬레이션을 시작하려면 다음을 실행하십시오.

    make px4_sitl gazebo_iris_irlock
    

비컨은 Gazebo GUI에서 이동시키거나, [Gazebo world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42)에서 비컨을 이동하여 위치를 변경할 수 있습니다.

## 작동 원리

### 착륙 목표 추정

`landing_target_estimator`는 `irlock` 드라이버로부터 측정값을 받을 뿐 아니라, 기체로부터의 비컨의 상대 위치를 추정하기 위한 예상 지형 고도를 받아옵니다.

`irock_report `의 측정에는 영상 중심에서 비컨으로 각도의 접선이 포함됩니다. 다른 말로, 측정은 z 성분의 크기가 1이고, 측정은 비컨을 가르키는 벡터의 x와 y성분입니다. 비컨에서 카메라부터의 거리의 측정을 스케일링하는것은 비컨에서 카메라까지의 벡터를 반환합니다. 이것으로 상대 위치는 북쪽으로 정렬되게 회전하고, 기체 자세 추정치를 사용해 기체 프레임을 수평으로 만듭니다. 상대 위치 측정의 x, y 성분은 별도의 칼만 필터로 필터링됩니다. 이 필터는 속도 추정치를 생성하고 일시적으로 생긴 이상값을 거부하는 단순 저대역 필터입니다.

`landing_target_estimator`는 새로운 `irlock-report`가 추정치에 결합될 때마다 추정 상대 위치와 속도를 보고합니다. 비컨이 보이지 않거나, 신호 측정이 거절되면 아무 것도 보고되지 않습니다. 착륙 목표 추정치는 `landing_targett_pose ` uORB 메시지에 게재됩니다.

### 고급 기체 위치 추정

매개 변수 ` LTEST_MODE `을 사용하여 비컨을 정지 상태로 지정한 경우, 비컨 측정을 통해 차량의 위치/속도 추정치를 개선할 수 있습니다. 이는 차량의 음속 측정으로 비컨의 속도를 퓨전하여 이루어진다.

### 정밀 토지 절차

정밀 토지 절차는 3단계로 구성된다.

1. **수평 접근 방식: ** 차량은 현재 고도를 유지하면서 비컨에 수평으로 접근한다. 차량에 대한 비컨 위치가 임계값([PLD_HACC_RAD ](../advanced_config/parameter_reference.md#PLD_HACC_RAD)) 미만인 경우 다음 단계가 입력됩니다. 이 단계에서 ([PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)보다 오랫동안 볼 수 없는 경우), 검색 절차가 시작되거나(필요한 정밀 착륙 중에) 차량이 정상적인 착지(도착)를 수행한다.

2. **비콘을 통한 조명: ** 차량이 내리막길인 반면, 표지판 위 중앙에 놓여 있습니다. 이 단계에서 (`PLD_BTOUT`보다 오랫동안 볼 수 없는 경우), 검색 절차가 시작되거나(필요한 정밀 착륙 중에) 차량이 정상적인 착지(도착)를 수행한다.

3. ** 최종 접근 방식: ** 차량이 지면에 가까이 있을 때([보다 가까움)PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), 신호기 중앙에 위치하면서 하강한다. 이 단계에서 비콘이 분실되면, 정확한 착지 종류와 무관하게 하강이 지속된다.

검색 절차는 1에서 시작됩니다. 2 최대 0PLD_MAX_SRCH </a>번.

![정밀 랜딩 흐름도](../../assets/precision_land/precland-flow-diagram.png)