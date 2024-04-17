# Налаштування режиму польоту

Ця тема пояснює, як зробити карту [режимів польоту](../getting_started/px4_basic_concepts.md#flight-modes) та інших функцій на вашому радіопульті передачі.

:::tip
In order to set up flight modes you must already have:
- [Configured your radio](../config/radio.md)
- [Setup your transmitter](#rc-transmitter-setup) to encode the physical positions of your mode switch(es) into a single channel. We provide examples for the popular *Taranis* transmitter [below](#taranis-setup-3-way-switch-configuration-for-single-channel-mode) (check your documentation if you use a different transmitter). :::


## What Flight Modes and Switches Should I Set?

Flight Modes provide different types of *autopilot-assisted flight*, and *fully autonomous flight*. You can set any (or none) of the flight modes [available to your vehicle](../flight_modes/index.md#flight-modes).

Most users should set the following modes and functions, as these make the vehicle easier and safer to fly:

- **Position mode** — Easiest and safest mode for manual flight.
- **Return mode** — Return to launch position by safe path and land.
- (VTOL only) **VTOL Transition Switch** — Toggle between fixed-wing and multicopter flight configuration on VTOL vehicles.

It is also common to map switches to:

- **Mission mode** — This mode runs a pre-programmed mission sent by the ground control station.
- <a id="kill_switch"></a> [Kill Switch](../config/safety.md#kill-switch) - Immediately stops all motor outputs (the vehicle will crash, which may in some circumstances be more desirable than allowing it to continue flying).

## Вибір режиму польоту

PX4 дозволяє вам вказати канал "режиму" та вибрати до 6 режимів польоту, які будуть активовані на основі значення ШШІ каналу. Ви також можете окремо вказати канали для відображення режиму аварійного вимкнення, режиму повернення до старту та режиму польоту за межами.

Для налаштування вибору режиму польоту з одним каналом:

1. Запустіть *QGroundControl* та підключіть транспортний засіб.
1. Увімкніть ваш передавач RC.
1. Виберіть **іконку "Q" >   Налаштування транспортного засобу >   Режими польоту** (бічна панель), щоб відкрити _Налаштування режимів польоту_.

   ![Flight modes single-channel](../../assets/qgc/setup/flight_modes/flight_modes_single_channel.jpg)

1. Вкажіть Налаштування *Режиму польоту*:
   * Виберіть канал режиму (**Режим каналу**) (вище показано як Канал 5, але це залежить від конфігурації вашого передавача).
   * Перемістіть перемикач передавача (або перемикачі), які ви налаштували для вибору режиму, через доступні позиції. Режим слоту, який відповідає поточному положенню перемикача, буде підсвічений (вище цього - *Режим польоту 1*). :::info
Поки ви можете встановити режими польоту в будь-якому з 6 слотів, тільки канали, які відображені на позиціях перемикачів, будуть підсвічені/використовуватися.
:::
   * Виберіть режим польоту, який ви хочете активувати для кожного положення перемикача.
1. Вкажіть *налаштування перемикача*:
   * Виберіть канали, які ви хочете відобразити на конкретні дії - наприклад: *Режим повернення*, *Вимикач вимкнення*, *Оффбордний* режим і т.д. (якщо у вас є запасні перемикачі та канали на вашому передавачі).

1. Перевірте, що режими відображаються на правильні перемикачі передавача:
   * Перевірте *Монітор каналу*, щоб підтвердити, що очікуваний канал змінюється кожним перемикачем.
   * Select each mode switch on your transmitter in turn, and check that the desired flight mode is activated (the text turns yellow on *QGroundControl* for the active mode).

All values are automatically saved as they are changed.

## RC Transmitter Setup

This section contains a small number of possible setup configurations for taranis. QGroundControl _may_ have [setup information for other transmitters here](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/flight_modes.html#transmitter-setup).


<a id="taranis_setup"></a>

### Taranis Setup: 3-way Switch Configuration for Single-Channel Mode

If you only need to support selecting between two or three modes then you can map the modes to the positions of a single 3-way switch. Below we show how to map the Taranis 3-way "SD" switch to channel 5.

::: info This example shows how to set up the popular *FrSky Taranis* transmitter. Transmitter setup will be different on other transmitters. :::

Open the Taranis UI **MIXER** page and scroll down to **CH5**, as shown below:

![Taranis - Map channel to switch](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_1.png)

Press **ENT(ER)** to edit the **CH5** configuration then change the **Source** to be the *SD* button.

![Taranis - Configure channel](../../assets/qgc/setup/flight_modes/single_channel_mode_selection_2.png)

That's it! Channel 5 will now output 3 different PWM values for the three different **SD** switch positions.

The *QGroundControl* configuration is then as described in the previous section.


### Taranis Setup: Multi-Switch Configuration for Single-Channel Mode

Більшість передавачів не мають перемикачів на 6 позицій, тому якщо вам потрібно мати можливість підтримувати більше режимів, ніж кількість доступних позицій перемикачів (до 6), то вам доведеться представляти їх за допомогою кількох перемикачів. Зазвичай це робиться шляхом кодування позицій перемикача 2- та 3-позицій в один канал, так що кожна позиція перемикача призводить до різного значення ШІМ.

На FrSky Taranis цей процес включає в себе призначення "логічного перемикача" для кожної комбінації положень двох реальних перемикачів. Кожний логічний перемикач потім призначається для різних значень ШІМ на тому ж каналі.

Відео нижче показує, як це робиться з передавачем *FrSky Taranis*.<!-- \[youtube\](https://youtu.be/scqO7vbH2jo) Video has gone private and is no longer available --><!-- @\[youtube\](https://youtu.be/BNzeVGD8IZI?t=427) - video showing how to set the QGC side - at about 7mins and 3 secs -->@[youtube](https://youtu.be/TFEjEQZqdVA)

Конфігурація *QGroundControl* потім виконується [як описано вище](#flight-mode-selection).


## Детальна інформація

* [Flight Modes Overview](../flight_modes/index.md)
* [QGroundControl > Flight Modes](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/flight_modes.html#px4-pro-flight-mode-setup)
* [PX4 Setup Video - @6m53s](https://youtu.be/91VGmdSlbo4?t=6m53s) (Youtube)
* [Radio switch parameters](../advanced_config/parameter_reference.md#radio-switches) - Can be used to set mappings via parameters
