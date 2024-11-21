# Супутник Raspberry Pi з Pixhawk

This topic describes how to setup a Raspberry Pi ("RPi") companion companion running [ROS 2](../ros2/user_guide.md) on Linux Ubuntu OS, connecting to a [Pixhawk](../flight_controller/autopilot_pixhawk_standard.md) flight controller using a serial connection between the Pixhawk `TELEM2` port and the RPi's TX/RX pins.

Ці інструкції мають бути легко розширювані для інших конфігурацій контролерів RPi та польотів.

:::info
Other common ways to connect RPi and Pixhawk are:

- Ethernet-з'єднання між RPi та Pixhawk.
  Контролери Pixhawk на основі FMUv5x, FMUv6x та пізніших можуть мати вбудований порт Ethernet.
  See [PX4 Ethernet > Supported Controllers](../advanced_config/ethernet_setup.md#supported-flight-controllers).
- Серійне підключення до USB-порту RPi.
  Це просто і надійно, але потребує додаткової плати адаптера USB-серійного інтерфейсу від FTDI Chip.
  This option is covered in [Pixhawk Companion > Serial Port Setup](../companion_computer/pixhawk_companion.md#serial-port-setup).

:::

## Підключення

### Послідовне з'єднання

Спочатку підключіть послідовне з'єднання між RPi та PX4, яке буде використовуватися для управління ззовні.

This setup connects the Pixhawk `TELEM2` port, which is generally recommended for offboard control.
Спочатку вона налаштована в PX4 для використання з MAVLink, що ми змінимо пізніше при налаштуванні ROS 2.
Pixhawk ports can be located anywhere on the flight controller, but are almost always well labeled, and should be obvious on your particular [flight controller](../flight_controller/index.md).

Connect the Pixhawk `TELEM2` `TX`/`RX`/`GND` pins to the complementary `RXD`/`TXD`/`Ground` pins on the RPi GPIO board:

| PX4 TELEM2 Pin                                       | RPi GPIO Pin                              |
| ---------------------------------------------------- | ----------------------------------------- |
| UART5_TX (2) | RXD (GPIO 15 - pin 10) |
| UART5_RX (3) | TXD (GPIO 14 - pin 8)  |
| GND (6)                           | Ground (pin 6)         |

The diagram shows Pixhawk `TELEM2` port pins on the left and RPi GPIO board pins on the right.
The pins on the `TELEM2` port are normally numbered right-to-left as shown.

| `TELEM2`                                                                                                      | RPi GPIO                                                      |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| ![Pin numbering showing left-most pin is pin 1](../../assets/companion_computer/pixhawk_rpi/pins_numbers.png) | ![](../../assets/companion_computer/pixhawk_rpi/rpi_gpio.png) |

:::info
Almost all recent Pixhawk boards, such as the Pixhawk-6C, use the same connectors and pin numbers for corresponding ports, as defined in the Pixhawk Connector Standard.
Ви можете перевірити конкретну документацію дошки, щоб підтвердити розташування контактів.

The standard `TELEM2` pin assignments are shown below.

| Піни                         | Сигнал                                                  | Напруга               |
| ---------------------------- | ------------------------------------------------------- | --------------------- |
| 1 (Red)   | VCC                                                     | +5V                   |
| 2 (Black) | UART5_TX (out)  | +3.3V |
| 3 (Black) | UART5_RX (in)   | +3.3V |
| 4 (Black) | UART5_CTS (in)  | +3.3V |
| 5 (Black) | UART5_RTS (out) | +3.3V |
| 6 (Black) | GND                                                     | GND                   |

:::

### TELEM1/Телеметрійне радіо

The Pixhawk `TELEM1` port is preconfigured for connecting to a GCS via MAVLink over a telemetry radio.

You can plug an [appropriate radio](../telemetry/index.md) into the Pixhawk `TELEM1` port and in most cases it should just work.
Зазвичай інший радіоприймач повинен бути підключений до USB-порту наземної станції.
Якщо у вас виникли проблеми, перевірте документацію радіо.

### Джерело живлення

Pixhawk boards usually require a reliable 5V DC supply, which is commonly supplied from LiPO batteries via a [Power Module and/or Power Distribution board](../power_module/index.md) to a port labeled `POWER` (or similar).

Інструкції для вашого керування польотом зазвичай пояснюють рекомендовану настройку.
Наприклад:

- [Holybro Pixhawk 6C > Voltage Ratings](../flight_controller/pixhawk6c.md#voltage-ratings)
- [Holybro Pixhawk 6C Wiring Quick Start > Power](../assembly/quick_start_pixhawk6c.md#power)

Pixhawk controllers can supply power to a _small_ number of low-power peripherals, such as GPS modules and low-range telemetry radios.
The RPi companion computer, servos, high power radios, and other peripherals require a separate power supply, which is usually from a battery elimination circuit (BEC) wired to the same or another battery.
Деякі модулі живлення мають окремий BEC включений.

:::warning
Overloading your Pixhawk is a good way to destroy it.
:::

:::info
During PX4 setup and configuration the USB connection with your ground station laptop is sufficient to power the Pixhawk board, and your companion computer might be powered from a desktop charger.
:::

## Налаштування PX4

Ці інструкції працюють на PX4 v1.14 та пізніших версіях.

If you need to update the firmware then connect the Pixhawk to your laptop/desktop via the `USB` port and use QGroundControl to update the firmware as described [Firmware > Install Stable PX4](../config/firmware.md#install-stable-px4).
If you want the latest developer version then update the firmware to the "main" as described in [Firmware > Installing PX4 Master, Beta or Custom Firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware).

:::info
You can alternatively [setup a development environment](../dev_setup/dev_env.md), [build](../dev_setup/building_px4.md#building-for-nuttx) and [upload](../dev_setup/building_px4.md#uploading-firmware-flashing-the-board) the firmware manually.
:::

<!-- Keeping this line as record - this is only unexpected dependency:
```
sudo apt -y install stlink-tools
```
-->

<!-- Keeping this because we might need it for updating linux instructions
On Linux, the default name of a USB connection is `/dev/ttyACM0`:

```
sudo chmod a+rw /dev/ttyACM0
cd /PX4-Autopilot
make px4_fmu-v6c_default upload
```
-->

## Налаштування Ubuntu на RPi

Наступні кроки показують, як встановити та налаштувати Ubuntu 22.04 на RPi.
Зверніть увагу, що версії ROS 2 спрямовані на конкретні версії Ubuntu.
Ми використовуємо Ubuntu 22.04 для відповідності ROS 2 "Humble", тому якщо ви працюєте з ROS 2 "Foxy", ви замість цього могли б встановити Ubuntu 20.04.

Спочатку встановіть Ubuntu на RPi:

1. Prepare a Ubuntu 22.04 bootable Ubuntu Desktop SD card by following the official tutorial: [How to install Ubuntu Desktop on Raspberry Pi 4](https://ubuntu.com/tutorials/how-to-install-ubuntu-desktop-on-raspberry-pi-4#1-overview)
2. Під'єднайте мишу, клавіатуру, монітор і підключіть RPi до джерела живлення 5 В (зовнішнє джерело/зарядний пристрій).
3. Вставте SD-карту в RPi і увімкніть RPi для завантаження з карти SD.
4. Дотримуйтесь інструкцій на екрані для встановлення Ubuntu.

Введіть наступні команди (у послідовності) у термінал для налаштування Ubuntu на RPi:

1. Install `raspi-config`:

   ```sh
   sudo apt update
   sudo apt upgrade
   sudo apt-get install raspi-config
   ```

2. Open `raspi-config`:

   ```sh
   sudo raspi-config
   ```

3. Go to the **Interface Option** and then click **Serial Port**.

   - Select **No** to disable serial login shell.
   - Select **Yes** to enable the serial interface.
   - Click **Finish** and restart the RPi.

4. Open the firmware boot configuration file in the `nano` editor on RPi:

   ```sh
   sudo nano /boot/firmware/config.txt
   ```

5. Додайте наступний текст в кінець файлу (після останнього рядка):

   ```sh
   enable_uart=1
   dtoverlay=disable-bt
   ```

6. Далі збережіть файл і перезапустіть RPi.

   - In `nano` you can save the file using the following sequence of keyboard shortcuts: **ctrl+x**, **ctrl+y**, **Enter**.

7. Перевірте, чи доступний послідовний порт.
   В даному випадку ми використовуємо наступні команди для перегляду серійних пристроїв:

   ```sh
   cd /
   ls /dev/ttyAMA0
   ```

   The result of the command should include the RX/TX connection `/dev/ttyAMA0` (note that this serial port is also available as `/dev/serial0`).

The RPi is now setup to work with RPi and communicate using the `/dev/ttyAMA0` serial port.
Зверніть увагу, що ми встановимо додаткове програмне забезпечення в наступних розділах для роботи з MAVLink та ROS 2.

## Зв'язок MAVLink

[MAVLink](https://mavlink.io/en/) is the default and stable communication interface for working with PX4.
MAVLink applications running on the companion computer can connect to the `/dev/ttyAMA0` serial port you just set up on the RPi and should automatically (by default) connect to `TELEM 2` on the Pixhawk.

PX4 recommends [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) for writing MAVLink companion computer applications, as it provides simple APIs for using many common MAVLink services in many different programming languages.
You can also write applications using the libraries provided by [MAVLink](https://mavlink.io/en/#mavlink-project-generatorslanguages), such as [Pymavlink](https://mavlink.io/en/mavgen_python/), but then you are more likely to have to provide your own implementations of some microservices.

У цьому підручнику ми не будемо вдаватися в докладності щодо управління MAVLink (воно добре описане в відповідних SDK).
However we will install and use a simple developer MAVLink GCS called `mavproxy`.
Це дозволить нам перевірити підключення MAVLink, а отже, правильність налаштування нашого фізичного з'єднання.
Дуже схожий шаблон підключення використовуватиметься для MAVSDK та інших додатків MAVLink.

First check the Pixhawk `TELEM 2` configuration:

1. Підключіть Pixhawk до ноутбука за допомогою USB-кабеля.
2. Відкрийте QGroundControl (повинно з'єднатися з транспортним засобом).
3. [Check/change the following parameters](../advanced_config/parameters.md) in QGroundControl:

   ```ini
   MAV_1_CONFIG = TELEM2
   UXRCE_DDS_CFG = 0 (Disabled)
   SER_TEL2_BAUD = 57600
   ```

   Зверніть увагу, що параметри можуть вже бути налаштовані належним чином.
   For information about how serial ports and MAVLink configuration work see [Serial Port Configuration](../peripherals/serial_configuration.md) and [MAVLink Peripherals](../peripherals/mavlink_peripherals.md).

Потім встановіть налаштування MAVProxy на RPi за допомогою наступних термінальних команд:

1. Встановіть MAVProxy:

   ```sh
   sudo apt install python3-pip
   sudo pip3 install mavproxy
   sudo apt remove modemmanager
   ```

2. Run MAVProxy, setting the port to connect to `/dev/ttyAMA0` and the baud rate to match the PX4:

   ```sh
   sudo mavproxy.py --master=/dev/serial0 --baudrate 57600
   ```

   ::: info
   Note that above we used `/dev/serial0`, but we could equally well have used `/dev/ttyAMA0`.
   If we were connecting via USB then we would instead set the port as `/dev/ttyACM0`:

   ```sh
   sudo chmod a+rw /dev/ttyACM0
   sudo mavproxy.py --master=/dev/ttyACM0 --baudrate 57600
   ```


:::

MAVProxy на RPi тепер повинен підключатися до Pixhawk через контакти RX/TX.
Ви повинні бачити це в терміналі RPi.

Тепер ми підтвердили, що наше підключення пов'язано належним чином.
У наступному розділі ми налаштуємо як Pixhawk, так і RPi для використання uXRCE-DDS та ROS2 замість MAVLink.

## ROS 2 та uXRCE-DDS

The [ROS 2 Guide](../ros2/user_guide.md) and [uXRCE-DDS](../middleware/uxrce_dds.md) pages cover the options for setting up the uXRCE-DDS and ROS, focussing on ROS 2 "Foxy".
Цей посібник використовує ROS 2 "Humble" та охоплює конкретну настройку для роботи з RPi.
Варто прочитати обидва!

### Налаштування Pixhawk/PX4

Next we set up ROS 2 instead of MAVLink on `TELEM2`.
We do this by changing parameters in QGroundControl, which can be connected via USB, or using a telemetry radio connected to `TELEM1`.

Етапи конфігурації:

1. Підключіть Pixhawk до ноутбука за допомогою USB-кабелю та відкрийте QGroundControl (якщо він не підключений в даний момент).

2. [Check/change the following parameters](../advanced_config/parameters.md) in QGroundControl:

   ```ini
   MAV_1_CONFIG = 0 (Disabled)
   UXRCE_DDS_CFG = 102 (TELEM2)
   SER_TEL2_BAUD = 921600
   ```

   [MAV_1_CONFIG=0](../advanced_config/parameter_reference.md#MAV_1_CONFIG) and [UXRCE_DDS_CFG=102](../advanced_config/parameter_reference.md#UXRCE_DDS_CFG) disable MAVLink on TELEM2 and enable the uXRCE-DDS client on TELEM2, respectively.
   The `SER_TEL2_BAUD` rate sets the comms link data rate.\
   You could similarly configure a connection to `TELEM1` using either `MAV_1_CONFIG` or `MAV_0_CONFIG`.

   ::: info
   You will need to reboot the flight controller to apply any changes to these parameters.

:::

3. Check that the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) module is now running.
   YOu can do this by running the following command in the QGroundControl [MAVLink Console](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html):

   ```sh
   uxrce_dds_client status
   ```

:::info
If the client module is not running you can start it manually in the MAVLink console:

```sh
uxrce_dds_client start -t serial -d /dev/ttyS3 -b 921600
```

Note that `/dev/ttyS3` is the PX4 port for `TELEM2` on the [Holybro Pixhawk 6c](../flight_controller/pixhawk6c.md#serial-port-mapping).
Для інших контролерів польоту перевірте розділ відображення послідовного порту на їх сторінці огляду.
:::

### ROS Setup on RPi

Кроки для налаштування ROS 2 та агента Micro XRCE-DDS на RPi такі:

1. Install ROS 2 Humble by following the [official tutorial](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html).

2. Встановіть git за допомогою терміналу RPi:

   ```sh
   sudo apt install git
   ```

3. Встановіть агент uXRCE_DDS:

   ```sh
   git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
   cd Micro-XRCE-DDS-Agent
   mkdir build
   cd build
   cmake ..
   make
   sudo make install
   sudo ldconfig /usr/local/lib/
   ```

   See [uXRCE-DDS > Micro XRCE-DDS Agent Installation](../middleware/uxrce_dds.md#micro-xrce-dds-agent-installation) for alternative ways of installing the agent.

4. Запустіть агента в терміналі RPi:

   ```sh
   sudo MicroXRCEAgent serial --dev /dev/serial0 -b 921600
   ```

   Зверніть увагу, як ми використовуємо раніше налаштований послідовний порт і ту саму швидкість передачі даних, що й для PX4.

Тепер, коли обидва агент та клієнт працюють, ви повинні бачити активність як на консолі MAVLink, так і на терміналі RPi.
Ви можете переглянути доступні теми за допомогою наступної команди на RPi:

```sh
source /opt/ros/humble/setup.bash
ros2 topic list
```

Ось і все.
Once you have the connection working, see the [ROS 2 Guide](../ros2/user_guide.md) for more information about working with PX4 and ROS 2.
