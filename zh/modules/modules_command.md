# 模块参考：命令（Command）

## bl_update
源码： [systemcmds/bl_update](https://github.com/PX4/Firmware/tree/master/src/systemcmds/bl_update)

Utility to flash the bootloader from a file<a id="bl_update_usage"></a>

### 用法
```
bl_update [arguments...]
   bl_update [arguments...]
   setopt        Set option bits to unlock the FLASH (only needed if in locked
                 state)

   <file>        Bootloader bin file
```
## dumpfile
源码： [systemcmds/dumpfile](https://github.com/PX4/Firmware/tree/master/src/systemcmds/dumpfile)

转储文件应用。 Dump file utility. Prints file size and contents in binary mode (don't replace LF with CR LF) to stdout.
<a id="dumpfile_usage"></a>

### 用法
```
dumpfile [arguments...]
     dumpfile [arguments...]
     <file>      File to dump
```
## dyn
源码：[systemcmds/dyn](https://github.com/PX4/Firmware/tree/master/src/systemcmds/dyn)


### 描述
载入并运行一个未被编译至 PX4 二进制文件内的动态 PX4 模块。

### 示例
```
dyn ./hello.px4mod start
```

<a id="dyn_usage"></a>

### 用法
```
dyn [arguments...]
     dyn [arguments...]
     <file>      File containing the module
     [arguments...] Arguments to the module Arguments to the module
```
## esc_calib
源码： [systemcmds/esc_calib](https://github.com/PX4/Firmware/tree/master/src/systemcmds/esc_calib)

ESC 校准工具。

校准流程（运行命令将会引导你完成此流程）：
- 移除螺旋桨，将 ESC 断电
- Stop attitude controllers: mc_att_control stop, fw_att_control stop
- 确保安全设置断开（Make sure safety is off）
- 运行这个命令

<a id="esc_calib_usage"></a>

### 用法
```
esc_calib [arguments...]
     esc_calib [arguments...]
     [-d <val>]  Select PWM output device
                 values: <file:dev>, default: /dev/pwm_output0
     [-l <val>]  Low PWM value in us
                 default: 1000
     [-h <val>]  High PWM value in us
                 default: 2000
     [-c <val>]  select channels in the form: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  Select channels via bitmask (eg. 0xF, 3)
                 default: 0
     [-a]        Select all channels
```
## failure
Source: [systemcmds/config](https://github.com/PX4/Firmware/tree/master/src/systemcmds/config)


### 描述
Inject failures into system.

### 用法
This system command sends a vehicle command over uORB to trigger failure.

### 示例
Test the GPS failsafe by stopping GPS:

failure gps off

<a id="failure_usage"></a>

### 用法
```
failure [arguments...]
   help          Show this help text

   gps|...       Specify component

   ok|off|...    Specify failure type
     [-i <val>]  sensor instance (0=all)
                 default: 0
```
## gpio
Source: [systemcmds/gpio](https://github.com/PX4/Firmware/tree/master/src/systemcmds/gpio)

This command is used to read and write GPIOs.
<a id="gpio_usage"></a>

### 用法
```
gpio [arguments...]
   read
     <PORT> <PIN> GPIO port and pin
     [PULLDOWN|PULLUP] Pulldown/Pullup
     [--force]   Force (ignore board gpio list)

   write
     <PORT> <PIN> GPIO port and pin
     <VALUE>     Value to write
     [PULLDOWN|PULLUP] Pulldown/Pullup
     [--force]   Force (ignore board gpio list)
```
## hardfault_log
源码： [systemcmds/hardfault_log](https://github.com/PX4/Firmware/tree/master/src/systemcmds/hardfault_log)

硬错误处理程序。

在启动脚本中用于处理硬错误。

<a id="hardfault_log_usage"></a>

### 用法
```
hardfault_log <command> [arguments...]
 hardfault_log <command> [arguments...]
 Commands:
   check         Check if there's an uncommited hardfault

   rearm         Drop an uncommited hardfault

   fault         Generate a hardfault (this command crashes the system :)
     [0|1]       Hardfault type: 0=divide by 0, 1=Assertion (default=0)

   commit        Write uncommited hardfault to /fs/microsd/fault_%i.txt (and
                 rearm, but don't reset)

   count         Read the reboot counter, counts the number of reboots of an
                 uncommited hardfault (returned as the exit code of the program)

   reset         Reset the reboot counter
```
## i2cdetect
Source: [systemcmds/i2cdetect](https://github.com/PX4/Firmware/tree/master/src/systemcmds/i2cdetect)

Utility to scan for I2C devices on a particular bus.
<a id="i2cdetect_usage"></a>

### 描述
```
i2cdetect [arguments...]
     [-b <val>]  I2C bus
                 default: 1
```
## led_control
源码： [systemcmds/led_control](https://github.com/PX4/Firmware/tree/master/src/systemcmds/led_control)


### 描述
用于控制 & 测试 （外部） LED's 的命令行工具。

要使用该命令请确保有一个负责处理 led_control 的 uorb 主题处于运行状态。

There are different priorities, such that for example one module can set a color with low priority, and another module can blink N times with high priority, and the LED's automatically return to the lower priority state after the blinking. The `reset` command can also be used to return to a lower priority. 也可使用 `reset` 命令来返回至一个更低的优先级。

### 示例
第一个 LED 闪烁蓝光 5 次：
```
led_control blink -c blue -l 0 -n 5
```

<a id="led_control_usage"></a>

### 用法
```
led_control <command> [arguments...]
 led_control <command> [arguments...]
 Commands:
   test          Run a test pattern

   on            Turn LED on

   off           Turn LED off

   reset         Reset LED priority

   blink         Blink LED N times
     [-n <val>]  Number of blinks
                 default: 3
     [-s <val>]  Set blinking speed
                 values: fast|normal|slow, default: normal

   breathe       Continuously fade LED in & out

   flash         Two fast blinks and then off with frequency of 1Hz

 The following arguments apply to all of the above commands except for 'test':
     [-c <val>]  color
                 values: red|blue|green|yellow|purple|amber|cyan|white, default:
                 white
     [-l <val>]  Which LED to control: 0, 1, 2, ... (default=all)
                 default: -1
     [-p <val>]  Priority
                 default: 2
```
## listener
源码： [systemcmds/topic_listener](https://github.com/PX4/Firmware/tree/master/src/systemcmds/topic_listener)


用于监听 uORB 主题并将数据输出在控制台上的工具。

Note: this command currently only supports the `/dev/pwm_output0` output.

<a id="listener_usage"></a>

### 用法
```
listener <command> [arguments...]
 listener <command> [arguments...]
 Commands:
     <topic_name> uORB topic name
     [-i <val>]  Topic instance
                 default: 0
     [-n <val>]  Number of messages
                 default: 1
     [-r <val>]  Subscription rate (unlimited if 0)
                 default: 0
```
## mixer
源码： [systemcmds/mixer](https://github.com/PX4/Firmware/tree/master/src/systemcmds/mixer)

将混控器文件加载或者附加到 ESC 驱动中。<a id="mfd_usage"></a>

### 描述
```
mfd <command> [arguments...]
 mixer <command> [arguments...]
 Commands:
   load
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file

   append
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file
```
## motor_ramp
需要注意的是驱动必须支持这个命令使用的 ioctl ，这一点在 Nuttx 上是成立的，但在其它平台上就不一定成立，如 RPI。


### 用法
源码： [systemcmds/motor_ramp](https://github.com/PX4/Firmware/tree/master/src/systemcmds/motor_ramp)

用于测试电机的加速。

<a id="mixer_usage"></a>

### 参数描述
```
mixer <command> [arguments...]
 Commands:
   load
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file

   append
     <file:dev> <file> Output device (eg. /dev/pwm_output0) and mixer file
```
## motor_test
在开始之前需要确保停止所有姿态控制器的运行。


### 示例
命令开始后将开启一个后台任务，该任务会持续若干秒（根据设定值）然后退出。

源码： [systemcmds/motor_test](https://github.com/PX4/Firmware/tree/master/src/systemcmds/motor_test)
```
motor_test <command> [arguments...]
 Commands:
   test          Set motor(s) to a specific output value
     [-m <val>]  Motor to test (0...7, all if not specified)
                 default: -1
     [-p <val>]  Power (0...100)
                 default: 0

   stop          Stop all motors

   iterate       Iterate all motors starting and stopping one after the other
```

电机测试工具。

### 用法
```
motor_ramp sine -a 1100 -r 0.5
```

<a id="motor_ramp_usage"></a>

### 用法
```
motor_ramp [arguments...]
     ramp|sine|square mode
     [-d <val>]  Pwm output device
                 default: /dev/pwm_output0
     -a <val>    Select minimum pwm duty cycle in usec
     [-b <val>]  Select maximum pwm duty cycle in usec
                 default: 2000
     [-r <val>]  Select motor ramp duration in sec
                 default: 1.0

 WARNING: motors will ramp up to full speed!
```
## mtd
Source: [systemcmds/motor_test](https://github.com/PX4/Firmware/tree/master/src/systemcmds/motor_test)


源码： [systemcmds/mtd](https://github.com/PX4/Firmware/tree/master/src/systemcmds/mtd)

Parameters are automatically saved when changed, eg. with `param set`. They are typically stored to FRAM or to the SD card. `param select` can be used to change the storage location for subsequent saves (this will need to be (re-)configured on every boot).

<a id="motor_test_usage"></a>

### 用法
```
motor_test <command> [arguments...]
 mtd <command> [arguments...]
 Commands:
   status        Print status information

   start         Mount partitions

   readtest      Perform read test

   rwtest        Perform read-write test

   erase         Erase partition(s)

 The commands 'start', 'readtest', 'rwtest' and 'erase' have an optional
 parameter:
     [<partition_name1> [<partition_name2> ...]] Partition names (eg.
                 /fs/mtd_params), use system default if not provided
```
## nshterm
源码： [systemcmds/nshterm](https://github.com/PX4/Firmware/tree/master/src/systemcmds/nshterm)

在指定端口启动一个 NSH shell<a id="mtd_usage"></a>

### 描述
```
mtd <command> [arguments...]
 nshterm [arguments...]
     <file:dev>  Device on which to start the shell (eg. /dev/ttyACM0) Partition names (eg.
                 /fs/mtd_params), use system default if not provided
```
## param
Source: [systemcmds/nshterm](https://github.com/PX4/Firmware/tree/master/src/systemcmds/nshterm)

源码： [systemcmds/param](https://github.com/PX4/Firmware/tree/master/src/systemcmds/param)

This was previously used to start a shell on the USB serial port. Now there runs mavlink, and it is possible to use a shell over mavlink.

<a id="nshterm_usage"></a>

### 参数描述
```
nshterm [arguments...]
     <file:dev>  Device on which to start the shell (eg. /dev/ttyACM0)
```
## perf
例如，在启动脚本中使用此命令来设置特定于机型的参数。


### 示例
Command to access and manipulate parameters via shell or script.

This is used for example in the startup script to set airframe-specific parameters.

Each parameter has a 'used' flag, which is set when it's read during boot. It is used to only show relevant parameters to a ground control station. 它只是用于向地面控制站显示有关联的参数。 `param select` can be used to change the storage location for subsequent saves (this will need to be (re-)configured on every boot).

If the FLASH-based backend is enabled (which is done at compile time, e.g. for the Intel Aero or Omnibus), `param select` has no effect and the default is always the FLASH backend. However `param save/load <file>` can still be used to write to/read from files.

Each parameter has a 'used' flag, which is set when it's read during boot. It is used to only show relevant parameters to a ground control station.

### 用法
Tool to print performance counters
```
param set SYS_AUTOSTART 4001
param set SYS_AUTOCONFIG 1
reboot
```

<a id="param_usage"></a>

### 用法
```
param <command> [arguments...]
 perf [arguments...]
   reset         Reset all counters

   latency       Print HRT timer latency histogram

 Prints all performance counters if no arguments given Command will succeed if equal
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
## pwm
源码： [systemcmds/pwm](https://github.com/PX4/Firmware/tree/master/src/systemcmds/pwm)

此命令用于配置舵机和 ESC 的 PWM 控制输出。<a id="perf_usage"></a>

### 描述
```
perf [arguments...]
   reset         Reset all counters

   latency       Print HRT timer latency histogram

 Prints all performance counters if no arguments given
```
## reboot
默认设备是主通道的 `/dev/pwm_output0` ，AUX 辅助通道位于 `/dev/pwm_output1` (需要搭配 `-d` 参数)。


### 示例
This command is used to configure PWM outputs for servo and ESC control.

Reboot the system

通道被分配到一个组。 由于硬件限制, 只能为每个组设置更新速率。

参数 `-p` 和 `-r` 可设置为一个参数变量而不是一个指定的证书：例如， -p p:PWM_MIN 。

Channels are assigned to a group. Due to hardware limitations, the update rate can only be set per group. Use `pwm info` to display the groups. If the `-c` argument is used, all channels of any included group must be included.

将所有通道的 PWM 速率设置为 400 Hz:

Note that in OneShot mode, the PWM range [1000, 2000] is automatically mapped to [125, 250].

### 用法
源码： [systemcmds/reboot](https://github.com/PX4/Firmware/tree/master/src/systemcmds/reboot)
```
pwm arm
pwm test -c 13 -p 1200
```

Test the outputs of eg. channels 1 and 3, and set the PWM value to 1200 us:
```
pwm arm
pwm test -c 13 -p 1200
```

<a id="pwm_usage"></a>

### 用法
```
pwm <command> [arguments...]
 reboot [arguments...]
     [-b]        Reboot into bootloader
     [lock|unlock] Take/release the shutdown lock (for testing) PWM outputs are set to failsafe values.
     on|off      Turn on or off

   terminatefail Enable Termination Failsafe mode. While this is true, any
                 failsafe that occurs will be unrecoverable (even if recovery
                 conditions are met).
     on|off      Turn on or off

   rate          Configure PWM rates
     -r <val>    PWM Rate in Hz (0 = Oneshot, otherwise 50 to 400Hz)

   oneshot       Configure Oneshot125 (rate is set to 0)

   failsafe      Set Failsafe PWM value

   disarmed      Set Disarmed PWM value

   min           Set Minimum PWM value

   max           Set Maximum PWM value

   test          Set Output to a specific value until 'q' or 'c' or 'ctrl-c'
                 pressed

   steps         Run 5 steps from 0 to 100%

 The commands 'failsafe', 'disarmed', 'min', 'max' and 'test' require a PWM
 value:
     -p <val>    PWM value (eg. 1100)

 The commands 'rate', 'oneshot', 'failsafe', 'disarmed', 'min', 'max', 'test'
 and 'steps' additionally require to specify the channels with one of the
 following commands:
     [-c <val>]  select channels in the form: 1234 (1 digit per channel,
                 1=first)
     [-m <val>]  Select channels via bitmask (eg. 0xF, 3)
     [-g <val>]  Select channels by group (eg. 0, 1, 2. use 'pwm info' to show
                 groups)
     [-a]        Select all channels

 These parameters apply to all commands:
     [-d <val>]  Select PWM output device
                 values: <file:dev>, default: /dev/pwm_output0
     [-v]        Verbose output
     [-e]        Exit with 1 instead of 0 on error
```
## sd_bench
源码： [systemcmds/sd_bench](https://github.com/PX4/Firmware/tree/master/src/systemcmds/sd_bench)

Test the speed of an SD Card<a id="reboot_usage"></a>

### 用法
```
reboot [arguments...]
     sd_bench [arguments...]
     [-b <val>]  Block size for each read/write
                 default: 4096
     [-r <val>]  Number of runs
                 default: 5
     [-d <val>]  Duration of a run in ms
                 default: 2000
     [-s]        Call fsync after each block (default=at end of each run)
```
## sd_bench
Source: [systemcmds/sd_bench](https://github.com/PX4/Firmware/tree/master/src/systemcmds/sd_bench)

Test the speed of an SD Card
<a id="sd_bench_usage"></a>

### 描述
```
sd_bench [arguments...]
     [-b <val>]  Block size for each read/write
                 default: 4096
     [-r <val>]  Number of runs
                 default: 5
     [-d <val>]  Duration of a run in ms
                 default: 2000
     [-s]        Call fsync after each block (default=at end of each run)
```
## top
Source: [systemcmds/system_time](https://github.com/PX4/Firmware/tree/master/src/systemcmds/system_time)


### 示例

源码：[systemcmds/top](https://github.com/PX4/Firmware/tree/master/src/systemcmds/top)

### 用法

Monitor running processes and their CPU, stack usage, priority and state
```
system_time set 1600775044
system_time get
```

<a id="system_time_usage"></a>

### 用法
```
system_time <command> [arguments...]
 top [arguments...]
   once          print load only once
```
## usb_connected
源码： [systemcmds/usb_connected](https://github.com/PX4/Firmware/tree/master/src/systemcmds/usb_connected)

Monitor running processes and their CPU, stack usage, priority and state
<a id="top_usage"></a>

### 使用
```
top [arguments...]
   once          print load only once
```
## ver
源码： [systemcmds/ver](https://github.com/PX4/Firmware/tree/master/src/systemcmds/ver)

Utility to check if USB is connected. Was previously used in startup scripts. A return value of 0 means USB is connected, 1 otherwise.
<a id="usb_connected_usage"></a>

### 使用
```
usb_connected [arguments...]
```
## ver
Source: [systemcmds/ver](https://github.com/PX4/Firmware/tree/master/src/systemcmds/ver)

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
