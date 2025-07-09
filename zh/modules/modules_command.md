---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_command
---

# 模块参考：命令（Command）

## actuator_test
Source: [systemcmds/actuator_test](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/actuator_test)


用于测试执行器的实用程序

警告：在使用此命令之前移除所有螺旋桨。

<a id="actuator_test_usage"></a>

### 用法
```
actuator_test <command> [arguments...]
 Commands:
   set           将一个执行器设置为一个指定的输出值

 执行器可以是一个指定的电机、舵机或者 function directly:
     [-m <val>]  被测试的电机 (1...8)
     [-s <val>]  被测试的舵机 (1...8)
     [-f <val>]  Specify function directly
     -v <val>    值(-1...1)
     [-t <val>]  以秒为单位的超时时间 (如果没有设置则为交互式运行)
                 默认: 0

   iterate-motors 使所有电机依次开始和停止

   iterate-servos 使所有舵机依次开始和停止
```
## bl_update
Source: [systemcmds/bl_update](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/bl_update)

用于从文件刷新引导加载程序的实用程序
<a id="bl_update_usage"></a>

### 用法
```
bl_update [arguments...]
   setopt        设置选项比特来解锁 FLASH (只有在锁定状态下需要）

   <file>        Bootloader bin 文件                
```
## bsondump
Source: [systemcmds/bsondump](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/bsondump)

read BSON from a file and print in human form
<a id="bsondump_usage"></a>

### 用法
```
bsondump [arguments...]
     <file>      File name
```
## dumpfile
Source: [systemcmds/dumpfile](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/dumpfile)

转储文件实用程序。 以二进制模式（不要用 CR LF 替换 LF）将文件大小和内容打印到标准输出。
<a id="dumpfile_usage"></a>

### 用法
```
dumpfile [arguments...]
     <file>      被转储的文件
```
## dyn
Source: [systemcmds/dyn](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/dyn)


### 描述
加载并运行一个没有被编译进 PX4 的二进制文件的动态 PX4 模块

### 示例
```
dyn ./hello.px4mod start
```


<a id="dyn_usage"></a>

### 用法
```
dyn [arguments...]
     <file>         包含模块的文件
     [arguments...] 输入模块的参数
```
## failure
Source: [systemcmds/failure](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/failure)


### 描述
向系统中注入故障。

### 实现
此系统命令通过 uORB 发送一个机体命令来出发故障。

### 示例
通过停止GPS来测试GPS故障保护:

failure gps off

<a id="failure_usage"></a>

### 用法
```
failure [arguments...]
   help          显示此帮助文档

   gps|...       指定的组件

   ok|off|...    指定的故障类型
     [-i <val>]  传感器实例 (0=all)
                 默认: 0
```
## gpio
Source: [systemcmds/gpio](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/gpio)


### 描述
此命令用于读写GPIO
```
gpio read <PORT><PIN>/<DEVICE> [PULLDOWN|PULLUP] [--force]
gpio write <PORT><PIN>/<DEVICE> <VALUE> [PUSHPULL|OPENDRAIN] [--force]
```

### 示例
读取配置为上拉的 PH4 引脚，它的值为高
```
gpio read H4 PULLUP
```
1 OK

设置 PE7 的输出值为高
```
gpio write E7 1 --force
```

Set the output value on device /dev/gpio1 to high
```
gpio write /dev/gpio1 1
```


<a id="gpio_usage"></a>

### 用法
```
gpio [arguments...]
   read
     <PORT><PIN>/<DEVICE> GPIO 的端口和引脚
     [PULLDOWN|PULLUP] 下拉/上拉
     [--force]   强制 (忽略板gpio列表)

   write
     <PORT> <PIN> GPIO 的端口和引脚
     <VALUE>     要写入的值
     [PUSHPULL|OPENDRAIN] 推挽/开漏
     [--force]  强制 (忽略板gpio列表)
```
## hardfault_log
Source: [systemcmds/hardfault_log](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/hardfault_log)

Hardfault 实用程序

