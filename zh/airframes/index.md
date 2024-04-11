# 载具类型 & 设置

PX4支持多种类型的载具，包括多种型机、飞机、VTOL车辆、地面车辆等。

本节解释如何对每种类型进行组装、配置和调整 PX4 基础自动化系统 (这种设置的大部分是所有类型的常见的)。

::: info [Basic Concepts > Drone Types](../getting_started/px4_basic_concepts.md#drone-types) provides high level information about the types of vehicles and the use cases for which they are best suited. :::

## 支持载具：

有维护者且经过良好测试和支持的框架类型是：

- [多轴飞行器](../frames_multicopter/README.md) (三-, 四, 六, 八, 甚至 [全向](../frames_multicopter/omnicopter.md) 飞行器)
- [飞机(固定翼)](../frames_plane/index.md)
- [垂直起降](../frames_vtol/README.md): [标准VTOL](../frames_vtol/standardvtol.md), [垂尾式VTOL](../frames_vtol/tailsitter.md), [倾转旋翼VTOL](../frames_vtol/tiltrotor.md)

## 实验载具

试验性框架是指下列类型的运载工具：

- 没有维护者。
- 核心开发小组没有定期进行测试。
- 可能无法在 CI中测试。
- 可能缺乏生产所需的功能。
- 也许不支持某些通用载具配置。

以下载具类型被认为是试验性的：

- [飞艇](../frames_airship/index.md)
- [旋翼机](../frames_autogyro/index.md)
- [气球](../frames_balloon/index.md)
- [直升机](../frames_helicopter/index.md)
- [无人车](../frames_rover/index.md)
- [潜艇](../frames_sub/index.md)

:::笔记 非常受欢迎维护者、志愿者， [贡献](../contribute/README.md) 新功能、新框架配置或其他改进！ :::

## 其他载具

全部可支持的机型可见 [机型参考](../airframes/airframe_reference.md)。
