# Ignition Gazebo Simulation

:::warning
Ignition Gazebo supports a single frame (X500 quadcopter) and world (October 2022).
:::

[Ignition Gazebo](https://gazebosim.org/libs/gazebo) is an open source robotics simulator from the _Ignition Robotics Project_.
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

In order to increase the verbose output, `VERBOSE_SIM=1` can be used:

```bash
VERBOSE_SIM=1 make px4_sitl gz_x500
```

## Further Information

* [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
