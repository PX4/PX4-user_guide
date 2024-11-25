# Optical Flow

_Optical Flow_ uses a downward facing camera and a downward facing distance sensor for velocity estimation.
It can be used to determine speed when navigating without GNSS — in buildings, underground, or in any other GNSS-denied environment.

The video below shows PX4 holding position using the [Ark Flow](#ark-flow) sensor for velocity estimation in [Position Mode](../flight_modes_mc/position.md):

<lite-youtube videoid="aPQKgUof3Pc" title="ARK Flow with PX4 Optical Flow Position Hold"/>

<!-- ARK Flow with PX4 Optical Flow Position Hold: 20210605 -->

The image below shows an optical flow setup with a separate flow sensor ([PX4Flow](../sensor/px4flow.md)) and distance sensor ([Lidar-Lite](../sensor/lidar_lite.md)):

![Optical flow lidar attached](../../assets/hardware/sensors/optical_flow/flow_lidar_attached.jpg)

## Установка

An Optical Flow setup requires a downward facing camera and a downward facing [distance sensor](../sensor/rangefinders.md) (preferably a LiDAR).
These can be combined in a single product, such as the [Ark Flow](#ark-flow), or they may be separate sensors.

The sensor(s) can be connected via MAVLink, I2C or any other bus that supports the peripheral.

:::info
If connected to PX4 via MAVLink the Optical Flow camera sensor must publish the [OPTICAL_FLOW_RAD](https://mavlink.io/en/messages/common.html#OPTICAL_FLOW_RAD) message, and the distance sensor must publish the [DISTANCE_SENSOR](https://mavlink.io/en/messages/common.html#DISTANCE_SENSOR) message.
The information is written to the corresponding uORB topics: [DistanceSensor](../msg_docs/DistanceSensor.md) and [ObstacleDistance](../msg_docs/ObstacleDistance.md).
:::

Вихід потоку при руху в різних напрямках повинен бути наступним:

| Рух транспортного засобу | Інтегрований потік |
| ------------------------ | ------------------ |
| Вперед                   | + Y                |
| Назад                    | - Y                |
| Справа                   | - X                |
| Зліва                    | + X                |

For pure rotations the `integrated_xgyro` and `integrated_x` (respectively `integrated_ygyro` and `integrated_y`) have to be the same.

Дані сенсора від пристрою оптичного потоку об'єднуються з іншими джерелами даних швидкості.
The approach used for fusing sensor data and any offsets from the center of the vehicle must be configured in the [estimator](#estimators).

## Датчики потоку/Камери

### ARK Flow

[ARK Flow](../dronecan/ark_flow.md) is a [DroneCAN](../dronecan/index.md) optical flow sensor, [distance sensor](../sensor/rangefinders.md), and IMU.
В ньому є оптичний датчик потоку PAW3902, оптичний датчик відстані Broadcom AFBR-S50LV85D на відстані 30 метрів та ІМП-датчик BMI088.

### Датчики на основі PMW3901

[PMW3901](../sensor/pmw3901.md) is an optical flow tracking sensor similar to what you would find in a computer mouse, but adapted to work between 80 mm and infinity.
Він використовується в ряді продуктів, включаючи деякі від: Bitcraze, Tindie, Hex, Thone та Alientek.

### Інші Камери/Сенсори

Також можна використовувати дошку/квадрокоптер, яка має вбудовану камеру.
For this the [Optical Flow repo](https://github.com/PX4/OpticalFlow) can be used (see also [snap_cam](https://github.com/PX4/snap_cam)).

## Далекомір

You can use any supported [distance sensor](../sensor/rangefinders.md).
Проте ми рекомендуємо використовувати LIDAR замість зондів сонар, через їхню надійність та точність.

## Естіматори

Оцінювачі об'єднують дані з датчика оптичного потоку та інших джерел.
Налаштування для виконання злиття, а також відносні зсуви до центру транспортного засобу повинні бути вказані для використаного оцінювача.

Зміщення обчислюються відносно орієнтації транспортного засобу та центру, як показано нижче:

![Optical Flow offsets](../../assets/hardware/sensors/optical_flow/px4flow_offset.png)

Optical Flow based navigation is enabled by both [EKF2](#ekf2) and LPE (deprecated).

### Extended Kalman Filter (EKF2) {#ekf2}

For optical flow fusion using EKF2, set [EKF2_OF_CTRL](../advanced_config/parameter_reference.md#EKF2_OF_CTRL).

Якщо ваш оптичний датчик потоку зміщений від центру транспортного засобу, ви можете встановити це за допомогою наступних параметрів.

| Параметр                                                                                                                                                          | Опис                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="EKF2_OF_POS_X"></a>[EKF2_OF_POS_X](../advanced_config/parameter_reference.md#EKF2_OF_POS_X) | Позиція X оптичного потоку фокусної точки в системі тіла (за замовчуванням 0.0 м). |
| <a id="EKF2_OF_POS_Y"></a>[EKF2_OF_POS_Y](../advanced_config/parameter_reference.md#EKF2_OF_POS_Y) | Позиція Y оптичного потоку фокусної точки в системі тіла (за замовчуванням 0.0 м). |
| <a id="EKF2_OF_POS_Z"></a>[EKF2_OF_POS_Z](../advanced_config/parameter_reference.md#EKF2_OF_POS_Z) | Позиція Z оптичного потоку фокусної точки в системі тіла (за замовчуванням 0.0 м). |

See [Using the ECL EKF > Optical flow](../advanced_config/tuning_the_ecl_ekf.md#optical-flow) for more information.
