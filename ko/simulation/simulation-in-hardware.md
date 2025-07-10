---
canonicalUrl: https://docs.px4.io/main/ko/simulation/simulation-in-hardware
---

# 하드웨어 시뮬레이션(SIH)

Simulation-In-Hardware (SIH) is an alternative to [Hardware In The Loop simulation (HITL)](../simulation/hitl.md) for quadrotors, fixed-wing vehicles (airplane), and tailsitters. 이 설정에서는 콘트롤러, 상태 추정기와 시뮬레이터와 같은 것들이 임베디드 하드웨어에서 실행됩니다. 데스크톱 컴퓨터는 가상 차량을 출력에만 사용됩니다.

![MAVLink API 시뮬레이터](../../assets/diagrams/SIH_diagram.png)

SIH는 HITL에 비해 두 가지 이점이 있습니다.
- 컴퓨터에 대한 양방향 연결을 하지 않으므로, 동기 타이밍을 보장합니다. 사용자는 고사양의 데스크탑 컴퓨터가 필요하지 않습니다.

- 전체 시뮬레이션은 PX4 환경에서 유지됩니다. PX4 개발자는 수학적 모델을 시뮬레이터에 손 쉽게 통합할 수 있습니다. 예를 들어, 공기역학적 모델이나 센서의 소음 수준을 수정하거나 시뮬레이션 센서를 추가할 수 있습니다.

SIH는 새로운 PX4 사용자가 PX4와 다양한 모드 및 기능에 익숙해지고, 실제 RC 컨트롤러로 쿼드콥터를 조종하는 방법 학습에 사용할 수 있습니다.

동적 모델은 이 [pdf 보고서](https://github.com/PX4/Devguide/raw/master/assets/simulation/SIH_dynamic_model.pdf)을 참고하십시오.

또한 차량을 나타내는 물리적 매개변수(예: 질량, 관성 및 최대 추력)는 [SIH 매개변수](../advanced_config/parameter_reference.md#simulation-in-hardware)에서 쉽게 수정할 수 있습니다.
> "Dynamics modeling of agile fixed-wing unmanned aerial vehicles." ("민첩한 고정익 무인항공기의 역학 모델링.") Khan, Waqas, supervised by Nahon, Meyer, McGill University, PhD thesis, 2016.

The model for the tailsitter vehicle is inspired from the Master thesis:
> "Modeling and control of a flying wing tailsitter unmanned aerial vehicle." Chiappinelli, Romain, supervised by Nahon, Meyer, McGill University, Masters thesis, 2018.

Furthermore, the physical parameters representing the vehicle (such as mass, inertia, and maximum thrust force) can easily be modified from the [SIH parameters](../advanced_config/parameter_reference.md#simulation-in-hardware).

@[youtube](https://youtu.be/PzIpSCRD8Jo)

## 요구 사항

To run the SIH, you will need a [flight controller](../flight_controller/README.md) (e.g. a Pixhawk-series board). you will also need either a [radio control transmitter and receiver pair](../getting_started/rc_transmitter_receiver.md) or a [joystick](https://docs.qgroundcontrol.com/en/SetupView/Joystick.html) (a joystick can be used via QGroundControl to emulate a radio control system).

- `-q` - *QGroundControl*에 대한 통신 허용(선택 사항)
- 쿼드로터용 SIH는 PX4 v1.9부터 지원됩니다.
- SIH for fixed-wing (airplane) and tailsitter are supported in versions after PX v1.12 (currently in the master branch).

## SIH 설정

Running the SIH is as easy as selecting an airframe. Plug the autopilot to the desktop computer with a USB cable, let it boot, then using a ground control station select [SIH Quadcopter X](../airframes/airframe_reference.md#simulation-copter), `SIH plane AERT`, or 'SIH Tailsitter Duo'. The autopilot will then reboot.

When the SIH airframe is selected, the module `sih` starts by itself, the vehicle should be displayed on the ground control station map.

:::warning
The airplane needs to takeoff in manual mode at full throttle. Also, if the airplane hits the floor the state estimator might lose its fix.
:::

## 디스플레이 설정

The simulated vehicle can be displayed in jMAVSim for the following PX4 versions:
- PX4 v1.11의 쿼드로터
- PX4 마스터(또는 PX4 v1.12 이후 릴리스 버전)의 고정익

To display the simulated vehicle:
1. *QGroundControl*을 닫습니다(열린 경우).
1. 하드웨어 자동 조종 장치의 플러그를 뽑았다가 다시 꽂습니다(부팅하는 데 몇 초 정도 걸림).
1. 터미널에서 **jmavsim_run.sh** 스크립트를 입력하여, jMAVSim을 실행합니다.
   ```
   ./Tools/jmavsim_run.sh -q -d /dev/ttyACM0 -b 2000000 -r 250 -o
   ```
   여기서 플래그들은 아래와 같습니다.
   - `-q` - *QGroundControl*에 대한 통신 허용(선택 사항)
   - `-d` Linux에서 직렬 장치 `/dev/ttyACM0`를 사용합니다. MacOS에서는 `/dev/tty.usbmodem1`를 사용합니다.
   - `-b` 직렬 전송 속도를 `2000000`으로 설정합니다.
   - `-o` - jMAVSim을 *디스플레이 전용* 모드로 시작합니다(즉, 물리적 엔진이 꺼지고 jMAVSim은 SIH가 제공한 궤적만 실시간으로 표시함).
   - add a flag `-a` to display an aircraft or '-t' to display a tailsitter. 이 플래그가 없으면 기본적으로 쿼드로터가 표시됩니다.
1. 몇 초 후에 *QGroundControl*을 다시 오픈할 수 있습니다.

At this point, the system can be armed and flown. The vehicle can be observed moving in jMAVSim, and on the QGC __Fly__ view.


## 개발진

The SIH was originally developed by Coriolis g Corporation, then the airplane model and tailsitter models were added by Altitude R&D inc. Both are Canadian companies, Coriolis develops a new type of Vertical Takeoff and Landing (VTOL) vehicles based on passive coupling systems [www.vogi-vtol.com](http://www.vogi-vtol.com/); Altitude R&D is specialized in dynamics, control, and real-time simulation [www.altitude-rd.com](https://www.altitude-rd.com/). They provide the SIH as a simple simulator for quadrotors and airplanes released for free under BSD license.
