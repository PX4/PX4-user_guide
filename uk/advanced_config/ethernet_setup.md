# Налаштування PX4 Ethernet

Підключення через Ethernet надає швидкий, надійний та гнучкий спосіб зв'язку, який може бути альтернативою використанню USB або інших послідовних з'єднань.

Воно може бути використане для підключення до наземних станцій, супутникових комп'ютерів та інших систем MAVLink.
Це особливо рекомендується при підключенні до систем, які «природно» використовують Ethernet, наприклад, IP-радіо.

Ця тема охоплює:

- [PX4 Ethernet Setup](#px4-ethernet-setup)
  - [Supported Flight Controllers](#supported-flight-controllers)
  - [Setting up the Ethernet Network](#setting-up-the-ethernet-network)
    - [PX4 Ethernet Network Setup](#px4-ethernet-network-setup)
    - [Ubuntu Ethernet Network Setup](#ubuntu-ethernet-network-setup)
    - [Companion Computer Ethernet Network Setup](#companion-computer-ethernet-network-setup)
  - [PX4 MAVLink Serial Port Configuration](#px4-mavlink-serial-port-configuration)
  - [QGroundControl Setup Example](#qgroundcontrol-setup-example)
  - [MAVSDK-Python Setup Example](#mavsdk-python-setup-example)
  - [ROS 2 Setup Example](#ros-2-setup-example)

## Підтримувані контролери польоту

PX4 supports Ethernet connectivity on [Pixhawk 5X-standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-011%20Pixhawk%20Autopilot%20v5X%20Standard.pdf) flight controllers (and later) that have an Ethernet port.
Це також може бути підтримано на інших платах.

Підтримувані автопілоти включають:

- [CUAV Pixhawk V6X](../flight_controller/cuav_pixhawk_v6x.md)
- [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md)
- [Holybro Pixhawk 6X](../flight_controller/pixhawk6x.md)
- [RaccoonLab FMUv6X Autopilot](../flight_controller/raccoonlab_fmu6x.md)

## Налаштування мережі Ethernet

Для підключення систем по Ethernet потрібно налаштувати їх на роботу в одній IP-мережі, щоб кожна система мала унікальну IP-адресу та могла знаходити інші системи.
Це можна зробити за допомогою DHCP-сервера для призначення адрес або вручну налаштувавши адреси кожної системи в мережі.

Немає єдиної «готової» конфігурації, яку ми можемо надати, яка обов’язково працюватиме у вашій локальній мережі.
Therefore as an example of the kind of configuration you might do, below we show how to set up the systems on an IP network with static addresses in the range `10.41.10.Xxx`, where PX4 has a statically allocated address `10.41.10.2` (PX4-default) and the computer has address `10.41.10.1`.
Якщо ви хочете підключити компаньйонний комп'ютер або іншу систему до мережі і встановити статичну адресу, ви можете використати подібний підхід.

:::info
There is nothing "special" about the network configuration (other than perhaps the tools used to modify the network settings); it works much the same as any home or business network.
Тобто, знання про те, як працюють IP-мережі, є дуже бажаним!
:::

### Налаштування мережі PX4 Ethernet

<!-- Information about NuttX network manager: https://github.com/PX4/PX4-Autopilot/pull/16330 -->

PX4 uses the [netman](../modules/modules_system.md#netman) module to apply and update network settings.

The default configuration first requests an IP address from DHCP, and if that fails will fallback to the default static address `10.41.10.2`.
You can explicitly set any static IP address (including the default address), to bypass the initial DHCP check and make the connection a little faster.

:::info
If you want to use the default static IP address for PX4 you can skip forward to the next section.
:::

Network settings are defined in the configuration file `/fs/microsd/net.cfg` on the SD card.
This is a text file, that defines each setting on a new line as a `name=value` pair.
Конфігураційний файл може виглядати так:

```ini
DEVICE=eth0
BOOTPROTO=fallback
IPADDR=10.41.10.2
NETMASK=255.255.255.0
ROUTER=10.41.10.254
DNS=10.41.10.254
```

Де є значення:

- `DEVICE`: Interface name. Default is `eth0`.
- `BOOTPROTO`: Protocol for getting PX4 IP address. Valid values for proto are: `dhcp`, `static`, `fallback` (use DHCP but fall back to static address after time, if that fails)
- `IPADDR`: Static IP address (used if BOOTPROTO is `static` or `fallback`)
- `NETMASK`: Network mask
- `ROUTER`: The address of the default route.
- `DNS`: The address of the DNS server.

To set the above "example" configuration using the _QGroundControl_:

1. Підключіть авіоніку до комп'ютера за допомогою USB-кабелю.

2. Open **QGroundcontrol > Analyze Tools > MAVLink Console**

3. Enter commands "like" the ones below into the _MAVLink Console_ (to write the values to the configuration file):

   ```sh
   echo DEVICE=eth0 > /fs/microsd/net.cfg
   echo BOOTPROTO=fallback >> /fs/microsd/net.cfg
   echo IPADDR=10.41.10.2 >> /fs/microsd/net.cfg
   echo NETMASK=255.255.255.0 >>/fs/microsd/net.cfg
   echo ROUTER=10.41.10.254 >>/fs/microsd/net.cfg
   echo DNS=10.41.10.254 >>/fs/microsd/net.cfg
   ```

4. Після встановлення конфігурації мережі можна від’єднати кабель USB.

5. Перезавантажте контролер польоту, щоб застосувати налаштування.

Зверніть увагу, що вищевказана настройка надає контролеру польоту адресу в мережі Ethernet.
You also need to [configure the Ethernet port](#px4-mavlink-serial-port-configuration) to use MAVLink.

### Налаштування мережі Ubuntu Ethernet

If you're using Ubuntu for your ground station (or companion computer) then you can use [netplan](https://netplan.io/) to configure the network.

Below we show how you write a setup to the netplan configuration file "`/etc/netplan/01-network-manager-all.yaml`", which would run on the same network as used by the PX4 setup above.
Note that there are many more [examples](https://netplan.io/examples/) and instructions in the [netplan](https://netplan.io/) documentation.

Для установки Ubuntu комп'ютера:

1. In a terminal, create and open a `netplan` configuration file: `/etc/netplan/01-network-manager-all.yaml`
   Below we do this using the _nano_ text editor.

   ```
   sudo nano /etc/netplan/01-network-manager-all.yaml
   ```

2. Скопіюйте та вставте наступну конфігураційну інформацію у файл (зверніть увагу: відступи мають значення!):

   ```
   network:
     version: 2
     renderer: NetworkManager
     ethernets:
         enp2s0:
             addresses:
                 - 10.41.10.1/24
             nameservers:
                 addresses: [10.41.10.1]
             routes:
                 - to: 10.41.10.1
                   via: 10.41.10.1
   ```

   Збережіть і закрийте файл.

3. Apply the _netplan_ configuration by entering the following command into the Ubuntu terminal.

   ```
   sudo netplan apply
   ```

### Комп’ютер-супутник Налаштування мережі Ethernet

Налаштування компаньйонного комп'ютера залежить від операційної системи компаньйонного комп'ютера.

A Linux operating system may support `netplan`, in which case the instructions would be the same as above, but using a unique IP address.

## Конфігурація послідовного порту PX4 MAVLink

The Ethernet port configuration sets the properties of the _serial link_ (which is how PX4 views the Ethernet connection).
Це включає набір повідомлень MAVLink, які передаються, швидкість передачі даних, UDP-порти, на які може підключатися віддалена система, тощо.

:::info
You must separately configure the PX4 IP address and other _network settings_ ([as shown previously](#px4-ethernet-network-setup)).
:::

PX4 налаштовує серійний порт для підключення до GCS через MAVLink, використовуючи параметри, показані нижче:

| Параметр                                                                                                                                      | Значення | Опис                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG)                              | 1000     | Налаштування Ethernet порту                                                          |
| [MAV_2_BROADCAST](../advanced_config/parameter_reference.md#MAV_2_BROADCAST)                        | 1        | Broadcast `HEARTBEAT` messages                                                       |
| [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE)                                  | 0        | Надіслати «звичайний» набір повідомлень MAVLink (тобто набір GCS) |
| [MAV_2_RADIO_CTL](../advanced_config/parameter_reference.md#MAV_2_RADIO_CTL)   | 0        | Вимкнути програмне регулювання трафіку MAVLink                                       |
| [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE)                                  | 100000   | Налаштування Ethernet порту                                                          |
| [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) | 14550    | Віддалений порт MAVLink 14550 (GCS)                               |
| [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT)       | 14550    | Мережевий порт MAVLink 14550 (GCS)                                |

Normally a companion computer would use port `14540` (rather than `14550`) and stream the set of MAVLink messages specified in the `Onboard` profile.
You can configure this setup by changing [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) and [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) to `14540` and [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) to `2` (Onboard).
Проте слід зауважити, що це все одно працюватиме, використовуючи профіль GCS.

For more information on MAVLink serial port configuration see [MAVLink Peripherals (GCS/OSD/Companion)](../peripherals/mavlink_peripherals.md)

## Приклад налаштування QGroundControl

Assuming you have already [Set up the Ethernet Network](#setting-up-the-ethernet-network) so your ground station computer and PX4 run on the same network, and

Для підключення QGroundControl до PX4 по Ethernet:

1. [Set up the Ethernet Network](#setting-up-the-ethernet-network) so your ground station computer and PX4 run on the same network.

2. Підключіть комп'ютер земної станції та PX4 за допомогою кабелю Ethernet.

3. Start QGroundControl and [define a comm link](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/settings_view/settings_view.html) (**Application Settings > Comm Links**) specifying the _server address_ and port as the IP address and port assigned in PX4, respectively.

   Припускаючи, що значення встановлені так, як описано в решті цієї теми, налаштування виглядатиме наступним чином:

   ![QGC comm link for ethernet setup](../../assets/qgc/settings/comm_link/px4_ethernet_link_config.png)

4. Після цього QGroundControl має підключитися, якщо ви виберете це посилання.

:::info
[PX4 Ethernet Port Configuration](#px4-ethernet-network-setup) should not be needed (the default are appropriate for a GCS).
:::

## Приклад налаштування MAVSDK-Python

Щоб налаштувати роботу MAVSDK-Python на комп’ютері-супутнику:

1. [Set up the Ethernet Network](#setting-up-the-ethernet-network) so your companion computer and PX4 run on the same network.
2. Modify the [PX4 Ethernet Port Configuration](#px4-ethernet-network-setup) to connect to a companion computer.
   You might change the parameters [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT) and [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) to `14540`, and [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) to `2` (Onboard).
3. Follow the instructions in [MAVSDK-python](https://github.com/mavlink/MAVSDK-Python) to install and use MAVSDK.

   Наприклад, ваш код буде підключатися до PX4 за допомогою:

   ```python
   await drone.connect(system_address="udp://10.41.10.2:14540")
   ```

:::info
MAVSDK can connect to the PX4 on port `14550` if you don't modify the PX4 Ethernet port configuration.
Проте це не рекомендується, оскільки типова конфігурація оптимізована для зв'язку з наземним контролем (а не компаньйон комп'ютером).
:::

## Приклад встановлення ROS 2

:::info Попередня підготовка:

- You have a supported autopilot hardware running PX4 firmware that includes [uXRCE-DDS](../middleware/uxrce_dds.md) middleware.
  Note that PX4 v1.14 and later include the required [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) module by default.
- [ROS 2](../ros2/user_guide.md) has been set up correctly on the companion computer.
- Ви виконали налаштування мережі Ethernet і портів, як описано вгорі цієї сторінки.

:::

Налаштувати ROS 2:

1. Підключіть ваш автопілот і компаньйон комп'ютер за допомогою Ethernet.

2. [Start the uXRCE-DDS client on PX4](../middleware/uxrce_dds.md#starting-the-client), either manually or by customizing the system startup script.
   Note that you must use the IP address of the companion computer and the UDP port on which the agent is listening (the example configuration above sets the companion IP address to `10.41.10.1`, and the agent UDP port is set to `8888` in the next step).

3. [Start the micro XRCE-DDS agent on the companion computer](../middleware/uxrce_dds.md#starting-the-agent).
   For example, enter the following command in a terminal to start the agent listening on UDP port `8888`.

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

4. Run a [listener node](../ros2/user_guide.md#running-the-example) in a new terminal to confirm the connection is established:

   ```sh
   source ~/ws_sensor_combined/install/setup.bash
   ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

   Якщо все налаштовано правильно, в терміналі повинен відображатися наступний вивід:

   ```sh
   RECEIVED SENSOR COMBINED DATA
   =============================
   ts: 855801598
   gyro_rad[0]: -0.00339938
   gyro_rad[1]: 0.00440091
   gyro_rad[2]: 0.00513893
   gyro_integral_dt: 4997
   accelerometer_timestamp_relative: 0
   accelerometer_m_s2[0]: -0.0324082
   accelerometer_m_s2[1]: 0.0392213
   accelerometer_m_s2[2]: -9.77914
   accelerometer_integral_dt: 4997
   ```

## Дивіться також

- [Get The Pixhawk Raspberry Pi CM4 Baseboard By Holybro Talking With PX4](https://px4.io/get-the-pixhawk-raspberry-pi-cm4-baseboard-by-holybro-talking-with-px4/) (px4.io blog):
  - Урок, який показує, як підключити Pixhawk 6X + Raspberry Pi на базі CM4 через провідний Ethernet.
  - Блог дублює багато матеріалу з цієї теми.
