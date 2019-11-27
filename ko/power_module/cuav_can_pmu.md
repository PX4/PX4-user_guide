# CAUV CAN PMU

CAN PMU<sup>&reg;</sup> is a high-precision power module developed by CUAV<sup>&reg;</sup>. It uses the [UAVCAN](https://new.uavcan.org/) protocol and runs the CUAV ITT compensation algorithm, which enables drones to get the battery data more accurately.

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu.jpg)

It is recommended for use in large commercial vehicles, but might also be used for research vehicles.

## Specifications

- **Processor:** STM32F412
- **Voltage input**: 6~62V\(2-15S\)
- **Max current:** 110A
- **Voltage accuracy:** ±0.05V
- **Current accuracy:** ±0.1A
- **Resolution:** 0.01A/V
- **Max output power:** 6000W/90S
- **Max stable power:** 5000W
- **Power port output:** 5.4V/5A
- **Protocol:** UAVCAN
- **Operating temp:** -20~+100
- **Firmware upgrade:** Supported.
* **Calibration:** Not needed.
* **Interface Type:**
  - **IN/OUT:** XT90\(Cable）/Amass 8.0\(Module）
  - **Power port:** 5025850670
  - **CAN:** GHR-04V-S
- **Appearance:**
  - **Size:** 46.5mm \* 38.5mm \* 22.5mm
  - **Weight:** 76g

## Purchase

- [CUAV store](https://store.cuav.net/index.php)
- [CUAV aliexpress ](https://www.aliexpress.com/item/4000369700535.html)

## Pinouts

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_pinouts_en.png)

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_pinouts_en2.png)

## Connection

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_connection_en.png)

The connection steps are:
* Connect the flight control CAN1/2 and the module CAN interface.
* Connect the V5 series power cable to the V5 Flight Control Power2 (if other flight controllers are connect to the Power interface) and the module Power interface.

## Enable CAN PMU

Set the following parameters in the *QGroundControl* [parameter list](../advanced_config/parameters.md) and then restart:

* `UAVCAN_ENABLE`: set to: *Sensors Automatic Config*

  ![qgc set](../../assets/hardware/power_module/cuav_can/qgc_set_en.png)

# Package Contents

![CAN PMU list](../../assets/hardware/power_module/cuav_can/can_pmu_list.png)

## Further Information

[CAN PMU Manual](http://manual.cuav.net/power-module/CAN-PMU.pdf)

[CUAV docs](http://doc.cuav.net/power-module/can-pmu/en/#px4-firmware)

[UAVCAN](https://new.uavcan.org/)