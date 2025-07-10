---
canonicalUrl: https://docs.px4.io/main/zh/ros/mavros_custom_messages
---

# 将自定义消息从 MOVROS 发送到 PX4

按照 *Source Installation* 中的指导，从 [mavlink/mavros](https://github.com/mavlink/mavros/blob/master/mavros/README.md) 安装“ROS Kinetic”版本。
- **Ubuntu：**18.04
- **ROS：**Melodic
- **PX4 Firmware:** 1.9.0

However these steps are fairly general and so it should work with other distros/versions with little to no modifications.
:::

<!-- Content reproduced with permission from @JoonmoAhn in https://github.com/JoonmoAhn/Sending-Custom-Message-from-MAVROS-to-PX4/issues/1 -->

## MAVROS 安装

Follow *Source Installation* instructions from [mavlink/mavros](https://github.com/mavlink/mavros/blob/master/mavros/README.md) to install "ROS Kinetic".

## MAVROS

1. 首先，我们创建一个新的MAVROS 插件，在**keyboard_command.cpp**(**workspace/src/mavros/mavros_extras/src/plugins**)示例中添加以下代码：

   代码功能是从ROS消息主题`/mavros/keyboard_command/keyboard_sub`中订阅了一个字符消息，并且将其作为MAVLink 消息发送出去。
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
            UAS_FCU(m_uas)->send_message_ignore_drop(req->data);
        }
    };
    }   // namespace extra_plugins
    }   // namespace mavros

   PLUGINLIB_EXPORT_CLASS(mavros::extra_plugins::KeyboardCommandPlugin, mavros::plugin::PluginBase)
   ```

1. Edit **mavros_plugins.xml** (in **workspace/src/mavros/mavros_extras**) and add the following lines:
   ```xml
   <class name="keyboard_command" type="mavros::extra_plugins::KeyboardCommandPlugin" base_class_type="mavros::plugin::PluginBase">
        <description>Accepts keyboard command.</description>
   </class>
   ```

1. Edit **CMakeLists.txt** (in **workspace/src/mavros/mavros_extras**) and add the following line in `add_library`.
   ```cmake
   add_library( 
   ...
     src/plugins/keyboard_command.cpp 
   )
   ```

1. Inside **common.xml** in (**workspace/src/mavlink/message_definitions/v1.0**), copy the following lines to add your MAVLink message:
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

## PX4 修改

1. Inside **common.xml** (in **PX4-Autopilot/mavlink/include/mavlink/v2.0/message_definitions**), add your MAVLink message as following (same procedure as for MAVROS section above):
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

1. Remove *common*, *standard* directories in (**PX4-Autopilot/mavlink/include/mavlink/v2.0**).
   ```sh
   rm -r common
   rm -r standard
   ```
1. git 克隆"mavlink_generator"到你想要的文件夹下并执行。
   ```sh
   git clone https://github.com/mavlink/mavlink mavlink-generator
   cd mavlink-generator
   python mavgenerate.py
   ```

1. 你会看到一个“MAVLink Generator”应用程序窗口：
   - For *XML*, "Browse" to **/PX4-Autopilot/mavlink/include/mavlink/v2.0/message_definitions/standard.xml**.
   - For Out, "Browse" to **/PX4-Autopilot/mavlink/include/mavlink/v2.0/**.
   - Select Language **C**
   - Select Protocol **2.0**
   - Check *Validate*

   Then, press **Generate**. You will see *common*, and *standard* directories created in **/PX4-Autopilot/mavlink/include/mavlink/v2.0/**.

1. Make your own uORB message file **key_command.msg** in (PX4-Autopilot/msg). 示例中的“key_command.msg”文件只包含以下代码：
   ```
   char cmd
   ```
   Then, in **CMakeLists.txt** (in **PX4-Autopilot/msg**), include
   ```cmake
   set(
   ...
        key_command.msg
        )
   ```

1. Edit **mavlink_receiver.h** (in **PX4-Autopilot/src/modules/mavlink**)

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

1. Edit **mavlink_receiver.cpp** (in **PX4-Autopilot/src/modules/mavlink**). 这是 PX4 接收 ROS 发送过来的 MAVLink 消息的地方，并且将消息作为 uORB 主题发布。
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

1. 像其他示例一样订阅你自己的uORB主题。 For this example lets create the model in (/PX4-Autopilot/src/modules/key_receiver). In this directory, create two files **CMakeLists.txt**, **key_receiver.cpp**. 两个文件如下所示。

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
           platforms__common

       )
   ```

   -key_receiver.cpp

   ```
   #include <px4_config.h>
   #include <px4_tasks.h>
   #include <px4_posix.h>
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

       px4_pollfd_struct_t fds[1];
       fds[0].fd = key_sub_fd, fds[0].events = POLLIN;

       int error_counter = 0;

       while(true)
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
                   PX4_INFO("Recieved Char : %c", input.cmd);
                }
           }
       }
       return 0;
   }
   ```

   For a more detailed explanation see the topic [Writing your first application](../modules/hello_sky.md).

