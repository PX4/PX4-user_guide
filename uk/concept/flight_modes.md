# Режими польоту (для розробників)

_Flight Modes_ define how the autopilot responds to user input and controls vehicle movement.
They are loosely grouped into _manual_, _assisted_ and _auto_ modes, based on the level/type of control provided by the autopilot.
Пілот перемикається між режимами польоту за допомогою перемикачів на пульті дистанційного керування або за допомогою наземної станції керування.

Не всі режими польоту доступні на всіх типах апаратів, а деякі режими поводяться по-різному на різних типах апаратів (як описано нижче).
Нарешті, деякі режими польоту мають сенс лише за особливих умов перед та під час польоту (напр. блокування GPS).
Система не дозволить переходи в ці режими, поки не будуть виконані відповідні умови.

The sections below provide an overview of the modes, followed by a [flight mode evaluation diagram](#flight-mode-evaluation-diagram) that shows the conditions under which PX4 will transition into a new mode.

:::info
User-facing flight mode documentation can be found in:

- [Режими польоту (Мультикоптер)](../flight_modes_mc/index.md)
- [Режими польоту (Фіксовані крила)](../flight_modes_fw/index.md)
- [Flight Modes (VTOL)](../flight_modes_vtol/index.md)
- [Drive Modes (Differential Rover)](../flight_modes_rover/differential.md)
- [Drive Modes (Ackermann Rover)](../flight_modes_rover/ackermann.md)

:::

## Опис режимів польоту

### Ручні режими польотів

"Ручні" режими - це ті, де користувач має прямий контроль над засобом за допомогою пульту радіо керування (або джойстика).
Рух рухомого засобу завжди слідує за рухом органів управління, але рівень/тип реакція змінюється в залежності від режиму.
Наприклад, досвідчені пілоти можуть використовувати режими, які дають пряму передачу позицій органів управління до приводів, тоді як початківці часто будуть обирати режими, яки менше реагують на раптові зміни положень органів управління.

- **Rovers / Boats:**

  - **MANUAL/STABILIZED/ACRO:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.

- **Fixed-wing aircraft:**

  - **MANUAL:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.
  - **STABILIZED:** The pilot's pitch and roll inputs are passed as angle commands to the autopilot, while the yaw input is sent directly via control allocation to the rudder (manual control).
    Якщо органи управління для крену та тангажу пульту РК центровані, автопілот регулює кути нахилу крену та тангажу до нуля, отже стабілізуючи (вирівнюючи) положення відносно будь-яких збурень вітру.
    Однак у цьому режимі положення літального апарату не контролюється автопілотом, тому положення може плисти через вітер.
    З ненульовими значеннями крену, рухомий засіб здійснює скоординований поворот щоб досягти нульового бічного зсуву (прискорення у напрямку осі Y, тобто вбік є нульовим).
    Під час скоординованого повороту для керування бічним зсувом використовується кермо, а будь-які ручні команди рискання додаються до цього.
  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot.
    Автопілот контролює кутові швидкості.
    Передача дроселя здійснюється безпосередньо для керування розподілом.

- **Multirotors:**

  - **STABILIZED** (**MANUAL** also selects this mode): The pilot's inputs are passed as roll and pitch _angle_ commands and a yaw _rate_ command.
    Передача дроселя здійснюється безпосередньо для керування розподілом.
    Автопілот контролює положення, це означає що він регулює кути крену та тангажу до нуля коли органи керування пульту РК центровані, як наслідок вирівнюючи положення.
    Однак у цьому режимі положення літального апарату не контролюється автопілотом, тому положення може плисти через вітер.

    ::: info
    For Multirotors, Manual and Stabilized modes are the same.

:::

  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot.
    Автопілот контролює кутові швидкості, але не положення.
    Отже, якщо органи керування пульту РК центровані, рухомий засіб не буде вирівняно.
    Це дозволяє мультиротору повністю обернутись.
    Передача дроселя здійснюється безпосередньо для керування розподілом.

### Допоміжні режими польоту

"Допоміжні" режими також контролюються користувачем, але пропонують певний рівень "автоматичної" допомоги, наприклад автоматично тримаючи позицію/гапрямок проти вітру.
Допоміжні режими часто полегшують здобуття або відновлення контрольованого польоту.

- **ALTCTL** (Altitude Control)

  - **Fixed-wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude.
    Його позиція по x та y буде плисти за вітром.
  - **Multirotors:** Roll, pitch and yaw inputs are as in Stabilised mode.
    Вхідні команди тяги вказують зростання або зменшення висоти із заздалегідь визначеною швидкістю.
    Тяга має велику мертву зону.
    Центрований орган керування тягою тримає стабільну висоту.
    Автопілот контролює тільки висоту, тому положення x,y може плисти через вітер.

- **POSCTL** (Position Control)

  - **Fixed-wing aircraft:** Neutral inputs (centered RC sticks) give level flight and it will crab against the wind if needed to maintain a straight line.
  - **Multirotors** Roll controls left-right speed, pitch controls front-back speed over ground.
    Рискання контролює швидкість рискання як в режимі MANUAL.
    Тяга контролює зростання/зменшення висоти як в режимі ALTCTL.
    Це означає що позиція апарату x, y, z утримується автопілотом стабільною проти будь-яких збурень вітру, коли органи управління КТР центровані.

### Режими автоматичного польоту

"Автоматичні" режими - це ті, коли контролер майже не потребує користувацьких команд (наприклад зліт, посадка та польотні завдання).

- **AUTO_LOITER** (Loiter)

  - **Fixed-wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  - **Multirotors:** The multirotor hovers / loiters at the current position and altitude.

- **AUTO_RTL** (Return to Launch)

  - **Fixed-wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  - **Multirotors:** The multirotor returns in a straight line on the current altitude (if the current altitude is higher than the home position + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)) or on the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) (if the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) is higher than the current altitude), then lands automatically.

- **AUTO_MISSION** (Mission)
  - **All system types:** The aircraft obeys the programmed mission sent by the ground control station (GCS).
    Якщо завдання не отримано, замість цього ЛА буде в режимі LOITER в поточному положенні.
  - **_OFFBOARD_** (Offboard)
    In this mode the position, velocity or attitude reference / target / setpoint is provided by a companion computer connected via serial cable and MAVLink.
    The offboard setpoint can be provided by APIs like [MAVSDK](http://mavsdk.mavlink.io) or [MAVROS](https://github.com/mavlink/mavros).

## Діаграма оцінки режимів польоту

![Commander Flow diagram](../../assets/diagrams/commander-flow-diagram.png)
