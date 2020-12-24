# 움직임 감지(MoCap)

움직임 감지(Motion Capture, a.k.a MoCap)는 기체 *외부*의 위치 결정 방법으로, 3차원 *자세*(위치와 방향) 를 추정하는 기술입니다. 움직임 감지는 GPS가 빠져있는 상황(예: 실내)에서 기체 탐색 운용시 활용하며, 상대 *로컬* 좌표 체계 위치 정보를 제공합니다.

MoCap 시스템은 보통 적외선 카메라로 움직임을 감지하나, LiDAR, 광대역 주파(UWB) 형태 기술을 활용할 수도 있습니다.

:::note
*MoCap*은 개념상 [관성 시각 주행 측정(VIO)](../computer_vision/visual_inertial_odometry.md)과 유사합니다. The main difference is that in VIO the vision system runs on the vehicle, and additionally makes use of the vehicle IMU to provide velocity information.
:::

## MoCap Resources

For information about MoCap see:
- [Using Vision or Motion Capture Systems for Position Estimation](../ros/external_position_estimation.md). <!-- bring across info into user guide? -->
- [Flying with Motion Capture (VICON, Optitrack)](../tutorials/motion-capture-vicon-optitrack.md).  <!-- bring across info into user guide? -->
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
