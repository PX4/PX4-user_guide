# 유지 모드

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

*유지* 모드(예: "Loiter")는 기체를 정지시키고 현재의 GPS 위치와 고도를 유지합니다(멀터콥터는 GPS 위치를 배회합니다).

:::tip
*Hold mode* can be used to pause a mission or to help you regain control of a vehicle in an emergency. It is usually activated with a pre-programmed switch.
:::

:::note

* This mode requires GPS.
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
:::

The specific behaviour for each vehicle type is described below.

## 멀티코터(MC)

A multicopter hovers at the current position and altitude.

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

The behaviour can be configured using the parameters below.

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT)   | 정지기 모드의 최소 높이(모드가 더 낮은 고도에서 작동하면 기체가 이 고도로 상승함).                                                                                                                                                                                                                                                                                          |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled, stick movement on a multicopter (or VTOL in multicopter mode) gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |

<!-- Code for this here: https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## 고정익 (FW)

The aircraft circles around the GPS hold position at the current altitude. The vehicle will first ascend to `MIS_LTRMIN_ALT` if the mode is engaged below this altitude.

RC stick movement is ignored.

The behaviour can be configured using the parameters below.

| Parameter                                                                    | Description                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Na'Vi는 '라 오버랩'](../advanced_config/parameter_reference.md#NAV_LOITER_RAD)   | 로터 원의 반지름.                                                                                                    |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

## VTOL

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->