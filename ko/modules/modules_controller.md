---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_controller
---

# 모듈 참조: 콘트롤러

## ODULE_NAM
소스: [modules/control_allocator](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/control_allocator)


### 설명
이것은 제어 할당을 구현합니다. 토크 및 추력 설정값을 입력으로 사용하고, 액추에이터 설정값 메시지를 출력합니다.

<a id="ODULE_NAM_usage"></a>

### 사용법
```
ODULE_NAM <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## airship_att_control
소스: [modules/airship_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/airship_att_control)


### 설명
이것은 비행선 자세 및 속도 컨트롤러를 구현합니다. 이상적으로는 자세 설정값 `vehicle_attitude_setpoint`) 또는 속도 설정값(`manual_control_setpoint` 주제를 통한 아크로 모드)을 입력 및 출력 액추에이터 제어 메시지로 사용합니다.

현재 `manual_control_setpoint` 주제를 액츄에이터에 직접 공급하고 있습니다.

### 구현
제어 대기 시간을 줄이기 위하여, 모듈은 IMU 드라이버에서 게시한 자이로 주제를 직접 폴링합니다.


<a id="airship_att_control_usage"></a>

### 사용법
```
airship_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## flight_mode_manager
소스: [modules/flight_mode_manager](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/flight_mode_manager)


### 설명
이것은 모든 모드에 대한 설정값 생성을 구현합니다. 차량의 현재 모드 상태를 컨트롤러에 대한 입력 및 출력 설정값으로 사용합니다.


<a id="flight_mode_manager_usage"></a>

### 사용법
```
flight_mode_manager <command> [arguments...]
 Commands:
   start

   stop

   status        print status info 
```
## fw_att_control
소스: [modules/fw_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/fw_att_control)


### 설명
fw_att_control은 고정익 자세 컨트롤러입니다.


<a id="fw_att_control_usage"></a>

### 사용법
```
fw_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## fw_pos_control_l1
소스: [modules/fw_pos_control_l1](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/fw_pos_control_l1)


### 설명
fw_pos_control_l1은 고정익 위치 컨트롤러입니다.


<a id="fw_pos_control_l1_usage"></a>

### 사용법
```
fw_pos_control_l1 <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_att_control
소스: [modules/mc_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mc_att_control)


### 설명
이것은 멀티콥터 자세 컨트롤러를 구현합니다. 자세 설정값(`vehicle_attitude_setpoint`)을 입력으로 사용하고, 속도 설정값을 출력합니다.

컨트롤러에는 각도 오류에 대한 P 루프가 있습니다.

간행물: 구현된 쿼터니언 태도 제어를 문서화, 제목: 비선형 쿼드로콥터 자세 제어(2013), 저자: Dario Brescianini, Markus Hehn and Raffaello D'Andrea 동적 시스템 및 제어 연구소(IDSC), ETH 취리히

https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf


<a id="mc_att_control_usage"></a>

### 사용법
```
mc_att_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_pos_control
소스: [modules/mc_pos_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mc_pos_control)


### 설명
컨트롤러에는 위치 오류용 P 루프와 속도 오류용 PID 루프의 두 가지 루프가 있습니다. 속도 컨트롤러의 출력은 추력 방향(즉, 멀티콥터 방향에 대한 회전 행렬)과 추력 스칼라(즉, 멀티콥터 추력 자체)로 분할되는 추력 벡터입니다.

컨트롤러는 작업에 오일러 각도를 사용하지 않으며, 보다 인간 친화적인 제어 및 로깅을 위해서만 생성됩니다.

<a id="mc_pos_control_usage"></a>

### 사용법
```
mc_pos_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## mc_rate_control
소스: [modules/mc_rate_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mc_rate_control)


### 설명
이것은 멀티콥터 속도 컨트롤러를 구현합니다. 속도 설정값(`manual_control_setpoint` 항목을 통한 곡예 모드)을 입력으로 사용하고, 액추에이터 제어 메시지를 출력합니다.

