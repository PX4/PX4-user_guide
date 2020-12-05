# 飞行模式

*飞行模式* 定义自动驾驶仪如何响应用户输入并控制飞机移动。 可以根据自动驾驶仪介入的程度将飞行模式粗略地分为 *手动 （manual）*, *辅助 （assisted）* 和 *自动 （auto）* 三大模式。 飞行员使用遥控器上的开关或者 [ground control station](../qgc/README.md) 在飞行模式之间进行切换。

需要注意的是并非所有类型的飞机都具备全部的飞行模式，同时部分模式在不同类型的飞机上的行为模式也不相同（见下文）。 最后，部分飞行模式仅在飞行前或者飞行中某些特定条件下才有意义（如 GPS锁定，空速传感器，飞机扰一个轴进行姿态感知）。 除非满足合适的条件，都则系统不会允许切换到这些模式下。

下面的各小节对所以的飞行模式进行了一个概述，随后给出了一张 [飞行模式评估图](#flight-mode-evaluation-diagram) ，改图展示了 PX4 在何种条件下会切换至一个新的飞行模式。

面向用户的飞行模式文件可在以下面找到：
- [Getting Started > Flight Modes](../getting_started/flight_modes.md): 对初学者友好的所有飞行模式解释
- [Flying > Flight Modes](../flight_modes/README.md): 每种模式的详细解释文件
:::

## 飞行模式概要

### 手动飞行模式

“辅助”飞行模式下也是用户进行控制，但该模式会提供一定程度的“自动”辅助 - 比如说在风的干扰下自动保持飞机的位置/指向。 辅助模式使得获取或恢复受控飞行变得更容易。 例如，有经验的飞手会使用操纵杆-舵机强联系的模式，而初学者通常会选择操纵杆-舵机弱联系的模式。

* **固定翼飞机/无人车/无人船：**
  * **手动控制模式：** 飞手的控制输入（ 来自 RC 发射器的原始用户输入 ）直接传递给输出混控器。
  * **多旋翼：** 滚转、俯仰和偏航输入与 Stabilised 模式相同。 油门输入表示以预设的最大速率爬升或下降， 油门有很大的死区。 油门居中表示保持当前高度。 自驾仪仅控制高度，所以飞机的 X、Y 位置会跟着风发生漂移。
  * **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw *rate* commands to the autopilot. The autopilot controls the angular rates. Throttle is passed directly to the output mixer.

* **Multirotors:**
  * **MANUAL/STABILIZED** The pilot's inputs are passed as roll and pitch *angle* commands and a yaw *rate* command. Throttle is passed directly to the output mixer. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered, consequently leveling-out the attitude. However, in this mode the position of the vehicle is not controlled by the autopilot, hence the position can drift due to wind.

    :::note For Multirotors, Manual and Stabilized modes are the same.
:::

  * **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw *rate* commands to the autopilot. The autopilot controls the angular rates, but not the attitude. Hence, if the RC sticks are centered the vehicle will not level-out. This allows the multirotor to become completely inverted. Throttle is passed directly to the output mixer.
  * **RATTITUDE** The pilot's inputs are passed as roll, pitch, and yaw *rate* commands to the autopilot if they are greater than the mode's threshold, i.e. if the RC sticks are a certain distance away from the center position. If not the inputs are passed as roll and pitch *angle* commands and a yaw *rate* command. Throttle is passed directly to the output mixer. In short, the autopilot acts as an angular rate controller when the RC sticks are away from center (like in the ACRO mode), whereas when the RC sticks are centered, the autopilot acts as an attitude controller (like in the Stabilized mode).


### 辅助飞行模式

"Assisted" modes are also user controlled but offer some level of "automatic" assistance - for example, automatically holding position/direction, against wind. Assisted modes often make it much easier to gain or restore controlled flight.

* **AUTO_LOITER：** （留待）
  * **Fixed wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude. Its x and y position will drift with the wind.
  * **Multirotors:** Roll, pitch and yaw inputs are as in Stabilised mode. Throttle inputs indicate climb or sink at a predetermined maximum rate. Throttle has large deadzone. Centered Throttle holds altitude steady. The autopilot only controls altitude so the x,y position of the vehicle can drift due to wind.
* **AUTO_RTL：** （返回并降落）
  * **固定翼飞机：** 飞机返回 home 位置并在 home 位置上空盘旋。
  * **Multirotors** Roll controls left-right speed, pitch controls front-back speed over ground. Yaw controls yaw rate as in MANUAL mode. Throttle controls climb/descent rate as in ALTCTL mode. This means that the x, y, z position of the vehicle is held steady by the autopilot against any wind disturbances, when the roll, pitch and throttle sticks are centered.

### 自动飞行模式

"Auto" modes are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

* **AUTO_LOITER** (Loiter)
  * **Fixed wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  * **Multirotors:**  The multirotor hovers / loiters at the current position and altitude.
* **AUTO_RTL** (Return to Land)
  * **Fixed wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  * **Multirotors:** The multirotor returns in a straight line on the current altitude (if the current altitude is higher than the home position + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)) or on the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) (if the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) is higher than the current altitude), then lands automatically.
* **AUTO_MISSION** (Mission)
  * **All system types:** The aircraft obeys the programmed mission sent by the ground control station (GCS). If no mission received, aircraft will LOITER at current position instead.
  * **_OFFBOARD_** (Offboard) In this mode the position, velocity or attitude reference / target / setpoint is provided by a companion computer connected via serial cable and MAVLink. The offboard setpoint can be provided by APIs like [MAVSDK](http://mavsdk.mavlink.io) or [MAVROS](https://github.com/mavlink/mavros).

## 飞行模式评估图

![Commander Flow diagram.](../../assets/diagrams/commander-flow-diagram.png)
