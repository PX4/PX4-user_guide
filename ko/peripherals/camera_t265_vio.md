---
canonicalUrl: https://docs.px4.io/main/ko/peripherals/camera_t265_vio
---

# T265 리얼센스 추적 카메라(VIO)

[Intel Realsense 추적 카메라 T265 ](https://www.intelrealsense.com/tracking-camera-t265/)는 [VIO](../computer_vision/visual_inertial_odometry.md)에 사용할 수 있는 주행 거리 측정 정보를 제공하여, PX4의 다른 포지셔닝 시스템을 보강하거나 대체합니다.

:::tip
이 카메라를 추천하며, [VIO (Visual Inertial Odometry) > 설정](../computer_vision/visual_inertial_odometry.md#supported_setup)에서 사용됩니다.
:::

![Intel Realsense 추적 카메라 T265 - 각진 이미지](../../assets/peripherals/camera_vio/t265_intel_realsense_tracking_camera_photo_angle.jpg)


## 구매 링크

[Intel® RealSense™ Tracking Camera T265](https://www.intelrealsense.com/tracking-camera-t265/) (store.intelrealsense.com)


## 설정 방법

[시각 관성 오도메 트리 (VIO)](../computer_vision/visual_inertial_odometry.md)에서는  T265 카메라를 설정 방법을 설명합니다.

전체 개요:
- [VIO 브리지 ROS 노드](https://github.com/Auterion/VIO_bridge)는 ROS와 카메라의 브리지를 제공합니다. 이 노드는 T265 카메라에만 사용할 수 있습니다.
- 카메라는 렌즈가 아래를 향하도록 장착하여야 합니다 (기본값). 다른 방향의 경우 아래 섹션에서 [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch)를 수정합니다.
    ```xml
    <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_cameraPose"
        args="0 0 0 0 1.5708 0 base_link camera_pose_frame 1000"/>
    ```
   카메라 ROS 프레임 `camera_pose_frame`을 mavros 드론 프레임 `base_link`에 연결하는 정적 변환입니다.
   - 처음 세 개의 `인수`는 비행 컨트롤러의 중심에서 카메라까지의 미터 단위로 *변환* x, y, z를 지정합니다. 예를 들어 카메라가 컨트롤러 앞 10cm, 위쪽 4cm 인 경우 처음 세 숫자는 [0.1, 0, 0.04, ...]입니다.
   - 다음 세 개의 `인수`는 라디안 (요, 피치, 롤)으로 회전을 지정합니다. 따라서 `[... 0, 1.5708, 0]`은 90도 내림(지면을 향함)을 의미합니다. 정면을 바라보는 것은 [... 0 0 0]입니다.
- 카메라는 고주파 진동에 민감합니다! 방진 폼을 사용하여 장착하여야 합니다.


<span id="launch_files"></span> 다양한 시나리오에 대한 실행 파일이 제공됩니다.

| 실행 파일                                                                                                       | 시작                   | 설명                               |
| ----------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- |
| [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch)             | Bridge, MAVROS       | 대부분의 경우 기체에 사용                   |
| [bridge.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge.launch)                           | Bridge에만 사용          | 다른 구성 요소가 MAVROS 시작을 담당하는 경우 사용. |
| [bridge_mavros_sitl.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros_sitl.launch) | Bridge, MAVROS, SITL | 시뮬레이션 용도                         |