在启动脚本中用于处理 hardfaults。

<a id="hardfault_log_usage"></a>

### 用法
```
hardfault_log <command> [arguments...]
 Commands:
   check         Check if there's an uncommitted hardfault

   rearm         Drop an uncommitted hardfault

   fault         Generate a hardfault (this command crashes the system :)
     [0|1]       Hardfault type: 0=divide by 0, 1=Assertion (default=0)

   commit        Write uncommitted hardfault to /fs/microsd/fault_%i.txt (and
                 rearm, but don't reset)

   count         Read the reboot counter, counts the number of reboots of an
                 uncommitted hardfault (returned as the exit code of the
                 program)

   reset         Reset the reboot counter
```
## hist
Source: [systemcmds/hist](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/hist)

Command-line tool to show the px4 message history. There are no arguments.
<a id="hist_usage"></a>

### 用法
```
hist [arguments...]
```
## i2cdetect
Source: [systemcmds/i2cdetect](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/i2cdetect)

用于扫描特定总线上的 I2C 设备的实用程序。
<a id="i2cdetect_usage"></a>

### 用法
```
i2cdetect [arguments...]
     [-b <val>]  I2C 总线
                 default: 1
```
## led_control
Source: [systemcmds/led_control](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/led_control)


### 描述
用于控制和测试（外部）LED 的命令行工具

要使用它，请确保有一个处理 led_control 的 uorb 主题的设备正在运行。

有不同的优先级，例如一个模块可以设置低优先级的颜色，另一个模块可以高优先级闪烁 N 次，闪烁后 LED 自动返回低优先级状态。 该 `rese` t命令还可用于返回较低的优先级。

### 示例
第一个 LED 闪烁蓝光 5 次：
```
led_control blink -c blue -l 0 -n 5
```


<a id="led_control_usage"></a>

### 用法
```
led_control <command> [arguments...]
 Commands:
   test          运行一个测试示例

   on            打开 LED

   off           关闭 LED

   reset         复位 LED 优先级

   blink         使LED闪烁 N 次
     [-n <val>]  闪烁的次数
                 默认: 3
     [-s <val>]  设置闪烁速度
                 值: fast|normal|slow, 默认: normal

   breathe       渐变 LED 亮 & 暗

   flash         以 1Hz 的频率 先快闪两次再熄灭

 以下参数适用于所有除 ‘test’ 的命令:
     [-c <val>]  color
                 值: red|blue|green|yellow|purple|amber|cyan|white, 默认:
                 white
     [-l <val>]  被控制的 LED : 0, 1, 2, ... (默认=all)
     [-p <val>]  优先级
                 默认: 2
```
## listener
Source: [systemcmds/topic_listener](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/topic_listener)


监听 uORB 主题并将数据打印到控制台的实用程序。

可以通过按 Ctrl+C、Esc 或 Q 随时退出侦听器。

<a id="listener_usage"></a>

### 用法
```
listener <command> [arguments...]
 Commands:
     <topic_name> uORB 主题名
     [-i <val>]   主题实例序号
                  默认: 0
     [-n <val>]   消息数量
                  默认: 1
     [-r <val>]   订阅频率 (0为无限制)
                  默认: 0
```
## mfd
Source: [systemcmds/mft](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/mft)

交互显示的实用程序
<a id="mfd_usage"></a>

### 用法
```
mfd <command> [arguments...]
 Commands:
   query         如果不存在返回 ture
```
## mtd
Source: [systemcmds/mtd](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/mtd)

挂载和测试分区的实用程序（基于板定义的 FRAM/EEPROM 存储）
<a id="mtd_usage"></a>

### 用法
```
mtd <command> [arguments...]
 Commands:
   status        打印状态信息

   readtest      执行读取测试

   rwtest        执行读写测试

   erase        擦除分区

 命令‘readtest’和‘rwtest'有一个可选的实例索引:
     [-i <val>]  存储索引 (如果板拥有多个存储)
                 默认: 0

 命令 'readtest', 'rwtest' and 'erase' 有一个可选的参数:
     [<partition_name1> [<partition_name2> ...]] 分区名 (eg.
                 /fs/mtd_params), 未提供时使用系统默认值
```
## nshterm
Source: [systemcmds/nshterm](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/nshterm)

