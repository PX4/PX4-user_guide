---
canonicalUrl: https://docs.px4.io/main/tr/dev_setup/dev_env
---

# Setting up a Developer Environment (Toolchain)

The *supported platforms* for PX4 development are:
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md) (Recommended)
- [Mac OS](../dev_setup/dev_env_mac.md)
- [Windows 10](../dev_setup/dev_env_windows_cygwin.md)


## Supported Targets

The table below shows what PX4 targets you can build on each OS.

| Target                                                                                                                                                                                                    | Linux (Ubuntu) |   Mac   | Windows |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **NuttX based hardware:** [Pixhawk Series](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles/crazyflie2.md), [Intel® Aero Ready to Fly Drone](../complete_vehicles/intel_aero.md) |    &check;     | &check; | &check; |
| **Linux-based hardware:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                                                                                 |    &check;     |         |         |
| **Simulation:** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                  |    &check;     | &check; | &check; |
| **Simulation:** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                    |    &check;     | &check; |         |
| **Simulation:** [ROS with Gazebo](../simulation/ros_interface.md)                                                                                                                                         |    &check;     |         |         |

Experienced Docker users can also build with the containers used by our continuous integration system: [Docker Containers](../test_and_ci/docker.md)

## Next steps

Once you have finished setting up one of the command-line toolchains above:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
- Continue to [Building PX4 Software](../dev_setup/building_px4.md).
