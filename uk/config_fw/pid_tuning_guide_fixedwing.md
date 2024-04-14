# Fixed-wing Rate/Attitude Controller Tuning Guide

Цей посібник пояснює, як вручну налаштувати петлі PID фіксованого крила. Призначено для досвідчених користувачів / експертів, оскільки неправильна настройка PID може зірвати ваш літак.

:::info [Автопідстроювання](../config/autotune.md) рекомендується для більшості користувачів, оскільки воно набагато швидше, простіше і забезпечує хороше налаштування для більшості кадрів. Рекомендується ручна настройка для кадрів, де автоналаштування не працює, або де важлива дотюнінг.
:::

## Передумови

- Спочатку необхідно налаштувати обрізки (перед настроюванням PID). [Посібник з налаштування фіксованого крила](../config_fw/trimming_guide_fixedwing.md) пояснює, як це зробити.
- Неправильно встановлені виграші під час налаштування можуть зробити управління станом нестабільним. Пілот, налаштовуючи коефіцієнти посилення, повинен мати змогу керувати польотом та посадкою літака в режимі [керування вручну](../flight_modes_fw/manual.md) (перевизначення).
- Надмірні виграші (і швидкий рух серводвигуна) можуть порушити максимальні сили вашої конструкції повітряного корпусу - збільшуйте виграші обережно.
- Налаштування крену та тангажу слідують тій самій послідовності. Єдина відмінність полягає в тому, що крен більш чутливий до зміщень тримачів, тому [налаштування тримачів](../config_fw/trimming_guide_fixedwing.md) має бути виконано обережно, а коефіцієнти інтегратора потребують більшої уваги для компенсації цього.

## Встановлення базового каркасу повітряного корпусу

Якщо доступний пілот, здатний до ручного польоту, то краще встановити деякі основні властивості системи на ручному випробуванні. Щоб це зробити, виконайте ці маневри. Навіть якщо ви не зможете відразу зафіксувати всі кількості на папері, журнал буде дуже корисним для подальшого налаштування.

:::info Усі ці величини будуть автоматично зареєстровані. You only need to take notes if you want to directly move on to tuning without looking at the log files.

- Fly level with a convenient airspeed. Note throttle stick position and airspeed (example: 70% → 0.7 throttle, 15 m/s airspeed).
- Climb with maximum throttle and sufficient airspeed for 10-30 seconds (example: 12 m/s airspeed, climbed 100 m in 30 seconds).
- Descend with zero throttle and reasonable airspeed for 10-30 seconds (example: 18 m/s airspeed, descended 80 m in 30 seconds).
- Bank hard right with full roll stick until 60 degrees roll, then bank hard left with full roll stick until 60 degrees in the opposite side.
- Pitch up hard 45 degrees, pitch down hard 45 degrees.
:::

This guide will use these quantities to set some of the controller gains later on.

## Tune Roll

Tune first the roll axis, then pitch. The roll axis is safer as an incorrect tuning leads only to motion, but not a loss of altitude.

### Tuning the Feedforward Gain

To tune this gain, first set the other gains to their minimum values (nominally 0.005, but check the parameter documentation).

#### Gains to set to minimum values

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I)
- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P)

#### Gains to tune

- [FW_RR_FF](../advanced_config/parameter_reference.md#FW_RR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane rolls satisfactorily and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P) - start with a value of 0.06. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce gain by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_RR_I](../advanced_config/parameter_reference.md#FW_RR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual roll value (this will most likely require looking at a log file).

## Tune Pitch

The pitch axis might need more integrator gain and a correctly set pitch offset.

### Tuning the Feedforward Gain

To tune this gain, set the other gains to their minimum values.

#### Gains to set to minimum values

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I)
- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_I)

#### Gains to tune

- [FW_PR_FF](../advanced_config/parameter_reference.md#FW_PR_FF) - start with a value of 0.4. Increase this value (doubling each time) until the plane pitches satisfactory and reaches the setpoint. Back down the gain 20% at the end of the process.

### Tuning the Rate Gain

- [FW_PR_P](../advanced_config/parameter_reference.md#FW_PR_P) - start with a value of 0.04. Increase this value (doubling each time) until the system starts to wobble / twitch. Then reduce value by 50%.

### Tuning the Trim Offsets with the Integrator Gain

- [FW_PR_I](../advanced_config/parameter_reference.md#FW_PR_I) - start with a value of 0.01. Increase this value (doubling each time) until there is no offset between commanded and actual pitch value (this will most likely require looking at a log file).

## Adjusting the Time Constant of the Outer Loop

The overall softness / hardness of the control loop can be adjusted by the time constant. The default of 0.5 seconds should be fine for normal fixed-wing setups and usually does not require adjustment.

- [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC) - set to a default of 0.5 seconds, increase to make the Pitch response softer, decrease to make the response harder.
- [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC) - set to a default of 0.5 seconds, increase to make the Roll response softer, decrease to make the response harder.

## Інші параметри

Найважливіші параметри охоплені в цьому керівництві. Додаткові параметри налаштування задокументовані в [Посилання на параметри](../advanced_config/parameter_reference.md).
