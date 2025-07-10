---
canonicalUrl: https://docs.px4.io/main/ko/advanced/computer_vision
---

# 컴퓨터 비전(광류 센서, 움직임 감지, 관성 주행 시각 측정, 회피)

[컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision)은 컴퓨터가 실재하는 환경을 시각 데이터를 활용하여 이해할 수 있게 하는 기술입니다.

PX4는 다음 기능 지원을 목적으로 컴퓨터 비전 시스템([보조 컴퓨터](../companion_computer/pixhawk_companion.md)에서 주로 실행)을 활용합니다.
- [광류 추적(Optical Flow)](#optical_flow) 기술은 2차원 평면상의 속도 추정 정보를 제공합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).
- [움직임 촬영(Motion Capture)](#mocap) 기술은 기체 *외부*의 비전 시스템을 통해 3차원 자세 추정 정보를 제공합니다. 실내 운행에 주로 활용합니다.
- [관성 주행 시각 측정](#vio) 기술은 내장 비전 시스템과 관성 측정부(IMU)를 활용하여 3차원 자세와 속도 추정 정보를 제공합니다. 광역 위치 정보가 빠져있거나 신뢰할 수 없는 상황에서의 움직임에 활용합니다.
- [장애물 회피](../computer_vision/obstacle_avoidance.md) 기술은 계획 경로를 비행할 때 장애물 주변의 완전한 이동 가능 공간 정보를 제공합니다(현재 임무 기능 지원). 이 기술은 보조 컴퓨터에서 동작하는 [PX4/avoidance](https://github.com/PX4/avoidance)를 활용합니다.
- [충돌 방지](../computer_vision/collision_prevention.md) 기술은 (주로 수동 조작으로 비행할 때) 기체가 장애물로 돌진하기 전에 이동을 멈출 때 활용합니다.

움직임 감지(Motion Capture, a.k.a MoCap)은 기체 *외부*의 위치 결정 방법으로, 3차원 *자세*(위치와 방향) 를 추정하는 기술입니다. MoCap 시스템은 보통 적외선 카메라로 움직임을 감지하나, 광선 레이더, 광대역 주파(UWB) 형태 기술을 활용할 수도 있습니다.
:::

## Motion Capture

움직임 감지(Motion Capture, a.k.a MoCap)는 기체 *외부*의 위치 결정 방법으로, 3차원 *자세*(위치와 방향) 를 추정하는 기술입니다. MoCap 시스템은 보통 적외선 카메라로 움직임을 감지하나, 광선 레이더, 광대역 주파(UWB) 형태 기술을 활용할 수도 있습니다.

:::note
MoCap은 GPS가 빠져있는 상황에서 기체 탐색 운용을 할 때 활용하며, 상대적인 *로컬* 좌표 체계 위치 정보를 제공합니다.
:::

MoCap 기술에 대해 더 알아보려면 다음을 참고하십시오:
- [외부 위치 추정](../ros/external_position_estimation.md)
- [움직임 감지(Motion Capture)기술을 활용한 비행 (VICON, Optitrack)](../tutorials/motion-capture-vicon-optitrack.md)
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)


## Visual Inertial Odometry (VIO)

관성 주행 시각 측정(VIO) 기술은 *로컬* 시작점에서 상대 위치로 기체가 이동할 경우 3차원 *자세* (위치와 방향)와 *속도*를 추정할 때 활용합니다. 보통 GPS가 빠졌거나 (예: 실내) 신뢰할 수 없을 때(예: 다리 아래로 비행할 경우) 기체 운행에 활용합니다.

관성 주행 시각 측정(VIO) 기술은 관성 측정부(IMU)에서 시각 정보와 관성 측정 수치를 결합(저화질 이미지를 촬영하는 고속 기체 이동시 오류 보정)하여 기체의 *자세*를 추정하는 [주행 시각 측정](https://en.wikipedia.org/wiki/Visual_odometry) 기술을 활용합니다.

:::note VIO
와 [MoCap](#mocap)간의 차이점은, VIO 카메라/관성 측정부(IMU)의 경우 기체 중심이며, 속도 정보가 추가로 붙습니다.
:::

PX4의 VIO 설정 방법을 더 알아보려면 다음을 참고하십시오:
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 설정 안내서](../peripherals/camera_t265_vio.md)


## Optical Flow

[광류 센서(Optical Flow)](../sensor/optical_flow.md) 기술로 2차원 평면상의 속도를 추정합니다(아래 방향으로 향한 카메라와 아래 방향으로 향한 거리 센서 활용).

광류 센서 기술을 더 알아보려면 다음을 살펴보십시오:
- [광류 센서](../sensor/optical_flow.md)
  - [PX4Flow 스마트 카메라](../sensor/px4flow.md)
- [EKF > 광류 센서](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## 외부 참고 자료

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - 컴퓨터 비전용 ROS + PX4 시뮬레이션 환경입니다. [XTDrone 설명서](https://www.yuque.com/xtdrone/manual_en)에 시작에 필요한 모든 내용이 들어있습니다!
