---
canonicalUrl: https://docs.px4.io/main/zh/simulation/multi-vehicle-simulation
---

# 基于gazebo的多飞行器仿真

本主题介绍如何使用 gazebo 和 sitl (仅限 linux) 模拟多架无人机/车辆。
- **注意**如果您不需要 gazebo 或 ros 提供的功能， [ jmavsim的 Multi-车辆仿真](../simulation/multi_vehicle_jmavsim.md)更容易设置。
- [MAVROS 包](../simulation/multi_vehicle_flightgear.md)
- [使用 JMAVSim 进行多飞行器仿真](../simulation/multi_vehicle_jmavsim.md)

The choice of the simulator depends on the vehicle to be simulated, how "good" the simulation needs to be (and for what features), and how many vehicles need to be simulated at a time:
- FlightGear is the most accurate simulator, and as a result the most heavy weight. It might be used if you need a great simulation but not too many vehicles at a time. It can also be used if different types of vehicles need to be simulated at the same time.
- Gazebo is less accurate and less heavy-weight and supports many features and vehicles that aren't available for FlightGear. It can only simulate a single type of vehicle at a time, but it can simulate many more vehicles at a time than FlightGear.
- JMAVSim is a very light-weight simulator that supports only quadcopters. It is recommended if you need to support a lot of quadcopters, and the simulation only needs to be approximate.
