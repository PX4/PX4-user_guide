# Rover (UGVs)

![Traxxas Rover Picture](../../assets/airframes/rover/traxxas_stampede_vxl/final_side.jpg)

PX4 provides support for Unmanned Ground Vehicles (UGVs). The set of configurations can be seen in [Airframes Reference > Rover](../airframes/airframe_reference.md#rover).

This section contains build logs/instructions for assembling as well as configuring a number of UGV frames.

## How to configure a Rover

Using the [control allocation](../config/actuators.md), it is straight forward to setup the rover.

First, determine your rover type as there are two types of Rover:
1. Rover (Differential) : Rover that steers itself using different speeds of the wheels left and right. For example, the [r1 rover](../simulation/gazebo.md#ugv_differential) is differential type.
2. Rover (Ackermann) : Rover with a steering mechanism equivalent to a regular car using the [ackermann geometry](https://en.wikipedia.org/wiki/Ackermann_steering_geometry). For example, the [gazebo rover](../simulation/gazebo.md#ugv_ackermann) is ackermann type.

Then, set the appropriate airframe by modifying the [CA_AIRFRAME](../advanced_config/parameter_reference.md#CA_AIRFRAME) parameter.

Next, follow the [Actuators document](../config/actuators.md) to finish actuator function mapping and output configuration. Have fun driving!

## Videos
@[youtube](https://youtu.be/N3HvSKS3nCw)

This video is with the [Traxxas Stampede Rover](../frames_rover/traxxas_stampede.md) 