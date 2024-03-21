# MAVROS _Offboard_ control example (Python)

Цей посібник показує основи _OFFBOARD_ контроль за MAVROS Python, використовуючи Iris quadcopter, імітований в [Gazebo Classic](../sim_gazebo_classic/README.md). Він надає покрокові інструкції, що демонструють як почати розробку програм для керування засобом та виконання коду в симуляції.

У кінці посібника ви повинні побачити таку ж поведінку, як і в нижченаведеному відео, повільний зліт на висоту 2 метри.

:::warning
_OFFBOARD_ керування небезпечно. If you are operating on a real vehicle be sure to have a way of gaining back manual control in case something goes wrong.
:::

:::tip
This example uses Python. Other examples in Python can be found here: [integrationtests/python_src/px4_it/mavros](https://github.com/PX4/PX4-Autopilot/tree/main/integrationtests/python_src/px4_it/mavros).
:::

<a id="offb_video"></a>

<video width="100%" autoplay="true" controls="true">
 <source src="../../assets/simulation/gazebo_classic/gazebo_offboard.webm" type="video/webm">
</video>

## Creating the ROS Package

1. Open the terminal and go to `~/catkin_ws/src` directory

   ```sh
   
   
   ```

2. In the `~/catkin_ws/src` directory create a new package named `offboard_py` (in this case) with the `rospy` dependency:

   ```sh
   
   ```

3. Build the new package in the `~/catkin_ws/` directory:

   ```sh
    # Assuming previous directory to be ~/catkin_ws/src
   catkin build
   source devel/setup.bash
   ```

4. You should now be able to cd into the package by using:

   ```sh
   
   ```

5. To store your Python files, create a new folder called `/scripts` on the package:

   ```sh
   
   ```

## Code

After creating the ROS package and scripts folder you are ready to start your Python script. Inside the scripts folder create the `offb_node.py` file and give it executable permissions:

```sh

```

After that, open `offb_node.py` file and paste the following code:

```py
"""
 * File: offb_node.py
 * Stack and tested in Gazebo Classic 9 SITL
"""

#! 

```

## Пояснення коду

The `mavros_msgs` package contains all of the custom messages required to operate services and topics provided by the MAVROS package. All services and topics as well as their corresponding message types are documented in the [mavros wiki](http://wiki.ros.org/mavros).

```py

```

We create a simple callback which will save the current state of the autopilot. This will allow us to check connection, arming and _OFFBOARD_ flags.:

```py

```

We instantiate a publisher to publish the commanded local position and the appropriate clients to request arming and mode change. Note that for your own system, the "mavros" prefix might be different as it will depend on the name given to the node in it's launch file.

```py

```

PX4 has a timeout of 500ms between two _OFFBOARD_ commands. If this timeout is exceeded, the commander will fall back to the last mode the vehicle was in before entering _OFFBOARD_ mode. This is why the publishing rate **must** be faster than 2 Hz to also account for possible latencies. This is also the same reason why it is **recommended to enter _OFFBOARD_ mode from _Position_ mode**, this way if the vehicle drops out of _OFFBOARD_ mode it will stop in its tracks and hover.

Here we set the publishing rate appropriately:

```py
# Setpoint publishing MUST be faster than 2Hz
rate = rospy.Rate(20)
```

Before publishing anything, we wait for the connection to be established between MAVROS and the autopilot. This loop should exit as soon as a heartbeat message is received.

```py
# Wait for Flight Controller connection
while(not rospy.is_shutdown() and not current_state.connected):
    rate.sleep()
```

Even though PX4 operates in the aerospace NED coordinate frame, MAVROS translates these coordinates to the standard ENU frame and vice-versa. This is why we set `z` to positive 2:

```py

```

Before entering _OFFBOARD_ mode, you must have already started streaming setpoints. Otherwise the mode switch will be rejected. Below, `100` was chosen as an arbitrary amount.

```py
# Send a few setpoints before starting
for i in range(100):
    if(rospy.is_shutdown()):
        break

    local_pos_pub.publish(pose)
    rate.sleep()
```

We prepare the message request used to set the custom mode to `OFFBOARD`. A list of [supported modes](http://wiki.ros.org/mavros/CustomModes#PX4_native_flight_stack) is available for reference.

```py

```

The rest of the code is largely self explanatory. We attempt to switch to _Offboard_ mode, after which we arm the quad to allow it to fly. We space out the service calls by 5 seconds so to not flood the autopilot with the requests. In the same loop, we continue sending the requested pose at the rate previously defined.

```py

```

:::tip
This code has been simplified to the bare minimum for illustration purposes.
In larger systems, it is often useful to create a new thread which will be in charge of periodically publishing the setpoints.
:::

## Creating the ROS launch file

In your `offboard_py` package, create another folder inside the `~/catkin_ws/src/offboard_py/src` directory named `launch`. This is where your launch files for the package will be stored. After that, create your first launch file, in this case we will call it `start_offb.launch`.

```sh

```

For the `start_offb.launch` copy the following code:

```xml

```

As you can see, the `mavros_posix_sitl.launch` file is included. This file is responsible for launching MAVROS, the PX4 SITL, the Gazebo Classic Environment and for spawning a vehicle in a given world (for further information see the file [here](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch)).

:::tip
The `mavros_posix_sitl.launch` file takes several arguments that can be set according to your preferences such as the vehicle to spawn or the Gazebo Classic world (refer to [here](https://github.com/PX4/PX4-Autopilot/blob/main/launch/mavros_posix_sitl.launch)) for a complete list).

You can override the default value of these arguments defined in `mavros_posix_sitl.launch` by declaring them inside the _include_ tags. As an example, if you wanted to spawn the vehicle in the `warehouse.world`, you would write the following:

```xml

```

:::

## Launching your script

If everything is done, you should now be able to launch and test your script.

In the terminal write:

```sh

```

You should now see the PX4 firmware initiating and the Gazebo Classic application running. After the _OFFBOARD_ mode is set and the vehicle is armed, the behavior shown in the [video](#offb_video) should be observed.

:::warning
It is possible that when running the script an error appears saying:

> Resource not found: px4 ROS path [0] = ... ...

This means that PX4 SITL was not included in the path. To solve this add these lines at the end of the `.bashrc` file:

```sh

```

Now in the terminal, go to the home directory and run the following command to apply the changes above to the current terminal:

```sh

```

After this step, every time you open a new terminal window you should not have to worry about this error anymore. If it appears again, a simple `source .bashrc` should fix it. This solution was obtained from this [issue](https://github.com/mzahana/px4_fast_planner/issues/4) thread, where you can get more information about the problem.
:::
