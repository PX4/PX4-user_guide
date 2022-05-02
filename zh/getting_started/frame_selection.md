# 载具选择

PX4支持空中，表面（地面，水面）以及水下载具。 您可以在[机架参考](../airframes/airframe_reference.md)中查看已经经过PX4测试/调整过的载具类型或及其变种（“框架”）。

选择何种机架取决于您需要用来做什么：

- **多旋翼**能提供精确地悬停以及垂直起飞，代价就是更短且一般较慢的飞行。 PX4有可以让它们很容易飞的模式，并且它们是最受欢迎的飞行器。
- **固定翼**固定翼飞机提供了更长且更快的飞行，因此可以更好地覆盖如顶面勘测等任务。 但是它们比多旋翼更难飞行和降落，并且如果您需要悬停或飞得很慢时，它们就不再合适（例如在勘测垂直建筑时）。
- **VTOL**（垂直起降）飞行器有若干类型：倾转旋翼式（tiltrotors），尾座式（tailsitters），四轴复合翼（quadplanes ）等等。 它们拥有二者（多旋翼和固定翼）优点：能够像多旋翼那样垂直起飞然后转变到像固定翼飞机那样向前飞行。 它们通常比多旋翼和固定翼更加昂贵，并且更难组装和调试。
- **Airships/Balloons** are lighter-than-air vehicles that typically offer high altitude long duration flight, often at the cost of having limited (or no) control over speed and direction of flight.
- **Rovers** are car-like ground vehicles. They are simple to control and often fun to use.
- **Boats** are water-surface vehicles.
- **Submersibles** are underwater vehicles.

:::note
The airframe settings used by PX4 are configured in *QGroundControl* during initital setup: [Airframe setup](../config/airframe.md).

![Frame Selection](../../assets/qgc/setup/airframe/airframe_px4.jpg)
:::