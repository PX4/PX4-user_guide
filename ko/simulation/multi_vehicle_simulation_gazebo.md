---
canonicalUrl: https://docs.px4.io/main/ko/simulation/multi_vehicle_simulation_gazebo
---

# Multi-Vehicle Simulation with Gazebo

This topic explains how to simulate multiple UAV vehicles using Gazebo and SITL (Linux only). A different approach is used for simulation with and without ROS.

<a id="no_ros"></a>

## Multiple Vehicle with Gazebo (No ROS)

To simulate multiple iris or plane vehicles in Gazebo use the following commands in the terminal (from the root of the *Firmware* tree):
```
Tools/gazebo_sitl_multiple_run.sh [-m <model>] [-n <number_of_vehicles>] [-w <world>] [-s <script>] [-t <target>] [-l <label>]
```

- `<model>`: The [vehicle type/model](../simulation/gazebo_vehicles.md) to spawn, e.g.: `iris` (default), `plane`, `standard_vtol`.
- `<number_of_vehicles>`: The number of vehicles to spawn. Default is 3. Maximum is 255.
- `<world>`: The [world](../simulation/gazebo_worlds.md) that the vehicle should be spawned into, e.g.: `empty` (default)
- `<script>`: Spawn multiple vehicles of different types (overriding the values in `-m` and `-n`). For example:

   ```
   -s "iris:3,plane:2,standard_vtol:3"
   ```
   - Supported vehicle types are: `iris`, `plane`, `standard_vtol`.
   - The number after the colon indicates the number of vehicles (of that type) to spawn.
   - Maximum number of vehicles is 255.

 - `<target>`: build target, e.g: `px4_sitl_default` (default), `px4_sitl_rtps`
 - `<label>` : specific label for model, e.g: `rtps`

Each vehicle instance is allocated a unique MAVLink system id (1, 2, 3, etc.). Vehicle instances are accessed from sequentially allocated PX4 remote UDP ports: `14540` - `14548` (additional instances are all accessed using the same remote UDP port: `14549`).

