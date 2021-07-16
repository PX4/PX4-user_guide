# JSBSim 시뮬레이션

[JSBSim](http://jsbsim.sourceforge.net/index.html)은 Microsoft Windows, Apple Macintosh, Linux, IRIX, Cygwin(Windows의 Unix) 등에서 실행되는 오픈 소스 비행 시뮬레이터("비행 역학 모델(FDM)")입니다. 주요 특징은 다음과 같습니다: 완전히 구성 가능한 공기 역학 및 항공기의 복잡한 비행 역학을 모델링할 수 있는 추진 시스템. 지구 회전 효과도 역학으로 모델링됩니다.


**지원 차량:** 고정익, 쿼드콥터, 헥사콥터

@[유투브](https://youtu.be/y5azVNmIVyw)

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

<a id="installation"></a>

## Installation (Ubuntu Linux)

:::note
These instructions were tested on Ubuntu 18.04
:::

1. Install the usual [Development Environment on Ubuntu LTS / Debian Linux](../dev_setup/dev_env_linux_ubuntu.md).
1. Install a JSBSim release from the [release page](https://github.com/JSBSim-Team/jsbsim/releases/tag/Linux):
   ```sh
   dpkg -i JSBSim-devel_1.1.0.dev1-<release-number>.bionic.amd64.deb
   ```
1. (Optional) FlightGear may (optionally) be used for visualisation. To install FlightGear, refer to the [FlightGear installation instructions](../simulation/flightgear.md)).

<a id="running"></a>

## Running the Simulation

JSBSim SITL simulation can be conveniently run through a `make` command as shown below:
```sh
cd /path/to/PX4-Autopilot
make px4_sitl jsbsim
```
This will run both the PX4 SITL instance and the FlightGear UI (for visualization). If you want to run without the FlightGear UI, you can add `HEADLESS=1` to the front of the `make` command.

The supported vehicles and `make` commands are listed below (click on the links to see the vehicle images).

| Vehicle        | Command                            |
| -------------- | ---------------------------------- |
| Standard Plane | `make px4_sitl jsbsim_rascal`      |
| Quadrotor      | `make px4_sitl jsbsim_quadrotor_x` |
| Hexarotor      | `make px4_sitl jsbsim_hexarotor_x` |

The commands above launch a single vehicle with the full UI. *QGroundControl* should be able to automatically connect to the simulated vehicle.

## Running JSBSim with ROS

To run JSBSim with ROS:

1. Clone the `px4-jsbsim-bridge` package into your catkin workspace:
   ```
   cd <path_to_catkin_ws>/src
   git clone https://github.com/Auterion/px4-jsbsim-bridge.git
   ```
1. Build the  `jsbsim_bridge` catkin package:
   ```
   catkin build jsbsim_bridge
   ```
:::note
You must have already set MAVROS in your workspace (if not, follow the instructions in the [MAVROS installation guide](../ros/mavros_installation.md)).
:::
1. So start JSBSim through ROS using the launch file as shown:
   ```
   roslaunch jsbsim_bridge px4_jsbsim_bridge.launch
   ```

## Further Information

* [px4-jsbsim-bridge readme](https://github.com/Auterion/px4-jsbsim-bridge)
