# 파일 및 코드 설치

PX4 코드는 [Linux](../setup/dev_env_linux.md) 또는 [Mac OS](../setup/dev_env_mac.md)에서 개발할 수 있습니다. [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) 에디션을 권장하며, [모든 PX4 대상](#supported-targets) 빌드 및 대부분의 [시뮬레이터](../simulation/README.md)와 [ROS](../ros/README.md) 사용이 가능하기 때문입니다.

## 지원 대상

아래 표는 각 OS에서 구축 할 수 있는 PX 대상을 보여줍니다.

| 대상                                                                                                                                                                                                                                                                | Linux (Ubuntu) | Mac | Windows |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:---:|:-------:|
| **NuttX 기반 하드웨어**: [Pixhawk 시리즈](https://docs.px4.io/en/flight_controller/pixhawk_series.html), [Crazyflie](https://docs.px4.io/en/flight_controller/crazyflie2.html), [Intel® Aero Ready to Fly Drone](https://docs.px4.io/en/flight_controller/intel_aero.html) |       X        |  X  |    X    |
| [Qualcomm Snapdragon Flight 하드웨어](https://docs.px4.io/master/en/flight_controller/snapdragon_flight.html)                                                                                                                                                         |       X        |     |         |
| **Linux 기반 하드웨어**: [Raspberry Pi 2/3](https://docs.px4.io/en/flight_controller/raspberry_pi_navio2.html), [Parrot Bebop](https://docs.px4.io/en/flight_controller/bebop.html)                                                                                     |       X        |     |         |
| **시뮬레이션**: [jMAVSim SITL](../simulation/jmavsim.md)                                                                                                                                                                                                               |       X        |  X  |    X    |
| **시뮬레이션:** [Gazebo SITL](../simulation/gazebo.md)                                                                                                                                                                                                                 |       X        |  X  |         |
| **시뮬레이션**: [Gazebo ROS](../simulation/ros_interface.md)                                                                                                                                                                                                           |       X        |     |         |


## 개발 환경

개발 환경 설치는 아래에서 다룹니다.

  * [Mac OS](../dev_setup/dev_env_mac.md)
  * [Linux](../dev_setup/dev_env_linux.md)
  * [Windows](../dev_setup/dev_env_windows.md)

Docker에 익숙하다면 준비된 컨테이너 중 하나인 [Docker Containers](../test_and_ci/docker.md)를 사용할 수도 있습니다.
