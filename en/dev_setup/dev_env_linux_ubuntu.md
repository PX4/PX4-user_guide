# Ubuntu Development Environment

The following instructions set up a PX4 development environment on Ubuntu Linux 18.04 and 20.04.
This environment can be used to build PX4 for [most PX4 targets](../dev_setup/dev_env.md#supported-targets):

- Pixhawk and other NuttX-based hardware
- [Gazebo Simulation](../sim_gazebo_gz/README.md) (Ubuntu 20.04 and later)
- [Gazebo Classic Simulation](../sim_gazebo_classic/README.md) (up to Ubuntu 20.04)
- [jMAVSim Simulation](../simulation/jmavsim.md)
- [Raspberry Pi](#raspberry-pi)
- [ROS (1)](#ros-gazebo) (Robotics Operating System)

:::tip
This setup is supported by the PX4 dev team.
The instructions may also work on other Debian Linux based systems.
:::

:::note
The supported OS versions for PX4 development are [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) 18.04 (Bionic Beaver) and 20.04 (Focal Fossa).
Ubuntu LTS 22.04 support is expected soon.

For ROS 2, Ubuntu LTS 20.04 is supported.
For ROS (1), Ubuntu LTS 18.04 (only) is supported.
:::

## Video Guide

This video shows how to install the toolchain for NuttX and simulation targets ([as covered below](#gazebo-jmavsim-and-nuttx-pixhawk-targets)) along with the basic testing covered in [Building PX4 Software](../dev_setup/building_px4.md).

@[youtube](https://youtu.be/OtValQdAdrU)

## Bash Scripts

Bash scripts are provided to help make it easy to install development environment for different target platforms.
They are intended to be run on *clean* Ubuntu LTS installations.

Script | Description
--- | ---
**[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh)** | Installs [Gazebo Classic](../sim_gazebo_classic/README.md) (version 9 on Ubuntu 18.04 - otherwise version 11) and [jMAVSim](../simulation/jmavsim.md) simulators and/or [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) tools.
**[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)** | Installs [ROS "Melodic"](#rosgazebo) and PX4 on Ubuntu 18.04 LTS **only**.<br>Do not use on Ubuntu 20.04 or later!

:::note
The scripts *may* not work if installed "on top" of an existing system, or on a different Ubuntu release.
:::

## Gazebo Classic, JMAVSim and NuttX (Pixhawk) Targets

Use the [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) script to set up a development environment that includes [Gazebo Classic](../sim_gazebo_classic/README.md) and [jMAVSim](../simulation/jmavsim.md) simulators, and/or the [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) toolchain.

:::warning
ROS Melodic users should jump to [ROS Melodic /Gazebo](#rosgazebo) (skip this section).
:::

To install the toolchain:

1. [Download PX4 Source Code](../dev_setup/building_px4.md):

   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```

   :::note
   The environment setup scripts in the source usually work for recent PX4 releases.
   If working with an older version of PX4 you may need to [get the source code specific to your release](../contribute/git_examples.md#get-a-specific-release).
   :::
1. Run the **ubuntu.sh** with no arguments (in a bash shell) to install everything:
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - Acknowledge any prompts as the script progress.
   - You can use the `--no-nuttx` and `--no-sim-tools` options to omit the NuttX and/or simulation tools.
1. Restart the computer on completion.

:::details Additional notes
These notes are provided "for information only":
- The script installs Gazebo Classic 9 on Ubuntu 18.04 and otherwise Gazebo Classic 11.
- You can verify the NuttX installation by confirming the gcc version as shown:

  ```bash
  $arm-none-eabi-gcc --version

  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 9-2020-q2-update) 9.3.1 20200408 (release)
  Copyright (C) 2019 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- You're going to need the PX4 source code anyway.
  But if you just wanted to set up the development environment without getting all the source code you could instead just download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/requirements.txt) and then run **ubuntu.sh**:

   ```bash
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
   bash ubuntu.sh
   ```
:::


## Gazebo

[Gazebo](../sim_gazebo_gz/README.md) is supported on Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04, and recommended for working with PX4 on Ubuntu 22.04 and later.
It is not installed by the [bash scripts](#bash-scripts) above (see [PX4-Autopilot/#21090](https://github.com/PX4/PX4-Autopilot/issues/21090)), but can be installed manually.

To install Gazebo:

1. Follow the instructions above for installing [Gazebo Classic, JMAVSim and NuttX (Pixhawk) Targets](#gazebo-classic-jmavsim-and-nuttx-pixhawk-targets).
   The NuttX components are optional, but you will need the simulator dependencies.
2. Install Gazebo:

   ```sh
    sudo wget https://packages.osrfoundation.org/gazebo.gpg -O /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null
    sudo apt-get update
    sudo apt-get install gz-garden
   ```
   
   Note that installing `gz-garden` will uninstall Gazebo-Classic on Ubuntu 22.02.

<!-- reproduced from the official [Gazebo "Garden"](https://gazebosim.org/docs/garden/install_ubuntu) installation instructions. -->

<a id="raspberry-pi-hardware"></a>
## Raspberry Pi

The following instructions explain how to set up a build toolchain for RasPi on *Ubuntu 18.04*.

:::warning
To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi).
For more information see [PilotPi with Raspberry Pi OS Developer Quick Start > Alternative build method using docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

To get the common dependencies for Raspberry Pi:

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**):  <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
   ```
1. Run **ubuntu.sh** in a terminal to get just the common dependencies:
   ```bash
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. Then setup an cross-compiler (either GCC or clang) as described in the following sections.

### GCC (armhf)

Ubuntu software repository provides a set of pre-compiled toolchains. Note that Ubuntu Focal comes up with `gcc-9-arm-linux-gnueabihf` as its default installation which is not fully supported, so we must manually install `gcc-8-arm-linux-gnueabihf` and set it as the default toolchain. This guide also applies to earlier Ubuntu releases (Bionic).
The following instruction assumes you haven't installed any version of arm-linux-gnueabihf, and will set up the default executable with `update-alternatives`.
Install them with the terminal command:

```sh
sudo apt-get install -y gcc-8-arm-linux-gnueabihf g++-8-arm-linux-gnueabihf
```

Set them as default:

```sh
sudo update-alternatives --install /usr/bin/arm-linux-gnueabihf-gcc arm-linux-gnueabihf-gcc /usr/bin/arm-linux-gnueabihf-gcc-8 100 --slave /usr/bin/arm-linux-gnueabihf-g++ arm-linux-gnueabihf-g++ /usr/bin/arm-linux-gnueabihf-g++-8
sudo update-alternatives --config arm-linux-gnueabihf-gcc
```

### GCC (aarch64)

If you want to build PX4 for ARM64 devices, this section is required.

```sh
sudo apt-get install -y gcc-8-aarch64-linux-gnu g++-8-aarch64-linux-gnu
sudo update-alternatives --install /usr/bin/aarch64-linux-gnu-gcc aarch64-linux-gnu-gcc /usr/bin/aarch64-linux-gnu-gcc-8 100 --slave /usr/bin/aarch64-linux-gnu-g++ aarch64-linux-gnu-g++ /usr/bin/aarch64-linux-gnu-g++-8
sudo update-alternatives --config aarch64-linux-gnu-gcc
```

### Clang (optional)

First install GCC (needed to use clang).

We recommend you to get clang from the Ubuntu software repository, as shown below:
```
sudo apt-get install clang
```

Example below for building PX4 firmware out of tree, using *CMake*.
```sh
cd <PATH-TO-PX4-SRC>
mkdir build/px4_raspberrypi_default_clang
cd build/px4_raspberrypi_default_clang
cmake \
-G"Unix Makefiles" \
-DCONFIG=px4_raspberrypi_default \
-UCMAKE_C_COMPILER \
-DCMAKE_C_COMPILER=clang \
-UCMAKE_CXX_COMPILER \
-DCMAKE_CXX_COMPILER=clang++ \
../..
make
```

### Detailed Information

Additional developer information for using PX4 on Raspberry Pi (including building PX4 natively) can be found here:

- [Raspberry Pi 2/3 Navio2 Autopilot](../flight_controller/raspberry_pi_navio2.md).
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md).


## ROS 2

Information about ROS 2 setup and development with PX4 can be found in the [ROS 2 User Guide](../ros/ros2_comm.md).

Generally speaking if you're working with hardware and don't need to modify PX4 itself, then you do not need a PX4 development environment (dependencies for working with ROS 2 are included and built into PX4 firmware by default).

You will need to install the normal development simulator environment in order to work with the PX4 simulator.
For installation instructions for the respective simulators see:

- [Gazebo Classic, JMAVSim and NuttX (Pixhawk) Targets](#gazebo-classic-jmavsim-and-nuttx-pixhawk-targets)
- [Gazebo](#gazebo)

:::note
ROS desktop builds (i.e. installed with say, `ros-humble-desktop`) include specific versions of Gazebo and Gazebo Classic by default.
For example, ROS2 "Humble" and "Rolling" come with Ignition Fortress, ROS2 "Foxy" comes with Gazebo Classic 11, and ROS1 "Melodic" comes with Gazebo 9. 

PX4 supports specific versions of Gazebo, so you should follow the instructions above to install [Gazebo](#gazebo).
:::


<a id="rosgazebo"></a>
## ROS Melodic/Gazebo Classic

This section explains how to install [ROS](../ros/README.md) "Melodic" (including Gazebo 9) and PX4 on Ubuntu 18.04.

:::warning
ROS Melodic can *only* install on Ubuntu 18.04.
:::

To install the development toolchain:

1. Download the [ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh) script in a bash shell:

   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. Run the script:

   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   You may need to acknowledge some prompts as the script progresses.

:::note
* ROS Melodic is installed with Gazebo (Classic) 9 by default.
* Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
* The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::


## Next Steps

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html)
  :::tip
  The *daily build* includes development tools that hidden in release builds. 
  It may also provide access to new PX4 features that are not yet supported in release builds.
  :::
- Continue to the [build instructions](../dev_setup/building_px4.md).
