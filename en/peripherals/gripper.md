# Gripper Peripherals

Grippers are mechanical devices that can be integrated with an unmanned vehicle to grip (hold) and release payloads.

PX4 allows grippers to be triggered automatically in [Payload Delivery Missions](../flying/package_delivery_mission.md) or manually using a Joystick, or even as a generic actuator.

![High-load gripper example](../../assets/hardware/grippers/highload_gripper_example.jpg)

:::note
A gripper can instead be configured as a [generic RC or MAVLink actuator](../payloads/README.md#actuator-control-with-rc).
This allows it to be used manually via an RC Controller, but not in missions or using a Joystick.
:::

## Supported Grippers

There are many different gripper mechanisms ("jaws", "fingers", "electromagnets") and interfaces (PWM, CAN, MAVLink, and so on).

PX4 supports grippers that have simple triggers to hold and release, and that use the following interfaces (see linked documents for details):

- [PWM Servo Gripper](gripper_servo.md) - Grippers connected to autopilot PWM outputs
  - [R4-EM-R22-161 : push-to-close latch electronic lock](https://southco.com/en_any_int/r4-em-r22-161)
- **MAVLink Gripper** (Untested) - Grippers that support the [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) MAVLink command.

:::note
[Roboclaw](../modules/modules_driver.md#roboclaw) isn't supported as a gripper (but may be in future).
:::

## Using a Gripper

### Generic Actuator usage

Gripper can be used as a [generic actuator](#generic-actuator-configuration), but for this controlling the gripper will only be possible via MAVLink interface, as documented in [payloads](../payloads/README.md#actuator-control-with-mavlink-message).

This in theory allows usage in Missions that is not specific to package deliveries, by using the `MAV_CMD_DO_SET_ACTUATOR` mission command. But if you are trying to achieve a package delivery, it is recommended to use the package delivery setup documented below.

### Package delivery usage

Alternatively, the Gripper can be used in a [package delivery configuration](#package-delivery-configuration).

For information on using a gripper in missions see [Payload Delivery Missions](../flying/package_delivery_mission.md).

You can manually trigger a gripper manually from a Joystick button if you've mapped `gripper open` and `gripper close` buttons in the [QGC Joystick Configuration](#qgc-joystick-configuration).
Note that if you press the **Grab** button while the gripper is opening, it will automatically abort releasing behavior and go to the closed position, effectively cancelling the release command.
If you do this in a mission while the release is actually happening then the [delivery will be cancelled](../flying/package_delivery_mission.md#manual-control-of-gripper-in-missions).

Manually triggering a gripper from an [RC Control](../getting_started/rc_transmitter_receiver.md) switch is not supported.

MAVLink applications, such as ground stations, can also control the gripper using the [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) MAVLink command.

## Generic Actuator Configuration

![Generic actuator output setting in QGC](../../assets/peripherals/qgc_generic_actuator_output_setting_example.png)

As documented in [payloads](../payloads/README.md#actuator-control-with-mavlink-message), you can configure the Gripper to be tied to any of the Offboard Actuator Set` functions in the [Actuators](../config/actuators.md#actuator-outputs) tab.

## Package Delivery Configuration

PX4 gripper support is tied to the package delivery feature, which must be enabled and configured in order to be able to use a gripper.

1. Set [PD_GRIPPER_EN](../advanced_config/parameter_reference.md#PD_GRIPPER_EN) parameter to 1 (reboot required after change).
1. Set [PD_GRIPPER_TYPE](../advanced_config/parameter_reference.md#PD_GRIPPER_TYPE) to match your gripper.
   For example, set to `Servo` for a [Servo Gripper](gripper_servo.md).

### Gripper Actuator Mapping

To enable the output of the gripper, set the Function of the output port where the gripper is connected to as `Gripper` in the [Actuators](../config/actuators.md#actuator-outputs) tab.

<!-- Replace this with actuator diagram -->

### QGC Joystick Configuration

QGroundControl [Joystick](../config/joystick.md) configuration allows you to map gripper actions to Joystick buttons, after which you will be open and close the gripper manually.

To map joystick buttons in QGroundControl:

1. Open the menu: **QGC Logo (upper-left) > Vehicle Setup > Joystick > Button Assignment** tab.

   ![Gripper action mapping](../../assets/config/gripper/qgc_gripper_actions_joystick.png)
1. Select `Gripper Open` and `Gripper Close` actions for your desired joystick buttons, as shown above.

You can test the actions by clicking on the mapped buttons and checking for gripper movement.
If the gripper doesn't move as expected check the package delivery configuration and actuator mapping are set up properly.

### Enable Pre-ARM Mode

Typically you will want to enable the [pre-arming mode](../advanced_config/prearm_arm_disarm.md).
This mode keeps the motors disabled but allows the gripper to be opened and closed for attaching the payload (avoiding potential danger from spinning propellers).

1. Set [COM_PREARM_MODE](../advanced_config/parameter_reference.md#COM_PREARM_MODE) to `Always`.

### Gripper Actuation Timeout

It is important for package delivery that the gripper has time to release before progressing to subsequent waypoints.
For grippers that do not provide sensor-based feedback of their state, which is most of them, a configurable timeout is used to signal when the gripper _should_ have opened or closed.

To set the actuation timeout:

1. Measure the time taken for the gripper to open and time to close, and note the longer of these two times.

   There are two easy ways to open and close the gripper.
   While the drone is on a bench and the propellers are removed:
   
   - Run the `payload_deliverer` test in the QGC [MAVLink Shell](../debug/mavlink_shell.md):

     ```
     > payload_deliverer gripper_test
     ```

     :::note
     If you get an error message like "[payload_deliverer] not running", repeat the setup procedures above.
     You might also run the `payload_deliverer start` command in the Nuttx shell.
     :::

   - Use the [Joystick](#qgc-joystick-configuration) to trigger gripper open and close actions.

1. Set [PD_GRIPPER_TO](../advanced_config/parameter_reference.md#PD_GRIPPER_TO) to whichever of the gripper open and close time is larger.


### Mission Delivery Timeout

When running a [Payload Delivery Mission](../flying/package_delivery_mission.md) it is important that the mission is not halted in the case where the gripper does not report that it has opened (or closed).
This might happen if a gripper feedback sensor was damaged or UORB dropped the gripper actuator timout message.

:::note
Gripper state feedback from a sensor is not actually supported yet, but it may be in future.
:::

The mission-delivery timout provides an additional safeguard, continuing the mission if the gripper's successful actuation acknowledgement is not received.

To set the timeout:

1. Set [MIS_PD_TO](../advanced_config/parameter_reference.md#MIS_PD_TO) to a value greater than the [gripper actuation timeout](#gripper-actuation-timeout).