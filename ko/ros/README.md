---
canonicalUrl: https://docs.px4.io/main/ko/ros/README
---

# ROS (로봇 운영 체제)

[ROS](http://www.ros.org/)는 드론 애플리케이션 개발에 PX4와 함께 사용할 수 있는 범용 로봇 라이브러리입니다. 공식적으로 Linux 플랫폼만을 지원됩니다.

ROS는 일반적인 로봇 공학 문제를 해결하고, Linux용으로 작성된 소프트웨어 라이브러리에 대한 액세스를 해결하는 개발자의 활발한 생태계 시스템의 이점이 있습니다. 예를 들어, [장애물 회피](../computer_vision/obstacle_avoidance.md) 및 [충돌 방지](../computer_vision/collision_prevention.md)를 포함한 PX4 [컴퓨터 비전](../computer_vision/README.md) 솔루션의 일부로 사용되었습니다.

:::warning
Tip [ROS 2](../ros/ros2.md)는 ROS의 "최신이자 최고의" 버전입니다. PX4 개발 팀은 모든 사용자가 [ROS 2로 업그레이드](../ros/ros2.md)할 것을 권장합니다!
:::


## ROS 설정

PX4는 ROS와 ROS 2를 모두 지원합니다.

- **[ROS 2](../ros/ros2.md): (권장)** PX4와 ROS 2는 PX4 uORB 메시지와 ROS 2 DDS 메시지간의 직접 브리지를 제공하는 인터페이스인 [PX4-ROS 2 브리지](../ros/ros2_comm.md)를 통하여 통신합니다. 이를 통하여 실시간으로 ROS 2 워크플로 및 노드에서 PX4 내부에 직접 액세스할 수 있습니다.
- **[ROS 2 브리지를 통한 ROS(1)](../ros/ros1_via_ros2.md):** PX4는 먼저 [PX4-ROS 2 브리지](../ros/ros2_comm.md)로 연결한 다음, ROS 2와 ROS 1 사이의 두 번째 브리지([ros1_bridge](https://github.com/ros2/ros1_bridge))를 통하여 연결합니다.
- **[MAVROS를 통한 ROS(1)](../ros/ros1.md):** PX4 및 ROS(1)는 ROS 주제를 MAVLink에 연결하는 [MAVROS](../ros/mavros_installation.md) 패키지를 사용하여 [MAVLink](../middleware/mavlink.md)로 통신합니다.


## ROS 지원 로드맵

[PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA)(및 [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0))에서 공개된 PX4 개발팀은 microROS 지원 계획을 발표하였습니다.

* microRTPS: Fast DDS가 있는 microRTPS 브리지(현재 안정적인 ROS 2 인터페이스)
* micro XRCE-DDS: PX4의 DDS(다음 단계!)
* 마이크로 ROS: PX4의 ROS 2(우리의 목표!)

