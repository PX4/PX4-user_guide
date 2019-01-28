# Safety Configuration (Failsafes)

PX4 has a number of safety features to protect and recover your vehicle if something goes wrong:

* *Failsafes* allow you to specify areas and conditions under which you can safely fly, and the [action](#failsafe_actions) that will be performed if a failsafe is triggered (for example, landing, holding position, or returning to a specified point). The most important failsafe settings are configured in the *QGroundControl* [Safety Setup](#qgc_safety_setup) page. Others must be configured via [parameters](#failsafe_other).
* [Safety switches](#safety_switch) on the remote control can be used to immediately stop motors or return the vehicle in the event of a problem. 

## Failsafe Actions {#failsafe_actions}

Each failsafe defines its own set of actions. Some of the more common failsafe actions are:

| Action                                          | Description                                                                                                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| None/Disabled                                   | No action (the failsafe will be ignored).                                                                                                                                                                           |
| Warning                                         | A warning message will be sent to *QGroundControl*.                                                                                                                                                                 |
| [Hold mode](../flight_modes/hold.md)            | The vehicle will enter *Hold mode*. For multicopters this means the vehicle will hover, while for fixed/wing the vehicle will circle.                                                                               |
| [Return mode](../flight_modes/return.md)        | The vehicle will enter *Return mode*. Return behaviour can be set in the [Return Home Settings](#return_settings) (below).                                                                                          |
| [Land mode](../flight_modes/land.md)            | The vehicle will enter *Land mode*, and lands immediately.                                                                                                                                                          |
| RC Auto Recovery (CASA Outback Challenge rules) | TBD                                                                                                                                                                                                                 |
| Terminate/Flight termination                    | Turns off all controllers and sets all PWM outputs to a failsafe value (defined in airframe configuration using `FAILSAFE` variable). For a fixed-wing vehicle this might allow you to glide the vehicle to safety. |
| Lockdown                                        | Kills the motors (sets them to disarmed). This is the same as using the [kill switch](#kill_switch).                                                                                                                |

> **Note** It is possible to recover from a failsafe action (if the cause is fixed) by switching modes. For example, in the case where RC Loss failsafe causes the vehicle to enter *Return mode*, if RC is recovered you can change to *Position mode* and continue flying.

<span></span>

> **Note** If a failsafe occurs while the vehicle is responding to another failsafe (e.g. Low battery while in Return mode due to RC Loss), the specified failsafe action for the second trigger is ignored. Instead the action is determined by separate system level and vehicle specific code. This might result in the vehicle being changed to a manual mode so the user can directly manage recovery.

## QGroundControl Safety Setup {#qgc_safety_setup}

The *QGroundControl* Safety Setup page is accessed by clicking the *QGroundControl* **Gear** icon (Vehicle Setup - top toolbar) and then **Safety** in the sidebar). This includes the most important failsafe settings (battery, RC loss etc.) and the settings for the return actions *Return* and *Land*.

![Safety Setup (QGC)](../../images/qgc/setup/safety_setup.png)

### Low Battery Failsafe

The low battery failsafe is triggered when the battery capacity drops below one (or more warning) level values.

![Safety - Battery (QGC)](../../images/qgc/setup/safety_battery.png)

The most common configuration is to set the values and action as above (with `Warn > Failsafe > Emergency`). With this configuration the failsafe will trigger warning, then return, and finally landing if capacity drops below the respective levels.

It is also possible to set the *Failsafe Action* to warn, return, or land when the [Battery Failsafe Level](#BAT_CRIT_THR) failsafe level is reached.

The settings and underlying parameters are shown below.

| Setting                                         | Parameter                                                                      | Description                                                                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Failsafe Action                                 | [COM_LOW_BAT_ACT](../advanced_config/parameter_reference.md#COM_LOW_BAT_ACT) | Warn, Return, or Land based when capacity drops below [Battery Failsafe Level](#BAT_CRIT_THR), OR Warn, then return, then land based on each of the level settings below. |
| Battery Warn Level                              | [BAT_LOW_THR](../advanced_config/parameter_reference.md#BAT_LOW_THR)         | Percentage capacity for warnings (or other actions).                                                                                                                      |
| <span id="BAT_CRIT_THR"></span>Battery Failsafe Level | [BAT_CRIT_THR](../advanced_config/parameter_reference.md#BAT_CRIT_THR)       | Percentage capacity for Return action (or other actions if a single action selected).                                                                                     |
| Battery Emergency Level                         | [BAT_EMERGEN_THR](../advanced_config/parameter_reference.md#BAT_EMERGEN_THR) | Percentage capacity for triggering Land (immediately) action.                                                                                                             |

### RC Loss Failsafe

The RC Loss failsafe is triggered if the RC transmitter link is lost.

![Safety - RC Loss (QGC)](../../images/qgc/setup/safety_rc_loss.png)

The settings and underlying parameters are shown below.

| Setting             | Parameter                                                                  | Description                                                                                                                |
| ------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| RC Loss Timeout     | [COM_RC_LOSS_T](../advanced_config/parameter_reference.md#COM_RC_LOSS_T) | Amount of time after losing the RC connection before the failsafe will trigger.                                            |
| Failsafe Action     | [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT)     | Disabled, Loiter, Return, Land, RC Auto Recovery, Terminate, Lockdown.                                                     |
| RC Loss Loiter Time | [NAV_RCL_LT](../advanced_config/parameter_reference.md#NAV_RCL_LT)       | If the *Failsafe Action* (`NAV_RCL_ACT`) is set to *CASA Outback Challenge rules* this sets the loiter time after RC loss. |

### Data Link Loss Failsafe

The Data Link loss failsafe is triggered if a telemetry link (connection to ground station) is lost.

![Safety - Data Link Loss (QGC)](../../images/qgc/setup/safety_data_link_loss.png)

The settings and underlying parameters are shown below.

| Setting                | Parameter                                                                  | Description                                                                                                                                                                                                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data Link Loss Timeout | [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) | Amount of time after losing the data connection before the failsafe will trigger.                                                                                                                                                                                                                                       |
| Failsafe Action        | [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT)     | Disabled, Hold mode, Return mode, Land mode, Data Link Auto Recovery (CASA Outback Challenge rules), Terminate, Lockdown. Selecting the `Data Link Auto Recovery (CASA Outback Challenge rules)` action additionally enables the [Data Link Loss](../advanced_config/parameter_reference.md#data-link-loss) parameters. |

### Geofence Failsafe

The Geofence is defined as a "virtual" cylinder around the home position. If the vehicle moves outside the radius or above the altitude the specified *Failsafe Action* will trigger.

![Safety - Geofence (QGC)](../../images/qgc/setup/safety_geofence.png)

The settings and underlying [geofence parameters](../advanced_config/parameter_reference.md#geofence) are shown below.

| Setting          | Parameter                                                                      | Description                                                     |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Action on breach | [GF_ACTION](../advanced_config/parameter_reference.md#GF_ACTION)               | None, Warning, Hold mode, Return mode, Terminate.               |
| Max Radius       | [GF_MAX_HOR_DIST](../advanced_config/parameter_reference.md#GF_MAX_HOR_DIST) | Horizontal radius of geofence cylinder. Geofence disabled if 0. |
| Max Altitude     | [GF_MAX_VER_DIST](../advanced_config/parameter_reference.md#GF_MAX_VER_DIST) | Height of geofence cylinder. Geofence disabled if 0.            |

> **Note** Setting `GF_ACTION` to terminate will kill the vehicle on violation of the fence. Due to the inherent danger of this, this function is disabled using [CBRK_FLIGHTTERM](#CBRK_FLIGHTTERM), which needs to be reset to 0 to really shut down the system.

The following settings also apply, but are not displayed in the QGC UI.

| Setting                                                         | Parameter                                                                    | Description                                                                                                           |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Geofence altitude mode                                          | [GF_ALTMODE](../advanced_config/parameter_reference.md#GF_ALTMODE)           | Altitude reference used: 0 = WGS84, 1 = AMSL.                                                                         |
| Geofence counter limit                                          | [GF_COUNT](../advanced_config/parameter_reference.md#GF_COUNT)               | Set how many subsequent position measurements outside of the fence are needed before geofence violation is triggered. |
| Geofence source                                                 | [GF_SOURCE](../advanced_config/parameter_reference.md#GF_SOURCE)             | Set whether position source is estimated global position or direct from the GPS device.                               |
| <span id="CBRK_FLIGHTTERM"></span>Circuit breaker for flight termination | [CBRK_FLIGHTTERM](../advanced_config/parameter_reference.md#CBRK_FLIGHTTERM) | Enables/Disables flight termination action (disabled by default).                                                     |

### Return Home Settings {#return_settings}

*Return* is a common [failsafe action](#failsafe_actions) that engages [Return mode](../flight_modes/return.md) to return the vehicle to the home position. This section shows how to set the land/loiter behaviour after returning.

![Safety - Return Home Settings (QGC)](../../images/qgc/setup/safety_return_home.png)

The settings and underlying parameters are shown below:

| Setting           | Parameter                                                                      | Description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Climb to altitude | [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)   | Vehicle ascend to this minimum height (if below it) for the return flight.                             |
| Return behaviour  |                                                                                | Choice list of *Return then*: Land, Loiter and do not land, or Loiter and land after a specified time. |
| Loiter Altitude   | [RTL_DESCEND_ALT](../advanced_config/parameter_reference.md#RTL_DESCEND_ALT) | If return with loiter is selected you can also specify the altitude at which the vehicle hold.         |
| Loiter Time       | [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY)   | If return with loiter then land is selected you can also specify how long the vehicle will hold.       |

> **Note** The return behavour is defined by [RTL_LAND_DELAY](../advanced_config/parameter_reference.md#RTL_LAND_DELAY). If negative the vehicle will land immediately. Additional information can be found in [Return mode](../flight_modes/return.md).

### Land Mode Settings

*Land at the current position* is a common [failsafe action](#failsafe_actions) that engages [Land Mode](../flight_modes/land.md). This section shows how to set whether the vehicle will automatically disarm after landing. For Multicopters (only) you can additionally set the descent rate.

![Safety - Land Mode Settings (QGC)](../../images/qgc/setup/safety_land_mode.png)

The settings and underlying parameters are shown below:

| Setting              | Parameter                                                                      | Description                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Disarm After         | [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Select checkbox to specify that the vehicle will disarm after landing, and enter delay after landing before disarming (must be non-zero). |
| Landing Descent Rate | [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | Rate of descent (MC only).                                                                                                                |

## Other Failsafe Settings {#failsafe_other}

This section contains information about failsafe settings that cannot be configured through the *QGroundControl* [Safety Setup](#qgc_safety_setup) page.

### Position (GPS) Loss Failsafe

The *Position Loss Failsafe* is triggered if the quality of the PX4 position estimate falls below acceptable levels (this might be caused by GPS loss) while in a mode that requires an acceptable position estimate.

The failure action is controlled by [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL), based on whether RC control is assumed to be available (and altitude information):

* `0`: Remote control available. Switch to *Altitude mode* if a height estimate is available, otherwise *Stabilized mode*.
* `1`: Remote control *not* available. Switch to *Land mode* if a height estimate is available, otherwise enter flight termination.

Fixed Wing vehicles additionally have a parameter ([NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT)) for defining how long they will loiter (circle) after losing position before attempting to land.

The relevant parameters for all vehicles shown below (also see [GPS Failure navigation parameters](../advanced_config/parameter_reference.md#gps-failure-navigation)):

| Parameter                                                                        | Description                                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [COM_POS_FS_DELAY](../advanced_config/parameter_reference.md#COM_POS_FS_DELAY) | Delay after loss of position before the failsafe is triggered.                                            |
| [COM_POSCTL_NAVL](../advanced_config/parameter_reference.md#COM_POSCTL_NAVL)   | Position control navigation loss response during mission. Values: 0 - assume use of RC, 1 - Assume no RC. |
| [CBRK_GPSFAIL](../advanced_config/parameter_reference.md#CBRK_GPSFAIL)           | Circuit breaker that can be used to disable GPS failure detection.                                        |
| [CBRK_VELPOSERR](../advanced_config/parameter_reference.md#CBRK_GPSFAIL)         | Circuit breaker for position error check (disables error checks in all modes).                            |

Parameters that only affect Fixed Wing vehicles:

| Parameter                                                              | Description                                                                                         |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [NAV_GPSF_LT](../advanced_config/parameter_reference.md#NAV_GPSF_LT) | Loiter time (waiting for GPS recovery before it goes into flight termination). Set to 0 to disable. |
| [NAV_GPSF_P](../advanced_config/parameter_reference.md#NAV_GPSF_P)   | Fixed pitch angle while circling.                                                                   |
| [NAV_GPSF_R](../advanced_config/parameter_reference.md#NAV_GPSF_R)   | Fixed roll/bank angle while circling.                                                               |
| [NAV_GPSF_TR](../advanced_config/parameter_reference.md#NAV_GPSF_TR) | Thrust while circling.                                                                              |

### Offboard Loss Failsafe

The *Offboard Loss Failsafe* is triggered if the offboard link is lost while under Offboard control. Different failsafe behaviour can be specified based on whether or not there is also an RC connection available.

The relevant parameters are shown below:

| Parameter                                                                    | Description                                                                                                       |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)   | Delay after loss of offboard connection before the failsafe is triggered.                                         |
| [COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)       | Failsafe action if no RC is available: Land mode, Hold mode, Return mode.                                         |
| [COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT) | Failsafe action if RC is available: Position mode, Altitude mode, Manual mode, Return mode, Land mode, Hold mode. |

### Mission Failsafe

The Mission Failsafe checks prevent a previous mission being started at a new takeoff location or if it is too big (distance between waypoints is too great). The failsafe action is that the mission will not be run.

The relevant parameters are shown below:

| Parameter                                                                | Description                                                                                                                                     |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [MIS_DIST_1WP](../advanced_config/parameter_reference.md#MIS_DIST_1WP) | The mission will not be started if the current waypoint is more distant than this value from the home position. Disabled if value is 0 or less. |
| [MIS_DIST_WPS](../advanced_config/parameter_reference.md#MIS_DIST_WPS) | The mission will not be started if any distance between two subsequent waypoints is greater than this value.                                    |

### Traffic Avoidance Failsafe

The Traffic Avoidance Failsafe allows PX4 to respond to transponder data (e.g. from ADSB transponders).

The relevant parameters are shown below:

| Parameter                                                                      | Description                                                      |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID) | Set the failsafe action: Disabled, Warn, Return mode, Land mode. |

### Adaptive QuadChute Failsafe

Failsafe for when a pusher motor fails (or airspeed sensor) and a VTOL vehicle can no longer achieve a desired altitude setpoint in fixed-wing mode. If triggered, the vehicle will transition to multicopter mode and enter failsafe Return mode.

The relevant parameters are shown below:

| Parameter                                                                  | Description                                                                                                                                                                                       |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [VT_FW_ALT_ERR](../advanced_config/parameter_reference.md#VT_FW_ALT_ERR) | Maximum negative altitude error for fixed wing flight. If the altitude drops more than this value below the altitude setpoint the vehicle will transition back to MC mode and enter failsafe RTL. |

## Safety Switches {#safety_switch}

A safety switch allows you to immediately stop all motors or return the vehicle from the remote control transmitter (if you lose control of the vehicle, this may be better than allowing it to continue flying).

The safety switches may be enabled as part of *QGroundControl* [Flight Mode Setup](../config/flight_mode.md#safety_switch).

This section lists the available safety switches.

### Kill Switch {#kill_switch}

A kill switch immediately stops all motor outputs (if flying the vehicle will start to fall). The vehicle is not disarmed, and the motors will restart if the switch is reverted.

### Arm/Disarm Switch {#arming_switch}

The arm/disarm switch is a replacement for the default stick arming/disarming mechanism (and serves the same purpose: making sure there is an intentional step involved before the motors start/stop). It might be used in preference to the default mechanism because:

* Of a preference of a switch over a stick motion (e.g. if using a stick on another autopilot).
* It avoids accidentally triggering arming/disarming in-air with a certain stick motion.
* There is no delay (it reacts immediately).

The arm/disarm switch immediately disarms (stop) motors for those [flight modes](../getting_started/flight_modes.md) that *support disarming in flight*. This includes:

* *Manual mode*
* *Acro mode*
* *Stabilized*
* *Rattitude*

For modes that do not support disarming in flight, the switch is ignored during flight, but may be used after landing is detected. This includes *Position mode* and autonomous modes (e.g. *Mission*, *Land* etc.).

<!-- 
> **Note** This can also be done by [manually setting](../advanced_config/parameters.md) the [RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) parameter to the corresponding switch RC channel. 
  If the switch positions are reversed, change the sign of the parameter [RC_ARMSWITCH_TH](../advanced_config/parameter_reference.md#RC_ARMSWITCH_TH) (or also change its value to alter the threshold value). 
  -->

### Return Switch {#return_switch}

A return switch can be used to immediately engage [Return mode](../flight_modes/return.md).

## Further Information

* [QGroundControl User Guide > Safety Setup](https://docs.qgroundcontrol.com/en/SetupView/Safety.html)