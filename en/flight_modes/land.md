# Land Mode

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged.
After landing, vehicles will disarm after a short timeout (by default).

:::note
* This mode requires a valid global position estimate (from GPS or inferred from a [local position](../ros/external_position_estimation.md#enabling-auto-modes-with-a-local-position)).
* In a failsafe the mode only requires altitude (typically a barometer is built into the flight controller).
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes_mc/position.md) unless handling a critical battery failsafe.
* The mode can be triggered using the [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) MAVLink command, or by explicitly switching to Land mode.
:::

The specific behaviour for each vehicle type is described below.


## Multi-Copter (MC)

The vehicle will land at the location at which the mode was engaged.
The vehicle descends at the rate specified in [MPC_LAND_SPEED](#MPC_LAND_SPEED) and will disarm after landing (by [default](#COM_DISARM_LAND)).

RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) (by [default](#COM_RC_OVERRIDE)).

Landing is affected by the following parameters:

Parameter | Description
--- | ---
<a id="MPC_LAND_SPEED"></a>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED) | The rate of descent during landing. This should be kept fairly low as the ground conditions are not known.
<a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing.
<a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes_mc/position.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default.
<a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes_mc/position.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).


## Fixed-wing (FW)

Fixed-wing _land mode_ performs a circular landing at the current vehicle position.

:::warning
Fixed-wing _land mode_ should only be used in an **emergency**!
The vehicle will descend around the current location irrespective of the suitability of the underlying terrain, and touch down while following a circlular flight path.

Where possible, instead use the configurable landing approach in [Mission mode > Fixed-wing mission landing](../flight_modes/mission.md#fw-mission-landing).
:::

When the mode is engaged, the vehicle starts to loiter around the current vehicle position with loiter radius [NAV_LOITER_RAD](#NAV_LOITER_RAD) and begins to descend with a constant descent speed.
The descent speed is calculated using [FW_LND_ANG](#FW_LND_ANG) and the set landing airspeed [FW_LND_AIRSPD](#FW_LND_AIRSPD).
The vehicle will flare if configured to do so (see [Flaring](../flight_modes/mission.md#flaring-roll-out)), and otherwise proceed circling with the constant descent rate until landing is detected.

[Manual nudging](../flight_modes/mission.md#automatic-abort) and [automatic land abort](../flight_modes/mission.md#nudging) are not available in land mode.

Parameter | Description
--- | ---
<a id="NAV_LOITER_RAD"></a>[NAV_LOITER_RAD](../advanced_config/parameter_reference.md#NAV_LOITER_RAD) | The loiter radius that the controller tracks for the whole landing sequence.
<a id="FW_LND_ANG"></a>[FW_LND_ANG](../advanced_config/parameter_reference.md#FW_LND_ANG) | The flight path angle setpoint.
<a id="FW_LND_AIRSPD"></a>[FW_LND_AIRSPD](../advanced_config/parameter_reference.md#FW_LND_AIRSPD) | The airspeed setpoint.

## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed-wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode.
When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.