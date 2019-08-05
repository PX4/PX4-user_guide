# 원격측정 라디오 / 모뎀

원격 무선 장치는 (임의로) QGroundControl 같은 지상 제어 국과 기체 주행 PX4 MAVLink 간의 무선 접속을 제공하는데 사용될 수있다. 이를 통해 기체가 비행 중일 때 매개 변수를 조정하고, 실시간으로 원격 측정을 검사하고, 비행 중 임무를 변경하는 등의 작업을 수행 할 수 있습니다.

PX4는 원격 라디오의 형태를 지원한다 :

* [SiK 라디오](../telemetry/sik_radio.md) 기반 펌웨어 (더 일반적으로 UART 인터페이스가있는 모든 라디오가 작동해야 함). 
  * [RFD900 원격측정 라디오](../telemetry/rfd900_telemetry.md)
  * [HKPilot (SIK) 원격측정 라디오](../telemetry/hkpilot_sik_radio.md)
  * [HolyBro (SIK) 원격측정 라디오](../telemetry/holybro_sik_radio.md)
* [원격측정 Wi-fi](../telemetry/telemetry_wifi.md)

PX4는 SiK Radio와 호환되는 프로토콜이며 일반적으로 상자에서 작동합니다 (적절한 커넥터를 변경 / 사용해야 할 수도 있음).

WiFi 원격 측정은 일반적으로 범위가 짧고 데이터 속도가 빠르며 FPV / 비디오 피드를보다 쉽게 지원할 수 있습니다. WiFi 무선의 한 가지 이점은 기체에 단일 무선 장치 만 구입하면됩니다 (지상국에 이미 WiFi가 있다고 가정).

> **Note** PX4 does not support connecting an LTE USB module to the flight controller (and sending MAVLink traffic via the Internet). You can however connect an LTE module to a companion computer and use it to route MAVLink traffic from the flight controller. For more information see: [Companion Computer Peripherals > Data Telephony](../peripherals/companion_computer_peripherals.md#data_telephony).