# Manual/Stabilized Flight Mode (Multicopter)

The user has full manual control over the multicopter when the sticks are outside of the RC controller center-deadzone. The roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and throttle is passed directly to the output mixer to control altitude/speed.

As soon as you release the control sticks the multicopter will level out (i.e. once the roll and pitch sticks are centered). If the vehicle is properly balanced and throttle is at 50% in the middle of the scale, it will hold the altitude (in calm weather). The craft will drift in the direction of any wind and you have to control the throttle to hold altitude. 

![MC Manual Flight](../../images/flight_modes/manual_stabilized_MC.png)


## Technical Description

The pilot's inputs are passed as roll and pitch angle commands and a yaw rate command. Throttle is passed directly to the output mixer. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered inside the controller deadzone (consequently leveling-out the attitude). The autopilot does not compensate for drift due to wind (or other sources).

> **Note**
>  * Manual input is required (RC controller, or gamepad/thumbsticks through MAVLink).

## Parameters

Parameter | Description
--- | ---
<span id="MPC_HOLD_DZ"></span>[MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ) | Deadzone of sticks where position hold is enabled. Default: 0.1 (10% of full stick range).
