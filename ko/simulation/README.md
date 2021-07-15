# 시뮬레이션

시뮬레이터는 PX4 비행 코드가 시뮬레이션된 가상 "세계"에서 컴퓨터로 모델링된 기체를 제어합니다. *QGroundControl*, 오프보드 API 또는 무선 컨트롤러, 게임패드를 사용하여 실제 기체와 같이 상호 작용합니다.

:::tip
시뮬레이션은 실제 세계에서 비행전에 PX4 코드 변경 사항을 테스트할 수 있는 빠르고 쉽고 *안전한* 방법입니다. 실험할 기체가 없은 경우 PX4로 비행을 시작하는 것도 좋은 방법입니다.
:::

PX4 비행 스택은 컴퓨터(동일한 컴퓨터 또는 동일한 네트워크의 다른 컴퓨터)에서 실행되는 *SITL(Software In the Loop)* 시뮬레이션과 비행 콘트롤러의 시뮬레이션 펌웨어를 사용한 *Hardware In the Loop(HITL)* 시뮬레이션을 모두 지원합니다.

사용 가능한 시뮬레이터와 설정 방법을 다음 섹션에서 설명합니다. 다른 섹션에서는 시뮬레이터 작동에 관현 정보를 제공하며, 시뮬레이터를 *사용*할 필요는 없습니다.


## 지원되는 시뮬레이터

아래의 시뮬레이터들은 HITL과  SITL 시뮬레이션용으로 PX4와 연동됩니다.

