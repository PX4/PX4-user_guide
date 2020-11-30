# 飞行 101

该主题介绍了用[遥控器](../getting_started/rc_transmitter_receiver.md)以手动或者自动-辅助飞行模式（自主飞行请参阅：[任务](../flying/missions.md)）来控制飞行器的基本飞行。

> **Note**在你首飞之前应该阅读我们的[首飞指南](../flying/first_flight_guidelines.md)

<span id="arm"></span>

## Arm the Vehicle

Before you can fly the vehicle it must first be [armed](../getting_started/px4_basic_concepts.md#arming). This will power all motors and actuators; on a multicopter it will start propellers turning.

To arm the drone:

- First disengage the [safety switch](../getting_started/px4_basic_concepts.md#safety_switch).
- Use the arm command for your vehicle - put the throttle stick in the bottom right corner. 
  - Alternatively configure an [arm/disarm switch](../config/safety.md#arming_switch).
  - You can also arm in *QGroundControl* (PX4 does not require a radio control for flying autonomously).

> **Tip** The vehicle will not arm until it is [calibrated/configured](../config/README.md) and has a position lock. [Vehicle Status Notifications](../getting_started/vehicle_status.md) (including on-vehicle LEDs, audio notifications and *QGroundControl* updates) can tell you when the vehicle is ready to fly (and help you work out the cause when it is not ready to fly).

<span></span>

> **Note** The vehicle will (by [default](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)) automatically [disarm](../advanced_config/prearm_arm_disarm.md#auto-disarming) (turn off motors) if you take too long to take off! This is a safety measure to ensure that vehicles return to a safe state when not in use.

<span></span>

> **Note** A VTOL vehicle can only arm in multicopter mode (by default - arming in fixed-wing mode can be enabled using [CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING)).

<span id="takeoff-and-landing"></span>

## 起飞 Takeoff

The easiest way to takeoff (after [arming the vehicle](#arm)) is to use the automatic [Takeoff mode](../flight_modes/takeoff.md). Usually this is triggered from an [RC switch](../config/flight_mode.md) or ground station.

Multicopter (and VTOL in multicopter mode) pilots can take off *manually* by enabling [position mode](../flight_modes/README.md#position_mc), arming the vehicle, and then raising the throttle stick above 62.5%. 高于此值，所有控制器都可以启用，飞行器进入悬停所需的油门量（[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)）.

> **Tip** The automatic takeoff mode is highly recommended, in particular for Fixed Wing vehicles!

<span></span>

> **Note** The vehicle may disarm if you take too long to take off after arming (tune the timeout using [COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)).

<span></span>

> **Note** The [Failure Detector](../config/safety.md#failure_detector) will automatically stop the engines if there is a problem on takeoff.

## 着陆

The easiest way to land is to use the automatic [Land](../flight_modes/land.md) or [Return](../flight_modes/return.md) modes.

For multicopter (and VTOL in multicopter mode) pilots can land manually by pressing the throttle stick down until the vehicle lands and disarms.

Note that vehicles automatically disarm on landing by default:

- Use [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) to set the time to auto-disarm after landing (or disable it altogether).
- Manually disarm by putting the throttle stick in the bottom left corner.

> **Note**如果你看见飞行器在降落时“抖动”（关闭电机之后，立即向上翻），这可能是由于[着陆检测器](../advanced_config/land_detector.md)配置不佳（特别是[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)参数设置不当）造成的。

<span></span>

> **Tip** Automatic landing is highly recommended, in particular for Fixed Wing vehicles.

## 飞行控制/命令

所有的飞行，包括起飞和降落，都是由 4 个基本命令进行控制：横滚，偏航，俯仰和油门。

![遥控基本命令](../../assets/flying/rc_basic_commands.png)

为了控制你的飞行器，你就需要知道基本的横滚，偏航，俯仰和油门等命令是如何在三维空间里影响飞行运动的。 这取决于你是控制的是 plane 那样的前飞飞机，还是旋翼机那样的 “悬停飞机”。

### 悬停飞机

悬停飞机（旋翼机，垂起机的悬停模式）响应移动命令，如下所示：

![多轴飞行器的基本运动](../../assets/flying/basic_movements_multicopter.png)

- Pitch => Forward/back.
- 横滚 => 往左 / 往右。
- 偏航 => 围绕机身中心左 / 右旋转。
- 油门 => 改变高度 / 速度。

### 前飞飞机

前飞飞机（plane，垂起的前飞模式）响应移动命令，如下所示：

![向前的基本运动](../../assets/flying/basic_movements_forward.png)

- 俯仰 => 上 / 下升降舵。
- 横滚 => 左 / 右副翼。
- 偏航 => 左 / 右方向舵。
- 油门 => 改变前飞速度。

> **Note** The best turn for airplanes is called a coordinated turn, and is performed using roll and little yaw at the same time. 这种策略需要经验！

## 辅助飞行

即是了解了飞行器是如何控制的，全手动模式的飞行也是不行的。 New users should [configure their transmitter](../config/flight_mode.md) to use flight modes where the autopilot automatically compensates for erratic user input or environmental factors.

强烈建议新手使用以下三种模式：

- 自稳模式-飞行器很难侧翻，并且如果摇杆被释放飞行器将趋于平稳（但不是位置定点）。
- 高度模式 - 爬升和降落由最大速率控制。
- 位置模式 - 当摇杆被释放飞行器将保持飞行（位置定点，不会随风漂移）。

> **Tip**你也可以通过*QGroundControl*主飞行界面底部的按钮访问自动模式。