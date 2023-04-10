# 仿真调试

当模拟在主机上运行时，所有桌面开发工具都可用。

## CLANG Address Sanitizer (Mac OS, Linux)

The Clang address sanitizer can help to find alignment (bus) errors and other memory faults like segmentation faults. The command below sets the right compile options. 下面的命令设置了正确的编译选项。

```sh
make clean # 仅需在常规编译后，第一次运行 address sanitizer 时使用
PX4_ASAN=1 make px4_sitl jmavsim
```

## Valgrind

```sh
brew install valgrind
```

或

```sh
sudo apt-get install valgrind
```

SITL can be launched with and without debugger attached and with either jMAVSim or Gazebo as simulation backend. This results in the start options below:

```sh
make px4_sitl_default   # 通过 cmake 配置
make -C build/px4_sitl_default jmavsim___gdb
```

## 开始组合

SITL can be launched with and without debugger attached and with either jMAVSim or Gazebo Classic as simulation backend. 这将生成以下开始选项：

```sh
make px4_sitl_default jmavsim
make px4_sitl_default jmavsim___gdb
make px4_sitl_default jmavsim___lldb

make px4_sitl_default gazebo-classic
make px4_sitl_default gazebo-classic___gdb
make px4_sitl_default gazebo-classic___lldb
```

where the last parameter is the &lt;viewer\_model\_debugger&gt; triplet (using three underscores implies the default 'iris' model). This will start the debugger and launch the SITL application. In order to break into the debugger shell and halt the execution, hit `CTRL-C`: 这将启动调试器并启动 SITL 应用程序。 In order to break into the debugger shell and halt the execution, hit `CTRL-C`:

```sh
Process 16529 stopped
* thread #1: tid = 0x114e6d, 0x00007fff90f4430a libsystem_kernel.dylib`__read_nocancel + 10, name = 'px4', queue = 'com.apple.main-thread', stop reason = signal SIGSTOP
    frame #0: 0x00007fff90f4430a libsystem_kernel.dylib`__read_nocancel + 10
libsystem_kernel.dylib`__read_nocancel:
->  0x7fff90f4430a <+10>: jae    0x7fff90f44314            ; <+20>
    0x7fff90f4430c <+12>: movq   %rax, %rdi
    0x7fff90f4430f <+15>: jmp    0x7fff90f3fc53            ; cerror_nocancel
    0x7fff90f44314 <+20>: retq
(lldb) 
```

In order to not have the DriverFrameworks scheduling interfere with the debugging session `SIGCONT` should be masked in LLDB and GDB:

```bash
(lldb) process handle SIGCONT -n false -p false -s false
```

或者在 GDB 下：

```
(gdb) handle SIGCONT noprint nostop
```

之后，lldb 或 gdb 脚本的行为类似于正常会话，请参阅 ldb/gdbb 文档。

最后一个参数, <viewer\_model\_debugger> 三元组，实际上是传递到生成目录中，因此

```sh
make px4_sitl_default jmavsim___gdb
```

等价于

```sh
make px4_sitl_default   # 通过 cmake 配置
make -C build/px4_sitl_default jmavsim___gdb
```

A full list of the available make targets in the build directory can be obtained with:

```sh
make help
```

It is possible to suppress compiler optimization for given executables and/or modules (as added by cmake with `add_executable` or `add_library`) when configuring for `posix_sitl_*`. This can be handy when it is necessary to step through code with a debugger or print variables that would otherwise be optimized out.

```sh
make list_vmd_make_targets
```

## Attaching GDB to running SITL

You can also start your simulation, and _then_ attach `gdb`:

1. In one terminal screen enter the command to start your simulation:

    ```bash
    make px4_sitl_default gazebo
    ```

    As the script runs, note the **SITL COMMAND:** output text located right above the large "PX4" text. It will list the location of your px4 bin file for later use.

    ```bash
    SITL COMMAND: "<px4 bin file>" "<build dir>"/etc

    ______  __   __    ___ 
    | ___ \ \ \ / /   /   |
    | |_/ /  \ V /   / /| |
    |  __/   /   \  / /_| |
    | |     / /^\ \ \___  |
    \_|     \/   \/     |_/

    px4 starting.

    INFO  [px4] startup script: /bin/sh etc/init.d-posix/rcS 0
    INFO  [init] found model autostart file as SYS_AUTOSTART=10015
    ```
2. Open another terminal and type:

    ```bash
    ps -a
    ```
    You will want to note the PID of the process named "PX4"

    (In this example it is 14149)
    ```bash
    atlas:~/px4/main/PX4-Autopilot$ ps -a
        PID TTY          TIME CMD
    1796 tty2     00:01:59 Xorg
    1836 tty2     00:00:00 gnome-session-b
    14027 pts/1    00:00:00 make
    14077 pts/1    00:00:00 sh
    14078 pts/1    00:00:00 cmake
    14079 pts/1    00:00:00 ninja
    14090 pts/1    00:00:00 sh
    14091 pts/1    00:00:00 bash
    14095 pts/1    00:01:23 gzserver
    14149 pts/1    00:02:48 px4
    14808 pts/2    00:00:00 ps
    ```
3. Then type in the same window

   ```bash
   sudo gdb [px4 bin file path (from step 1) here]
   ```
   would suppress optimization of the targets: platforms*\_posix**px4\_layer, modules**systemlib, modules**uORB, examples**px4\_simple\_app, modules**uORB*\_uORB\_tests and px4.

   ```bash
   sudo gdb /home/atlas/px4/base/PX4-Autopilot/build/px4_sitl_default/bin/px4
   ```

   Now, you can attach to the PX4 instance by entering the PID noted in step 2.

   ```bash
   attach [PID on px4]
   ```

   You should now have a GDB interface to debug with.

## 编译器优化

配置 `posix_sitl_*`时，对可执行文件和/或模块进行优化编译器选项（比如用 cmake 添加`add_executable` 或 `add_library` ），是种可以采取的手段。 当需要使用调试器或打印变量逐步执行代码时，这将非常方便，否则这些变量将被优化。

To do so, set the environment variable `PX4_NO_OPTIMIZATION` to be a semi-colon separated list of regular expressions that match the targets that need to be compiled without optimization. This environment variable is ignored when the configuration isn't `posix_sitl_*`.

would suppress optimization of the targets: platforms*\_posix**px4\_layer, modules**systemlib, modules**uORB, examples**px4\_simple\_app, modules**uORB*\_uORB\_tests and px4.

```sh
export PX4_NO_OPTIMIZATION='px4;^modules__uORB;^modules__systemlib$'
```

The targets that can be matched with these regular expressions can be printed with the command:

可以与这些正则表达式匹配的目标可以用命令打印想出来：

```sh
make -C build/posix_sitl_* list_cmake_targets
```
