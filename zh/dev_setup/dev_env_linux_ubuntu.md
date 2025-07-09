---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_linux_ubuntu
---

# Ubuntu LTS/Debian Linux 的开发环境

The following instructions set up a PX4 development environment on the [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) versions supported by PX4. This includes: 18.04 (Bionic Beaver), 20.04 (Focal Fossa), and Ubuntu 22.04 (Jammy Jellyfish).

Bash scripts are provided to simplify the process. They are intended to be run on *clean* Ubuntu LTS installations, and may not work if run "on top" of an existing system, or on a different Ubuntu release.

The [supported targets](../dev_setup/dev_env.md#supported-targets) are:

- [Simulation and NuttX (Pixhawk) Targets](#simulation-and-nuttx-pixhawk-targets). This includes: [Gazebo](../sim_gazebo_gz/README.md), [Gazebo Classic](../sim_gazebo_classic/README.md), [jMAVSim](../simulation/jmavsim.md), [Pixhawk and other NuttX-based hardware](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards)).
- [通用依赖](#raspberry-pi)
- [ROS 2](#ros-2) (Robotics Operating System)
- [ROS 1](#ros-gazebo-classic) (Robotics Operating System)

:::tip
This setup is supported by the PX4 dev team.
The instructions may also work on other Debian Linux based systems.
:::

## 一键安装脚本

This video shows how to install the toolchain for NuttX and simulation targets ([as covered below](#simulation-and-nuttx-pixhawk-targets)) along with the basic testing covered in [Building PX4 Software](../dev_setup/building_px4.md).

@[youtube](https://youtu.be/OtValQdAdrU).

## Simulation and NuttX (Pixhawk) Targets

:::warning ROS
users should first read/skip ahead to the [ROS/Gazebo](#rosgazebo) or [ROS 2](#ros-2) sections.
:::

Use the [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/ubuntu.sh) script to set up a development environment that allows you to build for simulators and/or the [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) toolchain. The script installs [jMAVSim](../simulation/jmavsim.md) on all targets, [Gazebo Classic](../sim_gazebo_classic/README.md) 9 on Ubuntu 18.04, Gazebo Classic 11 on Ubuntu 20.04, and [Gazebo](../sim_gazebo_gz/README.md) "Garden" on Ubuntu 22.04.

To install the toolchain:

1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh" target="_blank" download>ubuntu_sim_common_deps.sh</a>**：[通用依赖](#common-dependencies)，[jMAVSim](#jmavsim) 模拟器

   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```

:::note
The environment setup scripts in the source usually work for recent PX4 releases. If working with an older version of PX4 you may need to [get the source code specific to your release](../contribute/git_examples.md#get-a-specific-release).
:::
1. 运行 bash 脚本（比如运行 **ubuntu_sim.sh** ）： bash source ubuntu_sim.sh 所有弹出的提示均确认通过。
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - 在安装过程中确认并通过所有的提示。
   - 你可以通过传输参数`--no-nuttx` 和 `--no-sim-tools` 来跳过 nuttx 和/或 仿真器工具的安装。
1. 完成后重新启动计算机。


:::details
Additional notes These notes are provided "for information only":
- If you want to use Gazebo on Ubuntu 20.04 you can add it manually. See [Gazebo > Installation](../sim_gazebo_gz/README.md#installation-ubuntu-linux).
- You can verify the NuttX installation by confirming the gcc version as shown:

  ```bash
  $arm-none-eabi-gcc --version

  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 9-2020-q2-update) 9.3.1 20200408 (release)
  Copyright (C) 2019 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- You're going to need the PX4 source code anyway. But if you just wanted to set up the development environment without getting all the source code you could instead just download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/ubuntu.sh) and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/requirements.txt) and then run **ubuntu.sh**:

   ```bash
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
   bash ubuntu.sh
   ```
   <!-- From https://gazebosim.org/docs/garden/install_ubuntu -->
:::


<a id="raspberry-pi-hardware"></a>

## 通用依赖

为 [jMAVSim Simulation](../simulation/jmavsim.md) 安装依赖。

:::warning
To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS Developer Quick Start > Alternative build method using docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

本节解释如何安装 [ROS/Gazebo](../ros/README.md) ("Melodic") 以便与PX4一起使用。

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**):  <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
   ```
1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_nuttx.sh" target="_blank" download>ubuntu_sim_nuttx.sh</a>**：**ubuntu_sim.sh** + NuttX 工具。
   ```bash
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. Then setup an cross-compiler (either GCC or clang) as described in the following sections.

### 如何使用脚本

Ubuntu software repository provides a set of pre-compiled toolchains. Note that Ubuntu Focal comes up with `gcc-9-arm-linux-gnueabihf` as its default installation which is not fully supported, so we must manually install `gcc-8-arm-linux-gnueabihf` and set it as the default toolchain. This guide also applies to earlier Ubuntu releases (Bionic). The following instruction assumes you haven't installed any version of arm-linux-gnueabihf, and will set up the default executable with `update-alternatives`. Install them with the terminal command:

```sh
sudo usermod -a -G dialout $USER
```

```sh

```sh
sudo apt-get remove modemmanager
```

### jMAVSim

sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y

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

First install GCC (needed to use clang).

sudo apt-get update
```
# optional python tools
sudo -H pip install pyulog
```

sudo apt-get install ros-kinetic-desktop-full -y
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

Additional developer information for using PX4 on Raspberry Pi (including building PX4 natively) can be found here:

- [Raspberry Pi 2/3 Navio2 Autopilot](../flight_controller/raspberry_pi_navio2.md).
- 在安装[高通骁龙飞控](#snapdragon-flight) 或 [树莓派/Parrot Bebop](#raspberry-pi-hardware) 之前， 你可以先运行它。


## ROS 2

Information about ROS 2 setup and development with PX4 can be found in the [ROS 2 User Guide](../ros/ros2_comm.md).

Generally speaking if you're working with hardware and don't need to modify PX4 itself, then you do not need a PX4 development environment (dependencies for working with ROS 2 are included and built into PX4 firmware by default).

You will need to install the normal development [simulator environment](#simulation-and-nuttx-pixhawk-targets) in order to work with the PX4 simulator.

<a id="rosgazebo"></a>

## ROS/Gazebo Classic

This section explains how to install [ROS 1](../ros/README.md) with PX4. ROS 1 full desktop builds come with Gazebo Classic, so normally you will not install PX4 simulator dependencies yourself!

### ROS Noetic/Ubuntu 20.04

If you're working with [ROS Noetic](http://wiki.ros.org/noetic) on Ubuntu 20.04:

1. Install PX4 without the simulator toolchain:

   1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh" target="_blank" download>ubuntu_sim_common_deps.sh</a>**：[通用依赖](#common-dependencies)，[jMAVSim](#jmavsim) 模拟器

      ```bash
      git clone https://github.com/PX4/PX4-Autopilot.git --recursive
      ```
   1. Run the **ubuntu.sh** the `--no-sim-tools` (and optionally `--no-nuttx`):

      ```bash
      bash ./PX4-Autopilot/Tools/setup/ubuntu.sh --no-sim-tools --no-nuttx
      ```
      - 在安装过程中确认并通过所有的提示。
   1. 完成后重新启动计算机。
1. You _may_ need to install the following additional dependencies:

   ```
   sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y
   ```
1. Follow the [Noetic Installation instructions](http://wiki.ros.org/noetic/Installation/Ubuntu#Installation) (ros-noetic-desktop-full is recommended).
1. Intall MAVROS by following the [MAVROS Installation Guide](../ros/mavros_installation.md).

### ROS Melodic/Ubuntu 18.04

If you're working with ROS "Melodic on Ubuntu 18.04:

1. Download the [ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh) script in a bash shell:

   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. 下载脚本

   ```bash
   ROS Gazebo: http://wiki.ros.org/kinetic/Installation/Ubuntu
   ```
   随着脚本的运行，可能需要确认一些提示。

:::note
* ROS Melodic is installed with Gazebo (Classic) 9 by default.
* 你的 catkin （ROS 构建系统）工作目录生成在**~/catkin_ws/**。
* The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::


## Gazebo dependencies

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::
- Continue to the [build instructions](../dev_setup/building_px4.md).