1. Lastly add your module in the **default.cmake** file correspondent to your board in **PX4-Autopilot/boards/**. For example for the Pixhawk 4 add the following code in **PX4-Autopilot/boards/px4/fmu-v5/default.cmake**:
   ```cmake
    MODULES
        ...
        key_receiver
        ...
    ```

测试是否从你的 ROS 话题中接收到 `a` 字符。

## 构建

### Build for ROS

1. In your workspace enter: `catkin build`.
1. 在此之前，你必须设置你的“px4.launch”（/workspace/src/mavros/mavros/launch）文件。 编辑“px4.launch”文件如下： 如果你使用USB来连接你的电脑和Pixhawk，你必须设置“fcu_url”如下所示。 但是，如果你使用CP2102来连接你的电脑和Pixhawk，你必须将“ttyACM0” 替换为"ttyUSB0"。 修改“gcs_url”是为了连接你的 Pixhawk 和 UDP，因为串口通信不能同时接收 MAVROS 和 nutshell。

1. Write your IP address at "xxx.xx.xxx.xxx"
   ```xml
   ...
     <arg name="fcu_url" default="/dev/ttyACM0:57600" />
     <arg name="gcs_url" default="udp://:14550@xxx.xx.xxx.xxx:14557" />
   ...
   ```

### PX4 编译

1. Build PX4-Autopilot and upload [in the normal way](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

    For example, to build for Pixhawk 4/FMUv5 execute the following command in the root of the PX4-Autopilot directory:
    ```sh
    make px4_fmu-v5_default upload
    ```

## Running the Code

Next test if the MAVROS message is sent to PX4.

### Running ROS

1. In a terminal enter
   ```sh
   roslaunch mavros px4.launch
   ```
1. 在第二个终端中运行：
   ```sh
   rostopic pub -r 10 /mavros/keyboard_command/keyboard_sub std_msgs/Char 97
   ```
   这意味着以“std_msgs/Char”消息类型发布97（ASCII码的‘a'）到ROS主题“/mavros/keyboard_command/keyboard_sub” “-r 10”意味着以“10Hz”频率持续发布。

### PX4 运行

1. 通过UDP进入Pixhawk 的 nutshell。 用你的IP地址替换xxx.xx.xxx.xxx
   ```sh
   cd PX4-Autopilot/Tools
   ./mavlink_shell.py xxx.xx.xxx.xxx:14557 --baudrate 57600
   ```

1. After few seconds, press **Enter** a couple of times. 你会看到终端中以下提示：
   ```sh
   nsh>
   nsh>
   ```
   输入“key_receiver”命令来运行你的订阅模块。
   ```
   nsh> key_receiver
   ```

Check if it successfully receives `a` from your ROS topic.
