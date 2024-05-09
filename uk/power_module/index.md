# Модулі живлення & розподільчі плати живлення

Блоки живлення забезпечують стабілізоване живлення для керуючого пристрою польоту, а також інформацію про напругу батареї та поточний струм. Інформація про напругу/струм використовується для визначення спожитої потужності та, відповідно, для оцінки залишкової ємності батареї. Це дозволяє керуючому пристрою польоту надавати аварійні попередження та інші дії у випадку низького рівня живлення: [Safety > Low Battery Failsafe](../config/safety.md#low-battery-failsafe).

Розподільчі плати живлення (PDB) включають блок живлення та додатково мають проводку для живлення двигунів. Вони також можуть включати BEC для живлення сервоприводів та інших приводів.

Конфігурація батареї/живлення PX4 (через інтерфейс ADC) розглянута у розділі: [Налаштування оцінки заряду батареї](../config/battery.md).

У цьому розділі наведено посилання/інформацію про підтримувані блоки живлення та розподільчі плати живлення:

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
