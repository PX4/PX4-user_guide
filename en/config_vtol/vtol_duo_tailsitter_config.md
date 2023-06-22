# Duo-Tailsitter VTOL Configuration

This is the configuration documentation for "Duo-Tailsitter". This is essentially a fixed wing vehicle that takes off in a pitched up configuration (essentially sitting on its tail, hence the name) and then transitions to fixed wing flight by pitch down by 90 degrees to achieve the fixed wing configuration.

It has two modes of operation like the other VTOLs, MC (multicopter) mode and FW (fixed wing) mode. The way it differs from the other frames is regarding how it actuates itself in those modes. In MC mode, lift and roll are dependent on the motors, while the pitch and yaw depend on the ailevons. In FW mode, yaw depends on differential thrust, while roll and pitch depend on the ailevons.

For airframe specific documentation and build instructions see [VTOL Framebuilds](../frames_vtol/README.md).

## Firmware & Basic Settings

1. Run *QGroundControl*
2. Flash the firmware for your current release or master (PX4 `main` branch build).
3. In the [Frame setup](../config/airframe.md) section select the appropriate VTOL airframe (Generic VTOL Tailsitter, or Caipiroshka VTOL).


### Flight / Transition Mode Switch

You should assign a switch on your RC controller for switching between the multicopter- and fixed wing modes.

:::note
While PX4 allows flight without an RC controller, you must have one when tuning/configuring up a new airframe.
:::

This is done in [Flight Mode](../config/flight_mode.md) configuration, where you [assign flight modes and other functions](../config/flight_mode.md#what-flight-modes-and-switches-should-i-set) to switches on your RC controller.
The switch can also be assigned using the parameter [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

The switch in the off-position means that you are flying in multicopter mode.

## Duo Tailsitter MC Mode Tuning Guide

The MC tuning is tricky, as certain axes depend on the control surfaces, and certain ones depend on the motors.

:::warning
Always disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) when tuning a vehicle.
:::

To tune the tailsitter in MC mode, we start off by setting some gains to 0. Just as a sanity check. 
- Roll rate control ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P) = 0, [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I) = 0, [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D) = 0, [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K) = 1)
- Pitch rate control ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P) = 0, [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I) = 0, [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D) = 0, [MC_PITCHRATE_K](../advanced_config/parameter_reference.md#MC_PITCHRATE_K) = 1)
- Yaw rate control ([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P) = 0, [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I) = 0, [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D) = 0, [MC_YAWRATE_K](../advanced_config/parameter_reference.md#MC_YAWRATE_K) = 1)

- Angle control ([MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) = 0, ([MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P) = 0, ([MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P) = 0)

This is just a sanity check, and the expected behaviour is that when you arm in Stabilized mode, both the motors should spin, control surfaces should be centred, and no effect of manual RC input using the transmistter is observed. Moreover, if possible, gently pick up the vehicle by hand and try tilting it in different axes. YOU SHOULD FEEL NO COUNTERING TORQUE EXERTED BY THE MOTORS OR THE CONTROL SURFACES. 

Once this sanity check is complete, we move on to increasting the gains slowly. 

### Rate Gains

- Increase [MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P) by 0.1, and try arming and lifting the vehicle and displacing in the roll axis. You should feel a countering torque and the quad trying to reorient itself. This is still a very manual process, and there is not much science to it. Increase the proportional gain until you can feel sustained oscillations when you displace it. Then decrease it to 1/2 of that value. If your osciallations never converge, it is worth trying to increase the [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I) gain to a very small value. If osciallations are the problem, try increasing [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D)

- Do the same as above for Pitch and Yaw. 


### Angle Gains

Once you have a tuned rate controller, your vehicle can hover in a very stable way (albeit with some support for position control, since your angle gains are still 0 and your RC transmitter will not work).

You should then move on to tuning the Angle gains. In most cases, just a Proportional controller is sufficient enough for this. 

- Repeat the same process as mentioned above in the Rate controller gain tuning, but instead of manually displacing the vehicle in a particular axes, use the RC transmitter to give pulses in certain axes and check the responce. Tune the Proportional gains so that there are no oscillations, and if they do exist, ensure that they subside quickly.


## Duo Tailsitter FW Mode Tuning Guide

On the way! We're still figuring this out fully as well!