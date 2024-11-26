# Візуальна інерціальна оцінка положення (VIO)

_Visual Inertial Odometry_ (VIO) is a [computer vision](../computer_vision/index.md) technique used for estimating the 3D _pose_ (local position and orientation) and _velocity_ of a moving vehicle relative to a _local_ starting position.
Він зазвичай використовується для навігації транспортного засобу в ситуаціях, коли GPS відсутній або ненадійний (наприклад, у приміщенні або під час прольоту під мостом).

VIO uses [Visual Odometry](https://en.wikipedia.org/wiki/Visual_odometry) to estimate vehicle _pose_ from camera images, combined with inertial measurements from the vehicle IMU (to correct for errors associated with rapid vehicle movement resulting in poor image capture).

Ця тема надає керівництво щодо налаштування PX4 та супутнього комп'ютера для налаштування VIO.

:::info
The suggested setup uses ROS for routing VIO information to PX4.
However, PX4 itself does not care about the source of messages, provided they are provided via the appropriate [MAVLink Interface](../ros/external_position_estimation.md#px4-mavlink-integration).
:::

## Рекомендована настройка

Апаратна та програмна настройка для VIO запропонована в розділах нижче як ілюстрація того, як підключити систему VIO до PX4. Вона використовує готову систему відстеження камери та супутній комп'ютер, що працює під керуванням ROS.
ROS використовується для зчитування інформації про одометрію з камери та подачі її до PX4.

An example of a suitable tracking camera is the [Intel® RealSense™ Tracking Camera T265](../peripherals/camera_t265_vio.md).

### Встановлення камери

Прикріпіть камеру до супутнього комп'ютера та закріпіть її на рамі:

- Прикріпіть камеру з лінзами, спрямованими вниз, якщо це можливо (за замовчуванням).
- Камери зазвичай дуже чутливі до вібрацій; рекомендується використовувати м'яке кріплення (наприклад, за допомогою віброізоляційної піни).

### Налаштування комп'ютера компаньйона

Для налаштування ROS та PX4:

- On the companion computer, install and configure [MAVROS](../ros/mavros_installation.md).

- Реалізуйте та запустіть вузол ROS для зчитування даних з камери та публікації відомостей VIO за допомогою MAVROS.
  - See the [VIO ROS node](#vio_ros_node) section below for details of the requirements for this node.

- Follow the instructions [below](#ekf2_tuning) for tuning the PX4 EKF2 estimator.

- Перевірте підключення до керуючого контролера.

  :::tip
  You can use the _QGroundControl_ [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html) to verify that you're getting `ODOMETRY` or `VISION_POSITION_ESTIMATE` messages (or check for `HEARTBEAT` messages that have the component id 197 (`MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY`)).

:::

- [Verify that VIO is set up correctly](#verify_estimate) before your first flight!

<a id="vio_ros_node"></a>

### ROS VIO вузол

У цьому рекомендованому налаштуванні ROS вузла VIO потрібно

1. інтерфейс з обраною апаратурою камери або сенсора,
2. створити повідомлення відомостей, що містять оцінку позиції, які будуть надіслані до PX4 за допомогою MAVROS, та
3. публікувати повідомлення для вказівки стану системи VIO.

Реалізація вузла ROS буде конкретною для використовуваної камери і буде потребувати розробки для використання відповідного інтерфейсу та драйверів для камери.

The odometry messages should be of the type [`nav_msgs/Odometry`](http://docs.ros.org/en/noetic/api/nav_msgs/html/msg/Odometry.html) and published to the topic `/mavros/odometry/out`.

System status messages of the type [`mavros_msgs/CompanionProcessStatus`](https://github.com/mavlink/mavros/blob/master/mavros_msgs/msg/CompanionProcessStatus.msg) should be published to the topic `/mavros/companion_process/status`. These should identify the component as `MAV_COMP_ID_VISUAL_INERTIAL_ODOMETRY` (197) and indicate the `state` of the system. Рекомендовані значення статусу:

- `MAV_STATE_ACTIVE` when the VIO system is functioning as expected,
- `MAV_STATE_CRITICAL` when the VIO system is functioning, but with low confidence, and
- `MAV_STATE_FLIGHT_TERMINATION` when the system has failed or the estimate confidence is unacceptably low.

<a id="ekf2_tuning"></a>

### Вдосконалення

Наступні параметри повинні бути задані для використання зовнішньої позиції з EKF2.

| Параметр                                                                                                                                                                                                                                                                                                                                                                                                                  | Налаштування для Зовнішньої Оцінки Положення                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [EKF2_EV_CTRL](../advanced_config/parameter_reference.md#EKF2_EV_CTRL)                                                                                                                                                                                                                                                                                                          | Set _horizontal position fusion_, _vertical vision fusion_, _velocity fusion_, and _yaw fusion_ according to your desired fusion model.                  |
| [EKF2_HGT_REF](../advanced_config/parameter_reference.md#EKF2_HGT_REF)                                                                                                                                                                                                                                                                                                          | Set to _Vision_ to use the vision as the reference sensor for altitude estimation.                                                                       |
| [EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY)                                                                                                                                                                                                                                                                                                        | Встановіть різницю між міткою часу вимірювання та "фактичним" часом захоплення. For more information see [below](#tuning-EKF2_EV_DELAY). |
| [EKF2_EV_POS_X](../advanced_config/parameter_reference.md#EKF2_EV_POS_X), [EKF2_EV_POS_Y](../advanced_config/parameter_reference.md#EKF2_EV_POS_Y), [EKF2_EV_POS_Z](../advanced_config/parameter_reference.md#EKF2_EV_POS_Z) | Встановіть положення візуального датчика відносно корпусу транспортного засобу.                                                                          |

These can be set in _QGroundControl_ > **Vehicle Setup > Parameters > EKF2** (remember to reboot the flight controller in order for parameter changes to take effect).

For more detailed/additional information, see: [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system).

<a id="tuning-EKF2_EV_DELAY"></a>

#### Налаштування EKF2_EV_DELAY

[EKF2_EV_DELAY](../advanced_config/parameter_reference.md#EKF2_EV_DELAY) is the _Vision Position Estimator delay relative to IMU measurements_.
Іншими словами, це різниця між міткою часу візійної системи та "фактичним" часом захоплення, який був би записаний годинником IMU (тобто "базовий годинник" для EKF2).

Технічно це може бути встановлено на 0, якщо є правильне відміткове (не тільки час прибуття) та синхронізація часу (наприклад, за допомогою NTP) між MoCap та (наприклад) комп'ютерами ROS.
На практиці це може потребувати емпіричного налаштування, оскільки затримки в ланцюгу зв'язку дуже специфічні для конкретного обладнання.
Рідко коли система налаштована з повністю синхронізованим ланцюгом!

Приблизна оцінка затримки може бути отримана з журналів, перевіряючи зсув між частотами IMU та частотами EV:

![ekf2\_ev\_delay log](../../assets/ekf2/ekf2_ev_delay_tuning.png)

:::info
A plot of external data vs. onboard estimate (as above) can be generated using [FlightPlot](../log/flight_log_analysis.md#flightplot) or similar flight analysis tools.
:::

Значення можна додатково налаштувати, змінюючи параметр, щоб знайти значення, яке дає найнижчі інновації EKF під час динамічних маневрів.

<a id="verify_estimate"></a>

## Перевірка/підтвердження оцінки VIO

:::info
The [MAV_ODOM_LP](../advanced_config/parameter_reference.md#MAV_ODOM_LP) parameter mentioned below was removed in PX4 v1.14.
Цей розділ потрібно оновити. <!-- https://github.com/PX4/PX4-Autopilot/pull/20501#issuecomment-1993788815 -->
:::

Perform the following checks to verify that VIO is working properly _before_ your first flight:

- Set the PX4 parameter `MAV_ODOM_LP` to `1`.
  PX4 will then stream back the received external pose as MAVLink [ODOMETRY](https://mavlink.io/en/messages/common.html#ODOMETRY) messages.
  You can check these MAVLink messages with the _QGroundControl_ [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html)
- Yaw the vehicle until the quaternion of the `ODOMETRY` message is very close to a unit quaternion (w=1, x=y=z=0).
  - На цьому етапі корпус виробу зорієнтований у відповідності з ориєнтацією відносно зовнішньої системи координат.
  - Якщо вам не вдається отримати кватерніон, близький до одиничного, без обертання або нахилу вашого літака, це, ймовірно, означає, що ваша рама все ще має зміщення нахилу або кочування.
    У цьому випадку не продовжуйте і перевірте знову свої координатні рамки.
- Після зорієнтування ви можете підняти літак з землі, і ви маєте бачити, як координата z позиції зменшується.
  Переміщення літака вперед повинно збільшувати координату x позиції, а переміщення вправо - збільшувати координату y.
  Переміщення засобу праворуч повинно збільшити координату Y.
- Check that linear velocities in the message are expressed in the _FRD_ body frame reference frame.
- Set the PX4 parameter `MAV_ODOM_LP` back to 0.
  PX4 will stop streaming the `ODOMETRY` message back.

Якщо ці кроки є послідовними, ви можете спробувати свій перший польот:

1. Put the vehicle on the ground and start streaming `ODOMETRY` feedback (as above).
   Потягніть палицю газу вниз і зберметизуйте двигуни.

   На цьому етапі, зліва палиця на найнижчому положенні, перейдіть у режим позиціонного контролю.
   Ви повинні побачити зелену лампочку.
   Зелена лампочка свідчить про те, що доступний зворотний зв'язок позиції, і позиційний контроль активований.

2. Покладіть палицю газу в середину (мертву зону), щоб літак підтримував свою висоту.
   Підняття палиці збільшить висоту посилки, тоді як зниження значення зменшить її.
   Так само, інша палиця змінить положення над землею.

3. Збільшуйте значення перемикача газу, і літак злетить. Відразу після цього поверніть його в середину.

4. Переконайтеся, що літак може утримувати свою позицію.

## Усунення проблем

Спочатку переконайтеся, що MAVROS успішно підключається до автопілота.

Якщо підключення відбувається належним чином, можливі проблеми/рішення:

- **Problem:** I get drift / flyaways when the drone flies, but not when I carry it around with the props off.

  - If using the [T265](../peripherals/camera_t265_vio.md) try soft-mounting it (this camera is very sensitive to high-frequency vibrations).

- **Problem:** I get toilet-bowling when VIO is enabled.

  - Переконайтеся, що орієнтація камери відповідає трансформації в запущеному файлі.
    Use the _QGroundControl_ [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html) to verify that the velocities in the `ODOMETRY` message coming from MAVROS are aligned to the FRD coordinate system.

- **Problem:** I want to use vision position to do loop closing, and also want to run GPS.
  - Це дійсно складно, оскільки коли вони не збігаються, це збентежить EKF.
    За результатами тестування, надійніше використовувати візійну швидкість (якщо ви знайдете спосіб зробити цю конфігурацію надійною, дайте нам знати).

## Інформація для розробників

Developers who are interested in extending this implementation (or writing a different one, which might not depend on ROS) should see [Using Vision or Motion Capture Systems for Position Estimation](../ros/external_position_estimation.md).

Ця тема також пояснює, як налаштувати VIO для використання з оцінювачем LPE (застарілим).

## Подальша інформація

- [ECL/EKF Overview & Tuning > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
