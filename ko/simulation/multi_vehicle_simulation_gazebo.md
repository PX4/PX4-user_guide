---
canonicalUrl: https://docs.px4.io/main/ko/simulation/multi_vehicle_simulation_gazebo
---

# Gazebo 다중 차량 시뮬레이션

이 항목에서는 Gazebo와 SITL(Linux만 해당)을 사용하여 다중 UAV 차량 시뮬레이션 방법을 설명합니다. ROS 유무에 따라 시뮬레이션 접근 방식이 달라집니다.


<a id="no_ros"></a>

## 다중 차량 Gazebo (ROS 없음)

Gazebo에서 다중 차량을 시뮬레이션하려면, 터미널에서 다음 명령어를 입력하십시오.(*펌웨어* 트리 루트에서).
```
Tools/gazebo_sitl_multiple_run.sh [-m <model>] [-n <number_of_vehicles>] [-w <world>] [-s <script>] [-t <target>] [-l <label>]
```

- `<model>`: The [vehicle type/model](../simulation/gazebo_vehicles.md) to spawn, e.g.: `iris` (default), `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
- `<number_of_vehicles>`: 실행할 차량의 수입니다. 기본값은 3. 최대값은 255.
- `<world>`: 차량이 생성되어야 하는 [세계](../simulation/gazebo_worlds.md), 예: `empty` (기본값)
- `<script>`: 여러 유형의 다중 차량을 생성합니다(`-m` 및 `-n`의 값 무시). 예:

   ```
   -s "iris:3,plane:2,standard_vtol:3"
   ```
   - Supported vehicle types are: `iris`, `plane`, `standard_vtol`, `rover`, `r1_rover` `typhoon_h480`.
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

### 빌드 및 테스트

예제 설정을 빌드하려면 아래 단계를 따라 진행하십시오.

1. PX4/PX4-Autopilot 코드를 복제한 다음, SITL 코드를 빌드합니다.
   ```
   cd Firmware_clone
   git submodule update --init --recursive
   DONT_RUN=1 make px4_sitl_default gazebo
   ```
1. 환경 설정을 업데이트합니다.
   ```
   source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:$(pwd):$(pwd)/Tools/sitl_gazebo
   ```

1. 실행 파일을 실행합니다.
   ```
   roslaunch px4 multi_uav_mavros_sitl.launch
   ```

:::note
위의 *roslaunch*에서 `gui:=false`를 지정하여 UI 없이 Gazebo를 시작할 수 있습니다.
:::

튜토리얼 예제는 빈 세계에서 두 개의 Iris 차량을 출력하는 Gazebo 클라이언트 GUI를 오픈합니다.

단일 차량을 관리하는 것과 유사한 방식으로 *QGroundControl* 또는 MAVROS를 사용하여 차량을 제어할 수 있습니다.
* *QGroundControl*에는 "초점에 있는" 차량을 선택하는 드롭다운 메뉴가 있습니다.
* MAVROS에서는 주제/서비스 경로 앞에 적절한 네임스페이스를 포함하여야 합니다(예: `<group ns="uav1">`의 경우 */uav1/mavros/mission/push* 사용).



### 무슨 일이 일어나고 있나요?

각 시뮬레이션 차량에 대하여, 다음 사항들이 필요합니다.

* **Gazebo 모델**: `PX4-Autopilot/Tools/sitl_gazebo/models/rotors_description/urdf/<model>_base.xacro`에서 `xacro` 파일로 정의됩니다. [여기](https://github.com/PX4/sitl_gazebo/tree/02060a86652b736ca7dd945a524a8bf84eaf5a05/models/rotors_description/urdf)를 참고하십시오. 현재 모델 `xacro` 파일은 **base.xacro**로 끝나는 것으로 가정합니다. 이 모델에는 Gazebo가 PX4 노드와 통신할 UDP 포트를 정의하는 `mavlink_udp_port`라는 인수가 있어야 합니다. 모델의 `xacro` 파일은 선택한 UDP 포트가 포함된 `urdf` 모델을 생성하는 데 사용됩니다. UDP 포트를 정의하려면 각 차량의 실행 파일에서 `mavlink_udp_port`를 설정합니다. 예제는 [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L37)를 참고하십시오.

:::note
동일한 차량 모델을 사용하는 경우에는, 각 차량에 대해 별도의 **`xacro`** 파일이 필요하지 않습니다. 동일한 **`xacro`** 파일이면 충분합니다.
:::

* **PX4 노드**: SITL PX4 앱입니다. Gazebo 차량 모델에 정의된 것과 동일한 UDP 포트(예: `mavlink_udp_port`)로 시뮬레이터 Gazebo와 통신합니다. PX4 SITL 앱 측에서 UDP 포트를 설정하려면, 앞서 논의한 `mavlink_udp_port`와 일치하도록 시작 파일의 `SITL_UDP_PRT` 매개변수를 설정합니다. [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L46)를 참고하십시오. 시작 파일의 시작 파일 경로는 `차량` 및 `ID` 인수를 기반으로 생성됩니다. [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L36)를 참고하십시오. 시작 파일의 각 차량에 대한 `MAV_SYS_ID`([여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_2#L4) 참고)는 [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L25)의 시작 파일에 있는 해당 차량의 `ID`와 일치하여야 합니다. 이렇게 하면 시작 파일과 시작 파일 간에 구성을 일관되게 유지할 수 있습니다.

* **MAVROS 노드** \(선택 사항\): 실행 파일에서 별도의 MAVROS 노드를 실행할 수 있습니다. 원하는 경우 [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L41)를 참고하여 PX4 SITL 앱에 연결하세요. ROS를 통해 차량을 제어합니다. 시작 파일의 고유한 포트 집합에서 MAVLink 스트림을 시작하여야 합니다. [여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/posix-configs/SITL/init/ekf2/iris_1#L68)를 참고하십시오. 이러한 고유한 포트 세트는 MAVROS 노드의 시작 파일에 있는 포트 세트와 일치하여야 합니다([여기](https://github.com/PX4/PX4-Autopilot/blob/4d0964385b84dc91189f377aafb039d10850e5d6/launch/multi_uav_mavros_sitl.launch#L26) 참고).

시작 파일 `multi_uav_mavros_sitl.launch`는 다음의 내용을 실행합니다.

* Gazebo에 세계를 로드합니다.
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
* 각 차량에 대하여

  * xacro에서 urdf 모델을 생성하고, 가제보 모델을 로드하고, PX4 SITL 앱 인스턴스를 실행합니다.
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

  * mavros 노드를 실행합니다.
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
각 차량의 완전한 블록은 차량의 ROS 네임스페이스를 구분하기 위해 `<group>` 태그 세트로 묶여 있습니다.
:::

이 시뮬레이션에 세 번째 iris를 추가하려면, 두 가지 주요 구성 요소를 고려하여야 합니다.
* **multi_uav_mavros_sitl.launch**에 `UAV3`를 추가합니다.
  * 기존 차량(`UAV1` 또는 `UAV2`)의 그룹 복제
  * `ID` 인수를 `3`으로 증가
  * Gazebo와의 통신을 위해 `mavlink_udp_port` 인수에 대해 다른 포트를 선택하십시오.
  * `fcu_url` 인수에서 두 포트 번호를 모두 수정하여 MAVROS 통신용 포트를 선택합니다.
* 시작 파일을 만들고 파일을 다음과 같이 변경합니다.
  * 기존 iris rcS 시작 파일(`iris_1` 또는 `iris_2`)의 복사본을 만들고, 이름을 `iris_3`으로 변경합니다.
  * `MAV_SYS_ID` 값을 `3`으로 변경
  * `mavlink_udp_port` 실행 파일 인수와 일치하는 `SITL_UDP_PRT` 값
  * 첫 번째 `mavlink 시작` 포트와 `mavlink 스트림` 포트 값을 QGC 통신에 사용되는 동일한 값으로 설정
  * 두 번째 `mavlink 시작` 포트는 시작 파일 `fcu_url` 인수에 사용된 포트와 일치하여야 합니다.

:::note
서로 다른 끝점에 대해 어떤 포트가 `src` 및 `dst`인지 확인하십시오.
:::


## SDF 모델의 다중 차량

이 섹션에서는 개발자가 Gazebo SDF 파일에 정의된 차량 모델을 사용하여 여러 차량을 시뮬레이션할 수 있는 방법을 설명합니다(이 항목의 나머지 부분에서 설명하는 것처럼 ROS Xacro 파일에 정의된 모델을 사용하는 대신).

단계는 다음과 같습니다:

1. Linux 터미널에서 *xmlstarlet*을 설치합니다.
   ```
   sudo apt install xmlstarlet
   ```
1. **multi_uav_mavros_sitl_sdf.launch** 실행 파일과 함께 *roslaunch*를 사용합니다.<model_file_name>
   ```

   :::note
