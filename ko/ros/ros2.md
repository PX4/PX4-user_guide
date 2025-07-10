---
canonicalUrl: https://docs.px4.io/main/ko/ros/ros2
---

# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/)는 PX4 자동조종장치와 사용하여 강력한 드론 애플리케이션을 만들 수 있는 범용 로봇 라이브러리인 [ROS](http://www.ros.org/)(Robot Operating System)의 최신 버전입니다. [ROS (1)](../ros/ros1.md)의 대부분의 학습과 최근 추가된 기능을 캡처하여 이전 버전의 여러 결함을 개선합니다.

:::warning
Tip
PX4 개발 팀은 이 버전의 ROS를 마이그레이션할 것을 적극 권장합니다!
:::

ROS 2와 PX4 사이의 변환 레이어는 [PX4-ROS 2 브리지](../ros/ros2_comm.md)로 알려진 소프트웨어입니다. 이것은 PX4 UORB 메시지와 ROS 2 메시지 및 유형 사이에 브리지를 제공하여, ROS 2 워크플로 및 노드에서 PX4에 대한 직접 액세스를 효과적으로 허용합니다. 브리지는 UORB 메시지 정의 및 해당 IDL 유형을 사용하여, PX4 안팎으로 향하는 메시지를 직렬화 및 역직렬화하는 코드를 생성합니다.

이 섹션의 주요 주제는 다음과 같습니다.
- [ROS 2 사용자 가이드](../ros/ros2_comm.md): PX4와 함께 ROS 2를 사용하는 방법에 대한 개요(PX4-ROS2 브리지, 설치/설정 및 PX4용 ROS 2 애플리케이션 구축 방법 포함)
- [ROS 2 microRTPS 오프보드 제어 예](../ros/ros2_offboard_control.md)

:::note
ROS 2는 공식적으로 Linux 플랫폼만 지원합니다.
Ubuntu 20.04 LTS는 공식적으로 지원되는 배포판입니다.
:::

:::note
[PX4-ROS 2 브리지](../ros/ros2_comm.md)를 효과적으로 사용하려면, (작성 당시) PX4 내부 아키텍처 및 규칙을 합리적으로 이해하여야 합니다.

이것은 MAVROS/MAVLink를 통해 PX4와 통신하는 ROS(1)와 대조되며 PX4의 내부 아키텍처와 많은 규칙(예: 프레임 및 단위 변환)을 숨깁니다.

ROS 2(및 브리지)는 개발 팀이 PX4 규칙을 추상화하는 ROS 2 API와 사용을 보여주는 예제를 제공함에 따라 사용하기가 더 쉬워질 것입니다. 단기 PX4 로드맵에서 이것을 계획하고 있습니다.
:::


## 추가 읽기/정보

- [microRTPS 브리지](../middleware/micrortps.md): [PX4-ROS 2 브리지](../ros/ros2_comm.md)의 기반이 되는 PX4 미들웨어입니다.
- **ROS 2를 브리지로 사용하는 ROS 1:** 공식 ROS 1 브리지 패키지([ros1_bridge](https://github.com/ros2/ros1_bridge))를 사용하면 단일 설정에서 ROS 1 및 ROS 2 애플리케이션을 사용할 수 있습니다.

