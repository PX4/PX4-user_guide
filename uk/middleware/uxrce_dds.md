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

Набір [PX4 uORB тем](../msg_docs/index.md), які використовуються через клієнт, встановлені в [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml).

Теми є специфічними для релізу (підтримка компілюється в [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) на етапі збірки). Хоча більшість випусків мають підтримувати дуже схожий набір повідомлень, щоб бути впевненими, вам слід перевірити файл yaml для вашого конкретного релізу.

<!-- Jublish the set we use?: https://github.com/PX4/px4_msgs/issues/22 -->

Зауважте, що для інтерпретації повідомлень ROS 2/DDS повинен мати _такі самі_ визначення повідомлень, які були використані для створення клієнтського модуля uXRCE-DDS у прошивці PX4. Визначення повідомлень зберігаються в пакеті інтерфейсу ROS 2 [PX4/px4_msgs](https://github.com/PX4/px4_msgs), і вони автоматично синхронізуються CI у гілках `main` та release. Зверніть увагу, що всі повідомлення з вихідного коду PX4 присутні в репозиторії, але лише ті, які перелічені в `dds_topics.yaml`, будуть доступні як теми ROS 2. Тому,

- Якщо ви використовуєте основну або релізну версію PX4, ви можете отримати визначення повідомлень, клонуючи пакет інтерфейсу [PX4/px4_msgs](https://github.com/PX4/px4_msgs) у вашу робочу область.
- Якщо ви створюєте або змінюєте повідомлення uORB, вам потрібно вручну оновити повідомлення у вашому робочому просторі з вихідного дерева PX4. Загалом це означає, що вам слід оновити [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), клонувати пакет інтерфейсу, а потім вручну синхронізувати його, скопіювавши нові/змінені визначення повідомлень з [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) до його папки `msg`. Якщо припустити, що PX4-Autopilot знаходиться у вашому домашньому каталозі `~`, а `px4_msgs` - у `~/px4_ros_com/src/`, то команда може бути такою:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

  :::info Технічно, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) повністю визначає зв'язок між темами PX4 uORB і повідомленнями ROS 2. Для отримання додаткової інформації див. [DDS Topics YAML](#dds-topics-yaml) нижче.
:::

## Налаштування простору імен теми

Власні простори імен тем можна застосовувати під час збирання (змінюючи [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)) або під час виконання (що є корисним для роботи з декількома транспортними засобами):

- Однією з можливостей є використання опції `-n` при запуску [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) з командного рядка. Ця техніка може бути використана як у симуляторах, так і на реальних транспортних засобах.
- Користувацький простір імен можна створити (лише) для симуляцій, встановивши змінну оточення `PX4_UXRCE_DDS_NS` перед початком симуляції.

::: info
Зміна простору імен під час виконання додасть потрібний простір імен як префікс до всіх полів `topic` у [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Отже, команди, подібні до:

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

Налаштування QoS PX4 для видавців несумісні з налаштуваннями QoS за замовчуванням для підписників ROS 2. Таким чином, якщо код ROS 2 потрібно підписатися на тему uORB, йому потрібно використовувати сумісні налаштування QoS. Один із прикладів показано в [Посібнику користувача ROS 2 > Налаштування QoS підписника ROS 2](../ros/ros2_comm.md#ros-2-subscriber-qos-settings).

PX4 використовує наступні параметри QoS для видавців:

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

ROS 2 використовує наступні налаштування QoS (за замовчуванням) для видавців та підписок: «зберігати останніми» для історії з розміром черги 10, «reliable» для надійності, «volatile» для тривалості і «system default» для життєздатності. Дедлайн, тривалість життя та оренда також налаштовані на "за замовчуванням".

<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->

## DDS теми YAML

Файл PX4 yaml [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) визначає набір тем PX4 uORB, які вбудовано у прошивку та опубліковано. Точніше, він повністю визначає взаємозв'язок/сполучення між повідомленнями PX4 uORB і ROS 2.

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

Кожна пара (`topic`,`type`) визначає:

1. Нова `publication`, `subscription`, або `subscriptions_multi`, залежно від списку, до якого її додано.
2. Назва теми _base name_, яка **повинна** збігатися з бажаною назвою теми uORB, яку ви хочете опублікувати/підписатися. Він ідентифікується за останнім токеном у `topic:`, який починається з `/` і не містить жодного `/` у своєму складі. `vehicle_odometry`, `vehicle_status` та `offboard_control_mode` - це приклади базових імен.
3. [простір імен](https://design.ros2.org/articles/topic_and_service_names.html#namespaces) теми. За замовчуванням встановлено ​​на:
   - `/fmu/out/` для тем, які _публікуються_ PX4.
   - `/fmu/in/` для тем, які _підписані_ PX4.
4. Тип повідомлення (`VehicleOdometry`, `VehicleStatus`, `OffboardControlMode` тощо) та пакет ROS 2 (`px4_msgs`), який очікує для надання визначення повідомлення.

`subscriptions` і `subscriptions_multi` дозволяють нам вибрати екземпляр теми uORB, до якого надсилатимуться теми ROS 2: або спільний екземпляр, який також може отримувати оновлення від внутрішніх видавців uORB PX4, або окремий екземпляр, зарезервований для публікацій ROS2 відповідно. Без цього механізму всі повідомлення ROS 2 перенаправлятимуться до _одного і того ж_ екземпляра теми uORB (оскільки у ROS 2 немає поняття [кількох екземплярів тем](../middleware/uorb.md#multi-instance)), і підписники PX4 не зможуть розрізняти потоки від видавців ROS 2 або PX4.

Додайте тему до розділу `subscriptions` для:

- Створіть односпрямований маршрут від теми ROS2 до екземпляра _default_ (екземпляр 0) пов'язаної з нею теми uORB. Наприклад, він створює підписника ROS2 `/fmu/in/vehicle_odometry` та видавця uORB `vehicle_odometry`.
- Якщо інші (внутрішні) модулі PX4 вже публікують у тому ж екземплярі теми uORB, що й публікатор ROS2, підписники цього екземпляра будуть отримувати всі потоки повідомлень. Підписник uORB не зможе визначити, чи вхідне повідомлення було опубліковане PX4 або ROS2.
- Це бажана поведінка, коли очікується, що ROS2-видавець буде єдиним видавцем у екземплярі теми (наприклад, для заміни внутрішнього видавця теми під час автономного керування), або коли джерело декількох потоків публікацій не має значення.

Додайте тему до розділу `subscriptions_multi` для:

- Створіть односпрямований маршрут від теми ROS2 до _нового_ екземпляра пов'язаної з нею теми uORB. Наприклад, якщо `vehicle_odometry` вже має `2` екземплярів, він створює підписника ROS2 на `/fmu/in/vehicle_odometry` і видавця uORB на екземплярі `3` з `vehicle_odometry`.
- Це гарантує, що жоден інший внутрішній модуль PX4 не публікуватиметься на тому самому екземплярі, що використовується uXRCE-DDS. Підписники зможуть підписатися на потрібний екземпляр і розрізняти видавців.
- Зауважте, однак, що це гарантує розділення між видавцями PX4 і ROS2, а не між кількома видавцями ROS2. У цьому випадку їхні повідомлення все одно будуть перенаправлені на той самий екземпляр.
- Це бажана поведінка, наприклад, коли ви хочете, щоб PX4 реєстрував показання двох однакових датчиків; вони обидва публікуватимуться в одній темі, але один з них використовуватиме екземпляр 0, а інший - екземпляр 1.

Ви можете довільно змінювати конфігурацію. Наприклад, ви можете використовувати різні простори імен за замовчуванням або використовувати власний пакет для зберігання визначень повідомлень.

## Посібник міграції з Fast-RTPS на uXRCE-DDS

Ці настанови пояснюють, як перейти від використання проміжного програмного забезпечення PX4 v1.13 [Fast-RTPS](../middleware/micrortps.md) до проміжного програмного забезпечення PX4 v1.14 `uXRCE-DDS`. Вони корисні, якщо у вас є [ROS 2 додатки, написані для PX4 v1.13](https://docs.px4.io/v1.13/en/ros/ros2_comm.html), або ви використовували Fast-RTPS для інтерфейсу ваших додатків з PX4 [безпосередньо](https://docs.px4.io/v1.13/en/middleware/micrortps.html#agent-in-an-offboard-fast-dds-interface-ros-independent).

:::info
Цей розділ містить інформацію, що стосується міграції. Вам також слід прочитати решту цієї сторінки, щоб правильно зрозуміти uXRCE-DDS.
:::

#### Залежності не потрібно видаляти

uXRCE-DDS не потребує залежностей, які були потрібні для Fast-RTPS, зокрема тих, що встановлюються за допомогою статті [Встановлення Fast DDS](https://docs.px4.io/v1.13/en/dev_setup/fast-dds-installation.html). Ви можете зберегти їх, якщо хочете, не впливаючи на ваші додатки uXRCE-DDS.

Якщо ви вирішили видалити залежності, будьте обережні, щоб не видалити нічого, що використовується програмами (наприклад, Java).

#### `_rtps` targets have been removed

Якщо ви раніше використовували ціль збірки з розширенням `_rtps`, наприклад, `px4_fmu-v5_rtps` або `px4_sitl_rtps`, тепер ви можете використовувати еквівалентну ціль за замовчуванням (для цих випадків `px4_fmu-v5_default` і `px4_sitl_default`).

Цілі make з розширенням `_rtps` було використано для створення прошивки, яка містила код RTPS на стороні клієнта. Проміжне програмне забезпечення uXRCE-DDS за замовчуванням включено до збірок для більшості плат, тому вам більше не потрібна спеціальна прошивка для роботи з ROS 2.

Щоб перевірити, чи має ваша плата проміжне програмне забезпечення, знайдіть `CONFIG_MODULES_UXRCE_DDS_CLIENT=y` у файлі `.px4board` вашої плати. Ці файли вкладено до каталогу [PX4-Autopilot/boards](https://github.com/PX4/PX4-Autopilot/tree/main/boards).

Якщо його немає, або якщо він має значення `n`, то вам доведеться клонувати репозиторій PX4, змінити конфігурацію плати і вручну [скомпілювати](../dev_setup/building_px4.md) прошивку.

#### Новий модуль клієнта та нові параметри запуску

Оскільки клієнт реалізовано новим модулем PX4, тепер у вас є нові параметри для його запуску. Перегляньте розділ [запуску клієнта](#starting-the-client), щоб дізнатися, як це робиться.

#### Новий файл для налаштування того, які теми публікуються

Перелік тем, які публікуються і на які здійснюється підписка для певної прошивки, тепер керується конфігураційним файлом [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), який замінює [urtps_bridge_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/tools/urtps_bridge_topics.yaml)

Дивіться розділи [Підтримувані повідомлення uORB](#supported-uorb-messages) та [DDS Теми YAML](#dds-topics-yaml) для отримання додаткової інформації.

#### Теми більше не потрібно синхронізувати між клієнтом і агентом.

Список проміжних тем між агентом і клієнтом більше не потрібно синхронізувати для ROS 2, тому скрипт `update_px4_ros2_bridge.sh` більше не потрібен.

#### Налаштування назви теми за замовчуванням змінено

Змінився формат назв тем:

- Опубліковані теми: `/fmu/topic-name/out` (Fast-RTPS) до `/fmu/out/topic-name` (XRCE-DDS).
- Підписані теми: `/fmu/topic-name/in`(Fast-RTPS) до `/fmu/in/topic-name` (XRCE-DDS).

Вам слід оновити свій додаток відповідно до нової конвенції.

:::info
Ви також можете відредагувати [dds_topic.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), щоб повернутися до старої конвенції. Це не рекомендується, оскільки це означає, що вам доведеться завжди використовувати кастомну прошивку.
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
