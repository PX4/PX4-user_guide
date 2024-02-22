# Середовище розробки Ubuntu

Наступні інструкції налаштування середовища розробки з PX4 на версіях [Ubuntu Linux LTS](https://wiki.ubuntu.com/LTS) підтримуються розробниками PX4. Ці версії Ubuntu включають: 18.04 (Bionic Beaver), 20.04 (Focal Fossa) і Ubuntu 22.04 (Jammy Jellyfish).

Bash скрипти надаються для спрощення процесу. Задумувалося що вони будуть запускатися на _чистих_ інсталяціях Ubuntu LTS та можуть не працювати, якщо запускаються "поверх" наявної операційної системи або на інших релізах Ubuntu.

[Цільові платформи що підтримуються](../dev_setup/dev_env.md#supported-targets):

- [Цільові платформи Симуляція та NuttX (Pixhawk)](#simulation-and-nuttx-pixhawk-targets). Це включає: [Gazebo](../sim_gazebo_gz/README.md), [Gazebo Classic](../sim_gazebo_classic/README.md), [jMAVSim](../sim_jmavsim/README.md), [Pixhawk та інші основані на NuttX апаратні платформи](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards)).
- [Raspberry Pi](#raspberry-pi)
- [ROS 2](#ros-2) (Робототехнічна операційна система)
- [ROS 1](#ros-gazebo-classic) (Робототехнічна операційна система)

:::tip
Ця установка підтримується командою розробників PX4.
Інструкції також можуть працювати на інших системах заснованих на Debian Linux.
:::

## Відеоінструкція

Це відео показує як встановити інструментарій для цільових платформ NuttX та симуляції ([описано нижче](#simulation-and-nuttx-pixhawk-targets)) разом із базовим тестуванням що охоплено в розділі [Збірка програмного забезпечення PX4](../dev_setup/building_px4.md).

@[youtube](https://youtu.be/OtValQdAdrU).

## Цільові платформи Симуляція та NuttX (Pixhawk)

:::warning
Користувачам ROS слід спочатку прочитати/пропустити до секції [ROS/Gazebo](#rosgazebo) або [ROS 2](#ros-2).
:::

Використовуйте скрипт [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) для встановлення інструментарію середовища розробника який дозволяє робити збірки для симуляторів або [NuttX/Pixhawk](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards). Скрипт встановлює [jMAVSim](../sim_jmavsim/README.md) для всіх варіантів встановлення, [Gazebo Classic](../sim_gazebo_classic/README.md) 9 на Ubuntu 18. 4, Gazebo Classic 11 на Ubuntu 20.04 та "Сад" [Gazebo](../sim_gazebo_gz/README.md)  на Ubuntu 22.04.

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

- Якщо ви хочете використовувати Gazebo на Ubuntu 20.04 можна додати його вручну. Дивіться розділ [Gazebo > Встановлення](../sim_gazebo_gz/README.md#installation-ubuntu-linux).
- Ви можете перевірити встановлення NuttX, підтвердивши версію gcc як показано нижче:

  ```sh
  $arm-none-eabi-gcc --version

  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 9-2020-q2-update) 9.3.1 20200408 (release)
  Copyright (C) 2019 Free Software Foundation, Inc.
  This is free software; see the source for copying conditions.  There is NO
  warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  ```

- Вам все одно потрібен вихідний код PX4. Однак якщо ви просто хочете встановити середовище розробки без того, щоб завантажувати весь код, замість цього ви можете просто завантажити  [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) та [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/requirements.txt) після чого виконати **ubuntu.sh**:

  ```sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
  wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
  bash ubuntu.sh
  ```

     <!-- From https://gazebosim.org/docs/garden/install_ubuntu -->


:::

<a id="raspberry-pi-hardware"></a>

## Raspberry Pi

Наступні інструкції пояснюють як встановити та зібрати набір інструментів для RasPi на _Ubuntu 18.04_.

:::warning
Для збірки на Ubuntu 20.04 (focal) потрібно використовувати Docker (інструментарій GCC на Ubuntu 20.04 може зібрати PX4, але згенеровані бінарні файли занадто нові, щоб запустити їх на реальній Pi). Для отримання додаткової інформації дивіться [PilotPi з Raspberry Pi OS Швидкий старт розробки > Альтернативний метод збірки використовуючи Docker](../flight_controller/raspberry_pi_pilotpi_rpios.md#alternative-build-method-using-docker).
:::

Щоб отримати загальні залежності для Raspberry Pi:

1. Завантажте [ubuntu.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/ubuntu.sh) <!-- NEED px4_version --> та [requirements.txt](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/setup/requirements.txt) з репозиторію PX4 (**/Tools/setup/**): <!-- NEED px4_version -->
   ```
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/ubuntu.sh
   wget https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/Tools/setup/requirements.txt
   ```
1. Запустіть **ubuntu.sh** в терміналі для отримання тільки загальних залежностей:
   ```sh
   bash ubuntu.sh --no-nuttx --no-sim-tools
   ```
1. Потім налаштуйте крос-компілятор (або GCC або clang) як описано в наступних розділах.

### GCC (armhf)

Репозиторій програмного забезпечення Ubuntu надає набір попередньо скомпільованих інструментаріїв. Зверніть увагу, що Ubuntu Focal має в складі інструментарій версії `gc-9-arm-linux-gnueabihf`, бо це встановлення за замовчуванням, і яке не підтримується повністю, тому потрібно вручну встановити версію `gc-8-arm-linux-gnueabihf` і встановити його як інструментарій за замовчуванням. Ці інструкції також поширюється на більш ранні релізи Ubuntu (наприклад Bionic). Наступна інструкція припускає, що у вас не встановлено жодної версії arm-linux-gnueabihf й встановить виконуваний файл за замовчуванням за допомогою `update-alternatives`. Встановіть інструментарій за допомогою команди терміналу:

```sh
sudo apt-get install -y gcc-8-arm-linux-gnueabihf g++-8-arm-linux-gnueabihf
```

Налаштуйте їх як інструментарій за замовчуванням:

```sh
sudo update-alternatives --install /usr/bin/arm-linux-gnueabihf-gcc arm-linux-gnueabihf-gcc /usr/bin/arm-linux-gnueabihf-gcc-8 100 --slave /usr/bin/arm-linux-gnueabihf-g++ arm-linux-gnueabihf-g++ /usr/bin/arm-linux-gnueabihf-g++-8
sudo update-alternatives --config arm-linux-gnueabihf-gcc
```

### GCC (aarch64)

Якщо ви хочете зібрати PX4 для пристроїв на архітектурі ARM64, необхідний цей розділ.

```sh
sudo apt-get install -y gcc-8-aarch64-linux-gnu g++-8-aarch64-linux-gnu
sudo update-alternatives --install /usr/bin/aarch64-linux-gnu-gcc aarch64-linux-gnu-gcc /usr/bin/aarch64-linux-gnu-gcc-8 100 --slave /usr/bin/aarch64-linux-gnu-g++ aarch64-linux-gnu-g++ /usr/bin/aarch64-linux-gnu-g++-8
sudo update-alternatives --config aarch64-linux-gnu-gcc
```

### Clang (необов'язково)

Спочатку встановіть GCC (потрібно для використання clang).

Ми рекомендуємо брати clang з репозиторію програмного забезпечення Ubuntu, як показано нижче:

```
sudo apt-get install clang
```

Приклад нижче для побудови прошивки PX4 з дерева вихідного коду, використовуючи _CMake_.

```sh
cd <PATH-TO-PX4-SRC>
mkdir build/px4_raspberrypi_default_clang
cd build/px4_raspberrypi_default_clang
cmake \
-G"Unix Makefiles" \
-DCONFIG=px4_raspberrypi_default \
-UCMAKE_C_COMPILER \
-DCMAKE_C_COMPILER=clang \
-UCMAKE_CXX_COMPILER \
-DCMAKE_CXX_COMPILER=clang++ \
../..
make
```

### Подробиці

Additional developer information for using PX4 on Raspberry Pi (including building PX4 natively) can be found here:

- [Raspberry Pi 2/3 Navio2 Autopilot](../flight_controller/raspberry_pi_navio2.md).
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md).

## ROS 2

Information about ROS 2 setup and development with PX4 can be found in the [ROS 2 User Guide](../ros/ros2_comm.md).

Generally speaking if you're working with hardware and don't need to modify PX4 itself, then you do not need a PX4 development environment (dependencies for working with ROS 2 are included and built into PX4 firmware by default).

You will need to install the normal development [simulator environment](#simulation-and-nuttx-pixhawk-targets) in order to work with the PX4 simulator.

<a id="rosgazebo"></a>

## ROS/Gazebo Classic

This section explains how to install [ROS 1](../ros/README.md) with PX4. ROS 1 full desktop builds come with Gazebo Classic, so normally you will not install PX4 simulator dependencies yourself!

### ROS Noetic/Ubuntu 20.04

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

   ```
   sudo apt-get install protobuf-compiler libeigen3-dev libopencv-dev -y
   ```

1. Follow the [Noetic Installation instructions](http://wiki.ros.org/noetic/Installation/Ubuntu#Installation) (ros-noetic-desktop-full is recommended).
1. Intall MAVROS by following the [MAVROS Installation Guide](../ros/mavros_installation.md).

### ROS Melodic/Ubuntu 18.04

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

:::note

- ROS Melodic is installed with Gazebo (Classic) 9 by default.
- Your catkin (ROS build system) workspace is created at **~/catkin_ws/**.
- The script uses instructions from the ROS Wiki "Melodic" [Ubuntu page](http://wiki.ros.org/melodic/Installation/Ubuntu).
:::

## Next Steps

Once you have finished setting up the command-line toolchain:

- Install [VSCode](../dev_setup/vscode.md) (if you prefer using an IDE to the command line).
- Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html) :::tip The _daily build_ includes development tools that hidden in release builds. It may also provide access to new PX4 features that are not yet supported in release builds.
:::
- Continue to the [build instructions](../dev_setup/building_px4.md).
