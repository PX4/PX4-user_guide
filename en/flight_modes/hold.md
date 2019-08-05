# Hold Mode

[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Hold* flight mode (a.k.a. "Loiter") causes the vehicle to stop and maintain its current GPS position and altitude (MC vehicles will hover at the GPS position, while FW vehicles will circle around it).

> **Tip** *Hold mode* can be used to pause a mission or to help you regain control of a vehicle in an emergency.
  It is usually activated with a pre-programmed switch. 

<span></span>
> **Note** 
> * This mode requires GPS.
> * This mode is automatic - no user intervention is *required* to control the vehicle.
> * RC control switches can be used to change flight modes on any vehicle.
    The effect of RC stick movement depends on the vehicle type.

The specific behaviour for each vehicle type is described below.

## Multi-Copter (MC)

A multicopter hovers at the current position and altitude.

RC stick movement will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.

The behaviour can be configured using the parameters below.

Parameter | Description
--- | ---
<span id="MIS_LTRMIN_ALT"></span>[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude).
<span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | If enabled stick movement gives control back to the pilot in [Position mode](../flight_modes/position_mc.md) (except when vehicle is handling a critical battery failsafe). Enabled by default.

<!-- Code for this here: https://github.com/PX4/Firmware/blob/master/src/modules/navigator/loiter.cpp#L61 -->

## Fixed Wing (FW)

The aircraft circles around the GPS hold position at the current altitude.
The vehicle will first ascend to `MIS_LTRMIN_ALT` if the mode is engaged below this altitude.

RC stick movement is ignored.

The behaviour can be configured using the parameters below.

Parameter | Description
--- | ---
[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The radius of the loiter circle.
[MIS_LTRMIN_ALT](../advanced_config/parameter_reference.md#MIS_LTRMIN_ALT) | Minimum height for loiter mode (vehicle will ascend to this altitude if mode is engaged at a lower altitude).


## VTOL

A VTOL follows the HOLD behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_LOITER in flight mode state machine -->