:::note
The 255-vehicle limitation occurs because mavlink `MAV_SYS_ID` only supports 255 vehicles in the same network The `MAV_SYS_ID` and various UDP ports are allocated in the SITL rcS: [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS#L108-L112)
:::

<a id="video_mc"></a>

### Video: Multiple Multicopter (Iris)

@[youtube](https://youtu.be/Mskx_WxzeCk)

<a id="video_fw"></a>

### Video: Multiple Plane

@[youtube](https://youtu.be/aEzFKPMEfjc)

<a id="video_vtol"></a>

### Video: Multiple VTOL

@[youtube](https://youtu.be/lAjjTFFZebI)

<a id="with_dds"></a>

### Build and Test (RTPS/DDS)

To simulate multiple vehicles based on RTPS/DDS in Gazebo, use the `gazebo_sitl_multiple_run.sh` command in the terminal with the `-t px4_sitl_rtps` option from the root of the *PX4-Autopilot* tree (as described above). Here we will use the `-t px4_sitl_rtps` option, which sets that we will use RTPS for communicating with PX4 rather than the MAVLink Simulation API. This will build and run the `iris_rtps` model (the only model that is currently implemented for use with RTPS).

:::note
You will need to have installed *eProsima Fast DDS* and the `micrortps_agent` should be run in the different terminals for each vehicle. For more information see: [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md).
:::

To build an example setup, follow the steps below:

1. Clone the PX4/Firmware code, then build the SITL code:
   ```bash
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl_rtps gazebo
   ```

1. Build the `micrortps_agent`
   * To use the agent in ROS-independent RTPS/DDS applications, follow the [installation instructions here](../middleware/micrortps.md#agent-in-an-offboard-fast-dds-interface-ros-independent)
   * To use the agent in ROS 2, follow the [instructions here](../ros/ros2_comm.md)

1. Run `gazebo_sitl_multiple_run.sh`. For example, to spawn 4 vehicles, run:

   ```bash
   ./Tools/gazebo_sitl_multiple_run.sh -t px4_sitl_rtps -m iris -l rtps -n 4
   ```

:::note
Each vehicle instance is allocated a unique MAVLink system id (1, 2, 3, etc.), can receive data from a unique remote UDP port (2019, 2021, 2023, etc.), and transmit data to UDP port (2020, 2022, 2024, etc.).
:::

1. Run `micrortps_agent`. For example, to connect 4 vehicles, run:

   ```bash
   micrortps_agent -t UDP -r 2020 -s 2019 &
   micrortps_agent -t UDP -r 2022 -s 2021 &
   micrortps_agent -t UDP -r 2024 -s 2023 &
   micrortps_agent -t UDP -r 2026 -s 2025 &
   ```
:::note
In order to communicate with a specific instance of PX4 using ROS2, you must use the `-n <namespace>` option. For example, running `micrortps_agent -t UDP -r 2020 -s 2019 -n vhcl0` will result in the agent publishing all its topics with the namespace prefix `/vhcl0`. You can then subscribe and publish to just that vehicle's topics.
:::

<a id="with_ros"></a>

## Multiple Vehicles with ROS and Gazebo

This example demonstrates a setup that opens the Gazebo client GUI showing two Iris vehicles in an empty world. You can then control the vehicles with *QGroundControl* and MAVROS in a similar way to how you would manage a single vehicle.

### Required

* Current [PX4 ROS/Gazebo development environment](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)

:::note
At time of writing this is Ubuntu 18.04 with ROS Melodic/Gazebo 9. See also [Gazebo Simulation](../simulation/gazebo.md).
:::
* [MAVROS package](http://wiki.ros.org/mavros)
* a clone of latest [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot)

### Build and Test

To build an example setup, follow the step below:

1. Clone the PX4/PX4-Autopilot code, then build the SITL code
   ```
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl_default gazebo
   ```
1. Source your environment:
   ```
   source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd):$(pwd)/Tools/sitl_gazebo
   ```

1. Run launch file:
   ```
   roslaunch px4 multi_uav_mavros_sitl.launch
   ```

:::note
You can specify `gui:=false` in the above *roslaunch* to launch Gazebo without its UI.
:::

The tutorial example opens the Gazebo client GUI showing two Iris vehicles in an empty world.

You can control the vehicles with *QGroundControl* or MAVROS in a similar way to how you would manage a single vehicle:
* *QGroundControl* will have a drop-down to select the vehicle that is "in focus"
* MAVROS requires that you include the proper namespace before the topic/service path (e.g. for `<group ns="uav1">` you'll use */uav1/mavros/mission/push*).



### What's Happening?

For each simulated vehicle, the following is required:

* **Gazebo model**: This is defined as `xacro` file in `PX4-Autopilot/Tools/sitl_gazebo/models/rotors_description/urdf/<model>_base.xacro` see [here](https://github.com/PX4/sitl_gazebo/tree/02060a86652b736ca7dd945a524a8bf84eaf5a05/models/rotors_description/urdf). Currently, the model `xacro` file is assumed to end with **base.xacro**. This model should have an argument called  `mavlink_udp_port` which defines the UDP port on which gazebo will communicate with PX4 node. The model's `xacro` file will be used to generate an `urdf` model that contains UDP port that you select. To define the UDP port, set the `mavlink_udp_port` in the launch file for each vehicle, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L37) as an example.

:::note
If you are using the same vehicle model, you don't need a separate **`xacro`** file for each vehicle. The same **`xacro`** file is adequate.
:::

* **PX4 node**: This is the SITL PX4 app. It communicates with the simulator, Gazebo, through the same UDP port defined in the Gazebo vehicle model, i.e. `mavlink_udp_port`. To set the UDP port on the PX4 SITL app side, you need to set the `SITL_UDP_PRT` parameter in the startup file to match the `mavlink_udp_port` discussed previously, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L46). The path of the startup file in the launch file is generated based on the `vehicle` and `ID` arguments, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L36). The `MAV_SYS_ID` for each vehicle in the startup file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L4), should match the `ID` for that vehicle in the launch file [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L25). This will help make sure you keep the configurations consistent between the launch file and the startup file.

* **MAVROS node** \(optional\): A separate MAVROS node can be run in the launch file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L41), in order to connect to PX4 SITL app, if you want to control your vehicle through ROS. You need to start a MAVLink stream on a unique set of ports in the startup file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_1#L68). Those unique set of ports need to match those in the launch file for the MAVROS node, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L26).

The launch file `multi_uav_mavros_sitl.launch`does the following,

* loads a world in gazebo,
  ```
    <!-- Gazebo sim -->
    <include file="$(find gazebo_ros)/launch/empty_world.launch">
        <arg name="gui" value="$(arg gui)"/>
        <arg name="world_name" value="$(arg world)"/>
        <arg name="debug" value="$(arg debug)"/>
        <arg name="verbose" value="$(arg verbose)"/>
        <arg name="paused" value="$(arg paused)"/>
    </include>
  ```
* for each vehicle,

  * creates urdf model from xacro, loads gazebo model and runs PX4 SITL app instance
    ```
      <!-- PX4 SITL and vehicle spawn -->
      <include file="$(find px4)/launch/single_vehicle_spawn.launch">
          <arg name="x" value="0"/>
          <arg name="y" value="0"/>
          <arg name="z" value="0"/>
          <arg name="R" value="0"/>
          <arg name="P" value="0"/>
          <arg name="Y" value="0"/>
          <arg name="vehicle" value="$(arg vehicle)"/>
          <arg name="rcS" value="$(find px4)/posix-configs/SITL/init/$(arg est)/$(arg vehicle)_$(arg ID)"/>
          <arg name="mavlink_tcp_port" value="4560"/>
          <arg name="ID" value="$(arg ID)"/>
      </include>
    ```

  * runs a mavros node
    ```
      <!-- MAVROS -->
      <include file="$(find mavros)/launch/px4.launch">
          <arg name="fcu_url" value="$(arg fcu_url)"/>
          <arg name="gcs_url" value=""/>
          <arg name="tgt_system" value="$(arg ID)"/>
          <arg name="tgt_component" value="1"/>
      </include>
    ```

:::note
The complete block for each vehicle is enclosed in a set of `<group>` tags to separate the ROS namespaces of the vehicles.
:::

To add a third iris to this simulation there are two main components to consider:
* add `UAV3` to **multi_uav_mavros_sitl.launch**
  * duplicate the group of either existing vehicle (`UAV1` or `UAV2`)
  * increment the `ID` arg to `3`
  * select a different port for `mavlink_udp_port` arg for communication with Gazebo
  * selects ports for MAVROS communication by modifying both port numbers in the `fcu_url` arg
* create a startup file, and change the file as follows:
  * make a copy of an existing iris rcS startup file (`iris_1` or `iris_2`) and rename it `iris_3`
  * `MAV_SYS_ID` value to `3`
  * `SITL_UDP_PRT` value to match that of the `mavlink_udp_port` launch file arg
  * the first `mavlink start` port and the `mavlink stream` port values to the same values, which is to be used for QGC communication
  * the second `mavlink start` ports need to match those used in the launch file `fcu_url` arg

:::note
Be aware of which port is `src` and `dst` for the different endpoints.
:::


## Multiple Vehicles using SDF Models

This section shows how developers can simulate multiple vehicles using vehicle models defined in Gazebo SDF files (instead of using models defined in the ROS Xacro file, as discussed in the rest of this topic).

The steps are:

1. Install *xmlstarlet* from your Linux terminal:
   ```
   sudo apt install xmlstarlet
   ```
1. Use *roslaunch* with the **multi_uav_mavros_sitl_sdf.launch** launch file:
   ````
   roslaunch multi_uav_mavros_sitl_sdf.launch vehicle:=<model_file_name>
   ````

:::note
Note that the vehicle model file name argument is optional (`vehicle:=<model_file_name>`); if omitted the [plane model](https://github.com/PX4/sitl_gazebo/tree/master/models/plane) will be used by default.
:::

This method is similar to using the xacro except that the SITL/Gazebo port number is automatically inserted by _xmstarlet_ for each spawned vehicle, and does not need to be specified in the SDF file.

To add a new vehicle, you need to make sure the model can be found (in order to spawn it in Gazebo), and PX4 needs to have an appropriate corresponding startup script.

1. You can choose to do either of:
   * modify the **single_vehicle_spawn_sdf.launch** file to point to the location of your model by changing the line below to point to your model:
     ```
     $(find px4)/Tools/sitl_gazebo/models/$(arg vehicle)/$(arg vehicle).sdf
     ```
:::note
Ensure you set the `vehicle` argument even if you hardcode the path to your model.
:::
   * copy your model into the folder indicated above (following the same path convention).

1. The `vehicle` argument is used to set the `PX4_SIM_MODEL` environment variable, which is used by the default rcS (startup script) to find the corresponding startup settings file for the model. Within PX4 these startup files can be found in the **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/** directory. For example, here is the plane model's [startup script](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/airframes/1030_plane). For this to work, the PX4 node in the launch file is passed arguments that specify the *rcS* file (**etc/init.d/rcS**) and the location of the rootfs etc directory (`$(find px4)/build_px4_sitl_default/etc`). For simplicity, it is suggested that the startup file for the model be placed alongside PX4's in **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**.


## Additional Resources

* See [Simulation](../simulation/README.md) for a description of the UDP port configuration.
* See [URDF in Gazebo](http://gazebosim.org/tutorials/?tut=ros_urdf) for more information about spawning the model with xacro.
* See [RotorS](https://github.com/ethz-asl/rotors_simulator/tree/master/rotors_description/urdf) for more xacro models.
