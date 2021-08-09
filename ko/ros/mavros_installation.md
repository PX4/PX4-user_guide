# ROS/MAVROS 설치 가이드

[mavros](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)는 MAVLink 지원 자동조종장치, 지상국 또는 주변 장치에 대해 ROS(1)를 실행하는 컴퓨터 간에 MAVLink 확장 통신을 가능하게 하는 ROS(1) 패키지입니다. *MAVROS*는 ROS(1)와 MAVLink 프로토콜 간의 "공식" 지원 브리지입니다.

MAVROS를 사용하여 모든 MAVLink 지원 자동 조종 장치와 통신할 수 있지만, PX4 자동조종장치와 ROS(1) 지원 컴퓨터 간의 통신 설정 방법을 설명합니다.

:::tip
Ubuntu Linux에서 ROS로 PX4 시뮬레이션을 설정하는 가장 쉬운 방법은 표준 설치 스크립트를 사용하는 것입니다. 스크립트는 [Linux의 개발 환경 > ROS Gazebo](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)를 참고하십시오.

스크립트는 이 주제에서 다루는 설치 지침을 자동화하여, PX4, ROS, Gazebo 시뮬레이터 및 [MAVROS](../ros/mavros_installation.md)에 필요한 것들을 설치합니다.
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
While the package can be built using **catkin_make** the preferred method is using **catkin_tools** as it is a more versatile and "friendly" build tool.
:::

If this is your first time using wstool you will need to initialize your source space with:
```sh
$ wstool init ~/catkin_ws/src
```

Now you are ready to do the build
1. Install MAVLink:
   ```
   Install MAVLink: 
     # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
     rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. Install MAVROS from source using either released or latest version:
   * Released/stable
     ```
     Latest source 
      sh
      rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```
   * Latest source
     ```sh
     rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```
     ```sh
     sh
  # For fetching all the dependencies into your catkin_ws, 
  # just add '--deps' to the above scripts, E.g.:
  #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. Create workspace & deps
   ```
   wstool merge -t src /tmp/mavros.rosinstall
 wstool update -t src -j4
 rosdep install --from-paths src --ignore-src -y
   ```

1. Install [GeographicLib](https://geographiclib.sourceforge.io/) datasets:
   ```
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. Build source
   ```
   catkin build
   ```

1. Make sure that you use setup.bash or setup.zsh from workspace.
   ```
   #Needed or rosrun can't find nodes from this workspace.
   source devel/setup.bash
   ```

In the case of error, there are addition installation and troubleshooting notes in the [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation).

## MAVROS Examples

The MAVROS [Offboard Control example](../ros/mavros_offboard.md), will show you the basics of MAVROS, from reading telemetry, checking the drone state, changing flight modes and controlling the drone.

:::note
If you have an example app using the PX4 Autopilot and MAVROS, we can help you get it on our docs.
:::
