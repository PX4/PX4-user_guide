---
canonicalUrl: https://docs.px4.io/main/zh/ros/mavros_offboard_cpp
---

# MAVROS *Offboard* 控制示例 (C++)

本教程介绍了基于MAVROS的*Offboard* 控制相关的基础知识，控制对象为 Gazbo/SITL 中的Iris模拟四轴飞行器 。 在教程结束时，你应该看到与下面的视频相同的行为, 即缓慢起飞到2米的高度。

:::warning
*Offboard* 控制模式是危险的。 如果你是在一个真正的无人机平台上进行试验，请保证你已经设置了切换回手动的开关来防止紧急情况的发生。
:::

:::tip
该例程使用C++。 相似的使用 Python 的例子参见 [ROS/MAVROS Offboard示例(Python)](../ros/mavros_offboard_python.md) (也可参见 [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/integrationtests/python_src/px4_it/mavros))。
:::

<video width="100%" autoplay="true" controls="true">
  <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## 代码

在 ROS 包中创建 `offb_node.cpp` 文件（并且将其添加到 `CMakeList.txt` 以便对其进行编译），并在其中粘贴以下内容：

```cpp
/**
 * @file offb_node.cpp
 * @brief Offboard control example node, written with MAVROS version 0.19.x, PX4 Pro Flight
 * Stack and tested in Gazebo Classic SITL
 */

#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <mavros_msgs/CommandBool.h>
#include <mavros_msgs/SetMode.h>
#include <mavros_msgs/State.h>

mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "offb_node");
    ros::NodeHandle nh;

    ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>
            ("mavros/state", 10, state_cb);
    ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>
            ("mavros/setpoint_position/local", 10);
    ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>
            ("mavros/cmd/arming");
    ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>
            ("mavros/set_mode");

    //the setpoint publishing rate MUST be faster than 2Hz
    ros::Rate rate(20.0);

    // wait for FCU connection
    while(ros::ok() && !current_state.connected){
        ros::spinOnce();
        rate.sleep();
    }

    geometry_msgs::PoseStamped pose;
    pose.pose.position.x = 0;
    pose.pose.position.y = 0;
    pose.pose.position.z = 2;

    //send a few setpoints before starting
    for(int i = 100; ros::ok() && i > 0; --i){
        local_pos_pub.publish(pose);
        ros::spinOnce();
        rate.sleep();
    }

    mavros_msgs::SetMode offb_set_mode;
    offb_set_mode.request.custom_mode = "OFFBOARD";

    mavros_msgs::CommandBool arm_cmd;
    arm_cmd.request.value = true;

    ros::Time last_request = ros::Time::now();

    while(ros::ok()){
        if( current_state.mode != "OFFBOARD" &&
            (ros::Time::now() - last_request > ros::Duration(5.0))){
            if( set_mode_client.call(offb_set_mode) &&
                offb_set_mode.response.mode_sent){
                ROS_INFO("Offboard enabled");
            }
            last_request = ros::Time::now();
        } else {
            if( !current_state.armed &&
                (ros::Time::now() - last_request > ros::Duration(5.0))){
                if( arming_client.call(arm_cmd) &&
                    arm_cmd.response.success){
                    ROS_INFO("Vehicle armed");
                }
                last_request = ros::Time::now();
            }
        }

        local_pos_pub.publish(pose);

        ros::spinOnce();
        rate.sleep();
    }

    return 0;
}

```

## 代码解释

```cpp
#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <mavros_msgs/CommandBool.h>
#include <mavros_msgs/SetMode.h>
#include <mavros_msgs/State.h>
```
` mavros_msgs ` 功能包中包含了MAVROS包服务和主题所需的全部自定义消息文件。 所有服务和主题及其相应的消息类型都可以在 [ mavros wiki ](http://wiki.ros.org/mavros) 中找到。

```cpp
mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}
```
我们创建了一个简单的回调函数来储存飞控当前的状态。 这将使得我们可以检查连接状态，加解锁状态以及*Offboard* 标志位。

```cpp
ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>("mavros/state", 10, state_cb);
ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>("mavros/setpoint_position/local", 10);
ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>("mavros/cmd/arming");
ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>("mavros/set_mode");
```
我们构建了一个发布者来发布本地位置指令并请求客户端进行加解锁状态及控制模式的切换。 请注意，对于您自己的系统，"mavros" 前缀可能不同，取决于节点启动文件中指定的名称。
```cpp
//the setpoint publishing rate MUST be faster than 2Hz
ros::Rate rate(20.0);
```
PX4 在两个 *Offboard* 命令之间设置了500毫秒的超时检查。 一但发生超时，飞控组件中的commander模块会立即切换回进入 *Offboard* 模式之前的飞行模式。 这也是为什么发布频率 **必须** 大于2Hz的原因。 这也是我们推荐从 *Position* 模式进入 *Offboard* 模式的原因，因为在这种情况下如果无人机退出 *Offboard* 模式，它将会悬停于当前位置。

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```
在发布任何消息之前，我们需要等待飞控和MAVROS建立连接。 在收到心跳包之后，代码便会跳出这个循环。
```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```

尽管PX4在航空航天常用的NED坐标系下操控飞机，但MAVROS将自动将该坐标系切换至常规的ENU坐标系下，反之亦然。 这也就是为什么我们设置`z`为+2。

```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
    local_pos_pub.publish(pose);
    ros::spinOnce();
    rate.sleep();
}
```

在切换到*Offboard*模式之前，你必须先发送一些设定值信息到飞控中。 否则，模式切换将被拒绝。 这里的` 100 ` 可以被设置为任意数。

```cpp
mavros_msgs::SetMode offb_set_mode;
offb_set_mode.request.custom_mode = "OFFBOARD";
```

我们将自定义模式设置为 `OFFBOARD`。 [支持模式](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) 列表可供参考。

```cpp
mavros_msgs::CommandBool arm_cmd;
arm_cmd.request.value = true;

ros::Time last_request = ros::Time::now();

while(ros::ok()){
        if( current_state.mode != "OFFBOARD" &&
                (ros::Time::now() - last_request > ros::Duration(5.0))){
                if( set_mode_client.call(offb_set_mode) &&
                        offb_set_mode.response.mode_sent){
                        ROS_INFO("Offboard enabled");
                }
                last_request = ros::Time::now();
        } else {
                if( !current_state.armed &&
                        (ros::Time::now() - last_request > ros::Duration(5.0))){
                        if( arming_client.call(arm_cmd) &&
                                arm_cmd.response.success){
                                ROS_INFO("Vehicle armed");
                        }
                        last_request = ros::Time::now();
                }
        }

        local_pos_pub.publish(pose);

        ros::spinOnce();
        rate.sleep();
}
```

该代码的其余部分完全是自解释性的。 我们尝试切换到 *Offboard* 模式，然后解锁四旋翼飞行器以允许其飞行。 我们每隔五秒去调用一次该服务，避免飞控被大量的请求阻塞。 在同一个循环中，我们按照指定的频率持续发送期望点设定值信息给飞控。

:::tip
该示例代码非常简单仅为了说明使用方法。
在一个复杂的系统中，通常需要创建新的进程来负责周期性的发送位置期望值给飞控。
:::
