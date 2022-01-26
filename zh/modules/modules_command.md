# 模块参考：命令（Command）

## actuator_test
来源: [systemcmds/actuator_test](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/actuator_test)


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
来源: [systemcmds/bl_update](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/bl_update)

用于从文件刷新引导加载程序的实用程序<a id="bl_update_usage"></a>

### 用法
```
bl_update [arguments...]
   setopt        设置选项比特来解锁 FLASH (只有在锁定状态下需要）

   <file>        Bootloader bin 文件                
```
## dumpfile
来源: [systemcmds/dumpfile](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/dumpfile)

转储文件实用程序。 以二进制模式（不要用 CR LF 替换 LF）将文件大小和内容打印到标准输出。
<a id="dumpfile_usage"></a>

### 用法
```
dumpfile [arguments...]
     <file>      被转储的文件
```
## dyn
来源: [systemcmds/dyn](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/dyn)


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
     <file>      包含模块的文件
     [arguments...] 输入模块的参数
```
## failure
来源: [systemcmds/failure](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/failure)


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
来源: [systemcmds/gpio](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/gpio)


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
来源: [systemcmds/hardfault_log](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/hardfault_log)

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
来源: [systemcmds/i2cdetect](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/i2cdetect)

用于扫描特定总线上的 I2C 设备的实用程序。<a id="i2cdetect_usage"></a>

### 用法
```
i2cdetect [arguments...]
     [-b <val>]  I2C 总线
                 default: 1
```
## led_control
来源: [systemcmds/led_control](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/led_control)


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
来源: [systemcmds/topic_listener](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/topic_listener)


监听 uORB 主题并将数据打印到控制台的实用程序。

可以通过按 Ctrl+C、Esc 或 Q 随时退出侦听器。

<a id="listener_usage"></a>

### 用法
```
listener <command> [arguments...]
 Commands:
     <topic_name> uORB 主题名
     [-i <val>]  主题实例序号
                 默认: 0
     [-n <val>]  消息数量
                 默认: 1
     [-r <val>]  订阅频率 (0为无限制)
                 默认: 0
```
## mfd
来源: [systemcmds/mft](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mft)

Utility interact with the manifest
<a id="mfd_usage"></a>

### Usage
```
mfd <command> [arguments...]
 Commands:
   query         Returns true if not existed
```
## mixer
Source: [systemcmds/mixer](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mixer)


### Description
Load or append mixer files to the ESC driver.

Note that the driver must support the used ioctl's, which is the case on NuttX, but for example not on RPi.

<a id="mixer_usage"></a>

### Usage
```
mixer <command> [arguments...]
 Commands:
   load
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file

   append
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file
```
## motor_test
Source: [systemcmds/motor_test](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/motor_test)


Utility to test motors.

WARNING: remove all props before using this command.

<a id="motor_test_usage"></a>

### Usage
```
motor_test <command> [arguments...]
 Commands:
   test          Set motor(s) to a specific output value
     [-m <val>]  Motor to test (1...8, all if not specified)
     [-p <val>]  Power (0...100)
                 default: 0
     [-t <val>]  Timeout in seconds (default=no timeout)
                 default: 0
     [-i <val>]  driver instance
                 default: 0

   stop          Stop all motors

   iterate       Iterate all motors starting and stopping one after the other
```
## mtd
Source: [systemcmds/mtd](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/mtd)

Utility to mount and test partitions (based on FRAM/EEPROM storage as defined by the board)
<a id="mtd_usage"></a>

### Usage
```
mtd <command> [arguments...]
 Commands:
   status        Print status information

   readtest      Perform read test

   rwtest        Perform read-write test

   erase         Erase partition(s)

 The commands 'readtest' and 'rwtest' have an optional instance index:
     [-i <val>]  storage index (if the board has multiple storages)
                 default: 0

 The commands 'readtest', 'rwtest' and 'erase' have an optional parameter:
     [<partition_name1> [<partition_name2> ...]] Partition names (eg.
                 /fs/mtd_params), use system default if not provided
```
## nshterm
Source: [systemcmds/nshterm](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/nshterm)

Start an NSH shell on a given port.

This was previously used to start a shell on the USB serial port. Now there runs mavlink, and it is possible to use a shell over mavlink.

<a id="nshterm_usage"></a>

### Usage
```
nshterm [arguments...]
     <file:dev>  Device on which to start the shell (eg. /dev/ttyACM0)
```
## param
Source: [systemcmds/param](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/param)


### Description
Command to access and manipulate parameters via shell or script.

This is used for example in the startup script to set airframe-specific parameters.

Parameters are automatically saved when changed, eg. with `param set`. They are typically stored to FRAM or to the SD card. `param select` can be used to change the storage location for subsequent saves (this will need to be (re-)configured on every boot).

If the FLASH-based backend is enabled (which is done at compile time, e.g. for the Intel Aero or Omnibus), `param select` has no effect and the default is always the FLASH backend. However `param save/load <file>` can still be used to write to/read from files.

Each parameter has a 'used' flag, which is set when it's read during boot. It is used to only show relevant parameters to a ground control station.

### Examples
Change the airframe and make sure the airframe's default parameters are loaded:
```
param set SYS_AUTOSTART 4001
param set SYS_AUTOCONFIG 1
reboot
```

<a id="param_usage"></a>

### Usage
```
param <command> [arguments...]
 Commands:
   load          Load params from a file (overwrite all)
     [<file>]    File name (use default if not given)

   import        Import params from a file
     [<file>]    File name (use default if not given)

   save          Save params to a file
     [<file>]    File name (use default if not given)

   dump          Dump params from a file
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

   compare       Compare a param with a value. Command will succeed if equal
     [-s]        If provided, silent errors if parameter doesn't exists
     <param_name> <value> Parameter name and value to compare

   greater       Compare a param with a value. Command will succeed if param is
                 greater than the value
     [-s]        If provided, silent errors if parameter doesn't exists
     <param_name> <value> Parameter name and value to compare
     <param_name> <value> Parameter name and value to compare

   touch         Mark a parameter as used
     [<param_name1> [<param_name2>]] Parameter name (one or more)

   reset         Reset only specified params to default
     [<param1> [<param2>]] Parameter names to reset (wildcard at end allowed)

   reset_all     Reset all params to default
     [<exclude1> [<exclude2>]] Do not reset matching params (wildcard at end
                 allowed)

   index         Show param for a given index
     <index>     Index: an integer >= 0

   index_used    Show used param for a given index
     <index>     Index: an integer >= 0

   find          Show index of a param
     <param>     param name
