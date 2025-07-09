---
canonicalUrl: https://docs.px4.io/main/zh/flying/basic_flying
---

# Manual Flying

本主题介绍了在手动或自动驾驶辅助飞行模式下使用[遥控器](../getting_started/rc_transmitter_receiver.md)操控机体的基础知识（有关自主飞行，请参阅：[任务](../flying/missions.md)）。

:::note
在您第一次飞行之前，您应该阅读我们的[首次飞行指南](../flying/first_flight_guidelines.md)。 :::

<a id="arm"></a>

## 解锁机体

Before you can fly the vehicle it must first be [armed](../getting_started/px4_basic_concepts.md#arming-and-disarming). 这将为所有电机和驱动器供电；在多轴飞行器上，它将启动螺旋桨转动。

解锁无人机
- First disengage the [safety switch](../getting_started/px4_basic_concepts.md#safety-switch).
- 对您的机体使用解锁命令 - 将油门杆放在右下角。
  - 或者增加一个[解锁/加锁开关](../config/safety.md#arm-disarm-switch)。
  - 你也可以在 *QGroundControl*中解锁 (PX4 自主飞行不需要无线电控制)。

:::tip
机体在[校准/配置](../config/README.md)完成且位置固定之前无法解锁。 [机体状态通知](../getting_started/vehicle_status.md) (包括机体LED, 音频通知和 *QGroundControl* 通知）可以告诉您机体何时可以飞行(并帮助您在未准备好飞行时找出原因)。 :::

:::note
如果您解锁后过长时间没有起飞，机体将（ [默认情况下](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)）自动[加锁](../advanced_config/prearm_arm_disarm.md#auto-disarming)（关闭电机）！ 这是一种安全措施，可确保机体在没有被使用时恢复到安全状态。 :::

:::note VTOL机型只能在多轴模式下解锁(默认-可以使用[CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING) 启用固定翼飞机模式下解锁)。 :::

<a id="takeoff-and-landing"></a>

## 起飞

### Multicopter Takeoff

Multicopter (and VTOL in multicopter mode) pilots can take off *manually* by enabling any manual mode, arming the vehicle and then raising the throttle stick until the motors produce enough thrust to leave the ground. In [Position mode (MC)](../flight_modes/README.md#position_mc) or [Altitude mode (MC)](../flight_modes/README.md#altitude_mc) the throttle stick has to be increased to above 62.5% to command a climb rate and make the vehicle leave the ground. 高于此值，所有控制器都被启用，无人机将输出悬停所需的油门值（[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)）。

Alternatively the takeoff can performed using the automatic [Takeoff mode (MC)](../flight_modes_mc/takeoff.md).

:::note
如果机体在解锁后过长时间没有起飞，无人机将会加锁（使用[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)调整超时时间）。 :::

:::note
The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::

### Fixed-wing Takeoff

:::note
Taking off manually (and landing) is not easy!
We recommend using with the automatic modes instead, especially for inexperienced pilots.
:::

[Stabilized mode](../flight_modes/README.md#stabilized_fw), [Acro mode](../flight_modes/README.md#acro_fw) or [Manual mode](../flight_modes/README.md#manual_fw) mode are recommended for manual takeoff. [Position mode](../flight_modes/README.md#position_fw) and [Altitude mode](../flight_modes/README.md#altitude_fw) can also be used, but it is important to accelerate the vehicle sufficiently before bringing them airborne — strong thrust if hand-launched, long runway phase for runway takeoff (this is required because the controller in these modes can prioritize airspeed over altitude tracking).

Manual takeoffs with hand-launched planes:
- Ramp up the motor and throw the vehicle horizontally.
- Do not pitch up too fast as this may stall the plane.
- A good vehicle trim is crucial for safe hand-launch takeoffs, because if the vehicle doesn't fly level there is only a very short time for the pilot to react before the vehicle crashes!

Manual takeoffs with runway-launched planes:
- Accelerate on the runway until the speed is sufficient for takeoff.
- If the plane has a steerable wheel, use the yaw stick to keep it on course.
- Once the speed is sufficient pull up the nose with the pitch stick.

Automatic takeoffs are possible in the [Mission mode](../flight_modes/mission.md#fw-mission-takeoff) or [Takeoff mode (FW)](../flight_modes_fw/takeoff.md). The pilot can take over manual control over the vehicle at any moment during the takeoff process or after it by changing into a manual flight mode.

## 降落

### Multicopter Landing

Multicopters can be landed in any manual mode. Make sure to keep the throttle stick pulled down after touching down until the motors have switched off.

请注意，默认情况下，机体在降落后会自动加锁：

- 通过[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)来设置降落后自动加锁的时间（或完全禁用它）。
- 通过将油门杆放在左下角手动加锁。

There is also the option to let the vehicle land autonomously. For that engage the [Land mode](../flight_modes_mc/land.md) or [Return mode](../flight_modes/return.md).

:::note
如果您在降落期间看到车辆“抽搐” (电机不停的在关闭打开状态快速切换) 这可能是由于 [降落检测器配置](../advanced_config/land_detector.md)不当（特别是[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)设置不当）造成的。 :::


### Fixed-wing Landing

[Stabilized mode](../flight_modes/README.md#stabilized_fw), [Acro mode](../flight_modes/README.md#acro_fw) or [Manual mode](../flight_modes/README.md#manual_fw) are recommended for landing (just as they are for takeoff). In these modes the pilot has full control over the motor thrust, which is required to perform a manual flaring maneuver when close to the ground (raising the vehicle nose without increasing throttle). You should perform the landing in headwind to reduce the groundspeed before touching down.

For auto landings you should use a [Fixed-Wing Mission Landing](../flight_modes/mission.md#fw-mission-landing). This landing is defined in a mission, and can be used in either [Mission](../flight_modes/mission.md) or [Return](../flight_modes/return.md) modes.

The automatic [Land mode](../flight_modes_fw/land.md) mode is not recommended unless absolutely necessary, as it cannot account for underlying terrain.
<!-- Added this to make it more generic: We'll split this out later -->

请注意，默认情况下，机体在降落后会自动加锁：

- 通过[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)来设置降落后自动加锁的时间（或完全禁用它）。
- 通过将油门杆放在左下角手动加锁。

## 飞行控制/命令

所有飞行，包括起飞和降落，都使用 4 个基本命令进行控制：横滚、偏航、俯仰和油门。

![遥控器基础命令](../../assets/flying/rc_basic_commands.png)

为了控制您的飞机，您需要了解基本的横滚、偏航、俯仰和油门命令如何影响三维空间中的运动。 这取决于您是控制像固定翼一样向前飞行的飞机，还是像多轴这样的“悬停飞机”。

### 悬停飞机

悬停飞行器（直升机，在VTOL悬停模式）到动作命令响应如下所示：

![多旋翼基本动作](../../assets/flying/basic_movements_multicopter.png)

- 俯仰 => 往前 / 往后。
- 横滚 => 往左 / 往右。
- 偏航 => 围绕机身中心左 / 右旋转。
- 油门 => 改变高度 / 速度。

### 前飞飞机

向前飞行的飞机（固定翼、固定翼模式的VTOL）对动作命令作出如下反应：

![固定翼基本动作](../../assets/flying/basic_movements_forward.png)

- 俯仰 => 上升 / 下降。
- 横滚 => 左倾/ 右倾和转弯。
- 偏航=> 左/右尾旋转和转弯。
- 油门 => 改变前进速度。

:::note
对于飞机的最佳转弯又称为协调转弯，需同时操作滚动和少量偏航。
这个动作需要一定的经验！
:::

## 辅助飞行

即是了解了机体是如何控制的，全手动模式的飞行也是棘手的。 新用户应该 [配置他们的遥控器](../config/flight_mode.md) 来使用飞行模式，在这种模式下自动驾驶仪自动补偿不稳定的用户输入或环境因素。

强烈建议新手使用以下三种模式：

* 姿态模式-机体很难侧翻，并且如果摇杆被释放飞行器将趋于平稳（但不保持位置）。
* 高度模式 - 爬升和下降由一个最大速率来控制。
* 位置模式 - 当摇杆被释放机体将保持飞行（位置定点，不会随风漂移）。

:::note
您也可以通过主飞行界面底部的 *QGroundControl* 按钮访问自动模式。 :::
