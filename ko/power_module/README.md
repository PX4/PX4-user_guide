---
canonicalUrl: https://docs.px4.io/main/ko/power_module/README
---

# 전원 모듈

전원 모듈은 비행 콘트롤러에 조정된 전원공급장치이며, 배터리 전압과 전류에 대한 정보를 제공합니다. 전압/전류 정보는 소비 전력을 확인하고 남은 배터리 용량을 추정합니다. 비행 콘트롤러의 전력 부족시 안전 경고 및 기타 조치를 제공합니다: [안전 &gt; 배터리 부족 안전장치](../config/safety.md#low-battery-failsafe).

PX4 배터리/전원 모듈 설정 방법(ADC 인터페이스를 통한)은 [전원모듈 설정](../config/battery.md)을 참고하십시오.

:::note
배전반도이 항목에서 다룹니다. 여기에는 전원 모듈이 포함되며, 모터 전원 공급을 위하여 배선이 필요합니다. 또한 서보 및 기타 액추에이터에 전원을 공급하는 BEC를 포함할 수 있습니다.
:::

이 섹션에서는 지원되는 전원 모듈과 배전 보드에 대하여 설명합니다.

* 아날로그 전압 및 전류 전력 모듈 :
  * [CUAV HV PM](../power_module/cuav_hv_pm.md)
  * [Holybro PM07 (Pixhawk 4 PM)](../power_module/holybro_pm07_pixhawk4_power_module.md)
  * [Holybro PM06 (Pixhawk 4 Mini PM)](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
* [UAVCAN](../uavcan/README.md) 전원 모듈
  * [CUAV CAN PMU](../uavcan/cuav_can_pmu.md)
  * [Pomegranate 시스템 전원 모듈](../uavcan/pomegranate_systems_pm.md)