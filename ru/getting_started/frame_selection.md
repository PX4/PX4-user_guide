---
canonicalUrl: https://docs.px4.io/main/ru/getting_started/frame_selection
---

# Vehicle Selection

PX4 supports air, surface, and submersible vehicles. You can see a full list of the vehicle types and variants ("frames") that have been tested/tuned for use with PX4 here: [Airframe Reference](../airframes/airframe_reference.md).

Select the frame based on what you need it for:
- **Multicopters** offer precision hovering and vertical takeoff, at the cost of shorter and generally slower flight. PX4 has modes that make them easy to fly, and they are the most popular type of flying vehicle.
- **Helicopters** similar to Multicopters, mechanically more complex, but more efficient.
- **Fixed-wing** airplanes offer longer and faster flight, and hence better coverage for ground surveys etc. However they are harder to fly and land than multicopters, and aren't suitable if you need to hover or fly very slowly (e.g. when surveying vertical structures).
- **VTOL** (Vertical Takeoff and Landing) aircraft come in a number of types: tiltrotors, tailsitters, quadplanes etc. They offer the best of both worlds: take off in vertical mode like a multicopter and then transition in forward flight like an airplane. They are often more expensive than either multicopters and fixed-wing aircraft, and harder to build and tune.
- **Airships/Balloons** are lighter-than-air vehicles that typically offer high altitude long duration flight, often at the cost of having limited (or no) control over speed and direction of flight.
- **Rovers** are car-like ground vehicles. They are simple to control and often fun to use.
- **Boats** are water-surface vehicles.
- **Submersibles** are underwater vehicles.

:::note
The airframe settings used by PX4 are configured in *QGroundControl* during initital setup: [Airframe setup](../config/airframe.md).

![Frame Selection](../../assets/qgc/setup/airframe/airframe_px4.jpg) :::
