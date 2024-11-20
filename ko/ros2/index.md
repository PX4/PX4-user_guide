# ROS 2

[ROS 2](https://docs.ros.org/en/humble/#) is the newest version of [ROS](http://www.ros.org/) (Robot Operating System), a general purpose robotics library that can be used with the PX4 Autopilot to create powerful drone applications. It captures most of the learnings and features of [ROS 1](../ros/ros1.md), improving a number of flaws of the earlier version.

:::warning
Tip
PX4 개발 팀은 이 버전의 ROS를 마이그레이션할 것을 적극 권장합니다!
:::

Communication between ROS 2 and PX4 uses middleware that implements the [XRCE-DDS protocol](../middleware/uxrce_dds.md). This middleware exposes PX4 [uORB messages](../msg_docs/index.md) as ROS 2 messages and types, effectively allowing direct access to PX4 from ROS 2 workflows and nodes. The middleware uses uORB message definitions to generate code to serialise and deserialise the messages heading in and out of PX4. These same message definitions are used in ROS 2 applications to allow the messages to be interpreted.

To use the [ROS 2](../ros2/user_guide.md) over XRCE-DDS effectively, you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions, which differ from those used by ROS. In the near term future we plan to provide ROS 2 APIs to abstract PX4 conventions, along with examples demonstrating their use.

이 섹션의 주요 주제는 다음과 같습니다.
- [ROS 2 User Guide](../ros2/user_guide.md): A PX4-centric overview of ROS 2, covering installation, setup, and how to build ROS 2 applications that communicate with PX4.
- [ROS 2 오프보드 제어 예](../ros2/offboard_control.md)

::: info
ROS 2 is officially supported only on Linux platforms.
Ubuntu 20.04 LTS는 공식적으로 지원되는 배포판입니다.
:::


::: info ROS 2 can also connect with PX4 using [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (instead of XRCE-DDS). This option is supported by the MAVROS project.
:::


## 추가 읽기/정보

- [ROS 2 사용자 가이드](../ros2/user_guide.md)
- [XRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/uxrce_dds.md): PX4 middleware for connecting to ROS 2.

