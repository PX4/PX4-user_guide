# Візуально-інерційна одометрія (VIO)

_Візуальна інерціальна одометрія_ (VIO) — це техніка [комп’ютерного бачення](../computer_vision/README.md), яка використовується для оцінки тривимірної _пози_ (локального положення та орієнтації) і _швидкості< /0> транспортного засобу, що рухається, відносно _локальної_ вихідної позиції. Він зазвичай використовується для навігації транспортного засобу в ситуаціях, коли GPS відсутній або ненадійний (наприклад, у приміщенні або під час прольоту під мостом).</p>

VIO використовує [Візуальну одометрію](https://en.wikipedia.org/wiki/Visual_odometry) для оцінки _позиції_ транспортного засобу на основі зображень із камери в поєднанні з інерційними вимірюваннями з IMU транспортного засобу (щоб виправити помилки, пов’язані зі швидким рухом транспортного засобу, що призводить до поганого захоплення зображення).

Ця тема надає керівництво щодо налаштування PX4 та супутнього комп'ютера для налаштування VIO.

:::note
Рекомендоване налаштування використовує ROS для передачі інформації VIO до PX4. Однак сам PX4 не цікавиться джерелом повідомлень, якщо вони надаються через відповідний [інтерфейс MAVLink](../ros/external_position_estimation.md#px4-mavlink-integration).
:::

## Рекомендована настройка

Апаратна та програмна настройка для VIO запропонована в розділах нижче як ілюстрація того, як підключити систему VIO до PX4. Вона використовує готову систему відстеження камери та супутній комп'ютер, що працює під керуванням ROS. ROS використовується для зчитування інформації про одометрію з камери та подачі її до PX4.

Прикладом підходящої відстежуючої камери є камера відстеження [Intel® RealSense™ T265](../peripherals/camera_t265_vio.md).

### Встановлення камери

Прикріпіть камеру до супутнього комп'ютера та закріпіть її на рамі:

- Прикріпіть камеру з лінзами, спрямованими вниз, якщо це можливо (за замовчуванням).
- Камери зазвичай дуже чутливі до вібрацій; рекомендується використовувати м'яке кріплення (наприклад, за допомогою віброізоляційної піни).

### Налаштування комп'ютера компаньйона

To setup ROS and PX4:

- On the companion computer, install and configure [MAVROS](../ros/mavros_installation.md).
- Implement and run a ROS node to read data from the camera and publish the VIO odometry using MAVROS.
  - See the [VIO ROS node](#vio_ros_node) section below for details of the requirements for this node.
- Follow the instructions [below](#ekf2_tuning) for tuning the PX4 EKF2 estimator.
- Verify the connection to the flight controller.

:::tip
You can use the _QGroundControl_ [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html) to verify that you're getting `ODOMETRY` or `VISION_POSITION_ESTIMATE` messages (or check for `HEARTBEAT` messages that have the component id 197 (`MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY`)).
:::

- [Verify that VIO is set up correctly](#verify_estimate) before your first flight!

<a id="vio_ros_node"></a>

### ROS VIO node

У цьому рекомендованому налаштуванні ROS вузла VIO потрібно

1. інтерфейс з обраною апаратурою камери або сенсора,
2. створити повідомлення відомостей, що містять оцінку позиції, які будуть надіслані до PX4 за допомогою MAVROS, та
3. публікувати повідомлення для вказівки стану системи VIO.

Реалізація вузла ROS буде конкретною для використовуваної камери і буде потребувати розробки для використання відповідного інтерфейсу та драйверів для камери.

Повідомлення відомостей повинні бути типу [`nav_msgs/Odometry`](http://docs.ros.org/en/noetic/api/nav_msgs/html/msg/Odometry.html) та публікуватися на темі `/mavros/odometry/out`.

Повідомлення стану системи типу [`mavros_msgs/CompanionProcessStatus`](https://github.com/mavlink/mavros/blob/master/mavros_msgs/msg/CompanionProcessStatus.msg) повинні публікуватися на темі `/mavros/companion_process/status`. These should identify the component as `MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY` (197) and indicate the `state` of the system. Рекомендовані значення статусу:

- `MAV_STATE_ACTIVE` when the VIO system is functioning as expected,
- `MAV_STATE_CRITICAL` when the VIO system is functioning, but with low confidence, and
- `MAV_STATE_FLIGHT_TERMINATION` when the system has failed or the estimate confidence is unacceptably low.

<a id="ekf2_tuning"></a>

### PX4 Tuning

The following parameters must be set to use external position information with EKF2.

| Parameter                                                                                                                                                                                                                          | Setting for External Position Estimation                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [EKF2_EV_CTRL](../advanced_config/parameter_reference.md#EKF2_EV_CTRL)                                                                                                                                                           | Set _horizontal position fusion_, _vertical vision fusion_, _velocity fusion_, and _yaw fusion_ according to your desired fusion model.                |
| [EKF2_HGT_REF](../advanced_config/parameter_reference.md#EKF2_HGT_REF)                                                                                                                                                           | Set to _Vision_ to use the vision as the reference sensor for altitude estimation.                                                                     |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                         | Set to the difference between the timestamp of the measurement and the "actual" capture time. For more information see [below](#tuning-EKF2_EV_DELAY). |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | Set the position of the vision sensor with respect to the vehicle's body frame.                                                                        |

These can be set in _QGroundControl_ > **Vehicle Setup > Parameters > EKF2** (remember to reboot the flight controller in order for parameter changes to take effect).

For more detailed/additional information, see: [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system).

<a id="tuning-EKF2_EV_DELAY"></a>

#### Tuning EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY) - це _затримка оцінювача позиції за допомогою візійної системи відносно вимірювань_. Іншими словами, це різниця між міткою часу візійної системи та "фактичним" часом захоплення, який був би записаний годинником IMU (тобто "базовий годинник" для EKF2).

Технічно це може бути встановлено на 0, якщо є правильне відміткове (не тільки час прибуття) та синхронізація часу (наприклад, за допомогою NTP) між MoCap та (наприклад) комп'ютерами ROS. На практиці це може потребувати емпіричного налаштування, оскільки затримки в ланцюгу зв'язку дуже специфічні для конкретного обладнання. Рідко коли система налаштована з повністю синхронізованим ланцюгом!

Приблизна оцінка затримки може бути отримана з журналів, перевіряючи зсув між частотами IMU та частотами EV:

![ekf2_ev_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::note
Графік зовнішніх даних проти вбудованої оцінки (як вище) може бути створений за допомогою [FlightPlot](../log/flight_log_analysis.md#flightplot) або подібних засобів аналізу польоту.
:::

Значення може бути подальшим налаштоване шляхом зміни параметра для знаходження значення, яке дає найменші інновації EKF під час динамічних маневрів.

<a id="verify_estimate"></a>

## Перевірка/підтвердження оцінки VIO

::: note
Параметр [MAV_ODOM_LP](../advanced_config/parameter_reference.md#MAV_ODOM_LP), згаданий нижче, був вилучений у PX4 v1.14. Цей розділ потрібно оновити. <!-- https://github.com/PX4/PX4-Autopilot/pull/20501#issuecomment-1993788815 -->
:::

Виконайте наступні перевірки, щоб переконатися, що VIO працює належним чином _перед_ першим польотом:

- Встановіть параметр PX4 `MAV_ODOM_LP` на `1`. Після цього PX4 буде передавати отриману зовнішню позицію у вигляді повідомлень MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY). Ви можете перевірити ці повідомлення MAVLink за допомогою [інспектора MAVLink ](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html) в _QGroundControl_
- Поверніть літак так, щоб кватерніон повідомлення `ODOMETRY` був дуже близьким до одиничного кватерніону (w=1, x=y=z=0).
  - На цьому етапі корпус виробу зорієнтований у відповідності з ориєнтацією відносно зовнішньої системи координат.
  - Якщо вам не вдається отримати кватерніон, близький до одиничного, без обертання або нахилу вашого літака, це, ймовірно, означає, що ваша рама все ще має зміщення нахилу або кочування. У цьому випадку не продовжуйте і перевірте знову свої координатні рамки.
- Після зорієнтування ви можете підняти літак з землі, і ви маєте бачити, як координата z позиції зменшується. Переміщення літака вперед повинно збільшувати координату x позиції, а переміщення вправо - збільшувати координату y. Переміщення засобу праворуч повинно збільшити координату Y.
- Перевірте, що лінійні швидкості у повідомленні виражені в описаній відносно корпусу _FRD_ відліковій системі.
- Встановіть параметр PX4 `MAV_ODOM_LP` назад на 0. PX4 припинить передавати повідомлення `ODOMETRY` назад.

Якщо ці кроки є послідовними, ви можете спробувати свій перший польот:

1. Покладіть літак на землю і почніть передавати зворотний зв'язок `ODOMETRY` (як вище). Потягніть палицю газу вниз і зберметизуйте двигуни.

   На цьому етапі, зліва палиця на найнижчому положенні, перейдіть у режим позиціонного контролю. Ви повинні побачити зелену лампочку. Зелена лампочка свідчить про те, що доступний зворотний зв'язок позиції, і позиційний контроль активований.

1. Покладіть палицю газу в середину (мертву зону), щоб літак підтримував свою висоту. Підняття палиці збільшить висоту посилки, тоді як зниження значення зменшить її. Так само, інша палиця змінить положення над землею.
1. Збільшуйте значення перемикача газу, і літак злетить. Відразу після цього поверніть його в середину.
1. Переконайтеся, що літак може утримувати свою позицію.

## Відстеження проблем

Спочатку переконайтеся, що MAVROS успішно підключається до автопілота.

Якщо підключення відбувається належним чином, можливі проблеми/рішення:

- **Проблема:** У мене виникає дрейф / відліт дрона, коли він літає, але не коли я несу його без пропелерів.

  - Якщо використовуєте [T265](../peripherals/camera_t265_vio.md), спробуйте його м'яко кріпити (ця камера дуже чутлива до високочастотних вібрацій).

- **Проблема:** У мене виникає "туалетний боулінг", коли ввімкнено VIO.

  - Переконайтеся, що орієнтація камери відповідає трансформації в запущеному файлі. Використовуйте Інспектор MAVLink _QGroundControl_, щоб перевірити, що швидкості в повідомленні `ODOMETRY`, що надходить від MAVROS, вирівнані з системою координат FRD.

- **Проблема:** Я хочу використовувати позицію зору для замикання петель, і також хочу запустити GPS.
  - Це дійсно складно, оскільки коли вони не збігаються, це збентежить EKF. За результатами тестування, надійніше використовувати візійну швидкість (якщо ви знайдете спосіб зробити цю конфігурацію надійною, дайте нам знати).

## Інформація для розробників

Розробники, які зацікавлені в розширенні цієї реалізації (або написанні іншої, яка може не залежати від ROS), повинні подивитися [використання візійних або систем відстеження руху для оцінки позиції.](../ros/external_position_estimation.md).

Ця тема також пояснює, як налаштувати VIO для використання з оцінювачем LPE (застарілим).

## Додаткова інформація

- [Огляд та налаштування & ECL/EKF > Зовнішня візійна система](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
