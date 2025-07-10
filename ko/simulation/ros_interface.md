---
canonicalUrl: https://docs.px4.io/main/ko/simulation/ros_interface
---

# ROS Gazebo 시뮬레이션

[ROS](../ros/README.md)(로봇 운영 체제)는 PX4 및 [Gazebo 시뮬레이터](../simulation/gazebo.md)와 함께 사용할 수 있습니다. [MAVROS](../ros/mavros_installation.md) MAVLink 노드를 사용하여 PX4와 통신합니다.

ROS/Gazebo와 PX4의 통합은 아래 다이어그램의 패턴을 따릅니다(이는 *일반* [PX4 시뮬레이션 환경](../simulation/README.md#sitl-simulation-environment)을 나타냄). PX4는 시뮬레이터(예: Gazebo)와 통신하여 시뮬레이션된 세계에서 센서 데이터를 수신하고 모터 및 액추에이터 값을 전송합니다. GCS 및 Offboard API(예: ROS)와 통신하여 시뮬레이션된 환경에서 텔레메트리 데이터를 전송하고 명령을 수신합니다.

![PX4 SITL 개요](../../assets/simulation/px4_sitl_overview.png)

:::note
"정상 동작"과의 유일한 *약간의* 차이점은 ROS가 포트 14557에서 연결을 시작하지만, 오프보드 API가 UDP 포트 14540에서 연결을 수신 대기하는 것이 더 일반적입니다. 스크립트는 필요한 모든 구성 항목, PX4, ROS "키네틱", 가제보 7 모의 시험 환경, [MAVROS](../ros/mavros_installation.md)를 설치합니다.

## ROS와 가제보 설치

:::note
*ROS*는 Linux(MacOS와 Windows 제외)에서만 지원됩니다.
:::

Ubuntu Linux에서 ROS로 PX4 시뮬레이션을 설정하는 가장 쉬운 방법은 [Linux의 개발 환경 > ROS Gazebo](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)의 표준 설치 스크립트를 사용하는 것입니다. 스크립트는 PX4, ROS "Melodic", Gazebo 9 시뮬레이터 및 [MAVROS](../ros/mavros_installation.md)와 같이 필요한 모든 것을 설치합니다.

:::note
스크립트는 Gazebo 9가 포함된 [표준 ROS "Melodic" 설치 지침](http://wiki.ros.org/melodic/Installation/Ubuntu)을 따릅니다. 이 기능을 지원하려면, 가제보를 적당한 ROS 래퍼와 함께 실행해야합니다.


## ROS 시뮬레이션 실행

아래 명령을 사용하여 시뮬레이션을 시작하고, [MAVROS](../ros/mavros_installation.md)를 통해 시뮬레이션에 ROS를 연결할 수 있습니다. 여기서 `fcu_url`은 시뮬레이션을 실행하는 컴퓨터의 IP/포트입니다.

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

localhost에 연결하려면 다음 URL을 사용하십시오.

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::note
It can be useful to call *roslaunch* with the `-w NUM_WORKERS` (override number of worker threads) and/or `-v` (verbose) in order to get warnings about missing dependencies in your setup. 예:
```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```
위에서 언급한 실행 파일 중 하를 여러분의 실행 파일 목록에 넣어 ROS 프로그램을 모의 시험 환경에서 실행할 수 있게 하십시오.

## ROS 래퍼로 Gazebo 실행

Gazebo 시뮬레이션을 수정하여 ROS 주제에 직접 게시하는 센서(예: Gazebo ROS 레이저 플러그인)를 통합할 수 있습니다. 이 기능을 지원하려면 적절한 ROS 래퍼로 Gazebo를 시작하여야 합니다.

ROS로 래핑된 시뮬레이션을 실행하는 데 사용할 수 있는 ROS 시작 스크립트가 있습니다.

* [posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/master/launch/posix_sitl.launch): plain SITL launch
* [mavros_posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/master/launch/mavros_posix_sitl.launch): SITL과 MAVROS

ROS에 래핑된 SITL을 실행하려면 ROS 환경을 업데이트한 다음, 평소와 같이 시작하여야 합니다.

(선택 사항): 소스에서 MAVROS 또는 다른 ROS 패키지를 컴파일한 경우에만 catkin 작업 공간을 소싱합니다.

```sh
cd <PX4-Autopilot_clone>
DONT_RUN=1 make px4_sitl_default gazebo
source ~/catkin_ws/devel/setup.bash    # (optional)
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/sitl_gazebo
roslaunch px4 posix_sitl.launch
```

위에서 언급한 시작 파일 중 하나를 자체 시작 파일에 포함하여, 시뮬레이션에서 ROS 애플리케이션을 실행합니다.

## 움직임 뒤에서 일어나는 일

이 섹션에서는 이전에 제공된 *roslaunch* 지침이 실제로 어떻게 작동하는 지 설명합니다(시뮬레이션 및 ROS를 수동으로 시작하려면 지침을 따를 수 있습니다).

아래 명령어를 사용하여 시뮬레이터를 시작합니다.

```sh
no_sim=1 make px4_sitl_default gazebo
```

콘솔 화면은 다음과 같이 나타납니다:
```sh
[init] shell id: 46979166467136
[init] task name: px4

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

Ready to fly.


INFO  LED::init
729 DevObj::init led
736 Added driver 0x2aba34001080 /dev/led0
INFO  LED::init
742 DevObj::init led
INFO  Not using /dev/ttyACM0 for radio control input. Assuming joystick input via MAVLink.
INFO  Waiting for initial data on UDP. Please start the flight simulator to proceed..
```

새 터미널에서 Gazebo 메뉴를 통해 Iris 모델을 삽입할 수 있는 지 확인하십시오. 이렇게 하려면, 적절한 `sitl_gazebo` 폴더를 포함하도록 환경 변수를 설정하십시오.

```sh
cd <PX4-Autopilot_clone>
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
```

이제 ROS로 작업할 때와 같이, Gazebo를 시작하고 Iris 쿼드콥터 모델을 삽입합니다. Iris가 로드되면 자동으로 px4 앱에 연결됩니다.

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/sitl_gazebo/worlds/iris.world
```
