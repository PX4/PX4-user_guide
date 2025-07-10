---
canonicalUrl: https://docs.px4.io/main/ko/advanced/computer_vision
---

# 컴퓨터 비전(광류 센서, 움직임 감지, 관성 주행 시각 측정, 회피)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 시각 데이터를 활용하여 실제 환경을 이해하는 기술입니다.

PX4는 다음 기능을 지원하기 위해 컴퓨터 비전 시스템(주로 [보조 컴퓨터](../companion_computer/pixhawk_companion.md)에서 실행)을 사용합니다.
- [광류(Optical flow)](#optical-flow)는 2D 속도 추정을 제공합니다(아래로 향하는 카메라와 아래로 향하는 거리 센서 사용).
- [모션 캡처](#motion-capture)는 차량 *외부*에 있는 비전 시스템을 사용하여 3차원 자세 추정 정보를 제공합니다. 주로 실내 내비게이션에 사용됩니다.
- [Visual Inertial Odometry](#visual-inertial-odometry-vio)는 온보드 비전 시스템과 IMU를 사용하여 3D 자세 및 속도 추정을 제공합니다. 전역 위치 정보가 없거나, 신뢰할 수 없는 경우에 네비게이션용으로 사용됩니다.
- [장애물 회피](../computer_vision/obstacle_avoidance.md)는 계획된 경로를 비행시 장애물 주위를 탐색합니다(현재 임무가 지원됨). This uses [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) running on a companion computer.
- [충돌 방지](../computer_vision/collision_prevention.md)는 장애물에 충돌하기 전에 차량을 멈추는 데 사용됩니다(주로 수동 모드에서 비행할 때).

:::tip
[PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md)(Holybro)는 PX4에서 컴퓨터 비전으로 작업하는 개발자를 위한 강력하고 저렴한 키트입니다. It comes with [PX4 avoidance](https://github.com/PX4/PX4-Avoidance) software pre-installed, and can be used as the base for your own algorithms.
:::

## 모션 캡쳐

모션 캡쳐(Motion Capture, a.k.a MoCap)는 기체 *외부*의 위치 결정 방법으로, 3차원 *자세*(위치와 방향)를 추정하는 기술입니다. MoCap 시스템은 보통 적외선 카메라로 움직임을 감지하나, 광선 레이더, 광대역 주파수(UWB) 형태 기술을 활용할 수도 있습니다.

:::note
MoCap is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a *local* coordinate system.
:::

MoCap 기술에 대해 더 알아보려면 다음을 참고하십시오:
- [외부 위치 추정](../ros/external_position_estimation.md)
- [움직임 감지(Motion Capture)기술을 활용한 비행 (VICON, Optitrack)](../tutorials/motion-capture.md)
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)


## 시각적 관성 주행 거리 측정(VIO)

관성 주행 시각 측정(VIO) 기술은 *로컬* 시작점에서 상대 위치로 기체가 이동할 경우 3차원 *자세* (위치와 방향)와 *속도*를 추정할 때 활용합니다. 보통 GPS가 빠졌거나 (예: 실내) 신뢰할 수 없을 때(예: 다리 아래로 비행할 경우) 기체 운행에 활용합니다.

관성 주행 시각 측정(VIO) 기술은 관성 측정부(IMU)에서 시각 정보와 관성 측정 수치를 결합(저화질 이미지를 촬영하는 고속 기체 이동시 오류 보정)하여 기체의 *자세*를 추정하는 [주행 시각 측정](https://en.wikipedia.org/wiki/Visual_odometry) 기술을 활용합니다.

:::note VIO와 [MoCap](#motion-capture)의 한 가지 차이점은 VIO 카메라/IMU가 차량 기반이며 추가로 속도 정보를 제공하는 것입니다.
:::

PX4의 VIO 설정 방법을 더 알아보려면 다음을 참고하십시오:
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 설정 안내서](../peripherals/camera_t265_vio.md)


## 광류

[광류 센서(Optical Flow)](../sensor/optical_flow.md) 기술로 2차원 평면상의 속도를 추정합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).

광류 센서 기술을 더 알아보려면 다음을 참고하십시오.
- [광류](../sensor/optical_flow.md)
  - [PX4Flow 스마트 카메라](../sensor/px4flow.md)
- [EKF > 광류](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## 외부 참고 자료

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - 컴퓨터 비전용 ROS + PX4 시뮬레이션 환경입니다. [XTDrone 설명서](https://www.yuque.com/xtdrone/manual_en)에 시작에 필요한 모든 내용이 들어있습니다!
