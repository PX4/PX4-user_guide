# ROS (로봇 운영 체제)

[ROS](http://www.ros.org/)는 드론 애플리케이션 개발에 PX4와 함께 사용할 수 있는 범용 로봇 라이브러리입니다. Linux 플랫폼에서만 공식적으로 지원됩니다.

ROS는 일반적인 로봇 공학 문제를 해결하고, Linux용으로 작성된 소프트웨어 라이브러리에 대한 액세스를 해결하는 개발자의 활발한 생태계 시스템의 이점이 있습니다. 예를 들어, [장애물 회피](../computer_vision/obstacle_avoidance.md) 및 [충돌 방지](../computer_vision/collision_prevention.md)를 포함한 PX4 [컴퓨터 비전](../computer_vision/README.md) 솔루션의 일부로 사용되었습니다.

:::warning
tip [ROS 2](../ros/ros2.md)는 ROS의 "최신이자 최고의" 버전입니다. PX4 개발 팀은 모든 사용자가 [ROS 2로 업그레이드](../ros/ros2.md)할 것을 권장합니다!
:::


## ROS 설정

PX4 supports both the "original" ROS and ROS 2, with the following configurations:

- **[ROS 2](../ros/ros2.md): (Recommended)** PX4 and ROS 2 communicate over the [PX4-ROS 2 bridge](../ros/ros2_comm.md), an interface that provides a direct bridge between PX4 uORB messages and ROS 2 DDS messages/types. This effectively allows direct access to PX4 internals from ROS 2 workflows and nodes in realtime.
- **[ROS (1) via ROS 2 Bridge](../ros/ros1_via_ros2.md):** PX4 connects first via the [PX4-ROS 2 bridge](../ros/ros2_comm.md) and then via a second bridge ([ros1_bridge](https://github.com/ros2/ros1_bridge)) between ROS 2 and ROS 1.
- **[ROS (1) via MAVROS](../ros/ros1.md):** PX4 and ROS (1) communicate over [MAVLink](../middleware/mavlink.md), using the [MAVROS](../ros/mavros_installation.md) package to bridge ROS topics to MAVLink.


## ROS Support Roadmap

Unveiled at the [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (and [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), the PX4 Development team, announced the plans to support microROS.

* microRTPS:  microRTPS bridge with Fast DDS (The current stable ROS 2 interface)
* micro XRCE-DDS: DDS on PX4 (Next step!)
* micro ROS: ROS 2 on the PX4 (Our Target!)

