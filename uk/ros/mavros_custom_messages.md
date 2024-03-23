# Sending a Custom Message from MAVROS to PX4

:::warning
This article has been tested against:
-
-
- **PX4 Firmware:** v1.13

However these steps are fairly general and so it should work with other distros/versions with little to no modifications.
:::

<!-- Content reproduced with permission from @JoonmoAhn in https://github.com/JoonmoAhn/Sending-Custom-Message-from-MAVROS-to-PX4/issues/1 -->

## MAVROS Installation

Follow *Source Installation* instructions from [mavlink/mavros](https://github.com/mavlink/mavros/blob/master/mavros/README.md) to install "ROS Kinetic".

## MAVROS

1. We start by creating a new MAVROS plugin, in this example named **keyboard_command.cpp** (in **workspace/src/mavros/mavros_extras/src/plugins**) by using the code below:

   The code subscribes a 'char' message from ROS topic `/mavros/keyboard_command/keyboard_sub` and sends it as a MAVLink message.
   ```c
    
   ```

1. Edit **mavros_plugins.xml** (in **workspace/src/mavros/mavros_extras**) and add the following lines:
   ```xml
   
   ```

1. Edit **CMakeLists.txt** (in **workspace/src/mavros/mavros_extras**) and add the following line in `add_library`.
   ```cmake
   
     
   ```

1. Inside **common.xml** in (**workspace/src/mavlink/message_definitions/v1.0**), copy the following lines to add your MAVLink message:
   ```xml
   ...
     
   ```

## PX4 Changes

1. Inside **common.xml** (in **PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0**), add your MAVLink message as following (same procedure as for MAVROS section above):
   ```xml
   ...
     
   ```

:::warning
Make sure that the **common.xml** files in the following directories are exactly the same:
   - `PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0`
   - `workspace/src/mavlink/message_definitions/v1.0` are exactly the same.
:::

1. Make your own uORB message file **key_command.msg** in (PX4-Autopilot/msg). For this example the "key_command.msg" has only the code:
   ```
   
   ```

   Then, in **CMakeLists.txt** (in **PX4-Autopilot/msg**), include:

   ```cmake
   
        
   ```

1. Edit **mavlink_receiver.h** (in **PX4-Autopilot/src/modules/mavlink**)

   ```cpp
   ...
   
   
   private:
       void handle_message_key_command(mavlink_message_t *msg);
   ...
       orb_advert_t _key_command_pub{nullptr};
   }
   ```

1. Edit **mavlink_receiver.cpp** (in **PX4-Autopilot/src/modules/mavlink**). This is where PX4 receives the MAVLink message sent from ROS, and publishes it as a uORB topic.
   ```cpp
   ...
   
    
   
   
   ```

1. Make your own uORB topic subscriber just like any example subscriber module. For this example lets create the model in (/PX4-Autopilot/src/modules/key_receiver). In this directory, create three files **CMakeLists.txt**, **key_receiver.cpp**, **Kconfig** Each one looks like the following.

   ```cmake
   
   ```

   ```
   
   ```

   ```
    

   ```

   For a more detailed explanation see the topic [Writing your first application](../modules/hello_sky.md).

1. Lastly, add your module in the **default.px4board** file correspondent to your board in **PX4-Autopilot/boards/**. For example: -for the Pixhawk 4, add the following code in **PX4-Autopilot/boards/px4/fmu-v5/default.px4board**: -for the SITL, add the following code in **PX4-Autopilot/boards/px4/sitl/default.px4board**

   ```
    
   ```

Now you are ready to build all your work!

## Building

### Build for ROS

1. In your workspace enter: `catkin build`.
1. Beforehand, you have to set your "px4.launch" in (/workspace/src/mavros/mavros/launch). Edit "px4.launch" as below. If you are using USB to connect your computer with Pixhawk, you have to set "fcu_url" as shown below. But, if you are using CP2102 to connect your computer with Pixhawk, you have to replace "ttyACM0" with "ttyUSB0". And if you are using the SITL to connect to your terminal, you have to replace "/dev/ttyACM0:57600" with "udp://:14540@127.0.0.1:14557". Modifying "gcs_url" is to connect your Pixhawk with UDP, because serial communication cannot accept MAVROS, and your nutshell connection simultaneously.

1. Write your IP address at "xxx.xx.xxx.xxx"
   ```xml
   ...
     
   ```

### Build for PX4

1. Clean the previously built PX4-Autopilot directory. In the root of **PX4-Autopilot** directory:
    ```sh
    
    ```

1. Build PX4-Autopilot and upload [in the normal way](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards).

    For example:

    - to build for Pixhawk 4/FMUv5 execute the following command in the root of the PX4-Autopilot directory:
    ```sh
    
    ```
    - to build for SITL execute the following command in the root of the PX4-Autopilot directory (using jmavsim simulation):
    ```sh
    
    ```

## Running the Code

Next test if the MAVROS message is sent to PX4.

### Running ROS

1. In a terminal enter
   ```sh
   
   ```
1. In a second terminal run:
   ```sh
   
   ```
   This means, publish 97 ('a' in ASCII) to ROS topic "/mavros/keyboard_command/keyboard_sub" in message type "std_msgs/Char". "-r 10" means to publish continuously in "10Hz".

### Running PX4

1. Enter the Pixhawk nutshell through UDP. Replace xxx.xx.xxx.xxx with your IP.
   ```sh
   
   ```

1. After few seconds, press **Enter** a couple of times. You should see a prompt in the terminal as below:
   ```sh
   
   ```
   Type "key_receiver", to run your subscriber module.
   ```
   
   ```

Check if it successfully receives `a` from your ROS topic.
