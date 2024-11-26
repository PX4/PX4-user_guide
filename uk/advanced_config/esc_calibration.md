# Калібрування ESC

:::info
These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md) and [OneShot ESCs](../peripherals/oneshot.md).
[DShot](../peripherals/dshot.md) and [CAN](../can/index.md) ESCs ([DroneCAN](../dronecan/escs.md)/Cyphal) do not require this kind of calibration.
:::

Електронні регулятори обертів (ЕР) регулюють швидкість (і напрямок) обертання моторів на основі вхідної команди від керуючого пристрою політів (КП).
Діапазон вхідних команд, на які відповідає ЕР, часто може бути налаштований, і типовий діапазон може відрізнятися навіть між ЕР одного й того ж моделі.

Ця калібрування оновлює всі ЕР з фіксованим максимальним (2000us) та мінімальним (1000us) вхідним сигналом PWM від керуючого пристрою.
Після цього всі ЕР/мотори на літальному апараті будуть реагувати на вхід від керуючого пристрою однаковим чином по всьому діапазону вхідних сигналів.

Калібрування за допомогою цього інструменту рекомендується для всіх ЕР, що підтримують цей метод, які використовують PWM або OneShot.

:::info
Calibration is particularly important for low-cost ESC, as they commonly vary a lot in their response to input.

Проте його також рекомендується для високоякісних контролерів.
Незважаючи на те, що вони заводськи калібруються і всі мають відреагувати однаково, на практиці діапазон вхідних сигналів може відрізнятися.
Наприклад, якщо контролер було калібровано вручну після виходу з заводу, він може вже не працювати так само.
:::

