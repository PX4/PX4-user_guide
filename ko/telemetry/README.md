# 텔레메트리 무선 장비/모뎀

텔레메트리 무선 통신 장치는 (별도로) *QGroundControl*같은 지상 통제 장치와 PX4를 구동하는 기체간 무선 MAVLink 연결을 목적으로 활용합니다. 기체가 비행 중일 때 매개변수를 조정하고, 실시간으로 원격 측정 데이터를 확인하고, 비행 중 임무를 변경하는 등의 작업을 수행할 수 있습니다.

PX4는 다양한 텔레메트리 무선 통신 방식을 지원합니다:

* [SiK 무선 통신](../telemetry/sik_radio.md) 기반 펌웨어 (더 일반적으로 UART 인터페이스가 있는 어떤 무선 통신 장비든 작동해야 함). 
  * [RFD900 텔레메트리 라디오](../telemetry/rfd900_telemetry.md)
  * [HKPilot (SIK) 텔레메트리 라디오](../telemetry/hkpilot_sik_radio.md)
  * [HolyBro (SIK) 텔레메트리 라디오](../telemetry/holybro_sik_radio.md)
* [텔레메트리 Wi-fi](../telemetry/telemetry_wifi.md)
* [Microhard Serial Telemetry Radio](../telemetry/microhard_serial.md)

PX4는 SiK Radio와 호환되는 프로토콜이며 일반적으로 상자에서 작동합니다 (적절한 커넥터를 변경 / 사용해야 할 수도 있음).

WiFi 원격 측정은 일반적으로 범위가 짧고 데이터 속도가 빠르며 FPV / 비디오 피드를보다 쉽게 지원할 수 있습니다. WiFi 무선의 한 가지 이점은 기체에 단일 무선 장치 만 구입하면됩니다 (지상국에 이미 WiFi가 있다고 가정).

:::note PX4 does not support connecting an LTE USB module to the flight controller (and sending MAVLink traffic via the Internet). You can however connect an LTE module to a companion computer and use it to route MAVLink traffic from the flight controller. For more information see: [Companion Computer Peripherals > Data Telephony](../peripherals/companion_computer_peripherals.md#data_telephony).
:::