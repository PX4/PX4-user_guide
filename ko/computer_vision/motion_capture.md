---
canonicalUrl: https://docs.px4.io/main/ko/computer_vision/motion_capture
---

# 모션 캡쳐 (MoCap)

모션 캡쳐(MoCap)는 *외부 * 포지셔닝 메커니즘을 사용하여 기체의 삼차원 *자세* (위치와 방향)를 추정하는 [컴퓨터 비전](https://en.wikipedia.org/wiki/Computer_vision) 기술입니다. 일반적으로 실내와 같은 GPS가 없는 상황에서 기체 내비게이션에 사용되며 상대적인 *지역*좌표를 제공합니다.

모션 캡쳐시스템은 보통 적외선 카메라로 움직임을 감지하나, LiDAR, 광대역 주파(UWB) 형태의 기술을 활용하기도 합니다.

:::note
*MoCap*은 개념적으로 [관성 시각 주행 측정(VIO)](../computer_vision/visual_inertial_odometry.md)과 유사합니다. 가장 큰 차이점은 VIO는 기체내에서 비전 시스템이 동작하며, 속도 정보를 취득하기 위하여 기체의 관성 측정 장치(IMU)를 사용합니다.
:::

## 모션 캡쳐 참고 자료

자세한 모션 캡쳐 기술은 다음을 참고하십시오:
- [위치 추정용 시각/움직임 감지 시스템 활용](../ros/external_position_estimation.md) <!-- bring across info into user guide? -->
- [움직임 감지 기술 비행 (VICON, 광추적)](../tutorials/motion-capture-vicon-optitrack.md).  <!-- bring across info into user guide? -->
- [EKF > 외부 비전 시스템 ](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
