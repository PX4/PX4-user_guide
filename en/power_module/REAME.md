# Power module

The power module can provide battery voltage and current information for the drone. The flight controller can use the information provided by the power module to detect the power. With it, your drone can achieve low battery protection, such as return, landing, and so on.

![CAN PMU](../../assets/hardware/power_module/can_pmu.jpg)

PX4 supports multiple types of power modules:

* Analog voltage and current power module
  * [CUAV HV PM](../power_module/hv_pm.md)
* [UAVCAN](https://new.uavcan.org/) power module
  * [CUAV CAN PMU](../power_module/can_pmu.md)
  
Pixahwk power is the ADC interface that can be connected to the Analog voltage and current power module and [Power Module Setup](https://docs.px4.io/master/en/config/battery.html) shows how to set it up.

PX4 is compatible with the [UAVCAN](https://new.uavcan.org/) protocol. The [UAVCAN](https://new.uavcan.org/) power module has more secure and reliable performance and is rapidly evolving.