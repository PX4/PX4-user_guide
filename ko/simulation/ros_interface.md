# 가제보 모의 시험 환경의 ROS

[ROS](../ros/README.md) (로봇 운영체제)는 PX4와 [가제보 모의 시험 환경](../simulation/gazebo.md)을 함께 쓸 수 있습니다. ROS는 PX4와 통신하는 [MAVROS](../ros/mavros_installation.md) MAVLink 노드를 활용합니다.

ROS/가제보의 PX4와의 통합시 다음 다이어그램 패턴을 따릅니다(*일반* [PX4 모의 시험 환경](../simulation/README.md#sitl-simulation-environment)을 보여줍니다). PX4는 모의 시험 환경(예: 가제보)과 통신하여 모의 환경으로부터 오는 센서 데이터를 받고 모터와 액츄에이터 값을 내보냅니다. 지상 통제 장치와 모의 환경과 수신 명령으로부터 텔레메트리 전송을 시행하는 보드 외부 장치 API(예: ROS)와 통신을 수행합니다.

![PX4 SITL 개요](../../assets/simulation/px4_sitl_overview.png)

> **Note** "보통 동작"과 유일하게 *약간* 다른점이라면, ROS는 14557 포트로 연결을 수립합니다. 반면에 더 일반적인 보드 외부 장치 API에서는 UDP 포트 14540에서 연결을 기다립니다.


## ROS와 가제보 설치

> **Note** *ROS* 는 리눅스만 지원합니다 (macOS 또는 윈도우는 아님).

우분투 리눅스에서 ROS로 PX4 모의 시험 환경을 구성하는 가장 쉬운 방법은 [리눅스 개발 환경 > ROS와 가제보](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)에서 찾을 수 있는 표준 설치 스크립트의 활용입니다. 스크립트는 필요한 모든 구성 항목, PX4, ROS "키네틱", 가제보 7 모의 시험 환경, [MAVROS](../ros/mavros_installation.md)를 설치합니다.

> **Note** 스크립트는 가제보 7에 해당하는 <0>표준 ROS "키네틱" 설치 방법</a>을 따릅니다.


## ROS/모의 시험 환경 실행

아래 명령은 모의 시험 환경을 실행하고 ROS에 [MAVROS](../ros/mavros_installation.md)로 연결할 때 활용할 수 있습니다. 여기서 `fcu_url`은 모의 시험 환경을 실행하는 컴퓨터의 IP 주소 및 포트번호입니다:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

localhost에 연결하려면 아래 URL을 활용하십시오:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

> **Tip** `-w`(경고) 옵션과 `-v`(자세한 출력) 옵션을 주어 *roslaunch* 을 실행하면 설정 과정 중 빠진 의존성 경고를 확인해볼 수 있습니다. 예를 들어: 
> 
> ```sh
  roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```


## ROS 래퍼로 가제보 실행

가제보 모의 시험 환경은 ROS 토픽에 데이터를 직접 내보내는 센서를 붙일 용도로 수정할 수 있습니다. 예를 들면 가제보 ROS 레이저 플러그인이 있습니다. 이 기능을 지원하려면, 가제보를 적당한 ROS 래퍼와 함께 실행해야합니다.

ROS에 래핑한 모의 시험 환경을 실행할 수 있는 ROS 실행 스크립트가 있습니다:

* [posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/master/launch/posix_sitl.launch): 생짜 SITL 실행
* [mavros_posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/master/launch/mavros_posix_sitl.launch): SITL과 MAVROS

ROS에 래핑한 SITL을 실행하려면 ROS 환경을 업데이트한 후 늘상 하던 방식대로 실행하십시오:

(추가): MAVROS또는 다른 ROS 패키지를 소스로부터 컴파일했을 경우 catkin 작업 영역만을 source 명령으로 지정하십시오:

```sh
cd <PX4-Autopilot_clone>
DONT_RUN=1 make px4_sitl_default gazebo
source ~/catkin_ws/devel/setup.bash    # (optional)
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/sitl_gazebo
roslaunch px4 posix_sitl.launch
```

위에서 언급한 실행 파일 중 하를 여러분의 실행 파일 목록에 넣어 ROS 프로그램을 모의 시험 환경에서 실행할 수 있게 하십시오.

## 움직임 뒤에서 일어나는 일

이 절에서는 *roslaunch*가 앞에서 안내한 과정에 대해 어떻게 실제로 동작하는지를 보여줍니다(모의 시험 환경과 ROS를 직접 실행할 때 이 과정을 따라갈 수 있습니다).

우선 아래 명령으로 모의 시험 환경을 시작하십시오:

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

이제 새 터미널에서 가제보 메뉴를 통해 아이리스 모델을 넣을 수 있는지 확인하십시오. 이 과정을 수행하려면 적당한 `sitl_gazebo` 폴더를 환경 변수에 설정하십시오.

```sh
cd <Firmware_clone>
source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
```

이제 ROS로 동작하며 아이리스 쿼드콥터 모델을 넣은 가제보를 시작하십시오. 아이리스를 불러오면 PX4 앱에 자동으로 연결합니다.

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/sitl_gazebo/worlds/iris.world
```
