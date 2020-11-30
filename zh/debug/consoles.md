# PX4 控制台/Shell

用户可以通过 [MAVLink Shell](../debug/mavlink_shell.md) 和 [系统控制台](../debug/system_console.md) 访问 PX4 终端。

这里将说明它们的主要区别，以及如何使用。

<a id="console_vs_shell"></a>

## System Console vs. Shells

PX4 系统控制台*（System Console）*提供对系统的底层访问能力，获得调试信息，也可用于分析PX4的启动过程。

PX4 只有一个 *系统控制台* 。它运行在特定的串口上（由Nuttx配置为调试口），通常可以通过FTDI线或其他调试适配器连接至电脑，比如 [Dronecode probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)。
- 用于 *底层开发调试*，例如：系统启动过程、Nuttx、启动脚本、飞控板启动，以及 PX4 中一些特定组件的开发，比如uORB。
- 更具体一点，这里是包括自启动的用户应用在内的整个PX4系统下所有启动过程唯一的输出位置。

Shell 提供对系统的上层访问能力：
- 用于执行基础的模块调试运行命令。
- 只会*直接*得到你启动的模块的输出信息。
- 不能*直接*得到运行在任务队列上的其它输出信息。
- 在 PX4 系统无法启动时无助于调试（它并没有运行）。

> **Note** `dmesg` 命令现在在某些飞控板上被支持，可以使 MAVLink Shell 能够进行更底层的调试。 例如，执行 `dmesg -f &` 命令将会得到其它后台任务的输出信息。

支持来自串口或 MAVLink 的多个shell同时运行。 由于 MAVLink 能提供更加灵活的使用方式，所以目前只使用了 [MAVLink Shell](../debug/mavlink_shell.md) 。

[系统控制台（System Console）](../debug/system_console.md)在调试系统无法启动时十分必要，它会在飞控板上电后输出启动日志。 但是 [MAVLink Shell](../debug/mavlink_shell.md) 则更加易于配置使用，因此通常都推荐用它调试。

<a id="using_the_console"></a>

## 使用控制台/Shell

MAVLink shell/控制台和[系统控制台](../debug/system_console.md)使用方法基本一致。

举例来说，可以输入 `ls` 查看本地文件系统；输入 `free` 查看剩余可用RAM；输入 `dmesg` 查看启动日志。

```bash
nsh> ls
nsh> free
nsh> dmesg
```

其它更多的系统命令与模块被列举在 [模块和命令参考](../middleware/modules_main.md) 中。（比如 `top`、`listener` 等）

> **Tip** 部分飞控板禁用了一些命令。（RAM或FLASH受限的飞控板不含某些模块） 这时你将会得到 `command not found` 提示。
