# 시각 관성 주행거리 측정(VIO)

*Visual Inertial Odometry* (VIO)는 *지역적* 시작 위치를 기준으로 움직이는 기체의 3차원 *자세* (지역적 위치 및 방향)와 *속도*를 추정하는 [컴퓨터 비전](../computer_vision/README.md) 기술입니다. GPS가 없거나 신뢰할 수없는 상황 (예 : 실내 또는 다리 아래에서 비행시)에서 기체 내비게이션용으로 사용됩니다.

VIO는 기체 IMU의 관성 측정과 결합된 카메라 이미지에서 기체의 *자세*를 추정하기 위하여 [시각적 Odometry](https://en.wikipedia.org/wiki/Visual_odometry)를 사용합니다 (이미지 캡처 불량을 초래하는 빠른 기체 이동과 관련된 오류를 수정함).

*지원 가능한*  VIO 설정을 사용하도록 PX4와 보조 컴퓨터 설정 방법을 설명합니다.

<iframe width="650" height="365" src="https://www.youtube.com/embed/gWtrka2mK7U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<!-- https://youtu.be/gWtrka2mK7U -->

:::tip
위의 [Auterion 제품 동영상](https://auterion.com/enabling_uav_navigation_in_environments_with_limited_or_no_gps_signal/)은 [지원 가능한 설정](#supported_setup)을 사용하여 비행중인기체를 보여줍니다.
:::

:::note
이 (지원되는) 솔루션은 ROS를 사용하여 VIO 정보를 PX4로 라우팅합니다. PX4 자체는 적절한 [MAVLink 인터페이스](../ros/external_position_estimation.md#px4-mavlink-integration)를 통하여 제공되는 메시지 소스는 신경 쓰지 않습니다.
:::

<span id="supported_setup"></span>
## 지원 가능한 설정

지원 가능한 설정은 [T265 Intel Realsense 추적 카메라](../peripherals/camera_t265_vio.md) 및 ROS (보조 컴퓨터에서 실행)를 사용하여 PX4에 주행 거리 측정 정보를 제공합니다. The Auterion [VIO bridge ROS node](https://github.com/Auterion/VIO_bridge) provides a bridge between this (particular) camera and ROS.



### 카메라 장착

카메라를 보조 컴퓨터에 연결하고 프레임에 장착합니다.

- 제공된 케이블을 사용하여 [T265 Intel Realsense 추적 카메라](../peripherals/camera_t265_vio.md)를 연결합니다.
- 가능하면 렌즈가 아래쪽을 향하도록 카메라를 장착하십시오 (기본값).
- 카메라는 진동에 매우 민감합니다. 부드러운 장착이 권장됩니다 (예 : 방진폼 사용).


### ROS/VIO 설정

Bridge, ROS 및 PX4를 설정 :
- 보조 컴퓨터에서 [MAVROS](../ros/mavros_installation.md)를 설치하고 설정합니다.
- Auterion [VIO 브리지 ROS 노드](https://github.com/Auterion/VIO_bridge)를 가져옵니다.
  - catkin 작업 공간에서이 저장소를 복제하십시오.
    ```
    cd ~/catkin_ws/src
git clone https://github.com/Auterion/VIO.git
    ```
  - 패키지 빌드:
    ```
    cd ~/catkin_ws/src
catkin build px4_realsense_bridge
    ```
- 필요한 경우 카메라 방향을 설정합니다.
  - 카메라가 렌즈가 아래를 향하도록 장착 된 경우 VIO 브리지는 구성이 필요하지 않습니다 (기본값).
  - 다른 방향의 경우 아래 섹션에서 [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch)를 수정합니다.
    ```xml
    <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_cameraPose"
        args="0 0 0 0 1.5708 0 base_link camera_pose_frame 1000"/>
    ```
   카메라 ROS 프레임 `camera_pose_frame`을 mavros 드론 프레임 `base_link`에 연결하는 정적 변환입니다.
   - 처음 세 개의 `인수`는 비행 컨트롤러의 중심에서 카메라까지의 미터 단위로 *변환* x, y, z를 지정합니다. 예를 들어 카메라가 컨트롤러 앞 10cm, 위쪽 4cm 인 경우 처음 세 숫자는 [0.1, 0, 0.04, ...]입니다.
   - 다음 세 개의 `인수`는 라디안 (요, 피치, 롤)으로 회전을 지정합니다. 따라서 `[... 0, 1.5708, 0]`은 90도 내림(지면을 향함)을 의미합니다. 정면을 바라보는 것은 [... 0 0 0]입니다.

- PX4 EKF2 추정기를 조정하려면 [아래](#ekf2_tuning) 지침을 따르십시오.
- 적절한 시작 파일과 함께 `roslaunch`를 호출하여 VIO를 실행합니다.
  ```
  cd ~/catkin_ws/src
  roslaunch px4_realsense_bridge bridge_mavros.launch
  ```
  실행 파일 옵션은 다음과 같습니다.
  - [bridge_mavros.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros.launch) : 대부분의 경우 기체에 사용합니다 (브리지 및 MAVROS 시작).
  - [bridge.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge.launch) : 다른 구성 요소가 MAVROS 시작을 담당하는 경우 사용 (브리지 시작만)
  - [bridge.launch](https://github.com/Auterion/VIO/blob/master/launch/bridge_mavros_sitl.launch) : 다른 구성 요소가 MAVROS 시작을 담당하는 경우 사용 (브리지 시작만)
- 비행 컨트롤러 연결을 확인하십시오.

:::tip
*QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)를 사용하여 `ODOMETRY` 또는 `VISION_POSITION_ESTIMATE` 메시지를 받고 있는지 확인할 수 있습니다.(또는 구성 요소 ID가 197 (`MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY`) 인 `HEARTBEAT ` 메시지)
:::
- 첫 비행전에 [VIO가 올바르게 설정되었는지 확인하십시오](#verify_estimate).

<span id="ekf2_tuning"></span>
### PX4 튜닝

EKF2에서 외부 위치 정보를 사용하려면 다음 매개 변수를 설정하여야 합니다.

| 매개변수                                                                                                                                                                                                                               | 외부 위치 추정 설정                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                                         | 원하는 융합 모델에 따라 *시력 위치 융합*, *시력 속도 융합*, *시력 요 융합* 및 *외부 시력 회전*을 설정합니다.           |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                                         | 비전을 고도 추정의 기본 소스로 사용하려면 *비전*으로 설정합니다.                                          |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                         | 측정 타임 스탬프와 "실제" 캡처 시간의 차이로 설정합니다. 자세한 정보는 [아래](#tuning-EKF2_EV_DELAY)를 참고하십시오. |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | 차체 프레임에 대한 비전 센서의 위치를 설정합니다.                                                   |

*QGroundControl* > **기체 설정 > 매개변수 > EKF2**에서 설정할 수 있습니다.  (매개변수 변경 사항을 적용하려면 비행 컨트롤러를 재부팅하여야 합니다).

자세한 추가 정보는 [ECL/EKF 개요 & 튜닝 > 외부 비전 시스템 ](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)을 참고하십시오.

<span id="tuning-EKF2_EV_DELAY"></span>
#### Tuning EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)는 *IMU 측정에 대한 비전 위치 추정기 지연*입니다. 즉, 비전 시스템 타임스탬프와 IMU 클록 (EKF2의 "기본 클록")에 의해 기록된 "실제" 캡처 시간 간의 차이입니다.

기술적으로 이것은 MoCap과 (예를 들어) ROS 컴퓨터 사이에 정확한 타임스탬프 (도착 시간이 아님)와 시간 동기화 (예 : NTP)가있는 경우 0으로 설정할 수 있습니다. 실제로는 통신 체인의 지연이 설정에 따라 달라지기 때문에 약간의 경험적인 튜닝이 필요할 수 있습니다. It is rare that a system is setup with an entirely synchronised chain!

A rough estimate of the delay can be obtained from logs by checking the offset between IMU rates and the EV rates:

![ekf2_ev_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::note
A plot of external data vs. onboard estimate (as above) can be generated using [FlightPlot](../dev_log/flight_log_analysis.md#flightplot) or similar flight analysis tools.
:::

The value can further be tuned by varying the parameter to find the value that yields the lowest EKF innovations during dynamic maneuvers.

<span id="verify_estimate"></span>
## Check/Verify VIO Estimate

Perform the following checks to verify that VIO is working properly *before* your first flight:

* Set the PX4 parameter `MAV_ODOM_LP` to 1. PX4 will then stream back the received external pose as MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) messages. You can check these MAVLink messages with the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)
* Yaw the vehicle until the quaternion of the `ODOMETRY` message is very close to a unit quaternion (w=1, x=y=z=0).
  * At this point the body frame is aligned with the reference frame of the external pose system.
  * If you do not manage to get a quaternion close to the unit quaternion without rolling or pitching your vehicle, your frame probably still has a pitch or roll offset. Do not proceed if this is the case and check your coordinate frames again.
* Once aligned you can pick the vehicle up from the ground and you should see the position's z coordinate decrease. Moving the vehicle in forward direction, should increase the position's x coordinate. While moving the vehicle to the right should increase the y coordinate.
* Check that linear velocities in the message are in expressed in the *FRD* body frame reference frame.
* Set the PX4 parameter `MAV_ODOM_LP` back to 0. PX4 will stop streaming the `ODOMETRY` message back.

If those steps are consistent, you can try your first flight:
1. Put the vehicle on the ground and start streaming `ODOMETRY` feedback (as above). Lower your throttle stick and arm the motors.

   At this point, with the left stick at the lowest position, switch to position control. You should have a green light. The green light tells you that position feedback is available and position control is now activated.

1. Put the throttle stick in the middle (the dead zone) so that the vehicle maintains its altitude. Raising the stick will increase the reference altitude while lowering the value will decrease it. Similarly the other stick will change position over ground.
1. Increase the value of the throttle stick and the vehicle will take off, put it back to the middle right after.
1. Confirm that the vehicle can hold its position.


## Troubleshooting

First make sure MAVROS is able to connect successfully to the flight controller.

If it is connecting properly common problems/solutions are:

- **Problem:** I get drift / flyaways when the drone flies, but not when I carry it around with the props off.
  - If using the [T265](../peripherals/camera_t265_vio.md) try soft-mounting it (this camera is very sensitive to high frequency vibrations).

- **Problem:** I get toilet-bowling when VIO is enabled.
  - Make sure the orientation of the camera matches the transform in the launch file. Use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.

- **Problem:** I want to use vision position to do loop closing, and also want to run GPS.
  - This is really difficult, because when they disagree it will confuse the EKF. From testing it is more reliable to just use vision velocity (if you figure out a way to make this configuration reliable, let us know).


## Developer Information

Developers who are interested in extending this implementation (or writing a different one, which might not depend on ROS) should see [Using Vision or Motion Capture Systems for Position Estimation](../ros/external_position_estimation.md).

This topic also explains how to configure VIO for use with the LPE Estimator (deprecated).


## Further Information

- [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [Snapdragon > Installation > Install Snap VIO](../flight_controller/snapdragon_flight_software_installation.md#install-snap-vio)