# Ignition Gazebo Simulation

:::warning
Ignition Gazebo supports a single frame (X500 quadcopter) and world (October 2022).
:::

[Ignition Gazebo](https://gazebosim.org/home) is an open source robotics simulator from the _Ignition Robotics Project_.
It is derived from the popular robotics simulator [Gazebo](./gazebo.md), featuring more advanced rendering, physics and sensor models.

**Supported Vehicles:** Quadrotor

@[youtube](https://youtu.be/eRzdGD2vgkU)

:::note
See [Simulation](../simulation/README.md) for general information about simulators, the simulation environment, and simulation configuration (e.g. supported vehicles).
:::

## Installation (Ubuntu Linux)

:::note
These instructions were tested on Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04
:::

1. Install the usual [Development Environment on Ubuntu LTS / Debian Linux](../dev_setup/dev_env_linux_ubuntu.md).
1. Install Ignition Gazebo (`sudo` may be required):

   ```sh
   sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'
   wget http://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add -
   apt update
   apt install ignition-fortress
   ```

## Running the Simulation

Ignition Gazebo SITL simulation can be conveniently run through a `make` command as shown below:

```bash
cd /path/to/PX4-Autopilot
make px4_sitl gz_x500
```
This will run both the PX4 SITL instance and the ignition gazebo client

The supported vehicles and `make` commands are listed below (click on the links to see the vehicle images).

Vehicle | Command
--- | ---
quadrotor(x500) | `make px4_sitl gz_x500`

The commands above launch a single vehicle with the full UI.
*QGroundControl* should be able to automatically connect to the simulated vehicle.

In order to run the simulation without running the ignition gazebo gui, one can use the `HEADLESS=1` flag:

```bash
HEADLESS=1 make px4_sitl gz_x500
```

## Usage/Configuration Options

The startup pipeline allows for highly flexible configuration.
In particular, it is possible to:

- Start a new Ignition simulation with an arbitrary world or attach to an already running simulation.
- Add a new vehicle to Ignition or link a new PX4 instance to an existing one.

These scenarios are managed by setting the appropriate environment variables.

### Syntax

The startup syntax takes the form:

```bash
ARGS ./build/px4_sitl_default/bin/px4
```

where `ARGS` is a list of environment variables including:

- `PX4_SYS_AUTOSTART` (**Mandatory**):
  Sets the [airframe autostart id](../dev_airframes/adding_a_new_frame.md) of the PX4 airframe to start.
  - Only `4001` (x500 quadcopter) is currently supported.

- `PX4_GZ_MODEL_NAME`:
  Sets the name of an _existing_ model in the gazebo simulation.
  If provided, the startup script tries to bind a new PX4 instance to the Ignition resource matching exactly that name.
  - The setting is mutually exclusive with `PX4_GZ_MODEL`.

- `PX4_GZ_MODEL`:
  Sets the name of a new Ignition model to be spawned in the simulator.
  If provided, the startup script looks for a model in the Ignition resource path that matches the given variable, spawns it and binds a new PX4 instance to it.
  - The setting is mutually exclusive with `PX4_GZ_MODEL_NAME`.

  :::note
  If both `PX4_GZ_MODEL_NAME` and `PX4_GZ_MODEL` are not given, then PX4 looks for `PX4_SIM_MODEL` and uses it as an alias for `PX4_GZ_MODEL`.
  However, this prevents the use of `PX4_GZ_MODEL_POSE`.
  :::

- `PX4_GZ_MODEL_POSE`:
  Sets the spawning position and orientation of the model when `PX4_GZ_MODEL` is adopted.
  If provided, the startup script spawns the model at a pose following the syntax `"x,y,z,roll,pitch,yaw"`, where the positions are given in metres and the angles are in radians.
  - If omitted, the zero pose `[0,0,0,0,0,0]` is used.
  - If less then 6 values are provided, the missing ones are fixed to zero.
  - This can only be used with `PX4_GZ_MODEL` (not `PX4_GZ_MODEL_NAME`).

- `PX4_GZ_WORLD`:
  Sets the Ignition world file for a new simulation.
  If it is not given, then [default](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/simulation/gz/worlds/default.sdf) is used.
  - This variable is ignored if an existing simulation is already running.
  - This value should be [specified for the selected airframe](#adding-new-worlds-and-models) but may be overridden using this argument.

- `PX4_SIMULATOR=GZ`:
  Sets the simulator, which for Ignition Gazebo must be `gz`.
  - This value should be [set for the selected airframe](#adding-new-worlds-and-models), in which case it does not need to be set as an argument.

The PX4 Ignition worlds and and models databases [can be found on Github here](https://github.com/PX4/PX4-Autopilot/tree/main/Tools/simulation/gz).
They are added to the Ignition search `PATH` by [gazebo_env.sh.in](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/simulation/gz_bridge/gazebo_env.sh.in) during the simulation startup phase.

:::note
`gazebo_env.sh.in` is compiled and made available in `$PX4_DIR/build/px4_sitl/rootfs/gazebo_env.sh`
:::

### Examples

Here are some examples of the different scenarios covered above.

1. **Start simulator + default world + spawn vehicle at default pose**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL=x500 ./build/px4_sitl_default/bin/px4
   ```

2. **Start simulator + default world + spawn vehicle at custom pose (y=2m)**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_POSE="0,2" PX4_GZ_MODEL=x500 ./build/px4_sitl_default/bin/px4
   ```

3. **Start simulator + default world + link to existing vehicle**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_NAME=x500 ./build/px4_sitl_default/bin/px4
   ```

## Adding New worlds and Models

New worlds files can simply be copied into the PX4 Ignition [world directory](https://github.com/PX4/PX4-Autopilot/tree/main/Tools/simulation/gz/worlds).

To add a new model:

1. Add an **sdf** file in the PX4 Ignition [model directory](https://github.com/PX4/PX4-Autopilot/tree/main/Tools/simulation/gz/models).
1. Define an [airframe configuration file](../dev_airframes/adding_a_new_frame.md).
1. Define the Ignition default parameters in the airframe configuration file (this example is from [x500 quadcopter](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/4001_x500)):

   ```
   PX4_SIMULATOR=${PX4_SIMULATOR:=gz}
   PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}
   PX4_SIM_MODEL=${PX4_SIM_MODEL:=<your model name>}
   ```
   - `PX4_SIMULATOR=${PX4_SIMULATOR:=gz}` sets the default simulator (Ignition Gazebo) for that specific airframe.

   - `PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}` sets the [default world](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/simulation/gz/worlds/default.sdf) for that specific airframe.

   - Setting the default value of `PX4_SIM_MODEL` lets you start the simulation with just
     ```bash
     PX4_SYS_AUTOSTART=<your new airframe id> ./build/px4_sitl_default/bin/px4
     ```

:::note
As long as the world file and the model file are in the Ignition search path `IGN_GAZEBO_RESOURCE_PATH` it is not necessary to add them to the PX4 world and model directories.
However, `make px4_sitl gz_<model>_<world>` won't work with them.
:::

## Multi-Vehicle Simulation

Multi-Vehicle simulation is supported on Linux hosts.

For more information see: [Multi-Vehicle Sim with Ignition Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md)


## Further Information

- [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
