# Gazebo 仿真模拟

[ Gazebo ](http://gazebosim.org)是用于自主机器人的强大3D模拟环境，其特别适用于测试物体避障和计算机视觉。 本页描述了它与 SITL 和单一设备的使用。 Gazebo 也可以与[ HITL ](../simulation/hitl.md)和[多机仿真](../simulation/multi-vehicle-simulation.md)一起使用。

**支持机型：**四旋翼 ([Iris](../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor) 和 [Solo](../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo))，六旋翼 (Typhoon h480)，[通用四旋翼 delta VTOL 无人机](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol)，尾翼，飞机，探测车，潜艇（即将推出！）

> **Tip** Gazebo 通常与 [ROS](../ros/README.md) 一起使用，该 API 是一种用于自动设备控制的工具。 如果您计划将 PX4 与 ROS 一起使用，则应该[follow the instructions here](../simulation/ros_interface.md)安装 Gazebo 作为 ROS 的一部分！

{% youtube %}https://www.youtube.com/watch?v=qfFF9-0k4KA&vq=hd720{% endyoutube %}

[![{% mermaid %} graph LR; Gazebo-->Plugin; Plugin-->MAVLink; MAVLink-->SITL; {% endmermaid %}](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original graph info
graph LR;
  Gazebo-- >Plugin;
  Plugin-- >MAVLink;
  MAVLink-- >SITL;
-->

> **Note**有关模拟器，模拟环境和可用模拟配置（例如支持的机型）的一般信息，请参见[Simulation](/simulation/README.md)。

<a id="installation"></a>

## 安装

Gazebo 8 设置包含在我们的标准构建说明中：
- ** macOS：** [ Mac 上的开发环境](../setup/dev_env_mac.md)
- ** Linux：** [ Linux 上的开发环境（Ubuntu 16.04）> jMAVSim / Gazebo Simulation ](../setup/dev_env_linux.md#jmavsimgazebo-simulation)
- ** Windows：**不支持。

其他安装说明可在 [gazebosim.org](http://gazebosim.org/tutorials?cat=guided_b&tut=guided_b1) 上找到。


## 运行仿真

您可以通过启动 PX4 SITL和 Gazebo 来运行模拟，并加载机身配置（支持多旋翼飞机，飞机，VTOL，光流和多机仿真）。

最简单的方法是在 PX4 * Firmware *存储库的根目录中打开一个终端，并为目标调用`make`，如以下部分所示。 For example, to start a quadrotor simulation (the default):
```sh
cd ~/src/Firmware
make px4_sitl gazebo
```

The supported vehicles and `make` commands are listed below (click links to see vehicle images).

> **Note** For the full list of build targets run `make px4_sitl list_vmd_make_targets` (and filter on those that start with `gazebo_`).

| 探测车                                                                                                                                     | Command                                         |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [飞行器](../simulation/gazebo_vehicles.md#quadrotor)                                                                                       | `make clean
 make px4_sitl gazebo_typhoon_h480` |
| [Quadrotor with Optical Flow](../simulation/gazebo_vehicles.md#quadrotor_optical_flow)                                                  | `make px4_sitl gazebo_iris_opt_flow`            |
| [3DR Solo in Gazebo](../simulation/gazebo_vehicles.md#3dr_solo)                                                                         | `make px4_sitl gazebo_solo`                     |
| !!crwdBlockTags_82_sgaTkcolBdwrc!![Typhoon H480 (Hexrotor)](../simulation/gazebo_vehicles.md#typhoon_h480) (supports video streaming) | `make px4_sitl gazebo_typhoon_h480`             |
| [Standard Plane](../simulation/gazebo_vehicles.md#standard_plane)                                                                       | `make px4_sitl gazebo_plane`                    |
| [Standard Plane (with catapult launch)](../simulation/gazebo_vehicles.md#standard_plane_catapult)                                       | `make px4_sitl gazebo_plane_catapult`           |
| [标准构型的 VTOL](../simulation/gazebo_vehicles.md#standard_vtol)                                                                            | `make px4_sitl gazebo_standard_vtol`            |
| [尾座式 VTOL](../simulation/gazebo_vehicles.md#tailsitter_vtol)                                                                            | `make px4_sitl gazebo_tailsitter`               |
| [阿克曼车 （UGV/Rover）](../simulation/gazebo_vehicles.md#ugv)                                                                                | `make px4_sitl gazebo_rover`                    |
| [海马体 TUHH (UUV: 无人水下航行器)](../simulation/gazebo_vehicles.md#uuv)                                                                         | `make px4_sitl gazebo_uuv_hippocampus`          |
| [Boat (USV: Unmanned Surface Vehicle)](../simulation/gazebo_vehicles.md#usv)                                                            | `make px4_sitl gazebo_boat`                     |
| [Cloudship (Airship)](../simulation/gazebo_vehicles.md#airship)                                                                         | `make px4_sitl gazebo_cloudship`                |


> **Tip** 使用命令 `make px4_sitl list_vmd_make_targets` 获取所有支持的平台（你还可以过滤掉以 `gazebo_` 开头的平台）。

The commands above launch a single vehicle with the full UI. Other options include:
- 单独启动 Gazebo 和 PX4
- Run the simulation in [Headless Mode](#headless), which does not start the Gazebo UI (this uses fewer resources and is much faster).


## 改变仿真环境中的世界

通过终端运行 gazebo（或任何其他 sim）服务器和客户端查看器： `make px4_sitl gazebo_none_ide`

该命令最终将得到如下 PX4 控制台显示界面：

```
______  __   __    ___ 
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.

INFO  [px4] Calling startup script: /bin/sh etc/init.d-posix/rcS 0
INFO  [param] selected parameter default file eeprom/parameters_10016
[param] Loaded: eeprom/parameters_10016
INFO  [dataman] Unknown restart, data manager file './dataman' size is 11798680 bytes
INFO  [simulator] Waiting for simulator to connect on TCP port 4560
Gazebo multi-robot simulator, version 9.0.0
Copyright (C) 2012 Open Source Robotics Foundation.
Released under the Apache 2 License.
http://gazebosim.org
...
INFO  [ecl/EKF] 5188000: commencing GPS fusion
```
The console will print out status as PX4 loads the airframe-specific initialisation and parameter files, waits for (and connects to) the simulator. Once there is an INFO print that [ecl/EKF] is `commencing GPS fusion` the vehicle is ready to arm.


> **Note** 如遇到任何错误请参考： [Installing Files and Code](../setup/dev_env.md) 。

![Gazebo UI](../../assets/simulation/gazebo/gazebo_follow.jpg)

现在你可以输入如下命令让飞机起飞了：

```sh
pxh> commander takeoff
```

## 把飞机飞上天

<a id="headless"></a>

### 四旋翼

Gazebo 可以在* headless *模式下运行，其中 Gazebo UI 未启动。 这样可以更快地启动并使用更少的系统资源（即，它是运行模拟的更“轻量级”方式）。

Simply prefix the normal `make` command with `HEADLESS=1` as shown:
```bash
HEADLESS=1 make px4_sitl gazebo_plane
```

<a id="custom_takeoff_location"></a>

### 带光流的四旋翼

The takeoff location in SITL Gazebo can be set using environment variables. This will override both the default takeoff location, and any value [set for the world](#set_world_location).

The variables to set are: `PX4_HOME_LAT`, `PX4_HOME_LON`, and `PX4_HOME_ALT`.

只需在正常的* make *命令前加上`HEADLESS=1`，如下所示：
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl gazebo
```


### 3DR Solo

可以使用环境变量重写 SITL Gazebo 中的默认起飞位置。

```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl_default gazebo
```

要设置的变量有：`PX4_HOME_LAT`、`PX4_HOME_LON` 和 `PX4_HOME_ALT`。


### 标准构型的固定翼飞机

下面是一个例子：
```xml
  <plugin name='wind_plugin' filename='libgazebo_wind_plugin.so'>
      <frameId>base_link</frameId>
      <robotNamespace/>
      <xyzOffset>1 0 0</xyzOffset>
      <windDirectionMean>0 1 0</windDirectionMean>
      <windVelocityMean>SET_YOUR_WIND_SPEED</windVelocityMean>
      <windGustDirection>0 0 0</windGustDirection>
      <windGustDuration>0</windGustDuration>
      <windGustStart>0</windGustStart>
      <windGustVelocityMean>0</windGustVelocityMean>
      <windPubTopic>world_wind</windPubTopic>
    </plugin>
```
通过 *QGroundControl* 可引入操纵杆或者拇指操纵杆（[如何进行设置看这里](../simulation/README.md#joystickgamepad-integration)）。

### 标准构型的 VTOL

Joystick and thumb-joystick support are supported through *QGroundControl* ([setup instructions here](../simulation/README.md#joystickgamepad-integration)).


### 尾座式 VTOL

当前的默认世界是位于目录 [worlds](https://github.com/PX4/sitl_gazebo/tree/b59e6e78e42d50f70224d1d0e506825590754d64/worlds) 中的 **iris.world**。 **iris.world** 中默认使用高程图生成地面景物。

This can cause difficulty when using a distance sensor. 这样生成的地面可能会导致使用距离传感器时较为困难， 如果使用高程图会导致任何出乎意料的结果，我们建议你将 **iris.model** 中的模型设定从 `uneven_ground` 改为 `asphalt_plane`.

<a id="gps_noise"></a>

### 模拟 GPS 噪声

Gazebo 可以模拟类似于实际系统中常见的 GPS 噪声（否则报告的GPS值将是无噪声/完美的）。 这在处理可能受 GPS 噪声影响的应用时非常有用，例如精度定位。

果目标设备的 SDF 文件包含`gpsNoise`元素的值（即，它具有行：`<gpsNoise>true</gpsNoise>`），则启用GPS噪声。 默认情况下, 它在许多设备 SDF 文件中启用：**solo.sdf**、**iris.sdf**、**standard_vtol.sdf**、**delta_wing.sdf**、**plane.sdf**、**typhoon_h480** **tailsitter.sdf**。

启用/禁用GPS噪音：
1. 构建任何 gazebo 目标以生成 SDF 文件（适用于所有机型）。 For example:
   ```
   make px4_sitl gazebo_iris
   ```

   > 例如： `make px4_sitl gazebo_iris` >**Tip**在后续版本中不会覆盖 SDF 文件。
2. 打开目标车辆的 SDF 文件（例如**./Tools/sitl_gazebo/models/iris/iris.sdf **）。
3. 搜索 `gpsNoise` 元素： xml
   ```xml
   <gui>
         <plugin name="video_widget" filename="libgazebo_video_stream_widget.so"/>
       </gui>
   ```
   * 如果存在，则启用 GPS。 您可以通过删除以下行来禁用它：`<gpsNoise> true </gpsNoise>`
   * 如果未预设，则禁用 GPS 。 您可以通过将`gpsNoise`元素添加到`gps_plugin`部分来启用它（如上所示）。

单独启动 Gazebo 和 PX4:

<a id="set_world"></a>

## 使用/配置选项

这种方法显着缩短了调试周期时间，因为模拟器（例如 gazebo）总是在后台运行，而你只重新运行 px4 进程是非常轻松的。

You can load any of the worlds by specifying them as the final option in the PX4 configuration target.

安装* Gstreamer 1.0 *及其依赖项：
```
make px4_sitl gazebo_hippocampus
```

> **Note** There are *two underscores* after the model (`plane_cam`) indicating that the default debugger is used (none). See [Building the Code > PX4 Make Build Targets](../setup/building_px4.md#make_targets).

You can also specify the full path to a world to load using the `PX4_SITL_WORLD` environment variable. This is useful if testing a new world that is not yet included with PX4.

> **Tip** If the loaded world does not align with the map, you may need to [set the world location](#set_world_location).

<a id="set_world_location"></a>

## Set World Location

启用插件后，您可以正常方式使用 Gazebo 运行 SITL：

> **Note**默认情况下启用视频流后，不需要执行此步骤。

If using a world that recreates a real location (e.g. a particular airport) this can result in a very obvious mismatch between what is displayed in the simulated world, and what is shown on the ground station map. To overcome this problem you can set the location of the world origin to the GPS co-ordinates where it would be in "real life".

> **Note** You can also set a [Custom Takeoff Location](#custom_takeoff_location) that does the same thing. However adding the location to the map is easier (and can still be over-ridden by setting a custom location if needed).

The location of the world is defined in the **.world** file by specifying the location of the origin using the `spherical_coordinates` tag. The latitude, longitude, elevation must all be specified (for this to be a valid).

来自 Gazebo 的视频应该像从真实相机那样显示在* QGroundControl *中。
```
    [init] shell id: 140735313310464
[init] task name: px4

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.


pxh>
```

You can test this by spawning a rover in the [Sonoma Raceway World](../simulation/gazebo_worlds.md#sonoma-raceway) using the following `make` command (note that spawning takes longer the first time as the model needs to be downloaded from the model database):
```
make px4_sitl gazebo_rover__sonoma_raceway
```

可以使用 Gazebo UI * Video ON/OFF *按钮来启用/禁用视频流。
{% youtube %}
启用按钮：
{% endyoutube %}

<a id="start_px4_sim_separately"></a>

## 视频流

通过[interfaced to ROS](../simulation/ros_interface.md)，模拟器可以与真实飞行器上逼真。

除了运行`sitl_run.sh`的现有 cmake 目标以及 px4 的参数加载正确的模型之外，它还会创建一个名为`px4_ <mode>`的启动器目标，这是一个包装器，围绕原始 sitl px4 应用程序。 这个包装器只是嵌入应用程序参数，如当前工作目录和模型文件的路径。

对于扩展开发会话，单独启动 Gazebo 和 PX4 可能更方便，甚至可以在 IDE 中启动。

* Run gazebo (or any other sim) server and client viewers via the terminal specifing an `_ide` variant:
  ```sh
  make px4_sitl gazebo___ide
  ```
  or
  ```sh
  make px4_sitl gazebo_iris_ide
  ```
* 在 IDE 中选择要调试的`px4_ <mode>`目标（例如`px4_iris`）
* 直接从 IDE 启动调试会话

This approach significantly reduces the debug cycle time because simulator (e.g. Gazebo) is always running in background and you only re-run the px4 process which is very light.


## 扩展和定制

The *Gazebo* survey camera simulates a [MAVLink camera](https://mavlink.io/en/services/camera.html) that captures geotagged JPEG images and sends camera capture information to a connected ground station. The camera also supports video streaming. It can be used to test camera capture, in particular within survey missions.

The camera emits the [CAMERA_IMAGE_CAPTURED](https://mavlink.io/en/messages/common.html#CAMERA_IMAGE_CAPTURED) message every time an image is captured. The captured images are saved to: **PX4-Autopilot/build/px4_sitle_default/tmp/frames/DSC_n_.jpg** (where _n_ starts as 00000 and is iterated by one on each capture).

To simulate a plane with this camera:
```
make px4_sitl_default gazebo_plane_cam
```

> **Note** The camera also supports/responds to the following MAVLink commands: [MAV_CMD_REQUEST_CAMERA_CAPTURE_STATUS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_CAPTURE_STATUS), [MAV_CMD_REQUEST_STORAGE_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_STORAGE_INFORMATION), [MAV_CMD_REQUEST_CAMERA_SETTINGS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_SETTINGS), [MAV_CMD_REQUEST_CAMERA_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_INFORMATION), [MAV_CMD_RESET_CAMERA_SETTINGS](https://mavlink.io/en/messages/common.html#MAV_CMD_RESET_CAMERA_SETTINGS), [MAV_CMD_STORAGE_FORMAT](https://mavlink.io/en/messages/common.html#MAV_CMD_STORAGE_FORMAT), [MAV_CMD_SET_CAMERA_ZOOM](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_ZOOM), [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE), [MAV_CMD_IMAGE_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_STOP_CAPTURE), [MAV_CMD_REQUEST_VIDEO_STREAM_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_VIDEO_STREAM_INFORMATION), [MAV_CMD_REQUEST_VIDEO_STREAM_STATUS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_VIDEO_STREAM_STATUS), [MAV_CMD_SET_CAMERA_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_MODE).

<span></span>
> **Note** Gazebo 版本 7 支持此功能。

<a id="flight_termination"></a>

## 与 ROS 对接交互

*Gazebo* can be used to simulate deploying a [parachute](https://docs.px4.io/master/en/peripherals/parachute.html) during [Flight Termination](https://docs.px4.io/master/en/advanced_config/flight_termination.html) (flight termination is triggered by the PWM command that is simulated in *Gazebo*).

The `if750a` target has a parachute attached to the vehicle. To simulate the vehicle, run the following command:
```
make px4_sitl gazebo_if750a
```

To put the vehicle into flight termination state, you can force it to fail a [safety check](https://docs.px4.io/master/en/config/safety.html) that has flight termination set as the failsafe action. For example, you could do this by forcing a [Geofence violation](https://docs.px4.io/master/en/config/safety.html#geofence-failsafe).

For more information see:
- [Flight Termination](https://docs.px4.io/master/en/advanced_config/flight_termination.html)
- [Parachute](https://docs.px4.io/master/en/peripherals/parachute.html)
- [Safety Configuration (Failsafes)](https://docs.px4.io/master/en/config/safety.html)

<a id="video"></a>

## 更多信息：

用于 Gazebo 的 PX4 SITL 支持来自连接到设备型号的 Gazebo 相机传感器的 UDP 视频流。 您可以从* QGroundControl *（在 UDP 端口 5600 上）连接到此流，并从模拟设备查看 Gazebo 环境的视频 - 就像您从真实摄像机那样。 使用* gstreamer *流水线流式传输视频。

The Gazebo camera sensor is supported/enabled on the following frames:
* [Typhoon H480](#typhoon_h480)


### Prerequisites

*Gstreamer 1.0* is required for video streaming. The required dependencies should already have been [installed when you set up Gazebo](#installation) (they are included in the standard PX4 installation scripts/instructions for macOS and Ubuntu Linux).

> **Note**默认情况下，来自 Gazebo 和 Gazebo 小部件中的视频流以打开/关闭流式传输是未启用的。


### Headless 模式

Video streaming is automatically started when supported by the target vehicle. For example, to start streaming video on the Typhoon H480:
```
sudo apt-get install $(apt-cache --names-only search ^gstreamer1.0-* | awk '{ print $1 }' | grep -v gstreamer1.0-hybris) -y
```

用于启动/停止视频流的 Gazebo GUI

![视频 ON / OFF 按钮](../../assets/simulation/gazebo/sitl_video_stream.png)


### 设置自定义起飞位置

查看 SITL / Gazebo 相机视频流的最简单方法是在* QGroundControl *中。 只需打开** Settings > General **并将** Video Source **设置为* UDP 视频流*，将** UDP 端口**设置为* 5600 *：

![Gazebo 的 QGC 视频流设置](../../assets/simulation/gazebo/qgc_gazebo_video_stream_udp.png)

The video from Gazebo should then display in *QGroundControl* just as it would from a real camera.

![QGC Video Streaming Gazebo Example](../../assets/simulation/gazebo/qgc_gazebo_video_stream_typhoon.jpg)

> **Note** The Typhoon world is not very interesting.

也可以使用* Gstreamer Pipeline *查看视频。 只需输入以下终端命令：
```sh
gst-launch-1.0  -v udpsrc port=5600 caps='application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264' \
! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink fps-update-interval=1000 sync=false
```

### 使用操纵杆

SITL fails silently when there is something wrong with the gazebo model. You can enable more verbose logging using `VERBOSE_SIM`, as shown:

```
make clean
make px4_sitl gazebo_typhoon_h480
```

or

```
gst-launch-1.0  -v udpsrc port=5600 caps='application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264' \
! rtph264depay ! avdec_h264 videoconvert ! autovideosink fps-update-interval=1000 sync=false
```


## Extending and Customizing

要扩展或自定义仿真界面，请编辑`Tools/sitl_gazebo`文件夹中的文件。 该代码可在 Github 上的[ sitl_gazebo repository ](https://github.com/px4/sitl_gazebo)上获得。

> **Note** 建系统强制执行正确的 GIT 子模块，包括模拟器。 它不会覆盖目录中文件的更改。

## Further Information

* [另见 Gazebo 模拟。](../simulation/ros_interface.md)
* [Gazebo Octomap](../simulation/gazebo_octomap.md)
