# MAVROS _Offboard_ control example (C++)

This tutorial shows the basics of _Offboard_ control with MAVROS, using an Iris quadcopter simulated in Gazebo Classic/SITL. At the end of the tutorial, you should see the same behaviour as in the video below, i.e. a slow takeoff to an altitude of 2 meters.

:::warning
_Offboard_ control is dangerous. If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::tip
This example uses C++. A very similar example for Python can be found in [ROS/MAVROS Offboard Example (Python)](../ros/mavros_offboard_python.md) (also see the examples in [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/main/integrationtests/python_src/px4_it/mavros)).
:::

<video width="100%" autoplay="true" controls="true">
  <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## Code

Create the `offb_node.cpp` file in your ROS package (by also adding it to your `CMakeList.txt` so it is compiled), and paste the following inside it:

```cpp


```

## Code explanation

```cpp

```

The `mavros_msgs` package contains all of the custom messages required to operate services and topics provided by the MAVROS package. All services and topics as well as their corresponding message types are documented in the [mavros wiki](http://wiki.ros.org/mavros).

```cpp

```

We create a simple callback which will save the current state of the autopilot. This will allow us to check connection, arming and _Offboard_ flags.

```cpp

```

We instantiate a publisher to publish the commanded local position and the appropriate clients to request arming and mode change. Note that for your own system, the "mavros" prefix might be different as it will depend on the name given to the node in it's launch file.

```cpp

```

PX4 has a timeout of 500ms between two _Offboard_ commands. If this timeout is exceeded, the commander will fall back to the last mode the vehicle was in before entering _Offboard_ mode. This is why the publishing rate **must** be faster than 2 Hz to also account for possible latencies. This is also the same reason why it is recommended to enter _Offboard_ mode from _Position_ mode, this way if the vehicle drops out of _Offboard_ mode it will stop in its tracks and hover.

```cpp

```

Before publishing anything, we wait for the connection to be established between MAVROS and the autopilot. This loop should exit as soon as a heartbeat message is received.

```cpp

```

Even though the PX4 Pro Flight Stack operates in the aerospace NED coordinate frame, MAVROS translates these coordinates to the standard ENU frame and vice-versa. This is why we set `z` to positive 2.

```cpp

```

Before entering _Offboard_ mode, you must have already started streaming setpoints. Otherwise the mode switch will be rejected. Here, `100` was chosen as an arbitrary amount.

```cpp

```

We set the custom mode to `OFFBOARD`. A list of [supported modes](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) is available for reference.

```cpp

```

The rest of the code is pretty self explanatory. We attempt to switch to _Offboard_ mode, after which we arm the quad to allow it to fly. We space out the service calls by 5 seconds so to not flood the autopilot with the requests. In the same loop, we continue sending the requested pose at the appropriate rate.

:::tip
This code has been simplified to the bare minimum for illustration purposes.
In larger systems, it is often useful to create a new thread which will be in charge of periodically publishing the setpoints.
:::
