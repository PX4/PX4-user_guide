# 컴퓨터 비전(광류 센서, 움직임 감지, 관성 주행 시각 측정, 회피)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 시각 데이터를 활용하여 실제 환경을 이해하는 기술입니다.

PX4 uses computer vision systems (primarily running on [Companion Computers](../companion_computer/index.md)) in order to support the following features:

- [광류(Optical flow)](#optical-flow)는 2D 속도 추정을 제공합니다(아래로 향하는 카메라와 아래로 향하는 거리 센서 사용).
- [Motion Capture](#motion-capture) provides 3D pose estimation using a vision system that is _external_ to the vehicle. 주로 실내 내비게이션에 사용됩니다.
- [Visual Inertial Odometry](#visual-inertial-odometry-vio)는 온보드 비전 시스템과 IMU를 사용하여 3D 자세 및 속도 추정을 제공합니다. It is used for navigation when GNSS position information is absent or unreliable.
- [충돌 방지](../computer_vision/collision_prevention.md)는 장애물에 충돌하기 전에 차량을 멈추는 데 사용됩니다(주로 수동 모드에서 비행할 때).

:::tip
[PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md)(Holybro)는 PX4에서 컴퓨터 비전으로 작업하는 개발자를 위한 강력하고 저렴한 키트입니다.
:::

## 모션 캡쳐

Motion Capture (MoCap) is a technique for estimating the 3D _pose_ (position and orientation) of a vehicle using a positioning mechanism that is _external_ to the vehicle. MoCap systems most commonly detect motion using infrared cameras, but other types of cameras, Lidar, or Ultra Wideband (UWB) may also be used.

::: info MoCap is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a _local_ coordinate system.
:::

MoCap 기술에 대해 더 알아보려면 다음을 참고하십시오:

- [외부 위치 추정](../ros/external_position_estimation.md)
- [움직임 감지(Motion Capture)기술을 활용한 비행 (VICON, Optitrack)](../tutorials/motion-capture.md)
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)

## 시각적 관성 주행 거리 측정(VIO)

Visual Inertial Odometry (VIO) is used for estimating the 3D _pose_ (position and orientation) and _velocity_ of a moving vehicle relative to a _local_ starting position. 보통 GPS가 빠졌거나 (예: 실내) 신뢰할 수 없을 때(예: 다리 아래로 비행할 경우) 기체 운행에 활용합니다.

VIO uses [Visual Odometry](https://en.wikipedia.org/wiki/Visual_odometry) to estimate vehicle _pose_ from visual information, combined with inertial measurements from an IMU (to correct for errors associated with rapid vehicle movement resulting in poor image capture).

:::note VIO와 [MoCap](#motion-capture)의 한 가지 차이점은 VIO 카메라/IMU가 차량 기반이며 추가로 속도 정보를 제공하는 것입니다.
:::

PX4의 VIO 설정 방법을 더 알아보려면 다음을 참고하십시오:

- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 설정 안내서](../peripherals/camera_t265_vio.md)

## 광류

[광류 센서(Optical Flow)](../sensor/optical_flow.md) 기술로 2차원 평면상의 속도를 추정합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).

광류 센서 기술을 더 알아보려면 다음을 참고하십시오.

- [광류](../sensor/optical_flow.md)
- [EKF > 광류](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## Comparisons

### Optical Flow vs VIO for Local Position Estimation

Both these techniques use cameras and measure differences between frames. Optical flow uses a downward facing camera, while VIO uses a stereo camera or a 45 degree tracking camera. Assuming both are well calibrated, which is better for local position estimation?

The consensus [appears to be](https://discuss.px4.io/t/vio-vs-optical-flow/34680):

Optical flow:

- Downward facing optical flow gives you a planar velocity thats corrected for angular velocity with the gyro.
- Requires an accurate distance to the ground and assumes a planar surface. Given those conditions it can be just as accurate/reliable as VIO (such as indoor flight)
- Is more robust than VIO as it has fewer states.
- Is significantly cheaper and easier to set up as it only requires a flow sensor, a rangefinder, and setting up a few parameters (which can be connected to the flight controller).

VIO:

- Is more expensive to purchase and harder to set up. It requires a separate companion computer, calibration, software, configuration and so on.
- Will be less effective if there are no point features to track (in practice the real world generally has point features).
- Is more flexible, allowing additional features such as obstacle avoidance and mapping.

A combination (fusing both) is probably the most reliable, though not necessary in most real-world scenarios. Normally you will select the system that suits your operating environment, required features, and cost constraints:

- Use VIO if you plan on flying outdoors without GPS (or outdoors and indoors), or if you need to support obstacle avoidance and other computer vision features.
- Use Optical Flow if you plan on only flying indoors (without GPS) and cost is an important consideration.

## 외부 참고 자료

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - 컴퓨터 비전용 ROS + PX4 시뮬레이션 환경입니다. [XTDrone 설명서](https://www.yuque.com/xtdrone/manual_en)에 시작에 필요한 모든 내용이 들어있습니다!