차량 모델 파일 이름 인수는 선택 사항입니다(<code>vehicle:=<model_file_name></code>). 생략하면 기본적으로 <a href="https://github.com/PX4/sitl_gazebo/tree/master/models/plane">평면 모델</a>이 사용됩니다.
   이 방법은 생성된 각 차량에 대해 SITL/Gazebo 포트 번호가 <em x-id="4">xmstarlet</em>에 의해 자동으로 삽입되고 SDF 파일에 지정할 필요가 없다는 점을 제외하고 xacro를 사용하는 것과 유사합니다.

새 차량을 추가하려면 모델을 검색 여부를 확인하여야 하고(Gazebo에서 생성하기 위해), PX4에 적절한 시작 스크립트가 있어야 합니다.

1. 모델을 지정하도록 아래 줄을 변경하여 <strong x-id="1">single_vehicle_spawn_sdf.launch</strong> 파일을 수정하여 모델의 위치를 가리키도록 합니다.
     ```
). 생략하면 기본적으로 [평면 모델](https://github.com/PX4/sitl_gazebo/tree/master/models/plane)이 사용됩니다.
      이 방법은 생성된 각 차량에 대해 SITL/Gazebo 포트 번호가 _xmstarlet_에 의해 자동으로 삽입되고 SDF 파일에 지정할 필요가 없다는 점을 제외하고 xacro를 사용하는 것과 유사합니다.
   
   새 차량을 추가하려면 모델을 검색 여부를 확인하여야 하고(Gazebo에서 생성하기 위해), PX4에 적절한 시작 스크립트가 있어야 합니다.
   
   1. 모델을 지정하도록 아래 줄을 변경하여 **single_vehicle_spawn_sdf.launch** 파일을 수정하여 모델의 위치를 가리키도록 합니다.
   </code>
:::note
모델 경로를 하드코딩한 경우에도, `차량` 인수를 설정하여야 합니다.
:::
   * 모델을 위에 표시된 폴더에 복사합니다(동일한 경로 규칙에 따라).

1. `vehicle` 인수는 `PX4_SIM_MODEL` 환경 변수를 설정에 사용되며, 기본 rcS(시작 스크립트)에서 모델에 해당하는 시작 설정 파일을 찾는 데 사용됩니다. PX4 내에서 이러한 시작 파일은 **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/** 디렉토리에서 찾을 수 있습니다. `vehicle` 인수는 `PX4_SIM_MODEL` 환경 변수를 설정에 사용되며, 기본 rcS(시작 스크립트)에서 모델에 해당하는 시작 설정 파일을 찾는 데 사용됩니다. 이것이 작동하려면 시작 파일의 PX4 노드에 *rcS* 파일(**etc/init.d/rcS**)과 rootfs 디렉토리(`$(find px4)/build_px4_sitl_default/etc`) 등의 위치를 지정하는 인수가 전달됩니다. 단순화를 위하여 모델의 시작 파일을 **PX4-Autopilot/ROMFS/px4fmu_common/init.d-posix/**에서 PX4와 함께 배치하는 것이 좋습니다.


## 추가 자료

* UDP 포트 설정은 [시뮬레이션](../simulation/README.md)을 참고하십시오.
* See [URDF in Gazebo](http://wiki.ros.org/urdf/Tutorials/Using%20a%20URDF%20in%20Gazebo) for more information about spawning the model with xacro.
* 더 많은 xacro 모델은 [RotorS](https://github.com/ethz-asl/rotors_simulator/tree/master/rotors_description/urdf)를 참고하십시오.
