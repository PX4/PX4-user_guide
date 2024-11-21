# Комп'ютерний зір (оптичний потік, MoCap, VIO, уникання)

[Computer vision](https://en.wikipedia.org/wiki/Computer_vision) techniques enable computers to use visual data to make sense of their environment.

PX4 uses computer vision systems (primarily running on [Companion Computers](../companion_computer/index.md)) in order to support the following features:

- [Optical Flow](#optical-flow) provides 2D velocity estimation (using a downward facing camera and a downward facing distance sensor).
- [Motion Capture](#motion-capture) provides 3D pose estimation using a vision system that is _external_ to the vehicle.
  Це переважно використовується для внутрішньої навігації.
- [Visual Inertial Odometry](#visual-inertial-odometry-vio) provides 3D pose and velocity estimation using an onboard vision system and IMU.
  Це використовується для навігації в тих випадках, коли інформація про позицію GNSS відсутня або ненадійна.
- [Collision Prevention](../computer_vision/collision_prevention.md) is used to stop vehicles before they can crash into an obstacle (primarily when flying in manual modes).

:::tip
The [PX4 Vision Autonomy Development Kit](../complete_vehicles_mc/px4_vision_kit.md) (Holybro) is a robust and inexpensive kit for developers working with computer vision on PX4.
:::

## Захоплення руху

Motion Capture (MoCap) is a technique for estimating the 3D _pose_ (position and orientation) of a vehicle using a positioning mechanism that is _external_ to the vehicle.
Системи захоплення руху найчастіше виявляють рух за допомогою інфрачервоних камер, але також можуть використовуватися інші типи камер, лідар або ультраширокосмуговий радіорухометр (УШР).

:::info
MoCap is commonly used to navigate a vehicle in situations where GPS is absent (e.g. indoors), and provides position relative to a _local_ coordinate system.
:::

Для отримання інформації про MoCap, перегляньте:

- [External Position Estimation](../ros/external_position_estimation.md)
- [Flying with Motion Capture (VICON, NOKOV, Optitrack)](../tutorials/motion-capture.md)
- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)

## Візуальна інерційна одометрія (VIO)

Visual Inertial Odometry (VIO) is used for estimating the 3D _pose_ (position and orientation) and _velocity_ of a moving vehicle relative to a _local_ starting position.
Часто використовується для навігації транспортного засобу в ситуаціях, де GPS відсутній (наприклад, всередині приміщень) або ненадійний (наприклад, при польоті під мостом).

VIO uses [Visual Odometry](https://en.wikipedia.org/wiki/Visual_odometry) to estimate vehicle _pose_ from visual information, combined with inertial measurements from an IMU (to correct for errors associated with rapid vehicle movement resulting in poor image capture).

:::info
One difference between VIO and [MoCap](#motion-capture) is that VIO cameras/IMU are vehicle-based, and additionally provide velocity information.
:::

Для отримання інформації щодо налаштування VIO на PX4 дивіться:

- [EKF > External Vision System](../advanced_config/tuning_the_ecl_ekf.md#external-vision-system)
- [T265 Setup guide](../peripherals/camera_t265_vio.md)

## Optical Flow

[Optical Flow](../sensor/optical_flow.md) provides 2D velocity estimation (using a downward facing camera and a downward facing distance sensor).

Для отримання інформації про оптичний потік, перегляньте:

- [Optical Flow](../sensor/optical_flow.md)
- [EKF > Optical Flow](../advanced_config/tuning_the_ecl_ekf.md#optical-flow)

## Порівняння

### Оптичний потік та VIO для оцінки локального положення

Обидва методи використовують камери і вимірюють різницю між кадрами.Оптичний потік використовує камеру, спрямовану вниз, тоді як VIO використовує стереокамеру або камеру з відстеженням під кутом 45 градусів.Припускаючи, що обидва методи добре калібруються, який з них краще для оцінки локального положення?

The consensus [appears to be](https://discuss.px4.io/t/vio-vs-optical-flow/34680):

Оптичний потік:

- Оптичний потік, спрямований вниз, надає вам планарну швидкість, яка коригується на кутову швидкість за допомогою гіроскопа.
- Вимагає точної відстані до землі і передбачає планарну поверхню.Враховуючи ці умови, це може бути настільки ж точним / надійним, як VIO (для польотів у приміщенні)
- Має більшу надійність, оскільки має менше станів, ніж VIO.
- Значно дешевший і легший у налаштуванні оскільки для цього потрібен лише датчик оптичного потоку, дальномір та налаштування кількох параметрів (які можна підключити до керуючого пристрою польоту).

VIO:

- Дорожче придбати і складніше налаштувати.Потребує окремий супутній комп'ютер, калібрування, програмне забезпечення, конфігурацію та інше.
- Буде менш ефективним, якщо відсутні точкові особливості для відстеження (на практиці реальний світ зазвичай має точкові особливості).
- Більш гнучкий і дозволяє додаткові функції, такі як уникання перешкод і картографування.

Комбінація (об'єднання обох) ймовірно найбільш надійна, хоча не обов'язкова в більшості реальних сценаріїв.Зазвичай ви оберете систему, яка відповідає вашому робочому середовищу, потрібним функціям та обмеженням вартості:

- Використовуйте VIO якщо ви плануєте летіти на відкритому повітрі без GPS (або на відкритому повітрі) або якщо вам потрібно підтримати уникання перешкоди та інші функції зору комп'ютера.
- Використовувати оптичний потік, якщо ви плануєте лише літати в приміщенні (без GPS) і вартість є важливою.

## Додаткові ресурси

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 simulation environment for computer vision.
  The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
