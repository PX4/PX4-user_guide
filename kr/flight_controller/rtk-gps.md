# UBlox M8P RTK GPS 설정

RTK (Real Time Kinematic)은 센티미터 단위까지 GPS 정확도를 제공합니다.
RTK (Real Time Kinematic) increases GPS accuracy to centimeter-level. It uses measurements of the phase of the signal's carrier wave, rather than the information content of the signal, and relies on a single reference station to provide real-time corrections, providing up to centimetre-level accuracy.

PX4 currently ONLY supports the single-frequency (L1) UBlox M8P based GNSS receivers for RTK.

### 동작

PX4에 RTK를 셋업하기 위해 2개 MP GPS 모듈(아래 예제 셋업 참조)과 데이터링크가 필요합니다. 지상쪽에 있는 유닛을 Base라 부르고 공중 유닛을 Rover라 부릅니다. Base 유닛을 QGroundControl에 연결하고 데이터링크로 비행체에 RTCM corrections 스트림을 보냅니다.(MAVLink `GPS_RTCM_DATA` 메시지) autopilot에서는 MAVLink 패킷을 풀어서 GNSS 유닛으로 보내어 RTK 솔루션을 처리합니다.

데이터링크는 일반적으로 upload rate가 초당 300 byte를 처리할 수 있어야합니다. 자세한 정보는 아래 Upload Datarate 섹션을 참고하세요.

### 자동 설정

QGroundControl와 autopilot 펌웨어 양쪽 모두 동일한 [PX4 GPS driver stack](https://github.com/PX4/GpsDrivers)을 공유합니다. 이말은 새로운 프로토콜이나 메시지를 한쪽만 추가해주기만 하면 됩니다.

PX4 GPS stack은 UART나 USB로 correct 메시지를 보내고 받기 위해서 자동으로 UBlox M8P 모듈을 셋업하며 해당 모듈이 연결된 곳에(QGroundControl이나 autopilot) 의존합니다. U-Center를 사용하는 설정이 필요하지 않습니다.

Note : M8P-1 vs M8P-2

### RTCM 메시지

QGroundControl은 RTCM3.2 frames을 출력하기 위해서 RTK base 스테이션을 설정 :

**1005** - Station coordinates XYZ for antenna reference point. (Base position.)
**1077** - Full GPS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution.)
**1087** - Full GLONASS pseudo-ranges, carrier phases, Doppler and signal strength (high resolution.)
**1127** -  Full BeiDou pseudo-ranges, carrier phases, Doppler and signal strength (high resolution.)
**1097** - Full Galileo pseudo-ranges, carrier phases, Doppler and signal strength (high resolution.) **Only supported with M8P Firmware Version 3.01 and above. See section below on firmware updates.**
**1127** -  Full BeiDou pseudo-ranges, carrier phases, Doppler and signal strength (high resolution.)

**TODO : QGC는 아직 Galileo 메시지를 설정하지 않음 -- 업데이트 요망**

### Uplink Datarate

base로부터 받은 raw RTCM 메시지를 MAVLink `GPS_RTCM_DATA` 메시지로 패킹하고 데이터링크를 통해 전송합니다. 각 MAVLink 메시지의 길이는 182 byte가 보통입니다.

Base Position 메시지 (1005)는 22 byte 길이이며 반면에 다른 것들은 모두 가변길이로 위성 여부나 위성으로부터 신호의 갯수(M8P와 같이 L1 유닛에 대해서 오직 1)에 따라 달라집니다. 단일 constellation에서 확인할 수 있는 위성의 _최대_ 갯수는 12개로 RTCM 메시지는 각각 대략 120 byte가 됩니다. 실제 조건에서 300 bps uplink rate로 충분합니다.

하지만 -



## Drotek Tiny XXL 예제

![](../../assets/drotek_rtk_base.jpg)

![](../../assets/drotek_rtk_rover.jpg)

## HEX/ProfiCNC Here+ 예제
