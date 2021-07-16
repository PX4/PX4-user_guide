# 가제보 월드

PX4에서 지원하는 [가제보](../simulation/gazebo.md) 세계에 대한 이미지/정보를 제공합니다.

[empty.world](#empty_world)는 기본적으로 생성되며, [모델별 세계](#model_specific_worlds)에 의해 재정의될 수 있습니다. 개발자는 로드할 세계를 수동으로 지정할 수 있습니다. [Gazebo Simulation > 특정 세계 로드](../simulation/gazebo.md#set_world).

지원되는 세계의 소스 코드는 GitHub의 [PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds)을 참고하십시오.

<a id="empty_world"></a>

## 빈 월드 (기본)

[PX4/sitl_gazebo/worlds/empty.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/empty.world)

![empty](../../assets/simulation/gazebo/worlds/empty.png)

## Baylands

[PX4/sitl_gazebo/worlds/baylands.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/baylands.world)

![Baylands World](../../assets/simulation/gazebo/worlds/baylands.jpg)

## KSQL Airport

[PX4/sitl_gazebo/worlds/ksql_airport.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/ksql_airport.world)

![KSQL Airport World](../../assets/simulation/gazebo/worlds/ksql_airport.jpg)

## McMillan Airfield

[PX4/sitl_gazebo/worlds/mcmillan_airfield.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/mcmillan_airfield.world)

![McMillan Airfield World](../../assets/simulation/gazebo/worlds/mcmillan_airfield.jpg)

## Sonoma Raceway

[PX4/sitl_gazebo/worlds/sonoma_raceway.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/sonoma_raceway.world) ![Sonoma_Raceway](../../assets/simulation/gazebo/worlds/sonoma_raceway.png)

## Warehouse

[PX4/sitl_gazebo/worlds/warehouse.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/warehouse.world)

![Warehouse](../../assets/simulation/gazebo/worlds/warehouse.png)

## Yosemite

[PX4/sitl_gazebo/worlds/yosemite.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/yosemite.world)

![Yosemite](../../assets/simulation/gazebo/worlds/yosemite.jpg)

<a id="model_specific_worlds"></a>

## Model Specific Worlds

Some [vehicle models](../simulation/gazebo_vehicles.md) rely on the physics / plugins of a specific world. The PX4 toolchain will automatically spawn a world that has the same name as the vehicle model if one exists (instead of the default **empty.world**):

The model specific worlds are:
- [boat.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/boat.world): Includes a surface to simulate buoyancy of the [boat](../simulation/gazebo_vehicles.md#usv).
- [uuv_hippocampus.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/uuv_hippocampus.world): An empty world used to simulate an underwater environment for the [HippoCampus UUV](../simulation/gazebo_vehicles.md#uuv).
- [typhoon_h480.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/typhoon_h480.world): Used by [Typhoon H480 (Hexrotor)](../simulation/gazebo_vehicles.md#typhoon_h480) vehicle model and includes a video widget to enable / disable video streaming. The world includes a gazebo plugin for a simulated camera.
- [iris_irlock.world](https://github.com/PX4/sitl_gazebo/blob/master/worlds/iris_irlock.world): Includes a IR beacon for testing [precision landing](../advanced_features/precland.md).
