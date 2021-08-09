# MAVROS *오프보드* 콘트롤 예제

Gazebo/SITL에서 시뮬레이션된 Iris 쿼드콥터를 사용하여 MAVROS로 *오프보드* 제어의 기본 사항을 설명합니다. 튜토리얼이 끝나면 아래 비디오와 같은 동작, 즉 고도 2미터까지 천천히 이륙하는 것을 볼 수 있습니다.

:::warning
*오프보드* 콘트롤은 위험합니다. 실제 차량에서 작동하는 경우 문제가 발생하면, 다시 수동 제어를 하는 방법이 있어야 합니다.
:::

:::tip
이 예제는 C++ 언어를 사용합니다. Python의 유사한 예는 [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/master/integrationtests/python_src/px4_it/mavros)을 참고하십시오.
:::

<video width="100%" autoplay="true" controls="true">
    <source src="../../assets/simulation/gazebo_offboard.webm" type="video/webm">
</video>

## 코드

ROS 패키지에 `offb_node.cpp` 파일을 만들고(컴파일되도록 `CMakeList.txt`에도 추가하여), 그 안에 다음을 붙여넣습니다.
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

## 코드 설명

```cpp
#include <ros/ros.h>
#include <geometry_msgs/PoseStamped.h>
#include <mavros_msgs/CommandBool.h>
#include <mavros_msgs/SetMode.h>
#include <mavros_msgs/State.h>
```
`mavros_msgs` 패키지에는 MAVROS 패키지에서 제공하는 서비스 및 주제  운영에 필요한 사용자 정의 메시지가 포함되어 있습니다. 모든 서비스와 주제와 해당 메시지 유형은 [mavros wiki](http://wiki.ros.org/mavros)에 문서화되어 있습니다.

```cpp
mavros_msgs::State current_state;
void state_cb(const mavros_msgs::State::ConstPtr& msg){
    current_state = *msg;
}
```
자동조종장치의 현재 상태를 저장할 간단한 콜백을 만듭니다. 이렇게 하면 연결, 준비 및 *오프보드* 플래그를 확인할 수 있습니다.

```cpp
ros::Subscriber state_sub = nh.subscribe<mavros_msgs::State>("mavros/state", 10, state_cb);
ros::Publisher local_pos_pub = nh.advertise<geometry_msgs::PoseStamped>("mavros/setpoint_position/local", 10);
ros::ServiceClient arming_client = nh.serviceClient<mavros_msgs::CommandBool>("mavros/cmd/arming");
ros::ServiceClient set_mode_client = nh.serviceClient<mavros_msgs::SetMode>("mavros/set_mode");
```
퍼블리셔를 인스턴스화하여 명령된 로컬 위치를 게시하고, 적절한 클라이언트가 무장 및 모드 변경을 요청하도록 합니다. 자신의 시스템에서 "mavros" 접두사는 실행 파일의 노드에 지정된 이름에 따라 다를 수 있습니다.
```cpp
//the setpoint publishing rate MUST be faster than 2Hz
ros::Rate rate(20.0);
```
PX4는 두 개의 *Offboard* 명령 사이에 500ms의 시간 초과가 있습니다. 이 제한 시간이 초과되면 commander는 *오프보드* 모드로 들어가기 전에 차량이 마지막으로 있었던 모드로 되돌아갑니다. This is why the publishing rate **must** be faster than 2 Hz to also account for possible latencies. This is also the same reason why it is recommended to enter *Offboard* mode from *Position* mode, this way if the vehicle drops out of *Offboard* mode it will stop in its tracks and hover.

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```
Before publishing anything, we wait for the connection to be established between MAVROS and the autopilot. This loop should exit as soon as a heartbeat message is received.
```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```
Even though the PX4 Pro Flight Stack operates in the aerospace NED coordinate frame, MAVROS translates these coordinates to the standard ENU frame and vice-versa. This is why we set `z` to positive 2.
```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
    local_pos_pub.publish(pose);
    ros::spinOnce();
    rate.sleep();
}
```
Before entering *Offboard* mode, you must have already started streaming setpoints. Otherwise the mode switch will be rejected. Here, `100` was chosen as an arbitrary amount.
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
This code has been simplified to the bare minimum for illustration purposes. In larger systems, it is often useful to create a new thread which will be in charge of periodically publishing the setpoints.
:::
