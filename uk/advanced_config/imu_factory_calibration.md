# IMU/Compass Factory Calibration

Виробники PX4 OEM можуть виконувати IMU і компасувати завод для збереження значень для акселерометра, калібрування гіроскопа та магнітометра у постійне сховище (зазвичай ЕЗПМ). This ensures that end users can always reset vehicle configurations and tuning to a safe state for flying.

This procedure will write the following parameters to `/fs/mtd_caldata`: [CAL_ACC\*](../advanced_config/parameter_reference.md#CAL_ACC0_ID), [CAL_GYRO\*](../advanced_config/parameter_reference.md#CAL_GYRO0_ID), [CAL_MAG\*](../advanced_config/parameter_reference.md#CAL_MAG0_ID). This data will then be used when the parameters are set (or reset) to their default values.

:::warning
Ця функція спирається на FMU наявності спеціального архіву EEPROM або супроводжуючого IMU PCBA, який має достатньо місця для даних. PX4 will store the data to `/fs/mtd_caldata`, creating the file if necessary.
:::

:::note
Ці значення не можуть бути збережені в [конфігурації кадрів](../dev_airframes/adding_a_new_frame.md) оскільки вони відрізняються від пристрою в пристрої (конфігурація рамки визначає набір параметрів, які застосовуються на всіх автомобілях того ж типу, такі, як увімкнені датчики, [обертання автопілота](../config/flight_controller_orientation.md) і настроювання PID).
:::

## Performing the Factory Calibration

1. Set the parameter [SYS_FAC_CAL_MODE](../advanced_config/parameter_reference.md#SYS_FAC_CAL_MODE) to 1.
1. Perform all IMU calibrations: [accelerometer](../config/accelerometer.md#performing-the-calibration), [gyroscope](../config/gyroscope.md#performing-the-calibration) and [magnetometer](../config/compass.md#performing-the-calibration).
1. Reboot the vehicle. This will write all `CAL_ACC*`, `CAL_GYRO*` and `CAL_MAG*` parameters into `/fs/mtd_caldata`.
1. Set the parameter `SYS_FAC_CAL_MODE` back to 0 (default).

:::note
If you only want to factory calibrate the accelerometer and the gyroscope you can set [SYS_FAC_CAL_MODE](../advanced_config/parameter_reference.md#SYS_FAC_CAL_MODE) to 2, in which case the magnetometer is omitted.
:::

Subsequent user calibrations will then take effect as usual (factory calibration data is only used for the parameter default values).

## Подальша інформація

- [QGroundControl User Guide > Sensors](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/sensors_px4.html)
