# ROS 2 사용 설명서(PX4-ROS 2 브리지)

PX4에서 ROS 2를 설정하고 사용하는 방법을 설명합니다.

필요한 소프트웨어를 설치하고 ROS 2 애플리케이션을 구축하는 방법에 대한 지침과 ROS2-PX4 브리지 아키텍처 및 애플리케이션 파이프라인에 대한 개요를 제공합니다.


:::note PX4 Autopilot의 Fast DDS 인터페이스는 DDS 도메인(ROS 노드 포함)에서 실행 및 연결된 모든 애플리케이션에서 활용할 수 있습니다.

ROS 2 없이 *microRTPS 브리지* 사용 방법은 [RTPS/DDS 인터페이스 섹션](../middleware/micrortps.md)을 참고하십시오.
:::

:::note ROS
2에서 PX4를 사용하는 방법에 대한 보다 자세하고 시각적인 설명은 PX4 유지 관리자의 다음 프레젠테이션을 참조하십시오.
1. [ROS World 2020 - ROS 2 및 PX4 시작하기](https://www.youtube.com/watch?v=qhLATrkA_Gw)
1. [PX4 Dev Summit 2019 - "ROS 2 Powered PX4"](https://www.youtube.com/watch?v=2Szw8Pk3Z0Q)
:::

## 개요

ROS 2의 애플리케이션 파이프라인은 기본 통신 미들웨어(DDS/RTPS) 덕분에 매우 간단합니다. [microRTPS Bridge](../middleware/micrortps.md)는 PX4에서 실행되는 클라이언트와 ROS 컴퓨터에서 실행되는 에이전트로 구성되며, UORB와 ROS 2간의 양방향 메시지 변환을 제공합니다. 이를 통하여, PX4 UORB 데이터에 직접 게시 및 구독하는 ROS 2 리스너 또는 광고주 노드를 생성할 수 있습니다! 이것을 아래 다이어그램에서 설명합니다.

![Architecture with ROS 2](../../assets/middleware/micrortps/architecture_ros2.png)

ROS 2는 [`px4_msgs`](https://github.com/PX4/px4_msgs) 및 [`px4_ros_com`](https://github.com/PX4/px4_ros_com) 패키지를 사용하여 일치하는 메시지 정의가 클라이언트와 에이전트 코드를 생성하는 데 사용되는지 확인하고(중요함), ROS 코드를 빌드시에는 PX4가 있어야 합니다.
- `px4_msgs`에는 PX4 클라이언트 메시지 정의가 포함됩니다. 이 프로젝트가 빌드되면 해당 ROS 2 호환 IDL 파일이 생성됩니다.
- `px4_ros_com`은 `px4_msgs` 프로젝트 빌드후 생성된 IDL 파일을 사용하여 ROS 2 에이전트를 생성(및 빌드)합니다.

PX4 Autopilot 프로젝트는 (마스터 분기에서) 변경될 때마다, 새 메시지 정의로 [`px4_msgs`](https://github.com/PX4/px4_msgs)를 자동으로 업데이트합니다.

:::note ROS
애플리케이션에 액세스할 수 있는 uORB 주제의 하위 집합은 [px4_msgs/msg](https://github.com/PX4/px4_msgs/tree/master/msg)에 위치합니다.
:::

PX4 펌웨어에는 빌드 시간 메시지 정의를 기반으로 하는 microRTPS 클라이언트가 포함되어 있습니다. Astute readers will note that since the generated agent might not have been built to that same set of definitions (unless they were both built of the same 'master' commit). 현재 시점에서는 PX4 메시지 세트/정의가 비교적 안정적이기 때문에 문제가 되지 않습니다. 조만간, 특정 PX4 릴리스와 일치하도록 분기될 예정입니다.

:::warning ROS
2에서 "일반" PX4 빌드의 일부로 생성된 에이전트를 사용할 수 없습니다. microRTPS 클라이언트는 동일하지만, ROS 2에서 사용하는 IDL 파일은 일반 DDS에서 사용하는 것과 약간 차이가 납니다. `px4_msg`를 사용하여 적절한 IDL 파일을 생성합니다.
:::


## 설치 및 설정

PX4에서 ROS 2를 설정하려면 다음이 필요합니다.
- [Fast DDS 설치](#install-fast-dds)
- [ROS2 설치](#install-ros-2)
- [ROS 2 작업 공간 빌드](#build-ros-2-workspace)
- [설치 상태 확인](#sanity-check-the-installation)(선택 사항)

### Fast DDS 설치

[Fast DDS 설치 가이드](../dev_setup/fast-dds-installation.md)에 따라 **Fast RTPS(DDS) 2.0.0**(이상) 및 **Fast-RTPS-Gen 1.0.4**를 설치합니다.

:::note
최신 종속성을 확인하려면 가이드를 확인하십시오. 올바른 버전의 **Fast RTPS(DDS)** 및 **Fast-RTPS-Gen이 설치될 때까지, 이 가이드를 계속 진행할 수 없습니다.
:::


### ROS2 설치

<!-- what other toolchain needed? e.g. for ROS - gcc? does it all come with the ROS setup? -->

:::note
이 설치 및 빌드 가이드는 Ubuntu 20.04의 ROS 2 Foxy를 기준으로 합니다.
:::

ROS 2와 해당 종속성을 설치합니다.

1. [ROS 2 Foxy를 설치합니다.](https://index.ros.org/doc/ros2/Installation/Foxy/Linux-Install-Debians/)
1. 설치 과정에서 **`colcon`** 빌드 도구도 설치하여야 하지만, 도구를 수동으로 설치할 수 있습니다.

   ```sh
   sudo apt install python3-colcon-common-extensions
   ```

1. Eigen3는 변환 라이브러리에서 사용되므로 **`eigen3_cmake_module`**도 필요합니다.

   ```sh
   sudo apt install ros-foxy-eigen3-cmake-module
   ```

1. 일부 Python 종속성도 설치하여야 합니다(**`pip`** 또는 **`apt`** 사용).

   ```sh
   sudo pip3 install -U empy pyros-genmsg setuptools
   ```


### ROS 2 작업 공간 빌드

이 섹션에서는 *홈 디렉토리*에서 호스팅되는 ROS 2 작업 공간을 만드는 방법을 보여줍니다(필요에 따라 명령을 수정하여 소스 코드를 다른 곳에 배치). `px4_ros_com` 및 `px4_msg` 패키지가 작업 영역 폴더에 복제한 다음, 스크립트를 사용하여 작업 영역을 빌드합니다.

:::note
빌드 프로세스는 다른 환경 구성을 소싱하는 빌드 프로세스의 여러 단계에 해당하는 콘솔에서 새 탭을 엽니다.
:::

작업 공간을 만들고 빌드합니다.

1. 작업 공간 디렉토리를 생성합니다.
   ```sh
   $ mkdir -p ~/px4_ros_com_ros2/src
   ```
1. ROS 2 브리지 패키지 `px4_ros_com`와 `px4_msgs`를 `/src` 디렉토리에 복제합니다. `master` 분기는 기본적으로 복제됩니다.
   ```sh
   $ git clone https://github.com/PX4/px4_ros_com.git ~/px4_ros_com_ros2/src/px4_ros_com
   $ git clone https://github.com/PX4/px4_msgs.git ~/px4_ros_com_ros2/src/px4_msgs
   ```
1. `build_ros2_workspace.bash` 스크립트를 사용하여 ROS 2 작업 공간(`px4_ros_com` 및 `px4_msgs` 포함)을 빌드합니다.
   ```sh
   $ cd ~/px4_ros_com_ros2/src/px4_ros_com/scripts
   $ source build_ros2_workspace.bash
   ```


:::tip
모든 스크립트 옵션은 `--help` 인수를 사용하여 출력합니다. 특히 `--verbose` 인수는 전체 *colcon* 빌드 출력을 보여줍니다.
:::

:::note
`px4_ros_com/scripts` 디렉토리에는 다양한 종류의 작업 공간을 구축하기 위한 여러 스크립트가 포함되어 있습니다.
:::


### 설치 상태 확인

설치 성공 여부를 확인하는 방법은 브리지와 PX4 통신을 테스트하는 것입니다. 시뮬레이터에서 실행되는 PX4에 대하여 브리지를 실행하여 테스트할 수 있습니다.

1. [PX4 Ubuntu Linux 개발 환경 설정](../dev_setup/dev_env_linux_ubuntu.md) - 기본 지침은 최신 버전의 PX4 소스를 다운로드하고 도구들을 설치합니다.
1. **PX4 Autopilot** 프로젝트의 루트에서 새 터미널을 열고, PX4 Gazebo 시뮬레이션을 실행합니다.
   ```sh
   make px4_sitl_rtps gazebo
   ```
   PX4가 시작되면, 터미널에 [NuttShell/System Console](../debug/system_console.md)이 표시됩니다.
1. *새* 터미널에서 ROS 2 작업 공간을 `소싱`한 다음 UDP를 전송 프로토콜로 사용하여 `micrortps_agent` 데몬을 시작합니다.
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
   $ micrortps_agent -t UDP
   ```
1. 원래 터미널(시스템 콘솔)에서 UDP로 `micrortps_client` 데몬을 시작합니다.
   ```sh
   pxh> micrortps_client start -t UDP
   ```
1. 새 터미널을 열어서, 시작 파일을 사용하여 "수신기"를 시작합니다.
   ```sh
   $ source ~/px4_ros_com_ros2/install/setup.bash
   $ ros2 launch px4_ros_com sensor_combined_listener.launch.py
   ```


   브리지가 올바르게 작동하면, ROS 수신기를 시작한 터미널/콘솔에서 데이터가 인쇄되는 것을 확일할 수 있습니다.

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

`ros2 topic hz`를 사용하여 메시지 속도를 확인할 수 있습니다. 예: `sensor_combined`의 경우 `ros2 topic hz /SensorCombined_PubSubTopic` 사용:
   ```sh
   average rate: 248.187
    min: 0.000s max: 0.012s std dev: 0.00147s window: 2724
   average rate: 248.006
    min: 0.000s max: 0.012s std dev: 0.00147s window: 2972
   average rate: 247.330
    min: 0.000s max: 0.012s std dev: 0.00148s window: 3212
   average rate: 247.497
    min: 0.000s max: 0.012s std dev: 0.00149s window: 3464
   average rate: 247.458
    min: 0.000s max: 0.012s std dev: 0.00149s window: 3712
   average rate: 247.485
    min: 0.000s max: 0.012s std dev: 0.00148s window: 3960
   ```



## ROS 2 예제 애플리케이션

### ROS 2 리스너 생성

`px4_ros_com`이 성공적으로 구축되면 이제 생성된 *microRTPS* 에이전트 앱과 `px4_msgs`에서 생성된 ROS 2 msgs의 소스 및 헤더를 활용할 수 있습니다.

ROS 2에서 리스너 노드를 생성하는 `px4_ros_com/src/examples/listeners` 아래의 `sensor_combined_listener.cpp` 노드 예를 설명합니다.

코드는 먼저 ROS 2 미들웨어 및 필수 메시지 헤더 파일과 인터페이스하는 데 필요한 C++ 라이브러리를 가져옵니다.

```cpp
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/sensor_combined.hpp>
```

그런 다음 일반 `rclcpp::Node` 기본 클래스의 하위 클래스인 `SensorCombinedListener` 클래스를 생성합니다.

```cpp
/**
 * @brief Sensor Combined uORB topic data callback
 */
class SensorCombinedListener : public rclcpp::Node
{
```

이것은 `sensor_combined` uORB 메시지가 수신될 때(현재는 RTPS/DDS 메시지로) 콜백 함수를 생성하고 메시지가 수신될 때마다 메시지 필드의 내용을 출력합니다.

```cpp
public:
    explicit SensorCombinedListener() : Node("sensor_combined_listener") {
        subscription_ = this->create_subscription<px4_msgs::msg::SensorCombined>(
            "SensorCombined_PubSubTopic",
            10,
            [this](const px4_msgs::msg::SensorCombined::UniquePtr msg) {
            std::cout << "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
            std::cout << "RECEIVED SENSOR COMBINED DATA"   << std::endl;
            std::cout << "============================="   << std::endl;
            std::cout << "ts: "          << msg->timestamp    << std::endl;
            std::cout << "gyro_rad[0]: " << msg->gyro_rad[0]  << std::endl;
            std::cout << "gyro_rad[1]: " << msg->gyro_rad[1]  << std::endl;
            std::cout << "gyro_rad[2]: " << msg->gyro_rad[2]  << std::endl;
            std::cout << "gyro_integral_dt: " << msg->gyro_integral_dt << std::endl;
            std::cout << "accelerometer_timestamp_relative: " << msg->accelerometer_timestamp_relative << std::endl;
            std::cout << "accelerometer_m_s2[0]: " << msg->accelerometer_m_s2[0] << std::endl;
            std::cout << "accelerometer_m_s2[1]: " << msg->accelerometer_m_s2[1] << std::endl;
            std::cout << "accelerometer_m_s2[2]: " << msg->accelerometer_m_s2[2] << std::endl;
            std::cout << "accelerometer_integral_dt: " << msg->accelerometer_integral_dt << std::endl;
        });
    }
```

아래 줄은 하나 이상의 호환 가능한 ROS 게시자와 일치시킬 수 있는 `sensor_combined_topic`에 대한 구독을 만듭니다.

```cpp
private:
    rclcpp::Subscription<px4_msgs::msg::SensorCombined>::SharedPtr subscription_;
};
```

`SensorCombinedListener` 클래스를 ROS 노드로 인스턴스화하는 작업은 `main` 함수에서 수행됩니다.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting sensor_combined listener node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<SensorCombinedListener>());

    rclcpp::shutdown();
    return 0;
}
```


### ROS 2 광고주 만들기

ROS 2 광고주 노드는 DDS/RTPS 네트워크(따라서 PX4 Autopilot)에 데이터를 게시합니다.

`px4_ros_com/src/advertisers` 아래의 `debug_vect_advertiser.cpp`를 예로 들면 먼저 `debug_vect` msg 헤더를 포함한 필수 헤더를 가져옵니다.

```cpp
#include <chrono>
#include <rclcpp/rclcpp.hpp>
#include <px4_msgs/msg/debug_vect.hpp>
```

그런 다음 코드는 일반 `rclcpp::Node` 기본 클래스의 하위 클래스인 `DebugVectAdvertiser` 클래스를 생성합니다.

```cpp
class DebugVectAdvertiser : public rclcpp::Node
{
```

아래 코드는 메시지를 전송하는 함수를 만듭니다. 메시지는 타이머를 기반으로 초당 2개의 메시지를 보내는 시간 제한 콜백을 기반으로 전송됩니다.

```cpp
public:
    DebugVectAdvertiser() : Node("debug_vect_advertiser") {
        publisher_ = this->create_publisher<px4_msgs::msg::DebugVect>("DebugVect_PubSubTopic", 10);
        auto timer_callback =
        [this]()->void {
            auto debug_vect = px4_msgs::msg::DebugVect();
            debug_vect.timestamp = std::chrono::time_point_cast<std::chrono::microseconds>(std::chrono::steady_clock::now()).time_since_epoch().count();
            std::string name = "test";
            std::copy(name.begin(), name.end(), debug_vect.name.begin());
            debug_vect.x = 1.0;
            debug_vect.y = 2.0;
            debug_vect.z = 3.0;
            RCLCPP_INFO(this->get_logger(), "\033[97m Publishing debug_vect: time: %llu x: %f y: %f z: %f \033[0m",
                                debug_vect.timestamp, debug_vect.x, debug_vect.y, debug_vect.z);
            this->publisher_->publish(debug_vect);
        };
        timer_ = this->create_wall_timer(500ms, timer_callback);
    }

private:
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<px4_msgs::msg::DebugVect>::SharedPtr publisher_;
};
```

`DebugVectAdvertiser` 클래스를 ROS 노드로 인스턴스화하는 작업은 `main` 함수에서 수행됩니다.

```cpp
int main(int argc, char *argv[])
{
    std::cout << "Starting debug_vect advertiser node..." << std::endl;
    setvbuf(stdout, NULL, _IONBF, BUFSIZ);
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<DebugVectAdvertiser>());

    rclcpp::shutdown();
    return 0;
}
```


### 오프보드 제어

PX4에서 오프보드 제어를 사용하는 전체 예제는 [ROS 2 오프보드 제어 예제](../ros/ros2_offboard_control.md)를 참고하십시오.


## 수동 작업 공간 설정(참고용)

:::note
This is provided to help you better understand the build process. It is not needed to build or use ROS 2. It additionally includes instructions for building the `ros1_bridge` package, which is used in [ROS (1) via ROS 2 Bridge](../ros/ros1_via_ros2.md).
:::

This section describes the process to *manually* setup your workspace and build the `px4_ros_com`, `px4_msgs`, and `ros1_bridge` package. The topic effectively explains the operation of the `build_ros2_workspace.bash` script in the [installation instructions](#build-ros-2-workspace)).


**To build the ROS 2 workspace only:**

1. `cd` into `px4_ros_com_ros2` dir and source the ROS 2 environment. Don't mind if it tells you that a previous workspace was set before:

   ```sh
   cd ~/px4_ros_com_ros2
   source /opt/ros/foxy/setup.bash
   ```

2. Build the workspace:

   ```sh
   colcon build --symlink-install --event-handlers console_direct+
   ```

To build both ROS 2 and ROS (1) workspaces (replacing the previous steps):

1. `cd` into `px4_ros_com_ros2` dir and source the ROS 2 environment. Don't mind if it tells you that a previous workspace was set before:

   ```sh
   source /opt/ros/foxy/setup.bash
   ```

1. Clone the `ros1_bridge` package so it can be built on the ROS 2 workspace:

   ```sh
   git clone https://github.com/ros2/ros1_bridge.git -b dashing ~/px4_ros_com_ros2/src/ros1_bridge
   ```

1. Build the `px4_ros_com` and `px4_msgs` packages, excluding the `ros1_bridge` package:

   ```sh
   colcon build --symlink-install --packages-skip ros1_bridge --event-handlers console_direct+
   ```

:::note
`--event-handlers console_direct+` only serve the purpose of adding verbosity to the `colcon` build process, and can be removed if one wants a more "quiet" build.
:::

1. Then build the ROS(1) packages side. First open a **new** terminal window and source the ROS(1) environment that was installed on the system:

   ```sh
   source /opt/ros/melodic/setup.bash
   ```

1. Build the `px4_ros_com` and `px4_msgs` packages on the ROS end (using the terminal opened in the previous step):

   ```sh
   cd ~/px4_ros_com_ros1 && colcon build --symlink-install --event-handlers console_direct+
   ```

1. Open another new terminal and then source the environments and workspaces in the order listed below:

   ```sh
   source ~/px4_ros_com_ros1/install/setup.bash
   source ~/px4_ros_com_ros2/install/setup.bash
   ```

1. Finally, build the `ros1_bridge`:

   ```sh
   cd ~/px4_ros_com_ros2 && colcon build --symlink-install --packages-select ros1_bridge --cmake-force-configure --event-handlers console_direct+
   ```

:::note
The build process may consume a lot of memory resources. On a resource limited machine, reduce the number of jobs being processed in parallel (e.g. set environment variable `MAKEFLAGS=-j1`). For more details on the build process, see the build instructions on the [ros1_bridge](https://github.com/ros2/ros1_bridge) package page.
:::


### Cleaning the workspaces

After building the workspaces there are many files that must be deleted before you can do a clean/fresh build (for example, after you have changed some code and want to rebuild).

Unfortunately *colcon* does not currently have a way of cleaning the generated **build**, **install** and **log** directories, so these directories must be deleted manually.

The **clean_all.bash** script (in **px4_ros_com/scripts**) is provided to ease this cleaning process, this script can be used to clean all of the workspace options listed above (ROS 2, ROS 1, and Both)

The most common way of using it is by passing it the ROS (1) workspace directory path (since it's usually not on the default path):

```sh
$ source clean_all.bash --ros1_ws_dir <path/to/px4_ros_com_ros1/ws>
```

:::tip
Like the build scripts, the `clean_all.bash` script also has a `--help` guide.
:::

## Additional information

* [DDS and ROS middleware implementations](https://github.com/ros2/ros2/wiki/DDS-and-ROS-middleware-implementations)