:::warning
If you want to use an ESC that does not support this calibration, then it must be factory calibrated and respond consistently out of the box.
This should be verified using [Actuator Testing](../config/actuators.md#actuator-testing).
Jump to the [actuator configuration step (7)](#actuatorconfig_step) (which is still important).
:::

OneShot ESCs should be [configured to use OneShot](../peripherals/oneshot.md#px4-configuration) before calibration. Ви повинні провести калібрування ESC після переключення, навіть якщо ви вже раніше калібрували їх.

## Передумови

Послідовність калібрування передбачає, що ви зможете тримати під напругою контролер польоту під час ручного вимикання та увімкнення ESC.

Якщо використовуєте контролер польоту Pixhawk, рекомендується окремо живити контролер польоту через USB та підключати/відключати батарею для живлення ESC за потреби.
Flight control systems that can't power the autopilot via USB will need a [different approach](#problem_power_module).

Якщо акумулятор підключений через модуль живлення, процедура калібрування може виявити підключення акумулятора та використовувати його для запуску послідовності калібрування.
Якщо жодний акумулятор не виявлено, послідовність калібрування виконується на основі таймаутів.

## Кроки

Для калібрування ЕСК виконайте наступні кроки:

1. Видаліть пропелери.

   :::warning
   Never attempt ESC calibration with propellers on!

   The motors _should_ not spin during ESC calibration.
   Однак, якщо калібрування починається, коли ESC вже живлені, або якщо ESC не правильно підтримує або не виявляє послідовність калібрування, то вони відповідатимуть на вхід PWM, запускаючи мотори з максимальною швидкістю.

:::

2. Map the ESCs you're calibrating as motors in the vehicle's [Actuator Configuration](../config/actuators.md).
   Лише відображені актуатори отримують вихід, і тільки ESC, відображені як мотори, будуть калібруватися.

3. Відключіть живлення ESC, від'єднавши батарею.
   Контролер польоту має залишитися увімкненим, наприклад, тримаючи USB підключеним до наземної станції.

4. Open the _QGroundControl_ **Settings > Power**, then press the **Calibrate** button.

   ![ESC Calibration step 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

5. Після початку послідовності калібрування без помилок безпосередньо живіть ESC (ви маєте побачити відповідне повідомлення):

   ![ESC Calibration step 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)

   Калібрування розпочнеться автоматично:

   ![ESC Calibration step 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

6. Під час калібрування ви почуєте специфічний для моделі сигнал звуку з ESC, що вказує на окремі кроки калібрування.

   Вас сповістять, коли калібрування завершиться.

   <a id="actuatorconfig_step"></a>
   ![ESC Calibration step 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

7. Go back to the [Actuator Configuration](../config/actuators.md) section.

   Після калібрування всі мотори з тими ж (пере)каліброваними ESC мають працювати однаково за тими ж вхідними даними. Значення налаштувань PWM за замовчуванням для вихідних даних моторів в налаштуваннях актуатора тепер повинні працювати зразу після розпакування.

   Вам потрібно переконатися, що мотори дійсно працюють правильно.
   Оскільки значення конфігурації за замовчуванням встановлені консервативно, ви також можете бажати налаштувати їх для вашого конкретного ESC.

   ::: info
   The steps below are similar to those described in [Actuator Configuration > Motor Configuration](../config/actuators.md#motor-configuration).

:::

   Перевірте наступні значення:

   - The minimum value for a motor (default: `1100us`) should make the motor spin slowly but reliably, and also spin up reliably after it was stopped.

     You can confirm that a motor spins at minimum (still without propellers) in [Actuator Testing](../config/actuators.md#actuator-testing), by enabling the sliders, and then moving the test output slider for the motor to the first snap position from the bottom.
     Правильне значення має зробити так, що мотор обертається негайно і надійно при пересуванні повзунка зі стану роззброєності до мінімуму.

     Щоб знайти «оптимальне» мінімальне значення, пересуньте повзунок вниз (режим роззброєності).
     Then increase the PWM output's `disarmed` setting in small increments (e.g. 1025us, 1050us, etc), until the motor starts to spin reliably (it is better to be a little too high than a little too low).
     Enter this value into the `minimum` setting for all the motor PWM outputs, and restore the `disarmed` output to `1100us`.

   - The maximum value for a motor (default: `1900us`) should be chosen such that increasing the value doesn't make the motor spin any faster.

     You can confirm that the motor spins quickly at the maximum setting in [Actuator Testing](../config/actuators.md#actuator-testing), by moving the associated test output slider to the top position.

     Щоб знайти "оптимальне" максимальне значення, спочатку перемістіть повзунок вниз (роззброєно).
     Then increase the PWM output's `disarmed` setting to near the default maximum (`1900`) - the motors should spin up.
     Слухайте тон мотора, коли збільшуєте максимальне значення PWM для виводу поетапно (наприклад, 1925 мкс, 1950 мкс і так далі).
     Оптимальне значення визначається в той момент, коли звук моторів не змінюється при збільшенні значення виводу.
     Enter this value into the `maximum` setting for all the motor PWM outputs, and restore the `disarmed` output to `1100us`.

   - The disarmed value for a motor (default: `1000us`) should make the motor stop and stay stopped.

     You can confirm this in [Actuator Testing](../config/actuators.md#actuator-testing) by moving the test output slider to the snap position at the bottom of the slider and observing that the motor does not spin.

     Якщо ESC обертається за замовчуванням на значенні 1000 мкс, то ESC не правильно калібрується.
     Якщо використовуєте ESC, який не може бути калібрований, вам слід зменшити значення виведення ШІМ для виводу до значення, коли мотор більше не обертається (наприклад, 950 мкс або 900 мкс).

   ::: info
   VTOL and fixed-wing motors do not need any special PWM configuration.
   При встановленні стандартної настройки PWM вони автоматично зупиняться під час польоту при наказі автопілотом.

:::

## Усунення проблем

1. Калібрування може повідомити про успішне завершення, навіть якщо воно фактично не вдалося.

   Це може статися, якщо ви не вмикаєте ESC у відповідний час або ESC не підтримують калібрування.
   Це стається тому, що PX4 не отримує зворотного зв'язку від ESC, щоб знати, чи було калібрування успішним.
   Вам потрібно спиратися на інтерпретацію сигналів під час калібрування та наступних тестів моторів, щоб впевнитися, що калібрування пройшло успішно.

   <a id="problem_power_module"></a>

2. Калібрування не може бути запущено, якщо у вас налаштований і підключений модуль живлення (з міркувань безпеки).

   Спочатку відключіть живлення до регуляторів обертання.
   If you're blocked because a power module is necessary to keep your flight controller alive, but you can (un)power the ESCs separately, you can temporarily disable the detection of the power module just for the ESC calibration using the parameters [BATn_SOURCE](../advanced_config/parameter_reference.md#BAT1_SOURCE). Коли модуль живлення, який живить автопілот, більше не виявляється як акумулятор, можлива калібрування на основі часу.

3. PX4 перерве калібрування (з міркувань безпеки), якщо система виявить збільшення споживання струму безпосередньо після початку калібрування.Це потребує модуля живлення.
