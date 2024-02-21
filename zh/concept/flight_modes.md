# 飞行模式

_Flight Modes_ define how the autopilot responds to user input and controls vehicle movement. They are loosely grouped into _manual_, _assisted_ and _auto_ modes, based on the level/type of control provided by the autopilot. 飞手使用遥控器上的开关或者 ground control station 在飞行模式之间进行切换。

需要注意的是并非所有类型的飞机都具备全部的飞行模式，同时部分模式在不同类型的飞机上的行为模式也不相同（见下文）。 Finally, some flight modes make sense only under specific pre-flight and in-flight conditions (e.g. GPS lock). 系统只会在特定条件下才能进行一些模式之间的切换。

下面的各小节对所有的飞行模式进行了一个概述，随后给出了一张 [飞行模式评估图](#flight-mode-evaluation-diagram) ，该图展示了 PX4 在哪一种条件下会切换至一个新的飞行模式。

:::note
面向用户的飞行模式文件可在以下面找到：

- [Flight Modes (Multicopter)](../flight_modes_mc/README.md)
- [Flight Modes (Fixed-Wing)](../flight_modes_fw/README.md)
- [Flight Modes (VTOL)](../flight_modes_vtol/README.md)
- [Flight/Drive Modes (Rover)](../flight_modes_rover/README.md)

:::

## 飞行模式概要

### Manual Flight Modes

"Manual" modes are those where the user has direct control over the vehicle via the RC control (or joystick). Vehicle movement always follows stick movement, but the level/type of response changes depending on the mode. For example, experienced fliers can use modes that provide direct passthrough of stick positions to actuators, while beginners will often choose modes that are less responsive to sudden stick-position changes.

- **无人车/无人船：**

  - **MANUAL/STABILIZED/ACRO:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.

- **Fixed-wing aircraft:**

  - **MANUAL:** The pilot's control inputs (raw user inputs from RC transmitter) are passed directly to control allocation.
  - **STABILIZED:** The pilot's pitch and roll inputs are passed as angle commands to the autopilot, while the yaw input is sent directly via control allocation to the rudder (manual control). If the RC roll and pitch sticks are centered, the autopilot regulates the roll and pitch angles to zero, hence stabilizing (leveling-out) the attitude against any wind disturbances. However, in this mode the position of the aircraft is not controlled by the autopilot, hence the position can drift due to wind. With nonzero roll input the vehicle does a coordinated turn to achieve zero sideslip (the acceleration in y-direction (sidewards) is zero). During a coordinated turn, the rudder is used to control the sideslip and any manual yaw input is added to that.
  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot. 反之，飞手的操作输入会作为滚转和俯仰<1>角度</1>指令和偏航<1>角速率</1> 指令。 Throttle is passed directly to control allocation.

- **多旋翼：**

  - **MANUAL/STABILIZED** The pilot's inputs are passed as roll and pitch _angle_ commands and a yaw _rate_ command. Throttle is passed directly to control allocation. The autopilot controls the attitude, meaning it regulates the roll and pitch angles to zero when the RC sticks are centered, consequently leveling-out the attitude. However, in this mode the position of the vehicle is not controlled by the autopilot, hence the position can drift due to wind.

    :::note
For Multirotors, Manual and Stabilized modes are the same.
:::

  - **ACRO:** The pilot's inputs are passed as roll, pitch, and yaw _rate_ commands to the autopilot. The autopilot controls the angular rates, but not the attitude. Hence, if the RC sticks are centered the vehicle will not level-out. This allows the multirotor to become completely inverted. Throttle is passed directly to control allocation.

### 辅助飞行模式

"Assisted" modes are also user controlled but offer some level of "automatic" assistance - for example, automatically holding position/direction, against wind. Assisted modes often make it much easier to gain or restore controlled flight.

- **定高模式：** （高度控制）

  - **Fixed-wing aircraft:** When the roll, pitch and yaw (RPY) RC sticks are all centered (or less than some specified deadband range) the aircraft will return to straight and level flight and keep its current altitude. 飞机的的 X 和 Y 方向的位置会随风漂移。
  - **多旋翼：** 滚转、俯仰和偏航输入与自稳模式相同。 油门输入会令飞机按照预定的最大速率爬升或下降。 油门的输入有很大的死区。 油门居中表示保持当前高度。 飞控程序仅控制高度，所以飞机的 X、Y 位置会随风漂移。

- **位置保持模式：** （位置控制）

  - **Fixed-wing aircraft:** Neutral inputs (centered RC sticks) give level flight and it will crab against the wind if needed to maintain a straight line.
  - **多旋翼：** 滚转控制左右向速度，俯仰控制飞机相对地面的前后向速度。 偏航与手动控制模式一样，控制的是偏航角速率。 油门与定高模式 模式一样控制飞机的爬升/下降速率。 这意味着当滚转、俯仰和油门杆居中时，飞控程序会在任意风的干扰下稳定地保持飞机的X、Y、Z 位置。

### 自动飞行模式

"Auto" modes are those where the controller requires little to no user input (e.g. to takeoff, land and fly missions).

- **自动盘旋模式：** （留待）

  - **Fixed-wing aircraft:** The aircraft loiters around the current position at the current altitude (or possibly slightly above the current altitude, good for 'I'm losing it').
  - **Multirotors:** The multirotor hovers / loiters at the current position and altitude.

- **自动返航模式：** （返航）

  - **Fixed-wing aircraft:** The aircraft returns to the home position and loiters in a circle above the home position.
  - **Multirotors:** The multirotor returns in a straight line on the current altitude (if the current altitude is higher than the home position + [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT)) or on the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) (if the [RTL_RETURN_ALT](../advanced_config/parameter_reference.md#RTL_RETURN_ALT) is higher than the current altitude), then lands automatically.

- **AUTO_MISSION** (Mission)
  - **所有类型的系统：**飞机执行由地面控制站 (GCS) 发送的预规划飞行任务。 如果没有收到任务, 飞机将会在当前的的位置上停留/盘旋。
  - ***离线模式*** (离线) 此模式下位置、速度和姿态角的 参考值/目标值/设定值 由通过串口或者 MAVLink 连接的配套计算机提供。 离线模式的设定值可以由诸如 [MAVROS](https://github.com/mavlink/mavros) 或者 [Dronekit](http://dronekit.io) 等 API 接口提供。

## 飞行模式评估图

![Commander Flow diagram](../../assets/diagrams/commander-flow-diagram.png)
