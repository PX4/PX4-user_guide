# Collision Prevention

_Collision Prevention_ може бути використано для автоматичного сповільнення і зупинки транспортного засобу, перш ніж він потрапить в перешкоду.

Він може бути увімкнений для мультикоптерів у режимі [Position mode](../flight_modes_mc/position.md) і може використовувати дані датчиків з бортового комп'ютера-компаньйона, бортових далекомірів через MAVLink, далекоміра, приєднаного до польотного контролера, або будь-якої комбінації вищезазначених пристроїв.

Запобігання зіткненням може обмежити максимальну швидкість автомобіля, якщо радіус дії датчика недостатньо великий! Він також запобігає руху в тих напрямках, де немає даних з датчиків (тобто, якщо у вас немає даних з заднього датчика, ви не зможете летіти назад).

:::tip
Якщо висока швидкість польоту є критично важливою, вимкніть функцію запобігання зіткненням, коли вона не потрібна.
:::

:::tip
Переконайтеся, що у вас є датчики/дані датчиків у всіх напрямках, в яких ви хочете летіти (коли увімкнено запобігання зіткненням).
:::

## Загальний огляд

_Collision Prevention_ увімкнено на PX4 шляхом встановлення параметра мінімально допустимої відстані зближення ([CP_DIST](#CP_DIST)).

Ця функція вимагає інформації про перешкоди від зовнішньої системи (надсилається за допомогою повідомлення MAVLink [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE)) та/або [датчика відстані](../sensor/rangefinders.md), підключеного до польотного контролера.

:::note
Для отримання інформації про об'єкти _навколо_ транспортного засобу та запобігання зіткненням з ними можна використовувати декілька датчиків. Якщо кілька джерел надають дані для _однакової_ орієнтації, система використовує дані, які повідомляють про найменшу відстань до об'єкта.
:::

Транспортний засіб обмежує максимальну швидкість, щоб сповільнитися, коли він наближається до перешкод, і припиняє рух, коли досягає мінімально допустимої дистанції. Для того, щоб відійти від перешкоди (або паралельно їй), користувач повинен наказати транспортному засобу рухатися до заданої точки, яка не наближає транспортний засіб до перешкоди. Алгоритм внесе незначні корективи в напрямок заданого значення, якщо буде визначено, що "краще" значення існує в межах фіксованого запасу по обидва боки від запитуваного заданого значення.

Користувачі отримують сповіщення через _QGroundControl_, а _Collision Prevention_ активно контролює задані значення швидкості.

Налаштування програмного забезпечення PX4 оглянуто в наступному розділі. Якщо ви використовуєте датчик відстані, підключений до вашого польотного контролера для запобігання зіткненням, його потрібно підключити та налаштувати, як описано в розділі [Датчик відстані PX4](#rangefinder). Якщо ви використовуєте комп'ютер-компаньйон для надання інформації про перешкоди, див. [Налаштування компаньйона](#companion).

## PX4 Налаштування (програмного забезпечення)

Налаштуйте запобігання зіткненням, встановивши [такі параметри](../advanced_config/parameters.md) у _QGroundControl_:

| Parameter                                                                                           | Опис                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="CP_DIST"></a>[CP_DIST](../advanced_config/parameter_reference.md#CP_DIST)               | Set the minimum allowed distance (the closest distance that the vehicle can approach the obstacle). Set negative to disable _collision prevention_. <br>> **Warning** This value is the distance to the sensors, not the outside of your vehicle or propellers. Be sure to leave a safe margin! |
| <a id="CP_DELAY"></a>[CP_DELAY](../advanced_config/parameter_reference.md#CP_DELAY)             | Set the sensor and velocity setpoint tracking delay. See [Delay Tuning](#delay_tuning) below.                                                                                                                                                                                                         |
| <a id="CP_GUIDE_ANG"></a>[CP_GUIDE_ANG](../advanced_config/parameter_reference.md#CP_GUIDE_ANG)   | Set the angle (to both sides of the commanded direction) within which the vehicle may deviate if it finds fewer obstacles in that direction. See [Guidance Tuning](#angle_change_tuning) below.                                                                                                       |
| <a id="CP_GO_NO_DATA"></a>[CP_GO_NO_DATA](../advanced_config/parameter_reference.md#CP_GO_NO_DATA) | Set to 1 to allow the vehicle to move in directions where there is no sensor coverage (default is 0/`False`).                                                                                                                                                                                         |
| <a id="MPC_POS_MODE"></a>[MPC_POS_MODE](../advanced_config/parameter_reference.md#MPC_POS_MODE)   | Set to 0 or 3 to enable Collision Prevention in Position Mode (default is 4).                                                                                                                                                                                                                         |

<a id="algorithm"></a>

## Опис алгоритму

Дані з усіх датчиків об'єднуються у внутрішнє представлення 36 секторів навколо транспортного засобу, кожен з яких містить або дані датчика та інформацію про час останнього спостереження, або вказівку на те, що дані для сектора відсутні. Коли транспортний засіб отримує команду рухатися в певному напрямку, перевіряються всі сектори в півкулі цього напрямку, щоб побачити, чи не наблизить цей рух транспортний засіб до будь-яких перешкод. Якщо так, то швидкість транспортного засобу буде обмежена.

Це обмеження швидкості враховує як внутрішній контур швидкості, налаштований за допомогою [MPC_XY_P](../advanced_config/parameter_reference.md#MPC_XY_P), так і [контролер оптимальної швидкості ривка](../config_mc/mc_jerk_limited_type_trajectory.md) за допомогою [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) та [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR). Швидкість обмежується таким чином, щоб транспортний засіб зупинився вчасно, щоб зберегти відстань, вказану в [CP_DIST](#CP_DIST). Також враховується дальність дії датчиків для кожного сектора, що обмежує швидкість за тим же механізмом.

:::note
Якщо в певному напрямку немає даних від датчика, швидкість у цьому напрямку обмежується до 0 (щоб запобігти зіткненню з невидимими об'єктами). Якщо ви хочете вільно рухатися у напрямках без покриття датчиків, це можна увімкнути, встановивши [CP_GO_NO_DATA](#CP_GO_NO_DATA) на 1.
:::

Затримка, як у заданих значеннях швидкості відстеження транспортного засобу, так і в отриманні даних датчиків від зовнішніх джерел, орієнтовано оцінюється через параметр [CP_DELAY](#CP_DELAY). Вона має бути [налаштована](#delay_tuning) на конкретний транспортний засіб.

Якщо сектори, що прилягають до керованих секторів, є "кращими" зі значним відривом, напрямок запитуваного входу може бути змінено на кут, вказаний у [CP_GUIDE_ANG](#CP_GUIDE_ANG). Це допомагає точно налаштувати вхідні дані користувача, щоб "вести" транспортний засіб навколо перешкод, а не застрявати на них.

<a id="data_loss"></a>

### Втрата даних про дальність

Якщо автопілот не отримує дані про дальність від будь-якого датчика довше, ніж 0,5 секунди, він видасть попередження _No range data received, no movement allowed_. Це змусить встановити швидкість у ху до нуля. Через 5 секунд без отримання даних транспортний засіб перейде в режим [HOLD](../flight_modes_mc/hold.md). Якщо ви хочете, щоб транспортний засіб знову міг рухатися, вам потрібно вимкнути запобігання зіткненням, або встановивши параметр [CP_DIST](#CP_DIST) на від'ємне значення, або переключившись у режим, відмінний від [Position mode](../flight_modes_mc/position.md) (наприклад, у _Altitude mode_ або _Stabilized mode_).

Якщо у вас підключено кілька датчиків і ви втратили зв'язок з одним з них, ви все одно зможете літати в полі зору (FOV) датчиків, що звітують. Дані несправного датчика втратять чинність, а область, що покривається цим датчиком, буде вважатися непокритою, тобто ви не зможете там пересуватися.

:::warning
Будьте обережні, увімкнувши [CP_GO_NO_DATA=1](#CP_GO_NO_DATA), що дозволяє апарату вилітати за межі зони покриття датчиків. Якщо ви втратите зв'язок з одним з декількох датчиків, зона, яку охоплює несправний датчик, також буде вважатися відкритою, і ви зможете пересуватися там без обмежень.
:::

<a id="delay_tuning"></a>

### CP_DELAY Налаштування затримки

Існує два основних джерела затримки, які слід враховувати: _затримка датчика_ та _затримка відстеження заданої швидкості транспортного засобу_. Обидва джерела затримки налаштовуються за допомогою параметра [CP_DELAY](#CP_DELAY).

Затримку _ датчика_ для датчиків відстані, підключених безпосередньо до польотного контролера, можна вважати рівною 0. Для зовнішніх систем на основі зору затримка датчика може досягати 0,2 с.

Vehicle _velocity setpoint tracking delay_ can be measured by flying at full speed in [Position mode](../flight_modes_mc/position.md), then commanding a stop. The delay between the actual velocity and the velocity setpoint can then be measured from the logs. The tracking delay is typically between 0.1 and 0.5 seconds, depending on vehicle size and tuning.

:::tip
If vehicle speed oscillates as it approaches the obstacle (i.e. it slows down, speeds up, slows down) the delay is set too high.
:::

<a id="angle_change_tuning"></a>

### CP_GUIDE_ANG Guidance Tuning

Depending on the vehicle, type of environment and pilot skill different amounts of guidance may be desired. Setting the [CP_GUIDE_ANG](#CP_GUIDE_ANG) parameter to 0 will disable the guidance, resulting in the vehicle only moving exactly in the directions commanded. Increasing this parameter will let the vehicle choose optimal directions to avoid obstacles, making it easier to fly through tight gaps and to keep the minimum distance exactly while going around objects.

If this parameter is too small the vehicle may feel 'stuck' when close to obstacles, because only movement away from obstacles at minimum distance are allowed. If the parameter is too large the vehicle may feel like it 'slides' away from obstacles in directions not commanded by the operator. From testing, 30 degrees is a good balance, although different vehicles may have different requirements.

:::note
The guidance feature will never direct the vehicle in a direction without sensor data.
If the vehicle feels 'stuck' with only a single distance sensor pointing forwards, this is probably because the guidance cannot safely adapt the direction due to lack of information.
:::

<a id="rangefinder"></a>

## PX4 Distance Sensor

### Lanbao PSK-CM8JL65-CC5

At time of writing PX4 allows you to use the [Lanbao PSK-CM8JL65-CC5](../sensor/cm8jl65_ir_distance_sensor.md) IR distance sensor for collision prevention "out of the box", with minimal additional configuration:

- First [attach and configure the sensor](../sensor/cm8jl65_ir_distance_sensor.md), and enable collision prevention (as described above, using [CP_DIST](#CP_DIST)).
- Set the sensor orientation using [SENS_CM8JL65_R_0](../advanced_config/parameter_reference.md#SENS_CM8JL65_R_0).

### LightWare LiDAR SF45 Rotating Lidar

PX4 v1.14 (and later) supports the [LightWare LiDAR SF45](https://www.lightwarelidar.com/shop/sf45-b-50-m/) rotating lidar which provides 320 degree sensing.

The SF45 must be connected via a UART/serial port and configured as described below (In addition to the [collision prevention setup](#px4-software-setup)).

[LightWare Studio](https://www.lightwarelidar.com/resources-software) configuration:

- In the LightWare Studio app enable scanning, set the scan angle, and change the baud rate to `921600`.

PX4 Configuration:

- Add the [lightware_sf45_serial](../modules/modules_driver_distance_sensor.md#lightware-sf45-serial) driver in [menuconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup):
  - Under **drivers > Distance sensors** select `lightware_sf45_serial`.
  - Recompile and upload to the flight controller.
- [Set the following parameters](../advanced_config/parameters.md) via QGC:
  - [SENS_EN_SF45_CFG](../advanced_config/parameter_reference.md#SENS_EN_SF45_CFG): Set to the serial port you have the sensor connected to. Make sure GPS or Telemetry are not enabled on this port.
  - [SF45_ORIENT_CFG](../advanced_config/parameter_reference.md#SF45_ORIENT_CFG): Set the orientation of the sensor (facing up or down)
  - [SF45_UPDATE_CFG](../advanced_config/parameter_reference.md#SF45_UPDATE_CFG): Set the update rate
  - [SF45_YAW_CFG](../advanced_config/parameter_reference.md#SF45_YAW_CFG): Set the yaw orientation

In QGroundControl you should see an [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) message in the [MAVLink console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) if collision prevention is configured correctly and active.

The obstacle overlay in QGC will look like this:

![sf45](../../assets/sf45/sf45_obstacle_map.png)

### Rangefinder Support

Other sensors may be enabled, but this requires modification of driver code to set the sensor orientation and field of view.

- Attach and configure the distance sensor on a particular port (see [sensor-specific docs](../sensor/rangefinders.md)) and enable collision prevention using [CP_DIST](#CP_DIST).
- Modify the driver to set the orientation. This should be done by mimicking the `SENS_CM8JL65_R_0` parameter (though you might also hard-code the orientation in the sensor _module.yaml_ file to something like `sf0x start -d ${SERIAL_DEV} -R 25` - where 25 is equivalent to `ROTATION_DOWNWARD_FACING`).
- Modify the driver to set the _field of view_ in the distance sensor UORB topic (`distance_sensor_s.h_fov`).

:::tip
You can see the required modifications from the [feature PR](https://github.com/PX4/PX4-Autopilot/pull/12179). Please contribute back your changes!
:::

<a id="companion"></a>

## Companion Setup

If using a companion computer or external sensor, it needs to supply a stream of [OBSTACLE_DISTANCE](https://mavlink.io/en/messages/common.html#OBSTACLE_DISTANCE) messages, which should reflect when and where obstacle were detected.

The minimum rate at which messages _must_ be sent depends on vehicle speed - at higher rates the vehicle will have a longer time to respond to detected obstacles.

:::note
Initial testing of the system used a vehicle moving at 4 m/s with `OBSTACLE_DISTANCE` messages being emitted at 10Hz (the maximum rate supported by the vision system). The system may work well at significantly higher speeds and lower frequency distance updates.
:::

The tested companion software is the _local_planner_ from the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo. For more information on hardware and software setup see: [PX4/PX4-Avoidance > Run on Hardware](https://github.com/PX4/PX4-Avoidance#run-on-hardware).

<!-- hardware platform used for testing not readily available, so have removed -->

The hardware and software should be set up as described in the [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo. In order to emit `OBSTACLE_DISTANCE` messages you must use the _rqt_reconfigure_ tool and set the parameter `send_obstacles_fcu` to true.

## Gazebo Setup

_Collision Prevention_ can also be tested using Gazebo. See [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) for setup instructions.

<!-- PR companion collision prevention (initial): https://github.com/PX4/PX4-Autopilot/pull/10785 -->
<!-- PR for FC sensor collision prevention: https://github.com/PX4/PX4-Autopilot/pull/12179 -->
