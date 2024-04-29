# Інжекція помилки системи

Ін'єкція відмов системи дозволяє викликати різні типи відмов датчиків та систем, або програмно за допомогою [плагіну відмови MAVSDK](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html), або "вручну" через консоль PX4, таку як [оболонка MAVLink](../debug/mavlink_shell.md#mavlink-shell). Це дозволяє легше тестування [захисної функції аварійного відключення](../config/safety.md#safety-configuration-failsafes), і загалом, як PX4 працює, коли системи та сенсори перестають працювати належним чином.

Впровадження відмов вимкнено за замовчуванням і може бути увімкнено за допомогою параметра [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN).

:::warning
Впровадження відмов все ще знаходиться в розробці. На момент написання (PX4 v1.14):

- Це можна використовувати лише в симуляції (підтримка як для впровадження в реальному польоті запланована).
- Потребує підтримки в симуляторі. Це підтримується в Gazebo Classic
- Багато типів відмов не широко реалізовані. У таких випадках команда повернеться з повідомленням "unsupported".

:::

## Команда системи збою

Помилки можна впроваджувати за допомогою [команди системи помилок](../modules/modules_command.md#failure) з будь-якої консолі/оболонки PX4, вказавши як ціль, так і тип помилки.

### Синтаксис

Повний синтаксис команди [failure](../modules/modules_command.md#failure) є:

```sh
failure <component> <failure_type> [-i <instance_number>]
```

де:

- _component_:
  - Сенсори:
    - `gyro`: Gyro.
    - `accel`: Accelerometer.
    - `mag`: Magnetometer
    - `baro`: Barometer
    - `gps`: GPS
    - `optical_flow`: Optical flow.
    - `vio`: Visual inertial odometry.
    - `distance_sensor`: Датчик відстані (дальніомір).
    - `airspeed`: Датчик швидкості повітря.
  - Системи:
    - `battery`: Акумулятор.
    - `motor`: Двигун.
    - `servo`: Сервопривід.
    - `avoidance`: Avoidance.
    - `rc_signal`: RC Сигнал.
    - `mavlink_signal`: Сигнал MAVLink (телеметрія даних).
- _failure_type_:
  - `ok`: Опублікувати як звичайно (Вимкнути впровадження випадкових помилок).
  - `off`: Зупинити публікацію.
  - `stuck`: Повідомляє одне й те ж значення кожного разу (_може_ вказувати на несправність датчика).
  - `garbage`: Опублікуйте випадковий шум. Це схоже на читання неініціалізованої пам'яті.
  - `wrong`: Публікує недійсні значення (які все ще виглядають розумними / не є "сміттям").
  - `slow`: Публікація зі зниженою швидкістю.
  - `delayed`: Опублікуйте дійсні дані зі значним запізненням.
  - `intermittent`: Публікувати періодично.
- _instance number_ (необов'язково): Номер екземпляра пошкодженого датчика. 0 (за замовчуванням) вказує на всі сенсори вказаного типу.

### Приклад

Щоб симулювати втрату сигналу RC без вимкнення вашого пульта керування RC:

1. Увімкніть параметр [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN).
1. Введіть наступні команди e консолі MAVLink або SITL _pxh shell_:

   ```sh
   # Fail RC (turn publishing off)
   failure rc_signal off

   # Restart RC publishing
   failure rc_signal ok
   ```

## MAVSDK відлагоджувальний плагін

[Плагін невдачі MAVSDK](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html) може бути використаний для програмного впровадження невдач. Використовується в [PX4 Інтеграційному тестуванні](../test_and_ci/integration_testing_mavsdk.md) для моделювання випадків відмов (наприклад, див. [PX4-Autopilot/test/mavsdk_tests/autopilot_tester.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/test/mavsdk_tests/autopilot_tester.cpp)).

API плагіна - це пряме відображення команди збою, показаної вище, з деякими додатковими сигналами про помилки, пов'язані з підключенням.
