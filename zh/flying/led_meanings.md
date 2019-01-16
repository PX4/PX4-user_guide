# LED Meanings (Pixhawk Series)

[Pixhawk-series flight controllers](../flight_controller/pixhawk_series.md) use LEDs to indicate the current status of the vehicle.

* The [UI LED](#ui_led) provides user-facing status information related to *readiness for flight*.
* The [Status LEDs](#status_led) provide status for the PX4IO and FMU SoC. They indicate power, bootloader mode and activity, and errors.

## UI LED {#ui_led}

The RGB *UI LED* indicates the current *readiness for flight* status of the vehicle. This is typically a superbright I2C peripheral, which may or may not be mounted on the flight controller board (i.e. FMUv4 does not have one on board, and typically uses an LED mounted on the GPS).

The image below shows the relationship between LED and vehicle status.

> **Warning** It is possible to have a GPS lock (Green LED) and still not be able to arm the vehicle because PX4 has not yet [passed preflight checks](../flying/pre_flight_checks.md). **A valid global position estimate is required to takeoff!**

<span></span>

> **Tip** In the event of an error (blinking red), or if the vehicle can't achieve GPS lock (change from blue to green), check for more detailed status information in *QGroundControl* including calibration status, and errors messages reported by the [Preflight Checks (Internal)](../flying/pre_flight_checks.md). Also check that the GPS module is properly attached, Pixhawk is reading your GPS properly, and that the GPS is sending a proper GPS position.

![LED 含义](../../images/led_meanings.gif)

* **[Solid Blue] Armed, No GPS Lock:** Indicates vehicle has been armed and has no position lock from a GPS unit. When vehicle is armed, PX4 will unlock control of the motors, allowing you to fly your drone. As always, exercise caution when arming, as large propellers can be dangerous at high revolutions. Vehicle cannot perform guided missions in this mode.

* **[Pulsing Blue] Disarmed, No GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems are working.

* **[Solid Green] Armed, GPS Lock:** Indicates vehicle has been armed and has a valid position lock from a GPS unit. When vehicle is armed, PX4 will unlock control of the motors, allowing you to fly your drone. As always, exercise caution when arming, as large propellers can be dangerous at high revolutions. In this mode, vehicle can perform guided missions.

* **[Pulsing Green] Disarmed, GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems including GPS position lock are working.

* **[Solid Purple] Failsafe Mode:** This mode will activate whenever vehicle encounters an issue during flight, such as losing manual control, a critically low battery, or an internal error. During failsafe mode, vehicle will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your vehicle's battery is running dangerously low. After a certain point, vehicle will go into failsafe mode. However, this mode should signal caution that it's time to end this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your autopilot needs to be configured or calibrated before flying. Attach your autopilot to a Ground Control Station to verify what the problem is. If you have completed the setup process and autopilot still appears as red and flashing, there may be another error.

## 状态 LED {#status_led}

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