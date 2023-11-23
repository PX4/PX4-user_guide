# Throw Launch (Multicopter)

:::note
Introduced after PX4 v1.14.
As this is a relatively new feature, it has not been broadly tested across various platforms and in different scenarios.
:::

In addition to standard takeoff, PX4-based multicopters can be started by throwing them into the air.
Once the aircraft detects the throw, it turns on the motors and behaves according to the mode it is in.
The majority of testing is done with position mode, but other modes should also work.

:::note
This feature was intended to be used with multicopters.
For similar functionality on fixed-winged aircrafts, check [Hand Launch in Takeoff Mode](../flight_modes_fw/takeoff.md#catapult-hand-launch).
:::

## Safety

:::warning
Caution! This procedure requires the operator to hold an armed multicopter and be in proximity when it is flying.
It is dangerous.
Take special care and do not neglect any safety measures.
:::

1. Wear safety equipment.
   Eye protection and safety work gloves are recommended.
1. Have an easily accessible [killswitch](../config/safety.md#kill-switch), test it, and remind the operator to be attentive and use it if needed.
   We found the latter part to be particularly important as pilots tend to try to save the aircraft even in hard situations.
1. Test as much as possible without propellers.
   Make sure the tools to dismount the propellers are easily accessible not to neglect this step.
1. Test this feature with at least two people — one handling the aircraft, the other one the remote control.
1. Keep in mind that after the throw, the exact behavior of the aircraft might be hard to predict as it depends heavily on the way it is thrown.
   Sometimes it will stay perfectly in place, but sometimes (e.g., due to extensive roll), it might drift to one side while stabilizing.
   Keep safe distance.

For safety, we recommend the following procedure to first execute the throw launch without the propellers to confirm the arming does not happen prematurely and for the operator to understand what to expect during the flight.

### Throw launch test without propellers

1. Dismount the propellers.
1. Set [COM_THROW_EN](../advanced_config/parameter_reference.md#COM_THROW_EN) to `Enabled`.
1. Arm the aircraft.
   The engines should not spin, but the vehicle should be armed and keep playing the arming tune.
1. Throw the aircraft into the air around 2 m up.
   If the aircraft is not thrown high enough, the motors will not turn on.
1. The engines should start just after crossing the apex.
1. Engage the kill switch (ideally a second person operating the RC should do it).
1. Catch the drone.
   Use safety gloves.

## Operation

Before testing the throw launch, make sure the aircraft works well using the usual takeoff.

### Throw launch

1. Set [COM_THROW_EN](../advanced_config/parameter_reference.md#COM_THROW_EN) to Enabled.
1. Arm the aircraft.
   The propellers should not spin, but the vehicle should be armed and keep playing the arming tune.
1. Throw the aircraft away from you, forward and up.
   The vehicle should reach the speed of [COM_THROW_SPEED](../advanced_config/parameter_reference.md#COM_THROW_SPEED), which by default is set to 5 m/s.
   To achieve that, throwing it to around 2 m altitude and 2 m away should suffice.
   If this speed is not achieved, the aircraft will fall down with the motors off
   Try to avoid excessive rotation during the throw, as this might cause the drone to fail or behave unpredictably.
   The exact meaning of "excessive rotation" depends on the platform: for instance, [PX4Vision](../complete_vehicles/px4_vision_kit.md) used for the testing, still managed to recover after 2-3 full rotations.
1. After the downward velocity is detected (the vehicle starts falling down), the motors should turn on and the vehicle will start flying according to the mode it is in.
1. Fly!

The throw launch was primarily tested in the POSITION mode, but should also work in other modes.

:::warning
Do not try to use this feature on a moving platform (e.g., throwing a drone from a moving car).
It was not designed with such scenario in mind and the implemented safety mechanism assumes that the drone does not move before the throw.
Otherwise, the drone might turn on the motors prematurely.
:::

## Parameters

The following parameters determine the behavior of the system.

- [COM_THROW_EN](../advanced_config/parameter_reference.md#COM_THROW_EN) enables the feature.
- [COM_THROW_SPEED](../advanced_config/parameter_reference.md#COM_THROW_SPEED) determines the minimum speed the aircraft should reach to detect the throw.
  If it is not reached, the engines will not turn on.
