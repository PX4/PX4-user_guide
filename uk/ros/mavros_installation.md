# Посібник із встановлення ROS з MAVROS

[MAVROS](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status) – це пакет ROS 1, який забезпечує розширений зв’язок MAVLink між комп’ютерами, на яких працює ROS 1, для будь-якого автопілота, наземної станції чи периферійного пристрою з підтримкою MAVLink. *MAVROS* є "офіційним", підтримуваним мостом між ROS 1 та протоколом MAVLink.

Хоча MAVROS можна використовувати для зв’язку з будь-яким автопілотом із підтримкою MAVLink, у цій документації пояснюється, як налаштувати зв’язок між автопілотом PX4 і комп’ютером-компаньйоном із підтримкою ROS 1.

:::warning
Команда розробників PX4 рекомендує усім користувачам [перейти на ROS 2](../ros/ros2.md). Ця документація відображає "старий підхід".
:::

## Встановлення

:::note
Спершу встановіть ROS і PX4 слідуючи інструкціям у [Середа розробки у Linux > ROS/Gazebo Classic](../dev_setup/dev_env_linux_ubuntu.md#ros-gazebo-classic).
:::

:::tip
These instructions are a simplified version of the [official installation guide](https://github.com/mavlink/mavros/tree/master/mavros#installation). They cover the *ROS Melodic and Noetic* releases.
:::

MAVROS can be installed either from source or binary. We recommend that developers use the source installation.

### Binary Installation (Debian / Ubuntu)

The ROS repository has binary packages for Ubuntu x86, amd64 (x86\_64) and armhf (ARMv7). Kinetic also supports Debian Jessie amd64 and arm64 (ARMv8).

Use `apt-get` for installation, where `${ROS_DISTRO}` below should resolve to `kinetic` or `noetic`, depending on your version of ROS:

```
sudo apt-get install ros-${ROS_DISTRO}-mavros ros-${ROS_DISTRO}-mavros-extras ros-${ROS_DISTRO}-mavros-msgs
```

Then install [GeographicLib](https://geographiclib.sourceforge.io/) datasets by running the `install_geographiclib_datasets.sh` script:

```
wget https://raw.githubusercontent.com/mavlink/mavros/master/mavros/scripts/install_geographiclib_datasets.sh
sudo bash ./install_geographiclib_datasets.sh   
```

### Source Installation

This installation assumes you have a catkin workspace located at `~/catkin_ws` If you don't create one with:

```sh
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin init
wstool init src
```

You will be using the ROS Python tools: *wstool* (for retrieving sources), *rosinstall*, and *catkin_tools* (building) for this installation. While they may have been installed during your installation of ROS you can also install them with:

```sh
sudo apt-get install python-catkin-tools python-rosinstall-generator -y
```

:::tip
While the package can be built using **catkin_make** the preferred method is using **catkin_tools** as it is a more versatile and "friendly" build tool.
:::

If this is your first time using wstool you will need to initialize your source space with:
```sh
$ wstool init ~/catkin_ws/src
```

Now you are ready to do the build:

1. Встановіть MAVLink:
   ```
   # We use the Kinetic reference for all ROS distros as it's not distro-specific and up to date
   rosinstall_generator --rosdistro kinetic mavlink | tee /tmp/mavros.rosinstall
   ```
1. Install MAVROS from source using either released or latest version:
   * Released/stable
     ```sh
     rosinstall_generator --upstream mavros | tee -a /tmp/mavros.rosinstall
     ```
   * Latest source
     ```sh
     rosinstall_generator --upstream-development mavros | tee -a /tmp/mavros.rosinstall
     ```

     ```sh
     # For fetching all the dependencies into your catkin_ws, 
     # just add '--deps' to the above scripts, E.g.:
     #   rosinstall_generator --upstream mavros --deps | tee -a /tmp/mavros.rosinstall
     ```

1. Create workspace & deps

   ```sh
   wstool merge -t src /tmp/mavros.rosinstall
   wstool update -t src -j4
   rosdep install --from-paths src --ignore-src -y
   ```

1. Встановіть [GeographicLib](https://geographiclib.sourceforge.io/) датасети:
   ```sh
   ./src/mavros/mavros/scripts/install_geographiclib_datasets.sh
   ```

1. Build source
   ```sh
   catkin build
   ```

1. Переконайтеся, що ви використовуєте setup.bash або setup.zsh з робочого простору.

   ```sh
   #Needed or rosrun can't find nodes from this workspace.
   source devel/setup.bash
   ```

In the case of error, there are addition installation and troubleshooting notes in the [mavros repo](https://github.com/mavlink/mavros/tree/master/mavros#installation).

## MAVROS Приклади

[MAVROS Offboard Приклад (C++)](../ros/mavros_offboard_cpp.md), показує базові можливості MAVROS, читання телеметрії, перевірка стану дрона, зміна режимів польоту і керування дроном.

:::note
Якщо у вас є приклад додатку, що використовує PX4 Autopilot і MAVROS, ми можемо допомогти додати його у нашу документацію.
:::

## Дивіться також

- [Огляд mavros ROS Package](http://wiki.ros.org/mavros#mavros.2BAC8-Plugins.sys_status)
- [mavros source](https://github.com/mavlink/mavros/)
- [ROS Melodic інструкція встановлення](http://wiki.ros.org/melodic/Installation)
