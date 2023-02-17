# Integrated Flight Controller/Companion Computer

Controller boards that come with a _pre-integrated_ [companion/mission computer](../companion_computer/README.md) and [flight controller](../flight_controller/README.md) are recommended for supporting computationally expensive features, such as [object avoidance](../computer_vision/obstacle_avoidance.md) and [collision prevention](../computer_vision/collision_prevention.md).

If you need a companion computer, then using a pre-integrated board is likely to significantly reduce your costs.

## Supported Boards

The following boards are known to provide a good integration with PX4:

- [Holybro Pixhawk RPI CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md) - Baseboard with plugin Raspberry Pi and [Pixhawk Autopilot Bus](../flight_controller/pixhawk_autopilot_bus.md) compatible flight controllers.

## Software Setup

The companion computer and flight controller must be set up to communicate with each other (typically using MAVLink and ROS2, over Ethernet or a serial port), and may also be set up to communicate with ground controllers, cloud and other systems.

The setup depends on the companion computer and its operating system, and how the companion and flight controller are connected.
Setup information for common configurations is provided in [Companion computers](../companion_computer/README.md).

## Further Information

- [Companion computer](../companion_computer/README.md): General companion/flight controller hardware and software setup.
