# SiK 라디오

[SiK 라디오](https://github.com/LorenzMeier/SiK)는 텔레메트리 라디오를 위한 펌웨어와 도구들입니다.

PX4는 *SiK *를 활용하는 무선통신 프로토콜과 호환됩니다. SiK 무선 통신 모듈은 보통 적절한 커넥터/케이블을 갖추고 있어 [픽스호크 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에 직접 연결할 수 있습니다(어떤 경우 적절한 케이블/커넥터를 구해야 할 수도 있습니다). 보통 기체용 장치와 지상 통제 장치용 장치 한 쌍이 필요합니다.

SiK 무선 통신용 하드웨어는 다양한 구성을 지원하는 여러 제조업체/상점에서 구입할 수 있습니다.

![SiK 무선 통신](../../assets/hardware/telemetry/holybro_sik_radio.jpg)

<span id="vendors"></span>

## 공급업체

* [RFD900 텔레메트리 라디오](../telemetry/rfd900_telemetry.md)
* [HKPilot 텔레메트리 라디오](../telemetry/hkpilot_sik_radio.md)
* [홀리브로 텔레메트리 라디오](../telemetry/holybro_sik_radio.md)
* <del><em>3DR 텔레메트리 라디오</em></del> (단종)

## 설정/구성

지상 통제 장치 기반 무선 통신 장치는 USB로 연결합니다(보통 연결하면 동작함).

기체 기반 무선 통신 장치는 비행 제어장치의 `TELEM1` 포트에 연결하며, 보통 추가 구성은 필요하지 않습니다.

## 펌웨어 업데이트

대부분의 [공급 업체](#vendors)에서 제공하는 하드웨어는 최신 펌웨어에 이미 설정한 상태로 나옵니다. MAVLink 2 지원을 추가하려는 경우를 예로 들면, 오래된 하드웨어를 새 펌웨어로 업데이트 할 필요가 있습니다.

*QGroundControl*에서 무선 통신 장치 펌웨어를 업데이트할 수 있습니다. [QGroundControl 사용자 안내서 > 펌웨어 불러오기](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)를 참고하십시오.

## 고급 설정/구성

개발 절에서는 펌웨어 빌드 및 AT 명령 기반 설정 [추가 정보](../data_links/sik_radio.md)가 있습니다. 개발자가 아닌 경우에는 이 작업을 수행할 필요가 없습니다.