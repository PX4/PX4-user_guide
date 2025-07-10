---
canonicalUrl: https://docs.px4.io/main/ko/simulation/multi-vehicle-simulation
---

# Multi-Vehicle Simulation with Gazebo

This topic explains how to simulate multiple UAV vehicles using Gazebo and SITL (Linux only).
- **Tip** If you don't need a feature provided by Gazebo or ROS, [Multi-Vehicle Simulation with JMAVSim](../simulation/multi_vehicle_jmavsim.md) is easier to set up.
- [MAVROS package](../simulation/multi_vehicle_flightgear.md)
- [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md)

For each simulated vehicle, the following is required:
- FlightGear is the most accurate simulator, and as a result the most heavy weight. It might be used if you need a great simulation but not too many vehicles at a time. It can also be used if different types of vehicles need to be simulated at the same time.
- Gazebo is less accurate and less heavy-weight and supports many features and vehicles that aren't available for FlightGear. It can only simulate a single type of vehicle at a time, but it can simulate many more vehicles at a time than FlightGear.
- JMAVSim is a very light-weight simulator that supports only quadcopters. It is recommended if you need to support a lot of quadcopters, and the simulation only needs to be approximate.
