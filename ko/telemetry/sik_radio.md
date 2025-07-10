---
canonicalUrl: https://docs.px4.io/main/ko/telemetry/sik_radio
---

# SiK 라디오

[SiK 라디오](https://github.com/LorenzMeier/SiK)는 텔레메트리 라디오를 위한 펌웨어와 도구들입니다.

PX4는 *SiK *를 활용하는 무선통신 프로토콜과 호환됩니다. SiK 무선 통신 모듈은 보통 적절한 커넥터/케이블을 갖추고 있어 [픽스호크 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에 직접 연결할 수 있습니다(어떤 경우 적절한 케이블/커넥터를 구해야 할 수도 있습니다). 보통 기체와 지상통제장치 간에 한 쌍의 장비가 필요합니다.

SiK 라디오는 다양한 범위와 폼 팩터를 지원하는 다양한 제조업체/가게에서 구매가능 합니다.

![SiK 라디오](../../assets/hardware/telemetry/holybro_sik_radio.jpg)

<a id="vendors"></a>

## 공급 업체

* [RFD900 Telemetry Radio](../telemetry/rfd900_telemetry.md)
* [Holybro Telemetry Radio](../telemetry/holybro_sik_radio.md)
* <del><em>HKPilot Telemetry Radio</em></del> (Discontinued)
* <del><em>3DR 텔레메트리 라디오</em></del> (단종)

## 설정

지상통제장치에서는 무선통신장치는 플러그앤플레이 방식의 USB로 연결합니다.

기체의 장치는 비행 제어장치의 `TELEM1` 포트에 연결하며, 보통 추가 설정은 하지 않습니다.


## 펌웨어 업데이트

대부분의 [공급업체](#vendors)에서 제공하는 하드웨어는 최신 펌웨어에 설정되어 있습니다. 구형 하드웨어에서 MAVLink 2 추가하기 위하여, 새 펌웨어로 업데이트하여야 합니다.

*QGroundControl*에서 무선통신장치 펌웨어를 업데이트 가능합니다. [QGroundControl 사용자 안내서 &gt; 펌웨어 불러오기](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)를 참고하십시오.


## 고급 설정

개발 섹션에는 펌웨어 빌드와 AT 명령 기반 설정에 대한 [정보](../data_links/sik_radio.md)를 참고하십시오. 개발자가 아닌 경우에는 이 작업을 수행하지 않아도 됩니다.
