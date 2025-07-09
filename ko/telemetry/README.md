---
canonicalUrl: https://docs.px4.io/main/ko/telemetry/README
---

# 텔레메트리 라디오/모뎀

텔레메트리 라디오는 (선택적으로) *QGroundControl*과 같은 지상 관제소와 PX4를 실행 기체간의 무선 MAVLink 연결을 제공합니다. 기체가 비행 중일 때 매개변수를 조정하고, 실시간으로 원격 측정 데이터를 확인하고, 비행 중 임무를 변경 등의 작업을 수행합니다.

PX4는 다양한 텔레메트리 라디오 타입을 지원합니다:
* [SiK 라디오 ](../telemetry/sik_radio.md) 기반 펌웨어 (일반적으로 UART 인터페이스에서 작동해야 함).
  * [RFD900 텔레메트리 라디오](../telemetry/rfd900_telemetry.md)
  * [HolyBro SiK Telemetry Radio](../telemetry/holybro_sik_radio.md)
  * <del><em>HKPilot Telemetry Radio</em></del> (Discontinued)
  * <del><em>3DR Telemetry Radio</em></del> (Discontinued)
* [텔레메트리 Wi-fi](../telemetry/telemetry_wifi.md)
* [Microhard Serial Telemetry Radio](../telemetry/microhard_serial.md)
  * [ARK Electron Microhard Serial Telemetry Radio](../telemetry/ark_microhard_serial.md)
  * [Holybro Microhard P900 Telemetry Radio](../telemetry/holybro_microhard_p900_radio.md)
* CUAV Serial Telemetry Radio
  * [CUAV P8 Telemetry Radio](../telemetry/cuav_p8_radio.md)
* XBee Serial Telemetry Radio
  * [HolyBro XBP9X Telemetry Radio](../telemetry/holybro_xbp9x_radio.md) (Discontinued)

PX4는 [SiK 라디오](../telemetry/sik_radio.md) 프로토콜과 호환되며 즉시 사용할 수 있습니다. 적절한 커넥터를 변경해야 할 수도 있습니다.

WiFi 원격 측정은 단거리에서 데이터 속도가 빠르며, FPV/비디오 피드를 보다 쉽게 지원할 수 있습니다. WiFi의 이점은 차량용 라디오 장치 하나만 구입하면되는 점입니다 (지상국에 이미 WiFi가 있다고 가정).

::::note PX4에서는 비행 제어 장치에 LTE USB 모듈 연결(과 인터넷으로의 MAVLink 데이터 전송)을 지원하지 않습니다. 보조 컴퓨터로 LTE 모듈을 연결하여 보조 컴퓨터에서 비행 제어 장치로 들어가는 MAVLink 데이터 흐름을 통제 가능합니다. For more information see: [Companion Computer Peripherals > Data Telephony](../companion_computer/companion_computer_peripherals.md#data-telephony-lte).
:::

## Allowed Frequency Bands

Radio bands allowed for use with drones differ between continents, regions, countries, and even states. You should select a telemetry radio that uses a frequency range that is allowed in the areas where you plan on using the drone.

Low power [SiK radios](../telemetry/sik_radio.md), such as the [Holybro Telemetry Radio](../telemetry/holybro_sik_radio.md), are often available in 915 MHz and 433 MHz variants. While you should check applicable laws in your country/state, broadly speaking 915 MHz can be used in the US, while 433 MHz can be used in EU, Africa, Oceania, and most of Asia.
