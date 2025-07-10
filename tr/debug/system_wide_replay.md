---
canonicalUrl: https://docs.px4.io/main/tr/debug/system_wide_replay
---

# System-wide Replay

Based on ORB messages, it's possible to record and replay arbitrary parts of the system.

Replay is useful to test the effect of different parameter values based on real data, compare different estimators, etc.

## Prerequisites

The first thing that needs to be done is to identify the module or modules that should be replayed. Then, identify all the inputs to these modules, i.e. subscribed ORB topics. For system-wide replay, this consists of all hardware input: sensors, RC input, MAVLink commands and file system.

All identified topics need to be logged at full rate (see [logging](../dev_log/logging.md)). For `ekf2` this is already the case with the default set of logged topics.

It is important that all replayed topics contain only a single absolute timestamp, which is the automatically generated field `timestamp`. Should there be more timestamps, then they must be relative with respect to the main timestamp. For an example, see [sensor_combined.msg](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/sensor_combined.msg). Reasons for this are given below.


## Usage

- First, choose the file to replay, and build the target (from within the PX4-Autopilot directory):

  ```sh
  export replay=<absolute_path_to_log_file.ulg>
  make px4_sitl_default
  ```
  This will create the output in a separate build directory `build/px4_sitl_default_replay` (so that the parameters don't interfere with normal builds). It's possible to choose any posix SITL build target for replay, the build system knows through the `replay` environment variable that it's in replay mode.
- Add ORB publisher rules file in `build/px4_sitl_default_replay/tmp/rootfs/orb_publisher.rules`. This file defines which module is allowed to publish which messages. It has the following format:
  ```
  restrict_topics: <topic1>, <topic2>, ..., <topicN>
  module: <module>
  ignore_others: <true/false>
  ```
  It means that the given list of topics should only be published by `<module>` (which is the command name). Publications to any of these topics from another module are silently ignored. If `ignore_others` is `true`, then publications to other topics from `<module>` are ignored.

  For replay, we only want the `replay` module to be able to publish the previously identified list of topics. So for replaying `ekf2`, the rules file looks like this:

  ```
  restrict_topics: sensor_combined, vehicle_gps_position, vehicle_land_detected
  module: replay
  ignore_others: true
  ```

  This allows that the modules, which usually publish these topics, don't need to be disabled for replay.

- Optional: setup parameter overrides in the file `build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt`. This file should contain a list of `<param_name> <value>`, like:

  ```
  EKF2_GB_NOISE 0.001
  ```

  By default, all parameters from the log file are applied. When a parameter changed during recording, it will be changed as well at the right time during replay. A parameter in the `replay_params.txt` will override the value and changes to it from the log file will not be applied.
- Optional: copy `dataman` missions file from the SD card to the build directory. Only necessary if a mission should be replayed.
- Start the replay:

  ```sh
  make px4_sitl_default jmavsim
  ```

  This will automatically open the log file, apply the parameters and start to replay. Once done, it will be reported and the process can be exited. Then the newly generated log file can be analyzed, it has `_replayed` appended to its file name.

  Note that the above command will show the simulator as well, but depending on what is being replayed, it will not show what's actually going on. It's possible to connect via QGC and e.g. view the changing attitude during replay.

- Finally, unset the environment variable, so that the normal build targets are used again:

  ```sh
  unset replay
  ```

### Important Notes

- During replay, all dropouts in the log file are reported. These have a negative effect on replay and thus it should be taken care that dropouts are avoided during recording.
- It is currently only possible to replay in 'real-time', meaning as fast as the recording was done. This is planned to be extended in the future.
- A message that has a timestamp of 0 will be considered invalid and not be replayed.

## EKF2 Replay

This is a specialization of the system-wide replay for fast EKF2 replay.

:::note
The recording and replay of flight logs with [multiple EKF instances](../advanced_config/tuning_the_ecl_ekf.md#running-multiple-ekf-instances) is not supported. To enable recording for EKF replay you must set the parameters to enable a [single EKF instance](../advanced_config/tuning_the_ecl_ekf.md#running-a-single-ekf-instance).
:::

It will automatically create the ORB publisher rules and works as following:

* Optionally set `SDLOG_MODE` to 1 to start logging from boot
* Record the log
* To replay:

```
export replay_mode=ekf2
export replay=<abs_path_to_log.ulg>
make px4_sitl none
```

You can stop it after there's an output like:

```
INFO  [replay] Replay done (published 9917 msgs, 2.136 s)
```

The parameters can be adjusted as well. They can be extracted from the log with the following \(install pyulog with `sudo pip install pyulog` first\):

```
ulog_params -i "$replay" -d ' ' | grep -e '^EKF2' > build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt
```

Then edit the parameters in the file as needed and restart the replay process with `make px4_sitl none`. This will create a new log file.

The location of the generated log is printed with a message like this:

```
INFO  [logger] Opened log file: rootfs/fs/microsd/log/2017-03-01/13_30_51_replayed.ulg
```

When finished, use `unset replay; unset replay_mode` to exit the replay mode.

## Behind the Scenes

Replay is split into 3 components:
- a replay module
- ORB publisher rules
- time handling

The replay module reads the log and publishes the messages with the same speed as they were recorded. A constant offset is added to the timestamp of each message to match the current system time (this is the reason why all other timestamps need to be relative). The command `replay tryapplyparams` is executed before all other modules are loaded and applies the parameters from the log and user-set parameters. Then as the last command, `replay trystart` will again apply the parameters and start the actual replay. Both commands do nothing if the environment variable `replay` is not set.

The ORB publisher rules allow to select which part of the system is replayed, as described above. They are only compiled for the posix SITL targets.

The **time handling** is still an **open point**, and needs to be implemented.
