---
canonicalUrl: https://docs.px4.io/main/ru/power_module/README
---

# Power Modules

Power modules provide a regulated power supply for the flight controller, along with information about battery voltage and current. The voltage/current information is used to determine the consumed power, and to hence to estimate remaining battery capacity. This in turn allows the flight controller to provide failsafe warnings and other actions in the event of low power: [Safety > Low Battery Failsafe](../config/safety.md#low-battery-failsafe).

The PX4 battery/power module configuration (via the ADC interface) is covered in: [Power Module Setup](../config/battery.md).

:::note
Power distribution boards are also covered by this topic. These include a power module, and additionally have wiring to supply power to motors. They may also include a BEC to supply power to servos and other actuators.
:::

This section provides links/information about supported power modules and power distribution boards:

* Analog voltage and current power modules:
  * [CUAV HV PM](../power_module/cuav_hv_pm.md)
  * [Holybro PM07 (Pixhawk 4 PM)](../power_module/holybro_pm07_pixhawk4_power_module.md)
  * [Holybro PM06 (Pixhawk 4 Mini PM)](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
* [UAVCAN](../uavcan/README.md) power modules
  * [CUAV CAN PMU](../uavcan/cuav_can_pmu.md)
  * [Pomegranate Systems Power Module](../uavcan/pomegranate_systems_pm.md)