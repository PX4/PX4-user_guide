---
canonicalUrl: https://docs.px4.io/main/de/advanced_config/prearm_arm_disarm
---

# Prearm, Arm, Disarm Configuration

Vehicles may have moving parts, some of which are potentially dangerous when powered (in particular motors and propellers)!

To reduce the chance of accidents, PX4 has explicit state(s) for powering the vehicle components:

- **Disarmed:** There is no power to motors or actuators.
- **Pre-armed:** Motors/propellers are locked but actuators for non-dangerous electronics are powered (e.g. ailerons, flaps etc.).
- **Armed:** Vehicle is fully powered. Motors/propellers may be turning (dangerous!)

:::note
Ground stations may display *disarmed* for pre-armed vehicles. While not technically correct for pre-armed vehicles, it is "safe".
:::

Users can control progression though these states using a [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) on the vehicle (optional) *and* an [arming switch/button](#arm_disarm_switch), [arming gesture](#arm_disarm_gestures), or *MAVLink command* on the ground controller:

- A *safety switch* is a control *on the vehicle* that must be engaged before the vehicle can be armed, and which may also prevent prearming (depending on the configuration). Commonly the safety switch is integrated into a GPS unit, but it may also be a separate physical component.
  
:::warning
A vehicle that is armed is potentially dangerous. The safety switch is an additional mechanism that prevents arming from happening by accident.
:::

- An *arming switch* is a switch or button *on an RC controller* that can be used to arm the vehicle and start motors (provided arming is not prevented by a safety switch).

- An *arming gesture* is a stick movement *on an RC controller* that can be used as an alternative to an arming switch.
- MAVLink commands can also be sent by a ground control station to arm/disarm a vehicle.

PX4 will also automatically disarm the vehicle if it does not takeoff within a certain amount of time after arming, and if it is not manually disarmed after landing. This reduces the amount of time where an armed (and therefore dangerous) vehicle is on the ground.

PX4 allows you to configure how pre-arming, arming and disarming work using parameters (which can be edited in *QGroundControl* via the [parameter editor](../advanced_config/parameters.md)), as described in the following sections.

:::tip
Arming/disarming parameters can be found in [Parameter Reference > Commander](../advanced_config/parameter_reference.md#commander) (search for `COM_ARM_*` and `COM_DISARM_*`).
:::

<span id="arm_disarm_gestures"></span>

## Arming Gesture

By default, the vehicle is armed and disarmed by moving RC throttle/yaw sticks to particular extremes and holding them for 1 second.

- **Arming:** Throttle minimum, yaw maximum
- **Disarming:** Throttle minimum, yaw minimum

RC controllers will have different gestures [based on their mode](../getting_started/rc_transmitter_receiver.md#types-of-remote-controls) (as controller mode affects the sticks used for throttle and yaw):

- **Mode 2**: 
  - *Arm:* Left stick to bottom right. 
  - *Disarm:* Left stick to the bottom left.
- **Mode 1**: 
  - *Arm:* Left-stick to right, right-stick to bottom.
  - *Disarm:* Left-stick to left, right-stick to the bottom.

The required hold time can be configured using [COM_RC_ARM_HYST](#COM_RC_ARM_HYST).

| Parameter                                                                                               | Description                                                                                                |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <span id="COM_RC_ARM_HYST"></span>[COM_RC_ARM_HYST](../advanced_config/parameter_reference.md#COM_RC_ARM_HYST) | Time that RC stick must be held in arm/disarm position before arming/disarming occurs (default: 1 second). |

<span id="arm_disarm_switch"></span>

## Arming Button/Switch

An *arming button* or "momentary switch" can be configured to trigger arm/disarm *instead* of [gesture-based arming](#arm_disarm_gestures) (setting an arming switch disables arming gestures). The button should be held down for ([nominally](#COM_RC_ARM_HYST)) one second to arm (when disarmed) or disarm (when armed).

A two-position switch can also be used for arming/disarming, where the respective arm/disarm commands are sent on switch *transitions*.

:::tip
Two-position arming switches are primarily used in/recommended for racing drones.
:::

The switch or button is assigned (and enabled) using [RC_MAP_ARM_SW](#RC_MAP_ARM_SW), and the switch "type" is configured using [COM_ARM_SWISBTN](#COM_ARM_SWISBTN).

| Parameter                                                                                               | Description                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="RC_MAP_ARM_SW"></span>[RC_MAP_ARM_SW](../advanced_config/parameter_reference.md#RC_MAP_ARM_SW)     | RC arm switch channel (default: 0 - unassigned). If defined, the specified RC channel (button/switch) is used for arming instead of a stick gesture.   
**Note:**  
- This setting *disables the stick gesture*!  
- This setting applies to RC controllers. It does not apply to Joystick controllers that are connected via *QGroundControl*. |
| <span id="COM_ARM_SWISBTN"></span>[COM_ARM_SWISBTN](../advanced_config/parameter_reference.md#COM_ARM_SWISBTN) | Arm switch is a momentary button.   
- `0`: Arm switch is a 2-position switch where arm/disarm commands are sent on switch transitions.  
-`1`: Arm switch is a button or momentary button where the arm/disarm command ae sent after holding down button for set time ([COM_RC_ARM_HYST](#COM_RC_ARM_HYST)).                                 |


:::note
The switch can also be set as part of *QGroundControl* [Flight Mode](../config/flight_mode.md) configuration.
:::

## Auto-Disarming

By default vehicles will automatically disarm on landing, or if you take too long to take off after arming. The feature is configured using the following timeouts.

| Parameter                                                                                                 | Description                                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <span id="COM_DISARM_LAND"></span>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)   | Time-out for auto disarm after landing. Default: 2s (-1 to disable).            |
| <span id="COM_DISARM_PRFLT"></span>[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT) | Time-out for auto disarm if too slow to takeoff. Default: 10s (<=0 to disable). |


## Arming Sequence: Pre Arm Mode & Safety Button

The arming sequence depends on whether or not there is a *safety switch*, and is controlled by the parameters [COM_PREARM_MODE](#COM_PREARM_MODE) (Prearm mode) and [CBRK_IO_SAFETY](#CBRK_IO_SAFETY) (I/O safety circuit breaker).

The [COM_PREARM_MODE](#COM_PREARM_MODE) parameter defines when/if pre-arm mode is enabled ("safe"/non-throttling actuators are able to move):

- *Disabled*: Pre-arm mode disabled (there is no stage where only "safe"/non-throttling actuators are enabled).
- *Safety Switch* (Default): The pre-arm mode is enabled by the safety switch. If there is no safety switch then pre-arm mode will not be enabled.
- *Always*: Prearm mode is enabled from power up. 

If there is a safety switch then this will be a precondition for arming. If there is no safety switch the I/O safety circuit breaker must be engaged ([CBRK_IO_SAFETY](#CBRK_IO_SAFETY)), and arming will depend only on the arm command.

The sections below detail the startup sequences for the different configurations

### Default: COM_PREARM_MODE=Safety and Safety Switch

The default configuration uses safety switch to prearm. From prearm you can then arm to engage all motors/actuators. It corresponds to: [COM_PREARM_MODE=1](#COM_PREARM_MODE) (safety switch) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The default startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - Not possible to arm.
2. Safety switch is pressed. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Disabled and Safety Switch

When prearm mode is *Disabled*, engaging the safety switch does not unlock the "safe" actuators, though it does allow you to then arm the vehicle. This corresponds to [COM_PREARM_MODE=0](#COM_PREARM_MODE) (Disabled) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - Not possible to arm.
2. Safety switch is pressed. 
   - *All actuators stay locked into disarmed position (same as disarmed).*
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. To arm, you still need the safety switch. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=0](#CBRK_IO_SAFETY) (I/O safety circuit breaker disabled).

The startup sequence is:

1. Power-up. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - Not possible to arm.
2. Safety switch is pressed. 
   - System safety is off: Arming possible.
3. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Safety or Disabled and No Safety Switch

With no safety switch, when `COM_PREARM_MODE` is set to *Safety* or *Disabled* prearm mode cannot be enabled (same as disarmed). This corresponds to [COM_PREARM_MODE=0 or 1](#COM_PREARM_MODE) (Disabled/Safety Switch) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:

1. Power-up. 
   - All actuators locked into disarmed position
   - System safety is off: Arming possible.
2. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### COM_PREARM_MODE=Always and No Safety Switch

When prearm mode is *Always*, prearm mode is enabled from power up. This corresponds to [COM_PREARM_MODE=2](#COM_PREARM_MODE) (Always) and [CBRK_IO_SAFETY=22027](#CBRK_IO_SAFETY) (I/O safety circuit breaker engaged).

The startup sequence is:

1. Power-up. 
   - System now prearmed: non-throttling actuators can move (e.g. ailerons).
   - System safety is off: Arming possible.
2. Arm command is issued. 
   - The system is armed.
   - All motors and actuators can move.

### Parameters

| Parameter                                                                                               | Description                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_PREARM_MODE"></span>[COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) | Condition to enter prearmed mode. `0`: Disabled, `1`: Safety switch (prearm mode enabled by safety switch; if no switch present cannot be enabled), `2`: Always (prearm mode enabled from power up). Default: `1` (safety button). |
| <span id="CBRK_IO_SAFETY"></span>[CBRK_IO_SAFETY](../advanced_config/parameter_reference.md#CBRK_IO_SAFETY)   | Circuit breaker for IO safety.                                                                                                                                                                                                     |


<!-- Discussion:
https://github.com/PX4/PX4-Autopilot/pull/12806#discussion_r318337567 
https://github.com/PX4/px4_user_guide/issues/567#issue-486653048
-->