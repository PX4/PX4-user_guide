# Power module

The power module can provide battery voltage and current information for the drone. The flight controller can use the information provided by the power module to detect the power. With it, your drone can achieve low battery protection, such as return, landing, and so on.

PX4 supports multiple types of power modules:

* Analog voltage and current power module
  * [CUAV HV PM](../power_module/hv_pm.md)
* Uavcan power module
  * [CUAV CAN PMU](../power_module/can_pmu.md)
