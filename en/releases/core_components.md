# PX4 Core Components

These core components define the core functionality of PX4-Autopilot. Thus whether they are functioning correctly is being constantly monitored by the Maintainers, as well as in Continuous Integration tests. These components are the first priority that should work in a stable point releases.

## Core component criteria

Each core component must have:
- Maintainer
- Tester

## PX4 Core Components List

For many of the core components that has a corresponding label in Github, you can click on them to view the relevant Issue/PRs.

| Core component (category) | Sub component | Maintainer |
|---|---|---|
| [uORB (Architecture)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3AUorb+) |  |  |
| [Parameter (Architecture)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3AParameter+) |  |  |
| Realtime Clock (Architecture) |  |  |
| Work queue (Architecture) |  |  |
| GNSS (State Estimation) | Velocity / Position |  |  |
|  | Heading |  |
| [Optical flow (State Estimation)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Optical+flow+%F0%9F%91%81%EF%B8%8F%E2%80%8D%F0%9F%97%A8%EF%B8%8F%22) |  |  |
| [Vision](https://github.com/PX4/PX4-Autopilot/issues?q=label%3Avision) (State Estimation) |  |  |
| [Boards (NuttX)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Boards+%28flight+controller%29+%F0%9F%8D%AB%22+) | [Pixhawk standard](https://github.com/PX4/PX4-Autopilot/issues?q=label%3Apixhawk) |  |
| IMU (Driver) |  |  |
| Distance Sensor (Driver) |  |  |
| Failure Injection (?) |  |  |
| RTK GPS (Driver) | Heading estimate from dual RTK GPS | [Alex Klimaj](https://github.com/AlexKlimaj) |  |
| [Documentation](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Documentation+%F0%9F%93%91%22) |  |  |
| Battery (Library) |  |  |
| Flight Task (Library) |  |  |
| Matrix (Library) |  |  |
| Autotuning (Library) |  |  |
| [Github Actions (Continuous Integration)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22CI+%F0%9F%A4%96%22) |  |  |
| [Jenkins (Continuous Integration)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3Ajenkins-ci) |  |  |
| Linux (Toolchain) |  |  |
| Mac OS (Toolchain) |  |  |
| [Windows (Toolchain)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3Awindows) | WSL2 |  |  |
| [ROS2](https://github.com/PX4/PX4-Autopilot/issues?q=label%3AROS2) |  |  |
| [Gazebo Classic (Simulation)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22gazebo+classic%22) |  |  |
| [Gazebo (Simulation)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3Agazebo) |  |  |
| Flightgear (Simulation) |  |  |
| JSBSim (Simulation) |  |  |
| jMAVSim (Simulation) |  |  |
| SIH (Simulation) |  |  |
| Multivehicle Simulation |  |  |
| [MAVLink (Communication)](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Communication+%28MAVLink%29+%F0%9F%93%A1%22) | | |

### Vehicle types

| Core component | Sub component | Maintainer |
|---|---|---|
| [Multirotor](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Multirotor+%F0%9F%9B%B8%22) | Acro mode |  |
|  | Stabilized mode |  |
|  |  |
| [Fixed wing](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Fixed+Wing+%F0%9F%9B%A9%EF%B8%8F%22) |  |
| [Hybrid VTOL](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Hybrid+VTOL+%F0%9F%9B%A9%EF%B8%8F%F0%9F%9A%81%22) |  |
|  | Altitude mode in hover |
|  | Position mode in hover |
|  | Auto mode in hover |  |
|  | Quad-chute |  |
|  | Pull/Tilter assist for forward acceleration in hover |  |
|  | Weather vane (automatically aligning vehicle heading into wind) |  |
| [Boat](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Boat+%F0%9F%9A%A4%22) |  |  |
| [Rover](https://github.com/PX4/PX4-Autopilot/issues?q=label%3A%22Rover+%F0%9F%9A%99%22) |  |  |