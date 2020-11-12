# Macros 功能包的 offboard 模式控制例程

本教程介绍了使用 Gazbo/SITL 中模拟的四轴飞行器 *Offboard* 控制的基础知识。 在教程的末尾, 你应该看到与下面的视频相同的行为, 即缓慢起飞到2米的高度。

> **Caution** 使用* Offboard * 模式来控制无人机有危险性的。 如果你是在一个真正的实物平台上进行试验，请保证你已经设置了切换回手动的开关来防止紧急情况的发生。

<span></span>
> **Tip** 本示例使用 C++。 Python 中的类似示例可以在这里找到： [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/Firmware/tree/master/integrationtests/python_src/px4_it/mavros)。

<video width="100%" autoplay="true" controls="true">
    <source src="../../assets/simulation/gazebo_offboard.webm" type="video/webm">
</video>

## 代码

在 ROS 包中创建 `offb_node.cpp` 文件（还可以将其添加到 `CMakeList.txt` 以便对其进行编译），并在其中粘贴以下内容：
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
`mavros_msgs` 功能包中包含操作 MAVROS 包中服务和主题所需的自定义消息文件。 所有服务和主题及其相应的消息类型都可以在 [ mavros wiki ](http://wiki.ros.org/mavros) 中找到。

```cpp
mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}
```
我们创建了一个简单的回调函数来储存飞控当前的状态。 这将使得我们可以检查飞机的各项状态，如是否连接上mavros功能包、是否解锁、当前飞行模式。

```cpp
ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>("mavros/state", 10, state_cb);
ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>("mavros/setpoint_position/local", 10);
ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>("mavros/cmd/arming");
ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>("mavros/set_mode");
```
我们初始化了一个发布者来发布本地的控制指令，还初始化了请求解锁和更改模式的服务。 请注意，对于您自己的系统，"mavros" 前缀可能不同，因为它将取决于给它的启动文件中的节点指定的名称。
```cpp
//the setpoint publishing rate MUST be faster than 2Hz
ros::Rate rate(20.0);
```
PX4 固件在 *Offboard* 模式下，连续两次控制命令之间有 500ms 的超时。 如果飞控超过，飞控会立即切换回进入 *Offboard* 模式之前的飞行模式。 这就是为什么发布频率 **必须** 大于2Hz的原因。 这样是为什么我们推荐从 *位置* 模式进入 *离板* 模式，因为如果飞控退出 *Offboard* 模式，无人机会会悬停于当前位置。

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```
在发布对应消息之前，我们需要等待飞控和MAVROS模块的连接。 在收到心跳包之后，代码便会跳出这个循环。
```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```
尽管PX4飞控在NED坐标系下操控飞机，但MAVROS是在ENU系下进行指令传输的。 这也就是为什么我们设置`z`为+2。
```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
    local_pos_pub.publish(pose);
    ros::spinOnce();
    rate.sleep();
}
```
在切换到offboard模式之前，你必须先发送一些期望点信息到飞控中。 不然飞控会拒绝切换到offboard模式。 在这里, `100` 可以被选择为任意数量。
```cpp
mavros_msgs::SetMode offb_set_mode;
offb_set_mode.request.custom_mode = "OFFBOARD";
```

我们现在设置要切换的模式为 `OFFBOARD`。 [支持模式](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) 代码列出供参考：
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
剩下的代码都比较容易自学。 We attempt to switch to *Offboard* mode, after which we arm the quad to allow it to fly. We space out the service calls by 5 seconds so to not flood the autopilot with the requests. In the same loop, we continue sending the requested pose at the appropriate rate.

> **提示** 为了说明使用方法，我们提供这段十分间断的示例代码。 在一个复杂的系统中，通常需要创建新的进程来负责周期性的发送位置期望点给飞控。
