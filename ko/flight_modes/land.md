---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/land
---

# 착륙 모드

[<img src="../../assets/site/position_fixed.svg" title="필요한 위치 추정치(예: GPS) " width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*착륙* 모드는 기체의 모드가 활성화된 위치에 착륙합니다. 착륙후 기체는 가급적 짧은 시간내에 시동이 해제됩니다.

:::note
* 이 모드는 안전 장치 가동으로 인해 상태를 전환하지 않는 한 유효한 위치 추정치가 필요하며, 이 경우 고도만 필요합니다(일반적으로 기압계는 비행 제어기에 내장).
* 이 모드는 자동입니다. 기체를 제어시 사용자 개입이 *필요하지* 않습니다.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터 또는 멀티콥터 모드의 VTOL에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다. :::

각 기체 유형에 대한 구체적인 동작은 아래에 설명되어 있습니다.


## 멀티콥터 (MC)

기체 모드가 시작된 위치에 착륙합니다. 기체는 [MPC_LAND_SPEED](#MPC_LAND_SPEED)에 지정된 속도로 하강하고 착륙후 시동 해제됩니다 ([기본값](#COM_DISARM_LAND)).

RC 스틱을 움직이면 차량이 [위치 모드](../flight_modes/position_mc.md)([기본값](#COM_RC_OVERRIDE))로 변경됩니다.

착륙은 다음 매개변수의 영향을 받습니다.

| 매개 변수                                                                                                            | 설명                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="MPC_LAND_SPEED"></span>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)    | 착륙 하강 속도. 이는 접지 상태를 알 수 없으므로, 낮은 속도를 유지하여야 합니다                                                                                                         |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙후 자동 시동 해제 대기 시간 (단위 초). -1로 설정하면 착륙시 시동 해제되지 않습니다.                                                                                                  |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터 (또는 MC 모드의 VTOL)에서 스틱 이동으로 인하여 모드가 [위치 모드](../flight_modes/position_mc.md) 변경 여부를 제어합니다. 자동 모드와 오프보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | [위치 모드](../flight_modes/position_mc.md)로 전환하는 스틱 이동량 ([COM_RC_OVERRIDE](#COM_RC_OVERRIDE)이 활성화된 경우).                                                 |


## 고정익 (FW)

기체 모드가 시작된 위치로 복귀하여 착륙합니다. RC 스틱 이동은 무시됩니다.

고정익의 착륙 원리와 설정 매개변수는 [고정익 착륙](../flying/fixed_wing_landing.md)에서 자세하게 설명합니다.

:::note
종종 고정익은 지면에 대한 고정된 착륙 궤적을 비행합니다. 플레어 착륙은 시도하지 않습니다.
이는 착륙 모드에서 기체가 지상 고도를 모를 수 있고, 해수면에 있다고 가정하기 때문입니다.
지면 수준이 훨씬 높을 수 있기 때문에, 기체는 플레어 로직이 적용되는 고도에서 지상에 도달하는 경우가 많습니다.
:::

착륙은 다음 매개변수의 영향을 받습니다([ 랜딩(고정 날개)](../flying/fixed_wing_landing.md) 참조).

| 매개 변수                                                                          | 설명                                                    |
| ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙후 자동 시동 해제 대기 시간 (단위 초). -1로 설정하면 착륙시 시동 해제되지 않습니다. |

## 수직이착륙기

VTOL은 고정익 모드에서는 이륙 동작 및 매개 변수는 [고정익](#fixed-wing-fw)를 따르며, 멀티콥터 모드에서는 [멀티콥터](#multi-copter-mc) 매개 변수를 따릅니다. [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT)이 설정되면(기본값: 켜짐) 고정익 모드의 VTOL이 착륙 직전에 멀티콥터로 되돌아갑니다.
