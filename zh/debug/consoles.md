---
canonicalUrl: https://docs.px4.io/main/zh/debug/consoles
---

# PX4 控制台/Shell

用户可以通过 [MAVLink Shell](../debug/mavlink_shell.md) 和 [系统控制台](../debug/system_console.md) 访问 PX4 终端。

这里将说明它们的主要区别，以及如何使用。

<a id="console_vs_shell"></a>

## System Console vs. Shells

PX4_系统控制台_提供对底层访问的能力，输出调试信息和分析系统启动过程分析。

只有一个_系统控制台_，它运行在特定的UART上（调试端口，如Nuttx中配置），并且通常通过FTDI电缆（或者其他的一些调试器，如[Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)）连接到计算机。

- 使用_底层陶氏/开发_：bootup，NuttX，启动脚本，飞控板启动，PX4核心部分的开发（例如uORB）。
- 更具体一点，这里是包括自启动的用户应用在内的整个PX4系统下所有启动过程唯一的输出位置。

Shell 提供对系统的上层访问能力：

- 用于执行基础的模块调试运行命令。
- 只_直接_显示你启动的模块输出。
- 无法_直接_显示运行在工作队列上的任务输出。
- 在 PX4 系统无法启动时无助于调试（它并没有运行）。

支持来自串口或 MAVLink 的多个shell同时运行。 由于 MAVLink 能提供更加灵活的使用方式，所以目前只使用了 [MAVLink Shell](../debug/mavlink_shell.md) 。
:::

[系统控制台（System Console）](../debug/system_console.md)在调试系统无法启动时十分必要，它会在飞控板上电后输出启动日志。 但是 [MAVLink Shell](../debug/mavlink_shell.md) 则更加易于配置使用，因此通常都推荐用它调试。

The [System Console](../debug/system_console.md) is essential when the system does not boot (it displays the system boot log when power-cycling the board). The [MAVLink Shell](../debug/mavlink_shell.md) is much easier to setup, and so is more generally recommended for most debugging.

<a id="using_the_console"></a>

## 使用控制台/Shell

举例来说，可以输入 `ls` 查看本地文件系统；输入 `free` 查看剩余可用RAM；输入 `dmesg` 查看启动日志。

其它更多的系统命令与模块被列举在 [模块和命令参考](../middleware/modules_main.md) 中。（比如 `top`、`listener` 等）

```bash
nsh> ls
nsh> free
nsh> dmesg
```

瞎main是一些可以在[NuttShell](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410)中使用的命令来深入了解系统。

此 NSH 命令提供剩余的可用内存：

```bash
free
```

top命令显示每个应用成虚使用的堆栈情况：

```
top
```

注意堆栈使用量是通过堆栈着色计算的，并且是任务开始以来的最大值（不是当前使用量）。

要查看工作队列的运行抢空以及运行速度，使用：

```
work_queue status
```

调试 uORB 主题：

```
uorb top
```

检查特定的 uORB 主题：

```
listener <topic_name>
```

Many other system commands and modules are listed in the [Modules and Command Reference](../modules/modules_main.md) (e.g. `top`, `listener`, etc.).

:::tip
Some commands may be disabled on some boards (i.e. the some modules are not included in firmware for boards with RAM or FLASH constraints). In this case you will see the response: `command not found`
:::
