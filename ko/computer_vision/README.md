# 컴퓨터 비전 (Optical Flow, MoCap, VIO, Avoidance)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 시각 데이터를 사용하여 실재 환경을 이해하는 기술입니다.

PX4는 다음과 기능에 컴퓨터 비전 시스템([보조 컴퓨터](../companion_computer/pixhawk_companion.md)에서 주로 실행됨)을 사용합니다.
- 자세와 속도 추정
  - [광류(Optical Flow)](../sensor/optical_flow.md)는 2차원 평면상의 속도를 추정합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).
  - [Motion Capture](../computer_vision/motion_capture.md)는 기체의 *외부* 비전 시스템을 사용하여 3D 자세를 추정합니다. 주로 실내 내비게이션에 사용됩니다.
  - [시각 관성 오도메 트리(VIO)](../computer_vision/visual_inertial_odometry.md)는 온보드 비전 시스템 및 IMU를 사용하여 3D 자세 및 속도를 추정합니다. 전역 위치 정보가 없거나 신뢰할 수 없는 경우에는 내비게이션용으로 사용됩니다.
- 회피 및 경로 계획 :
  - [장애물 회피](../computer_vision/obstacle_avoidance.md)는 계획된 경로를 비행시 장애물 주변의 내비게이션 기능을 제공합니다 (현재 임무가 지원됨). 이 기술은 보조 컴퓨터의 [PX4/avoidance](https://github.com/PX4/avoidance) 기능을 활용합니다.
  - [Collision Prevention](../computer_vision/collision_prevention.md) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).
  - [Safe Landing](../computer_vision/safe_landing.md) guides vehicles to find (and land on) flat terrain that is free of stationary obstacles.

:::tip
The [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) (Holybro) is a robust and inexpensive kit for developers working with computer vision on PX4. It comes with [PX4 avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
