# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/)는 PX4 자동조종장치와 사용하여 강력한 드론 애플리케이션을 만들 수 있는 범용 로봇 라이브러리인 [ROS](http://www.ros.org/)(Robot Operating System)의 최신 버전입니다. [ROS (1)](../ros/ros1.md)의 대부분의 학습과 최근 추가된 기능을 캡처하여 이전 버전의 여러 결함을 개선합니다.

:::warning
Tip PX4 개발 팀은 이 버전의 ROS를 마이그레이션할 것을 적극 권장합니다!
:::

ROS 2와 PX4 사이의 변환 레이어는 [PX4-ROS 2 브리지](../ros/ros2_comm.md)로 알려진 소프트웨어입니다. 이것은 PX4 UORB 메시지와 ROS 2 메시지 및 유형 사이에 브리지를 제공하여, ROS 2 워크플로 및 노드에서 PX4에 대한 직접 액세스를 효과적으로 허용합니다. 브리지는 UORB 메시지 정의 및 해당 IDL 유형을 사용하여, PX4 안팎으로 향하는 메시지를 직렬화 및 역직렬화하는 코드를 생성합니다.

이 섹션의 주요 주제는 다음과 같습니다.
- [ROS 2 User Guide](../ros/ros2_comm.md): an overview how to use ROS 2 with PX4 (covering the PX4-ROS2 bridge, installation/setup, and how to build ROS 2 applications for PX4).
- [ROS 2 microRTPS Offboard Control Example](../ros/ros2_offboard_control.md)

:::note ROS
2 is officially supported only on Linux platforms. Ubuntu 20.04 LTS is the official supported distribution.
:::

:::note
To use the [PX4-ROS 2 bridge](../ros/ros2_comm.md) effectively you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions.

This contrasts with ROS (1), which communicates with PX4 via MAVROS/MAVLink, hiding PX4's internal architecture and many of its conventions (e.g. frame and unit conversions).

ROS 2 (and the bridge) will become easier to use as the development team provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use. These are planned in the near-term PX4 roadmap.
:::


## Further Reading/Information

- [microRTPS bridge](../middleware/micrortps.md): PX4 middleware that underlies the [PX4-ROS 2 bridge](../ros/ros2_comm.md).
- **ROS 1 using ROS 2 as a bridge:** The official ROS 1 Bridge package ([ros1_bridge](https://github.com/ros2/ros1_bridge)) allows ROS 1 and ROS 2 applications to be used in a single setup.

