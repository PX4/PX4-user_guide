---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env
---

# 파일 및 코드 설치개발자 환경 설정 (툴체인)

PX4 개발 *지원 플랫폼*은 다음과 같습니다.
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md)(권장)
- [Mac OS](../dev_setup/dev_env_mac.md)
- [Windows (10/11)](../dev_setup/dev_env_windows_wsl.md)


## 지원 대상

아래 표는 각 OS에서 구축 가능한 PX 대상을 보여줍니다.

| 대상                                                                                                                                  | Linux (Ubuntu) |   Mac   |   윈도우   |
| ----------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **NuttX based hardware:** [Pixhawk Series](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles/crazyflie2.md) |    &check;     | &check; | &check; |
| **Linux 기반 하드웨어:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                  |    &check;     |         |         |
| **시뮬레이션:** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                 |    &check;     | &check; | &check; |
| **Simulation:** [Gazebo SITL](../sim_gazebo_gz/README.md)                                                                           |    &check;     | &check; | &check; |
| **Simulation:** [Gazebo Classic SITL](../sim_gazebo_classic/README.md)                                                              |    &check;     | &check; | &check; |
| **Simulation:** [ROS with Gazebo Classic](../simulation/ros_interface.md)                                                           |    &check;     |         |         |
| **Simulation:** ROS 2 with Gazebo                                                                                                   |    &check;     |         |         |

숙련된 Docker 사용자는 지속적 통합 시스템 [Docker Containers](../test_and_ci/docker.md)컨테이너로 빌드할 수 있습니다.

## 다음 단계

위의 명령줄 도구 모음 중 하나를 설정하고, 다음 단계를 실행합니다.
- [VSCode](../dev_setup/vscode.md)를 설치합니다(명령줄에 IDE 사용을 선호하는 경우).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html)
- [PX4 소프트웨어를 구축](../dev_setup/building_px4.md)합니다.
