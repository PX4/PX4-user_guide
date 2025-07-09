---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/camera_t265_vio
---

# Intel® RealSense™ Tracking Camera T265 (VIO)

The [Intel® RealSense™ Tracking Camera T265](https://www.intelrealsense.com/tracking-camera-t265/) provides odometry information that can be used for [VIO](../computer_vision/visual_inertial_odometry.md), augmenting or replacing other positioning systems on PX4.

:::tip
This camera is recommended, and is used in the [Visual Inertial Odometry (VIO) > Suggested Setup](../computer_vision/visual_inertial_odometry.md#suggested_setup).
:::

![Intel® RealSense™ Tracking Camera T265 - Angled Image](../../assets/peripherals/camera_vio/t265_intel_realsense_tracking_camera_photo_angle.jpg)


## Where to Buy

[Intel® RealSense™ Tracking Camera T265](https://www.intelrealsense.com/tracking-camera-t265/) (store.intelrealsense.com)


## 설정 방법

At a high level:
- The [`realsense-ros` wrapper](https://github.com/IntelRealSense/realsense-ros) provided by Intel should be used to extract the raw data from the camera.
- 카메라는 렌즈가 아래를 향하도록 장착하여야 합니다 (기본값). Be sure to specify the camera orientation by publishing the static transform between the `base_link` and `camera_pose_frame` in a ROS launch file, for example:
    ```xml
    <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_cameraPose"
        args="0 0 0 0 1.5708 0 base_link camera_pose_frame 1000"/>
    ```
   This is a static transform that links the camera ROS frame `camera_pose_frame` to the MAVROS drone frame `base_link`.
   - the first three `args` specify *translation* x,y,z in metres from the center of the flight controller to the camera. 예를 들어 카메라가 컨트롤러 앞 10cm, 위쪽 4cm 인 경우 처음 세 숫자는 [0.1, 0, 0.04, ...]입니다.
   - 다음 세 개의 `인수`는 라디안 (요, 피치, 롤)으로 회전을 지정합니다. So `[... 0, 1.5708, 0]` means pitch down by 90° (facing the ground). 정면을 바라보는 것은 [... 0 0 0]입니다.
- The camera is sensitive to high-frequency vibrations! 방진 폼을 사용하여 장착하여야 합니다.