```
## perf
Source: [systemcmds/perf](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/perf)

Tool to print performance counters
<a id="perf_usage"></a>

### Usage
```
perf [arguments...]
   reset         Reset all counters

   latency       Print HRT timer latency histogram

 Prints all performance counters if no arguments given
```
## pwm
Source: [systemcmds/pwm](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/pwm)


### Description
This command is used to configure PWM outputs for servo and ESC control.

The default device `/dev/pwm_output0` are the Main channels, AUX channels are on `/dev/pwm_output1` (`-d` parameter).

It is used in the startup script to make sure the PWM parameters (`PWM_*`) are applied (or the ones provided by the airframe config if specified). `pwm status` shows the current settings (the trim value is an offset and configured with `PWM_MAIN_TRIMx` and `PWM_AUX_TRIMx`).

The disarmed value should be set such that the motors don't spin (it's also used for the kill switch), at the minimum value they should spin.

Channels are assigned to a group. Due to hardware limitations, the update rate can only be set per group. Use `pwm status` to display the groups. If the `-c` argument is used, all channels of any included group must be included.

The parameters `-p` and `-r` can be set to a parameter instead of specifying an integer: use -p p:PWM_MIN for example.

Note that in OneShot mode, the PWM range [1000, 2000] is automatically mapped to [125, 250].

### Examples
Set the PWM rate for all channels to 400 Hz:
```
pwm rate -a -r 400
```

Test the outputs of eg. channels 1 and 3, and set the PWM value to 1200 us:
```
pwm arm
pwm test -c 13 -p 1200
```

<a id="pwm_usage"></a>

### Usage
```
pwm <command> [arguments...]
 Commands:
   arm           Arm output

   disarm        Disarm output

   status        Print current configuration of all channels

   rate          Configure PWM rates
     -r <val>    PWM Rate in Hz (0 = Oneshot, otherwise 50 to 400Hz)

   oneshot       Configure Oneshot125 (rate is set to 0)

   min           Set Minimum PWM value

   max           Set Maximum PWM value

 The commands 'min' and 'max' require a PWM value:
     -p <val>    PWM value (eg. 1100)

 The commands 'rate', 'oneshot', 'min', 'max' additionally require to specify
 the channels with one of the following commands:
     [-c <val>]  select channels in the form: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  Select channels via bitmask (eg. 0xF, 3)
     [-g <val>]  Select channels by group (eg. 0, 1, 2. use 'pwm status' to show
                 groups)
     [-a]        Select all channels

 These parameters apply to all commands:
     [-d <val>]  Select PWM output device
                 values: <file:dev>, default: /dev/pwm_output0
     [-v]        Verbose output
     [-e]        Exit with 1 instead of 0 on error
```
## reboot
Source: [systemcmds/reboot](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/reboot)

Reboot the system
<a id="reboot_usage"></a>

### Usage
```
reboot [arguments...]
     [-b]        Reboot into bootloader
     [lock|unlock] Take/release the shutdown lock (for testing)
```
## sd_bench
Source: [systemcmds/sd_bench](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/sd_bench)

Test the speed of an SD Card
<a id="sd_bench_usage"></a>

### Usage
```
sd_bench [arguments...]
     [-b <val>]  Block size for each read/write
                 default: 4096
     [-r <val>]  Number of runs
                 default: 5
     [-d <val>]  Duration of a run in ms
                 default: 2000
     [-k]        Keep the test file
     [-s]        Call fsync after each block (default=at end of each run)
     [-u]        Test performance with unaligned data
     [-v]        Verify data and block number
```
## sd_stress
Source: [systemcmds/sd_stress](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/sd_stress)

Test operations on an SD Card
<a id="sd_stress_usage"></a>

### Usage
```
sd_stress [arguments...]
     [-r <val>]  Number of runs
                 default: 5
     [-b <val>]  Number of bytes
                 default: 100
```
## system_time
Source: [systemcmds/system_time](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/system_time)


### Description

Command-line tool to set and get system time.

### Examples

Set the system time and read it back
```
system_time set 1600775044
system_time get
```

<a id="system_time_usage"></a>

### Usage
```
system_time <command> [arguments...]
 Commands:
   set           Set the system time, provide time in unix epoch time format

   get           Get the system time
```
## top
Source: [systemcmds/top](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/top)

Monitor running processes and their CPU, stack usage, priority and state
<a id="top_usage"></a>

### Usage
```
top [arguments...]
   once          print load only once
```
## usb_connected
Source: [systemcmds/usb_connected](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/usb_connected)

Utility to check if USB is connected. Was previously used in startup scripts. A return value of 0 means USB is connected, 1 otherwise.
<a id="usb_connected_usage"></a>

### Usage
```
usb_connected [arguments...]
```
## ver
Source: [systemcmds/ver](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/ver)

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
