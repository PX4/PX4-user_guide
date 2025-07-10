---
canonicalUrl: https://docs.px4.io/main/zh/simulation/README
---

# 仿真

在仿真机中模拟器允许 px4 飞行代码来控制计算机建模工具。 您可以与此工具进行交互，就像您可以使用 *QGroundControl*、非机载 api 或无线电控制器/游戏板与真正的车辆进行交互一样。

:::tip
Simulation is a quick, easy, and most importantly, *safe* way to test changes to PX4 code before attempting to fly in the real world. It is also a good way to start flying with PX4 when you haven't yet got a vehicle to experiment with.
:::

PX4 supports both *Software In the Loop (SITL)* simulation, where the flight stack runs on computer (either the same computer or another computer on the same network) and *Hardware In the Loop (HITL)* simulation using a simulation firmware on a real flight controller board.

Information about available simulators and how to set them up are provided in the next section. The other sections provide general information about how the simulator works, and are not required to *use* the simulators.


## 支持的仿真器

有关如何设置和使用仿真器的说明，请参见上面链接的主题。

| 仿真器                                                                     | 描述                                                                                                                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gazebo](../simulation/gazebo.md)                                       | <p><strong>强烈建议使用此仿真器。</strong></p><p>它具有功能强大的 3D 仿真环境, 特别适用于测试对象避障和计算机视觉。 它还可用于 [多工具仿真](../simulation/multi-vehicle-simulation.md)，通常用于 [ROS](../simulation/ros_interface.md)，这是一种用于自动控制的工具集。 </p><p><strong>Supported Vehicles:</strong> Quad ([Iris](../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor) and [Solo](../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo), Hex (Typhoon H480), [Generic quad delta VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol), Tailsitter, Plane, Rover, Submarine </p>                                                                             |
| [FlightGear](../simulation/flightgear.md)                               | <p>A simulator that provides physically and visually realistic simulations. In particular it can simulate many weather conditions, including thunderstorms, snow, rain and hail, and can also simulate thermals and different types of atmospheric flows. [Multi-vehicle simulation](../simulation/multi_vehicle_flightgear.md) is also supported.</p> <p><strong>Supported Vehicles:</strong> Plane, Autogyro, Rover</p>                                                                                                      |
| [JSBSim](../simulation/jsbsim.md)                                       | <p>A simulator that provides advanced flight dynamics models. This can be used to model realistic flight dynamics based on wind tunnel data.</p> <p><strong>Supported Vehicles:</strong> Plane, Quad, Hex</p>                                                                                                      |
| [jMAVSim](../simulation/jmavsim.md)                                     | A simple multirotor simulator that allows you to fly *copter* type vehicles around a simulated world. <p>它易设置，可以用来测试您的工具是否可以起飞、飞行、降落、并对各种故障条件 (例如 gps 故障) 做出适当的反应。 它也可用于 [多机仿真 ](../simulation/multi_vehicle_jmavsim.md)。</p><p><strong>支持机型： </strong>四旋翼</p> |
| [AirSim](../simulation/airsim.md)                                       | <p>A cross platform simulator that provides physically and visually realistic simulations. 这个模拟器需要大量的资源，需要一台比这里描述的其他仿真器更强大的计算机。</p><p><strong>支持机型: </0 >Iris （多转子模型和 x 配置中 px4 quadrotor 的配置）。</p>                                                                                                     |
| [Simulation-In-Hardware](../simulation/simulation-in-hardware.md) (SIH) | <p>An alternative to HITL that offers a hard real-time simulation directly on the hardware autopilot.</p><p><strong>支持机型： </strong>四旋翼</p>                                                                                                    |

Instructions for how to setup and use the simulators are in the topics linked above.

---
所有模拟器都使用 Simulator MAVLink API 与 PX4 进行通信。 该 API 定义了一组 MAVLink 消息，这些消息将仿真机的传感器数据提供给 PX4，并从将应用于仿真机的飞行代码返回电机和执行器值。


## 仿真器 MAVLink API

All simulators communicate with PX4 using the Simulator MAVLink API. This API defines a set of MAVLink messages that supply sensor data from the simulated world to PX4 and return motor and actuator values from the flight code that will be applied to the simulated vehicle. The image below shows the message flow.

![Simulator MAVLink API](../../assets/simulation/px4_simulator_messages.png)

:::note
A SITL build of PX4 uses [simulator_mavlink.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/simulator/simulator_mavlink.cpp) to handle these messages while a hardware build in HIL mode uses [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp). 这些端口是： All motors / actuators are blocked, but internal software is fully operational.
:::

The messages are described below (see links for specific detail).

| 消息                                                                                                             | 方向        | 参数描述                                                                            |
| -------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| [MAV_MODE:MAV_MODE_FLAG_HIL_ENABLED](https://mavlink.io/en/messages/common.html#MAV_MODE_FLAG_HIL_ENABLED) | 不可用       | 使用模拟时的模式标志。 所有电机/执行器都被卡停，但内部软件可以完全正常运行。                                         |
| [HIL_ACTUATOR_CONTROLS](https://mavlink.io/en/messages/common.html#HIL_ACTUATOR_CONTROLS)                    | PX4 至 Sim | PX4 控制输出 （电机、执行器）。                                                              |
| [HIL_SENSOR](https://mavlink.io/en/messages/common.html#HIL_SENSOR)                                            | Sim 至 PX4 | 在 NED 体框架中以 SI 单位模拟 IMU 读数。                                                     |
| [HIL_GPS](https://mavlink.io/en/messages/common.html#HIL_GPS)                                                  | Sim 至 PX4 | 模拟的 GPS RAW 传感器值。                                                               |
| [HIL_OPTICAL_FLOW](https://mavlink.io/en/messages/common.html#HIL_OPTICAL_FLOW)                              | Sim 至 PX4 | 来自流量传感器的模拟光流 （例如 PX4FLOW 或光学鼠标传感器）。                                             |
| [HIL_STATE_QUATERNION](https://mavlink.io/en/messages/common.html#HIL_STATE_QUATERNION)                      | Sim 至 PX4 | 包含实际的“仿真”无人机位置、姿态、速度等。 这可以记录并与 px4 的分析和调试估计进行比较 （例如，检查估计器在噪声 （仿真） 传感器输入中的工作情况）。 |
| [HIL_RC_INPUTS_RAW](https://mavlink.io/en/messages/common.html#HIL_RC_INPUTS_RAW)                            | Sim 至 PX4 | 收到 RC 通道的 RAW 值。                                                                |


## 默认 PX4 MAVLink UDP 端口

By default, PX4 uses commonly established UDP ports for MAVLink communication with ground control stations (e.g. *QGroundControl*), Offboard APIs (e.g. MAVSDK, MAVROS) and simulator APIs (e.g. Gazebo). These ports are:

* PX4's remote UDP Port **14550** is used for communication with ground control stations. 期望外接 APIs 监听此端口上的连接。 *QGroundControl* listens to this port by default.
* PX4's remote UDP Port **14540** is used for communication with offboard APIs. 期望 GCS 将侦听此端口上的连接。 *QGroundControl*默认侦听此端口。
:::
* The simulator's local TCP Port **4560** is used for communication with PX4. PX4 侦听此端口，仿真器应通过向该端口广播数据来启动通信。

如果使用正常的生成系统 SITL `make` 配置目标 （请参阅下一节），则 SITL 和模拟器都将在同一台计算机上启动，并自动配置上述端口。 您可以配置其他 MAVLink UDP 连接，并以其他方式修改生成配置和初始化文件中的模拟环境。


<!-- A useful discussion about UDP ports here: https://github.com/PX4/PX4-user_guide/issues/1035#issuecomment-777243106 --> 


## SITL 仿真环境

The diagram below shows a typical SITL simulation environment for any of the supported simulators.

![PX4 SITL overview](../../assets/simulation/px4_sitl_overview.svg)

The different parts of the system connect via UDP, and can be run on either the same computer or another computer on the same network.

* PX4 uses a simulation-specific module to connect to the simulator's local TCP port 4560. Simulators then exchange information with PX4 using the [Simulator MAVLink API](#simulator-mavlink-api) described above. SITL 和模拟器上的 PX4 可以在同一台计算机上运行，也可以在同一网络上运行不同的计算机。 :::note Simulators can also use the *microRTPS bridge* ([PX4-FastRTPS Bridge](../middleware/micrortps.md)) to directly interact with PX4 (i.e. via [UORB topics](../middleware/uorb.md) rather than MAVLink). This approach *may* used by [Gazebo multi-vehicle simulation](../simulation/multi_vehicle_simulation_gazebo.md#build-and-test-rtps-dds).
:::
* PX4 uses the normal MAVLink module to connect to ground stations and external developer APIs like MAVSDK or ROS
  - Ground stations listen to PX4's remote UDP port: `14550`
  - External developer APIs listen to PX4's remote UDP port: `14540`. For multi-vehicle simulations, PX4 sequentially allocates a separate remote port for each instance from `14540` to `14549` (additional instances all use port `14549`).
* PX4 defines a number of *local* UDP ports (`14580`,`18570`), which are sometimes used when networking with PX4 running in a container or virtual machine. These are not recommended for "general" use and may change in future.
* A serial connection may be used to connect [Joystick/Gamepad](../config/joystick.md) hardware via *QGroundControl*.

If you use the normal build system SITL `make` configuration targets (see next section) then both SITL and the Simulator will be launched on the same computer and the ports above will automatically be configured. You can configure additional MAVLink UDP connections and otherwise modify the simulation environment in the build configuration and initialisation files.


### 启动/构建 SITL 模拟

The build system makes it very easy to build and start PX4 on SITL, launch a simulator, and connect them. The syntax (simplified) looks like this:
```
make px4_sitl simulator[_vehicle-model]
```
使用 jMAVSim 或者 Gazebo 进行 SITL 仿真时，我们可以以比实际时间流速更快或者更慢的时间流速运行仿真。

A number of examples are shown below, and there are many more in the individual pages for each of the simulators:

```sh
# 启动固定翼机型的 Gazebo
make px4_sitl gazebo_plane

# 启动有光流的Iris机型的 Gazebo
make px4_sitl gazebo_iris_opt_flow

# 启动Iris（默认机型）的 JMavSim
make px4_sitl jmavsim
```

The simulation can be further configured via environment variables:
- `PX4_ESTIMATOR`：此变量配置要使用的估算器。 Possible options are: `ekf2` (default), `lpe` (deprecated). 在运行模拟之前，可以通过 `export PX4_ESTIMATOR=lpe` 进行设置。

The syntax described here is simplified, and there are many other options that you can configure via *make* - for example, to set that you wish to connect to an IDE or debugger. For more information see: [Building the Code > PX4 Make Build Targets](../dev_setup/building_px4.md#px4-make-build-targets).

<a id="simulation_speed"></a>

### 以比实际时间更快的流速运行仿真

SITL can be run faster or slower than realtime when using jMAVSim or Gazebo.

The speed factor is set using the environment variable `PX4_SIM_SPEED_FACTOR`. For example, to run the jMAVSim simulation at 2 times the real time speed:
```
PX4_SIM_SPEED_FACTOR=2 make px4_sitl jmavsim
```
To run at half real-time:
```
PX4_SIM_SPEED_FACTOR=0.5 make px4_sitl jmavsim
```

You can apply the factor to all SITL runs in the current session using `EXPORT`:
```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl jmavsim
```

:::note
At some point IO or CPU will limit the speed that is possible on your machine and it will be slowed down "automatically". Powerful desktop machines can usually run the simulation at around 6-10x, for notebooks the achieved rates can be around 3-4x.
:::

:::note
To avoid PX4 detecting data link timeouts, increase the value of param [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) proportional to the simulation rate. For example, if `COM_DL_LOSS_T` is 10 in realtime, at 10x simulation rate increase to 100.
:::

### Lockstep Simulation

PX4 SITL and the simulators (jMAVSim or Gazebo) have been set up to run in *lockstep*. What this means is that PX4 and the simulator wait on each other for sensor and actuator messages, rather than running at their own speeds.

:::note
Lockstep makes it possible to [run the simulation faster or slower than realtime](#simulation_speed), and also to pause it in order to step through code.
:::

The sequence of steps for lockstep are:
1. The simulation sends a sensor message [HIL_SENSOR](https://mavlink.io/en/messages/common.html#HIL_SENSOR) including a timestamp `time_usec` to update the sensor state and time of PX4.
1. PX4 receives this and does one iteration of state estimation, controls, etc. and eventually sends an actuator message [HIL_ACTUATOR_CONTROLS](https://mavlink.io/en/messages/common.html#HIL_ACTUATOR_CONTROLS).
1. The simulation waits until it receives the actuator/motor message, then simulates the physics and calculates the next sensor message to send to PX4 again.

The system starts with a "freewheeling" period where the simulation sends sensor messages including time and therefore runs PX4 until it has initialized and responds with an actuator message.

#### Disable Lockstep Simulation

The lockstep simulation can be disabled if, for example, SITL is to be used with a simulator that does not support this feature. In this case the simulator and PX4 use the host system time and do not wait on each other.

To disable lockstep in PX4, use `set(ENABLE_LOCKSTEP_SCHEDULER no)` in the [SITL board config](https://github.com/PX4/PX4-Autopilot/blob/77097b6adc70afbe7e5d8ff9797ed3413e96dbf6/boards/px4/sitl/default.cmake#L104).

有关设置信息，请参阅 *QGroundControl 用户指南 *：

To disable lockstep in jMAVSim, remove `-l` in [jmavsim_run.sh](https://github.com/PX4/PX4-Autopilot/blob/77097b6adc70afbe7e5d8ff9797ed3413e96dbf6/Tools/sitl_run.sh#L75), or make sure otherwise that the java binary is started without the `-lockstep` flag.


### 启动脚本

Scripts are used to control which parameter settings to use or which modules to start. They are located in the [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d-posix) directory, the `rcS` file is the main entry point. See [System Startup](../concept/system_startup.md) for more information.

### Simulating Failsafes and Sensor/Hardware Failure

其他模拟器可以使用相同的方法来实现相机支持。


## HITL 仿真环境

With Hardware-in-the-Loop (HITL) simulation the normal PX4 firmware is run on real hardware. The HITL Simulation Environment in documented in: [HITL Simulation](../simulation/hitl.md).


## 操纵杆／手柄集成

这不是 "开箱即用" 的，因为 PX4 在默认情况下不会将数据包路由到外部接口 (以避免垃圾邮件和不同的模拟相互干扰)。 相反，它将数据包路由到 "本地主机"。 If you don't have a joystick you can alternatively control the vehicle using QGroundControl's onscreen virtual thumbsticks.

For setup information see the *QGroundControl User Guide*:
* [操纵杆设置](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html)
* [虚拟操纵杆](https://docs.qgroundcontrol.com/en/SettingsView/VirtualJoystick.html)

<!-- FYI Airsim info on this setting up remote controls: https://github.com/Microsoft/AirSim/blob/master/docs/remote_controls.md -->


## 相机模拟

PX4 supports capture of both still images and video from within the [Gazebo](../simulation/gazebo.md) simulated environment. This can be enabled/set up as described in [Gazebo > Video Streaming](../simulation/gazebo.md#video).

The simulated camera is a gazebo plugin that implements the [MAVLink Camera Protocol](https://mavlink.io/en/protocol/camera.html)<!-- **PX4-Autopilot/Tools/sitl_gazebo/src/gazebo_geotagged_images_plugin.cpp -->. PX4 connects/integrates with this camera in *exactly the same way* as it would with any other MAVLink camera:
1. [TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE) must be set to `3` to configure the camera trigger driver for use with a MAVLink camera :::tip In this mode the driver just sends a [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message whenever an image capture is requested. For more information see [Camera](../peripherals/camera.md).
:::

1. PX4 必须在 GCS 和（模拟器）MAVLink Camera 之间转发所有摄像机命令。 You can do this by starting [MAVLink](../modules/modules_communication.md#mavlink) with the `-f` flag as shown, specifying the UDP ports for the new connection.
   ```
   mavlink start -u 14558 -o 14530 -r 4000 -f -m camera
   ```
:::note
More than just the camera MAVLink messages will be forwarded, but the camera will ignore those that it doesn't consider relevant.
:::

The same approach can be used by other simulators to implement camera support.

## 在远程服务器上运行仿真

It is possible to run the simulator on one computer, and access it from another computer on the same network (or on another network with appropriate routing). This might be useful, for example, if you want to test a drone application running on real companion computer hardware running against a simulated vehicle.

This does not work "out of the box" because PX4 does not route packets to external interfaces by default (in order to avoid spamming the network and different simulations interfering with each other). Instead it routes traffic internally - to "localhost".

There are a number of ways to make the UDP packets available on external interfaces, as outlined below.

### 启用 MAV_BROADCAST

The [mavlink-router](https://github.com/intel/mavlink-router) can be used to route packets from localhost to an external interface.

To route packets between SITL running on one computer (sending MAVLink traffic to localhost on UDP port 14550), and QGC running on another computer (e.g. at address `10.73.41.30`) you could:

- Start *mavlink-router* with the following command:
  ```
  mavlink-routerd -e 10.73.41.30:14550 127.0.0.1:14550
  ```
- Use a *mavlink-router* conf file.
  ```
  [UdpEndpoint QGC]
  Mode = Normal
  Address = 10.73.41.30
  Port = 14550

  [UdpEndpoint SIM]
  Mode = Eavesdropping
  Address = 127.0.0.1
  Port = 14550
  ```

:::note
More information about *mavlink-router* configuration can be found [here](https://github.com/intel/mavlink-router/#running).
:::

### 使用 MAVLink 路由器

The [mavlink module](../modules/modules_communication.md#mavlink_usage) routes to *localhost* by default, but you can enable UDP broadcasting of heartbeats using its `-p` option. Any remote computer on the network can then connect to the simulator by listening to the appropriate port (i.e. 14550 for *QGroundControl*).

:::note UDP
broadcasting provides a simple way to set up the connection when there is only one simulation running on the network. Do not use this approach if there are multiple simulations running on the network (you might instead [publish to a specific address](#enable-streaming-to-specific-address)).
:::

This should be done in an appropriate configuration file where `mavlink start` is called. For example: [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS).


### 修改外部广播的配置

The [mavlink module](../modules/modules_communication.md#mavlink_usage) routes to *localhost* by default, but you can specify an external IP address to stream to using its `-t` option. The specified remote computer can then connect to the simulator by listening to the appropriate port (i.e. 14550 for *QGroundControl*).

This should be done in various configuration files where `mavlink start` is called. For example: [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS).


### SSH 通道

SSH tunneling is a flexible option because the simulation computer and the system using it need not be on the same network.

:::note
You might similarly use VPN to provide a tunnel to an external interface (on the same network or another network).
:::

One way to create the tunnel is to use SSH tunneling options. The tunnel itself can be created by running the following command on *localhost*, where `remote.local` is the name of a remote computer:
```
ssh -C -fR 14551:localhost:14551 remote.local
```

The UDP packets need to be translated to TCP packets so they can be routed over SSH. The [netcat](https://en.wikipedia.org/wiki/Netcat) utility can be used on both sides of the tunnel - first to convert packets from UDP to TCP, and then back to UDP at the other end.

:::tip QGC
must be running before executing *netcat*.
:::

On the *QGroundControl* computer, UDP packet translation may be implemented by running following commands:
```
mkfifo /tmp/tcp2udp
netcat -lvp 14551 < /tmp/tcp2udp | netcat -u localhost 14550 > /tmp/tcp2udp
```
On the simulator side of the SSH tunnel, the command is:
```
mkfifo /tmp/udp2tcp
netcat -lvup 14550 < /tmp/udp2tcp | netcat localhost 14551 > /tmp/udp2tcp
```

The port number `14550` is valid for connecting to QGroundControl or another GCS, but should be adjusted for other endpoints (e.g. developer APIs etc.).

The tunnel may in theory run indefinitely, but *netcat* connections may need to be restarted if there is a problem.

The [QGC_remote_connect.bash](https://raw.githubusercontent.com/ThunderFly-aerospace/sitl_gazebo/autogyro-sitl/scripts/QGC_remote_connect.bash) script can be run on the QGC computer to automatically setup/run the above instructions. The simulation must already be running on the remote server, and you must be able to SSH into that server.
