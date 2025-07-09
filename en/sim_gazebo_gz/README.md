---
canonicalUrl: https://docs.px4.io/main/en/sim_gazebo_gz/README
---

# Gazebo Simulation

:::warning
Gazebo was previously known as "Gazebo Ignition" (while _Gazebo Classic_ was previously known as Gazebo).
See the [official blog post](https://www.openrobotics.org/blog/2022/4/6/a-new-era-for-gazebo) for more information.
:::

[Gazebo](https://gazebosim.org/home) is an open source robotics simulator.
It supersedes the older [Gazebo Classic](../sim_gazebo_classic/README.md) simulator, and is the only supported version of Gazebo for Ubuntu 22.04 and onwards.

**Supported Vehicles:** Quadrotor, Plane, VTOL

@[youtube](https://youtu.be/eRzdGD2vgkU)

:::note
See [Simulation](../simulation/README.md) for general information about simulators, the simulation environment, and simulation configuration (e.g. supported vehicles).
:::

## Installation (Ubuntu Linux)

Gazebo is installed by default on Ubuntu 22.04 as part of the development environment setup: [Ubuntu Dev Environment Setup > Simulation and NuttX (Pixhawk) Targets](../dev_setup/dev_env_linux_ubuntu.md#simulation-and-nuttx-pixhawk-targets)

If you want to use Gazebo on Ubuntu 20.04 you can install it manually after following the normal setup process (installing `gz-garden` will uninstall Gazebo-Classic!):

```sh
sudo wget https://packages.osrfoundation.org/gazebo.gpg -O /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null
sudo apt-get update
sudo apt-get install gz-garden
```

## Running the Simulation

Gazebo SITL simulation can be conveniently run through a `make` command as shown below:

```bash
cd /path/to/PX4-Autopilot
make px4_sitl gz_x500
```
This will run both the PX4 SITL instance and the Gazebo client.
Note that all gazebo make targets have the prefix `gz_`.

:::note
If `make px4_sitl gz_x500` gives the error `ninja: error: unknown target 'gz_x500'` then run `make distclean` to start from a clean slate, and try running `make px4_sitl gz_x500` again.
:::

The supported vehicles and `make` commands are listed below.

Vehicle | Command | `PX4_SYS_AUTOSTART`
--- | --- | ---
[Quadrotor(x500)](./gazebo_vehicles.md#x500-quadrotor) | `make px4_sitl gz_x500` | 4001
[Quadrotor(x500) with Depth Camera](./gazebo_vehicles.md#x500-quadrotor-with-depth-camera) | `make px4_sitl gz_x500_depth` | 4002
[Quadrotor(x500) with Vision Odometry](./gazebo_vehicles.md#x500-quadrotor-with-visual-odometry) | `make px4_sitl gz_x500_vision` | 4005
[VTOL](./gazebo_vehicles.md#standard-vtol) | `make px4_sitl gz_standard_vtol` | 4004
[Plane](./gazebo_vehicles.md#rc-cessna) | `make px4_sitl gz_rc_cessna` | 4003

The commands above launch a single vehicle with the full UI.
*QGroundControl* should be able to automatically connect to the simulated vehicle.

In order to run the simulation without running the Gazebo gui, use the `HEADLESS=1` flag:

```bash
HEADLESS=1 make px4_sitl gz_x500
```

## Usage/Configuration Options

The startup pipeline allows for highly flexible configuration.
In particular, it is possible to:

- Start a new simulation with an arbitrary world or attach to an already running simulation.
- Add a new vehicle to the simulation or link a new PX4 instance to an existing one.

These scenarios are managed by setting the appropriate environment variables.

### Syntax

The startup syntax takes the form:

```bash
ARGS ./build/px4_sitl_default/bin/px4
```

where `ARGS` is a list of environment variables including:

- `PX4_SYS_AUTOSTART` (**Mandatory**):
  Sets the [airframe autostart id](../dev_airframes/adding_a_new_frame.md) of the PX4 airframe to start.

- `PX4_GZ_MODEL_NAME`:
  Sets the name of an _existing_ model in the gazebo simulation.
  If provided, the startup script tries to bind a new PX4 instance to the Gazebo resource matching exactly that name.
  - The setting is mutually exclusive with `PX4_GZ_MODEL`.

- `PX4_GZ_MODEL`:
  Sets the name of a new Gazebo model to be spawned in the simulator.
  If provided, the startup script looks for a model in the Gazebo resource path that matches the given variable, spawns it and binds a new PX4 instance to it.
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
  Sets the Gazebo world file for a new simulation.
  If it is not given, then [default](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/simulation/gz/worlds/default.sdf) is used.
  - This variable is ignored if an existing simulation is already running.
  - This value should be [specified for the selected airframe](#adding-new-worlds-and-models) but may be overridden using this argument.

- `PX4_SIMULATOR=GZ`:
  Sets the simulator, which for Gz must be `gz`.
  - This value should be [set for the selected airframe](#adding-new-worlds-and-models), in which case it does not need to be set as an argument.

The PX4 Gazebo worlds and and models databases [can be found on Github here](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/Tools/simulation/gz).
They are added to the Gazebo search `PATH` by [gz_env.sh.in](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/simulation/gz_bridge/gz_env.sh.in) during the simulation startup phase.

:::note
`gz_env.sh.in` is compiled and made available in `$PX4_DIR/build/px4_sitl_default/rootfs/gz_env.sh`
:::

### Examples

Here are some examples of the different scenarios covered above.

1. **Start simulator + default world + spawn vehicle at default pose**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

2. **Start simulator + default world + spawn vehicle at custom pose (y=2m)**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_POSE="0,2" PX4_GZ_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

3. **Start simulator + default world + link to existing vehicle**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_NAME=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

## Adding New Worlds and Models

New worlds files can simply be copied into the PX4 Gazebo [world directory](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/Tools/simulation/gz/worlds).

To add a new model:

1. Add an **sdf** file in the PX4 Gazebo [model directory](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/Tools/simulation/gz/models).
1. Define an [airframe configuration file](../dev_airframes/adding_a_new_frame.md).
1. Define the default parameters for Gazebo in the airframe configuration file (this example is from [x500 quadcopter](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/ROMFS/px4fmu_common/init.d-posix/airframes/4001_gz_x500)):

   ```
   PX4_SIMULATOR=${PX4_SIMULATOR:=gz}
   PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}
   PX4_SIM_MODEL=${PX4_SIM_MODEL:=<your model name>}
   ```
   - `PX4_SIMULATOR=${PX4_SIMULATOR:=gz}` sets the default simulator (Gz) for that specific airframe.

   - `PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}` sets the [default world](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/simulation/gz/worlds/default.sdf) for that specific airframe.

   - Setting the default value of `PX4_SIM_MODEL` lets you start the simulation with just
     ```bash
     PX4_SYS_AUTOSTART=<your new airframe id> ./build/px4_sitl_default/bin/px4
     ```

:::note
As long as the world file and the model file are in the Gazebo search path `IGN_GAZEBO_RESOURCE_PATH` it is not necessary to add them to the PX4 world and model directories.
However, `make px4_sitl gz_<model>_<world>` won't work with them.
:::

## Multi-Vehicle Simulation

Multi-Vehicle simulation is supported on Linux hosts.

For more information see: [Multi-Vehicle Simulation with Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md)

## Further Information

- [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
