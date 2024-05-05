# uXRCE-DDS (PX4-ROS 2/DDS Bridge)

<Badge type="tip" text="PX4 v1.14" />

:::info
uXRCE-DDS замінює [Fast-RTPS Bridge](https://docs.px4.io/v1.13/en/middleware/micrortps.html#rtps-dds-interface-px4-fast-rtps-dds-bridge), який використовувався в PX4 v1.13. Якщо ви використовували Fast-RTPS Bridge, будь ласка, дотримуйтесь [ інструкцій з міграції](#fast-rtps-to-uxrce-dds-migration-guidelines).
:::

PX4 використовує проміжне програмне забезпечення uXRCE-DDS, яке дозволяє публікувати [uORB-повідомлення](../middleware/uorb.md) та підписуватись на них на комп'ютері-компаньйоні так, ніби вони є темами [ROS 2](../ros/ros2_comm.md). Це забезпечує швидку та надійну інтеграцію між PX4 та ROS 2, а також значно спрощує для додатків ROS 2 отримання інформації про транспортний засіб та надсилання команд.

PX4 використовує реалізацію XRCE-DDS, яка використовує [eProsima Micro XRCE-DDS](https://micro-xrce-dds.docs.eprosima.com/en/stable/introduction.html).

У цьому посібнику описано архітектуру та різні варіанти налаштування клієнта та агента. Зокрема, він охоплює опції, які є найбільш важливими для користувачів PX4.

## Архітектура

Проміжне програмне забезпечення uXRCE-DDS складається з клієнта, що працює на PX4, і агента, що працює на комп'ютері-компаньйоні, з двостороннім обміном даними між ними по послідовному або UDP каналу. Агент діє як проксі-сервер для клієнта, дозволяючи йому публікувати та підписуватися на теми в глобальному просторі даних DDS.

![Architecture uXRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

Для того, щоб теми PX4 uORB можна було поширювати у мережі DDS, вам знадобиться _uXRCE-DDS клієнт_, запущений на PX4, підключений до _micro XRCE-DDS агента_, запущеного на комп'ютері-компаньйоні.

PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) публікує до/з визначеного набору тем uORB до глобального простору даних DDS.

[eProsima micro XRCE-DDS _agent_](https://github.com/eProsima/Micro-XRCE-DDS-Agent) працює на комп'ютері-компаньйоні і виконує роль проксі-сервера для клієнта в мережі DDS/ROS 2.

Сам агент не залежить від коду на стороні клієнта і може бути побудований та/або встановлений незалежно від PX4 або ROS.

Код, який хоче підписатися/публікувати до PX4, залежить від коду на стороні клієнта; йому потрібні визначення повідомлень uORB, які збігаються з тими, що були використані для створення клієнта PX4 uXRCE-DDS, щоб він міг інтерпретувати повідомлення.

## Генерація коду

PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) генерується під час збирання і входить до складу прошивки PX4 за замовчуванням. Агент не залежить від клієнтського коду. Він може бути побудований окремо або в робочому просторі ROS 2, або встановлений як snap пакет в Ubuntu.

Під час збирання PX4 генератор коду використовує визначення повідомлень uORB у дереві вихідних текстів ([PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg)) для компіляції підтримки підмножини тем uORB у [PX4-Autopilot/src/modules/uxrce_dds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) у [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client).

Основні або релізні збірки PX4 автоматично експортують набір визначень повідомлень uORB у збірці до відповідної гілки у [PX4/px4_msgs](https://github.com/PX4/px4_msgs).

Додатки ROS 2 потрібно створювати у робочій області, яка містить _такі самі_ визначення повідомлень, які були використані для створення клієнтського модуля uXRCE-DDS у прошивці PX4. Їх можна включити до робочого простору шляхом клонування інтерфейсного пакунка [PX4/px4_msgs](https://github.com/PX4/px4_msgs) до вашого робочого простору ROS 2 і переходу до відповідної гілки. Зауважте, що вся генерація коду, пов'язана з повідомленнями, обробляється ROS 2.

## Встановлення Micro XRCE-DDS Agent

Micro XRCE-DDS Agent може бути встановлений на комп'ютер за допомогою бінарного пакета, зібраний і встановлений з вихідного коду, або зібраний і запущений з робочого простору ROS 2. Всі ці методи отримують _всі_ залежності, необхідні для зв'язку з клієнтом (наприклад, FastCDR)

:::info
Офіційним (і більш повним) посібником зі встановлення є Eprosima: [micro XRCE-DDS Installation Guide](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html). У цьому розділі узагальнено варіанти, які були протестовані за допомогою PX4 під час створення цієї документації.
:::

### Окреме встановлення з вихідного коду

В Ubuntu ви можете зібрати з вихідного коду і встановити Агент окремо за допомогою наступних команд:

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

:::info
Існують різні варіанти конфігурації збірки, посилання на які можна знайти у відповідній темі [офіційного посібника](https://micro-xrce-dds.docs.eprosima.com/en/latest/installation.html#installing-the-agent-standalone), але вони не були протестовані.
:::

Запустити агент з налаштуваннями для підключення до клієнта uXRCE-DDS, запущеного у симуляторі:

```sh
MicroXRCEAgent udp4 -p 8888
```

### Встановлення з Snap пакунку

Встановіть з пакунка snap на Ubuntu за допомогою наступної команди:

```sh
sudo snap install micro-xrce-dds-agent --edge
```

Запустити агента з налаштуваннями для підключення до клієнта uXRCE-DDS, запущеного у симуляторі (зверніть увагу, що назва команди відрізняється від назви, яку ви збираєте локально):

```sh
micro-xrce-dds-agent udp4 -p 8888
```

:::info
На момент написання статті стабільна версія, встановлена з snap, підключається до PX4, але повідомляє про помилки при створенні тем. Версія для розробки, отримана за допомогою `--edge` вище, працює.
:::

### Збірка/Запуск у межах робочого простору ROS 2

Агент може бути створений і запущений в робочому просторі ROS 2 (або створений окремо і запущений з робочого простору. Ви вже повинні мати встановлений ROS 2, дотримуючись інструкцій у цьому розділі: [Посібник користувача ROS 2 > Встановлення ROS 2](../ros/ros2_comm.md#install-ros-2).

Створити агента в межах ROS:

1. Створіть директорію робочого простору для агента:

   ```sh
   mkdir -p ~/px4_ros_uxrce_dds_ws/src
   ```

1. Клонуйте вихідний код eProsima [Micro-XRCE-DDS-Agent](https://github.com/eProsima/Micro-XRCE-DDS-Agent) до каталогу `/src` (за замовчуванням клонується гілка `main`):

   ```sh
   cd ~/px4_ros_uxrce_dds_ws/src
   git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
   ```

1. Зберіть середовище розробки ROS 2 і скомпілюйте робочу область за допомогою `colcon`:

   :::: tabs

   ::: tab humble

   ```sh
   source /opt/ros/humble/setup.bash
   colcon build
   ```


:::

   ::: tab foxy

   ```sh
   source /opt/ros/foxy/setup.bash
   colcon build
   ```


:::

   :
:::

   У результаті буде зібрано усі каталоги у `/src` за допомогою вихідного набору інструментів.

Для запуску агента micro XRCE-DDS в робочому просторі:

1. Виконайте `local_setup.bash`, щоб зробити виконувані файли доступними у терміналі (також `setup.bash`, якщо ви використовуєте новий термінал).

   :::: tabs

   ::: tab humble

   ```sh
   source /opt/ros/humble/setup.bash
   source install/local_setup.bash
   ```


:::

   ::: tab foxy

   ```sh
   source /opt/ros/foxy/setup.bash
   source install/local_setup.bash
   ```


:::

   :
:::

1) Запустіть агент з налаштуваннями для підключення до клієнта uXRCE-DDS, запущеного на симуляторі:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

## Запуск агента та клієнта

### Запуск агента

Агент використовується для підключення до клієнта через конкретний канал, такий як UDP або послідовне з'єднання. The channel settings are specified when the agent is started, using command line options. Вони задокументовані в посібнику користувача eProsima: [Micro XRCE-DDS Agent > Agent CLI](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html#agent-cli). Зверніть увагу, що агент підтримує багато варіантів каналів, але PX4 підтримує тільки UDP і послідовні з'єднання.

:::info
Ви повинні створити один екземпляр агента для кожного каналу, через який ви хочете підключитися.
:::

Наприклад, симулятор PX4 запускає клієнт uXRCE-DDS через UDP на порт 8888, тому для підключення до симулятора потрібно запустити агент за допомогою команди:

```sh
MicroXRCEAgent udp4 -p 8888
```

При роботі з реальним обладнанням налаштування залежить від апаратного забезпечення, операційної системи та каналу. For example, if you're using the RasPi `UART0` serial port, you might connect using this command (based on the information in [Raspberry Pi Documentation > Configuring UARTS](https://www.raspberrypi.com/documentation/computers/configuration.html#configuring-uarts)):

```sh
sudo MicroXRCEAgent serial --dev /dev/AMA0 -b 921600
```

:::info
Для отримання додаткової інформації про налаштування каналів зв'язку див. [Налаштування Pixhawk + Companion > Налаштування послідовного порту](../companion_computer/pixhawk_companion.md#serial-port-setup), а також пов'язану документацію.
:::

### Запуск клієнта

Клієнтський модуль uXRCE-DDS ([uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client)) за замовчуванням включено до всіх прошивок та симулятора. This must be started with appropriate settings for the communication channel that you wish to use to communicate with the agent.

:::info
Симулятор автоматично запускає клієнта на localhost UDP порту `8888`, використовуючи за замовчуванням простір імен uxrce-dds.
:::

Конфігурацію можна виконати за допомогою параметрів [UXRCE-DDS](../advanced_config/parameter_reference.md#uxrce-dds-client):

- [UXRCE_DDS_CFG](../advanced_config/parameter_reference.md#UXRCE_DDS_CFG): вкажіть порт для підключення, наприклад `TELEM2`, `Ethernet` або `Wifi`.
- Якщо використовується Ethernet-підключення:

  - [UXRCE_DDS_PRT](../advanced_config/parameter_reference.md#UXRCE_DDS_PRT): Використовуйте цей параметр, щоб вказати порт прослуховування агента UDP. Значення за замовчуванням `8888`.
  - [UXRCE_DDS_AG_IP](../advanced_config/parameter_reference.md#UXRCE_DDS_AG_IP): Використовуйте цей параметр, щоб вказати IP адресу агента. IP-адрес повинен бути наданий у форматі `int32`, оскільки PX4 не підтримує рядкові параметри. Значенням за замовчуванням є `2130706433`, що відповідає _localhost_ `127.0.0.1`.

    Ви можете скористатися [Tools/convert_ip.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/convert_ip.py) для конвертації між форматами:

    - Для отримання версії IP у вигляді `int32` у десятковій системі числення виконується команда:

      ```sh
      python3 ./PX4-Autopilot/Tools/convert_ip.py <the IP address in decimal dot notation>
      ```

    - Щоб отримати IP-адресу у десятковій системі числення з версії `int32`:

      ```sh
      python3 ./PX4-Autopilot/Tools/convert_ip.py -r <the IP address in int32 notation>
      ```

- Якщо використовується послідовне підключення:

  - [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), [SER_URT6_BAUD](../advanced_config/parameter_reference.md#SER_URT6_BAUD) (і так далі): Використовуйте параметр `_BAUD`, пов'язаний з послідовним портом, для встановлення швидкості передачі даних. Наприклад, ви встановите значення для `SER_TEL2_BAUD`, якщо ви підключаєтеся до комп'ютера-компаньйона за допомогою `TELEM2`. Докладнішу інформацію наведено у розділі [Конфігурація послідовного порту](../peripherals/serial_configuration.md#serial-port-configuration).

- Деякі налаштування можуть також потребувати встановлення цих параметрів:

  - [UXRCE_DDS_KEY](../advanced_config/parameter_reference.md#UXRCE_DDS_KEY): Ключ uXRCE-DDS. Якщо ви працюєте в мультиклієнтській конфігурації з одним агентом, кожен клієнт повинен мати унікальний ненульовий ключ. Це насамперед важливо для симуляцій з кількома транспортними засобами, де всі клієнти під'єднані до UDP одного агента. (Див. [офіційну документацію eprosima](https://micro-xrce-dds.docs.eprosima.com/en/stable/client_api.html#session) , `uxr_init_session`.)
  - [UXRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#UXRCE_DDS_DOM_ID): ідентифікатор домену DDS. Це забезпечує логічне розділення мереж DDS і може бути використано для розділення клієнтів на різні мережі. За замовчуванням, ROS 2 працює з ID 0.
  - [UXRCE_DDS_PTCFG](../advanced_config/parameter_reference.md#UXRCE_DDS_PTCFG): Конфігурація учасника uXRCE-DDS. Це дозволяє обмежити видимість тем DDS лише для _localhost_ і використовувати користувацькі конфігураційні файли учасників, що зберігаються на стороні агента.
  - [UXRCE_DDS_SYNCT](../advanced_config/parameter_reference.md#UXRCE_DDS_SYNCT): увімкнути синхронізацію часу мосту. Клієнтський модуль uXRCE-DDS може синхронізувати мітку часу повідомлень, якими обмінюються через міст. Це стандартна конфігурація. У певних ситуаціях, наприклад, під час [симуляцій](../ros/ros2_comm.md#ros-gazebo-and-px4-time-synchronization), ця функція може бути вимкнена.

::: info
Багато портів вже мають конфігурацію за замовчуванням. Щоб використовувати ці порти, спочатку вимкніть існуючу конфігурацію:

- `TELEM1` і `TELEM2` за замовчуванням налаштовані на підключення через MAVLink до GCS і комп'ютера-компаньйона (відповідно). Вимкніть, встановивши [MAV_0_CONFIG=0](../advanced_config/parameter_reference.md#MAV_0_CONFIG) або [MAV_1_CONFIG=0](../advanced_config/parameter_reference.md#MAV_1_CONFIG) на нуль. Докладнішу інформацію див. у розділі [Периферійні пристрої MAVLink](../peripherals/mavlink_peripherals.md).
- Інші порти можуть бути налаштовані аналогічним чином. Дивіться [Конфігурація послідовного порту](../peripherals/serial_configuration.md#serial-port-configuration).
:::

Після встановлення можливо знадобиться перезавантаження PX4, щоб параметри набрали чинності. Після цього вони зберігатимуться під час наступних перезавантажень.

Ви також можете запустити [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) за допомогою командного рядка. Його можна викликати як частину [System Startup](../concept/system_startup.md) або за допомогою [Оболонки MAVLink](../debug/mavlink_shell.md) (або системної консолі). Цей метод корисний, коли вам потрібно встановити власний простір імен клієнта, оскільки для цього не передбачено жодного параметра. Наприклад, наступна команда може бути використана для підключення через Ethernet до віддаленого хоста за адресою `192.168.0.100:8888` і встановлення простору імен клієнта на `/drone/`.

```sh
uxrce_dds_client start -t udp -p 8888 -h 192.168.0.100 -n drone
```

Параметри `-p` або `-h` використовуються для обходу `UXRCE_DDS_PRT` і `UXRCE_DDS_AG_IP`.

#### Запуск клієнта в симуляції

Логіка запуску симулятора [логіка запуску](../concept/system_startup.md) ([init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS)) використовує команди запуску клієнта для одного та [декількох транспортних засобів](../ros/ros2_multi_vehicle.md), що дозволяє встановлювати відповідні ідентифікатори екземплярів та простори імен DDS. За замовчуванням клієнт запускається на локальному хості через UDP-порт `8888` без додаткового простору імен.

Надаються змінні середовища, які перевизначають деякі [параметри UXRCE-DDS](../advanced_config/parameter_reference.md#uxrce-dds-client). Це дозволяє користувачам створювати власні файли запуску для своїх симуляцій:

- `PX4_UXRCE_DDS_NS`: Використовуйте це, щоб вказати тему [простір імен](#customizing-the-topic-namespace).
- `ROS_DOMAIN_ID`: Використовуйте це для заміни [UXRCE_DDS_DOM_ID](../advanced_config/parameter_reference.md#UXRCE_DDS_DOM_ID).
- `PX4_UXRCE_DDS_PORT`: Використовуйте це для заміни [UXRCE_DDS_PRT](../advanced_config/parameter_reference.md#UXRCE_DDS_PRT).

Наприклад, наступну команду можна використовувати для запуску симуляції Gazebo з клієнтом, який працює в DDS домені `3`, портом `9999` та простором імен теми `drone`.

```sh
ROS_DOMAIN_ID=3 PX4_UXRCE_DDS_PORT=9999 PX4_UXRCE_DDS_NS=drone make px4_sitl gz_x500
```

## Підтримувані повідомлення uORB

The set of [PX4 uORB topics](../msg_docs/index.md) that are exposed through the client are set in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).

The topics are release specific (support is compiled into [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) at build time). While most releases should support a very similar set of messages, to be certain you would need to check the yaml file for your particular release.

<!-- Jublish the set we use?: https://github.com/PX4/px4_msgs/issues/22 -->

Note that ROS 2/DDS needs to have the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware in order to interpret the messages. The message definitions are stored in the ROS 2 interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs), and they are automatically synchronized by CI on the `main` and release branches. Note that all the messages from PX4 source code are present in the repository, but only those listed in `dds_topics.yaml` will be available as ROS 2 topics. Therefore,

- If you're using a main or release version of PX4 you can get the message definitions by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace.
- If you're creating or modifying uORB messages you must manually update the messages in your workspace from your PX4 source tree. Generally this means that you would update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), clone the interface package, and then manually synchronize it by copying the new/modified message definitions from [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) to its `msg` folders. Assuming that PX4-Autopilot is in your home directory `~`, while `px4_msgs` is in `~/px4_ros_com/src/`, then the command might be:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

  ::: info Technically, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) completely defines the relationship between PX4 uORB topics and ROS 2 messages. For more information see [DDS Topics YAML](#dds-topics-yaml) below.
:::

## Налаштування простору імен теми

Custom topic namespaces can be applied at build time (changing [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)) or at runtime (which is useful for multi vehicle operations):

- One possibility is to use the `-n` option when starting the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) from command line. This technique can be used both in simulation and real vehicles.
- A custom namespace can be provided for simulations (only) by setting the environment variable `PX4_UXRCE_DDS_NS` before starting the simulation.

::: info
Changing the namespace at runtime will append the desired namespace as a prefix to all `topic` fields in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Therefore, commands like:

```sh
uxrce_dds_client start -n uav_1
```

або

```sh
PX4_UXRCE_DDS_NS=uav_1 make px4_sitl gz_x500
```

will generate topics under the namespaces:

```sh
/uav_1/fmu/in/  # for subscribers
/uav_1/fmu/out/ # for publishers
```

:::

## Налаштування PX4 ROS 2 QoS

PX4 QoS settings for publishers are incompatible with the default QoS settings for ROS 2 subscribers. So if ROS 2 code needs to subscribe to a uORB topic, it will need to use compatible QoS settings. One example of which is shown in [ROS 2 User Guide > ROS 2 Subscriber QoS Settings](../ros/ros2_comm.md#ros-2-subscriber-qos-settings).

PX4 uses the following QoS settings for publishers:

```cpp
uxrQoS_t qos = {
  .durability = UXR_DURABILITY_TRANSIENT_LOCAL,
  .reliability = UXR_RELIABILITY_BEST_EFFORT,
  .history = UXR_HISTORY_KEEP_LAST,
  .depth = 0,
};
```

PX4 використовує наступні параметри QoS для підписників:

```cpp
uxrQoS_t qos = {
  .durability = UXR_DURABILITY_VOLATILE,
  .reliability = UXR_RELIABILITY_BEST_EFFORT,
  .history = UXR_HISTORY_KEEP_LAST,
  .depth = queue_depth,
};
```

ROS 2 використовує наступні налаштування QoS (за замовчуванням) для видавців та підписок: «зберігати останніми» для історії з розміром черги 10, «reliable» для надійності, «volatile» для тривалості і «system default» для життєздатності. Deadline, lifespan, and lease durations are also all set to "default".

<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->

## DDS теми YAML

The PX4 yaml file [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) defines the set of PX4 uORB topics that are built into firmware and published. More precisely, it completely defines the relationship/pairing between PX4 uORB and ROS 2 messages.

Файл структурований наступним чином:

```yaml
publications:

  - topic: /fmu/out/collision_constraints
    type: px4_msgs::msg::CollisionConstraints

  ...

  - topic: /fmu/out/vehicle_odometry
    type: px4_msgs::msg::VehicleOdometry

  - topic: /fmu/out/vehicle_status
    type: px4_msgs::msg::VehicleStatus

  - topic: /fmu/out/vehicle_trajectory_waypoint_desired
    type: px4_msgs::msg::VehicleTrajectoryWaypoint

subscriptions:

  - topic: /fmu/in/offboard_control_mode
    type: px4_msgs::msg::OffboardControlMode

  ...

  - topic: /fmu/in/vehicle_trajectory_waypoint
    type: px4_msgs::msg::VehicleTrajectoryWaypoint

subscriptions_multi:

  - topic: /fmu/in/vehicle_optical_flow_vel
    type: px4_msgs::msg::VehicleOpticalFlowVel

  ...

```

Each (`topic`,`type`) pairs defines:

1. A new `publication`, `subscription`, or `subscriptions_multi`, depending on the list to which it is added.
2. The topic _base name_, which **must** coincide with the desired uORB topic name that you want to publish/subscribe. It is identified by the last token in `topic:` that starts with `/` and does not contains any `/` in it. `vehicle_odometry`, `vehicle_status` and `offboard_control_mode` are examples of base names.
3. The topic [namespace](https://design.ros2.org/articles/topic_and_service_names.html#namespaces). By default it is set to:
   - `/fmu/out/` for topics that are _published_ by PX4.
   - `/fmu/in/` for topics that are _subscribed_ by PX4.
4. The message type (`VehicleOdometry`, `VehicleStatus`, `OffboardControlMode`, etc.) and the ROS 2 package (`px4_msgs`) that is expected to provide the message definition.

`subscriptions` and `subscriptions_multi` allow us to choose the uORB topic instance that ROS 2 topics are routed to: either a shared instance that may also be getting updates from internal PX4 uORB publishers, or a separate instance that is reserved for ROS2 publications, respectively. Without this mechanism all ROS 2 messages would be routed to the _same_ uORB topic instance (because ROS 2 does not have the concept of [multiple topic instances](../middleware/uorb.md#multi-instance)), and it would not be possible for PX4 subscribers to differentiate between streams from ROS 2 or PX4 publishers.

Add a topic to the `subscriptions` section to:

- Create a unidirectional route going from the ROS2 topic to the _default_ instance (instance 0) of the associated uORB topic. For example, it creates a ROS2 subscriber of `/fmu/in/vehicle_odometry` and a uORB publisher of `vehicle_odometry`.
- If other (internal) PX4 modules are already publishing on the same uORB topic instance as the ROS2 publisher, the instance's subscribers will receive all streams of messages. The uORB subscriber will not be able to determine if an incoming message was published by PX4 or by ROS2.
- This is the desired behavior when the ROS2 publisher is expected to be the sole publisher on the topic instance (for example, replacing an internal publisher to the topic during offboard control), or when the source of multiple publishing streams does not matter.

Додайте тему до розділу `subscriptions_multi` для:

- Create a unidirectional route going from the ROS2 topic to a _new_ instance of the associated uORB topic. For example, if `vehicle_odometry` has already `2` instances, it creates a ROS2 subscriber of `/fmu/in/vehicle_odometry` and a uORB publisher on instance `3` of `vehicle_odometry`.
- This ensures that no other internal PX4 module will publish on the same instance used by uXRCE-DDS. The subscribers will be able to subscribe to the desired instance and distinguish between publishers.
- Note, however, that this guarantees separation between PX4 and ROS2 publishers, not among multiple ROS2 publishers. In that scenario, their messages will still be routed to the same instance.
- This is the desired behavior, for example, when you want PX4 to log the readings of two equal sensors; they will both publish on the same topic, but one will use instance 0 and the other will use instance 1.

You can arbitrarily change the configuration. For example, you could use different default namespaces or use a custom package to store the message definitions.

## Посібник міграції з Fast-RTPS на uXRCE-DDS

These guidelines explain how to migrate from using PX4 v1.13 [Fast-RTPS](../middleware/micrortps.md) middleware to PX4 v1.14 `uXRCE-DDS` middleware. These are useful if you have [ROS 2 applications written for PX4 v1.13](https://docs.px4.io/v1.13/en/ros/ros2_comm.html), or you have used Fast-RTPS to interface your applications to PX4 [directly](https://docs.px4.io/v1.13/en/middleware/micrortps.html#agent-in-an-offboard-fast-dds-interface-ros-independent).

:::info
Цей розділ містить інформацію, що стосується міграції. Вам також слід прочитати решту цієї сторінки, щоб правильно зрозуміти uXRCE-DDS.
:::

#### Залежності не потрібно видаляти

uXRCE-DDS не потребує залежностей, які були потрібні для Fast-RTPS, зокрема тих, що встановлюються за допомогою статті [Встановлення Fast DDS](https://docs.px4.io/v1.13/en/dev_setup/fast-dds-installation.html). You can keep them if you want, without affecting your uXRCE-DDS applications.

If you do choose to remove the dependencies, take care not to remove anything that is used by applications (for example, Java).

#### `_rtps` targets have been removed

Anywhere you previously used a build target with extension `_rtps`, such as `px4_fmu-v5_rtps` or `px4_sitl_rtps`, you can now use the equivalent default target (for these cases `px4_fmu-v5_default` and `px4_sitl_default`).

The make targets with extension `_rtps` were used to build firmware that included client side RTPS code. The uXRCE-DDS middleware is included by default in builds for most boards, so you no longer need a special firmware to work with ROS 2.

To check if your board has the middleware, look for `CONFIG_MODULES_UXRCE_DDS_CLIENT=y` in the `.px4board` file of your board. Those files are nested in [PX4-Autopilot/boards](https://github.com/PX4/PX4-Autopilot/tree/main/boards).

If it is not present, or if it is set to `n`, then you have to clone the PX4 repo, modify the board configuration and manually [compile](../dev_setup/building_px4.md) the firmware.

#### Новий модуль клієнта та нові параметри запуску

As the client is implemented by a new PX4 module, you now have new parameters to start it. Take a look at the [client startup section](#starting-the-client) to learn how this is done.

#### New file for setting which topics are published

The list of topics that are published and subscribed for a particular firmware is now managed by the [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) configuration file, which replaces [urtps_bridge_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/tools/urtps_bridge_topics.yaml)

See [Supported uORB Messages](#supported-uorb-messages) and [DDS Topics YAML](#dds-topics-yaml) sections for more information.

#### Topics no longer need to be synced between client and agent.

The list of bridged topics between agent and client no longer needs to be synced for ROS 2, so the `update_px4_ros2_bridge.sh` script is no longer needed.

#### Default topic naming convention has changed

The topic naming format changed:

- Published topics: `/fmu/topic-name/out` (Fast-RTPS) to `/fmu/out/topic-name` (XRCE-DDS).
- Subscribed topics: `/fmu/topic-name/in`(Fast-RTPS) to `/fmu/in/topic-name` (XRCE-DDS).

You should update your application to the new convention.

::: info
You might also edit [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) to revert to the old convention. This is not recommended because it means that you would have to always use custom firmware.
:::

#### XRCE-DDS-Agent

Агент XRCE-DDS є "загальним" і не залежить від PX4: [micro-xrce-dds-agent](https://micro-xrce-dds.docs.eprosima.com/en/latest/agent.html). Існує багато способів встановити його на ваш ПК / комп'ютер-компаньйон - для отримання додаткової інформації див. [відповідний розділ](#micro-xrce-dds-agent-installation).

#### Зміни, що стосуються конкретних додатків

Якщо ви не використовуєте ROS 2 разом з агентом ([Fast DDS Interface ROS-Independent](https://docs.px4.io/v1.13/en/middleware/micrortps.html#agent-in-an-offboard-fast-dds-interface-ros-independent)), вам потрібно перейти на [eProsima Fast DDS](https://fast-dds.docs.eprosima.com/en/latest/index.html).

Програми ROS 2, як і раніше, мають компілюватися разом із повідомленнями PX4, для чого вам слід додати до робочого простору пакунок [px4_msgs](https://github.com/PX4/px4_msgs). Ви можете вилучити пакунок [px4_ros_com](https://github.com/PX4/px4_ros_com), оскільки він більше не потрібен, окрім як для прикладу коду.

У ваших вузлах ROS 2 вам знадобиться:

- Оновіть [QoS](#px4-ros-2-qos-settings) ваших видавців і підписників, оскільки PX4 не використовує налаштування ROS 2 за замовчуванням.
- Змініть назви своїх тем, якщо ви не редагували [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).
- Видаліть все, що стосується синхронізації часу, оскільки XRCE-DDS автоматично піклується про синхронізацію часу агента/клієнта.

  У додатках C++ ви можете встановити поле `timestamp` вашого повідомлення таким чином:

  ```cpp
  msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
  ```

  У додатках Python ви можете встановити поле `timestamp` для ваших повідомлень таким чином:

  ```python
  msg.timestamp = int(self.get_clock().now().nanoseconds / 1000)
  ```

## Корисні ресурси

- [ROS 2 in PX4: Technical Details of a Seamless Transition to XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Pablo Garrido & Nuno Marques (youtube)
- [PX4 ROS 2 offboard tutorial](https://gist.github.com/julianoes/adbf76408663829cd9aed8d14c88fa29) (Github gist - JulianOes)
- [ROS 2 PX4 Offboard Tutorial](https://github.com/Jaeyoung-Lim/px4-offboard/blob/2d784532fd323505ac8a6e53bb70145600d367c4/doc/ROS2_PX4_Offboard_Tutorial.md) (Jaeyoung-Lim).<!---
Some of this might be useful.
I'd like to see a real example first.

## Setting up the bridge with real hardware

This section is work-in-progress.

## Troubleshooting

### Client reports that selected UART port is busy

If the selected UART port is busy, it's possible that the MAVLink application is already being used.
If both MAVLink and RTPS connections are required you will have to either move the connection to use another port or using the available protocol splitter for PX4 and companion computers.

:::tip
A quick/temporary fix to allow bridge testing during development is to stop MAVLink from *NuttShell*:
```sh
mavlink stop-all
```
:::  

### Enable UART on a companion computer

For UART transport on a Raspberry Pi or any other companion computer you will have to enable the serial port:

1. Make sure the `userid` (default is pi on a Raspberry Pi) is a member of the `dialout` group:

   ```sh
   groups pi
   sudo usermod -a -G dialout pi
   ```
1. For the Raspberry Pi in particular, you need to stop the GPIO serial console that is using the port:

   ```sh
   sudo raspi-config
   ```

   In the menu showed go to **Interfacing options > Serial**.
   Select **NO** for *Would you like a login shell to be accessible over serial?*. Valid and reboot.
1. Check UART in kernel:

   ```sh
   sudo vi /boot/config.txt
   ```

   And make sure that the `enable_uart` value is set to 1:
   ```
    enable_uart=1
   ```
-->
