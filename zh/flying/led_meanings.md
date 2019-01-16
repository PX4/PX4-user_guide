# LED 含义（Pixhawk 系列）

[Pixhawk 系列飞行控制器](../flight_controller/pixhawk_series.md)使用LED表示飞行器当前状态

* [LED 界面](#ui_led)提供与飞行准备相关的面向用户的状态信息。
* [状态 LED 指示灯](#status_led)提供 PX4IO 和 FMU SoC（主控板 系统芯片）。 他们表示电源，bootLoader 模式和活动以及错误等状态。

## LED 界面 {#ui_led}

红绿蓝 *LED 界面*表示当前对飞行器*飞行准备*的状态 这通常是一个超亮的 I2C 外设，它可能安装在飞行控制板上，也可以不安装在飞行控制版上（即 FMUv4 没有一个在板上，通常使用安装在 GPS 上的 LED）。

下图显示了 LED 与飞行器状态之间的关系。

> **Warning**由于 PX4 尚未[通过飞行前检查](../flying/pre_flight_checks.md)，因此可能有 GPS 锁定（LED指示灯为绿色）并且仍然无法解锁飞行器。 **起飞需要有效的全球位置估算**

<span></span>

> **Tip**如果出现错误（红色快闪），或者飞行器无法实现 GPS 锁定（指示灯从蓝色变为绿色），在*QGroundControl*中查找更加详细的状态信息，包括校准状态和[飞行前检查（内部）](../flying/pre_flight_checks.md)报告的错误消息。 还要检查 GPS 模块是否正确连接，Pixhawk 正在正确读取 GPS，并且确定 GPS 是否正在发送正确的 GPS 位置。

![LED 含义](../../images/led_meanings.gif)

* **[蓝色常亮] 解锁，没有GPS锁定：**表示飞行器已经解锁且没有 GPS 装置的位置锁定 当飞行器已解锁，PX4 将解锁对电机的控制，允许你驾驶无人机。 一如既往，解锁时要小心，因为大型螺旋桨在高速旋转时会很危险。 在此模式下，飞行器无法执行引导任务。

* **[蓝色慢闪] 未解锁，没有 GPS 锁定：**与上面相似，但飞行器是未解锁的。 这意味这你将无法控制电机，但所有其他子系统都在工作。

* **[Solid Green] Armed, GPS Lock:** Indicates vehicle has been armed and has a valid position lock from a GPS unit. When vehicle is armed, PX4 will unlock control of the motors, allowing you to fly your drone. As always, exercise caution when arming, as large propellers can be dangerous at high revolutions. In this mode, vehicle can perform guided missions.

* **[Pulsing Green] Disarmed, GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems including GPS position lock are working.

* **[Solid Purple] Failsafe Mode:** This mode will activate whenever vehicle encounters an issue during flight, such as losing manual control, a critically low battery, or an internal error. During failsafe mode, vehicle will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your vehicle's battery is running dangerously low. After a certain point, vehicle will go into failsafe mode. However, this mode should signal caution that it's time to end this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your autopilot needs to be configured or calibrated before flying. Attach your autopilot to a Ground Control Station to verify what the problem is. If you have completed the setup process and autopilot still appears as red and flashing, there may be another error.

## 状态 LED 指示灯 {#status_led}

三个*状态LED*提供 FMU SoC 的状态，另外三个提供 PX4IO 的状态（如果存在）。 他们表示电源，bootLoader 模式和活动以及错误等状态。

![Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_status_leds.jpg)

从上电开始，FMU 和 PX4IO CPU 首先运行引导加载程序（BL），然后运行应用程序（APP）。 下表显示了 BL 和 APP 如何使用 LED 指示条件。

| Color    | 标签                | BL 用法           | APP 用法  |
| -------- | ----------------- | --------------- | ------- |
| 蓝色       | ACT（激活）           | 引导加载程序正在接受数据时抖动 | 表示ARM状态 |
| 红色 / 琥珀色 | B/E（在引导加载程序 / 错误） | 在引导加载程序中抖动      | 表示错误状态  |
| 绿色       | PWR （电源）          | 引导加载程序不使用       | 表示ARM状态 |

> **Note**上面显示的 LED 标签是常用的，但在某些电路板上可能有所不同。

下面给出了有关如何解释 LED 的更多详细信息（其中“x”表示“任何状态”）

| 红色/琥珀色 | 蓝色 | 绿色    | 含义                                                         |
| ------ | -- | ----- | ---------------------------------------------------------- |
| 10 赫兹  | x  | x     | 过载 CPU 负载 > 80%，或者内存使用率 > 98%                              |
| 关闭     | x  | x     | 过载 CPU 负载 <= 80%，或者内存使用率 <= 98%<= 80%, or RAM usage <= 98% |
| 不可用    | 关闭 | 4 赫兹  | 电机解锁并且故障保护                                                 |
| 不可用    | 打开 | 4 赫兹  | 电机解锁并且未故障保护                                                |
| 不可用    | 关闭 | 1 赫兹  | 电机未解锁并且电机准备解锁                                              |
| 不可用    | 关闭 | 10 赫兹 | 电机未解锁并且电机未准备解锁                                             |