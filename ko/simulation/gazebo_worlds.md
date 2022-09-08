# 가제보 세계

PX4에서 지원하는 [가제보](../simulation/gazebo.md) 세계에 대한 이미지/정보를 제공합니다.

[empty.world](#empty_world)는 기본적으로 생성되며, [모델별 세계](#model_specific_worlds)에 의해 재정의될 수 있습니다. 개발자는 로드할 세계를 수동으로 지정할 수 있습니다. [Gazebo Simulation > 특정 세계 로드](../simulation/gazebo.md#set_world).

The source code for supported worlds can be found on GitHub here: [PX4/PX4-SITL_gazebo/tree/master/worlds](https://github.com/PX4/PX4-SITL_gazebo/tree/master/worlds).

<a id="empty_world"></a>

## 빈 세계 (기본)

[PX4/PX4-SITL_gazebo/tree/master/worlds/empty.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/empty.world)

![비어있음](../../assets/simulation/gazebo/worlds/empty.png)

## 베이랜드

[PX4/PX4-SITL_gazebo/tree/master/worlds/baylands.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/baylands.world)

![베이랜드 세계](../../assets/simulation/gazebo/worlds/baylands.jpg)

## KSQL 공항

[PX4/PX4-SITL_gazebo/tree/master/worlds/ksql_airport.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/ksql_airport.world)

![KSQL 공항 세계](../../assets/simulation/gazebo/worlds/ksql_airport.jpg)

## 맥밀리언 비행장

[PX4/PX4-SITL_gazebo/tree/master/worlds/worlds/mcmillan_airfield.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/mcmillan_airfield.world)

![맥밀리언 비행장 세계](../../assets/simulation/gazebo/worlds/mcmillan_airfield.jpg)

## 소노마 경주로

[PX4/PX4-SITL_gazebo/tree/master/worlds/sonoma_raceway.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/sonoma_raceway.world) ![소노마 경주로](../../assets/simulation/gazebo/worlds/sonoma_raceway.png)

## 창고

[PX4/PX4-SITL_gazebo/tree/master/worlds/warehouse.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/warehouse.world)

![창고](../../assets/simulation/gazebo/worlds/warehouse.png)

## 요세미티

[PX4/PX4-SITL_gazebo/tree/master/worlds/yosemite.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/yosemite.world)

![요세미티](../../assets/simulation/gazebo/worlds/yosemite.jpg)

<a id="model_specific_worlds"></a>

## 모델별 세계

일부 [차량 모델](../simulation/gazebo_vehicles.md)은 특정 세계의 물리/플러그인에 의존합니다. PX4 툴체인은 차량 모델이 존재하는 경우 (기본 **empty.world** 대신) 동일한 이름을 가진 세계를 자동으로 생성합니다.

모델별 세계는 다음과 같습니다.
- [boat.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/boat.world): Includes a surface to simulate buoyancy of the [boat](../simulation/gazebo_vehicles.md#usv).
- [uuv_hippocampus.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/uuv_hippocampus.world): An empty world used to simulate an underwater environment for the [HippoCampus UUV](../simulation/gazebo_vehicles.md#uuv).
- [typhoon_h480.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/typhoon_h480.world): Used by [Typhoon H480 (Hexrotor)](../simulation/gazebo_vehicles.md#typhoon_h480) vehicle model and includes a video widget to enable / disable video streaming. 세계에는 시뮬레이션 카메라 전망대 플러그인이 포함되어 있습니다.
- [iris_irlock.world](https://github.com/PX4/PX4-SITL_gazebo/blob/master/worlds/iris_irlock.world): Includes a IR beacon for testing [precision landing](../advanced_features/precland.md).
