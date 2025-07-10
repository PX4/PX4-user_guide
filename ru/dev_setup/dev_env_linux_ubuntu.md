---
canonicalUrl: https://docs.px4.io/main/ru/dev_setup/dev_env_linux_ubuntu
---

# Ubuntu Development Environment

The following instructions set up a PX4 development environment on Ubuntu Linux 18.04 amd 20.04. This environment can be used to build PX4 for [most PX4 targets](../dev_setup/dev_env.md#supported-targets):
* Pixhawk and other NuttX-based hardware
* [jMAVSim Simulation](../simulation/jmavsim.md)
* [Gazebo Simulation](../simulation/gazebo.md)
* [Raspberry Pi](#raspberry-pi)
* [ROS (1)](#ros-gazebo) (Robotics Operating System)
* [Fast DDS](../dev_setup/fast-dds-installation.md) - Required for ROS2

:::tip
This setup is supported by the PX4 dev team.
:::

:::note
The supported OS versions for PX4 development are [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) 18.04 (Bionic Beaver) and 20.04 (Focal Fossa). For ROS (1) Ubuntu LTS 18.04 (only) is supported.

The instructions should also work on other Debian Linux based systems, but this is not verified/officially supported.
:::

## Video Guide

This video shows how to install the toolchain for NuttX and simulation targets ([as covered below](#gazebo-jmavsim-and-nuttx-pixhawk-targets)) along with the basic testing covered in [Building PX4 Software](../dev_setup/building_px4.md).

@[youtube](https://youtu.be/OtValQdAdrU)

## Bash Scripts

Bash scripts are provided to help make it easy to install development environment for different target platforms. They are intended to be run on *clean* Ubuntu LTS installations.

| Script                                                                                                                           | Description                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)**                                          | Installs [Gazebo 9](../simulation/gazebo.md) and [jMAVSim](../simulation/jmavsim.md) simulators and/or [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) tools.<br>Does not include dependencies for [Fast DDS](#fast-dds-installation). <!-- NEED px4_version -->
|
| **[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)** | Installs [ROS "Melodic"](#rosgazebo) and PX4 on Ubuntu 18.04 LTS **only**.<br>Do not use on Ubuntu 20.04 or later!                                                                                                                                                                                  |

:::note
The scripts *may* not work if installed "on top" of an existing system, or on a different Ubuntu release.
:::

## Gazebo, JMAVSim and NuttX (Pixhawk) Targets

Use the [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> script to set up a development environment that includes [Gazebo 9](../simulation/gazebo.md) and [jMAVSim](../simulation/jmavsim.md) simulators, and/or the [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) toolchain.

:::warning ROS
users must follow the instructions for: [ROS/Gazebo](#rosgazebo). <!-- ROS installs Gazebo automatically, as part of the ROS installation). -->
:::

To install the toolchain:

1. [Download PX4 Source Code](../dev_setup/building_px4.md):
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. Run the **ubuntu.sh** with no arguments (in a bash shell) to install everything:
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - Acknowledge any prompts as the script progress.
   - You can use the `--no-nuttx` and `--no-sim-tools` options to omit the NuttX and/or simulation tools.
1. Restart the computer on completion.

::: details
Information-only notes
- The script installs Gazebo 9 (following [gazebosim.org instructions](http://gazebosim.org/tutorials?tut=install_ubuntu&cat=install)). Gazebo 7, 8 are also supported but not recommended.
- You can verify the NuttX installation by confirming the gcc version as shown:
  ```bash
   $arm-none-eabi-gcc --version

   arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
   Copyright (C) 2017 Free Software Foundation, Inc.
   This is free software; see the source for copying conditions.  There is NO
   warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- You're going to need the PX4 source code anyway. But if you just wanted to set up the development environment without getting all the source code you could instead just download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) and then run **ubuntu.sh**: <!-- NEED px4_version -->
   ```bash
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
   bash ubuntu.sh
   ```
:::<!-- Do we need to add to our scripts or can we assume correct version installs over?
Remove any old versions of the arm-none-eabi toolchain.
```sh
sudo apt-get remove gcc-arm-none-eabi gdb-arm-none-eabi binutils-arm-none-eabi gcc-arm-embedded
sudo add-apt-repository --remove ppa:team-gcc-arm-embedded/ppa
```
--><a id="raspberry-pi-hardware"></a>

## Raspberry Pi

The following instructions explain how to set up a build toolchain for RasPi on *Ubuntu 18.04*.

:::warning
To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS Developer Quick Start > Alternative build method using docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

To get the common dependencies for Raspberry Pi:

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**):  <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
   ```
1. Run **ubuntu.sh** in a terminal to get just the common dependencies:
   ```bash
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. Then setup an cross-compiler (either GCC or clang) as described in the following sections.

### GCC (armhf)

Ubuntu software repository provides a set of pre-compiled toolchains. Note that Ubuntu Focal comes up with `gcc-9-arm-linux-gnueabihf` as its default installation which is not fully supported, so we must manually install `gcc-8-arm-linux-gnueabihf` and set it as the default toolchain. This guide also applies to earlier Ubuntu releases (Bionic). The following instruction assumes you haven't installed any version of arm-linux-gnueabihf, and will set up the default executable with `update-alternatives`. Install them with the terminal command:

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

<a id="rosgazebo"></a>

## ROS/Gazebo

This section explains how to install [ROS](../ros/README.md) "Melodic" and PX4 on Ubuntu 18.04.

:::warning ROS
builds are tied to specific Ubuntu versions! ROS Melodic can *only* install on Ubuntu 18.04.
:::

To install the development toolchain:

1. Download the script in a bash shell: <!-- NEED px4_version -->
   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. Run the script:
   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   You may need to acknowledge some prompts as the script progresses.

:::note
* ROS Melodic is installed with Gazebo9 by default.
* Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
* The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::

<a id="fast_dds"></a>
<a id="fast_rtps"></a>

## Fast DDS installation

[eProsima Fast DDS](https://github.com/eProsima/Fast-DDS) is required if you're using PX4 with ROS2 (or some other RTPS/DDS system).

Follow the instructions in [Fast DDS Installation](../dev_setup/fast-dds-installation.md) to install it.


## Next Steps

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::
- Continue to the [build instructions](../dev_setup/building_px4.md).
