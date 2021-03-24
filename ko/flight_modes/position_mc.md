# 위치 모드(멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*위치 모드*는 롤 앤 피치 스틱이지면에서 좌우 방향 및 전후 방향으로 속도를 제어하는 비행하기 쉬운 RC 모드입니다 (차량의 "전방"기준). 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다.

:::tip
위치 모드는 새 전단지를위한 가장 안전한 수동 모드입니다. [고도](../flight_modes/altitude_mc.md) 및 [수동 / 안정화](../flight_modes/manual_stabilized_mc.md) 모드와 달리, 차량은 바람의 저항에 의해 감속 될 때까지 계속되는 대신 스틱이 중앙에있을 때 정지합니다.
:::

아래 다이어그램은 모드 동작을 시각적으로 보여줍니다 (모드 2 송신기의 경우).

![멀티콥터 위치 모드](../../assets/flight_modes/position_MC.png)

:::warning
이 모드에서 착륙시에 주의하여야 합니다. 이 모드에 처음 착륙시 시동 해제를 위해 [수동/안정](../flight_modes/manual_stabilized_mc.md)으로 전환할 준비를하십시오. 착지가 올바르게 감지되면 모터가 터치 다운 후 회전하고 곧바로 시동 해제됩니다. 모터가 더 높은 RPM으로 계속 회전하거나 회전을 시작하면 먼저 [수동/안정화(멀티콥터)](../flight_modes/manual_stabilized_mc.md)로 전환한 다음 해제하십시오. GPS 드리프트로 인해 기체가 지면에서 전복될 수 있습니다.
:::

## 기술 요약

RPT 스틱이 해당 방향으로 *속도*를 제어하는 RC 수동 모드. 중앙 스틱은 차량을 수평으로 유지하고 바람에 맞서 고정된 위치와 고도를 유지합니다.

* 중앙에있는 RPT 스틱은 바람과 수평 자세에 대해 x, y, z 위치를 안정적으로 유지합니다.
* 센터 외부: 
  * 롤/피치 스틱은 기체의 "전방"을 기준으로 지면에서 좌우 방향 및 전후 방향 (각각)으로 속도를 제어합니다.
  * 스로틀 스틱은 상승 하강 속도를 제어합니다.
  * 요 스틱은 수평면 위의 회전 각속도를 제어합니다.
* 이륙: 
  * 착륙했을 때 스로틀 스틱을 62.5 % (하단에서 전체 범위) 이상으로 올리면 기체가 이륙합니다.
* 착륙: 
  * 지면 ([MPC_LAND_ALT2](#MPC_LAND_ALT2))에 가까울 때 수평 속도가 제한됩니다 ([MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)).

:::note

* 수동 입력이 필요합니다 (RC 컨트롤러 또는 MAVLink를 통한 게임 패드/엄지 스틱).
* 이 모드는 GPS가 필요합니다.
:::

### 매개 변수

[Multicopter Position Control ](../advanced_config/parameter_reference.md#multicopter-position-control) 그룹의 모든 매개 변수는 관련이 있습니다. 특정 참고 사항의 몇 가지 매개 변수가 아래에 기술되어 있습니다.

| 매개 변수                                                                                                       | 설명                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)             | 위치 유지가 활성화 된 스틱의 Deadzone입니다. 기본값 : 0.1 (전체 스틱 범위의 10 %).                                                                                                                                                              |
| <span id="MPC_Z_VEL_MAX_UP"></span>[MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) | 최대 수직 상승 속도. 기본값: 3 m/s.                                                                                                                                                                                               |
| <span id="MPC_Z_VEL_MAX_DN"></span>[MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) | 최대 수직 하강 속도. 기본값: 1 m/s.                                                                                                                                                                                               |
| <span id="MPC_LAND_VEL_XY"></span>[MPC_LAND_VEL_XY](../advanced_config/parameter_reference.md#MPC_LAND_VEL_XY)     | 지면에 가까울 때 수평 속도 제한 (지상에서 [MPC_LAND_ALT2](#MPC_LAND_ALT2) 미터 위 또는 지면과의 거리를 알 수 없는 경우에는 홈 위치 위). 기본값: 10 m/s.                                                                                                          |
| <span id="MPC_LAND_ALT1"></span>[MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)         | 느린 착륙의 첫 번째 단계가 동작하는 고도입니다. 최대 허용 수평 속도 설정점에 영향을 끼칩니다. 기본값: 5m.                                                                                                                                                        |
| <span id="MPC_LAND_ALT2"></span>[MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)         | 느린 착륙의 두 번째 단계를 위한 고도. 이 단계에서 최대 수평 속도는 [MPC_LAND_VEL_XY](#MPC_LAND_VEL_XY)로 제한됩니다. 기본값: 5m.                                                                                                                         |
| <span id="RCX_DZ"></span>`RCX_DZ`                                                                           | 채널 X의 RC 데드 존. 스로틀에 대한 X 값은 [RC_MAP_THROTTLE](../advanced_config/parameter_reference.md#RC_MAP_THROTTLE) 값에 따라 달라집니다. 예를 들어, 스로틀이 채널 4 인 경우 [RC4_DZ](../advanced_config/parameter_reference.md#RC4_DZ)는 데드 존을 지정합니다. |
| <span id="MPC_xxx"></span>`MPC_XXXX`                                                                         | 대부분의 MPC_xxx 매개 변수는이 모드에서 비행 동작에 어느정도 영향을 미칩니다 . 예를 들어, [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)는 기체의 호버링 추력을 정의합니다.                                                                 |

## 추가 정보

### 위치 손실 / 안전

위치 모드는 수용 가능한 위치 추정치에 따라 다릅니다. 예를 들어 GPS 손실로 인해 추정치가 허용 수준 이하로 떨어지면 [위치(GPS) 손실 안전 장치](../config/safety.md#position-gps-loss-failsafe)가 동작할 수 있습니다. 구성, 리모컨 보유 여부와 적절 고도 추정치가 있는지 여부에 따라 PX4는 고도 모드, 수동 모드, 착륙 모드로 전환하거나 종료할 수 있습니다.