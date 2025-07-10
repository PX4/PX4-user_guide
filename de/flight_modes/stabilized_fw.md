---
canonicalUrl: https://docs.px4.io/main/de/flight_modes/stabilized_fw
---

# Stabilized Mode (Fixed Wing)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Stabilized mode* puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).

:::tip
*Stabilized mode* is much easier to fly than [Manual mode](../flight_modes/manual_fw.md) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks. :::

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

The diagram below shows the mode behaviour visually (for a [mode 2 transmitter](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![FW Manual Flight](../../assets/flight_modes/manual_stabilized_FW.png)


## Technical Description

RC/manual mode where centered RP sticks level vehicle.
* Centered sticks put vehicle into straight and level flight. The vehicle course and altitude are not maintained, and can drift due to wind.
* If roll/pitch sticks are non-zero the vehicle does a coordinated turn (manual yaw input is added to rudder control input to control sideslip).

## Parameters

| Parameter | Description |
| --------- | ----------- |
| &nbsp;    |             | 

<!-- this document needs to be extended -->
