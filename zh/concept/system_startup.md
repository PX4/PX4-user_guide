# 系统启动

PX4 系统的启动由 shell 脚本文件控制。 On NuttX they reside in the [ROMFS/px4fmu_common/init.d](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d) folder - some of these are also used on Posix (Linux/MacOS). The scripts that are only used on Posix are located in [ROMFS/px4fmu_common/init.d-posix](https://github.com/PX4/PX4-Autopilot/tree/main/ROMFS/px4fmu_common/init.d-posix).

上述文件夹中以数字和下划线为文件名开头的脚本文件（例如，`10000_airplane`）都是封装好的机架构型配置文件。 这些文件在编译时会被导出至 `airframes.xml` 文件中，[QGroundControl](http://qgroundcontrol.com) 通过解析该 xml 文件得到可以在 UI 界面上进行选择的机架构型。 如何添加一个新的配置请参阅 [这里](../airframes/adding_a_new_frame.md)。

其它的文件则是系统常规启动逻辑的一部分。 The first executed file is the [init.d/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d/rcS) script (or [init.d-posix/rcS](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/rcS) on Posix), which calls all other scripts.

根据 PX4 运行的操作系统将本文后续内容分成了如下各小节。


## Posix (Linux/MacOS)

在 Posix 操作系统上，系统的 shell 将会作为脚本文件的解释器（例如， 在 Ubuntu 中 /bin/sh 与 Dash 建立了符号链接）。 为了使 PX4 可以在 Posix 中正常运行，需要做到以下几点：
- PX4 的各个模块需要看起来像系统的单个可执行文件， 这一点可以通过创建符号链接坐到。 这一点可以通过创建符号链接坐到。 每一个模块都根据命名规则： `px4-<module> -> px4` 在编译文件夹 `bin` 下创建了相应的符号链接。 在执行命令时，系统将检查命令的二进制路径 (`argv[0]`)，如果系统发现该命令是 PX4 的一个模块（命令名称以 `px4-` 起头），那么系统将会把这个命令发送给 PX4 主实例（见下文）。

:::tip
The `px4-` prefix is used to avoid conflicts with system commands (e.g. `shutdown`), and it also allows for simple tab completion by typing `px4-<TAB>`. 这就使得我们可以在不重新编译固件的情况下对混控器文件进行自定义修改。
- Shell 需要知道在那里可以找到上述符号链接。 为此，在运行启动脚本前会将包含符号链接文件的 `bin` 目录添加至操作系统的 `PATH` 环境变量中。
- Shell 将每个模块作为一个新的 (客户端) 进程进行启动， Shell 将每个模块作为一个新的 (客户端) 进程进行启动， 每个客户端进程都需要与 PX4 主实例（服务器）进行通讯，在该实例中实际的模块以线程的形式运行。 该过程通过 [UNIX socket](http://man7.org/linux/man-pages/man7/unix.7.html) 完成实现。 服务器侦听一个 socket，然后客户端将连接该 socket 并通过它发送指令。 服务器收到客户端的指令后将指令运行的输出结果及返回代码重新发送给客户端。
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

通常，所有模块都被编入一个 PX4 可执行程序。 然而，在Posix上，可以将模块编译成单独的文件，可以使用 `dyn` 命令加载到 PX4。
```
dyn ./test.px4mod
```

## NuttX

软件组件的失效可以不中止 PX4 系统的启动， 这一特性可以在启动脚本中使用 `set +e` 来实现。

### 替换系统的启动文件

软件组件的失效不会中止 PX4 系统的启动， 可以在启动脚本中使用 `set +e` 来控制。

连接至 [系统控制台（system console）](../debug/system_console.md) 后重启飞控板可以进行对系统启动引导序列进行调试。 由此生成的启动引导日志文件中包含了引导序列的详细信息，同时也应包含了解释启动中止的线索。

#### 启动失败的常见原因

- 对于自定义的应用程序：系统用尽了 RAM 资源。 运行 `free` 命令以查看可用 RAM 的大小。
- 引发堆栈跟踪的软件故障或者断言。

### 自定义系统的启动文件

The whole boot can be replaced by creating a file `/etc/rc.txt` on the microSD card with a new configuration (nothing in the old configuration will be auto-started, and if the file is empty, nothing at all will be started).

Customizing the default boot is almost always a better approach. This is documented below.

### 自定义系统的启动文件

The best way to customize the system startup is to introduce a [new frame configuration](../dev_airframes/adding_a_new_frame.md). The frame configuration file can be included in the firmware or on an SD Card.

If you only need to "tweak" the existing configuration, such as starting one more application or setting the value of a few parameters, you can specify these by creating two files in the `/etc/` directory of the SD Card:

- [/etc/config.txt](#customizing-the-configuration-config-txt): modify parameter values
- [/etc/extras.txt](#starting-additional-applications-extras-txt): start applications

The files are described below.

主要有三类钩子。 主要有三类钩子（hook）， 需要注意的是 microsd 的根目录是挂载在操作系统中的 `/fs/microsd` 目录下的。 这就使得我们可以在不重新编译固件的情况下对混控器文件进行自定义修改。

:::note
These files are referenced in PX4 code as `/fs/microsd/etc/config.txt` and `/fs/microsd/etc/extras.txt`, where the root folder of the microsd card is identified by the path `/fs/microsd`. 这就使得我们可以在不重新编译固件的情况下对混控器文件进行自定义修改。

#### 自定义配置（config.txt）

The `config.txt` file can be used to modify parameters. 通常这些额外应用程序可以载荷控制器或类似的可选自定义组件。

For example, you could create a file on the SD card, `etc/config.txt` with that sets parameter values as shown:

```
param set-default PWM_MAIN_DIS3 1000
param set-default PWM_MAIN_MIN3 1120
```

#### Starting Additional Applications (extras.txt)

The `extras.txt` can be used to start additional applications after the main system boot. Typically these would be payload controllers or similar optional custom components.

默认情况下系统将从 `/etc/mixers` 文件夹下载入混控器。 如果在 `/fs/microsd/etc/mixers` 文件夹下存在一个同名文件，则后者将会替代默认的混控器被系统载入。 这就使得我们可以在不重新编译固件的情况下对混控器文件进行自定义修改。

下面的示例演示了如何添加一个辅助（AUX）混控器：
- 在 SD 卡上创建一个文件 `etc/extras.txt` ，该文件应包含如下内容： `custom_app start`
  ```
  custom_app start
  ```
- 搭配使用 `set +e` 和 `set -e` 可以将命令设置为可选命令：

  ```
  set +e
  optional_app start      # Will not result in boot failure if optional_app is unknown or fails
  set -e

  mandatory_app start     # Will abort boot if mandatory_app is unknown or fails
  ```
