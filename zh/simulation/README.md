# 仿真

在仿真机中模拟器允许 px4 飞行代码来控制计算机建模工具。 您可以与此工具进行交互，就像您可以使用 *QGroundControl*、非机载 api 或无线电控制器/游戏板与真正的车辆进行交互一样。

> **Tip**仿真是一种快速、简单、最重要的方法，*safe* 的方法来测试对 px4 代码的更改，然后再尝试在现实世界中飞行。 当你还没有飞行器可以试验的时候，使用 px4 来模拟飞行的就是一种好方法。

Px4 支持 *软件在环（SITL）* 仿真，其中飞行堆栈在计算机上运行（同一台计算机或同一网络上的另一台计算机），也支持 *硬件在环（HITL）*仿真，即使用真实飞行电路板来运行仿真。

下一节将提供有关可用仿真器以及如何配置仿真仿真器的信息。 其他部分提供了有关仿真器如何工作的普通信息, 并且不需要 *use* 模拟器。


## 支持的仿真器

以下仿真器与 px4 一起工作，用于 HITL 和/或 SITL 仿真。

| 仿真器                                                                     | 描述                                                                                                                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gazebo](../simulation/gazebo.md)                                       | <p><strong>强烈建议使用此仿真器。</strong></p><p>它具有功能强大的 3D 仿真环境, 特别适用于测试对象避障和计算机视觉。 它还可用于 <a href="../simulation/multi-vehicle-simulation.md">多工具仿真</a>，通常用于 <a href="../simulation/ros_interface.md">ROS</a>，这是一种用于自动控制的工具集。 </p><p><strong>Supported Vehicles:</strong> Quad (<a href="../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor">Iris</a> and <a href="../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo">Solo</a>), Hex (Typhoon H480), <a href="../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol">Generic quad delta VTOL</a>, Tailsitter, Plane, Rover, Submarine </p>                                                                             |
| [FlightGear](../simulation/flightgear.md)                               | <p>A simulator that provides physically and visually realistic simulations. In particular it can simulate many weather conditions, including thunderstorms, snow, rain and hail, and can also simulate thermals and different types of atmospheric flows. <a href="../simulation/multi_vehicle_flightgear.md">Multi-vehicle simulation</a> is also supported.</p> <p><strong>Supported Vehicles:</strong> Plane, Autogyro, Rover</p>                                                                                                      |
| [JSBSim](../simulation/jsbsim.md)                                       | <p>A simulator that provides advanced flight dynamics models. This can be used to model realistic flight dynamics based on wind tunnel data.</p> <p><strong>Supported Vehicles:</strong> Plane, Quad, Hex</p>                                                                                                      |
| [jMAVSim](../simulation/jmavsim.md)                                     | A simple multirotor simulator that allows you to fly *copter* type vehicles around a simulated world. <p>它易设置，可以用来测试您的工具是否可以起飞、飞行、降落、并对各种故障条件 (例如 gps 故障) 做出适当的反应。 它也可用于 <a href="../simulation/multi_vehicle_jmavsim.md">多机仿真 </0 >。</p><p><strong>支持机型： </strong>四旋翼</p> |
| [AirSim](../simulation/airsim.md)                                       | <p>A cross platform simulator that provides physically and visually realistic simulations. 这个模拟器需要大量的资源，需要一台比这里描述的其他仿真器更强大的计算机。</p><p><strong>支持机型: </0 >Iris （多转子模型和 x 配置中 px4 quadrotor 的配置）。</p>                                                                                                     |
| [Simulation-In-Hardware](../simulation/simulation-in-hardware.md) (SIH) | <p>An alternative to HITL that offers a hard real-time simulation directly on the hardware autopilot.</p><p><strong>支持机型： </strong>四旋翼</p>                                                                                                    |

有关如何设置和使用仿真器的说明，请参见上面链接的主题。

---
本主题的其余部分是对仿真基础结构如何工作的 "有点笼统" 的描述。 它不需要 *use* 仿真器。


## 仿真器 MAVLink API

所有模拟器都使用 Simulator MAVLink API 与 PX4 进行通信。 该 API 定义了一组 MAVLink 消息，这些消息将仿真机的传感器数据提供给 PX4，并从将应用于仿真机的飞行代码返回电机和执行器值。 下面图表描述了消息。

![仿真器 MAVLink API](../../assets/simulation/px4_simulator_messages.png)

> **注意** PX4 的 SITL 版本使用[仿真器 mavlink.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/simulator/simulator_mavlink.cpp)来处理这些消息，而在HITL模式下的硬件构建使用[mavlink receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp)。 模拟器中的传感器数据将写入 PX4 uORB 主题。 所有电机/执行器都被卡停，但内部软件可以完全正常运行。

