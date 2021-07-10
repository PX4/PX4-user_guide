# 파일 및 코드 설치개발자 환경 설정 (툴체인)

PX4 개발 *지원 플랫폼*은 다음과 같습니다.
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md)(권장)
- [Mac OS](../dev_setup/dev_env_mac.md)
- [윈도우 10](../dev_setup/dev_env_windows_cygwin.md)


## 지원 대상

아래 표는 각 OS에서 구축 가능한 PX 대상을 보여줍니다.

| 대상                                                                                                                                                                                              | Linux (Ubuntu) |   Mac   |   윈도우   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **NuttX 기반 하드웨어:** [Pixhawk 시리즈](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles/crazyflie2.md), [Intel® Aero Ready to Fly Drone](../complete_vehicles/intel_aero.md) |    &check;     | &check; | &check; |
| **Linux 기반 하드웨어:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                                                                              |    &check;     |         |         |
| **시뮬레이션:** [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                             |    &check;     | &check; | &check; |
| **시뮬레이션:** [가제보 SITL](../simulation/gazebo.md)                                                                                                                                                  |    &check;     | &check; |         |
| **시뮬레이션:** [가제보 ROS](../simulation/ros_interface.md)                                                                                                                                            |    &check;     |         |         |

개발 환경 설치는 아래에서 다룹니다.

## 개발 환경

Docker에 익숙하다면 준비된 컨테이너 중 하나인 [Docker Containers](../test_and_ci/docker.md)를 사용할 수도 있습니다.
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
- Continue to [Building PX4 Software](../dev_setup/building_px4.md).
