# MAVROS에서 PX4로 사용자 정의 메시지 전송

:::warning
이 문서는 다음 환경에서 테스트하였습니다.
- **Ubuntu:** 18.04
- **ROS:** Melodic
- **PX4 펌웨어:** 1.9.0

그러나 이러한 단계는 상당히 일반적이므로 수정이 거의 없이 다른 배포판/버전에서 작동합니다.
:::

<!-- Content reproduced with permission from @JoonmoAhn in https://github.com/JoonmoAhn/Sending-Custom-Message-from-MAVROS-to-PX4/issues/1 -->

## MAVROS 설치

[mavlink/mavros](https://github.com/mavlink/mavros/blob/master/mavros/README.md)의 *소스 설치* 지침에 따라 "ROS Kinetic"을 설치합니다.

## MAVROS

1. 아래 코드를 사용하여 이 예에서 **keyboard_command.cpp**(**workspace/src/mavros/mavros_extras/src/plugins**에 있음)라는 이름의 새 MAVROS 플러그인을 생성합니다.

   이 코드는 ROS 주제 `/mavros/keyboard_command/keyboard_sub`의 'char' 메시지를 구독하고 MAVLink 메시지로 전송합니다.
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

1. **mavros_plugins.xml**(**workspace/src/mavros/mavros_extras**)을 편집하고 다음 줄을 추가합니다.
   ```xml
   <class name="keyboard_command" type="mavros::extra_plugins::KeyboardCommandPlugin" base_class_type="mavros::plugin::PluginBase">
        <description>Accepts keyboard command.</description>
   </class>
   ```

1. **CMakeLists.txt**(**workspace/src/mavros/mavros_extras**)를 편집하고 `add_library`에 다음 줄을 추가합니다.
   ```cmake
   add_library( 
   ...
     src/plugins/keyboard_command.cpp 
   )
   ```

1. (**workspace/src/mavlink/message_definitions/v1.0**)의 **common.xml** 내부에서 다음 줄을 복사하여 MAVLink 메시지를 추가합니다.
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

## PX4 수정사항

1. **common.xml** 내부(**PX4-Autopilot/mavlink/include/mavlink/v2.0/message_definitions**)에서 다음과 같이 MAVLink 메시지를 추가합니다(MAVROS 섹션과 동일한 절차).
   ```xml
   ...
     <message id="229" name="KEY_COMMAND">
        <description>Keyboard char command.</description>
        <field type="char" name="command"> </field>
      </message>
   ...
   ```

1. (**PX4-Autopilot/mavlink/include/mavlink/v2.0**)에서 *공통*, *표준* 디렉토리를 제거합니다.
   ```sh
   rm -r common
   rm -r standard
   ```
1. Git은 "mavlink_generator"를 원하는 디렉토리에 복제하고 실행합니다.
   ```sh
   git clone https://github.com/mavlink/mavlink mavlink-generator
   cd mavlink-generator
   python mavgenerate.py
   ```

1. "MAVLink Generator" 팝업이 표시됩니다.
   - *XML*의 경우 **/PX4-Autopilot/mavlink/include/mavlink/v2.0/message_definitions/standard.xml**으로 "찾아보기"합니다.
   - Out의 경우 **/PX4-Autopilot/mavlink/include/mavlink/v2.0/**으로 "찾아보기"합니다.
   - **C** 언어를 선택합니다.
   - 프로토콜 **2.0**을 선택합니다.
   - *Validate*를 체크합니다.

   **Generate**를 누릅니다. **/PX4-Autopilot/mavlink/include/mavlink/v2.0/**에서 생성된 *공통* 및 *표준* 디렉토리를 볼 수 있습니다.

1. (PX4-Autopilot/msg)에서 자신만의 uORB 메시지 파일 **key_command.msg**를 만듭니다. 이 예에서 "key_command.msg"에는 다음 코드만 있습니다.
   ```
   char cmd
   ```
   그런 다음 **CMakeLists.txt**(**PX4-Autopilot/msg**)에 다음을 포함합니다.
   ```cmake
   set(
   ...
        key_command.msg
        )
   ```

1. **mavlink_receiver.h**를 편집합니다. (**PX4-Autopilot/src/modules/mavlink**)

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

1. **mavlink_receiver.cpp**를 수정합니다(**PX4-Autopilot/src/modules/mavlink**). 여기에서 PX4는 ROS에서 보낸 MAVLink 메시지를 수신하고, 이를 uORB 주제로 게시합니다.
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

1. 예제 구독자 모듈처럼 자신만의 uORB 주제 구독자를 생성합니다. 이 예에서는 (/PX4-Autopilot/src/modules/key_receiver)에서 모델을 생성할 수 있습니다. 이 디렉토리에서 두 개의 파일 **CMakeLists.txt**, **key_receiver.cpp**를 생성합니다. 각각은 다음과 같습니다.

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

   자세한 설명은 [첫 번째 지원서 작성](../modules/hello_sky.md) 항목을 참고하십시오.

1. 마지막으로 **PX4-Autopilot/boards/**의 보드에 해당하는 **default.cmake** 파일에 모듈을 추가합니다. 예를 들어, Pixhawk 4의 경우에는 **PX4-Autopilot/boards/px4/fmu-v5/default.cmake**에 다음 코드를 추가합니다.
    ```

MODULES
        ...

key_receiver
        ... In your workspace enter: `catkin build`.
1. Beforehand, you have to set your "px4.launch" in (/workspace/src/mavros/mavros/launch). 
   Edit "px4.launch" as below.
   If you are using USB to connect your computer with Pixhawk, you have to set "fcu_url" as shown below.
   But, if you are using CP2102 to connect your computer with Pixhawk, you have to replace "ttyACM0" with "ttyUSB0".
   Modifying "gcs_url" is to connect your Pixhawk with UDP, because serial communication cannot accept MAVROS, and your nutshell connection simultaneously.

1. Write your IP address at "xxx.xx.xxx.xxx"
   ```xml
   ...
     <arg name="fcu_url" default="/dev/ttyACM0:57600" />
     <arg name="gcs_url" default="udp://:14550@xxx.xx.xxx.xxx:14557" />
   ...
   ```

### ROS 빌드

1. Build PX4-Autopilot and upload [in the normal way](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

    For example, to build for Pixhawk 4/FMUv5 execute the following command in the root of the PX4-Autopilot directory:
    ```sh
    make px4_fmu-v5_default upload
    ```

## 빌드

이제 작업을 빌드할 준비가 되었습니다!

### PX4 빌드

1. In a terminal enter
   ```sh
   roslaunch mavros px4.launch
   ```
1. In a second terminal run:
   ```sh
   rostopic pub -r 10 /mavros/keyboard_command/keyboard_sub std_msgs/Char 97
   ```
   This means, publish 97 ('a' in ASCII) to ROS topic "/mavros/keyboard_command/keyboard_sub" in message type "std_msgs/Char". "-r 10" means to publish continuously in "10Hz".

### ROS 실행

1. Enter the Pixhawk nutshell through UDP. Replace xxx.xx.xxx.xxx with your IP.
   ```sh
   roslaunch mavros px4.launch
   ```

1. After few seconds, press **Enter** a couple of times. You should see a prompt in the terminal as below:
   ```sh
   rostopic pub -r 10 /mavros/keyboard_command/keyboard_sub std_msgs/Char 97
   ```
   Type "key_receiver", to run your subscriber module.
   ```
   nsh> key_receiver
   ```

MAVROS 메시지가 PX4로 전송되는 지 테스트합니다.
