# 비행 모드

_Flight Modes_ define how the autopilot responds to user input and controls vehicle movement.
They are loosely grouped into _manual_, _assisted_ and _auto_ modes, based on the level/type of control provided by the autopilot.
조종사는 리모콘 스위치를 사용하거나 지상 관제소를 사용하여 비행 모드를 전환할 수 있습니다.

기체마다 모든 비행 모드가  적용되지 않으며, 일부 모드는 기체 유형에 따라 작동 방식이 차이가 납니다(아래 설명 참조).
Finally, some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock).
시스템은 조건이 충족할 때까지, 해당 모드로의 전환을 허용하지 않습니다.

The sections below provide an overview of the modes, followed by a [flight mode evaluation diagram](#flight-mode-evaluation-diagram) that shows the conditions under which PX4 will transition into a new mode.

:::info
User-facing flight mode documentation can be found in:

- [Flight Modes (Multicopter)](../flight_modes_mc/index.md)
- [Flight Modes (Fixed-Wing)](../flight_modes_fw/index.md)
- [Flight Modes (VTOL)](../flight_modes_vtol/index.md)
- [Drive Modes (Differential Rover)](../flight_modes_rover/differential.md)
- [Drive Modes (Ackermann Rover)](../flight_modes_rover/ackermann.md)

:::

## 비행 모드 개요

### Manual Flight Modes

"Manual" modes are those where the user has direct control over the vehicle via the RC control (or joystick).
Vehicle movement always follows stick movement, but the level/type of response changes depending on the mode.
For example, experienced fliers can use modes that provide direct passthrough of stick positions to actuators, while beginners will often choose modes that are less responsive to sudden stick-position changes.

- **Rovers / Boats:**

  - **MANUAL/STABILIZED/ACRO:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.

- **Fixed-wing aircraft:**

  - **MANUAL:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.
  - **STABILIZED:** The pilot's pitch and roll inputs are passed as angle commands to the autopilot, while the yaw input is sent directly via control allocation to the rudder (manual control).
    RC 롤과 피치 스틱이 중앙에 있으면 자동조종장치가 롤과 피치 각도를 0으로 조절하여 바람의 방해에 대하여 자세를 안정화(평준화)합니다.
    그러나, 이 모드에서는 기체의 위치가 자동조종장치에 의해 제어되지 않으므로, 바람에 의해 위치가 이동할 수 있습니다.
    0이 아닌 롤 입력으로 기체는 제로 사이드슬립을 위하여 조정된 회전을 수행합니다(y 방향(측면)의 가속도는 0임).
    조정 회전 동안 방향타를 사용하여 사이드 슬립을 제어하고, 여기에 수동 요 입력이 추가됩니다.
  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot.
    자동조종장치는 각속도를 제어합니다.
    Throttle is passed directly to control allocation.

- **Multirotors:**

  - **STABILIZED** (**MANUAL** also selects this mode): The pilot's inputs are passed as roll and pitch _angle_ commands and a yaw _rate_ command.
    Throttle is passed directly to control allocation.
    자동조종장치는 자세를 제어합니다. 즉, RC 스틱이 중앙에 있을 때, 롤 및 피치 각도를 0으로 조절하여 자세를 평평하게 만듭니다.
    그러나, 이 모드에서는 기체 위치가 자동조종장치에 의해 제어되지 않으므로, 바람에 의해 위치가 이탈할 수 있습니다.

    ::: info
    For Multirotors, Manual and Stabilized modes are the same.

:::

  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot.
    자동조종장치는 각속도를 제어하지만, 자세는 제어하지 않습니다.
    따라서, RC 스틱이 중앙에 위치하면 기체는 수평을 맞추지 않습니다.
    이렇게 하면 멀티콥터가 완전히 뒤집힐 수 있습니다.
    Throttle is passed directly to control allocation.

### 보조 비행 모드

"Assisted" modes are also user controlled but offer some level of "automatic" assistance - for example, automatically holding position/direction, against wind.
Assisted modes often make it much easier to gain or restore controlled flight.

- **ALTCTL** (Altitude Control)

  - **Fixed-wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude.
    x와 y 위치는 바람에 따라 표류합니다.
  - **Multirotors:** Roll, pitch and yaw inputs are as in Stabilised mode.
    스로틀 입력은 미리 결정된 최대 속도로 상승 또는 하강을 나타냅니다.
    스로틀에 데드존이 큽니다.
    중앙 스로틀은 고도를 안정적으로 유지합니다.
    자동조종장치는 고도만 제어하므로 차량의 x,y 위치가 바람에 따라 표류할 수 있습니다.

- **POSCTL** (Position Control)

  - **Fixed-wing aircraft:** Neutral inputs (centered RC sticks) give level flight and it will crab against the wind if needed to maintain a straight line.
  - **Multirotors** Roll controls left-right speed, pitch controls front-back speed over ground.
    Yaw는 수동 모드에서와 같이 요 레이트를 제어합니다.
    스로틀은 ALTCTL 모드에서와 같이 상승 하강 속도를 제어합니다.
    이는 롤, 피치 및 스로틀 스틱이 중앙에 있을 때, 기체의 x, y, z 위치가 자동조종장치에 의해 바람 방해에 대해 안정적으로 유지되는 것을 의미합니다.

### 자동 비행 모드

"Auto" modes are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

- **AUTO_LOITER** (Loiter)

  - **Fixed-wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  - **Multirotors:** The multirotor hovers / loiters at the current position and altitude.

- **AUTO_RTL** (Return to Launch)

  - **Fixed-wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  - **Multirotors:** The multirotor returns in a straight line on the current altitude (if the current altitude is higher than the home position + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)) or on the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) (if the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) is higher than the current altitude), then lands automatically.

- **AUTO_MISSION** (Mission)
  - **All system types:** The aircraft obeys the programmed mission sent by the ground control station (GCS).
    임무를 수신하지 않으면, 기체는 현재 위치에서 배회합니다.
  - **_OFFBOARD_** (Offboard)
    In this mode the position, velocity or attitude reference / target / setpoint is provided by a companion computer connected via serial cable and MAVLink.
    The offboard setpoint can be provided by APIs like [MAVSDK](http://mavsdk.mavlink.io) or [MAVROS](https://github.com/mavlink/mavros).

## 비행 모드 평가 다이어그램

![Commander Flow diagram](../../assets/diagrams/commander-flow-diagram.png)
