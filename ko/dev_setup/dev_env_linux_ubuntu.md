# 우분투 개발 환경

아래에서 Ubuntu Linux 18.04 amd 20.04에서 PX4 개발 환경에 대하여 설명합니다. 이 환경은 [대부분의 PX4 타켓](../dev_setup/dev_env.md#supported-targets) 빌드에 사용됩니다.
* Pixhawk와 기타 NuttX 기반 하드웨어
* [jMAVSim 시뮬레이션](../simulation/jmavsim.md)
* [가제보 시뮬레이션](../simulation/gazebo.md)
* [라즈베리파이](#raspberry-pi)
* [ROS(1)](#ros-gazebo)(로봇 운영 체제)
* [Fast DDS](../dev_setup/fast-dds-installation.md) - ROS2에 필요

:::tip
이 설정은 PX4 개발 팀에서 지원합니다.
:::

:::note PX4 개발을 지원하는 OS 버전은 [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) 18.04(Bionic Beaver)와 20.04(Focal Fossa)입니다. ROS(1)의 경우 Ubuntu LTS 18.04(전용)가 지원됩니다.

이 지침은 다른 Debian Linux 기반 시스템에서도 작동해야 하지만, 이는공식적으로 지원되지 않습니다.
:::

## 영상 가이드

이 동영상은 [PX4 소프트웨어 빌드](../dev_setup/building_px4.md)에서 다루는 기본 테스트와 함께 NuttX 및 시뮬레이션 대상([아래에서 설명](#gazebo-jmavsim-and-nuttx-pixhawk-targets))을 위한 도구 모음 설치 방법을 보여줍니다.

@[유투브](https://youtu.be/OtValQdAdrU)

## Bash 스크립트

다양한 플랫폼에서 개발 환경을 쉽게 설치하는 Bash 스크립트가 제공됩니다. 그것들은 *깨끗한* Ubuntu LTS 설치본에서 실행하기 위한 것입니다.

| 스크립트                                                                                                                             | 설명                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)**                                          | [Gazebo 9](../simulation/gazebo.md) 및 [jMAVSim](../simulation/jmavsim.md) 시뮬레이터과 [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) 도구를 설치합니다. [Fast DDS](#fast-dds-installation)에 대한 종속성을 포함하지 않습니다. <!-- NEED px4_version -->
|
| **[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)** | Ubuntu 18.04 LTS **에만** [ROS "Melodic"](#rosgazebo) 및 PX4를 설치합니다.<br>Ubuntu 20.04</2> 이상에서는 사용하지 마십시오!                                                                                                                                                    |

:::note
스크립트가 기존 시스템의 "상단에" 설치된 경우 또는 다른 Ubuntu 릴리스에 설치된 경우 작동하지 *않을 수 있습니다*.
:::

## Gazebo, JMAVSim 및 NuttX(Pixhawk) 타겟

[ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) 스크립트를 사용하여 [Gazebo 9](../simulation/gazebo.md) 및 [jMAVSim](../simulation/jmavsim.md) 시뮬레이터와 [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) 도구 모음의 개발 환경을 설정합니다.

:::warning ROS
사용자는 [ROS/Gazebo](#rosgazebo)에 대한 지침을 따라야 합니다.<!-- ROS installs Gazebo automatically, as part of the ROS installation). -->:::

툴체인을 설치하려면:

1. [PX4 소스 코드 다운로드합니다](../dev_setup/building_px4.md):
   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```
1. 인수 없이 (bash 셸에서) **ubuntu.sh**를 실행합니다.
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - 스크립트가 진행되는 동안 모든 프롬프트를 확인합니다.
   - `--no-nuttx` 및 `--no-sim-tools` 옵션을 사용하여 NuttX 및/또는 시뮬레이션 도구를 생략할 수 있습니다.
1. 완료되면 컴퓨터를 재부팅합니다.

::: details
정보용 참고사항
- 스크립트는 Gazebo 9를 설치합니다([gazebosim.org 지침](http://gazebosim.org/tutorials?tut=install_ubuntu&cat=install)에 따름). Gazebo 7, 8도 지원되지만 권장되지는 않습니다.
- You can verify the NuttX installation by confirming the gcc version as shown:
  ```bash
   $arm-none-eabi-gcc --version

   arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
   Copyright (C) 2017 Free Software Foundation, Inc.
   This is free software; see the source for copying conditions.  There is NO
   warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- You're going to need the PX4 source code anyway. But if you just wanted to set up the development environment without getting all the source code you could instead just download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) and then run **ubuntu.sh**:<!-- NEED px4_version -->   ```bash
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

Install the dependencies for [jMAVSim Simulation](../simulation/jmavsim.md).

:::warning
To build for Ubuntu 20.04 (focal) you must use docker (the GCC toolchain on Ubuntu 20.04 can build PX4, but the generated binary files are too new to run on actual Pi). For more information see [PilotPi with Raspberry Pi OS Developer Quick Start > Alternative build method using docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

To get the common dependencies for Raspberry Pi:

1. Download [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)<!-- NEED px4_version -->and [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) from the PX4 source repository (**/Tools/setup/**): <!-- NEED px4_version -->    ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
   ```
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

Set them as default:

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

First install GCC (needed to use clang).

{% include "_gcc_toolchain_installation.md" %}
```
# optional python tools
sudo -H pip install pyulog
```

After setting up the build/simulation toolchain, see [Additional Tools](../setup/generic_dev_tools.md) for information about other useful tools.
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
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md).

<a id="rosgazebo"></a>

## FastRTPS installation

This section explains how to install [ROS](../ros/README.md) "Melodic" and PX4 on Ubuntu 18.04.

:::warning ROS
builds are tied to specific Ubuntu versions! ROS Melodic can *only* install on Ubuntu 18.04.
:::

To install the development toolchain:

1. Download the script in a bash shell:  <!-- NEED px4_version -->
   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. Download the desired script
   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   You may need to acknowledge some prompts as the script progresses.

:::note
* ROS Kinetic is installed with Gazebo7 by default (we have chosen to use the default rather than Gazebo 8 to simplify ROS development).
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
