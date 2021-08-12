# 하드웨어 시뮬레이션(SIH)

SIH(Simulation-In-Hardware)는 쿼드콥터용 [Hardware In The Loop 시뮬레이션(HITL)](../simulation/hitl.md)의 대안입니다. 이 설정에서는 콘트롤러, 상태 추정기와 시뮬레이터와 같은 것들이 임베디드 하드웨어에서 실행됩니다. 데스크톱 컴퓨터는 가상 차량을 출력에만 사용됩니다.

![MAVLink API 시뮬레이터](../../assets/diagrams/SIH_diagram.png)

SIH는 HITL에 비해 두 가지 이점이 있습니다.
- 컴퓨터에 대한 양방향 연결을 하지 않으므로, 동기 타이밍을 보장합니다. 사용자는 고사양의 데스크탑 컴퓨터가 필요하지 않습니다.

- 전체 시뮬레이션은 PX4 환경에서 유지됩니다. PX4 개발자는 수학적 모델을 시뮬레이터에 손 쉽게 통합할 수 있습니다. 예를 들어, 공기역학적 모델이나 센서의 소음 수준을 수정하거나 시뮬레이션 센서를 추가할 수 있습니다.

SIH는 새로운 PX4 사용자가 PX4와 다양한 모드 및 기능에 익숙해지고, 실제 RC 컨트롤러로 쿼드콥터를 조종하는 방법 학습에 사용할 수 있습니다.

동적 모델은 이 [pdf 보고서](https://github.com/PX4/Devguide/raw/master/assets/simulation/SIH_dynamic_model.pdf)을 참고하십시오.

또한 차량을 나타내는 물리적 매개변수(예: 질량, 관성 및 최대 추력)는 [SIH 매개변수](../advanced_config/parameter_reference.md#simulation-in-hardware)에서 쉽게 수정할 수 있습니다.
> "Dynamics modeling of agile fixed-wing unmanned aerial vehicles." Khan, Waqas, supervised by Meyer Nahon, McGill University, PhD thesis, 2016.

Furthermore, the physical parameters representing the vehicle (such as mass, inertia, and maximum thrust force) can easily be modified from the [SIH parameters](../advanced_config/parameter_reference.md#simulation-in-hardware).

@[youtube](https://youtu.be/PzIpSCRD8Jo)

## 요구 사항

SIH를 실행하는 것은 기체를 선택하는 것과 같이 쉽습니다. USB 케이블로 자동조종장치를 데스크탑 컴퓨터에 연결 부팅후, 지상관제소를 사용하여 [SIH 기체](../airframes/airframe_reference.md#simulation-copter)를 선택합니다.

- `-q` - *QGroundControl*에 대한 통신 허용(선택 사항)
- SIH for quadrotor supported from PX4 v1.9.
- SIH for fixed-wing (airplane) is supported in versions after PX v1.12 (currently in the master branch).

## SIH 설정

Running the SIH is as easy as selecting an airframe. Plug the autopilot to the desktop computer with a USB cable, let it boot, then using a ground control station select the [SIH Quadcopter X](../airframes/airframe_reference.md#simulation-copter) or the `SIH plane AERT`. The autopilot will then reboot.

When the SIH airframe is selected, the SIH module starts by itself, the vehicle should be displayed on the ground control station map.

:::warning
The airplane needs to takeoff in manual mode at full throttle. Also, if the airplane hits the floor the state estimator might lose its fix.
:::

## 디스플레이 설정

SIH는 패시브 커플링 시스템을 기반으로 하는 새로운 유형의 수직 이착륙(VTOL) 무인 항공기(UAV)를 개발하는 캐나다 회사인 Coriolis g Corporation에서 개발하였습니다.
- Quadrotor from PX4 v1.11.
- Fixed-wing from the PX4 master (or the release version after PX4 v1.12).

To display the simulated vehicle:
1. *QGroundControl*을 닫습니다(열린 경우).
1. 하드웨어 자동 조종 장치의 플러그를 뽑았다가 다시 꽂습니다(부팅하는 데 몇 초 정도 걸림).
1. 터미널에서 **jmavsim_run.sh** 스크립트를 입력하여, jMAVSim을 실행합니다.
   ```
   ./Tools/jmavsim_run.sh -q -d /dev/ttyACM0 -b 2000000 -r 250 -o
   ```
   여기서 플래그들은 아래와 같습니다.
   - `-q` to allow the communication to *QGroundControl* (optional).
   - `-d` to start the serial device `/dev/ttyACM0` on Linux. On macOS this would be `/dev/tty.usbmodem1`.
   - `-b` to set the serial baud rate to `2000000`.
   - `-o` to start jMAVSim in *display Only* mode (i.e. the physical engine is turned off and jMAVSim only displays the trajectory given by the SIH in real-time).
   - add a flag `-a` to display an aircraft. If this flag is not present a quadrotor will be displayed by default.
1. After few seconds, *QGroundControl* can be opened again.

At this point, the system can be armed and flown. The vehicle can be observed moving in jMAVSim, and on the QGC __Fly__ view.


## 개발진

The SIH was originally developed by Coriolis g Corporation, then the airplane model was added by Altitude R&D inc. Both are Canadian companies, Coriolis develops a new type of Vertical Takeoff and Landing (VTOL) vehicles based on passive coupling systems [www.vogi-vtol.com](http://www.vogi-vtol.com/); Altitude R&D is specialized in dynamics, control, and real-time simulation. They provide the SIH as a simple simulator for quadrotors and airplanes released for free under BSD license.
