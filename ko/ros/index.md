# ROS (로봇 운영 체제)

[ROS](http://www.ros.org/)는 드론 애플리케이션 개발에 PX4와 함께 사용할 수 있는 범용 로봇 라이브러리입니다.

ROS는 일반적인 로봇 공학 문제를 해결하고, Linux용으로 작성된 소프트웨어 라이브러리에 대한 액세스를 해결하는 개발자의 활발한 생태계 시스템의 이점이 있습니다. 예를 들어, [장애물 회피](../computer_vision/obstacle_avoidance.md) 및 [충돌 방지](../computer_vision/collision_prevention.md)를 포함한 PX4 [컴퓨터 비전](../computer_vision/README.md) 솔루션의 일부로 사용되었습니다.

:::warning
tip [ROS 2](../ros2/index.md) is the "latest and greatest" version of ROS. The PX4 development team recommend that all users [upgrade to ROS 2](../ros2/index.md)!
:::


## ROS 설정

PX4 supports both ROS 2 and ROS 1, with the following configurations:

- **[ROS 2](../ros2/index.md): (Recommended)** PX4 and ROS 2 communicate over the [PX4-ROS 2 bridge](../ros2/user_guide.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types. 이를 통하여 실시간으로 ROS 2 워크플로 및 노드에서 PX4 내부에 직접 액세스할 수 있습니다.
- **[ROS 1 via MAVROS](../ros/ros1.md):** PX4 and ROS 1 communicate over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.


ROS 2 can be installed on Ubuntu Linux, macOS, Windows, while ROS 1 is only available on Linux. Although it might work on the other platforms, PX4 primarily tests and documents ROS on _Linux_.

Note that ROS 2 can also connect with PX4 using [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (instead of XRCE-DDS). This option is supported by the MAVROS project (not PX4).

## ROS 지원 로드맵

Unveiled at the [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (and [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), the PX4 Development team, announced the plans to support microROS.

* microRTPS: microRTPS bridge with Fast DDS (The ROS 2 interface in PX4 v1.13 and earlier)
* micro XRCE-DDS: DDS on PX4 (The ROS 2 interface for PX4 v1.14 and later)
* micro ROS: ROS 2 running in PX4 - "microROS" (Our Target!)
