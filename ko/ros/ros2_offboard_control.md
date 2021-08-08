# ROS 2 오프보드 제어 예

:::warning
*오프보드* 제어는 위험합니다. 실제 차량에서 작동하는 경우 문제가 발생하면, 다시 수동 제어를 하는 방법이 있어야 합니다.
:::

:::warning
[*microRTPS* 브리지](../middleware/micrortps.md)를 통해 PX4와 ROS 2 상호작용을 하려면, 사용자가 PX4 내부가 어떻게 작동하는지 이해하여야 합니다! 사용자가 필요한 uORB 주제에 직접 게시하는 ROS 2를 통한 PX4 오프보드 제어에도 동일한 이해가 필요합니다(ROS와 PX4 데이터 형식/관례 간의 추상화 수준 없이).

PX4 내부 작동이 확실하지 않은 경우에는 MAVLink 마이크로서비스 및 추상화 계층에 의존하는 워크플로를 대신 사용하여 오프보드 제어 또는 *microRTPS* 브리지를 통한 다른 종류의 상호 작용을 실행하는 것이 좋습니다.
:::

다음 C++ 예제는 *microRTPS* 브리지를 사용하여 ROS 2 노드에서 오프보드 위치 제어를 수행하는 방법을 설명합니다.

## 요구 사항

이 예에서는 PX4 SITL을 사용므로, 사용자가 미리 시뮬레이션 환경을 설정하여야합니다. 그 외:

1. 사용자는 미리 ROS 2 환경을 설치하여야 합니다. 자세한 방법은 [PX4-ROS 2 브리지](../ros/ros2_comm.md) 문서를 참고하십시오.
1. `px4_msgs`와 `px4_ros_com`은 이미 colcon 작업 공간에 있어야 합니다. 자세한 내용은 앞의 링크를 참고하십시오.
1. `offboard_control_mode` 및 `trajectory_setpoint` 메시지는 PX4-Autopilot 및  자동 조종 장치에서 *수신*되는 *px4_ros_com* 패키지의 `uorb_rtps_message_ids.yaml` 파일에 설정되어 있습니다.

   *PX4-Autopilot/msg/tools/uorb_rtps_message_ids.yaml*
   ```yaml
     - msg: offboard_control_mode
       id: 44
       receive: true
     ...
     - msg: vehicle_local_position_setpoint
       id: 97
       receive: true
     ...
     - msg: trajectory_setpoint
       id: 196
       alias: vehicle_local_position_setpoint
       receive: true
   ```

   *path_to_colcon_ws/src/px4_ros_com/templates/uorb_rtps_message_ids.yaml*
   ```yaml
     - id: 44
       msg: OffboardControlMode
       receive: true
     ...
     - msg: VehicleLocalPositionSetpoint
       id: 97
       receive: true
     ...
     - alias: VehicleLocalPositionSetpoint
       id: 196
       msg: TrajectorySetpoint
       receive: true
   ```

:::note
이 문서를 작성하는 시점에는 위의 주제는 이미 수신하도록 설정되어 있습니다.
:::

## 구현

The source code of the offboard control example can be found in [offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/master/src/examples/offboard/offboard_control.cpp).

Here are some details about the implementation:

```cpp
timesync_sub_ = this->create_subscription<px4_msgs::msg::Timesync>("Timesync_PubSubTopic",
    10,
    [this](const px4_msgs::msg::Timesync::UniquePtr msg) {
        timestamp_.store(msg->timestamp);
    });
```

The above is required in order to obtain a syncronized timestamp to be set and sent with the `offboard_control_mode` and `trajectory_setpoint` messages.

```cpp
auto timer_callback = [this]() -> void {

            if (offboard_setpoint_counter_ == 10) {
                // Change to Offboard mode after 10 setpoints
                this->publish_vehicle_command(VehicleCommand::VEHICLE_CMD_DO_SET_MODE, 1, 6);

                // Arm the vehicle
                this->arm();
            }

                    // offboard_control_mode needs to be paired with trajectory_setpoint
            publish_offboard_control_mode();
            publish_trajectory_setpoint();

                 // stop the counter after reaching 11
            if (offboard_setpoint_counter_ < 11) {
                offboard_setpoint_counter_++;
            }
        };
        timer_ = this->create_wall_timer(100ms, timer_callback);
    }
```

The above is the main loop spining on the ROS 2 node. It first sends 10 setpoint messages before sending the command to change to offboard mode At the same time, both `offboard_control_mode` and `trajectory_setpoint` messages are sent to the flight controller.

```cpp
/**
 * @brief Publish the offboard control mode.
 *        For this example, only position and altitude controls are active.
 */
void OffboardControl::publish_offboard_control_mode() const {
    OffboardControlMode msg{};
    msg.timestamp = timestamp_.load();
    msg.position = true;
    msg.velocity = false;
    msg.acceleration = false;
    msg.attitude = false;
    msg.body_rate = false;

    offboard_control_mode_publisher_->publish(msg);
}


/**
 * @brief Publish a trajectory setpoint
 *        For this example, it sends a trajectory setpoint to make the
 *        vehicle hover at 5 meters with a yaw angle of 180 degrees.
 */
void OffboardControl::publish_trajectory_setpoint() const {
    TrajectorySetpoint msg{};
    msg.timestamp = timestamp_.load();
    msg.x = 0.0;
    msg.y = 0.0;
    msg.z = -5.0;
    msg.yaw = -3.14; // [-PI:PI]

    trajectory_setpoint_publisher_->publish(msg);
}
```

The above functions exemplify how the fields on both `offboard_control_mode` and `trajectory_setpoint` messages can be set. Notice that the above example is applicable for offboard position control, where on the `offboard_control_mode` message, the `position` field is set to `true`, while all the others get set to `false`. Also, in this case, the `x`, `y`, `z` and `yaw` fields are hardcoded to certain values, but they can be updated dynamically according to an algorithm or even by a subscription callback for messages coming from another node.

:::tip
The position is already being published in the NED coordinate frame for simplicity, but in the case of the user wanting to subscribe to data coming from other nodes, and since the standard frame of reference in ROS/ROS 2 is ENU, the user can use the available helper functions in the [`frame_transform` library](https://github.com/PX4/px4_ros_com/blob/master/src/lib/frame_transforms.cpp).
:::

```cpp
/**
 * @brief Publish vehicle commands
 * @param command   Command code (matches VehicleCommand and MAVLink MAV_CMD codes)
 * @param param1    Command parameter 1
 * @param param2    Command parameter 2
 */
void OffboardControl::publish_vehicle_command(uint16_t command, float param1,
                          float param2) const {
    VehicleCommand msg{};
    msg.timestamp = timestamp_.load();
    msg.param1 = param1;
    msg.param2 = param2;
    msg.command = command;
    msg.target_system = 1;
    msg.target_component = 1;
    msg.source_system = 1;
    msg.source_component = 1;
    msg.from_external = true;

    vehicle_command_publisher_->publish(msg);
}
```

As the description suggests, the above code serves the purpose of sending `vehicle_command_publisher` messages with commands to the flight controller.

:::note
By the time of writing, `vehicle_command_publisher` is also already configured to be received.
:::

## Usage

After building the colcon workspace, and after starting PX4 SITL and both the microRTPS bridge client and agent:

```sh
$ source path_to_colcon_workspace/install/setup.bash
$ ros2 run px4_ros_com offboard_control
```

## Demo with PX4 SITL and Gazebo

@[youtube](https://youtu.be/Nbc7fzxFlYo)
