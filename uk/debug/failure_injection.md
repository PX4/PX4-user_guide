# System Failure Injection

System failure injection allows you to induce different types of sensor and system failures, either programmatically using the [MAVSDK failure plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html), or "manually" via a PX4 console like the [MAVLink shell](../debug/mavlink_shell.md#mavlink-shell). This enables easier testing of [safety failsafe](../config/safety.md#safety-configuration-failsafes) behaviour, and more generally, of how PX4 behaves when systems and sensors stop working correctly.

Failure injection is disabled by default, and can be enabled using the [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN) parameter.

:::warning
Failure injection still in development. At time of writing (PX4 v1.14):

- It can only be used in simulation (support for both failure injection in real flight is planned).
- It requires support in the simulator. It is supported in Gazebo Classic
- Many failure types are not broadly implemented. In those cases the command will return with an "unsupported" message.

:::

## Failure System Command

Failures can be injected using the [failure system command](../modules/modules_command.md#failure) from any PX4 console/shell, specifying both the target and type of the failure.

### Синтаксис

The full syntax of the [failure](../modules/modules_command.md#failure) command is:

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

## MAVSDK Failure Plugin

The [MAVSDK failure plugin](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_failure.html) can be used to programmatically inject failures. It is used in [PX4 Integration Testing](../test_and_ci/integration_testing_mavsdk.md) to simulate failure cases (for example, see [PX4-Autopilot/test/mavsdk_tests/autopilot_tester.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/test/mavsdk_tests/autopilot_tester.cpp)).

The plugin API is a direct mapping of the failure command shown above, with a few additional error signals related to the connection.
