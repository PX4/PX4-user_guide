# 컴퓨터 비전 (Optical Flow, MoCap, VIO, Avoidance)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 시각 데이터를 사용하여 실재 환경을 이해하는 기술입니다.

PX4 uses computer vision systems (primarily running on [Companion Computers](../companion_computer/README.md)) in order to support the following features:

- Pose/Velocity Estimation:
  - [광류(Optical Flow)](../sensor/optical_flow.md)는 2차원 평면상의 속도를 추정합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).
  - [Motion Capture](../computer_vision/motion_capture.md) provides 3D pose estimation using a vision system that is _external_ to the vehicle. It is primarily used for indoor navigation.
  - [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable.
- Avoidance/Path Planning:
  - [장애물 회피](../computer_vision/obstacle_avoidance.md)는 계획된 경로를 비행시 장애물 주변의 내비게이션 기능을 제공합니다 (현재 임무가 지원됨). This uses [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) running on a companion computer.
  - [충돌 방지](../computer_vision/collision_prevention.md) 기술은 (주로 매뉴얼 모드로 비행시) 기체가 장애물로 돌진시 정지용으로 사용됩니다.
  - [안전 착륙](../computer_vision/safe_landing.md)은 고정 장애물이 없는 평평한 지형을 찾거나 착륙하도록 기체를 안내합니다.

:::tip
[PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) (Holybro)는 PX4에서 컴퓨터 비전으로 작업하는 개발자를위한 강력하고 저렴한 키트입니다. It comes with no pre-installed software, but does include an example implementation of obstacle avoidance to demonstrate the capabilities of the platform.
:::

## 외부 참고 자료

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md)-컴퓨터 비전용 ROS + PX4 v1.9 시뮬레이션 환경. [XTDrone 매뉴얼](https://www.yuque.com/xtdrone/manual_en)에는 시작하는 데 필요한 모든 내용이 포함되어 있습니다.
