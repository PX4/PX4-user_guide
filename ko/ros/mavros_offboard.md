---
canonicalUrl: https://docs.px4.io/main/ko/ros/mavros_offboard
---

# MAVROS *오프보드* 콘트롤 예제

Gazebo/SITL에서 시뮬레이션된 Iris 쿼드콥터를 사용하여 MAVROS로 *오프보드* 제어의 기본 사항을 설명합니다. 튜토리얼이 끝나면 아래 비디오와 같은 동작, 즉 고도 2미터까지 천천히 이륙하는 것을 볼 수 있습니다.

:::warning
*오프보드* 콘트롤은 위험합니다. 실제 차량에서 작동하는 경우 문제가 발생하면, 다시 수동 제어를 하는 방법이 있어야 합니다.
:::

:::tip
이 예제는 C++ 언어를 사용합니다. Similar examples in Python can be found here: [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/integrationtests/python_src/px4_it/mavros).
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
PX4는 두 개의 *Offboard* 명령 사이에 500ms의 시간 초과가 있습니다. 이 제한 시간이 초과되면 commander는 *오프보드* 모드로 들어가기 전에 차량이 마지막으로 있었던 모드로 되돌아갑니다. 이것은 게시 속도가 가능한 지연 시간을 고려하기 위해 2Hz보다 **반드시** 빨라야 하는 이유입니다. *위치* 모드에서 *오프보드* 모드로 진입하는 것을 권장하는 이유이기도 합니다. 이렇게 하면 차량이 *오프보드* 모드에서 빠져 나오면 트랙에서 멈추고 호버링합니다.

```cpp
// wait for FCU connection
while(ros::ok() && !current_state.connected){
    ros::spinOnce();
    rate.sleep();
}
```
무엇이든 게시하기 전에 MAVROS와 자동조종장치간에 연결이 설정될 때까지 기다립니다. 이 루프는 하트비트 메시지가 수신되는 즉시 종료되어야 합니다.
```cpp
geometry_msgs::PoseStamped pose;
pose.pose.position.x = 0;
pose.pose.position.y = 0;
pose.pose.position.z = 2;
```
PX4 Pro Flight Stack이 항공우주 NED 좌표 프레임에서 작동하더라도, MAVROS는 이러한 좌표를 표준 ENU 프레임으로 또는 그 반대로 변환합니다. 이것이 `z`를 양수 2로 설정한 이유입니다.
```cpp
//send a few setpoints before starting
for(int i = 100; ros::ok() && i > 0; --i){
    local_pos_pub.publish(pose);
    ros::spinOnce();
    rate.sleep();
}
```
*오프보드* 모드에 들어가기 전에, 이미 스트리밍 설정값을 시작하여야 합니다. 그렇지 않으면 모드 전환이 거부됩니다. 여기서 임의의 양으로 `100`을 선택하였습니다.
```cpp
mavros_msgs::SetMode offb_set_mode;
offb_set_mode.request.custom_mode = "OFFBOARD";
```

맞춤 모드를 `OFFBOARD`로 설정하였습니다. [지원되는 모드](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) 목록을 참조할 수 있습니다.
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
나머지 코드는 꽤 자명합니다. *오프보드* 모드로 전환하려고 시도한 후 쿼드가 비행할 수 있도록 준비합니다. 자동조종장치가 요청으로 가득 차지 않도록, 서비스 호출에 5초 간격을 둡니다. 동일한 루프에서 요청된 포즈를 적절한 속도로 계속 전송합니다.

:::tip
이 코드는 설명을 위하여 최대한 단순화되었습니다.
더 큰 시스템에서는 주기적으로 설정값을 게시할, 새 스레드를 만드는 것이 유용합니다.
:::
