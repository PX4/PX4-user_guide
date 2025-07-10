---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_system
---

# 模块参考：系统

## battery_simulator
Source: [modules/simulator/battery_simulator](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/simulator/battery_simulator)


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
Source: [modules/battery_status](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/battery_status)


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
Source: [modules/camera_feedback](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/camera_feedback)


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
Source: [modules/commander](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/commander)


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
     mag|baro|accel|gyro|level|esc|airspeed Calibration type
     quick       Quick calibration (accel only, not recommended)

   check         Run preflight checks

   arm
     [-f]        Force arming (do not run preflight checks)

   disarm
     [-f]        Force disarming (disarm in air)

   takeoff

   land

   transition    VTOL transition

   mode          Change flight mode
     manual|acro|offboard|stabilized|altctl|posctl|auto:mission|auto:loiter|auto
                 :rtl|auto:takeoff|auto:land|auto:precland Flight mode

   pair

   lockdown
     on|off      Turn lockdown on or off

   set_ekf_origin
     lat, lon, alt Origin Latitude, Longitude, Altitude

   lat|lon|alt   Origin latitude longitude altitude

   poweroff      Power off board (if supported)

   stop

   status        print status info
```
## dataman
Source: [modules/dataman](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/dataman)


### 描述
该模块通过基于C语言的API以简单数据库的形式为系统的其他部分提供持续性存储功能。 支持多种后端：
- a file (eg. on the SD card)
- FLASH(需要飞控板支持)

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

   status        print status info If nothing is specified, a file
 'dataman' is used

   stop

   status        print status info
```
## dmesg
Source: [systemcmds/dmesg](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/dmesg)


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
Source: [modules/esc_battery](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/esc_battery)


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
## gyro_calibration
Source: [modules/gyro_calibration](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/gyro_calibration)


