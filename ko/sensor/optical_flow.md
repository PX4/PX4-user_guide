# 광류

*광류*는 속도 추정을 위하여 하향 카메라와 하향 거리 센서를 사용합니다.

@[유튜브](https://youtu.be/aPQKgUof3Pc) *동영상: 속도 추정을 위한 ARK Flow 센서를 사용한 PX4 고정 위치([위치 모드](../flight_modes/position_mc.md))* <!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->

## 설정

광류에는 하향 카메라와 [거리 센서](../sensor/rangefinders.md)(LiDAR가 더 좋음)가 필요합니다. 이들은 MAVLink, I2C 또는 다른 버스로 연결 가능합니다.

:::note MAVLink를 통해 PX4에 연결된 경우 광류 장치는 [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD) 토픽을 퍼블리시 하여야하며, 거리 센서는 [DISANCE_SENSOR](https://mavlink.io/en/messages/common.html#DISTANCE_SENSOR) 토픽에 게시하여야합니다.
:::

다른 방향으로 이동할 때의 흐름 출력은 다음과 같아야합니다.

| 기체 이동 | 통합 흐름 |
| ----- | ----- |
| 전방    | + Y   |
| 후방    | - Y   |
| 우측    | - X   |
| 좌측    | + X   |

순수 회전의 경우 `integrated_xgyro`와 `integrated_x` (각각 `integrated_ygyro`와 `integrated_y`)는 동일하여야 합니다.

보편적인 설정은 아래와 같은 [PX4Flow](../sensor/px4flow.md)와 [Lidar-Lite](../sensor/lidar_lite.md)입니다.

![Optical flow lidar attached](../../assets/hardware/sensors/optical_flow/flow_lidar_attached.jpg)

광류 데이터는 다른 속도 데이터 소스와 융합됩니다. The approach used for fusing sensor data and any offsets from the center of the vehicle must be configured in the [estimator](#estimators).

## Flow Sensors/Cameras

### PX4Flow

[PX4Flow](../sensor/px4flow.md) is an optical flow camera that works indoors and in low outdoor light conditions without the need for an illumination LED. It is one of the easiest and most established ways to calculate the optical flow.

### ARK Flow

[ARK Flow](../uavcan/ark_flow.md) is a [UAVCAN](../uavcan/README.md) optical flow sensor, [distance sensor](../sensor/rangefinders.md), and IMU. It has a PAW3902 optical flow sensor, Broadcom AFBR-S50LV85D 30 meter distance sensor, and BMI088 IMU.

### PMW3901-Based Sensors

[PMW3901](../sensor/pmw3901.md) is an optical flow tracking sensor similar to what you would find in a computer mouse, but adapted to work between 80 mm and infinity. It is used in a number of products, including some from: Bitcraze, Tindie, Hex, Thone and Alientek.

### Other Cameras/Sensors

It is also possible to use a board/quad that has an integrated camera. For this the [Optical Flow repo](https://github.com/PX4/OpticalFlow) can be used (see also [snap_cam](https://github.com/PX4/snap_cam)).

## Range Finders

You can use any supported [distance sensor](../sensor/rangefinders.md). However we recommend using LIDAR rather than sonar sensors, because of their robustness and accuracy.

## Estimators

Estimators fuse data from the optical flow sensor and other sources. The settings for how fusing is done, and relative offsets to vehicle center must be specified for the estimator used.

The offsets are calculated relative to the vehicle orientation and center as shown below:

![Optical Flow offsets](../../assets/hardware/sensors/optical_flow/px4flow_offset.png)

Optical Flow based navigation is enabled by both the availableestimators: EKF2 and LPE (deprecated).

<a id="ekf2"></a>

### Extended Kalman Filter (EKF2)

For optical flow fusion using EKF2, set the use optical flow flag in the [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) parameter, as shown using QGroundControl below:

![QGroundControl - Calibrate Sensors](../../assets/ekf2/qgc_ekf2_enable_flow.png)

If your optical flow sensor is offset from the vehicle centre, you can set this using the following parameters.

| Parameter                                                                                           | Description                                                             |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <span id="EKF2_OF_POS_X"></span>[EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X) | X position of optical flow focal point in body frame (default is 0.0m). |
| <span id="EKF2_OF_POS_Y"></span>[EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) | Y position of optical flow focal point in body frame (default is 0.0m). |
| <span id="EKF2_OF_POS_Z"></span>[EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z) | Z position of optical flow focal point in body frame (default is 0.0m). |