컨트롤러에는 각속도 오류에 대한 PID 루프가 있습니다.


<a id="mc_rate_control_usage"></a>

### 사용법
```
mc_rate_control <command> [arguments...]
 Commands:
   start
     [vtol]      VTOL mode

   stop

   status        print status info
```
## navigator
소스: [modules/navigator](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/navigator)


### 설명
자율 비행 모드를 담당하는 모듈입니다. 여기에는 임무(데이터맨에서 읽기), 이륙 및 RTL이 포함됩니다. 또한, 지오펜스 위반 검사를 담당합니다.

### 구현
다른 내부 모드는 공통 기본 클래스 `NavigatorMode`에서 상속되는 별도의 클래스로 구현됩니다. `_navigation_mode` 구성원은 현재 활성 모드를 포함합니다.

Navigator는 위치 설정점 트리플렛(`position_setpoint_triplet_s`)을 게시한 다음, 위치 컨트롤러에서 사용합니다.


<a id="navigator_usage"></a>

### 사용법
```
navigator <command> [arguments...]
 Commands:
   start

   fencefile     load a geofence file from SD card, stored at etc/geofence.txt

   fake_traffic  publishes 4 fake transponder_report_s uORB messages

   stop

   status        print status info
```
## rover_pos_control
소스: [modules/rover_pos_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/rover_pos_control)


### 설명
L1 컨트롤러를 사용하여 그라운드 로버의 위치를 제어합니다.

IMU_GYRO_RATEMAX에서 `actuator_controls_0` 메시지를 게시합니다.

### 구현
현재 이 구현은 일부 모드만 지원합니다.

 * 완전 수동: 스로틀 및 편요각 제어가 액츄에이터에 직접 전달됩니다.
 * 자동 미션: 로버가 미션을 실행합니다.
 * 배회: 로버가 배회 반경 내로 이동한 다음 모터를 중지합니다.

### 예
CLI 사용 예:
```
rover_pos_control start
rover_pos_control status
rover_pos_control stop
```


<a id="rover_pos_control_usage"></a>

### 사용법
```
rover_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_att_control
소스: [modules/uuv_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/uuv_att_control)


### 설명
무인수중선(UUV)의 자세를 제어합니다.

일정한 250Hz에서 `actuator_controls_0` 메시지를 게시합니다.

### 구현
현재 이 구현은 일부 모드만 지원합니다.

 * 완전 수동: 롤, 피치, 요 및 스로틀 컨트롤이 액추에이터에 직접 전달됩니다.
 * 자동 임무: 무인수중선이 임무를 실행합니다.

### 예
CLI 사용 예:
```
uuv_att_control start
uuv_att_control status
uuv_att_control stop
```


<a id="uuv_att_control_usage"></a>

### 사용법
```
uuv_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## uuv_pos_control
소스: [modules/uuv_pos_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/uuv_pos_control)


### 설명
무인수중선(UUV)의 자세를 제어합니다. 일정한 250Hz에서 `actuator_controls_0` 메시지를 게시합니다.
### 구현
현재 이 구현은 일부 모드만 지원합니다.
 * 완전 수동: 롤, 피치, 요 및 스로틀 컨트롤이 액추에이터에 직접 전달됩니다.
 * 자동 임무: 무인수중선이 임무를 실행합니다.
### 예
CLI 사용 예:
```
uuv_pos_control start
uuv_pos_control status
uuv_pos_control stop
```

<a id="uuv_pos_control_usage"></a>

### 사용법
```
uuv_pos_control <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## vtol_att_control
소스: [modules/vtol_att_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/vtol_att_control)


### 설명
fw_att_control은 고정익 자세 컨트롤러입니다.

<a id="vtol_att_control_usage"></a>

### 사용법
```
vtol_att_control <command> [arguments...]
 Commands:

   stop

   status        print status info
```
