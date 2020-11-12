# Poor Man's Sampling Profiler

本节介绍如何通过分析来评估 PX4 系统的性能。

## 方法

PMSP 是一种 shell 脚本,它通过定期中断固件的执行来运行，便对当前堆栈跟踪进行采样。 采样的堆栈跟踪将追加到文本文件中。 一旦采样完成（通常需要大约一个小时或更长时间），收集的堆栈跟踪将 *folded*。 *folding* 的结果是另一个包含相同堆栈跟踪的文本文件，只是所有类似的堆栈跟踪（即在程序中的同一点获得的堆栈跟踪）都连接在一起，并记录其出现次数。 然后将折叠的堆栈输入到可视化脚本中，为此，我们使用了 [FlameGraph--开源堆栈跟踪可视化 ](http://www.brendangregg.com/flamegraphs.html)。

## 基本用法

探查器的基本用法可通过生成系统使用。 例如，下面的命令生成和探查出 px4_fmu-v4pro 目标的10000个样本（提取 *FlameGraph* 并根据需要将其添加到路径中）。

```
make px4_fmu-v4pro_default profile
```

有关对生成过程的更多控制，包括设置样本数，请参阅 [Implementation](#implementation)。

## 理解输出

下面提供了一个示例输出的屏幕截图（请注意，它在这里不是交互式的）：

![FlameGraph 实例](../../assets/debug/flamegraph-example.png)

在火焰图上，水平水平表示堆叠帧，而每个帧的宽度与采样次数成正比。 反过来，函数最终被采样的次数也与其执行的持续时间频率成正比。

## 可能的问题

该脚本是作为一个临时解决方案开发的，因此存在一些问题。 使用时请注意：

* 如果 GDB 出现故障，脚本可能无法检测到该问题，并继续运行。 在这种情况下，显然不会产生可用的堆栈。 为了避免这种情况，用户应定期检查文件 `/tmp/pmpn-gdberr.log`，其中包含最近调用 GDB 的 stderr 输出。 将来，应修改脚本以在安静模式下调用 GDB，在安静模式下，它将通过其退出代码指示问题。

* 有时 GDB 一直运行，同时采样堆栈跟踪。 在此失败期间，目标将无限期停止。 解决方案是手动中止脚本，然后使用 `--append` 选项再次重新启动它。 将来，应修改脚本以对每次 GDB 调用强制执行超时。

* 不支持多线程环境。 这不会影响单个核心嵌入式目标，因为它们总是在一个线程中执行，但这一限制使探查器与许多其他应用程序不兼容。 将来，应修改堆栈文件夹以支持每个示例的多个堆栈跟踪。

<a id="implementation"></a>

## 实现

该脚本位于 `Debug/poor-mans-profiler.sh`。 一旦启动，它将执行指定的时间间隔的样本数。 收集采样会保存在系统临时文件夹的文本文件（典型如`tmp`）。 一旦采样完成，脚本会自动调用栈文件夹，将输出内容保存在 temp 文件夹下的文件中。 如果栈成功收集，脚本会调用 *FlameGraph* 脚本并且将结果保存在 SVG 文件。 请注意，不是所有的镜像工具都支持：推荐使用网页浏览器打开 SVG 文件。

FlameGraph 脚本必须驻留在 `PATH`，否则 PMSP 将拒绝启动。

PMSP 使用 GDB 收集堆栈跟踪。 目前，它使用 `arm-none-eabi-gdb`，今后可能会添加其他工具链。

为了能够映射内存地址到符号，脚本需要被当前运行的文件中提及。 这个是在 `--elf=&lt;file&gt;` 的选项帮助下完成的，该选项需要一个指向当前执行ELF位置的路径来执行（相对于储存库的root）。

用法示例：

```bash
./poor-mans-profiler.sh --elf=build/px4_fmu-v4_default/px4_fmu-v4_default.elf --nsamples=30000
```

请注意，每次启动脚本都会覆盖旧堆栈。 如果你希望在后以前的栈后面追加而不是覆盖的话，使用选项 `--append`：

```bash
./poor-mans-profiler.sh --elf=build/px4_fmu-v4_default/px4_fmu-v4_default.elf --nsamples=30000 --append
```

正如人们可能会怀疑的那样，`--append` 带 `--nsamples=0` 将指示脚本只重新生成 SVG 而根本不访问目标。

请阅读脚本，以更深入地了解其工作原理。

## 鸣谢

该想法的功劳归属 [Mark Callaghan and Domas Mituzas](https://dom.as/2009/02/15/poor-mans-contention-profiling/)。
