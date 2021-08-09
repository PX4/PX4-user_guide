# ROS 2 Bridge를 통한 ROS(1)(사용 설명서)

이 항목에서는 [ROS 2](../ros/ros2.md)로 브리지하여, PX4와 함께 ROS(1)를 사용하는 방법을 설명합니다.

필요한 소프트웨어를 설치하고 ROS(1) 애플리케이션을 구축하는 방법과 ROS-ROS2-PX4 아키텍처에 대한 개요를 설명합니다. 또한, ROS 2 및 ROS 1 작업 공간을 동시에 설정하는 방법도 설명합니다.

:::note
일반적으로 MAVLink에서 부여한 것보다 PX4에 더 깊이 액세스하려는 경우나 ROS2 및 ROS(1) 애플리케이션을 모두 사용하려는 경우 [ROS(1)와 MAVROS](../ros/ros1.md)를 연결하는 대신 이 설정을 사용할 수 있습니다.
:::

:::note
이 설정과 이 지침은 [ROS 2](../ros/ros2.md)에 *의존*합니다. 먼저 ROS 2를 읽어보는 것이 좋습니다.
:::

:::warning
Note PX4 개발 팀은 모든 사용자가 [ROS 2로 업그레이드](../ros/ros2.md)할 것을 권장합니다.
:::

## 개요

ROS 2를 통해 브리지된 ROS(1)의 애플리케이션 파이프라인은 다음과 같습니다.

![Architecture with ROS](../../assets/middleware/micrortps/architecture_ros.png)

두 버전 간에 메시지를 번역하는 추가 [`ros1_bridge`](https://github.com/ros2/ros1_bridge) 패키지(Open Robotics 제공)가 있다는 점을 제외하면 기본적으로 ROS 2와 동일합니다. 이것은 ROS의 원래 버전이 RTPS를 지원하지 않기 때문에 필요합니다.

다른 주요 차이점은 `px4_ros_com` 및 `px4_msgs`가 별도의 `ros1` 분기를 패키징한다는 것입니다. `ros1_bridge`와 **함께** 사용하기 위한 ROS 메시지 헤더와 소스 파일을 생성합니다. 이 분기에는 예제 리스너 및 광고주 노드도 포함됩니다.


## 설치 및 설정

[ROS 2 사용자 가이드 > 설치 및 설정](../ros/ros2_comm.md#installation-setup)을 참고하여 ROS 2를 설치합니다.

### ROS (1) 작업 공간 빌드

ROS는 ROS2와 다른 환경이 필요하기 때문에 별도의 작업 공간을 만들어야 합니다. 여기에는 `ros1_bridge`와 함께 `px4_ros_com`와 `px4_msgs`의 `ros` 분기가 포함됩니다.

작업 공간을 만들고 빌드합니다.

1. ROS 1 작업 공간 디렉토리를 생성합니다.
   ```sh
   $ mkdir -p ~/px4_ros_com_ros1/src
   ```
1. Clone the ROS 1 bridge packages `px4_ros_com` and `px4_msgs` to the `/src` directory (the `ros1` branch):
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros1/src/px4_ros_com -b ros1 # clones the 'ros1' branch
   $ git clone https://github.com/PX4/px4_msgs.git ~/px4_ros_com_ros1/src/px4_msgs -b ros1
   ```
1. Use the `build_ros1_bridge.bash` script to build the ROS workspace (including `px4_ros_com`, `px4_msgs`, and `ros1_bridge`).
   <!-- we didn't clone `ros1_bridge` ? -->
   ```sh
   $ git checkout ros1
   $ cd scripts
   $ source build_ros1_bridge.bash
   ```
:::tip
You can also build both ROS (1) and ROS 2 workspaces with a single script: `build_all.bash`. The most common way of using it, is by passing the ROS(1) workspace directory path and PX4 Autopilot directory path:
   ```sh
   $ source build_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
   ```

### Sanity Check the Installation

As discussed in [ROS 2 User Guide > Sanity Check the Installation](../ros/ros2_comm.md#sanity-check-the-installation) a good way to verify the installation is to test that the bridge can communicate with PX4 by running it against the PX4 simulator.

To use ROS (1) **and** ROS 2 (you need both for this!):

1. [Setup your PX4 Ubuntu Linux development environment](../dev_setup/dev_env_linux_ubuntu.md) - the default instructions get the latest version of PX4 source and install all the needed tools.
1. Open a new terminal in the root of the **PX4 Autopilot** project, and then start a PX4 Gazebo simulation using:
   ```sh
   make px4_sitl_rtps gazebo
   ```
   Once PX4 has fully started the terminal will display the [NuttShell/System Console](../debug/system_console.md).

1. On another terminal, source the ROS 2 environment and workspace and launch the `ros1_bridge` (this allows ROS 2 and ROS nodes to communicate with each other). Also set the `ROS_MASTER_URI` where the `roscore` is/will be running:
   ```sh
   $ source /opt/ros/dashing/setup.bash
   $ source ~/px4_ros_com_ros2/install/local_setup.bash
   $ export ROS_MASTER_URI=http://localhost:11311
   $ ros2 run ros1_bridge dynamic_bridge
   ```

1. On another terminal, source the ROS workspace and launch the `sensor_combined` listener node. Since you are launching through `roslaunch`, this will also automatically start the `roscore`:
   ```sh
   $ source ~/px4_ros_com_ros1/install/setup.bash
   $ roslaunch px4_ros_com sensor_combined_listener.launch
   ```

1. On another terminal, source the ROS 2 workspace and then start the `micrortps_agent` daemon with UDP as the transport protocol:
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
   $ micrortps_agent -t UDP
   ```

1. On the [NuttShell/System Console](../debug/system_console.md), start the `micrortps_client` daemon also in UDP:
   ```sh
   > micrortps_client start -t UDP
   ```

   If the bridge is working correctly you will be able to see the data being printed on the terminal/console where you launched the ROS listener.
   ```sh
   RECEIVED DATA FROM SENSOR COMBINED
   ================================
   ts: 870938190
   gyro_rad[0]: 0.00341645
   gyro_rad[1]: 0.00626475
   gyro_rad[2]: -0.000515705
   gyro_integral_dt: 4739
   accelerometer_timestamp_relative: 0
   accelerometer_m_s2[0]: -0.273381
   accelerometer_m_s2[1]: 0.0949186
   accelerometer_m_s2[2]: -9.76044
   accelerometer_integral_dt: 4739
   ```

:::note
When using the `build_all.bash` script, it automatically opens and sources all the required terminals, so you just have to run the respective apps in each terminal.
:::

## Creating a ROS (1) listener

Since the creation of ROS nodes is a well known and documented process, we are going to leave this section out from this guide, and you can find an example of a ROS listener for `sensor_combined` messages the `ros1` branch of the `px4_ros_com` repository, under the following path `src/listeners/`.

