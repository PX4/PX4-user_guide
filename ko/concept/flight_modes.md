# 비행 모드

*비행 모드*는 사용자 입력에 대한 자동조종장치의 응답 방식과 기체 제어 방식을 정의합니다. 자동조종장치가 제공하는 제어 수준/유형에 따라 *수동*, *보조* 및 *자동* 모드로 그룹화됩니다. 조종사는 리모콘 스위치를 사용하거나 지상 관제소를 사용하여 비행 모드를 전환할 수 있습니다.

모든 기체에서 모든 비행 모드가  있지 않고, 일부 모드는 기체 유형에 따라 작동 방식이 다릅니다(아래 설명 참조). 마지막으로, 일부 비행 모드는 특정 비행 전 및 비행 중 조건(예: GPS 잠금, 속도 센서, 축을 따라 감지하는 차량 자세 감지)에서만 의미가 있습니다. 시스템은 조건이 충족할 때까지, 해당 모드로의 전환을 허용하지 않습니다.

아래 섹션에서는 모드 개요를 제공하고, PX4의 신규 모드 전환 조건을 나타내는 [비행 모드 평가 다이어그램](#flight-mode-evaluation-diagram)을 제공합니다.

:::note
사용자 대면 비행 모드 문서는 다음을 참고하십시오.
- [시작 > 비행 모드](../getting_started/flight_modes.md): 모든 비행 모드에 기초적인 설명
- [비행 > 비행 모드](../flight_modes/README.md): 각 비행 모드에 대한 설명
:::

## 비행 모드 개요

### 수동 비행 모드

"수동" 모드는 사용자가 RC 제어(또는 조이스틱)로 차량을 직접 제어하는 모드입니다. 기체의 움직임은 항상 스틱에 따라 움직이지만, 모드에 따라 반응의 정도나 유형이 달라집니다. 예를 들어, 숙련된 비행사는 액츄에이터에 스틱 위치를 직접 전달하는 모드를 사용할 수 있지만, 초보자는 갑작스러운 스틱 위치 변경에 덜 반응하는 모드를 사용하는 경우가 많습니다.

* **로보/보트:**
  * **MANUAL/STABILIZED/ACRO:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to the output mixer.

* **Fixed wing aircraft:**
  * **MANUAL:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to the output mixer.
  * **STABILIZED:** The pilot's pitch and roll inputs are passed as angle commands to the autopilot, while the yaw input is sent directly via the output mixer to the rudder (manual control). If the RC roll and pitch sticks are centered, the autopilot regulates the roll and pitch angles to zero, hence stabilizing (leveling-out) the attitude against any wind disturbances. However, in this mode the position of the aircraft is not controlled by the autopilot, hence the position can drift due to wind. With nonzero roll input the vehicle does a coordinated turn to achieve zero sideslip (the acceleration in y-direction (sidewards) is zero). During a coordinated turn, the rudder is used to control the sideslip and any manual yaw input is added to that.
  * **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw *rate* commands to the autopilot. The autopilot controls the angular rates. Throttle is passed directly to the output mixer.

* **Multirotors:**
  * **MANUAL/STABILIZED** The pilot's inputs are passed as roll and pitch *angle* commands and a yaw *rate* command. Throttle is passed directly to the output mixer. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered, consequently leveling-out the attitude. However, in this mode the position of the vehicle is not controlled by the autopilot, hence the position can drift due to wind.

:::note
For Multirotors, Manual and Stabilized modes are the same.
:::

  * **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw *rate* commands to the autopilot. The autopilot controls the angular rates, but not the attitude. Hence, if the RC sticks are centered the vehicle will not level-out. This allows the multirotor to become completely inverted. Throttle is passed directly to the output mixer.

### Assisted flight modes

"Assisted" modes are also user controlled but offer some level of "automatic" assistance - for example, automatically holding position/direction, against wind. Assisted modes often make it much easier to gain or restore controlled flight.

* **ALTCTL** (Altitude Control)
  * **Fixed wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude. Its x and y position will drift with the wind.
  * **Multirotors:** Roll, pitch and yaw inputs are as in Stabilised mode. Throttle inputs indicate climb or sink at a predetermined maximum rate. Throttle has large deadzone. Centered Throttle holds altitude steady. The autopilot only controls altitude so the x,y position of the vehicle can drift due to wind.
* **POSCTL** (Position Control)
  * **Fixed wing aircraft:** Neutral inputs (centered RC sticks) give level flight and it will crab against the wind if needed to maintain a straight line.
  * **Multirotors** Roll controls left-right speed, pitch controls front-back speed over ground. Yaw controls yaw rate as in MANUAL mode. Throttle controls climb/descent rate as in ALTCTL mode. This means that the x, y, z position of the vehicle is held steady by the autopilot against any wind disturbances, when the roll, pitch and throttle sticks are centered.

### Auto flight modes

"Auto" modes are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

* **AUTO_LOITER** (Loiter)
  * **Fixed wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  * **Multirotors:**  The multirotor hovers / loiters at the current position and altitude.
* **AUTO_RTL** (Return to Launch)
  * **Fixed wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  * **Multirotors:** The multirotor returns in a straight line on the current altitude (if the current altitude is higher than the home position + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)) or on the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) (if the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) is higher than the current altitude), then lands automatically.
* **AUTO_MISSION** (Mission)
  * **All system types:** The aircraft obeys the programmed mission sent by the ground control station (GCS). If no mission received, aircraft will LOITER at current position instead.
  * **_OFFBOARD_** (Offboard) In this mode the position, velocity or attitude reference / target / setpoint is provided by a companion computer connected via serial cable and MAVLink. The offboard setpoint can be provided by APIs like [MAVSDK](http://mavsdk.mavlink.io) or [MAVROS](https://github.com/mavlink/mavros).

## Flight Mode Evaluation Diagram

![Commander Flow diagram](../../assets/diagrams/commander-flow-diagram.png)
