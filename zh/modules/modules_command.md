---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_command
---

# 模块参考：命令（Command）

## actuator_test
Source: [systemcmds/actuator_test](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/actuator_test)


用于测试执行器的实用程序

注意：这仅与 SYS_CTRL_ALLOC=1 结合使用。

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
Source: [systemcmds/bl_update](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/bl_update)

用于从文件刷新引导加载程序的实用程序
<a id="bl_update_usage"></a>

### 用法
```
bl_update [arguments...]
   setopt        设置选项比特来解锁 FLASH (只有在锁定状态下需要）

   <file>        Bootloader bin 文件                
```
## dumpfile
Source: [systemcmds/dumpfile](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/dumpfile)

转储文件实用程序。 以二进制模式（不要用 CR LF 替换 LF）将文件大小和内容打印到标准输出。
<a id="dumpfile_usage"></a>

### 用法
```
dumpfile [arguments...]
     <file>      被转储的文件
```
## dyn
Source: [systemcmds/dyn](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/dyn)


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
Source: [systemcmds/failure](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/failure)


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
Source: [systemcmds/gpio](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/gpio)


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

设置 device /dev/gpin1 的输出值为高
```
gpio write /dev/gpin1 1
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
Source: [systemcmds/hardfault_log](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/hardfault_log)

Hardfault 实用程序

在启动脚本中用于处理 hardfaults。

<a id="hardfault_log_usage"></a>

### 用法
```
hardfault_log <command> [arguments...]
 Commands:
   check         检查是否存在未提交的 hardfault

   rearm         丢弃一个未提的 hardfault

   fault         生成一个 hardfault (此命令会使系统崩溃 :)
     [0|1]       Hardfault 类型: 0=除以0, 1=断言(default=0)

   commit        将未提交的 hardfault 写入 /fs/microsd/fault_%i.txt (并
                 rearm, 但不复位)

   count         读取重启计数器, 统计未提交的 hardfault 的重启次数(返回
                 程序的退出代码)

   reset         重置重启计数器
```
## i2cdetect
Source: [systemcmds/i2cdetect](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/i2cdetect)

用于扫描特定总线上的 I2C 设备的实用程序。
<a id="i2cdetect_usage"></a>

### 用法
```
i2cdetect [arguments...]
     [-b <val>]  I2C 总线
                 default: 1
```
## led_control
Source: [systemcmds/led_control](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/led_control)


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
Source: [systemcmds/topic_listener](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/topic_listener)


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
Source: [systemcmds/mft](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/mft)

交互显示的实用程序
<a id="mfd_usage"></a>

### 用法
```
mfd <command> [arguments...]
 Commands:
   query         如果不存在返回 ture
```
## mixer
Source: [systemcmds/mixer](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/mixer)


### 描述
向电调驱动器载入和添加一个混控器文件。

需要注意的是驱动必须支持这个命令使用的 ioctl ，这一点在 Nuttx 上是成立的，但在其它平台上就不一定成立，如 RPI。

<a id="mixer_usage"></a>

### 用法
```
mixer <command> [arguments...]
 Commands:
   load
     <file:dev> <file> 输出设备 (eg. /dev/pwm_output0) 和混控器文件

   append
     <file:dev> <file> 输出设备 (eg. /dev/pwm_output0) 和混控器文件
```
## motor_test
Source: [systemcmds/motor_test](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/motor_test)


用于测试执行器的实用程序

警告：在使用此命令之前移除所有螺旋桨。

<a id="motor_test_usage"></a>

### 用法
```
motor_test <command> [arguments...]
 Commands:
   test          设置电机输出值
     [-m <val>]  测试的电机 (1...8, 没有指定时为全部)
     [-p <val>]  Power (0...100)
                 默认: 0
     [-t <val>]  以秒为单位的超时时间 (默认=无超时)
                 默认: 0
     [-i <val>]  驱动实例序号
                 默认: 0

   stop          停止所有电机

   iterate       依次开始所有的电机启动和停止
```
## mtd
Source: [systemcmds/mtd](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/mtd)

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
Source: [systemcmds/nshterm](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/nshterm)

在指定端口启动一个 NSH shell。

该命令此前被用于在 USB 串口端口开启一个 shell。 现在运行mavlink，并且可以在mavlink 上使用shell。

<a id="nshterm_usage"></a>

### 用法
```
nshterm [arguments...]
     <file:dev>  启动 shell 的设备 (eg. /dev/ttyACM0)
