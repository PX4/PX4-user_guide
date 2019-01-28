# Hold Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Hold* flight mode (a.k.a. "Loiter") causes the vehicle to stop and maintain its current GPS position and altitude (MC vehicles will hover at the GPS position, while FW vehicles will circle around it).

> **Tip** *Hold mode* can be used to pause a mission or to help you regain control of a vehicle in an emergency. It is usually activated with a pre-programmed switch.

<span></span>

> **Note** * This mode requires GPS. * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

A multicopter hovers at the current position and altitude.

The behaviour can be configured using the parameters below.

| Parameter                                                                                             | Description                                                                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

<!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## Fixed Wing (FW)

The aircraft circles around the GPS hold position at the current altitude. The vehicle will first ascend to `MIS_LTRMIN_ALT` if the mode is engaged below this altitude.

The behaviour can be configured using the parameters below.

| Parameter                                                                    | Description                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The radius of the loiter circle.                                                                              |
| [MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude). |

## VTOL

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->