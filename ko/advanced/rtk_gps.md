# RTK GPS (PX4 통합)

[실시간 운동 감지](https://en.wikipedia.org/wiki/Real_Time_Kinematic) (RTK)는 센티미터 단위의 GPS 정확도를 확보해줍니다. 이 페이지에서는 실시간 운동 감지 기능을 PX4에 결합하는 방법을 설명합니다.

실시간 운동 감지(RTK)는 신호 정보 내용 자체 보다는 신호 캐리어 파형의 위상 측정 값을 활용합니다.
:::

## 개요

PX4에 RTK를 설정하려면 RTK GPS 모듈 둘과 데이터 링크가 필요합니다. 고정 위치 지상 기반 GPS 장치를 *베이스*라 하고, 공중에 띄우는 장치를 *탐사선(Rover)*이라 합니다.

PX4에 RTK를 설정하려면 RTK GPS 모듈 둘과 데이터 링크가 필요합니다. 고정 위치 지상 기반 GPS 장치를 *베이스*라 하고, 공중에 띄우는 장치를 *탐사선(Rover)*이라 합니다. 베이스 장치는 *QGroundControl*에 (USB로) 연결하며 기체로 RTCM 메시지를 지속 송수신(MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) 메시지 활용)하도록 데이터링크를 활용합니다. autopilot에서는 MAVLink 패킷을 패키징 해제한 후 RTK 솔루션 획득을 처리할 수 있는 탐사선 유닛에 보냅니다.

PX4는 현재 RTK 용으로 단일 주파(L1) u-blox M8P 기반 GNSS 수신기만을 지원합니다.

## 지원 RTK GPS 모듈

PX4는 단일 주파(L1) u-blox M8P 기반 GNSS 수신기만을 RTK 기능용으로 지원합니다.

많은 제조사에서 이 수신기로 제품을 만들고 있습니다. [사용자 안내서](../gps_compass/rtk_gps.md#supported-rtk-devices)에서 우리가 시험 완료한 장치 목록을 찾아보실 수 있습니다.
:::

## 자동 설정

The PX4 GPS stack automatically sets up the GPS modules to send and receive the correct messages over the UART or USB, depending on where the module is connected (to *QGroundControl* or the autopilot).

QGroundControl은 RTK 베이스 스테이션을 설정하여 다음 RTCM3.2 프레임을 1초에 한번씩 출력합니다:

:::note
The u-blox U-Center RTK module configuration tool is not needed/used!
:::

RTCM 베이스 위치 메시지 (1005)는 22 바이트 길이를 가지며, 다른 메시지는 가시 범위의 위성 숫자와 위성 신호 수(그 중 하나는 M8P와 같은 장치의 L1 신호입니다)에 따라 다양한 길이를 가집니다. :::
:::

### RTCM 메시지

QGroundControl configures the RTK base station to output the following RTCM3.2 frames, each with 1 Hz, unless otherwise stated:

- **1005** - 안테나 참조 지점 값인 스테이션 좌표 XYZ 값(베이스 위치).
- **1077** - 전체 GPS 가상 범위, 캐리어 위상, 도플러 신호 세기 (고해상).
- **1087** - 전체 GLONASS 가상 범위, 캐리어 위상, 도플러 신호 세기 (고해상).
- **1230** - GLONASS code-phase biases.
- **1097** - Full Galileo pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)
- **1127** - Full BeiDou pseudo-ranges, carrier phases, Doppler and signal strength (high resolution)

## 상위 링크 데이터 전송율

The raw RTCM messages from the base are packed into a MAVLink `GPS_RTCM_DATA` message and sent over the datalink. The maximum length of each MAVLink message is 182 bytes. Depending on the RTCM message, the MAVLink message is almost never completely filled.

저대역 연결에서 바람직한 RTK 성능을 내려면 MAVLink 2 를 사용해야합니다. 텔레메트리 체인에서 MAVLink 2를 사용하는지를 확인해야합니다.

RTCM 베이스 위치 메시지 (1005)는 22 바이트 길이를 가지며, 다른 메시지는 가시 범위의 위성 숫자와 위성 신호 수(그 중 하나는 M8P와 같은 장치의 L1 신호입니다)에 따라 다양한 길이를 가집니다. 주어진 시간으로부터, 가시 범위 내 _최대_ 단일 무리 위성 수는 12개이며, 실제 상황에서는, 이론적으로 이들 위성 과의 상위 링크 데이터 전송률로서 초당 300 바이트면 충분합니다. This can lead to link saturation on low-bandwidth half-duplex telemetry modules (e.g. 3DR Telemetry Radios).

*MAVLink 1*를 사용한다면, (최대) 182 바이트 길이의 `GPS_RTCM_DATA` 메시지를 어떤 길이로든 모든 RTCM 메시지로 보냅니다. 결과적으로 평균 상위 링크 데이터 전송율은 초당 700 바이트 이상 즈음이어야 합니다.

*MAVLink 2*를 활용하면 `GPS_RTCM_DATA 메시지`에서 어떤 빈 영역이든 제거합니다. 결과적으로 상위 링크 요구 사항은 이론 값(~초당 300 바이트까지)에 동일하게 근접합니다.

:::tip
GCS와 텔레메트리 모듈에서 MAVLink 2를 지원하면, PX4에서 자동으로 MAVLink 2로 전환합니다. ::: You can verify the protocol version by using the `mavlink status` command on the system console:

```
nsh> mavlink status
instance #0:
        GCS heartbeat:  593486 us ago
        mavlink chan: #0
        type:           3DR RADIO
        rssi:           219
        remote rssi:    219
        txbuf:          94
        noise:          61
        remote noise:   58
        rx errors:      0
        fixed:          0
        flow control:   ON
        rates:
        tx: 1.285 kB/s
        txerr: 0.000 kB/s
        rx: 0.021 kB/s
        rate mult: 0.366
        accepting commands: YES
        MAVLink version: 2
        transport protocol: serial (/dev/ttyS1 @57600)
```
