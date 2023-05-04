# ROS 2 Offboard Control Example

下面的 C++ 示例显示如何在ROS 2 节点中进行 [offboard模式](../flight_modes/offboard.md) 下的位置控制。

示例将首先发送设置点、进入offboard模式、解锁、起飞至5米，并悬停等待。 虽然简单，但它显示了如何使用offboard控制以及如何向无人机发送指令。

它已在 Ubuntu 20.04 ROS 2 Foxy环境及不低于 PX4 v1.13 的 `main` 分支进行了测试。

:::warning
*Offboard* control is dangerous. If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::note ROS
和 PX4 有一些不同的定义，特别是在 [坐标系定义](../ros/external_position_estimation.md#reference-frames-and-ros) 中。 当主题发布或订阅时，坐标系类型之间没有隐含转换！

这个例子按照PX4的定义在NED坐标系下发布位置。 订阅来自在不同坐标系发布的节点数据(例如ENU, ROS/ROS 2中的标准坐标系)，使用 [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/src/lib/frame_transforms.cpp) 库中的辅助函数来进行转换。
:::

## 尝试一下

按照 [ROS 2 用户向导](../ros/ros2_comm.md) 中的说明来安装PX 并运行模拟器，安装ROS 2, 并启动XRCE-DDS代理。

然后，我们可以采用 [ROS 2 用户向导 > 构建 ROS 2 工作空间](../ros/ros2_comm.md#build-ros-2-workspace) 中相似的步骤来运行这个例子。

构建并运行示例：

1. 打开一个新的终端。
1. 使用以下方法创建并切换至新的 colcon工作目录：

   ```sh
   mkdir -p ~/ws_offboard_control/src/
   cd ~/ws_offboard_control/src/
   ```

1. 克隆 [px4_msgs](https://github.com/PX4/px4_msgs) 仓库到 `/src` 目录(每一个 ROS 2 PX4 工作区都需要这个仓库!):

   ```sh
   git clone https://github.com/PX4/px4_msgs.git
   # checkout the matching release branch if not using PX4 main.
   ```

1. 克隆示例仓库 [px4_ros_com](https://github.com/PX4/px4_ros_com) 到 `/src` 目录：

   ```sh
   git clone https://github.com/PX4/px4_ros_com.git
   ```

1. 配置 ROS 2 开发环境 ("foxy") 到当前终端，并使用 `colcon` 编译工作区：

   ```sh
   cd ..
   source /opt/ros/foxy/setup.bash
   colcon build
   ```

1. 执行工作空间环境配置脚本 `local_setup.bash`:

   ```sh
   source install/local_setup.bash
   ```
1. 启动例程。

   ```
   ros2 run px4_ros_com offboard_control
   ```

飞行器将解锁、起飞至5米并悬停等待（永久）。

## Implementation

Offboard控制示例的源代码见 [PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) 目录的 [/src/examples/offboard/offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/main/src/examples/offboard/offboard_control.cpp) 。

:::note PX4 默认情况下将此示例中使用的所有消息作为ROS主题发布(见 [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml))。
:::

PX4 在offboard模式下解锁或者在飞行过程中切换至offboard模式都需要飞行器已经收到 `OffboardControlMode` 消息。 此外，如果 `OffboardControlMode` 消息的频率低于2Hz，PX4 将会切换出offboard模式。 该行为在ROS 2 节点的主循环中实现的，如下所示：

```cpp
auto timer_callback = [this]() -> void {

    if (offboard_setpoint_counter_ == 10) {
        // Change to Offboard mode after 10 setpoints
        this->publish_vehicle_command(VehicleCommand::VEHICLE_CMD_DO_SET_MODE, 1, 6);

        // Arm the vehicle
        this->arm();
    }

    // OffboardControlMode needs to be paired with TrajectorySetpoint
    publish_offboard_control_mode();
    publish_trajectory_setpoint();

    // stop the counter after reaching 11
    if (offboard_setpoint_counter_ < 11) {
        offboard_setpoint_counter_++;
    }
};
timer_ = this->create_wall_timer(100ms, timer_callback);
```

循环运行在一个100毫秒计时器。 在前10个周期中，它调用 `publish_offboard_control_mode()` 和 `publish_trajectory_setpoint()` 发送 [OffboardControlMode](../msg_docs/OffboardControlMode.md) 和 [TracjectorySetpoint](../msg_docs/TrajectorySetpoint.md) 消息到 PX4。 `OffboardControlMode` 消息已经被接到，所以PX4将允许被解锁一旦切换至offboard模式后， `TrajectorySetpoint` 将被忽略(直到飞行器处于offboard模式)。

在 10 个周期后调用 `publish_vehicle_command()` 切换至offboard模式，并调用 `arm()` 来解锁飞行器。 在飞行器解锁并和切换模式后，它将开始跟踪位置设定值。 The setpoints are still sent in every cycle so that the vehicle does not fall out of offboard mode.

The implementations of the `publish_offboard_control_mode()` and `publish_trajectory_setpoint()` methods are shown below. These publish the [OffboardControlMode](../msg_docs/OffboardControlMode.md) and [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) messages to PX4 (respectively).

The `OffboardControlMode` is required in order to inform PX4 of the _type_ of offboard control behing used. Here we're only using _position control_, so the `position` field is set to `true` and all the other fields are set to `false`.

```cpp
/**
 * @brief Publish the offboard control mode.
 *        For this example, only position and altitude controls are active.
 */
void OffboardControl::publish_offboard_control_mode()
{
    OffboardControlMode msg{};
    msg.position = true;
    msg.velocity = false;
    msg.acceleration = false;
    msg.attitude = false;
    msg.body_rate = false;
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    offboard_control_mode_publisher_->publish(msg);
}
```

`TrajectorySetpoint` provides the position setpoint. In this case, the `x`, `y`, `z` and `yaw` fields are hardcoded to certain values, but they can be updated dynamically according to an algorithm or even by a subscription callback for messages coming from another node.

```cpp
/**
 * @brief Publish a trajectory setpoint
 *        For this example, it sends a trajectory setpoint to make the
 *        vehicle hover at 5 meters with a yaw angle of 180 degrees.
 */
void OffboardControl::publish_trajectory_setpoint()
{
    TrajectorySetpoint msg{};
    msg.position = {0.0, 0.0, -5.0};
    msg.yaw = -3.14; // [-PI:PI]
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    trajectory_setpoint_publisher_->publish(msg);
}
```

The `publish_vehicle_command()` sends [VehicleCommand](../msg_docs/VehicleCommand.md) messages with commands to the flight controller. We use it above to change the mode to offboard mode, and also in `arm()` to arm the vehicle. While we don't call `disarm()` in this example, it is also used in the implementation of that function.

```cpp
/**
 * @brief Publish vehicle commands
 * @param command   Command code (matches VehicleCommand and MAVLink MAV_CMD codes)
 * @param param1    Command parameter 1
 * @param param2    Command parameter 2
 */
void OffboardControl::publish_vehicle_command(uint16_t command, float param1, float param2)
{
    VehicleCommand msg{};
    msg.param1 = param1;
    msg.param2 = param2;
    msg.command = command;
    msg.target_system = 1;
    msg.target_component = 1;
    msg.source_system = 1;
    msg.source_component = 1;
    msg.from_external = true;
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    vehicle_command_publisher_->publish(msg);
}
```

:::note
[VehicleCommand](../msg_docs/VehicleCommand.md) is one of the simplest and most powerful ways to command PX4, and by subscribing to [VehicleCommandAck](../msg_docs/VehicleCommandAck.md) you can also confirm that setting a particular command was successful. The param and command fields map to [MAVLink commands](https://mavlink.io/en/messages/common.html#mav_commands) and their parameter values.
:::


<!--

## Demo with PX4 SITL and Gazebo Classic

@[youtube](https://youtu.be/Nbc7fzxFlYo)
-->
