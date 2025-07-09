---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_linux_ubuntu
---

# 우분투 개발 환경

The following instructions set up a PX4 development environment on the [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) versions supported by PX4. This includes: 18.04 (Bionic Beaver), 20.04 (Focal Fossa), and Ubuntu 22.04 (Jammy Jellyfish).

Bash scripts are provided to simplify the process. They are intended to be run on *clean* Ubuntu LTS installations, and may not work if run "on top" of an existing system, or on a different Ubuntu release.

The [supported targets](../dev_setup/dev_env.md#supported-targets) are:

- [Simulation and NuttX (Pixhawk) Targets](#simulation-and-nuttx-pixhawk-targets). This includes: [Gazebo](../sim_gazebo_gz/README.md), [Gazebo Classic](../sim_gazebo_classic/README.md), [jMAVSim](../simulation/jmavsim.md), [Pixhawk and other NuttX-based hardware](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards)).
- [라즈베리파이](#raspberry-pi)
- [ROS 2](#ros-2) (Robotics Operating System)
- [ROS 1](#ros-gazebo-classic) (Robotics Operating System)

:::tip
이 설정은 PX4 개발 팀에서 지원합니다.
The instructions may also work on other Debian Linux based systems.
:::

## 영상 가이드

This video shows how to install the toolchain for NuttX and simulation targets ([as covered below](#simulation-and-nuttx-pixhawk-targets)) along with the basic testing covered in [Building PX4 Software](../dev_setup/building_px4.md).

@[youtube](https://youtu.be/OtValQdAdrU).

## Simulation and NuttX (Pixhawk) Targets

:::warning ROS
users should first read/skip ahead to the [ROS/Gazebo](#rosgazebo) or [ROS 2](#ros-2) sections.
:::

Use the [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/Tools/setup/ubuntu.sh) script to set up a development environment that allows you to build for simulators and/or the [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) toolchain. The script installs [jMAVSim](../simulation/jmavsim.md) on all targets, [Gazebo Classic](../sim_gazebo_classic/README.md) 9 on Ubuntu 18.04, Gazebo Classic 11 on Ubuntu 20.04, and [Gazebo](../sim_gazebo_gz/README.md) "Garden" on Ubuntu 22.04.

툴체인을 설치하려면:

1. [PX4 소스 코드 다운로드합니다](../dev_setup/building_px4.md):

   ```bash
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```

:::note
The environment setup scripts in the source usually work for recent PX4 releases. If working with an older version of PX4 you may need to [get the source code specific to your release](../contribute/git_examples.md#get-a-specific-release).
:::
1. 인수 없이 (bash 셸에서) **ubuntu.sh**를 실행합니다.
   ```bash
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```
   - 스크립트가 진행되는 동안 모든 프롬프트를 확인합니다.
   - `--no-nuttx` 및 `--no-sim-tools` 옵션을 사용하여 NuttX 및/또는 시뮬레이션 도구를 생략할 수 있습니다.
1. 완료되면 컴퓨터를 재부팅합니다.


:::details
Additional notes These notes are provided "for information only":
- If you want to use Gazebo on Ubuntu 20.04 you can add it manually. See [Gazebo > Installation](../sim_gazebo_gz/README.md#installation-ubuntu-linux).
- 다음과 같이 gcc 버전을 확인하여 NuttX 설치를 확인할 수 있습니다.

  ```bash
  $arm-none-eabi-gcc --version

  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 9-2020-q2-update) 9.3.1 20200408 (release)
  Copyright (C) 2019 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- 어쨌든 PX4 소스 코드가 필요합니다. 그러나 모든 소스 코드를 가져오지 않고 개발 환경을 설정하려는 경우 대신 [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) 및 [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt)를 다운로드한 다음 **ubuntu.sh**를 실행할 수 있습니다.:

   ```bash
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
   bash ubuntu.sh
   ```
   <!-- From https://gazebosim.org/docs/garden/install_ubuntu -->
:::


<a id="raspberry-pi-hardware"></a>

## 라즈베리파이

다음 지침은 *Ubuntu 18.04*에서 라즈베리파이용 빌드 도구 설정 방법을 설명합니다.

:::warning
Ubuntu 20.04(focal)용으로 빌드하려면 docker를 사용하여야 합니다(Ubuntu 20.04의 GCC 도구 체인은 PX4를 빌드할 수 있지만 생성된 바이너리 파일은 실제 라즈베리파이에서 실행하기에는 너무 새롭습니다). 자세한 내용은 [PilotPi with Raspberry Pi OS 개발자 빠른 시작 > docker를 사용한 대체 빌드 방법](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker)을 참고하십시오.
:::

라즈베리파이에 대한 공통 종속성을 얻으려면:

1. PX4 소스 저장소의 [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) (**/Tools/setup/**)를 다운로드합니다. <!-- NEED px4_version --> [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)와  <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/master/Tools/setup/requirements.txt
   ```
1. 터미널에서 **ubuntu.sh**를 실행하여 공통 종속성만 가져옵니다.
   ```bash
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. 그런 다음 다음 섹션에 설명된 대로 크로스 컴파일러(GCC 또는 clang)를 설정합니다.

### GCC (armhf)

Ubuntu 소프트웨어 리포지토리는 미리 컴파일된 도구 모음 세트를 제공합니다. Ubuntu Focal은 완전히 지원되지 않는 기본 설치로 `gcc-9-arm-linux-gnueabihf`를 제공하므로 `gcc-8-arm-linux-gnueabihf를 수동으로 설치`하고, 기본 도구 모음으로 설정합니다. 이 가이드는 이전 Ubuntu 릴리스(Bionic)에도 적용됩니다. 다음 지침에서는 arm-linux-gnueabihf 버전을 설치하지 않았다고 가정하고, `update-alternatives`를 사용하여 기본 실행 파일을 설정합니다. 터미널 명령을 사용하여 설치합니다.

```sh
sudo apt-get install -y gcc-8-arm-linux-gnueabihf g++-8-arm-linux-gnueabihf
```

기본값으로 설정합니다.

```sh
sudo update-alternatives --install /usr/bin/arm-linux-gnueabihf-gcc arm-linux-gnueabihf-gcc /usr/bin/arm-linux-gnueabihf-8 100 --slave /usr/bin/arm-linux-gnueabihf-g++ arm-linux-gnueabihf-g++ /usr/bin/arm-linux-gnueabihf-g++-8
sudo update-alternatives --config arm-linux-gnueabihf-gcc
```

### GCC (aarch64)

ARM64 장치용 PX4를 빌드하려면 이 섹션이 필요합니다.

```sh
sudo apt-get install -y gcc-8-aarch64-linux-gnu g++-8-aarch64-linux-gnu
sudo update-alternatives --install /usr/bin/aarch64-linux-gnu-gcc aarch64-linux-gnu-gcc /usr/bin/aarch64-linux-gnu-gcc-8 100 --slave /usr/bin/aarch64-linux-gnu-g++ aarch64-linux-gnu-g++ /usr/bin/aarch64-linux-gnu-g++-8
sudo update-alternatives --config aarch64-linux-gnu-gcc
```

### Clang (선택 사항)

먼저 GCC를 설치합니다(clang을 사용하여야 함).

아래와 같이 Ubuntu 소프트웨어 리포지토리에서 clang을 가져오는 것이 좋습니다.
```
sudo apt-get install clang
```

아래는 *CMake*를 사용하여 트리에서 PX4 펌웨어를 빌드하는 예제입니다.
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

### 상세 정보

라즈베리파이에서 PX4를 개발 정보(PX4 기본 빌드 포함)는 다음을 참고하십시오.

- [Raspberry Pi 2/3 Navio2 Autopilot](../flight_controller/raspberry_pi_navio2.md).
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md).


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

   1. [PX4 소스 코드 다운로드합니다](../dev_setup/building_px4.md):

      ```bash
      git clone https://github.com/PX4/PX4-Autopilot.git --recursive
      ```
   1. Run the **ubuntu.sh** the `--no-sim-tools` (and optionally `--no-nuttx`):

      ```bash
      bash ./PX4-Autopilot/Tools/setup/ubuntu.sh --no-sim-tools --no-nuttx
      ```
      - 스크립트가 진행되는 동안 모든 프롬프트를 확인합니다.
   1. 완료되면 컴퓨터를 재부팅합니다.
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
1. 스크립트를 실행하십시오:

   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   스크립트가 진행되는 동안 일부 프롬프트를 확인하여야 합니다.

:::note
* ROS Melodic is installed with Gazebo (Classic) 9 by default.
* catkin(ROS 빌드 시스템) 작업 공간은 **~/catkin_ws/**에 생성됩니다.
* 스크립트는 ROS Wiki "Melodic" [Ubuntu 페이지](http://wiki.ros.org/melodic/Installation/Ubuntu)의 지침을 사용합니다.
:::


## 다음 단계

명령줄 도구 모음 설정후, 다음을 수행합니다.
- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html) :::tip The *daily build* includes development tools that hidden in release builds. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::
- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.
