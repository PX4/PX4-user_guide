---
canonicalUrl: https://docs.px4.io/main/ko/ros/ros2_offboard_control
---

# ROS 2 오프보드 제어 예

:::warning
*오프보드* 제어는 위험합니다. 실제 차량에서 작동하는 경우 문제가 발생하면, 다시 수동 제어를 할 수 있어야 합니다.
:::

:::warning
[*microRTPS* 브리지](../middleware/micrortps.md)를 통해 PX4와 ROS 2 상호작용을 하려면, 사용자가 PX4 내부가 어떻게 작동하는지 이해하여야 합니다. 사용자가 필요한 uORB 주제에 직접 게시하는 ROS 2를 통한 PX4 오프보드 제어에도 동일한 이해가 필요합니다(ROS와 PX4 데이터 형식/관례 간의 추상화 수준 없이).

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
 1. `vehicle_command` message is configured in the `urtps_bridge_topics.yaml` file both in the PX4-Autopilot and *px4_ros_com* package to *send* to the Autopilot.

    In *PX4-Autopilot/msg/tools/urtps_bridge_topics.yaml*:
    ```yaml
    - msg:     vehicle_command
      receive: true
    ```

    In *path_to_colcon_ws/src/px4_ros_com/templates/uorb_rtps_message_ids.yaml*:
    ```yaml
    - msg:     VehicleCommmand
      receive: true
    ```

   :::note
이 문서를 작성하는 시점에는 위의 주제는 이미 수신하도록 설정되어 있습니다.
:::

## 구현

오프보드 제어 예제의 소스 코드는 [offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/master/src/examples/offboard/offboard_control.cpp)에 있습니다.

구현에 대한 몇 가지 세부정보는 다음과 같습니다.

```cpp
timesync_sub_ = this->create_subscription<px4_msgs::msg::Timesync>("Timesync_PubSubTopic",
    10,
    [this](const px4_msgs::msg::Timesync::UniquePtr msg) {
        timestamp_.store(msg->timestamp);
    });
```

The above is required in order to obtain a synchronized timestamp to be set and sent with the `offboard_control_mode` and `trajectory_setpoint` messages.

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

위 코드는 ROS 2 노드에서 실행되는 메인 루프입니다. 오프보드 모드로 변경하라는 명령을 보내기 전에 먼저 10개의 설정값 메시지를 전송합니다. 동시에 `offboard_control_mode`와 `trajectory_setpoint` 메시지가 비행 콘트롤러로 전송됩니다. At the same time, both `offboard_control_mode` and `trajectory_setpoint` messages are sent to the flight controller.

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

위의 함수는 `offboard_control_mode`와 `trajectory_setpoint` 메시지의 필드를 설정하는 방법을 설명합니다. 위의 예는 오프보드 위치 제어에 적용할 수 있습니다. 여기서 `offboard_control_mode` 메시지에서 `position` 필드는 `true`로 설정되고 모든 나머지는 `거짓`으로 설정됩니다. 또한 이 경우 `x`, `y`, `z` 및 `yaw` 필드는 특정 값으로 하드 코딩되지만, 알고리즘에 따라 또는 다른 노드에서 오는 메시지에 대한 구독 콜백에 의해 동적으로 업데이트될 수 있습니다.

:::tip
위치는 이미 단순성을 위해 NED 좌표 프레임에 게시되고 있지만, 사용자가 다른 노드에서 오는 데이터를 구독하려는 경우입니다. ROS/ROS 2의 표준 참조 프레임은 ENU이므로 사용자는 [`frame_transform` 라이브러리](https://github.com/PX4/px4_ros_com/blob/master/src/lib/frame_transforms.cpp)에서 사용 가능한 도우미 기능을 사용할 수 있습니다. If a user wants to subscribe to data coming from nodes that publish in a different frame (for example the ENU, which is the standard frame of reference in ROS/ROS 2), they can use the helper functions in the [frame_transforms](https://github.com/PX4/px4_ros_com/blob/master/src/lib/frame_transforms.cpp) library.
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

설명에서 알 수 있듯이, 위의 코드는 비행 콘트롤러에 명령과 함께 `vehicle_command_publisher` 메시지를 보내는 목적으로 사용됩니다.

## 사용법

After building the colcon workspace, and after starting PX4 SITL (`make px4_sitl_rtps gazebo`, which starts the microRTPS client automatically on UDP ports 2019 and 2020) and the microRTPS agent (`micrortps_agent -t UDP`, starting the agent connected to UDP ports 2020 and 2019):

```sh
$ source path_to_colcon_workspace/install/setup.bash
$ ros2 run px4_ros_com offboard_control
```

## PX4 SITL과 Gazebo를 사용한 데모

@colcon 작업 공간을 구축하고 PX4 SITL과 microRTPS 브리지 클라이언트 및 에이전트를 시작한 후:
