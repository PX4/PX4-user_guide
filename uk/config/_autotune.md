<!-- This is the single-source for autotuning docs used in the autotune_mc.md and autotune_fy.md
At time of writing, only FW, MC, and VTOL, support autotuning.
VTOL has its own doc that references the other two
-->

<div v-if="$frontmatter.frame === 'Multicopter'">

# Auto-tuning (Multicopter)

</div>
<div v-else-if="$frontmatter.frame === 'Plane'">

# Auto-tuning (Fixed-Wing)

</div>

Автоналаштування автоматизує процес налаштування контролерів швидкості та ставлення PX4, які є найважливішими контролерами для стабільного та реактивного польоту (інші налаштування є більш "необов'язковими").

Tuning only needs to be done once, and is recommended unless you're using a vehicle that has already been tuned by the manufacturer (and not modified since).

:::warning
Auto-tuning is performed while flying. The airframe must fly well enough to handle moderate disturbances, and should be closely attended:

- Перевірте, що ваш автомобіль достатньо [стабільний для автоналаштування](#pre-tuning-test).
- Be ready to abort the autotuning process. You can do this by changing flight modes<div style="display: inline;" v-if="$frontmatter.frame === 'Plane'"> or using an auto-tune enable/disable switch ([if configured](#enable-disable-autotune-switch))</div>.
- Перевірте, що автомобіль добре літає після налаштування.

:::

@[youtube](https://youtu.be/5xswOhhqrIQ)

## Попереднє налаштування тесту

Транспортний засіб повинен бути здатний літати і належним чином стабілізувати себе перед запуском автоматичного налаштування. Цей тест дозволяє забезпечити безпечний польот транспортного засобу в режимах управління положенням.

Переконайтеся, що транспортний засіб достатньо стабільний для автоналаштування:

1. Виконайте звичайний контрольний перелік безпеки перед польотом, щоб переконатися, що зона польоту чиста і має достатньо місця.

1. Take off and <div style="display: inline;" v-if="$frontmatter.frame === 'Multicopter'">hover at 1m above ground in [Altitude mode](../flight_modes_mc/altitude.md) or [Manual/Stabilized mode](../flight_modes_mc/manual_stabilized.md)</div><div style="display: inline;" v-else-if="$frontmatter.frame === 'Plane'">fly at cruise speed in [Position mode](../flight_modes_fw/position.md) or [Altitude mode](../flight_modes_fw/altitude.md)</div>.

1. Використовуйте палицю кочення пульта керування RC для виконання наступного маневру, нахиливши транспортний засіб лише на кілька градусів: _нахил ліворуч > нахил праворуч > центр_ (Весь маневр повинен зайняти близько 3 секунд). Транспортний засіб повинен стабілізуватися протягом 2 коливань.
1. Повторіть маневр, нахиляючись з більшими амплітудами при кожної спроби. Якщо транспортний засіб може стабілізуватися протягом 2 коливань під кутом близько 20 градусів, перейдіть до наступного кроку.
1. Повторіть ті ж маніпуляції, але по осі поля. Як вище, почніть з невеликих кутів і підтвердіть, що транспортний засіб може стабілізуватися самостійно протягом 2 коливань, перш ніж збільшувати нахил.

If the drone can stabilize itself within 2 oscillations it is ready for the [auto-tuning procedure](#auto-tuning-procedure).

::: warning
If the drone cannot stabilize itself sufficiently, follow the instructions in the [troubleshooting](#troubleshooting) section. These explain the minimal manual tuning to prepare the vehicle for auto-tuning.
:::

## Процедура автоналагодження

Послідовність автоматичного налаштування повинна бути виконана в **безпечній зоні польоту, з достатньою площею**. Це займає близько 40 секунд ([між 19 і 68 секундами](#how-long-does-autotuning-take)). Для найкращих результатів ми рекомендуємо проводити тестування в спокійні погодні умови.

The recommended mode for autotuning is <div style="display: inline;" v-if="$frontmatter.frame === 'Multicopter'">[Altitude mode](../flight_modes_mc/altitude.md)</div><div  style="display: inline;" v-else-if="$frontmatter.frame === 'Plane'">[Hold mode](../flight_modes_fw/hold.md)</div>, but any other flight mode can be used. Під час автоматичного налаштування RC палиці все ще можна використовувати для польоту транспортного засобу.

Кроки наступні:

1. Виконайте [тест передналаштування](#pre-tuning-test).

1. Takeoff using RC control <div style="display: inline;" v-if="$frontmatter.frame === 'Multicopter'">in [Altitude mode](../flight_modes_mc/altitude.md).
   Наведіть транспортний засіб на безпечній відстані та на кілька метрів над землею (між 4 та 20 м).</div><div v-else-if="$frontmatter.frame === 'Plane'">
   Once flying at cruise speed, activate [Hold mode](../flight_modes_fw/hold.md).
   Це допоможе літаку летіти по колу на постійній висоті та швидкості.</div>

1. Enable autotune.

   <div v-if="$frontmatter.frame === 'Plane'">

   :::tip

   If an [Enable/Disable Autotune Switch](#enable-disable-autotune-switch) is configured you can just toggle the switch to the "enabled" position.


:::

   </div>

   1. У QGroundControl відкрийте меню: **Налаштування Транспортного Засобу > Налаштування PID**

      ![Tuning Setup > Autotune Enabled](../../assets/qgc/setup/autotune/autotune.png)

   1. Виберіть вкладки _Контролер швидкості_ або _Контролер нахилу_.
   1. Переконайтеся, що кнопка увімкнення **Автопідгонки** увімкнена (це відобразить кнопку **Автопідгонки** та видалить селектори ручного налаштування).
   1. Прочитайте спливаюче вікно попередження та натисніть на **OK**, щоб почати налаштування.

1. Дрон спочатку почне виконувати швидкі рухи кочення, а потім рухи тангажу та рухи курсу. Прогрес відображається на панелі прогресу, поруч з кнопкою _Автоналадка_.
1. <div style="display: inline;" v-if="$frontmatter.frame === 'Multicopter'">Manually land and disarm to apply the new tuning parameters.
   Takeoff carefully and manually test that the vehicle is stable.</div><div v-else-if="$frontmatter.frame === 'Plane'">The tuning will be immediately/automatically be applied and tested in flight (by default).
   PX4 потім проведе 4-секундний тест і поверне нове налаштування, якщо буде виявлено проблему.</div>

::: warning
If any strong oscillations occur, land immediately and follow the instructions in the [Troubleshooting](#troubleshooting) section below.
:::

Додаткові примітки:

<div v-if="$frontmatter.frame === 'Multicopter'">

- The instructions above tune the vehicle in [Altitude mode](../flight_modes_mc/altitude.md).
  You can instead takeoff in [Takeoff mode](../flight_modes_mc/takeoff.md) and tune in [Position mode](../flight_modes_mc/position.md) if the vehicle is is _known_ to be stable in these modes.

</div>
<div v-else-if="$frontmatter.frame === 'Plane'">

- Autotuning can also be run in [Altitude mode](../flight_modes_fw/altitude.md) or [Position mode](../flight_modes_fw/position.md).
  Проте виконання тесту під час прямого польоту потребує більшої безпечної зони для налаштування і не дає значно кращого результату налаштування.

</div>

- Whether tuning is applied while flying or after landing can be [configured using parameters](#apply-tuning-when-in-air-landed).

## Вирішення проблем

### Drone oscillates when performing the pre-tuning test

<div v-if="$frontmatter.frame === 'Multicopter'">

Slow oscillations (1 oscillation per second or slower): this often occurs on large platforms and means that the attitude loop is too fast compared to the rate loop:

- Decrease [MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) and [MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P) by steps of 1.0.

Fast oscillations (more than 1 oscillation per second): this is because the gain of the rate loop is too high.

- Decrease `MC_[ROLL|PITCH|YAW]RATE_K` by steps of 0.02

</div>
<div v-else-if="$frontmatter.frame === 'Plane'">

Slow oscillations (1 oscillation per second or slower): this often occurs on large platforms and means that the attitude loop is too fast compared to the rate loop.

- Increase [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) and [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) by steps of 0.1.

Fast oscillations (more than 1 oscillation per second): this is because the gain of the rate loop is too high.

- Decrease [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P), [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P), [FW_YR_P](../advanced_config/parameter_reference.md#FW_YR_P) by steps of 0.01.

</div>

### Послідовність автоматичної настройки не вдається

Якщо безпілотник не рухався достатньо під час автоматичного налаштування, алгоритм ідентифікації системи може мати проблеми з визначенням правильних коефіцієнтів.

Increase the <div style="display: inline;" v-if="$frontmatter.frame === 'Multicopter'">[MC_AT_SYSID_AMP](../advanced_config/parameter_reference.md#MC_AT_SYSID_AMP)</div><div style="display: inline;" v-else-if="$frontmatter.frame === 'Plane'">[FW_AT_SYSID_AMP](../advanced_config/parameter_reference.md#FW_AT_SYSID_AMP)</div> parameter by steps of 1 and trigger the auto-tune again.

### Дрон коливається після автоналагодження

Через вплив ефектів, які не враховані в математичній моделі, такі як затримки, насичення, швидкість наростання, гнучкість конструкції, коефіцієнт підсилення петлі може бути занадто великим. To fix this, follow the same steps described [when the drone oscillates in the pre-tuning test](#drone-oscillates-when-performing-the-pre-tuning-test).

### Я все ще не можу зрозуміти, як це працює

Attempt manual tuning using the guides listed in [See also](#see-also) below.

## Необов'язкова Конфігурація

### Apply Tuning when In-Air/Landed


<div v-if="$frontmatter.frame === 'Multicopter'">

By multicopters land before parameters are applied.
This behaviour can be configured using the [MC_AT_APPLY](../advanced_config/parameter_reference.md#MC_AT_APPLY) parameter:

</div>
<div v-else-if="$frontmatter.frame === 'Plane'">

By default fixed wing tuning the parameters are applied while flying, and then PX4 runs a test to confirm that the controllers work properly.
This behaviour can be configured using the [FW_AT_APPLY](../advanced_config/parameter_reference.md#FW_AT_APPLY) parameter:

</div>

- `0`: надбавки не застосовуються. Це використовується для тестування, якщо користувач хоче перевірити результати автоналаштування алгоритму без прямого їх використання.
- `1`: застосувати здобутки після роззброєння (типово для мультироторів). Оператор може перевірити нове налаштування під час обережного зльоту.
- `2`: apply immediately (default for fixed-wings). Нове налаштування застосовується, перешкоди надсилаються контролеру, а стабільність контролюється протягом наступних 4 секунд. Якщо керуюче коло нестійке, керуючі коефіцієнти негайно повертаються до свого попереднього значення. Якщо тест пройшов успішно, пілот може використовувати нове налаштування.

<div v-if="$frontmatter.frame === 'Plane'">

### Enable/Disable Autotune Switch

A remote control switch can be configured to enable/disable autotune (in any mode) using an RC AUX channel (note, this is only supported on fixed-wing vehicles).

To map a switch:

1. Виберіть канал RC на вашому контролері для використання перемикача увімкнення / вимкнення автоналадки.
1. Set [RC_MAP_AUX1](../advanced_config/parameter_reference.md#RC_MAP_AUX1) to match the RC channel for your switch (you can use any of `RC_MAP_AUX1` to `RC_MAP_AUX6`).
1. Set [FW_AT_MAN_AUX](../advanced_config/parameter_reference.md#FW_AT_MAN_AUX) to the selected channel (i.e. `1: Aux 1` if you mapped `RC_MAP_AUX1`).

The auto tuner will be disabled when the switch is below `0.5` (on the manual control setpoint range of of `[-1, 1]`) and enabled when the switch channel is above `0.5`.

If using an RC AUX switch to enable autotuning, make sure to [select the tuning axes](#select-tuning-axis) before flight.

### Select Tuning Axis

Fixed-wing vehicles (only) can select which axes are tuned using the [FW_AT_AXES](../advanced_config/parameter_reference.md#FW_AT_AXES) bitmask parameter:

- bit `0`: roll (default)
- bit `1`: pitch (default)
- bit `2`: yaw

</div>

## Розробники/SDKs

Автоналаштування починається за допомогою команди MAVLink [MAV_CMD_DO_AUTOTUNE_ENABLE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_AUTOTUNE_ENABLE).

На момент написання повідомлення його пересилаються на регулярні інтервали для опитування PX4 на предмет прогресу: `COMMAND_ACK` включає результат, що операція в процесі виконання, а також прогрес у відсотках. Операція завершується, коли прогрес досягає 100% або транспортний засіб приземляється і роззброюється.

:::info Це не є виконанням протоколу довгострокової команди [командного протоколу довгострокової команди](https://mavlink.io/en/services/command.html#long_running_commands) у відповідності до MAVLink. PX4 повинен транслювати прогрес, оскільки протокол не дозволяє опитування.
:::

Функція ще не підтримується MAVSDK.

## Background/Detail

PX4 використовує [PID контролери](../flight_stack/controller_diagrams.md) (швидкість, ставлення, швидкість та положення), щоб розрахувати вихідні дані, необхідні для переміщення транспортного засобу з його поточного оціненого стану, щоб відповідати бажаному заданому значенню. Контролери повинні бути добре налаштовані, щоб отримати найкращу продуктивність з автомобіля. Зокрема, погано налаштований регулятор швидкості призводить до менш стабільного польоту у всіх режимах і потребує більше часу на відновлення після перешкод.

Загалом, якщо ви використовуєте [конфігурацію рами](../config/airframe.md), яка схожа на ваш транспортний засіб, то транспортний засіб зможе літати. Однак, якщо конфігурація точно не відповідає вашому обладнанню, вам слід налаштувати регулятори швидкості та кута нахилу. Налаштування контролерів швидкості та позиції менш важливе, оскільки вони менше піддаються динаміці транспортного засобу, і типова конфігурація налаштування для схожого аеродинамічного корпусу часто є достатньою.

Автоналаштування забезпечує автоматичний механізм для налаштування регуляторів швидкості та кута нахилу. Це можна використовувати для налаштування літаків з фіксованим крилом та  мультикоптерних транспортних засобів, а також літаків VTOL, коли літають як мультикоптерний транспортний засіб або з фіксованим крилом (перехід між режимами повинен бути налаштований вручну). Теоретично це повинно працювати для інших типів транспортних засобів, які мають регулятор швидкості, але наразі підтримуються лише вищезазначені типи.

Автоматична настройка працює добре для конфігурацій багатокоптерів та фіксованих крил, які підтримує PX4, за умови, що рама не занадто гнучка (див. [нижче для отримання додаткової інформації](#does-autotuning-work-for-all-supported-airframes)).

Транспортний засіб повинен перебувати в режимі стабілізації висоти (такому як [Режим висоти](../flight_modes_mc/altitude.md), [Режим утримання](../flight_modes_mc/hold.md) або [Режим позиції](../flight_modes_mc/position.md)). Стек польоту застосує невелике збурення до транспортного засобу в кожній з осей, а потім спробує розрахувати нові налаштувальні параметри. Для літаків нове налаштування застосовується в повітрі за замовчуванням, після чого транспортний засіб перевіряє нові налаштування і повертає налаштування, якщо контролери нестабільні. Для мультикоптера транспортний засіб приземляється і застосовує нові параметри налаштування після відбронювання; пілот повинен обережно злетіти і протестувати налаштування.

The tuning process takes about 40 seconds ([between 19 and 70 seconds](#how-long-does-autotuning-take)). Стандартна поведінка може бути налаштована за допомогою [параметрів](#optional-configuration).

### FAQ

#### Які типи кадрів підтримуються?

Автоналаштування увімкнено для мультикоптерів, фіксованих крил та гібридних VTOL фіксованих крилових літаків.

Хоча це ще не активовано для інших типів кадрів, в теорії його можна використовувати з будь-яким кадром, який використовує контролер швидкості.

#### Чи працює автоналадка для всіх підтримуваних конструкцій?

Математична модель, яку використовує автоналаштування для оцінки динаміки дрона, передбачає, що це лінійна система без зв'язку між осями (SISO) та з обмеженою складністю (2 полюси та 2 нулі). Якщо справжній безпілотник занадто далеко від цих умов, модель не зможе відтворити реальну динаміку безпілотника.

На практиці, автоналаштування, як правило, добре працює для планерів та мультикоптерів, за умови, що рама не занадто гнучка.

#### Як довго триває автоналагодження?

Налаштування займає 5-20 секунд на вісь (припиняється, якщо налаштування не вдалося встановити за 20 секунд) + пауза 2 секунди між кожною віссю + 4 секунди тестування, якщо нові коефіцієнти застосовано у повітрі.

Мультикоптер повинен налаштовувати всі три осі, і за замовчуванням не перевіряє нові виграші у повітрі. Налаштування, отже, займе від 19 с (`5 + 2 + 5 + 2 + 5`) до 64 с (`20x3 + 2x2`).

За замовчуванням літак налагоджує всі три осі, а потім перевіряє нові коефіцієнти в повітрі. Діапазон становить від 25 с (`5 + 2 + 5 + 2 + 5 + 2 + 4`) до 70 с (`20x3 + 3x2 + 4`).

Зверніть увагу, що вищезазначені налаштування є значеннями за замовчуванням. Мультикоптер може вибрати проведення тестів в повітрі, а планер може вибрати не робити цього. Додатково, літак з фіксованим крилом може вибрати налаштувати менше вісей.

За анекдотичними даними, зазвичай це займає близько 40 секунд для будь-якого засобу пересування.


<!--
#### How vigorous is the disturbance applied by tuning

This might be added later. I'd like to just point to a video.

If not, perhaps say "not very" but you should expect that the vehicle might deflect by as much as 20degrees and so should be able to cope with that deflection with default tuning.

-->

<div v-if="$frontmatter.frame === 'Multicopter'">

## See also

- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter_basic.md) (Manual/Simple)
- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) (Advanced/Detailed)

</div>
<div v-else-if="$frontmatter.frame === 'Plane'">

## See also

- [Fixed-Wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)

</div>
