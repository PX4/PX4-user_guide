---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_linux_ubuntu
---

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
- 다음과 같이 gcc 버전을 확인하여 NuttX 설치를 확인할 수 있습니다.
  ```bash
   $arm-none-eabi-gcc --version

   arm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 7.2.1 20170904 (release) [ARM/embedded-7-branch revision 255204]
   Copyright (C) 2017 Free Software Foundation, Inc.
   This is free software; see the source for copying conditions.  There is NO
   warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```
- 어쨌든 PX4 소스 코드가 필요합니다. 그러나 모든 소스 코드를 가져오지 않고 개발 환경을 설정하려는 경우 대신 [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh) 및 [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt)를 다운로드한 다음 **ubuntu.sh**를 실행할 수 있습니다.:<!-- NEED px4_version -->   ```bash
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

## 라즈베리파이

다음 지침은 *Ubuntu 18.04*에서 라즈베리파이용 빌드 도구 설정 방법을 설명합니다.

:::warning
Ubuntu 20.04(focal)용으로 빌드하려면 docker를 사용하여야 합니다(Ubuntu 20.04의 GCC 도구 체인은 PX4를 빌드할 수 있지만 생성된 바이너리 파일은 실제 라즈베리파이에서 실행하기에는 너무 새롭습니다). 자세한 내용은 [PilotPi with Raspberry Pi OS 개발자 빠른 시작 > docker를 사용한 대체 빌드 방법](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker)을 참고하십시오.
:::

라즈베리파이에 대한 공통 종속성을 얻으려면:

1. [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/ubuntu.sh)와<!-- NEED px4_version -->PX4 소스 저장소의 [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/master/Tools/setup/requirements.txt) (**/Tools/setup/**)를 다운로드합니다. <!-- NEED px4_version -->    ```
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

<a id="rosgazebo"></a>

## ROS/Gazebo

이 섹션에서는 Ubuntu 18.04에서 [ROS](../ros/README.md) "Melodic"과 PX4를 설치 방법을 설명합니다.

:::warning ROS
빌드는 특정 Ubuntu 버전에 연결되어 있습니다! ROS Melodic은 Ubuntu 18.04에만 *설치*할 수 있습니다.
:::

개발 툴체인을 설치하려면:

1. bash 셸에서 스크립트를 다운로드합니다.  <!-- NEED px4_version -->
   ```bash
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```
1. 스크립트를 실행하십시오:
   ```bash
   bash ubuntu_sim_ros_melodic.sh
   ```
   스크립트가 진행되는 동안 일부 프롬프트를 확인하여야 합니다.

:::note
* ROS Melodic은 기본적으로 Gazebo9와 함께 설치됩니다.
* catkin(ROS 빌드 시스템) 작업 공간은 **~/catkin_ws/**에 생성됩니다.
* 스크립트는 ROS Wiki "Melodic" [Ubuntu 페이지](http://wiki.ros.org/melodic/Installation/Ubuntu)의 지침을 사용합니다.
:::

<a id="fast_dds"></a>
<a id="fast_rtps"></a>

## Fast DDS 설치

ROS2(또는 일부 다른 RTPS/DDS 시스템)와 함께 PX4를 사용하는 경우 [eProsima Fast DDS](https://github.com/eProsima/Fast-DDS)가 필요합니다.

[Fast DDS 설치](../dev_setup/fast-dds-installation.md) 방법에 따라 설치합니다.


## 다음 단계

명령줄 도구 모음 설정후, 다음을 수행합니다.
- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- [QGroundControl 일일 빌드](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) 설치 :::tip *일일 빌드*에는 릴리스 빌드에 숨겨진 개발 도구가 포함됩니다. 또한, 릴리스 빌드에서 아직 지원되지 않는 새로운 PX4 기능에 대한 액세스를 제공할 수도 있습니다.
:::
- [빌드 지침](../dev_setup/building_px4.md)을 계속 진행합니다.
