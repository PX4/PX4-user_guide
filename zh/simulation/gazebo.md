# Gazebo 仿真模拟

[ Gazebo ](http://gazebosim.org)是用于自主机器人的强大3D模拟环境，其特别适用于测试物体避障和计算机视觉。 本页描述了它与 SITL 和单一设备的使用。 Gazebo 也可以与[ HITL ](../simulation/hitl.md)和[多机仿真](../simulation/multi-vehicle-simulation.md)一起使用。

**支持机型：**四旋翼 ([Iris](../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor) 和 [Solo](../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo))，六旋翼 (Typhoon h480)，[通用四旋翼 delta VTOL 无人机](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol)，尾翼，飞机，探测车，潜艇（即将推出！）

:::warning
Gazebo is often used with [ROS](../ros/README.md), a toolkit/offboard API for automating vehicle control. If you plan to use PX4 with ROS you **should follow the** [ROS Instructions](../simulation/ros_interface.md) to install both ROS and Gazebo (and thereby avoid installation conflicts).
:::

@[youtube](https://www.youtube.com/watch?v=qfFF9-0k4KA&vq=hd720)

[![Mermaid Graph: Gazebo plugin](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original graph info
graph LR;
  Gazebo-- >Plugin;
  Plugin-- >MAVLink;
  MAVLink-- >SITL;
-->

:::note
See [Simulation](../simulation/README.md) for general information about simulators, the simulation environment, and simulation configuration (e.g. supported vehicles).
:::

<a id="installation"></a>

## 安装

您可以通过启动 PX4 SITL和 Gazebo 来运行模拟，并加载机身配置（支持多旋翼飞机，飞机，VTOL，光流和多机仿真）。
- ** macOS：** [ Mac 上的开发环境](../setup/dev_env_mac.md)
- ** Linux：** [ Linux 上的开发环境（Ubuntu 16.04）> jMAVSim / Gazebo Simulation ](../setup/dev_env_linux.md#jmavsimgazebo-simulation)
- ** Windows：**不支持。

Additional installation instructions can be found on [gazebosim.org](http://gazebosim.org/tutorials?cat=guided_b&tut=guided_b1).


## 运行仿真

下文列出了支持的载具类型及对应的 `make` 指令（点击链接查看载具图像）。

以上指令启动了一个具有完整 UI 的载具。 其他选项包括：
```sh
cd ~/src/Firmware
make px4_sitl gazebo
```

通过终端运行 gazebo（或任何其他 sim）服务器和客户端查看器： `make px4_sitl gazebo_none_ide`

:::note
For the full list of build targets run `make px4_sitl list_vmd_make_targets` (and filter on those that start with `gazebo_`).
:::

| 探测车                                                                                                                                     | 指令                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [飞行器](../simulation/gazebo_vehicles.md#quadrotor)                                                                                       | `make clean
 make px4_sitl gazebo_typhoon_h480` |
| [具有光流的四旋翼](../simulation/gazebo_vehicles.md#quadrotor_optical_flow)                                                                     | `make px4_sitl gazebo_iris_opt_flow`            |
| [3DR Solo in Gazebo](../simulation/gazebo_vehicles.md#3dr_solo)                                                                         | `make px4_sitl gazebo_solo`                     |
| !!crwdBlockTags_82_sgaTkcolBdwrc!![Typhoon H480 (Hexrotor)](../simulation/gazebo_vehicles.md#typhoon_h480) (supports video streaming) | `make px4_sitl gazebo_typhoon_h480`             |
| [标准构型的固定翼](../simulation/gazebo_vehicles.md#standard_plane)                                                                             | `make px4_sitl gazebo_plane`                    |
| [Standard Plane (with catapult launch)](../simulation/gazebo_vehicles.md#standard_plane_catapult)                                       | `make px4_sitl gazebo_plane_catapult`           |
| [标准构型的 VTOL](../simulation/gazebo_vehicles.md#standard_vtol)                                                                            | `make px4_sitl gazebo_standard_vtol`            |
| [尾座式 VTOL](../simulation/gazebo_vehicles.md#tailsitter_vtol)                                                                            | `make px4_sitl gazebo_tailsitter`               |
| [阿克曼车 （UGV/Rover）](../simulation/gazebo_vehicles.md#ugv)                                                                                | `make px4_sitl gazebo_rover`                    |
| [海马体 TUHH (UUV: 无人水下航行器)](../simulation/gazebo_vehicles.md#uuv)                                                                         | `make px4_sitl gazebo_uuv_hippocampus`          |
| [船（USV：无人驾驶水面艇）](../simulation/gazebo_vehicles.md#usv)                                                                                  | `make px4_sitl gazebo_boat`                     |
| [Cloudship (Airship)](../simulation/gazebo_vehicles.md#airship)                                                                         | `make px4_sitl gazebo_cloudship`                |


控制台将打印出“PX4”的形状，加载指定机型的初始化和参数文件，等待（并连接到）仿真器。 一旦 INFO 打印出的 [ecl/EKF] 状态为 `commencing GPS fusion` ，则表明该载具已准备就绪可以解锁。

The commands above launch a single vehicle with the full UI. Other options include:
- 单独启动 Gazebo 和 PX4
- 在 [无头模式](#headless) 运行仿真将不会启动 Gazebo UI（使用的资源更少，速度更快）。


## 改变仿真环境中的世界

现在你可以输入如下命令让飞机起飞了：

Once PX4 has started it will launch the PX4 shell as shown below.

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


:::note
Right-clicking the quadrotor model allows to enable follow mode from the context menu, which is handy to keep it in view.
:::

![Gazebo UI](../../assets/simulation/gazebo/gazebo_follow.jpg)

只需在正常的* make *命令前加上`HEADLESS=1`，如下所示：

```sh
pxh> commander takeoff
```

## 把飞机飞上天

<a id="headless"></a>

### 四旋翼

Gazebo can be run in a *headless* mode in which the Gazebo UI is not launched. This starts up more quickly and uses less system resources (i.e. it is a more "lightweight" way to run the simulation).

要设置的变量有：`PX4_HOME_LAT`、`PX4_HOME_LON` 和 `PX4_HOME_ALT`。
```bash
HEADLESS=1 make px4_sitl gazebo_plane
```

<a id="custom_takeoff_location"></a>

### 带光流的四旋翼

The takeoff location in SITL Gazebo can be set using environment variables. This will override both the default takeoff location, and any value [set for the world](#set_world_location).

通过 *QGroundControl* 可引入操纵杆或者拇指操纵杆（[如何进行设置看这里](../simulation/README.md#joystickgamepad-integration)）。

此举可以缩短测试循环时间（重启 jMAVSim 需要耗费非常多的时间）。
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl gazebo
```


### 3DR Solo

当前的默认世界是位于目录 [worlds](https://github.com/PX4/sitl_gazebo/tree/b59e6e78e42d50f70224d1d0e506825590754d64/worlds) 中的 **iris.world**。 **iris.world** 中默认使用高程图生成地面景物。

```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl_default gazebo
```

For more information see: [Simulation > Run Simulation Faster than Realtime](../simulation/README.md#simulation_speed).


### 标准构型的固定翼飞机

To simulate wind speed, add this plugin to your world file and replace `SET_YOUR_WIND_SPEED` with the desired speed:
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
You can see this how this is done in [PX4/PX4-SITL_gazebo/worlds/windy.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/windy.world#L15-L26).

### 标准构型的 VTOL

启用/禁用GPS噪音：


### 尾座式 VTOL

单独启动 Gazebo 和 PX4:

This can cause difficulty when using a distance sensor. If there are unexpected results we recommend you change the model in **iris.model** from `uneven_ground` to `asphalt_plane`.

<a id="gps_noise"></a>

### 模拟 GPS 噪声

Gazebo can simulate GPS noise that is similar to that typically found in real systems (otherwise reported GPS values will be noise-free/perfect). This is useful when working on applications that might be impacted by GPS noise - e.g. precision positioning.

GPS noise is enabled if the target vehicle's SDF file contains a value for the `gpsNoise` element (i.e. it has the line: `<gpsNoise>true</gpsNoise>`). It is enabled by default in many vehicle SDF files: **solo.sdf**, **iris.sdf**, **standard_vtol.sdf**, **delta_wing.sdf**, **plane.sdf**, **typhoon_h480**, **tailsitter.sdf**.

To enable/disable GPS noise:
1. 构建任何 gazebo 目标以生成 SDF 文件（适用于所有机型）。 例如：
   ```
   make px4_sitl gazebo_iris
   ```
:::tip
The SDF files are not overwritten on subsequent builds.
:::

2. 打开目标车辆的 SDF 文件（例如**./Tools/sitl_gazebo/models/iris/iris.sdf **）。
3. 搜索 `gpsNoise` 元素： xml
   ```xml
   <gui>
         <plugin name="video_widget" filename="libgazebo_video_stream_widget.so"/>
       </gui>
   ```
   * 如果存在，则启用 GPS。 您可以通过删除以下行来禁用它：`<gpsNoise> true </gpsNoise>`
   * 如果未预设，则禁用 GPS 。 您可以通过将`gpsNoise`元素添加到`gps_plugin`部分来启用它（如上所示）。

启用插件后，您可以正常方式使用 Gazebo 运行 SITL：

<a id="set_world"></a>

## 使用/配置选项

PX4 supports a number of [Gazebo Worlds](../simulation/gazebo_worlds.md), which are stored in [PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) By default Gazebo displays a flat featureless plane, as defined in [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world).

You can load any of the worlds by specifying them as the final option in the PX4 configuration target.

来自 Gazebo 的视频应该像从真实相机那样显示在* QGroundControl *中。
```
make px4_sitl gazebo_hippocampus
```

:::note
There are *two underscores* after the model (`plane_cam`) indicating that the default debugger is used (none). See [Building the Code > PX4 Make Build Targets](../dev_setup/building_px4.md#px4-make-build-targets).
:::

You can also specify the full path to a world to load using the `PX4_SITL_WORLD` environment variable. This is useful if testing a new world that is not yet included with PX4.

:::tip
If the loaded world does not align with the map, you may need to [set the world location](#set_world_location).
:::

<a id="set_world_location"></a>

## Set World Location

启用按钮：

:::note
The vehicle is not spawned exactly at the Gazebo origin (0,0,0), but using a slight offset, which can highlight a number of common coding issues.
:::

If using a world that recreates a real location (e.g. a particular airport) this can result in a very obvious mismatch between what is displayed in the simulated world, and what is shown on the ground station map. To overcome this problem you can set the location of the world origin to the GPS co-ordinates where it would be in "real life".

除了运行`sitl_run.sh`的现有 cmake 目标以及 px4 的参数加载正确的模型之外，它还会创建一个名为`px4_ <mode>`的启动器目标，这是一个包装器，围绕原始 sitl px4 应用程序。 这个包装器只是嵌入应用程序参数，如当前工作目录和模型文件的路径。
:::

The location of the world is defined in the **.world** file by specifying the location of the origin using the `spherical_coordinates` tag. The latitude, longitude, elevation must all be specified (for this to be a valid).

这种方法可显著缩短调试周期，因为仿真器（例如 Gazebo ）总是在后台运行，而您只需重新运行 px4 这个非常轻量的进程。
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

The video below shows that the location of the environment is aligned with the gazebo world:

@模拟一个带有该相机的飞机：

<a id="start_px4_sim_separately"></a>

## 视频流

For extended development sessions it might be more convenient to start Gazebo and PX4 separately or even from within an IDE.

In addition to the existing cmake targets that run `sitl_run.sh` with parameters for px4 to load the correct model it creates a launcher targets named `px4_<mode>` that is a thin wrapper around original sitl px4 app. This thin wrapper simply embeds app arguments like current working directories and the path to the model file.

To start Gazebo and PX4 separately:

* 通过在终端中指定环境变量 `_ide` 来运行 gazebo（或任何其他 sim 卡）服务器和客户端查看器：
  ```sh
  make px4_sitl gazebo___ide
  ```
  或者
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

对支持的目标载具，视频流将自动启动。 例如，要在台风 Typhoon H480 上启动视频流：

:::note
The simulated camera is implemented in [PX4/sitl_gazebo/src/gazebo_geotagged_images_plugin.cpp](https://github.com/PX4/sitl_gazebo/blob/master/src/gazebo_geotagged_images_plugin.cpp).
:::

<a id="flight_termination"></a>

## 与 ROS 对接交互

*Gazebo* can be used to simulate deploying a [parachute](../peripherals/parachute.md) during [Flight Termination](../advanced_config/flight_termination.md) (flight termination is triggered by the PWM command that is simulated in *Gazebo*).

查看 SITL / Gazebo 相机视频流的最简单方法是在* QGroundControl *中。 只需打开** Settings > General **并将** Video Source **设置为* UDP 视频流*，将** UDP 端口**设置为* 5600 *：
```
make px4_sitl gazebo_if750a
```

To put the vehicle into flight termination state, you can force it to fail a [safety check](../config/safety.md) that has flight termination set as the failsafe action. For example, you could do this by forcing a [Geofence violation](../config/safety.md#geofence-failsafe).

For more information see:
- [飞行终止](../advanced_config/flight_termination.md)
- [降落伞](../peripherals/parachute.md)
- [ 安全配置（故障保护） ](../config/safety.md)

<a id="video"></a>

## 更多信息：

PX4 SITL for Gazebo supports UDP video streaming from a Gazebo camera sensor attached to a vehicle model. When streaming is enabled, you can connect to this stream from *QGroundControl* (on UDP port 5600) and view video of the Gazebo environment from the simulated vehicle - just as you would from a real camera. The video is streamed using a *gstreamer* pipeline and can be enabled/disabled using a button in the Gazebo UI.

The Gazebo camera sensor is supported/enabled on the following frames:
* [Typhoon H480](#typhoon_h480)


### 系统必备组件

*Gstreamer 1.0* is required for video streaming. The required dependencies should already have been [installed when you set up Gazebo](#installation) (they are included in the standard PX4 installation scripts/instructions for macOS and Ubuntu Linux).

:::note FYI
only, the dependencies include: `gstreamer1.0-plugins-base`, g`streamer1.0-plugins-good`, `gstreamer1.0-plugins-bad`, `gstreamer1.0-plugins-ugly`, `libgstreamer-plugins-base1.0-dev`.
:::

### Headless 模式

要扩展或自定义仿真界面，请编辑`Tools/sitl_gazebo`文件夹中的文件。 该代码可在 Github 上的[ sitl_gazebo repository ](https://github.com/px4/sitl_gazebo)上获得。
```
sudo apt-get install $(apt-cache --names-only search ^gstreamer1.0-* | awk '{ print $1 }' | grep -v gstreamer1.0-hybris) -y
```

Streaming can be paused/restarted using the Gazebo UI *Video ON/OFF* button..

![Video ON/OFF button](../../assets/simulation/gazebo/sitl_video_stream.png)


### 设置自定义起飞位置

The easiest way to view the SITL/Gazebo camera video stream is in *QGroundControl*. Simply open **Application Settings > General** and set **Video Source** to *UDP h.264 Video Stream* and **UDP Port** to *5600*:

![QGC Video Streaming Settings for Gazebo](../../assets/simulation/gazebo/qgc_gazebo_video_stream_udp.png)

The video from Gazebo should then display in *QGroundControl* just as it would from a real camera.

![QGC Video Streaming Gazebo Example](../../assets/simulation/gazebo/qgc_gazebo_video_stream_typhoon.jpg)

:::note
The Typhoon world is not very interesting.
:::

It is also possible to view the video using the *Gstreamer Pipeline*. Simply enter the following terminal command:
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


## 扩展和自定义

To extend or customize the simulation interface, edit the files in the `Tools/sitl_gazebo` folder. The code is available on the [sitl_gazebo repository](https://github.com/px4/sitl_gazebo) on Github.

:::note
The build system enforces the correct GIT submodules, including the simulator. It will not overwrite changes in files in the directory.
:::

## 更多信息

* [另见 Gazebo 模拟。](../simulation/ros_interface.md)
* [Gazebo Octomap](../simulation/gazebo_octomap.md)
