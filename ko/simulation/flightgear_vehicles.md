# FlightGear 차량

PX4 [FlightGear](../simulation/flightgear.md) 시뮬레이션이 지원하는 차량과 실행 `make` 명령을 설명합니다. 명령은 **PX4-Autopilot** 디렉토리의 터미널에서 실행됩니다. 지원되는 차량 유형은 고정익, 오토자이로와 로버입니다(이러한 유형 내에 특정 프레임이 있음).

:::tip
빌드 대상의 전체 목록을 보려면 `make px4_sitl list_vmd_make_targets`를 실행하십시오(`flightgear_`로 시작하는 대상 필터링).
:::

:::note
[FlightGear](../simulation/flightgear.md) 페이지에는 FlightGear 설치 및 사용 방법이 자세히 설명되어있습니다.(이 페이지는 차량별 기능 요약).
:::

<a id="standard_plane"></a>

## 표준 비행기

FlightGear는 많은 비행기 모델을 지원합니다. UAV 개발에 가장 적합한 모델은 [Rascal RC 비행기](https://github.com/ThunderFly-aerospace/FlightGear-Rascal)입니다(여러가지 변형이 존재함).

![Rascal plane in FlightGear](../../assets/simulation/flightgear/vehicles/rascal110.jpg)

변형은 주로 [FDM](http://wiki.flightgear.org/Flight_Dynamics_Model) 모델에 따라 달라집니다. 모든 변형에는 컴퓨터 키보드에서 `=` 키를 눌러 활성화할 수 있는 공통 기능 선택 표가 있습니다.

고급 기능 활성화에 사용할 수 있는 팝업 테이블이 있습니다.

![Rascal plane FlightGear advanced options](../../assets/simulation/flightgear/vehicles/rascal_options.jpg)

가장 관련성이 높은 옵션은 다음과 같습니다.

* 연기 - 공중에서 항공기의 가시성을 향상시키기 위해 연기 흔적을 생성합니다(연기와 입자 옵션은 **FG 보기 > 렌더링 옵션 > 입자 확인란**에서 활성화함).
* 궤적 마커 - 비행 궤적을 따라 직교 마커를 표시합니다.

궤적 마커는 세계 좌표의 절대 비행 경로를 보여주고, 연기 흔적은 기단의 상대 경로를 보여줍니다.

### Rascal 110 YASim

Rascal 모델의 주요 변형에는 연소 피스톤 엔진 모델이 있습니다. This results in a non-zero idle power causing a rotation of propeller on idle engine RPM.

The launch command is:

```sh
make px4_sitl_nolockstep flightgear_rascal
```


### Rascal 110 Electric YASim

A Rascal vehicle with an electric engine.

```sh
make px4_sitl_nolockstep flightgear_rascal-electric
```

:::note
This variant needs the latest FlightGear code (sources at least from 26 April 2020). Otherwise, the FlightGear crashes because of an unexpected definition of electric engine.
:::

### Rascal 110 JSBsim

Rascal JSBsim variant.

This variant does not have a direct `make` option but can be manually selected in the **rascal.json** configuration file (part of [PX4-FlightGear-Bridge](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)). Simply change `Rascal110-YASim` to `Rascal110-JSBSim` in [this file](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge/blob/master/models/rascal.json#L2).

<a id="autogyro"></a>

## Autogyro

The only UAV autogyro model supported by FlightGear is [TF-G1 Autogyro](https://github.com/ThunderFly-aerospace/TF-G1).

```sh
make px4_sitl_nolockstep flightgear_tf-g1
```

![TF-G1 in FlightGear](../../assets/simulation/flightgear/vehicles/tf-g1.jpg)

<a id="ugv"></a>

## Ackerman vehicle (UGV/Rover)

### TF-R1 Ground support Rover

This rover is equipped with a towing hitch and might be used for aero-towing of other vehicles.

```sh
make px4_sitl_nolockstep flightgear_tf-r1
```

![TF-R1 rover in FlightGear](../../assets/simulation/flightgear/vehicles/tf-r1_towing.jpg)

<a id="quadrotor"></a>

## Quadrotor

There is only an [incomplete multirotor model](https://github.com/ThunderFly-aerospace/FlightGear-TF-Mx1). This is not yet usable (it is numerically unstable and needs an additional work).


# Adding a New Vehicle

A new vehicle model needs to be included as a git submodule into [PX4-FlightGear-Bridge/models/](https://github.com/PX4/PX4-FlightGear-Bridge/tree/master/models) directory. This directory contains an control channel definition [JSON file](https://github.com/PX4/PX4-FlightGear-Bridge/blob/master/models/rascal.json).

```json
{
    "FgModel":"Rascal110-YASim",
    "Url":"https://github.com/ThunderFly-aerospace/FlightGear-Rascal/archive/master.zip",
    "Controls": [
                ["5","/controls/flight/aileron","-1"],
                ["7","/controls/flight/elevator","-1"],
                ["2","/controls/flight/rudder","1"],
                ["4","/controls/engines/engine/throttle","1"]
                ]
}
```

The file content meaning is as follows:

* `FgModel` - a precise case sensitive name of the FlightGear model corresponding to "XXXX-set.xml" in the model directory (where XXXX is the model name).
* `Url` is optional and it is not currently used. It is intended for future use to auto-download the models from web
* `Controls` - the most important part of the process of adding a vehicle. This section contains the mapping between the PX4 mixer file and [FlightGear property tree](http://wiki.flightgear.org/Property_tree).
  * The first number in a list selects a PX4 mixer output.
  * Path string is a FlightGear variable location in the property tree.
 * The last number in a list is a multiplier, allowing inversion or scaling of mixer input.

After preparing all these files a new vehicle need to be included in the PX4 make system.

The PX4 configuration is in [/platforms/posix/cmake/sitl_target.cmake](https://github.com/PX4/PX4-Autopilot/blob/c5341da8137f460c84f47f0e38293667ea69a6cb/platforms/posix/cmake/sitl_target.cmake#L164-L171). The new vehicle's json name should be added to the list.
