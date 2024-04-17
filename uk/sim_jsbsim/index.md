# Симуляція JSBSim

:::warning
Цей симулятор [підтримується та обслуговується спільнотою](../simulation/community_supported_simulators.md). Це може або не може працювати з поточними версіями PX4.

Дивіться [Інсталяція інструментів](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основним розробницьким командою.
:::

[JSBSim](http://jsbsim.sourceforge.net/index.html) - це відкрите програмне забезпечення симулятора польоту ("модель динаміки польоту (FDM)"), який працює на операційних системах Microsoft Windows, Apple Macintosh, Linux, IRIX, Cygwin (Unix на Windows) та ін. Серед його можливостей: повністю налаштована аеродинаміка та система приводу, яка може моделювати складну динаміку польоту літака. В обчислення також враховуються обертальні ефекти Землі.

**Підтримувані транспортні засоби:** літак, квадротор, гексаротор

@[youtube](https://youtu.be/y5azVNmIVyw)

:::info Див. [Симуляція](../simulation/index.md) для загальної інформації про симулятори, середовище симуляції та конфігурацію симуляції (наприклад, підтримувані транспортні засоби).
:::

## Встановлення (Ubuntu Linux)

:::info
Ці інструкції були перевірені на Ubuntu 18.04
:::

1. Установіть звичайне [Середовище розробки на Ubuntu LTS / Debian Linux](../dev_setup/dev_env_linux_ubuntu.md).
1. Встановіть випуск JSBSim зі [сторінки релізів](https://github.com/JSBSim-Team/jsbsim/releases/tag/Linux):

   ```sh
   dpkg -i JSBSim-devel_1.1.0.dev1-<release-number>.bionic.amd64.deb
   ```

1. (Необов’язково) FlightGear можна (необов’язково) використовувати для візуалізації. Щоб установити FlightGear, перегляньте [інструкції зі встановлення FlightGear](../sim_flightgear/README.md)).

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
| Квадротор         | `make px4_sitl jsbsim_quadrotor_x` |
| Гексаротор        | `make px4_sitl jsbsim_hexarotor_x` |

Вищезазначені команди запускають один літальний апарат із повним інтерфейсом користувача. _QGroundControl_ повинна автоматично підключатися до симульованого транспортного засобу.

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

   :::info Ви повинні вже мати встановлену MAVROS у своєму робочому просторі (якщо ні, дотримуйтеся інструкцій у [Посібнику з встановлення MAVROS](../ros/mavros_installation.md)).
:::

1. Так почніть JSBSim через ROS, використовуючи файл запуску, як показано:

   ```sh
   roslaunch jsbsim_bridge px4_jsbsim_bridge.launch
   ```

## Подальша інформація

- [px4-jsbsim-bridge readme](https://github.com/Auterion/px4-jsbsim-bridge)
