# ROS з симуляцією Gazebo Classic

[ROS](../ros/README.md) (Робототехнічна операційна система) може бути використана з PX4 та симулятором [Gazebo Classic](../sim_gazebo_classic/README.md). Вона використовує [MAVROS](../ros/mavros_installation.md) вузол MAVLink для спілкування з PX4.

Інтеграція ROS/Gazebo Classic з PX4 дотримується шаблону на діаграмі нижче (показано _загальне_ [середовище симуляції PX4](../simulation/README.md#sitl-simulation-environment)) PX4 спілкується з симулятором (наприклад Gazebo Classic), щоб отримувати дані датчиків із модельованого світу і надсилає значення для двигунів та сервоприводів. Вона спілкується з GCS та зовнішнім API (наприклад ROS) щоб надіслати телеметрію із модельованого середовища та отримати команди.

![PX4 SITL overview](../../assets/simulation/px4_sitl_overview.png)

:::note
Єдина _незначна_ різниця від "нормальної поведінки" полягає в тому, що ROS ініціює з'єднання на порту 14557, тоді як для зовнішнього API більш типово - це прослуховувати з'єднання на UDP порту 14540.
:::

## Встановлення ROS та Gazebo Classic

:::note
_ROS_ підтримується тільки на Linux (не macOS або Windows).
:::

Найпростіший спосіб налаштувати симуляцію PX4 з ROS на Ubuntu Linux це використати стандартний скрипт установки який можна знайти у [Середовище розробки на Linux > Gazebo з ROS](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo). Скрипт встановлює все, що вам потрібно: PX4, ROS "Melodic", симулятор Gazebo Classic 9, та [MAVROS](../ros/mavros_installation.md).

:::note
Скрипт дотримується [стандартних інструкцій з встановлення ROS "Melodic" ](http://wiki.ros.org/melodic/Installation/Ubuntu), які включають Gazebo 9.
:::

## Запуск ROS/симуляції

Нижченаведена команда може бути використана для запуску симуляції та під'єднання ROS до неї через [MAVROS](../ros/mavros_installation.md), де `fcu_url` - це IP / порт комп'ютера, що виконує симуляцію:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@192.168.1.36:14557"
```

Для з'єднання з localhost (локальним комп'ютером), використовуйте цей URL:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::note
It can be useful to call _roslaunch_ with the `-w NUM_WORKERS` (override number of worker threads) and/or `-v` (verbose) in order to get warnings about missing dependencies in your setup. For example:

```sh
roslaunch mavros px4.launch fcu_url:="udp://:14540@127.0.0.1:14557"
```

:::

## Launching Gazebo Classic with ROS Wrappers

The Gazebo Classic simulation can be modified to integrate sensors publishing directly to ROS topics e.g. the Gazebo Classic ROS laser plugin. To support this feature, Gazebo Classic must be launched with the appropriate ROS wrappers.

There are ROS launch scripts available to run the simulation wrapped in ROS:

- [posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/main/launch/posix_sitl.launch): plain SITL launch
- [mavros_posix_sitl.launch](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch): SITL and MAVROS

To run SITL wrapped in ROS the ROS environment needs to be updated, then launch as usual:

(optional): only source the catkin workspace if you compiled MAVROS or other ROS packages from source:

```sh
cd <PX4-Autopilot_clone>
DONT_RUN=1 make px4_sitl_default gazebo-classic
source ~/catkin_ws/devel/setup.bash    # (optional)
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
roslaunch px4 posix_sitl.launch
```

Include one of the above mentioned launch files in your own launch file to run your ROS application in the simulation.

## What's Happening Behind the Scenes

This section shows how the _roslaunch_ instructions provided previously actually work (you can follow them to manually launch the simulation and ROS).

You will need three terminals, in all of them the ros environment must be sourced.

First start the simulator using the command below:

```sh
cd <PX4-Autopilot_clone>
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)
roslaunch px4 px4.launch
```

The console will look like this:

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

In the second terminal make sure you will be able to start gazebo with the world files defined in PX4-Autopilot. To do this set your environment variables to include the appropriate `sitl_gazebo-classic` folders.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Now start Gazebo Classic like you would when working with ROS

```sh
roslaunch gazebo_ros empty_world.launch world_name:=$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/worlds/empty.world
```

In the third terminal make sure you will be able to spawn the model with the sdf files defined in PX4-Autopilot. To do this set your environment variables to include the appropriate `sitl_gazebo-classic` folders.

```sh
cd <PX4-Autopilot_clone>
source Tools/simulation/gazebo-classic/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic
```

Now insert the Iris quadcopter model like you would when working with ROS. Once the Iris is loaded it will automatically connect to the px4 app.

```sh
rosrun gazebo_ros spawn_model -sdf -file $(pwd)/Tools/simulation/gazebo-classic/sitl_gazebo-classic/models/iris/iris.sdf -model iris -x 0 -y 0 -z 0 -R 0 -P 0 -Y 0
```
