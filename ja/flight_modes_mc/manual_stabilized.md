---
canonicalUrl: https://docs.px4.io/main/ja/flight_modes_mc/manual_stabilized
---

# Manual/Stabilized Mode (Multicopter)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

The *Manual/Stabilized* mode stabilizes the multicopter when the RC control sticks are centred. To manually move/fly the vehicle you move the sticks outside of the centre.

:::note

This multicopter mode is enabled if you set either *Manual* or *Stabilized* modes.
:::


When under manual control the roll and pitch sticks control the *angle* of the vehicle (attitude) around the respective axes, the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.

As soon as you release the control sticks they will return to the center deadzone. The multicopter will level out and stop once the roll and pitch sticks are centered. The vehicle will then hover in place/maintain altitude - provided it is properly balanced, throttle is set appropriately (see [below](#params)), and no external forces are applied (e.g. wind). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)


## Technical Description

The pilot's inputs are passed as roll and pitch angle commands and a yaw rate command. Throttle is rescaled (see [below](#params)) and passed directly to control allocation. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered inside the controller deadzone (consequently leveling-out the attitude). The autopilot does not compensate for drift due to wind (or other sources).

:::note

* Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).
:::


<a id="params"></a>

## Parameters

| Parameter                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_THR_HOVER"></a>[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER) | Hover throttle that is output when the throttle stick is centered and `MPC_THR_CURVE` is set to default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| <a id="MPC_THR_CURVE"></a>[MPC_THR_CURVE](../advanced_config/parameter_reference.md#MPC_THR_CURVE) | Defines the throttle scaling. By default this is set to **Rescale to hover thrust**, which means that when the throttle stick is centered the configured hover throttle is output (`MPC_THR_HOVER`) and the stick input is linearly rescaled below and above that (allowing for a smooth transition between Stabilized and Altitude/Position control). <br>On powerful vehicles the hover throttle might be very low (e.g. below 20%) so that rescaling distorts the throttle input - i.e. here 80% of the thrust would be controlled by just the top half of the stick input and 20% by the bottom. If needed `MPC_THR_CURVE` can be set to **No Rescale** so that there is no rescaling (stick input to throttle mapping is independent of `MPC_THR_HOVER`). |
