---
canonicalUrl: https://docs.px4.io/main/zh/ros/mavros_offboard
---

# Macros 功能包的 offboard 模式控制例程

本教程介绍了使用 Gazbo/SITL 中模拟的四轴飞行器 *Offboard* 控制的基础知识。 在教程的末尾, 你应该看到与下面的视频相同的行为, 即缓慢起飞到2米的高度。

:::warning
*Offboard* control is dangerous. If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

`mavros_msgs` 功能包中包含操作 MAVROS 包中服务和主题所需的自定义消息文件。 Similar examples in Python can be found here: [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/integrationtests/python_src/px4_it/mavros).
:::

<video width="100%" autoplay="true" controls="true">
    <source src="../../assets/simulation/gazebo_offboard.webm" type="video/webm">
</video>

## 代码

Create the `offb_node.cpp` file in your ROS package (by also adding it to your `CMakeList.txt` so it is compiled), and paste the following inside it:
```cpp
/**
 * @file offb_node.cpp
 * @brief Offboard control example node, written with MAVROS version 0.19.x, PX4 Pro Flight
 * Stack and tested in Gazebo SITL
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
我们初始化了一个发布者来发布本地的控制指令，还初始化了请求解锁和更改模式的服务。 请注意，对于您自己的系统，"mavros" 前缀可能不同，因为它将取决于给它的启动文件中的节点指定的名称。

```cpp
mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}
```
PX4 固件在 *Offboard* 模式下，连续两次控制命令之间有 500ms 的超时。 如果飞控超过，飞控会立即切换回进入 *Offboard* 模式之前的飞行模式。

```cpp
ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>("mavros/state", 10, state_cb);
ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>("mavros/setpoint_position/local", 10);
ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>("mavros/cmd/arming");
ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>("mavros/set_mode");
```
在发布对应消息之前，我们需要等待飞控和MAVROS模块的连接。 在收到心跳包之后，代码便会跳出这个循环。
```cpp
//the setpoint publishing rate MUST be faster than 2Hz
ros::Rate rate(20.0);
```
尽管PX4飞控在NED坐标系下操控飞机，但MAVROS是在ENU系下进行指令传输的。 这也就是为什么我们设置`z`为+2。 This is why the publishing rate **must** be faster than 2 Hz to also account for possible latencies. This is also the same reason why it is recommended to enter *Offboard* mode from *Position* mode, this way if the vehicle drops out of *Offboard* mode it will stop in its tracks and hover.

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```
在切换到offboard模式之前，你必须先发送一些期望点信息到飞控中。 不然飞控会拒绝切换到offboard模式。
```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```
我们现在设置要切换的模式为 `OFFBOARD`。 [支持模式](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) 代码列出供参考：
```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
    local_pos_pub.publish(pose);
    ros::spinOnce();
    rate.sleep();
}
```
剩下的代码都比较容易自学。 Otherwise the mode switch will be rejected. 我们每隔五秒去检查一下与飞控的连接等是否一切正常。
```cpp
mavros_msgs::SetMode offb_set_mode;
offb_set_mode.request.custom_mode = "OFFBOARD";
```

We set the custom mode to `OFFBOARD`. A list of [supported modes](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) is available for reference.
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
The rest of the code is pretty self explanatory. We attempt to switch to *Offboard* mode, after which we arm the quad to allow it to fly. We space out the service calls by 5 seconds so to not flood the autopilot with the requests. In the same loop, we continue sending the requested pose at the appropriate rate.

:::tip
This code has been simplified to the bare minimum for illustration purposes.
In larger systems, it is often useful to create a new thread which will be in charge of periodically publishing the setpoints.
:::
