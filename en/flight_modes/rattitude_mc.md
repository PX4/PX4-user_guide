# RAttitude Flight Mode (Multicopter)

<!-- this requires review and updates -->

[<img src="../../assets/site/difficulty_4.svg" title="Difficulty (Medium-hard)" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Rattitude mode* allows pilots to fly using [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) flight most of the time, but still perform [Acro mode](../flight_modes/acro_mc.md)-style flips and tricks when desired.

The vehicle behaves as in *Manual/Stabilized mode* when the Roll/Pitch stick is moved within the central area and like *Acro mode* when the stick is moved in the outer circumference (by default Manual/Stabilized mode occupies about 80% of the range). When the sticks are centered the multicopter will level out (but will still drift in the direction of any wind and with any pre-existing momentum).

<!-- Image missing: https://github.com/PX4/px4_user_guide/issues/189 -->


## Technical Description

RC mode that allows pilots to fly using [Manual/Stabilized](../flight_modes/manual_stabilized_mc.md) flight most of the time, but still perform [Acro mode](../flight_modes/acro_mc.md)-style flips and tricks when desired. Centered sticks level vehicle.

* Sticks within mode's threshold (like *Manual/Stabilized mode*): 
  * Centered RP sticks level vehicle. Roll/Pitch sticks control tilt angle in those orientations, resulting in corresponding left-right and forward-back movement.
* Sticks outside threshold (like *Acro mode*): 
  * RPY stick inputs control the rate of angular rotation around the respective axes.


## Parameters

Parameter | Description
--- | ---
&nbsp; | 

<!-- possibly of interest:

MC_RATT_TH - Threshold for Rattitude mode - Comment: Manual input needed in order to override attitude control rate setpoints and instead pass manual stick inputs as rate setpoints. Default 0.8 []

-->
