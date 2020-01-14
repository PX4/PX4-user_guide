# Prearm, Arm, Disarm Configuration

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents, PX4 has explicit state(s) for powering the vehicle components:
- **Disarmed:** There is no power to motors or actuators.
- **Pre-armed:** Motors/propellers are locked but actuators for non-dangerous electronics are powered (e.g. ailerons, flaps etc.).
- **Armed:** Vehicle is fully powered. Motors/propellers may be turning (dangerous!)

A [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) (if available) is used as a precondition for arming the vehicle, and may also be used to enable the pre-armed state.

When permitted, arming is enabled using an [arming gesture](#arm_disarm_gestures), [arming switch](#arm_disarm_switch) or MAVLink command. 

PX4 allows you to configure how pre-arming, arming and disarming work using parameters (which can be edited in *QGroundControl* via the [parameter editor](../advanced_config/parameters.md)), as described in the following sections.

> **Note** Arming/disarming parameters can be found in [Parameter Reference > Commander](../advanced_config/parameter_reference.md#commander) (search for `COM_ARM_` and `COM_DISARM_*`).

## Arming Gesture {#arm_disarm_gestures}

By default the vehicle is armed and disarmed by moving the RC throttle/yaw stick into a particular position and holding for 1 second:
- **Arming:** stick to *bottom right*.
- **Disarming:** stick to *bottom left*.

The required hold time can be configured using [COM_RC_ARM_HYST](#COM_RC_ARM_HYST).

Parameter | Description
--- | ---
<span id="COM_RC_ARM_HYST"></span>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | Time that RC stick must be held in arm/disarm position before arming/disarming occurs (default: 1 second).

## Arming Button/Switch {#arm_disarm_switch}

An *arming button* or "momentary switch" can be configured to trigger arm/disarm *instead* of [gesture-based arming](#arm_disarm_gestures).
The button should be held down for ([nominally](#COM_RC_ARM_HYST)) one second to arm (when disarmed) or disarm (when armed).

A two position-switch can also be used for arming/disarming, where the respective arm/disarm commands are sent on switch *transitions*.

> **Tip** Use of a two-position switch is not recommended because it is easy to get the switch into an inconsistent state (i.e. if arming is rejected, the switch will stay armed even though the vehicle is not armed).

The switch or button is assigned (and enabled) using [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), and the switch "type" is configured using [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).


Parameter | Description
--- | ---
<span id="RC_MAP_ARM_SW"></span>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW) | Arm switch channel (default: 0 - unassigned). If defined the specified RC channel is used instead of stick.
<span id="COM_ARM_SWISBTN"></span>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | Arm switch is a button. <br>- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on respective switch transitions.<br>-`1`: Arm switch is a button or momentary switch. Arm/disarm command is sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).

> **Note** The switch can also be set as part of *QGroundControl* [Flight Mode](../config/flight_mode.md) configuration.


## Auto-Disarming

By default vehicles will automatically disarm on landing, or if you take too long to take off after arming.
The feature is configured using the following timeouts.

Parameter | Description
--- | ---
<span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing. Default: 2s (-1 to disable).
<span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable).


## Arming Sequence: Pre Arm Mode & Safety Button

The arming sequence depends on whether or not there is a *safety switch*, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):
- *Disabled*: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- *Safety Switch* (Default): The pre-arm mode is enabled by the safety switch.
  If there is no safety switch then pre-arm mode will not be enabled.
- *Always*: Prearm mode is enabled from power up. 

If there is a safety switch then this will be a precondition for arming.
If there is no safety switch the I/O safety circuit breaker must be engaged ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)), and arming will depend only on the arm command.

The sections below detail the startup sequences for the different configurations


### Default: COM_PREARM_MODE=Safety and Safety Switch

The default configuration uses safety switch to prearm.
From prearm you can then arm to engage all motors/actuators.
It corresponds to: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (safety switch) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The default startup sequence is:
1. Power-up.
   - All actuators locked into disarmed position
   - Not possible to arm.
1. Safety switch is pressed.
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.
   
### COM_PREARM_MODE=Disabled and Safety Switch

When prearm mode is *Disabled*, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle.
This corresponds to [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Disabled) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:
1. Power-up.
   - All actuators locked into disarmed position
   - Not possible to arm.
1. Safety switch is pressed.
   - *All actuators stay locked into disarmed position (same as disarmed).*
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.
   
### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up.
To arm, you still need the safety switch. 
This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:
1. Power-up.
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - Not possible to arm.
1. Safety switch is pressed.
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.


### COM_PREARM_MODE=Safety or Disabled and No Safety Switch

With no safety switch, when `COM_PREARM_MODE` is set to *Safety* or *Disabled* prearm mode cannot be enabled (same as disarmed). 
This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:
1. Power-up.
   - All actuators locked into disarmed position
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.


### COM_PREARM_MODE=Always and No Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up.
This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:
1. Power-up.
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
1. Arm command is issued.
   - The system is armed.
   - All motors and actuators can move.


### Parameters

Parameter | Description
--- | ---
<span id="COM_PREARM_MODE"></span>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | Condition to enter prearmed mode. `0`: Disabled, `1`: Safety switch (prearm mode enabled by safety switch; if no switch present cannot be enabled), `2`: Always (prearm mode enabled from power up). Default: `1` (safety button).
<span id="CBRK_IO_SAFETY"></span>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY) | Circuit breaker for IO safety.


<!-- Discussion:
https://github.com/PX4/Firmware/pull/12806#discussion_r318337567 
https://github.com/PX4/px4_user_guide/issues/567#issue-486653048
-->
