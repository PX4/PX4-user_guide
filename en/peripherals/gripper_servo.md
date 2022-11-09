# Servo Gripper with PWM

This section describes how to connect and configure a Servo type Gripper with PWM input.

![High-load gripper example](../../assets/hardware/grippers/highload_gripper_example.jpg)

Above is a typical example of a Servo Gripper.

## Connecting a PWM-controlled Gripper

The PWM cable comprises of three lines: Power, Ground and Signal. A typical connector is shown in the image below:

![PWM Cable](../../assets/hardware/grippers/pwm_cable.png)

In the image above the wire colors have the following meanings:

Wire color | Purpose
---     | ---
Brown   | Ground
Red     | Power
Yellow  | PWM Signal

You would need to connect them into a PWM input of the Flight controller appropriately.

### Compatibility Checks

Before connecting the cable, double-check the following requirements:

* **Signal line voltage level**: Check the data-sheet of your gripper mechanism to find the voltage level of the signal line. And make sure this is compatible with the voltage level of the pins of your Flight Controller.
* **Power requirements of gripper**: Check the mechanism's data-sheet to find out the power line voltage level requirements. Depending on that, the gripper can be either connected directly to the [power module](../power_module/README.md) or connected to a 5V line.Alternatively a custom voltage regulator can be used to output any other voltage required.

## Setting up the Gripper

For detailed instruction on further setup instructions, refer to the [Gripper](gripper.md#gripper-actuator-mapping) documentation.