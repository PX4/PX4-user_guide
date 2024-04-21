# ROS 2 Посібник користувача

Архітектура ROS 2-PX4 забезпечує глибоку інтеграцію між ROS 2 і PX4, дозволяючи підписникам ROS 2 або вузлам видавців безпосередньо взаємодіяти з темами uORB PX4.

Ця тема містить огляд архітектури та пайплайну додатків, а також пояснює, як налаштувати та використовувати ROS 2 з PX4.

::: info From PX4 v1.14, ROS 2 uses [uXRCE-DDS](../middleware/uxrce_dds.md) middleware, replacing the _FastRTPS_ middleware that was used in version 1.13 (v1.13 does not support uXRCE-DDS).

У [посібнику з міграції](../middleware/uxrce_dds.md#fast-rtps-to-uxrce-dds-migration-guidelines) пояснюється, що потрібно зробити, щоб перенести програми ROS 2 з PX4 v1.13 на PX4 v1.14.

Якщо ви досі працюєте на PX4 v1.13, дотримуйтесь інструкцій в [PX4 v1.13 Docs](https://docs.px4.io/v1.13/en/ros/ros2_comm.html).
<!-- remove this when there are PX4 v1.14 docs for some months -->
:::

## Загальний огляд

Пайплайн додатків для ROS 2 дуже простий завдяки використанню комунікаційного проміжного програмного забезпечення [uXRCE-DDS](../middleware/uxrce_dds.md).

![Architecture uXRCE-DDS with ROS 2](../../assets/middleware/xrce_dds/architecture_xrce-dds_ros2.svg)

<!-- doc source: https://docs.google.com/drawings/d/1WcJOU-EcVOZRPQwNzMEKJecShii2G4U3yhA3U6C4EhE/edit?usp=sharing -->

Проміжне програмне забезпечення uXRCE-DDS складається з клієнта, що працює на PX4, і агента, що працює на комп'ютері-компаньйоні, з двостороннім обміном даними між ними по послідовному, UDP, TCP або користувацькому каналу зв'язку. The agent acts as a proxy for the client to publish and subscribe to topics in the global DDS data space.

The PX4 [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) is generated at build time and included in PX4 firmware by default. It includes both the "generic" micro XRCE-DDS client code, and PX4-specific translation code that it uses to publish to/from uORB topics. The subset of uORB messages that are generated into the client are listed in [PX4-Autopilot/src/modules/uxrce_dds_client/dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). The generator uses the uORB message definitions in the source tree: [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) to create the code for sending ROS 2 messages.

ROS 2 applications need to be built in a workspace that has the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware. You can include these by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your ROS 2 workspace (branches in the repo correspond to the messages for different PX4 releases).

Note that the micro XRCE-DDS _agent_ itself has no dependency on client-side code. It can be built from [source](https://github.com/eProsima/Micro-XRCE-DDS-Agent) either standalone or as part of a ROS build, or installed as a snap.

You will normally need to start both the client and agent when using ROS 2. Note that the uXRCE-DDS client is built into firmware by default but not started automatically except for simulator builds.

::: info In PX4v1.13 and earlier, ROS 2 was dependent on definitions in [px4_ros_com](https://github.com/PX4/px4_ros_com). This repo is no longer needed, but does contain useful examples.
:::


## Встановлення та налаштування

The supported ROS 2 platforms for PX4 development are ROS 2 "Humble" on Ubuntu 22.04, and ROS 2 "Foxy" on Ubuntu 20.04.

ROS 2 "Humble" is recommended because it is the current ROS 2 LTS distribution. ROS 2 "Foxy" reached end-of-life in May 2023, but is still stable and works with PX4.

::: info PX4 is not as well tested on Ubuntu 22.04 as it is on Ubuntu 20.04 (at time of writing), and Ubuntu 20.04 is needed if you want to use [Gazebo Classic](../sim_gazebo_classic/index.md).
:::

Для налаштування ROS 2 для використання з PX4:

- [Встановити PX4](#install-px4) (для використання симулятора PX4)
- [Встановіть ROS 2](#install-ros-2)
- [Setup Micro XRCE-DDS Agent & Client](#setup-micro-xrce-dds-agent-client)
- [Build & Run ROS 2 Workspace](#build-ros-2-workspace)

Other dependencies of the architecture that are installed automatically, such as _Fast DDS_, are not covered.


### Встановлення PX4

You need to install the PX4 development toolchain in order to use the simulator.

::: info The only dependency ROS 2 has on PX4 is the set of message definitions, which it gets from [px4_msgs](https://github.com/PX4/px4_msgs). You only need to install PX4 if you need the simulator (as we do in this guide), or if you are creating a build that publishes custom uORB topics.
:::

Налаштуйте середовище розробки PX4 на Ubuntu звичайним шляхом:

```sh
cd
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
cd PX4-Autopilot/
make px4_sitl
```

Note that the above commands will install the recommended simulator for your version of Ubuntu. If you want to install PX4 but keep your existing simulator installation, run `ubuntu.sh` above with the `--no-sim-tools` flag.

For more information and troubleshooting see: [Ubuntu Development Environment](../dev_setup/dev_env_linux_ubuntu.md) and [Download PX4 source](../dev_setup/building_px4.md).

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

   The instructions above are reproduced from the official installation guide: [Install ROS 2 Humble](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html). You can install _either_ the desktop (`ros-humble-desktop`) _or_ bare-bones versions (`ros-humble-ros-base`), *and* the development tools (`ros-dev-tools`).
:::


   ::: tab foxy To install ROS 2 "Foxy" on Ubuntu 20.04:

   -  Follow the official installation guide: [Install ROS 2 Foxy](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Install-Debians/).

   You can install _either_ the desktop (`ros-foxy-desktop`) _or_ bare-bones versions (`ros-foxy-ros-base`), *and* the development tools (`ros-dev-tools`).
:::

   ::::

1. Деякі Python залежності також мають бути встановленні (використовуючи **`pip`** або **`apt`**):

   ```sh
   pip install --user -U empy==3.3.4 pyros-genmsg setuptools
   ```



### Setup Micro XRCE-DDS Agent & Client

For ROS 2 to communicate with PX4, [uXRCE-DDS client](../modules/modules_system.md#uxrce-dds-client) must be running on PX4, connected to a micro XRCE-DDS agent running on the companion computer.

#### Setup the Agent

The agent can be installed onto the companion computer in a [number of ways](../middleware/uxrce_dds.md#micro-xrce-dds-agent-installation). Below we show how to build the agent "standalone" from source and connect to a client running on the PX4 simulator.

To setup and start the agent:

1. Відкрийте термінал.
1. Enter the following commands to fetch and build the agent from source:

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

1. Start the agent with settings for connecting to the uXRCE-DDS client running on the simulator:

   ```sh
   MicroXRCEAgent udp4 -p 8888
   ```

The agent is now running, but you won't see much until we start PX4 (in the next step).

::: info
You can leave the agent running in this terminal!
Note that only one agent is allowed per connection channel.
:::

#### Start the Client

The PX4 simulator starts the uXRCE-DDS client automatically, connecting to UDP port 8888 on the local host.

To start the simulator (and client):

1. Open a new terminal in the root of the **PX4 Autopilot** repo that was installed above.

   :::: tabs

   ::: tab humble
   - Start a PX4 [Gazebo](../sim_gazebo_gz/index.md) simulation using:

     ```sh
     make px4_sitl gz_x500
     ```

:::

   ::: tab foxy
   - Start a PX4 [Gazebo Classic](../sim_gazebo_classic/index.md) simulation using:

     ```sh
     make px4_sitl gazebo-classic
     ```

:::

   ::::

The agent and client are now running they should connect.

The PX4 terminal displays the [NuttShell/PX4 System Console](../debug/system_console.md) output as PX4 boots and runs. As soon as the agent connects the output should include `INFO` messages showing creation of data writers:

```
...
INFO  [uxrce_dds_client] synchronized with time offset 1675929429203524us
INFO  [uxrce_dds_client] successfully created rt/fmu/out/failsafe_flags data writer, topic id: 83
INFO  [uxrce_dds_client] successfully created rt/fmu/out/sensor_combined data writer, topic id: 168
INFO  [uxrce_dds_client] successfully created rt/fmu/out/timesync_status data writer, topic id: 188
...
```

The micro XRCE-DDS agent terminal should also start to show output, as equivalent topics are created in the DDS network:

```
...
[1675929445.268957] info     | ProxyClient.cpp    | create_publisher         | publisher created      | client_key: 0x00000001, publisher_id: 0x0DA(3), participant_id: 0x001(1)
[1675929445.269521] info     | ProxyClient.cpp    | create_datawriter        | datawriter created     | client_key: 0x00000001, datawriter_id: 0x0DA(5), publisher_id: 0x0DA(3)
[1675929445.270412] info     | ProxyClient.cpp    | create_topic             | topic created          | client_key: 0x00000001, topic_id: 0x0DF(2), participant_id: 0x001(1)
...
```

### Build ROS 2 Workspace

This section shows how create a ROS 2 workspace hosted in your home directory (modify the commands as needed to put the source code elsewhere).

The [px4_ros_com](https://github.com/PX4/px4_ros_com) and [px4_msgs](https://github.com/PX4/px4_msgs) packages are cloned to a workspace folder, and then the `colcon` tool is used to build the workspace. The example is run using `ros2 launch`.

::: info The example builds the [ROS 2 Listener](#ros-2-listener) example application, located in [px4_ros_com](https://github.com/PX4/px4_ros_com). [px4_msgs](https://github.com/PX4/px4_msgs) is needed too so that the example can interpret PX4 ROS 2 topics.
:::


#### Створення робочого простору

Створити та побудувати робочий простір:

1. Відкрийте новий термінал.
1. Створіть новий каталог робочого простору та перейдіть до нього за допомогою:

   ```sh
   mkdir -p ~/ws_sensor_combined/src/
   cd ~/ws_sensor_combined/src/
   ```

   ::: info
A naming convention for workspace folders can make it easier to manage workspaces.
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

To run the executables that you just built, you need to source `local_setup.bash`. This provides access to the "environment hooks" for the current workspace. In other words, it makes the executables that were just built available in the current terminal.

::: info The [ROS2 beginner tutorials](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay) recommend that you _open a new terminal_ for running your executables.
:::

В новому терміналі:

1. Navigate into the top level of your workspace directory and source the ROS 2 environment (in this case "Humble"):

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

1. Source the `local_setup.bash`.

   ```sh
   source install/local_setup.bash
   ```
1. Тепер запустіть приклад. Note here that we use `ros2 launch`, which is described below.

   ```
   ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```

If this is working you should see data being printed on the terminal/console where you launched the ROS listener:

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

## Controlling a Vehicle

To control applications, ROS 2 applications:

- subscribe to (listen to) telemetry topics published by PX4
- publish to topics that cause PX4 to perform some action.

The topics that you can use are defined in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), and you can get more information about their data in the [uORB Message Reference](../msg_docs/index.md). For example, [VehicleGlobalPosition](../msg_docs/VehicleGlobalPosition.md) can be used to get the vehicle global position, while [VehicleCommand](../msg_docs/VehicleCommand.md) can be used to command actions such as takeoff and land.

The [ROS 2 Example applications](#ros-2-example-applications) examples below provide concrete examples of how to use these topics.

## Compatibility Issues

This section contains information that may affect how you write your ROS code.

### ROS 2 Subscriber QoS Settings

ROS 2 code that subscribes to topics published by PX4 _must_ specify a appropriate (compatible) QoS setting in order to listen to topics. Specifically, nodes should subscribe using the ROS 2 predefined QoS sensor data (from the [listener example source code](#ros-2-listener)):

```cpp
...
rmw_qos_profile_t qos_profile = rmw_qos_profile_sensor_data;
auto qos = rclcpp::QoS(rclcpp::QoSInitialization(qos_profile.history, 5), qos_profile);

subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>("/fmu/out/sensor_combined", qos,
...
```

This is needed because the ROS 2 default [Quality of Service (QoS) settings](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-profiles) are different from the settings used by PX4. Not all combinations of publisher-subscriber [Qos settings are possible](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html#qos-compatibilities), and it turns out that the default ROS 2 settings for subscribing are not! Note that ROS code does not have to set QoS settings when publishing (the PX4 settings are compatible with ROS defaults in this case).

<!-- From https://github.com/PX4/PX4-user_guide/pull/2259#discussion_r1099788316 -->


### ROS 2 & PX4 Frame Conventions

The local/world and body frames used by ROS and PX4 are different.

| Frame | PX4                                              | ROS                                            |
| ----- | ------------------------------------------------ | ---------------------------------------------- |
| Body  | FRD (X **F**orward, Y **R**ight, Z **D**own)     | FLU (X **F**orward, Y **L**eft, Z **U**p)      |
| World | FRD or NED (X **N**orth, Y **E**ast, Z **D**own) | FLU or ENU (X **E**ast, Y **N**orth, Z **U**p) |

:::tip
See [REP105: Coordinate Frames for Mobile Platforms](http://www.ros.org/reps/rep-0105.html) for more information about ROS frames.
:::

Both frames are shown in the image below (FRD on the left/FLU on the right).

![Reference frames](../../assets/lpe/ref_frames.png)

The FRD (NED) conventions are adopted on **all** PX4 topics unless explicitly specified in the associated message definition. Therefore, ROS 2 nodes that want to interface with PX4 must take care of the frames conventions.

- To rotate a vector from ENU to NED two basic rotations must be performed:

  - first a pi/2 rotation around the `Z`-axis (up),
  - then a pi rotation around the `X`-axis (old East/new North).
- To rotate a vector from NED to ENU two basic rotations must be performed:
-
  - first a pi/2 rotation around the `Z`-axis (down),
  - then a pi rotation around the `X`-axis (old North/new East). Note that the two resulting operations are mathematically equivalent.
- To rotate a vector from FLU to FRD a pi rotation around the `X`-axis (front) is sufficient.
- To rotate a vector from FRD to FLU a pi rotation around the `X`-axis (front) is sufficient.

Examples of vectors that require rotation are:

- all fields in [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) message; ENU to NED conversion is required before sending them.
- all fields in [VehicleThrustSetpoint](../msg_docs/VehicleThrustSetpoint.md) message; FLU to FRD conversion is required before sending them.

Similarly to vectors, also quanternions representing the attitude of the vehicle (body frame) w.r.t. the world frame require conversion.

[PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) provides the shared library [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/include/px4_ros_com/frame_transforms.h) to easily perform such conversions.

### ROS, Gazebo and PX4 time synchronization

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

This particular example has an associated launch file at [launch/sensor_combined_listener.launch.py](https://github.com/PX4/px4_ros_com/blob/main/launch/sensor_combined_listener.launch.py). This allows it to be launched using the [`ros2 launch`](#ros2-launch) command.

### ROS 2 Advertiser

Вузол рекламодавця ROS 2 публікує дані в мережу DDS/RTPS (і, отже, до автопілота PX4).

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

The instantiation of the `DebugVectAdvertiser` class as a ROS node is done on the `main` function.

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

For a complete reference example on how to use Offboard control with PX4, see: [ROS 2 Offboard control example](../ros/ros2_offboard_control.md).

## Using Flight Controller Hardware

ROS 2 with PX4 running on a flight controller is almost the same as working with PX4 on the simulator. The only difference is that you need to start both the agent _and the client_, with settings appropriate for the communication channel.

For more information see [Starting uXRCE-DDS](../middleware/uxrce_dds.md#starting-agent-and-client).

## Custom uORB Topics

ROS 2 needs to have the _same_ message definitions that were used to create the uXRCE-DDS client module in the PX4 Firmware in order to interpret the messages. The definition are stored in the ROS 2 interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) and they are automatically synchronized by CI on the `main` and release branches. Note that all the messages from PX4 source code are present in the repository, but only those listed in `dds_topics.yaml` will be available as ROS 2 topics. Therefore,

- If you're using a main or release version of PX4 you can get the message definitions by cloning the interface package [PX4/px4_msgs](https://github.com/PX4/px4_msgs) into your workspace.
- If you're creating or modifying uORB messages you must manually update the messages in your workspace from your PX4 source tree. Generally this means that you would update [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml), clone the interface package, and then manually synchronize it by copying the new/modified message definitions from [PX4-Autopilot/msg](https://github.com/PX4/PX4-Autopilot/tree/main/msg) to its `msg` folders. Assuming that PX4-Autopilot is in your home directory `~`, while `px4_msgs` is in `~/px4_ros_com/src/`, then the command might be:

  ```sh
  rm ~/px4_ros_com/src/px4_msgs/msg/*.msg
  cp ~/PX4-Autopilot/mgs/*.msg ~/px4_ros_com/src/px4_msgs/msg/
  ```

  ::: info Technically, [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml) completely defines the relationship between PX4 uORB topics and ROS 2 messages. For more information see [uXRCE-DDS > DDS Topics YAML](../middleware/uxrce_dds.md#dds-topics-yaml).
:::

## Customizing the Topic Namespace

Custom topic namespaces can be applied at build time (changing [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)) or at runtime (useful for multi vehicle operations):

- One possibility is to use the `-n` option when starting the [uxrce_dds_client](../modules/modules_system.md#uxrce-dds-client) from command line. This technique can be used both in simulation and real vehicles.
- A custom namespace can be provided for simulations (only) by setting the environment variable `PX4_UXRCE_DDS_NS` before starting the simulation.


::: info Changing the namespace at runtime will append the desired namespace as a prefix to all `topic` fields in [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml). Therefore, commands like:

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

### Missing dependencies

The standard installation should include all the tools needed by ROS 2.

If any are missing, they can be added separately:
- **`colcon`** build tools should be in the development tools. It can be installed using:
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

- [ROS 2 in PX4: Technical Details of a Seamless Transition to XRCE-DDS](https://www.youtube.com/watch?v=F5oelooT67E) - Pablo Garrido & Nuno Marques (youtube)
- [DDS and ROS middleware implementations](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
