# 착륙 모드

[<img src="../../assets/site/position_fixed.svg" title="필요한 위치 추정치(예: GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*착륙* 모드는 기체의 모드가 활성화된 위치에 착륙합니다. 착륙후 기체는 가급적 짧은 시간내에 시동이 해제됩니다.

:::note

* 이 모드는 안전 장치 가동으로 인해 상태를 전환하지 않는 한 유효한 위치 추정치가 필요하며, 이 경우 고도만 필요합니다(일반적으로 기압계는 비행 제어기에 내장).
* 이 모드는 자동입니다. 기체를 제어시 사용자 개입이 *필요하지* 않습니다.
* RC 제어 스위치는 기체의 비행 모드를 변경할 수 있습니다.
* 멀티콥터 또는 멀티콥터 모드의 VTOL에서 RC 스틱을 움직이면 위험한 배터리 안전 장치를 처리하지 않는 한 [기본적으로](#COM_RC_OVERRIDE) 기체는 [위치 모드](../flight_modes/position_mc.md)로 변경됩니다.
:::

각 기체 유형에 대한 구체적인 동작은 아래에 설명되어 있습니다.

## 멀티콥터 (MC)

기체 모드가 시작된 위치에 착륙합니다. 기체는 [MPC_LAND_SPEED](#MPC_LAND_SPEED)에 지정된 속도로 하강하고 착륙후 시동 해제됩니다 ([기본값](#COM_DISARM_LAND)).

RC 스틱 이동은 위험한 배터리 안전 장치를 처리하지 않는 한, [기본적으로](#COM_RC_OVERRIDE) 기체를 [위치 모드](../flight_modes/position_mc.md)로 변경합니다.

착륙은 다음 매개변수의 영향을 받습니다.

| 매개 변수                                                                                                   | 설명                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MPC_LAND_SPEED"></span>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 착륙 하강 속도. 이는 접지 상태를 알 수 없으므로, 낮은 속도를 유지하여야 합니다                                                                                                                                                    |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙후 자동 시동 해제 대기 시간 (단위 초). -1로 설정하면 착륙시 시동 해제되지 않습니다.                                                                                                                                             |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 활성화된 경우 멀티콥터 (또는 멀티콥터 모드의 VTOL)에서 스틱을 움직여 [위치 모드](../flight_modes/position_mc.md)에서 조종사에게 제어권을 다시 제공합니다 (차량이 중요한 배터리 안전 장치를 처리하는 경우 제외). 자동 모드와 오프보드 모드에 대해 별도로 활성화할 수 있으며, 기본적으로 자동 모드에서 활성화됩니다. |

## 고정익 (FW)

The vehicle will turn and land at the location at which the mode was engaged. RC stick movement is ignored.

Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

:::note
Often a FW vehicle will follow a fixed landing trajectory to ground (it will not attempt a flared landing). This is because in LAND mode the vehicle may not know ground altitude and will assume it is at sea level. As ground level may be much higher, a vehicle will often reach the ground at an altitude above where flare logic would be engaged.
:::

Landing is affected by the following parameters (also see [Landing (Fixed Wing)](../flying/fixed_wing_landing.md)):

| Parameter                                                                      | Description                                                                                              |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing. |

## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.