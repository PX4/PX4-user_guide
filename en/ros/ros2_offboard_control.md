# ROS 2 Offboard Control Example

:::warning
*Offboard* control is dangerous.
If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::warning
ROS and PX4 make a number of different assumptions, in particular with respect to [frame conventions](../ros/external_position_estimation.md#reference-frames-and-ros).
For example, for the body frame PX4 uses the Forward-Right-Down (FRD) frame, while ROS uses Forward-Left-Up (FLU).

There is no implicit conversion between frame types when topics are published or subscribed in PX4, so you will need to manage this in your own code!
:::

The following C++ example shows how to do offboard position control from a ROS 2 node.

It has been tested on Ubuntu 20.04 with ROS2 Foxy and PX4 `main` after PX4 v1.13.

## Requirements

First set up ROS and the PX4 simulation environment as described in the [ROS 2 User Guide](..ros/ros2_comm.md).

The example uses the [OffboardControlMode](../msg_docs/OffboardControlMode.md), [TrajectorySetpoint](../en/msg_docs/TrajectorySetpoint.md) and [VehicleCommand](../msg_docs/VehicleCommand.md) messages.
These are published as ROS topics by default (see [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/microdds_client/dds_topics.yaml)) but you will need to add the [px4_msgs](https://github.com/PX4/px4_msgs) repo to your colcon workspace `src` directory to make these available to the ROS2 node.
The instructions below show you how.

## Implementation

The source code of the offboard control example can be found in [PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) in the directory [/src/examples/offboard/offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/main/src/examples/offboard/offboard_control.cpp).

Here are some details about the implementation:

```cpp
timesync_sub_ = this->create_subscription<px4_msgs::msg::Timesync>("/fmu/timesync/out",
    10,
    [this](const px4_msgs::msg::Timesync::UniquePtr msg) {
        timestamp_.store(msg->timestamp);
    });
```

The above is required in order to obtain a synchronized timestamp to be set and sent with the [OffboardControlMode](../msg_docs/OffboardControlMode.md) and [TrajectorySetpoint](../en/msg_docs/TrajectorySetpoint.md) messages.

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
At the same time, both `OffboardControlMode` and `TrajectorySetpoint` messages are sent to the flight controller.

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

The above functions show how the fields on both `OffboardControlMode` and `TrajectorySetpoint` messages can be set.
Notice that the above example is applicable for offboard position control, where on the `OffboardControlMode` message, the `position` field is set to `true`, while all the others get set to `false`.
Also, in this case, the `x`, `y`, `z` and `yaw` fields are hardcoded to certain values, but they can be updated dynamically according to an algorithm or even by a subscription callback for messages coming from another node.

:::tip
The position is published in the NED coordinate frame for simplicity.
If a user wants to subscribe to data coming from nodes that publish in a different frame (for example the ENU, which is the standard frame of reference in ROS/ROS 2), they can use the helper functions in the [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/src/lib/frame_transforms.cpp) library.
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

As the description suggests, the above code serves the purpose of sending [VehicleCommand](../msg_docs/VehicleCommand.md) messages with commands to the flight controller.

## Usage

After building the colcon workspace, and after starting PX4 SITL (`make px4_sitl_rtps gazebo-classic`, which starts the microRTPS client automatically on UDP ports 2019 and 2020) and the microRTPS agent (`micrortps_agent -t UDP`, starting the agent connected to UDP ports 2020 and 2019):

```sh
$ source path_to_colcon_workspace/install/setup.bash
$ ros2 run px4_ros_com offboard_control
```

## Demo with PX4 SITL and Gazebo Classic

@[youtube](https://youtu.be/Nbc7fzxFlYo)
