---
canonicalUrl: https://docs.px4.io/main/zh/simulation/multi_vehicle_simulation_gazebo
---

# Gazebo 多机仿真

本文介绍如何使用 Gazebo 仿真器配合软件在环仿真进行多机仿真（仅适用于 Linux ）。 A different approach is used for simulation with and without ROS.


<a id="no_ros"></a>

## Multiple Vehicle with Gazebo (No ROS)

To simulate multiple iris or plane vehicles in Gazebo use the following commands in the terminal (from the root of the *Firmware* tree):
```
Tools/gazebo_sitl_multiple_run.sh [-m <model>] [-n <number_of_vehicles>] [-w <world>] [-s <script>] [-t <target>] [-l <label>]
```

- `<model>`: The [vehicle type/model](../simulation/gazebo_vehicles.md) to spawn, e.g.: `iris` (default), `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
- `<number_of_vehicles>`: The number of vehicles to spawn. Default is 3. Maximum is 255.
- `<world>`: The [world](../simulation/gazebo_worlds.md) that the vehicle should be spawned into, e.g.: `empty` (default)
- `<script>`: Spawn multiple vehicles of different types (overriding the values in `-m` and `-n`). 例如：

   ```
   -s "iris:3,plane:2,standard_vtol:3"
   ```
   - Supported vehicle types are: `iris`, `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
   - The number after the colon indicates the number of vehicles (of that type) to spawn.
   - Maximum number of vehicles is 255.

 - `<target>`: build target, e.g: `px4_sitl_default` (default), `px4_sitl_rtps`
 - `<label>` : specific label for model, e.g: `rtps`

Each vehicle instance is allocated a unique MAVLink system id (1, 2, 3, etc.). Vehicle instances are accessed from sequentially allocated PX4 remote UDP ports: `14540` - `14548` (additional instances are all accessed using the same remote UDP port: `14549`).

