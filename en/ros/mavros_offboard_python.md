# MAVROS *Offboard* control example (Python)

This tutorial shows the basics of *Offboard* control with MAVROS, using an Iris quadcopter simulated in Gazebo/SITL.
It showcases, with step-by-step instructions, how to start developing programs to control a vehicle and simulate it.
At the end of the tutorial, you should see the same behaviour as in the video below, i.e. a slow takeoff to an altitude of 2 meters.

:::warning
*Offboard* control is dangerous. If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::tip
This example uses Python. Other examples in Python can be found here: [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/main/integrationtests/python_src/px4_it/mavros).
:::

<video width="100%" autoplay="true" controls="true">
	<source src="../../assets/simulation/gazebo_offboard.webm" type="video/webm">
</video>

## Creating the ROS Package

1. Open the terminal and go to `~/catkin_ws/src` directory
    ```sh
    roscd  # Should cd into ~/catkin_ws/devel
    cd .. 
    cd src
    ```

2. In the `~/catkin_ws/src` directory create a new package, in this example it will have the name `offboard_py` with the `rospy` dependency:

    ```sh
    catkin_create_pkg offboard_py rospy
    ```

3. Build the new package

    ```sh
    catkin build
    ```

4. You should now be able to cd into the package by using:

    ```sh
    roscd offboard_py
    ```

5. To store your python files, create a new folder called `/scripts` on the package:

    ```sh
    mkdir scripts
    cd scripts
    ```

## Code

After creating the ROS package and scripts folder you are ready to start your python script.
Inside the scripts folder create the `offb_node.py` file and give it executable permissions:

```sh
touch offb_node.py
chmod +x offb_node.py
```

After that open `offb_node.py` file and paste the following code:

```py
"""
 * File: offb_node.py
 * Stack and tested in Gazebo 9 SITL
"""

#! /usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest

current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg


if __name__ == "__main__":
    rospy.init_node("offb_node_py")

    state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

    local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)
    
    rospy.wait_for_service("/mavros/cmd/arming")
    arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)    

    rospy.wait_for_service("/mavros/set_mode")
    set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)
    

    # Setpoint publishing MUST be faster than 2Hz
    rate = rospy.Rate(20)

    # Wait for Flight Controller connection
    while(not rospy.is_shutdown() and not current_state.connected):
        rate.sleep()

    pose = PoseStamped()

    pose.pose.position.x = 0
    pose.pose.position.y = 0
    pose.pose.position.z = 2

    # Send a few setpoints before starting
    for i in range(100):   
        if(rospy.is_shutdown()):
            break

        local_pos_pub.publish(pose)
        rate.sleep()

    offb_set_mode = SetModeRequest()
    offb_set_mode.custom_mode = 'OFFBOARD'

    arm_cmd = CommandBoolRequest()
    arm_cmd.value = True

    last_req = rospy.Time.now()

    while(not rospy.is_shutdown()):
        if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(set_mode_client.call(offb_set_mode).mode_sent == True):
                rospy.loginfo("OFFBOARD enabled")
            
            last_req = rospy.Time.now()
        else:
            if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
                if(arming_client.call(arm_cmd).success == True):
                    rospy.loginfo("Vehicle armed")
            
                last_req = rospy.Time.now()

        local_pos_pub.publish(pose)

        rate.sleep()

```

## Code explanation

```py
import rospy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.msg import State
from mavros_msgs.srv import CommandBool, CommandBoolRequest, SetMode, SetModeRequest
```
The `mavros_msgs` package contains all of the custom messages required to operate services and topics provided by the MAVROS package. All services and topics as well as their corresponding message types are documented in the [mavros wiki](http://wiki.ros.org/mavros).

```py
current_state = State()

def state_cb(msg):
    global current_state
    current_state = msg
```
We create a simple callback which will save the current state of the autopilot.
This will allow us to check connection, arming and *Offboard* flags. 


```py
state_sub = rospy.Subscriber("mavros/state", State, callback = state_cb)

local_pos_pub = rospy.Publisher("mavros/setpoint_position/local", PoseStamped, queue_size=10)

rospy.wait_for_service("/mavros/cmd/arming")
arming_client = rospy.ServiceProxy("mavros/cmd/arming", CommandBool)    

rospy.wait_for_service("/mavros/set_mode")
set_mode_client = rospy.ServiceProxy("mavros/set_mode", SetMode)
```
We instantiate a publisher to publish the commanded local position and the appropriate clients to request arming and mode change.
Note that for your own system, the "mavros" prefix might be different as it will depend on the name given to the node in it's launch file.
```py
# Setpoint publishing MUST be faster than 2Hz
rate = rospy.Rate(20)
```
PX4 has a timeout of 500ms between two *Offboard* commands.
If this timeout is exceeded, the commander will fall back to the last mode the vehicle was in before entering *Offboard* mode.
This is why the publishing rate **must** be faster than 2 Hz to also account for possible latencies.
This is also the same reason why it is **recommended to enter *Offboard* mode from *Position* mode**, this way if the vehicle drops out of *Offboard* mode it will stop in its tracks and hover.

```py
# Wait for Flight Controller connection
while(not rospy.is_shutdown() and not current_state.connected):
    rate.sleep()
```
Before publishing anything, we wait for the connection to be established between MAVROS and the autopilot.
This loop should exit as soon as a heartbeat message is received.
```py
pose = PoseStamped()

pose.pose.position.x = 0
pose.pose.position.y = 0
pose.pose.position.z = 2
```
Even though the PX4 Pro Flight Stack operates in the aerospace NED coordinate frame, MAVROS translates these coordinates to the standard ENU frame and vice-versa.
This is why we set `z` to positive 2.
```py
# Send a few setpoints before starting
for i in range(100):   
    if(rospy.is_shutdown()):
        break

    local_pos_pub.publish(pose)
    rate.sleep()
```
Before entering *Offboard* mode, you must have already started streaming setpoints.
Otherwise the mode switch will be rejected. Here, `100` was chosen as an arbitrary amount.
```py
offb_set_mode = SetModeRequest()
offb_set_mode.custom_mode = 'OFFBOARD'
```

We prepare the message request used to set the custom mode to `OFFBOARD`.
A list of [supported modes](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) is available for reference.
```py
arm_cmd = CommandBoolRequest()
arm_cmd.value = True

last_req = rospy.Time.now()

while(not rospy.is_shutdown()):
    if(current_state.mode != "OFFBOARD" and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
        if(set_mode_client.call(offb_set_mode).mode_sent == True):
            rospy.loginfo("OFFBOARD enabled")
        
        last_req = rospy.Time.now()
    else:
        if(not current_state.armed and (rospy.Time.now() - last_req) > rospy.Duration(5.0)):
            if(arming_client.call(arm_cmd).success == True):
                rospy.loginfo("Vehicle armed")
        
            last_req = rospy.Time.now()

    local_pos_pub.publish(pose)

    rate.sleep()
```
The rest of the code is pretty self explanatory.
We attempt to switch to *Offboard* mode, after which we arm the quad to allow it to fly.
We space out the service calls by 5 seconds so to not flood the autopilot with the requests.
In the same loop, we continue sending the requested pose at the rate previously defined.

:::tip
This code has been simplified to the bare minimum for illustration purposes.
In larger systems, it is often useful to create a new thread which will be in charge of periodically publishing the setpoints.
:::
