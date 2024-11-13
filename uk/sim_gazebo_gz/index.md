# Симуляція Gazebo

:::warning
Gazebo раніше була відома як "Gazebo Ignition" (тоді як _Gazebo Classic_ раніше відома як Gazebo). Дивіться [запис в офіційному блозі](https://www.openrobotics.org/blog/2022/4/6/a-new-era-for-gazebo) для додаткової інформації.
:::

[Gazebo](https://gazebosim.org/home) - це робототехнічний симулятор з відкритим кодом. Він замінює старий симулятор [Gazebo Classic](../sim_gazebo_classic/README.md) та є єдиною версією Gazebo, що підтримується для Ubuntu 22.04 і далі.

**Supported Vehicles:** Quadrotor, Plane, VTOL, Rover

<lite-youtube videoid="eRzdGD2vgkU" title="PX4 SITL Ignition Gazebo Tunnel Environment"/>

:::note
Дивіться [Симуляція](../simulation/README.md) для загальної інформації про симуляцію, середовище симуляції та налаштування симуляції (наприклад засоби, що підтримуються).
:::

## Встановлення (Ubuntu Linux)

Gazebo Harmonic is installed by default on Ubuntu 22.04 as part of the normal [development environment setup](../dev_setup/dev_env_linux_ubuntu.md#simulation-and-nuttx-pixhawk-targets).

:::info
The PX4 installation scripts are based on the instructions: [Binary Installation on Ubuntu](https://gazebosim.org/docs/harmonic/install_ubuntu/) (gazebosim.org).
:::

::: warning
Gazebo Harmonic cannot be installed on Ubuntu 20.04 and earlier.

On Ubuntu 20.04 we recommend use [Gazebo Classic](../sim_gazebo_classic/index.md). If you really must use Gazebo then you should update to Ubuntu 22.04.

Until November 2024 it is possible to [install Gazebo Garden](https://gazebosim.org/docs/garden/install_ubuntu/) on Ubuntu 20.04. After that date Garden will reach end-of-life and should not be used.
:::

## Запуск симуляції

Симуляцію Gazebo SITL можна легко запустити за допомогою команди `make` як показано нижче:

```sh
cd /path/to/PX4-Autopilot
make px4_sitl gz_x500
```

Це запускає як екземпляр PX4 SITL, так і клієнт Gazebo.

Рухомі засоби, що підтримуються, а також команди `make` перелічені нижче. Зверніть увагу, що усі цілі збірки make для gazebo мають префікс `gz_`.

| Рухомий засіб                                                                                                                 | Команда                             | `PX4_SYS_AUTOSTART` |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------- |
| [Квадрокоптер (x500)](../sim_gazebo_gz/vehicles.md#x500-quadrotor)                                                            | `make px4_sitl gz_x500`             | 4001                |
| [X500 Quadrotor with Depth Camera (Front-facing)](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-depth-camera-front-facing) | `make px4_sitl gz_x500_depth`       | 4002                |
| [Квадрокоптер (x500) з візуальною одометрією](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-visual-odometry)               | `make px4_sitl gz_x500_vision`      | 4005                |
| [Quadrotor(x500) with 1D LIDAR (Down-facing)](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-1d-lidar-down-facing)          | `make px4_sitl gz_x500_lidar_down`  | 4016                |
| [Quadrotor(x500) with 2D LIDAR](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-2d-lidar)                                    | `make px4_sitl gz_x500_lidar_2d`    | 4013                |
| [Quadrotor(x500) with 1D LIDAR (Front-facing)](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-1d-lidar-front-facing)        | `make px4_sitl gz_x500_lidar_front` | 4017                |
| [ВЗІП](../sim_gazebo_gz/vehicles.md#standard-vtol)                                                                            | `make px4_sitl gz_standard_vtol`    | 4004                |
| [Літак](../sim_gazebo_gz/vehicles.md#standard-plane)                                                                          | `make px4_sitl gz_rc_cessna`        | 4003                |
| [Покращений літак](../sim_gazebo_gz/vehicles.md#advanced-plane)                                                               | `make px4_sitl gz_advanced_plane`   | 4008                |
| [Differential Rover](../sim_gazebo_gz/vehicles.md#differential-rover)                                                         | `make px4_sitl gz_r1_rover`         | 4009                |
| [Ackermann Rover](../sim_gazebo_gz/vehicles.md#ackermann-rover)                                                               | `make px4_sitl gz_rover_ackermann`  | 4012                |

Усі [моделі засобів](../sim_gazebo_gz/vehicles.md) (та [світів](#specify-world)) включені як підмодуль з репозиторію [Моделі Gazebo](../sim_gazebo_gz/gazebo_models.md).

:::warning
Плагін "Удосконалена піднімна сила", що необхідний для запуску Покращеного літака поки що не є частиною дистрибутиву Gazebo, тому Покращений літак поки що не полетить: [PX4-Autopilot#22337](https://github.com/PX4/PX4-Autopilot/issues/22337).

Щоб увімкнути Покращений літак, в якості обхідного шляху ви можете зібрати бібліотеку gz-sim з [вихідного коду Gazebo](https://github.com/gazebosim/gz-sim), перейти до каталогу `build/lib`, скопіювати файл плагіну удосконаленої піднімної сили `.so` (в залежності від певної версії Gazebo він називається чимось на зразок `libgz-sim7-advanced-lift-drag-system.so`), та вставити у директорію `~/.gz/sim/plugins`.
:::

Вищенаведені команди запускають єдиний засіб з повним користувацьким інтерфейсом. _QGroundControl_ повинна автоматично підключатися до симульованого транспортного засобу.

### Автономний режим

Інший спосіб як Gazebo SITL може бути під'єднано - в _автономному режимі_. У цьому режимі PX4 SITL і Gazebo запускаються окремо у своїх власних терміналах. За замовчуванням ці термінали знаходяться на одному й тому ж комп'ютері, але ви можете також під'єднати екземпляри SITL та Gazebo, які працюють на будь-яких двох пристроях в мережі (або навіть різних мережах, якщо ви використовуєте VPN для їх з'єднання).

Запустити PX4 в автономному режимі можна додавши перед командою `make` `PX4_GZ_STANDALONE=1`:

```sh
cd /path/to/PX4-Autopilot
PX4_GZ_STANDALONE=1 make px4_sitl gz_x500
```

PX4 SITL тоді буде очікувати поки не виявить екземпляру _gz-server_ та не під'єднається до нього.

:::note
Якщо ви досі не запустили _gz-server_ коли виконали команду `make`, ви побачите наступне попередження допоки gazebo не запуститься та екземпляр _gz-server_ не буде виявлено PX4:

```sh
WARN [gz bridge] Service call timed out as Gazebo has not been detected
```

:::

Найпростіший спосіб запустити симуляцію - використати Python скрипт [simulation-gazebo](https://github.com/PX4/PX4-gazebo-models/blob/main/simulation-gazebo), що можна знайти у репозиторії [Моделі Gazebo](../sim_gazebo_gz/gazebo_models.md). Його можна використати, щоб запустити екземпляр _gz-server_ з будь-яким світом і рухомим засобом, що підтримується.

Скрипт можна використати без встановлення додаткових залежностей, він отримає моделі та світи PX4 що підтримуються при першому використанні (за замовчуванням) та збереже їх у `~/.simulation-gazebo`. При повторному запуску цей скрипт використає цю директорію для отримання моделей та світів. Тому якщо ви бажаєте використати власну модель та запустити її в автономному режимі, вам потрібно покласти її вихідний код у `~/.simulation-gazebo`.

Ви можете отримати цей скрипт локально використовуючи будь-який спосіб який вам до вподоби, наприклад `wget`:

```sh
wget https://raw.githubusercontent.com/PX4/PX4-gazebo-models/main/simulation-gazebo
```

Скрипт може бути запущено так:

```sh
cd /path/to/script/
python3 simulation-gazebo
```

Для додаткової інформації та аргументів, дивіться [Моделі Gazebo](../sim_gazebo_gz/gazebo_models.md).

:::note
Якщо `make px4_sitl gz_x500` дає помилку `ninja: error: unknown target 'gz_x500'` тоді запустіть `make distclean`, щоб почати з чистого аркуша, та спробуйте запустити `make px4_sitl gz_x500` ще раз.
:::

### Режим без інтерфейсу

Можливо ви забажаєте запустити Gazebo у "режимі без інтерфейсу" (без графічного інтерфейсу Gazebo) оскільки він використовує менше ресурсів та не покладається на те, що ваша система має відеокарту яка належним чином підтримує рендеринг OpenGL. Це пришвидшує завантаження та запуск, та для багатьох простих випадків це може бути все що вам потрібно.

Симуляція може бути запущено у режимі без інтерфейсу додаванням перед командою змінної середовища `HEADLESS=1`:

```sh
HEADLESS=1 make px4_sitl gz_x500
```

### Вказання світу

Симуляція може бути запущена в певному світі додаванням бажаного світу до імені бажаного рухомого засобу. Наприклад, щоб запустити вітряний світ із засобом `x500` ви можете вказати:

```sh
make px4_sitl gz_x500_windy
```

Ви також можете вказати світ використовуючи змінну середовища `PX4_GZ_WORLD`:

```sh
PX4_GZ_WORLD=windy make px4_sitl gz_x500
```

The [supported worlds](../sim_gazebo_gz/worlds.md) are listed below.

| Світ       | Команда                    | Опис                                                        |
| ---------- | -------------------------- | ----------------------------------------------------------- |
| `default`  | `make px4_sitl *`          | Порожній світ (сіра площина)                                |
| `aruco`    | `make px4_sitl *_aruco`    | Empty world with aruco marker for testing precision landing |
| `baylands` | `make px4_sitl *_baylands` | Світ Baylands оточений водою                                |
| `lawn`     | `make px4_sitl *_lawn`     | Lawn world for testing rovers                               |
| `rover`    | `make px4_sitl *_rover`    | Rover world (optimised/preferred)                           |
| `walls`    | `make px4_sitl *_walls`    | Wall world for testing collision prevention                 |
| `windy`    | `make px4_sitl *_windy`    | Порожній світ з увімкненим вітром                           |

:::warning
Зверніть увагу, якщо ніякого світу не вказано, PX4 використає світ `default`. Однак ви не повинні _явно_ вказувати `_default` у назві моделі тоді як це перешкодить запуску PX4. Іншими словами, використовуйте `make px4_sitl gz_x500` замість `make px4_sitl gz_x500_default` для світу за замовчуванням.
:::

::: info
Baylands world throws a warning in Gazebo Harmonic because there are so many meshes. This can be ignored:

```sh
[Wrn] [SDFFeatures.cc:843] The geometry element of collision [collision] couldn't be created
```

:::

## Використання та варіанти налаштування

Конвеєр запуску дозволяє дуже гнучке налаштування. Зокрема можливо:

- Почати нову симуляцію з довільним світом або під'єднатись до вже запущеної симуляції.
- Додати новий засіб до симуляції або поєднати новий екземпляр PX4 з вже наявним.

Ці сценарії керуються встановленням відповідних змінних середовища.

### Синтаксис

Синтаксис запуску набирає форми:

```sh
ARGS ./build/px4_sitl_default/bin/px4
```

де `ARGS` - це список змінних середовища, включаючи:

- `PX4_SYS_AUTOSTART` (**обов'язковий**): встановлює [ідентифікатор автостарту планеру](../dev_airframes/adding_a_new_frame.md) PX4 для запуску.

- `PX4_GZ_MODEL_NAME`: встановлює ім'я _наявної_ моделі в симуляції gazebo. Якщо вказано, скрипт запуску намагається прив'язати новий екземпляр PX4 до ресурсу Gazebo, що відповідає точно такому імені.

  - Налаштування є взаємозаперечним з `PX4_SIM_MODEL`.

- `PX4_SIM_MODEL`: встановлює ім'я нової моделі Gazebo для відтворення в симуляторі. Якщо вказано, скрипт запуску шукає модель у шляху ресурсів Gazebo, що відповідає даній змінній, відтворює її й пов'язує новий екземпляр PX4 з нею.

  - Налаштування є взаємозаперечним з `PX4_GZ_MODEL_NAME`.

:::note
Змінна середовища `PX4_GZ_MODEL` застаріла та її функціональність об'єднана з `PX4_SIM_MODEL`.
:::

- `PX4_GZ_MODEL_POSE`: встановлює позицію відтворення та орієнтацію моделі коли вжито `PX4_SIM_MODEL`. Якщо вказано, скрипт запуску відтворює модель у положенні, що дотримується синтаксису `"x,y,z,roll,pitch,yaw"`, де позиції надаються в метрах, а кути - в радіанах.

  - Якщо опущено, використовується нульове положення `[0,0,0,0,0,0]`.
  - Якщо надано менше ніж 6 значень, то відсутні фіксуються на нулі.
  - Можна використовувати лише зі змінною `PX4_SIM_MODEL` (не `PX4_GZ_MODEL_NAME`).

- `PX4_GZ_WORLD`: встановлює файл світу Gazebo для нової симуляції. If it is not given, then [default](https://github.com/PX4/PX4-gazebo-models/blob/main/worlds/default.sdf) is used.

  - Ця змінна ігнорується, якщо наявна модель вже запущена.
  - Це значення повинно бути [вказано для обраного планера](#adding-new-worlds-and-models), але може бути перевизначено використовуючи цей аргумент.

- `PX4_SIMULATOR=GZ`: встановлює симулятор, для Gazebo це повинно бути `gz`.

  - Це значення має бути [встановлено для обраного планера](#adding-new-worlds-and-models), і в цьому випадку не повинно бути вказано як аргумент.

- `PX4_GZ_STANDALONE`: Дозволяє PX4 зрозуміти що він не повинен запускати екземпляр Gazebo. Gazebo потрібно буде запустити окремо, як описано в [Автономному режимі](#standalone-mode).

- `PX4_GZ_SIM_RENDER_ENGINE`: Встановлює рушій рендерингу, який буде використовуватися в Gazebo.

  Рушій рендерингу за замовчуванням (OGRE 2) погано підтримується на деяких платформах/середовищах. Вкажіть `PX4_GZ_SIM_RENDER_ENGINE=ogre`, щоб встановити рушій рендерингу на OGRE 1, якщо у вас виникають проблеми з рендерингом при запуску PX4 на віртуальній машині.

Світи PX4 Gazebo та бази даних моделей [можна знайти на Github тут](https://github.com/PX4/PX4-gazebo-models).

:::note
`gz_env.sh.in` скомпільовано і зроблено доступним у `$PX4_DIR/build/px4_sitl_default/rootfs/gz_env.sh`
:::

### Приклади

Ось кілька прикладів різних сценаріїв, описаних вище.

1. **Запуск симулятора + світ за замовчуванням + відтворення засобу у позиції за замовчуванням**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

2. **Запуск симулятора + світ за замовчуванням + відтворення засобу у довільній позиції (y=2 м)**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_POSE="0,2" PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

3. **Запуск симулятора + світ за замовчуванням + зв'язування з наявним засобом**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_NAME=x500 ./build/px4_sitl_default/bin/px4
   ```

4. **Запуск симулятора в автономному режимі + під'єднання до екземпляра Gazebo що виконує світ за замовчуванням**

   ```sh
   PX4_GZ_STANDALONE=1 PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

   В окремому терміналі запустіть:

   ```sh
   python /path/to/simulation-gazebo
   ```

## Додавання нових світів та моделей

SDF файли, файли сіток, текстури та будь-що інше, що пов'язано з функціоналом та зовнішнім виглядом Gazebo для світів та моделей може бути розміщено у відповідних директоріях `/worlds` та `/models` у [PX4-gazebo-models](https://github.com/PX4/PX4-gazebo-models).

В межах PX4 дотримуйтесь наступних кроків, щоб додати моделі та світи.

### Додавання моделі

Щоб додати нову модель:

1. Визначте [конфігураційний файл планера](../dev_airframes/adding_a_new_frame.md).
1. Визначте параметри за замовчуванням для Gazebo у файлі конфігурації планера (цей приклад взято з [квадрокоптера x500](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/4001_gz_x500)):

   ```ini
   PX4_SIMULATOR=${PX4_SIMULATOR:=gz}
   PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}
   PX4_SIM_MODEL=${PX4_SIM_MODEL:=<your model name>}
   ```

   - `PX4_SIMULATOR=${PX4_SIMULATOR:=gz}` встановлює симулятор за замовчуванням (Gz) для цього конкретного планера.
   - `PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}` sets the [default world](https://github.com/PX4/PX4-gazebo-models/blob/main/worlds/default.sdf) for that specific airframe.

   - Встановлення значення за замовчуванням для `PX4_SIM_MODEL` дозволить запустити симуляцію лише з:

     ```sh
     PX4_SYS_AUTOSTART=<your new airframe id> ./build/px4_sitl_default/bin/px4
     ```

1. Додайте ціль CMake для [планера](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/CMakeLists.txt).

   - Якщо плануєте використовувати "звичайний" режим, додайте файл SDF вашої моделі у `Tools/simulation/gz/models/`.
   - Якщо плануєте використовувати _автономний_ режим, додайте SDF файл вашої моделі у`~/.simulation-gazebo/models/`

   Ви звичайно також можете використовувати обидва варіанти.

### Додавання світу

Щоб додати новий світ:

1. Додайте ваш світ до переліку світів знайдений у [`CMakeLists.txt` тут](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/simulation/gz_bridge/CMakeLists.txt). Це необхідно, щоб `CMake` зміг згенерувати правильні цілі збірки.

   - Якщо плануєте використовувати "звичайний" режим, додайте файл SDF вашого світу у `Tools/simulation/gz/worlds/`.
   - Якщо плануєте використовувати _автономний_ режим, додайте файл SDF вашого світу у `~/.simulation-gazebo/worlds/`

:::note
Допоки файл світу та моделі у шляху пошуку Gazebo (`GZ_SIM_RESOURCE_PATH`) немає потреби додавати їх у директорії world та model PX4. Однак `make px4_sitl gz_<model>_<world>` не працюватиме з ними.
:::

## Синхронізація часу PX4-Gazebo

На відміну від симуляторів Gazebo Classic та jMAVSim, PX4 та Gazebo не реалізують механізм синхронізації.

Під час симуляцій Gazebo PX4 підписується на рубрику Gazebo `\clock` та використовує її як джерело синхронізації. Це гарантує, що PX4 завжди чекатиме Gazebo перед тим як рухатися вперед у часі, навіть якщо Gazebo працює з фактором реального часу відмінним від 1.

Зауважте, однак, оскільки синхронізація відсутня, Gazebo ніколи не чекатиме завершення обчислень PX4. У найгіршому випадку, PX4 може повністю відключитися, а Gazebo продовжить виконання з очевидними аваріями дронів, що симулюються.

## Симуляція кількох рухомих засобів

Симуляція кількох засобів підтримується на комп'ютерах з Linux.

Для додаткової інформації дивіться: [Симуляція кількох засобів з Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md)

## Додаткова інформація

- [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
