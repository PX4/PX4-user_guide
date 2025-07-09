---
canonicalUrl: https://docs.px4.io/main/ko/concept/flight_modes
---

# 비행 모드

*비행 모드*는 사용자 입력에 대한 자동조종장치의 응답 방식과 기체 제어 방식을 정의합니다. 자동조종장치가 제공하는 제어 수준/유형에 따라 *수동*, *보조* 및 *자동* 모드로 그룹화됩니다. 조종사는 리모콘 스위치를 사용하거나 지상 관제소를 사용하여 비행 모드를 전환할 수 있습니다.

기체마다 모든 비행 모드가  적용되지 않으며, 일부 모드는 기체 유형에 따라 작동 방식이 차이가 납니다(아래 설명 참조). Finally, some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock). 시스템은 조건이 충족할 때까지, 해당 모드로의 전환을 허용하지 않습니다.

아래 섹션에서는 모드 개요를 제공하고, PX4의 신규 모드 전환 조건을 나타내는 [비행 모드 평가 다이어그램](#flight-mode-evaluation-diagram)을 제공합니다.

:::note
사용자 대면 비행 모드 문서는 다음을 참고하십시오.
- [시작 > 비행 모드](../getting_started/flight_modes.md): 모든 비행 모드에 기초적인 설명
- [비행 > 비행 모드](../flight_modes/README.md): 각 비행 모드에 대한 설명
:::

## 비행 모드 개요

### Manual Flight Modes

"수동" 모드는 사용자가 RC 제어(또는 조이스틱)로 차량을 직접 제어하는 모드입니다. 기체의 움직임은 항상 스틱에 따라 움직이지만, 모드에 따라 반응의 정도나 유형이 달라집니다. 예를 들어, 숙련된 비행사는 액츄에이터에 스틱 위치를 직접 전달하는 모드를 사용할 수 있지만, 초보자는 갑작스러운 스틱 위치 변경에 덜 반응하는 모드를 사용하는 경우가 많습니다.

- **로보/보트:**
  * **MANUAL/STABILIZED/ACRO:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.

- **Fixed-wing aircraft:**

  - **MANUAL:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.
  - **STABILIZED:** The pilot's pitch and roll inputs are passed as angle commands to the autopilot, while the yaw input is sent directly via control allocation to the rudder (manual control). RC 롤과 피치 스틱이 중앙에 있으면 자동조종장치가 롤과 피치 각도를 0으로 조절하여 바람의 방해에 대하여 자세를 안정화(평준화)합니다. 그러나, 이 모드에서는 기체의 위치가 자동조종장치에 의해 제어되지 않으므로, 바람에 의해 위치가 이동할 수 있습니다. 0이 아닌 롤 입력으로 기체는 제로 사이드슬립을 위하여 조정된 회전을 수행합니다(y 방향(측면)의 가속도는 0임). 조정 회전 동안 방향타를 사용하여 사이드 슬립을 제어하고, 여기에 수동 요 입력이 추가됩니다.
  - **곡예:** 조종사의 입력은 자동조종장치에 롤, 피치 및 요 *속도* 명령으로 전달됩니다. 자동조종장치는 각속도를 제어합니다. Throttle is passed directly to control allocation.

- **멀티콥터:**

  - **수동/안정화:** 조종사의 입력은 롤 및 피치 *각도* 명령과 요 *속도* 명령으로 전달됩니다. Throttle is passed directly to control allocation. 자동조종장치는 자세를 제어합니다. 즉, RC 스틱이 중앙에 있을 때, 롤 및 피치 각도를 0으로 조절하여 자세를 평평하게 만듭니다. 그러나, 이 모드에서는 기체 위치가 자동조종장치에 의해 제어되지 않으므로, 바람에 의해 위치가 이탈할 수 있습니다.

    :::note
멀티콥터의 수동 모드와 안정화 모드는 동일합니다.
:::

  - **곡예:** 조종사의 입력은 자동조종장치에 롤, 피치 및 요 *속도* 명령으로 전달됩니다. 자동조종장치는 각속도를 제어하지만, 자세는 제어하지 않습니다. 따라서, RC 스틱이 중앙에 위치하면 기체는 수평을 맞추지 않습니다. 이렇게 하면 멀티콥터가 완전히 뒤집힐 수 있습니다. Throttle is passed directly to control allocation.

### 보조 비행 모드

"보조" 모드도 사용자가 제어할 수 있지만, 일정 수준의 "자동" 지원을 제공합니다(예: 바람에 대하여 자동으로 위치와 방향 유지). 보조 모드를 사용하 통제된 비행을 획득하거나 복원하기가 훨씬 쉬워집니다.

- **ALTCTL** (고도 제어)

  - **Fixed-wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude. x와 y 위치는 바람에 따라 표류합니다.
  - **멀티콥터:** 롤, 피치 및 요 입력은 안정화 모드와 같습니다. 스로틀 입력은 미리 결정된 최대 속도로 상승 또는 하강을 나타냅니다. 스로틀에 데드존이 큽니다. 중앙 스로틀은 고도를 안정적으로 유지합니다. 자동조종장치는 고도만 제어하므로 차량의 x,y 위치가 바람에 따라 표류할 수 있습니다.
- **POSCTL** (위치 제어)

  - **Fixed-wing aircraft:** Neutral inputs (centered RC sticks) give level flight and it will crab against the wind if needed to maintain a straight line.
  - **멀티콥터:** 롤은 좌우 속도를 제어하고 피치는 지면에서 앞뒤 속도를 제어합니다. Yaw는 수동 모드에서와 같이 요 레이트를 제어합니다. 스로틀은 ALTCTL 모드에서와 같이 상승 하강 속도를 제어합니다. 이는 롤, 피치 및 스로틀 스틱이 중앙에 있을 때, 기체의 x, y, z 위치가 자동조종장치에 의해 바람 방해에 대해 안정적으로 유지되는 것을 의미합니다.

### 자동 비행 모드

"자동" 모드는 컨트롤러가 사용자 입력이 필요없는 모드입니다(예: 이륙, 착륙 및 비행 임무).

- **AUTO_LOITER** (로이터)

  - **Fixed-wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  - **멀티콥터:** 멀티콥터는 현재 위치와 고도에서 호버링 배회합니다.
- **AUTO_RTL** (실행으로 돌아가기)

  - **Fixed-wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  - **멀티콥터:** 멀티콥터는 현재 고도(현재 고도가 홈 위치 + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)보다 높은 경우) 또는

RTL_RETURN_ALT</ 1>([RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)이 현재 고도보다 높은 경우), 자동으로 착륙합니다.</li> </ul></li> 
    
    - **AUTO_MISSION** (미션) 
    - **모든 시스템 유형:** 기체는 지상관제소(GCS)에서 전송한 프로그래밍된 임무를 수행합니다. 임무를 수신하지 않으면, 기체는 현재 위치에서 배회합니다.
  - **_OFFBOARD:_**(오프보드) 위치, 속도 또는 자세 기준/목표/설정점은 직렬 케이블과 MAVLink로 연결된 보조 컴퓨터에서 제공합니다. 오프보드 설정값은 [MAVSDK](http://mavsdk.mavlink.io) 또는 [MAVROS](https://github.com/mavlink/mavros)와 같은 API에서 제공할 수 있습니다.</ul> 



## 비행 모드 평가 다이어그램

![지휘관 흐름도](../../assets/diagrams/commander-flow-diagram.png)
