# Точна посадка

PX4 підтримує точне приземлення для _Multicopters_ на стаціонарних або рухомих цілях. Ціль може бути надана вбудованим ІЧ-датчиком та приземленням, або зовнішньою системою позиціонування.

Пристрій для точного приземлення може бути [запущений/ініційований](#initiating-a-precision-landing) як частина [місії](#mission), у режимі [повернення](#return-mode-precision-landing) на посадку або при вході у режим польоту [_Точна посадка_](#precision-landing-flight-mode).

:::note
Точна посадка можлива лише з дійсною глобальною позицією (через обмеження в поточній реалізації контролера позиції).
:::

## Загальний огляд

### Режими посадки

Точну посадку можна налаштувати як "обов'язкову" або "вигідну". Вибір режиму впливає на те, як виконується точна посадка.

#### Required Mode

У _Required Mode_ транспортний засіб буде шукати ціль, якщо нічого не видно під час початку посадки. Транспортний засіб виконає точну посадку, якщо ціль буде знайдена.

Процедура пошуку полягає у підйомі на висоту пошуку ([PLD_SRCH_ALT](../advanced_config/parameter_reference.md#PLD_SRCH_ALT)). Якщо мішень все ще не видно на висоті пошуку після закінчення часу пошуку ([PLD_SRCH_TOUT](../advanced_config/parameter_reference.md#PLD_SRCH_TOUT)), то ініціюється звичайна посадка на поточному місці.

:::note
Якщо використовується позамежна система позиціонування, PX4 передбачає, що ціль буде видима, коли отримує повідомлення MAVLink [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET).
:::

#### Opportunistic Mode

У режимі _Opportunistic Mode_ транспортний засіб використовуватиме точну посадку, _якщо_ (і тільки якщо) ціль буде видима, коли розпочинається посадка. Якщо ціль не видно, транспортний засіб негайно виконує _звичайну_ посадку на поточному місці.

### Фази посадки

Режим Точної посадки має три етапи:

1. **Horizontal approach:** The vehicle approaches the target horizontally while keeping its current altitude. Once the position of the target relative to the vehicle is below a threshold ([PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)), the next phase is entered. If the target is lost during this phase (not visible for longer than [PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

1. **Descent over target:** The vehicle descends, while remaining centered over the target. If the target is lost during this phase (not visible for longer than `PLD_BTOUT`), a search procedure is initiated (during a required precision landing) or the vehicle does a normal landing (during an opportunistic precision landing).

1. **Final approach:** When the vehicle is close to the ground (closer than [PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)), it descends while remaining centered over the target. If the target is lost during this phase, the descent is continued independent of the kind of precision landing.

Search procedures are initiated in the first and second steps, and will run at most [PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH) times. Landing Phases Flow Diagram

A flow diagram showing the phases can be found in [landing phases flow Diagram](#landing-phases-flow-diagram) below.

## Початок точної посадки

Точне приземлення можна використовувати у місіях, під час фази посадки у режимі _Повернення_, або ввійшовши в режим _Точна посадка_.

<a id="mission"></a>

### Mission Precision Landing

Точне приземлення може бути запущено як частина [місії](../flying/missions.md), використовуючи [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) з відповідно встановленим `param2`:

- `0`: Normal landing without using the target.
- `1`: [Opportunistic](#opportunistic-mode) режим точної посадки
- `2`: [Required](#required-mode) режим точної посадки

### Return Mode Precision Landing

Precision landing can be used in the [Return mode](../flight_modes/return.md) landing phase.

This is enabled using the parameter [RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD), which takes the following values:

- `0`: Precision landing disabled (land as normal).
- `1`: [Opportunistic](#opportunistic-mode) режим точної посадки
- `2`: [Required](#required-mode) режим точної посадки

### Precision Landing Flight Mode

Precision landing can be enabled by switching to the _Precision Landing_ flight mode.

You can verify this using the [_QGroundControl_ MAVLink Console](../debug/mavlink_shell.md#qgroundcontrol-mavlink-console) to enter the following command:

```sh
commander mode auto:precland
```

:::note
When switching to the mode in this way, the precision landing is always "required"; there is no way to specify the type of landing.
:::

:::note
At time of writing is no _convenient_ way to directly invoke precision landing (other than commanding return mode):

- _QGroundControl_ does not provide it as a UI option.
- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) only works in missions.
- [MAV_CMD_DO_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_MODE) should work, but you will need to determine the appropriate base and custom modes used by PX4 to represent the precision landing mode.
:::

## Налаштування обладнання

### IR Sensor/Beacon Setup

Рішення з інфрачервоним датчиком/посадковим маяком потребує датчика [IR-LOCK](https://irlock.com/products/ir-lock-sensor-precision-landing-kit) та напрямленого донизу [датчика відстані](../sensor/rangefinders.md), підключеного до автопілота, а також інфрачервоного маяка в якості цілі (наприклад, [IR-LOCK MarkOne](https://irlock.com/collections/markone)). Це дозволяє приземлитися з точністю приблизно 10 см (в той час як точність GPS може бути в декілька метрів).

Встановіть датчик IR-LOCK, слідуючи [офіційному посібнику](https://irlock.readme.io/v2.0/docs). Переконайтеся, що ось x сенсора вирівняна з осью y транспортного засобу, а ось y сенсора вирівняна з напрямком -x транспортного засобу (це відбувається, якщо камера нахилена вниз на 90 градусів від напрямку вперед).

Встановіть датчик відстані (LidarLite v3 виявився працездатним).

:::note
Багато датчиків дальності на основі інфрачервоного випромінювання погано працюють в присутності маяка IR-LOCK.
Зверніться до посібника з IR-LOCK для інших сумісних датчиків.
:::

## Позабортне позиціонування

Для позабортового рішення потрібна система позиціонування, яка реалізує [Landing Target Protocol](https://mavlink.io/en/services/landing_target.html) MAVLink. Це може використовувати будь-який механізм позиціонування для визначення місця посадки, наприклад комп'ютерного зору та візуального маркера.

The system must publish the coordinates of the target in the [LANDING_TARGET](https://mavlink.io/en/messages/common.html#LANDING_TARGET) message. Note that PX4 _requires_ `LANDING_TARGET.frame` to be [MAV_FRAME_LOCAL_NED](https://mavlink.io/en/messages/common.html#MAV_FRAME_LOCAL_NED) and only populates the fields `x`, `y`, and `z`. The origin of the local NED frame [0,0] is the home position (you can map this home position to global coordinates using [GPS_GLOBAL_ORIGIN](https://mavlink.io/en/messages/common.html#GPS_GLOBAL_ORIGIN)).

PX4 does not explicitly require a [distance sensor](../sensor/rangefinders.md) or other sensors, but will perform better if it can more precisely determine its own position.

## Конфігурація прошивки

Для точної посадки потрібні модулі `irlock` та `landing_target_estimator`. Ці модулі включені до прошивки PX4 за замовчуванням для більшості польотних контролерів.

Вони не включені за замовчуванням на контролерах, що базуються на FMUv2. На цих та інших платах, де вони не включені, ви можете додати їх, встановивши наступні ключі на 'y' у відповідному конфігураційному файлі для вашого автопілота (наприклад, як зроблено тут для FMUv5: [PX4-Autopilot/boards/px4/fmu-v5/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v5/default.px4board)):

```
CONFIG_DRIVERS_IRLOCK=y
CONFIG_MODULES_LANDING_TARGET_ESTIMATOR=y
```

## Конфігурація PX4 (параметри)

Датчик IR-Lock вимкнено за замовчуванням. Увімкніть його, встановивши [SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) на `1` (true).

[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE) визначає, чи припускається, що ціль є нерухомою або рухливою. Якщо параметр `LTEST_MODE` встановлено на значення moving (наприклад, він встановлений на транспортний засіб, на який має сісти багтроплан), вимірювання цілі використовуються лише для генерації цілейових точок позиції в контролері точної посадки. Якщо параметр `LTEST_MODE` встановлено ​​на значення stationary, вимірювання цілі також використовуються оцінювачем позиції транспортного засобу (EKF2 або LPE).

Інші важливі параметри перераховані в посиланнях на параметри в референсі параметрів під [Landing_target estimator](../advanced_config/parameter_reference.md#landing-target-estimator) та [Precision land](../advanced_config/parameter_reference.md#precision-land). Деякі з найбільш корисних перераховані нижче.

| Параметр                                                                                              | Опис                                                                                                                |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| <a id="SENS_EN_IRLOCK"></a>[SENS_EN_IRLOCK](../advanced_config/parameter_reference.md#SENS_EN_IRLOCK) | IR-LOCK Sensor (external I2C). Disable: `0` (default): Enable: `1`).                                                |
| <a id="LTEST_MODE"></a>[LTEST_MODE](../advanced_config/parameter_reference.md#LTEST_MODE)           | Landing target is moving (`0`) or stationary (`1`). Default is moving.                                              |
| <a id="PLD_HACC_RAD"></a>[PLD_HACC_RAD](../advanced_config/parameter_reference.md#PLD_HACC_RAD)     | Horizontal acceptance radius, within which the vehicle will start descending. Default is 0.2m.                      |
| <a id="PLD_BTOUT"></a>[PLD_BTOUT](../advanced_config/parameter_reference.md#PLD_BTOUT)             | Landing Target Timeout, after which the target is assumed lost. Default is 5 seconds.                               |
| <a id="PLD_FAPPR_ALT"></a>[PLD_FAPPR_ALT](../advanced_config/parameter_reference.md#PLD_FAPPR_ALT)   | Final approach altitude. Default is 0.1 metres.                                                                     |
| <a id="PLD_MAX_SRCH"></a>[PLD_MAX_SRCH](../advanced_config/parameter_reference.md#PLD_MAX_SRCH)     | Maximum number of search attempts in an required landing.                                                           |
| <a id="RTL_PLD_MD"></a>[RTL_PLD_MD](../advanced_config/parameter_reference.md#RTL_PLD_MD)         | RTL precision land mode. `0`: disabled, `1`: [Opportunistic](#opportunistic-mode), `2`: [Required](#required-mode). |

### Масштабування ІЧ-маяка

Масштабування вимірювань може бути необхідним через спотворення об'єктива датчика IR-LOCK.

[LTEST_SCALE_X](../advanced_config/parameter_reference.md#LTEST_SCALE_X) та [LTEST_SCALE_Y](../advanced_config/parameter_reference.md#LTEST_SCALE_Y) можуть бути використані для масштабування вимірів маяка, перед тим як вони будуть використані для оцінки позиції та швидкості маяка відносно транспортного засобу. Зверніть увагу, що `LTEST_SCALE_X` та `LTEST_SCALE_Y` вважаються в рамках датчика, а не в рамках транспортного засобу.

Щоб калібрувати ці параметри масштабу, встановіть `LTEST_MODE` на значення moving, підніміть свій багатокоптер вище за маяк і виконайте рухи вперед-назад та ліворуч-праворуч з транспортним засобом, під час цього [записуючи](../dev_log/logging.md#configuration) дані з `landing_target_pose` та `vehicle_local_position`. Потім порівняйте `landing_target_pose.vx_rel` та `landing_target_pose.vy_rel` з `vehicle_local_position.vx` та `vehicle_local_position.vy` відповідно (обидва виміри у системі координат NED). Якщо оцінювані швидкості маяка завжди менші або більші за швидкості транспортного засобу, налаштуйте параметри масштабування для компенсації.

Якщо ви спостерігаєте повільні бокові коливання літального апарата під час точної посадки з параметром `LTEST_MODE`, встановленим на стаціонарний, ймовірно, вимірювання маяка занадто високі, і вам слід зменшити параметр масштабування у відповідному напрямку.

## Моделювання

Точне приземлення з датчиком IR-LOCK та маяком може бути симульоване в [Gazebo Classic](../sim_gazebo_classic/README.md).

Щоб запустити симуляцію зі світом, що містить маяк IR-LOCK та транспортний засіб із датчиком дальності та камерою IR-LOCK, виконайте наступну команду:

```sh
make px4_sitl gazebo-classic_iris_irlock
```

Ви можете змінити розташування маяка або перемістивши її в Gazebo Classic GUI або змінивши її місце в [Gazebo World](https://github.com/PX4/PX4-SITL_gazebo-classic/blob/main/worlds/iris_irlock.world#L42).

## Operating Principles

### Оцінювач цілей посадки

`landing_target_estimator` бере вимірювання з драйвера irlock, а також оцінює висоту місцевості для оцінки позиції маяка відносно транспортного засобу.

The measurements in `irlock_report` містять тангенс кутів від центру зображення до маяка. Іншими словами, вимірювання - це компоненти x та y вектора, що вказує на маяк, де компонент z має довжину "1". Це означає, що масштабування вимірювання за відстанню від камери до маяка призводить до вектора від камери до маяка. Ця відносна позиція потім повертається у зіставлений з півночі, рівномірний корпусний каркас за допомогою оцінки польоту засобами повітряного судна. Обидва компоненти x та y відносного вимірювання позиції фільтруються в окремих фільтрах Калмана, які діють як прості фільтри згладжування з низькою пропускною спроможністю, що також генерують оцінку швидкості та дозволяють відкидати викиди.

`landing_target_estimator` публікує приблизну відносну позицію і швидкість щоразу, коли новий звіт про `irlock_report` об'єднується в оцінку. Нічого не публікується, якщо маяк не бачиться або вимірювання маяка відхиляються. The landing target estimate is published in the `landing_target_pose` uORB message.

### Покращена оцінка положення транспортного засобу

Якщо ціль вказана як стаціонарна за допомогою параметра `LTEST_MODE`, оцінку положення/швидкості транспортного засобу можна покращити за допомогою вимірів цілі. Це виконується шляхом злиття швидкості цілі як вимірювання від'ємної швидкості транспортного засобу.

### Діаграма потоку фаз посадки

Це зображення показує [фази посадки](#landing-phases) у вигляді діаграми потоку.

![Precision Landing Flow Diagram](../../assets/precision_land/precland-flow-diagram.png)