:::note
The 255-vehicle limitation occurs because mavlink `MAV_SYS_ID` only supports 255 vehicles in the same network The `MAV_SYS_ID` and various UDP ports are allocated in the SITL rcS: [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/init.d-posix/rcS#L108-L112)
:::

<a id="video_mc"></a>

### Video: Multiple Multicopter (Iris)

@https://youtu.be/Mskx_WxzeCk

<a id="video_fw"></a>

### Video: Multiple Plane

@{% endyoutube %}

<a id="video_vtol"></a>

### Video: Multiple VTOL

@{% youtube %}


<a id="with_dds"></a>

### Build and Test (RTPS/DDS)

To simulate multiple vehicles based on RTPS/DDS in Gazebo, use the `gazebo_sitl_multiple_run.sh` command in the terminal with the `-t px4_sitl_rtps` option from the root of the *PX4-Autopilot* tree (as described above). Here we will use the `-t px4_sitl_rtps` option, which sets that we will use RTPS for communicating with PX4 rather than the MAVLink Simulation API. This builds and runs the `iris` model and **by default also starts the microRTPS client** (you can change the model using the `-m` parameter).

:::note
You will need to have installed or *eProsima Fast DDS* or ROS 2 Foxy or above and the `micrortps_agent` should be run in the different terminals for each vehicle. For more information see: [RTPS/DDS Interface: PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md), for how to use the interaction with non-ROS2 DDS participant applications, or [ROS 2 User Guide (PX4-ROS 2 Bridge)](../ros/ros2_comm.md), for interfacing with ROS2 nodes.
:::

{% youtube %}

1. 克隆 PX4 固件源码, 然后编译 SITL 代码:
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
   ./Tools/gazebo_sitl_multiple_run.sh -t px4_sitl_rtps -m iris -n 4
   ```

   :::note
 Each vehicle instance is allocated a unique MAVLink system id (1, 2, 3, etc.), can receive data from a unique remote UDP port (2019, 2021, 2023, etc.), and transmit data to UDP port (2020, 2022, 2024, etc.).

:::

1. Run `micrortps_agent`. For example, to connect 4 vehicles, run:

   ```bash
   micrortps_agent -t UDP -r 2020 -s 2019 -n vhcl0 &
   micrortps_agent -t UDP -r 2022 -s 2021 -n vhcl1 &
   micrortps_agent -t UDP -r 2024 -s 2023 -n vhcl2 &
   micrortps_agent -t UDP -r 2026 -s 2025 -n vhcl3 &
   ```
:::note
In order to communicate with a specific instance of PX4 using ROS2, you must use the `-n <namespace>` option. For example, running `micrortps_agent -t UDP -r 2020 -s 2019 -n vhcl0` will result in the agent publishing all its topics with the namespace prefix `/vhcl0` (eg. `sensor_combined` data from `vhcl0` will be published on the topic `/vhcl0/fmu/sensor_combined/out`, while if one wants to send commands to the same vehicle, it has to publish to topic `/vhcl0/fmu/vehicle_command/in`). You can then subscribe and publish to just that vehicle's topics.
:::

<a id="with_ros"></a>

## Multiple Vehicles with ROS and Gazebo

This example demonstrates a setup that opens the Gazebo client GUI showing two Iris vehicles in an empty world. You can then control the vehicles with *QGroundControl* and MAVROS in a similar way to how you would manage a single vehicle.

### 仿真前准备

* Current [PX4 ROS/Gazebo development environment](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)

:::note
At time of writing this is Ubuntu 18.04 with ROS Melodic/Gazebo 9. See also [Gazebo Simulation](../simulation/gazebo.md).
:::
* [MAVROS package](http://wiki.ros.org/mavros)
* a clone of latest [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot)

### 开始仿真

{% endyoutube %}

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

1. 运行启动文件:
   ```
   roslaunch px4 multi_uav_mavros_sitl.launch
   ```

:::note
You can specify `gui:=false` in the above *roslaunch* to launch Gazebo without its UI.
:::

The tutorial example opens the Gazebo client GUI showing two Iris vehicles in an empty world.

You can control the vehicles with *QGroundControl* or MAVROS in a similar way to how you would manage a single vehicle:
* *QGroundControl* 中有一个下拉选项，你可以选择指定的飞行器。
* MAVROS 要求你在 topic/service 路径之前包含合适的命名空间，（例如，你会用到 */uav1/mavros/mission/push* ）。



### 发生了什么？

For each simulated vehicle, the following is required:

* **Gazebo model**: This is defined as `xacro` file in `PX4-Autopilot/Tools/sitl_gazebo/models/rotors_description/urdf/<model>_base.xacro` see [here](https://github.com/PX4/sitl_gazebo/tree/02060a86652b736ca7dd945a524a8bf84eaf5a05/models/rotors_description/urdf). Currently, the model `xacro` file is assumed to end with **base.xacro**. 此模型应该有一个名为 `mavlink_udp_port` 的参数, 该参数定义了与 px4 节点通信的 udp 端口。 模型的 `xacro` 文件将用于生成包含您选择的 udp 端口的 `urdf` 模型。 若要定义 udp 端口，请在每个飞行器的启动文件中设置 `mavlink_udp_port`，请参阅例子[here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L37)。

:::note
If you are using the same vehicle model, you don't need a separate **`xacro`** file for each vehicle. The same **`xacro`** file is adequate.
:::

* **PX4 node**: This is the SITL PX4 app. It communicates with the simulator, Gazebo, through the same UDP port defined in the Gazebo vehicle model, i.e. `mavlink_udp_port`. 要在 px4 sitl 应用程序端设置 udp 端口, 您需要在启动文件中设置 `SITL_UDP_PRT` 参数, 以匹配前面讨论的 `mavlink_udp_port`, 请参阅 [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L46)。 启动文件中的开始文件路径由参数 `vehicle`和`ID`产生，参考[这里](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L36)。 The `MAV_SYS_ID` for each vehicle in the startup file, see [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L4), should match the `ID` for that vehicle in the launch file [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L25). 这样能够帮助你确保启动文件和开始文件中的设置相同。

* **MAVROS node**（可选）: 如果要通过 ros 控制车辆, 可以在启动文件中运行一个单独的 mavros 节点， 请参阅 [here](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L41), 以便连接到 px4 sitl 应用程序。 您需要在启动文件中一些特殊的端口上启动 mavlink 流, 请参阅 [这里](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_1#L68)。 这些特殊端口需要与launch文件中为MAVROS节点设置的相符合。参考[这里](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L26)。

构建一个示例设置, 请按照以下步骤操作:

* 在gazebo中加载一个世界
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
* 对于每个飞行器来说

  * 从 xacro 创建 urdf 模型, 加载gazebo模型并运行 px4 sitl 应用程序实例
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

  * 运行mavros节点
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
* 把`UAV3` 添加到**multi_uav_mavros_sitl.launch**
  * 复制已经存在的四旋翼(`UAV1` 或者 `UAV2`)
  * 把 `ID` 改为 `3`
  * 与gazebo的通信，选择一个不同的 `mavlink_udp_port`端口
  * MAVROS通信端口选择是通过在`fcu_url` 中修改两个端口号。
* 创建一个开始文件，并按照如下方式修改：
  * 复制已存在的iris rcs启动文件，(`iris_1` 或 `iris_2`) ，重命名为`iris_3`
  * `MAV_SYS_ID` 值改为`3`
  * `SITL_UDP_PRT` 的值与 `mavlink_udp_port`相一致。
  * 第一个`mavlink start` 端口和`mavlink stream`端口值设置为相同值，用于和QGC通信。
  * 第二个`mavlink start` 端口值应与启动文件 `fcu_url` 中的值一致。

:::note
Be aware of which port is `src` and `dst` for the different endpoints.
:::


## Multiple Vehicles using SDF Models

然后, 你可以使用 *QGroundControl* 和 MAVROS 控制多机，控制方式与单机类似。

对每一个仿真的飞行器，有如下要求：

1. Install *xmlstarlet* from your Linux terminal:
   ```
   sudo apt install xmlstarlet
   ```
1. Use *roslaunch* with the **multi_uav_mavros_sitl_sdf.launch** launch file: ```` roslaunch multi_uav_mavros_sitl_sdf.launch vehicle:=<model_file_name>
   ```

   :::note
   Note that the vehicle model file name argument is optional (`vehicle:=<model_file_name>`); if omitted the [plane model](https://github.com/PX4/sitl_gazebo/tree/master/models/plane) will be used by default.

:::

This method is similar to using the xacro except that the SITL/Gazebo port number is automatically inserted by _xmstarlet_ for each spawned vehicle, and does not need to be specified in the SDF file.

要在此模拟中添加第三个iris四旋翼, 需要考虑两个主要部分：

1. You can choose to do either of:
   * modify the **single_vehicle_spawn_sdf.launch** file to point to the location of your model by changing the line below to point to your model:
     ```
$(find px4)/Tools/sitl_gazebo/models/$(arg vehicle)/$(arg vehicle).sdf ``` :::note Ensure you set the `vehicle` argument even if you hardcode the path to your model.
:::
   * copy your model into the folder indicated above (following the same path convention).

1. The `vehicle` argument is used to set the `PX4_SIM_MODEL` environment variable, which is used by the default rcS (startup script) to find the corresponding startup settings file for the model. Within PX4 these startup files can be found in the **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/** directory. For example, here is the plane model's [startup script](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/ROMFS/px4fmu_common/init.d-posix/airframes/1030_plane). For this to work, the PX4 node in the launch file is passed arguments that specify the *rcS* file (**etc/init.d/rcS**) and the location of the rootfs etc directory (`$(find px4)/build_px4_sitl_default/etc`). For simplicity, it is suggested that the startup file for the model be placed alongside PX4's in **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**.


## 其他资源

* 更多UDP端口配置请参考 [Simulation](../simulation/README.md)。
* See [URDF in Gazebo](http://wiki.ros.org/urdf/Tutorials/Using%20a%20URDF%20in%20Gazebo) for more information about spawning the model with xacro.
* 更过xacro模型请参考[RotorS](https://github.com/ethz-asl/rotors_simulator/tree/master/rotors_description/urdf)。
