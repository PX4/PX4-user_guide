---
canonicalUrl: https://docs.px4.io/main/tr/frames_rover/README
---

# Rovers (UGVs)

PX4 supports rovers (Unmanned Ground Vehicles - UGVs) with [ackermann and differential](#rover-types) steering.

This section contains build logs/instructions for assembling as well as configuring a number of UGV frames.

![Traxxas Rover Picture](../../assets/airframes/rover/traxxas_stampede_vxl/final_side.jpg)

## Rover Types

PX4 supports rovers with:

- **Differential steering**: direction is controlled by moving the left- and right-side wheels at different speeds. This kind of steering commonly used on a military tank of the wheels left and right.
- **Ackermann steering**: direction is controlled by pointing wheels in the direction of travel ([ackermann geometry](https://en.wikipedia.org/wiki/Ackermann_steering_geometry) compensates for the fact that wheels on the inside and outside of the turn move at different rates). This kind of steering is used on most commercial vehicles, including cars, trucks etc.

The supported frames can be seen in [Airframes Reference > Rover](../airframes/airframe_reference.md#rover).


## How to Configure a Rover

Using [control allocation](../config/actuators.md), it is straightforward to setup a rover.

For vehicles with Ackermann steering:

1. In the [Airframe](../config/airframe.md) configuration, select the *Generic Ground Vehicle*.
1. Set the [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) parameter to **Rover (Ackermann)** (5).
1. Follow the [Actuators document](../config/actuators.md) to map the steering and throttle outputs as displayed.

For vehicles with Differential steering:

1. In the [Airframe](../config/airframe.md) configuration, select either the _Aion Robotics R1 UGV_ or _NXP Cup car: DF Robot GPX_
1. Set the [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) parameter to **Rover (Differential)** (6).
1. Follow the [Actuators document](../config/actuators.md) to map the left and right motors and throttle outputs.


## Simulation

Gazebo provides simulations for both types of steering:

- Ackermann: [gazebo rover](../simulation/gazebo_vehicles.md#ackermann-ugv)
- Differential: [r1 rover](../simulation/gazebo_vehicles.md#differential-ugv)

## Videos

This video shows the [Traxxas Stampede Rover](../frames_rover/traxxas_stampede.md) (an Ackermann vehicle).

@[youtube](https://youtu.be/N3HvSKS3nCw)
