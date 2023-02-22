# Land Mode

[<img src="../../assets/site/position_fixed.svg" title="Position estimate required (e.g. GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

The *Land* flight mode causes the vehicle to land at the position where the mode was engaged. After landing, vehicles will disarm after a short timeout (by default).

:::note
* This mode requires a valid position estimate unless the mode is entered due to a failsafe, in which case only altitude is required (typically a barometer is built into the flight controller).
* This mode is automatic - no user intervention is *required* to control the vehicle.
* RC control switches can be used to change flight modes on any vehicle.
* RC stick movement in a multicopter (or VTOL in multicopter mode) will [by default](#COM_RC_OVERRIDE) change the vehicle to [Position mode](../flight_modes/position_mc.md) unless handling a critical battery failsafe.
* The mode can be triggered using the [MAV_CMD_DO_LAND_START](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_LAND_START) MAVLink command, or by explicitly switching to Land mode. :::

The specific behaviour for each vehicle type is described below.


## Multi-Copter (MC)

The vehicle will land at the location at which the mode was engaged. The vehicle descends at the rate specified in [MPC_LAND_SPEED](#MPC_LAND_SPEED) and will disarm after landing (by [default](#COM_DISARM_LAND)).

RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) (by [default](#COM_RC_OVERRIDE)).

Landing is affected by the following parameters:

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="MPC_LAND_SPEED"></a>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | The rate of descent during landing. This should be kept fairly low as the ground conditions are not known.                                                                                                                                                   |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing, in seconds. If set to -1 the vehicle will not disarm on landing.                                                                                                                                                     |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | Controls whether stick movement on a multicopter (or VTOL in MC mode) causes a mode change to [Position mode](../flight_modes/position_mc.md). This can be separately enabled for auto modes and for offboard mode, and is enabled in auto modes by default. |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | The amount of stick movement that causes a transition to [Position mode](../flight_modes/position_mc.md) (if [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) is enabled).                                                                                              |


## Fixed-wing (FW)

:::warning
Fixed-wing _Land mode_ is currently broken: [PX4-Autopilot/pull/21036](https://github.com/PX4/PX4-Autopilot/pull/21036). (Specifically, switching to Land mode causes a fly-away.)

Automated landing in missions is supported: [Mission mode > Fixed wing mission landing](../flight_modes/mission.md#fixed-wing-mission-landing). :::


<!-- 
After getting land command it will circle down at the current location.
The flaring part is the same as for the mission lading.
-->


## VTOL

A VTOL follows the LAND behavior and parameters of [Fixed Wing](#fixed-wing-fw) when in FW mode, and of [Multicopter](#multi-copter-mc) when in MC mode. When [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) is set (default: on) a VTOL in FW mode will transition back to MC just before landing.
