---
canonicalUrl: https://docs.px4.io/main/de/sim_gazebo_classic/gazebo_vehicles
---

# Gazebo Classic Vehicles

This topic lists/displays the vehicles supported by the PX4 [Gazebo Classic](../sim_gazebo_classic/README.md) simulation and the `make` commands required to run them (the commands are run from a terminal in the **PX4-Autopilot** directory).

Supported vehicle types include: mutirotors, VTOL, VTOL Tailsitter, Plane, Rover, Submarine/UUV.

:::note
The [Gazebo Classic](../sim_gazebo_classic/README.md) page shows how to install Gazebo Classic, how to enable video and load custom maps, and many other configuration options.
:::

## Multicopter
<a id="quadrotor"></a>

### Quadrotor (Default)

```sh
make px4_sitl gazebo-classic
```

<a id="quadrotor_optical_flow"></a>

### Quadrotor with Optical Flow

```sh
make px4_sitl gazebo-classic_iris_opt_flow
```

### Quadrotor with Depth Camera

These models have a depth camera attached, modelled on the Intel® RealSense™ D455.

_Forward-facing depth camera:_

```sh
make px4_sitl gazebo-classic_iris_depth_camera
```

_Downward-facing depth camera:_

```sh
make px4_sitl gazebo-classic_iris_downward_depth_camera
```

<a id="3dr_solo"></a>

### 3DR Solo (Quadrotor)

```sh
make px4_sitl gazebo-classic_solo
```

![3DR Solo in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/solo.png)


<a id="typhoon_h480"></a>

### Typhoon H480 (Hexrotor)

```sh
make px4_sitl gazebo-classic_typhoon_h480
```

![Typhoon H480 in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/typhoon.jpg)

:::note
This target also supports [video streaming simulation](../sim_gazebo_classic/README.md#video-streaming).
:::

<a id="fixed_wing"></a>

## Plane/Fixed-wing

<a id="standard_plane"></a>

### Standard Plane

```sh
make px4_sitl gazebo-classic_plane
```

![Plane in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/plane.png)


<a id="standard_plane_catapult"></a>

#### Standard Plane with Catapult Launch

```sh
make px4_sitl gazebo-classic_plane_catapult
```

This model simulates hand/catapult launch, which can be used for [fixed-wing takeoff](../flight_modes_fw/takeoff.md) in position mode, takeoff mode, or missions.

The plane will automatically be launched as soon as the vehicle is armed.


## VTOL

<a id="standard_vtol"></a>

### Standard VTOL

```sh
make px4_sitl gazebo-classic_standard_vtol
```

![Standard VTOL in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/standard_vtol.png)

<a id="tailsitter_vtol"></a>

### Tailsitter VTOL

```sh
make px4_sitl gazebo-classic_tailsitter
```

![Tailsitter VTOL in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/tailsitter.png)


<a id="ugv"></a>

## Unmmanned Ground Vehicle (UGV/Rover/Car)

### Ackermann UGV

```sh
make px4_sitl gazebo-classic_rover
```

![Rover in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/rover.png)

### Differential UGV

```sh
make px4_sitl gazebo-classic_r1_rover
```

![Rover in Gazebo Classic](../../assets/simulation/gazebo_classic/vehicles/r1_rover.png)


<a id="uuv"></a>

## Unmanned Underwater Vehicle (UUV/Submarine)

<a id="uuv_hippocampus"></a>

### HippoCampus TUHH UUV

```sh
make px4_sitl gazebo-classic_uuv_hippocampus
```

![Submarine/UUV](../../assets/simulation/gazebo_classic/vehicles/hippocampus.png)

<a id="usv"></a>

## Unmanned Surface Vehicle (USV/Boat)

<a id="usv_boat"></a>

### Boat

```sh
make px4_sitl gazebo-classic_boat
```

![Boat/USV](../../assets/simulation/gazebo_classic/vehicles/boat.png)

<a id="airship"></a>

## Airship

<a id="cloudship"></a>

### Cloudship

```sh
make px4_sitl gazebo-classic_cloudship
```

![Airship](../../assets/simulation/gazebo_classic/vehicles/airship.png)
