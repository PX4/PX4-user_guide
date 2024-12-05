# Vehicle Types & Setup

PX4支持多种类型的载具，包括多种型机、飞机、VTOL车辆、地面车辆等。

本节解释如何对每种类型进行组装、配置和调整 PX4 基础自动化系统 (这种设置的大部分是所有类型的常见的)。

:::info
[Basic Concepts > Drone Types](../getting_started/px4_basic_concepts.md#drone-types) provides high level information about the types of vehicles and the use cases for which they are best suited.
:::

## 支持载具：

有维护者且经过良好测试和支持的框架类型是：

- [Multicopters](../frames_multicopter/index.md) (tri-, quad-, hexa-, octa-, and even [omnicopter](../frames_multicopter/omnicopter.md) vehicles)
- [Planes (Fixed-Wing)](../frames_plane/index.md)
- [VTOL](../frames_vtol/index.md): [Standard VTOL](../frames_vtol/standardvtol.md), [Tailsitter VTOL](../frames_vtol/tailsitter.md), [Tiltrotor VTOL](../frames_vtol/tiltrotor.md)

## Experimental Vehicles

试验性框架是指下列类型的运载工具：

- 没有维护者。
- 核心开发小组没有定期进行测试。
- 可能无法在 CI中测试。
- 可能缺乏生产所需的功能。
- 也许不支持某些通用载具配置。

以下载具类型被认为是试验性的：

- [Airships](../frames_airship/index.md)
- [Autogyros](../frames_autogyro/index.md)
- [Balloons](../frames_balloon/index.md)
- [Helicopter](../frames_helicopter/index.md)
- [Rovers](../frames_rover/index.md)
- [Submarines](../frames_sub/index.md)

:::info
Maintainer volunteers, [contribution](../contribute/index.md) of new features, new frame configurations, or other improvements would all be very welcome!
:::

## 其他载具

The complete set of supported vehicle types and their configurations can be found in the [Airframes Reference](../airframes/airframe_reference.md).
