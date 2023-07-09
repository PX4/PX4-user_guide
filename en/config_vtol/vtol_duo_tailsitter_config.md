# Duo-Tailsitter VTOL Configuration

This is the configuration tuning documentation for a "Duo-Tailsitter VTOL".

A tailsitter is essentially a fixed wing vehicle that takes off in a pitched up configuration (essentially sitting on its tail, hence the name) and then transitions to fixed wing flight by pitch down by 90 degrees to achieve the fixed wing configuration.
The Duo-Tailsitter variant is so-named because it has two motors (a "quad" tailsitter would have four).

Like other VTOLs, the Duo-Tailsitter has two modes of operation: multicopter (MC) mode and fixed wing (FW) mode.
In MC mode, lift and roll are dependent on the motors, while the pitch and yaw depend on the elevons.
In FW mode, yaw depends on differential thrust from the motors, while roll and pitch depend on the elevons.

For airframe specific documentation and build instructions see [VTOL Framebuilds](../frames_vtol/README.md).

## Firmware & Basic Settings

1. Run *QGroundControl*
2. Flash the firmware for your current release or master (PX4 `main` branch build).
3. In the [Frame setup](../config/airframe.md) section select the appropriate VTOL airframe.
   At time of writing, this must be the [Generic VTOL Tailsitter](../airframes/airframe_reference.md#vtol-tailsitter).
4. Perform all the other [standard configuration](../config/README.md), including compass, radio setup, etc., except for autotuning.

   :::note
   Autotuning is not supported for a duo tailsitter!
   :::

### Flight / Transition Mode Switch

You should assign a switch on your RC controller for changing between the multicopter and fixed wing modes.

:::note
While PX4 allows flight without an RC controller, you must have one when tuning/configuring a new airframe.
:::

This is done in [Flight Mode](../config/flight_mode.md) configuration, where you [assign flight modes and other functions](../config/flight_mode.md#what-flight-modes-and-switches-should-i-set) to switches on your RC controller.
The switch can also be assigned using the parameter [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

The switch in the off-position means that you are flying in multicopter mode.

## Duo Tailsitter MC Mode Tuning Guide

MC-mode tuning is difficult because some axes depend on control surfaces, while others depend on the motors. A non-obvious insight about the tailsitter frame is that FW rate controller gains affect the pitch and yaw in hover (MC Mode) as well. So, for MC-mode rate controller tuning, the following gains affect the Attitude Rate Controllers in the given axes:

Roll Axis ->
[MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D), [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K)

Pitch Axis ->
[FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P), [FW_RR_I](../advanced_config/parameter_reference.md#FW_PR_I), [FW_PR_D](../advanced_config/parameter_reference.md#FW_PR_D), [FW_RR_FF](../advanced_config/parameter_reference.md#FW_PR_FF)

Yaw Axis -> 
[FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P), [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I), [FW_RR_D](../advanced_config/parameter_reference.md#FW_RR_D), [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF)

This is very counterintuitive but very important.


:::note
Always disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) when tuning a vehicle.
:::

As a sanity check, we start off by setting the following gain parameter:

- Roll rate controller
  - [MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P) = `0`
  - [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I) = `0`
  - [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D) = `0`
  - [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K) = `1`
- Pitch rate controller
  - [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) = `0`
  - [FW_RR_I](../advanced_config/parameter_reference.md#FW_PR_I) = `0`
  - [FW_PR_D](../advanced_config/parameter_reference.md#FW_PR_D) = `0`
  - [FW_RR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) = `0`
- Yaw rate controller
  - [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) = `0`
  - [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) = `0`
  - [FW_RR_D](../advanced_config/parameter_reference.md#FW_RR_D) = `0`
  - [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) = `0`
- Attitude controller
  - [MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) = `0`
  - [MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P) = `0`
  - [MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P) = `0`

The expected behaviour is that when you arm in [Stabilized mode](../flight_modes/manual_stabilized_mc.md), both the motors should spin, control surfaces should be centred, and no effect of manual RC input using the transmistter is observed.

:::note IF you can do so safely!
Gently pick up the vehicle by hand and try tilting it in different axes.
You should feel no countering torque from the motors or control surfaces. 
DO REMEMBER TO ALWAYS USE SAFETY GLASSES AND THICK GLOVES TO HANDLE THE VEHICLE WITH THE ROTORS SPINNING.
:::

Once this sanity check is complete, we move on to slowly increasing the gains.

### Attitude Rate Controller Gain Tuning

- Increase [MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P) by 0.1.
  Arm and lift the vehicle and displace it in the roll axis.
  You should feel a countering torque as the tailsitter tries to reorient itself.
  This is still a very manual process, and there is not much science to it.
  Increase the proportional gain until you can feel sustained oscillations when you displace it.
  Then decrease the gain to 1/2 of that value.
  
  If your oscillations never converge, it is worth trying to increase the [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I) gain to a very small value.
  If oscillations are the problem, try increasing [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D)

- Repeat the above process for Pitch and Yaw axes.


### Attitude Controller Gain Tuning

Once you have a tuned rate controller, your vehicle can hover in a very stable way (albeit with some support for position control, since your angle gains are still 0 and your RC transmitter will not work. This means that you would need to physically keep the vehicle from drifting too much).

You should then move on to tuning the Attitude Controller Gains.
In most cases, a proportional controller is sufficient for this. 

- Repeat the same process as mentioned above in the Attitude Rate Controller gain tuning, but instead of manually displacing the vehicle in a particular axes, use the RC transmitter to give pulses in certain axes and check the response.
Tune the proportional gains so that there are no oscillations, and if they do exist, ensure that they subside quickly.


## Duo Tailsitter FW Mode Tuning Guide

TBD (we're still working out the best approach).
