---
canonicalUrl: https://docs.px4.io/main/ko/computer_vision/visual_inertial_odometry
---

# Visual Inertial Odometry (VIO)

*Visual Inertial Odometry* (VIO)는 *지역적* 시작 위치를 기준으로 움직이는 기체의 3차원 *자세* (지역적 위치 및 방향)와 *속도*를 추정하는 [컴퓨터 비전](../computer_vision/README.md) 기술입니다. GPS가 없거나 신뢰할 수없는 상황 (예 : 실내 또는 다리 아래에서 비행시)에서 기체 내비게이션용으로 사용됩니다.

VIO는 기체 IMU의 관성 측정과 결합된 카메라 이미지에서 기체의 *자세*를 추정하기 위하여 [시각적 Odometry](https://en.wikipedia.org/wiki/Visual_odometry)를 사용합니다 (이미지 캡처 불량을 초래하는 빠른 기체 이동과 관련된 오류를 수정함).

*지원 가능한*  VIO 설정을 사용하도록 PX4와 보조 컴퓨터 설정 방법을 설명합니다.

<iframe width="650" height="365" src="https://www.youtube.com/embed/gWtrka2mK7U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- https://youtu.be/gWtrka2mK7U -->

:::tip
위의 [Auterion 제품 동영상](https://auterion.com/enabling_uav_navigation_in_environments_with_limited_or_no_gps_signal/)은 [지원 가능한 설정](#supported_setup)을 사용하여 비행중인기체를 보여줍니다.
:::

:::note
이 (지원되는) 솔루션은 ROS를 사용하여 VIO 정보를 PX4로 라우팅합니다. PX4 자체는 적절한 [MAVLink 인터페이스](../ros/external_position_estimation.md#px4-mavlink-integration)를 통하여 제공되는 메시지 소스는 신경 쓰지 않습니다.
:::

<a id="supported_setup"></a>

## 지원 가능한 설정

지원 가능한 설정은 [T265 Intel Realsense 추적 카메라](../peripherals/camera_t265_vio.md) 및 ROS (보조 컴퓨터에서 실행)를 사용하여 PX4에 주행 거리 측정 정보를 제공합니다. The Auterion [VIO bridge ROS node](https://github.com/Auterion/VIO_bridge) provides a bridge between this (particular) camera and ROS.



### 카메라 장착

카메라를 보조 컴퓨터에 연결하고 프레임에 장착합니다.

- 제공된 케이블을 사용하여 [T265 Intel Realsense 추적 카메라](../peripherals/camera_t265_vio.md)를 연결합니다.
- 가능하면 렌즈가 아래쪽을 향하도록 카메라를 장착하십시오 (기본값).
- The camera is very sensitive to vibration; a soft mounting is recommended (e.g. using vibration isolation foam).


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



<a id="ekf2_tuning"></a>

### PX4 튜닝

EKF2에서 외부 위치 정보를 사용하려면 다음 매개 변수를 설정하여야 합니다.

| 매개변수                                                                                                                                                                                                                               | 외부 위치 추정 설정                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                                         | Set *vision position fusion*, *vision velocity fusion*, *vision yaw fusion* and *external vision rotation* according to your desired fusion model. |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                                         | 비전을 고도 추정의 기본 소스로 사용하려면 *비전*으로 설정합니다.                                                                                                              |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                         | 측정 타임 스탬프와 "실제" 캡처 시간의 차이로 설정합니다. 자세한 정보는 [아래](#tuning-EKF2_EV_DELAY)를 참고하십시오.                                                                     |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | 차체 프레임에 대한 비전 센서의 위치를 설정합니다.                                                                                                                       |

*QGroundControl* > **기체 설정 > 매개변수 > EKF2**에서 설정할 수 있습니다.  (매개변수 변경 사항을 적용하려면 비행 컨트롤러를 재부팅하여야 합니다).

자세한 추가 정보는 [ECL/EKF 개요 & 튜닝 > 외부 비전 시스템 ](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)을 참고하십시오.



<a id="tuning-EKF2_EV_DELAY"></a>

#### Tuning EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)는 *IMU 측정에 대한 비전 위치 추정기 지연*입니다. 즉, 비전 시스템 타임스탬프와 IMU 클록 (EKF2의 "기본 클록")에 의해 기록된 "실제" 캡처 시간 간의 차이입니다.

기술적으로 이것은 MoCap과 (예를 들어) ROS 컴퓨터 사이에 정확한 타임스탬프 (도착 시간이 아님)와 시간 동기화 (예 : NTP)가있는 경우 0으로 설정할 수 있습니다. In reality, this may need some empirical tuning because delays in the communication chain are very setup-specific. 시스템이 완전히 동기화된 체인으로 설정되는 경우는 드뭅니다!

IMU 속도와 EV 속도 사이의 오프셋을 확인하여 로그에서 대략적인 지연 추정치를 얻을 수 있습니다.

![ekf2_ev_delay 로그](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::note
[FlightPlot](../dev_log/flight_log_analysis.md#flightplot) 또는 유사한 비행 분석 도구를 사용하여 외부 데이터와 온보드 추정치(위 참조)의 플롯을 그릴 수 있습니다.
:::

이 값은 동적 기동 중에 가장 낮은 EKF 혁신을 산출하는 값을 찾기 위하여 매개변수를 변경하여 추가로 조정할 수 있습니다.


<a id="verify_estimate"></a>

## VIO 예상치 확인

첫 비행 *전에* VIO가 정상 작동 여부를 확인하려면 다음 검사를 수행하십시오.

* PX4 매개변수 `MAV_ODOM_LP`를 1로 설정합니다. PX4는 수신된 외부 자세를 MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) 메시지로 재전송합니다. 이러한 MAVLink 메시지는 *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)로 확인할 수 있습니다.
* `ODOMETRY` 메시지의 쿼터니언이 단위 쿼터니언 (w = 1, x = y = z = 0)에 매우 가까워 질 때까지 차량을 요잉합니다.
  * 이 시점에서 바디 프레임은 외부 포즈 시스템의 참조 프레임과 정렬됩니다.
  * 기체를 구르거나 피칭하지 않고 단위 쿼터니언에 가까운 쿼터니언을 얻을 수 없다면, 여전히 프레임에 피치 또는 롤 오프셋이 있을 수 있습니다. 이 경우에는 더 이상 진행하지 말고 좌표 프레임을 다시 확인하십시오.
* 정렬이 완료되면 지상에서 기체를 들어 올릴 수 있으며 위치의 z 좌표가 감소하는 것을 볼 수 있습니다. 기체를 앞쪽으로 움직이면 x 좌표가 증가합니다. 차량을 오른쪽으로 이동하면 y 좌표는 증가합니다.
* 메시지의 선형 속도가 *FRD* 본문 프레임 참조 프레임에 표현되어 있는지 확인합니다.
* PX4 매개변수 `MAV_ODOM_LP`를 0로 재설정합니다. PX4는 `ODOMETRY` 메시지 재전송을 중지합니다.

이러한 단계가 유지되면, 첫 번째 비행을 시도할 수 있습니다.
1. 기체를 지상에 놓고 `ODOMETRY` 피드백 스트리밍을 시작합니다 (위 참조). 스로틀 스틱을 내리고 모터를 작동시키십시오.

   이 시점에서 왼쪽 스틱을 가장 낮은 위치에두고 위치 제어로 전환합니다. 초록불이 켜져야 합니다. 녹색 표시등은 위치 피드백을 사용할 수 있으며 위치 제어가 활성화되었음을 알려줍니다.

1. 기체가 고도를 유지하도록 스로틀 스틱을 중간(데드 존)에 놓습니다. 스틱을 올리면 기준 고도가 증가하고 값을 낮추면 감소합니다. 마찬가지로 다른 스틱은 지상에서 위치를 변경합니다.
1. 스로틀 스틱의 값을 높이면 차량이 이륙하면 즉시 중앙에 다시 놓습니다.
1. 기체가 제자리를 유지하는 지 확인하십시오.


## 문제 해결

먼저 MAVROS가 비행 컨트롤러에 성공적으로 연결할 수 있는지 확인하십시오.

제대로 연결되는 경우 일반적인 문제 해결 방법은 다음과 같습니다.

- **문제 :** 드론 비행시 드리프트/플라이 어웨이를 얻습니다.
  - [T265](../peripherals/camera_t265_vio.md)를 사용하는 경우 소프트 마운트를 시도하십시오. 이 카메라는 고주파 진동에 매우 민감합니다.

- **문제 :** VIO가 활성화되면 변기 볼링이 발생합니다.
  - 카메라의 방향이 시작 파일의 변환과 일치하는 지 확인합니다. *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)를 사용하여 MAVROS에서 오는 `ODOMETRY` 메시지의 속도가 FRD 좌표계에 정렬되었는지 확인합니다.

- **문제 :** 비전 위치를 사용하여 루프를 닫고 GPS도 실행하고 싶습니다.
  - 이문제는 EKF를 혼란스럽게 할 것이기 때문에 정말 어렵습니다. 테스트에서 비전 속도를 사용하는 것이 더 안정적입니다 (이 설정을 신뢰할 수있는 방법을 찾으면 알려주십시오).


## 개발자 정보

이 구현을 확장하는 데 관심이있는 개발자 (또는 ROS에 의존하지 않을 수있는 다른 구현을 작성)는 [위치 추정용 비전 또는 모션 캡처 시스템 사용](../ros/external_position_estimation.md)을 참조하여야 합니다.

이 항목에서는 LPE Estimator (사용되지 않음)와 함께 사용할 VIO를 구성하는 방법도 설명합니다.


## 추가 정보

- [ECL/EKF 개요와 튜닝 > 외부 비젼 시스템](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
