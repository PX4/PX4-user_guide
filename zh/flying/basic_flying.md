---
canonicalUrl: https://docs.px4.io/main/zh/flying/basic_flying
---

# 飞行入门课

本主题介绍了在手动或自动驾驶辅助飞行模式下使用[遥控器](../getting_started/rc_transmitter_receiver.md)操控机体的基础知识（有关自主飞行，请参阅：[任务](../flying/missions.md)）。

:::note
在您第一次飞行之前，您应该阅读我们的[首次飞行指南](../flying/first_flight_guidelines.md)。 :::

<span id="arm"></span>
## 解锁机体

Before you can fly the vehicle it must first be [armed](../getting_started/px4_basic_concepts.md#arming-and-disarming). 这将为所有电机和驱动器供电；在多轴飞行器上，它将启动螺旋桨转动。

解锁无人机
- First disengage the [safety switch](../getting_started/px4_basic_concepts.md#safety-switch).
- 对您的机体使用解锁命令 - 将油门杆放在右下角。
  - Alternatively configure an [arm/disarm switch](../config/safety.md#arm-disarm-switch).
  - You can also arm in *QGroundControl* (PX4 does not require a radio control for flying autonomously).

:::tip
机体在[校准/配置](../config/README.md)完成且位置固定之前无法解锁。 [Vehicle Status Notifications](../getting_started/vehicle_status.md) (including on-vehicle LEDs, audio notifications and *QGroundControl* updates) can tell you when the vehicle is ready to fly (and help you work out the cause when it is not ready to fly). :::

:::note
如果您解锁后过长时间没有起飞，机体将（ [默认情况下](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)）自动[加锁](../advanced_config/prearm_arm_disarm.md#auto-disarming)（关闭电机）！ 这是一种安全措施，可确保机体在没有被使用时恢复到安全状态。 :::

:::note VTOL机型只能在多轴模式下解锁(默认-可以使用[CBRK_VTOLARMING](../advanced_config/parameter_reference.md#CBRK_VTOLARMING) 启用固定翼飞机模式下解锁)。 :::

<span id="takeoff-and-landing"></span>
## 起飞

最简单的起飞方式（在[机体解锁](#arm)后）是使用自动 [起飞模式](../flight_modes/takeoff.md)。 通常可以通过 [遥控器拨杆开关](../config/flight_mode.md) 或地面站触发的。

Multicopter (and VTOL in multicopter mode) pilots can take off *manually* by enabling [position mode](../flight_modes/README.md#position_mc), arming the vehicle, and then raising the throttle stick above 62.5%. 高于此值，所有控制器都被启用，无人机将输出悬停所需的油门值（[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)）。

:::tip
强烈推荐自动起飞模式，尤其是固定翼机体！
:::

:::note
如果机体在解锁后过长时间没有起飞，无人机将会加锁（使用[COM_DISARM_PRFLT](../advanced_config/parameter_reference.md#COM_DISARM_PRFLT)调整超时时间）。 :::

:::note
The [Failure Detector](../config/safety.md#failure-detector) will automatically stop the engines if there is a problem on takeoff. :::


## 降落

最简单的降落方法是使用自动 [降落](../flight_modes/land.md)或者[返航](../flight_modes/return.md)模式。

对于多轴飞行器（和多轴模式下的 VTOL），飞手可以通过向下推油门杆手动降落，直到机体降落加锁。

请注意，默认情况下，机体在降落后会自动加锁：
- 通过[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)来设置降落后自动加锁的时间（或完全禁用它）。
- 通过将油门杆放在左下角手动加锁。

:::note
如果您在降落期间看到车辆“抽搐” (电机不停的在关闭打开状态快速切换) 这可能是由于 [降落检测器配置](../advanced_config/land_detector.md)不当（特别是[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)设置不当）造成的。 :::

:::tip
强烈建议自动降落，尤其是固定翼机体。
:::


## 飞行控制/命令

所有飞行，包括起飞和降落，都使用 4 个基本命令进行控制：横滚、偏航、俯仰和油门。

![遥控器基础命令](../../assets/flying/rc_basic_commands.png)

为了控制您的飞机，您需要了解基本的横滚、偏航、俯仰和油门命令如何影响三维空间中的运动。 这取决于您是控制像固定翼一样向前飞行的飞机，还是像多轴这样的“悬停飞机”。

### 悬停飞机

悬停飞行器（直升机，在VTOL悬停模式）到动作命令响应如下所示：

![多旋翼基本动作](../../assets/flying/basic_movements_multicopter.png)

- Pitch => Forward/back.
- Roll => Left/right.
- Yaw => Left/right rotation around the centre of the frame.
- Throttle => Changed altitude/speed.

### 前飞飞机

向前飞行的飞机（固定翼、固定翼模式的VTOL）对动作命令作出如下反应：

![固定翼基本动作](../../assets/flying/basic_movements_forward.png)

- Pitch => Up/down.
- Roll => Left/right and a turn.
- Yaw => Left/right tail rotation and turn.
- Throttle => Changed forward speed.

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
You can also access automatic modes through the buttons on the bottom of the *QGroundControl* main flight screen. :::
