# Посібник із встановлення ROS з MAVROS

[MAVROS](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) – це пакет ROS 1, який забезпечує розширений зв’язок MAVLink між комп’ютерами, на яких працює ROS 1, для будь-якого автопілота, наземної станції чи периферійного пристрою з підтримкою MAVLink. *MAVROS* є "офіційним", підтримуваним мостом між ROS 1 та протоколом MAVLink.

Хоча MAVROS можна використовувати для зв’язку з будь-яким автопілотом із підтримкою MAVLink, у цій документації пояснюється, як налаштувати зв’язок між автопілотом PX4 і комп’ютером-компаньйоном із підтримкою ROS 1.

:::warning
Команда розробників PX4 рекомендує усім користувачам [перейти на ROS 2](../ros/ros2.md). Ця документація відображає "старий підхід".
:::

## Встановлення

::: info First install ROS and PX4 following the instructions in [Development Environment on Linux > ROS/Gazebo Classic](../dev_setup/dev_env_linux_ubuntu.md#ros-gazebo-classic).
:::

:::tip
Ці інструкції спрощена версія [офіційного посібника з встановлення](https://github.com/mavlink/mavros/tree/master/mavros#installation). Вони охоплюють релізи *ROS Melodic and Noetic*.
:::

MAVROS можна встановити як з вихідного коду, так і з бінарників. Ми рекомендуємо розробникам використовувати початкове встановлення.

### Бінарне встановлення (Debian / Ubuntu)

У репозиторії ROS є бінарні пакети для Ubuntu x86, amd64 (x86\_64) та armhf (ARMv7). Kinetic також підтримує Debian Jessie amd64 і arm64 (ARMv8).

Для встановлення використовуйте `apt-get`, де `${ROS_DISTRO}` нижче має перетворитися на `kinetic` або `noetic`, залежно від вашої версії ROS:

```
sudo apt-get install ros-${ROS_DISTRO}-mavros ros-${ROS_DISTRO}-mavros-extras ros-${ROS_DISTRO}-mavros-msgs
```

Потім встановіть [GeographicLib](https://geographiclib.sourceforge.io/) датасет, виконавши цей `install_geographiclib_datasets.sh` скрипт:

```
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh   
```

### Встановлення початкового коду

Ця інсталяція передбачає, що у вас є робочий простір catkin, розташований у `~/catkin_ws` Якщо ви не створили його:

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

Ви будете використовувати інструменти ROS Python: *wstool* (для отримання джерел), *rosinstall* і *catkin_tools* (збірка) для цього встановлення. Хоча вони могли бути встановлені під час інсталяції ROS, ви також можете встановити їх разом з ним:

```sh
sudo apt-get install python-catkin-tools python-rosinstall-generator -y
```

:::tip
Хоча пакунок можна створити за допомогою **catkin_make**, кращим методом є використання **catkin_tools**, оскільки це більш універсальний і «дружній» інструмент збирання.
:::

Якщо це ваш перший раз за допомогою wstool вам потрібно буде ініціалізувати свій вихідний простір з:
```sh
$ wstool init ~/catkin_ws/src
```

Тепер ви готові зробити збірку:

1. Встановіть MAVLink:
   ```
   # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. Встановити MAVROS з джерела, використовуючи як випущену, так і останню версію:
   * Випущений реліз/стабільний
     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```
   * Найновіше джерело
     ```sh
     rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```

     ```sh
     # For fetching all the dependencies into your catkin_ws, 
     # just add '--deps' to the above scripts, E.g.:
     #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. Створити робоче середовище & deps

   ```sh
   wstool merge -t src /tmp/mavros.rosinstall
   wstool update -t src -j4
   rosdep install --from-paths src --ignore-src -y
   ```

1. Встановіть [GeographicLib](https://geographiclib.sourceforge.io/) датасети:
   ```sh
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. Джерело збірки
   ```sh
   catkin build
   ```

1. Переконайтеся, що ви використовуєте setup.bash або setup.zsh з робочого простору.

   ```sh
   #Needed or rosrun can't find nodes from this workspace.
   source devel/setup.bash
   ```

На випадок помилки є додаткові примітки щодо встановлення та усунення несправностей у [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation).

## MAVROS Приклади

[MAVROS Offboard Приклад (C++)](../ros/mavros_offboard_cpp.md), показує базові можливості MAVROS, читання телеметрії, перевірка стану дрона, зміна режимів польоту і керування дроном.

::: info
If you have an example app using the PX4 Autopilot and MAVROS, we can help you get it on our docs.
:::

## Дивіться також

- [Огляд mavros ROS Package](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros source](https://github.com/mavlink/mavros/)
- [ROS Melodic інструкція встановлення](http://wiki.ros.org/melodic/Installation)
