---
canonicalUrl: https://docs.px4.io/main/ko/power_module/README
---

# Power Modules & Power Distribution Boards

Power Modules provide a regulated power supply for the flight controller, along with information about battery voltage and current. 전압/전류 정보는 소비 전력을 확인하고 남은 배터리 용량을 추정합니다. 비행 콘트롤러의 전력 부족시 안전 경고 및 기타 조치를 제공합니다: [안전 &gt; 배터리 부족 안전장치](../config/safety.md#low-battery-failsafe).

Power Distribution Boards (PDB) include a power module, and additionally have wiring to supply power to motors. 또한 서보 및 기타 액추에이터에 전원을 공급하는 BEC를 포함할 수 있습니다.

PX4 배터리/전원 모듈 설정 방법(ADC 인터페이스를 통한)은 [전원모듈 설정](../config/battery.md)을 참고하십시오.

이 섹션에서는 지원되는 전원 모듈과 배전 보드에 대하여 설명합니다.

* 아날로그 전압 및 전류 전력 모듈 :
  * [CUAV HV PM](../power_module/cuav_hv_pm.md)
  * [Holybro PM02](../power_module/holybro_pm02.md)
  * [Holybro PM07](../power_module/holybro_pm07_pixhawk4_power_module.md)
  * [Holybro PM06 V2](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
  * [Sky-Drones SmartAP PDB](../power_module/sky-drones_smartap-pdb.md)
* Digital (I2C) voltage and current power modules (for Pixhawk FMUv6X and FMUv5X derived controllers):
  * [Holybro PM02D](../power_module/holybro_pm02d.md)
  * [Holybro PM03D](../power_module/holybro_pm03d.md)
* [DroneCAN](../dronecan/README.md) power modules
  * [CUAV CAN PMU](../dronecan/cuav_can_pmu.md)
  * [Pomegranate Systems Power Module](../dronecan/pomegranate_systems_pm.md)
