---
canonicalUrl: https://docs.px4.io/main/ko/dev_log/logging
---

# 로깅

The [system logger](../modules/modules_system.md#logger) is able to log any ORB topic with all included fields. 필요한 모든 것은 `.msg` 파일에서 생성되므로, 주제 이름만 지정하면 됩니다. 선택적 간격 매개변수는 특정 주제의 최대 로깅 속도를 지정합니다. 주제의 모든 기존 인스턴스가 기록됩니다.

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

Separately, the list of logged topics can also be customized with a file on the SD card. 주제 목록이 있는 카드에 `etc/logging/logger_topics.txt` 파일을 생성합니다(SITL의 경우 `build/px4_sitl_default/tmp/rootfs/fs/microsd/etc/logging/logger_topics).</p>

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
NuttX에 지원되는 최대 SD 카드 크기는 32GB(SD 메모리 카드 사양 버전 2.0)입니다.
:::

| SD 카드                                                         | 평균 시퀀스 기록 속도 [KB/s] | 최대 기록 시간 / 블록 (평균) [ms] |
| ------------------------------------------------------------- | ------------------- | ----------------------- |
| SanDisk Extreme U3 32GB                                       | 461                 | **15**                  |
| Sandisk Ultra Class 10 8GB                                    | 348                 | 40                      |
| Sandisk Class 4 8GB                                           | 212                 | 60                      |
| SanDisk Class 10 32 GB (High Endurance Video Monitoring Card) | 331                 | 220                     |
| Lexar U1 (Class 10), 16GB High-Performance                    | 209                 | 150                     |
| Sandisk Ultra PLUS Class 10 16GB                              | 196                 | 500                     |
| Sandisk Pixtor Class 10 16GB                                  | 334                 | 250                     |
| Sandisk Extreme PLUS Class 10 32GB                            | 332                 | 150                     |

평균 쓰기 속도보다 더 중요한 것은 블록당 최대 쓰기 시간(4KB)입니다. 이것은 최소 버퍼 크기를 정의합니다. 이 최대값이 클수록 드롭아웃을 피하기 위하여 더 큰 로그 버퍼가 필요합니다. 기본 항목의 로깅 대역폭은 약 50KB/s로 모든 SD 카드가 충족합니다.

지금까지 우리가 알고 있는 최고의 SD 카드는 **SanDisk Extreme U3 32GB**입니다. 이 카드는 쓰기 시간 스파이크를 나타내지 않으므로(따라서 드롭아웃이 거의 없음) 권장됩니다. 다른 카드 크기도 똑같이 잘 작동할 수 있지만, 일반적으로 성능은 차이가 납니다.

`sd_bench -r 50`으로 자신의 SD 카드를 테스트하고, 결과를 https://github.com/PX4/PX4-Autopilot/issues/4634에 보고할 수 있습니다.

## 로그 스트리밍

로깅을 수행하는 전통적인 완벽한 방법은 FMU에서 SD 카드를 사용하는 것입니다. 그러나, MAVLink를 통하여 동일한 로깅 데이터를 보내는 대체 로그 스트리밍이 있습니다. 이 방법은 예를 들어 FMU에 SD 카드 슬롯이 없는 경우(예: Intel® Aero Ready to Fly Drone) 또는 단순히 SD 카드를 처리할 필요가 없는 경우에 사용할 수 있습니다. 두 방법 모두 독립적으로 동시에 사용할 수 있습니다.

요구 사항은 최소 ~50KB/s 네트웍 속도입니다(예: WiFi 링크). 그리고, 한 클라이언트만 동시에 로그 스트리밍을 요청할 수 있습니다. 연결이 안정적일 필요는 없으며, 프로토콜은 드롭을 처리하도록 설계되었습니다.

ulog 스트리밍을 지원하는 다양한 클라이언트가 있습니다.
- PX4-Autopilot/Tools의 `mavlink_ulog_streaming.py` 스크립트
- QGroundControl![QGC 로그 스트리밍 ](../../assets/gcs/qgc-log-streaming.png)
- [MAVGCL](https://github.com/ecmnet/MAVGCL)

### 진단
- 로그 실시간 전송을 시작하지 않았다면, `logger`를 실행 중인지(위 참고) 확인하고, 시작하는 동안 콘솔 출력을 살펴보십시오.
- 그래도 작동하지 않으면, MAVLink 2를 사용하고 있는지 확인하십시오. `MAV_PROTO_VER` 매개변수 값을 2로 강제 설정하십시오.
- 로그 스트리밍은 구성된 MAVLink 속도(`-r` 매개변수)의 최대 70%를 사용합니다. 더 큰 전송율이 요구되는 상황에서는, 메세지가 사라집니다. 현재 사용된 백분율은 `mavlink 상태`로 검사할 수 있습니다(이 예에서는 1.8%가 사용됨).
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
  또한 `txerr` 값이 0에 머물러있는지 확인하십시오. 만약 이 값이 올라간다면, NuttX 전송 버퍼가 너무 작거나, 물리 링크 대역폭이 포화 상태이거나, 하드웨어가 데이터를 처리하기에 너무 느린 상황을 의미합니다.
