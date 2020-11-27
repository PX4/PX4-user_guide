# RTK GPS (PX4 통합)

[실시간 운동 감지](https://en.wikipedia.org/wiki/Real_Time_Kinematic) (RTK)는 센티미터 단위의 GPS 정확도를 확보해줍니다. 이 페이지에서는 실시간 운동 감지 기능을 PX4에 결합하는 방법을 설명합니다.

> **Note** RTK GPS *활용* 방법 내용은 [주변 하드웨어 > RTK GPS](../gps_compass/rtk_gps.md)에서 설명합니다.

## 개요

실시간 운동 감지(RTK)는 신호 정보 내용 자체 보다는 신호 캐리어 파형의 위상 측정 값을 활용합니다. 다중 이동 스테이션과도 동작할 수 있도록 실시간 보정을 제공하는 단일 참조 스테이션에 의존합니다.

PX4에 RTK를 설정하려면 RTK GPS 모듈 둘과 데이터 링크가 필요합니다. 고정 위치 지상 기반 GPS 장치를 *베이스*라 하고, 공중에 띄우는 장치를 *탐사선(Rover)*이라 합니다. 베이스 장치는 *QGroundControl*에 (USB로) 연결하며 기체로 RTCM 메시지를 지속 송수신(MAVLink [GPS_RTCM_DATA](https://mavlink.io/en/messages/common.html#GPS_RTCM_DATA) 메시지 활용)하도록 데이터링크를 활용합니다. 자동 항법 장치에서는 MAVLink 패킷을 해제한 후 RTK 솔루션을 받았을 때 처리할 탐사선 장치로 보냅니다.

데이터링크는 보통 초당 300바이트 전송을 처리할 수 있어야합니다(더 많은 정보는 [상위 링크 데이터 전송율](#uplink-datarate) 부분을 참고하십시오).

## 지원 RTK GPS 모듈

PX4는 현재 RTK 용으로 단일 주파(L1) u-blox M8P 기반 GNSS 수신기만을 지원합니다.

많은 제조사에서 이 수신기로 제품을 만들고 있습니다. [사용자 안내서](../gps_compass/rtk_gps.md#supported-rtk-devices)에서 우리가 시험 완료한 장치 목록을 찾아보실 수 있습니다.

> **Note** u-blox는 두 종류의 M8P 칩, M8P-0와 M8P-2를 사용합니다. M8P-0칩을 장착한 모델은 베이스가 아닌 탐사선(Rover)용으로만 사용할 수 있으나, M8P-2칩 장착 모델은 탐사선용, 베이스용 둘 다 활용 가능합니다.


## 자동 설정

PX4 GPS 스택은 u-blox M8P 모듈을 자동으로 설정하여 UART 또는 USB 둘 중 어떤 매개를 통해 (*QGroundControl* 또는 autopilot에) 모듈을 연결했느냐에 따라 올바른 메시지를 주고 받을 수 있게 합니다.

자동 항법 장치에서 `GPS_RTCM_DATA` MAVLink 메시지를 받는 즉시, RTCM 데이터를 GPS 모듈에 자동으로 전달합니다.

> **Note**  U-Center RTK 모듈 설정 도구는 필요하지도 않고 사용하지도 않습니다!

<span></span>
> **Note** *QGroundControl*과 자동 항법 장치 펌웨어는 [PX4 GPS 드라이버 스택](https://github.com/PX4/GpsDrivers)을 함께 사용합니다. 실제로, 새 프로토콜 또는 메시지 지원시 한쪽에만 추가하면 됩니다.


### RTCM 메시지

QGroundControl은 RTK 베이스 스테이션을 설정하여 다음 RTCM3.2 프레임을 1초에 한번씩 출력합니다:

- **1005** - 안테나 참조 지점 값인 스테이션 좌표 XYZ 값(베이스 위치).
- **1077** - 전체 GPS 가상 범위, 캐리어 위상, 도플러 신호 세기 (고해상).
- **1087** - 전체 GLONASS 가상 범위, 캐리어 위상, 도플러 신호 세기 (고해상).


## 상위 링크 데이터 전송율

베이스 포인트에서의 RAW RTCM 메시지는 MAVLink `GPS_RTCM_DATA` 메시지로 포장하여 데이터 링크로 보냅니다. MAVLink 메시지 최대 길이는 182 바이트입니다. RTCM 메시지에 따라 MAVLink 메시지는 거의 대부분 완전히 채울 일이 없습니다.

RTCM 베이스 위치 메시지 (1005)는 22 바이트 길이를 가지며, 다른 메시지는 가시 범위의 위성 숫자와 위성 신호 수(그 중 하나는 M8P와 같은 장치의 L1 신호입니다)에 따라 다양한 길이를 가집니다. 주어진 시간으로부터, 가시 범위 내 _최대_ 단일 무리 위성 수는 12개이며, 실제 상황에서는, 이론적으로 이들 위성과의 상위 링크 데이터 전송률로서 초당 300 바이트면 충분합니다

*MAVLink 1*을 사용한다면, (최대) 182 바이트 길이의 `GPS_RTCM_DATA` 메시지를 어떤 길이로든 모든 RTCM 메시지로 보냅니다. 결과적으로 평균 상위 링크 데이터 전송율은 초당 700 바이트 이상 즈음이어야합니다. 이 사양을 맞추면 저대역 반이중 텔레메트리 통신 모듈의 연결 포화를 유발할 수 있습니다(예: 3DR 텔레메트리 전파).

*MAVLink 2*를 활용하면 `GPS_RTCM_DATA 메시지`의 빈 영역을 제거합니다. 결과적으로 상위 링크 요구 사항은 이론 값(~초당 300 바이트까지)에 동일하게 근접합니다.

> **Tip** GCS와 텔레메트리 모듈에서 MAVLink 2를 지원하면, PX4에서 자동으로 MAVLink 2로 전환합니다.

저대역 연결에서 바람직한 RTK 성능을 내려면 MAVLink 2 를 사용해야합니다. 텔레메트리 체인에서 MAVLink 2를 사용하는지를 확인해야합니다. 시스템 콘솔에서 `mavlink status` 명령으로 프로토콜 버전을 확인할 수 있습니다:

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
