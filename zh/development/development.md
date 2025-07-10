---
canonicalUrl: https://docs.px4.io/main/zh/development/development
---

# PX4 开发

本章节讲述了如何支持新的无人机/无人车类型及变种，如何修改飞行算法，如何添加新的飞行模式，如何集成新的硬件，如何通过外部飞控和PX4通信。

::: 提示
本节适用于软件开发者和(新)硬件集成商。
如果要构建现有的机身或者PX4已有的，可以跳过此章节。
:::

它解释了如何：

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


## 开发者可用的关键链接

- [支持](../contribute/support.md): 使用 [讨论板](https://discuss.px4.io//) 和其他支持渠道获得帮助。
- [每周Dev 呼叫](../contribute/dev_call.md): 一个很好的机会来与PX4 dev 团队讨论平台技术细节(包括拉取请求)。 主要、问题、通用 Q&A。
- [许可证](../contribute/licenses.md): 你可以做什么代码(自由使用和修改允许的条件 [BSD 3条款许可证](https://opensource.org/licenses/BSD-3-Clause)!)
- [贡献](../contribute/README.md): 如何使用我们的 [源代码](../contribute/code.md)。
