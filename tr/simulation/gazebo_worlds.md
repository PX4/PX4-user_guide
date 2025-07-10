---
canonicalUrl: https://docs.px4.io/main/tr/simulation/gazebo_worlds
---

# Gazebo Worlds

This topic provides imagery/information about the [Gazebo](../simulation/gazebo.md) worlds supported by PX4.

The [empty.world](#empty_world) is spawned by default, though this may be overridden by a [model specific world](#model_specific_worlds). Developers can also manually specify the world to load: [Gazebo Simulation > Loading a Specific World](../simulation/gazebo.md#set_world).

The source code for supported worlds can be found on GitHub here: [PX4/sitl_gazebo/worlds](https://github.com/PX4/sitl_gazebo/tree/master/worlds).

<a id="empty_world"></a>

## Empty (Default)

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
