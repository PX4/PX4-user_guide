# LED灯含义（Pixhawk系列）

[Pixhawk系列飞行控制器](../flight_controller/pixhawk_series.md) 使用LED来显示当前飞行器的状态。

* [UI LED](#ui_led) 提供了与 *起飞准备*相关的面向用户的状态信息。
* [LEDs状态](#status_led) 提供PX4IO 和 FMU SoC的状态。 它们表示电量、驱动模式和活动以及错误。

## UI LED {#ui_led}

RGB *UI LED*显示当前 飞行器*起飞准备* 的状态。 这通常是一个超亮的I2C外设，可能安装在飞控板上（例如，FMUv4飞控板上没有，通常使用安装在GPS上的LED）。

下图显示LED和飞行器状态的关系。

> **警告** 可能有GPS锁 (LED指示灯为绿色) 并且无法解锁飞机，因为PX4还没有 [通过起飞前检测](../flying/pre_flight_checks.md)。 **起飞需要有效的全球位置估计!**

<span></span>

> **建议** 在遇到错误 (红色LED闪烁), 或者飞行器无法解除GPS锁 (LED从蓝色变为绿色) 时， 查看*QGroundControl*中详细的状态信息包括校准状态，在 [飞行前检查(内部)](../flying/pre_flight_checks.md)时会报告错误信息。 还要检查GPS模块是否正确连接，Pixhawk是否正确读取GPS信息，GPS是否发送正确的GPS位置。

![LED meanings](../../images/led_meanings.gif)

* **[蓝色LED常亮] 解锁， GPS未锁定：** 表上飞行器已经解锁并且GPS模块没有位置锁。 当飞行器已经解锁，PX4会解锁对电机的控制，允许你操纵无人机飞行。 像往常一样，在解锁时要小心，因为大型螺旋桨在高速旋转时可能很危险。 飞行器在这种模式下无法执行引导任务。

* **[蓝色LED闪烁] 未解锁, 没有GPS锁：** 与之前类似，但是你的飞行器没有解锁。 这意味着你将不能控制电机，但是其他子系统正在工作。

* **[Solid Green] Armed, GPS Lock:** Indicates vehicle has been armed and has a valid position lock from a GPS unit. When vehicle is armed, PX4 will unlock control of the motors, allowing you to fly your drone. As always, exercise caution when arming, as large propellers can be dangerous at high revolutions. In this mode, vehicle can perform guided missions.

* **[Pulsing Green] Disarmed, GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems including GPS position lock are working.

* **[Solid Purple] Failsafe Mode:** This mode will activate whenever vehicle encounters an issue during flight, such as losing manual control, a critically low battery, or an internal error. During failsafe mode, vehicle will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your vehicle's battery is running dangerously low. After a certain point, vehicle will go into failsafe mode. However, this mode should signal caution that it's time to end this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your autopilot needs to be configured or calibrated before flying. Attach your autopilot to a Ground Control Station to verify what the problem is. If you have completed the setup process and autopilot still appears as red and flashing, there may be another error.

## Status LED {#status_led}

Three *Status LEDs* provide status for the FMU SoC, and three more provide status for the PX4IO (if present). They indicate power, bootloader mode and activity, and errors.

![Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_status_leds.jpg)

From power on, the FMU and PX4IO CPUs first run the bootloader (BL) and then the application (APP). The table below shows how the Bootloader and then APP use the LEDs to indicate condition.

| Color     | Label                       | Bootloader usage                               | APP usage               |
| --------- | --------------------------- | ---------------------------------------------- | ----------------------- |
| Blue      | ACT (Activity)              | Flutters when the bootloader is receiving data | Indication of ARM state |
| Red/Amber | B/E (In Bootloader / Error) | Flutters when in the bootloader                | Indication of an ERROR  |
| Green     | PWR (Power)                 | Not used by bootloader                         | Indication of ARM state |

> **Note** The LED labels shown above are commonly used, but might differ on some boards.

More detailed information for how to interpret the LEDs is given below (where "x" means "any state")

| Red/Amber | Blue | Green | Meaning                                                     |
| --------- | ---- | ----- | ----------------------------------------------------------- |
| 10Hz      | x    | x     | Overload CPU load > 80%, or RAM usage > 98%                 |
| OFF       | x    | x     | Overload CPU load <= 80%, or RAM usage <= 98%               |
| NA        | OFF  | 4 Hz  | actuator_armed->armed && failsafe                           |
| NA        | ON   | 4 Hz  | actuator_armed->armed && !failsafe                          |
| NA        | OFF  | 1 Hz  | !actuator_armed-> armed && actuator_armed->ready_to_arm |
| NA        | OFF  | 10 Hz | !actuator_armed->armed && !actuator_armed->ready_to_arm |