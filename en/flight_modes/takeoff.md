# TAKEOFF Flight Mode

The TAKEOFF flight mode causes the vehicle to take off to a specified height and wait for further input (e.g. Hold).

> **Note** 
>  * This mode requires GPS.
>  * This mode is automatic (RC control is disabled by default - see `COM_RC_OVERRIDE`).
>  * The vehicle must be armed before this mode can be engaged.

The specific behaviour for each vehicle type is described below.

## Multi-copter (MC)

A multi rotor ascends to the altitude defined in [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT) (default: 2.5m ) and holds position.

The speed of ascent is defined in [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED) (default:1.5m/s).


## Fixed Wing (FW)

The aircraft takes off with maximum climb power into the current direction.

<!-- What about MT_TKF_THR_MIN and friends? Also RWTO_TKOFF and friends? -->



## VTOL

A VTOL follows the TAKEOFF behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.

<!-- this maps to AUTO_TAKEOFF in dev -->