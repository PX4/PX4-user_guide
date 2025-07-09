---
canonicalUrl: https://docs.px4.io/main/ko/ros/ros1
---

# ROS 1 with MAVROS

:::tip PX4 개발 팀은 사용자가 [ROS 2](../ros/ros2.md)로 마이그레이션할 것을 권장합니다(즉, 이 섹션 건너뛰기)!
:::

[ROS](../ros/README.md)(로봇 운영 체제)는 PX4 자동조종장치를 위한 강력한 드론 애플리케이션을 개발하는 범용 로봇 라이브러리입니다.

이 섹션에는 ROS의 원래 버전과 [MAVROS](../ros/mavros_installation.md) 패키지를 사용하여 [MAVLink](../middleware/mavlink.md)로 PX4 통신 관련 주제가 포함되어 있습니다(MAVROS는 ROS 주제를 MAVLink 및 PX4 규칙에 연결함).

주요 주제는 다음과 같습니다.
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Setup a PX4 development environment with ROS 1 and MAVROS.
- [ROS/MAVROS Offboard Example (C++)](../ros/mavros_offboard_cpp.md): Tutorial showing the main concepts related to writing a C++ MAVROS/ROS node.
- [ROS/MAVROS 사용자 지정 메시지 전송](../ros/mavros_custom_messages.md)
- [ROS with Gazebo Classic Simulation](../simulation/ros_interface.md)
- [Gazebo Classic OctoMap Models with ROS](../sim_gazebo_classic/gazebo_octomap.md)
- [라즈베리파이 ROS 설치](../ros/raspberrypi_installation.md)
- [외부 위치 추정(비전/모션 기반)](../ros/external_position_estimation.md)


## 기타 자료

- [PX4 ROS 설정](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - 컴퓨터 비전을 위한 ROS + PX4 시뮬레이션 환경. [XTDrone 매뉴얼](https://www.yuque.com/xtdrone/manual_en)에는 시작하는 데 필요한 모든 내용이 포함되어 있습니다.
- [Prometheus Autonomous Drone Project](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus is a ROS 1 based, BSD-3 licensed collection of autonomous drone software packages from [AMOVLab](https://github.com/amov-lab), which provides a full set of solutions for the intelligent and autonomous flight of drones, such as mapping, localization, planning, control, and target detection, fully integrated with the [Gazebo Classic](../sim_gazebo_classic/README.md) Simulator.
