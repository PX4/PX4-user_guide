# Значення мелодії (серія Pixhawk)

[Контролери польоту серії Pixhawk](../flight_controller/pixhawk_series.md) використовують звукові сигнали/мелодії та [ світлодіоди](../getting_started/led_meanings.md) для індикації стану та подій (наприклад, успішне або невдале приведення в бойове положення, попередження про низький рівень заряду батареї).

Набір стандартних звуків наведено нижче.

::: info **Developers:** Tunes are defined in [/lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/tunes/tune_definition.desc) and can be tested using the [tune-control](../modules/modules_system.md#tune-control) module. Ви можете шукати використання мелодії за допомогою рядка `TUNE_ID_name` (наприклад, `TUNE_ID_PARACHUTE_RELEASE)
:::


## Завантаження/запуск

Ці мелодії відтворюються під час завантаження.
<!-- https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rcS --> 


#### Сигнал запуску

<audio controls>
  <source src="../../assets/tunes/1_startup_tone.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- tune: 1, STARTUP -->

- microSD карту успішно встановлено (під час завантаження).

#### Сигнал помилки

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- tune 2, ERROR_TUNE -->

- Серйозна несправність призвела до перезавантаження системи.
- Система налаштована на використання PX4IO, але немає IO.
- UAVCAN увімкнено, але драйвер не може запуститися.
- SITL/HITL увімкнено, але драйвер *pwm_out_sim* не може запуститися.
- Помилка запуску FMU.


#### Створення файлової системи

<audio controls>
  <source src="../../assets/tunes/16_make_fs.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 14, SD_INIT (previously tune 16) -->

- Форматування карти microSD.
- Невдалий монтаж (якщо форматування буде успішним, завантажувальна послідовність спробує змонтувати ще раз).
- Немає карти microSD.


#### Помилка форматування

<audio controls>
  <source src="../../assets/tunes/17_format_failed.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 15, SD_ERROR (previously 17) -->

- Не вдалося відформатувати карту microSD (після попередньої спроби змонтувати карту).


#### Програма PX4IO

<audio controls>
  <source src="../../assets/tunes/18_program_px4io.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 16, PROG_PX4IO (previously id 18) -->

- Початок програми PX4IO.

#### Успіх програми PX4IO

<audio controls>
  <source src="../../assets/tunes/19_program_px4io_success.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 17, PROG_PX4IO_OK (previously tune 19) -->

- Програмування PX4IO пройшло успішно.

#### Помилка програми PX4IO

<audio controls>
  <source src="../../assets/tunes/20_program_px4io_fail.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 18, PROG_PX4IO_ERR (previously tune 20) -->

- Програмування PX4IO завершилося невдачею.
- PX4IO не зміг запуститися.
- AUX Mixer не знайдено.


## Операційні

Ці тони/мелодії видаються під час нормальної роботи.

<a id="error_tune_operational"></a>

#### Сигнал помилки

<audio controls>
  <source src="../../assets/tunes/2_error_tune.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 2, ERROR_TUNE -->

- Втрата RC

#### Сигнали успіху

<audio controls>
  <source src="../../assets/tunes/3_notify_positive_tone.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 3, NOTIFY_POSITIVE -->

- Калібрування пройшло успішно.
- Успішна зміна режиму.
- Команда прийнята (наприклад, з протоколу команд MAVLink).
- Вимкнення запобіжника (апарат може бути увімкнено).

#### Нейтральні сигнали

<audio controls>
  <source src="../../assets/tunes/4_notify_neutral_tone.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 4, NOTIFY_NEUTRAL -->

- Місія дійсна і не має застережень.
- Калібрування швидкості повітря: збільште тиск повітря, або калібрування завершено.
- Запобіжний вимикач увімкнено / апарат вимкнено (безпечно наближатися до апарату).

#### Сигнали невдачі

<audio controls>
  <source src="../../assets/tunes/5_notify_negative_tone.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 5, NOTIFY_NEGATIVE -->

- Помилка калібрування.
- Калібрування вже завершено.
- Місія недійсна.
- Команда відхилена, не виконана, тимчасово відхилена (наприклад, з протоколу команд MAVLink).
- Увімкнення / вимкнення відхилено (наприклад, не пройдено передпольотну перевірку, не відключено систему безпеки, система не перебуває в ручному режимі).
- Перехід до іншого режиму відхилено.

#### Попередження про увімкнення

<audio controls>
  <source src="../../assets/tunes/6_arming_warning.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 6, ARMING_WARNING -->

- Апарат увімкнено.

#### Сигнали невдачі при увімкненні

<audio controls>
  <source src="../../assets/tunes/10_arming_failure_tune.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 10, ARMING_FAILURE -->

- Невдача при увімкненні

#### Попередження про низький заряд акумулятора - повільне

<audio controls>
  <source src="../../assets/tunes/7_battery_warning_slow.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 7,  BATTERY_WARNING_SLOW -->

- Попередження про низький заряд батареї ([failsafe](../config/safety.md#low-battery-failsafe)).

#### Попередження про низький заряд акумулятора - швидке

<audio controls>
  <source src="../../assets/tunes/8_battery_warning_fast.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 8, BATTERY_WARNING_FAST -->

- Попередження про критично низький заряд батареї ([failsafe](../config/safety.md#low-battery-failsafe)).


#### Попередження GPS - повільне

<audio controls>
  <source src="../../assets/tunes/9_gps_warning_slow.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 9,  GPS_WARNING -->

#### Випуск парашута

<audio controls>
  <source src="../../assets/tunes/11_parachute_release.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 11, PARACHUTE_RELEASE -->

- Спрацював випуск парашута.


#### Один сигнал

<audio controls>
  <source src="../../assets/tunes/14_single_beep.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 12, SINGLE_BEEP (previously was id 14 -->

- Калібрування магнітометра/компаса: Сповістити користувача про початок обертання апарату.

#### Сигнали початкової позиції

<audio controls>
  <source src="../../assets/tunes/15_home_set_tune.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>
<!-- 13, HOME_SET (previously id 15) -->

- Ініціалізовано початкову позицію (лише вперше).

#### Сигнал вимкнення

<audio controls>
  <source src="../../assets/tunes/power_off_tune.mp3" type="audio/mpeg">
Ваш браузер не підтримує аудіо елемент.
</audio>

- Апарат вимикається.

<!--19, POWER_OFF -->
