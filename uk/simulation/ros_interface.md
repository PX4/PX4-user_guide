# ROS з симуляцією Gazebo Classic

[ROS](../ros/README.md) (Робототехнічна операційна система) може бути використана з PX4 та симулятором [Gazebo Classic](../sim_gazebo_classic/README.md). Вона використовує [MAVROS](../ros/mavros_installation.md) вузол MAVLink для спілкування з PX4.

Інтеграція ROS/Gazebo Classic з PX4 дотримується шаблону на діаграмі нижче (показано _загальне_ [середовище симуляції PX4](../simulation/README.md#sitl-simulation-environment)) PX4 спілкується з симулятором (наприклад Gazebo Classic), щоб отримувати дані датчиків із модельованого світу і надсилає значення для двигунів та сервоприводів. Вона спілкується з GCS та зовнішнім API (наприклад ROS) щоб надіслати телеметрію із модельованого середовища та отримати команди.

![Огляд PX4 SITL](../../assets/simulation/px4_sitl_overview.png)

:::info Єдина _незначна_ різниця від "нормальної поведінки" полягає в тому, що ROS ініціює з'єднання на порту 14557, тоді як для зовнішнього API більш типово - це прослуховувати з'єднання на UDP порту 14540.
:::

## Встановлення ROS та Gazebo Classic

[ROS (1) with MAVROS Installation Guide](../ros/mavros_installation.md) explains how to set up a guide for working with ROS (1), MAVROS, and PX4.

:::info _ROS_ підтримується тільки на Linux (не macOS або Windows).
:::

## Запуск ROS/симуляції

Нижченаведена команда може бути використана для запуску симуляції та під'єднання ROS до неї через [MAVROS](../ros/mavros_installation.md), де `fcu_url` - це IP / порт комп'ютера, що виконує симуляцію:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

Для з'єднання з localhost (локальним комп'ютером), використовуйте цей URL:

```sh
roslaunch -w 2 -v mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::info Може бути корисно викликати _roslaunch_ з `-w NUM_WORKERS` (перевизначити кількість робочих потоків) та/або `-v` (verbose, або розлогий вивід), щоб отримати попередження про відсутні залежності у вашій установці. Наприклад:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::

## Запуск Gazebo Classic за допомогою обгорток ROS

Симуляція Gazebo Classic може бути змінена для інтеграції публікації даних датчиків напряму в рубрики ROS наприклад ROS плагін лазера для Gazebo Classic. Для підтримки цієї функції, Gazebo Classic повинна бути запущена з відповідною обгорткою ROS.

Доступні скрипти запуску ROS для запуску симуляції в обгортці ROS:

- [posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/main/launch/posix_sitl.launch): звичайний запуск SITL
- [mavros_posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch): SITL та MAVROS

Щоб запустити SITL обгорнуту в ROS, необхідно оновити середовище ROS, а потім запустити як завжди:

(необов'язково): виконувати команду source у робочому просторі catkin потрібно тільки якщо ви скомпілювали MAVROS або інші пакети ROS з вихідного коду:

```sh
cd <PX4-Autopilot_clone>
DONT_RUN=1 make px4_sitl_default gazebo-classic
source ~/catkin_ws/devel/setup.bash    # (optional)
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
roslaunch px4 posix_sitl.launch
```

Включіть один зі згаданих вище файлів запуску у ваш власний файл запуску для запуску застосунку ROS в симуляції.

## Що відбувається за лаштунками

Цей розділ показує як інструкції _roslaunch_ надані раніше власне працюють (ви можете дотримуватися їх щоб запустити симуляція та ROS вручну).

Вам потрібно три термінали, у всіх потрібно запустити команду source у ROS середовищі.

Спочатку запустіть симулятор, використовуючи наступну команду:

```sh
cd <PX4-Autopilot_clone>
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
roslaunch px4 px4.launch
```

У консолі буде приблизно це:

```sh
INFO  [px4] instance: 0

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.

INFO  [px4] startup script: /bin/sh etc/init.d-posix/rcS 0
INFO  [init] found model autostart file as SYS_AUTOSTART=10016
INFO  [param] selected parameter default file parameters.bson
INFO  [param] importing from 'parameters.bson'
INFO  [parameters] BSON document size 295 bytes, decoded 295 bytes (INT32:12, FLOAT:3)
INFO  [param] selected parameter backup file parameters_backup.bson
INFO  [dataman] data manager file './dataman' size is 7866640 bytes
etc/init.d-posix/rcS: 31: [: Illegal number:
INFO  [init] PX4_SIM_HOSTNAME: localhost
INFO  [simulator_mavlink] Waiting for simulator to accept connection on TCP port 4560
```

У другому терміналі переконайтесь, що зможете запустити gazebo з файлами світу, визначеними у PX4-Autopilot. Щоб зробити це, встановить змінні середовища, щоб включити відповідні директорії `sitl_gazebo-classic`.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Тепер запустіть з Gazebo Classic так, як ви хотіли б працювати з ROS:

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/worlds/empty.world
```

У третьому терміналі переконайтесь що зможете відтворити модель з sdf файлами, визначеними у PX4-Autopilot. Щоб зробити це, встановить змінні середовища, щоб включити відповідні директорії `sitl_gazebo-classic`.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Тепер додайте модель квадрокоптера Iris так, як ви б хотіли коли працюєте з ROS. Після завантаження Iris автоматично з'єднається із застосунком px4.

```sh
rosrun gazebo_ros spawn_model -sdf -file $(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/iris/iris.sdf -model iris -x 0 -y 0 -z 0 -R 0 -P 0 -Y 0
```
