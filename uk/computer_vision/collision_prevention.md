# Запобігання зіткненням

_Collision Prevention_ may be used to automatically slow and stop a vehicle before it can crash into an obstacle.

It can be enabled for multicopter vehicles in [Position mode](../flight_modes_mc/position.md), and can use sensor data from an offboard companion computer, offboard rangefinders over MAVLink, a rangefinder attached to the flight controller, or any combination of the above.

Запобігання зіткненням може обмежити максимальну швидкість автомобіля, якщо радіус дії датчика недостатньо великий!
Він також запобігає руху в тих напрямках, де немає даних з датчиків (тобто, якщо у вас немає даних з заднього датчика, ви не зможете летіти назад).

:::tip
If high flight speeds are critical, consider disabling collision prevention when not needed.
:::

:::tip
Ensure that you have sensors/sensor data in all directions that you want to fly (when collision prevention is enabled).
:::

## Загальний огляд

_Collision Prevention_ is enabled on PX4 by setting the parameter for minimum allowed approach distance ([CP_DIST](#CP_DIST)).

The feature requires obstacle information from an external system (sent using the MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message) and/or a [distance sensor](../sensor/rangefinders.md) connected to the flight controller.

:::info
Multiple sensors can be used to get information about, and prevent collisions with, objects _around_ the vehicle.
If multiple sources supply data for the _same_ orientation, the system uses the data that reports the smallest distance to an object.
:::

Транспортний засіб обмежує максимальну швидкість, щоб сповільнитися, коли він наближається до перешкод, і припиняє рух, коли досягає мінімально допустимої дистанції.
Для того, щоб відійти від перешкоди (або паралельно їй), користувач повинен наказати транспортному засобу рухатися до заданої точки, яка не наближає транспортний засіб до перешкоди.
Алгоритм внесе незначні корективи в напрямок заданого значення, якщо буде визначено, що "краще" значення існує в межах фіксованого запасу по обидва боки від запитуваного заданого значення.

Users are notified through _QGroundControl_ while _Collision Prevention_ is actively controlling velocity setpoints.

Налаштування програмного забезпечення PX4 оглянуто в наступному розділі.
If you are using a distance sensor attached to your flight controller for collision prevention, it will need to be attached and configured as described in [PX4 Distance Sensor](#rangefinder).
If you are using a companion computer to provide obstacle information see [companion setup](#companion).

## PX4 Налаштування (програмного забезпечення)

Configure collision prevention by [setting the following parameters](../advanced_config/parameters.md) in _QGroundControl_:

| Параметр                                                                                                                                                          | Опис                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)                                                             | Встановіть мінімально допустиму відстань (найближчу відстань, на яку транспортний засіб може наблизитися до перешкоди). Set negative to disable _collision prevention_. <br>> **Warning** This value is the distance to the sensors, not the outside of your vehicle or propellers. Не забудьте залишити безпечний запас! |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)                                                          | Встановіть затримку датчика та відстеження швидкості. See [Delay Tuning](#delay_tuning) below.                                                                                                                                                                                                                                                               |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)                         | Встановіть кут (в обидві сторони від заданого напрямку), в межах якого транспортний засіб може відхилитися, якщо знайде менше перешкод у цьому напрямку. See [Guidance Tuning](#angle_change_tuning) below.                                                                                                                               |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | Set to 1 to allow the vehicle to move in directions where there is no sensor coverage (default is 0/`False`).                                                                                                                                                                                                                                             |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)                         | Set to `Direct velocity` or `Smoothed velocity` to enable Collision Prevention in Position Mode (default is `Acceleration based`).                                                                                                                                                                                                                        |

## Опис алгоритму

Дані з усіх датчиків об'єднуються у внутрішнє представлення 36 секторів навколо транспортного засобу, кожен з яких містить або дані датчика та інформацію про час останнього спостереження, або вказівку на те, що дані для сектора відсутні.
Коли транспортний засіб отримує команду рухатися в певному напрямку, перевіряються всі сектори в півкулі цього напрямку, щоб побачити, чи не наблизить цей рух транспортний засіб до будь-яких перешкод.
Якщо так, то швидкість транспортного засобу буде обмежена.

This velocity restriction takes into account both the inner velocity loop tuned by [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P), as well as the [jerk-optimal velocity controller](../config_mc/mc_jerk_limited_type_trajectory.md) via [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) and [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR).
The velocity is restricted such that the vehicle will stop in time to maintain the distance specified in [CP_DIST](#CP_DIST).
Також враховується дальність дії датчиків для кожного сектора, що обмежує швидкість за тим же механізмом.

:::info
If there is no sensor data in a particular direction, velocity in that direction is restricted to 0 (preventing the vehicle from crashing into unseen objects).
If you wish to move freely into directions without sensor coverage, this can be enabled by setting [CP_GO_NO_DATA](#CP_GO_NO_DATA) to 1.
:::

Delay, both in the vehicle tracking velocity setpoints and in receiving sensor data from external sources, is conservatively estimated via the [CP_DELAY](#CP_DELAY) parameter.
This should be [tuned](#delay_tuning) to the specific vehicle.

If the sectors adjacent to the commanded sectors are 'better' by a significant margin, the direction of the requested input can be modified by up to the angle specified in [CP_GUIDE_ANG](#CP_GUIDE_ANG).
Це допомагає точно налаштувати вхідні дані користувача, щоб "вести" транспортний засіб навколо перешкод, а не застрявати на них.

### Втрата даних про дальність

If the autopilot does not receive range data from any sensor for longer than 0.5s, it will output a warning _No range data received, no movement allowed_.
Це змусить встановити швидкість у ху до нуля.
After 5 seconds of not receiving any data, the vehicle will switch into [HOLD mode](../flight_modes_mc/hold.md).
If you want the vehicle to be able to move again, you will need to disable Collision Prevention by either setting the parameter [CP_DIST](#CP_DIST) to a negative value, or switching to a mode other than [Position mode](../flight_modes_mc/position.md) (e.g. to _Altitude mode_ or _Stabilized mode_).

Якщо у вас підключено кілька датчиків і ви втратили зв'язок з одним з них, ви все одно зможете літати в полі зору (FOV) датчиків, що звітують.
Дані несправного датчика втратять чинність, а область, що покривається цим датчиком, буде вважатися непокритою, тобто ви не зможете там пересуватися.

:::warning
Be careful when enabling [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), which allows the vehicle to fly outside the area with sensor coverage.
Якщо ви втратите зв'язок з одним з декількох датчиків, зона, яку охоплює несправний датчик, також буде вважатися відкритою, і ви зможете пересуватися там без обмежень.
:::

### CP_DELAY Delay Tuning {#delay_tuning}

There are two main sources of delay which should be accounted for: _sensor delay_, and vehicle _velocity setpoint tracking delay_.
Both sources of delay are tuned using the [CP_DELAY](#CP_DELAY) parameter.

The _sensor delay_ for distance sensors connected directly to the flight controller can be assumed to be 0.
Для зовнішніх систем на основі зору затримка датчика може досягати 0,2 с.

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop.
Затримка між фактичною швидкістю та заданою швидкістю може бути виміряна з лог-файлів.
Зазвичай затримка відстеження становить від 0,1 до 0,5 секунди, в залежності від розміру транспортного засобу та налаштувань.

:::tip
If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.
:::

### CP_GUIDE_ANG Guidance Tuning {#angle_change_tuning}

Залежно від транспортного засобу, типу середовища та навичок пілота можуть бути вимоги щодо різних рівнів керування.
Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded.
Збільшення цього параметра дозволить транспортному засобу вибирати оптимальні напрямки для уникнення перешкод, що полегшує прохід через вузькі проміжки і точне збереження мінімальної відстані при об'єзді об'єктів.

Якщо цей параметр занадто малий, транспортний засіб може відчуватися "застряглим" біля перешкод, оскільки дозволено тільки рух від перешкод на мінімальній відстані.
Якщо параметр занадто великий, транспортний засіб може відчуватися, як "слайд", віддаляючись від перешкод в напрямках, які не задані оператором.
Згідно з тестуванням, 30 градусів - це хороший баланс, хоча різні транспортні засоби можуть мати різні вимоги.

:::info
The guidance feature will never direct the vehicle in a direction without sensor data.
Якщо транспортний засіб відчуває "застряглим" з одним лише датчиком відстані, що спрямованим вперед, це, ймовірно, через те, що керування не може безпечно адаптувати напрямок через відсутність інформації.
:::

## PX4 Distance Sensor {#rangefinder}

### Lanbao PSK-CM8JL65-CC5

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

### LightWare LiDAR SF45 Поворотний лідар

PX4 v1.14 (and later) supports the [LightWare LiDAR SF45](https://www.lightwarelidar.com/shop/sf45-b-50-m/) rotating lidar which provides 320 degree sensing.

The SF45 must be connected via a UART/serial port and configured as described below (In addition to the [collision prevention setup](#px4-software-setup)).

[LightWare Studio](https://www.lightwarelidar.com/resources-software) configuration:

- In the LightWare Studio app enable scanning, set the scan angle, and change the baud rate to `921600`.

Налаштування PX4:

- Add the [lightware_sf45_serial](../modules/modules_driver_distance_sensor.md#lightware-sf45-serial) driver in [menuconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup):
  - Under **drivers > Distance sensors** select `lightware_sf45_serial`.
  - Перекомпілюйте та завантажте на контролер польоту.
- [Set the following parameters](../advanced_config/parameters.md) via QGC:
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to.
    Переконайтеся, що GPS або телеметрія не активовані на цьому порті.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

Налаштування перешкод в QGC буде виглядати так:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Підтримка далекоміра

Інші датчики можуть бути активовані, але це вимагає модифікації коду драйвера для встановлення орієнтації датчика та поля зору.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- Модифікуйте драйвер для встановлення орієнтації.
  This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179).
Будь ласка, внесіть свої зміни!
:::

## Companion Setup {#companion}

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::info
Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system).
Система може добре працювати при значно вищих швидкостях і менших частотах оновлення відстані.
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
For more information on hardware and software setup see: [PX4/PX4-Avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.
In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Симуляції Gazebo

_Collision Prevention_ can be tested using [Gazebo](../sim_gazebo_gz/index.md) with the [x500_lidar_2d](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar) model.
To do this, start a simulation with the x500 lidar model by running the following command:

```sh
make px4_sitl gz_x500_lidar_2d
```

Next, adjust the relevant parameters to the appropriate values and add arbitrary obstacles to your simulation world to test the collision prevention functionality.

The diagram below shows how the simulation looks when viewed in Gazebo.

![RViz image of collision detection using the x500\_lidar\_2d model in Gazebo](../../assets/simulation/gazebo/vehicles/x500_lidar_2d_viz.png)

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->

<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->

<!-- using rangefinder? -->
