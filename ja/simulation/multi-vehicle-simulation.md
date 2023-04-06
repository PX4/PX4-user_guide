# Multi-Vehicle Simulation

PX4 supports multi-vehicle simulation using the following simulators:
- [Multi-Vehicle Sim with Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md)
- [Multi-Vehicle Sim with Gazebo Classic](../sim_gazebo_classic/multi_vehicle_simulation_gazebo.md) (both with and without ROS)
- [Multi-Vehicle Sim with FlightGear](../simulation/multi_vehicle_flightgear.md)
- [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md)

The choice of the simulator depends on the vehicle to be simulated, how "good" the simulation needs to be (and for what features), and how many vehicles need to be simulated at a time:

- FlightGear is the most accurate simulator, and as a result the most heavy weight. It might be used if you need a great simulation but not too many vehicles at a time. It can also be used if different types of vehicles need to be simulated at the same time.
- [Gazebo](../sim_gazebo_gz/README.md) is less accurate and less heavy-weight and supports many features that aren't available for FlightGear. It supports multiple vehicles simultaneously but, at the time of writing, only one frame (X500 quadcopter) is implemented in PX4. Note, this is the successor of [Gazebo Classic](../sim_gazebo_classic/README.md) (below).
- [Gazebo Classic](../sim_gazebo_classic/README.md) is less accurate and less heavy-weight and supports many features and vehicles that aren't available for FlightGear. It can only simulate a single type of vehicle at a time, but it can simulate many more vehicles at a time than FlightGear. It can only be used with Ubuntu 20.04 and earlier.
- JMAVSim is a very light-weight simulator that supports only quadcopters. It is recommended if you need to support a lot of quadcopters, and the simulation only needs to be approximate.
