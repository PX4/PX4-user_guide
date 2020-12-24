# 로깅

로거 프로그램은 어떤 ORB 주제에 대해서든 모든 내용을 넣어 기록할 수 있습니다. 필요한 모든 내용은 `.msg` 파일에서 만들기에, 토픽 이름만 정하면 됩니다. 추가 주기 매개변수에는 각 토픽별 최대 기록 주기를 지정합니다. 모든 토픽의 실존 인스턴스를 기록합니다.

출력 로그 형식은 [ULog](../dev_log/ulog_file_format.md) 입니다.

## 사용법
기본적으로, 로깅은 시동을 걸었을 때 시작하며, 제동 후 멈춥니다. 새 로그 파일은 시동을 걸 때마다 SD 카드에 만듭니다. 현재 상태를 표시하려면 콘솔에서 `logger status`명령을 활용하십시오. 로깅을 바로 시작하고 싶다면 `logger on` 명령을 내리십시오. 이 명령은 시동을 걸었을 때, 시동 동작보다 우선합니다. `logger off` 명령은 그 반대입니다.

다음 명령
```
logger help
```
을 활용하면 모든 지원 로거 명령과 매개변수 목록을 확인할 수 있습니다.


## 구성

SD 카드에 기록할 토픽 목록은 설정 파일로 개별 지정할 수 있습니다. SD 카드에 `etc/logging/logger_topics.txt` 파일을 만들어 토픽 목록을 넣으십시오(SITL용 파일은 `build/px4_sitl_default/tmp/rootfs/fs/microsd/etc/logging/logger_topics.txt`입니다).
```
<topic_name> <interval> <instance>
```
`<interval>` 항목은 선택 사항이나, 밀리초 단위로 이 토픽을 기록할 두 기록 내용 사이의 최소 간격 시간을 지정합니다. 지정하지 않으면, 토픽을 최대 기록율로 기록합니다.

`<instance>` 항목 역시 선택사항이나, 이 항목은 로그를 진행할 인스턴스를 지정합니다. 지정하지 않으면, 토픽의 모든 인스턴스를 로깅합니다. `<instance>`를 지정하려면, `<interval>`을 반드시 지정해야합니다. 0 값을 설정하면 최대 기록율로 지정할 수 있습니다.

이 파일에 들어간 토픽 목록은 기본 로깅 토픽 종류를 바꿉니다.

예 :
```
sensor_accel 0 0
sensor_accel 100 1
sensor_gyro 200
sensor_mag 200 1
```
This configuration will log sensor_accel 0 at full rate, sensor_accel 1 at 10Hz, all sensor_gyro instances at 5Hz and sensor_mag 1 at 5Hz.

## Scripts
There are several scripts to analyze and convert logging files in the [pyulog](https://github.com/PX4/pyulog) repository.


## Dropouts
Logging dropouts are undesired and there are a few factors that influence the amount of dropouts:
- Most SD cards we tested exhibit multiple pauses per minute. This shows itself as a several 100 ms delay during a write command. It causes a dropout if the write buffer fills up during this time. This effect depends on the SD card (see below).
- Formatting an SD card can help to prevent dropouts.
- Increasing the log buffer helps.
- Decrease the logging rate of selected topics or remove unneeded topics from being logged (`info.py <file>` is useful for this).

## SD Cards

The following provides performance results for different SD cards. Tests were done on a Pixracer; the results are applicable to Pixhawk as well.

:::note
The maximum supported SD card size for NuttX is 32GB (SD Memory Card Specifications Version 2.0).
:::

| SD Card                                                       | Mean Seq. Write Speed [KB/s] | Max Write Time / Block (average) [ms] |
| ------------------------------------------------------------- | ---------------------------- | ------------------------------------- |
| SanDisk Extreme U3 32GB                                       | 461                          | **15**                                |
| Sandisk Ultra Class 10 8GB                                    | 348                          | 40                                    |
| Sandisk Class 4 8GB                                           | 212                          | 60                                    |
| SanDisk Class 10 32 GB (High Endurance Video Monitoring Card) | 331                          | 220                                   |
| Lexar U1 (Class 10), 16GB High-Performance                    | 209                          | 150                                   |
| Sandisk Ultra PLUS Class 10 16GB                              | 196                          | 500                                   |
| Sandisk Pixtor Class 10 16GB                                  | 334                          | 250                                   |
| Sandisk Extreme PLUS Class 10 32GB                            | 332                          | 150                                   |

More important than the mean write speed is the maximum write time per block (of 4 KB). This defines the minimum buffer size: the larger this maximum, the larger the log buffer needs to be to avoid dropouts. Logging bandwidth with the default topics is around 50 KB/s, which all of the SD cards satisfy.

By far the best card we know so far is the **SanDisk Extreme U3 32GB**. This card is recommended, because it does not exhibit write time spikes (and thus virtually no dropouts). Different card sizes might work equally well, but the performance is usually different.

You can test your own SD card with `sd_bench -r 50`, and report the results to https://github.com/PX4/PX4-Autopilot/issues/4634.

## Log Streaming

The traditional and still fully supported way to do logging is using an SD card on the FMU. However there is an alternative, log streaming, which sends the same logging data via MAVLink. This method can be used for example in cases where the FMU does not have an SD card slot (e.g. Intel® Aero Ready to Fly Drone) or simply to avoid having to deal with SD cards. Both methods can be used independently and at the same time.

The requirement is that the link provides at least ~50KB/s, so for example a WiFi link. And only one client can request log streaming at the same time. The connection does not need to be reliable, the protocol is designed to handle drops.

There are different clients that support ulog streaming:
- `mavlink_ulog_streaming.py` script in Firmware/Tools.
- QGroundControl: ![QGC Log Streaming](../../assets/gcs/qgc-log-streaming.png)
- [MAVGCL](https://github.com/ecmnet/MAVGCL)

### Diagnostics
- If log streaming does not start, make sure the `logger` is running (see above), and inspect the console output while starting.
- If it still does not work, make sure that Mavlink 2 is used. Enforce it by setting `MAV_PROTO_VER` to 2.
- Log streaming uses a maximum of 70% of the configured mavlink rate (`-r` parameter). If more is needed, messages are dropped. The currently used percentage can be inspected with `mavlink status` (1.8% is used in this example):
  ```
  instance #0:
          GCS heartbeat:  160955 us ago
          mavlink chan: #0
          type:           GENERIC LINK OR RADIO
          flow control:   OFF
          rates:
          tx: 95.781 kB/s
          txerr: 0.000 kB/s
          rx: 0.021 kB/s
          rate mult: 1.000
          ULog rate: 1.8% of max 70.0%
          accepting commands: YES
          MAVLink version: 2
          transport protocol: UDP (14556)
  ```
  Also make sure `txerr` stays at 0. If this goes up, either the NuttX sending buffer is too small, the physical link is saturated or the hardware is too slow to handle the data.
