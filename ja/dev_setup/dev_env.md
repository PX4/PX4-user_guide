# Setting up a Developer Environment (Toolchain)

PX4 code can be developed on [Linux](../dev_setup/dev_env_linux.md), [Mac OS](../dev_setup/dev_env_mac.md), or [Windows](../dev_setup/dev_env_windows.md). We recommend [Ubuntu Linux LTS edition](https://wiki.ubuntu.com/LTS) as this enables building [all PX4 targets](#supported-targets), and using most [simulators](../simulation/README.md) and [ROS](../ros/README.md).

## Supported Targets

The table below show what PX targets you can build on each OS.

| Target                                                                                                                                                                                                    | Linux (Ubuntu) | Mac | Windows |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:---:|:-------:|
| **NuttX based hardware:** [Pixhawk Series](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles/crazyflie2.md), [Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md) |       X        |  X  |    X    |
| [Qualcomm Snapdragon Flight hardware](../flight_controller/snapdragon_flight.md)                                                                                                                          |       X        |     |         |
| **Linux-based hardware:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                                                                                 |       X        |     |         |
| **Simulation:** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                  |       X        |  X  |    X    |
| **Simulation:** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                    |       X        |  X  |         |
| **Simulation:** [ROS with Gazebo](../simulation/ros_interface.md)                                                                                                                                         |       X        |     |         |


## Development Environment

The installation of the development environment is covered below:

  * [Mac OS](../dev_setup/dev_env_mac.md)
  * [Linux](../dev_setup/dev_env_linux.md)
  * [Windows](../dev_setup/dev_env_windows.md)

If you're familiar with Docker you can also use one of the prepared containers: [Docker Containers](../test_and_ci/docker.md)
