# Значення світлодіодів LED (серія Pixhawk)

[ Контролери польоту серії Pixhawk](../flight_controller/pixhawk_series.md) використовують світлодіоди для індикації поточного стану літального апарату.
- [Світлодіод інтерфейсу користувача (UI LED)](#ui_led) надає користувачеві інформацію про стан, пов'язаний з *готовністю до польоту*.
- Світлодіоди [Статус](#status_led) показують стан PX4IO і FMU SoC. Вони показують заряд, режим і стан бутлоадера, а також помилки.

<a id="ui_led"></a>

## Індикатори інтерфейсу (UI LED)

RGB *індикатори інтерфейсу* вказують на поточний стан *готовності до польоту* апарату. Зазвичай це дуже яскравий периферійний пристрій I2C, який може бути встановлений або не встановлений на платі польотного контролера (наприклад,  FMUv4 не має такого на борту, і зазвичай використовує світлодіод, встановлений на GPS).

На зображенні нижче показано взаємозв'язок між світлодіодом і станом апарату.

:::warning
Ви можете мати блокування GPS (зелений світлодіод), але не мати можливості привести апарат в бойову готовність, оскільки PX4 ще не [ пройшов передпольотну перевірку](../flying/pre_flight_checks.md). ** Для зльоту потрібна коректна оцінка глобального положення!**
:::

:::tip
У разі виникнення помилки (блимає червоним кольором), або якщо апарат не може досягти блокування GPS (зміна кольору з синього на зелений), перевірте більш детальну інформацію про стан у *QGroundControl*, включно зі станом калібрування та повідомленнями про помилки, які з'являються у [Передпольотна перевірка (внутрішня)](../flying/pre_flight_checks.md). Також перевірте, чи правильно підключений GPS-модуль, чи правильно Pixhawk зчитує ваш GPS, і чи правильно GPS передає дані про місцеперебування.
:::

![LED meanings](../../assets/flight_controller/pixhawk_led_meanings.gif)


* **[Безперервний синій] Стан бойової готовності, без блокування GPS:** Вказує на те, що автомобіль перебуває в стані бойової готовності й не має блокування положення від GPS-пристрою. Коли апарат в стані готовності, PX4 розблокує керування двигунами, що дозволить вам керувати дроном. Як завжди, будьте обережні під час увімкнення, оскільки великі гвинти можуть бути небезпечними на високих обертах. У цьому режимі апарат не може виконувати керовані місії.

* **[Pulsing Blue] Disarmed, No GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems are working.

* **[Solid Green] Armed, GPS Lock:** Indicates vehicle has been armed and has a valid position lock from a GPS unit. When vehicle is armed, PX4 will unlock control of the motors, allowing you to fly your drone. As always, exercise caution when arming, as large propellers can be dangerous at high revolutions. In this mode, vehicle can perform guided missions.

* **[Pulsing Green] Disarmed, GPS Lock:** Similar to above, but your vehicle is disarmed. This means you will not be able to control motors, but all other subsystems including GPS position lock are working.

* **[Solid Purple] Failsafe Mode:** This mode will activate whenever vehicle encounters an issue during flight, such as losing manual control, a critically low battery, or an internal error. During failsafe mode, vehicle will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your vehicle's battery is running dangerously low. After a certain point, vehicle will go into failsafe mode. However, this mode should signal caution that it's time to end this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your autopilot needs to be configured or calibrated before flying. Attach your autopilot to a Ground Control Station to verify what the problem is. If you have completed the setup process and autopilot still appears as red and flashing, there may be another error.


<a id="status_led"></a>

## Status LED

Three *Status LEDs* provide status for the FMU SoC, and three more provide status for the PX4IO (if present). They indicate power, bootloader mode and activity, and errors.

![Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_status_leds.jpg)

From power on, the FMU and PX4IO CPUs first run the bootloader (BL) and then the application (APP). The table below shows how the Bootloader and then APP use the LEDs to indicate condition.

| Color     | Label                       | Bootloader usage                               | APP usage               |
| --------- | --------------------------- | ---------------------------------------------- | ----------------------- |
| Blue      | ACT (Activity)              | Flutters when the bootloader is receiving data | Indication of ARM state |
| Red/Amber | B/E (In Bootloader / Error) | Flutters when in the bootloader                | Indication of an ERROR  |
| Green     | PWR (Power)                 | Not used by bootloader                         | Indication of ARM state |

:::note
The LED labels shown above are commonly used, but might differ on some boards.
:::

More detailed information for how to interpret the LEDs is given below (where "x" means "any state")

| Red/Amber | Blue | Green | Meaning                                                      |
| --------- | ---- | ----- | ------------------------------------------------------------ |
| 10Hz      | x    | x     | Overload CPU load > 80%, or RAM usage > 98%                  |
| OFF       | x    | x     | Overload CPU load <= 80%, or RAM usage <= 98%                |
| NA        | OFF  | 4 Hz  | actuator_armed->armed && failsafe                            |
| NA        | ON   | 4 Hz  | actuator_armed->armed && !failsafe                           |
| NA        | OFF  | 1 Hz  | !actuator_armed-> armed && actuator_armed->ready_to_arm  |
| NA        | OFF  | 10 Hz | !actuator_armed->armed  && !actuator_armed->ready_to_arm | 
