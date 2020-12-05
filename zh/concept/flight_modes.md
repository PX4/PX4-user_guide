# 飞行模式

*飞行模式* 定义自动驾驶仪如何响应用户输入并控制飞机移动。 可以根据自动驾驶仪介入的程度将飞行模式粗略地分为 *手动 （manual）*, *辅助 （assisted）* 和 *自动 （auto）* 三大模式。 飞行员使用遥控器上的开关或者 [ground control station](../qgc/README.md) 在飞行模式之间进行切换。

需要注意的是并非所有类型的飞机都具备全部的飞行模式，同时部分模式在不同类型的飞机上的行为模式也不相同（见下文）。 最后，部分飞行模式仅在飞行前或者飞行中某些特定条件下才有意义（如 GPS锁定，空速传感器，飞机扰一个轴进行姿态感知）。 除非满足合适的条件，则系统不会允许切换到这些模式下。

下面的各小节对所以的飞行模式进行了一个概述，随后给出了一张 [飞行模式评估图](#flight-mode-evaluation-diagram) ，改图展示了 PX4 在何种条件下会切换至一个新的飞行模式。

面向用户的飞行模式文件可在以下面找到：
- [Getting Started > Flight Modes](../getting_started/flight_modes.md): 对初学者友好的所有飞行模式解释
- [Flying > Flight Modes](../flight_modes/README.md): 每种模式的详细解释文件
:::

## 飞行模式概要

### 手动飞行模式

“手动”飞行模式下用户可通过遥控器（或操纵杆）实现对飞机的直接控制。 飞机的运动总是跟随者着摇杆的运动，但飞机对操作命令的响应的级别/类型会根据模式的不同而发生变化。 例如，有经验的飞手会使用操纵杆直接操作舵机的模式，而初学者通常会选择对突然的操作杆位置变化反应较小的模式。

* **固定翼无人机/无人车/无人船：**
  * **手动控制模式：**飞手的控制输入（ 来自遥控器的原始用户输入 ）直接传递给输出混控器。
  * **自稳模式：**飞手的俯仰和横滚输入以角度的方式传递给飞控，而偏航输入通过输出混合器直接发送到方向舵（手动控制）。 如果遥控器的俯仰杆和滚转杆在中间，飞控程序会将无人机的俯仰角和滚转角调为0°，从而稳定（调平）姿态，以防止风的干扰。 然而，在这种模式下，飞控程序不会去控制无人机的位置，因此位置会因风而漂移。 在非零滚转角输入下，无人机会进行一个协调行的转弯以实现零侧滑（y方向（侧向）的加速度为零）。 在协调转弯时，方向舵用于控制侧滑角，任何手动的偏航输入都会叠加在侧滑控制中。
  * **特技模式:**飞手的输入作为滚转、俯仰和偏航 *角速率* 指令传递给飞控程序。 飞控程序会控制角速率。 飞手对油门的操作输入将直接传递到输出混控器上。

* **多旋翼无人机：**
  * **手动/自稳模式：**飞手的操作输入会作为滚转和俯仰*角度*指令和偏航*角速率* 指令。 飞手对油门的操作输入将直接传递到输出混控器上。 飞控程序控制姿态，这意味着遥控器的俯仰杆和滚转杆在中间时，飞控程序会将俯仰角和滚转角调整为零，从而使姿态保持水平。 然而，在这种模式下，飞控程序不会去控制无人机的位置，因此位置会因风而漂移。

    :::note 对于多旋翼无人机，手动控制模式和自稳模式是相通的。
:::

  * **特技模式：**飞手的输入作为滚转、俯仰和偏航 *角速率* 指令传递给飞控程序。 飞控程序会控制无人机的姿态角变化的角速度，但不会控制姿态。 因此即便遥控器摇杆处于居中位置，无人机也不会调平。 这一特性使得多旋翼无人机可以完全翻转过来。 飞手对油门的操作输入将直接传递到输出混控器上。
  * **姿态特技模式：**如果飞行员的输入值大于该模式的阈值，即如果遥控器操纵杆离中心位置有一定距离，飞手的输入作为滚转、俯仰和偏航 *角速率* 指令传递给飞控程序。 反之，飞手的操作输入会作为滚转和俯仰<1>角度</1>指令和偏航<1>角速率</1> 指令。 飞手对油门的操作输入将直接传到输出混控器上。 简言之，当遥控器操纵杆远离中心时，飞控程序会充当角速率控制器（如特技模式模式），而当遥控器操纵杆中间部位时，飞控程序会充当姿态控制器（如在自稳模式下）。


### 辅助飞行模式

“辅助”飞行模式也由飞手控制，但会提供一定程度的“自动”辅助，例如，在风的干扰下自动保持位置/方向。 辅助飞行模式会让获取或恢复受控的飞行状态变得更加容易。

* **定高模式：** （高度控制）
  * **固定翼飞机：**当滚转、俯仰和偏航（RPY）控制杆全部居中（或小于某个规定的死区范围），飞机将保持当前高度平直飞行。 飞机的的 X 和 Y 方向的位置会随风漂移。
  * **多旋翼：** 滚转、俯仰和偏航输入与自稳模式相同。 油门输入会令飞机按照预定的最大速率爬升或下降。 油门的输入有很大的死区。 油门居中表示保持当前高度。 飞控程序仅控制高度，所以飞机的 X、Y 位置会随风漂移。
* **自动返航模式：** （位置控制）
  * **固定翼飞机：** 中兴的输入（遥控器控制杆居中）会令飞机保持水平飞行，且如果需要保持直线飞行的话飞控程序将会根据情况产生偏航指令以应对风的影响。
  * **多旋翼：** 滚转控制左右向速度，俯仰控制飞机相对地面的前后向速度。 偏航与手动控制模式一样，控制的是偏航角速率。 油门与定高模式 模式一样控制飞机的爬升/下降速率。 这意味着当滚转、俯仰和油门杆居中时，飞控程序会在任意风的干扰下稳定地保持飞机的X、Y、Z 位置。

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
