# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/)는 PX4 자동조종장치와 사용하여 강력한 드론 애플리케이션을 만들 수 있는 범용 로봇 라이브러리인 [ROS](http://www.ros.org/)(Robot Operating System)의 최신 버전입니다. It captures most of the learnings and features of [ROS (1)](../ros/ros1.md), improving a number of flaws of the earlier version.

:::warning
Tip
PX4 개발 팀은 이 버전의 ROS를 마이그레이션할 것을 적극 권장합니다!
:::

Communication between ROS 2 and PX4 uses middleware that implements the [XRCE-DDS protocol](../middleware/xrce_dds.md). This middleware exposes PX4 [uORB messages](../msg_docs/README.md) as ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes. The middleware uses UORB message definitions to generate code to serialise and deserialise the messages heading in and out of PX4. These same message definitions are used in ROS2 applications to allow the messages to be interpretted.

이 섹션의 주요 주제는 다음과 같습니다.
- [ROS 2 User Guide](../ros/ros2_comm.md): A PX4-centric overview of ROS2, covering installation, setup, and how to build ROS 2 applications that communicate with PX4.
- [ROS 2 Offboard Control Example](../ros/ros2_offboard_control.md)

:::note
ROS 2는 공식적으로 Linux 플랫폼만 지원합니다.
Ubuntu 20.04 LTS는 공식적으로 지원되는 배포판입니다.
:::

:::note
To use the [ROS2](../ros/ros2_comm.md) effectively you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions.

이것은 MAVROS/MAVLink를 통해 PX4와 통신하는 ROS(1)와 대조되며 PX4의 내부 아키텍처와 많은 규칙(예: 프레임 및 단위 변환)을 숨깁니다.

ROS 2(및 브리지)는 개발 팀이 PX4 규칙을 추상화하는 ROS 2 API와 사용을 보여주는 예제를 제공함에 따라 사용하기가 더 쉬워질 것입니다. 단기 PX4 로드맵에서 이것을 계획하고 있습니다.
:::


## 추가 읽기/정보

- [ROS 2 User Guide](../ros/ros2_comm.md)
- [XRCE-DDS (PX4-ROS2/DDS Bridge)](../middleware/xrce_dds.md): PX4 middleware for connecting to ROS 2.
- **ROS 2를 브리지로 사용하는 ROS 1:** 공식 ROS 1 브리지 패키지([ros1_bridge](https://github.com/ros2/ros1_bridge))를 사용하면 단일 설정에서 ROS 1 및 ROS 2 애플리케이션을 사용할 수 있습니다.

