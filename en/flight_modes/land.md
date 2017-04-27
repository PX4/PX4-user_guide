# LAND Flight Mode

The LAND flight mode causes the vehicle to land at the position where the mode was engaged.

The specific behaviour for each vehicle type is described below.

> **Note** 
>  * This mode is automatic (RC control is disabled [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) except to change modes).

## Multi-Copter (MC)

The vehicle will land at the location at which the mode was engaged. The vehicle descends at the rate specified in `MPC_LAND_SPEED` until it hits the ground.

Landing is affected by the following parameters:

Parameter | Description
--- | ---
[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED) | The rate of descent during landing. This should be kept fairly low as the ground conditions are not known.

## Fixed Wing (FW)

The vehicle turns and lands at the location at which the mode was engaged. 

> **Note** The vehicle doesn't necessarily know where the ground is, and will therefore follow a fixed trajectory for the whole landing approach (no flare).

Landing is affected by the following parameters:

Parameter | Description
--- | ---
[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG) | Landing slope angle
[FW_LND_HVIRT](../advanced_config/parameter_reference.md#FW_LND_HVIRT) | ?
[FW_LND_FLALT](../advanced_config/parameter_reference.md#FW_LND_FLALT) | Landing flare altitude (relative to landing altitude)
[FW_LND_TLALT](../advanced_config/parameter_reference.md#FW_LND_TLALT) | Landing throttle limit altitude (relative landing altitude). The default value of -1.0 lets the system default to applying throttle limiting at 2/3 of the flare altitude.
[FW_LND_HHDIST](../advanced_config/parameter_reference.md#FW_LND_HHDIST) | Landing heading hold horizontal distance
[FW_LND_USETER](../advanced_config/parameter_reference.md#FW_LND_USETER) | Use terrain estimate during landing
[FW_LND_FL_PMIN](../advanced_config/parameter_reference.md#FW_LND_FL_PMIN) | Minimum pitch during flare. A positive sign means nose up Applied once FW_LND_TLALT is reached
[FW_LND_FL_PMAX](../advanced_config/parameter_reference.md#FW_LND_FL_PMAX) | Maximum pitch during flare. A positive sign means nose up Applied once FW_LND_TLALT is reached
[FW_LND_AIRSPD_SC](../advanced_config/parameter_reference.md#FW_LND_AIRSPD_SC) | Min. airspeed scaling factor for landing. Comment: Multiplying this factor with the minimum airspeed of the plane gives the target airspeed the landing approach. FW_AIRSPD_MIN * FW_LND_AIRSPD_SC


## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When  [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.