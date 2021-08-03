# 시스템 전체 재생
ORB 메시지를 기반으로 시스템의 일정 부분을 기록하고 재생할 수 있습니다.

재생은 실제 데이터를 기반으로 다른 매개변수의 효과를 테스트하고 다른 추정기 비교에 유용합니다.

## 전제 조건
가장 먼저 해야 할 일은 재생 모듈을 식별하는 것입니다. 그런 다음 이 모듈에 대한 모든 입력, 즉 구독된 ORB 주제를 식별합니다. 시스템 전체 재생의 경우 센서, RC 입력, MAVLink 명령 및 파일 시스템과 같은 모든 하드웨어 입력으로 구성됩니다.

식별된 모든 주제는 최대 속도로 기록되어야 합니다([로깅](../dev_log/logging.md) 참조). `ekf2`의 경우 이는 이미 기록된 주제의 기본 집합에 해당됩니다.

재생된 모든 주제에는 자동으로 생성된 필드 `timestamp`인 단일 절대 타임스탬프만 포함되어야 합니다. 타임스탬프가 더 있는 경우 기본 타임스탬프와 관련하여 상대적이어야 합니다. 예는 [sensor_combined.msg](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_combined.msg)를 참고하십시오. 그 이유는 아래에서 설명합니다.


## 사용법

- 먼저 재생할 파일을 선택하고 대상을 빌드합니다(PX4-Autopilot 디렉토리 내에서).
  ```sh
  export replay=<absolute_path_to_log_file.ulg>
  make px4_sitl_default
  ```
  이것은 별도의 빌드 디렉토리에 출력을 생성합니다. `build/px4_sitl_default_replay`(매개변수가 일반 빌드를 방해하지 않도록). 재생을 위하여 posix SITL 빌드 대상을 선택할 수 있으며, 빌드 시스템은 `재생` 환경변수로 재생 모드임을 알 수 있습니다.
- ORB 게시자 규칙 파일을 `build/px4_sitl_default_replay/tmp/rootfs/orb_publisher.rules`에 추가합니다. 이 파일은 어떤 모듈이 어떤 메시지를 게시하는 지를 정의합니다. 형식은 다음과 같습니다.
  ```
  restrict_topics: <topic1>, <topic2>, ..., <topicN>
  module: <module>
  ignore_others: <true/false>
  ```
  주어진 주제 목록은 `<module>`(명령 이름)으로만 게시되는 것을 의미합니다. 다른 모듈에서 이러한 주제에 대한 발행은 자동으로 무시됩니다. `ignore_others`가 `true`이면, `<module>`의 다른 주제에 대한 발행은 무시됩니다.

  재생의 경우 `재생` 모듈만 이전에 식별된 주제 목록을 게시할 수 있기를 바랍니다. 따라서, `ekf2`를 재생하는 경우 규칙 파일은 다음과 같습니다.
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
- - Optional: copy `dataman` missions file from the SD card to the build directory. Only necessary if a mission should be replayed.
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

This is a specialization of the system-wide replay for fast EKF2 replay. It will automatically create the ORB publisher rules and works as following:

* Optionally set `SDLOG_MODE` to 1 to start logging from boot
* Record the log
* To replay:

```
ulog_params -i $replay -d ' ' | grep -e '^EKF2' > build/px4_sitl_default_replay/tmp/rootfs/replay_params.txt
```

You can stop it after there's an output like:

```
INFO  [replay] Replay done (published 9917 msgs, 2.136 s)
```

The parameters can be adjusted as well. They can be extracted from the log with \(install pyulog with `sudo pip install pyulog` first\):

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
