---
canonicalUrl: https://docs.px4.io/main/ko/simulation/jsbsim
---

# JSBSim 시뮬레이션

[JSBSim](http://jsbsim.sourceforge.net/index.html)은 Microsoft Windows, Apple Macintosh, Linux, IRIX, Cygwin(Windows의 Unix) 등에서 실행되는 오픈 소스 비행 시뮬레이터("비행 역학 모델(FDM)")입니다. 주요 특징은 다음과 같습니다: 완전히 구성 가능한 공기 역학 및 항공기의 복잡한 비행 역학을 모델링할 수 있는 추진 시스템. 지구 회전 효과도 역학으로 모델링됩니다.


**지원 차량:** 고정익, 쿼드콥터, 헥사콥터

@[유투브](https://youtu.be/y5azVNmIVyw)

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

<a id="installation"></a>

## 설치 (Ubuntu Linux)

:::note
이 매뉴얼은 Ubuntu 18.04에서 테스트되었습니다.
:::

1. 일반적인 [Ubuntu LTS/Debian Linux 개발 환경](../dev_setup/dev_env_linux_ubuntu.md)을 설치합니다.
1. [릴리스 페이지](https://github.com/JSBSim-Team/jsbsim/releases/tag/Linux)에서 JSBSim 릴리스를 설치합니다.
   ```sh
   dpkg -i JSBSim-devel_1.1.0.dev1-<release-number>.bionic.amd64.deb
   ```
1. (선택 사항) FlightGear는 시각화에 사용할 수 있습니다. FlightGear를 설치하려면 [FlightGear 설치 방법](../simulation/flightgear.md)을 참고하십시오.

<a id="running"></a>

## 시뮬레이션 실행

JSBSim SITL 시뮬레이션은 아래와 같이 `make`로 실행합니다.
```sh
cd /path/to/PX4-Autopilot
make px4_sitl jsbsim
```
그러면, PX4 SITL 인스턴스와 FlightGear UI(시각화용)가 모두 실행됩니다. FlightGear UI 없이 실행하려면 `make` 명령 앞에 `HEADLESS=1`을 추가합니다.

지원되는 차량과 `make` 명령은 아래에 나열되어 있습니다(차량 이미지를 보려면 링크를 클릭하십시오).

| 차량     | 명령어                                |
| ------ | ---------------------------------- |
| 표준 고정익 | `make px4_sitl jsbsim_rascal`      |
| 쿼드콥터   | `make px4_sitl jsbsim_quadrotor_x` |
| 헥사콥터   | `make px4_sitl jsbsim_hexarotor_x` |

위의 명령은 전체 UI로 단일 차량을 시작합니다. *QGroundControl*은 시뮬레이션 차량에 자동으로 연결할 수 있어야 합니다.

## ROS 환경 JSBSim 실행하기

ROS 환경에서 JSBSim을 실행하려면:

1. `px4-jsbsim-bridge` 패키지를 catkin 작업 공간에 복제합니다.
   ```
   cd <path_to_catkin_ws>/src
   git clone https://github.com/Auterion/px4-jsbsim-bridge.git
   ```
1. `jsbsim_bridge` catkin 패키지를 빌드합니다.
   ```
   catkin build jsbsim_bridge
   ```
:::note
작업 공간에 미리 MAVROS를 설치하어야 합니다(설치되어 있지 않으면, [MAVROS 설치 가이드](../ros/mavros_installation.md)을 참고하십시오).
:::
1. 다음과 같이 시작 파일을 사용하여 ROS를 통하여 JSBSim을 시작합니다.
   ```
   roslaunch jsbsim_bridge px4_jsbsim_bridge.launch
   ```

## 추가 정보

* [px4-jsbsim-bridge 추가 정보](https://github.com/Auterion/px4-jsbsim-bridge)
