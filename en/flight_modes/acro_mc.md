# Acro Flight Mode (Multicopter)

<!-- this requires review and updates -->

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Acro mode* is the RC mode for performing acrobatic maneuvers e.g. flips, rolls and loops.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![MC Manual Acrobatic Flight](../../images/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->

## Technical Description

RC/manual mode for performing acrobatic maneuvers e.g. flips, rolls and loops.

RC RPY stick inputs control the rate of angular rotation around the respective axes. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (not necessarily level!)

## Parameters

Parameter | Description
--- | ---
&nbsp; | 

 
<!-- 
Possibly interesting and relevant:

MC_ACRO_EXPO - Acro Expo factor applied to input of all axis: roll, pitch, yaw - 0 Purely linear input curve 1 Purely cubic input curve. Default 0.69	

MC_ACRO_P_MAX - Max acro pitch rate default: 2 turns per second (720.0	deg/s)

MC_ACRO_R_MAX - Max acro roll rate default: 2 turns per second (720.0	deg/s)

MC_ACRO_SUPEXPO - Acro SuperExpo factor applied to input of all axis: roll, pitch, yaw. Comment: 0 Pure Expo function 0.7 resonable shape enhancement for intuitive stick feel 0.95 very strong bent input curve only near maxima have effect. Default (0.7)

MC_ACRO_Y_MAX - Max acro yaw rate default 1.5 turns per second (540.0 degrees/s)

-->
