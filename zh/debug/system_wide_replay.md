---
canonicalUrl: https://docs.px4.io/main/zh/debug/system_wide_replay
---

# 全系统回放
Based on ORB messages, it's possible to record and replay arbitrary parts of the system.

Replay is useful to test the effect of different parameter values based on real data, compare different estimators, etc.

## 系统必备组件
The first thing that needs to be done is to identify the module or modules that should be replayed. Then, identify all the inputs to these modules, i.e. subscribed ORB topics. For system-wide replay, this consists of all hardware input: sensors, RC input, MAVLink commands and file system.

All identified topics need to be logged at full rate (see [logging](../log/logging.md)). For `ekf2` this is already the case with the default set of logged topics. For `ekf2` this is already the case with the default set of logged topics.

It is important that all replayed topics contain only a single absolute timestamp, which is the automatically generated field `timestamp`. Should there be more timestamps, then they must be relative with respect to the main timestamp. For an example, see [sensor_combined.msg](https://github.com/PX4/Firmware/blob/master/msg/sensor_combined.msg). Reasons for this are given below. Should there be more timestamps, then they must be relative with respect to the main timestamp. For an example, see [sensor_combined.msg](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_combined.msg). 造成这种情况的原因如下。


## 用法

- First, choose the file to replay, and build the target (from within the Firmware directory): sh export replay=<absolute_path_to_log_file.ulg> make px4_sitl_default This will create the output in a separate build directory
  ```sh
  export replay_mode=ekf2
  export replay=<abs_path_to_log.ulg>
  make px4_sitl none
  ```
  This will create the output in a separate build directory `build/px4_sitl_default_replay` (so that the parameters don't interfere with normal builds). `build/px4_sitl_default_replay` (so that the parameters don't interfere with normal builds). It's possible to choose any posix SITL build target for replay, the build system knows through the `replay` environment variable that it's in replay mode.
- Add ORB publisher rules file in `build/px4_sitl_default_replay/tmp/rootfs/orb_publisher.rules`. This file defines which module is allowed to publish which messages. It has the following format: 此文件定义允许了发布消息的模块。 It has the following format:
  ```
  It means that the given list of topics should only be published by <code><module></code> (which is the command name). Publications to any of these topics from another module are silently ignored. If <code>ignore_others</code> is <code>true</code>, then publications to other topics from <code><module></code> are ignored.
  ```
 (which is the command name). Publications to any of these topics from another module are silently ignored. If ignore_others is true, then publications to other topics from <module> are ignored.
  </code>
  It means that the given list of topics should only be published by `<module>` (which is the command name). Publications to any of these topics from another module are silently ignored. If `ignore_others` is `true`, then publications to other topics from `<module>` are ignored.

  For replay, we only want the `replay` module to be able to publish the previously identified list of topics. So for replaying `ekf2`, the rules file looks like this: So for replaying `ekf2`, the rules file looks like this:
  ```
  restrict_topics: sensor_combined, vehicle_gps_position, vehicle_land_detected
module: replay
ignore_others: true
  ```
  This allows that the modules, which usually publish these topics, don't need to be disabled for replay.

- Optional: setup parameter overrides in the file `build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt`. 此文件应包含 ` &lt;param_name&gt; &lt;value&gt; ` 的列表，例如：
  ```
  EKF2_GB_NOISE 0.001
  ```
  默认日志文件的所有参数将被使用。 When a parameter changed during recording, it will be changed as well at the right time during replay. A parameter in the `replay_params.txt` will override the value and changes to it from the log file will not be applied.
- Optional: copy `dataman` missions file from the SD card to the build directory. 一个任务的回放只有在必要的时候才进行。
- Start the replay:
  ```sh
  make px4_sitl_default jmavsim
  ```
  This will automatically open the log file, apply the parameters and start to replay. 一旦完成，将自动报告，进程也会退出。 This will automatically open the log file, apply the parameters and start to replay. Once done, it will be reported and the process can be exited. Then the newly generated log file can be analyzed, it has `_replayed` appended to its file name.

  Note that the above command will show the simulator as well, but depending on what is being replayed, it will not show what's actually going on. It's possible to connect via QGC and e.g. view the changing attitude during replay. It's possible to connect via QGC and e.g. view the changing attitude during replay.

- Finally, unset the environment variable, so that the normal build targets are used again:
  ```sh
  unset replay
  ```

### 重要提示

- 在重播过程中，将报告日志文件中的所有退出。 During replay, all dropouts in the log file are reported. These have a negative effect on replay and thus it should be taken care that dropouts are avoided during recording.
- It is currently only possible to replay in 'real-time', meaning as fast as the recording was done. This is planned to be extended in the future. 这项工作计划今后延长。
- A message that has a timestamp of 0 will be considered invalid and not be replayed.

## EKF2 回放

This is a specialization of the system-wide replay for fast EKF2 replay. It will automatically create the ORB publisher rules and works as following: It will automatically create the ORB publisher rules and works as following:

* （可选）将 `SDLOG_MODE` 设置为 1，从启动开始日志记录
* 记录日志
* 回放：

```
ulog_params -i $replay -d ' ' | grep -e '^EKF2' > build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt
```

您可以在有如下所示的输出后停止它：

```
INFO  [replay] Replay done (published 9917 msgs, 2.136 s)
```

参数也可以调整。 The parameters can be adjusted as well. They can be extracted from the log with \(install pyulog with `sudo pip install pyulog` first\):

```
Optional: setup parameter overrides in the file <code>build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt</code>. This file should contain a list of <code><param_name> <value></code>, like:
```
. This file should contain a list of <param_name> <value>, like:
</code>
Then edit the parameters in the file as needed and restart the replay process with `make px4_sitl none`. This will create a new log file. 这将创建一个新的日志文件。

生成的日志的位置打印为如下消息：

```
INFO  [logger] Opened log file: rootfs/fs/microsd/log/2017-03-01/13_30_51_replayed.ulg
```

完成后，使用 `unset replay; unset replay_mode` 退出回放模式。

## 后台

回放分为3个组件:
- 回放模块
- ORB 发布者规则
- 时间处理

The replay module reads the log and publishes the messages with the same speed as they were recorded. A constant offset is added to the timestamp of each message to match the current system time (this is the reason why all other timestamps need to be relative). The command `replay tryapplyparams` is executed before all other modules are loaded and applies the parameters from the log and user-set parameters. Then as the last command, `replay trystart` will again apply the parameters and start the actual replay. Both commands do nothing if the environment variable `replay` is not set. 将常量偏移量添加到每条消息的时间戳中，以匹配当前系统时间（这就是为什么所有其他时间戳都需要是相对的原因）。 命令 `replay tryapplyparms` 在加载所有其他模块之前执行，并应用日志和用户设置参数中的参数。 然后，作为最后一个命令，`replay trystart` 将再次应用参数并开始实际回放。 如果未设置环境变量 `replay`，则这两个命令不执行任何操作。

The ORB publisher rules allow to select which part of the system is replayed, as described above. They are only compiled for the posix SITL targets. 只编译 posix SITL 目标。

**time handling** 依然是个 **open point**， 尚未实现。
