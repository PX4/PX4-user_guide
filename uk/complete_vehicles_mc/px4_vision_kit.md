# PX4 Vision Autonomy Development Kit

[_PX4 Vision Autonomy Development Kit_] (https://holybro.com/collections/multicopter-kit/PX4-Vision) - це надійний і недорогий комплект для створення систем комп'ютерного зору на автономних пристроях.

![Overview](../../assets/hardware/px4_vision_devkit/px4_vision_v1.5_front.png)

Комплект містить майже готовий до польоту квадрокоптер з вуглецевого волокна, оснащений польотним контролером _Pixhawk 4_ або _Pixhawk 6C_ (на версії 1.5), комп'ютером-компаньйоном _UP Core_ (4 ГБ пам'яті та 64 ГБ eMMC), а також камерою глибини Occipital _Structure Core_ .

:::info
Цей пристрій не має попередньо встановленого програмного забезпечення.
До комплекту входить карта пам'яті USB з прикладом реалізації функції [уникнення перешкод](../computer_vision/obstacle_avoidance.md), на основі проекту [PX4 Avoidance](https://github.com/PX4/PX4-Avoidance). Цей приклад є орієнтовним і слугує для демонстрації можливостей платформи. Програмне забезпечення не сумісне з останньою версією PX4, а також не підтримується і не обслуговується.
:::

Посібник надає інформацію про мінімальне додаткове налаштування, потрібне для того, щоб підготувати апарат до польоту (встановлення системи дистанційного керування та акумулятора). Він також описує перший політ і те, як почати модифікацію коду комп'ютерного зору.

## Де купити

