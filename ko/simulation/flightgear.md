---
canonicalUrl: https://docs.px4.io/main/ko/simulation/flightgear
---

# FlightGear 시뮬레이션

[FlightGear](https://www.flightgear.org/)는 강력한 [FDM 엔진](http://wiki.flightgear.org/Flight_Dynamics_Model)이 탑재된 비행 시뮬레이터입니다. FlightGear는 다양한 기상 조건에서 회전익기를 시뮬레이션합니다. 이것이 원래 [ThunderFly s.r.o.](https://www.thunderfly.cz/)에서 FlightGear를 개발한 이유입니다.

이 페이지는 SITL에서 FlightGear의 단일 차량 시뮬레이션에 대하여 설명합니다. 다중 차량 사용에 대한 정보는 [FlightGear를 사용한 다중 차량 시뮬레이션](../simulation/multi_vehicle_flightgear.md)을 참고하십시오.

**지원 차량:** 오토자이로, 고정익, 로버

@[유투브](https://youtu.be/iqdcN5Gj4wI)

[![인어 그래프 ](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIEZsaWdodEdlYXIgLS0-IEZsaWdodEdlYXItQnJpZGdlO1xuICBGbGlnaHRHZWFyLUJyaWRnZSAtLT4gTUFWTGluaztcbiAgTUFWTGluayAtLT4gUFg0X1NJVEw7XG5cdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


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

위에서 언급한 `make` 명령은 먼저 PX4를 빌드후, FlightGear 시뮬레이터를 실행합니다.

PX4가 시작되면 아래와 같은 PX4 셸이 시작됩니다. 명령 프롬프트를 표시하려면 Enter를 입력합니다.

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
Target Bridge Freq: 200, send data every step: 1
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

콘솔은 PX4가 기체별 초기화 및 매개변수 파일을 로드할 때 상태를 출력하고 시뮬레이터를 기다린후 연결합니다. [ecl/EKF]가 `GPS 융합을 시작`한다는 정보가 인쇄되면 차량은 시동 준비가 된 것입니다. 이 시점에서 항공기가 약간 보이는 FlightGear 창이 표시되어야 합니다.


:::note
**Ctrl+V**를 눌러 보기를 변경할 수 있습니다.
:::

![FlightGear UI](../../assets/simulation/flightgear/flightgearUI.jpg)

다음을 입력하여 공중에 띄울 수 있습니다.

```sh
pxh> commander takeoff
```

## 사용법/설정 옵션

다음 환경 변수로 FG 설치/설정을 조정할 수 있습니다.

- `FG\_BINARY` - 실행할 FG 바이너리의 절대 경로입니다. (AppImage일 수 있음)
- `FG\_MODELS\_DIR` - 수동으로 다운로드한 항공기 모델이 포함된 폴더의 절대 경로입니다.
- `FG\_ARGS\_EX` - 추가 FG 매개변수.

<a id="frame_rate"></a>

### 프레임 속도 표시

FlightGear에서 **보기 > 보기 옵션 > 프레임 속도 표시**에서 프레임 속도를 표시할 수 있습니다.

<a id="custom_takeoff_location"></a>

### 사용자 지정 이륙 위치 설정

SITL FlightGear의 이륙 위치는 추가 변수를 사용하여 설정할 수 있습니다. 변수를 설정하면 기본 이륙 위치가 무시됩니다.

설정할 수 있는 변수는 `--airport`, `--runway`, `--offset-distance`입니다. 다른 옵션은 [FlightGear 위키](http://wiki.flightgear.org/Command_line_options#Initial_Position_and_Orientation)를 참고하십시오.

예:
```
FG_ARGS_EX="--airport=PHNL"  make px4_sitl_nolockstep flightgear_rascal
```

위의 예는 [호놀룰루 국제공항](http://wiki.flightgear.org/Suggested_airports) 시뮬레이션입니다.


<a id="joystick"></a>

### 조이스틱 사용법

조이스틱과 썸 조이스틱은 *QGroundControl*을 통하여 지원됩니다([설정 방법은 여기](../simulation/README.md#joystick-gamepad-integration)).

FlightGear의 조이스틱 입력은 비활성화 되어야 합니다. 그렇지 않으면 FG 조이스틱 입력과 PX4 명령 사이에 "경합 조건"이 발생합니다.


## 확장 및 사용자 정의

To extend or customize the simulation interface, edit the files in the **Tools/simulation/flightgear/flightgear_bridge** folder. 코드는 Github의 [PX4-FlightGear-Bridge 저장소](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)를 참고하십시오.


## 추가 정보

* [PX4-FlightGear-Bridge 추가 정보](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)
