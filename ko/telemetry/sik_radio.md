# SiK Radio

[SiK 라디오 ](https://github.com/LorenzMeier/SiK)은 원격측정 라디오용 펌웨어 및 툴 모음입니다.

PX4는 *SiK *을 사용하는 라디오와 프로토콜 호환이 가능합니다. SiK Radio는 흔히 적절한 커넥터/케이블을 갖추고 있어 [ Pixhawk 시리즈 ](../flight_controller/pixhawk_series.md) 컨트롤러에 직접 연결할 수 있습니다. (일부 경우 적절한 케이블/커넥터를 얻어야 할 수도 있습니다.) 일반적으로 기체용 장치와 접지 측 장치용 장치가 필요합니다.

SiK 라디오용 하드웨어는 다양한 범위 및 폼 팩터를 지원하는 다양한 제조업체/스토어에서 구입할 수 있습니다.

![SiK Radio](../../assets/hardware/telemetry/holybro_sik_radio.jpg)

<span id="vendors"></span>

## Vendors

* [RFD900 Telemetry Radio](../telemetry/rfd900_telemetry.md)
* [HKPilot Telemetry Radio](../telemetry/hkpilot_sik_radio.md)
* [Holybro Telemetry Radio](../telemetry/holybro_sik_radio.md)
* <del><em>3DR 원격측정 라디오 </em></del> (계속)

## 설정/구성

The ground station-based radio is connected via USB (essentially plug-n-play).

The vehicle-based radio is connected to the flight-controller's `TELEM1` port, and typically requires no further configuration.

## 펌웨어 업데이트

Hardware sourced from most [vendors](#vendors) should come pre-configured with the latest firmware. You may need to update older hardware with new firmware, for example to gain support for MAVLink 2.

You can update the radio firmware using *QGroundControl*: [QGroundControl User Guide > Loading Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html).

## 고급 설정/구성

The PX4 Developer Guide has [additional information](https://dev.px4.io/master/en/data_links/sik_radio.html) about building firmware and AT-command based configuration. This should not be required by non-developers.