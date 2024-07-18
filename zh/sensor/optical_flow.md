# 光流

_光流传感器_使用下视相机和向下的距离传感器进行速度估计。

<lite-youtube videoid="aPQKgUof3Pc" title="ARK Flow with PX4 Optical Flow Position Hold"/>

_Video: PX4 holding position using the ARK Flow sensor for velocity estimation (in [Position Mode](../flight_modes_mc/position.md))._

<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->

## 设置

光流的配置需要一个下视摄像头和 [距离传感器](../sensor/rangefinders.md) (最好是激光). 这些设备可以通过MAVLink、I2C或其他总线连接。

::: info If connected to PX4 via MAVLink the Optical Flow device must publish to the [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD) topic, and the distance sensor must publish to the [DISTANCE_SENSOR](https://mavlink.io/en/messages/common.html#DISTANCE_SENSOR) topic.
:::

在不同方向移动时光流的输出必须如下所示：

| Vehicle movement | Integrated flow |
| ---------------- | --------------- |
| Forwards         | + Y             |
| Backwards        | - Y             |
| Right            | - X             |
| Left             | + X             |

For pure rotations the `integrated_xgyro` and `integrated_x` (respectively `integrated_ygyro` and `integrated_y`) have to be the same.

An popular setup is the [PX4Flow](../sensor/px4flow.md) and [Lidar-Lite](../sensor/lidar_lite.md), as shown below.

![Optical flow lidar attached](../../assets/hardware/sensors/optical_flow/flow_lidar_attached.jpg)

Sensor data from the optical flow device is fused with other velocity data sources. The approach used for fusing sensor data and any offsets from the center of the vehicle must be configured in the [estimator](#estimators).

## Flow Sensors/Cameras

### ARK Flow

[ARK Flow](../dronecan/ark_flow.md) is a [DroneCAN](../dronecan/index.md) optical flow sensor, [distance sensor](../sensor/rangefinders.md), and IMU. It has a PAW3902 optical flow sensor, Broadcom AFBR-S50LV85D 30 meter distance sensor, and BMI088 IMU.

### PMW3901-Based Sensors

[PMW3901](../sensor/pmw3901.md) is an optical flow tracking sensor similar to what you would find in a computer mouse, but adapted to work between 80 mm and infinity. It is used in a number of products, including some from: Bitcraze, Tindie, Hex, Thone and Alientek.

### Other Cameras/Sensors

It is also possible to use a board/quad that has an integrated camera. For this the [Optical Flow repo](https://github.com/PX4/OpticalFlow) can be used (see also [snap_cam](https://github.com/PX4/snap_cam)).

## Range Finders

您可以使用任何支持的 [距离传感器](../sensor/rangefinders.md) 然而，我们建议使用激光而不是超声波传感器，因为它的鲁棒性和准确性更高。

## 估计器

估计器融合数据从光流传感器和其他资源获得。 The settings for how fusing is done, and relative offsets to vehicle center must be specified for the estimator used.

The offsets are calculated relative to the vehicle orientation and center as shown below:

![Optical Flow offsets](../../assets/hardware/sensors/optical_flow/px4flow_offset.png)

Optical Flow based navigation is enabled by both the availableestimators: EKF2 and LPE (deprecated).

<a id="ekf2"></a>

### Extended Kalman Filter (EKF2)

For optical flow fusion using EKF2, set [EKF2_OF_CTRL](../advanced_config/parameter_reference.md#EKF2_OF_CTRL).

If your optical flow sensor is offset from the vehicle centre, you can set this using the following parameters.

| 参数                                                                                                  | 描述                                                                      |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <a id="EKF2_OF_POS_X"></a>[EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X) | X position of optical flow focal point in body frame (default is 0.0m). |
| <a id="EKF2_OF_POS_Y"></a>[EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) | Y position of optical flow focal point in body frame (default is 0.0m). |
| <a id="EKF2_OF_POS_Z"></a>[EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z) | Z position of optical flow focal point in body frame (default is 0.0m). |
