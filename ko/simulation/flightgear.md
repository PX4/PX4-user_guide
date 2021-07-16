# FlightGear 시뮬레이션

[FlightGear](https://www.flightgear.org/)는 강력한 [FDM 엔진](http://wiki.flightgear.org/Flight_Dynamics_Model)이 탑재된 비행 시뮬레이터입니다. FlightGear는 다양한 기상 조건에서 회전익기를 시뮬레이션합니다. 이것이 원래 [ThunderFly s.r.o.](https://www.thunderfly.cz/)에서 FlightGear를 개발한 이유입니다.

이 페이지는 SITL에서 FlightGear의 단일 차량 시뮬레이션에 대하여 설명합니다. 다중 차량 사용에 대한 정보는 [FlightGear를 사용한 다중 차량 시뮬레이션](../simulation/multi_vehicle_flightgear.md)을 참고하십시오.

**지원 차량:** 오토자이로, 고정익, 로버

@[유투브](https://youtu.be/iqdcN5Gj4wI)

[![Mermaid Graph ](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- Original mermaid graph
graph LR;
  FlightGear-- >FlightGear-Bridge;
  FlightGear-Bridge-- >MAVLink;
  MAVLink-- >PX4_SITL;
-->

:::note
시뮬레이터, 시뮬레이션 환경 및 시뮬레이션 설정(예: 지원 차량)에 정보는 [시뮬레이션](../simulation/README.md)을 참고하십시오.
:::

<a id="installation"></a>

## 설치(우분투 리눅스)

:::note
이 매뉴얼은 Ubuntu 18.04에서 테스트되었습니다.
:::

1. 일반적인 [Ubuntu LTS/Debian Linux 개발 환경](../dev_setup/dev_env_linux_ubuntu.md)을 설치합니다.
1. FlightGear를 설치합니다.
   ```sh
   sudo add-apt-repository ppa:saiarcot895/flightgear
   sudo apt update
   sudo apt install flightgear
   ```
   위 명령어들은 FGdata 패키지와 함께 PAA 리포지토리에서 최신 안정적인 FlightGear 버전이 설치됩니다.

:::tip
일부 모델(예: 전기 엔진이 장착된 모델)의 경우 최신 기능으로 매일 빌드해야 할 수 있습니다. [일일 빌드 PPA](https://launchpad.net/~saiarcot895/+archive/ubuntu/flightgear-edge)를 사용하여 설치합니다.
:::

1. FlightGear를 실행 여부를 확인하십시오.
   ```
   fgfs --launcher
   ```
1. FlightGear 설치 디렉토리의 **Protocols** 폴더의 쓰기 권한을 설정합니다.
   ```
   sudo chmod a+w /usr/share/games/flightgear/Protocols
   ```
   이 폴더에 PX4-FlightGear-Bridge 통신 정의 파일을 저장하기 때문에, 권한 설정이 필요합니다.

추가 설치 방법은 [FlightGear wiki](http://wiki.flightgear.org/Howto:Install_Flightgear_from_a_PPA)를 참고하십시오.   

<a id="running"></a>

## 시뮬레이션 실행

선택한 기체 구성을 지정하고, PX4 SITL을 시작하여 시뮬레이션을 실행합니다.

가장 편리한 방법은 PX4 *PX4-Autopilot* 저장소의 루트 디렉토리에서 터미널을 열고 원하는 대상에 대해 `make`를 호출하는 것입니다. 예를 들어 평면 시뮬레이션을 시작하려면 다음 명령어를 실행하십시오.
```sh
cd /path/to/PX4-Autopilot
make px4_sitl_nolockstep flightgear_rascal
```

지원되는 차량과 `make` 명령은 아래에 나열되어 있습니다(차량 이미지를 보려면 링크를 클릭하십시오).

| 차량                                                                  | 명령어                                          |
| ------------------------------------------------------------------- | -------------------------------------------- |
| [표준 항공기](../simulation/flightgear_vehicles.md#standard_plane)       | `make px4_sitl_nolockstep flightgear_rascal` |
| [Ackerman 차량 (UGV/Rover)](../simulation/flightgear_vehicles.md#ugv) | `make px4_sitl_nolockstep flightgear_tf-r1`  |
| [오토자이로 ](../simulation/flightgear_vehicles.md#autogyro)             | `make px4_sitl_nolockstep flightgear_tf-g1`  |

위의 명령은 전체 UI로 단일 차량을 시작합니다. *QGroundControl*은 시뮬레이션 차량에 자동으로 연결할 수 있어야 합니다.

:::note
FlightGear 빌드 대상(강조 표시됨)의 전체 목록을 보려면 다음 명령어를 실행하십시오.
```
make px4_sitl_nolockstep list_vmd_make_targets | grep flightgear_
```
추가 정보는 [FlightGear 차량](../simulation/flightgear_vehicles.md)을 참고하십시오(여기에는 "지원되지 않는" 차량 및 새 차량 추가에 대한 정보가 포함됨).
:::

:::note
[파일 및 코드 설치](../dev_setup/dev_env.md) 가이드는 빌드 오류가 발생하면 참고하십시오.
:::

## 하늘로 띄우기

The `make` commands mentioned above first build PX4 and then run it along with the FlightGear simulator.

Once the PX4 has started it will launch the PX4 shell as shown below. You must select enter to get the command prompt.

```
______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

px4 starting.

INFO  [px4] Calling startup script: /bin/sh etc/init.d-posix/rcS 0
INFO  [param] selected parameter default file eeprom/parameters_1034
I'm Mavlink to FlightGear Bridge
Targed Bridge Freq: 200, send data every step: 1
4
  5   -1
  7   -1
  2   1
  4   1
[param] Loaded: eeprom/parameters_1034
INFO  [dataman] Unknown restart, data manager file './dataman' size is 11798680 bytes
INFO  [simulator] Waiting for simulator to accept connection on TCP port 4560
INFO  [simulator] Simulator connected on TCP port 4560.
INFO  [commander] LED: open /dev/led0 failed (22)
INFO  [commander] Mission #3 loaded, 9 WPs, curr: 8
INFO  [init] Mixer: etc/mixers-sitl/plane_sitl.main.mix on /dev/pwm_output0
INFO  [mavlink] mode: Normal, data rate: 4000000 B/s on udp port 18570 remote port 14550
INFO  [airspeed_selector] No airspeed sensor detected. Switch to non-airspeed mode.
INFO  [mavlink] mode: Onboard, data rate: 4000000 B/s on udp port 14580 remote port 14540
INFO  [mavlink] mode: Onboard, data rate: 4000 B/s on udp port 14280 remote port 14030
INFO  [logger] logger started (mode=all)
INFO  [logger] Start file log (type: full)
INFO  [logger] Opened full log file: ./log/2020-04-28/22_03_36.ulg
INFO  [mavlink] MAVLink only on localhost (set param MAV_{i}_BROADCAST = 1 to enable network)
INFO  [px4] Startup script returned successfully
pxh> StatsHandler::StatsHandler() Setting up GL2 compatible shaders
Now checking for plug-in osgPlugins-3.4.1/osgdb_nvtt.so
PX4 Communicator: PX4 Connected.

pxh>
```

The console will print out status as PX4 loads the airframe-specific initialization and parameter files, wait for (and connect to) the simulator. Once there is an INFO print that [ecl/EKF] is `commencing GPS fusion` the vehicle is ready to arm. At this point, you should see a FlightGear window with some view of aircraft.


:::note
You can change the view by pressing **Ctrl+V**.
:::

![FlightGear UI](../../assets/simulation/flightgear/flightgearUI.jpg)

You can bring it into the air by typing:

```sh
pxh> commander takeoff
```

## Usage/Configuration Options

You can tune your FG installation/settings by the following environment variables:

- `FG\_BINARY` - absolute path to FG binary to run. (It can be an AppImage)
- `FG\_MODELS\_DIR` - absolute path to the folder containing the manually-downloaded aircraft models which should be used for simulation.
- `FG\_ARGS\_EX` - any additional FG parameters.

<a id="frame_rate"></a>

### Display the frame rate

In FlightGear you can display the frame rate by enabling it in: **View > View Options > Show frame rate**.

<a id="custom_takeoff_location"></a>

### Set Custom Takeoff Location

Takeoff location in SITL FlightGear can be set using additional variables. Setting the variable will override the default takeoff location.

The variables which can be set are as follows: `--airport`, `--runway`, and `--offset-distance`. Other options can be found on [FlightGear wiki](http://wiki.flightgear.org/Command_line_options#Initial_Position_and_Orientation)

For example:
```
FG_ARGS_EX="--airport=PHNL"  make px4_sitl_nolockstep flightgear_rascal
```

The example above starts the simulation on the [Honolulu international airport](http://wiki.flightgear.org/Suggested_airports)

<a id="joystick"></a>

### Using a Joystick

Joystick and thumb-joystick are supported through *QGroundControl* ([setup instructions here](../simulation/README.md#joystick-gamepad-integration)).

The joystick input in FlightGear should be disabled in otherwise there will be a "race condition" between the FG joystick input and PX4 commands.


## Extending and Customizing

To extend or customize the simulation interface, edit the files in the **Tools/flightgear_bridge* folder. The code is available in the [PX4-FlightGear-Bridge repository](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge) on Github.


## Further Information

* [PX4-FlightGear-Bridge readme](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)
