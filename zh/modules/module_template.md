---
canonicalUrl: https://docs.px4.io/main/zh/modules/module_template
---

# 适用于开发完整应用的模版

一个应用程序可以写作一个 *任务* (一个有自己的堆栈和处理优先级的模块)或作为 *工作队列任务* (一个运行在工作队列线程上的模块, 与工作队列上的其他任务分享堆栈和线程优先级)。 在大多数情况下，可以使用工作队列任务，因为这会减少资源的使用。

:::note
[架构概述 > 运行环境](../concept/architecture.md#runtime-environment) 提供更多关于任务和工作队列任务的信息。
:::

:::note
[第一个应用程序教程](../modules/hello_sky.md) 中所学到的所有东西都与编写完整应用程序有关。
:::

## 工作队列任务

PX4-Autopilot contains a template for writing a new application (module) that runs as a *work queue task*: [src/examples/work_item](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/examples/work_item).

工作队列任务应用程序与普通(任务)应用程序相同。 除了它需要指定它是一个工作队列任务，并在初始化期间运行调度它本身。

示例显示了如何操作。 总结：
1. Specify the dependency on the work queue library in the cmake definition file ([CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/examples/work_item/CMakeLists.txt)):
   ```
   ...
   DEPENDS
      px4_work_queue
   ```
1. In addition to `ModuleBase`, the task should also derive from `ScheduledWorkItem` (included from [ScheduledWorkItem.hpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/platforms/common/include/px4_platform_common/px4_work_queue/ScheduledWorkItem.hpp))
1. 在构造函数初始化中指定要添加任务的队列。 The [work_item](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/examples/work_item/WorkItemExample.cpp#L42) example adds itself to the `wq_configurations::test1` work queue as shown below:
   ```cpp
   WorkItemExample::WorkItemExample() :
       ModuleParams(nullptr),
       ScheduledWorkItem(MODULE_NAME, px4::wq_configurations::test1)
   {
   }
   ```

:::note
The available work queues (`wq_configurations`) are listed in [WorkQueueManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/platforms/common/include/px4_platform_common/px4_work_queue/WorkQueueManager.hpp#L49).
:::

1. 实现 `ScheduledWorkitem:::Run()` 方法来执行"work"。
1. 实现`task_spawn` 方法，指定任务是一个工作队列(使用 `task_id_is_work_queue` id)。
1. 使用其中一种调度方法使工作队列任务开始调度(本例中我们在使用`init` 方法中使用 `ScheduleOnInterval` )。



## 任务

PX4/PX4-Autopilot contains a template for writing a new application (module) that runs as a task on its own stack: [src/templates/template_module](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/templates/template_module).

该模板演示了完整应用程序所需或有用的以下附加功能/方面：

- 访问参数并对参数更新做出反应。
- 订阅、等待 topic 更新。
- 通过 `start`/`stop`/`status` 控制后台运行的任务。 `module start [<arguments>]` 命令可以直接加入 [启动脚本](../concept/system_startup.md) 中。
- 命令行参数解析。
- 文档记录：`PRINT_MODULE_*` 方法有两个用处（该 API 在 [源代码](https://github.com/PX4/Firmware/blob/v1.8.0/src/platforms/px4_module.h#L381) 中有详细记录）：
  - 它们可用于在控制台键入 `module help` 指令后输出命令行指令的用法。
  - 通过脚本自动提取他们来生成 [模块 & 命令参考](../modules/modules_main.md) 页面。

