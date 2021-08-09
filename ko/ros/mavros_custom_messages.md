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
   ```cmake
    MODULES
        ...
        key_receiver
        ...
    ```

이제 작업을 빌드할 준비가 되었습니다!

## 빌드

### ROS 빌드

1. 작업 공간에서 `catkin build`를 입력합니다.
1. 미리 "px4.launch"를 (/workspace/src/mavros/mavros/launch)에 설정합니다. 아래와 같이 "px4.launch"를 편집합니다. USB를 사용하여 Pixhawk와 컴퓨터를 연결하는 경우에는, 아래와 같이 "fcu_url"을 설정합니다. 그러나, CP2102를 사용하여 컴퓨터를 Pixhawk와 연결하는 경우 "ttyACM0"을 "ttyUSB0"로 변경합니다. "gcs_url"을 수정하는 것은 Pixhawk를 UDP와 연결하는 것입니다. 직렬 통신은 MAVROS와 간단한 연결을 동시에 수락할 수 없기 때문입니다.

1. "xxx.xx.xxx.xxx"에 IP 주소를 입력합니다.
   ```xml
   ...
     <arg name="fcu_url" default="/dev/ttyACM0:57600" />
     <arg name="gcs_url" default="udp://:14550@xxx.xx.xxx.xxx:14557" />
   ...
   ```

### PX4 빌드

1. PX4-Autopilot을 빌드하고 [일반적인 방식으로](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards) 업로드합니다.

    예를 들어, Pixhawk 4/FMUv5용으로 빌드하려면, PX4-Autopilot 디렉토리의 루트에서 다음 명령어를 실행하십시오.
    ```sh
    make px4_fmu-v5_default upload
    ```

## 코드 실행

MAVROS 메시지가 PX4로 전송되는 지 테스트합니다.

### ROS 실행

1. 터미널에서 입력합니다.
   ```sh
   roslaunch mavros px4.launch
   ```
1. 두 번째 터미널 실행합니다.
   ```sh
   rostopic pub -r 10 /mavros/keyboard_command/keyboard_sub std_msgs/Char 97
   ```
   즉, 메시지 유형 "std_msgs/Char"의 ROS 주제 "/mavros/keyboard_command/keyboard_sub"에 97(ASCII의 'a')을 게시합니다. "-r 10"은 "10Hz"로 지속적으로 발행한다는 의미입니다.

### PX4 실행

1. UDP를 통해 Pixhawk nutshell을 오픈합니다. xxx.xx.xxx.xxx를 해당 컴퓨터의 IP로 변경합니다.
   ```sh
   cd PX4-Autopilot/Tools
   ./mavlink_shell.py xxx.xx.xxx.xxx:14557 --baudrate 57600
   ```

1. 몇 초 후에, **Enter** 키를 두 번 입력합니다. 아래와 같이 터미널에서 프롬프트가 나타납니다.
   ```sh
   nsh>
   nsh>
   ```
   "key_receiver"를 입력하여 subscriber 모듈을 실행합니다.
   ```
   nsh> key_receiver
   ```

ROS 토픽으로 부터 `a`를 올바르게 수신하는 지 확인합니다.
