# Інструкція з налаштування мультикоптера PID (Manual/Basic)

Цей посібник пояснює, як _вручну_ налаштувати петлі PID на PX4 для всіх [багтроторних налаштувань](../airframes/airframe_reference.md#copter) (Квадрокоптери, Гексакоптери, Октокоптери тощо).

:::tip
[Автопідстроювання](../config/autotune.md) рекомендується для більшості користувачів, оскільки воно набагато швидше, простіше і забезпечує хороше налаштування для більшості кадрів. Рекомендується ручна настройка для кадрів, де автоналаштування не працює, або де важлива дотюнінг.
:::

Загалом, якщо ви використовуєте відповідну [підтримувану конфігурацію рами](../airframes/airframe_reference.md#copter), налаштування за замовчуванням повинні дозволити вам безпечно керувати транспортним засобом. Налаштування рекомендується для всіх нових налаштувань транспортних засобів, щоб отримати _найкращу продуктивність_, оскільки відносно невеликі зміни у апаратурі та збірці можуть впливати на необхідні вигоди налаштування для оптимального польоту. Наприклад, різні ESC або двигуни змінюють оптимальні налаштування коефіцієнтів настройки.

## Вступ

PX4 використовує **П**ропорційні, **I**нтегральні, **П**иференційні (PID) контролери (це найбільш поширена техніка керування).

Настройка _QGroundControl_ **PID Tuning** забезпечує реальні графіки установки транспортного засобу та кривих відгуку. Метою налаштування є встановлення значень P/I/D таким чином, щоб крива _Відповідь_ максимально точно відповідала криві _Setpoint_ (тобто швидка відповідь без перевищень).

![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)

Контролери рівні, що означає, що контролер більш високого рівня передає свої результати контролеру нижчого рівня. Найнижчий контролер - це **контролер рівня**, за яким слідує **контролер напрямку**, і, нарешті, **контролер швидкості & положення**. Налаштування PID потрібно виконати в тому ж порядку, починаючи з регулятора швидкості, оскільки воно вплине на всі інші регулятори.

Процедура тестування для кожного контролера (швидкість, ставлення, швидкість/позиція) та осі (імовірність, кочення, тангаж) завжди однакова: створіть швидку зміну заданої точки, швидко рухаючи палицями, та спостерігайте за реакцією. Потім налаштуйте слайдери (як обговорено нижче), щоб покращити відстеження реакції на задане значення.

:::tip

- Налаштування регулятора швидкості є найважливішим, і якщо воно налаштовано добре, інші регулятори часто не потребують жодних або лише незначних корекцій
- Зазвичай для кочення і тангажу можна використовувати ті ж самі коефіцієнти налаштування.
- використовуйте режим Acro/Stabilized/Altitude для налаштування контролера швидкості
- Використовуйте [Режим позиції](../flight_modes_mc/position.md), щоб налаштувати _Контролер швидкості_ та _Контролер позиції_. Переконайтеся, що ви перейшли в режим _Простого керування позицією_, щоб ви могли генерувати крокові входи. ![QGC PID tuning: Simple control selector](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)
:::

## Передумови

- Ви вибрали найближчу відповідність [конфігурації рами за замовчуванням](../config/airframe.md) для вашого транспортного засобу. Це повинно дати вам транспортний засіб, який вже літає.
- Ви повинні були зробити [Калібрування ESC](../advanced_config/esc_calibration.md).
- Якщо використовується вихід PWM, їх мінімальні значення повинні бути правильно встановлені в [Конфігурації приводів](../config/actuators.md). Ці значення повинні бути встановлені низькими, але такими, що **двигуни ніколи не зупиняються**, коли транспортний засіб зброєний.

  Це можна протестувати в [режимі Acro](../flight_modes_mc/acro.md) або в [режимі Ручного/Стабілізованого керування](../flight_modes_mc/manual_stabilized.md):

  - Видаліть пропелери
  - Збройте транспортний засіб і знизьте оберти до мінімуму
  - Нахиліть транспортний засіб у всі напрямки, близько 60 градусів
  - Перевірте, чи не вимикаються мотори

- Використовуйте високошвидкісне телеметричне з'єднання, таке як WiFi, якщо це взагалі можливо (типовий телеметричний радіо з невеликим діапазоном не є достатньо швидким для отримання реального часу зворотнього зв'язку та графіків). Це особливо важливо для регулятора швидкості.
- Вимкніть [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) перед налаштуванням транспортного засобу (є опції для цього на екрані налаштування PID).

:::warning
Погано налаштовані транспортні засоби ймовірно нестійкі, і легко можуть зіткнутися. Переконайтеся, що призначено [Вимикач аварійного вимкнення](../config/safety.md#emergency-switches).
:::

## Параметри налаштування

Параметри налаштування такі:

1. Озброїте транспортний засіб, злітайте та тримайтеся у повітрі (зазвичай у режимі [Режим позиції](../flight_modes_mc/position.md)).
1. Відкрийте _QGroundControl_ **Налаштування Транспортного Засобу > Налаштування PID** ![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)
1. Select the **Rate Controller** tab.
1. Confirm that the airmode selector is set to **Disabled**
1. Set the _Thrust curve_ value to: 0.3 (PWM, power-based controllers) or 1 (RPM-based ESCs)

   ::: info For PWM, power-based and (some) UAVCAN speed controllers, the control signal to thrust relationship may not be linear. As a result, the optimal tuning at hover thrust may not be ideal when the vehicle is operating at higher thrust.

   The thrust curve value can be used to compensate for this non-linearity:

   - For PWM controllers, 0.3 is a good default (which may benefit from [further tuning](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve)).
   - For RPM-based controllers, use 1 (no further tuning is required as these have a quadratic thrust curve).

   For more information see the [detailed PID tuning guide](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve).
:::

1. Set the _Select Tuning_ radio button to: **Roll**.
1. (Optionally) Select the **Automatic Flight Mode Switching** checkbox. This will _automatically_ switch from [Position mode](../flight_modes_mc/position.md) to [Stabilised mode](../flight_modes_mc/manual_stabilized.md) when you press the **Start** button
1. For rate controller tuning switch to _Acro mode_, _Stabilized mode_ or _Altitude mode_ (unless automatic switching is enabled).
1. Select the **Start** button in order to start tracking the setpoint and response curves.
1. Rapidly move the _roll stick_ full range and observe the step response on the plots. :::tip Stop tracking to enable easier inspection of the plots. This happens automatically when you zoom/pan. Use the **Start** button to restart the plots, and **Clear** to reset them.
:::
1. Modify the three PID values using the sliders (for roll rate-tuning these affect `MC_ROLLRATE_K`, `MC_ROLLRATE_I`, `MC_ROLLRATE_D`) and observe the step response again. The values are saved to the vehicle as soon as the sliders are moved. ::: info The goal is for the _Response_ curve to match the _Setpoint_ curve as closely as possible (i.e. a fast response without overshoots). ::: The PID values can be adjusted as follows:
   - P (proportional) or K gain:
     - increase this for more responsiveness
     - reduce if the response is overshooting and/or oscillating (up to a certain point increasing the D gain also helps).
   - D (derivative) gain:
     - this can be increased to dampen overshoots and oscillations
     - increase this only as much as needed, as it amplifies noise (and can lead to hot motors)
   - I (integral) gain:
     - used to reduce steady-state error
     - if too low, the response might never reach the setpoint (e.g. in wind)
     - if too high, slow oscillations can occur
1. Repeat the tuning process above for the pitch and yaw:
   - Use _Select Tuning_ radio button to select the axis to tune
   - Move the appropriate sticks (i.e. pitch stick for pitch, yaw stick for yaw).
   - For pitch tuning, start with the same values as for roll. :::tip Use the **Save to Clipboard** and **Reset from Clipboard** buttons to copy the roll settings for initial pitch settings.
:::
1. Repeat the tuning process for the attitude controller on all the axes.
1. Repeat the tuning process for the velocity and positions controllers (on all the axes).

   - Use Position mode when tuning these controllers
   - Select the **Simple position control** option in the _Position control mode ..._ selector (this allows direct control for the generation of step inputs)

     ![QGC PID tuning: Simple control selector](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)

All done! Remember to re-enable airmode before leaving the setup.
