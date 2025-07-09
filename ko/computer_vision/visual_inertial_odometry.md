---
canonicalUrl: https://docs.px4.io/main/ko/computer_vision/visual_inertial_odometry
---

# Visual Inertial Odometry (VIO)

*Visual Inertial Odometry* (VIO)는 *지역적* 시작 위치를 기준으로 움직이는 기체의 3차원 *자세* (지역적 위치 및 방향)와 *속도*를 추정하는 [컴퓨터 비전](../computer_vision/README.md) 기술입니다. GPS가 없거나 신뢰할 수없는 상황 (예 : 실내 또는 다리 아래에서 비행시)에서 기체 내비게이션용으로 사용됩니다.

VIO는 기체 IMU의 관성 측정과 결합된 카메라 이미지에서 기체의 *자세*를 추정하기 위하여 [시각적 Odometry](https://en.wikipedia.org/wiki/Visual_odometry)를 사용합니다 (이미지 캡처 불량을 초래하는 빠른 기체 이동과 관련된 오류를 수정함).

This topic gives guidance on configuring PX4 and a companion computer for a VIO setup.

:::note
The suggested setup uses ROS for routing VIO information to PX4. However, PX4 itself does not care about the source of messages, provided they are provided via the appropriate [MAVLink Interface](../ros/external_position_estimation.md#px4-mavlink-integration).
:::



<a id="suggested_setup"></a>

## Suggested Setup

A hardware and software setup for VIO is suggested in the sections below as an illustration of how to interface a VIO system with PX4. It makes use of an off-the-shelf tracking camera and a companion computer running ROS. ROS is used to read odometry information from the camera and supply it to PX4.

An example of a suitable tracking camera is the [Intel® RealSense™ Tracking Camera T265](../peripherals/camera_t265_vio.md).



### 카메라 장착

카메라를 보조 컴퓨터에 연결하고 프레임에 장착합니다.

- 가능하면 렌즈가 아래쪽을 향하도록 카메라를 장착하십시오 (기본값).
- Cameras are typically very sensitive to vibration; a soft mounting is recommended (e.g. using vibration isolation foam).



### Companion Setup

To setup ROS and PX4:
- 보조 컴퓨터에서 [MAVROS](../ros/mavros_installation.md)를 설치하고 설정합니다.
- Implement and run a ROS node to read data from the camera and publish the VIO odometry using MAVROS.
  - See the [VIO ROS node](#vio_ros_node) section below for details of the requirements for this node.
- PX4 EKF2 추정기를 조정하려면 [아래](#ekf2_tuning) 지침을 따르십시오.
- 비행 컨트롤러 연결을 확인하십시오.

:::tip
You can use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_inspector.html) to verify that you're getting `ODOMETRY` or `VISION_POSITION_ESTIMATE` messages (or check for `HEARTBEAT` messages that have the component id 197 (`MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY`)).
:::
- [Verify that VIO is set up correctly](#verify_estimate) before your first flight!



<a id="vio_ros_node"></a>

### ROS VIO node

In this suggested setup, a ROS node is required to
1. interface with the chosen camera or sensor hardware,
2. produce odometry messages containing the position estimate, which will be sent to PX4 using MAVROS, and
3. publish messages to indicate the VIO system status.

The implementation of the ROS node will be specific to the camera used and will need to be developed to use the interface and drivers appropriate for the camera.

The odometry messages should be of the type [`nav_msgs/Odometry`](http://docs.ros.org/en/noetic/api/nav_msgs/html/msg/Odometry.html) and published to the topic `/mavros/odometry/out`.

System status messages of the type [`mavros_msgs/CompanionProcessStatus`](https://github.com/mavlink/mavros/blob/master/mavros_msgs/msg/CompanionProcessStatus.msg) should be published to the topic `/mavros/companion_process/status`. These should identify the component as `MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY` (197) and indicate the `state` of the system. Recommended status values are:

- `MAV_STATE_ACTIVE` when the VIO system is functioning as expected,
- `MAV_STATE_CRITICAL` when the VIO system is functioning, but with low confidence, and
- `MAV_STATE_FLIGHT_TERMINATION` when the system has failed or the estimate confidence is unacceptably low.



<a id="ekf2_tuning"></a>

### PX4 튜닝

EKF2에서 외부 위치 정보를 사용하려면 다음 매개 변수를 설정하여야 합니다.

| 매개변수                                                                                                                                                                                                                               | 외부 위치 추정 설정                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [EKF2_EV_CTRL](../advanced_config/parameter_reference.md#EKF2_EV_CTRL)                                                                                                                                                           | Set *horizontal position fusion*, *vertical vision fusion*, *velocity fusion*, and *yaw fusion* according to your desired fusion model. |
| [EKF2_HGT_REF](../advanced_config/parameter_reference.md#EKF2_HGT_REF)                                                                                                                                                           | Set to *Vision* to use the vision as the reference sensor for altitude estimation.                                                      |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                         | 측정 타임 스탬프와 "실제" 캡처 시간의 차이로 설정합니다. 자세한 정보는 [아래](#tuning-EKF2_EV_DELAY)를 참고하십시오.                                                          |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | Set the position of the vision sensor with respect to the vehicle's body frame.                                                         |

*QGroundControl* > **기체 설정 > 매개변수 > EKF2**에서 설정할 수 있습니다.  (매개변수 변경 사항을 적용하려면 비행 컨트롤러를 재부팅하여야 합니다).

자세한 추가 정보는 [ECL/EKF 개요 & 튜닝 > 외부 비전 시스템 ](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)을 참고하십시오.



<a id="tuning-EKF2_EV_DELAY"></a>

#### Tuning EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)는 *IMU 측정에 대한 비전 위치 추정기 지연*입니다. 즉, 비전 시스템 타임스탬프와 IMU 클록 (EKF2의 "기본 클록")에 의해 기록된 "실제" 캡처 시간 간의 차이입니다.

Technically this can be set to 0 if there is correct timestamping (not just arrival time) and timesync (e.g. NTP) between MoCap and (for example) ROS computers. In reality, this may need some empirical tuning because delays in the communication chain are very setup-specific. It is rare that a system is set up with an entirely synchronised chain!

IMU 속도와 EV 속도 사이의 오프셋을 확인하여 로그에서 대략적인 지연 추정치를 얻을 수 있습니다.

![ekf2_ev_delay 로그](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::note
[FlightPlot](../dev_log/flight_log_analysis.md#flightplot) 또는 유사한 비행 분석 도구를 사용하여 외부 데이터와 온보드 추정치(위 참조)의 플롯을 그릴 수 있습니다.
:::

이 값은 동적 기동 중에 가장 낮은 EKF 혁신을 산출하는 값을 찾기 위하여 매개변수를 변경하여 추가로 조정할 수 있습니다.


<a id="verify_estimate"></a>

## VIO 예상치 확인

첫 비행 *전에* VIO가 정상 작동 여부를 확인하려면 다음 검사를 수행하십시오.

* PX4 매개변수 `MAV_ODOM_LP`를 1로 설정합니다. PX4는 수신된 외부 자세를 MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) 메시지로 재전송합니다. You can check these MAVLink messages with the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_inspector.html)
* `ODOMETRY` 메시지의 쿼터니언이 단위 쿼터니언 (w = 1, x = y = z = 0)에 매우 가까워 질 때까지 차량을 요잉합니다.
  * At this point, the body frame is aligned with the reference frame of the external pose system.
  * 기체를 구르거나 피칭하지 않고 단위 쿼터니언에 가까운 쿼터니언을 얻을 수 없다면, 여전히 프레임에 피치 또는 롤 오프셋이 있을 수 있습니다. 이 경우에는 더 이상 진행하지 말고 좌표 프레임을 다시 확인하십시오.
* Once aligned, you can pick the vehicle up from the ground and you should see the position's z coordinate decrease. Moving the vehicle in the forward direction should increase the position's x coordinate. Moving the vehicle to the right should increase the y coordinate.
* Check that linear velocities in the message are expressed in the *FRD* body frame reference frame.
* PX4 매개변수 `MAV_ODOM_LP`를 0로 재설정합니다. PX4는 `ODOMETRY` 메시지 재전송을 중지합니다.

이러한 단계가 유지되면, 첫 번째 비행을 시도할 수 있습니다.
1. 기체를 지상에 놓고 `ODOMETRY` 피드백 스트리밍을 시작합니다 (위 참조). 스로틀 스틱을 내리고 모터를 작동시키십시오.

   이 시점에서 왼쪽 스틱을 가장 낮은 위치에두고 위치 제어로 전환합니다. 초록불이 켜져야 합니다. 녹색 표시등은 위치 피드백을 사용할 수 있으며 위치 제어가 활성화되었음을 알려줍니다.

1. 기체가 고도를 유지하도록 스로틀 스틱을 중간(데드 존)에 놓습니다. 스틱을 올리면 기준 고도가 증가하고 값을 낮추면 감소합니다. Similarly, the other stick will change the position over the ground.
1. Increase the value of the throttle stick and the vehicle will take off. Move it back to the middle immediately afterwards.
1. 기체가 제자리를 유지하는 지 확인하십시오.


## 문제 해결

First, make sure MAVROS is able to connect successfully to the flight controller.

제대로 연결되는 경우 일반적인 문제 해결 방법은 다음과 같습니다.

- **문제 :** 드론 비행시 드리프트/플라이 어웨이를 얻습니다.
  - If using the [T265](../peripherals/camera_t265_vio.md) try soft-mounting it (this camera is very sensitive to high-frequency vibrations).

- **문제 :** VIO가 활성화되면 변기 볼링이 발생합니다.
  - 카메라의 방향이 시작 파일의 변환과 일치하는 지 확인합니다. Use the *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.

- **문제 :** 비전 위치를 사용하여 루프를 닫고 GPS도 실행하고 싶습니다.
  - 이문제는 EKF를 혼란스럽게 할 것이기 때문에 정말 어렵습니다. 테스트에서 비전 속도를 사용하는 것이 더 안정적입니다 (이 설정을 신뢰할 수있는 방법을 찾으면 알려주십시오).


## 개발자 정보

이 구현을 확장하는 데 관심이있는 개발자 (또는 ROS에 의존하지 않을 수있는 다른 구현을 작성)는 [위치 추정용 비전 또는 모션 캡처 시스템 사용](../ros/external_position_estimation.md)을 참조하여야 합니다.

이 항목에서는 LPE Estimator (사용되지 않음)와 함께 사용할 VIO를 구성하는 방법도 설명합니다.


## 추가 정보

- [ECL/EKF 개요와 튜닝 > 외부 비젼 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
