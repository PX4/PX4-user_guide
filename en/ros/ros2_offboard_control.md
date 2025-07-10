---
canonicalUrl: https://docs.px4.io/main/en/ros/ros2_offboard_control
---

# ROS 2 Offboard Control Example

:::warning
*Offboard* control is dangerous.
If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::warning
ROS 2 interaction with PX4, done through the [*microRTPS* bridge](../ros/ros2_comm.md), requires that the user understands how the PX4 internals work!
The same understanding is required for PX4 offboard control via ROS 2, where the user publishes directly to the required uORB topics (without any level of abstraction between ROS and PX4 data formats/conventions).

If you are unsure of PX4 internals work, we recommend that you instead use a workflow that depends on the MAVLink microservices and abstraction layer to execute offboard control or any other kind of interaction through the *microRTPS* bridge.
:::

The following C++ example shows how to use the *microRTPS* bridge and the *px4_ros_com* package to do offboard position control from a ROS 2 node.

## Requirements

For this example, PX4 SITL is being used, so it is assumed, first of all, that the user has the simulation environment properly configured.
Besides that:

1. The user already has their ROS 2 environment properly configured
   Check the [PX4-ROS 2 bridge](../ros/ros2_comm.md) document for details on how to do it.
1. *px4_msgs* and *px4_ros_com* should be already on your colcon workspace `src` directory.
   See the link in the previous point for details.
1. `offboard_control_mode` and `trajectory_setpoint` messages are configured in the `urtps_bridge_topics.yaml` file both in the PX4-Autopilot and
*px4_ros_com* package to be *received* in the Autopilot.

   In *PX4-Autopilot/msg/tools/urtps_bridge_topics.yaml*:
   ```yaml
   - msg:     offboard_control_mode
     receive: true
   ...
   - msg:     vehicle_command
     receive: true
   ...
   - msg:     vehicle_local_position_setpoint
     receive: true
   - msg:     trajectory_setpoint # multi-topic / alias of vehicle_local_position_setpoint
     base:    vehicle_local_position_setpoint
     receive: true
   ```

   In *path_to_colcon_ws/src/px4_ros_com/templates/urtps_bridge_topics.yaml*:
   ```yaml
   - msg:     OffboardControlMode
     receive: true
   ...
   - msg:     VehicleCommmand
     receive: true
   ...
   - msg:     VehicleLocalPositionSetpoint
     receive: true
   - msg:     TrajectorySetpoint
     base:    VehicleLocalPositionSetpoint
     receive: true
   ```
 1. `vehicle_command` message is configured in the `urtps_bridge_topics.yaml` file both in the PX4-Autopilot and
 *px4_ros_com* package to *send* to the Autopilot.

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
   At time of writing, the above topic is already configured to be sent.
   :::

## Implementation

The source code of the offboard control example can be found in [offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/release/1.13/src/examples/offboard/offboard_control.cpp).

Here are some details about the implementation:

```cpp
timesync_sub_ = this->create_subscription<px4_msgs::msg::Timesync>("/fmu/timesync/out",
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

The above is the main loop spinning on the ROS 2 node.
It first sends 10 setpoint messages before sending the command to allow PX4 to change to offboard mode.
At the same time, both `offboard_control_mode` and `trajectory_setpoint` messages are sent to the flight controller.

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

The above functions show how the fields on both `offboard_control_mode` and `trajectory_setpoint` messages can be set.
Notice that the above example is applicable for offboard position control, where on the `offboard_control_mode` message, the `position` field is set to `true`, while all the others get set to `false`.
Also, in this case, the `x`, `y`, `z` and `yaw` fields are hardcoded to certain values, but they can be updated dynamically according to an algorithm or even by a subscription callback for messages coming from another node.

:::tip
The position is published in the NED coordinate frame for simplicity.
If a user wants to subscribe to data coming from nodes that publish in a different frame (for example the ENU, which is the standard frame of reference in ROS/ROS 2), they can use the helper functions in the [frame_transforms](https://github.com/PX4/px4_ros_com/blob/release/1.13/src/lib/frame_transforms.cpp) library.
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

As the description suggests, the above code serves the purpose of sending `vehicle_command` messages with commands to the flight controller.

## Usage

After building the colcon workspace, and after starting PX4 SITL (`make px4_sitl_rtps gazebo`, which starts the microRTPS client automatically on UDP ports 2019 and 2020) and the microRTPS agent (`micrortps_agent -t UDP`, starting the agent connected to UDP ports 2020 and 2019):

```sh
$ source path_to_colcon_workspace/install/setup.bash
$ ros2 run px4_ros_com offboard_control
```

## Demo with PX4 SITL and Gazebo

@[youtube](https://youtu.be/Nbc7fzxFlYo)
