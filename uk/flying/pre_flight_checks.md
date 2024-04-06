# Передпольотні перевірки сенсорів/оцінювачів

PX4 виконує ряд передпольотних перевірок якості сенсорів та оцінювачів, щоб визначити, чи достатньо добре визначено позицію для увімкнення та польоту апарату (ці перевірки контролюються параметрами [COM\_ARM\_](../advanced_config/parameter_reference.md#commander)).

:::tip
Будь-які помилки перед польотом повідомляються в *QGroundControl* як повідомлення `PREFLIGHT FAIL`. Повідомлення `estimator_status.gps_check_fail_flags` [в журналах](../getting_started/flight_reporting.md) також показує, які перевірки якості GPS не пройшли.
:::

Нижченаведені розділи перелічують помилки, їх ймовірні причини та рішення, а також будь-які параметри, які впливають на те, як проводяться передпольотні перевірки.

## Передпольотні перевірки/помилки EKF

Наступні помилки (з пов’язаними перевірками та параметрами) повідомляються [EKF](../advanced_config/tuning_the_ecl_ekf.md) (і передаються в *QGroundControl*):

#### PREFLIGHT FAIL: EKF HGT ERROR

* Ця помилка виникає, коли IMU та дані вимірювання висоти суперечать.
* Виконайте калібрування акселерометра та гіроскопа та перезапустіть апарат. Якщо помилка не зникає, перевірте дані датчика висоти на наявність проблем.
* Перевірка контролюється параметром [COM_ARM_EKF_HGT](../advanced_config/parameter_reference.md#COM_ARM_EKF_HGT).

#### PREFLIGHT FAIL: EKF VEL ERROR

* Ця помилка виникає, коли дані вимірювання швидкості IMU та GPS суперечать.
* Перевірте дані швидкості GPS на наявність нереалістичних стрибків даних. Якщо якість GPS виглядає нормально, виконайте калібрування акселерометра та гіроскопа та перезапустіть апарат.
* Перевірка контролюється параметром [COM_ARM_EKF_VEL](../advanced_config/parameter_reference.md#COM_ARM_EKF_VEL).

#### PREFLIGHT FAIL: EKF HORIZ POS ERROR

* Ця помилка виникає, коли IMU та дані вимірювання позиції (або GPS, або зовнішнє бачення) суперечать.
* Перевірте дані датчика позиції на наявність нереалістичних стрибків даних. Якщо якість даних виглядає нормальною, виконайте калібрування акселерометра та гіроскопа та перезапустіть апарат.
* Перевірка контролюється параметром [COM_ARM_EKF_POS](../advanced_config/parameter_reference.md#COM_ARM_EKF_POS).

#### PREFLIGHT FAIL: EKF YAW ERROR

* Ця помилка виникає, коли кут повороту, визначений за допомогою даних гіроскопа, і кут повороту, отриманий від магнітометра або системи зовнішнього бачення, не узгоджуються.
* Перевірте дані IMU на наявність великих зсувів швидкості повороту та перевірте вирівнювання та калібрування магнітометра.
* Перевірка контролюється параметром [COM_ARM_EKF_YAW](../advanced_config/parameter_reference.md#COM_ARM_EKF_YAW)
* Значення за замовчуванням 0,5 дозволяє різниці між навігаційним кутом відхилення та магнітним кутом відхилення (магнітометр або зовнішнє бачення) не перевищувати 50% від максимально допустимого EKF і забезпечує деякий запас для збільшення похибки на початку польоту.
* Помилка може статися, якщо гіроскоп повороту має велике зміщення або якщо апарат переміщається чи обертається за наявності магнітних перешкод або поганого калібрування магнітометра.

#### PREFLIGHT FAIL: EKF HIGH IMU ACCEL BIAS

<!-- https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/commander/Arming/PreFlightCheck/checks/ekf2Check.cpp#L267 -->
<!-- Useful primer on biases: https://www.vectornav.com/resources/inertial-navigation-primer/specifications--and--error-budgets/specs-imuspecs -->
<!-- Mathieu Bresciani is expert -->

Зміщення прискорення EKF IMU – це різниця між виміряним прискоренням, яке повідомляє датчик IMU, і очікуваним прискоренням, яке повідомляє оцінювач EKF2 (який об’єднує дані про позицію та/або швидкість з ряду джерел, включаючи IMU, GNSS, датчики потоку тощо). Це зміщення може змінюватися, коли датчик увімкнено (“зміщення увімкнення”) і з часом через шум і різницю температур (“зміщення в роботі”). Число, як правило, має бути дуже малим (близько нуля), що вказує на те, що всі вимірювання з різних джерел збігаються щодо прискорення.

Попередження вказує на те, що зсув перевищує певний довільний поріг (апарату не буде дозволено злетіти). Швидше за все, це ознака того, що потрібне калібрування акселерометру або термокалібрування:

- Якщо ви _інколи_ отримуєте попередження: [повторно відкалібруйте акселерометр](../config/accelerometer.md).
- Якщо ви _регулярно_ отримуєте попередження: виконайте [термокалібрування](../advanced_config/sensor_thermal_calibration.md).
- Якщо ви все ще отримуєте попередження після термального калібрування (або ви не можете виконати термальне калібрування):
  - Переконайтеся, що проблеми не виникають через апаратне забезпечення датчика чи автопілота:
    - Найпростіший спосіб зробити це — перевірити те саме шасі/сенсори з іншим автопілотом.
    - Альтернативно, [запишіть та порівняйте](../dev_log/logging.md#configuration) всі акселерометри в кількох тестових прогонах, увімкнувши `6: Порівняння датчиків` у [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE).
  - Спробуйте змінити параметри налаштування навчання зміщенню акселерометра.

Збільшення параметрів зменшить вірогідність виявлення аномалії автопілотом і може змінити стабільність оцінювача. Однак це може знадобитися, якщо є проблеми з датчиком, які неможливо вирішити іншими засобами (тобто ви можете налаштувати EKF для кращої продуктивності, але неможливо «краще» відкалібрувати акселерометр).

:::warning
Налаштування цих параметрів є крайнім засобом.
Це слід робити, лише якщо у вас є дані, які показують, що це покращить продуктивність оцінювача.
:::

| Параметр                                                                                                  | Опис                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="EKF2_ABL_LIM"></a>[EKF2_ABL_LIM](../advanced_config/parameter_reference.md#EKF2_ABL_LIM)         | Максимальне значення зміщення, яке дозволено оцінити EKF (вище цього значення зміщення буде обрізано, і EKF спробує скинути себе, можливо, навіть переключившись на більш здоровий EKF із робочим IMU у системі з кількома EKF). Автопілот повідомить про «велике зміщення прискорення», якщо оцінене зміщення перевищує 75% цього параметра під час передпольотної перевірки та запобіжить зльоту. Поточне значення 0.4m/s2 вже досить високе, і його збільшення призведе до того, що автопілот виявлятиме проблеми з меншою ймовірністю. |
| <a id="EKF2_ABIAS_INIT"></a>[EKF2_ABIAS_INIT](../advanced_config/parameter_reference.md#EKF2_ABIAS_INIT)   | Початкова невизначеність зміщення (якщо ідеально відкалібровано, це пов’язано зі «зміщенням увімкнення» датчика). Деякі користувачі можуть захотіти зменшити це значення, якщо вони знають, що датчик добре відкалібрований і що зміщення увімкнення невелике.                                                                                                                                                                                                                                                                             |
| <a id="EKF2_ACC_B_NOISE"></a>[EKF2_ACC_B_NOISE](../advanced_config/parameter_reference.md#EKF2_ACC_B_NOISE) | Очікуване «зміщення під час роботи» акселерометра або «як швидко ми очікуємо зміни зсуву за секунду». За замовчуванням це значення достатньо велике, щоб включити дрейф через зміну температури. Якщо IMU відкалібровано за температурою, користувач може захотіти зменшити цей параметр.                                                                                                                                                                                                                                                  |
| <a id="EKF2_ABL_ACCLIM"></a>[EKF2_ABL_ACCLIM](../advanced_config/parameter_reference.md#EKF2_ABL_ACCLIM)   | Максимальне прискорення, при якому оцінювач намагатиметься вивчати зміщення прискорення. Це необхідно для запобігання тому, щоб оцінювач вчився зміщенню через помилки нелінійності та коефіцієнта масштабу. (Майже жоден користувач не має потреби змінювати цей параметр, за винятком випадків, коли він справді знає, що робить).                                                                                                                                                                                                       |


#### PREFLIGHT FAIL: EKF HIGH IMU GYRO BIAS

* Ця помилка виникає, коли зсув гіроскопа IMU, оцінений EKF, є надмірним.
* У цьому випадку надмірне означає, що оцінка зміщення перевищує 10 градусів/с (половина налаштованого обмеження, яке встановлено 20 градусів/с).

#### PREFLIGHT FAIL: ACCEL SENSORS INCONSISTENT - CHECK CALIBRATION

* Це повідомлення про помилку виникає, коли вимірювання прискорення від різних блоків IMU суперечать.
* This check only applies to boards with more than one IMU.
* The check is controlled by the [COM_ARM_IMU_ACC](../advanced_config/parameter_reference.md#COM_ARM_IMU_ACC) parameter.

#### PREFLIGHT FAIL: GYRO SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the angular rate measurements from different IMU units are inconsistent.
* This check only applies to boards with more than one IMU.
* The check is controlled by the [COM_ARM_IMU_GYR](../advanced_config/parameter_reference.md#COM_ARM_IMU_GYR) parameter.

#### PREFLIGHT FAIL: COMPASS SENSORS INCONSISTENT - CHECK CALIBRATION

* This error message is produced when the difference in measurements from different compass sensors is too great.
* It indicates bad calibration, orientation or magnetic interference.
* This check only applies to when more than one compass/magnetometer is connected.
* The check is controlled by the [COM_ARM_MAG_ANG](../advanced_config/parameter_reference.md#COM_ARM_MAG_ANG) parameter.

#### PREFLIGHT FAIL: EKF INTERNAL CHECKS

* This error message is generated if the innovation magnitudes of either the horizontal GPS velocity, magnetic yaw, vertical GPS velocity or vertical position sensor (Baro by default but could be range finder or GPS if non-standard parameters are being used) are excessive. Innovations are the difference between the value predicted by the inertial navigation calculation and measured by the sensor.
* Users should check the innovation levels in the log file to determine the cause. These can be found under the `ekf2_innovations` message. Common problems/solutions include:
  * IMU drift on warmup. May be resolved by restarting the autopilot. May require an IMU accel and gyro calibration.
  * Adjacent magnetic interference combined with vehicle movement. Resolve my moving vehicle and waiting or re-powering.
  * Bad magnetometer calibration combined with vehicle movement. Resolve by recalibrating.
  * Initial shock or rapid movement on startup that caused a bad inertial nav solution. Resolve by restarting the vehicle and minimising movement for the first 5 seconds.


## Інші параметри

The following parameters also affect preflight checks.

#### COM_ARM_WO_GPS

Параметр [COM_ARM_WO_GPS](../advanced_config/parameter_reference.md#COM_ARM_WO_GPS) визначає, чи дозволено взяття під охорону без оцінки загального положення.
- `1` (default): Arming *is* allowed without a position estimate for flight modes that do not require position information (only).
- `0`: Arming is allowed only if EKF is providing a global position estimate and EFK GPS quality checks are passing

