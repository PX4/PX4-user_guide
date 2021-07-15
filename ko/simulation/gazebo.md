# Gazebo 시뮬레이션

[Gazebo](http://gazebosim.org)는 물체 회피 및 컴퓨터 비전 테스트에 적합한 자율 로봇을 위한 강력한 3D 시뮬레이션 환경입니다. 이 페이지에서는 SITL과 단일 차량과 함께 사용하는 방법을 설명합니다. Gazebo는 [HITL](../simulation/hitl.md) 및 [다중 차량 시뮬레이션](../simulation/multi-vehicle-simulation.md)과 함께 사용할 수 있습니다.

**지원 차량:** 쿼드([Iris](../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor) 및 [솔로](../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo), Hex(Typhoon H480), [일반 쿼드 델타 VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol), 테일시터, 비행기, 로버, 잠수함/UUV.

:::warning
Gazebo는 차량제어 자동화를 위한 툴킷/오프보드 API인 [ROS](../ros/README.md)와 함께 자주 사용됩니다. ROS와 함께 PX4를 사용하려면, [ROS 지침](../simulation/ros_interface.md)을 따라 ROS와 Gazebo를 모두 **설치**하여야 합니다(따라서 설치 충돌을 피해야 함).
:::

@[유투브](https://www.youtube.com/watch?v=qfFF9-0k4KA&vq=hd720)

[![Mermaid Graph: Gazebo plugin](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEdhemViby0tPlBsdWdpbjtcbiAgUGx1Z2luLS0-TUFWTGluaztcbiAgTUFWTGluay0tPlNJVEw7IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)


<!-- original graph info
graph LR;
  Gazebo-- >Plugin;
  Plugin-- >MAVLink;
  MAVLink-- >SITL;
-->

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 대한 일반 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

## 설치

Gazebo 9 설정은 표준빌드방법에 포함되어 있습니다.
- **MacOS:** [Mac 개발 환경](../dev_setup/dev_env_mac.md)
- **Linux:** [Ubuntu LTS/Debian Linux의 개발 환경 > Gazebo, JMAVSim 및 NuttX(Pixhawk) 대상](../dev_setup/dev_env_linux_ubuntu.md#gazebo-jmavsim-and-nuttx-pixhawk-targets)
- **Windows:** 지원되지 않음.

추가 설치 방법은 [gazebosim.org](http://gazebosim.org/tutorials?cat=guided_b&tut=guided_b1)을 참고하십시오.


## 시뮬레이션 실행

로드할 기체 환경에서 PX4 SITL 및 Gazebo를 시작하여 시뮬레이션을 실행합니다(멀티콥터, 비행기, VTOL, 광학 흐름 및 다중 차량 시뮬레이션 지원).

가장 편리한 방법은 PX4 *PX4-Autopilot* 저장소의 루트 디렉토리에서 터미널을 열고 원하는 대상에 대해 `make`를 호출하는 것입니다. 예를 들어 쿼드로터 시뮬레이션을 시작하려면(기본값):
```sh
cd /path/to/PX4-Autopilot
make px4_sitl gazebo
```

지원되는 차량 및 `make` 명령은 아래에 나열되어 있습니다. 차량 이미지를 보려면 링크를 클릭하십시오.

:::note
빌드 대상의 전체 목록을 보려면 `make px4_sitl list_vmd_make_targets`를 실행하십시오(그리고 `gazebo_`로 시작하는 대상에서 필터링).
:::

| 차량                                                                                                              | 명령어                                    |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [쿼드콥터](../simulation/gazebo_vehicles.md#quadrotor)                                                              | `make px4_sitl gazebo`                 |
| [광류센서 장착 쿼드콥터](../simulation/gazebo_vehicles.md#quadrotor_optical_flow)                                         | `make px4_sitl gazebo_iris_opt_flow`   |
| [3DR Solo (쿼드콥터)](../simulation/gazebo_vehicles.md#3dr_solo)                                                    | `make px4_sitl gazebo_solo`            |
| <span id="typhoon_h480"></span>[Typhoon H480(헥스로터)](../simulation/gazebo_vehicles.md#typhoon_h480)(동영상 스트리밍 지원) | `make px4_sitl gazebo_typhoon_h480`    |
| [표준 항공기](../simulation/gazebo_vehicles.md#standard_plane)                                                       | `make px4_sitl gazebo_plane`           |
| [표준 비행기 (투석기 발사 포함)](../simulation/gazebo_vehicles.md#standard_plane_catapult)                                  | `make px4_sitl gazebo_plane_catapult`  |
| [표준 VTOL](../simulation/gazebo_vehicles.md#standard_vtol)                                                       | `make px4_sitl gazebo_standard_vtol`   |
| [테일시터 VTOL](../simulation/gazebo_vehicles.md#tailsitter_vtol)                                                   | `make px4_sitl gazebo_tailsitter`      |
| [Ackerman 차량 (UGV/Rover)](../simulation/gazebo_vehicles.md#ugv)                                                 | `make px4_sitl gazebo_rover`           |
| [HippoCampus TUHH (UUV: 무인 수중 차량)](../simulation/gazebo_vehicles.md#uuv)                                        | `make px4_sitl gazebo_uuv_hippocampus` |
| [보트 (USV: 무인 수상 차량)](../simulation/gazebo_vehicles.md#usv)                                                      | `make px4_sitl gazebo_boat`            |
| [클라우드쉽 (비행선)](../simulation/gazebo_vehicles.md#airship)                                                         | `make px4_sitl gazebo_cloudship`       |


:::note
[파일 및 코드 설치](../dev_setup/dev_env.md) 가이드는 빌드 오류가 있는 경우 참고하십시오.
:::

위의 명령은 전체 UI로 단일 차량을 시작합니다. 기타 옵션은 다음과 같습니다.
- [PX4와 Gazebo를 별도로 시작](#start_px4_sim_separately)하여 Gazebo를 계속 실행하고, 필요하면 PX4를 다시 시작할 수 있습니다(둘 다 다시 시작하는 것보다 빠름).
- Gazebo UI를 시작하지 않는 [헤드리스 모드](#headless)에서 시뮬레이션을 실행합니다(이는 적은 리소스를 사용하고 훨씬 빠름).


## 하늘로 띄우기

위의 `make` 명령은 먼저 PX4를 빌드한 다음, Gazebo 시뮬레이터를 실행합니다.

PX4가 시작되면 아래와 같은 PX4 셸이 시작됩니다.

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
콘솔은 PX4가 기체 고유의 초기화 및 매개변수 파일을 로드하고, 시뮬레이터가 실행되기를 기다리며(연결할 때) 상태를 출력합니다. [ecl/EKF]가 `GPS 융합을 시작`한다는 정보가 인쇄되면 차량은 시동 준비가 된 것입니다.


:::note
쿼드로터 모델을 마우스 오른쪽 버튼으로 클릭하면, 컨텍스트 메뉴에서 팔로우 모드를 활성화할 수 있어 보기에 편리합니다.
:::

![Gazebo UI](../../assets/simulation/gazebo/gazebo_follow.jpg)

다음을 입력하여 공중에 띄울 수 있습니다.

```sh
pxh> commander takeoff
```

## 사용법/설정 옵션

모든 시뮬레이터에 적용되는 옵션은 최상위 [시뮬레이션](../simulation/README.md#sitl-simulation-environment)에서 설명합니다(일부는 아래에서 중복될 수 있음).

### 센서/하드웨어 오류 시뮬레이션

[안전장치 시뮬레이션](../simulation/failsafes.md)에서는 GPS 오류와 배터리 소모와 같은 안전 비상안전장치를 트리거하는 방법을 설명합니다.

<a id="headless"></a>

### 헤드리스 모드

Gazebo can be run in a *headless* mode in which the Gazebo UI is not launched. This starts up more quickly and uses less system resources (i.e. it is a more "lightweight" way to run the simulation).

Simply prefix the normal `make` command with `HEADLESS=1` as shown:
```bash
HEADLESS=1 make px4_sitl gazebo_plane
```

<a id="custom_takeoff_location"></a>

### Set Custom Takeoff Location

The takeoff location in SITL Gazebo can be set using environment variables. This will override both the default takeoff location, and any value [set for the world](#set_world_location).

The variables to set are: `PX4_HOME_LAT`, `PX4_HOME_LON`, and `PX4_HOME_ALT`.

For example:
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl gazebo
```


### Change Simulation Speed

The simulation speed can be increased or decreased with respect to realtime using the environment variable `PX4_SIM_SPEED_FACTOR`.

```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl_default gazebo
```

For more information see: [Simulation > Run Simulation Faster than Realtime](../simulation/README.md#simulation_speed).


### Change Wind Speed

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

### Using a Joystick

Joystick and thumb-joystick support are supported through *QGroundControl* ([setup instructions here](../simulation/README.md#joystick-gamepad-integration)).


### Improving Distance Sensor Performance

The current default world is [PX4/sitl_gazebo/worlds/**iris.world**](https://github.com/PX4/sitl_gazebo/tree/master/worlds)), which uses a heightmap as ground.

This can cause difficulty when using a distance sensor. If there are unexpected results we recommend you change the model in **iris.model** from `uneven_ground` to `asphalt_plane`.


<a id="gps_noise"></a>

### Simulating GPS Noise

Gazebo can simulate GPS noise that is similar to that typically found in real systems (otherwise reported GPS values will be noise-free/perfect). This is useful when working on applications that might be impacted by GPS noise - e.g. precision positioning.

GPS noise is enabled if the target vehicle's SDF file contains a value for the `gpsNoise` element (i.e. it has the line: `<gpsNoise>true</gpsNoise>`). It is enabled by default in many vehicle SDF files: **solo.sdf**, **iris.sdf**, **standard_vtol.sdf**, **delta_wing.sdf**, **plane.sdf**, **typhoon_h480**, **tailsitter.sdf**.

To enable/disable GPS noise:
1. Build any gazebo target in order to generate SDF files (for all vehicles). For example:
   ```
   make px4_sitl gazebo_iris
   ```
:::tip
The SDF files are not overwritten on subsequent builds.
:::

2. Open the SDF file for your target vehicle (e.g. **./Tools/sitl_gazebo/models/iris/iris.sdf**).
3. Search for the `gpsNoise` element:
   ```xml
   <plugin name='gps_plugin' filename='libgazebo_gps_plugin.so'>
     <robotNamespace/>
     <gpsNoise>true</gpsNoise>
   </plugin>
   ```
   * If it is present, GPS is enabled. You can disable it by deleting the line: `<gpsNoise>true</gpsNoise>`
   * If it is not preset GPS is disabled. You can enable it by adding the `gpsNoise` element to the `gps_plugin` section (as shown above).

The next time you build/restart Gazebo it will use the new GPS noise setting.


<a id="set_world"></a>

## Loading a Specific World

PX4 supports a number of [Gazebo Worlds](../simulation/gazebo_worlds.md), which are stored in [PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)) By default Gazebo displays a flat featureless plane, as defined in [empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world).

You can load any of the worlds by specifying them as the final option in the PX4 configuration target.

For example, to load the *warehouse* world, you can append it as shown:
```
make px4_sitl_default gazebo_plane_cam__warehouse
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

The vehicle gets spawned very close to the origin of the world model at some simulated GPS location.

:::note
The vehicle is not spawned exactly at the Gazebo origin (0,0,0), but using a slight offset, which can highlight a number of common coding issues.
:::

If using a world that recreates a real location (e.g. a particular airport) this can result in a very obvious mismatch between what is displayed in the simulated world, and what is shown on the ground station map. To overcome this problem you can set the location of the world origin to the GPS co-ordinates where it would be in "real life".

:::note
You can also set a [Custom Takeoff Location](#custom_takeoff_location) that does the same thing. However adding the location to the map is easier (and can still be over-ridden by setting a custom location if needed).
:::

The location of the world is defined in the **.world** file by specifying the location of the origin using the `spherical_coordinates` tag. The latitude, longitude, elevation must all be specified (for this to be a valid).

An example can be found in the [sonoma_raceway.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/sonoma_raceway.world):
```
    <spherical_coordinates>
      <surface_model>EARTH_WGS84</surface_model>
      <latitude_deg>38.161479</latitude_deg>
      <longitude_deg>-122.454630</longitude_deg>
      <elevation>488.0</elevation>
    </spherical_coordinates>
```

You can test this by spawning a rover in the [Sonoma Raceway World](../simulation/gazebo_worlds.md#sonoma-raceway) using the following `make` command (note that spawning takes longer the first time as the model needs to be downloaded from the model database):
```
make px4_sitl gazebo_rover__sonoma_raceway
```

The video below shows that the location of the environment is aligned with the gazebo world:

@[youtube](https://youtu.be/-a2WWLni5do)


<a id="start_px4_sim_separately"></a>

## Starting Gazebo and PX4 Separately

For extended development sessions it might be more convenient to start Gazebo and PX4 separately or even from within an IDE.

In addition to the existing cmake targets that run `sitl_run.sh` with parameters for px4 to load the correct model it creates a launcher targets named `px4_<mode>` that is a thin wrapper around original sitl px4 app. This thin wrapper simply embeds app arguments like current working directories and the path to the model file.

To start Gazebo and PX4 separately:

* Run gazebo (or any other sim) server and client viewers via the terminal specifing an `_ide` variant:
  ```sh
  make px4_sitl gazebo___ide
  ```
  or
  ```sh
  make px4_sitl gazebo_iris_ide
  ```
* In your IDE select `px4_<mode>` target you want to debug (e.g. `px4_iris`)
* Start the debug session directly from IDE

This approach significantly reduces the debug cycle time because simulator (e.g. Gazebo) is always running in background and you only re-run the px4 process which is very light.


## Simulated Survey Camera

The *Gazebo* survey camera simulates a [MAVLink camera](https://mavlink.io/en/services/camera.html) that captures geotagged JPEG images and sends camera capture information to a connected ground station. The camera also supports video streaming. It can be used to test camera capture, in particular within survey missions.

The camera emits the [CAMERA_IMAGE_CAPTURED](https://mavlink.io/en/messages/common.html#CAMERA_IMAGE_CAPTURED) message every time an image is captured. The captured images are saved to: **PX4-Autopilot/build/px4_sitle_default/tmp/frames/DSC_n_.jpg** (where _n_ starts as 00000 and is iterated by one on each capture).

To simulate a plane with this camera:
```
make px4_sitl_default gazebo_plane_cam
```

:::note
The camera also supports/responds to the following MAVLink commands: [MAV_CMD_REQUEST_CAMERA_CAPTURE_STATUS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_CAPTURE_STATUS), [MAV_CMD_REQUEST_STORAGE_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_STORAGE_INFORMATION), [MAV_CMD_REQUEST_CAMERA_SETTINGS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_SETTINGS), [MAV_CMD_REQUEST_CAMERA_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_CAMERA_INFORMATION), [MAV_CMD_RESET_CAMERA_SETTINGS](https://mavlink.io/en/messages/common.html#MAV_CMD_RESET_CAMERA_SETTINGS), [MAV_CMD_STORAGE_FORMAT](https://mavlink.io/en/messages/common.html#MAV_CMD_STORAGE_FORMAT), [MAV_CMD_SET_CAMERA_ZOOM](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_ZOOM), [MAV_CMD_IMAGE_START_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_START_CAPTURE), [MAV_CMD_IMAGE_STOP_CAPTURE](https://mavlink.io/en/messages/common.html#MAV_CMD_IMAGE_STOP_CAPTURE), [MAV_CMD_REQUEST_VIDEO_STREAM_INFORMATION](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_VIDEO_STREAM_INFORMATION), [MAV_CMD_REQUEST_VIDEO_STREAM_STATUS](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_VIDEO_STREAM_STATUS), [MAV_CMD_SET_CAMERA_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_CAMERA_MODE).
:::

:::note
The simulated camera is implemented in [PX4/PX4-SITL_gazebo/master/src/gazebo_camera_manager_plugin.cpp](https://github.com/PX4/PX4-SITL_gazebo/blob/master/src/gazebo_camera_manager_plugin.cpp).
:::

<a id="flight_termination"></a>

## Simulated Parachute/Flight Termination

*Gazebo* can be used to simulate deploying a [parachute](../peripherals/parachute.md) during [Flight Termination](../advanced_config/flight_termination.md) (flight termination is triggered by the PWM command that is simulated in *Gazebo*).

The `if750a` target has a parachute attached to the vehicle. To simulate the vehicle, run the following command:
```
make px4_sitl gazebo_if750a
```

To put the vehicle into flight termination state, you can force it to fail a [safety check](../config/safety.md) that has flight termination set as the failsafe action. For example, you could do this by forcing a [Geofence violation](../config/safety.md#geofence-failsafe).

For more information see:
- [Flight Termination](../advanced_config/flight_termination.md)
- [Parachute](../peripherals/parachute.md)
- [Safety Configuration (Failsafes)](../config/safety.md)

<a id="video"></a>

## Video Streaming

PX4 SITL for Gazebo supports UDP video streaming from a Gazebo camera sensor attached to a vehicle model. When streaming is enabled, you can connect to this stream from *QGroundControl* (on UDP port 5600) and view video of the Gazebo environment from the simulated vehicle - just as you would from a real camera. The video is streamed using a *gstreamer* pipeline and can be enabled/disabled using a button in the Gazebo UI.

The Gazebo camera sensor is supported/enabled on the following frames:
* [Typhoon H480](#typhoon_h480)


### Prerequisites

*Gstreamer 1.0* is required for video streaming. The required dependencies should already have been [installed when you set up Gazebo](#installation) (they are included in the standard PX4 installation scripts/instructions for macOS and Ubuntu Linux).

:::note FYI
only, the dependencies include: `gstreamer1.0-plugins-base`, g`streamer1.0-plugins-good`, `gstreamer1.0-plugins-bad`, `gstreamer1.0-plugins-ugly`, `libgstreamer-plugins-base1.0-dev`.
:::

### Start/Stop Video Streaming

Video streaming is automatically started when supported by the target vehicle. For example, to start streaming video on the Typhoon H480:
```
make px4_sitl gazebo_typhoon_h480
```

Streaming can be paused/restarted using the Gazebo UI *Video ON/OFF* button..

![Video ON/OFF button](../../assets/simulation/gazebo/sitl_video_stream.png)


### How to View Gazebo Video

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

### Verbose Logging

SITL fails silently when there is something wrong with the gazebo model. You can enable more verbose logging using `VERBOSE_SIM`, as shown:

```
export VERBOSE_SIM=1
make px4_sitl gazebo
```

or

```
VERBOSE_SIM=1 make px4_sitl gazebo
```


## Extending and Customizing

To extend or customize the simulation interface, edit the files in the `Tools/sitl_gazebo` folder. The code is available on the [sitl_gazebo repository](https://github.com/px4/sitl_gazebo) on Github.

:::note
The build system enforces the correct GIT submodules, including the simulator. It will not overwrite changes in files in the directory.
:::

## Further Information

* [ROS with Gazebo Simulation](../simulation/ros_interface.md)
* [Gazebo Octomap](../simulation/gazebo_octomap.md)
