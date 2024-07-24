# Rovers (UGVs)

<LinkedBadge type="warning" text="Experimental" url="../airframes/#experimental-vehicles"/>

:::warning
Support for rover is [experimental](../airframes/index.md#experimental-vehicles). :::warning Support for rover is [experimental](../airframes/index.md#experimental-vehicles).
:::

PX4 supports rovers (Unmanned Ground Vehicles - UGVs) with [ackermann and differential](#rover-types) steering.

This section contains links to infomrmation abou thte different types of rovers, along with build logs/instructions for assembling a number of UGV frames.

![Traxxas Rover Picture](../../assets/airframes/rover/traxxas_stampede_vxl/final_side.jpg)

## Rover Types

PX4 supports rovers with:

- [**Differential steering**](../frames_rover/differential_rover_v1.md): direction is controlled by moving the left- and right-side wheels at different speeds. This kind of steering commonly used on bulldozers, tanks, and other tracked vehicles.
- **Ackermann steering**: direction is controlled by pointing wheels in the direction of travel. This kind of steering is used on most commercial vehicles, including cars, trucks etc.

  There are two Ackermann modules:

  - [**Ackermann steering (v2)**](../frames_rover/ackermann_rover_v2.md) - Dedicated ackermann module, added after PX4 v1.15.
  - [**Ackermann steering (v1)**](../frames_rover/ackermann_rover_v1.md) - Generic UGV module ackermann implementation.

  ::: info
This "v1" module shares the same code as the differential steering module, which was derived from the fixed wing controller.
The "v2" module has been written specifically for Ackermann Rovers, and performs better for many use cases.
However it is still in development and you will need to build the firmware yourself.
:::

## Videos

This video shows the [Traxxas Stampede Rover](../frames_rover/traxxas_stampede.md) (an Ackermann vehicle).

<lite-youtube videoid="N3HvSKS3nCw" title="Traxxas Stampede VXL Autonomous navigation with Pixhawk Mini"/>
