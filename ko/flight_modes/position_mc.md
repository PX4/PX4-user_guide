---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/position_mc
---

# 위치 모드(멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*위치* 모드는 롤링이 가능한 비행하기 쉬운 RC 모드입니다. 피치 스틱은 차량의 좌우 및 전후 방향(자동차의 가속 페달과 유사)의 지면 가속을 제어하고, 스로틀은 상승-하강 속도를 제어합니다. 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다. With full stick deflection the vehicle accelerates initially with [MPC_ACC_HOR_MAX](#MPC_ACC_HOR_MAX) ramping down until it reaches the final velocity [MPC_VEL_MANUAL](#MPC_VEL_MANUAL).

:::tip
위치 모드는 새 전단지를위한 가장 안전한 수동 모드입니다. [고도](../flight_modes/altitude_mc.md) 및 [수동 / 안정화](../flight_modes/manual_stabilized_mc.md) 모드와 달리, 차량은 바람의 저항에 의해 감속 될 때까지 계속되는 대신 스틱이 중앙에있을 때 정지합니다. :::

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 (모드 2 송신기의 경우).

![멀티콥터 위치 모드](../../assets/flight_modes/position_MC.png)

### 착륙

이 모드에서 착륙은 용이합니다.
1. 롤 및 피치 스틱을 사용하여 드론을 착륙 지점 위에 수평으로 배치합니다.
1. 롤 및 피치 스틱을 놓고 완전히 멈출 때까지 충분한 시간을 둡니다.
1. 차량이 지면에 닿을 때까지 스로틀 스틱을 부드럽게 아래로 당깁니다.
1. 스로틀 스틱을 끝까지 당기면 지상 감지를 촉진하고 가속화할 수 있습니다.
1. 차량은 프로펠러 추력을 낮추고, 지면을 감지하여 [자동으로 시동 해제](../advanced_config/prearm_arm_disarm.md#auto-disarming)합니다(기본값).

:::warning
잘 보정된 차량에서는 매우 드물지만 때때로 착륙에 문제가 발생할 수 있습니다.
- 차량이 수평으로 움직이지 않는 경우:
  - [고도 모드](../flight_modes/altitude_mc.md)에서 계속 착륙할 수 있습니다. 접근 방식은 롤 및 피치 스틱을 사용하여 차량이 착륙 지점 위에 있는지 수동으로 확인하는 점을 제외하고 위와 동일합니다.
  - 착륙 후 GPS와 자력계 방향을 확인하고 보정합니다.
- 차량이 지상/착륙 및 무장 해제를 감지하지 못하는 경우:
  - 차량이 지상에 도착한 후 스로틀 스틱을 낮게 유지하면서 [수동/안정화 모드](../flight_modes/manual_stabilized_mc.md)로 전환하고 제스처나 다른 명령을 사용하여 수동으로 무장 해제합니다. 또는 차량이 이미 지상에 있을 때 킬 스위치를 사용할 수도 있습니다. :::

## 기술 요약

롤, 피치, 스로틀(RPT) 스틱이 해당 축/방향의 움직임을 제어하는 RC 모드. 중앙에 있는 스틱은 차량을 수평으로 유지하고, 바람에 맞서 고정된 고도와 위치를 유지합니다.

* 중앙 롤, 피치, 스로틀 스틱(RC 데드존 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ) 내)은 바람과 같은 방해 요소에 대해 x, y, z 위치를 안정적으로 유지합니다.
* 센터  외부:
  * 롤/피치 스틱은 차량의 좌우 및 전후 방향(각각)으로 지면에서 수평 가속을 제어합니다.
  * 스로틀 스틱은 상승 하강 속도를 제어합니다.
  * 요 스틱은 수평면 위의  회전 각속도를 제어합니다.
* 이륙:
  * 착륙했을 때 스로틀 스틱을 62.5 % (하단에서 전체 범위) 이상으로 올리면 기체가 이륙합니다.

