# SiK Radio

[SiK 라디오 ](https://github.com/LorenzMeier/SiK)은 원격측정 라디오용 펌웨어 및 툴 모음입니다.

PX4는 *SiK *을 사용하는 라디오와 프로토콜 호환이 가능합니다. SiK Radio는 흔히 적절한 커넥터/케이블을 갖추고 있어 [ Pixhawk 시리즈 ](../flight_controller/pixhawk_series.md) 컨트롤러에 직접 연결할 수 있습니다. (일부 경우 적절한 케이블/커넥터를 얻어야 할 수도 있습니다.) 일반적으로 기체용 장치와 접지 측 장치용 장치가 필요합니다.

SiK 라디오용 하드웨어는 다양한 범위 및 폼 팩터를 지원하는 다양한 제조업체/스토어에서 구입할 수 있습니다.

![SiK Radio](../../assets/hardware/telemetry/holybro_sik_radio.jpg)

## Vendors {#vendors}

* [RFD900 Telemetry Radio](../telemetry/rfd900_telemetry.md)
* [HKPilot Telemetry Radio](../telemetry/hkpilot_sik_radio.md)
* [Holybro Telemetry Radio](../telemetry/holybro_sik_radio.md)
* <del><em>3DR 원격측정 라디오 </em></del> (계속)

## 설정/구성

접지 스테이션 기반 라디오는 USB(기본적으로 플러그 앤 플레이)를 통해 연결됩니다.

기체 기반 라디오는 비행 컨트롤러의 ` TELEM1 ` 포트에 연결되며, 일반적으로 추가 구성이 필요하지 않습니다.

## 펌웨어 업데이트

대부분의 [벤더 ](#vendors)에서 소싱된 하드웨어는 최신 펌웨어로 미리 구성되어야 합니다. 예를 들어 MAVLink 2에 대한 지원을 받으려면 이전 하드웨어를 새 펌웨어로 업데이트해야 할 수 있습니다.

*QGroundControl *: [QGoundControl 사용자 설명서 > Loading Firmware ](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)을(를) 사용하여 라디오 펌웨어를 업데이트할 수 있습니다.

## 고급 설정/구성

The PX4 Developer Guide has [additional information](https://dev.px4.io/master/en/data_links/sik_radio.html) about building firmware and AT-command based configuration. 개발자가 아닌 경우에는 이 작업을 수행할 필요가 없습니다.