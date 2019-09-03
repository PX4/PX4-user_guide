# Prearm, Arm, Disarm Configuration

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents, PX4 has explicit state(s) for powering the vehicle components:
- **Disarmed:** There is no power to motors or actuators.
- **Pre-armed:** Actuators and other non-dangerous electronics are powered.
  - In this state you can move ailerons, flaps etc, but motors/propellers are locked.
- **Armed:** Vehicle is fully powered, including motors/propellers.

A [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) (if available) is used as a precondition for arming the vehicle, and may also be used to enable the pre-armed state. When permitted, arming is enabled using an arming sequence, switch or MAVLink command. 

PX4 allows you to configure how prearming, arming and disarming work using parameters (which can be edited in *QGroundControl* via the [parameter editor](../advanced_config/parameters.md)), as described in the following sections.

## Arming Sequence: Pre Arm Mode & Safety Button

The arming sequence depends on whether or not there is a *safety switch*, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):
- *Disabled*: There is no separate pre-arm mode where only "safe"/non-throttling actuators are enabled.
- *Safety Switch* (Default): The pre-arm mode is enabled by the safety switch. 
  If there is no safety switch then pre-arm mode will not be enabled.
- *Always*: Prearm mode is enabled from power up. 

If there is a safety switch then this will be a precondition for arming.
If there is no safety switch the I/O safety circuit breaker must be engaged ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)), and arming will depend only on the arm command.

The sections below explain the startup sequences for the different configurations


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

With no safety switch, when `COM_PREARM_MODE` is set to *Safety* or *Disabled* prearm mode cannot not enabled (same as disarmed). 
Arm to activate all actuators.
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



## Auto-Disarming

By default vehicles will automatically disarm on landing, or if you take too long to take off after arming.
The feature is configured using the following timeouts.

Parameter | Description
--- | ---
<span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | Time-out for auto disarm after landing. Default: 2s (-1 to disable).
<span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable).



<!-- Discussion:
https://github.com/PX4/Firmware/pull/12806#discussion_r318337567 
https://github.com/PX4/px4_user_guide/issues/567#issue-486653048
-->