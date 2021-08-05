# 로깅

로거는  ORB 주제의 모든 필드를 기록할 수 있습니다. 필요한 모든 것은 `.msg` 파일에서 생성되므로, 주제 이름만 지정하면 됩니다. 선택적 간격 매개변수는 특정 주제의 최대 로깅 속도를 지정합니다. 주제의 모든 기존 인스턴스가 기록됩니다.

출력 로그 형식은 [ULog](../dev_log/ulog_file_format.md) 입니다.

## 사용법
기본적으로, 로깅은 시동을 걸었을 때 시작하며, 제동 후 중지합니다. 새 로그 파일은 시동을 걸 때마다 SD 카드에 생성됩니다. 현재 상태를 표시하려면 콘솔에서 `logger status`명령을 사용하십시오. 로깅을 바로 시작하고 싶다면 `logger on` 명령을 내리십시오. 이 명령은 시동을 걸었을 때, 시동 동작보다 우선합니다. `logger off` 명령은 그 반대입니다.

사용법
```
logger help
```
을 활용하면 모든 지원 로거 명령과 매개변수 목록을 확인할 수 있습니다.


## 구성

로깅 시스템은 기본적으로 [비행 검토](http://logs.px4.io)에 사용할 로그를 수집합니다.

로깅은 [SD 로깅](../advanced_config/parameter_reference.md#sd-logging) 매개변수를 사용하여 설정할 수 있습니다. 변경할 가능성이 높은 매개변수가 아래에 설명되어 있습니다.

| 매개 변수                                                                    | 설명                                                                                                                                             |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | 로깅 모드는 로깅 시작 및 중지 시간을 정의합니다.<br />- `0`: 무장 해제 시까지 기록(기본값).<br />- `1`: 부팅에서 다음까지 기록 disarm.<br />- `2`: 부팅에서 종료될 때까지 기록합니다. |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | 로깅 프로파일. 자주 사용되지 않는 로깅/분석을 활성화하려면 이것을 사용하십시오(예: EKF2 재생, PID 및 필터 튜닝을 위한 고속 로깅, 열 온도 보정).                                                      |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | 아주 작은 추가 "미션 로그"를 만듭니다.<br>이 로그는 *비행 검토*와 함께 사용할 수 *없지만*, 위치 태그 지정 또는 규정 준수를 위해 작은 로그가 필요할 때 유용합니다.                                      |

:::note
*개발자*는 [로거](../modules/modules_system.md#logger) 모듈을 통해 기록되는 정보를 추가 설정할 수 있습니다(예: 자신의 주제를 기록하려는 경우 이 모듈을 사용). 자세한 내용은 [로깅](../dev_log/logging.md)을 참고하십시오. `<instance>`를 지정하려면, `<interval>`을 반드시 지정해야합니다.

### 진단SD 카드 설정

별도로 기록된 주제 목록은 SD 카드의 파일로 사용자가 정의할 수 있습니다. 주제 목록이 있는 카드에 `etc/logging/logger_topics.txt` 파일을 생성합니다(SITL의 경우 `build/px4_sitl_default/tmp/rootfs/fs/microsd/etc/logging/logger_topics).</p>

<pre><code><topic_name> <interval> <instance>
`</pre>
`<interval>`은 선택 사항이며, 지정된 경우 이 항목에 대해 기록된 두 메시지 사이의 최소 시간 간격(ms)을 정의합니다. 지정하지 않으면, 주제가 최대 속도로 기록됩니다.

`<instance>`은 선택 사항이며, 지정된 경우 기록할 인스턴스를 정의합니다. 지정하지 않으면, 토픽의 모든 인스턴스를 로깅합니다. `<instance>`를 지정하려면, `<interval>`을 반드시 지정하여야합니다. 0 값을 설정하면 최대 기록율로 지정할 수 있습니다.

이 파일의 주제는 기본적으로 기록된 모든 주제를 대체합니다.

예 :
```
sensor_accel 0 0
sensor_accel 100 1
sensor_gyro 200
sensor_mag 200 1
```
이 구성은 최대 속도에서 sensor_accel 0, 10Hz에서 sensor_accel 1, 5Hz에서 모든 sensor_gyro 인스턴스 및 5Hz에서 sensor_mag 1을 기록합니다.



## 스크립트
[pyulog](https://github.com/PX4/pyulog) 저장소에 로깅 파일을 분석하고 변환하는 여러 스크립트가 있습니다.


## 손실
로깅 드롭아웃은 바람직하지 않으며, 드롭아웃의 양에 영향을 미치는 몇 가지 요소가 있습니다.
- 테스트한 대부분의 SD 카드는 분당 여러 번 일시 중지되었습니다. 이는 기록 명령을 처리함에 있어 수 100ms 정도의 지연이 있음을 보여줍니다. 이런 현상으로 인해 그동안 기록 버퍼가 차면 손실을 유발합니다. (아래와 같이) SD 카드에 따라 영향을 받습니다.
- SD 카드를 포맷하면, 손실을 어느정도 예방할 수 있습니다.
- 로그 버퍼 크기를 늘리면 도움이 됩니다.
- 선택한 토픽에 대한 로깅 율을 줄이거나 필요없는 토픽을 로깅 목록에서 제거하십시오(`info.py`가 이 문제 해결에 도움됨).

## SD 카드

다음은 다양한 SD 카드에 대한 성능 테스트 결과입니다. 테스트는 Pixracer에서 수행되었습니다. 결과는 Pixhawk에도 적용됩니다.

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

태초로부터 지금까지 제대로 지원하는 로그 스트리밍 방법은 FMU에서 SD 카드를 활용하는 방법입니다. 그러나, 이 대안책으로, MAVLink로 동일한 로깅 데이터를 전송하는 로깅 스트리밍 방식이 있습니다. 이 방식은 FMU에 SD 카드 슬롯이 없을 경우(예: Intel® Aero Ready to Fly 드론)에 활용하거나, 단순히 SD 카드의 취급을 피하려 하고자 할 경우 진행할 수 있습니다.

필요 요소는 무선랜 연결처럼 초당 50KB를 제공할 수 있는 통신 수단입니다. 단일 클라이언트만 동시에 로그 스트리밍을 요청할 수 있습니다. 프로토콜에서 손실 패킷을 관리하기에 연결은 굳이 안정적이지 않아도 좋습니다.

ulog 스트리밍을 지원하는 클라이언트는 여러가지가 있습니다.:

## 로그 스트리밍

The traditional and still fully supported way to do logging is using an SD card on the FMU. However there is an alternative, log streaming, which sends the same logging data via MAVLink. This method can be used for example in cases where the FMU does not have an SD card slot (e.g. Intel® Aero Ready to Fly Drone) or simply to avoid having to deal with SD cards. Both methods can be used independently and at the same time.

The requirement is that the link provides at least ~50KB/s, so for example a WiFi link. And only one client can request log streaming at the same time. The connection does not need to be reliable, the protocol is designed to handle drops.

There are different clients that support ulog streaming:
- `mavlink_ulog_streaming.py` script in Firmware/Tools.
- QGroundControl: ![QGC 로그 스트리밍](../../assets/gcs/qgc-log-streaming.png)
- [MAVGCL](https://github.com/ecmnet/MAVGCL)

### Diagnostics
- 로그 실시간 전송을 시작하지 않았다면, `logger`를 실행 중인지(위 참고) 확인하고, 시작하는 동안 콘솔 출력을 살펴보십시오.
- If it still does not work, make sure that Mavlink 2 is used. `MAV_PROTO_VER` 매개변수 값을 2로 강제 설정하십시오.
- Log streaming uses a maximum of 70% of the configured mavlink rate (`-r` parameter). 더 큰 전송율이 필요하다면, 메세지가 사라집니다. 현재 MAVLink 패킷에서 로그가 차지하는 백분율은 `mavlink status` 명령으로 확인할 수 있습니다(이 예제에서는 1.8%).
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
  또한 `txerr` 값이 0에 머물러있는지 확인하십시오. 만약 이 값이 올라간다면, NuttX 전송 버퍼가 너무 작거나, 물리 링크 대역폭이 포화 상태이거나, 하드웨어가 데이터를 처리하기에 너무 느린 상황임을 의미합니다.