```
## param
Source: [systemcmds/param](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/param)


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
   load          从文件中加载参数（覆盖全部）
     [<file>]    文件名 (没有给出时使用默认值)

   import        从文件中导入参数
     [<file>]    文件名 (没有给出时使用默认值)

   save          保存参数到文件
     [<file>]    文件名 (没有给出时使用默认值)

   dump          丢弃文件给出的参数
     [<file>]    文件名 (没有给出时使用默认值)

   select        选择一个默认文件
     [<file>]    文件名

   select-backup 选择一个默认文件
     [<file>]    文件名

   show          显示参数名称
     [-a]        显示所有参数名称 (包括未使用的)
     [-c]        只显示已更改的参数 (包括未使用的)
     [-q]        安静模式, 只打印参数值 (名称需要精准)
     [<filter>]  通过参数名过滤 (位于结尾的通配符是允许的, eg. sys_*)

   show-for-airframe 显示机身配置被更改的参数

   status        打印参数系统状态

   set           设置参数为一个值
     <param_name> <value> 参数名和设置值
     [fail]      如果提供，允许在参数不存在时不生效

   set-default   设置参数默认值
     [-s]        如果提供，参数不存在时引起无声错误
     <param_name> <value> 参数名和设置值
     [fail]      如果提供，允许在参数不存在时不生效

   compare       将参数同某个值比较。 如果相等命令会执行成功
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
## perf
Source: [systemcmds/perf](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/perf)

性能计数器打印工具
<a id="perf_usage"></a>

### 用法
```
perf [arguments...]
   reset         复位所有计数器

   latency       打印 HRT 定时器延迟柱状图

 如果未给出参数则打印所有性能计数器
```
## pwm
Source: [systemcmds/pwm](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/pwm)


### 描述
此命令用于配置输出给舵机和电调的 PWM。

默认设备 `/dev/pwm_output0` 是主通道, AUX 通道在 `/dev/pwm_output1` (`-d` 参数).

该命令用于在启动脚本中确认 PWM 参数 (`PWM_*`)被应用(或有机身配置提供，当被指定时）。 `pwm status` 展示当前设置 (中立位微调值是一个偏移，通过 `PWM_MAIN_TRIMx` 和 `PWM_AUX_TRIMx` 来配置).

应设置加锁值以使电机不旋转（它也用于停止开关），它时能够旋转的最小值。

通道被分配到一组。 由于硬件限制, 只能为每个组设置更新频率。 使用 `pwm status` 显示所有组. 如果使用了 `-c` 参数, 所有通道所在组都将生效。

参数 `-p` 和 `-r` 可以设置未一个参数变量而不是一个指定的整数：使用 -p p:PWM_MIN。

注意，在 OneShot 模式下， PWM 范围 [1000, 2000] 会被自动映射到 [125, 250] 。

### 示例

将所有通道的 PWM 频率设置为 400 Hz:
```
pwm rate -a -r 400
```

Arm and set the outputs of channels 1 and 3 to a PWM value to 1200 us:
```
pwm min -c 13 -p 1200
```


<a id="pwm_usage"></a>

### 用法
```
pwm <command> [arguments...]
 Commands:
   arm           解锁输出

   disarm        加锁输出

   status        打印所有通道的当前配置

   rate          配置 PWM 频率
     -r <val>    PWM频率 (0 = 单发, 否则 50 to 400Hz)

   oneshot       配置单发125 (rate 设置为 0)

   min           设置 PWM 最小值

   max           设置 PWM 最大值

命令'min' 和 'max' 需要一个 PWM 值:
     -p <val>    PWM 值(例如. 1100)

 命令 'rate', 'oneshot', 'min', 'max' 还需要使用以下命令之一指定通道:
     [-c <val>]  通过以下形式选择通道: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  通过位掩码选择通道 (eg. 0xF, 3)
     [-g <val>]  通过组选择通道 (eg. 0, 1, 2. 使用 'pwm status' 显示
                 组)
     [-a]        选择所有通道

 这些参数适用于所有命令:
     [-d <val>]  选择 PWM 输出设备
                 值: <file:dev>, 默认: /dev/pwm_output0
     [-v]        详细输出
     [-e]        退出时用1代替0表示错误
```
## reboot
Source: [systemcmds/reboot](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/reboot)

重启系统
<a id="reboot_usage"></a>

### 用法
```
reboot [arguments...]
     [-b]        重启进入bootloader
     [lock|unlock] 使用/释放关机锁 (用于测试)
```
## sd_bench
Source: [systemcmds/sd_bench](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/sd_bench)

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
Source: [systemcmds/sd_stress](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/sd_stress)

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
Source: [systemcmds/serial_passthru](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/serial_passthru)

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
Source: [systemcmds/system_time](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/system_time)


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
Source: [systemcmds/top](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/top)

Monitor running processes and their CPU, stack usage, priority and state
<a id="top_usage"></a>

### 用法
```
top [arguments...]
   once          print load only once
```
## usb_connected
Source: [systemcmds/usb_connected](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/usb_connected)

Utility to check if USB is connected. Was previously used in startup scripts. A return value of 0 means USB is connected, 1 otherwise.
<a id="usb_connected_usage"></a>

### 用法
```
usb_connected [arguments...]
```
## ver
Source: [systemcmds/ver](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/ver)

Tool to print various version information
<a id="ver_usage"></a>

### Usage
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
