---
canonicalUrl: https://docs.px4.io/main/de/flight_modes/rattitude_mc
---

# RAttitude Mode (Multicopter)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

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

| Parameter                                                                                     | Description                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MC_RATT_TH"></span>[MC_RATT_TH](../advanced_config/parameter_reference.md#MC_RATT_TH) | Threshold for Rattitude mode (the percentage of the stick radius at which mode switches between manual/stabilised and acro-like modes. Default 0.8. |

The parameters for [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md) and [Acro mode](../flight_modes/acro_mc.md) are also relevant.