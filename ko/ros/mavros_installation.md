---
canonicalUrl: https://docs.px4.io/main/ko/ros/mavros_installation
---

# ROS/MAVROS 설치 가이드

[mavros](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)는 MAVLink 지원 자동조종장치, 지상국 또는 주변 장치에 대해 ROS(1)를 실행하는 컴퓨터 간에 MAVLink 확장 통신을 가능하게 하는 ROS(1) 패키지입니다. *MAVROS*는 ROS(1)와 MAVLink 프로토콜 간의 "공식" 지원 브리지입니다.

MAVROS를 사용하여 모든 MAVLink 지원 자동 조종 장치와 통신할 수 있지만, PX4 자동조종장치와 ROS(1) 지원 컴퓨터 간의 통신 설정 방법을 설명합니다.

:::tip
Ubuntu Linux에서 ROS로 PX4 시뮬레이션을 설정하는 가장 쉬운 방법은 표준 설치 스크립트를 사용하는 것입니다. 스크립트는 [Linux의 개발 환경 > ROS Gazebo](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)를 참고하십시오.

The script automates the installation instructions covered in this topic, installing everything you need: PX4, ROS, the Gazebo simulator, and [MAVROS](../ros/mavros_installation.md).
:::

:::warning
Note PX4 개발 팀은 모든 사용자가 [ROS 2로 업그레이드](../ros/ros2.md)를 권장합니다. 이 문서는 "이전 접근 방식"을 설명합니다.
:::

## 자료

- [mavros ROS 패키지 요약](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros 소스](https://github.com/mavlink/mavros/)
- [ROS Melodic 설치 방법](http://wiki.ros.org/melodic/Installation)

## 설치

MAVROS는 소스나 실행파일로 설치할 수 있습니다. 개발자는 소스로 설치하는 것이 좋습니다.

:::tip
이 지침은 [공식 설치 가이드](https://github.com/mavlink/mavros/tree/master/mavros#installation)를 단순화한 버전입니다. 이 문서에서는 *ROS Melodic* 배포판을 다룹니다.
:::

### 바이너리 설치(Debian/Ubuntu)

ROS 저장소에는 Ubuntu x86, amd64(x86\_64) 및 armhf(ARMv7)용 바이너리 패키지가 있습니다. Kinetic은 Debian Jessie amd64 및 arm64(ARMv8)도 지원합니다.

`apt-get` 명령어를 사용하여 설치하십시오.

```
sudo apt-get install ros-kinetic-mavros ros-kinetic-mavros-extras
```

그런 다음, `install_geographiclib_datasets.sh` 스크립트를 실행하여 [GeographicLib](https://geographiclib.sourceforge.io/) 데이터세트를 설치합니다.

```
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh   
```

### 소스 설치

이 설치는 `~/catkin_ws`에 catkin 작업 공간에서 설치합니다.

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

이 설치에는 ROS Python 도구인 *wstool*(소스 검색용), *rosinstall* 및 *catkin_tools*(빌딩)를 사용할 것입니다. 다음 명령어를 사용하여 ROS를 설치할 수 있습니다.

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
   ```
   # 모든 ROS 배포판에 대해 Kinetic 참조를 사용합니다. 배포판에 국한되지 않고 최신 상태이기 때문입니다.
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. 릴리스 또는 최신 버전을 사용하여 소스에서 MAVROS를 설치합니다.
   * 출시/안정
     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```
   * 최신 소스
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

:::note
PX4와 MAVROS를 사용하는 예제 앱이 있으면, 문서에서 다운로드할 수 있도록 도와드릴 수 있습니다.
:::
