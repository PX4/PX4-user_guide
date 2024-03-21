# Power Modules & Power Distribution Boards

Power Modules provide a regulated power supply for the flight controller, along with information about battery voltage and current.
The voltage/current information is used to determine the consumed power, and to hence to estimate remaining battery capacity.
This in turn allows the flight controller to provide failsafe warnings and other actions in the event of low power: [Safety > Low Battery Failsafe](../config/safety.md#low-battery-failsafe).

Power Distribution Boards (PDB) include a power module, and additionally have wiring to supply power to motors.
They may also include a BEC to supply power to servos and other actuators.

The PX4 battery/power module configuration (via the ADC interface) is covered in: [Battery Estimation Tuning](../config/battery.md).

This section provides links/information about supported power modules and power distribution boards:

* Analog voltage and current power modules:
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
