---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/flight_modes
---

# PX4 비행 모드 개요

비행 모드는 자동조종장치가 무선 조종기에 반응하는 메커니즘과 자율비행 방법을 정의합니다.

비행 모드는 이륙 및 착륙과 같은 일반적인 작업의 자동화뿐만 아니라, 수평 비행을 용이하게하기 위하여 고정된 경로나 위치에 기체를 유지하는 메커니즘에 이르기까지 조종사에게 다양한 유형의 자율비행 방법을 제공합니다.

This topic provides an overview of the available the flight modes for different frame types: [multicopter/helicopter](#multicopter-helicopter) (MC), [fixed-wing](#fixed-wing) (FW), [VTOL](#vertical-take-off-and-landing-vtol), [rovers](#rover).

:::tip
비행 모드에 대한 자세한 정보는 [비행 &gt; 비행 모드](../flight_modes/README.md)를 참고하십시오.
:::

## 모드 변경

조종사는 무선 조종기의 스위차나 지상통제국에서 비행 모드를 변경할 수 있습니다([비행 모드 설정](../config/flight_mode.md) 참조).

모든 차량 유형에서 모든 비행 모드를 제공되는 것은 아니며, 일부 모드는 차량 유형에 따라  작동 방식의 차이가 있을 수 있습니다.

일부 비행 모드는 비행전 상태와 비행중 상태(예 : GPS 잠금 장치, 속도 센서, 축을 따라 비행기의 자세 감지)에서만 유의미합니다. PX4는 적절한 조건이 충족될 때까지, 해당 모드로의 변경을 허용하지 않습니다.

Last of all, in multicopter [autonomous modes](#categories) RC stick movement will change the vehicle to [Position mode](../flight_modes_mc/position.md) [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) (unless handling a critical battery failsafe). 고정익 비행에서는 스틱 신호는 무시됩니다.


<a id="categories"></a>

## 자율 모드와 수동 모드

비행 모드에는 *수동* 모드와 *자율* 모드가 있습니다. 수동 모드는 조종사가 무선 조종기나 조이스틱으로 비행기를 제어하며, 자율 모드는 자동조종 프로그램으로 제어되며 조종사나 원격 제어는 필요하지 않습니다.

:::tip
일부 수동 모드에는 자동 조종 보조 기능이 있어 비행 제어을 보다 용이하게 합니다.
예를 들어, 대부분의 모드는 RC 스틱이 중앙에 있으면 기체의 수평을 유지합니다.
:::

수동 모드는 "간편" 모드와 "곡예(Acro)" 모드로 나눌 수 있습니다. 수동 모드는 "간편" 모드와 "곡예(Acro)" 모드로 나눌 수 있습니다. 이렇게 하면 움직임이 예측 가능하고, 각도가 제어되기 때문에 기체가 뒤집히지 않습니다. 곡예 모드에서 RC 스틱은 각 축을 중심으로 회전 속도를 제어합니다. 기체는 뒤집힐 수 있으며, 기동성이 높아 지는 반면 비행 조종은 어려워집니다.

Fixed-wing:

* Manual-Easy: [Position](#position-mode-fw), [Altitude](#altitude-mode-fw), [Stabilized](#stabilized-mode-fw)
* Manual-Acrobatic: [Manual](#manual-mode-fw), [Acro](#acro-mode-fw)
* 자율 : [유지](#hold_fw), [복귀](#return-mode-fw), [미션](#mission-mode-fw), [이륙](#takeoff-mode-fw), [착륙](#land-mode-fw), [오프보드](#offboard-mode-fw)

Multicopter/Helicopter:
* 수동 간편 : [위치](#position-mode-mc), [고도](#altitude-mode-mc), [수동/안정화](#manual-stabilized-mode-mc), [궤도](#orbit-mode-mc)
* 수동 곡예 : [곡예](#acro-mode-mc)
* 자율 : [유지](#hold-mode-mc), [복귀](#return-mode-mc), [미션](#mission-mode-mc), [이륙](#takeoff-mode-mc), [착륙](#land-mode-mc), [조종사 추적](#follow-me-mode-mc), [오프 보드](#offboard-mode-mc)

Rover:

* 수동-간편 : [수동](#manual-mode-ugv)
* 자율: [임무](#mission-mode-ugv)

:::note
Only manual and mission modes are supported for rovers.
You can switch to any other mode but the behaviour will be the same as for manual mode.
:::


## 요점

아래 아이콘은 문서 내에서 다음과 같은 용도로 사용됩니다:

| 아이콘                                                                                                                                                                                                                                                                                                                                                                 | 설명                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <a id="key_manual"></a>[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)                                                                                                                                                                                                     | 수동 모드 무선 조종기 필수.                                                                     |
| <a id="key_automatic"></a>[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)                                                                                                                                                                                                                  | 자동 모드. 무선 조종기 제어는 모드 변경을 제외하고, 기본적으로 비활성화되어 있습니다. Global position estimate required. |
| <a id="key_position_fixed"></a>[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)                                                                                                                                                                                           | 위치 수정이 필요(예 : GPS, VIO 또는 기타 위치 확인 시스템).                                             |
| <a id="altitude_only"></a><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계) " width="30px" />                                                                                                                                                                                                                             | 최소 고도 (예 : 기압계, 거리계).                                                                |
| <a id="key_difficulty"></a>[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty) | 비행 모드 난이도 (초급 ~ 고급)                                                                  |


<a id="mc_flight_modes"></a>

## Multicopter / Helicopter

### 위치 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes_mc/position.md) is an easy-to-fly RC mode in which roll and pitch sticks control _acceleration_ over ground in the vehicle's forward-back and left-right directions (similar to a car's accelerator pedal), and throttle controls speed of ascent-descent. 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다.

:::tip
위치 모드는 초보자에게 가장 안전한 수동 모드입니다. [고도](#altitude-mode-mc) 및 [수동/안정화](#manual_stabilized_mc) 모드와 달리 기체는 제어 신호가 없으면 표류하지 않고, 스틱이 중앙에 있을 때는 정지합니다.
:::

![멀티콥터 위치 모드](../../assets/flight_modes/position_MC.png)


### 고도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계)" width="30px" />](#altitude_only)


[Altitude mode](../flight_modes_mc/altitude.md) is a *relatively* easy-to-fly RC mode in which roll and pitch sticks control vehicle movement in the left-right and forward-back directions (relative to the "front" of the vehicle), yaw stick controls rate of rotation over the horizontal plane, and throttle controls speed of ascent-descent.

스틱을 놓거나 중앙에 놓으면, 기체는 수평과 현재 *고도*를 유지합니다. 수평면에서 이동하는 경우에는 기체는 바람 저항에 의해 모멘텀이 소실될 때까지 이동합니다. 바람이 불면, 기체는 바람을 따라 표류합니다.

:::tip
*Altitude mode* is the safest non-GPS manual mode for new fliers. [수동/안정화](#manual_stabilized_mc) 모드와 유사하지만, 스틱을 놓으면 차량 고도가 일정하게 유지됩니다.
:::

![멀티콥터 고도 모드](../../assets/flight_modes/altitude_MC.png)


<a id="manual_stabilized_mc"></a>

### 수동/안정화 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

The [Manual/Stabilized](../flight_modes_mc/manual_stabilized.md) mode stabilizes the multicopter when the RC control sticks are centered. 기체를 수동으로 조종하려면 스틱을 중앙의 바깥쪽으로 움직입니다.

:::note
이 멀티콥터 모드는 *수동* 또는 *안정화* 모드를 설정하여 활성화합니다.
:::

수동 제어에서 롤 스틱과 피치 스틱은 각 축을 중심으로 기체의  각도로 제어하며, 요 스틱은 수평면의 회전 속도를 제어하고, 스로틀은 고도와 속도를 제어합니다 .

조종기의 스틱을 놓으면 센터 데드 존으로 되돌아갑니다. 롤 스틱과 피치 스틱이 중앙에 위치하면, 멀티콥터는 수평을 유지하고 정지합니다. 기체는 적절하게 균형을 잡고, 적절한 스로틀을 유지하며, 바람과 같은 외력이 가해지지 않으면 위치와 고도를 유지하게 됩니다. 기체는는 바람을 따라 표류하게 되며, 고도를 유지하기 위해서는 스로틀을 제어하여야 합니다.

![멀티콥터 수동 비행](../../assets/flight_modes/manual_stabilized_MC.png)


<a id="acro_mc"></a>

### 곡예 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes_mc/acro.md) is the RC mode for performing acrobatic maneuvers e.g. rolls and loops.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to control allocation. 스틱이 중앙에 위치하면 차량의 회전을 멈추고, 현재 방향(예 : 반전될 수 있음)을 유지한체로 현재 운동량에 따라 이동합니다.

![멀티콥터 수동 곡예 비행](../../assets/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/PX4-user_guide/issues/182 -->


<a id="orbit_mc"></a>

### 궤도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

The [Orbit mode](../flight_modes_mc/orbit.md) allows you to command a multicopter (or VTOL in multicopter mode) to fly in a circle, yawing so that it always faces towards the center.

이 모드를 활성화하고 궤도의 중심 위치와 초기 반경을 설정하려면, GCS가 *필요*합니다. 기본적으로 기체는 시계 방향으로 특정 위치를 중심으로 저속(1 m/s) 궤도 비행을 수행합니다. RC 제어는 선택 사항이며, 궤도 고도, 반경, 속도와 방향을 제어합니다.

![궤도 모드 - 멀티콥터](../../assets/flight_modes/orbit_MC.png)


<a id="hold_mc"></a>

### 유지 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Hold mode](../flight_modes_mc/hold.md) causes the multicopter to stop and hover at its current position and altitude (maintaining position against wind and other forces). 유지 모드를 사용하여 임무를 일시 중지하거나, 비상시 기체를 다시 제어할 수 있습니다. 사전 프로그래밍된 RC 스위치 또는 *QGroundControl*의 **일시 정지** 버튼으로 활성화할 수 있습니다.


<a id="return_mc"></a>

### 귀환 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[귀환 모드](../flight_modes/return.md)에서는 기체가 안전한 위치와 경로로 비행합니다. 이 모드는 수동(사전 프로그래밍된 RC 스위치를 통하여)이나 자동(즉, [사고 방지](../config/safety.md)가 동작되는 경우)으로 활성화할 수 있습니다.

귀환 동작은 매개 변수 설정에 따라 다르며, 임무 경로나 정의된 임무 착륙 패턴에 의해서 동작합니다. 기본적으로 멀티콥터는 안전한 높이로 상승하고 홈 위치로 비행한 다음 착륙합니다.


<a id="mission_mc"></a>

### 임무 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[임무 모드](../flight_modes/mission.md)는 비행 콘트롤러에 업로드된 자율 [임무](../flying/missions.md)(비행 계획) 비행을 실행합니다. 지상관제국(GCS)에서 임루를 생성하고 업로드합니다.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/master/en/). :::tip PX4 GCS는 [QGroundControl](https://docs.qgroundcontrol.com/en/)입니다.
:::

<a id="takeoff_mc"></a>

### 이륙 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Takeoff](../flight_modes_mc/takeoff.md) mode causes the multicopter to climb vertically to takeoff altitude and hover in position.


<a id="land_mc"></a>

### 착륙 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Land mode](../flight_modes_mc/land.md) causes the multicopter to land at the location at which the mode was engaged.


<a id="followme_mc"></a>

### 추적 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Follow Me mode](../flight_modes_mc/follow_me.md) causes a multicopter to autonomously follow and track a user providing their current position setpoint. 위치값은 *QGroundControl*을 실행하는 Android 단말기(스마트폰/태블릿)나 MAVSDK 앱에서 제공할 수 있습니다.

<a id="offboard_mc"></a>

### 오프보드 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[오프 보드 모드](../flight_modes/offboard.md)에서는 멀티콥터는 MAVLink를 통하여 제공되는 위치, 속도 또는 자세값에 따라 비행합니다.

:::note
이 모드는 보조 컴퓨터와 지상통제국 프로그램을 위한 것입니다.
:::

<a id="fw_flight_modes"></a>

## 고정익

<a id="position_fw"></a>

### 위치 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Position mode](../flight_modes_fw/position.md) is an easy-to-fly RC mode in which, when the sticks are released/centered, the vehicle will level and fly a straight line ground track in the current direction — compensating for wind and other forces.

스로틀은 대기 속도를 결정합니다. 스로틀 50%에서 기체는 현재 고도에서 사전 설정된 순항 속도를 유지합니다. 피치는 상승과 하강에 사용됩니다. 롤, 피치 및 요는 모두 각도를 제어합니다. 따라서, 차량을 롤오버하거나 루프 할 수 없습니다.

:::tip
위치 모드는 초보자에게 가장 안전한 비 GPS 수동 모드입니다.
:::

![고정익 위치 모드](../../assets/flight_modes/position_FW.png)


<a id="altitude_fw"></a>

### 고도 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="최소 고도 (예 : 기압계, 거리계)" width="30px" />](#altitude_only)

[Altitude mode](../flight_modes_fw/altitude.md) makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. 고도 모드에서는 바람이 불면 기체의 방향을 유지하지 않습니다.

기체의 상승/하강률을 피치/엘리베이터 스틱으로 제어합니다. 스틱이 중앙에 위치하면, 자동조종장치는 요/롤 및 모든 대기 속도에서 현재 고도를 유지합니다. 스로틀 입력은 대기 속도를 제어합니다. 롤과 피치는 각도를 제어합니다. 따라서, 차량을 롤오버하거나 루프할 수 없습니다.

무선종조기의 모든 입력이 중앙에 있을 때 (롤, 피치, 요은 없음, 약 50%스로틀) 기체는 직선, 수평(바람에 따라)으로 현재 고도를 유지합니다.

:::tip
*고도 모드*는 비행 방법을 배우는 초보자에게 적합한 가장 안전한 비 GPS 모드입니다. It is just like [Stabilized](#stabilized_fw) mode but additionally stabilizes the vehicle altitude and airspeed.
:::

![고정익 고도 모드](../../assets/flight_modes/altitude_FW.png)


<a id="stabilized_fw"></a>

### 안정화 모드 (고정익)

[<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

[Stabilized mode](../flight_modes_fw/stabilized.md) puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

기체는 피치 입력으로 상승 또는 하강하며, 롤/피치 스틱이 중앙이 아니면 회전하게 됩니다. 롤과 피치는 각도를 제어합니다(거꾸로 굴리거나 반복할 수 없음).

:::tip
*안정화 모드*에서는 회전하거나 뒤집을 수 없기 때문에, [수동 모드](#manual_fw)보다 비행이 용이하고 조종 스틱을 중앙에 배치하여 기체의 수평을 유지하기가 편리합니다.
:::

스로틀을 최소로 낮추면 기체가 미끄러집니다 (모터는 정지). 회전 명령은 비행에 작동됩니다. 롤이 풀리면 기체는 회전을 멈추고, 스스로 수평을 유지합니다(피치 및 요 명령도 마찬가지입니다).

![고정익 수동 비행](../../assets/flight_modes/manual_stabilized_FW.png)


<a id="acro_fw"></a>

### 곡예 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes_fw/acro.md) is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to control allocation. 스틱이 중앙에 위치하면 차량의 회전을 멈추고, 현재 방향(예 : 반전될 수 있음)을 유지한체로 현재 운동량에 따라 이동합니다.

![고정익 수동 곡예 비행](../../assets/flight_modes/manual_acrobatic_FW.png)


<a id="manual_fw"></a>

### 수동 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

[Manual mode](../flight_modes_fw/manual.md) sends RC stick input directly to control allocation for "fully" manual control.

:::tip
이 모드는 안정화 기능이 없기 때문에 가장 어려운 모드입니다 [곡예 모드](#acro_fw)와 달리, 무선 조종기 스틱이 중앙에 위치하여도 기체가 회전은 자동으로 멈추지 않습니다. 조종사는 스틱을 조종하여 다른 방향으로 힘을 가하여야 합니다.
:::

:::note
이 모드는 FMU를 재정의하는 유일한 모드입니다(명령어는 코프로세서를 통해 전송됩니다).
FMU 펌웨어가 오작동하면 무선 조종기를 통하여 스로틀, 엘리베이터, 에일러론 및 방향타를 제어할 수있는 안전 메커니즘을 제공합니다.
:::

<a id="hold_fw"></a>

### 유지 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Hold](../flight_modes_fw/hold.md) causes a fixed-wing vehicle to start circling around the current position at its current altitude. 유지 모드를 사용하여 임무를 일시 중지하거나, 비상시 기체를 다시 제어할 수 있습니다. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.


<a id="return_fw"></a>

### 귀환 모드(고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[귀환 모드](../flight_modes/return.md)에서는 기체가 안전한 위치와 경로로 비행합니다. 이 모드는 수동(사전 프로그래밍된 RC 스위치를 통하여)이나 자동(즉, [사고 방지](../config/safety.md)가 동작되는 경우)으로 활성화할 수 있습니다.

귀환 동작은 매개 변수 설정에 따라 다르며, 임무 경로나 정의된 임무 착륙 패턴에 의해서 동작합니다. By default a fixed-wing vehicle will ascend to a safe height and use a mission landing pattern if one exists, otherwise it will fly to the home position and circle.


<a id="mission_fw"></a>

### 임무 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[임무 모드](../flight_modes/mission.md)는 비행 콘트롤러에 업로드된 자율 [임무](../flying/missions.md)(비행 계획) 비행을 실행합니다. 지상관제국(GCS)에서 임루를 생성하고 업로드합니다.


:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/master/en/). :::tip PX4 GCS는 [QGroundControl](https://docs.qgroundcontrol.com/en/)입니다.
:::

<a id="takeoff_fw"></a>

### 이륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;

[Takeoff mode](../flight_modes_fw/takeoff.md) initiates the vehicle takeoff sequence. 구체적인 이륙 동작은 설정된 이륙 모드(투석기/수동/활주로 이륙 모드)에 따라 차이가 납니다.


<a id="land_fw"></a>

### 착륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;

[Land mode](../flight_modes_fw/land.md) causes the vehicle to turn and land at the location at which the mode was engaged. Fixed-wing landing logic and parameters are explained in the topic: [Mission > Fixed-wing Mission Landing](../flight_modes/mission.md#fw-mission-landing).

<a id="offboard_fw"></a>

### 오프보드 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the fixed-wing vehicle to obey attitude setpoints provided over MAVLink.

:::note
이 모드는 보조 컴퓨터와 지상통제국 프로그램을 위한 것입니다.
:::

## 수직이착륙기 (VTOL)

VTOL 항공기는 멀티콥터와 고정익의 장점을 모두 가지고 있습니다. The multicopter mode is mainly used for take off and landing while the fixed-wing mode is used for efficient travel and/or mission execution.

VTOL의 비행 모드는 멀티콥터 모드 비행시에는 [멀티 콥터](#mc_flight_modes)와 동일하고, 고정익 모드 비행시에는 [고정익](#fw_flight_modes)과 동일합니다.

모드 전환은 RC 스위치를 사용하거나, 자동 모드에서 필요시에 PX4에 의해 자동으로 시작됩니다.

몇 가지 참고 사항  :
- VTOL [귀환 모드](../flight_modes/return.md)는 정의된 경우에는 기본적으로 미션 착륙을 사용합니다.

<a id="ugv_flight_modes"></a>

## Rover

Ground vehicles only support [manual mode](#manual-mode-ugv) and [mission mode](#mission-mode-ugv) (while you can switch to other modes, these all behave just like manual mode).

### 수동 모드 (UGV)

[<img src="../../assets/site/difficulty_easy.png" title="사용하기 쉬움" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)&nbsp;

:::note
이 모드는 임무 모드 미설정시에 활성화됩니다.
:::

*Manual mode* stops motors when RC control sticks are centered. 기체를 수동으로 움직이거나 조종하려면 스틱을 중앙의 바깥쪽으로 제어합니다.

<!--
When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.
-->

조종기의 스틱을 놓으면 센터 데드 존으로 되돌아갑니다. 그러면 모터가 꺼지고, 바퀴와 방향타가 중앙에 위치합니다. There is no active braking, so the vehicle may continue to move until its momentum dissipates.


### 임무 모드 (UGV)

[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)

*Mission mode*<!-- \[Mission mode\](../flight_modes/mission.md) -->[임무 모드](../flight_modes/mission.md)는 비행 콘트롤러에 업로드된 자율 [임무](../flying/missions.md)(비행 계획) 비행을 실행합니다. 지상관제국(GCS)에서 임루를 생성하고 업로드합니다.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/master/en/). :::tip PX4 GCS는 [QGroundControl](https://docs.qgroundcontrol.com/en/)입니다.
:::


## 추가 정보

* [비행 > 비행 모드](../flight_modes/README.md) - 비행 모드에 대한 자세한 설명
* [기본 구성 &gt; 비행 모드](../config/flight_mode.md) - RC 스위치를 특정 비행 모드에 매핑하는 방법
