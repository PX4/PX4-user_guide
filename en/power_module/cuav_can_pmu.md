# CAUV CAN PMU

![CAN PMU](../../assets/hardware/power_module/can_pmu.jpg)

CAN PMU<sup>&reg;</sup> is a high-precision power module developed by CUAV<sup>&reg;</sup>. It uses [UAVCAN](new.uavcan.org) protocol and runs CUAV ITT compensation algorithm, which enables drones to obtain battery data more accurately.

it is recommended to use in large commercial no one. Machines can also be applied to technical research and other fields.

## Quick Summary

* **processor** 
  * STM32F412
* **Voltage input **
  * 6~62V\(2-15S\)
* **Max current** 
  * 110A
* **Voltage accuracy ** 
  * ±0.05V
* **Current accuracy **
  * ±0.1A
* **Resolution**
  * 0.01A/V
* **Max output power **
  * 6000W/90S
* **Max stable power **
  * 5000W
* **Power port output**
  * 5.4V/5A
* **protocol**
  * UAVCAN
* **Operating temp**
  * -20~+100℃
* **Firmware upgrade**
  * Support
* **calibration**
  * no need
* **Interface Type**
  * IN/OUT:XT90\(Cable）/Amass 8.0\(Module）
  * Power port:5025850670
  * CAN: GHR-04V-S
* **Appearance:**
  * Size:46.5mm \* 38.5mm \* 22.5mm
  * Weight:76g

## Purchase

[CUAV store](https://store.cuav.net/index.php)
[CUAV aliexpress ](https://www.aliexpress.com/item/4000369700535.html)

## Pinouts

![CAN PMU](../../assets/hardware/power_module/can_pmu_pinouts_en.png) 
 
![CAN PMU](../../assets/hardware/power_module/can_pmu_pinouts_en2.png)

## Connection

![CAN PMU](../../assets/hardware/power_module/can_pmu_connection_en.png)

**Connection method:**

* Connect the flight control CAN1/2 and the module CAN interface.
* Connect the V5 series power cable to the V5 Flight Control Power2 (if other flight controllers are connect to the Power interface) and the module Power  interface.

## Enable CAN PMU

Set the following parameters in the QGroundControl parameter list and restart after writing:

* Uavcan\_enble set to "sensors Automatic config"

![qgc set](../../assets/hardware/power_module/qgc_set_en.png)

# list 

![CAN PMU list](../../assets/hardware/power_module/can_pmu_list.png)

## More information

[CAN PMU Manual](http://manual.cuav.net/power-module/CAN-PMU.pdf)

[CUAV docs](Doc.cuav.net/power-module/can-pmu)

[UAV CAN](https://new.uavcan.org/)