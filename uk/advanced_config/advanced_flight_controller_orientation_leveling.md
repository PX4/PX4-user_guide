# Розширене налаштування орієнтації контролера польоту

Ці інструкції можна використовувати для ручного налаштування орієнтації та рівня горизонту, наприклад, для виправлення невеликих відхилень датчиків або незначних помилок під час калібрування.

Якщо існує постійне відхилення (часто спостерігається у багатороторних апаратах, але не обмежується ними), це хороша стратегія виправити його за допомогою цих параметрів зміщення дрібної настройки кута, замість використання ручок регулювання на вашому радіокеруванні.
Це забезпечує, що апарат буде зберігати налаштування під час повністю автономного польоту.

:::info
These instructions are "advanced", and not recommended for regular users (the broad tuning is generally sufficient).
:::

## Налаштування параметрів орієнтації

The [SENS_BOARD_ROT](../advanced_config/parameter_reference.md#SENS_BOARD_ROT) parameter defines the rotation of the flight controller board relative to the vehicle frame, while the fine tuning offsets ([SENS_BOARD_X_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_X_OFF), [SENS_BOARD_Y_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Y_OFF), [SENS_BOARD_Z_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Z_OFF)) set the rotation of the sensors relative to the board itself.
The fine tuning offsets are added to the `SENS_BOARD_ROT` angle in order to determine the total offset angles for the Yaw, Pitch and Roll orientation of the flight controller.

First perform the normal calibration for [Flight Controller Orientation](../config/flight_controller_orientation.md) and [Level Horizon Calibration](../config/level_horizon_calibration.md) to set the [SENS_BOARD_ROT](../advanced_config/parameter_reference.md#SENS_BOARD_ROT) parameter.

Інші параметри можна встановити для точної настройки орієнтації датчиків ІМПУ відносно самої плати.

Ви можете знайти параметри в QGroundControl, як показано нижче:

1. Open QGroundControl menu: **Settings > Parameters > Sensor Calibration**.
2. Параметри, розташовані в розділі, як показано нижче (або ви можете знайти їх):

   ![FC Orientation QGC v2](../../assets/qgc/setup/sensor/fc_orientation_qgc_v2.png)

## Підсумок параметра

- [SENS_BOARD_ROT](../advanced_config/parameter_reference.md#SENS_BOARD_ROT): Rotation of the FMU board relative to the vehicle frame.
- [SENS_BOARD_X_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_X_OFF): Rotation, in degrees, around PX4FMU's X axis or Roll axis.
  Позитивні кути збільшуються в протипротивна годинниковій стрілці (CCW) напрямку, від'ємні кути збільшуються в напрямку за годинниковою стрілкою (CW).
- [SENS_BOARD_Y_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Y_OFF): Rotation, in degrees, around PX4FMU's Y axis or Pitch axis.
  Позитивні кути збільшуються в протипротивна годинниковій стрілці (CCW) напрямку, від'ємні кути збільшуються в напрямку за годинниковою стрілкою (CW).
- [SENS_BOARD_Z_OFF](../advanced_config/parameter_reference.md#SENS_BOARD_Z_OFF): Rotation, in degrees, around PX4FMU's Z axis Yaw axis.
  Позитивні кути збільшуються в протипротивна годинниковій стрілці (CCW) напрямку, від'ємні кути збільшуються в напрямку за годинниковою стрілкою (CW).