在指定端口启动一个 NSH shell。

该命令此前被用于在 USB 串口端口开启一个 shell。 现在运行mavlink，并且可以在mavlink 上使用shell。

<a id="nshterm_usage"></a>

### 用法
```
nshterm [arguments...]
     <file:dev>  启动 shell 的设备 (eg. /dev/ttyACM0)
```
## param
Source: [systemcmds/param](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/param)


### 描述
通过 shell 或脚本访问和操作参数的命令。

例如，这在启动脚本中用于设置特定于机身的参数。

更改时会自动保存参数，例如 使用 `param set`。 它们通常存储在 FRAM 或 SD 卡中。 `param select` 可用于更改后续保存的存储位置（需要在每次启动时（重新）配置）。

如果启用了基于 FLASH 的后端（这是在编译时完成的，例如对于 Intel Aero 或 Omnibus）， `param select` 则没有任何效果，并且默认始终是 FLASH 后端。 但是 `param save/load <file>` 仍可用于写入/读取文件。

每个参数有一个“已使用”的标志，此标志在启动过程参数被读取后被置位。 它只是用于向地面控制站显示相关参数。

### 示例
更改机身并确保已加载机身的默认参数：
```
param set SYS_AUTOSTART 4001
param set SYS_AUTOCONFIG 1
reboot
```

<a id="param_usage"></a>

### 用法
```
param <command> [arguments...]
 Commands:
   load          Load params from a file (overwrite all)
     [<file>]    File name (use default if not given)

   import        Import params from a file
     [<file>]    File name (use default if not given)

   save          Save params to a file
     [<file>]    File name (use default if not given)

   select        Select default file
     [<file>]    File name

   select-backup Select default file
     [<file>]    File name

   show          Show parameter values
     [-a]        Show all parameters (not just used)
     [-c]        Show only changed params (unused too)
     [-q]        quiet mode, print only param value (name needs to be exact)
     [<filter>]  Filter by param name (wildcard at end allowed, eg. sys_*)

   show-for-airframe Show changed params for airframe config

   status        Print status of parameter system

   set           Set parameter to a value
     <param_name> <value> Parameter name and value to set
     [fail]      If provided, let the command fail if param is not found

   set-default   Set parameter default to a value
     [-s]        If provided, silent errors if parameter doesn't exists
     <param_name> <value> Parameter name and value to set
     [fail]      If provided, let the command fail if param is not found

   compare       Compare a param with a value. 如果相等命令会执行成功
     [-s]        如果提供，参数不存在时引起无声错误
     <param_name> <value> 参数名和被比较的值

   greater       将参数同某个值比较。 如果参数值比该值大
                 则命令执行成功
     [-s]        将参数同某个值比较。
     <param_name> <value> 参数名和被比较的值
     <param_name> <value> 参数名和被比较的值

   touch         标记已使用的参数
     [<param_name1> [<param_name2>]] 参数名 (一个或多个)

   reset         复位指定的参数为默认值
     [<param1> [<param2>]] 复位的参数名 (结尾的通配符是被允许的)

   reset_all     复位所有的参数为默认值
     [<exclude1> [<exclude2>]] 不复位匹配参数 (结尾的通配符是被允许的)

   index         显示给定索引的参数
     <index>     索引: 一个 >= 0 的整数

   index_used    显示给定索引的已用参数
     <index>     索引: 一个 >= 0 的整数

   find          显示参数的索引
     <param>     参数名
```
## payload_deliverer
Source: [modules/payload_deliverer](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/payload_deliverer)


### 描述
Handles payload delivery with either Gripper or a Winch with an appropriate timeout / feedback sensor setting, and communicates back the delivery result as an acknowledgement internally


<a id="payload_deliverer_usage"></a>

