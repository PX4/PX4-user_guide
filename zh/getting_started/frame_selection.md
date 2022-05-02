# 载具选择

PX4支持空中，表面（地面，水面）以及水下载具。 您可以在[机架参考](../airframes/airframe_reference.md)中查看已经经过PX4测试/调整过的载具类型或及其变种（“框架”）。

选择何种机架取决于您需要用来做什么：

- **多旋翼**能提供精确地悬停以及垂直起飞，代价就是更短且一般较慢的飞行。 PX4有可以让它们很容易飞的模式，并且它们是最受欢迎的飞行器。
- **固定翼**固定翼飞机提供了更长且更快的飞行，因此可以更好地覆盖如顶面勘测等任务。 However they are harder to fly and land than multicopters, and aren't suitable if you need to hover or fly very slowly (e.g. when surveying vertical structures).
- **VTOL** (Vertical Takeoff and Landing) aircraft come in a number of types: tiltrotors, tailsitters, quadplanes etc. They offer the best of both worlds: take off in vertical mode like a multicopter and then transition in forward flight like an airplane. They are often more expensive than either multicopters and fixed wing aircraft, and harder to build and tune.
- **Airships/Balloons** are lighter-than-air vehicles that typically offer high altitude long duration flight, often at the cost of having limited (or no) control over speed and direction of flight.
- **Rovers** are car-like ground vehicles. They are simple to control and often fun to use.
- **Boats** are water-surface vehicles.
- **Submersibles** are underwater vehicles.

:::note
The airframe settings used by PX4 are configured in *QGroundControl* during initital setup: [Airframe setup](../config/airframe.md).

![Frame Selection](../../assets/qgc/setup/airframe/airframe_px4.jpg)
:::