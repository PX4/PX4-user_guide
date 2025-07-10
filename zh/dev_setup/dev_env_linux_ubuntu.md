---
canonicalUrl: https://docs.px4.io/main/zh/dev_setup/dev_env_linux_ubuntu
---

# Ubuntu LTS/Debian Linux 的开发环境

[Ubuntu linux lts](https://wiki.ubuntu.com/LTS)（16.04）是标准的/首选的 Linux 开发操作系统。 Linux允许您构建[所有PX4目标](../setup/dev_env.md#supported-targets)（基于NuttX的硬件、高通骁龙飞控硬件、基于Linux的硬件、仿真、ROS）。
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

## 一键安装脚本

使用脚本：

@用户应先加入组 ”dialout“：

## 权限设置

Bash scripts are provided to help make it easy to install development environment for different target platforms. They are intended to be run on *clean* Ubuntu LTS installations.

| Script                                                                                                                           | Description                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)**                                          | Installs [Gazebo 9](../simulation/gazebo.md) and [jMAVSim](../simulation/jmavsim.md) simulators and/or [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) tools.<br>Does not include dependencies for [Fast DDS](#fast-dds-installation). <!-- NEED px4_version -->
|
| **[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)** | Installs [ROS "Melodic"](#rosgazebo) and PX4 on Ubuntu 18.04 LTS **only**.<br>Do not use on Ubuntu 20.04 or later!                                                                                                                                                                                  |

:::note
The scripts *may* not work if installed "on top" of an existing system, or on a different Ubuntu release.
:::

## ROS/Gazebo

Use the [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> script to set up a development environment that includes [Gazebo 9](../simulation/gazebo.md) and [jMAVSim](../simulation/jmavsim.md) simulators, and/or the [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) toolchain.

:::warning ROS
users must follow the instructions for: [ROS/Gazebo](#rosgazebo). <!-- ROS installs Gazebo automatically, as part of the ROS installation). -->
:::

To install the toolchain:

1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh" target="_blank" download>ubuntu_sim_common_deps.sh</a>**：[通用依赖](#common-dependencies)，[jMAVSim](#jmavsim) 模拟器
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. 运行 bash 脚本（比如运行 **ubuntu_sim.sh** ）： bash source ubuntu_sim.sh 所有弹出的提示均确认通过。
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - 在安装过程中确认并通过所有的提示。
   - 你可以通过传输参数`--no-nuttx` 和 `--no-sim-tools` 来跳过 nuttx 和/或 仿真器工具的安装。
1. 完成后重新启动计算机。

::: details
Information-only notes
- ** Note** PX4兼容Gazebo7、8和9。 上面的 [安装说明](http://gazebosim.org/tutorials?tut=install_ubuntu&cat=install) 是关于安装 Gazebo 9 的。
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

## 通用依赖

为 [jMAVSim Simulation](../simulation/jmavsim.md) 安装依赖。

:::warning
To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS Developer Quick Start > Alternative build method using docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

本节解释如何安装 [ROS/Gazebo](../ros/README.md) ("Melodic") 以便与PX4一起使用。

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**):  <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
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

<a id="rosgazebo"></a>

## FastRTPS 安装

This section explains how to install [ROS](../ros/README.md) "Melodic" and PX4 on Ubuntu 18.04.

:::warning ROS
builds are tied to specific Ubuntu versions! ROS Melodic can *only* install on Ubuntu 18.04.
:::

To install the development toolchain:

1. Download the script in a bash shell: <!-- NEED px4_version -->
   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. 下载脚本
   ```bash
   ROS Gazebo: http://wiki.ros.org/kinetic/Installation/Ubuntu
   ```
   随着脚本的运行，可能需要确认一些提示。

:::note
* ROS Kinetic 默认与 Gazebo 7 一起安装（为了简化 ROS 的开发，我们使用的默认而不是 Gazebo 8）。
* 你的 catkin （ROS 构建系统）工作目录生成在**~/catkin_ws/**。
* The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::

<a id="fast_dds"></a>
<a id="fast_rtps"></a>

## 模拟器依赖

[eProsima Fast DDS](https://github.com/eProsima/Fast-DDS) is required if you're using PX4 with ROS2 (or some other RTPS/DDS system).

Follow the instructions in [Fast DDS Installation](../dev_setup/fast-dds-installation.md) to install it.


## Gazebo dependencies

Once you have finished setting up the command-line toolchain:
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::
- Continue to the [build instructions](../dev_setup/building_px4.md).
