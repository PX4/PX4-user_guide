# Gazebo Vehicles

This topic lists/displays the vehicles supported by the PX4 [Gazebo](../sim_gazebo_gz/README.md) simulation and the `make` commands required to run them (the commands are run from a terminal in the **PX4-Autopilot** directory).

Supported vehicle types include: mutirotor, VTOL, Plane.

:::note
The [Gazebo](../sim_gazebo_gz/README.md) page shows how to install Gazebo.
:::

## Multicopter
<a id="x500-quadrotor"></a>
### x500 quadrotor

```sh
make px4_sitl gz_x500
```

<a id="x500-quadrotor-with-visual-odometry"></a>
### x500 quadrotor with visual odometry

```sh
make px4_sitl gz_x500_vision
```

![x500 in Gazebo](../../assets/simulation/gazebo/vehicles/x500.png)

<a id="x500-quadrotor-with-depth-camera"></a>
### x500 quadrotor with Depth Camera

These models have a depth camera attached, modelled on the OAK-D.

_Forward-facing depth camera:_

```sh
make px4_sitl gz_x500_depth
```

![x500 with depth camera in Gazebo](../../assets/simulation/gazebo/vehicles/x500_depth.png)

<a id="fixed_wing"></a>
## Plane/Fixed Wing

<a id="rc-cessna"></a>
### Standard Plane

```sh
make px4_sitl gz_rc_cessna
```

![Plane in Gazebo Classic](../../assets/simulation/gazebo/vehicles/rc_cessna.png)

## VTOL

<a id="standard_vtol"></a>
### Standard VTOL

```sh
make px4_sitl gz_standard_vtol
```

![Standard VTOL in Gazebo Classic](../../assets/simulation/gazebo/vehicles/standard_vtol.png)