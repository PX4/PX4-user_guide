# Ubuntu LTS/Debian Linux 的开发环境

[Ubuntu linux lts](https://wiki.ubuntu.com/LTS)（16.04）是标准的/首选的 Linux 开发操作系统。 Linux允许您构建[所有PX4目标](../setup/dev_env.md#supported-targets)（基于NuttX的硬件、高通骁龙飞控硬件、基于Linux的硬件、仿真、ROS）。

以下说明说明了如何 *手动* 设置每个受支持的目标的开发环境。
- **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_common_deps.sh" target="_blank" download>ubuntu_sim_common_deps.sh</a>**：[通用依赖](#common-dependencies)，[jMAVSim](#jmavsim) 模拟器 Does not include dependencies for [FastRTPS](#fast_rtps).
- **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_gazebo.sh" target="_blank" download>ubuntu_sim_ros_gazebo.sh</a>**: **ubuntu_sim_common_deps.sh** + [ROS/Gazebo and MAVROS](#rosgazebo).

> **Tip** 该脚本已经在全新Ubuntu 16.04安装测试通过。 如果安装在除上述提到的系统或其他Ubuntu版本上，则它们*可能*无法正常工作。

The instructions below explain how to download and use the scripts.

<a id="sim_nuttx"></a>

## 一键安装脚本

这些脚本是:

使用脚本：

1. [Download PX4 Source Code](../setup/building_px4.md):
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. 运行 bash 脚本（比如运行 **ubuntu_sim.sh** ）： bash source ubuntu_sim.sh 所有弹出的提示均确认通过。
   ```bash
   bash ./Tools/setup/ubuntu.sh
   ```
   - Acknowledge any prompts as the script progress.
   - You can use the `--no-nuttx` and `--no-sim-tools` to omit the nuttx and/or simulation tools.
1. Restart the computer on completion.

> **Tip** 在设置构建/模拟工具链之后，有关其他有用工具的信息，请参阅 [附加工具](../setup/generic_dev_tools.md)。

用户应先加入组 ”dialout“：
- ** Note** PX4兼容Gazebo7、8和9。 上面的 [安装说明](http://gazebosim.org/tutorials?tut=install_ubuntu&cat=install) 是关于安装 Gazebo 9 的。
- **Note** 如果您要使用 ros，请按照以下部分中的 [ROS/Gazebo](#rosgazebo) 说明操作（这些操作将自动安装 gazebo，作为 ros 安装的一部分）。
- You can verify the the NuttX installation by confirming the gcc version as shown:
  ```bash
   $arm-none-eabi-gcc --version

   arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
   Copyright (C) 2017 Free Software Foundation, Inc.
   This is free software; see the source for copying conditions.  There is NO
   warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```


<!-- Do we need to add to our scripts or can we assume correct version installs over?
Remove any old versions of the arm-none-eabi toolchain.
```sh
sudo apt-get remove gcc-arm-none-eabi gdb-arm-none-eabi binutils-arm-none-eabi gcc-arm-embedded
sudo add-apt-repository --remove ppa:team-gcc-arm-embedded/ppa
```
-->

<a id="raspberry-pi-hardware"></a>

## 权限设置

The following instructions explain how to set up a build toolchain for RasPi on *Ubuntu 18.04*.

> **Warning** To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS
# ROS Kinetic/Gazebo

更新包列表，并且安装以下依赖：

1. 有关在树莓派上使用 PX4（包括本地构建 PX4）的其他开发人员信息，请参见此处：[Raspberry pi 2/navio2 autopilot](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html)。
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

以下说明可用于将 FastRTPS 1.5 二进制文件安装到您的主目录中。

We recommend you to get clang from the Ubuntu software repository, as shown below:
```
# optional python tools
sudo -H pip install pyulog
```

为 [jMAVSim Simulation](../simulation/jmavsim.md) 安装依赖。
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

为 [jMAVSim Simulation](../simulation/gazebo.md) 安装依赖。

- [Raspberry Pi 2/3 Navio2 Autopilot](https://docs.px4.io/master/en/flight_controller/raspberry_pi_navio2.html).
- 在安装[高通骁龙飞控](#snapdragon-flight) 或 [树莓派/Parrot Bebop](#raspberry-pi-hardware) 之前， 你可以先运行它。

<a id="rosgazebo"></a>

## ROS/Gazebo

This section explains how to install [ROS/Gazebo](../ros/README.md) ("Melodic") for use with PX4.

To install the development toolchain:

1. **<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim.sh" target="_blank" download>ubuntu_sim.sh</a>**: **ubuntu_sim_common_deps.sh** + [Gazebo8](#gazebo) 模拟器。
1. 下载脚本
   ```bash
   ROS Gazebo: http://wiki.ros.org/kinetic/Installation/Ubuntu
   ```
   You may need to acknowledge some prompts as the script progresses.

```sh
* ROS Kinetic 默认与 Gazebo 7 一起安装（为了简化 ROS 的开发，我们使用的默认而不是 Gazebo 8）。
* 你的 catkin （ROS 构建系统）工作目录生成在**~/catkin_ws/**。
* 这些说明来自 ROS Wiki [Ubuntu 页 ](http://wiki.ros.org/kinetic/Installation/Ubuntu)。



## 通用依赖

sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y
* [开发环境](https://docs.px4.io/master/en/flight_controller/snapdragon_flight_dev_environment_installation.html)
* [软件安装](https://docs.px4.io/master/en/flight_controller/snapdragon_flight_software_installation.html)
* [配置](https://docs.px4.io/master/en/flight_controller/snapdragon_flight_configuration.html)

<a id="fast_rtps"></a>

## FastRTPS 安装

[eProsima Fast RTPS](http://eprosima-fast-rtps.readthedocs.io/en/latest/) 是 RTPS协议的 C++ 实现库。 通过 [RTPS/ROS2 接口: px4-frtps bridge ](../middleware/micrortps.md) 使用 FastRTPS，允许与离板组件共享 PX4 uORB 话题。

sudo apt-get update


## 模拟器依赖

sudo apt-get install ros-kinetic-desktop-full -y

## Gazebo dependencies

sudo rosdep init rosdep update
