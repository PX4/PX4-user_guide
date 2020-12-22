# LED 含义（Pixhawk系列）

[Pixhawk系列飞行控制器](../flight_controller/pixhawk_series.md) 使用LED来显示当前飞行器的状态。

* [UI LED](#ui_led) 提供了与 *起飞准备*相关的面向用户的状态信息。
* [LEDs状态](#status_led) 提供PX4IO 和 FMU SoC的状态。 它们表示电量、驱动模式和活动以及错误。

<span id="ui_led"></span>

## LED 界面

RGB *UI LED*显示当前 飞行器*起飞准备* 的状态。 这通常是一个超亮的I2C外设，可能安装在飞控板上（例如，FMUv4飞控板上没有，通常使用安装在GPS上的LED）。

下图显示LED和飞行器状态的关系。

:::warning
It is possible to have a GPS lock (Green LED) and still not be able to arm the vehicle because PX4 has not yet [passed preflight checks](../flying/pre_flight_checks.md). **A valid global position estimate is required to takeoff!**
:::

:::tip
In the event of an error (blinking red), or if the vehicle can't achieve GPS lock (change from blue to green), check for more detailed status information in *QGroundControl* including calibration status, and errors messages reported by the [Preflight Checks (Internal)](../flying/pre_flight_checks.md). Also check that the GPS module is properly attached, Pixhawk is reading your GPS properly, and that the GPS is sending a proper GPS position.
:::

![LED meanings](../../assets/flight_controller/pixhawk_led_meanings.gif)

* **[蓝色LED常亮] 解锁， GPS未锁定：** 表上飞行器已经解锁并且GPS模块没有位置锁。 当飞行器已经解锁，PX4会解锁对电机的控制，允许你操纵无人机飞行。 像往常一样，在解锁时要小心，因为大型螺旋桨在高速旋转时可能很危险。 飞行器在这种模式下无法执行引导任务。

* **[蓝色LED闪烁] 未解锁, 没有GPS锁：** 与之前类似，但是你的飞行器没有解锁。 这意味着你将不能控制电机，但是其他子系统正在工作。

* **[绿色LED常亮] 解锁，GPS锁定：** 表示飞行器已经解锁，但是GPS模块有位置锁。 当飞行器解锁，PX4将会解锁对电机的控制，允许你操纵无人机飞行。 像往常一样，在解锁时要小心，因为大型螺旋桨在高速旋转时可能很危险。 在这种模式下，飞行器可以执行引导任务。

* **[绿色LED闪烁] 未解锁，GPS锁定：** 与之前类似，但是你的飞行器没有解锁。 这意味着你讲无法控制电机，但是其他子系统包括GPS位置锁正在工作。

* **[紫色LED闪烁] 故障保护模式：** 当你的飞行器在飞行时遇到问题，此模式将激活，比如飞行器失去手动控制、电量过低或内部错误。 在故障保护模式时，飞行器将试图返回起飞位置，或者降落在当前位置。

* **[黄褐色LED常亮] 低电量警告：** 表示飞行器电量极低。 在某一点之后，飞行器将进入故障保护模式。 但是，此模式警告此次飞行应该结束。

* **[红色LED闪烁] 错误/设置需要：** 表示飞行器在飞行前需要配置或校准。 将飞行器连接到地面站以找出问题所在。 如果您已经完成设置过程，飞行器仍然闪烁红色，这表明还有其他错误。

<span id="status_led"></span>

## LED 状态

Three *Status LEDs* provide status for the FMU SoC, and three more provide status for the PX4IO (if present). They indicate power, bootloader mode and activity, and errors.

![Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_status_leds.jpg)

From power on, the FMU and PX4IO CPUs first run the bootloader (BL) and then the application (APP). The table below shows how the Bootloader and then APP use the LEDs to indicate condition.

| 颜色     | 标签              | 引导加载程序使用        | APP使用   |
| ------ | --------------- | --------------- | ------- |
| 蓝色     | ACT(激活)         | 引导加载程序接收数据的时候闪烁 | 表示ARM状态 |
| 红色/琥珀色 | B/E(在引导加载程序/错误) | 在引导加载程序时闪烁      | 表示错误状态  |
| 绿色     | PWR(电源)         | 引导加载程序不使用       | 表示ARM状态 |

:::note
The LED labels shown above are commonly used, but might differ on some boards.
:::

More detailed information for how to interpret the LEDs is given below (where "x" means "any state")

| 红色/琥珀色 | 蓝色 | 绿色    | 含义                                    |
| ------ | -- | ----- | ------------------------------------- |
| 10Hz   | x  | x     | 过载 CPU 负载 > 80%，或者内存使用率 > 98%         |
| 关闭     | x  | x     | 过载 CPU 负载 <= 80%, or RAM usage <= 98% |
| 不可用    | 关闭 | 4 赫兹  | 电机解锁并且故障保护                            |
| 不可用    | 打开 | 4 赫兹  | 电机解锁并且未故障保护                           |
| 不可用    | 关闭 | 1 赫兹  | 电机未解锁并且电机准备解锁                         |
| 不可用    | 关闭 | 10 赫兹 | 电机未解锁并且电机未准备解锁                        |