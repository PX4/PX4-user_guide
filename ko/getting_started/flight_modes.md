# PX4 비행 모드 개요

비행 모드는 자동조종장치가 원격 제어에 응답하는 방법과 자율비행 방법을 정의합니다.

비행 모드는 이륙 및 착륙과 같은 일반적인 작업의 자동화뿐만 아니라, 수평 비행을 하기 쉽도록 고정된 경로나 위치로 기체를 유지하는 메커니즘에 이르기까지 사용자(조종사)에게 다양한 유형과 수준의 자율 비행 방법을 제공합니다.

[멀티콥터](#multicopter) (MC), [고정익](#fixed-wing) (FW), [VTOL](#vertical-take-off-and-landing-vtol) 및 [로버/보트](#rover-boat) 등의 다양한 기체 유형에 적용되는 비행 모드의 개요를 설명합니다.

:::tip
특정 비행 모드에 대한 자세한 정보는 [비행 > 비행 모드](../flight_modes/README.md)를 참고하십시오.
:::

## 모드 전환

조종사는 원격 조종 장치 또는 지상 통제 장치의 스위치를 사용하여 비행 모드를 전환할 수 있습니다. ([비행 모드 구성](../config/flight_mode.md) 참조).

모든 비행기 유형에서 모든 비행 모드를 적용되지는 않으며, 일부 모드는 비행기 유형에 따라 동작 방식의 차이가 있습니다.

일부 비행 모드는 특정 비행 전 및 비행 중 상태(예 : GPS 잠금 장치, 속도 센서, 축을 따라 비행기의 자세 감지)에서만 유의미합니다. PX4는 적절한 조건이 충족될 때까지 해당 모드로의 전환을 허용하지 않습니다.

Last of all, in multicopter [autonomous modes](#categories) RC stick movement will change the vehicle to [Position mode](../flight_modes/position_mc.md) [by default](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) (unless handling a critical battery failsafe). 고정익 비행에서는 스틱 이동이 무시됩니다.

<a id="categories"></a>

## 자율 모드와 수동 모드 

비행 모드에는 *수동* 모드와 *자율* 모드가 있습니다. 수동 모드는 사용자가 RC 컨트롤 스틱(또는 조이스틱)을 통해 비행기를 제어하며, 자율 모드는 자동조종 프로그램으로 제어되며 조종사나 원격 제어는 필요하지 않습니다.

:::tip
일부 수동 모드에는 자동 조종 보조 기능이 있어 비행 제어을 보다 용이하게합니다. 예를 들어, 대부분의 모드는 RC 스틱이 중앙에 있을 때 운송체의 수평을 유지합니다.
:::

수동 모드는 "간편" 모드와 "곡예(Acro)" 모드로 더 나눌 수 있습니다. 간편 모드에서 롤 및 피치 스틱은 차량 각도를 설정하여 *수평면*을 기준으로 좌우로 앞으로 이동합니다. 이렇게 하면 움직임이 예측가능하고, 각도가 제어되기 때문에 기체가 뒤집히지 않습니다. 곡예 모드에서 RC 스틱은 각축을 중심으로 회전 속도를 제어합니다. 기체는 뒤집힐 수 있으며, 기동성이 높아 지는 반면에 비행 조종은 어려워집니다.

고정익: 

* 수동 간편 : [위치](#position-mode-fw), [고도](#altitude-mode-fw), [안정화](#stabilized-mode-fw), [수동](#manual-mode-fw)
* 수동 곡예 : [곡예](#acro-mode-fw)
* 자율 : [유지](#hold_fw), [복귀](#return-mode-fw), [미션](#mission-mode-fw), [이륙](#takeoff-mode-fw), [착륙](#land-mode-fw), [오프보드](#offboard-mode-fw)

멀티콥터: 

* 수동 간편 : [위치](#position-mode-mc), [고도](#altitude-mode-fcmc), [수동/안정화](#manual-stabilized-mode-mc), [궤도](#orbit-mode-mc)
* 수동 곡예 : [곡예](#acro-mode-mc)
* 자율 : [유지](#hold-mode-mc), [복귀](#return-mode-mc), [미션](#mission-mode-mc), [이륙](#takeoff-mode-mc), [착륙](#land-mode-mc), [나를 따르나](#follow-me-mode-mc), [오프 보드](#offboard-mode-mc)

로보/보트:

* 수동-간편 : [수동](#manual-mode-ugv)
* 자율: [임무](#mission-mode-ugv)

:::note
수동 및 이무 모드만 지원됩니다. 다른 모드로 전환할 수 있지만, 동작은 수동 모드와 동일합니다.
:::

## 요점 

아래 아이콘은 문서 내에서 사용됩니다: 

| 아이콘                                                                                                                                                                                                                                                                                                              | 설명                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| <a id="key_manual"></a>[<img src="../../assets/site/remote_control.svg" title="수동/원격 제어 필요" width="30px" />](#key_manual)                                                                                                                                                                                      | 수동 모드 원격 제어 필수.                              |
| <a id="key_automatic"></a>[<img src="../../assets/site/automatic_mode.svg" title="자동 모드" width="30px" />](#key_automatic)                                                                                                                                                                                         | 자동 모드. RC 제어는 모드 변경을 제외하고 기본적으로 비활성화되어 있습니다. |
| <a id="key_position_fixed"></a>[<img src="../../assets/site/position_fixed.svg" title="위치 고정 요구(예, GPS)" width="30px" />](#key_position_fixed)                                                                                                                                                                         | 위치 수정이 필요(예 : GPS, VIO 또는 기타 위치 확인 시스템).     |
| <a id="altitude_only"></a><img src="../../assets/site/altitude_icon.svg" title="필요한 고도 (예 : 기압계, 거리계) " width="30px" />                                                                                                                                                                                           | 필요한 고도 (예 : 기압계, 거리계).                       |
| <a id="key_difficulty"></a>[<img src="../../assets/site/difficulty_easy.png" title="초급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_medium.png" title="중급 난이도 비행" width="30px" />&nbsp;<img src="../../assets/site/difficulty_hard.png" title="고급 난이도 비행" width="30px" />](#key_difficulty) | 비행 모드 난이도 (초급 ~ 고급)                          |

<a id="mc_flight_modes"></a>

## 멀티콥터

### 위치 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[위치 모드](../flight_modes/position_mc.md)는 비행 제어가 용이한 RC 모드로, 롤 및 피치 스틱이 기체의 전진 및 좌-우 방향의 (예 : 자동차의 가속 페달) *가속*을 제어하고 스로틀은 상승 하강 속도를 제어합니다. 스틱을 풀거나 중앙에 놓으면 차량이 능동적으로 제동하고 수평을 맞추고 3D 공간의 위치에 고정되어 바람과 기타 힘을 보상합니다.

:::tip
위치 모드는 초보자에게 가장 안전한 수동 모드입니다. [고도](#altitude-mode-mc) 및 [수동/안정화](#manual_stabilized_mc) 모드와 달리 기체는 제어 신호가 없으면 표류하지 않고 대신 스틱이 중앙에있을 때 정지합니다.
:::

![MC Position Mode](../../assets/flight_modes/position_MC.png)

### 고도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Baro, Rangefinder)" width="30px" />](#altitude_only)

[고도 모드](../flight_modes/altitude_mc.md)에서는 *상대적으로* 비행 제어가 용이한 RC 모드로, 롤 및 피치 스틱이 차량 이동을 좌우 및 앞뒤 방향(차량의 "전면" 기준)으로 제어하고, 요 스틱은 수평면에서 회전 속도를 제어하고 스로틀은 상승 하강 속도를 제어합니다.

스틱을 놓거나 중앙에 놓으면 기체의 수평과 현재 *고도*를 유지합니다. 수평면에서 이동하는 경우 기체는 바람 저항에 의해 모멘텀이 소실될 때까지 계속 이동합니다. 바람이 불면 기체는 바람 따라 표류합니다.

:::tip
*자세 모드*는 초보 비행자에게 가장 안전한 비 GPS 수동 모드입니다. [수동/안정화](#manual_stabilized_mc) 모드와 유사하지만, 스틱을 놓으면 차량 고도가 안정화됩니다.
:::

![MC Altitude Mode](../../assets/flight_modes/altitude_MC.png)

<a id="manual_stabilized_mc"></a>

### 수동/안정화 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[수동/안정화](../flight_modes/manual_stabilized_mc.md)모드는 RC 조종 스틱이 중앙에 있을 때 멀티콥터를 안정화합니다. 기체를 수동으로 움직이거나 조종하려면 스틱을 중앙의 바깥쪽으로 제어합니다.

:::note
이 멀티콥터 모드는 *수동* 또는 *안정화* 모드를 설정하여 활성화됩니다.
:::

수동 제어에서 롤과 피치 스틱이 각 축을 중심으로 기체 (자세)을 각도로 제어하면 요 스틱이 수평면 위의 회전 속도를 제어하고 스로틀은 고도/속도를 제어합니다 .

컨트롤 스틱을 놓으면 센터 데드 존으로 돌아갑니다. 롤 포크와 피치 스틱이 중앙에 오면 멀티 피터가 수평을 유지하고 정지합니다. 기체는 적절하게 균형을 잡고, 스로틀이 적절하게 설정되고, 외력이 가해지지 않으면 (예 : 바람), 위치와 고도를 유지합니다. 기체는는 바람 방향으로 표류하게 되며, 고도를 유지하기 위해서는 스로틀을 제어하여야 합니다.

![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)

<a id="acro_mc"></a>

### 곡예 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[곡에 모드](../flight_modes/acro_mc.md)는 롤과 루프등의 곡예 비행을 위한 RC 모드입니다.

롤, 피치 및 요 스틱은 각 축을 중심으로 회전 속도를 제어하고 각 축의 출력은 직접 출력 믹서로 전달됩니다. 스틱이 중앙에 오면 차량은 회전을 멈추고, 현재 방향(예 : 반전될 수 있음)을 유지하고 현재 운동량에 따라 이동합니다.

![MC Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->

<a id="orbit_mc"></a>

### 궤도 모드 (멀티콥터)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[궤도 모드](../flight_modes/orbit.md)를 사용하면 멀티 콥터 (또는 멀티 콥터 모드의 VTOL)가 원을 그리며 날아 가며 항상 중심을 향하도록 요잉할 수 있습니다.

이 모드를 활성화하고 궤도의 중심 위치와 초기 반경을 설정하려면 GCS(지상제어 프로그램)가 *필요*합니다. 기본적으로 기체는 시계 방향으로 특정 위치를 중심으로 저속(1 m/s) 궤도 비행을 수행합니다. RC 제어는 선택 사항이며 궤도 고도, 반경, 속도와 방향을 제어합니다.

![Orbit Mode - MC](../../assets/flight_modes/orbit_MC.png)

<a id="hold_mc"></a>

### 유지 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[유지 모드](../flight_modes/hold.md)는 멀티콥터가 현재 위치와 고도에서 호버링합니다 (바람과 다른 힘에 대한 현 위치 유지). 유지 모드를 사용하여 임무를 일시 중지하거나, 비상시 기체를 다시 제어할 수 있습니다. 사전 프로그래밍된 RC 스위치 또는 *QGroundControl* **일시 정지** 버튼으로 활성화할 수 있습니다.

<a id="return_mc"></a>

### 귀환 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[귀환 모드](../flight_modes/return.md)는 기체가 안전한 위치와 경로로 비행하게 합니다. 이 모드는 수동 (사전 프로그래밍된 RC 스위치를 통해) 또는 자동 (즉, [사고 방지](../config/safety.md)가 동작되는 경우)으로 활성화 될 수 있습니다.

귀환 동작은 매개 변수 설정에 따라 다르며, 임무 경로나 임무 착륙 패턴 (정의 된 경우)을 따라서 동작합니다. 기본적으로 멀티콥터는 안전한 높이로 상승하고 홈 위치로 날아간 다음 착륙합니다.

<a id="mission_mc"></a>

### 임무 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[임무 모드](../flight_modes/mission.md)는 비행 제어기에 업로드하여 사전 정의된 자율 [임무](../flying/missions.md) (비행 계획)을 실행합니다. 임무는 일반적으로 지상관제(GCS) 애플리케이션으로 생성 및 업로드됩니다.

:::tip PX4 GCS는 [QGroundControl](https://docs.qgroundcontrol.com/en/)입니다. *QGroundControl*은 [PX4 설정](../config/README.md)시에 사용하는 것과 같은 프로그램입니다.
:::

<a id="takeoff_mc"></a>

### 이륙 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[이륙](../flight_modes/takeoff.md) 모드는 멀티콥터가 이륙 고도까지 수직 상승후에 호버링합니다.

<a id="land_mc"></a>

### 착륙 모드 (멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[착륙 모드](../flight_modes/land.md)는 멀티콥터의 이륙 위치에 착륙합니다.

<a id="followme_mc"></a>

### 추적 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[추적 모드](../flight_modes/follow_me.md)는 멀티콥터가 현재 위치 설정 값을 제공하는 사용자를 자율적으로 추적합니다. 위치 설정 값은 *QGroundControl*을 실행하는 Android 휴대 전화/태블릿 또는 MAVSDK 앱에서 가져올 수 있습니다.

<a id="offboard_mc"></a>

### 오프보드 모드(멀티콥터)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[오프 보드 모드](../flight_modes/offboard.md)는 멀티 콥터가 MAVLink를 통해 제공되는 위치, 속도 또는 자세 설정 값을 따르도록 합니다.

:::note
이 모드는 보조 컴퓨터와 지상관제소 프로그램을 위한 것입니다!
:::

<a id="fw_flight_modes"></a>

## 고정익 

<a id="position_fw"></a>

### 위치 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[위치모드](../flight_modes/position_fw.md)는 스틱을 놓거나 중앙에 놓을 때 기체가 바람 등의 외부 요인에도 지면 트랙에 대하여 수평과 직진 방향의 비행이 용이한 RC 모드입니다.

스로틀은 대기 속도를 결정합니다 (스로틀 50 %에서 기체는 사전 설정된 순항 속도로 현재 고도를 유지합니다). 피치는 상승과 하강에 사용됩니다. 롤, 피치 및 요는 모두 각도로 제어됩니다 (따라서 차량을 롤오버하거나 루프 할 수 없음).

:::tip
Position mode is the safest fixed-wing manual mode for new fliers.
:::

![FW Position Mode](../../assets/flight_modes/position_FW.png)

<a id="altitude_fw"></a>

### 고도 모드 (고정익)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;[<img src="../../assets/site/altitude_icon.svg" title="Altitude required (e.g. Barometer, Rangefinder)" width="30px" />](#altitude_only)

[Altitude mode](../flight_modes/altitude_fw.md) makes it easier for users to control vehicle altitude, and in particular to reach and maintain a fixed altitude. The mode will not attempt to hold the vehicle course against wind.

The climb/descent rate is controlled via the pitch/elevator stick. Once centered the autopilot latches onto the current altitude and will maintain it during yaw/roll, and at any airspeed. The throttle input controls airspeed. Roll and pitch are angle-controlled (so it is impossible to roll over or loop the vehicle).

When all remote control inputs are centered (no roll, pitch, yaw, and ~50% throttle) the aircraft will return to straight, level flight (subject to wind) and keep its current altitude.

:::tip
*Altitude mode* is the safest non GPS guided mode appropriate for beginners learning how to fly. It is just like [Manual](#manual_fw) mode but additionally stabilizes the vehicle altitude when the pitch stick is released.
:::

![FW Altitude Mode](../../assets/flight_modes/altitude_FW.png)

<a id="stabilized_fw"></a>

### 안정화 모드 (고정익)

[<img src="../../assets/site/difficulty_medium.png" title="Medium difficulty to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Stabilized mode](../flight_modes/stabilized_fw.md) puts the vehicle into straight and level flight when the RC sticks are centered, maintaining the horizontal posture against wind (but not vehicle heading and altitude).

The vehicle climb/descends based on pitch input and performs a coordinated turn if the roll/pitch sticks are non-zero. Roll and pitch are angle controlled (you can't roll upside down or loop).

:::tip
*Stabilized mode* is much easier to fly than [Manual mode](#manual_fw) because you can't roll or flip it, and it is easy to level the vehicle by centering the control sticks.
:::

The vehicle will glide if the throttle is lowered to 0% (motor stops). In order to perform a turn the command must beheld throughout the maneuver because if the roll is released the plane will stop turning and level itself (the same is true for pitch and yaw commands).

![FW Manual Flight](../../assets/flight_modes/manual_stabilized_FW.png)

<a id="acro_fw"></a>

### 곡예 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Acro mode](../flight_modes/acro_fw.md) is the RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

The roll, pitch and yaw sticks control the rate of angular rotation around the respective axes and throttle is passed directly to the output mixer. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (on its side, inverted, or whatever) and moving according to its current momentum.

![FW Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_FW.png)

<a id="manual_fw"></a>

### 수동 모드 (고정익)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

[Manual mode](../flight_modes/manual_fw.md) sends RC stick input directly to the output mixer for "fully" manual control.

:::tip
This is the hardest mode to fly, because nothing is stabilised. Unlike [Acro Mode](#acro_fw) if the RP stick is centered the vehicle will not automatically stop rotating around the axis - the pilot actually has to move the stick to apply force in the other direction.
:::

:::note
This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
:::

<a id="hold_fw"></a>

### 유지 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Hold](../flight_modes/hold.md) causes a fixed-wing vehicle to start circling around the current position at its current altitude. The mode can be used to pause a mission or to help regain control of a vehicle in an emergency. It can be activated with a pre-programmed RC switch or the *QGroundControl* **Pause** button.

<a id="return_fw"></a>

### 귀환 모드(고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Return mode](../flight_modes/return.md) causes the vehicle to fly a clear path to a safe location. The mode may be activated manually (via a pre-programmed RC switch) or automatically (i.e. in the event of a [failsafe](../config/safety.md) being triggered).

The return behaviour depends on parameter settings, and may follow a mission path and/or mission landing pattern (if defined). By default a fixed wing vehicle will ascend to a safe height and use a mission landing pattern if one exists, otherwise it will fly to the home position and circle.

<a id="mission_fw"></a>

### 임무 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Mission mode](../flight_modes/mission.md) causes the vehicle to execute a predefined autonomous [mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).
:::

<a id="takeoff_fw"></a>

### 이륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Takeoff mode](../flight_modes/takeoff.md#fixed_wing) initiates the vehicle takeoff sequence. The specific launch behaviour depends on the configured takeoff mode (catapult/hand-launch mode or runway takeoff mode).

<a id="land_fw"></a>

### 착륙 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;

[Land mode](../flight_modes/land.md) causes the vehicle to turn and land at the location at which the mode was engaged. Fixed wing landing logic and parameters are explained in the topic: [Landing (Fixed Wing)](../flying/fixed_wing_landing.md).

<a id="offboard_fw"></a>

### 오프보드 모드 (고정익)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

[Offboard mode](../flight_modes/offboard.md) causes the fixed wing vehicle to obey attitude setpoints provided over MAVLink.

:::note
This mode is intended for vehicle control from companion computers and ground stations!
:::

## 수직이착륙기 (VTOL)

A VTOL aircraft can fly as either a multicopter or as fixed-wing vehicle. The multicopter mode is mainly used for take off and landing while the fixed wing mode is used for efficient travel and/or mission execution.

Generally the flight modes for VTOL vehicles are the same as for [multicopter](#mc_flight_modes) when flying in MC mode and [fixed-wing](#fw_flight_modes) when flying in FW mode.

The switch between modes is initiated either by the pilot using an RC switch or automatically by PX4 when needed in the Auto modes.

A few notes:

* VTOL [귀환 모드](../flight_modes/return.md)는 정의된 경우 기본적으로 미션 착륙을 사용합니다.

<a id="ugv_flight_modes"></a>

## 로버/보트

Ground vehicles and boats only support [manual mode](#manual-mode-ugv) and [mission mode](#mission-mode-ugv) (while you can switch to other modes, these all behave just like manual mode).

### 수동 모드 (UGV)

[<img src="../../assets/site/difficulty_easy.png" title="Easy to use" width="30px" />](#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](#key_manual)&nbsp;

:::note
This mode is enabled unless mission mode is set.
:::

*Manual mode*<!-- [Manual](../flight_modes/manual_ugv.md) --> stops motors when RC control sticks are centered. To move the vehicle you move the sticks outside of the center.

<!--
When under manual control the roll and pitch sticks control the angle of the vehicle (attitude), the yaw stick controls the rate of rotation above the horizontal plane, and the throttle controls altitude/speed.
-->

As soon as you release the control sticks they will return to the center deadzone. This will turn off the motors and center the wheels/rudder. There is no active braking, so the vehicle may continue to move until its momentum dissipates (and for a boat, continue to drift).

<!--
![MC Manual Flight](../../assets/flight_modes/manual_stabilized_MC.png)
-->

### 임무 모드 (UGV)

[<img src="../../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" />](#key_automatic)&nbsp;[<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />](#key_position_fixed)

*Mission mode* <!-- [Mission mode](../flight_modes/mission.md) --> causes the vehicle to execute a predefined autonomous 

[mission](../flying/missions.md) (flight plan) that has been uploaded to the flight controller. The mission is typically created and uploaded with a Ground Control Station (GCS) application.

:::tip
The PX4 GCS is called [QGroundControl](https://docs.qgroundcontrol.com/en/). *QGroundControl* is the same application we use for [configuring PX4](../config/README.md).
:::

## 추가 정보

* [비행 > 비행 모드](../flight_modes/README.md) - 모든 모드에 대한 자세한 설명
* [기본 구성> 비행 모드](../config/flight_mode.md) - RC 제어 스위치를 특정 비행 모드에 매핑하는 방법