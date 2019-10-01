# Motor Checks

After the airframe is setup and configured you should validate the motor assignment, spin direction and servo response:

1. Remove all propellers, switch to Manual flight mode and arm the vehicle.
1. Increase the throttle a bit, so the vehicle does not automatically disarm.
   At the same time check that the motors respond to throttle changes.
1. Check that all motors turn to the right direction according to the configured [airframe](../airframes/airframe_reference.md).
   If any spin the wrong direction, they need to be reversed.
   There are several options to achieve that:
   - If using ESCs that support [DShot](../peripherals/dshot.md) you can reverse the direction via [DShot commands](../peripherals/dshot.md#commands).
   - Swap 2 of the 3 motor cables (it does not matter which ones).
     > **Note** If they are not connected via bullet-connectors, re-soldering is required (this is a reason, among others, to prefer DShot ESCs).
1. If the vehicle has ailerons, check if they are responding in the right directions when giving roll/pitch stick input commands.
