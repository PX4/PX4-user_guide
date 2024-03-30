# Надсилання довільних повідомлень з MAVROS до PX4

:::warning
Ця стаття була протестована на:
- **Ubuntu:** 20.04
- **ROS:** Noetic
- **PX4 Firmware:** v1.13

Однак, ці кроки досить загальні, і тому вони повинні працювати з іншими версіями та мінімальні зміни або не робити ніяких змін.
:::

<!-- Content reproduced with permission from @JoonmoAhn in https://github.com/JoonmoAhn/Sending-Custom-Message-from-MAVROS-to-PX4/issues/1 -->

## Встановлення MAVROS

Дотримуйтесь інструкцій *Source Installation* з [mavlink/mavros](https://github.com/mavlink/mavros/blob/master/mavros/README.md), щоб встановити "ROS Kinetic".

## MAVROS

1. Почнемо зі створення нового плагіна MAVROS, у цьому прикладі з назвою **keyboard_command.cpp** (у **workspace/src/mavros/mavros_extras/src/plugins**) за допомогою наведеного нижче коду:

   Код підписується на повідомлення типу 'char' з теми ROS `/mavros/keyboard_command/keyboard_sub` і надсилає його як повідомлення MAVLink.
   ```c
    #include <mavros/mavros_plugin.h>
    #include <pluginlib/class_list_macros.h>
    #include <iostream>
    #include <std_msgs/Char.h>

    namespace mavros {
    namespace extra_plugins{

    class KeyboardCommandPlugin : public plugin::PluginBase {
    public:
        KeyboardCommandPlugin() : PluginBase(),
            nh("~keyboard_command")

       { };

        void initialize(UAS &uas_)
        {
            PluginBase::initialize(uas_);
            keyboard_sub = nh.subscribe("keyboard_sub", 10, &KeyboardCommandPlugin::keyboard_cb, this);
        };

        Subscriptions get_subscriptions()
        {
            return {/* RX disabled */ };
        }

    private:
        ros::NodeHandle nh;
        ros::Subscriber keyboard_sub;

       void keyboard_cb(const std_msgs::Char::ConstPtr &req)
        {
            std::cout << "Got Char : " << req->data <<  std::endl;
            mavlink::common::msg::KEY_COMMAND kc {};
            kc.command = req->data;
            UAS_FCU(m_uas)->send_message_ignore_drop(kc);
        }
    };
    }   // namespace extra_plugins
    }   // namespace mavros

   PLUGINLIB_EXPORT_CLASS(mavros::extra_plugins::KeyboardCommandPlugin, mavros::plugin::PluginBase)
   ```

1. Відредагуйте **mavros_plugins.xml** (у **workspace/src/mavros/mavros_extras**) і додайте наступні рядки:
   ```xml
   <class name="keyboard_command" type="mavros::extra_plugins::KeyboardCommandPlugin" base_class_type="mavros::plugin::PluginBase">
        <description>Accepts keyboard command.</description>
   </class>
   ```

1. Відредагуйте **CMakeLists.txt** (у **workspace/src/mavros/mavros_extras**) і додайте наступний рядок у `add_library`.
   ```cmake
   add_library( 
   ...
     src/plugins/keyboard_command.cpp 
   )
   ```

1. Усередині **common.xml** у (**workspace/src/mavlink/message_definitions/v1.0**) скопіюйте наступні рядки, щоб додати ваше повідомлення MAVLink:
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

## Зміни PX4

1. Всередині **common.xml** (в **PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0**), додайте ваше повідомлення MAVLink наступним чином (та ж процедура, що і для розділу MAVROS вище):
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

:::warning
Переконайтеся, що файли **common.xml** у наступних каталогах абсолютно однакові:
   - `PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0`
   - `workspace/src/mavlink/message_definitions/v1.0` абсолютно однаковий.
:::

1. Створіть власний файл повідомлень uORB **key_command.msg** у (PX4-Autopilot/msg). У цьому прикладі файл "key_command.msg" містить лише код:
   ```
   uint64 timestamp # time since system start (microseconds)
   char cmd
   ```

   Потім до **CMakeLists.txt** (у **PX4-Autopilot/msg**) включить:

   ```cmake
   set(
   ...
        key_command.msg
        )
   ```

1. Змініть **mavlink_receiver.h** (в **PX4-Autopilot/src/modules/mavlink**)

   ```cpp
   ...
   #include <uORB/topics/key_command.h>
   ...
   class MavlinkReceiver
   {
   ...
   private:
       void handle_message_key_command(mavlink_message_t *msg);
   ...
       orb_advert_t _key_command_pub{nullptr};
   }
   ```

1. Змініть **mavlink_receiver.cpp** (у **PX4-Autopilot/src/modules/mavlink**). Саме тут PX4 отримує повідомлення MAVLink від ROS, і публікує його як тему uORB.
   ```cpp
   ...
   void MavlinkReceiver::handle_message(mavlink_message_t *msg)
   {
   ...
    case MAVLINK_MSG_ID_KEY_COMMAND:
           handle_message_key_command(msg);
           break;
   ...
   }
   ...
   void
   MavlinkReceiver::handle_message_key_command(mavlink_message_t *msg)
   {
       mavlink_key_command_t man;
       mavlink_msg_key_command_decode(msg, &man);

   struct key_command_s key = {};

       key.timestamp = hrt_absolute_time();
       key.cmd = man.command;

       if (_key_command_pub == nullptr) {
           _key_command_pub = orb_advertise(ORB_ID(key_command), &key);

       } else {
           orb_publish(ORB_ID(key_command), _key_command_pub, &key);
       }
   }
   ```

1. Створіть власну підписку на тему uORB так само, як і будь-який інший приклад модуля підписки. Для цього прикладу створимо модель у (/PX4-Autopilot/src/modules/key_receiver). У цьому каталозі створіть три файли **CMakeLists.txt**, **key_receiver.cpp**, **Kconfig** Кожен з них має наступний вигляд.

   -CMakeLists.txt

   ```cmake
   px4_add_module(
       MODULE modules__key_receiver
       MAIN key_receiver
       STACK_MAIN 2500
       STACK_MAX 4000
       SRCS
           key_receiver.cpp
       DEPENDS

       )
   ```

   -key_receiver.cpp

   ```
   #include <px4_platform_common/px4_config.h>
   #include <px4_platform_common/tasks.h>
   #include <px4_platform_common/posix.h>
   #include <unistd.h>
   #include <stdio.h>
   #include <poll.h>
   #include <string.h>
   #include <math.h>

   #include <uORB/uORB.h>
   #include <uORB/topics/key_command.h>

   extern "C" __EXPORT int key_receiver_main(int argc, char **argv);

   int key_receiver_main(int argc, char **argv)
   {
       int key_sub_fd = orb_subscribe(ORB_ID(key_command));
       orb_set_interval(key_sub_fd, 200); // limit the update rate to 200ms

       px4_pollfd_struct_t fds[] = {
           { .fd = key_sub_fd,   .events = POLLIN },
       };

       int error_counter = 0;

       for (int i = 0; i < 10; i++)
       {
           int poll_ret = px4_poll(fds, 1, 1000);

           if (poll_ret == 0)
           {
               PX4_ERR("Got no data within a second");
           }

           else if (poll_ret < 0)
           {
               if (error_counter < 10 || error_counter % 50 == 0)
               {
                   PX4_ERR("ERROR return value from poll(): %d", poll_ret);
               }

               error_counter++;
           }

           else
           {
               if (fds[0].revents & POLLIN)
               {
                   struct key_command_s input;
                   orb_copy(ORB_ID(key_command), key_sub_fd, &input);
                   PX4_INFO("Received Char : %c", input.cmd);
                }
           }
       }
       return 0;
   }
   ```

   -Kconfig

   ```
    menuconfig MODULES_KEY_RECEIVER
    bool "key_receiver"
    default n
    ---help---
        Enable support for key_receiver

   ```

   Для більш детального пояснення дивіться тему [Написання вашої першої програми](../modules/hello_sky.md).

1. Нарешті, додайте ваш модуль у файл **default.px4board**, що відповідає вашій платі у **PX4-Autopilot/boards/**. Наприклад: -для Pixhawk 4, додайте наступний код у **PX4-Autopilot/boards/px4/fmu-v5/default.px4board**: -для, додайте наступний код у **PX4-Autopilot/boards/px4/sitl/default.px4board**

   ```
    CONFIG_MODULES_KEY_RECEIVER=y
   ```

Тепер ви готові зібрати всю свою роботу!

## Збірка

### Збірка для ROS

1. У вашій робочому середовищі введіть: `catkin build`.
1. Попередньо ви маєте встановити свій "px4.launch" у (/workspace/src/mavros/mavros/launch). Відредагуйте "px4.launch" як нижче. Якщо ви використовуєте USB для підключення комп'ютера до Pixhawk, ви повинні встановити "fcu_url" як показано нижче. Проте, якщо ви використовуєте CP2102 для підключення комп'ютера до Pixhawk, вам необхідно замінити "ttyACM0" на "ttyUSB0". І якщо ви використовуєте SITL для підключення до свого терміналу, ви повинні замінити "/dev/ttyACM0:57600" на "udp://:14540@127.0.0.1:14557". Зміна "gcs_url" означає підключення Pixhawk через UDP, оскільки послідовний зв'язок не може одночасно приймати MAVROS і ваше з'єднання з оболонкою.

1. Введіть свою IP-адресу у вигляді "xxx.xx.xxx.xxx"
   ```xml
   ...
     <arg name="fcu_url" default="/dev/ttyACM0:57600" />
     <arg name="gcs_url" default="udp://:14550@xxx.xx.xxx.xxx:14557" />
   ...
   ```

### Збірка для PX4

1. Очистіть попередньо зібраний каталог PX4-Autopilot. У корені каталогу **PX4-Autopilot**:
    ```sh
    make clean
    ```

1. Зберіть PX4-Autopilot і завантажте [звичайним способом](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

    Наприклад:

    - щоб зібрати для Pixhawk 4/FMUv5, виконайте наступну команду у корені каталогу PX4-Autopilot:
    ```sh
    make px4_fmu-v5_default upload
    ```
    - для SITL потрібно виконати наступну команду в кореневому каталозі PX4-Autopilot (використовуючи jmavsim simulation):
    ```sh
    make px4_sitl jmavsim
    ```

## Запуск коду

Далі перевірте, чи надсилається повідомлення MAVROS на PX4.

### Запуск ROS

1. У терміналі введіть
   ```sh
   roslaunch mavros px4.launch
   ```
1. В другому терміналі запустить:
   ```sh
   rostopic pub -r 10 /mavros/keyboard_command/keyboard_sub std_msgs/Char 97
   ```
   Це означає, що потрібно опублікувати 97 ('a' в ASCII) у темі ROS "/mavros/keyboard_command/keyboard_sub" з типом повідомлення "std_msgs/Char". "-r 10" означає безперервну публікацію з частотою "10 Гц".

### Запуск PX4

1. Введіть оболонку Pixhawk через UDP. Замініть xxx.xx.xxx.xxx своїм IP.
   ```sh
   cd PX4-Autopilot/Tools
   ./mavlink_shell.py xxx.xx.xxx.xxx:14557 --baudrate 57600
   ```

1. Після декількох секунд натисніть **Enter** кілька разів. Ви маєте побачити запит в терміналі, як нижче:
   ```sh
   nsh>
   nsh>
   ```
   Введіть "key_receiver", щоб запустити модуль підписника.
   ```
   nsh> key_receiver
   ```

Перевірте, чи успішно він отримує `a` з вашої теми ROS.
