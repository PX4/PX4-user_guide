---
canonicalUrl: https://docs.px4.io/main/ko/advanced_features/precland
---

# 정밀 착륙

PX4는 고정 또는 이동 표적에 대한 *멀티콥터*의 정밀 착륙을 지원합니다. 표적은 온보드 IR 센서와 착륙 표지 또는 오프보드 포지셔닝 시스템에 의해 제공될 수 있습니다.

정밀 착륙은 [미션](#mission)의 일부로, [복귀 모드](#return-mode-precision-landing) 착륙 또는 [* Precision Land* 비행 모드](#precision-landing-flight-mode)로 시작할 수 있습니다.

:::note
정밀 착륙은 유효한 전역 위치에서만 가능합니다(현재 위치 컨트롤러 구현의 제한으로 인해).
:::

## 개요

### 착륙 모드

정밀 착륙은 "필수" 또는 "가능성 탐색"으로 설정 가능합니다. 선택한 모드에 따라 정밀착륙 매커니즘은 달라집니다.

#### 필수 모드

*필수 모드*에서 착륙을 시작할 때 아무런 신호를 찾을 수 없으면 기체는 목표물을 찾기 시작합니다. 목표물을 찾은 경우에는 기체는 정밀 착륙을 실행합니다.

이런 탐색 과정은 탐색 고도까지 상승을 포함합니다([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). 기체가 목표물을 탐색 고도에서 찾을 수 없고, 탐색시간 초과 ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT))이후에는 현재 위치에서 일반 착륙을 시작합니다.

:::note
If using an offboard positioning system PX4 assumes that the target is visible when it is receiving MAVLink [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) messages.
:::

#### 가능성 탐색 모드

*가능성 탐색 모드*에서는 기체가 착륙이 시행될 때 목표물이 가시적이면 정밀 착륙을 시작합니다. 목표물이 보이지 않으면, 기체는 즉시 현재 위치에서 *일반* 착륙을 수행합니다.

### 착륙 과정

정밀 착륙에는 세 단계가 있습니다.

