# Траєкторія Jerk-limited типу для Мультикоперів

Тип траєкторії з обмеженим рухом джерка забезпечує плавний рух у відповідь на введення палиці користувача або зміни місії (наприклад: для зйомки, картографування, вантажу). Він генерує симетричні плавні S-криві, де обмеження різкості та прискорення завжди гарантовані.

Цей тип траєкторії завжди увімкнений у режимі [Місія](../flight_modes_mc/mission.md). Щоб увімкнути його в режимі [Режим позиціонування](../flight_modes_mc/position.md) встановіть параметр: [MPC_POS_MODE=3](../advanced_config/parameter_reference.md#MPC_POS_MODE).

:::info Тип з обмеженим jerk не використовується _за замовчуванням_ у режимі позиціонування. Це може бути не підходить для транспортних засобів / випадків використання, які вимагають швидкої відповіді - наприклад, гонщицькі квадрокоптери.
:::

## Генератор траєкторії

Графік нижче показує типовий профіль обмеження ривка з наступними обмеженнями:

- `jMax`: максимальне ривкості
- `a0`: початкове прискорення
- `aМакс`: максимальне прискорення
- `a3`: кінцеве прискорення (завжди 0)
- `v0`: початкова швидкість
- `vRef`: бажана швидкість

Обмеження `jMax`, `aMax` можуть бути налаштовані користувачем через параметри і можуть відрізнятися в ручному керуванні позицією та автоматичному режимі.

Отриманий профіль швидкості часто називають "S-кривою".

![Jerk-limited trajectory](../../assets/config/mc/jerk_limited_trajectory_1d.png)

## Ручний режим

У ручному режимі положення палиці відображаються на швидкість, де повне відхилення палиці XY відповідає [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL), а повне відхилення палиці Z відповідає [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP) (рух вгору) або [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN) (рух вниз).

### Обмеження

XY-plane:

- `jMax`: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`: [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)

Z-axis:

- `jMax`: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax` (рух вгору): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax` (рух вниз): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

## Автоматичний режим

У режимі автоматичного руху бажана швидкість є [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE), але це значення автоматично коригується в залежності від відстані до наступної точки маршруту, максимально можливої швидкості в точці маршруту та максимального бажаного прискорення та ривка. Вертикальна швидкість визначається за допомогою [MPC_Z_V_AUTO_UP](../advanced_config/parameter_reference.md#MPC_Z_V_AUTO_UP) (рух вгору) та [MPC_Z_V_AUTO_DN](../advanced_config/parameter_reference.md#MPC_Z_V_AUTO_DN) (рух вниз).

### Обмеження

XY-plane:

- `jMax`: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`: [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)

Z-axis:

- `jMax`: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax` (рух вгору): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax` (рух донизу): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

Відстань до отримання швидкості, коли близько до точки маршруту:

- [MPC_XY_TRAJ_P](../advanced_config/parameter_reference.md#MPC_XY_TRAJ_P)

### Зв'язані параметри

- [MPC_XY_VEL_MAX](../advanced_config/parameter_reference.md#MPC_XY_VEL_MAX)
- [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP)
- [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN)
- [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)
- [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)
- [MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)
- [MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)
