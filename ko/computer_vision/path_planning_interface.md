# 경로 계획 인터페이스

PX4는 보조 컴퓨터의 경로 계획 서비스 통합을 위하여 여러 가지 MAVLink 인터페이스를 사용합니다 (임무 수행 장애물 회피, [안전 착륙](../computer_vision/safe_landing.md) 및 향후 개발 서비스 포함).

- 두 개의 [MAVLink 경로 계획 프로토콜](https://mavlink.io/en/services/trajectory.html) 인터페이스가 있습니다. 
  - [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) : PX4에서 *희망 경로* 전송에 사용됨. 경로계획 소프트웨어에서 *계획 경로*에 대한 설정점 스트림을 PX4에 전송할 수 있습니다.
  - [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER)는 (또는) 경로계획 소프트웨어에서 PX4에 *계획 경로*를 베지어 곡선으로 전송할 수 있습니다. 곡선은 주어진 기간 동안 기체의 (이동) 위치 설정치를 나타냅니다.
- [HEARTBEAT/연결 프로토콜](https://mavlink.io/en/services/heartbeat.html)은 "작동중"임을 감지합니다.
- [LOCAL_POSITION_NED](https://mavlink.io/en/messages/common.html#LOCAL_POSITION_NED) 및 [ALTITUDE](https://mavlink.io/en/messages/common.html#ALTITUDE)는 각각 기체의 로컬 위치와 고도를 전송합니다.

[COM_OBS_AVOID = 1](../advanced_config/parameter_reference.md#COM_OBS_AVOID)인 경우 PX4에서 자동 모드 (착륙, 이륙, 보류, 임무, 복귀)에서 경로 계획이 활성화됩니다. 이러한 모드에서 경로 계획 소프트웨어는 PX4에 설정값을 제공할 것으로 예상됩니다. 소프트웨어가 특정 비행 모드를 지원할 수없는 경우 기체의 설정값을 미러링하여야 합니다.

:::tip MAVLink를 통해 PX4 UORB 토픽에서 ROS 로의 메시지 흐름은 모두 [PX4 장애물 회피 > 메시지 흐름](https://github.com/PX4/avoidance#message-flows)에 문서화되어 있습니다.
:::

이 인터페이스를 사용하는 모든 서비스는 동일한 유형과 형식의 메시지를 송수신합니다. 따라서 개발자는 이 인터페이스를 사용하여 새로운 보조 컴퓨터의 경로 계획 서비스를 만들거나 기존 플래너 소프트웨어를 조정할 수 있습니다.

:::note
[PX4 Vision Autonomy Development Kit](../complete_vehicles/px4_vision_kit.md)는 경로계획 소프트웨어 개발에 권장됩니다. [PX4 회피](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) 소프트웨어는 사전 설치되어 제공되며, 자체 알고리즘으로 사용할 수 있습니다.
:::

## PX4 설정

경로 계획은 [COM_OBS_AVOID](../advanced_config/parameter_reference.md#COM_OBS_AVOID)를 1로 [설정](../advanced_config/parameters.md)하여 PX4내에서 활성화됩니다.

## 보조 컴퓨터 설정

보조 컴퓨터 하드웨어와 소프트웨어 구성과 설정은 [PX4 회피](https://github.com/PX4/avoidance#obstacle-detection-and-avoidance) Github 저장소에서 제공됩니다.

필요한 실제 구성과 설정은 사용하는 플래너에 따라 달라집니다.

:::warning
한 번에 하나의 플래너만 보조 컴퓨터에서 실행할 수 있습니다 (이 문서 작성 당시에는). 이는 다른 플래너를 사용하는 오프보드 기능을 동일한 기체에서 활성화 할 수 없음을 의미합니다. 기체는 장애물 회피 및 충돌 방지를 지원할 수 있지만 안전한 착륙은 할 수 없습니다. 또는 그 반대.
:::

<span id="waypoint_interface"></span>

## 궤적 인터페이스

PX4는 *원하는 경로*에 대한 정보를 보조 컴퓨터 (`COM_OBS_AVOID = 1`, *자동* 모드에서)로 전송하고, 경로계획 소프트웨어에서 *계획된 경로*의 설정점들을 다시 수신합니다. 

원하는 경로 정보는 아래 [PX4 웨이포인트 인터페이스](#px4_waypoint_interface)에 설명 된대로 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 메시지를 사용하여 PX4에서 전송됩니다.

경로 플래너 소프트웨어는 `TRAJECTORY_REPRESENTATION_WAYPOINTS` ([보조 컴퓨터 웨이포인트 인터페이스](#companion_waypoint_interface) 참조) 또는 [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) ( [Companion Bezier Trajectory Interface](#bezier_interface) 참조). 차이점은 웨이포인트는 다음 세트포인트 목적지를 지정하는 반면에, 베지어 궤적은 정확한 차량 움직임을 지정한다는 것입니다 (즉, 시간에 따라 이동하는 세트포인트).

:::warning
경로계획 소프트웨어는 작업을 실행하는 동안 이러한 인터페이스를 혼합해서는 안됩니다 (PX4는 두 유형의 마지막 수신 메시지를 사용합니다).
:::

<span id="px4_waypoint_interface"></span>

### PX4 웨이포인트 인터페이스

PX4는 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 메시지에 희망 경로를 초초당 5회 전송합니다.

PX4에서 설정한 필드 :

- `time_usec` : UNIX Epoch 시간.
- `valid_points`: 3
- Point 0 - FlightTaskAutoMapper에 의해 *튜닝된 현재 웨이포인트 유형* ([아래 노트](#type_adapted) 참조) : 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: *현재* 임무 웨이포인트의 유형 적응 x-y-z NED 로컬 위치
  - `vel_x[0]`, `vel_y[0]`, `vel_z[0]`: *현재* 임무 웨이포인트의 유형 적응 x-y-z NED 로컬 속도
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 현재 요 각도
  - `vel_yaw[0]`: NaN
  - `command[0]`: 현재 웨이포인트에서의 [MAVLink 명령어](https://mavlink.io/en/messages/common.html#mav_commands) 
- Point 1 - 현재 웨이 포인트 (수정되지 않음 / 조정되지 않은 유형) : 
  - `pos_x[1]`, `pos_y[1]`, `pos_z[1]`: *현재* 임무 웨이포인트의 x-y-z NED 로컬 위치
  - `vel_x[1]`, `vel_y[1]`, `vel_z[1]`: NaN
  - `acc_x[1]`, `acc_y[1]`, `acc_z[1]`: NaN
  - `pos_yaw[1]`: 요 설정점
  - `vel_yaw[1]`: 요 속도 설정점
  - `command[1]`: 현재 웨이포인트에서의 [MAVLink 명령어](https://mavlink.io/en/messages/common.html#mav_commands) 
- Point 2 - 로컬 좌표의 다음 웨이 포인트 (수정되지 않음 / 조정되지 않은 유형) : 
  - `pos_x[2]`, `pos_y[2]`, `pos_z[2]`: *다음* 임무 웨이포인트의 x-y-z NED 로컬 위치
  - `vel_x[2]`, `vel_y[2]`, `vel_z[2]`: NaN
  - `acc_x[2]`, `acc_y[2]`, `acc_z[2]`: NaN
  - `pos_yaw[2]`: 요 설정점
  - `vel_yaw[2]`: 요 속도 설정점
  - `command[2]`: 다음 웨이포인트에서의 [MAVLink 명령어](https://mavlink.io/en/messages/common.html#mav_commands) 
- 다른 모든 인덱스와 필드는 NaN으로 설정됩니다.

<span id="type_adapted"></span>
참고:

- Point 0은 타겟 유형에 따라 수정된 현재 웨이포인트/타겟입니다. 예를 들어 착륙tl 목표 x, y 좌표 및 하강 속도를 지정하는 것이 합리적입니다. 이를 달성하기 위해 `FlightTaskAutoMapper`는 위치의 z 구성 요소를 NAN으로 설정하고 z-속도를 원하는 값으로 설정하기 위해 Point 0의 착륙 웨이포인트를 수정합니다.
- Point 1과 2는 안전 착륙 계획자가 사용하지 않습니다.
- Point 1은 지역 및 글로벌 플래너가 사용합니다.

<span id="companion-failure-handling"></span>

#### 보조 컴퓨터의 실패 처리

PX4는 오프보드 시스템에서 메시지가 수신되지 않는 경우를 안전하게 처리합니다.

- 실행중인 플래너가없고 `COM_OBS_AVOID`가 부팅시 활성화 된 경우 : 
  - 비행 전 검사는 (기체 모드와 관계없이) 실패하고 `COM_OBS_AVOID`가 0으로 설정될 때까지 비행하지 않습니다.
- 실행중인 플래너가없고 `COM_OBS_AVOID`가 부팅후 활성화 된 경우 : 
  - 기체는 수동 모드에서 정상적으로 작동합니다.
  - 자율 모드(예 : 착륙 모드)로 전환하면 즉시 [유지 모드](../flight_modes/hold.md)로 돌아갑니다.
- 외부 경로 계획이 활성화 된 경우 : 
  - `HEARTBEAT`가 분실된 경우 PX4는 "Avoidance system lost"또는 "Avoidance system timeout"(기체 상태에 따라 다름)을 나타내는 상태 메시지 (*QGroundControl*에 표시됨)를 내 보냅니다. . 이것은 현재 비행 모드와 관계가 없습니다.
  - 궤적 메시지가 0.5 초 이상 수신되지 않고, 기체가 자율 모드(복귀, 임무, 이륙, 착륙)에인 경우에는 기체는 [유지 모드](../flight_modes/hold.md)로 전환됩니다. :::note 플래너는 항상 이 기간에 포인트를 제공하여야 합니다.
  - 플래너는 기체가 경로 계획을 제공하지 않는 모드나 상태이면 수신한 설정값을 미러링합니다. (즉, 기체가 원하는 경로를 따라가는 데 약간의 지연이 있음).
:::
  - 경로 계획 중에 마지막으로 제공된 베지어 궤적의 실행 시간이 만료되면 ([베지어 궤적 인터페이스](#bezier_interface)를 사용할 때) 0.5 초 이내에 새 메시지를 받지 못하는 것과 동일하게 처리됩니다 (예 : 기체가 [대기 모드](../flight_modes/hold.md)).

<span id="companion_waypoint_interface"></span>

## 보조 컴퓨터 웨이포인트 인터페이스

경로계획 소프트웨어 (보조 컴퓨터에서 실행)는 계획된 경로를 Point 0에 설정점이있는 [TRAJECTORY_REPRESENTATION_WAYPOINTS](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_WAYPOINTS) 메시지의 스트림으로 PX4에 *전송할 수 있습니다 *.

보조 컴퓨터의 메시지 필드는 다음과 같이 설정됩니다.

- `time_usec` : UNIX Epoch 시간.
- `valid_points`: 1
- 현재 기체 정보 
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED 기체 지역 위치 세트포인트
  - `pos_x[0]`, `pos_y[0]`, `pos_z[0]`: x-y-z NED 세트포인트
  - `acc_x[0]`, `acc_y[0]`, `acc_z[0]`: NaN
  - `pos_yaw[0]`: 요 각도 설정점
  - `vel_yaw[0]`: 요 속도 설정점
  - `command[0]`: NaN.
- All other indices/fields are set as NaN.

A planner that implements this interface must:

- Emit setpoints at more than 2Hz when receiving messages from PX4. PX4 will enter [Hold mode](../flight_modes/hold.md) if no message is received for more than 0.5s.
- Mirror back setpoints it receives when it doesn't support planning for the current vehicle state (e.g. the local planner would mirror back messages sent during safe landing, because it does not support Land mode).

<span id="bezier_interface"></span>

## Companion Bezier Trajectory Interface

The path planning software (running on the companion computer) *may* send the planned path to PX4 as a stream of [TRAJECTORY_REPRESENTATION_BEZIER](https://mavlink.io/en/messages/common.html#TRAJECTORY_REPRESENTATION_BEZIER) messages.

The message defines the path that the vehicle should follow in terms of a curve (defined by the control points), starting at the message `timestamp` and reaching the final point after time `delta`. PX4 calculates its new setpoint (the expected current position/velocity/acceleration along the curve) using the time that the message was sent, the current time, and the total time for the curve (delta).

:::note
For example, say the message was sent 0.1 seconds ago and `delta` (curve duration) is 0.3s. PX4 can calculate its setpoint at the 0.1s position in the curve.
:::

In more detail, the `TRAJECTORY_REPRESENTATION_BEZIER` is parsed as follows:

- The number of bezier control points determines the degree of the bezier curve. For example, 3 points makes a quadratic bezier curve with constant acceleration.
- The bezier curve must be the same degree in x, y, z, and yaw, with all bezier control points finite
- The `delta` array should have the value corresponding with the last bezier control point indicate the duration that the waypoint takes to execute the curve to that point, from beginning to end. Other values in the `delta` array are ignored.
- The timestamp of the MAVLink message should be the time that the curve starts, and communication delay and clock mismatch will be compensated for on the flight controller via the timesync mechanism.
- The control points should all be specified in local coordinates ([MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED)).
- Bezier curves expire after the execution time of the bezier curve has been reached. Ensure that new messages are sent at a high enough rate/with long enough execution time that this does not happen (or the vehicle will switch to Hold mode).

## Supported Hardware

Tested companion computers and cameras are listed in [PX4/avoidance](https://github.com/PX4/avoidance#run-on-hardware).

<!-- ## Further Information -->

<!-- @mrivi and @jkflying are the experts! -->

<!-- Issue with discussion : https://github.com/PX4/Devguide/issues/530 -->

<!-- PR for MAVLink docs: https://github.com/mavlink/mavlink-devguide/pull/133 -->