:::note
* 수동 입력이 필요합니다 (RC 컨트롤러 또는 MAVLink를 통한 게임 패드/엄지 스틱).
* 이 모드는 GPS가 필요합니다. :::

### 매개변수

[Multicopter Position Control ](../advanced_config/parameter_reference.md#multicopter-position-control) 그룹의 모든 매개 변수는 관련이 있습니다. 특정 참고 사항의 몇 가지 매개 변수를 아래에서 설명합니다.

| 매개 변수                                                                                                       | 설명                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_HOLD_DZ"></a>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 위치 유지가 활성화 된 스틱의 Deadzone입니다.  기본값 : 0.1 (전체 스틱 범위의 10 %).                                                                                                                                                                                                                                  |
| <a id="MPC_Z_VEL_MAX_UP"></a>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 최대 수직 상승 속도. 기본값: 3 m/s.                                                                                                                                                                                                                                                                    |
| <a id="MPC_Z_VEL_MAX_DN"></a>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 최대 수직 하강 속도. 기본값: 1 m/s.                                                                                                                                                                                                                                                                    |
| <a id="MPC_LAND_ALT1"></a>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | 느린 착륙의 첫 번째 단계가 동작하는 고도입니다. Below this altitude descending velocity gets limited to a value between [MPC_Z_VEL_MAX_DN](#MPC_Z_VEL_MAX_DN) (or `MPC_Z_V_AUTO_DN`) and [MPC_LAND_SPEED](#MPC_LAND_SPEED). Value needs to be higher than [MPC_LAND_ALT2](#MPC_LAND_ALT2). Default 10m. |
| <a id="MPC_LAND_ALT2"></a>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | 느린 착륙의 두 번째 단계를 위한 고도. Below this altitude descending velocity gets limited to [`MPC_LAND_SPEED`](#MPC_LAND_SPEED). Value needs to be lower than "MPC_LAND_ALT1". 기본값:  5m.                                                                                                               |
| <a id="RCX_DZ"></a>`RCX_DZ`                                                                           | 채널 X의 RC 데드 존. 스로틀에 대한 X 값은 [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE) 값에 따라 달라집니다. 예를 들어, 스로틀이 채널 4 인 경우 [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ)는 데드 존을 지정합니다.                                                                      |
| <a id="MPC_xxx"></a>`MPC_XXXX`                                                                         | 대부분의 MPC_xxx 매개 변수는이 모드에서 비행 동작에 어느정도 영향을 미칩니다 . 예를 들어, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)는 기체의 호버링 추력을 정의합니다.                                                                                                                                      |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)           | 움직임 번역 전략에 대한 입력을 고수하십시오. PX4 v1.12부터 기본(4)은 스틱 위치가 가속을 제어하는 것입니다(자동차 가속 페달과 유사한 방식). 다른 옵션을 사용하면 스무딩 및 가속 제한이 있거나 없는 상태에서 스틱 편향이 지면 위의 속도를 직접 제어할 수 있습니다.                                                                                                                                  |
| <a id="MPC_ACC_HOR_MAX"></a>[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)     | 최대 수평 가속도.                                                                                                                                                                                                                                                                                  |
| <a id="MPC_VEL_MANUAL"></a>[MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL)       | 최대 수평 속도.                                                                                                                                                                                                                                                                                   |
| <a id="MPC_LAND_SPEED"></a>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)      | Landing descend rate. Default 0.7 m/s.                                                                                                                                                                                                                                                      |

## 추가 정보

### 위치 손실 / 안전

위치 모드는 수용 가능한 위치 추정치에 따라 다릅니다. 예를 들어, GPS 손실로 인해 추정치가 허용 수준 이하로 떨어지면 [위치(GPS) 손실 안전 장치](../config/safety.md#position-gps-loss-failsafe)가 동작할 수 있습니다. 구성, 리모컨 보유 여부와 적절 고도 추정치가 있는지 여부에 따라 PX4는 고도 모드, 수동 모드, 착륙 모드로 전환하거나 종료할 수 있습니다.