- [PX4 Vision Dev Kit v1.5](https://holybro.com/collections/multicopter-kit/products/px4-vision-dev-kit-v1-5)
- [PX4 Vision Dev Kit v1 (Знято з виробництва)](https://holybro.com/collections/multicopter-kit/products/px4-vision)

## Зміст посібника Px4 Vision Guide

- [Попередження та сповіщення](#warnings-and-notifications)
- [Що всередині](#what-is-inside)
- [Що ще вам потрібно](#what-else-do-you-need)
- [Первинне налаштування](#first-time-setup)
- [Керування дроном з запобіганням зіткнень](#fly-the-drone-with-avoidance)
- [Розробка з використанням комплекту](#development-using-the-kit)
- [Розпіновка плати PX4 Vision Carrier](#px4-vision-carrier-board-pinouts)
- [Інші ресурси для розробників](#other-development-resources)
- [Як отримати технічну підтримку](#how-to-get-technical-support)

## Попередження та сповіщення

1. Комплект призначений для проєктів комп'ютерного зору, які використовують камеру, спрямовану вперед (він не має камер глибини, спрямованих вниз або назад).
   Отже, його не можна використовувати (без модифікації) для тестування [Безпечної посадки] (../computer_vision/safe_landing.md) або інших функцій, для яких потрібна камера, спрямована вниз.

2. Уникання перешкод у місіях можна тестувати лише за наявності сигналу GPS (місії використовують GPS-координати).
   Запобігання зіткненням можна перевірити в режимі позиціювання за умови, що є стійке захоплення позиції, отримане або з GPS, або з оптичного потоку.

3. Порт, позначений `USB1`, може глушити GPS, якщо його використовувати з периферійним пристроєм _USB3_ (вимкніть GPS-залежні функції, зокрема місії).
   Саме тому образ завантаження постачається на флешці _USB2.0_.

4. PX4 Vision v1 з ECN 010 або вище (несуча плата RC05 і вище), _UP Core_ може живитися як від розетки постійного струму, так і від акумулятора.

   ![RC Number](../../assets/hardware/px4_vision_devkit/rc.png) ![ECN Number](../../assets/hardware/px4_vision_devkit/serial_number_update.jpg)

5. Всі PX4 Vision v1.5 _UP Core_ можна живити як від мережі постійного струму, так і від батареї.

:::warning
For PX4 Vision v1 with ECN below 010/carrier board below RC04, the _UP Core_ should only be powered using the battery (do not remove the _UP Core power_ socket safety cover). This does not apply to PX4 Vision v1.5

![Warning - do not connect power port](../../assets/hardware/px4_vision_devkit/warning_power_port_update.png)
:::

## Що всередині

:::info
Відмінності між PX4 Vision V1 і V1.5 можна знайти [тут](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5/v1-and-v1.5-difference)
:::

![PV4 Vision v1.5](../../assets/hardware/px4_vision_devkit/px4_vision_v1.5_whats_inside.jpg)

Про те, що знаходиться всередині PX4 Vision V1, можна дізнатися тут [PX4 v1.13 Docs here] (https://docs.px4.io/v1.13/en/complete_vehicles/px4_vision_kit.html#what-is-inside).

PX4 Vision DevKit містить наступні компоненти:

- Основні компоненти:

  - 1x Pixhawk 4 або Pixhawk 6C (для v1.5) польотний контролер
  - 1x оптичний датчик потоку PMW3901
  - 1x датчик відстані TOF інфрачервоного діапазону (PSK‐CM8JL65‐CC5)
  - 1x камера глибини Structure Core
    - Камера з широким кутом огляду 160 градусів
    - Стерео-інфрачервоні камери
    - Вбудований ІМП (інерціальний модуль)
    - Потужний багатоядерний процесор глибини NU3000
  - 1x комп'ютер _UP Core_ (4 ГБ оперативної пам'яті та 64 ГБ eMMC з Ubuntu та PX4 униканням)
    - Intel® Atom™ x5-z8350 (до1.92 GHz)
    - Сумісні ОС: повна версія Microsoft Windows 10, Linux (ubilinux, Ubuntu, Yocto), Android
    - FTDI UART підключений до контролера польоту
    - `USB1`: USB3.0 Порт, який використовується для завантаження середовища уникнення PX4 з флешки USB2.0 (підключення периферійного пристрою USB3.0 може заглушити GPS).
    - `USB2`: Порт USB2.0 на роз'ємі JST-GH. Може бути використаний для другої камери, LTE тощо (або клавіатури/миші під час розробки).
    - `USB3`: Порт USB2.0 JST-GH, підключений до камери глибини
    - `HDMI`: HDMI вихід
    - SD карта
    - WiFi 802.11 b/g/n @ 2,4 ГГц (підключений до зовнішньої антени №1). Дозволяє комп'ютеру отримати доступ до домашньої WiFi-мережі для доступу до Інтернету та оновлень.

- Механічні характеристики:

  - Каркас: Цілісна 5-міліметрова саржа з вуглецевого волокна 3k
  - Мотори: T-MOTOR KV1750
  - ESC: BEHEli-S 20A ESC
  - GPS: M8N GPS модуль
  - Модуль живлення: Holybro PM07
  - Колісна база: 286мм
  - Вага: 854 грами без акумулятора або гвинтів
  - Телеметрія: ESP8266 підключений до польотного контролера (приєднаний до зовнішньої антени №2). Вмикає бездротове з'єднання з наземною станцією.

- Флеш-накопичувач USB2.0 з попередньо завантаженим програмним забезпеченням, яке включає в себе:

  - Ubuntu 18.04 LTS
  - ROS Melodic
  - Occipital Structure Core ROS драйвер
  - MAVROS
  - [PX4 Avoidance](https://github.com/PX4/PX4-Avoidance)

- Різноманітні кабелі, 8x гвинти, 2x ремінці для акумулятора (встановлені) та інші аксесуари (їх можна використовувати для підключення додаткових периферійних пристроїв).

## Що ще потрібно

Комплект містить усе необхідне обладнання для керування дроном, окрім акумулятора та системи радіоуправління, які необхідно придбати окремо:

- Батарея:
  - 4S LiPo з гніздом XT60
  - Довжина менше 115 мм (щоб поміститися між роз'ємом живлення та GPS-антеною)
- Системи радіо керування
  - Будь-яка [PX4-сумісна RC система](../getting_started/rc_transmitter_receiver.md) може бути використана.
  - Передавач _FrSky Taranis_ з приймачем R-XSR - одна з найпопулярніших комбінацій.
- Шестигранний ключ H2.0 (для відкручування верхньої панелі, з метою підключення пульта дистанційного керування)

In addition, users will need ground station hardware/software:

- Laptop or tablet running [QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/getting_started/download_and_install.html) (QGC).

## First-time Setup

1. Attach a [compatible RC receiver](../getting_started/rc_transmitter_receiver.md#connecting-receivers) to the vehicle (not supplied with kit):

   - Remove/unscrew the top plate (where the battery goes) using an H2.0 hex key tool.
   - [Connect the receiver to the flight controller](../assembly/quick_start_pixhawk4.md#radio-control).
   - Re-attach the top plate.
   - Mount the RC receiver on the _UP Core_ carrier board plate at the back of the vehicle (use zipties or double-sided tape).
   - Ensure the antennas are clear of any obstructions and electrically isolated from the frame (e.g. secure them under the carrier board or to the vehicle arms or legs).

2. [Bind](../getting_started/rc_transmitter_receiver.md#binding) the RC ground and air units (if not already done).
   The binding procedure depends on the specific radio system used (read the receiver manual).

3. Raise the GPS mast to the vertical position and screw the cover onto the holder on the base plate. (Not required for v1.5)

   ![Raise GPS mast](../../assets/hardware/px4_vision_devkit/raise_gps_mast.jpg)

4. Insert the pre-imaged USB2.0 stick from the kit into the _UP Core_ port labeled `USB1` (highlighted below).

   ![UP Core: USB1 Port ](../../assets/hardware/px4_vision_devkit/upcore_port_usb1.png)

5. Power the vehicle with a fully charged battery.
   ::: info
   Ensure propellers are removed before connecting the battery.

:::

6. Connect the ground station to the vehicle WiFi network (after a few seconds) using the following default credentials:

   - **SSID:** pixhawk4
   - **Password:** pixhawk4

   :::tip
   WiFi network SSID, password, and other credentials may be changed after connecting (if desired), by using a web browser to open the URL: `http://192.168.4.1`.
   The baud rate must not be changed from 921600.

:::

7. Start _QGroundControl_ on the ground station.

8. [Configure/calibrate](../config/index.md) the vehicle:

   ::: info
   The vehicle should arrive pre-calibrated (e.g. with firmware, airframe, battery, and sensors all setup).
   You will however need to calibrate the radio system (that you just connected) and it is often worth re-doing the compass calibration.

:::

   - [Calibrate the Radio System](../config/radio.md)
   - [Calibrate the Compass](../config/compass.md)

9. (Optional) Configure a [Flight Mode selector switch](../config/flight_mode.md) on the remote controller.

   ::: info
   Modes can also be changed using _QGroundControl_

:::

   We recommend RC controller switches are define for:

   - [Position Mode](../flight_modes_mc/position.md) - a safe manual flight mode that can be used to test collision prevention.
   - [Mission Mode](../flight_modes_mc/mission.md) - run missions and test obstacle avoidance.
   - [Return Mode](../flight_modes_mc/return.md) - return vehicle safely to its launch point and land.

10. Attach the propellers with the rotations as shown:

    ![Motor Order Diagram](../../assets/hardware/px4_vision_devkit/motor_order_diagram.png)

    - The propellers directions can be determined from the labels: _6045_ (normal, counter-clockwise) and _6045_**R** (reversed, clockwise).

      ![Propeller identification](../../assets/hardware/px4_vision_devkit/propeller_directions.jpg)

    - Screw down firmly using the provided propellor nuts:

      ![Propeller nuts](../../assets/hardware/px4_vision_devkit/propeller_nuts.png)

## Fly the Drone with Avoidance

When the vehicle setup described above is complete:

1. Connect the battery to power the vehicle.

2. Wait until the boot sequence completes and the avoidance system has started (the vehicle will reject arming commands during boot).

   :::tip
   The boot/startup process takes around 1 minute from the supplied USB stick (or 30 seconds from [internal memory](#install_image_mission_computer)).

:::

3. Check that the avoidance system has started properly:

   - The _QGroundControl_ notification log displays the message: **Avoidance system connected**.

     ![QGC Log showing avoidance system has started](../../assets/hardware/px4_vision_devkit/qgc_console_vision_system_started.jpg)

   - A red laser is visible on the front of the _Structure Core_ camera.

4. Wait for the GPS LED to turn green.
   This means that the vehicle has a GPS fix and is ready to fly!

5. Connect the ground station to the vehicle WiFi network.

6. Find a safe outdoor location for flying, ideally with a tree or some other convenient obstacle for testing PX4 Vision.

7. To test [collision prevention](../computer_vision/collision_prevention.md), enable [Position Mode](../flight_modes_mc/position.md) and fly manually towards an obstacle.
   The vehicle should slow down and then stop within 6m of the obstacle (the distance can be [changed](../advanced_config/parameters.md) using the [CP_DIST](../advanced_config/parameter_reference.md#CP_DIST) parameter).

8. To test [obstacle avoidance](../computer_vision/obstacle_avoidance.md), create a mission where the path is blocked by an obstacle.
   Then switch to [Mission Mode](../flight_modes_mc/mission.md) to run the mission, and observe the vehicle moving around the obstacle and then returning to the planned course.

## Development using the Kit

The following sections explain how to use the kit as an environment for developing computer vision software.

### PX4 Avoidance Overview

The _PX4 Avoidance_ system consists of computer vision software running on a companion computer (with attached depth camera) that provides obstacle and/or route information to the PX4 flight stack running on a _flight controller_.

Documentation about the companion computer vision/planning software can be found on github here: [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance).
The project provides a number of different planner implementations (packaged as ROS nodes):

- The PX4 Vision Kit runs the _localplanner_ by default and this is the recommended starting point for your own software.
- The _globalplanner_ has not been tested with this kit.
- The _landing planner_ requires a downward facing camera, and cannot used without first modifying the camera mounting.

PX4 and the companion computer exchange data over [MAVLink](https://mavlink.io/en/) using these interfaces:

- [Path Planning Interface](../computer_vision/path_planning_interface.md) - API for implementing avoidance features in automatic modes.
- [Collision Prevention Interface](../computer_vision/collision_prevention.md) - API for vehicle based avoidance in manual position mode based on an obstacle map (currently used for collision prevention).

<a id="install_image_mission_computer"></a>

### Installing the image on the Companion Computer

You can install the image on the _UP Core_ and boot from internal memory (instead of the USB stick).

This is recommended because booting from internal memory is much faster, frees up a USB port, and may well provide more memory than your USB stick.

:::info
Booting from internal memory takes around 30 seconds while booting from the supplied USB2 stick boots in about a minute (other cards may take several times longer).
:::

To flash the USB image to the _UP Core_:

1. Insert the pre-flashed USB drive into the _UP Core_ port labeled `USB1`.

2. [Login to the companion computer](#login_mission_computer) (as described above).

3. Open a terminal and run the following command to copy the image onto internal memory (eMMC).
   The terminal will prompt for a number of responses during the flashing process.

   ```sh
   cd ~/catkin_ws/src/px4vision_ros/tools
   sudo ./flash_emmc.sh
   ```

   ::: info
   All information saved in the _UP Core_ computer will be removed when executing this script.

:::

4. Pull out the USB stick.

5. Restart the vehicle.
   The _UP Core_ computer will now boot from internal memory (eMMC).

### Boot the Companion Computer

First insert the provided USB2.0 stick into the _UP Core_ port labeled `USB1`, and then power the vehicle using a 4S battery.
The avoidance system should start within about 1 minute (though this does depend on the USB stick supplied).

:::tip
[Fly the Drone with Avoidance](#fly-the-drone-with-avoidance) additionally explains how to verify that the avoidance system is active.
:::

If you've already [installed the image on the companion computer](#install_image_mission_computer) you can just power the vehicle (i.e. no USB stick is needed).
The avoidance system should be up and running within around 30 seconds.

Once started the companion computer can be used both as a computer vision development environment and for running the software.

<a id="login_mission_computer"></a>

### Login to the Companion Computer

To login to the companion computer:

1. Connect a keyboard and mouse to the _UP Core_ via port `USB2`:

   ![UP Core: USB2](../../assets/hardware/px4_vision_devkit/upcore_port_usb2.png)

   - Use the USB-JST cable from the kit to get a USB A connector

     ![USB to JST cable](../../assets/hardware/px4_vision_devkit/usb_jst_cable.jpg)

   - A USB hub can be attached to the cable if the keyboard and mouse have separate connectors.

2. Connect a monitor to the _UP Core_ HDMI port.

   ![UP Core: HDMI port](../../assets/hardware/px4_vision_devkit/upcore_port_hdmi.png)

   The Ubuntu login screen should then appear on the monitor.

3. Login to the _UP Core_ using the credentials:

   - **Username:** px4vision
   - **Password:** px4vision

### Developing/Extending PX4 Avoidance

The PX4 Vision's _UP Core_ computer provides a complete and fully configured environment for extending PX4 Avoidance software (and more generally, for developing new computer vision algorithms using ROS 2).
You should develop and test your software on the vehicle, sync it to your own git repository, and share any fixes and improvements with the wider PX4 community on the github [PX4/PX4-Avoidance](https://github.com/PX4/PX4-Avoidance) repo.

The catkin workspace is at `~/catkin_ws`, and is preconfigured for running the PX4 avoidance local planner.
The launch-from-boot file (`avoidance.launch`) is in the `px4vision_ros` package (modify this file to change what planner is launched).

The avoidance package is started on boot.
To integrate a different planner, this needs to be disabled.

1. Disable the avoidance process using the following command:

   ```sh
   systemctl stop avoidance.service
   ```

   You can simply reboot the machine to restart the service.

   Other useful commands are:

   ```sh
   # restart service
   systemctl start avoidance.service

   # disable service (stop service and do not restart after boot)
   systemctl disable avoidance.service

   # enable service (start service and enable restart after boot)
   systemctl enable avoidance.service
   ```

2. The source code of the obstacle avoidance package can be found in https://github.com/PX4/PX4-Avoidance which is located in `~/catkin_ws/src/avoidance`.

3. Make changes to the code! To get the latest code of avoidance pull the code from the avoidance repo:

   ```sh
   git pull origin
   git checkout origin/master
   ```

4. Build the package

   ```sh
   catkin build local_planner
   ```

The ROS workspace is placed in `~/catkin_ws`.
For reference on developing in ROS and using the catkin workspace, see the [ROS catkin tutorials](http://wiki.ros.org/catkin/Tutorials).

### Developing PX4 Firmware

The kit is designed for creating computer vision software that runs on the companion computer, and which integrates with PX4’s flexible path planning and collision prevention interfaces.

You can also modify PX4 itself, and [install it as custom firmware](../config/firmware.md#custom):

- You will need to connect _QGroundControl_ to the kit's _Pixhawk_ **via USB** in order to update firmware.
- Select the _PX4 Vision DevKit_ airframe after loading new firmware:
  ![Airframe Selection - PX4 Vision DevKit](../../assets/hardware/px4_vision_devkit/qgc_airframe_px4_vision_devkit_platform.jpg)

:::info
Modification of PX4 code is not _needed_ to meet most computer vision use cases.
To discuss the interfaces or how to integrate other features join the [PX4 support channels](../contribute/support.md).
:::

## PX4 Vision Carrier Board Pinouts

Information for the PX4 Vision 1.15 can be found at [https://docs.holybro.com](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5).
The carrier board pinouts and other information are in the [downloads section](https://docs.holybro.com/drone-development-kit/px4-vision-dev-kit-v1.5/downloads).

## Other Development Resources

- [_UP Core_ Wiki](https://github.com/up-board/up-community/wiki/Ubuntu) - _Up Core_ companion computer technical information
- [Occipital Developer Forum](https://structure.io/developers) - _Structure Core_ camera information
- [Pixhawk 4 Overview](../flight_controller/pixhawk4.md)
- [Pixhawk 6C Overview](../flight_controller/pixhawk6c.md)
- [PX4 Avoidance software/documentation](https://github.com/PX4/PX4-Avoidance)
- [Path Planning Interface](../computer_vision/path_planning_interface.md)

## How to get Technical Support

For hardware issues, please contact Holybro at: [productservice@holybro.com](mailto:productservice@holybro.com).

For software issues, use the following community support channels:

- [Holybro PX4 Vision Wikifactory](https://wikifactory.com/+holybro/px4-vision)
- [PX4 Support channels](../contribute/support.md)
