# Модулі живлення & розподільчі плати живлення

_Power Modules_ provide a regulated power supply for the flight controller (FC), along with information about battery voltage and current. Інформація про напругу/струм використовується для визначення спожитої потужності та, відповідно, для оцінки залишкової ємності батареї. Це дозволяє керуючому пристрою польоту надавати аварійні попередження та інші дії у випадку низького рівня живлення: [Safety > Low Battery Failsafe](../config/safety.md#low-battery-failsafe).

_Power Distribution Boards (PDB)_ are circuit boards that may be used to simplify splitting the output of the battery to various parts of the drone, and in particular motors. PDBs will sometimes include a power module for the FC, ESCs for motors, and a battery elimination circuit (BEC) for powering servos.

Конфігурація батареї/живлення PX4 (через інтерфейс ADC) розглянута у розділі: [Налаштування оцінки заряду батареї](../config/battery.md).

::: tip
For easiest assembly use a power module or PDB recommended by your FC manufacturer, and sized for your power requirements.

The Pixhawk connector standard requires that the VCC line must provide at least 2.5A continuous current and default to 5.3V. In in practice flight controllers may have different recommendations or preferences, so if you don't (or can't) use a recommended module, check that the module matches your FC's requirements.
:::

This section provides information about a number of power modules and power distribution boards (see FC manufacturer docs for more options):

* Модулі живлення аналогового напруги та струму:
  * [CUAV HV PM](../power_module/cuav_hv_pm.md)
  * [Holybro PM02](../power_module/holybro_pm02.md)
  * [Holybro PM07](../power_module/holybro_pm07_pixhawk4_power_module.md)
  * [Holybro PM06 V2](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
  * [Sky-Drones SmartAP PDB](../power_module/sky-drones_smartap-pdb.md)
* Цифрові (I2C) модулі напруги та поточного живлення (для контролерів, похідних від Pixhawk FMUv6X та FMUv5X):
  * [Holybro PM02D](../power_module/holybro_pm02d.md)
  * [Holybro PM03D](../power_module/holybro_pm03d.md)
* [Прошивка DroneCAN](../dronecan/index.md) модулі живлення
  * [CUAV CAN PMU](../dronecan/cuav_can_pmu.md)
  * [Силовий модуль Pomegranate Systems](../dronecan/pomegranate_systems_pm.md)
