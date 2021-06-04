# 파일 및 코드 설치

The *supported platforms* for PX4 development are:
- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md) (Recommended)
- [Mac OS](../dev_setup/dev_env_mac.md)
- [Windows 10](../dev_setup/dev_env_windows_cygwin.md)


## 지원 대상

아래 표는 각 OS에서 구축 할 수 있는 PX 대상을 보여줍니다.

| 대상                                                                                                                                                                                                                                                                | Linux (Ubuntu) |   Mac   | Windows |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **NuttX 기반 하드웨어**: [Pixhawk 시리즈](https://docs.px4.io/en/flight_controller/pixhawk_series.html), [Crazyflie](https://docs.px4.io/en/flight_controller/crazyflie2.html), [Intel® Aero Ready to Fly Drone](https://docs.px4.io/en/flight_controller/intel_aero.html) |    &check;     | &check; | &check; |
| **Linux-based hardware:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                                                                                                                                                         |    &check;     |         |         |
| **Linux 기반 하드웨어**: [Raspberry Pi 2/3](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html), [Parrot Bebop](https://docs.px4.io/en/flight_controller/bebop.html)                                                                                     |    &check;     | &check; | &check; |
| **시뮬레이션**: [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                                                                               |    &check;     | &check; |         |
| **시뮬레이션:** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                                                                                 |    &check;     |         |         |

개발 환경 설치는 아래에서 다룹니다.

## 개발 환경

Docker에 익숙하다면 준비된 컨테이너 중 하나인 [Docker Containers](../test_and_ci/docker.md)를 사용할 수도 있습니다.
- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html)
- Continue to [Building PX4 Software](../dev_setup/building_px4.md).
