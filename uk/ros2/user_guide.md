# ROS 2 Посібник користувача

Архітектура ROS 2-PX4 забезпечує глибоку інтеграцію між ROS 2 і PX4, дозволяючи підписникам ROS 2 або вузлам видавців безпосередньо взаємодіяти з темами uORB PX4.

Ця тема містить огляд архітектури та пайплайну додатків, а також пояснює, як налаштувати та використовувати ROS 2 з PX4.

:::info Починаючи з PX4 v1.14, ROS 2 використовує проміжне програмне забезпечення [uXRCE-DDS](../middleware/uxrce_dds.md), яке замінило проміжне програмне забезпечення _FastRTPS_, що використовувалося у версії 1.13 (версія 1.13 не підтримує uXRCE-DDS).

У [посібнику з міграції](../middleware/uxrce_dds.md#fast-rtps-to-uxrce-dds-migration-guidelines) пояснюється, що потрібно зробити, щоб перенести програми ROS 2 з PX4 v1.13 на PX4 v1.14.

Якщо ви досі працюєте на PX4 v1.13, дотримуйтесь інструкцій в [PX4 v1.13 Docs](https://docs.px4.io/v1.13/en/ros/ros2_comm.html).
<!-- remove this when there are PX4 v1.14 docs for some months -->
:::

## Загальний огляд

Пайплайн додатків для ROS 2 дуже простий завдяки використанню комунікаційного проміжного програмного забезпечення [uXRCE-DDS](../middleware/uxrce_dds.md).

![Architecture uXRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

<!-- doc source: https://docs.google.com/drawings/d/1WcJOU-EcVOZRPQwNzMEKJecShii2G4U3yhA3U6C4EhE/edit?usp=sharing -->

Проміжне програмне забезпечення uXRCE-DDS складається з клієнта, що працює на PX4, і агента, що працює на комп'ютері-компаньйоні, з двостороннім обміном даними між ними по послідовному, UDP, TCP або користувацькому каналу зв'язку. Агент діє як проксі для клієнта з метою публікації та підписки на теми в глобальному просторі даних DDS.

PX4 [клієнт uxrce_dds](../modules/modules_system.md#uxrce-dds-client) генерується під час збірки та за замовчуванням включений у прошивку PX4. Він включає як код клієнта "загального" мікро XRCE-DDS, так і код перекладу, специфічний для PX4, який він використовує для публікації/передачі даних з/у теми uORB. Підмножина повідомлень uORB, які генеруються в клієнті, перелічені в [PX4-Autopilot/src/modules/uxrce_dds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Генератор використовує визначення повідомлень uORB у дереві джерела: [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg), щоб створити код для відправлення повідомлень ROS 2.

Програми ROS 2 потрібно створювати в робочій області, яка має _ті самі_ визначення повідомлень, які використовувалися для створення клієнтського модуля uXRCE-DDS у мікропрограмі PX4. Ви можете включити їх, клонуючи інтерфейсний пакет [PX4/px4_msgs](https://github.com/PX4/px4_msgs) у своє робоче середовище ROS 2 (гілки у репозиторії відповідають повідомленням для різних випусків PX4).

Зверніть увагу, що сам по собі _агент_ micro XRCE-DDS <0>не має залежності</0> від клієнтського коду. Це може бути побудовано з [вихідний код](https://github.com/eProsima/Micro-XRCE-DDS-Agent) або як самостійний елемент, або як частина збірки ROS, або встановлено як snap.

Зазвичай вам потрібно запустити як клієнт, так і агента при використанні ROS 2. Зверніть увагу, що клієнт uXRCE-DDS вбудований в прошивку за замовчуванням, але не запускається автоматично, за винятком збірок симулятора.

:::info У PX4v1.13 та раніше, ROS 2 був залежний від визначень у [px4_ros_com](https://github.com/PX4/px4_ros_com). Цей репозиторій більше не потрібен, але містить корисні приклади.
:::


## Встановлення та налаштування

Підтримувані платформи ROS 2 для розробки PX4 - ROS 2 "Humble" на Ubuntu 22.04 та ROS 2 "Foxy" на Ubuntu 20.04.

ROS 2 "Humble" рекомендується, оскільки це поточний розподіл ROS 2 LTS. ROS 2 "Foxy" досягла кінця свого життя в травні 2023 року, але все ще стабільна і працює з PX4.

::: info PX4 не так добре протестований на Ubuntu 22.04, як на Ubuntu 20.04 (на момент написання), і Ubuntu 20.04 потрібний, якщо ви хочете використовувати [Gazebo Classic](../sim_gazebo_classic/index.md).
:::

Для налаштування ROS 2 для використання з PX4:

- [Встановити PX4](#install-px4) (для використання симулятора PX4)
- [Встановіть ROS 2](#install-ros-2)
- [Налаштування агента та клієнта Micro XRCE-DDS](#setup-micro-xrce-dds-agent-client)
- [Створіть та запустіть робоче середовище ROS 2](#build-ros-2-workspace)

Інші залежності архітектури, які встановлюються автоматично, такі як _Fast DDS_, не враховуються.


### Встановлення PX4

Вам потрібно встановити інструментальний набір розробки PX4, щоб використовувати симулятор.

:::info Єдиним залежністю ROS 2 від PX4 є набір визначень повідомлень, який він отримує з [px4_msgs](https://github.com/PX4/px4_msgs). Вам потрібно встановити PX4 лише в разі, якщо вам потрібен симулятор (як у цьому посібнику), або якщо ви створюєте збірку, яка публікує власні теми uORB.
:::

Налаштуйте середовище розробки PX4 на Ubuntu звичайним шляхом:

```sh
cd
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
cd PX4-Autopilot/
make px4_sitl
```

Зверніть увагу, що вищезазначені команди встановлять рекомендований симулятор для вашої версії Ubuntu. Якщо ви хочете встановити PX4, але зберегти вашу існуючу установку симулятора, запустіть `ubuntu.sh` вище з прапорцем `--no-sim-tools`.

Для отримання додаткової інформації та усунення неполадок див. [Середовище розробки Ubuntu](../dev_setup/dev_env_linux_ubuntu.md) та [Завантажити вихідний код PX4](../dev_setup/building_px4.md).

### Встановлення ROS 2

Щоб встановити ROS 2 і його залежності:

1. Встановлення ROS 2.

   :::: tabs

   ::: tab humble To install ROS 2 "Humble" on Ubuntu 22.04:

   ```sh
   sudo apt update && sudo apt install locales
   sudo locale-gen en_US en_US.UTF-8
   sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
   export LANG=en_US.UTF-8
   sudo apt install software-properties-common
   sudo add-apt-repository universe
   sudo apt update && sudo apt install curl -y
   sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
   sudo apt update && sudo apt upgrade -y
   sudo apt install ros-humble-desktop
   sudo apt install ros-dev-tools
   source /opt/ros/humble/setup.bash && echo "source /opt/ros/humble/setup.bash" >> .bashrc
   ```

   Інструкції вище відтворено з офіційного посібника з установки: [Встановлення ROS 2 Humble](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html). Ви можете встановити _або_ робочий стіл (`ros-humble-desktop`) _або_ мінімалістичні версії (`ros-humble-ros-base`), *і* засоби розробки (`ros-dev-tools`).
:::


   :::tab foxy Щоб встановити ROS 2 "Foxy" на Ubuntu 20.04:

   -  Дотримуйтесь офіційного посібника з встановлення: [Встановіть ROS 2 Foxy](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Install-Debians/).

   Ви можете встановити _або_ робочий стіл (`ros-foxy-desktop`) _або_ мінімалістичні версії (`ros-foxy-ros-base`), *і* засоби розробки (`ros-dev-tools`).
:::

   ::::

1. Деякі Python залежності також мають бути встановленні (використовуючи **`pip`** або **`apt`**):

   ```sh
   pip install --user -U empy==3.3.4 pyros-genmsg setuptools
   ```



### Налаштування агента та клієнта Micro XRCE-DDS

Для того щоб ROS 2 міг спілкуватися з PX4, [клієнт uXRCE-DDS](../modules/modules_system.md#uxrce-dds-client) повинен працювати на PX4, підключений до агента micro XRCE-DDS, який працює на компаньйоновому комп'ютері.

#### Налаштувати агента

Агент може бути встановлений на компаньйоновий комп'ютер [різними способами](../middleware/uxrce_dds.md#micro-xrce-dds-agent-installation). Нижче ми покажемо, як побудувати агента "standalone" з вихідних кодів та підключитися до клієнта, який працює на симуляторі PX4.

Для налаштування та запуску агента:

1. Відкрийте термінал.
1. Введіть наступні команди для витягування та побудови агента з вихідного коду:

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

1. Запустіть агента з налаштуваннями для підключення до клієнта uXRCE-DDS, який працює на симуляторі:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

Агент зараз працює, але ви не побачите багато, поки ми не почнемо PX4 (у наступному кроці).

::: інформація
Ви можете залишити агента, що працює в цьому терміналі!
Зверніть увагу, що дозволено лише одного агента на підключений канал зв'язку.
:::

#### Запустіть клієнта

Симулятор PX4 автоматично запускає клієнт uXRCE-DDS, підключаючись до порту UDP 8888 на локальному хості.

Для запуску симулятора (і клієнта):

1. Відкрийте новий термінал в корені репозиторію **PX4 Autopilot**, який був встановлений вище.

   :::: tabs

   ::: tab humble
   - Розпочніть симуляцію PX4 у [Gazebo](../sim_gazebo_gz/index.md) за допомогою:

     ```sh
     make px4_sitl gz_x500
     ```

:::

   ::: tab foxy
   - Почніть симуляцію PX4 [Симуляція Gazebo Classic](../sim_gazebo_classic/index.md) за допомогою:

     ```sh
     make px4_sitl gazebo-classic
     ```

:::

   ::::

Агент та клієнт зараз працюють, вони повинні підключитися.

Термінал PX4 відображає вивід [NuttShell/PX4 Системна Консоль](../debug/system_console.md) під час завантаження та роботи PX4. Як тільки агент підключає вихід, вивід повинен містити повідомлення `INFO`, що показують створення записувачів даних:

```
...
INFO  [uxrce_dds_client] synchronized with time offset 1675929429203524us
INFO  [uxrce_dds_client] successfully created rt/fmu/out/failsafe_flags data writer, topic id: 83
INFO  [uxrce_dds_client] successfully created rt/fmu/out/sensor_combined data writer, topic id: 168
INFO  [uxrce_dds_client] successfully created rt/fmu/out/timesync_status data writer, topic id: 188
...
```

Термінал агента micro XRCE-DDS також повинен почати показувати вивід, оскільки в мережі DDS створюються еквівалентні теми:

```
...
[1675929445.268957] info     | ProxyClient.cpp    | create_publisher         | publisher created      | client_key: 0x00000001, publisher_id: 0x0DA(3), participant_id: 0x001(1)
[1675929445.269521] info     | ProxyClient.cpp    | create_datawriter        | datawriter created     | client_key: 0x00000001, datawriter_id: 0x0DA(5), publisher_id: 0x0DA(3)
[1675929445.270412] info     | ProxyClient.cpp    | create_topic             | topic created          | client_key: 0x00000001, topic_id: 0x0DF(2), participant_id: 0x001(1)
...
```

### Створення робочого простору ROS 2

Цей розділ показує, як створити робоче середовище ROS 2, розміщене в вашій домашній директорії (змініть команди за необхідності, щоб розмістити вихідний код в іншому місці).

Пакети [px4_ros_com](https://github.com/PX4/px4_ros_com) та [px4_msgs](https://github.com/PX4/px4_msgs) клонуються до папки робочого простору, а потім використовується інструмент `colcon` для збірки робочого простору. Приклад виконується за допомогою `ros2 launch`.

:::info Приклад будує [Приклад застосунку ROS 2 Listener](#ros-2-listener), розташований в [px4_ros_com](https://github.com/PX4/px4_ros_com). [px4_msgs](https://github.com/PX4/px4_msgs) також потрібний, щоб приклад міг інтерпретувати теми PX4 ROS 2.
:::


#### Створення робочого простору

Створити та побудувати робочий простір:

1. Відкрийте новий термінал.
1. Створіть новий каталог робочого простору та перейдіть до нього за допомогою:

   ```sh
   mkdir -p ~/ws_sensor_combined/src/
   cd ~/ws_sensor_combined/src/
   ```

   :::info
Узгодження імен для папок робочого простору може полегшити керування робочим простором.
:::

1. Скопіюйте репозиторій прикладів і [px4_msgs](https://github.com/PX4/px4_msgs) до каталогу `/src` (за замовчуванням клоновано гілку `main`, яка відповідає версії PX4, яку ми запускаємо):

   ```sh
   git clone https://github.com/PX4/px4_msgs.git
   git clone https://github.com/PX4/px4_ros_com.git
   ```

1. Створіть середовище розробки ROS 2 у поточному терміналі і скомпілюйте робочу область за допомогою `colcon`:

   :::: tabs

   ::: tab humble
   ```sh
   cd ..
   source /opt/ros/humble/setup.bash
   colcon build
   ```

:::

   ::: tab foxy
   ```sh
   cd ..
   source /opt/ros/foxy/setup.bash
   colcon build
   ```

:::

   ::::

   У результаті буде зібрано усі каталоги у `/src` за допомогою вихідного набору інструментів.


#### Запуск прикладу

Щоб запустити виконувані файли, які ви щойно побудували, вам потрібно джерело `local_setup.bash`. Це надає доступ до "гаків середовища" для поточного робочого простору. Іншими словами, воно робить виконувані файли, що були тільки що побудовані, доступними в поточному терміналі.

:::info У [початкових навчальних посібниках ROS2](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay) рекомендується _відкрити новий термінал_ для запуску ваших виконавчих файлів.
:::

В новому терміналі:

1. Перейдіть на верхній рівень каталогу вашого робочого простору та джерело середовища ROS 2 (у цьому випадку "Humble"):

   :::: tabs

   ::: tab humble
   ```sh
   cd ~/ws_sensor_combined/
   source /opt/ros/humble/setup.bash
   ```

:::

   ::: tab foxy
   ```sh
   cd ~/ws_sensor_combined/
   source /opt/ros/foxy/setup.bash
   ```

:::

   ::::

1. Джерело `local_setup.bash`.

   ```sh
   source install/local_setup.bash
   ```
1. Тепер запустіть приклад. Зверніть увагу, що тут ми використовуємо `ros2 launch`, який описано нижче.

   ```
   ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

Якщо це працює, ви повинні бачити дані, які друкуються на терміналі / консолі, де ви запустили слухача ROS:

```sh
RECEIVED DATA FROM SENSOR COMBINED
================================
ts: 870938190
gyro_rad[0]: 0.00341645
gyro_rad[1]: 0.00626475
gyro_rad[2]: -0.000515705
gyro_integral_dt: 4739
accelerometer_timestamp_relative: 0
accelerometer_m_s2[0]: -0.273381
accelerometer_m_s2[1]: 0.0949186
accelerometer_m_s2[2]: -9.76044
accelerometer_integral_dt: 4739
```

## Керування Транспортним Засобом

Для контролю за додатками, додатки ROS 2:

- підписатися на (слухати) тематичні теми, опубліковані PX4
- опублікувати у темах, які спонукають PX4 виконати певну дію.

Теми, які ви можете використовувати, визначені в [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), і ви можете отримати більше інформації про їх дані в [Посилання на повідомлення uORB](../msg_docs/index.md). Наприклад, [VehicleGlobalPosition](../msg_docs/VehicleGlobalPosition.md) може бути використано для отримання глобального положення транспортного засобу, тоді як [VehicleCommand](../msg_docs/VehicleCommand.md) може бути використано для виконання дій, таких як зльот та посадка.

[Приклади застосувань ROS 2](#ros-2-example-applications), наведені нижче, надають конкретні приклади того, як використовувати ці теми.

## Проблеми сумісності

Цей розділ містить інформацію, яка може вплинути на те, як ви пишете свій код ROS.

### Налаштування QoS підписника ROS 2

Код ROS 2, який підписується на теми, опубліковані PX4, _повинен_ вказати відповідну (сумісну) настройку QoS, щоб слухати теми. Зокрема, вузли повинні підписатися, використовуючи попередньо визначену якість обслуговування даних сенсорів ROS 2 (з [прикладу вихідного коду слухача](#ros-2-listener)):

```cpp
...
rmw_qos_profile_t qos_profile = rmw_qos_profile_sensor_data;
auto qos = rclcpp::QoS(rclcpp::QoSInitialization(qos_profile.history, 5), qos_profile);

subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>("/fmu/out/sensor_combined", qos,
...
```

Це потрібно, оскільки типові налаштування [Якості обслуговування (QoS)](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-profiles) ROS 2 відрізняються від налаштувань, що використовуються PX4. Не всі комбінації налаштувань якості обслуговування відправник-підписник [Qos можливі](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-compatibilities), і виявляється, що типові налаштування ROS 2 для підписки не є такими! Зверніть увагу, що код ROS не повинен встановлювати налаштування QoS при публікації (налаштування PX4 сумісні з типовими налаштуваннями ROS у цьому випадку).

<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->


### Узгодження систем координат ROS 2 & PX4

Локальна/світова та тілові системи координат, що використовуються в ROS та PX4, відрізняються.

| Frame | PX4                                              | ROS                                            |
| ----- | ------------------------------------------------ | ---------------------------------------------- |
| Body  | FRD (X **F**orward, Y **R**ight, Z **D**own)     | FLU (X **F**orward, Y **L**eft, Z **U**p)      |
| World | FRD or NED (X **N**orth, Y **E**ast, Z **D**own) | FLU or ENU (X **E**ast, Y **N**orth, Z **U**p) |

:::tip
Дивіться [REP105: Системи координат для мобільних платформ](http://www.ros.org/reps/rep-0105.html) для отримання додаткової інформації про системи координат ROS.
:::

Обидві системи координат показані на зображенні нижче (FRD зліва / FLU справа).

![Reference frames](../../assets/lpe/ref_frames.png)

Конвенції FRD (NED) приймаються на **всі** теми PX4, якщо явно не вказано в відповідному визначенні повідомлення. Отже, вузли ROS 2, які хочуть співпрацювати з PX4, повинні дбати про конвенції кадрів.

- Для повороту вектора з ENU на NED потрібно виконати дві основні обертання:

  - спочатку обертання на кут pi/2 навколо вісі `Z` (вгору),
  - потім обертання на кут пі навколо вісі `X` (старий схід/новий північ).
- Для повороту вектора з NED на ENU потрібно виконати дві основні обертання:
-
  - спочатку обертання на кут pi/2 навколо вісі `Z` (вниз),
  - потім обертання на кут пі навколо вісі `X` (старий північ/новий схід). Зверніть увагу, що дві отримані операції математично еквівалентні.
- Для обертання вектора з FLU на FRD достатньо обертання навколо вісі `X` (передньої) на пі.
- Для обертання вектора з FRD на FLU достатньо обертання на пі радіан навколо вісі `X` (передній).

Приклади векторів, які потребують обертання:

- усі поля в повідомленні [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md); конвертація ENU в NED необхідна перед їхнім відправленням.
- всі поля в повідомленні [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md); потрібно виконати конвертацію з FLU в FRD перед їх відправленням.

Подібно до векторів, також кватерніони, що представляють відношення транспортного засобу (тіло) відносно. світова рамка потребує конвертації.

[PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) надає спільну бібліотеку [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/include/px4_ros_com/frame_transforms.h) для легкого виконання таких перетворень.

### Синхронізація часу ROS, Gazebo та PX4

За замовчуванням синхронізація часу між ROS 2 та PX4 автоматично керується проміжним ПЗ [uXRCE-DDS](https://micro-xrce-dds.docs.eprosima.com/en/latest/time_sync.html), а статистика синхронізації часу доступна при прослуховуванні мостової теми `/fmu/out/timesync_status`. Коли клієнт uXRCE-DDS працює на контролері польоту, а агент працює на супутниковому комп'ютері, це є бажана поведінка, оскільки зміщення часу, дрейф часу та затримка у комунікації обчислюються та автоматично компенсуються.

Для симуляцій Gazebo PX4 використовує тему Gazebo `/clock` як [джерело часу](../sim_gazebo_gz/index.md#px4-gazebo-time-synchronization) замість. Цей годинник завжди трохи не синхронізований відносно. годинник операційної системи (фактор реального часу ніколи не є точно один) і він може навіть працювати набагато швидше або повільніше залежно від [переваг користувача](http://sdformat. org/spec? elem=physics&ver=1.9). Зверніть увагу, що це відрізняється від процедури [симуляційного блокування](../simulation/index.md#lockstep-simulation), яка була прийнята з Gazebo Classic.

Користувачі ROS2 мають дві можливості щодо [джерела часу](https://design.ros2.org/articles/clock_and_time.html) їх вузлів.

#### Вузли ROS2 використовують годинник ОС як джерело часу

Цей сценарій, який розглядається на цій сторінці та в керівництві [offboard_control](./offboard_control.md), також є стандартною поведінкою вузлів ROS2. Годинник ОС діє як джерело часу, тому його можна використовувати лише тоді, коли фактор реального часу симуляції дуже близький до одиниці. Часовий синхронізатор клієнта uXRCE-DDS потім з'єднує годинник ОС на стороні ROS2 з годинником Gazebo на стороні PX4. Користувачеві не потрібно вживати жодних подальших заходів.

#### Вузли ROS2 використовують годинник Gazebo як джерело часу

У цьому сценарії ROS2 також використовує тему Gazebo `/clock` як джерело часу. Цей підхід має сенс, якщо симуляція Gazebo працює з коефіцієнтом реального часу, відмінним від одиниці, або якщо ROS2 потрібно безпосередньо взаємодіяти з Gazebo. На стороні ROS2 пряме взаємодія з Gazebo досягається за допомогою пакету [ros_gz_bridge](https://github.com/gazebosim/ros_gz) з репозиторію [ros_gz](https://github.com/gazebosim/ros_gz). Прочитайте [repo](https://github.com/gazebosim/ros_gz#readme) та [package](https://github.com/gazebosim/ros_gz/tree/ros2/ros_gz_bridge#readme) READMEs, щоб дізнатися правильну версію, яка повинна бути встановлена в залежності від вашої версії ROS2 та Gazebo.

Якщо пакет встановлено та джерело підключено, вузол `parameter_bridge` надає можливості мостування і може бути використаний для створення одностороннього моста `/clock`:

```sh
ros2 run ros_gz_bridge parameter_bridge /clock@rosgraph_msgs/msg/Clock[gz.msgs.Clock
```

На цьому етапі кожному вузлу ROS2 необхідно бути інструкцією використовувати новостворену тему `/clock` як джерело часу замість ОС, це робиться шляхом встановлення параметра `use_sim_time` (кожного вузла) на `true` (див. [ROS clock and Time design](https://design.ros2.org/articles/clock_and_time.html)).

Це завершує внесені зміни, необхідні на стороні ROS2. На стороні PX4 вам потрібно лише зупинити синхронізацію часу uXRCE-DDS, встановивши параметр [UXRCE_DDS_SYNCT](../advanced_config/parameter_reference.md#UXRCE_DDS_SYNCT) на `false`. Таким чином, Gazebo буде діяти як основний і єдиний джерело часу як для ROS2, так і для PX4.

## Приклади програм ROS 2

### Слухач ROS 2

Приклади слухачів ROS 2 [у репозиторії px4_ros_com](https://github.com/PX4/px4_ros_com/tree/main/src/examples/listeners) демонструють, як писати вузли ROS для прослуховування тем, що публікуються PX4.

Тут ми розглядаємо вузол [sensor_combined_listener.cpp](https://github.com/PX4/px4_ros_com/blob/main/src/examples/listeners/sensor_combined_listener.cpp) у папці `px4_ros_com/src/examples/listeners`, який підписується на повідомлення [SensorCombined](../msg_docs/SensorCombined.md).

:::info [Побудуйте робоче середовище ROS 2](#build-ros-2-workspace) показує, як побудувати та запустити цей приклад.
:::

Спочатку код імпортує бібліотеки C++, необхідні для взаємодії з проміжним програмним забезпеченням ROS 2 та файл заголовка для повідомлення `SensorCombined`, на яке підписується вузол:

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/sensor_combined.hpp>
```

Потім він створює клас `SensorCombinedListener`, який успадковує загальний базовий клас `rclcpp::Node`.

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

Це створює функцію зворотного виклику для отримання повідомлень uORB `SensorCombined` (тепер як повідомлення micro XRCE-DDS) та виводить вміст полів повідомлення кожного разу, коли повідомлення отримано.

```cpp
public:
    explicit SensorCombinedListener() : Node("sensor_combined_listener")
    {
        rmw_qos_profile_t qos_profile = rmw_qos_profile_sensor_data;
        auto qos = rclcpp::QoS(rclcpp::QoSInitialization(qos_profile.history, 5), qos_profile);

        subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>("/fmu/out/sensor_combined", qos,
        [this](const px4_msgs::msg::SensorCombined::UniquePtr msg) {
            std::cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
            std::cout << "RECEIVED SENSOR COMBINED DATA"   << std::endl;
            std::cout << "============================="   << std::endl;
            std::cout << "ts: "          << msg->timestamp    << std::endl;
            std::cout << "gyro_rad[0]: " << msg->gyro_rad[0]  << std::endl;
            std::cout << "gyro_rad[1]: " << msg->gyro_rad[1]  << std::endl;
            std::cout << "gyro_rad[2]: " << msg->gyro_rad[2]  << std::endl;
            std::cout << "gyro_integral_dt: " << msg->gyro_integral_dt << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << msg->accelerometer_timestamp_relative << std::endl;
            std::cout << "accelerometer_m_s2[0]: " << msg->accelerometer_m_s2[0] << std::endl;
            std::cout << "accelerometer_m_s2[1]: " << msg->accelerometer_m_s2[1] << std::endl;
            std::cout << "accelerometer_m_s2[2]: " << msg->accelerometer_m_s2[2] << std::endl;
            std::cout << "accelerometer_integral_dt: " << msg->accelerometer_integral_dt << std::endl;
        });
    }
```

:::info Підписка встановлює профіль QoS на основі `rmw_qos_profile_sensor_data`. Це потрібно, оскільки типовий профіль якості обслуговування ROS 2 для підписників несумісний з профілем PX4 для видавців. Для отримання додаткової інформації див. : [ROS 2 Налаштування QoS для підписника](#ros-2-subscriber-qos-settings),
:::

Рядки нижче створюють виробника для теми uORB `SensorCombined`, яка може бути зіставлена з одним або кількома сумісними підписниками ROS 2 для теми ROS 2 `fmu/sensor_combined/out`.

```cpp
private:
    rclcpp::Subscription<px4_msgs::msg::SensorCombined>::SharedPtr subscription_;
};
```

Інстанціювання класу `SensorCombinedListener` як вузла ROS виконується у функції `main`.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting sensor_combined listener node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<SensorCombinedListener>());

    rclcpp::shutdown();
    return 0;
}
```

Цей конкретний приклад має пов'язаний файл запуску за посиланням [launch/sensor_combined_listener.launch.py](https://github.com/PX4/px4_ros_com/blob/main/launch/sensor_combined_listener.launch.py). Це дозволяє запускати його за допомогою команди [`ros2 launch`](#ros2-launch).

### ROS 2 Advertiser

Вузол відправника ROS 2 публікує дані в мережу DDS/RTPS (і, отже, в автопілот PX4).

Беручи як приклад `debug_vect_advertiser.cpp` під `px4_ros_com/src/advertisers`, спочатку ми імпортуємо необхідні заголовки, включаючи заголовок повідомлення `debug_vect`.

```cpp
#include <chrono>
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/debug_vect.hpp>

using namespace std::chrono_literals;
```

Потім код створює клас `DebugVectAdvertiser`, який успадковує загальний базовий клас `rclcpp::Node`.

```cpp
class DebugVectAdvertiser : public rclcpp::Node
{
```

Код нижче створює функцію для відправлення повідомлень. Повідомлення надсилаються на основі виклику за часом, який надсилає два повідомлення на секунду за таймером.

```cpp
public:
    DebugVectAdvertiser() : Node("debug_vect_advertiser") {
        publisher_ = this->create_publisher<px4_msgs::msg::DebugVect>("fmu/debug_vect/in", 10);
        auto timer_callback =
        [this]()->void {
            auto debug_vect = px4_msgs::msg::DebugVect();
            debug_vect.timestamp = std::chrono::time_point_cast<std::chrono::microseconds>(std::chrono::steady_clock::now()).time_since_epoch().count();
            std::string name = "test";
            std::copy(name.begin(), name.end(), debug_vect.name.begin());
            debug_vect.x = 1.0;
            debug_vect.y = 2.0;
            debug_vect.z = 3.0;
            RCLCPP_INFO(this->get_logger(), "\033[97m Publishing debug_vect: time: %llu x: %f y: %f z: %f \033[0m",
                                debug_vect.timestamp, debug_vect.x, debug_vect.y, debug_vect.z);
            this->publisher_->publish(debug_vect);
        };
        timer_ = this->create_wall_timer(500ms, timer_callback);
    }

private:
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<px4_msgs::msg::DebugVect>::SharedPtr publisher_;
};
```

Інстанціювання класу `DebugVectAdvertiser` як вузла ROS виконується у функції `main`.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting debug_vect advertiser node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DebugVectAdvertiser>());

    rclcpp::shutdown();
    return 0;
}
```

### Offboard Control

For a complete reference example on how to use Offboard control with PX4, see: [ROS 2 Offboard control example](../ros2/offboard_control.md).

## Використання апаратної плати керування польотом

ROS 2 з PX4, що працює на пульті керування польотом, майже те саме, що й працювати з PX4 на симуляторі. Єдине відмінність полягає в тому, що потрібно запустити як агента, так і клієнта, з параметрами, відповідними для каналу зв'язку.

Для отримання додаткової інформації дивіться [Початок uXRCE-DDS](../middleware/uxrce_dds.md#starting-agent-and-client).

## Користувацькі теми uORB

ROS 2 потребує мати ті _самі_ визначення повідомлень, які використовувалися для створення модуля клієнта uXRCE-DDS в прошивці PX4, щоб інтерпретувати повідомлення. Визначення зберігаються в пакеті інтерфейсу ROS 2 [PX4/px4_msgs](https://github.com/PX4/px4_msgs) і автоматично синхронізуються CI на гілках `main` та release. Зверніть увагу, що всі повідомлення з вихідного коду PX4 присутні в репозиторії, але лише ті, які перелічені в `dds_topics.yaml`, будуть доступні як теми ROS 2. Тому

- Якщо ви використовуєте основну або випускову версію PX4, ви можете отримати визначення повідомлень, клонуючи пакунок інтерфейсу [PX4/px4_msgs](https://github.com/PX4/px4_msgs) у вашу робочу область.
- Якщо ви створюєте або змінюєте повідомлення uORB, вам потрібно вручну оновити повідомлення у вашому робочому просторі з дерева джерела PX4. Загалом це означає, що ви мали б оновити [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), клонувати пакет інтерфейсу, а потім вручну синхронізувати його, копіюючи нові/змінені визначення повідомлень з [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) до його папок `msg`. Припускаючи, що PX4-Autopilot знаходиться у вашій домашній директорії `~`, тоді як `px4_msgs` знаходиться у `~/px4_ros_com/src/`, то команда може бути:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

  :::info Технічно, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) повністю визначає відношення між темами PX4 uORB та повідомленнями ROS 2. Для отримання додаткової інформації див. [uXRCE-DDS > DDS Topics YAML](../middleware/uxrce_dds.md#dds-topics-yaml).
:::

## Налаштування простору назв теми

Спеціальні простори імен тем можуть бути застосовані на етапі збірки (зміна [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)) або під час виконання (корисно для операцій з кількома транспортними засобами):

- Одним із варіантів є використання опції `-n` при запуску [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) з командного рядка. Ця техніка може бути використана як у симуляційних, так і в реальних транспортних засобах.
- Спеціальний простір імен може бути наданий для симуляцій (тільки) за допомогою встановлення змінної середовища `PX4_UXRCE_DDS_NS` перед запуском симуляції.


:::info Зміна простору імен під час виконання додасть потрібний простір імен як префікс до всіх полів `topic` в [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Отже, команди, подібні до:

```sh
uxrce_dds_client start -n uav_1
```

або

```sh
PX4_UXRCE_DDS_NS=uav_1 make px4_sitl gz_x500
```

згенерує теми під просторами імен:

```sh
/uav_1/fmu/in/  # for subscribers
/uav_1/fmu/out/ # for publishers
```
:::

## ros2 CLI

[ros2 CLI](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools.html) - це корисний інструмент для роботи з ROS. Ви можете використовувати його, наприклад, щоб швидко перевірити, чи публікуються теми, а також докладно їх перевірити, якщо у вас є `px4_msg` у робочому просторі. Команда також дозволяє вам запускати більш складні системи ROS за допомогою файлу запуску. Декілька можливостей демонструються нижче.

### ros2 topic list

Використовуйте `ros2 topic list`, щоб переглянути список тем, доступних для ROS 2:

```sh
ros2 topic list
```

Якщо PX4 підключений до агента, результатом буде список типів теми:

```
/fmu/in/obstacle_distance
/fmu/in/offboard_control_mode
/fmu/in/onboard_computer_status
...
```

Зверніть увагу, що робочому простору не потрібно будувати з `px4_msgs` для успішного виконання; інформація про тип теми є частиною навантаження повідомлення.

### ros2 topic echo

Використовуйте `ros2 topic echo`, щоб показати деталі певної теми.

На відміну від `ros2 topic list`, для цієї роботи вам потрібно знаходитися в робочому просторі, який побудував `px4_msgs` та джерело `local_setup.bash`, щоб ROS міг інтерпретувати повідомлення.

```sh
ros2 topic echo /fmu/out/vehicle_status
```

Команда виведе деталі теми під час оновлення.

```
---
timestamp: 1675931593364359
armed_time: 0
takeoff_time: 0
arming_state: 1
latest_arming_reason: 0
latest_disarming_reason: 0
nav_state_timestamp: 3296000
nav_state_user_intention: 4
nav_state: 4
failure_detector_status: 0
hil_state: 0
...
---
```

### ros2 topic hz

Ви можете отримати статистику про швидкість повідомлень, використовуючи `ros2 topic hz`. Наприклад, щоб отримати ставки для `SensorCombined`:

```
ros2 topic hz /fmu/out/sensor_combined
```

Вихід буде виглядати приблизно так:

```sh
average rate: 248.187
  min: 0.000s max: 0.012s std dev: 0.00147s window: 2724
average rate: 248.006
  min: 0.000s max: 0.012s std dev: 0.00147s window: 2972
average rate: 247.330
  min: 0.000s max: 0.012s std dev: 0.00148s window: 3212
average rate: 247.497
  min: 0.000s max: 0.012s std dev: 0.00149s window: 3464
average rate: 247.458
  min: 0.000s max: 0.012s std dev: 0.00149s window: 3712
average rate: 247.485
  min: 0.000s max: 0.012s std dev: 0.00148s window: 3960
```

### ros2 launch

Команда `ros2 launch` використовується для запуску файлу запуску ROS 2. Наприклад, вище ми використовували `ros2 launch px4_ros_com sensor_combined_listener.launch.py` для запуску прикладу слухача.

Вам не потрібно мати файл запуску, але вони дуже корисні, якщо у вас складна система ROS 2, яка потребує запуску кількох компонентів.

Для отримання інформації про файли запуску див. [Посібники ROS 2 >  Створення файлів запуску](https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Creating-Launch-Files.html)



## Відстеження проблем

### Відсутні залежності

Стандартна установка повинна включати всі необхідні інструменти для ROS 2.

Якщо щось відсутнє, його можна додати окремо:
- Інструменти збірки **`colcon`** повинні бути в інструментах розробки. Можна встановити за допомогою:
  ```sh
  sudo apt install python3-colcon-common-extensions
  ```
- Бібліотеку Eigen3, яку використовує бібліотека трансформацій, повинно бути в обох пакунків: desktop та base. Воно повинно бути встановлено, як показано:

   :::: tabs

   ::: tab humble
   ```sh
   sudo apt install ros-humble-eigen3-cmake-module
   ```

:::

   ::: tab foxy
   ```sh
   sudo apt install ros-foxy-eigen3-cmake-module
   ```

:::

   ::::


## Додаткова інформація

- [ROS 2 у PX4: Технічні деталі безперервного переходу до XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Пабло Гаррідо та Нуно Маркес (youtube)
- [Реалізації проміжного ПЗ DDS та ROS](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
