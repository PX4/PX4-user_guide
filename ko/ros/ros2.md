---
canonicalUrl: https://docs.px4.io/main/ko/ros/ros2
---

# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/)는 PX4 자동조종장치와 사용하여 강력한 드론 애플리케이션을 만들 수 있는 범용 로봇 라이브러리인 [ROS](http://www.ros.org/)(Robot Operating System)의 최신 버전입니다. It captures most of the learnings and features of [ROS 1](../ros/ros1.md), improving a number of flaws of the earlier version.

:::warning
Tip
PX4 개발 팀은 이 버전의 ROS를 마이그레이션할 것을 적극 권장합니다!
:::

Communication between ROS 2 and PX4 uses middleware that implements the [XRCE-DDS protocol](../middleware/uxrce_dds.md). This middleware exposes PX4 [uORB messages](../msg_docs/README.md) as ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes. The middleware uses uORB message definitions to generate code to serialise and deserialise the messages heading in and out of PX4. These same message definitions are used in ROS 2 applications to allow the messages to be interpreted.

To use the [ROS 2](../ros/ros2_comm.md) over XRCE-DDS effectively, you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions, which differ from those used by ROS. In the near term future we plan to provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use.

이 섹션의 주요 주제는 다음과 같습니다.
- [ROS 2 User Guide](../ros/ros2_comm.md): A PX4-centric overview of ROS 2, covering installation, setup, and how to build ROS 2 applications that communicate with PX4.
- [ROS 2 Offboard Control Example](../ros/ros2_offboard_control.md)

:::note
ROS 2는 공식적으로 Linux 플랫폼만 지원합니다.
Ubuntu 20.04 LTS는 공식적으로 지원되는 배포판입니다.
:::


:::note ROS
2 can also connect with PX4 using [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (instead of XRCE-DDS). This option is supported by the MAVROS project.
:::


## 추가 읽기/정보

- [ROS 2 User Guide](../ros/ros2_comm.md)
- [XRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/uxrce_dds.md): PX4 middleware for connecting to ROS 2.

