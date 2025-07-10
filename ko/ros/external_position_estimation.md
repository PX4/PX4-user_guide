---
canonicalUrl: https://docs.px4.io/main/ko/ros/external_position_estimation
---

# 위치 추정을 위한 비전 또는 모션 캡처 사용

전역 위치 소스를 사용할 수 없거나 신뢰할 수 없는 경우(예: 실내나 다리 아래를 비행시)에, VIO(Visual Inertial Odometry) 및 MoCap(모션 캡처) 시스템을 사용하여 차량 내비게이션이 가능합니다.

VIO와 MoCap은 모두 "시각적" 정보에서 차량의 *포즈*(위치 및 자세)를 결정합니다. 그들 사이의 주요 차이점은 프레임 관점입니다.
- VIO는 *온보드 센서*를 사용하여 차량의 관점에서 포즈 데이터를 얻습니다([egomotion](https://en.wikipedia.org/wiki/Visual_odometry#Egomotion) 참조).
- MoCap은 *오프보드 카메라* 시스템을 사용하여, 3차원 공간에서 차량 포즈 데이터를 얻습니다(즉, 차량의 자세를 알려주는 외부 시스템임).

두 시스템 유형의 포즈 데이터를 사용하여 PX4 자동조종장치의 로컬 위치 추정값(로컬 원점 기준)을 업데이트할 수 있으며, 선택적으로 차량 자세 추정을 융합할 수 있습니다. 또한 외부 포즈 시스템이 선형 속도 측정을 제공하는 경우에는 상태 추정 개선에 사용할 수 있습니다(선속도 측정의 융합은 EKF2에서만 지원됨).

PX4 기반 시스템을 구성하여 MoCap/VIO 시스템(ROS 또는 일부 다른 MAVLink 시스템을 통해)에서 데이터를 가져오는 방법과 보다 구체적으로 VICON 및 Optitrack과 같은 MoCap 시스템과 [ROVIO](https://github.com/ethz-asl/rovio), [SVO](https://github.com/uzh-rpg/rpg_svo) 및 [PTAM](https://github.com/ethz-asl/ethzasl_ptam)과 같은 비전 기반 추정 시스템을 설정하는 방법을 설명합니다.

:::note
이 설명서는 EKF2 또는 LPE 추정기를 사용 여부에 따라 차이가 납니다.
:::

## PX4 MAVLink 통합

PX4는 외부 위치 정보를 얻기 위하여, 다음 MAVLink 메시지를 사용하고 이를 [uORB 주제](../middleware/uorb.md)에 매핑합니다.

| MAVLink                                                                                                                                                                | uORB                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_POSITION_ESTIMATE)                                                                      | `vehicle_visual_odometry` |
| [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD)) | `vehicle_visual_odometry` |
| [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP)                                                                                            | `vehicle_mocap_odometry`  |
| [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_MOCAP_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_MOCAP_NED)) | `vehicle_mocap_odometry`  |

EKF2는 `vehicle_visual_odometry` 주제만 구독하므로, 처음 두 메시지만 처리할 수 있습니다. MoCap 시스템은 EKF2와 함께 작동하기 위해 이러한 메시지를 생성하여야 합니다. 주행 거리 측정 메시지는 선형 속도도 PX4로 전송 가능한 유일한 메시지입니다. LPE 추정기는 두 주제를 모두 구독하므로, 위의 모든 메시지를 처리할 수 있습니다.

:::tip
EFK2는 PX4에서 사용하는 기본 추정기입니다.
LPE보다 테스트 및 지원이 더 잘 되므로, 우선적으로 사용하여야 합니다.
:::

메시지는 30Hz(공분산을 포함하는 경우)와 50Hz 사이에서 스트리밍되어야 합니다. 메시지 비율이 너무 낮으면, EKF2가 외부 비전 메시지를 융합하지 않습니다.

