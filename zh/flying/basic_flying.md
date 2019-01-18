# 飞行 101

该主题介绍了用[遥控器](../getting_started/rc_transmitter_receiver.md)以手动或者自动-辅助飞行模式（自主飞行请参阅：[任务](../flying/missions.md)）来控制飞行器的基本飞行。

> **Note**在你首飞之前应该阅读我们的[首飞指南](../flying/first_flight_guidelines.md)

## 飞行控制/命令

所有的飞行，包括起飞和降落，都是由 4 个基本命令进行控制：横滚，偏航，俯仰和油门。

![遥控基本命令](../../images/rc_basic_commands.png)

为了控制你的飞行器，你就需要知道基本的横滚，偏航，俯仰和油门等命令是如何在三维空间里影响飞行运动的。 这取决于你是控制的是 plane 那样的前飞飞机，还是旋翼机那样的 “悬停飞机”。

### 悬停飞机

悬停飞机（旋翼机，垂起机的悬停模式）响应移动命令，如下所示：

![Basic Movements Multicopter](../../images/basic_movements_multicopter.png)

* 俯仰 => 往前 / 往后。
* 横滚 => 往左 / 往右。
* 偏航 => 围绕机身中心左 / 右旋转。
* 油门 => 改变高度 / 速度。

### 前飞飞机

前飞飞机（plane，垂起的前飞模式）响应移动命令，如下所示：

![Basic Movements Forward](../../images/basic_movements_forward.png)

* 俯仰 => 上 / 下升降舵。
* 横滚 => 左 / 右副翼。
* 偏航 => 左 / 右方向舵。
* 油门 => 改变前飞速度。

> **Note**飞机最好的转弯被称为协调转弯，需同时执行横滚和小幅度偏航。 这种策略需要经验！

## 辅助飞行

即是了解了飞行器是如何控制的，全手动模式的飞行也是不行的。 新手应该[设置遥控器](../config/flight_mode.md)为使用飞行模式，其中自驾仪会自动补偿不稳定的遥控输入或环境因素。

强烈建议新手使用以下三种模式：

* Stabilized - Vehicle hard to flip, and will level-out if the sticks are released (but not hold position)
* Altitude - Climb and drop are controlled to have a maximum rate.
* Position - When sticks are released the vehicle will stop (and hold position against wind drift)

> **Tip** You can also access automatic modes through the buttons on the bottom of the *QGroundControl* main flight screen.

## 起飞和降落

The easiest way to takeoff is to use the automatic [Takeoff mode](../flight_modes/takeoff.md) (remembering that you need to arm the vehicle before you can engage the vehicle motors). To land again automatically you can use [Land](../flight_modes/land.md) or [Return](../flight_modes/return.md) modes.

> **Tip** The automatic takeoff/landing modes are highly recommended, in particular for Fixed Wing vehicles.

For multicopter (and VTOL in multicopter mode) pilots can:

* Take off manually by enabling [position mode](../flight_modes/README.md#assisted-modes), arming the vehicle, and then raising the throttle stick above 62.5%. Above this value all controllers are enabled and the vehicle goes to the throttle level required for hovering ([MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).
* Land manually by pressing the throttle stick down until the vehicle lands and disarms (or set [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) > 0 to disarm automatically on landing).

> **Note** If you see the vehicle "twitch" during landing (turn down the motors, and then immediately turn them back up) this is probably caused by a poor [Land Detector Configuration](../advanced_config/land_detector.md) (specifically, a poorly set [MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)).