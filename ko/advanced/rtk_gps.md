# RTK GPS (PX4 통합)

[실시간 운동학](https://en.wikipedia.org/wiki/Real_Time_Kinematic)(RTK)은 센티미터 수준의 GPS 정확도를 제공합니다. RTK와 PX4 통합 방법을 설명합니다.

:::tip RTK
GPS *사용법*은 [주변장치 > RTK GPS](../gps_compass/rtk_gps.md)를 참고하십시오.
:::

## 개요

RTK는 신호 보다는 신호의 반송파 위상을 사용합니다. 여러 모바일 스테이션에서 실시간 수정을 제공하기 위하여 단일 참조 스테이션에 의존합니다.

PX4로 RTK를 설정에는 2개의 RTK GPS 모듈과 데이터 링크가 필요합니다. 고정 위치 지상 기반 GPS 장치를 *베이스*라고 하며, 공중에 있는 장치를 *로버*라고 합니다. 베이스는 USB로 *QGroundControl*에 연결되며, 데이터 링크를 사용하여 RTCM 수정 정보를 기체에전송합니다 (MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) 메시지 사용). 자동조종장치에서 MAVLink 패킷의 압축을 풀고 로버에 전송하여, RTK 솔루션을 처리합니다.

데이터 링크는 일반적으로 초당 300바이트의 업링크 속도를 처리할 수 있어야 합니다(자세한 내용은 아래의 [업링크 데이터 속도](#uplink-datarate) 섹션 참조).

## 지원 RTK GPS 모듈

테스트한 기기 목록은 [사용자 가이드](../gps_compass/rtk_gps.md#supported-rtk-devices)을 참고하십시오.

:::note
대부분의 장치에는 베이스와 로버의 두 가지 변형이 있습니다.
올바른 변형을 선택하여야 합니다.
:::

## 자동 설정

PX4 GPS 스택은 모듈이 연결된 위치(*QGroundControl* 또는 자동조종장치)에 따라서 UART 또는 USB를 통하여 메시지 송수신을 위하여, GPS 모듈을 자동으로 설정합니다.

자동조종장치는 `GPS_RTCM_DATA` MAVLink 메시지를 수신하는 즉시 RTCM 데이터를 연결된 GPS 모듈에 자동으로 전달합니다.

:::note
u-blox U-Center RTK 설정 도구는 필요하지 않으며, 사용되지도 않습니다!
:::

:::note
*QGroundControl*과 자동조종장치 펌웨어는 모두 동일한 [PX4 GPS 드라이버 스택](https://github.com/PX4/GpsDrivers)을 공유합니다. 실제로, 새 프로토콜 또는 메시지 지원시 한쪽에만 추가하면 됩니다.
:::

### RTCM 메시지

명시되어 있지 않은 경우에는 QGroundControl은 RTCM3.2 프레임을 1Hz로 출력하도록 RTK 베이스 스테이션을 구성합니다.

- **1005** - 안테나 기준점(기준 위치)에 대한 스테이션 좌표 XYZ, 0.2Hz
- **1077** - 전체 GPS 의사 범위, 반송파 위상, 도플러 및 신호 강도(고해상도)
- **1087** - 전체 GLONASS 의사 범위, 반송파 위상, 도플러 및 신호 강도(고해상도)
- **1230** - GLONASS 코드 위상 바이어스
- **1097** - 전체 Galileo 의사 범위, 반송파 위상, 도플러 및 신호 강도(고해상도)
- **1127** - 전체 BeiDou 의사 범위, 반송파 위상, 도플러 및 신호 강도(고해상도)

## 업링크 데이터 속도

베이스의 원시 RTCM 메시지는 MAVLink `GPS_RTCM_DATA` 메시지로 압축되어 데이터 링크로 전송됩니다. MAVLink 메시지의 최대 길이는 182바이트입니다. RTCM 메시지에 따라 MAVLink 메시지는 채워지지 않을 수도 있습니다.

RTCM Base Position 메시지(1005)의 길이는 22바이트이고, 나머지는 모두 가시 위성의 수와 위성의 신호 수에 따라 가변 길이입니다(M8P와 같은 L1 장치의 경우 1만). 주어진 시간에 단일 별자리에서 볼 수 있는 위성의 _최대_ 수는 12개이므로 실제 조건에서는 이론적으로 300B/s의 업링크 속도면 충분합니다.

*MAVLink 1*을 사용하면, 길이에 관계없이 모든 RTCM 메시지에 대해 182바이트 `GPS_RTCM_DATA` 메시지가 전송됩니다. 결과적으로, 대략적인 업링크 요구 사항은 초당 약 700+바이트입니다. 이는 저대역폭 반이중 원격 측정 모듈(예: 3DR 원격 측정 라디오)에서 링크 포화로 이어질 수 있습니다.

*MAVLink 2*를 사용하면 `GPS_RTCM_DATA 메시지`의 빈 공간이 제거됩니다. 결과적인 업링크 요구 사항은 이론적인 값(초당 ~300바이트)과 거의 같습니다.

:::tip
PX4에서는 GCS와 텔레메트리가 지원되면, 자동으로 MAVLink 2로 전환됩니다.
:::

MAVLink 2는 고성능 RTK을 위하여, 낮은 대역폭 링크를 사용합니다. 텔레메트리 체인에서 MAVLink 2를 사용하는지를 확인해야합니다. 시스템 콘솔에서 `mavlink status` 명령을 사용하여 프로토콜 버전을 확인할 수 있습니다.

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
