# Multi-Vehicle Simulation with Ignition Gazebo

This topic explains how to simulate multiple UAV vehicles using Ignition Gazebo and SITL (Linux only).

Ignition Gazebo allows an easier and more flexible connection with PX4 compared to other simulators which unfolds in a simpler procedure to setup multi-vehicle scenarios.
Once that the SITL code has been build with
```sh
make px4_sitl
```
it can be run and linked to Ignition with the right combination of environment variables and arguments:

```
ARGS ./build/px4_sitl_default/bin/px4 [-i <instance>]
```
- `<instance>`: The instance number of the vehicle, each vehicle must have a unique instance number.
If not given, it defaults to zero.
When used with `PX4_GZ_MODEL` then Ignition Gazebo will automatically pick an unique model name in the form `${PX4_GZ_MODEL}_instance`. 
- `ARGS`: The same environmental variables list described in [Ingnition Gazebo Simulation](ignition_gazebo.md#advanced-usages).