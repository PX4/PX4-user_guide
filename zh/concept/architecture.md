---
canonicalUrl: https://docs.px4.io/main/zh/concept/architecture
---

# PX4 系统架构概述

PX4 由两个主要部分组成：一是 [飞行控制栈（flight stack）](#flight-stack) ，该部分主要包括状态估计和飞行控制系统；另一个是 [中间件](#middleware) ，该部分是一个通用的机器人应用层，可支持任意类型的自主机器人，主要负责机器人的内部/外部通讯和硬件整合。

所有的 PX4 支持的 [无人机机型](../airframes/README.md) （包括其他诸如无人船、无人车、无人水下航行器等平台）均共用同一个代码库。 整个系统采用了 [响应式（reactive）](http://www.reactivemanifesto.org) 设计，这意味着：

- 所有的功能都可以被分割成若干可替换、可重复使用的部件。
- 通过异步消息传递进行通信。
- 系统可以应对不同的工作负载。


<a id="architecture"></a>

## 顶层软件架构

下面的架构图对 PX4 的各个积木模块以及各模块之间的联系进行了一个详细的概述。 图的上半部分包括了中间件模块，而下半部分展示的则是飞行控制栈的组件。

![PX4 架构](../../assets/diagrams/PX4_Architecture.svg)


<!-- This diagram can be updated from 
[here](https://drive.google.com/file/d/0B1TDW9ajamYkaGx3R0xGb1NaeU0/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

源代码被拆分为许多相互独立的模块/程序 (图中使用 `monospace` 字体表示)。 通常来说一个图中的积木块对应一个功能模块。

上图中的箭头表示的是各个模块之间 *最重要的* 信息流连接。 实际运行时各模块之间信息流的连接数目比图中展示出来的要多很多，且部分数据（比如：配置参数）会被大部分模块访问。 For more information about each of these modules see the [Modules & Commands Reference](../modules/modules_main.md).
:::

PX4 系统通过一个名为 [uORB](../middleware/uorb.md) 的 发布-订阅 消息总线实现模块之间的相互通讯。 使用 发布-订阅 消息总线这个方案意味着：

飞行控制栈是针对自主无人机设计的导航、制导和控制算法的集合。 它包括了为固定翼、旋翼和 VTOL 无人机设计的控制器，以及相应的姿态、位置估计器。

- 系统是 “响应式” 的 — 系统异步运行，新数据抵达时系统立即进行更新。
- 系统所有的活动和通信都是完全并行的。
- 系统组件在任何地方都可以在保证线程安全的情况下使用数据。

下图展示了飞行控制栈的整体架构， 下图展示了飞行控制栈的整体架构， 它包含了从传感器数据、 RC 控制量输入 到自主飞行控制（制导控制器，Navigator ），再到电机、舵机控制（执行器，Actuators）的全套通路。


### 飞行控制栈

The flight stack is a collection of guidance, navigation and control algorithms for autonomous drones. It includes controllers for fixed-wing, multirotor and VTOL airframes as well as estimators for attitude and position.

The following diagram shows an overview of the building blocks of the flight stack. It contains the full pipeline from sensors, RC input and autonomous flight control (Navigator), down to the motor or servo control (Actuators).

![PX4 High-Level Flight Stack](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg) <!-- This diagram can be updated from 
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

An **estimator** takes one or more sensor inputs, combines them, and computes a vehicle state (for example the attitude from IMU sensor data).

A **controller** is a component that takes a setpoint and a measurement or estimated state (process variable) as input. Its goal is to adjust the value of the process variable such that it matches the setpoint. The output is a correction to eventually reach that setpoint. For example the position controller takes position setpoints as inputs, the process variable is the currently estimated position, and the output is an attitude and thrust setpoint that move the vehicle towards the desired position.

A **mixer** takes force commands (such as "turn right") and translates them into individual motor commands, while ensuring that some limits are not exceeded. This translation is specific for a vehicle type and depends on various factors, such as the motor arrangements with respect to the center of gravity, or the vehicle's rotational inertia.


<a id="middleware"></a>

### 中间件

The [middleware](../middleware/README.md) consists primarily of device drivers for embedded sensors, communication with the external world (companion computer, GCS, etc.) and the uORB publish-subscribe message bus.

消息的更新速率可以使用 `uorb top` 命令实时 [查看](../middleware/uorb.md#urb-top-command) 。


## 更新速率

PX4 可以在提供 POSIX-API 接口的各种操作系统上运行 （比如说 Linux, macOS, NuttX 和 QuRT）。 操作系统应该还具备某种形式的实时调度能力（例如 FIFO ）。 Other parts of the system, such as the `navigator`, don't need such a high update rate, and thus run considerably slower.

The message update rates can be [inspected](../middleware/uorb.md) in real-time on the system by running `uorb top`.

<a id="runtime-environment"></a>

## 运行时的环境

PX4 runs on various operating systems that provide a POSIX-API (such as Linux, macOS, NuttX or QuRT). It should also have some form of real-time scheduling (e.g. FIFO).

The inter-module communication (using [uORB](../middleware/uorb.md)) is based on shared memory. The whole PX4 middleware runs in a single address space, i.e. memory is shared between all modules.

[NuttX](http://nuttx.org/) 是在飞控板上运行 PX4 的首选 RTOS 。 它是一个开源软件（BSD 许可）， 非常轻量化，运行高效且稳定。

There are 2 different ways that a module can be executed:
- **任务 （Tasks）**: 模块在它自己的任务中运行, 具有自己的堆栈和进程优先级（这是更常见的方法）。
- **Note** 在工作队列中的任务不会显示在 `top` 中（你尽能看见工作队列本身，比如 `lpwork`）。
  - All the tasks must behave co-operatively as they cannot interrupt each other.
  - Multiple *work queue tasks* can run on a queue, and there can be multiple queues.
  - A *work queue task* is scheduled by specifying a fixed time in the future, or via uORB topic update callback.

  The advantage of running modules on a work queue is that it uses less RAM, and potentially results in fewer task switches. The disadvantages are that *work queue tasks* are not allowed to sleep or poll on a message, or do blocking IO (such as reading from a file). Long-running tasks (doing heavy computation) should potentially also run in a separate task or at least a separate work queue.

:::note
Tasks running on a work queue do not show up in [`top`](../modules/modules_command.md#top) (only the work queues themselves can be seen - e.g. as `wq:lp_default`). Use [`work_queue status`](../modules/modules_system.md#work-queue) to display all active work queue items.
:::

### 后台任务

在 Linux 或者 macOS 系统上， PX4 在一个单独的进程中运行，各个模块在各自线程中运行（在 NuttX 中任务和线程没有任何区别）。

```cpp
independent_task = px4_task_spawn_cmd(
    "commander",                    // 进程名称
    SCHED_DEFAULT,                  // 调度类型（RR 或 FIFO）
    SCHED_PRIORITY_DEFAULT + 40,    // 调度优先级
    3600,                           // 新任务或线程的堆栈大小
    commander_thread_main,          // 任务（或线程的主函数）
    (char * const *)&argv[0]        // Void 指针传递到新任务
                                    // （这里是命令行参数）
    );
    );
```


### 操作系统相关的信息

#### NuttX

[NuttX](https://nuttx.apache.org//) is the primary RTOS for running PX4 on a flight-control board. It is open source (BSD license), light-weight, efficient and very stable.

Modules are executed as tasks: they have their own file descriptor lists, but they share a single address space. A task can still start one or more threads that share the file descriptor list.

Each task/thread has a fixed-size stack, and there is a periodic task which checks that all stacks have enough free space left (based on stack coloring).


#### Linux/MacOS

On Linux or macOS, PX4 runs in a single process, and the modules run in their own threads (there is no distinction between tasks and threads as on NuttX).
