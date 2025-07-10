---
canonicalUrl: https://docs.px4.io/main/ko/flight_modes/offboard
---

# 오프보드(Offboard) 모드

[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](../getting_started/flight_modes.md#key_position_fixed)

기체는 MAVLink를 태워 전달한 위치, 속도, 고도 지점 설정을 따릅니다. 셋포인트 명령은 보조 컴퓨터에서 MAVLink API (예, [MAVSDK](https://mavsdk.mavlink.io/) 또는 [MAVROS](https://github.com/mavlink/mavros))를 통해 전달할 수 있습니다. 일반적으로 시리얼 케이블 또는 와이파이를 사용하여 보조 컴퓨터를 연결합니다.

:::tip MAVLink에서 허용하는 모든 좌표 프레임과 필드 값이 모든 설정 점 메시지와 기체에 지원되는 것은 아닙니다. 지원되는 값을 확인하시려면, 아래 섹션을 *주의 하여* 읽으십시오. 모드에 작동 전과 모드가 작동하는 동안 설정 값은 2Hz이상에서 스트리밍되어야합니다.
:::

:::note

* 이 모드에는 위치 또는 자세/태도 정보(GPS, 광학 흐름, 시각-관성 주행 거리 측정, 모캡 등)가 필요합니다. 
* RC 제어는 모드 변경을 제외하고 비활성화되어 있습니다.
* 이 모드를 사용하려면 기체의 시동을 걸어야합니다.
* 이 모드를 사용하려면 차량이 이미 **목표 설정 값 (> 2Hz) 스트림**을 수신하고 있어야합니다.
* 목표 설정 값이 2Hz 이상의 속도로 수신되지 않으면 기체의 모드를 종료합니다.
* MAVLink에서 허용하는 모든 좌표 프레임 및 필드 값이 지원되는 것은 아닙니다.
:::

## 설명

오프보드 모드는 주로 기체의 움직임과 자세를 제어하는 데 사용되며, 매우 제한된 MAVLink 메시지 세트만 지원합니다 (향후 더 많은 기능이 지원될 수 있음).

이륙, 착륙, 발사 귀환과 같은 다른 작업은 적절한 모드를 사용하여 잘 처리됩니다. 업로드, 다운로드 임무와 같은 작업은 모든 모드에서 수행 가능합니다.

모드를 시작하기 전에 기체는 설정 값 명령 스트림을 수신하여야 모드가 유지됩니다. 메시지 주파수가 2Hz 미만으로 떨어지면 기체는 정지합니다. 이 모드에서 위치를 유지하려면 기체는 현재 위치에 대한 일련의 설정 값을 수신하여야 합니다.

오프 보드 모드에는 원격 MAVLink 시스템 (예 : 컴패니언 컴퓨터 또는 GCS)에 대한 연결하여야 합니다. 연결이 끊어지면 시간 초과([COM_OF_LOSS_T](#COM_OF_LOSS_T)) 후에 기체는 착륙을 시도하거나 다른 안전 조치를 수행합니다. 작업은 [COM_OBL_ACT](#COM_OBL_ACT) 및 [COM_OBL_RC_ACT](#COM_OBL_RC_ACT) 매개변수로 정의됩니다.

## 지원되는 메시지

### 멀티콥터/VTOL

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 다음 입력 조합이 지원됩니다.<!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점(`x`, `y`, `z` 만 해당.)
    * 속도 설정점 (`vx`, `vy`, `vz` 만 해당)
    * 가속도 설정점 (`afx`, `afy`, `afz` 만 해당) 
    * 위치 설정점 및 속도 설정점 (속도 설정점은 피드 포워드로 사용되며 위치 컨트롤러의 출력에 추가되고 결과는 속도 컨트롤러의 입력으로 사용됨).
    * 위치 설정 값 **및** 속도 설정 값 **및** 가속 (가속도 설정 값은 피드 포워드로 사용되며 위치 컨트롤러의 출력에 추가되고 그 결과가 속도 컨트롤러의 입력으로 사용됨).
  * * PX4는 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 다음 입력 조합이 지원됩니다.<!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
    * 속도 설정 점 (`vx`, `vy`, `vz` 만 해당)
    * *추진력* 설정점 (`afx`, `afy`, `afz` 만 해당)
    
:::note
가속 설정점은 정규화된 추력 설정 값을 만들기 위하여 매핑됩니다 (즉, 가속 설정값은 "올바르게"지원되지 않음).
:::
    
    * 위치 설정 값 **및** 속도 설정 값 (속도 설정 값은 피드 포워드로 사용되며 위치 컨트롤러의 출력에 추가되고 결과는 속도 컨트롤러의 입력으로 사용됨).
  * PX4는 다음 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 다음 입력 조합이 지원됩니다. 
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`).
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 없는 Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) .

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 또는 [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)로 탐색시 순항 속도를 변경할 수 있습니다.

### 고정익

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점 (`x`, `y`, `z` 만 해당, 속도 및 가속도 설정 값은 무시됨).
      
      * `type_mask`에서 설정점의 *유형*을 지정합니다 (이 비트가 설정되지 않은 경우 기체는 꽃과 같은 패턴으로 비행합니다). :::note 아래의 *setpoint type* 값 중 일부는 `type_mask` 필드에 대한 MAVLink 표준의 일부가 아닙니다.
:::
        
        값들은 다음과 같습니다:
        
        * 292 : 글라이딩 설정점. 이는 추력이 없을 때 기체가 미끄러지도록하기 위해 고도보다 대기 속도를 우선하도록 TECS를 구성합니다 (즉, 속도를 조절하기 위해 피치가 제어 됨). `type_mask`를 다음과 같이 설정하는 것과 같습니다.`POSITION_TARGET_TYPEMASK_Z_IGNORE`, `POSITION_TARGET_TYPEMASK_VZ_IGNORE`, `POSITION_TARGET_TYPEMASK_AZ_IGNORE`. 
        * 4096 : 이륙 설정점.
        * 8192: 착륙 설정점.
        * 12288 : Loiter 설정점 (설정점을 중심으로 선회 비행합니다).
        * 16384 : 유휴 설정점 (제로 스로틀, 제로 롤/피치).
  * PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
      
      * `type_mask`에서 설정점의 *유형*을 지정합니다 (이 비트가 설정되지 않은 경우 차량은 꽃과 같은 패턴으로 비행합니다).
        
:::note
아래의 *setpoint type* 값은 `type_mask` 필드에 대한 MAVLink 표준의 일부가 아닙니다.
:::
        
        값들은 다음과 같습니다:
        
        * 4096 : 이륙 설정점.
        * 8192: 착륙 설정점.
        * 12288 : Loiter 설정점 (설정점을 중심으로 선회 비행합니다).
        * 16384 : 유휴 설정점 (제로 스로틀, 제로 롤/피치).
  * PX4는 다음 `coordinate_frame` 값 (전용)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 다음 입력 조합이 지원됩니다. 
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`).
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 없는 Body rate (`SET_ATTITUDE_TARGET` `.body_roll_rate` ,`.body_pitch_rate`, `.body_yaw_rate`) .

* [MAV_CMD_DO_CHANGE_SPEED](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_CHANGE_SPEED)
  
  * [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED) 또는 [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)로 탐색시 순항 속도를 변경할 수 있습니다.

<!-- Limited for offboard mode in Fixed Wing was added to master after PX4 v1.9.0.
See https://github.com/PX4/PX4-Autopilot/pull/12149 and https://github.com/PX4/PX4-Autopilot/pull/12311 -->

### 탐사선

* [SET_POSITION_TARGET_LOCAL_NED](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_LOCAL_NED)
  
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점(`x`, `y`, `z` 만 해당.)
      
      * `type_mask`에서 설정점의 *유형*을 지정합니다.
      
:::note
아래의 *setpoint type* 값은 `type_mask` 필드에 대한 MAVLink 표준의 일부가 아닙니다. ::
      
          값은 아래와 같습니다:
          -12288 : Loiter 설정점 (설정점에 매우 가까워지면 기체는 멈춤).
          
    
    * 속도 설정점 (`vx`, `vy`, `vz` 만 해당)
  * PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) 및 [MAV_FRAME_BODY_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_BODY_NED).

* [SET_POSITION_TARGET_GLOBAL_INT](https://mavlink.io/en/messages/common.html#SET_POSITION_TARGET_GLOBAL_INT)
  
  * 다음 입력 조합이 지원됩니다 (`type_mask`를 통해). <!-- https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/FlightTasks/tasks/Offboard/FlightTaskOffboard.cpp#L166-L170 -->
    
    * 위치 설정점(`lat_int`, `lon_int`, `alt` 만 해당.)
  * `type_mask`에서 설정점의 *유형*을 지정합니다 (MAVLink 표준의 일부가 아님). 값들은 다음과 같습니다: 
    * 다음 비트가 설정되지 않으면 정상적인 동작입니다.
    * -12288 : Loiter 설정점 (설정점에 매우 가까워지면 기체는 멈춤).
  * PX4는 좌표 프레임 (`coordinate_frame` 필드)을 지원합니다 : [MAV_FRAME_GLOBAL](https://mavlink.io/en/messages/common.html#MAV_FRAME_GLOBAL).

* [SET_ATTITUDE_TARGET](https://mavlink.io/en/messages/common.html#SET_ATTITUDE_TARGET)
  
  * 다음 입력 조합이 지원됩니다. 
    * 추력 설정점 (`SET_ATTITUDE_TARGET.thrust`)이 있는 자세/방향 (`SET_ATTITUDE_TARGET.q`). :::note yaw 설정만 실제로 사용/추출됩니다.
:::

## 오프보드 매개변수

*오프보드 모드*는 아래의 매개 변수의 영향을받습니다.

| 매개변수                                                                                                    | 설명                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| <span id="COM_OF_LOSS_T"></span>[COM_OF_LOSS_T](../advanced_config/parameter_reference.md#COM_OF_LOSS_T)     | 오프보드 손실 안전 장치 (`COM_OBL_ACT` 및 `COM_OBL_RC_ACT`) 동작 전에 오프 보드 연결이 손실되었을 때 대기하는 시간 제한 (초)                                    |
| <span id="COM_OBL_ACT"></span>[COM_OBL_ACT](../advanced_config/parameter_reference.md#COM_OBL_ACT)         | RC에 연결되지 *않았을 때* 오프 보드 제어가 손실된 경우 전환할 모드                                                                                   |
| <span id="COM_OBL_RC_ACT"></span>[COM_OBL_RC_ACT](../advanced_config/parameter_reference.md#COM_OBL_RC_ACT)   | RC 제어에 연결되어 있는 동안 오프보드 제어가 손실된 경우 전환할 모드.                                                                                  |
| <span id="COM_RC_OVERRIDE"></span>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 멀티콥터 (또는 MC 모드의 VTOL)에서 스틱 이동으로 인해 모드가 [위치 모드](../flight_modes/position_mc.md)로 변경 여부를 제어합니다. 기본적으로 오프보드 모드에서는 활성화되지 않습니다. |
| <span id="COM_RC_STICK_OV"></span>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | [위치 모드](../flight_modes/position_mc.md)로 전환하는 스틱 이동량 ([COM_RC_OVERRIDE](#COM_RC_OVERRIDE)이 활성화된 경우).                     |

## 개발자 리소스

일반적으로 개발자는 MAVLink 계층에서 직접 작업하지 않지만 대신 [MAVSDK](https://mavsdk.mavlink.io/) 또는 [ROS](http://www.ros.org/)와 같은 로봇 API를 사용합니다 (이는 개발자 친화적인 API를 제공하고 관리 및 유지 관리를 처리합니다. 연결, 메시지 전송 및 응답 모니터링-*오프보드 모드* 및 MAVLink 작업의 세부 사항).

다음의 리소스는 개발자에게 유용합니다.

* [Linux 오프보드 제어](../ros/offboard_control.md) (PX4 개발 가이드)
* [MAVROS 오프보드 제어 예제](../ros/mavros_offboard.md) (PX4 개발 가이드)