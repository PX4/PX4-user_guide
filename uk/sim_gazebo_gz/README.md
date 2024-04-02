# Симуляція Gazebo

:::warning
Gazebo раніше була відома як "Gazebo Ignition" (тоді як _Gazebo Classic_ раніше відома як Gazebo). Дивіться [запис в офіційному блозі](https://www.openrobotics.org/blog/2022/4/6/a-new-era-for-gazebo) для додаткової інформації.
:::

[Gazebo](https://gazebosim.org/home) - це робототехнічний симулятор з відкритим кодом. Він замінює старий симулятор [Gazebo Classic](../sim_gazebo_classic/README.md) та є єдиною версією Gazebo для Ubuntu 22.04 і далі, що підтримується.

**Засоби що підтримуються:** Квадрокоптер, Літак, ВЗІП

@[youtube](https://youtu.be/eRzdGD2vgkU)

:::note
Дивіться [Симуляція](../simulation/README.md) для загальної інформації про симуляцію, середовище симуляції та налаштування симуляції (наприклад засоби, що підтримуються).
:::

## Встановлення (Ubuntu Linux)

Gazebo встановлений на Ubuntu 22.04 за замовчуванням як частина середовища розробки: [Налаштування середовища розробки Ubuntu > Цілі збірки для симуляції та NuttX (Pixhawk)](../dev_setup/dev_env_linux_ubuntu.md#simulation-and-nuttx-pixhawk-targets)

Якщо ви бажаєте використовувати Gazebo на Ubuntu 20.04? ви можете встановити його вручну після виконання звичайного встановлення (встановлення `gz-garden` видалить Gazebo-Classic!):

```sh
sudo wget https://packages.osrfoundation.org/gazebo.gpg -O /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null
sudo apt-get update
sudo apt-get install gz-garden
```

## Запуск симуляції

Симуляцію Gazebo SITL можна легко запустити за допомогою команди `make` як показано нижче:

```sh
cd /path/to/PX4-Autopilot
make px4_sitl gz_x500
```

Це запускає як екземпляр PX4 SITL, так і клієнт Gazebo.

Рухомі засоби, що підтримуються, а також команди `make` перелічені нижче. Зверніть увагу, що усі цілі збірки make для gazebo мають префікс `gz_`.

| Рухомий засіб                                                                                                   | Команда                           | `PX4_SYS_AUTOSTART` |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------- |
| [Квадрокоптер (x500)](../sim_gazebo_gz/vehicles.md#x500-quadrotor)                                              | `make px4_sitl gz_x500`           | 4001                |
| [Квадрокоптер (x500) з камерою глибини](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-depth-camera)          | `make px4_sitl gz_x500_depth`     | 4002                |
| [Квадрокоптер (x500) з візуальною одометрією](../sim_gazebo_gz/vehicles.md#x500-quadrotor-with-visual-odometry) | `make px4_sitl gz_x500_vision`    | 4005                |
| [ВЗІП](../sim_gazebo_gz/vehicles.md#standard-vtol)                                                              | `make px4_sitl gz_standard_vtol`  | 4004                |
| [Літак](../sim_gazebo_gz/vehicles.md#standard-plane)                                                            | `make px4_sitl gz_rc_cessna`      | 4003                |
| [Покращений літак](../sim_gazebo_gz/vehicles.md#advanced-plane)                                                 | `make px4_sitl gz_advanced_plane` | 4008                |

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

Світи що підтримуються перераховані нижче.

| Світ       | Команда                    | Опис                              |
| ---------- | -------------------------- | --------------------------------- |
| `default`  | `make px4_sitl *`          | Порожній світ (сіра площина)      |
| `windy`    | `make px4_sitl *_windy`    | Порожній світ з увімкненим вітром |
| `baylands` | `make px4_sitl *_baylands` | Світ Baylands оточений водою      |

:::warning
Зверніть увагу, якщо ніякого світу не вказано, PX4 використає світ `default`. Однак ви не повинні _явно_ вказувати `_default` у назві моделі тоді як це перешкодить запуску PX4. Іншими словами, використовуйте `make px4_sitl gz_x500` замість `make px4_sitl gz_x500_default` для світу за замовчуванням.
:::

:::note
Baylands викидає наступну помилку, що можна ігнорувати:

```
[Err] [SDFFeatures.cc:843] The geometry element of collision [collision] couldn't be created
```

Це трапляється тому що Baylands має багато сіток. Однак це не ламає Gazebo та ця помилка була знижена до попередження у Gazebo Harmonic: [gz-physics/pull/531](https://github.com/gazebosim/gz-physics/pull/531). Також можна замінити помилку на попередження [встановивши gz-garden з вихідного коду](https://gazebosim.org/docs/garden/install_ubuntu_src).
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

- `PX4_GZ_MODEL_POSE`: Sets the spawning position and orientation of the model when `PX4_SIM_MODEL` is adopted. If provided, the startup script spawns the model at a pose following the syntax `"x,y,z,roll,pitch,yaw"`, where the positions are given in metres and the angles are in radians.

  - If omitted, the zero pose `[0,0,0,0,0,0]` is used.
  - If less then 6 values are provided, the missing ones are fixed to zero.
  - This can only be used with `PX4_SIM_MODEL` (not `PX4_GZ_MODEL_NAME`).

- `PX4_GZ_WORLD`: Sets the Gazebo world file for a new simulation. If it is not given, then [default](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/simulation/gz/worlds/default.sdf) is used.

  - This variable is ignored if an existing simulation is already running.
  - This value should be [specified for the selected airframe](#adding-new-worlds-and-models) but may be overridden using this argument.

- `PX4_SIMULATOR=GZ`: Sets the simulator, which for Gazebo must be `gz`.

  - This value should be [set for the selected airframe](#adding-new-worlds-and-models), in which case it does not need to be set as an argument.

- `PX4_GZ_STANDALONE`: Lets PX4 know that it should not launch an instance of Gazebo. Gazebo will need to be launched separately, as described in [Standalone Mode](#standalone-mode).

The PX4 Gazebo worlds and and models databases [can be found on Github here](https://github.com/PX4/PX4-gazebo-models).

:::note
`gz_env.sh.in` is compiled and made available in `$PX4_DIR/build/px4_sitl_default/rootfs/gz_env.sh`
:::

### Приклади

Here are some examples of the different scenarios covered above.

1. **Start simulator + default world + spawn vehicle at default pose**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

2. **Start simulator + default world + spawn vehicle at custom pose (y=2m)**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_POSE="0,2" PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

3. **Start simulator + default world + link to existing vehicle**

   ```sh
   PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_NAME=x500 ./build/px4_sitl_default/bin/px4
   ```

4. **Start simulator in standalone mode + connect to Gazebo instance running default world**

   ```sh
   PX4_GZ_STANDALONE=1 PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4
   ```

   In a separate terminal run:

   ```sh
   python /path/to/simulation-gazebo
   ```

## Adding New Worlds and Models

SDF files, mesh files, textures and anything else to do with the functionality and appearance in Gazebo for worlds and models can be placed in the appropriate `/worlds` and `/models` directories in [PX4-gazebo-models](https://github.com/PX4/PX4-gazebo-models).

Within PX4 follow the below steps to add models and worlds.

### Adding a Model

To add a new model:

1. Define an [airframe configuration file](../dev_airframes/adding_a_new_frame.md).
1. Define the default parameters for Gazebo in the airframe configuration file (this example is from [x500 quadcopter](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/4001_gz_x500)):

   ```ini
   PX4_SIMULATOR=${PX4_SIMULATOR:=gz}
   PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}
   PX4_SIM_MODEL=${PX4_SIM_MODEL:=<your model name>}
   ```

   - `PX4_SIMULATOR=${PX4_SIMULATOR:=gz}` sets the default simulator (Gz) for that specific airframe.
   - `PX4_GZ_WORLD=${PX4_GZ_WORLD:=default}` sets the [default world](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/simulation/gz/worlds/default.sdf) for that specific airframe.

   - Setting the default value of `PX4_SIM_MODEL` lets you start the simulation with just:

     ```sh
     PX4_SYS_AUTOSTART=<your new airframe id> ./build/px4_sitl_default/bin/px4
     ```

1. Add CMake Target for the [airframe](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/airframes/CMakeLists.txt).

   - If you plan to use "regular" mode, add your model SDF to `Tools/simulation/gz/models/`.
   - If you plan to use _standalone_ mode, add your model SDF to `~/.simulation-gazebo/models/`

   You can of course also use both.

### Adding a World

To add a new world:

1. Add your world to the list of worlds found in the [`CMakeLists.txt` here](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/simulation/gz_bridge/CMakeLists.txt). This is required in order to allow `CMake` to generate correct targets.

   - If you plan to use "normal" mode, add your world sdf to `Tools/simulation/gz/worlds/`.
   - If you plan to use _standalone_ mode, add your world SDF to `~/.simulation-gazebo/worlds/`

:::note
As long as the world file and the model file are in the Gazebo search path (`GZ_SIM_RESOURCE_PATH`) it is not necessary to add them to the PX4 world and model directories. However, `make px4_sitl gz_<model>_<world>` won't work with them.
:::

## PX4-Gazebo Time Synchronization

Unlike the Gazebo Classic and jMAVSim simulators, PX4 and Gazebo do not implement a lockstep mechanism.

During Gazebo simulations PX4 subscribes to the Gazebo `\clock` topic and uses it as clock source. This guarantees that PX4 will always wait for Gazebo before moving forward in time, even if Gazebo is running with real time factors different from 1.

Note, however, that as the lockstep is missing, Gazebo will never wait for PX4 to finish its computations. In the worst case scenario, PX4 can completely go offline and Gazebo will keep running, with obvious crashes of the simulated drone.

## Multi-Vehicle Simulation

Multi-Vehicle simulation is supported on Linux hosts.

For more information see: [Multi-Vehicle Simulation with Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md)

## Додаткова інформація

- [px4-simulation-ignition](https://github.com/Auterion/px4-simulation-ignition)
