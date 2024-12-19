# PX4 Core Components

These "core components" define the core functionality of PX4-Autopilot.

They are tested in continuous integration tests and are regularly monitored and tested by their maintainers.
Core components are the first priority in stable point releases.

## Core component criteria

Each core component must have:

- Maintainer
- Tester

## PX4 Core Components List

For many of the core components that has a corresponding label in Github, you can click on them to view the relevant Issue/PRs.

| Core component (category)                                                          | Sub component                        | Maintainer                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------ |
| [uORB (Architecture)][uORB (Architecture)]                                         |                                      |                                                  |
| [Parameter (Architecture)][Parameter (Architecture)]                               |                                      |                                                  |
| Realtime Clock (Architecture)                                                      |                                      |                                                  |
| Work queue (Architecture)                                                          |                                      |                                                  |
| GNSS (State Estimation)                                                            | Velocity / Position                  |                                                  |
|                                                                                    | Heading                              |                                                  |
| [Optical flow (State Estimation)][Optical flow (State Estimation)]                 |                                      |                                                  |
| [Vision][Vision] (State Estimation)                                                |                                      |                                                  |
| [Boards (NuttX)][Boards (NuttX)]                                                   | [Pixhawk standard][Pixhawk standard] |                                                  |
| IMU (Driver)                                                                       |                                      |                                                  |
| Distance Sensor (Driver)                                                           |                                      |                                                  |
| Failure Injection (?)                                                              |                                      |                                                  |
| RTK GPS (Driver)                                                                   | Heading estimate from dual RTK GPS   | [Alex Klimaj](https://github.com/AlexKlimaj)     |
| [Documentation][Documentation]                                                     | PX4, MAVLink, QGC, MAVSDK            | [Hamish Willee](https://github.com/hamishwillee) |
| Battery (Library)                                                                  |                                      |                                                  |
| Flight Task (Library)                                                              |                                      |                                                  |
| Matrix (Library)                                                                   |                                      |                                                  |
| Autotuning (Library)                                                               |                                      |                                                  |
| [Github Actions (Continuous Integration)][Github Actions (Continuous Integration)] |                                      |                                                  |
| [Jenkins (Continuous Integration)][Jenkins (Continuous Integration)]               |                                      |                                                  |
| Linux (Toolchain)                                                                  |                                      |                                                  |
| Mac OS (Toolchain)                                                                 |                                      |                                                  |
| [Windows (Toolchain)][Windows (Toolchain)]                                         | WSL2                                 |                                                  |
| [ROS2][ROS2]                                                                       |                                      |                                                  |
| [Gazebo Classic (Simulation)][Gazebo Classic (Simulation)]                         |                                      |                                                  |
| [Gazebo (Simulation)][Gazebo (Simulation)]                                         |                                      |                                                  |
| Flightgear (Simulation)                                                            |                                      |                                                  |
| JSBSim (Simulation)                                                                |                                      |                                                  |
| jMAVSim (Simulation)                                                               |                                      |                                                  |
| SIH (Simulation)                                                                   |                                      |                                                  |
| Multivehicle Simulation                                                            |                                      |                                                  |
| [MAVLink (Communication)][MAVLink (Communication)]                                 |                                      |                                                  |

[uORB (Architecture)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3AUorb+
[Parameter (Architecture)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3AParameter+
[Documentation]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Documentation+%F0%9F%93%91%22
[Optical flow (State Estimation)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Optical+flow+%F0%9F%91%81%EF%B8%8F%E2%80%8D%F0%9F%97%A8%EF%B8%8F%22
[Vision]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3Avision
[Boards (NuttX)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Boards+%28flight+controller%29+%F0%9F%8D%AB%22+
[Pixhawk standard]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3Apixhawk
[MAVLink (Communication)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Communication+%28MAVLink%29+%F0%9F%93%A1%22
[Github Actions (Continuous Integration)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22CI+%F0%9F%A4%96%22
[Jenkins (Continuous Integration)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3Ajenkins-ci
[Windows (Toolchain)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3Awindows
[ROS2]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3AROS2
[Gazebo Classic (Simulation)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22gazebo+classic%22
[Gazebo (Simulation)]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3Agazebo

### Vehicle types

| Core component             | Sub component                                                   | Maintainer |
| -------------------------- | --------------------------------------------------------------- | ---------- |
| [Multirotor][Multirotor]   | Acro mode                                                       |            |
|                            | Stabilized mode                                                 |            |
|                            |                                                                 |
| [Fixed wing][Fixed wing]   |                                                                 |
| [Hybrid VTOL][Hybrid VTOL] |                                                                 |
|                            | Altitude mode in hover                                          |
|                            | Position mode in hover                                          |
|                            | Auto mode in hover                                              |            |
|                            | Quad-chute                                                      |            |
|                            | Pull/Tilter assist for forward acceleration in hover            |            |
|                            | Weather vane (automatically aligning vehicle heading into wind) |            |
| [Boat][Boat]               |                                                                 |            |
| [Rover][Rover]             | Ackermann, Differential                                         |            |

[Multirotor]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Multirotor+%F0%9F%9B%B8%22
[Fixed wing]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Fixed+Wing+%F0%9F%9B%A9%EF%B8%8F%22
[Hybrid VTOL]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Hybrid+VTOL+%F0%9F%9B%A9%EF%B8%8F%F0%9F%9A%81%22
[Boat]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Boat+%F0%9F%9A%A4%22
[Rover]: https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Rover+%F0%9F%9A%99%22
