---
canonicalUrl: https://docs.px4.io/main/ko/simulation/ignition_gazebo
---

# 연소 가제보 시뮬레이션

:::warning
연소 가제보 시뮬레이션은 단일 프레임(쿼드콥터)을 지원하며, 헤드리스 모드(2021년 7월)에서는 실행할 수 없습니다.
:::

[Ignition Gazebo](https://gazebosim.org/libs/gazebo) is an open source robotics simulator from the _Ignition Robotics Project_. 인기 있는 로봇 시뮬레이터 [Gazebo](./gazebo.md)에서 파생되었으며, 고급 렌더링, 물리학 및 센서 모델이 특징입니다.

**지원 차량:** 쿼드콥터

@[유투브](https://youtu.be/38UJqrNQChg)

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

## 설치 (Ubuntu Linux)

:::note
이 매뉴얼은 Ubuntu 18.04에서 테스트하였습니다.
:::

1. 일반적인 [Ubuntu LTS/Debian Linux 개발 환경](../dev_setup/dev_env_linux_ubuntu.md)을 설치합니다.
1. [설치 지침](https://github.com/Auterion/px4-simulation-ignition#readme)에 따라 Ignition Gazebo를 설치합니다(`sudo`가 필요할 수 있음).
   ```sh
   sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'
   wget http://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add -
   apt update
   apt install ignition-edifice
   ```

## 시뮬레이션 실행

연소 가제보 시뮬레이션은 아래와 같이 `make`로 실행합니다.
```bash
cd /path/to/PX4-Autopilot
make px4_sitl ignition
```
이것은 PX4 SITL 인스턴스와 연소 가제보 클라이언트를 실행합니다.

지원되는 차량과 `make` 명령은 아래에 나열되어 있습니다(차량 이미지를 보려면 링크를 클릭하십시오).

| 차량         | 명령어                      |
| ---------- | ------------------------ |
| 쿼드콥터(iris) | `make px4_sitl ignition` |

위의 명령은 전체 UI로 단일 차량을 시작합니다. *QGroundControl*은 시뮬레이션 차량에 자동으로 연결할 수 있어야 합니다.

In order to run the simulation without running the ignition gazebo gui, one can use the `HEADLESS=1` flag. For example, the following
```
HEADLESS=1 make px4_sitl ignition
```

In order to increase the verbose output, `VERBOSE_SIM=1` can be used.
```
VERBOSE_SIM=1 make px4_sitl ignition
```

## 추가 정보

* [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
