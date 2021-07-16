# Gazebo 다중 차량 시뮬레이션

이 항목에서는 Gazebo와 SITL(Linux만 해당)을 사용하여 다중 UAV 차량 시뮬레이션 방법을 설명합니다. ROS 유무에 따라 시뮬레이션 접근 방식이 달라집니다.

<a id="no_ros"></a>

## 다중 차량 Gazebo (ROS 없음)

Gazebo에서 다중 차량을 시뮬레이션하려면, 터미널에서 다음 명령어를 입력하십시오.(*펌웨어* 트리 루트에서).
```
Tools/gazebo_sitl_multiple_run.sh [-m <model>] [-n <number_of_vehicles>] [-w <world>] [-s <script>] [-t <target>] [-l <label>]
```

- `<model>`: 실행할 [차량 유형/모델](../simulation/gazebo_vehicles.md), 예: `iris`(기본값), `plane`, `standard_vtol`
- `<number_of_vehicles>`: 실행할 차량의 수입니다. 기본값은 3. 최대값은 255.
- `<world>`: 차량이 생성되어야 하는 [세계](../simulation/gazebo_worlds.md), 예: `empty` (기본값)
- `<script>`: 여러 유형의 다중 차량을 생성합니다(`-m` 및 `-n`의 값 무시). 예:

   ```
   -s "iris:3,plane:2,standard_vtol:3"
   ```
   - 지원되는 차량 유형은 `iris`, `plane`, `standard_vtol`입니다.
   - 콜론 뒤의 숫자는 실행할 차량(해당 유형) 대수를 나타냅니다.
   - 최대 차량 대수는 255대입니다.

 - `<target>`: 빌드 대상, 예: `px4_sitl_default`(기본값), `px4_sitl_rtps`
 - `<label>` : 모델에 대한 특정 레이블, 예: `rtps`

각 차량 인스턴스에는 고유한 MAVLink 시스템 ID(1, 2, 3 등)가 할당됩니다. 차량 인스턴스는 순차적으로 할당된 PX4 원격 UDP 포트: `14540` - `14548`에서 액세스됩니다(추가 인스턴스는 모두 동일한 원격 UDP 포트를 사용하여 액세스: `14549`)

:::note
255대의 차량 제한은 mavlink `MAV_SYS_ID`가 동일한 네트워크에서 255대의 차량만 지원하기 때문입니다. `MAV_SYS_ID` 및 다양한 UDP 포트는 SITL rcS: [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS#L108-L112)에 할당됩니다.
:::

<a id="video_mc"></a>

### 비디오: 다중 멀티콥터(Iris)

@[유투브](https://youtu.be/Mskx_WxzeCk)

<a id="video_fw"></a>

### 비디오: 다중 고정익

@[유투브](https://youtu.be/aEzFKPMEfjc)

<a id="video_vtol"></a>

### 비디오: 다중 VTOL

@[유투브](https://youtu.be/lAjjTFFZebI)

<a id="with_dds"></a>

### 빌드 및 테스트(RTPS/DDS)

Gazebo에서 RTPS/DDS를 기반으로 여러 차량을 시뮬레이션하려면 터미널에서 *PX4-Autopilot* 트리(위에 설명된 대로) 루트의 `-t px4_sitl_rtps` 옵션과 함께 `gazebo_sitl_multiple_run.sh` 명령을 사용합니다. 여기에서 `-t px4_sitl_rtps` 옵션을 사용합니다. 이 옵션은 MAVLink 시뮬레이션 API가 아닌 PX4와 통신하기 위해 RTPS를 사용하도록 설정합니다. 그러면 `iris_rtps` 모델(현재 RTPS와 함께 사용하기 위해 구현된 유일한 모델)이 빌드되고 실행됩니다.

:::note
*eProsima Fast DDS*가 설치되어 있어야 하고, `micrortps_agent`가 각 차량의 다른 터미널에서 실행되어야 합니다. 자세한 내용은 [RTPS/DDS 인터페이스: PX4-고속 RTPS(DDS) 브리지](../middleware/micrortps.md)를 참고하십시오.
:::

예제 설정을 빌드하려면 아래 단계를 따라 진행하십시오.

1. PX4/펌웨어 코드를 복제한 다음, SITL 코드를 빌드합니다.
   ```bash
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl_rtps gazebo
   ```

1. `micrortps_agent`를 빌드합니다.
   * ROS 독립적인 RTPS/DDS 애플리케이션에서 에이전트를 사용하려면 [여기에 있는 설치 방법](../middleware/micrortps.md#agent-in-an-offboard-fast-dds-interface-ros-independent)을 참고하십시오.
   * ROS 2에서 에이전트를 사용하려면, [이 설치 방법](../ros/ros2_comm.md)을 참고하십시오.

1. `gazebo_sitl_multiple_run.sh`를 실행합니다. 예를 들어 4대의 차량을 생성하려면, 다음을 명령어를 실행하십시오.

   ```bash
   ./Tools/gazebo_sitl_multiple_run.sh -t px4_sitl_rtps -m iris -l rtps -n 4
   ```

:::note
각 차량 인스턴스에는 고유한 MAVLink 시스템 ID(1, 2, 3 등)가 할당되고, 고유한 원격 UDP 포트(2019, 2021, 2023 등)에서 데이터를 수신하고, UDP 포트(2020, 2022, 2024 등)에서 데이터를 전송합니다.
:::

1. `micrortps_agent`를 실행합니다. 예를 들어 4대의 차량을 연결하려면, 다음을 명령어를 실행하십시오.

   ```bash
   micrortps_agent -t UDP -r 2020 -s 2019 &
   micrortps_agent -t UDP -r 2022 -s 2021 &
   micrortps_agent -t UDP -r 2024 -s 2023 &
   micrortps_agent -t UDP -r 2026 -s 2025 &
   ```
   :::note ROS2를 사용하여 PX4의 특정 인스턴스와 통신하려면 `-n <namespace>` 옵션을 사용합니다. 예를 들어, `micrortps_agent -t UDP -r 2020 -s 2019 -n vhcl0`을 실행하면 에이전트가 네임스페이스 접두사 `/vhcl0`이 있는 모든 주제를 게시합니다. 그런 다음 해당 차량의 주제만 구독하고 게시할 수 있습니다.
:::

<a id="with_ros"></a>

## 다중 차량 ROS 와 Gazebo

이 예제는 빈 세계에서 두 개의 Iris 차량을 출력하는 Gazebo 클라이언트 GUI를 여는 설정을 설명합니다. 그런 다음 단일 차량을 관리하는 것과 유사한 방식으로 *QGroundControl* 및 MAVROS를 사용하여 차량을 제어할 수 있습니다.

### 필수 사항

* 현 [PX4 ROS/Gazebo 개발 환경](../dev_setup/dev_env_linux_ubuntu.md#rosgazebo)

:::note
작성 당시에는  ROS Melodic/Gazebo 9가 포함된 Ubuntu 18.04을 사용하였습니다. [가제보 시뮬레이션](../simulation/gazebo.md)도 참고하십시오.
:::
* [MAVROS 패키지](http://wiki.ros.org/mavros)
* 최신 [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) 저장소 복제

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
