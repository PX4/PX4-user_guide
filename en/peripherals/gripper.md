# Gripper Peripherals

Grippers are mechanical devices that can be integrated with an unmanned vehicle to hold (grip) and release payloads.

PX4 allows grippers to triggered automatically in [Payload Delivery Missions](../flying/package_delivery_mission.md) or manually using a Joystick.

![High-load gripper example](../../assets/hardware/grippers/highload_gripper_example.jpg)

:::note
A gripper can also be configured as a [generic RC or MAVLink actuator](../payloads/README.md#actuator-control-with-rc).
This allows it to be used manually via an RC Controller, but not in missions or on a Joystick.
:::

## Supported Grippers

There are many different gripper mechanisms ("jaws", "fingers", "electromagnets") and interfaces (PWM, CAN, MAVLink, and so on).

PX4 supports grippers that have simple triggers to hold and release, and that use the following interfaces (see linked documents for details):

- [PWM Servo Gripper](gripper_servo.md) - Grippers connected to autopilot PWM outputs
- **MAVLink Gripper** (Untested) - Grippers that support the [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) MAVLink command.

:::note
The [Roboclaw driver](../modules/modules_driver.md#roboclaw) isn't supported as a Gripper yet.
However in the future it may get supported as a Gripper.
:::

## Using a Gripper

For information on using a gripper in missions see [Payload Delivery Missions](../flying/package_delivery_mission.md).

You can trigger the gripper manually if you've mapped `gripper open` and `gripper close` buttons in the [QGC Joystick Configuration](#qgc-joystick-configuration).
Note that if you press **Grab** button while the gripper is opening, it will automatically abort releasing behavior and go to the Close position, effectively cancelling the release command.
If you do this in a mission while the release is actually happening then the [delivery will be cancelled](../flying/package_delivery_mission.md#manual-control-of-gripper-in-missions).

MAVLink applications, such as ground stations, can also control the gripper using the [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) MAVLink command.


## PX4 Configuration

### Package Delivery Configuration

PX4 Gripper support is tied to the package delivery feature, which must be enabled and configured in order to be able to use a gripper.

1. Set [`PD_GRIPPER_EN`](../advanced_config/parameter_reference.md#PD_GRIPPER_EN) parameter to 1 (reboot required after change).
1. Set [`PD_GRIPPER_TYPE`](../advanced_config/parameter_reference.md#PD_GRIPPER_TYPE) to match your Gripper.
   For example, set to `Servo` for a [Servo Gripper](gripper_servo.md).

### Gripper Actuator Mapping

To enable the output of the Gripper, set the Function of the output port where the gripper is connected to as `Gripper` in the [Actuators](../config/actuators.md#actuator-outputs) tab.

<!-- Replace this with actuator diagram -->

### QGC Joystick Configuration

QGroundControl [Joystick](../config/joystick.md) configuration allows you to map gripper actions to Joystick buttons, after which you will be open and close the gripper manually.

Open the Joystick configuration by selecting: **QGC Logo (upper-left) > Vehicle Setup > Joystick > Button Assignment** tab.
Select `Gripper Open` and `Gripper Close` actions for your desired joystick buttons

![Gripper action mapping](../../assets/config/gripper/qgc_gripper_actions_joystick.png)

You can test the actions by clicking on the mapped buttons and checking for gripper movement.
If the gripper doesn't move as expected check the package delivery configuration and actuator mapping are set up properly.

### Enable Pre-ARM Mode

We need to set a parameter to enable [pre-arming](../advanced_config/prearm_arm_disarm.md).
This keeps the motors disabled but allows the gripper to be opened and closed for attaching the payload (avoiding potential danger from spinning propellers).

Set [`COM_PREARM_MODE`](../advanced_config/parameter_reference.md#COM_PREARM_MODE) to `Always`.

### Configure Gripper Actuation Time

Some mechanism specific settings need to be added to make sure the system is aware of the mechanism's physical properties.
Since every gripper works differently (speed / range of motion / behavior).

You need to specify an actuation time, which specifies the time it takes to open or close the gripper. As most grippers don't have a sensor to detect successful actuation (close/opening), the payload delivery feature will rely on this value to estimate gripper's position.

To measure gripper actuation time, go to the [MAVLink Shell](../debug/mavlink_shell.md) in QGC  and execute the following command while the drone is on a bench and the propellers are removed:

`> payload_deliverer gripper_test`

Then observe how long it takes for the gripper to go from open position to closed position, and vice versa for opening. Note down the actuation time for both cases and choose the maximum measurement for the actuation time.

As an alternative test method, you can utilize the [Joystick capability](#griper-action-joystick-button-mapping-in-qgc) to trigger gripper open and close actions as well.

:::note
If you get an error message such as "[payload_deliverer] not running", make sure that you have gone through the setup procedures above and either run `payload_deliverer start` command in the Nuttx shell
:::

After measuring the opening and closing actuation time, set [PD_GRIPPER_TO](../advanced_config/parameter_reference.md#PD_GRIPPER_TO) to the longer timeout of the two.

### Mission Timeout

To use payload delivery feature as part of a mission, it is important to make sure that a potential actuation failure does not cause the mission to be halted or interrupted.

For missions there is an additional safeguard in form of a timeout, after which a mission is continued even if the gripper's successful actuation acknowledgement (which is published by the payload_deliverer module in charge of the Payload Delivery feature) is not received.

Set the [MIS_PD_TO](../advanced_config/parameter_reference.md#MIS_PD_TO) as the mission timeout, which must be greater than the [Gripper actuation time](#gripper-actuation-time) setting.

Possible causes could be actuator failures (currently not the case since Gripper state feedback sensor is not supported), but also internal communication errors (PX4's internal uORB messaging system can in rare-cases drop the acknowledgement message).

:::note
Currently, PWM Grippers rely on this parameter alone to determine whether the actuation was successful or not.
:::
