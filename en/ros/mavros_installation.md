---
canonicalUrl: https://docs.px4.io/main/en/ros/mavros_installation
---

# ROS with MAVROS Installation Guide

[mavros](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) is a ROS (1) package that enables MAVLink extendable communication between computers running ROS (1) for any MAVLink enabled autopilot, ground station, or peripheral.
*MAVROS* is the "official" supported bridge between ROS (1) and the MAVLink protocol.

While MAVROS can be used to communicate with any MAVLink-enabled autopilot, this documentation explains how to set up communication between the PX4 Autopilot and a ROS (1) enabled companion computer.

:::tip
The easiest way to setup PX4 simulation with ROS on Ubuntu Linux is to use the standard installation script that can be found at [Development Environment on Linux > Gazebo with ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo).

The script automates the installation instructions covered in this topic, installing everything you need: PX4, ROS, the Gazebo simulator, and [MAVROS](../ros/mavros_installation.md).
:::

:::warning Note
The PX4 development team recommend that all users [upgrade to ROS 2](../ros/ros2.md).
This documentation reflects the "old approach".
:::

## Resources

- [mavros ROS Package Summary](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros source](https://github.com/mavlink/mavros/)
- [ROS Melodic installation instructions](http://wiki.ros.org/melodic/Installation)

## Installation

MAVROS can be installed either from source or binary.
We recommend that developers use the source installation.

:::tip
These instructions are a simplified version of the [official installation guide](https://github.com/mavlink/mavros/tree/master/mavros#installation).
They cover the *ROS Melodic* release.
:::

### Binary Installation (Debian / Ubuntu)

The ROS repository has binary packages for Ubuntu x86, amd64 (x86\_64) and armhf (ARMv7).
Kinetic also supports Debian Jessie amd64 and arm64 (ARMv8).

Use `apt-get` for installation:

```
sudo apt-get install ros-kinetic-mavros ros-kinetic-mavros-extras
```

Then install [GeographicLib](https://geographiclib.sourceforge.io/) datasets by running the `install_geographiclib_datasets.sh` script:

```
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh   
```

### Source Installation

This installation assumes you have a catkin workspace located at `~/catkin_ws` If you don't create one with:

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

You will be using the ROS Python tools: *wstool* (for retrieving sources), *rosinstall*, and *catkin_tools* (building) for this installation. While they may have been installed during your installation of ROS you can also install them with:

```sh
sudo apt-get install python-catkin-tools python-rosinstall-generator -y
```

:::tip
While the package can be built using **catkin_make** the preferred method is using **catkin_tools** as it is a more versatile and "friendly" build tool.
:::

If this is your first time using wstool you will need to initialize your source space with:
```sh
$ wstool init ~/catkin_ws/src
```

Now you are ready to do the build:

1. Install MAVLink:
   ```
   # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. Install MAVROS from source using either released or latest version: 
   * Released/stable
     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```
   * Latest source
     ```sh
     rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```

     ```sh
     # For fetching all the dependencies into your catkin_ws, 
     # just add '--deps' to the above scripts, E.g.:
     #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. Create workspace & deps

   ```sh
   wstool merge -t src /tmp/mavros.rosinstall
   wstool update -t src -j4
   rosdep install --from-paths src --ignore-src -y
   ```

1. Install [GeographicLib](https://geographiclib.sourceforge.io/) datasets:
   ```sh
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. Build source
   ```sh
   catkin build
   ```

1. Make sure that you use setup.bash or setup.zsh from workspace.
 
   ```sh
   #Needed or rosrun can't find nodes from this workspace.
   source devel/setup.bash
   ```

In the case of error, there are addition installation and troubleshooting notes in the [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation).

## MAVROS Examples

The [MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md), will show you the basics of MAVROS, from reading telemetry, checking the drone state, changing flight modes and controlling the drone.

:::note
If you have an example app using the PX4 Autopilot and MAVROS, we can help you get it on our docs.
:::