다음의 MAVLink "비전" 메시지는 현재 PX4에서 지원되지 않습니다: [GLOBAL_VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#GLOBAL_VISION_POSITION_ESTIMATE), [VISION_SPEED_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_SPEED_ESTIMATE), [VICON_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VICON_POSITION_ESTIMATE)


## 기준 프레임

PX4는 기준 프레임뿐만 아니라 로컬 바디 프레임에도 FRD(X **F**앞, Y**R**오른쪽 및 Z**D**자신)를 사용합니다. 자력계의 방향을 사용할 때 PX4 기준 좌표계 x 축은 북쪽과 정렬되며, 따라서 NED(X **N** orth, Y **E**ast, Z **D**own)라고 합니다. 대부분의 경우 PX4 추정기의 기준 좌표계와 외부 포즈 추정 중 하나가 일치하지 않습니다. 따라서 외부 포즈 추정의 기준 프레임은 다르게 명명되며 [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD)라고 합니다.

기준 프레임의 소스에 따라 MAVLink Vision/MoCap 메시지를 보내기 전에, 포즈 추정값에 사용자 정의 변환을 적용하여야 합니다. 이것은 PX4 규칙에 맞도록 포즈 추정의 상위 및 하위 프레임 방향을 변경하는 데 필요합니다. 필요한 변환을 위해 MAVROS [*odom* 플러그인](https://github.com/mavlink/mavros/blob/master/mavros_extras/src/plugins/odom.cpp)을 살펴보십시오.

:::tip ROS
사용자는 아래 [참조 프레임 및 ROS](#reference-frames-and-ros)을 참고하십시오.
:::

예를 들어, Optitrack 프레임워크를 사용하는 경우 로컬 프레임은 수평면(앞면 *x*, 오른쪽 *z*)에 $x{}$ 및 $z{}$가 있는 반면 < 0>y</em> 축은 수직이고 위쪽을 가르킵니다. 간단한 트릭은 NED 규칙을 얻기 위해 축을 변경하는 것입니다.

`x_{mav}`, `y_{mav}`, `z_{mav}`가 MAVLink를 통해 위치 피드백으로 전송되는 좌표라면, 결과는 다음과 같습니다.
```
x_{mav} = x_{mocap}
y_{mav} = z_{mocap}
z_{mav} = - y_{mocap}
```

방향과 관련하여 쿼터니언의 스칼라 부분 *w*을 동일하게 유지하고, 같은 방식으로 벡터 부분 *x*, *y* 및 *z*를 변경합니다. 이 트릭을 모든 시스템에 적용할 수 있습니다. NED 프레임을 가져와야 하는 경우 MoCap 출력을 보고 그에 따라 축을 교체하십시오.


## EKF2 튜닝과 설정

참고: 간략한 개요입니다. 자세한 내용은 [EKF2 튜닝 가이드](../advanced_config/tuning_the_ecl_ekf.md)를 참고하십시오.

EKF2와 함께 외부 위치 정보를 사용하려면, 다음 매개변수를 설정하여야 합니다. *QGroundControl* > **차량 설정 > 매개변수 > EKF2**에서 설정할 수 있습니다.

| 매개변수                                                                                                                                                                                                                               | 외부 위치 추정 설정                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)                                                                                                                                                         | Set *vision position fusion*, *vision velocity fusion*, *vision yaw fusion* and *external vision rotation* according to your desired fusion model. |
| [EKF2_HGT_MODE](../advanced_config/parameter_reference.md#EKF2_HGT_MODE)                                                                                                                                                         | 고도 추정을 위한 기본 소스로 비전을 사용하려면, *Vision*으로 설정하십시오.                                                                                                     |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                         | 측정 타임스탬프와 "실제" 캡처 시간 간의 차이로 설정합니다. 자세한 정보는 [아래](#tuning-EKF2_EV_DELAY)를 참고하십시오.                                                                    |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | 로봇의 몸체 프레임을 기준으로 비전 센서(또는 MoCap 마커)의 위치를 설정합니다.                                                                                                    |

:::tip
매개변수 변경 사항을 적용하려면, 비행 콘트롤러를 재부팅하십시오.
:::

<a id="tuning-EKF2_EV_DELAY"></a>

#### EKF2_EV_DELAY 튜닝

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)는 *IMU 측정에 대한 Vision Position Estimator 지연*입니다.

즉, 비전 시스템 타임스탬프와 IMU 시계(EKF2의 "기본 시계")에 의해 기록되었을 "실제" 캡처 시간 간의 차이입니다.

기술적으로, 이것은 MoCap과 (예를 들어) ROS 컴퓨터 사이에 정확한 타임스탬프 (도착 시간이 아님)와 시간 동기화 (예 : NTP)가있는 경우 0으로 설정할 수 있습니다. 실제로는, 이것은 전체 MoCap->PX4 체인의 지연이 설정에 따라 매우 다르므로, 약간의 경험적 튜닝이 요구됩니다. 시스템이 완전히 동기화된 체인으로 설정되는 경우는 매우 드뭅니다.

IMU 속도와 EV 속도 간의 오프셋을 확인하여, 로그에서 대략적인 지연 추정치를 계산할 수 있습니다. EV 속도 로깅을 활성화하려면, [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE)의 비트 7(컴퓨터 비전 및 회피)을 설정합니다.

![ekf2_ev_delay 로그](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::note
[FlightPlot](../log/flight_log_analysis.md#flightplot) 또는 유사한 비행 분석 도구를 사용하여, 외부 데이터 대 온보드 추정치(위 참조)의 플롯을 생성할 수 있습니다. At time of writing (July 2021) neither [Flight Review](../log/flight_log_analysis.md#flight-review-online-tool) nor [MAVGCL](../log/flight_log_analysis.md#mavgcl) support this functionality.
:::

이 값은 동적 기동 중에 가장 낮은 EKF 혁신을 산출하는 값을 찾기 위하여, 매개변수를 변경하여 추가 튜닝할 수 있습니다.

## LPE 튜닝과 설정

먼저 [SYS_MC_EST_GROUP](../advanced_config/parameter_reference.md#SYS_MC_EST_GROUP) 매개변수를 설정하여, [LPE 추정기로 전환](../advanced/switching_state_estimators.md)합니다.


:::note
`px4_fmu-v2` 하드웨어를 대상으로 하는 경우 LPE 모듈이 포함된 펌웨어 버전도 사용합니다(다른 FMU 시리즈 하드웨어용 펌웨어에는 LPE와 EKF가 모두 포함됨). LPE 버전은 각 PX4 릴리스의 zip 파일에서 찾거나, 빌드 명령 `make px4_fmu-v2_lpe`를 사용하여 소스에서 빌드합니다. 자세한 내용은 [코드 빌드](../dev_setup/building_px4.md)을 참고하십시오.
:::

### 외부 포즈 입력 활성화

LPE에서 외부 위치 정보를 사용하려면 다음 매개변수를 설정하여야 합니다. *QGroundControl* > **차량 설정 > 매개변수 > 로컬 위치 추정기**에서 설정합니다.

| 매개변수                                                                       | 외부 위치 추정 설정                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [LPE_FUSION](../advanced_config/parameter_reference.md#LPE_FUSION)         | *퓨즈 비전 위치*가 선택된 경우 비전 통합이 활성화됩니다(기본적으로 활성화되어 있음).                                 |
| [ATT_EXT_HDG_M](../advanced_config/parameter_reference.md#ATT_EXT_HDG_M) | 외부 제목 통합을 활성화하려면 1 또는 2로 설정합니다. 1로 설정하면 비전이 사용되는 반면, 2로 설정하면 MoCap 제목 사용이 활성화됩니다. |


### 기압계 퓨전 비활성화

VIO 또는 MoCap 정보에서 이미 매우 정확한 고도를 사용할 수 있는 경우에는, LPE에서 기압 보정을 비활성화하여 Z축의 드리프트를 줄이는 것이 유용합니다.

*QGroundControl*에서 [LPE_FUSION](../advanced_config/parameter_reference.md#LPE_FUSION) 매개변수의 *fuse baro* 옵션을 선택을 취소하여 수행할 수 있습니다.

### 노이즈 매개변수 조정

비전 또는 MoCap 데이터가 매우 정확하고 추정기가 이를 엄격하게 추적하기를 원하는 경우에는, 표준편차 매개변수인 [LPE_VIS_XY](../advanced_config/parameter_reference.md#LPE_VIS_XY) 및 [LPE_VIS_Z](../advanced_config/parameter_reference.md#LPE_VIS_Z)(VIO의 경우) 또는 [LPE_VIC_P](../advanced_config/parameter_reference.md#LPE_VIC_P)(MoCap의 경우)를 감소시켜야 합니다. 표준변차 매개변수를 줄이면, 추정자가 들어오는 포즈 추정치를 더 신뢰하게 됩니다. 허용된 최소값보다 낮게 설정하고, 강제 저장해야 할 수도 있습니다.

:::tip
성능이 좋지 않으면, [LPE_PN_V](../advanced_config/parameter_reference.md#LPE_PN_V) 매개변수를 중가시키십시오. 이로 인해 추정자는 속도 추정 중에 측정값을 더 신뢰하게 됩니다.
:::

## ROS 연동

ROS는 외부 포즈 정보를 제공하는 데 *필수*되지 않지만, 이미 VIO 및 MoCap 시스템과 잘 통합되어 있으므로 적극 권장합니다. PX4는 위와 같이 설정되어 있어야 합니다.

### 포즈 데이터를 ROS로 가져오기

VIO와 MoCap 시스템은 포즈 데이터를 얻는 방법이 다르며, 자체 설정과 주제가 있습니다.

특정 시스템에 대한 설정은 [아래](#setup_specific_systems)에서 설명합니다. 다른 시스템의 경우에는 공급업체의 설정 문서를 참고하십시오.


<a id="relaying_pose_data_to_px4"></a>

### 포즈 데이터를 PX4로 중계

MAVROS에는 다음 파이프라인을 사용하여 VIO 또는 MoCap 시스템에서 시각적 추정을 릴레이하는 플러그인이 있습니다.

| ROS                                                                    | MAVLink                                                                                                                                                                | uORB                      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| /mavros/vision_pose/pose                                               | [VISION_POSITION_ESTIMATE](https://mavlink.io/en/messages/common.html#VISION_POSITION_ESTIMATE)                                                                      | `vehicle_visual_odometry` |
| /mavros/odometry/out (`frame_id = odom`, `child_frame_id = base_link`) | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD)) | `vehicle_visual_odometry` |
| /mavros/mocap/pose                                                     | [ATT_POS_MOCAP](https://mavlink.io/en/messages/common.html#ATT_POS_MOCAP)                                                                                            | `vehicle_mocap_odometry`  |
| /mavros/odometry/out (`frame_id = odom`, `child_frame_id = base_link`) | [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) (`frame_id =` [MAV_FRAME_LOCAL_FRD](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_FRD)) | `vehicle_mocap_odometry`  |

위의 파이프라인 중 하나를 LPE와 함께 사용할 수 있습니다.

EKF2로 작업하는 경우 "비전" 파이프라인만 지원됩니다. EKF2에서 MoCap 데이터를 사용하려면, MoCap에서 가져온 포즈 주제를 [다시 매핑](http://wiki.ros.org/roslaunch/XML/remap)하여야 합니다.
- `geometry_msgs/PoseStamped` 또는 `geometry_msgs/PoseWithCovarianceStamped` 유형의 MoCap ROS 주제는 `/mavros/vision_pose/pose`로 다시 매핑하여야 합니다. `geometry_msgs/PoseStamped` 주제는 MoCap에 일반적으로 데이터에 대한 관련 공분산이 없으므로, 가장 일반적입니다.
- `nav_msgs/Odometry` ROS 메시지를 통해 데이터를 가져오면 `/mavros/odometry/out`에 다시 매핑해야 하며, `frame_id< /0> 및 <code>child_frame_id`에 따라 차이가 납니다.
- 주행 거리 프레임 `frame_id = odom`, `child_frame_id = base_link`는 `mavros/launch/px4_config.yaml`의 파일을 업데이트하여 변경할 수 있습니다. 그러나, 현재 버전의 mavros(`1.3.0`)는 tf 트리를 사용하여 `frame_id`에서 하드코딩된 프레임 `odom_ned`로의 변환을 찾을 수 있어야 합니다. tf 트리에서 하드코딩된 프레임 `base_link_frd`에 연결하는 `child_frame_id`에도 동일하게 적용됩니다. mavros `1.2.0`을 사용 중이고 `mavros/launch/px4_config.yaml` 파일을 업데이트하지 않은 경우에는, 큰 걱정 없이 주행 거리 측정 프레임 `frame_id = odom`, `child_frame_id = base_link`을 안전하게 사용할 수 있습니다.
- `child_frame_id = base_link`를 사용하여 px4에 주행 거리 측정 데이터를 보내는 경우에는, `nav_msgs/Odometry` 메시지의 `twist` 부분이 **관성 프레임이 아닌 **본문 프레임**으로 표현되었는 지 확인하여야 합니다.</li> </ul>


### 기준 프레임과 ROS

ROS와 PX4에서 사용하는 로컬과 전역 프레임은 같지 않습니다.

| 프레임 | PX4                                              | ROS                                                                     |
| --- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| 몸체  | FRD (X **F**orward, Y **R**ight, Z **D**own)     | FLU(X **F**forward, Y **L** ft, Z **U**p), 일반적으로 `base_link`라는 이름이 지정됨. |
| 전역  | FRD or NED (X **N**orth, Y **E**ast, Z **D**own) | FLU 또는 ENU(X **E**ast, Y **N** orth, Z **U**p), 이름은 `odm` 또는 `map`      |

:::tip ROS
프레임에 대한 자세한 내용은 [REP105: 모바일 플랫폼용 좌표 프레임](http://www.ros.org/reps/rep-0105.html)을 참고하십시오.
:::

두 프레임 모두 아래 이미지에 표시됩니다(왼쪽의 FRD/오른쪽의 FLU).

![기준 프레임](../../assets/lpe/ref_frames.png)

외부 방향 추정시 EKF2를 사용하면, 자북을 무시하거나 자북에 대한 방향 오프셋을 계산하고 보상할 수 있습니다. 선택에 따라 요 각도는 자북 또는 로컬 *x*에 대하여 제공됩니다.

:::note
MoCap 소프트웨어에서 강체를 생성시, 먼저 로봇의 로컬 *x* 축을 세계 *x* 축과 정렬하여야 합니다. 그렇지 않으면 요 추정값에 오프셋이 발생합니다. 이렇게 하면 외부 포즈 추정 융합이 제대로 작동하지 않을 수 있습니다. 본체와 기준 좌표계가 정렬될 때 요 각도는 0이어야 합니다.
:::

MAVROS를 사용하면 이 작업이 간단합니다. ROS는 ENU 프레임을 관례로 사용하므로, ENU에서 위치 피드백을 제공하여야 합니다. Optitrack 시스템이 있는 경우에는, ENU에 존재하는 ROS 주제에 대한 개체 포즈를 스트리밍하는 [mocap_optitrack](https://github.com/ros-drivers/mocap_optitrack) 노드를 사용할 수 있습니다. 다시 매핑하면 변환 없이 그대로 `mocap_pose_estimate`에 직접 게시할 수 있으며, MAVROS는 NED 변환을 처리합니다.

MAVROS 주행 거리 측정 플러그인을 사용하면, 좌표 프레임을 쉽게 처리할 수 있습니다. ROS의 tf 패키지를 사용합니다. 외부 포즈 시스템에는 PX4와 일치하지 않는 완전히 다른 프레임 규칙이 있을 수 있습니다. 외부 포즈 추정의 바디 프레임은 MOCAP 소프트웨어에서 바디 프레임을 설정하는 방법이나 드론에 VIO 센서를 장착하는 방법에 따라 달라질 수 있습니다. MAVROS 주행 거리 측정 플러그인은 MAVROS에 의해 알려진 기체의 FRD 또는 FLU 본체 프레임과 관련하여 외부 포즈의 자식 프레임이 어떻게 향하고 있는 지 알아야 합니다. 따라서 외부 포즈의 바디 프레임을 tf 트리에 추가하여야 합니다. 이것은 ROS 시작 파일에 다음 줄의 수정된 버전을 포함하여 수행할 수 있습니다.

```
  <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_externalPoseChildFrame"
        args="0 0 0 <yaw> <pitch> <roll> base_link <external_pose_child_frame> 1000"/>
```
외부 포즈의 바디 프레임이 `base_link` 또는 `base_link_frd`에 정상적으로 연결되도록 yaw, pitch 및 roll 값을 변경하였는 지 확인하십시오. 프레임 간의 변환을 지정하는 방법에 대한 추가 도움말은 [tf 패키지](http://wiki.ros.org/tf#static_transform_publisher)를 참고하십시오. rviz를 사용하여 프레임을 올바르게 부착했는 지 확인할 수 있습니다. `external_pose_child_frame`의 이름은 `nav_msgs/Odometry` 메시지의 child_frame_id와 일치하여야 합니다. 외부 포즈의 기준 프레임에도 동일하게 적용됩니다. 외부 포즈의 기준 좌표계를 `odom` 또는 `odom_frd` 프레임에 자식으로 부착하여야 합니다. 따라서, 다음 코드 줄을 적절하게 조정하십시오.
```
  <node pkg="tf" type="static_transform_publisher" name="tf_odom_externalPoseParentFrame"
        args="0 0 0 <yaw> <pitch> <roll> odom <external_pose_parent_frame> 1000"/>
```
기준 프레임에 위쪽을 가리키는 z축이 있으면, 회전 없이(yaw=0, pitch=0, roll=0) `odom` 프레임에 연결할 수 있습니다. `external_pose_parent_frame`의 이름은 주행 거리 메시지의 frame_id와 일치하여야 합니다.

:::note MAVROS
*odom* 플러그인을 사용시, 다른 노드가 외부 포즈의 참조와 자식 프레임 간의 변환을 게시하지 않는 것이 중요합니다. 이것은 *tf* 트리를 깨뜨릴 수 있습니다.
:::

<a id="setup_specific_systems"></a>

## 특정 시스템 설정

### OptiTrack MoCap

다음 단계는 [OptiTrack](https://optitrack.com/motion-capture-robotics/) 시스템에서 PX4로 위치 추정치를 제공하는 방법을 설명합니다. MoCap 시스템이 보정된 것으로 가정합니다. 보정 가이드는 [이 동영상](https://www.youtube.com/watch?v=cNZaFEghTBU)을 참고하십시오.

#### *Motive* MoCap 소프트웨어의 단계

* 로봇의 앞으로 방향을 [시스템 +x축](https://v20.wiki.optitrack.com/index.php?title=Template:Coordinate_System)에 맞춥니다.
* [Motive 소프트웨어에서 강체를 정의합니다](https://www.youtube.com/watch?v=1e6Qqxqe-k0). 로봇에 공백이 포함되지 않은 이름을 지정합니다. 예: `Rigidbody 1` 대신 `robot1`
* [Frame Broadacst 및 VRPN 스트리밍 활성화](https://www.youtube.com/watch?v=yYRNG58zPFo)
* 위쪽 축을 Z축으로 설정합니다(기본값은 Y).

#### 포즈 데이터를 ROS로 가져오기

* `vrpn_client_ros` 패키지를 설치합니다.
* 다음 명령어로 개별 주제에 대한 각 강체의 포즈를 얻을 수 있습니다.
  ```bash
  roslaunch vrpn_client_ros sample.launch server:=<mocap machine ip>
  ```

rigidbody의 이름을 `robot1`으로 지정하면, `/vrpn_client_node/robot1/pose`와 같은 주제를 얻게 됩니다.

#### 포즈 데이터 중계/재매핑

MAVROS는 `/mavros/vision_pose/pose`에 게시된 포즈 데이터를 PX4로 릴레이하는 플러그인을 제공합니다. MAVROS가 실행 중이라고 가정하면, MoCap `/vrpn_client_node/<rigid_body_name>/pose`에서 가져온 포즈 주제를 `/mavros/vision_pose/pose`로 직접 **다시 매핑**하면 됩니다. MAVROS가 `ATT_POS_MOCAP`를 PX4에 제공하는 `mocap` 주제도 있지만, EKF2에는 적용되지 않습니다. 그러나 LPE에는 적용됩니다.

:::note
포즈 주제 재매핑은 [PX4에 포즈 데이터 릴레이](#relaying_pose_data_to_px4)에서 설명합니다(`/vrpn_client_node/<rigid_body_name>/pose`는 `geometry_msgs/PoseStamped` 유형임).
:::

위에서 설명한 대로 EKF2 매개변수를 설정하였으면, 이제 PX4가 설정되고 MoCap 데이터를 통합합니다.

이제 첫 번째 비행을 진행할 준비가 되었습니다.


## 첫 번째 비행

위에서 설명한 (특정) 시스템 중 하나를 설정하였으면, 이제 테스트할 준비가 되었습니다. 아래 지침은 MoCap 및 VIO 시스템에서 수행하는 방법을 설명합니다.

### 외부 추정 확인

첫 비행 전에 다음을 확인하십시오.

* PX4 매개변수 `MAV_ODOM_LP`를 1로 설정합니다. PX4는 수신된 외부 포즈를 MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) 메시지로 다시 스트리밍합니다.
* *QGroundControl* [MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html)로 이러한 MAVLink 메시지를 확인할 수 있습니다. 이를 위하여, `ODOMETRY` 메시지의 쿼터니언이 단위 쿼터니언에 매우 가까워질 때까지 차량을 요잉합니다. (w=1, x=y=z=0)
* 이 시점에서 몸체 프레임은 외부 포즈 시스템의 기준 프레임과 정렬됩니다. 차량을 구르거나 피칭하지 않고 단위 쿼터니언에 가까운 쿼터니언을 얻을 수 없다면, 프레임에 여전히 피치 또는 롤 오프셋이 있을 수 있습니다. 이 경우에는 더 이상 진행하지 말고, 좌표 프레임을 다시 확인하십시오.
* 정렬되면 지면에서 차량을 들어올릴 수 있으며, 위치의 z 좌표가 감소하는 것을 볼 수 있습니다. 차량을 앞쪽으로 움직이면, 위치의 x 좌표가 증가합니다. 차량을 오른 쪽으로 이동하면, y 좌표는 증가합니다. 외부 포즈 시스템에서 선형 속도도 전송하는 경우에는, 선형 속도를 확인하여야 합니다. 선형 속도가 *FRD* 몸체 프레임 참조 프레임으로 표현되는 지 확인합니다.
* PX4 매개변수 `MAV_ODOM_LP`를 0로 재설정합니다. PX4는 이 메시지의 스트리밍을 중지합니다.

이러한 단계가 유지되면, 첫 번째 비행을 시도할 수 있습니다.

로봇을 바닥에 놓고, MoCap 피드백 스트리밍을 시작합니다. 왼쪽(스로틀) 스틱을 내리고, 모터를 작동시킵니다.

이때 왼쪽 스틱을 가장 낮은 위치에 놓고, 위치 제어로 전환합니다. 초록불이 켜져야 합니다. 녹색 표시등은 위치 피드백을 사용할 수 있고, 위치 제어가 활성화되었음을 알려줍니다.

왼쪽 스틱을 가운데에 놓으면, 데드존입니다. 이 스틱 값으로 로봇은 고도를 유지합니다. 스틱을 올리면 기준 고도가 증가하고, 값을 낮추면 감소합니다. x와 y의 오른쪽 스틱에 대해서도 동일합니다.

왼쪽 스틱의 값을 높이면 로봇이 이륙합니다. 바로 중간에 다시 놓습니다. 위치를 유지할 수 있는 지 확인하십시오.

작동하는 경우에는, 원격 지상국에서 위치 설정값을 전송하여 [오프보드](offboard_control.md) 실험을 설정할 수 있습니다.
