# ROS (1) with MAVROS Installation Guide

:::warning
The PX4 development team recommend that all users [upgrade to ROS 2](../ros2/index.md). 이 문서는 "이전 접근 방식"을 설명합니다.
:::

This documentation explains how to set up communication between the PX4 Autopilot and a ROS 1 enabled companion computer using MAVROS.

[MAVROS](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) is a ROS 1 package that enables MAVLink extendable communication between computers running ROS 1 for any MAVLink enabled autopilot, ground station, or peripheral. _MAVROS_ is the "official" supported bridge between ROS 1 and the MAVLink protocol.

First we install PX4 and ROS, and then MAVROS.

## Install ROS and PX4

This section explains how to install [ROS 1](../ros/index.md) with PX4. ROS 1 full desktop builds come with Gazebo Classic, so normally you will not install the simulator dependencies yourself!

:::tip
이 지침은 [공식 설치 가이드](https://github.com/mavlink/mavros/tree/master/mavros#installation)를 단순화한 버전입니다. They cover the _ROS Melodic and Noetic_ releases.
:::

:::: tabs

::: tab ROS Noetic (Ubuntu 22.04)

If you're working with [ROS Noetic](http://wiki.ros.org/noetic) on Ubuntu 20.04:

1. Install PX4 without the simulator toolchain:

   1. [Download PX4 Source Code](../dev_setup/building_px4.md):

      ```sh
      git clone https://github.com/PX4/PX4-Autopilot.git --recursive
      ```

   1. Run the **ubuntu.sh** the `--no-sim-tools` (and optionally `--no-nuttx`):

      ```sh
      bash ./PX4-Autopilot/Tools/setup/ubuntu.sh --no-sim-tools --no-nuttx
      ```

      - Acknowledge any prompts as the script progress.

   1. Restart the computer on completion.

1. You _may_ need to install the following additional dependencies:

   ```sh
   sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y
   ```

1. Follow the [Noetic Installation instructions](http://wiki.ros.org/noetic/Installation/Ubuntu#Installation) (ros-noetic-desktop-full is recommended).

:::

::: tab ROS Melodic (Ubuntu 18.04)

If you're working with ROS "Melodic on Ubuntu 18.04:

1. Download the [ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh) script in a bash shell:

   ```sh
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```

1. Run the script:

   ```sh
   bash ubuntu_sim_ros_melodic.sh
   ```

   You may need to acknowledge some prompts as the script progresses.

::: tip
You don't need to install MAVROS (as shown below), as this is included by the script

   Also note:
   - ROS Melodic is installed with Gazebo (Classic) 9 by default.
   - Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
   - The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::

::::

## Install MAVROS

Then MAVROS can be installed either from source or binary. 개발자는 소스로 설치하는 것이 좋습니다.

#### 바이너리 설치(Debian/Ubuntu)

The ROS repository has binary packages for Ubuntu x86, amd64 (x86_64) and armhf (ARMv7). Kinetic은 Debian Jessie amd64 및 arm64(ARMv8)도 지원합니다.

Use `apt-get` for installation, where `${ROS_DISTRO}` below should resolve to `kinetic` or `noetic`, depending on your version of ROS:

```sh
sudo apt-get install ros-${ROS_DISTRO}-mavros ros-${ROS_DISTRO}-mavros-extras ros-${ROS_DISTRO}-mavros-msgs
```

그런 다음, `install_geographiclib_datasets.sh` 스크립트를 실행하여 [GeographicLib](https://geographiclib.sourceforge.io/) 데이터세트를 설치합니다.

```sh
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh
```

#### 소스 설치

이 설치는 `~/catkin_ws`에 catkin 작업 공간에서 설치합니다.

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

You will be using the ROS Python tools: _wstool_ (for retrieving sources), _rosinstall_, and _catkin_tools_ (building) for this installation. 다음 명령어를 사용하여 ROS를 설치할 수 있습니다.

```sh
sudo apt-get install python-catkin-tools python-rosinstall-generator -y
```

:::tip
패키지는 **catkin_make**를 사용하여 빌드할 수 있지만, 선호하는 방법은 **catkin_tools**를 사용하는 것입니다. 이는 편리한 빌드 도구이기 때문입니다.
:::

wstool을 처음 사용하는 경우 다음을 사용하여 소스 공간을 초기화합니다.

```sh
$ wstool init ~/catkin_ws/src
```

Now you are ready to do the build:

1. MAVLink를 설치합니다.

   ```sh
   # 모든 ROS 배포판에 대해 Kinetic 참조를 사용합니다. 배포판에 국한되지 않고 최신 상태이기 때문입니다.
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```

1. 릴리스 또는 최신 버전을 사용하여 소스에서 MAVROS를 설치합니다.

   - 출시/안정

     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```

   - 최신 소스

     ```sh
     rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```

     ```sh
     # For fetching all the dependencies into your catkin_ws,
     # just add '--deps' to the above scripts, E.g.:
     #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. 작업 공간과 의존성 만들기

   ```sh
   wstool merge -t src /tmp/mavros.rosinstall
   wstool update -t src -j4
   rosdep install --from-paths src --ignore-src -y
   ```

1. [GeographicLib](https://geographiclib.sourceforge.io/) 데이터세트를 설치합니다.

   ```sh
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. 소스를 빌드합니다.

   ```sh
   catkin build
   ```

1. 작업 공간에서 setup.bash 또는 setup.zsh를 사용하는지 확인하십시오.

   ```sh
   #Needed 또는 rosrun이 이 작업 공간에서 노드를 찾을 수 없습니다.
   source devel/setup.bash
   ```

오류가 발생하면, [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation)에서 추가 설치 및 문제 해결을 참고하십시오.

## MAVROS 예제

The [MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md), will show you the basics of MAVROS, from reading telemetry, checking the drone state, changing flight modes and controlling the drone.

::: info
If you have an example app using the PX4 Autopilot and MAVROS, we can help you get it on our docs.
:::

## See Also

- [mavros ROS 패키지 요약](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros 소스](https://github.com/mavlink/mavros/)
- [ROS Melodic 설치 방법](http://wiki.ros.org/melodic/Installation)
