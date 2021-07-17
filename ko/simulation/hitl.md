# 하드웨어 루프 시뮬레이션 \(HITL\)

HITL(Hardware-in-the-Loop)은 일반 PX4 펌웨어가 실제 비행 콘트롤러 하드웨어에서 실행되는 시뮬레이션 모드입니다. 이 접근 방식은 실제 하드웨어에서 대부분의 실제 비행 코드를 테스트할 수 있습니다.

PX4는 멀티콥터(jMAVSim 또는 Gazebo 사용) 및 VTOL(Gazebo 사용)용 HITL을 지원합니다.

<a id="compatible_airframe"></a>

## HITL 호환 기체

현재 호환 가능한 기체와 시뮬레이터는 아래와 같습니다.

| 기체                                                                                                         | `SYS_AUTOSTART` | Gazebo | jMAVSim |
| ---------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------- |
| [HIL 고정익](../airframes/airframe_reference.md#simulation-plane)                                             | 1000            | 예      |         |
| [HIL 쿼드콥터  X](../airframes/airframe_reference.md#copter_simulation_(copter)_hil_quadcopter_x)              | 1001            | 예      | 예       |
| [HIL 표준 VTOL QuadPlane](../airframes/airframe_reference.md#vtol_standard_vtol_hil_standard_vtol_quadplane) | 1002            | 예      |         |
| [일반 쿼드콥터 x](../airframes/airframe_reference.md#copter_quadrotor_x_generic_quadcopter) 콥터                   | 4001            | 예      | 예       |
| [DJI Flame Wheel f450](../airframes/airframe_reference.md#copter_quadrotor_x_dji_f450_w/_dji_escs)         | 4011            | 예      | 예       |

<a id="simulation_environment"></a>

## HITL 시뮬레이션 환경

HITL(Hardware-in-the-Loop) 시뮬레이션을 사용하여, 일반 PX4 펌웨어가 실제 하드웨어에서 실행됩니다. JMAVSim 또는 Gazebo(개발 컴퓨터에서 실행)는 USB/UART를 통하여 비행 콘트롤러 하드웨어에 연결합니다. 시뮬레이터는 PX4와 *QGroundControl* 간에 MAVLink 데이터를 공유하는 게이트웨이 역할을 합니다.

:::note
비행 콘트롤러에서 네트워크에서 안정적이고 대기 시간이 짧은 연결(예: 유선 이더넷 연결 - WiFi는 일반적으로 충분히 신뢰할 수 없음)을 사용하는 경우에는, 시뮬레이터를 UDP로 연결할 수 있습니다. 예를 들어, 이 설정은 이더넷으로 컴퓨터에 연결된 라즈베리파이에서 실행되는 PX4로 테스트되었습니다(jMAVSim 실행 명령이 포함된 시작 설정은 [여기](https://github.com/PX4/PX4-Autopilot/blob/master/posix-configs/rpi/px4_hil.config)를 참고).
:::

아래 다이어그램은 시뮬레이션 환경을 나타냅니다.
* 실제 센서를 시작하지 않는 HITL 설정이 선택되었습니다(*QGroundControl*를 통하여).
* *jMAVSim* 또는 *Gazebo*는 USB로 비행 컨트롤러에 연결됩니다.
* 시뮬레이터는 UDP로 *QGroundControl*에 연결되고, MAVLink 메시지를 PX4에 전송합니다.
* *Gazebo*와 *jMAVSim*은 또한 오프보드 API에 연결하고 MAVLink 메시지를 PX4에 전송할 수 있습니다.
* (선택 사항) 직렬 연결로 *QGroundControl*에서 조이스틱/게임패드 하드웨어를 연결할 수 있습니다.

![HITL Setup - jMAVSim and Gazebo](../../assets/simulation/px4_hitl_overview_jmavsim_gazebo.png)


## HITL 대 SITL

SITL은 시뮬레이션 환경의 컴퓨터에서 실행되며, 해당 환경에서 제작된 펌웨어를 사용합니다. 시뮬레이터에서 가공의 환경 데이터를 제공하는 시뮬레이션 드라이버 이외의 시스템은 정상적으로 작동합니다.

이와 대조적으로, HITL은 일반 하드웨어의 "HITL 모드"에서 일반 PX4 펌웨어를 실행합니다. 시뮬레이션 데이터는 SITL과 다른 지점에서 시스템에 입력됩니다. 커맨더 및 센서와 같은 핵심 모듈에는 시작 시 정상적인 기능 중 일부를 우회하는 HITL 모드가 있습니다.

요약하면, HITL은 표준 펌웨어를 사용하여 실제 하드웨어에서 PX4를 실행하고, SITL은 실제로 더 많은 표준 시스템 코드를 실행합니다.


## HITL 설정

### PX4 설정

1. USB로 자동조종장치를 *QGroundControl*에 연결합니다.
1. HITL 모드를 활성화합니다.
   1. **설정 열기 > 안전** 섹션을 오픈합니다.
   1. *HITL 활성화* 목록에서 **활성화됨**을 선택하여 HITL 모드를 활성화합니다.

      ![QGroundControl HITL configuration](../../assets/gcs/qgc_hitl_config.png)
1. 기체를 선택합니다.
   1. **설정 > 기체**를 오픈합니다.
   1. 테스트할 [호환 기체](#compatible_airframe)를 선택합니다. 그런 다음 *기체 설정* 페이지의 오른쪽 상단에 있는 **적용 및 재시작**을 클릭합니다.

      ![Select Airframe](../../assets/gcs/qgc_hil_config.png)
1. 필요한 경우 RC 또는 조이스틱을 보정합니다.
1. UDP를 설정합니다.
   1. Under the *General* tab of the settings menu, uncheck all *AutoConnect* boxes except for **UDP**.

      ![QGC Auto-connect settings for HITL](../../assets/gcs/qgc_hitl_autoconnect.png)
1. (Optional) Configure Joystick and Failsafe. Set the following [parameters](https://docs.px4.io/en/advanced_config/parameters.html#finding-a-parameter) in order to use a joystick instead of an RC remote control transmitter:
   * [COM_RC_IN_MODE](../advanced/parameter_reference.md#COM_RC_IN_MODE) to "Joystick/No RC Checks". This allows joystick input and disables RC input checks.
   * [NAV_DLL_ACT](../advanced/parameter_reference.md#NAV_DLL_ACT) to "Disabled". This ensures that no RC failsafe actions interfere when not running HITL with a radio control.

:::tip
The *QGroundControl User Guide* also has instructions on [Joystick](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html) and [Virtual Joystick](https://docs.qgroundcontrol.com/en/SettingsView/VirtualJoystick.html) setup.
:::

Follow the appropriate setup steps for your simulator in the following sections.

### X-Plane HITL Environment

Follow the appropriate setup steps for the specific simulator in the following sections.

#### Gazebo

:::note
Make sure *QGroundControl* is not running!
:::

1. Update the environment variables:
   ```sh
   cd <Firmware_clone>
    make px4_sitl_default gazebo
   ```
1. Open the vehicle model's sdf file (e.g. **Tools/sitl_gazebo/models/iris_hitl/iris_hitl.sdf**).
1. Replace the `serialDevice` parameter (`/dev/ttyACM0`) if necessary.

:::note
The serial device depends on what port is used to connect the vehicle to the computer (this is usually `/dev/ttyACM0`). An easy way to check on Ubuntu is to plug in the autopilot, open up a terminal, and type `dmesg | grep "tty"`. The correct device will be the last one shown.
:::

1. Set up the environment variables:
   ```sh
   source Tools/setup_gazebo.bash $(pwd) $(pwd)/build/px4_sitl_default
   ```
   and run Gazebo in HITL mode:
   ```sh
   gazebo Tools/sitl_gazebo/worlds/hitl_iris.world
   ```
1. Start *QGroundControl*. It should autoconnect to PX4 and Gazebo.

<a id="jmavsim_hitl_configuration"></a>

#### jMAVSim (Quadrotor only)

:::note
Make sure *QGroundControl* is not running!
:::

1. Connect the flight controller to the computer and wait for it to boot.
1. Run jMAVSim in HITL mode:
   ```sh
   ./Tools/jmavsim_run.sh -q -s -d /dev/ttyACM0 -b 921600 -r 250
   ```

:::note
Replace the serial port name `/dev/ttyACM0` as appropriate. On macOS this port would be `/dev/tty.usbmodem1`. On Windows (including Cygwin) it would be the COM1 or another port - check the connection in the Windows Device Manager.
:::
1. Start *QGroundControl*. It should autoconnect to PX4 and jMAVSim.


## Fly an Autonomous Mission in HITL

You should be able to use *QGroundControl* to [run missions](https://docs.qgroundcontrol.com/master/en/FlyView/FlyView.html#missions) and otherwise control the vehicle.
