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

> **Tip** 在运行期间，你可以在 shell 命令行界面执行 `top` 命令检查哪些模块已经被执行了， 每个模块都可以通过 `<module_name> start/stop` 命令单独进行启动/停止。 虽然 `top` 命令仅针对 NuttX shell，但其他命令是可以在 SITL shell (pxh>) 中使用的。 如果想获取每个模块的详细信息，请参阅 [Modules & Commands Reference](../middleware/modules_main.md) 。

上图中的箭头表示的是各个模块之间 *最重要的* 信息流连接。 实际运行时各模块之间信息流的连接数目比图中展示出来的要多很多，且部分数据（比如：配置参数）会被大部分模块访问。

PX4 系统通过一个名为 [uORB](../middleware/uorb.md) 的 发布-订阅 消息总线实现模块之间的相互通讯。 使用 发布-订阅 消息总线这个方案意味着：

- 系统是 “响应式” 的 — 系统异步运行，新数据抵达时系统立即进行更新。
- 系统所有的活动和通信都是完全并行的。
- 系统组件在任何地方都可以在保证线程安全的情况下使用数据。

> **Info** 这种体系架构使得系统中每一个组件都可以快速、轻松地实现替换，即便系统此时正在运行。

<a id="flight-stack"></a>

### 飞行控制栈

飞行控制栈是针对自主无人机设计的导航、制导和控制算法的集合。 它包括了为固定翼、旋翼和 VTOL 无人机设计的控制器，以及相应的姿态、位置估计器。

The following diagram shows an overview of the building blocks of the flight stack. 下图展示了飞行控制栈的整体架构， 它包含了从传感器数据、 RC 控制量输入 到自主飞行控制（制导控制器，Navigator ），再到电机、舵机控制（执行器，Actuators）的全套通路。

![PX4 顶层飞行控制栈](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg) <!-- This diagram can be updated from 
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

**估计器 （estimator）** 取一个或者多个传感器数据作为输入量，并进行数据融合进而计算出无人机的状态（例如：从 IMU 传感器数据计算得到无人机的姿态角）。

**控制器 （controller）** 组件以一个期望设定值和一个测量值或状态估计量（过程变量）作为输入， 它的目标是将过程变量的实际值调整到与期望设定值相一致， 得到的输出量实现对状态变量的矫正以使其最终抵达期望的设定值。 Its goal is to adjust the value of the process variable such that it matches the setpoint. The output is a correction to eventually reach that setpoint. 以位置控制器为例，该控制器以期望位置作为输入，过程变量是当前位置的估计值，控制器最终输出的是将引导无人机前往期望位置的姿态、油门指令。

**混合器 （mixer）** 响应力的指令（例如右转），并将其转换为单独的电机指令并保证产生的指令不超限。 每一类飞机都有特定的指令转换方式且受许多因素的影响，例如：电机关于重心的安装位置，飞机的惯性矩参数等。

<a id="middleware"></a>

### 中间件

[中间件](../middleware/README.md) 主要包由载嵌入式传感器驱动、与外界的通讯（配套计算机， GCS 等）以及 uORB 发布-订阅 消息总线三部分组成。

此外，中间件还包括一个 [仿真应用层](../simulation/README.md) 以实现在桌面操作系统运行 PX4 飞行代码并在计算机的模拟“世界”中控制由计算机建模得到的无人机。



## 更新速率

由于各模块都需要等待消息的更新，所以通常而言硬件的驱动程序决定着模块的更新速度。 大部分 IMU 驱动以 1kHz 的速率进行采样，以 250Hz 的速率发布传感器数据。 而系统的其它部分，比如说 `制导控制器 （navigator）`， 并不需要这么高的更新速率，因而运行的更新速度要慢的多。

消息的更新速率可以使用 `uorb top` 命令实时 [查看](../middleware/uorb.md#urb-top-command) 。

<a id="runtime-environment"></a>

## 运行时的环境

PX4 可以在提供 POSIX-API 接口的各种操作系统上运行 （比如说 Linux, macOS, NuttX 和 QuRT）。 操作系统应该还具备某种形式的实时调度能力（例如 FIFO ）。

模块间通信 (使用 [uORB](../middleware/uorb.md)) 是基于贡献内存实现的。 整个 PX4 中间件在同一个地址空间内运行，即内存在所有模块之间共享。

> **Info** 整个系统被设计成仅需要很小的工作量就可以实现在单独的地址空间内运行各个模块（需要进行改动的部分主要包括 `uORB`，`parameter interface`，`dataman` 以及 `perf`）。

有 2 种不同的模块执行方式：
- **任务 （Tasks）**: 模块在它自己的任务中运行, 具有自己的堆栈和进程优先级（这是更常见的方法）。
- **Note** 在工作队列中的任务不会显示在 `top` 中（你尽能看见工作队列本身，比如 `lpwork`）。
  - All the tasks must behave co-operatively as they cannot interrupt each other.
  - Multiple *work queue tasks* can run on a queue, and there can be multiple queues.
  - A *work queue task* is scheduled by specifying a fixed time in the future, or via uORB topic update callback.

  The advantage of running modules on a work queue is that it uses less RAM, and potentially results in fewer task switches. The disadvantages are that *work queue tasks* are not allowed to sleep or poll on a message, or do blocking IO (such as reading from a file). Long-running tasks (doing heavy computation) should potentially also run in a separate task or at least a separate work queue.

> **工作队列 （Work queues）**：模块在共享任务上运行, 这意味着它没有自己的堆栈。 Use [`work_queue status`](../middleware/modules_system.md#workqueue) to display all active work queue items.


### 后台任务

`px4_task_spawn_cmd()` 用于启动与父任务独立运行的新任务（NuttX）或者新线程（POSIX - Linux/macOS）：

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

[NuttX](http://nuttx.org/) 是在飞控板上运行 PX4 的首选 RTOS 。 它是一个开源软件（BSD 许可）， 非常轻量化，运行高效且稳定。

各模块以任务（Task）模式运行：他们有各自的文件描述列表，但共用一个地址空间。 单个任务可以使用同一个文件描述列表启动单个或者多个线程。

每一个任务/线程都有一个固定大小的栈堆，并且有一个周期性的任务会定期检查所有栈堆都有足够的可用空间（基于 stack coloring）。


#### Linux/MacOS

在 Linux 或者 macOS 系统上， PX4 在一个单独的进程中运行，各个模块在各自线程中运行（在 NuttX 中任务和线程没有任何区别）。