1. **수평 접근 방식:** 기체는 현재 고도를 유지하면서 목표물에 수평으로 접근합니다. 기체에 대한 목표물 위치가 임계값([PLD_HACC_RAD ](../advanced_config/parameter_reference.md#PLD_HACC_RAD)) 미만인 경우 다음 단계가 입력됩니다. 이 단계에서 목표물이 일정 시간([PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT) 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

1. **목표물 위로 하강:** 기체는 목표물의 중앙에 위치하여 하강합니다. 이 단계에서 목표물이 일정 시간(`PLD_BTOUT` 이상의 시간) 동안 잡히지 않으면, 탐색 과정이 시작되거나 (정밀 착륙이 "필수" 모드일 때,) 기체는 일반 착륙을 수행합니다 ( "가능성 탐색" 정밀 착륙 모드일 때).

1. **최종 접근 방식:** 기체가 지면과 가까울 때 ([PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), 기체는 목표물의 중앙에 위치하여 하강합니다. 만약 목표물이 이 단계에서 잡히지 않는다면, 기체는 정밀 착륙의 모드와 무관하게 계속 하강합니다.

검색 절차는 첫 번째 및 두 번째 단계에서 시작되며, 최대 [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)회 실행됩니다. 착륙 단계 흐름도

단계를 보여주는 [착륙 단계 흐름도](#landing-phases-flow-diagram)는 아래와 같습니다.

## 정밀 착륙 수행

정밀 착륙은 임무, *귀환 모드*의 착륙 단계 또는 *정밀 착륙* 모드로 진입하여 사용할 수 있습니다.

<a id="mission"></a>

### 미션 모드 정밀 착륙

정밀 착륙은 `param2`을 적절히 설정하여 [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND)를 사용하여 [임무](../flying/missions.md)의 일부로 시작됩니다.

- `0`: 목표물을 사용하지 않고 정상 착지합니다.
- `1`: [가능성 탐색](#opportunistic-mode) 정밀 착륙
- `2`: [필수](#required-mode) 정밀 착륙

### 리턴 모드 정밀 착륙

정밀 착지는 [복귀 모드](../flight_modes/return.md) 착지 단계에서 사용할 수 있습니다.

이것은 다음 값을 취하는 매개변수 [RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD)를 사용하여 활성화됩니다.

- `0`: 정밀 착륙이 비활성화되었습니다(정상적으로 착륙).
- `1`: [가능성 탐색](#opportunistic-mode) 정밀 착륙
- `2`: [필수](#required-mode) 정밀 착륙


### 정밀 착륙 비행 모드

정밀 착륙은 *정밀 착륙* 비행 모드로 전환하여 활성화됩니다.

[*QGroundControl* MAVLink 콘솔](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console)을 사용하여 다음 명령을 입력하여 이를 확인할 수 있습니다.
```
commander mode auto:precland
```

:::note
이런 방법으로 모드를 전환하는 경우에는 정밀 착륙은 항상 "필수"입니다. 착륙 유형을 지정할 수 있는 방법은 없습니다.
:::

:::note
작성 시점에 정밀 착륙을 직접 호출하는 *편리한* 방법은 없습니다(리턴 모드 명령 제외).
- *QGroundControl*은 이를 UI 옵션으로 제공하지 않습니다.
- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND)는 임무에서만 작동합니다.
- [MAV_CMD_DO_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_MODE) should work, but you will need to determine the appropriate base and custom modes used by PX4 to represent the precision landing mode.
:::


## 하드웨어 설정

### IR 센서/비콘 설정

IR 센서/착륙 비콘 솔루션에는 [IR-LOCK 센서](https://irlock.com/products/ir-lock-sensor-precision-landing-kit)와 비행 컨트롤러에 연결된 하향식 [거리 센서](../sensor/rangefinders.md), 그리고 표적으로 IR 비콘이 필요합니다(예:

IR-LOCK MarkOne</2 >). 정밀 착륙은 약 10 cm 이내의 오차로 착륙할 수 있게 합니다. GPS 착륙은 수 미터의 오차가 발생할 수 있습니다.</p> 

[공식 매뉴얼](https://irlock.readme.io/v2.0/docs)에 따라 IR-LOCK 센서를 장착하십시오. 센서의 x축이 기체의 y축과 정렬되어 있는지, 센서의 y축이 기체의 -x 방향과 정렬되어 있는지 확인하십시오 (카메라에서 전방으로 90도 기울인 경우).

[ 범위거리 센서 ](../getting_started/sensor_selection.md#distance)(*LidarLite v3*)를 설치에도 문제가 없습니다.

:::note
대부분의 적외선 범위 센서는 IR-LOCK 비콘이 있는 경우에는 제대로 작동하지 않습니다.
호환 가능한 다른 센서는 IR-LOCK 설명서를 참조하십시오.
:::



## 오프보드 포지셔닝

오프보드 솔루션에는 MAVLink [Landing Target Protocol](https://mavlink.io/en/services/landing_target.html)을 구현하는 포지셔닝 시스템이 필요합니다. 이것은 착륙 목표를 결정하기 위해 모든 위치 지정 메커니즘을 사용할 수 있습니다(예: 컴퓨터 비전 및 시각적 표시).

시스템은 [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) 메시지에 대상의 좌표를 게시하여야 합니다. 시스템은 [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) 메시지에 대상의 좌표를 게시하여야 합니다. 로컬 NED 프레임 [0,0]의 원점은 홈 위치입니다([GPS_GLOBAL_ORIGIN](https://mavlink.io/en/messages/common.html#GPS_GLOBAL_ORIGIN)을 사용하여 이 홈 위치를 전역 좌표에 매핑할 수 있음).

PX4는 [거리 센서](../sensor/rangefinders.md) 또는 기타 센서를 명시적으로 필요로 하지 않지만, 자체 위치를 더 정확하게 결정할 수 있다면 더 나은 성능을 나타낼 수 있습니다.



## 펌웨어 설정

정밀 착륙에는 `irlock` 및 `landing_target_estimator` 모듈이 필요합니다. 이들은 대부분의 비행 컨트롤러에 PX4 펌웨어에 기본적으로 포함되어 있습니다.

FMUv2 기반 컨트롤러에는 기본적으로 포함되지 않습니다. 이러한 보드 및 포함되지 않은 기타 보드에서는 비행 컨트롤러에 대한 관련 구성 파일에서 다음 키를 'y'로 설정하여 보드를 추가할 수 있습니다. (예: FMUv5: [PX4-Autopilot/boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.px4board)):



```
CONFIG_DRIVERS_IRLOCK=y
CONFIG_MODULES_LANDING_TARGET_ESTIMATOR=y
```




## PX4 매개변수 설정

IR-Lock 센서는 기본적으로 비활성화되어 있습니다. [SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK)을 `1`(true)로 설정하여 활성화합니다.

매개변수 [LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)는 목표물이 정지할 것인 지 또는 움직일 것인 지를 결정합니다. `LTEST_MODE `이 이동으로 설정된 경우(예: 착륙할 멀티콥터에 설치된 경우), 목표물 측정은 정밀 랜딩 컨트롤러에서 목표 좌표 생성에만 사용됩니다. `LTEST_MODE`가 고정으로 설정되면 목표물 측정은 기체 위치 추정기 (EKF2 또는 LPE)에서도 사용됩니다.

다른 관련 매개변수는 [Landing_target estimator](../advanced_config/parameter_reference.md#landing-target-estimator) 및 [Precision land](../advanced_config/parameter_reference.md#precision-land) 매개변수 아래 매개변수 참조에서 설명되어 있습니다. 가장 유용한 몇 가지가 아래에 나열되어 있습니다.

| 매개변수                                                                                                  | 설명                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <a id="SENS_EN_IRLOCK"></a>[SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) | IR-LOCK 센서(외부 I2C). 비활성화: `0`(기본값): 활성화: `1`).                                        |
| <a id="LTEST_MODE"></a>[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)           | 착륙 대상이 이동 중(`0`) 또는 정지해 있습니다(`1`). 기본값은 이동입니다.                                        |
| <a id="PLD_HACC_RAD"></a>[PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)     | 차량이 하강을 시작할 수평 허용 반경입니다. 기본값은 0.2m입니다.                                                |
| <a id="PLD_BTOUT"></a>[PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)             | 착륙 목표 시간 초과 후 목표물이 손실된 것으로 간주됩니다. 기본값은 5초 입니다.                                        |
| <a id="PLD_FAPPR_ALT"></a>[PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)   | 최종 접근 고도. 기본값은 0.1 미터 입니다.                                                            |
| <a id="PLD_MAX_SRCH"></a>[PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)     | 착륙시 최대 검색 시도 횟수입니다.                                                                   |
| <a id="RTL_PLD_MD"></a>[RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD)         | RTL 정밀 지상 모드. `0`: 비활성화됨, `1`: [기회적](#opportunistic-mode), `2`: [필수](#required-mode). |





### IR 비콘 스케일링

IR-LOCK 센서의 렌즈 왜곡으로 인해 측정 스케일링이 필수적입니다.

기체에 대한 비컨의 상대 위치와 속도를 추정하기 전에, 매개변수 [LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X)와 [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y)로 비컨 측정의 스케일을 조정할 수 있습니다. `LTEST_SCALE_X`와 `LTEST_SCALE_Y`은 기체 프레임이 아니라 센서 프레임을 기준이어야 합니다.

이러한 스케일 매개변수를 보정에는 `LTEST_MODE`를 moving으로 설정하고, `landing_target_pose`와 `vehicle_local_position` 을 [로깅](../dev_log/logging.md#configuration)하는 동안 비컨 위로 멀티콥터를 날려 전후좌우로 기체를 움직이십시오. 그런 다음, `landing_target_pose.vx_rel`와 `landing_target_pose.vy_rel`를 각각 `vehicle_local_position.vx`와 `vehicle_local_position.vy`와 비교하십시오 (각각의 측정은 NED 프레임에서 이루어집니다). 추정된 비컨 속도가 기체 속도보다 일관되게 작거나 크면 스케일 파라미터를 조정하여 보정합니다.

`LTEST_MODE`를 정지로 설정하고 정밀착륙 도중 기체의 측면에 진동이 나타나면, 비콘 측정 값이 너무 높게 조정되었을 가능성이 있으므로 관련 방향에서 스케일 매개변수를 줄여야합니다.



## 시뮬레이션

Precision landing with the IR-LOCK sensor and beacon can be simulated in [Gazebo Classic](../sim_gazebo_classic/README.md).

IR-LOCK 비컨과 범위 센서와 IR-LOCK 카메라가 장착된 기체를 사용하여 시뮬레이션을 시작하려면 다음을 실행하십시오.



```
make px4_sitl gazebo-classic_iris_irlock
```


You can change the location of the beacon either by moving it in the Gazebo Classic GUI or by changing its location in the [Gazebo world](https://github.com/PX4/PX4-SITL_gazebo-classic/blob/main/worlds/iris_irlock.world#L42).



## 작동 원리



### 착륙 목표 추정기

`landing_target_estimator`는 `irlock` 드라이버로부터 측정값을 받을 뿐 아니라, 기체로부터의 비컨의 상대 위치를 추정하기 위한 예상 지형 고도를 받아옵니다.

`irock_report`의 측정에는 영상 중심에서 비컨으로 각도의 접선이 포함됩니다. 다른 말로, 측정은 z 성분의 크기가 1이고, 측정은 비컨을 나타내는 벡터의 x와 y성분입니다. 비컨에서 카메라부터의 거리의 측정을 스케일링하는것은 비컨에서 카메라까지의 벡터를 반환합니다. 이것으로 상대 위치는 북쪽으로 정렬되게 회전하고, 기체 자세 추정치를 사용해 기체 프레임을 수평으로 만듭니다. 상대 위치 측정의 x, y 성분은 별도의 칼만 필터로 필터링됩니다. 이 필터는 속도 추정치를 생성하고 일시적으로 생긴 이상값을 거부하는 단순 저대역 필터입니다.

`landing_target_estimator`는 새로운 `irlock-report`가 추정치에 결합시 마다 매번 추정 상대 위치와 속도를 보고합니다. 비컨이 보이지 않거나, 신호 측정이 거부되면 아무 것도 보고하지 않습니다. 착륙 목표 추정치는 `landing_targett_pose` uORB 메시지에 게재됩니다.



### 고급 기체 위치 추정 

타겟이 매개변수 `LTEST_MODE`를 사용하여 정지 상태로 지정되면, 타겟 측정을 통하여 기체의 위치/속도 추정치를 개선할 수 있습니다. 기체의 음의 속도를 측정을 목표물의 속도와 결합하여 추정합니다.




### 착륙 단계 흐름도

아래의 이미지는 [착륙 단계](#landing-phases)를 흐름도로 나타냅니다.

![정밀 착륙 흐름도](../../assets/precision_land/precland-flow-diagram.png)
