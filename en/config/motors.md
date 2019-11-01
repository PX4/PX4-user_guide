# Motor/Servo Checks

After the airframe is setup and configured you should validate the motor assignment, spin direction and servo response.
This can be done in QGroundControl, under the [Vehicle Setup -> Motors](https://docs.qgroundcontrol.com/en/SetupView/Motors.html) tab.

Please take note of the following:
- If a safety button is used, it must be pressed before motor testing is allowed.
- The kill-switch can still be used to stop motors immediately.
- The parameter [COM_MOT_TEST_EN](../advanced_config/parameter_reference.md#COM_MOT_TEST_EN) can be used to completely disable motor testing.
- On boards with an IO, only the MAIN pins can be tested.
- On the shell, [motor_test](https://dev.px4.io/master/en/middleware/modules_command.html#motortest) can be used as well, which has additional options.

In case one or more of the motors do not turn to the right direction according to the configured [airframe](../airframes/airframe_reference.md), they need to be reversed.
There are several options to achieve that:
- If using ESCs that support [DShot](../peripherals/dshot.md) you can reverse the direction via [DShot commands](../peripherals/dshot.md#commands).
- Swap 2 of the 3 motor cables (it does not matter which ones).
  > **Note** If they are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).

In addition, the following checks should be performed to validate that the vehicle is setup correctly:
1. With propellers still removed, switch to [Stabilised mode](../flight_modes/manual_stabilized_mc.md) (Multicopter) or [Manual mode](../flight_modes/manual_fw.md) (Fixed Wing) and arm the vehicle.
1. Increase the throttle a little (so the vehicle does not automatically disarm) and check that the motors respond to throttle changes.
1. Check that all motors spin at minimum throttle.
1. If the vehicle has ailerons, check if they are responding in the right directions when giving roll/pitch stick input commands.

