# Land Mode

[<img src="../../assets/site/position_fixed.svg" title="필요한 위치 추정치(예: GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*랜드 * 비행 모드는 기체가 모드가 활성화된 위치에 착륙하게 합니다.

> **참고 ** * 이 모드는 장애물로 인해 모드가 입력되지 않은 한 유효한 위치 추정치가 필요하며, 이 경우 고도만 필요합니다(일반적으로 기압계는 비행 제어기에 내장됨). * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

기체가 모드가 활성화된 위치에 착륙합니다. 기체가 지면에 닿을 때까지 ` MPC_LAND_SPEED `에 지정된 속도로 하강한다.

착륙은 다음 매개변수의 영향을 받습니다.

| Parameter                                                                      | Description                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 착륙 중 하강 속도. 이는 접지 상태를 알 수 없으므로 상당히 낮게 유지해야 합니다                    |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 착륙 후 자동차 군비를 철폐하기 위해 Time-out. 기본적으로 0입니다(착륙 후 기체가 자동으로 해제되지 않음). |

## Fixed Wing (FW)

기체가 회전하여 모드가 활성화된 위치에 착륙합니다. 고정 날개 착륙 논리 및 매개변수는 다음 항목에서 설명합니다.

> ** 노트 ** 종종 FW 기체는 지면에 대한 고정 착륙 궤적을 따라갑니다(평탄한 착륙은 시도하지 않습니다). 이는 Land 모드에서 기체가 지상 고도를 모를 수 있고 해수면에 있다고 가정하기 때문입니다. 지면 수준이 훨씬 높을 수 있기 때문에, 기체는 플레어 로직이 적용되는 위 고도에서 지상에 도달하는 경우가 많다.

착지는 다음 매개변수의 영향을 받습니다([ 랜딩(고정 날개)](../flying/fixed_wing_landing.md) 참조).

| Parameter                                                                      | Description                                                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing. By default this is 0 (vehicle will not auto-disarm after landing). |

## VTOL

VTOL은 FW 모드일 때 "0" Fixed Wing </a>의 랜드 동작과 파라미터, MC 모드일 때는 "1" 멀티코터 </a>를 따릅니다. [NAV_FORCE_VT ](../advanced_config/parameter_reference.md#NAV_FORCE_VT)이 설정되면(기본값: 켜짐) FW 모드의 VTOL이 착륙 직전에 MC로 되돌아갑니다.