| 시뮬레이터                                                                   | 설명                                                                                         |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Gazebo](../simulation/gazebo.md)                                       | <p><strong>이 시뮬레이터를 적극 권장합니다.</strong></p><p>물체 회피와 컴퓨터 비전 테스트에 매우 적합한 강력한 3D 시뮬레이션 환경입니다. [다중 차량시뮬레이션](../simulation/multi-vehicle-simulation.md)에도 사용할 수 있으며 일반적으로 차량 제어 자동화를 위한 도구 모음인 [ROS](../simulation/ros_interface.md)와 함께 사용됩니다. </p><p><strong>지원 차량:</strong> 쿼드([Iris](../airframes/airframe_reference.md#copter_quadrotor_wide_3dr_iris_quadrotor) 및 [Solo](../airframes/airframe_reference.md#copter_quadrotor_x_3dr_solo), Hex48(T0) [일반 쿼드 델타 VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_quad_delta_vtol), 테일시터, 비행기, 로버, 잠수함 </p>                |
| [FlightGear](../simulation/flightgear.md)                               | <p>물리적, 시각적으로 사실적인 시뮬레이션을 제공합니다. 특히 뇌우, 눈, 비과 우박을 포함한 다양한 기상 조건을 시뮬레이션할 수 있으며, 열과 다양한 유형의 대기 흐름을 시뮬레이션할 수 있습니다. [다중 차량 시뮬레이션](../simulation/multi_vehicle_flightgear.md)도 지원됩니다.</p> <p><strong>지원 차량:</strong> 비행기, 오토자이로, 로버</p>                                         |
| [JSBSim](../simulation/jsbsim.md)                                       | <p>고급 비행 역학 모델 시뮬레이션을 제공합니다. 이것은 풍동 데이터를 기반으로 현실적인 비행 역학을 모델링할 수 있습니다.</p> <p><strong>지원 차량:</strong> 평면, 쿼드, 육각</p>                                         |
| [jMAVSim](../simulation/jmavsim.md)                                     | *콥터* 유형의 차량을 비행할 수 있는 간단한 멀티콥터 시뮬레이터입니다. <p>설정이 간단하며, 기체가 이륙, 비행, 착륙할 수 있으며, 다양한 장애 조건(예: GPS 장애)에 적절하게 반응 여부를 테스트할 수 있습니다. [다중 차량 시뮬레이션](../simulation/multi_vehicle_jmavsim.md)에도 사용할 수 있습니다.</p><p><strong>지원 차량:</strong> 쿼드</p> |
| [AirSim](../simulation/airsim.md)                                       | <p>물리적 및 시각적으로 사실적인 시뮬레이션을 제공하는 크로스 플랫폼 시뮬레이터입니다. 이 시뮬레이터는 리소스 집약적이며, 다른 시뮬레이터보다 강력한 컴퓨터가 필요합니다.</p><p><strong>지원 차량:</strong> Iris(MultiRotor 모델 및 X 구성의 PX4 QuadRotor 구성).</p>                                        |
| [Simulation-In-Hardware](../simulation/simulation-in-hardware.md) (SIH) | <p>하드웨어 자동 조종 장치에서 직접 하드 실시간 시뮬레이션을 제공하는 HITL의 대안입니다.</p><p><strong>지원 차량:</strong> 쿼드</p>                                       |

시뮬레이터를 설정 사용 방법에 대한 지침은 위에 링크를 참고하십시오.

---
이 항목의 나머지 부분은 시뮬레이션 인프라 작동 방식에 대한 "다소 일반적인" 설명입니다. 시뮬레이터를 *사용*할 필요는 없습니다.


## Simulator MAVLink API

모든 시뮬레이터는 Simulator MAVLink API를 사용하여 PX4와 통신합니다. 이 API는 시뮬레이션된 세계에서 PX4로 센서 데이터를 제공하고, 시뮬레이션된 차량에 적용될 비행 코드에서 모터 및 액추에이터 값을 반환하는 MAVLink 메시지 세트를 정의합니다. 아래 이미지는 메시지 흐름을 나타냅니다.

![Simulator MAVLink API](../../assets/simulation/px4_simulator_messages.png)

:::note PX4 SITL 빌드는 [simulator_mavlink.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/simulator/simulator_mavlink.cpp)를 사용하여 이러한 메시지를 처리하는 반면, HIL 모드의 하드웨어 빌드는 [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mavlink/mavlink_receiver.cpp)를 사용합니다. 시뮬레이터의 센서 데이터는 PX4 uORB 주제에 기록됩니다. 모든 모터/액츄에이터가 차단되지만, 내부 소프트웨어는 완전하게 작동합니다.
:::

메시지는 아래에 설명되어 있습니다(자세한 내용은 링크 참조).

| 메시지                                                                                                            | 방향         | 설명                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [MAV_MODE:MAV_MODE_FLAG_HIL_ENABLED](https://mavlink.io/en/messages/common.html#MAV_MODE_FLAG_HIL_ENABLED) | 없음         | 시뮬레이션 모드 플래그입니다. 모든 모터/액추에이터가 차단되지만, 내부 소프트웨어는 완전하게 작동합니다.                                                                       |
| [HIL_ACTUATOR_CONTROLS](https://mavlink.io/en/messages/common.html#HIL_ACTUATOR_CONTROLS)                    | PX4 to Sim | PX4 제어 출력(모터, 액추에이터).                                                                                                            |
| [HIL_SENSOR](https://mavlink.io/en/messages/common.html#HIL_SENSOR)                                            | Sim to PX4 | NED 본체 프레임의 SI 단위로 시뮬레이션된 IMU 판독값.                                                                                               |
| [HIL_GPS](https://mavlink.io/en/messages/common.html#HIL_GPS)                                                  | Sim to PX4 | 시뮬레이션된 GPS RAW 센서 값입니다.                                                                                                          |
| [HIL_OPTICAL_FLOW](https://mavlink.io/en/messages/common.html#HIL_OPTICAL_FLOW)                              | Sim to PX4 | 흐름 센서에서 시뮬레이션된 광류(예: PX4FLOW 또는 광학 마우스 센서)                                                                                       |
| [HIL_STATE_QUATERNION](https://mavlink.io/en/messages/common.html#HIL_STATE_QUATERNION)                      | Sim to PX4 | 실제 "시뮬레이션된" 차량 위치, 자세, 속도 등이 포함됩니다. 이것은 분석 및 디버깅에 대한 PX4의 추정치와 비교 기록될 수 있습니다(예: 노이즈가 있는(시뮬레이션된) 센서 입력에 대해 추정기가 얼마나 잘 작동하는 지 확인). |
| [HIL_RC_INPUTS_RAW](https://mavlink.io/en/messages/common.html#HIL_RC_INPUTS_RAW)                            | Sim to PX4 | 수신된 RC 채널의 RAW 값입니다.                                                                                                             |


## 기본 PX4 MAVLink UDP 포트

기본적으로 PX4는 지상제어국(예: *QGroundControl*), Offboard API(예: MAVSDK, MAVROS) 및 시뮬레이터 API(예: Gazebo)와 MAVLink 통신을 위하여 UDP 포트를 사용합니다. 해당 포트는 다음과 같습니다:

* PX4의 원격 UDP 포트 **14550**은 지상관제국 통신에 사용됩니다. GCS는 이 포트에서 연결 수신을 예상합니다. *QGroundControl*은 기본적으로 이 포트로 수신합니다.
* PX4의 원격 UDP 포트 **14540**은 오프보드 API 통신에 사용됩니다. 오프보드 API는 이 포트에서 연결 수신을 예상합니다. :::note 다중 차량 시뮬레이션은 각 인스턴스에 대해 별도의 원격 포트를 사용하며 `14540`에서 `14549`까지 순차적으로 할당합니다. (추가 인스턴스는 모두 `14549` 포트를 사용합니다).
:::
* 시뮬레이터의 로컬 TCP 포트 **4560**은 PX4 통신에 사용됩니다. PX4는 이 포트를 수신하고, 시뮬레이터는 이 포트에 데이터를 브로드캐스트하여 통신을 시작합니다.

:::note GCS
및 오프보드 API용 포트는 파일에서 설정되는 반면에, 시뮬레이터 브로드캐스트 포트는 시뮬레이션 MAVLink 모듈에서 하드 코딩되어 있습니다.
:::


<!-- A useful discussion about UDP ports here: https://github.com/PX4/PX4-user_guide/issues/1035#issuecomment-777243106 --> 


## SITL 시뮬레이션 환경

아래 다이어그램은 지원되는 시뮬레이터에 대한 일반적인 SITL 시뮬레이션 환경을 나타냅니다.

![PX4 SITL overview](../../assets/simulation/px4_sitl_overview.svg)

시스템의 차이점은 UDP를 통해 연결되며, 동일 컴퓨터 또는 동일 네트워크의 다른 컴퓨터에서도 실행됩니다.

* PX4는 시뮬레이션 전용 모듈을 사용하여, 시뮬레이터의 로컬 TCP 포트 4560에 연결합니다. 그런 다음 시뮬레이터는 위에서 설명한 [시뮬레이터 MAVLink API](#simulator-mavlink-api)를 사용하여 PX4와 정보를 교환합니다. SITL 및 시뮬레이터의 PX4는 동일 컴퓨터 또는 동일 네트워크의 다른 컴퓨터에서 실행할 수 있습니다. :::note 시뮬레이터는 또한 *microRTPS 브리지*([PX4-FastRTPS 브리지](../middleware/micrortps.md))를 사용하여 PX4와 직접 상호작용할 수 있습니다(즉, MAVLink가 아닌 [UORB 주제](../middleware/uorb.md)를 통하여). 이 접근 방법은 [Gazebo 다중 차량 시뮬레이션](../simulation/multi_vehicle_simulation_gazebo.md#build-and-test-rtps-dds)에서 *사용됩니다*.
:::
* PX4는 일반 MAVLink 모듈을 사용하여, MAVSDK 또는 ROS와 같은 외부 개발자 API와 지상국에 연결합니다.
  - 지상국은 PX4의 원격 UDP 포트를 수신합니다: `14550`
  - 외부 개발자 API는 PX4의 원격 UDP 포트인 `14540`을 수신합니다. 다중 차량 시뮬레이션의 경우 PX4는 `14540`에서 `14549`까지 각 인스턴스에 대해 별도의 원격 포트를 순차적으로 할당합니다(추가 인스턴스는 모두 포트 `14549` 사용).
* PX4는 다수의 *로컬* UDP 포트(`14580`,`18570`)를 정의하며, 이는 컨테이너 또는 가상 머신에서 실행되는 PX4와 네트워킹시에 가끔 사용됩니다. 이는 "일반적인" 용도로는 권장되지 않으며, 향후 변경될 수 있습니다.
* 직렬 연결로 *QGroundControl*을 통하여 [조이스틱/게임패드](../config/joystick.md)를 연결할 수 있습니다.

일반 빌드 시스템 SITL `make` 구성 대상을 사용하는 경우(다음 섹션 참조), SITL과 시뮬레이터가 모두 동일 컴퓨터에서 실행되고 위의 포트가 자동으로 설정됩니다. 추가 MAVLink UDP 연결을 구성하거나 빌드 구성 및 초기화 파일에서 시뮬레이션 환경을 수정할 수 있습니다.


### SITL 시뮬레이션 시작/구축

The build system makes it very easy to build and start PX4 on SITL, launch a simulator, and connect them. The syntax (simplified) looks like this:
```
make px4_sitl simulator[_vehicle-model]
```
where `simulator` is `gazebo`, `jmavsim` or some other simulator, and vehicle-model is a particular vehicle type supported by that simulator ([jMAVSim](../simulation/jmavsim.md) only supports multicopters, while [Gazebo](../simulation/gazebo.md) supports many different types).

A number of examples are shown below, and there are many more in the individual pages for each of the simulators:

```sh
# Start Gazebo with plane
make px4_sitl gazebo_plane

# Start Gazebo with iris and optical flow
make px4_sitl gazebo_iris_opt_flow

# Start JMavSim with iris (default vehicle model)
make px4_sitl jmavsim

# Start PX4 with no simulator (i.e. to use your own "custom" simulator)
make px4_sitl none_iris
```

The simulation can be further configured via environment variables:
- `PX4_ESTIMATOR`: This variable configures which estimator to use. Possible options are: `ekf2` (default), `lpe` (deprecated). It can be set via `export PX4_ESTIMATOR=lpe` before running the simulation.

The syntax described here is simplified, and there are many other options that you can configure via *make* - for example, to set that you wish to connect to an IDE or debugger. For more information see: [Building the Code > PX4 Make Build Targets](../dev_setup/building_px4.md#px4-make-build-targets).

<a id="simulation_speed"></a>

### Run Simulation Faster than Realtime

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

To disable lockstep in Gazebo, edit [the model SDF file](https://github.com/PX4/sitl_gazebo/blob/3062d287c322fabf1b41b8e33518eb449d4ac6ed/models/plane/plane.sdf#L449) and set `<enable_lockstep>false</enable_lockstep>` (or for Iris edit the [xacro file](https://github.com/PX4/sitl_gazebo/blob/3062d287c322fabf1b41b8e33518eb449d4ac6ed/models/rotors_description/urdf/iris_base.xacro#L22).

To disable lockstep in jMAVSim, remove `-l` in [jmavsim_run.sh](https://github.com/PX4/PX4-Autopilot/blob/77097b6adc70afbe7e5d8ff9797ed3413e96dbf6/Tools/sitl_run.sh#L75), or make sure otherwise that the java binary is started without the `-lockstep` flag.


### Startup Scripts

Scripts are used to control which parameter settings to use or which modules to start. They are located in the [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/master/ROMFS/px4fmu_common/init.d-posix) directory, the `rcS` file is the main entry point. See [System Startup](../concept/system_startup.md) for more information.

### Simulating Failsafes and Sensor/Hardware Failure

[Simulate Failsafes](../simulation/failsafes.md) explains how to trigger safety failsafes like GPS failure and battery drain.


## HITL Simulation Environment

With Hardware-in-the-Loop (HITL) simulation the normal PX4 firmware is run on real hardware. The HITL Simulation Environment in documented in: [HITL Simulation](../simulation/hitl.md).


## Joystick/Gamepad Integration

*QGroundControl* desktop versions can connect to a USB Joystick/Gamepad and send its movement commands and button presses to PX4 over MAVLink. This works on both SITL and HITL simulations, and allows you to directly control the simulated vehicle. If you don't have a joystick you can alternatively control the vehicle using QGroundControl's onscreen virtual thumbsticks.

For setup information see the *QGroundControl User Guide*:
* [Joystick Setup](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html)
* [Virtual Joystick](https://docs.qgroundcontrol.com/en/SettingsView/VirtualJoystick.html)

<!-- FYI Airsim info on this setting up remote controls: https://github.com/Microsoft/AirSim/blob/master/docs/remote_controls.md -->


## Camera Simulation

PX4 supports capture of both still images and video from within the [Gazebo](../simulation/gazebo.md) simulated environment. This can be enabled/set up as described in [Gazebo > Video Streaming](../simulation/gazebo.md#video).

The simulated camera is a gazebo plugin that implements the [MAVLink Camera Protocol](https://mavlink.io/en/protocol/camera.html)<!-- **PX4-Autopilot/Tools/sitl_gazebo/src/gazebo_geotagged_images_plugin.cpp -->. PX4 connects/integrates with this camera in *exactly the same way* as it would with any other MAVLink camera:
1. [TRIG_INTERFACE](../advanced_config/parameter_reference.md#TRIG_INTERFACE) must be set to `3` to configure the camera trigger driver for use with a MAVLink camera :::tip In this mode the driver just sends a [CAMERA_TRIGGER](https://mavlink.io/en/messages/common.html#CAMERA_TRIGGER) message whenever an image capture is requested. For more information see [Camera](../peripherals/camera.md).
:::

1. PX4 must forward all camera commands between the GCS and the (simulator) MAVLink Camera. You can do this by starting [MAVLink](../modules/modules_communication.md#mavlink) with the `-f` flag as shown, specifying the UDP ports for the new connection.
   ```
   mavlink start -u 14558 -o 14530 -r 4000 -f -m camera
   ```
:::note
More than just the camera MAVLink messages will be forwarded, but the camera will ignore those that it doesn't consider relevant.
:::

The same approach can be used by other simulators to implement camera support.

## Running Simulation on a Remote Server

It is possible to run the simulator on one computer, and access it from another computer on the same network (or on another network with appropriate routing). This might be useful, for example, if you want to test a drone application running on real companion computer hardware running against a simulated vehicle.

This does not work "out of the box" because PX4 does not route packets to external interfaces by default (in order to avoid spamming the network and different simulations interfering with each other). Instead it routes traffic internally - to "localhost".

There are a number of ways to make the UDP packets available on external interfaces, as outlined below.

### Use MAVLink Router

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

### Enable UDP Broadcasting

The [mavlink module](../modules/modules_communication.md#mavlink_usage) routes to *localhost* by default, but you can enable UDP broadcasting of heartbeats using its `-p` option. Any remote computer on the network can then connect to the simulator by listening to the appropriate port (i.e. 14550 for *QGroundControl*).

:::note UDP
broadcasting provides a simple way to set up the connection when there is only one simulation running on the network. Do not use this approach if there are multiple simulations running on the network (you might instead [publish to a specific address](#enable-streaming-to-specific-address)).
:::

This should be done in an appropriate configuration file where `mavlink start` is called. For example: [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS).


### Enable Streaming to Specific Address

The [mavlink module](../modules/modules_communication.md#mavlink_usage) routes to *localhost* by default, but you can specify an external IP address to stream to using its `-t` option. The specified remote computer can then connect to the simulator by listening to the appropriate port (i.e. 14550 for *QGroundControl*).

This should be done in various configuration files where `mavlink start` is called. For example: [/ROMFS/px4fmu_common/init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS).


### SSH Tunneling

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
