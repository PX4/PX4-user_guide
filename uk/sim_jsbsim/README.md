# Симуляція JSBSim

:::warning
Цей симулятор [підтримується та обслуговується спільнотою](../simulation/community_supported_simulators.md). Це може або не може працювати з поточними версіями PX4.

Дивіться [Інсталяція інструментів](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основним розробницьким командою.
:::

[JSBSim](http://jsbsim.sourceforge.net/index.html) is a open source flight simulator ("flight dynamics model (FDM)") that runs on Microsoft Windows, Apple Macintosh, Linux, IRIX, Cygwin (Unix on Windows), etc. Серед його можливостей: повністю налаштована аеродинаміка та система приводу, яка може моделювати складну динаміку польоту літака. В обчислення також враховуються обертальні ефекти Землі.

**Supported Vehicles:** Plane, Quadrotor, Hexarotor

@[youtube](https://youtu.be/y5azVNmIVyw)

:::note
Дивіться [Симуляція](../simulation/README.md) для загальної інформації про симулятори, середовище симуляції та конфігурацію симуляції (наприклад, підтримувані транспортні засоби).
:::

## Встановлення (Ubuntu Linux)

:::note
These instructions were tested on Ubuntu 18.04
:::

1. Install the usual [Development Environment on Ubuntu LTS / Debian Linux](../dev_setup/dev_env_linux_ubuntu.md).
1. Install a JSBSim release from the [release page](https://github.com/JSBSim-Team/jsbsim/releases/tag/Linux):

   ```sh
   dpkg -i JSBSim-devel_1.1.0.dev1-<release-number>.bionic.amd64.deb
   ```

1. (Optional) FlightGear may (optionally) be used for visualisation. To install FlightGear, refer to the [FlightGear installation instructions](../sim_flightgear/README.md)).

## Запуск симуляції

JSBSim SITL симуляцію можна зручно запустити за допомогою команди `make`, як показано нижче:

```sh
cd /path/to/PX4-Autopilot
make px4_sitl jsbsim
```

Це запустить інстанцію PX4 SITL та інтерфейс FlightGear (для візуалізації). Якщо ви хочете запустити без інтерфейсу FlightGear, ви можете додати `HEADLESS=1` перед командою `make`.

Підтримувані транспортні засоби та команди `make` перелічені нижче (натисніть на посилання, щоб побачити зображення транспортних засобів).

| Рухомий засіб     | Команда                            |
| ----------------- | ---------------------------------- |
| Стандартний літак | `make px4_sitl jsbsim_rascal`      |
| Quadrotor         | `make px4_sitl jsbsim_quadrotor_x` |
| Hexarotor         | `make px4_sitl jsbsim_hexarotor_x` |

Вищезазначені команди запускають один літальний апарат із повним інтерфейсом користувача. _QGroundControl_ should be able to automatically connect to the simulated vehicle.

## Виконання JSBSim з ROS

Щоб запустити JSBSim з прошивками:

1. Клонуйте пакет `px4-jsbsim-bridge` у ваше робоче середовище catkin:

   ```sh
   cd <path_to_catkin_ws>/src
   git clone https://github.com/Auterion/px4-jsbsim-bridge.git
   ```

1. Побудуйте пакет catkin `jsbsim_bridge`:

   ```sh
   catkin build jsbsim_bridge
   ```

:::note
You must have already set MAVROS in your workspace (if not, follow the instructions in the [MAVROS installation guide](../ros/mavros_installation.md)).
:::

1. Так почніть JSBSim через ROS, використовуючи файл запуску, як показано:

   ```sh
   roslaunch jsbsim_bridge px4_jsbsim_bridge.launch
   ```

## Подальша інформація

- [px4-jsbsim-bridge readme](https://github.com/Auterion/px4-jsbsim-bridge)