下面介绍了这些消息 （有关特定详细信息, 请参阅链接）。

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

By default, PX4 uses commonly established UDP ports for MAVLink communication with ground control stations (e.g. *QGroundControl*), Offboard APIs (e.g. MAVSDK, MAVROS) and simulator APIs (e.g. Gazebo). 这些端口是：

* UDP Port **14540** is used for communication with offboard APIs. 期望外接 APIs 监听此端口上的连接。
* UDP Port **14550** is used for communication with ground control stations. 期望 GCS 将侦听此端口上的连接。 *QGroundControl*默认侦听此端口。
* The simulator's local TCP Port **4560** is used for communication with PX4. PX4 侦听此端口，仿真器应通过向该端口广播数据来启动通信。

> **注意**GCS 和外置 API 的端口设置在配置文件中，而仿真器广播端口在模拟 MAVlink 模块中硬编码．


## SITL 仿真环境

下面显示了适用于任何受支持仿真器的典型 SITL 仿真环境。 系统的不同部分通过 UDP 连接，并且可以在同一台计算机上运行，也可以在同一网络上的另一台计算机上运行。

* PX4 uses a simulation-specific module to connect to the simulator's local TCP port 4560. Simulators then exchange information with PX4 using the [Simulator MAVLink API](#simulator-mavlink-api) described above. SITL 和模拟器上的 PX4 可以在同一台计算机上运行，也可以在同一网络上运行不同的计算机。
* PX4 uses the normal MAVLink module to connect to ground stations (which listen on port 14550) and external developer APIs like MAVSDK or ROS (which listen on port 14540).
* 通过串口将操纵杆/游戏手柄通过 *QGroundControl* 连接至仿真回路中。

![PX4 SITL 概述](../../assets/simulation/px4_sitl_overview.png)

如果使用正常的生成系统 SITL `make` 配置目标 （请参阅下一节），则 SITL 和模拟器都将在同一台计算机上启动，并自动配置上述端口。 您可以配置其他 MAVLink UDP 连接，并以其他方式修改生成配置和初始化文件中的模拟环境。


### 启动/构建 SITL 模拟

构建系统使在 SITL 上构建和启动 PX4、启动模拟器并连接它们变得非常容易。 语法 （简化）如下所示：
```
make px4_sitl simulator[_vehicle-model]
```
其中 `simulator` 是 `gazebo`、`jmavsim` 或其他一些模拟器，该设备模型是该模拟器支持的特殊的无人机类型 （[jMAVSim](../simulation/jmavsim.md) 仅支持多路光台，而 [Gazebo](../simulation/gazebo.md) 支持许多不同类型）。

下面显示了许多示例，每个模拟器的各个页面中还有更多示例：

```sh
# 启动固定翼机型的 Gazebo
make px4_sitl gazebo_plane

# 启动有光流的Iris机型的 Gazebo
make px4_sitl gazebo_iris_opt_flow

# 启动Iris（默认机型）的 JMavSim
make px4_sitl jmavsim
```

可以通过环境变量进一步仿真机：
- `PX4_ESTIMATOR`：此变量配置要使用的估算器。 Possible options are: `ekf2` (default), `lpe` (deprecated). 在运行模拟之前，可以通过 `export PX4_ESTIMATOR=lpe` 进行设置。

