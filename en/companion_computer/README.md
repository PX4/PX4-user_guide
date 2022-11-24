# Companion Computers

Companion computers ("mission computers"), are separate on-vehicle computers that enable computationally expensive features like [object avoidance](../computer_vision/obstacle_avoidance.md) and [collision prevention](../computer_vision/collision_prevention.md).

The diagram below shows a possible architecture for an unmanned vehicle architecture that includes a flight controller and companion computer.

![PX4 architecture - FC + Companion Computer](../../assets/diagrams/px4_companion_computer_simple.svg)

<!-- source for drawing: https://docs.google.com/drawings/d/1ZDSyj5djKCEbabgx8K4ESdTeEUizgEt8spUWrMGbHUE/edit?usp=sharing -->

The flight controller runs PX4 on NuttX, and provides core flight and safety code.
The companion computer usually runs Linux, as this is a much better platform for "general" software development.
They are connected using a fast serial or Ethernet link, and typically communicate using the [MAVLink protocol](https://mavlink.io/en/) or microROS/microDDS.

Communications with the ground stations and the cloud are usually routed via the companion computer (e.g. using the [MAVLink Router](https://github.com/mavlink-router/mavlink-router)).


## Supported Hardware

PX4 can be used with computers that can be configured to communicate via MAVLink or microROS/microDDS over over a serial port (or Ethernet port, if present).

A small subset of possible alternatives are listed below:

- Raspberry Pi, 
- Odroid
- Tegra K1

:::note
The choice of computer will depend on the usual tradeoffs: cost, weight, power consumption, ease of setup, and computational resources required.
:::

## Companion Computer Software

The companion computer needs to run software that communicates with the flight controller, and which routes traffic to ground stations and the cloud.

Common options are:

- [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) - libraries in various programming languages to interface with MAVLink systems such as drones, cameras or ground systems.
- [ROS2](../ros/ros2.md) to communicate to ROS2 nodes ([ROS (1) and MAVROS](../ros/mavros_installation.md) may also be used).
- [MAVLink Router](https://github.com/intel/mavlink-router) (recommended) to route MAVLink between serial and UDP.
  [MAVProxy](https://ardupilot.org/mavproxy/) can also be used.
- [C/C++ example code](https://github.com/mavlink/c_uart_interface_example) shows how to connect custom code


## Ethernet Setup

Ethernet is the recommended connection, if supported by your flight controller.
See [Ethernet Setup](../advanced_config/ethernet_setup.md) for instructions.

## Flight Controller Specific Setup

The following topics explain how to set up companion computers for specific flight controllers, in particular when you are not using an Ethernet connection.

- [Using a Companion Computer with Pixhawk Controllers](../companion_computer/pixhawk_companion.md)


## Additional Information

- [Companion Computer Peripherals](../companion_computer/companion_computer_peripherals.md)
- [PX4 System Architecture > FC and Companion Computer](../concept/px4_systems_architecture.html#fc-and-companion-computer)

