# 컴퓨터 비전 (Optical Flow, MoCap, VIO, Avoidance)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 시각 데이터를 활용하여 실재하는 환경을 이해할 수 있게 하는 기술입니다.

PX4는 다음 기능 지원을 목적으로 컴퓨터 비전 시스템([보조 컴퓨터](../companion_computer/pixhawk_companion.md)에서 주로 실행)을 활용합니다.
- 자세/속도 추정
  - [Optical Flow](../sensor/optical_flow.md) provides 2D velocity estimation (using a downward facing camera and a downward facing distance sensor).
  - [Motion Capture](../computer_vision/motion_capture.md) provides 3D pose estimation using a vision system that is *external* to the vehicle. It is primarily used for indoor navigation.
  - [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md) provides 3D pose and velocity estimation using an onboard vision system and IMU. It is used for navigation when global position information is absent or unreliable.
- Avoidance/Path Planning:
  - [Obstacle Avoidance](../computer_vision/obstacle_avoidance.md) provides full navigation around obstacles when flying a planned path (currently missions are supported). This uses [PX4/avoidance](https://github.com/PX4/avoidance) running on a companion computer.
  - [Collision Prevention](../computer_vision/collision_prevention.md) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).
  - [Safe Landing](../computer_vision/safe_landing.md) guides vehicles to find (and land on) flat terrain that is free of stationary obstacles.

:::tip
The [PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md) (Holybro) is a robust and inexpensive kit for developers working with computer vision on PX4. It comes with [PX4 avoidance](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## External Resources

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 simulation environment for computer vision. The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
