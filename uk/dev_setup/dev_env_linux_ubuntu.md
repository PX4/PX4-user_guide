# Середовище розробки Ubuntu

The following instructions use a bash script to set up the PX4 development environment on the [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) versions supported by PX4: Ubuntu 22.04 (Jammy Jellyfish), 20.04 (Focal Fossa), and 18.04 (Bionic Beaver).

The environment includes:

- [Gazebo Simulator](../sim_gazebo_gz/index.md) on Ubuntu 22.04 and Ubuntu 20.04
- [Gazebo Classic Simulator](../sim_gazebo_classic/index.md) on Ubuntu 20.04 and Ubuntu 18.04
- [Build toolchain for Pixhawk (and other NuttX-based hardware)](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

::: info The build toolchain for other flight controllers, simulators, and working with ROS are discussed in the [Other Targets](#other-targets) section below.
:::

## Симуляція та NuttX (Pixhawk)

Використовуйте скрипт [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/Tools/setup/ubuntu.sh) для встановлення інструментарію середовища розробника який дозволяє робити збірки для симуляторів або [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

:::tip
The script is intended to be run on _clean_ Ubuntu LTS installations, and may not work if run "on top" of an existing system, or on a different Ubuntu release.
:::

Щоб встановити інструментарій:

1. [Завантажте вихідний код PX4](../dev_setup/building_px4.md):

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git --recursive
   ```

:::note
Скрипти налаштування середовища у вихідному коді зазвичай працюють для останніх версій PX4. Якщо ви працюєте зі старішою версією PX4, то може знадобитися [отримати вихідний код для конкретного релізу](../contribute/git_examples.md#get-a-specific-release).
:::

1. Запустіть **ubuntu.sh** без аргументів (в оболонці bash), щоб встановити все:

   ```sh
   bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
   ```

   - При появі підказки по ходу виконання скрипту підтвердить вибір.
   - Також можна використовувати опції `--no-nuttx` та `--no-sim-tools`, щоб пропустити встановлення інструментів для NuttX та/або симуляції.

1. Перезавантажте комп'ютер при завершенні.

:::details
Додаткові примітки Ці замітки надаються лише тільки "для інформації":

- This setup is supported by the PX4 Dev Team. Інструкції також можуть працювати на інших системах заснованих на Debian Linux.
- The script installs [Gazebo](../sim_gazebo_gz/index.md) "Garden" on Ubuntu 22.04, [Gazebo Classic](../sim_gazebo_classic/index.md) 11 on Ubuntu 20.04, and Gazebo Classic 9 on Ubuntu 18.04.
- Якщо ви хочете використовувати Gazebo на Ubuntu 20.04 можна додати його вручну. Дивіться розділ [Gazebo > Встановлення](../sim_gazebo_gz/README.md#installation-ubuntu-linux).
- You can verify the NuttX installation by confirming the `gcc` version as shown:

  ```sh
  $arm-none-eabi-gcc --version

  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 9-2020-q2-update) 9.3.1 20200408 (release)
  Copyright (C) 2019 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```

- Вам все одно потрібен вихідний код PX4. Однак якщо ви просто хочете встановити середовище розробки без того, щоб завантажувати весь код, замість цього ви можете просто завантажити  [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/Tools/setup/ubuntu.sh) та [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/Tools/setup/requirements.txt) після чого виконати **ubuntu.sh**:

  ```sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/release/1.15/Tools/setup/ubuntu.sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/release/1.15/Tools/setup/requirements.txt
  bash ubuntu.sh
  ```


:::

## Відеоінструкція

Це відео показує як встановити інструментарій для цільових платформ NuttX та симуляції ([описано нижче](#simulation-and-nuttx-pixhawk-targets)) разом із базовим тестуванням що охоплено в розділі [Збірка програмного забезпечення PX4](../dev_setup/building_px4.md).

::: warning
The video suggests that you build source using JMAVSim, entering the command: `make px4_sitl jmavsim`. As JMAVSim is now community-supported, you should instead build using Gazebo or Gazebo Classic, as shown in [Building the Code](../dev_setup/building_px4.md#first-build-using-a-simulator)
:::

@[youtube](https://youtu.be/OtValQdAdrU).

## Other Targets

The Ubuntu development environment for ROS, other simulators, and other hardware targets, is covered in their respective documentation. A subset of the relevant topics are linked below.

Raspberry Pi

- [Raspberry Pi 2/3 Navio2 Autopilot > PX4 Development Environment](../flight_controller/raspberry_pi_navio2.md#px4-development-environment)
- [Плата розширення Raspberry Pi 2/3/4 PilotPi](../flight_controller/raspberry_pi_pilotpi.md).

ROS

- ROS 2: [ROS 2 User Guide > Installation & Setup](../ros2/user_guide.md#installation-setup).
- ROS (1): [ROS (1) Installation Guide](../ros/mavros_installation.md)

## Наступні кроки

Після того, як ви закінчите налаштування інструментів командного рядка:

- Встановіть [VSCode](../dev_setup/vscode.md) (якщо ви надаєте перевагу IDE ніж командному рядку).
- Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md)

:::tip
The _daily build_ includes development tools that hidden in release builds. Вона також може надати доступ до нових функцій PX4, які ще не підтримуються в релізних збірках.
:::

- Переходьте до [інструкцій збірки](../dev_setup/building_px4.md).
