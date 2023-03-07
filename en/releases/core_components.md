# PX4 Core Components

These core components are *guaranteed* to work with a stable point release of PX4. They form the foundation of the PX4-Autopilot and it's core functionality.

## Core component criteria

Each core component must have:
- Maintainer
- Tester

## PX4 Core Components List

| Core component (category) | Sub component | Maintainer | Tester |
|---|---|---|---|
| uORB (Architecture) |  |  |  |
| Parameters (Architecture) |  |  |  |
| Realtime Clock (Architecture) |  |  |  |
| Work queue (Architecture) |  |  |  |
| GNSS (State Estimation) | Velocity / Position |  |  |
|  | Heading |  |  |
| Optical flow (State Estimation) |  |  |  |
| External vision (State Estimation) |  |  |  |
| Boards (NuttX) | Pixhawk standard |  |  |
| IMU (Driver) |  |  |  |
| Distance Sensor (Driver) |  |  |  |
| Failure Injection (Driver) |  |  |  |
| Documentation |  |  |  |
| Battery (Library) |  |  |  |
| Flight Task (Library) |  |  |  |
| Matrix (Library) |  |  |  |
| Autotuning (Library) |  |  |  |
| Github Actions (CI Infrastructure) |  |  |  |
| Jenkins (CI Infrastructure) |  |  |  |
| Linux (Toolchain) |  |  |  |
| Mac OS (Toolchain) |  |  |  |
| Windows (Toolchain) | WSL2 |  |  |
| ROS2 |  |  |  |
| Gazebo Classic (Simulation) |  |  |  |
| Gazebo (Simulation) |  |  |  |
| Flightgear (Simulation) |  |  |  |
| JSBSim (Simulation) |  |  |  |
| jMAVSim (Simulation) |  |  |  |
| SIH (Simulation) |  |  |  |
| Multivehicle Simulation |  |  |  |
| MAVLink | | | |

### Vehicle types
| Core component | Sub component | Maintainer | Tester |
| Multirotor | Acro mode |  |  |
|  | Stabilized mode |  |  |
|  |  |  |  |
| Fixed wing |  |  |  |
| VTOL |  |  |  |
| Boat |  |  |  |
| Rover |  |  |  |