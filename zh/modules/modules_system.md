# 模块参考：系统

## battery_simulator
Source: [modules/simulator/battery_simulator](https://github.com/PX4/Firmware/tree/master/src/modules/simulator/battery_simulator)


### 描述

<a id="battery_simulator_usage"></a>

### 用法
```
battery_simulator <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## battery_status
Module to provide persistent storage for the rest of the system in form of a simple database through a C API. Multiple backends are supported:


### 描述

模块提供的功能包括：
- 从 ADC 驱动读取电池状态（通过 ioctl 接口），并且发布到主题 `battery_status`。


### 实现
模块运行在它自己的线程中，并轮询当前选定的陀螺仪主题。

<a id="battery_status_usage"></a>

### 用法
```
battery_status <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## camera_feedback
**DM_KEY_FENCE_POINTS** and **DM_KEY_SAFE_POINTS** items: the first data element is a `mission_stats_entry_s` struct, which stores the number of items for these types. These items are always updated atomically in one transaction (from the mavlink mission manager). During that time, navigator will try to acquire the geofence item lock, fail, and will not check for geofence violations.


### 描述

<a id="camera_feedback_usage"></a>

### 用法
```
camera_feedback <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## commander
源码： [modules/commander](https://github.com/PX4/Firmware/tree/master/src/modules/commander)


### 描述
该模块包含飞行模式切换和失效保护状态机。

<a id="commander_usage"></a>

### 描述
```
commander <command> [arguments...]
 Commands:
   start
     [-h]        Enable HIL mode

   calibrate     Run sensor calibration
     mag|accel|gyro|level|esc|airspeed Calibration type
     quick       Quick calibration (accel only, not recommended)

   check         Run preflight checks

   arm
     [-f]        Force arming (do not run preflight checks)

   disarm

   takeoff

   land

   transition    VTOL transition

   mode          Change flight mode
     manual|acro|offboard|stabilized|rattitude|altctl|posctl|auto:mission|auto:l
                 oiter|auto:rtl|auto:takeoff|auto:land|auto:precland Flight mode

   lockdown
     [off]       Turn lockdown off

   stop

   status        print status info
```
## dataman
源码： [modules/dataman](https://github.com/PX4/Firmware/tree/master/src/modules/dataman)


### 描述
该模块通过基于C语言的API以简单数据库的形式为系统的其他部分提供持续性存储功能。 支持多种后端：
- a file (eg. on the SD card)
- FLASH(需要飞控板支持)
- FRAM
- RAM(暂时性的存储)

It is used to store structured data of different types: mission waypoints, mission state and geofence polygons. Each type has a specific type and a fixed maximum amount of storage items, so that fast random access is possible. 每种类型的数据都有一个特定的类型和一个固定的最大存储条目的数量，因此可以实现对数据的快速随机访问。

### 实现
单个数据的读取和写入是原子操作。 Reading and writing a single item is always atomic. If multiple items need to be read/modified atomically, there is an additional lock per item type via `dm_lock`.

**DM_KEY_FENCE_POINTS** and **DM_KEY_SAFE_POINTS** items: the first data element is a `mission_stats_entry_s` struct, which stores the number of items for these types. 这些项在每一次通讯过程中都会进行原子更新(与mavlink 任务管理器)。 在程序运行时，导航模块会尝试去锁定地理围栏，如果失败的话，就不会去检查是否越界了地理围栏。

<a id="dataman_usage"></a>

### 用法
```
dataman <command> [arguments...]
 dataman <command> [arguments...]
 Commands:
   start
     [-f <val>]  Storage file
                 values: <file>
     [-r]        Use RAM backend (NOT persistent)
     [-i]        Use FLASH backend

 The options -f, -r and -i are mutually exclusive. If nothing is specified, a
 file 'dataman' is used

   poweronrestart Restart dataman (on power on)

   inflightrestart Restart dataman (in flight)

   stop

   status        print status info 如果未指定后端，
那么就默认使用文件 'dataman' 

   poweronrestart 重启 dataman (处于开机 power on 状态时)

   inflightrestart 重启 dataman (处于飞行状态时)

   stop

   status        打印状态信息
```
## dmesg
**maybe_landed**: it requires ground_contact together with a tighter thrust setpoint threshold and no velocity in the horizontal direction. The trigger time is defined by MAYBE_LAND_TRIGGER_TIME. When maybe_landed is detected, the position controller sets the thrust setpoint to zero.


### 示例

用于显示启动控制台消息的命令行工具 需要注意的是，NuttX系统的工作队列和系统日志输出都未被捕捉到。

### 示例

持续在后台打印所有消息。
```
dmesg -f &
```

<a id="dmesg_usage"></a>

### 描述
```
dmesg <command> [arguments...]
 Commands:
     [-f]        Follow: wait for new messages
```
## esc_battery
Source: [modules/esc_battery](https://github.com/PX4/Firmware/tree/master/src/modules/esc_battery)


### 描述
Background process running periodically with 1 Hz on the LP work queue to calculate the CPU load and RAM usage and publish the `cpuload` topic.

<a id="esc_battery_usage"></a>

### 描述
```
esc_battery <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## gyro_fft
On NuttX it also checks the stack usage of each process and if it falls below 300 bytes, a warning is output, which will also appear in the log file.


### 描述

<a id="gyro_fft_usage"></a>

### 描述
```
gyro_fft <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## heater
源码：[drivers/heater](https://github.com/PX4/Firmware/tree/master/src/drivers/heater)


### 描述
这个模块将以后台进程的形式在低优先级工作队列中周期性运行，从而实现将 IMU 的温度调节到设定值。

通过设置 SENS_EN_THERMAL 参数或者命令行接口，可以使得该任务在运行启动脚本时就开始工作。

<a id="heater_usage"></a>

### 用法
```
heater <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## land_detector
源码：[modules/land_detector](https://github.com/PX4/Firmware/tree/master/src/modules/land_detector)


### 描述
Module to detect the freefall and landed state of the vehicle, and publishing the `vehicle_land_detected` topic. Each vehicle type (multirotor, fixedwing, vtol, ...) provides its own algorithm, taking into account various states, such as commanded thrust, arming state and vehicle motion. 每一个类型的无人机（多旋翼， vtol，...）都有各自的检测算法，该算法会考虑无人机的多种状态，例如指令推力、解锁状态、飞机运动状态等。

### 实现
每一类都是基于一个公共的基类在各自独有的类中完成模块的实现。 Every type is implemented in its own class with a common base class. The base class maintains a state (landed, maybe_landed, ground_contact). Each possible state is implemented in the derived classes. A hysteresis and a fixed priority of each internal state determines the actual land_detector state. 每一个可能的状态都在衍生出的子类中进行了实现。 每个内部状态的迟滞和固定优先级共同决定着实际的 land_detector 的状态。

#### 多旋翼的 Land Detector
**ground_contact**: thrust setpoint and velocity in z-direction must be below a defined threshold for time GROUND_CONTACT_TRIGGER_TIME_US. When ground_contact is detected, the position controller turns off the thrust setpoint in body x and y. 当检测到 ground_contact 状态时，位置控制器将关闭机体 x 方向和 y 方向上的推力设定值。

**maybe_landed**: it requires ground_contact together with a tighter thrust setpoint threshold and no velocity in the horizontal direction. 触发时间由变量 MAYBE_LAND_TRIGGER_TIME 定义。 当检测到 maybe_landed 状态时，位置控制器会将推理设定值设置为零。

**landed**: it requires maybe_landed to be true for time LAND_DETECTOR_TRIGGER_TIME_US.

该模块在 HP 工作队列中周期性运行。

<a id="land_detector_usage"></a>

### 用法
```
land_detector <command> [arguments...]
 land_detector <command> [arguments...]
 Commands:
   start         启动后台任务
     fixedwing|multicopter|vtol|ugv 选择飞机类型

   stop

   status        打印状态信息
```
## load_mon
源码：[modules/load_mon](https://github.com/PX4/Firmware/tree/master/src/modules/load_mon)


### 描述
There are 2 environment variables used for configuration: `replay`, which must be set to an ULog file name - it's the log file to be replayed. The second is the mode, specified via `replay_mode`:

The module is typically used together with uORB publisher rules, to specify which messages should be replayed. The replay module will just publish all messages that are found in the log. It also applies the parameters from the log.

<a id="load_mon_usage"></a>

### 用法
```
load_mon <command> [arguments...]
 load_mon <command> [arguments...]
 Commands:
   start         启动后台任务

   stop

   status        打印状态信息
```
## logger
源码：[modules/logger](https://github.com/PX4/Firmware/tree/master/src/modules/logger)


### 描述
System logger which logs a configurable set of uORB topics and system printf messages (`PX4_WARN` and `PX4_ERR`) to ULog files. These can be used for system and flight performance evaluation, tuning, replay and crash analysis. 该日志文件可用于系统性能和飞行表现的评估、调参、回放和事故分析。

该模块支持 2 个后端：
- 文件：写入 ULog 文件到文件系统中（SD 卡）
- MAVLink: 通过 MAVLink 将 ULog 数据流传输到客户端上（需要客户端支持此方式）

两种后端可同时启用。

The file backend supports 2 types of log files: full (the normal log) and a mission log. The mission log is a reduced ulog file and can be used for example for geotagging or vehicle management. It can be enabled and configured via SDLOG_MISSION parameter. The normal log is always a superset of the mission log. 任务日志是一个精简的 ulog 文件，可用于地理标记或者无人机管理等用途。 可使用 SDLOG_MISSION 参数来启用和配置记录任务日志。 标准日志始终是任务日志的父集。

### 实现
模块的实现使用了两个线程：
- The main thread, running at a fixed rate (or polling on a topic if started with -p) and checking for data updates
- 写入线程，将数据写入文件中、

In between there is a write buffer with configurable size (and another fixed-size buffer for the mission log). It should be large to avoid dropouts. 缓冲区应大到可以避免出现数据溢出。

### 示例
立刻开始记录日志的典型用法：
```
logger start -e -t
```

或者当模块已经在运行时：
```
logger on
```

<a id="logger_usage"></a>

### 用法
```
logger <command> [arguments...]
 logger <command> [arguments...]
 Commands:
   start
     [-m <val>]  Backend mode
                 values: file|mavlink|all, default: all
     [-e]        Enable logging right after start until disarm (otherwise only
                 when armed)
     [-f]        Log until shutdown (implies -e)
     [-t]        Use date/time for naming log directories and files
     [-r <val>]  Log rate in Hz, 0 means unlimited rate
                 default: 280
     [-b <val>]  Log buffer size in KiB
                 default: 12
     [-q <val>]  uORB queue size for mavlink mode
                 default: 14
     [-p <val>]  Poll on a topic instead of running with fixed rate (Log rate
                 and topic intervals are ignored if this is set)
                 values: <topic_name>

   on            start logging now, override arming (logger must be running)

   off           stop logging now, override arming (logger must be running)

   stop

   status        print status info
```
## pwm_input
Source: [drivers/pwm_input](https://github.com/PX4/Firmware/tree/master/src/drivers/pwm_input)


### 参数描述
Tunes are used to provide audible notification and warnings (e.g. when the system arms, gets position lock, etc.). The tool requires that a driver is running that can handle the tune_control uorb topic.

<a id="pwm_input_usage"></a>

### 用法
```
pwm_input <command> [arguments...]
 Commands:
   start

   test          prints PWM capture info.

   stop          停止设备

   status        打印状态信息
```
## rc_update
Information about the tune format and predefined system tunes can be found here: https://github.com/PX4/Firmware/blob/master/src/lib/tunes/tune_definition.desc


### 参数描述
Do RC channel mapping: read the raw input channels (`input_rc`), then apply the calibration, map the RC channels to the configured channels & mode switches, low-pass filter, and then publish as `rc_channels` and `manual_control_setpoint`.

### 实现
To reduce control latency, the module is scheduled on input_rc publications.

<a id="rc_update_usage"></a>

### 用法
```
rc_update <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## replay
源码： [modules/replay](https://github.com/PX4/Firmware/tree/master/src/modules/replay)


### 参数描述
此模块用于回放 ULog 文件。

共有两个需要进行配置的环境变量： `replay` ，必须被设置为 ULog 文件名 - 也就是需要进行回放的日志文件。 第二个则是通过 `replay_mode` 变量对回放模式进行设定：
- `replay_mode=ekf2`: 指定 EKF2 回放模式。 `replay_mode=ekf2`: specific EKF2 replay mode. It can only be used with the ekf2 module, but allows the replay to run as fast as possible.
- Generic otherwise: this can be used to replay any module(s), but the replay will be done with the same speed as the log was recorded.

该模块通常与 uORB 发布者规则配合使用以指定需要进行回放的消息。 都则的话回放模块将直接发布所有在日志中找到的消息。 这也适用于在日志文件爱你中记录的各参数。

The replay procedure is documented on the [System-wide Replay](https://dev.px4.io/en/debug/system_wide_replay.html) page.

<a id="replay_usage"></a>

### 用法
```
replay <command> [arguments...]
 replay <command> [arguments...]
 Commands:
   start         Start replay, using log file from ENV variable 'replay'

   trystart      Same as 'start', but silently exit if no log file given

   tryapplyparams Try to apply the parameters from the log file

   stop

   status        print status info
```
## send_event
源码： [modules/events](https://github.com/PX4/Firmware/tree/master/src/modules/events)


### 参数描述
此模块将以后台进程形式在 LP 工作列队中周期性运行，以执行内部管理任务。 Background process running periodically on the LP work queue to perform housekeeping tasks. It is currently only responsible for temperature calibration and tone alarm on RC Loss.

这些任务可以通过 CLI 命令行或者 uORB 话题（例如，来自 MAVLink 的 vehicle_command）进行启动。

<a id="send_event_usage"></a>

### 用法
```
send_event <command> [arguments...]
 load_mon <command> [arguments...]
 Commands:
   start         启动后台任务

   stop

   status        打印状态信息
```
## sensors
源码： [modules/sensors](https://github.com/PX4/Firmware/tree/master/src/modules/sensors)


### 参数描述
Sensors 模块是整个系统的核心。 The sensors module is central to the whole system. It takes low-level output from drivers, turns it into a more usable form, and publishes it for the rest of the system.

模块提供的功能包括：
- 读取传感器驱动的输出 (例如，`sensor_gyro` 等)。 如果存在多个同类型传感器，那个模块将进行投票和容错处理。 然后应用飞控板的旋转和温度校正（如果被启用）。 最终发布传感器数据：其中名为 `sensor_combined` 的主题被系统的许多部件所使用。
- Make sure the sensor drivers get the updated calibration parameters (scale & offset) when the parameters change or on startup. The sensor drivers use the ioctl interface for parameter updates. For this to work properly, the sensor drivers must already be running when `sensors` is started. 传感器驱动使用 ioctl 接口获取参数更新。 为了使这一功能正常运行，当 `sensors` 模块启动时传感器驱动必须已经处于运行状态。
- Do preflight sensor consistency checks and publish the `sensor_preflight` topic.

### 实现
模块运行在它自己的线程中，并轮询当前选定的陀螺仪主题。

<a id="sensors_usage"></a>

### 用法
```
sensors <command> [arguments...]
 sensors <command> [arguments...]
 Commands:
   start
     [-h]        在 HIL 模式下启动

   stop

   status        打印状态信息
```
## temperature_compensation
Source: [modules/temperature_compensation](https://github.com/PX4/Firmware/tree/master/src/modules/temperature_compensation)


### 参数描述
The temperature compensation module allows all of the gyro(s), accel(s), and baro(s) in the system to be temperature compensated. The module monitors the data coming from the sensors and updates the associated sensor_correction topic whenever a change in temperature is detected. The module can also be configured to perform the coeffecient calculation routine at next boot, which allows the thermal calibration coeffecients to be calculated while the vehicle undergoes a temperature cycle.

<a id="temperature_compensation_usage"></a>

### 用法
```
temperature_compensation <command> [arguments...]
 send_event <command> [arguments...]
 Commands:
   start         Start the background task

   temperature_calibration Run temperature calibration process
     [-g]        calibrate the gyro
     [-a]        calibrate the accel
     [-b]        calibrate the baro (if none of these is given, all will be
                 calibrated)

   stop

   status        print status info
```
## tune_control
源码：[systemcmds/tune_control](https://github.com/PX4/Firmware/tree/master/src/systemcmds/tune_control)


### 参数描述

控制 & 测试（外置）蜂鸣器的命令行工具。

蜂鸣器被用于提供听觉通知和警告（例如，系统解锁、位置锁定等）。 本工具要求一个可处理 tune_control uorb 主题的驱动处于运行状态。

有关音调格式和预定义的系统蜂鸣声音可以参阅： https://github.com/PX4/Firmware/blob/master/src/lib/tunes/tune_definition.desc

### 示例

播放系统蜂鸣声 #2 ：
```
tune_control play -t 2
```

<a id="tune_control_usage"></a>

### 用法
```
tune_control <command> [arguments...]
 Commands:
   play          Play system tune or single note.
     tune_control <command> [arguments...]
 Commands:
   play          Play system tune, tone, or melody
     [-t <val>]  Play predefined system tune
                 default: 1
     [-f <val>]  Frequency of tone in Hz (0-22kHz)
                 default: 0
     [-d <val>]  Duration of tone in us
                 default: 1
     [-s <val>]  Strength of tone (0-100)
                 default: 40
     [-m <val>]  Melody in string form
                 values: <string> - e.g. "MFT200e8a8a"

   libtest       Test library

   stop          Stop playback (use for repeated tunes)
```
## work_queue
Source: [systemcmds/work_queue](https://github.com/PX4/Firmware/tree/master/src/systemcmds/work_queue)


### 参数描述

用于显示工作队列状态的命令行工具。

<a id="work_queue_usage"></a>

### 用法
```
work_queue <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