### 描述
源码：[drivers/heater](https://github.com/PX4/Firmware/tree/master/src/drivers/heater)


<a id="gyro_calibration_usage"></a>

### 描述
```
gyro_calibration <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## heater
Source: [modules/gyro_fft](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/gyro_fft)


### 描述


<a id="gyro_fft_usage"></a>

### 用法
```
gyro_fft <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## land_detector
Source: [drivers/heater](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/drivers/heater)


### 描述
源码：[modules/land_detector](https://github.com/PX4/Firmware/tree/master/src/modules/land_detector)

This task can be started at boot from the startup scripts by setting SENS_EN_THERMAL or via CLI.

<a id="heater_usage"></a>

### 实现
```
heater <command> [arguments...]
 land_detector <command> [arguments...]
 Commands:
   start         启动后台任务
     fixedwing|multicopter|vtol|ugv 选择飞机类型

   stop

   status        打印状态信息
```
## load_mon
Source: [modules/land_detector](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/land_detector)


### 用法
**ground_contact**: thrust setpoint and velocity in z-direction must be below a defined threshold for time GROUND_CONTACT_TRIGGER_TIME_US. When ground_contact is detected, the position controller turns off the thrust setpoint in body x and y. 当检测到 ground_contact 状态时，位置控制器将关闭机体 x 方向和 y 方向上的推力设定值。

### 描述
Every type is implemented in its own class with a common base class. 触发时间由变量 MAYBE_LAND_TRIGGER_TIME 定义。 当检测到 maybe_landed 状态时，位置控制器会将推理设定值设置为零。 A hysteresis and a fixed priority of each internal state determines the actual land_detector state.

#### 多旋翼的 Land Detector
**ground_contact**: thrust setpoint and velocity in z-direction must be below a defined threshold for time GROUND_CONTACT_TRIGGER_TIME_US. When ground_contact is detected, the position controller turns off the thrust setpoint in body x and y.

**maybe_landed**: it requires ground_contact together with a tighter thrust setpoint threshold and no velocity in the horizontal direction. The trigger time is defined by MAYBE_LAND_TRIGGER_TIME. When maybe_landed is detected, the position controller sets the thrust setpoint to zero.

源码：[modules/load_mon](https://github.com/PX4/Firmware/tree/master/src/modules/load_mon)

There are 2 environment variables used for configuration: `replay`, which must be set to an ULog file name - it's the log file to be replayed. The second is the mode, specified via `replay_mode`:

<a id="land_detector_usage"></a>

### 用法
```
land_detector <command> [arguments...]
 load_mon <command> [arguments...]
 Commands:
   start         启动后台任务

   stop

   status        打印状态信息
```
## logger
Source: [modules/load_mon](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/load_mon)


### 描述
源码：[modules/logger](https://github.com/PX4/Firmware/tree/master/src/modules/logger)

On NuttX it also checks the stack usage of each process and if it falls below 300 bytes, a warning is output, which will also appear in the log file.

<a id="load_mon_usage"></a>

### 实现
```
load_mon <command> [arguments...]
 Commands:
   start         Start the background task

   stop

   status        print status info
```
## logger
Source: [modules/logger](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/logger)


### 示例
System logger which logs a configurable set of uORB topics and system printf messages (`PX4_WARN` and `PX4_ERR`) to ULog files. These can be used for system and flight performance evaluation, tuning, replay and crash analysis.

It supports 2 backends:
- 文件：写入 ULog 文件到文件系统中（SD 卡）
- MAVLink: 通过 MAVLink 将 ULog 数据流传输到客户端上（需要客户端支持此方式）

模块的实现使用了两个线程：

In between there is a write buffer with configurable size (and another fixed-size buffer for the mission log). It should be large to avoid dropouts. 缓冲区应大到可以避免出现数据溢出。 It can be enabled and configured via SDLOG_MISSION parameter. The normal log is always a superset of the mission log.

### 用法
立刻开始记录日志的典型用法：
- The main thread, running at a fixed rate (or polling on a topic if started with -p) and checking for data updates
- 写入线程，将数据写入文件中、

In between there is a write buffer with configurable size (and another fixed-size buffer for the mission log). It should be large to avoid dropouts.

### 参数描述
Typical usage to start logging immediately:
```
logger on
```

Or if already running:
```
logger on
```

<a id="logger_usage"></a>

### 用法
```
logger <command> [arguments...]
 Commands:
   start
     [-m <val>]  Backend mode
                 values: file|mavlink|all, default: all
     [-x]        Enable/disable logging via Aux1 RC channel
     [-e]        Enable logging right after start until disarm (otherwise only
                 when armed)
     [-f]        Log until shutdown (implies -e)
     [-t]        Use date/time for naming log directories and files
     [-r <val>]  Log rate in Hz, 0 means unlimited rate
                 default: 280
     [-b <val>]  Log buffer size in KiB
                 default: 12
     [-p <val>]  Poll on a topic instead of running with fixed rate (Log rate
                 and topic intervals are ignored if this is set)
                 values: <topic_name>
     [-c <val>]  Log rate factor (higher is faster)
                 default: 1.0

   on            start logging now, override arming (logger must be running)

   off           stop logging now, override arming (logger must be running)

   stop

   status        print status info
```
## mag_bias_estimator
Source: [modules/mag_bias_estimator](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/mag_bias_estimator)


### 参数描述
Online magnetometer bias estimator.

<a id="mag_bias_estimator_usage"></a>

### 实现
```
mag_bias_estimator <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## replay
Source: [modules/manual_control](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/manual_control)


### 用法
Module consuming manual_control_inputs publishing one manual_control_setpoint.


<a id="manual_control_usage"></a>

### 参数描述
```
manual_control <command> [arguments...]
 replay <command> [arguments...]
 Commands:
   start         Start replay, using log file from ENV variable 'replay'

   trystart      Same as 'start', but silently exit if no log file given

   tryapplyparams Try to apply the parameters from the log file

   stop

   status        print status info
```
## microdds_client
Source: [modules/microdds_client](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/microdds_client)


### Description
MicroDDS Client used to communicate uORB topics with an Agent over serial or UDP.

### Examples
```
microdds_client start -t serial -d /dev/ttyS3 -b 921600
microdds_client start -t udp -h 127.0.0.1 -p 15555
```

<a id="microdds_client_usage"></a>

### 用法
```
microdds_client <command> [arguments...]
 Commands:
   start
     [-t <val>]  Transport protocol
                 values: serial|udp, default: udp
     [-d <val>]  serial device
                 values: <file:dev>
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 0
     [-h <val>]  Host IP
                 values: <IP>, default: 127.0.0.1
     [-p <val>]  Remote Port
                 default: 15555
     [-l]        Restrict to localhost (use in combination with
                 ROS_LOCALHOST_ONLY=1)

   stop

   status        print status info
```
## netman
Source: [systemcmds/netman](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/netman)


  ### Description Network configuration manager saves the network settings in non-volatile memory. On boot the `update` option will be run. If a network configuration does not exist. The default setting will be saved in non-volatile and the system rebooted. On Subsequent boots, the `update` option will check for the existence of `net.cfg` in the root of the SD Card.  It will saves the network settings from `net.cfg` in non-volatile memory, delete the file and reboot the system.

  The `save` option will `net.cfg` on the SD Card. Use this to edit the settings. The  `show` option will display the network settings  to the console.

  ### Examples $ netman save           # Save the parameters to the SD card. $ netman show           # display current settings. $ netman update -i eth0 # do an update

<a id="netman_usage"></a>

### Usage
```
netman <command> [arguments...]
 Commands:
   show          Display the current persistent network settings to the console.

   update        Check SD card for net.cfg and update network persistent network
                 settings.

   save          Save the current network parameters to the SD card.
     [-i <val>]  Set the interface name
                 default: eth0
```
## pwm_input
Source: [drivers/pwm_input](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/drivers/pwm_input)


### Description
Measures the PWM input on AUX5 (or MAIN5) via a timer capture ISR and publishes via the uORB 'pwm_input` message.


<a id="pwm_input_usage"></a>

### 用法
```
pwm_input <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## rc_update
Source: [modules/rc_update](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/rc_update)


### 参数描述
The rc_update module handles RC channel mapping: read the raw input channels (`input_rc`), then apply the calibration, map the RC channels to the configured channels & mode switches and then publish as `rc_channels` and `manual_control_input`.

### Implementation
To reduce control latency, the module is scheduled on input_rc publications.


<a id="rc_update_usage"></a>

### Usage
```
rc_update <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## replay
Source: [modules/replay](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/replay)


### Description
This module is used to replay ULog files.

There are 2 environment variables used for configuration: `replay`, which must be set to an ULog file name - it's the log file to be replayed. The second is the mode, specified via `replay_mode`:
- `replay_mode=ekf2`: 指定 EKF2 回放模式。 `replay_mode=ekf2`: specific EKF2 replay mode. It can only be used with the ekf2 module, but allows the replay to run as fast as possible.
- Generic otherwise: this can be used to replay any module(s), but the replay will be done with the same speed as the log was recorded.

The module is typically used together with uORB publisher rules, to specify which messages should be replayed. The replay module will just publish all messages that are found in the log. It also applies the parameters from the log.

The replay procedure is documented on the [System-wide Replay](https://dev.px4.io/master/en/debug/system_wide_replay.html) page.

<a id="replay_usage"></a>

### Usage
```
replay <command> [arguments...]
 Commands:
   start         Start replay, using log file from ENV variable 'replay'

   trystart      Same as 'start', but silently exit if no log file given

   tryapplyparams Try to apply the parameters from the log file

   stop

   status        print status info
```
## send_event
Source: [modules/events](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/events)


### Description
Background process running periodically on the LP work queue to perform housekeeping tasks. It is currently only responsible for tone alarm on RC Loss.

The tasks can be started via CLI or uORB topics (vehicle_command from MAVLink, etc.).

<a id="send_event_usage"></a>

### Usage
```
send_event <command> [arguments...]
 Commands:
   start         Start the background task

   stop

   status        print status info
```
## sensor_baro_sim
Source: [modules/simulator/sensor_baro_sim](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/simulator/sensor_baro_sim)


### Description



<a id="sensor_baro_sim_usage"></a>

### Usage
```
sensor_baro_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensor_gps_sim
Source: [modules/simulator/sensor_gps_sim](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/simulator/sensor_gps_sim)


### Description



<a id="sensor_gps_sim_usage"></a>

### Usage
```
sensor_gps_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensor_mag_sim
Source: [modules/simulator/sensor_mag_sim](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/simulator/sensor_mag_sim)


### Description



<a id="sensor_mag_sim_usage"></a>

### Usage
```
sensor_mag_sim <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sensors
Source: [modules/sensors](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/sensors)


### Description
The sensors module is central to the whole system. It takes low-level output from drivers, turns it into a more usable form, and publishes it for the rest of the system.

The provided functionality includes:
- 读取传感器驱动的输出 (例如，`sensor_gyro` 等)。 如果存在多个同类型传感器，那个模块将进行投票和容错处理。 然后应用飞控板的旋转和温度校正（如果被启用）。 最终发布传感器数据：其中名为 `sensor_combined` 的主题被系统的许多部件所使用。
- Make sure the sensor drivers get the updated calibration parameters (scale & offset) when the parameters change or on startup. The sensor drivers use the ioctl interface for parameter updates. For this to work properly, the sensor drivers must already be running when `sensors` is started. 传感器驱动使用 ioctl 接口获取参数更新。 为了使这一功能正常运行，当 `sensors` 模块启动时传感器驱动必须已经处于运行状态。
- Do preflight sensor consistency checks and publish the `sensor_preflight` topic.

### Implementation
It runs in its own thread and polls on the currently selected gyro topic.


<a id="sensors_usage"></a>

### Usage
```
sensors <command> [arguments...]
 Commands:
   start
     [-h]        Start in HIL mode

   stop

   status        print status info
```
## tattu_can
Source: [drivers/tattu_can](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/drivers/tattu_can)


### Description
Driver for reading data from the Tattu 12S 16000mAh smart battery.


<a id="tattu_can_usage"></a>

### Usage
```
tattu_can <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## temperature_compensation
Source: [modules/temperature_compensation](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/temperature_compensation)


### Description
The temperature compensation module allows all of the gyro(s), accel(s), and baro(s) in the system to be temperature compensated. The module monitors the data coming from the sensors and updates the associated sensor_correction topic whenever a change in temperature is detected. The module can also be configured to perform the coeffecient calculation routine at next boot, which allows the thermal calibration coeffecients to be calculated while the vehicle undergoes a temperature cycle.


<a id="temperature_compensation_usage"></a>

### Usage
```
temperature_compensation <command> [arguments...]
 Commands:
   start         Start the module, which monitors the sensors and updates the
                 sensor_correction topic

   calibrate     Run temperature calibration process
     [-g]        calibrate the gyro
     [-a]        calibrate the accel
     [-b]        calibrate the baro (if none of these is given, all will be
                 calibrated)

   stop

   status        print status info
```
## tune_control
Source: [systemcmds/tune_control](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/tune_control)


### Description

Command-line tool to control & test the (external) tunes.

Tunes are used to provide audible notification and warnings (e.g. when the system arms, gets position lock, etc.). The tool requires that a driver is running that can handle the tune_control uorb topic.

Information about the tune format and predefined system tunes can be found here: https://github.com/PX4/Firmware/blob/master/src/lib/tunes/tune_definition.desc

### Examples

Play system tune #2:
```
tune_control play -t 2
```

<a id="tune_control_usage"></a>

### Usage
```
tune_control <command> [arguments...]
 Commands:
   play          Play system tune or single note.
     error       Play error tune
     [-t <val>]  Play predefined system tune
                 default: 1
     [-f <val>]  Frequency of note in Hz (0-22kHz)
     [-d <val>]  Duration of note in us
     [-s <val>]  Volume level (loudness) of the note (0-100)
                 default: 40
     [-m <val>]  Melody in string form
                 values: <string> - e.g. "MFT200e8a8a"

   libtest       Test library

   stop          Stop playback (use for repeated tunes)
```
## work_queue
Source: [systemcmds/work_queue](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/systemcmds/work_queue)


### Description

Command-line tool to show work queue status.


<a id="work_queue_usage"></a>

### Usage
```
work_queue <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
