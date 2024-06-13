# ROS (1) with MAVROS Installation Guide

:::warning
The PX4 development team recommend that all users [upgrade to ROS 2](../ros2/index.md). Ця документація відображає "старий підхід".
:::

This documentation explains how to set up communication between the PX4 Autopilot and a ROS 1 enabled companion computer using MAVROS.

[MAVROS](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) – це пакет ROS 1, який забезпечує розширений зв’язок MAVLink між комп’ютерами, на яких працює ROS 1, для будь-якого автопілота, наземної станції чи периферійного пристрою з підтримкою MAVLink. _MAVROS_ is the "official" supported bridge between ROS 1 and the MAVLink protocol.

First we install PX4 and ROS, and then MAVROS.

## Install ROS and PX4

This section explains how to install [ROS 1](../ros/index.md) with PX4. ROS 1 full desktop builds come with Gazebo Classic, so normally you will not install the simulator dependencies yourself!

:::tip
Ці інструкції спрощена версія [офіційного посібника з встановлення](https://github.com/mavlink/mavros/tree/master/mavros#installation). They cover the _ROS Melodic and Noetic_ releases.
:::

:::: tabs

::: tab ROS Noetic (Ubuntu 22.04)

If you're working with [ROS Noetic](http://wiki.ros.org/noetic) on Ubuntu 20.04:

1. Install PX4 without the simulator toolchain:

   1. [Download PX4 Source Code](../dev_setup/building_px4.md):

      ```sh
      git clone https://github.com/PX4/PX4-Autopilot.git --recursive
      ```

   1. Run the **ubuntu.sh** the `--no-sim-tools` (and optionally `--no-nuttx`):

      ```sh
      bash ./PX4-Autopilot/Tools/setup/ubuntu.sh --no-sim-tools --no-nuttx
      ```

      - Acknowledge any prompts as the script progress.

   1. Restart the computer on completion.

1. You _may_ need to install the following additional dependencies:

   ```sh
   sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y
   ```

1. Follow the [Noetic Installation instructions](http://wiki.ros.org/noetic/Installation/Ubuntu#Installation) (ros-noetic-desktop-full is recommended).

:::

::: tab ROS Melodic (Ubuntu 18.04)

If you're working with ROS "Melodic on Ubuntu 18.04:

1. Download the [ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh) script in a bash shell:

   ```sh
   wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh
   ```

1. Run the script:

   ```sh
   bash ubuntu_sim_ros_melodic.sh
   ```

   You may need to acknowledge some prompts as the script progresses.

::: tip
You don't need to install MAVROS (as shown below), as this is included by the script

   Also note:
   - ROS Melodic is installed with Gazebo (Classic) 9 by default.
   - Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
   - The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::

::::

## Install MAVROS

Then MAVROS can be installed either from source or binary. Ми рекомендуємо розробникам використовувати початкове встановлення.

#### Бінарне встановлення (Debian / Ubuntu)

The ROS repository has binary packages for Ubuntu x86, amd64 (x86_64) and armhf (ARMv7). Kinetic також підтримує Debian Jessie amd64 і arm64 (ARMv8).

Для встановлення використовуйте `apt-get`, де `${ROS_DISTRO}` нижче має перетворитися на `kinetic` або `noetic`, залежно від вашої версії ROS:

```sh
sudo apt-get install ros-${ROS_DISTRO}-mavros ros-${ROS_DISTRO}-mavros-extras ros-${ROS_DISTRO}-mavros-msgs
```

Потім встановіть [GeographicLib](https://geographiclib.sourceforge.io/) датасет, виконавши цей `install_geographiclib_datasets.sh` скрипт:

```sh
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh
```

#### Встановлення початкового коду

Ця інсталяція передбачає, що у вас є робочий простір catkin, розташований у `~/catkin_ws` Якщо ви не створили його:

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

You will be using the ROS Python tools: _wstool_ (for retrieving sources), _rosinstall_, and _catkin_tools_ (building) for this installation. Хоча вони могли бути встановлені під час інсталяції ROS, ви також можете встановити їх разом з ним:

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

   ```sh
   # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```

1. Встановити MAVROS з джерела, використовуючи як випущену, так і останню версію:

   - Випущений реліз/стабільний

     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```

   - Найновіше джерело

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

:::info
Якщо у вас є приклад додатку, що використовує PX4 Autopilot і MAVROS, ми можемо допомогти додати його у нашу документацію.
:::

## Дивіться також

- [Огляд mavros ROS Package](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros source](https://github.com/mavlink/mavros/)
- [ROS Melodic інструкція встановлення](http://wiki.ros.org/melodic/Installation)
