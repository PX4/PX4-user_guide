# Development Environment on Ubuntu LTS / Debian Linux

[Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) (16.04) is the standard/preferred Linux development OS. It allows you to build for [all PX4 targets](../setup/dev_env.md#supported-targets) (NuttX based hardware, Qualcomm Snapdragon Flight hardware, Linux-based hardware, Simulation, ROS).

The following instructions explain how to *manually* set up a development environment each of the supported targets.
- **Tip** We recommend that you use the [Convenience bash scripts](#convenience-bash-scripts) to install the Simulators and/or NuttX toolchain (this is easier than typing in the instructions below). Then follow just the additional instructions for other targets (e.g. Qualcomm Snapdragon Flight, Bebop, Raspberry Pi, etc.) Does not include dependencies for [FastRTPS](#fast_rtps). <!-- NEED px4_version -->
- **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim.sh" target="_blank" download>ubuntu_sim.sh</a>**: **ubuntu_sim_common_deps.sh** + [Gazebo8](#gazebo) simulator. <!-- NEED px4_version -->

> **Tip** The scripts have been tested on a clean Ubuntu 16.04 LTS installation. They *may* not work as expected if installed on top of an existing system.

The instructions below explain how to download and use the scripts.

<a id="sim_nuttx"></a>

## Convenience Bash Scripts

The scripts are:

To use the scripts:

1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh" target="_blank" download>ubuntu_sim_common_deps.sh</a>**: [Common Dependencies](#common-dependencies), [jMAVSim](#jmavsim) simulator
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_nuttx.sh" target="_blank" download>ubuntu_sim_nuttx.sh</a>**: **ubuntu_sim.sh** + NuttX tools.
   ```bash
   bash ./Tools/setup/ubuntu.sh
   ```
   - Acknowledge any prompts as the script progress.
   - We've created a number of bash scripts that you can use to install the Simulators and/or NuttX toolchain.
1. This requires computer restart on completion.

> **Tip** After setting up the build/simulation toolchain, see [Additional Tools](../setup/generic_dev_tools.md) for information about other useful tools.

The user needs to be part of the group "dialout":
- **Tip** PX4 works with Gazebo 7, 8, and 9. The [installation instructions](http://gazebosim.org/tutorials?tut=install_ubuntu&cat=install) above are for installing Gazebo 9.
- **Note** If you're going work with ROS then follow the [ROS/Gazebo](#rosgazebo) instructions in the following section (these install Gazebo automatically, as part of the ROS installation).
- You can verify the the NuttX installation by confirming the gcc version as shown:
  ```bash
   $arm-none-eabi-gcc --version

   arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
   Copyright (C) 2017 Free Software Foundation, Inc.
   This is free software; see the source for copying conditions.  There is NO
   warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```<!-- Do we need to add to our scripts or can we assume correct version installs over?
Remove any old versions of the arm-none-eabi toolchain.
```sh
sudo apt-get remove gcc-arm-none-eabi gdb-arm-none-eabi binutils-arm-none-eabi gcc-arm-embedded
sudo add-apt-repository --remove ppa:team-gcc-arm-embedded/ppa
```
--><a id="raspberry-pi-hardware"></a>

## Permission Setup

The following instructions explain how to set up a build toolchain for RasPi on *Ubuntu 18.04*.

> **Warning** To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS
# Additional developer information for using PX4 on Raspberry Pi (including building PX4 natively) can be found here: [Raspberry Pi 2/3 Navio2 Autopilot](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html).

Update the package list and install the following dependencies for all PX4 build targets.

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version -->
   and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**): <br>`wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh` <!-- NEED px4_version -->
   <br>`wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt` <!-- NEED px4_version -->
   1. **Note** If you use an ubuntu-based distro and the command `rosdep install --from-paths src --ignore-src --rosdistro kinetic -y` fails, you can try to force the command to run by executing `rosdep install --from-paths src --ignore-src --rosdistro kinetic -y --os ubuntu:xenial`
   ```bash
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. Then setup an cross-compiler (either GCC or clang) as described in the following sections.

### How to use the scripts

Ubuntu software repository provides a set of pre-compiled toolchains. Note that Ubuntu Focal comes up with `gcc-9-arm-linux-gnueabihf` as its default installation which is not fully supported, so we must manually install `gcc-8-arm-linux-gnueabihf` and set it as the default toolchain. This guide also applies to earlier Ubuntu releases (Bionic). The following instruction assumes you haven't installed any version of arm-linux-gnueabihf, and will set up the default executable with `update-alternatives`. Install them with the terminal command:

```sh
sudo usermod -a -G dialout $USER
```

{% include "_ninja_build_system.md" %}

```sh
sudo apt-get remove modemmanager
```

### jMAVSim

If you want to build PX4 for ARM64 devices, this section is required.

```sh
sudo apt-get update -y
sudo apt-get install git zip qtcreator cmake \
    build-essential genromfs ninja-build exiftool vim-common -y
# Required python packages
sudo apt-get install python-argparse \
    python-empy python-toml python-numpy python-yaml \
    python-dev python-pip -y
sudo -H pip install --upgrade pip 
sudo -H pip install pandas jinja2 pyserial cerberus
```

### Gazebo

The following instructions can be used to install the FastRTPS 1.5 binaries to your home directory.

We recommend you to get clang from the Ubuntu software repository, as shown below:
```
# optional python tools
sudo -H pip install pyulog
```

Install the dependencies for [jMAVSim Simulation](../simulation/jmavsim.md).
```sh
git clone https://github.com/raspberrypi/tools.git ${HOME}/rpi-tools

# test compiler
$HOME/rpi-tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian-x64/bin/arm-linux-gnueabihf-gcc -v

# permanently update PATH variable by modifying ~/.profile
echo 'export PATH=$PATH:$HOME/rpi-tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian-x64/bin' >> ~/.profile

# update PATH variable only for this session
export PATH=$PATH:$HOME/rpi-tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian-x64/bin
make
```

### Detailed Information

Install the dependencies for [Gazebo Simulation](../simulation/gazebo.md).

- [Raspberry Pi 2/3 Navio2 Autopilot](../flight_controller/raspberry_pi_navio2.md).
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md).

<a id="rosgazebo"></a>

## ROS/Gazebo

This section explains how to install [ROS/Gazebo](../ros/README.md) ("Melodic") for use with PX4.

To install the development toolchain:

1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_gazebo.sh" target="_blank" download>ubuntu_sim_ros_gazebo.sh</a>**: **ubuntu_sim_common_deps.sh** + [ROS/Gazebo and MAVROS](#rosgazebo).<!-- NEED px4_version -->1. Download the desired script
   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   You may need to acknowledge some prompts as the script progresses.

Note:
* ROS Kinetic is installed with Gazebo7 by default (we have chosen to use the default rather than Gazebo 8 to simplify ROS development).
* Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
* The instructions come from the ROS Wiki [Ubuntu page](http://wiki.ros.org/kinetic/Installation/Ubuntu).



## Snapdragon Flight

Setup instructions for *Snapdragon Flight* are provided in the flight controller pages:
* [Development Environment](../flight_controller/snapdragon_flight_dev_environment_installation.md)
* [Software Installation](../flight_controller/snapdragon_flight_software_installation.md)
* [Configuration](../flight_controller/snapdragon_flight_configuration.md)

<a id="fast_rtps"></a>

## FastRTPS installation

[eProsima Fast RTPS](http://eprosima-fast-rtps.readthedocs.io/en/latest/) is a C++ implementation of the RTPS (Real Time Publish Subscribe) protocol. FastRTPS is used, via the [RTPS/ROS2 Interface: PX4-FastRTPS Bridge](../middleware/micrortps.md), to allow PX4 uORB topics to be shared with offboard components.

{% include "_gcc_toolchain_installation.md" %}


## Additional Tools

After setting up the build/simulation toolchain, see [Additional Tools](../setup/generic_dev_tools.md) for information about other useful tools.

## Next Steps

Once you have finished setting up the environment, continue to the [build instructions](../setup/building_px4.md).
