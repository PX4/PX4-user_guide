# 하드웨어 시뮬레이션(SIH)

SIH(Simulation-In-Hardware)는 쿼드콥터용 [Hardware In The Loop 시뮬레이션(HITL)](../simulation/hitl.md)의 대안입니다. 이 설정에서는 콘트롤러, 상태 추정기와 시뮬레이터와 같은 것들이 임베디드 하드웨어에서 실행됩니다. 데스크톱 컴퓨터는 가상 차량을 출력에만 사용됩니다.

![MAVLink API 시뮬레이터](../../assets/diagrams/SIH_diagram.png)

SIH는 HITL에 비해 두 가지 이점이 있습니다.
- 컴퓨터에 대한 양방향 연결을 하지 않으므로, 동기 타이밍을 보장합니다. 사용자는 고사양의 데스크탑 컴퓨터가 필요하지 않습니다.

- 전체 시뮬레이션은 PX4 환경에서 유지됩니다. PX4 개발자는 수학적 모델을 시뮬레이터에 손 쉽게 통합할 수 있습니다. 예를 들어, 공기역학적 모델이나 센서의 소음 수준을 수정하거나 시뮬레이션 센서를 추가할 수 있습니다.

SIH는 새로운 PX4 사용자가 PX4와 다양한 모드 및 기능에 익숙해지고, 실제 RC 컨트롤러로 쿼드콥터를 조종하는 방법 학습에 사용할 수 있습니다.

동적 모델은 이 [pdf 보고서](https://github.com/PX4/Devguide/raw/master/assets/simulation/SIH_dynamic_model.pdf)을 참고하십시오.

또한 차량을 나타내는 물리적 매개변수(예: 질량, 관성 및 최대 추력)는 [SIH 매개변수](../advanced_config/parameter_reference.md#simulation-in-hardware)에서 쉽게 수정할 수 있습니다.
> "Dynamics modeling of agile fixed-wing unmanned aerial vehicles." ("민첩한 고정익 무인항공기의 역학 모델링.") Khan, Waqas, supervised by Meyer Nahon, McGill University, PhD thesis, 2016.

또한 차량을 나타내는 물리적 매개변수(예: 질량, 관성 및 최대 추력)는 [SIH 매개변수](../advanced_config/parameter_reference.md#simulation-in-hardware)에서 쉽게 수정할 수 있습니다.

@[youtube](https://youtu.be/PzIpSCRD8Jo)

## 요구 사항

SIH를 실행하는 것은 기체를 선택하는 것과 같이 쉽습니다. USB 케이블로 자동조종장치를 데스크탑 컴퓨터에 연결 부팅후, 지상관제소를 사용하여 [SIH 기체](../airframes/airframe_reference.md#simulation-copter)를 선택합니다.

- `-q` - *QGroundControl*에 대한 통신 허용(선택 사항)
- 쿼드로터용 SIH는 PX4 v1.9부터 지원됩니다.
- 고정익(비행기)용 SIH는 PX v1.12(현재 마스터 브랜치) 이후 버전에서 지원됩니다.

## SIH 설정

SIH를 실행하는 것은 기체를 선택하는 것처럼 용이합니다. USB 케이블을 사용하여 자동 조종 장치를 데스크탑 컴퓨터에 연결하고 부팅한 다음, 지상 관제소를 사용하여 [SIH Quadcopter X](../airframes/airframe_reference.md#simulation-copter) 또는 `SIH 평면 AERT`를 선택합니다. 그러면, 자동조종장치가 재부팅됩니다.

SIH 기체가 선택되면 SIH 모듈이 자체적으로 시작되며, 차량은 지상 관제소 지도에 표시됩니다.

:::warning
비행기는 최대 스로틀에서 수동 모드로 이륙하여야 합니다. 또한, 비행기가 바닥에 떨어지면 상태 추정기가 수정 사항을 잃을 수 있습니다.
:::

## 디스플레이 설정

SIH는 패시브 커플링 시스템을 기반으로 하는 새로운 유형의 수직 이착륙(VTOL) 무인 항공기(UAV)를 개발하는 캐나다 회사인 Coriolis g Corporation에서 개발하였습니다.
- PX4 v1.11의 쿼드로터
- PX4 마스터(또는 PX4 v1.12 이후 릴리스 버전)의 고정익

시뮬레이션된 차량을 표시하려면:
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
   - 항공기를 표시하려면 플래그 `-a`를 추가합니다. 이 플래그가 없으면 기본적으로 쿼드로터가 표시됩니다.
1. 몇 초 후에 *QGroundControl*을 다시 오픈할 수 있습니다.

이 시점에서 시스템은 시동후 비행할 수 있습니다. 차량은 jMAVSim과 QGC __Fly__ 보기에서 움직이는 것을 관찰할 수 있습니다.


## 개발진

SIH는 원래 Coriolis g Corporation에서 개발하였으며, 비행기 모델은 Altitude R&D inc에서 추가되었습니다. 둘 다 캐나다 회사이며 Coriolis는 수동 커플링 시스템 [www.vogi-vtol.com](http://www.vogi-vtol.com/)을 기반으로 하는 새로운 유형의 수직 이착륙(VTOL) 차량을 개발합니다. Altitude R&D는 역학, 제어 및 실시간 시뮬레이션에 특화되어 있습니다. 그들은 SIH를 BSD 라이선스에 따라 무료로 출시된 쿼드로터 및 비행기를 위한 간단한 시뮬레이터로 제공합니다.
