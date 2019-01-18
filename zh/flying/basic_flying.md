# 飞行 101

该主题介绍了用[遥控器](../getting_started/rc_transmitter_receiver.md)以手动或者自动-辅助飞行模式（自主飞行请参阅：[任务](../flying/missions.md)）来控制飞行器的基本飞行。

> **Note**在你首飞之前应该阅读我们的[首飞指南](../flying/first_flight_guidelines.md)

## 飞行控制/命令

所有的飞行，包括起飞和降落，都是由 4 个基本命令进行控制：横滚，偏航，俯仰和油门。

![遥控基本命令](../../images/rc_basic_commands.png)

为了控制你的飞行器，你就需要知道基本的横滚，偏航，俯仰和油门等命令是如何在三维空间里影响飞行运动的。 这取决于你是控制的是 plane 那样的前飞飞机，还是旋翼机那样的 “悬停飞机”。

### 悬停飞机

悬停飞机（旋翼机，垂起机的悬停模式）响应移动命令，如下所示：

![多轴飞行器的基本运动](../../images/basic_movements_multicopter.png)

* 俯仰 => 往前 / 往后。
* 横滚 => 往左 / 往右。
* 偏航 => 围绕机身中心左 / 右旋转。
* 油门 => 改变高度 / 速度。

### 前飞飞机

前飞飞机（plane，垂起的前飞模式）响应移动命令，如下所示：

![向前的基本运动](../../images/basic_movements_forward.png)

* 俯仰 => 上 / 下升降舵。
* 横滚 => 左 / 右副翼。
* 偏航 => 左 / 右方向舵。
* 油门 => 改变前飞速度。

> **Note**飞机最好的转弯被称为协调转弯，需同时执行横滚和小幅度偏航。 这种策略需要经验！

## 辅助飞行

即是了解了飞行器是如何控制的，全手动模式的飞行也是不行的。 新手应该[设置遥控器](../config/flight_mode.md)为使用飞行模式，其中自驾仪会自动补偿不稳定的遥控输入或环境因素。

强烈建议新手使用以下三种模式：

* 自稳模式-飞行器很难侧翻，并且如果摇杆被释放飞行器将趋于平稳（但不是位置定点）。
* 高度模式 - 爬升和降落由最大速率控制。
* 位置模式 - 当摇杆被释放飞行器将保持飞行（位置定点，不会随风漂移）。

> **Tip**你也可以通过*QGroundControl*主飞行界面底部的按钮访问自动模式。

## 起飞和降落

最简单的起飞方式是用自动[起飞模式](../flight_modes/takeoff.md)（记住在你启用电机之前你需要对飞行器解锁）。 要自动降落，你可以用[降落](../flight_modes/land.md)或者[返航](../flight_modes/return.md)模式。

> **Tip**强烈建议采用自动起飞或降落模式，特别对于固定翼。

对于多旋翼（以及垂起的多旋翼模式），飞行员可以：

* 通过启用[位置模式](../flight_modes/README.md#assisted-modes)手动起飞，解锁飞行器，然后将油门摇杆打到 62.5% 以上。 高于此值，所有控制器都可以启用，飞行器进入悬停所需的油门量（[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)）.
* 通过打低油门杆手动降落，直到飞行器着陆并上锁（或者设置[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND)为0以在着陆时自动上锁）。

> **Note**如果你看见飞行器在降落时“抖动”（关闭电机之后，立即向上翻），这可能是由于[着陆检测器](../advanced_config/land_detector.md)配置不佳（特别是[MPC_THR_HOVER](../advanced_config/parameter_reference.md#MPC_THR_HOVER)参数设置不当）造成的。