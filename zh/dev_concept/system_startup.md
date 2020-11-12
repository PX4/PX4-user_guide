# 系统启动

PX4 系统的启动由 shell 脚本文件控制。 在 NuttX 平台上这些脚本文件位于 [ROMFS/px4fmu_common/init.d](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common/init.d) 文件夹下 - 该文件夹下的部分脚本文件也适用于 Posix (Linux/MacOS) 平台。 仅适用于 Posix 平台的启动脚本文件可以在 [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/Firmware/tree/master/ROMFS/px4fmu_common/init.d-posix) 文件夹下找到。

上述文件夹中以数字和下划线为文件名开头的脚本文件（例如，`10000_airplane`）都是封装好的机架构型配置文件。 这些文件在编译时会被导出至 `airframes.xml` 文件中，[QGroundControl](http://qgroundcontrol.com) 通过解析该 xml 文件得到可以在 UI 界面上进行选择的机架构型。 如何添加一个新的配置请参阅 [这里](../airframes/adding_a_new_frame.md)。

其它的文件则是系统常规启动逻辑的一部分。 在启动过程中第一个被系统执行的脚本文件是 [init.d/rcS](https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/init.d/rcS) （Posix 平台则为 [init.d-posix/rcS](https://github.com/PX4/Firmware/blob/master/ROMFS/px4fmu_common/init.d-posix/rcS) on Posix)），该脚本会调用所有的其它脚本。

根据 PX4 运行的操作系统将本文后续内容分成了如下各小节。


## Posix (Linux/MacOS)

在 Posix 操作系统上，系统的 shell 将会作为脚本文件的解释器（例如， 在 Ubuntu 中 /bin/sh 与 Dash 建立了符号链接）。 为了使 PX4 可以在 Posix 中正常运行，需要做到以下几点：
- PX4 的各个模块需要看起来像系统的单个可执行文件， 这一点可以通过创建符号链接坐到。 This is done via symbolic links. 每一个模块都根据命名规则： `px4-<module> -> px4` 在编译文件夹 `bin` 下创建了相应的符号链接。 在执行命令时，系统将检查命令的二进制路径 (`argv[0]`)，如果系统发现该命令是 PX4 的一个模块（命令名称以 `px4-` 起头），那么系统将会把这个命令发送给 PX4 主实例（见下文）。

  > > **Tip** 使用 `px4-` 这个前缀是为了避免 PX4 的命令名称与操作系统的命令名称相冲突（例如，`shutdown` 命令），同时此举也方便了在输入 `px4-<TAB>` 之后使用 tab 进行命令的自动填充。
- Shell 需要知道在那里可以找到上述符号链接。 为此，在运行启动脚本前会将包含符号链接文件的 `bin` 目录添加至操作系统的 `PATH` 环境变量中。
- The shell starts each module as a new (client) process. Shell 将每个模块作为一个新的 (客户端) 进程进行启动， 每个客户端进程都需要与 PX4 主实例（服务器）进行通讯，在该实例中实际的模块以线程的形式运行。 该过程通过 [UNIX socket](http://man7.org/linux/man-pages/man7/unix.7.html) 完成实现。 服务器侦听一个 socket，然后客户端将连接该 socket 并通过它发送指令。 服务器收到客户端的指令后将指令运行的输出结果及返回代码重新发送给客户端。
- 启动脚本直接调用各模块，例如 `commander start`, 而不使用 `px4-` 这个前缀。 这一点可以通过设置别名（aliase）来实现：`bin/px4-alias.sh` 文件会给每一个模块以 `alias <module>=px4-<module>` 的形式设置好模块的别名。
- `rcS` 脚本由 PX4 主实例调用执行。 该脚本并不开启任何模块，它仅仅首先更新 `PATH` 环境变量然后以 `rcS` 文件作为值参数开启操作系统的 shell 。
- 除此之外，在进行多飞行器仿真时还可以启动多个服务器实例。 客户端可通过 `--instance` 选择服务器实例。 该实例可通过 `$px4_instance` 变量在脚本中使用。

当 PX4 在操作系统上处于运行状态时可以从任意终端直接运行各个模块。 例如：
```
cd <Firmware>/build/px4_sitl_default/bin
./px4-commander takeoff
./px4-listener sensor_accel
```

### 调试系统的启动过程

Normally, all modules are compiled into a single PX4 executable. However, on Posix, there's the option of compiling a module into a separate file, which can be loaded into PX4 using the `dyn` command.
```
dyn ./test.px4mod
```

## NuttX
软件组件的失效可以不中止 PX4 系统的启动， 这一特性可以在启动脚本中使用 `set +e` 来实现。

### 替换系统的启动文件

A failure of a driver of software component will not lead to an aborted boot. This is controlled via `set +e` in the startup script.

连接至 [系统控制台（system console）](../debug/system_console.md) 后重启飞控板可以进行对系统启动引导序列进行调试。 由此生成的启动引导日志文件中包含了引导序列的详细信息，同时也应包含了解释启动中止的线索。

#### 启动失败的常见原因

  * 对于自定义的应用程序：系统用尽了 RAM 资源。 运行 `free` 命令以查看可用 RAM 的大小。
  * 引发堆栈跟踪的软件故障或者断言。

### 自定义系统的启动文件

在大多数情况下自定义默认启动项是更好的做法，实现方法见下文。 如果需要替换整个引导文件，请创建文件： `/fs/microsd/etc/rc.txt` ，该文件位于 microSD 卡的根目录下的 `etc` 文件夹下。 如果此文件存在，系统中的任何内容都不会自动启动。

### Customizing the System Startup

自定义系统启动的最佳方法是引入 [新的机架配置](../airframes/adding_a_new_frame.md) 。 如果只需要一些小的调整（比如多启动一个应用程序，或只是启用一个不同的混控器)，那么你可以在启动过程中使用特殊的钩子（hook）来达成目的。

> **Caution** 系统的启动文件是 UNIX 系统文件，该文件要求以 UNIX 规范的 LF 作为行结束符。 在 Windows 平台上编辑系统的启动文件应该使用一个合适的文本编辑器。

There are three main hooks. 主要有三类钩子（hook）， 需要注意的是 microsd 的根目录是挂载在操作系统中的 `/fs/microsd` 目录下的。

  * /fs/microsd/etc/config.txt
  * /fs/microsd/etc/extras.txt
  * /fs/microsd/etc/mixers/NAME_OF_MIXER

#### 自定义配置（config.txt）

`config.txt` 文件可用于修改 shell 变量。 该文件会在主系统完成配置后、 进行启动*前*进行加载。

#### 启动额外的应用

`extras.txt` 可用于在主系统启动后启动额外的应用程序。 通常这些额外应用程序可以载荷控制器或类似的可选自定义组件。

> **Caution**在系统启动文件中调用未知命令可能会导致系统引导失败。 通常情况下系统在引导失败后不会发送 mavlink 消息，所以在这种情况下请检查系统在控制台上输出的的错误消息。

下面的示例演示了如何启动自定义应用程序:
  * 在 SD 卡上创建一个文件 `etc/extras.txt` ，该文件应包含如下内容： `custom_app start`
    ```
    custom_app start
    ```
  * 搭配使用 `set +e` 和 `set -e` 可以将命令设置为可选命令：
    ```
    set +e
  optional_app start      # 即便 optional_app 未知或者失效也不会导致系统启动失败
  set -e

  mandatory_app start     # 如果 mandatory_app 未知或者失效则会导致系统启动中断
    ```

#### 启动自定义的混控器

默认情况下系统将从 `/etc/mixers` 文件夹下载入混控器。 如果在 `/fs/microsd/etc/mixers` 文件夹下存在一个同名文件，则后者将会替代默认的混控器被系统载入。 这就使得我们可以在不重新编译固件的情况下对混控器文件进行自定义修改。

##### 示例

下面的示例演示了如何添加一个辅助（AUX）混控器：
  * 在 SD 卡中创建文件 `etc/mixers/gimbal.aux.mix` ，并将你的混控器设定内容写入该文件内。
  * 为了使用该混控器，再创建一个额外的文件 `etc/config.txt` ，该文件的内容如下： set MIXER_AUX gimbal set PWM_AUX_OUT 1234 set PWM_AUX_DISARMED 1500 set PWM_AUX_MIN 1000 set PWM_AUX_MAX 2000 set PWM_AUX_RATE 50
    ```
    set MIXER_AUX gimbal
    set PWM_AUX_OUT 1234
    set PWM_AUX_DISARMED 1500
    set PWM_AUX_MIN 1000
    set PWM_AUX_MAX 2000
    set PWM_AUX_RATE 50
    ```
