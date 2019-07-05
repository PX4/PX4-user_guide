# 정밀 랜딩

PX4는 [IR-LOCK 센서](https://irlock.com/products/ir-lock-sensor-precision-landing-kit), IR 비컨 (예 [IR-LOCK MarkOne](https://irlock.com/collections/markone)), 그리고 하향 범위 센서를 사용한 *멀티콥터* (PX4 v1.7.4 이상)의 정밀 착륙을 지원합니다. 정밀 착륙은 약 10 cm 이내의 오차로 착륙할 수 있게 합니다 (GPS 착륙은 수 미터의 오차를 가질 수 있습니다).

정밀 착륙은 *Precision Land* 비행 모드나 [미션](#mission)의 일부로 시작할 수 있습니다.

## 설정

### 하드웨어 설정

[ 공식 가이드 ](https://irlock.readme.io/v2.0/docs)에 따라 IR-LOCK 센서를 장착하십시오. 센서의 x축이 기체의 y축과 정렬되어 있는지, 센서의 y축이 기체의 -x 방향과 정렬되어 있는지 확인하십시오 (카메라에서 전방으로 90도 기울인 경우).

[ 범위/거리 센서 ](../getting_started/sensor_selection.md#distance)(* LidarLite v3 *)를 설치해도 문제가 없습니다.

> **참고** 많은 적외선 기반 범위 센서는 IR-LOCK 비컨 센서와 같이 사용할 때 성능이 좋지 않습니다. 호환 가능한 다른 센서는 IR-LOCK 가이드를 참조하십시오.

### 펌웨어 구성

정밀 착륙은 기본적으로 PX4 펌웨어에 포함되지 않은 모듈 `irlock` 및 `landing_target_estimator`가 필요합니다. 비행 컨트롤러에 대한 관련 [ 구성 ](https://github.com/PX4/Firmware/tree/master/cmake/configs)에 다음 라인을 추가(또는 조정)하여 포함할 수 있습니다.

    운전자/여객
    모듈/랜딩_target_estimator
    

시스템 부팅 시에도 두 모듈을 시작해야 합니다. 지침은 [사용자 정의 시스템 시작](https://dev.px4.io/master/en/concept/system_startup.html#customizing-the-system-startup)을 참조하십시오.

## 소프트웨어 구성(파라미터)

정밀 착륙은 `랜딩_target_estimator ` 및 ` navigator ` 매개 변수를 사용하여 구성됩니다. 그것은 각각 "토지 목표 추정기"와 "정확한 토지" 그룹에서 발견된다. 가장 중요한 파라미터는 아래에 설명되어 있습니다.

매개 변수 [LTEST_MODE ](../advanced_config/parameter_reference.md#LTEST_MODE)에 따라 비컨이 정지 상태이거나 이동 중인 것으로 가정되는지 여부가 결정됩니다. `LTEST_MODE `이 이동으로 설정된 경우(예: 멀티코터가 착륙하는 차량에 설치된 경우), 비컨 측정은 설정 위치에만 사용됩니다. `LTEST_MODE `이 정지 상태로 설정된 경우 차량 위치 추정기(EKF2 또는 LPE)에서도 신호 측정이 사용됩니다.

매개 변수 [LTEST_SCALE_X ](../advanced_config/parameter_reference.md#LTEST_SCALE_X) 및 [ LTEST_SCALE_Y ](../advanced_config/parameter_reference.md#LTEST_SCALE_Y)를 사용하여 비컨 속도를 추정할 수 있다. IR-LOCK 센서의 렌즈 변형으로 인해 측정 스케일링이 필요할 수 있습니다. 차량 프레임이 아니라 센서 프레임에서 `LTEST_SCALE_X ` 및 ` LTEST_SCALE_Y `을 고려합니다.

이러한 척도 모수를 보정하려면, `LTEST_MODE `을 설정하여 신호등 위로 멀티코터를 날리고 <0t>의 전방 및 좌측 이동을 수행하되, 차량에서는 . 그런 다음 `랜딩_타겟_pose를 비교한다.vx_rel` 및 `랜딩_target_pose.vy_rel` ~ ` kehicle_local_position.vx`과 ` kehicle_local_position.vy` 사이의 측정치는 각각 NED 프레임에 있다(두 측정 단위). 추정된 비컨 속도가 차량 속도보다 일관되게 작거나 크면 스케일 파라미터를 조정하여 보정합니다.</p> 

`정지 상태` 로 설정된 상태에서 정밀 착륙을 수행하는 동안 차량의 느린 횡방향 진동을 관찰할 경우 신호 측정값이 너무 높게 조정되므로 관련 척도 모수를 줄여야 합니다.

## 정밀 토지 모드

정밀 착륙은 "필수" 또는 "기회적"으로 구성할 수 있다. 모드 선택은 정밀 착륙 수행 방법에 영향을 미친다.

### 필수 모드

* 필수 모드 *에서 착륙 시작 시 아무런 신호도 보이지 않을 경우 차량이 신호등을 검색합니다. 표지판이 장착된 경우 차량이 정밀 착륙을 수행합니다.

검색 절차는 검색 고도까지 상승하는 것으로 구성됩니다([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). 검색 고도에서 여전히 신호등이 보이지 않고 검색 시간 초과([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT) 후에 현재 위치에서 정상 착륙이 시작됩니다.

### 기회주의적 모드

* 점성 모드 *에서 *차량은 착지가 시작될 때* 신호등이 보이는 경우에만 정밀 착륙을 사용한다. 차량이 보이지 않으면 즉시 현재 위치에서 * 정상 * 착지를 수행합니다.

## 정밀 랜딩 수행

> **Note** 현재 좌표 컨트롤러 구현의 한계로, 정밀 착륙은 유효한 GPS 측정 좌표에서만 가능합니다.

### 비아 커맨드

정밀 계단참은 명령행 인터페이스를 통해 시작할 수 있습니다.

    카시트를 주문하다.
    

이 경우, 정밀 착륙은 항상 "필수"로 간주된다.

### 미션에서 {#mission}

Precision landing can be initiated as part of a [mission](../flying/missions.md) using [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) with `param2` set appropriately:

- `param2` = 0: Normal landing without using the beacon.
- `param2` = 0: 표지판을 사용하지 않고 일반 착륙.
- `param2 ` = 2: * required * 정밀 착륙.

## 시뮬레이션

IR-LOCK 센서와 비컨을 사용한 정밀 착륙은 [SITL Gazebo ](https://dev.px4.io/en/simulation/gazebo.html)에서 시뮬레이션할 수 있다.

IR-LOCK 비컨과 범위 센서와 IR-LOCK 카메라가 장착된 차량을 사용하여 시뮬레이션을 시작하려면 다음을 실행하십시오.

    make px4_sitl gazebo_iris_irlock
    

Gazebo GUI에서 이동하거나 [ Gazebo World ](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world#L42)에서 위치를 변경하여 비콘의 위치를 변경할 수 있습니다.

## 작동 원리

### 에스컬레이터의 비교

`랜딩_target_estimator `은 `꽃다발`의 운전자와 예상 지반 높이에서 측정하여 차량에 상대적인 비컨 위치를 추정합니다.

` irock_report `의 측정에는 영상 중심에서 비컨으로 각도의 접선이 포함됩니다. 즉, 측정은 z 구성요소의 길이 "1"인 비콘을 가리키는 벡터의 x와 y 성분이다. 즉, 카메라에서 비컨까지의 거리에 따라 측정치를 스케일링하면 벡터가 카메라에서 비컨으로 전환됩니다. 그런 다음 이 상대 위치는 차량의 자세 추정치를 사용하여 북쪽으로 정렬된 수평 차체 프레임으로 회전합니다. 상대 위치 측정의 x와 y 성분 모두 별도의 Kalman 필터로 필터링됩니다. 이 필터는 속도 추정치를 생성하고 특이치 거부를 허용하는 단순한 저역 통과 필터 역할을 합니다.

`랜딩_타겟_estimator `은 새로운 `월호_보고서 `가 추정치에 퓨전될 때마다 추정 상대 위치와 속도를 발표한다. 비컨이 보이지 않거나 신호 측정이 거부되면 아무 것도 게시되지 않습니다. 착륙 목표 추정치는 `랜딩_target_pose ` uORB 메시지에 기재된다.

### 향상된 차량 위치 추정

매개 변수 ` LTEST_MODE `을 사용하여 비컨을 정지 상태로 지정한 경우, 비컨 측정을 통해 차량의 위치/속도 추정치를 개선할 수 있습니다. 이는 차량의 음속 측정으로 비컨의 속도를 퓨전하여 이루어진다.

### 정밀 토지 절차

정밀 토지 절차는 3단계로 구성된다.

1. **수평 접근 방식: ** 차량은 현재 고도를 유지하면서 비컨에 수평으로 접근한다. 차량에 대한 비컨 위치가 임계값([PLD_HACC_RAD ](../advanced_config/parameter_reference.md#PLD_HACC_RAD)) 미만인 경우 다음 단계가 입력됩니다. 이 단계에서 ([PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)보다 오랫동안 볼 수 없는 경우), 검색 절차가 시작되거나(필요한 정밀 착륙 중에) 차량이 정상적인 착지(도착)를 수행한다.

2. **비콘을 통한 조명: ** 차량이 내리막길인 반면, 표지판 위 중앙에 놓여 있습니다. 이 단계에서 (`PLD_BTOUT`보다 오랫동안 볼 수 없는 경우), 검색 절차가 시작되거나(필요한 정밀 착륙 중에) 차량이 정상적인 착지(도착)를 수행한다.

3. ** 최종 접근 방식: ** 차량이 지면에 가까이 있을 때([보다 가까움)PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), 신호기 중앙에 위치하면서 하강한다. 이 단계에서 비콘이 분실되면, 정확한 착지 종류와 무관하게 하강이 지속된다.

검색 절차는 1에서 시작됩니다. 2 최대 0PLD_MAX_SRCH </a>번.

![정밀 랜딩 흐름도](../../assets/precision_land/precland-flow-diagram.png)