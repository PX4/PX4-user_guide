# 움직임 감지(MoCap)

움직임 감지(Motion Capture, a.k.a MoCap)는 기체 *외부*의 위치 결정 방법으로, 3차원 *자세*(위치와 방향) 를 추정하는 기술입니다. 움직임 감지는 GPS가 빠져있는 상황(예: 실내)에서 기체 탐색 운용시 활용하며, 상대 *로컬* 좌표 체계 위치 정보를 제공합니다.

MoCap 시스템은 보통 적외선 카메라로 움직임을 감지하나, LiDAR, 광대역 주파(UWB) 형태 기술을 활용할 수도 있습니다.

:::note
*MoCap*은 개념상 [관성 시각 주행 측정(VIO)](../computer_vision/visual_inertial_odometry.md)과 유사합니다. 주요 차이점은, VIO 에서는 기체에서 시각 처리 시스템이 동작하며, 속도 정보를 취득하기 위해 기체 관성 측정 장치(IMU)를 추가로 활용합니다.
:::

## MoCap 참고 자료

MoCap 기술에 대해 더 알아보려면 다음을 참고하십시오:
- [위치 추정용 시각/움직임 감지 체계 활용](../ros/external_position_estimation.md) <!-- bring across info into user guide? -->
- [움직임 감지 기술 비행 (VICON, 광추적)](../tutorials/motion-capture-vicon-optitrack.md).  <!-- bring across info into user guide? -->
- [EKF > 외부 비전 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