这里描述的语法是简化的，您可以通过 *make* 配置许多其他选项，例如，设置要连接到 IDE 或调试器的选项。 For more information see: [Building the Code > PX4 Make Build Targets](../dev_setup/building_px4.md#make_targets).

<a id="simulation_speed"></a>

### 以比实际时间更快的流速运行仿真

使用 jMAVSim 或者 Gazebo 进行 SITL 仿真时，我们可以以比实际时间流速更快或者更慢的时间流速运行仿真。

时间相对流速因子可通过环境变量 `PX4_SIM_SPEED_FACTOR` 进行设定。 例如，想以相对实际时间的 2 倍流速运行 jMAVSim 仿真：
```
PX4_SIM_SPEED_FACTOR=2 make px4_sitl jmavsim
```
运行半速仿真：
```
PX4_SIM_SPEED_FACTOR=0.5 make px4_sitl jmavsim
```

你也可以在当前会话（session）中使用 `EXPORT` 来将该因子应用于所有 SITL 仿真：
```
export PX4_SIM_SPEED_FACTOR=2
make px4_sitl jmavsim
```

> **Note** 在某些情况下当你的电脑的 IO 或者 CPU 性能不足以支撑仿真以设定的速度运行时，该速度会 “自动”降低。 性能强劲的台式机通常可以以 6-10 倍的流速运行仿真，而笔记本测通常可以实现 3-4 倍的流速。

<span></span>
> **Note** To avoid PX4 detecting data link timeouts, increase the value of param [COM_DL_LOSS_T](../advanced_config/parameter_reference.md#COM_DL_LOSS_T) proportional to the simulation rate. For example, if `COM_DL_LOSS_T` is 10 in realtime, at 10x simulation rate increase to 100.

### Lockstep Simulation

PX4 SITL and the simulators (jMAVSim or Gazebo) have been set up to run in *lockstep*. What this means is that PX4 and the simulator wait on each other for sensor and actuator messages, rather than running at their own speeds.

> **Note** Lockstep makes it possible to [run the simulation faster or slower than realtime](#simulation_speed), and also to pause it in order to step through code.

The sequence of steps for lockstep are:
1. The simulation sends a sensor message [HIL_SENSOR](https://mavlink.io/en/messages/common.html#HIL_SENSOR) including a timestamp `time_usec` to update the sensor state and time of PX4.
1. PX4 receives this and does one iteration of state estimation, controls, etc. and eventually sends an actuator message [HIL_ACTUATOR_CONTROLS](https://mavlink.io/en/messages/common.html#HIL_ACTUATOR_CONTROLS).
1. The simulation waits until it receives the actuator/motor message, then simulates the physics and calculates the next sensor message to send to PX4 again.

The system starts with a "freewheeling" period where the simulation sends sensor messages including time and therefore runs PX4 until it has initialized and responds with an actuator message.

#### Disable Lockstep Simulation

The lockstep simulation can be disabled if, for example, SITL is to be used with a simulator that does not support this feature. In this case the simulator and PX4 use the host system time and do not wait on each other.

To disable lockstep in PX4, use `set(ENABLE_LOCKSTEP_SCHEDULER no)` in the [SITL board config](https://github.com/PX4/PX4-Autopilot/blob/77097b6adc70afbe7e5d8ff9797ed3413e96dbf6/boards/px4/sitl/default.cmake#L104).

To disable lockstep in Gazebo, edit [the model SDF file](https://github.com/PX4/sitl_gazebo/blob/3062d287c322fabf1b41b8e33518eb449d4ac6ed/models/plane/plane.sdf#L449) and set `<enable_lockstep>false</enable_lockstep>` (or for Iris edit the [xacro file](https://github.com/PX4/sitl_gazebo/blob/3062d287c322fabf1b41b8e33518eb449d4ac6ed/models/rotors_description/urdf/iris_base.xacro#L22).

To disable lockstep in jMAVSim, remove `-l` in [jmavsim_run.sh](https://github.com/PX4/PX4-Autopilot/blob/77097b6adc70afbe7e5d8ff9797ed3413e96dbf6/Tools/sitl_run.sh#L75), or make sure otherwise that the java binary is started without the `-lockstep` flag.

<a id="scripts"></a>

### 启动脚本

脚本被用于控制要使用的参数设置或要启动的模块。 它们位于 [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d-posix) 目录中，`rcS` 文件是主要入口点。 有关详细信息，请参阅 [System startup](../concept/system_startup.md)。

### Simulating Failsafes and Sensor/Hardware Failure

The [SITL parameters](../advanced_config/parameter_reference.md#sitl) can also be used to simulate common sensor failure cases, including low battery, loss of GPS or barometer, gyro failure, increased GPS noise etc.  (e.g. [SIM_GPS_BLOCK](../advanced_config/parameter_reference.md#SIM_GPS_BLOCK) can be set to simulate GPS failure).

Additionally (and with some overlap), [Simulate Failsafes](../simulation/failsafes.md) explains how to trigger safety failsafes.


## HITL 仿真环境

通过硬件在环（HITL）仿真使正常的 PX4 固件在真正的硬件上运行。 HITL 仿真环境记录于： [HITL 模拟](../simulation/hitl.md)。


## 操纵杆／手柄集成

*QGroundControl* 台式机版本可以连接到 USB Joystick/Gamepad，并通过 MAVLink 将其移动指令和按钮发送到 PX4。 这适用于 SITL 和 HITL 仿真，并允许直接控制仿真机。 如果你没有操纵杆，你也可以使用地面控制站的屏幕虚拟拇指杆来控制无人机。

有关设置信息，请参阅 *QGroundControl 用户指南 *：
* [操纵杆设置](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html)
* [虚拟操纵杆](https://docs.qgroundcontrol.com/en/SettingsView/VirtualJoystick.html)

<!-- FYI Airsim info on this setting up remote controls: https://github.com/Microsoft/AirSim/blob/master/docs/remote_controls.md -->


## 相机模拟

PX4 支持在 [Gazebo](../simulation/gazebo.md) 模拟环境中捕获静止图像和视频。 This can be enabled/set up as described in [Gazebo > Video Streaming](../simulation/gazebo.md#video).

The simulated camera is a gazebo plugin that implements the [MAVLink Camera Protocol](https://mavlink.io/en/protocol/camera.html)<!-- **PX4-Autopilot/Tools/sitl_gazebo/src/gazebo_geotagged_images_plugin.cpp -->. PX4 与这个相机以 *exactly the same way* 连接／集成，与任何其他 MAVLink 相机一样：
1. [TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE) must be set to `3` to configure the camera trigger driver for use with a MAVLink camera

   > **Tip** In this mode the driver just sends a [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message whenever an image capture is requested. 更多信息请参见：[Camera](../peripherals/camera.md)。
1. PX4 必须在 GCS 和（模拟器）MAVLink Camera 之间转发所有摄像机命令。 You can do this by starting [MAVLink](../middleware/modules_communication.md#mavlink) with the `-f` flag as shown, specifying the UDP ports for the new connection.
   ```
   mavlink start -u 14558 -o 14530 -r 4000 -f -m camera
   ```

   > **Note** More than just the camera MAVLink messages will be forwarded, but the camera will ignore those that it doesn't consider relevant.

其他模拟器可以使用相同的方法来实现相机支持。

## 在远程服务器上运行仿真

可以在一台计算机上运行模拟器，并从同一网络 (或具有适当路由的另一台网络) 上的另一台计算机访问模拟器。 例如，如果要测试在模拟车辆上运行的真实配套计算机硬件上运行的无人机应用程序，这可能很有用。

这不是 "开箱即用" 的，因为 PX4 在默认情况下不会将数据包路由到外部接口 (以避免垃圾邮件和不同的模拟相互干扰)。 相反，它将数据包路由到 "本地主机"。

有多种方法可以使 UDP 数据包在外部接口上可用，如下所述。


### 启用 MAV_BROADCAST

启用 [MAV_BROADCAST](../advanced_config/parameter_reference.md#MAV_BROADCAST) 在本地网络上广播检测信号。

然后，远程计算机可以通过侦听适当的端口 (即 *QGroundControl* 的14550端口) 连接到模拟器。


### 使用 MAVLink 路由器

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

> **Note** More information about *mavlink-router* configuration can be found [here](https://github.com/intel/mavlink-router/#running).


### 修改外部广播的配置

默认情况下，[mavlink](../middleware/modules_communication.md#mavlink_usage) 模块路由到 *localhost*，但您可以指定要使用其 `-t` 选项广播的外部 IP 地址。

这应该在各种配置文件中完成，其中调用了 `mavlink start`。 例如：[/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS)。


### SSH 通道

ssh 是一个灵活的选项，因为模拟计算机和使用它的系统不需要在同一网络上。

> **Note** 您也可以使用 vpn 向外部接口 (在同一网络或其他网络上) 提供隧道。

创建隧道的一种方法是使用 ssh 隧道选项。 可以通过在 *localhost* 上运行以下命令来创建隧道，其中 `remote.local` 是远程计算机的名称：
```
ssh -C -fR 14551:localhost:14551 remote.local
```

UDP 数据包需要转换为 TCP 数据包，以便可以通过 ssh 对其进行路由。 [netcat](https://en.wikipedia.org/wiki/Netcat) 可以用于隧道的两边—首先转换 UDP 为 TCP 数据包，然后在另一端再转回 UDP 。

> **Tip** 执行 *netcat* 之前， QGC 必须运行起来。

On the *QGroundControl* computer, UDP packet translation may be implemented by running following commands:
```
mkfifo /tmp/tcp2udp
netcat -lvp 14551 < /tmp/tcp2udp | netcat -u localhost 14550 > /tmp/tcp2udp
```
在 ssh 隧道的模拟器一端，命令是：
```
mkfifo /tmp/udp2tcp
netcat -lvup 14550 < /tmp/udp2tcp | netcat localhost 14551 > /tmp/udp2tcp
```

端口号 `14550` 可以用于 QGroundControl 与其他的 GCS 连接，但应根据其他端点进行调整（比如开发者 API 等）。

理论上，隧道可能无限期运行，但如果出现问题，可能需要重新启动 *netcat* 连接。

[QGC_remote_connect.bash](https://raw.githubusercontent.com/ThunderFly-aerospace/sitl_gazebo/autogyro-sitl/scripts/QGC_remote_connect.bash) 脚本可以在 QGC 计算机上运行，以自动设置运行上述指令。 模拟必须已经在远程服务器上运行，并且您必须能够通过 ssh 登录到该服务器。
