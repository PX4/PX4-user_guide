---
canonicalUrl: https://docs.px4.io/main/zh/development/development
---

# PX4 开发

本章节讲述了如何支持新的无人机/无人车类型及变种，如何修改飞行算法，如何添加新的飞行模式，如何集成新的硬件，如何通过外部飞控和PX4通信。

::: 提示 本节适用于软件开发者和 (新) 硬件集成商。 如果要构建现有的机身或者PX4已有的，可以跳过此章节。
:::

It explains how to:

* 了解到 [配置最小开发环境](../dev_setup/config_initial.md)，[用源码编译PX4](../dev_setup/building_px4.md) 以及部署到 [众多支持的自动驾驶仪](../flight_controller/README.md)。
* 理解 [PX4 系统架构](../concept/architecture.md) 以及核心概念。
* 学习如何更改飞行栈及中间层：
  - 更改飞行算法和添加新的 [飞行模式](../concept/flight_modes.md)。
  - 支持新的 [机型](../dev_airframes/README.md)。
* 学习如何将PX4集成到新的硬件上：
  - 支持新的传感器和执行器, 包括摄像头、测距仪等。
  - 修改PX4使之能够在新的自驾仪硬件上运行。
* 对 PX4 进行 [仿真](../simulation/README.md)、[测试](../test_and_ci/README.md) 和 [调试/查看日志](../debug/README.md)。
* 与外部机器人的 API 进行联调通信/集成。


## Key Developer Links

- [Support](../contribute/support.md): Get help using the [discussion boards](https://discuss.px4.io//) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/README.md): How to work with our [source code](../contribute/code.md).
