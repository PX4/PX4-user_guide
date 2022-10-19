# 연소 가제보 시뮬레이션

:::warning
Ignition Gazebo supports a single frame (X500 quadcopter) and world (October 2022).
:::

[Ignition Gazebo](https://gazebosim.org/libs/gazebo) is an open source robotics simulator from the _Ignition Robotics Project_. 인기 있는 로봇 시뮬레이터 [Gazebo](./gazebo.md)에서 파생되었으며, 고급 렌더링, 물리학 및 센서 모델이 특징입니다.

**지원 차량:** 쿼드콥터

@[유투브](https://youtu.be/38UJqrNQChg)

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

## 설치 (Ubuntu Linux)

:::note
These instructions were tested on Ubuntu 18.04, Ubuntu 20.04, and Ubuntu 22.04
:::

1. 일반적인 [Ubuntu LTS/Debian Linux 개발 환경](../dev_setup/dev_env_linux_ubuntu.md)을 설치합니다.
1. Install Ignition Gazebo (`sudo` may be required):

   ```sh
   sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'
   wget http://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add -
   apt update
   apt install ignition-fortress
   ```

## 시뮬레이션 실행

연소 가제보 시뮬레이션은 아래와 같이 `make`로 실행합니다.

```bash
cd /path/to/PX4-Autopilot
make px4_sitl gz_x500
```
이것은 PX4 SITL 인스턴스와 연소 가제보 클라이언트를 실행합니다.

지원되는 차량과 `make` 명령은 아래에 나열되어 있습니다(차량 이미지를 보려면 링크를 클릭하십시오).

| 차량              | 명령어                     |
| --------------- | ----------------------- |
| quadrotor(x500) | `make px4_sitl gz_x500` |

위의 명령은 전체 UI로 단일 차량을 시작합니다. *QGroundControl*은 시뮬레이션 차량에 자동으로 연결할 수 있어야 합니다.

In order to run the simulation without running the ignition gazebo gui, one can use the `HEADLESS=1` flag:

```bash
HEADLESS=1 make px4_sitl gz_x500
```

In order to increase the verbose output, `VERBOSE_SIM=1` can be used:

```bash
VERBOSE_SIM=1 make px4_sitl gz_x500
```

## 추가 정보

* [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
