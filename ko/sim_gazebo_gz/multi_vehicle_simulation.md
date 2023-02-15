# Multi-Vehicle Simulation with Ignition Gazebo

This topic explains how to simulate multiple UAV vehicles using [Ignition Gazebo](../sim_gazebo_gz/README.md) and SITL.

:::note
Multi-Vehicle Simulation with Ignition Gazebo is only supported on Linux.
:::

Ignition Gazebo makes it very easy to setup multi-vehicle scenarios (compared to other simulators).

First build PX4 SITL code using:

```sh
make px4_sitl
```

Each instance of PX4 can then be launched in its own terminal, specifying a unique instance number and its desired combination of [environment variables](../sim_gazebo_gz/README.md#usage-configuration-options):

```sh
ARGS ./build/px4_sitl_default/bin/px4 [-i <instance>]
```

- `<instance>`: The instance number of the vehicle.
  - Each vehicle must have a unique instance number. If not given, the instance number defaults to zero.
  - When used with `PX4_GZ_MODEL`, Ignition Gazebo will automatically pick a unique model name in the form `${PX4_GZ_MODEL}_instance`.
- `ARGS`: A list of environmental variables, as described in [Ingnition Gazebo Simulation > Usage/Configuration Options](../sim_gazebo_gz/README.md#usage-configuration-options).