### 用法
```
payload_deliverer <command> [arguments...]
 Commands:
   start

   gripper_test  Tests the Gripper's release & grabbing sequence

   gripper_open  Opens the gripper

   gripper_close Closes the gripper

   stop

   status        print status info
```
## perf
Source: [systemcmds/perf](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/perf)

性能计数器打印工具
<a id="perf_usage"></a>

### 用法
```
perf [arguments...]
   reset         复位所有计数器

   latency       打印 HRT 定时器延迟柱状图

 如果未给出参数则打印所有性能计数器
```
## reboot
Source: [systemcmds/reboot](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/reboot)

重启系统
<a id="reboot_usage"></a>

### 用法
```
reboot [arguments...]
     [-b]        重启进入bootloader
     [lock|unlock] 使用/释放关机锁 (用于测试)
```
## sd_bench
Source: [systemcmds/sd_bench](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/sd_bench)

测试SD卡速度
<a id="sd_bench_usage"></a>

### 用法
```
sd_bench [arguments...]
     [-b <val>]  每次读/写的块大小
                 默认: 4096
     [-r <val>]  运行次数
                 默认: 5
     [-d <val>]  以毫秒为单位的运行持续时间
                 默认: 2000
     [-k]        保持测试文件
     [-s]        在每个块后调用 fsync  (默认=每次运行结束)
     [-u]        使用非对其数据测试性能
     [-v]        校验数据和块序号
```
## sd_stress
Source: [systemcmds/sd_stress](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/sd_stress)

在 SD 卡上测试操作
<a id="sd_stress_usage"></a>

### 用法
```
sd_stress [arguments...]
     [-r <val>]  运行次数
                 默认: 5
     [-b <val>]  字节数量
                 默认100: 100
```
## serial_passthru
Source: [systemcmds/serial_passthru](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/serial_passthru)

把数据从一个设备传输到另一个设备。

This can be used to use u-center connected to USB with a GPS on a serial port.

<a id="serial_passthru_usage"></a>

### 用法
```
serial_passthru [arguments...]
     -e <val>    External device path
                 values: <file:dev>
     -d <val>    Internal device path
                 values: <file:dev>
     [-b <val>]  Baudrate
                 default: 115200
     [-t]        Track the External devices baudrate on internal device
```
## 系统时间
Source: [systemcmds/system_time](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/system_time)


### 描述

Command-line tool to set and get system time.

### 示例

Set the system time and read it back
```
system_time set 1600775044
system_time get
```

<a id="system_time_usage"></a>

### 用法
```
system_time <command> [arguments...]
 Commands:
   set           Set the system time, provide time in unix epoch time format

   get           Get the system time
```
## top
Source: [systemcmds/top](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/top)

Monitor running processes and their CPU, stack usage, priority and state
<a id="top_usage"></a>

### 用法
```
top [arguments...]
   once          print load only once
```
## usb_connected
Source: [systemcmds/usb_connected](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/usb_connected)

Utility to check if USB is connected. Was previously used in startup scripts. A return value of 0 means USB is connected, 1 otherwise.
<a id="usb_connected_usage"></a>

### 用法
```
usb_connected [arguments...]
```
## ver
Source: [systemcmds/ver](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/systemcmds/ver)

Tool to print various version information
<a id="ver_usage"></a>

### 用法
```
ver <command> [arguments...]
 Commands:
   hw            Hardware architecture

   mcu           MCU info

   git           git version information

   bdate         Build date and time

   gcc           Compiler info

   bdate         Build date and time

   px4guid       PX4 GUID

   uri           Build URI

   all           Print all versions

   hwcmp         Compare hardware version (returns 0 on match)
     <hw> [<hw2>] Hardware to compare against (eg. PX4_FMU_V4). An OR comparison
                 is used if multiple are specified

   hwtypecmp     Compare hardware type (returns 0 on match)
     <hwtype> [<hwtype2>] Hardware type to compare against (eg. V2). An OR
                 comparison is used if multiple are specified
```
