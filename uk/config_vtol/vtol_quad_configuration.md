# Загальна стандартна конфігурація VTOL (QuadPlane) & Тюнінг

This is the configuration documentation for a [Generic Standard VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_standard_vtol), also known as a "QuadPlane VTOL". Це в основному літальний апарат з фіксованими крилами з додаванням квадрокоптерних двигунів.

Для документації та інструкцій щодо конструкції планера див. розділ [VTOL Framebuilds](../frames_vtol/index.md).

## Прошивка & Основні налаштування

1. Запустіть _QGroundControl_
2. Перезавантажте мікропрограму для вашого поточного випуску або master (запуск `основної` гілки PX4).
3. У розділі [Налаштування каркаса](../config/airframe.md) виберіть відповідний планер VTOL.

   Якщо вашого планера немає в списку, виберіть раму [Загальний стандартний VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_standard_vtol).

### Перемикач режимів польоту / переходу

You should assign a switch on your RC controller for switching between the multicopter- and fixed-wing modes.

::: info
While PX4 allows flight without an RC controller, you must have one when tuning/configuring up a new airframe.
:::

This is done in [Flight Mode](../config/flight_mode.md) configuration, where you [assign flight modes and other functions](../config/flight_mode.md#what-flight-modes-and-switches-should-i-set) to switches on your RC controller. The switch can also be assigned using the parameter [RC_MAP_TRANS_SW](../advanced_config/parameter_reference.md#RC_MAP_TRANS_SW).

The switch in the off-position means that you are flying in multicopter mode.

### Multirotor / Fixed-wing Tuning

Before you attempt your first transition to fixed-wing flight you need to make absolutely sure that your VTOL is well tuned in multirotor mode. One reason is this is the mode you will return to if something goes wrong with a transition and it could be it will be moving fairly quickly already. If it isn’t well tuned bad things might happen.

If you have a runway available and the total weight isn’t too high you will also want to tune fixed-wing flight as well. If not then you will be attempting this when it switches to fixed-wing mode. If something goes wrong you need to be ready (and able) to switch back to multirotor mode.

Follow the respective tuning guides on how to tune multirotors and fixed-wings.

### Transition Tuning

While it might seem that you are dealing with a vehicle that can fly in two modes (multirotor for vertical takeoffs and landings and fixed-wing for forwards flight) there is an additional state you also need to tune: transition.

Getting your transition tuning right is important for obtaining a safe entry into fixed-wing mode, for example, if your airspeed is too slow when it transitions it might stall.

#### Transition Throttle

Параметр: [VT_F_TRANS_THR](../advanced_config/parameter_reference.md#VT_F_TRANS_THR)

Front transition throttle defines the target throttle for the pusher/puller motor during the front transition.

This must be set high enough to ensure that the transition airspeed is reached. If your vehicle is equipped with an airspeed sensor then you can increase this parameter to make the front transition complete faster. For your first transition you are better off setting the value higher than lower.

#### Forward Transition Pusher/Puller Slew Rate

Параметр: [VT_PSHER_SLEW](../advanced_config/parameter_reference.md#VT_PSHER_SLEW)

A forward transition refers to the transition from multirotor to fixed-wing mode. The forward transition pusher/puller slew rate is the amount of time in seconds that should be spent ramping up the throttle to the target value (defined by `VT_F_TRANS_THR`).

A value of 0 will result in commanding the transition throttle value being set immediately. By default the slew rate is set to 0.33, meaning that it will take 3s to ramp up to 100% throttle. If you wish to make throttling-up smoother you can reduce this value.

Note that once the ramp up period ends throttle will be at its target setting and will remain there until (hopefully) the transition speed is reached.

#### Blending Airspeed

Параметр: [VT_ARSP_BLEND](../advanced_config/parameter_reference.md#VT_ARSP_BLEND)

By default, as the airspeed gets close to the transition speed, multirotor attitude control will be reduced and fixed-wing control will start increasing continuously until the transition occurs.

Disable blending by setting this parameter to 0 which will keep full multirotor control and zero fixed-wing control until the transition occurs.

#### Transition Airspeed

Параметр: [VT_ARSP_TRANS](../advanced_config/parameter_reference.md#VT_ARSP_TRANS)

This is the airspeed which, when reached, will trigger the transition out of multirotor mode into fixed-wing mode. It is critical that you have properly calibrated your airspeed sensor. It is also important that you pick an airspeed that is comfortably above your airframes stall speed (check `FW_AIRSPD_MIN`) as this is currently not checked.

### Transitioning Tips

As already mentioned make sure you have a well tuned multirotor mode. If during a transition something goes wrong you will switch back to this mode and it should be quite smooth.

Before you fly have a plan for what you will do in each of the three phases (multirotor, transition, fixed-wing) when you are in any of them and something goes wrong.

Battery levels: leave enough margin for a multirotor transition for landing at the end of your flight. Don’t run your batteries too low as you will need more power in multirotor mode to land. Be conservative.

#### Transition: Getting Ready

Make sure you are at least 20 meters above ground and have enough room to complete a transition. It could be that your VTOL will lose height when it switches to fixed-wing mode, especially if the airspeed isn’t high enough.

Transition into the wind, whenever possible otherwise it will travel further from you before it transitions.

Make sure the VTOL is in a stable hover before you start the transition.

#### Transition: Multirotor to Fixed-wing (Front-transition)

Start your transition. It should transition within 50 – 100 meters. If it doesn’t or it isn’t flying in a stable fashion abort the transition (see below) and land or hover back to the start position and land. Try increasing the [transition throttle](#transition-throttle) (`VT_F_TRANS_THR`) value. Also consider reducing the transition duration (`VT_F_TRANS_DUR`) if you are not using an airspeed sensor. If you are using an airspeed sensor consider lowering the transition airspeed but stay well above the stall speed.

As soon as you notice the transition happen be ready to handle height loss which may include throttling up quickly.

:::warning
The following feature has been discussed but not implemented yet:

- Once the transition happens the multirotor motors will stop and the pusher/puller throttle will remain at the `VT_F_TRANS_THR` level until you move the throttle stick, assuming you are in manual mode.
:::

#### Перехід: Фіксовані крила на багатороторний вертоліт (Зворотний перехід)

Під час переходу назад до режиму багатороторного вертольота приведіть свій літак на прямий рівний захід та зменште його швидкість, перекиньте перемикач переходу і двигуни багатороторного вертольота почнуть роботу, а тяговий пропелер відразу зупиниться, що повинно призвести до досить плавного перехідного глайдування.

Пам'ятайте, що значення газу, яке ви маєте при переході, вказуватиме кількість тяги вашого багатороторного вертольота у момент перемикання. Оскільки крило все ще буде у повітрі, ви відчуєте, що у вас є достатньо часу, щоб відрегулювати газ для досягнення/утримання стійкого витримання. Для розширеного налаштування зворотного переходу дивіться Посібник з налаштування зворотного переходу.

Для розширеного налаштування зворотного переходу дивіться [Посібник з налаштування зворотного переходу](vtol_back_transition_tuning.md)

#### Скасування переходу

Важливо знати, що очікувати, коли ви відміняєте команду _переходу_ під час переходу.

Під час переходу від **мультиротора до фіксованого крила** (перемикач переходу ввімкнено/фіксоване крило), а потім повернення перемикача назад (вимкнено/положення мультиротора) _перед тим, як_ перехід відбудеться негайно повернутися до багатороторного режиму.

Під час переходу від **з нерухомим крилом до багатогвинтового вертольота** для цього типу VTOL перемикання відбувається миттєво, тому тут насправді немає можливості повернутися назад, на відміну від VTOL з нахиленим гвинтом. Якщо ви хочете, щоб він повернувся у режим фіксованих крил, вам потрібно буде пройти повний перехід. Якщо він все ще рухається швидко, це має відбутися швидко.

### Підтримка

Якщо у вас виникли запитання щодо перетворення або конфігурації VTOL, перегляньте [discuss.px4.io/c/px4/vtol](https://discuss.px4.io/c/px4/vtol).
