# Advanced TECS Tuning (Weight and Altitude)

Ця тема показує, як ви можете компенсувати зміни в [вагу транспортного засобу](#vehicle-weight-compensation) та [щільність повітря](#air-density-compensation), разом із інформацією про [алгоритми](#weight-and-density-compensation-algorithms), які використовуються.

:::warning
Ця тема вимагає, щоб ви вже виконали [основне налаштування TECS](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed).
:::

[Основне налаштування TECS](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) встановило ключові обмеження продуктивності транспортного засобу, які необхідні для належної роботи контролера висоти та швидкості.

Хоча ці обмеження вказані за допомогою постійних параметрів, насправді продуктивність транспортного засобу не є постійною і залежить від різних факторів.
Якщо не враховувати зміни в вазі та густині повітря, відстеження висоти та швидкості повітря ймовірно погіршиться у випадку, коли конфігурація (густини повітря та ваги) значно відрізняється від конфігурації, при якій тюнінгувався транспортний засіб.

## Компенсація ваги транспортного засобу

Встановіть (обидва) наступні параметри для масштабування максимальної швидкості підйому, мінімальної швидкості опускання та налаштування обмежень швидкості для ваги:

- [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) — вага транспортного засобу, при якій було виконано [Основне налаштування TECS](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed).
- [ВАГА_БРУТТО](../advanced_config/parameter_reference.md#WEIGHT_BASE) — фактична вага транспортного засобу у будь-який момент часу, наприклад, при використанні більшого акумулятора або з вантажем, який не був присутній під час налаштування.

Ви можете визначити значення, вимірюючи вагу транспортного засобу за допомогою ваги в налаштуванні настройки та під час польоту з вантажем.

Масштабування виконується, коли _обидва_ `WEIGHT_BASE` та `WEIGHT_GROSS` більше `0`, і не матиме жодного впливу, якщо значення однакові.
Дивіться розділ [алгоритми](#weight-and-density-compensation-algorithms) нижче для отримання додаткової інформації.

## Air Density Compensation

### Specify a Service Ceiling

У PX4 службовий стелі [FW_SERVICE_CEIL](../advanced_config/parameter_reference.md#FW_SERVICE_CEIL) вказує висоту в стандартних атмосферних умовах, на якій транспортний засіб все ще може досягти максимальної швидкості підйому 0,5 м/с при максимальному режимі газу та вагою, рівною [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).
By default this parameter is disabled and no compensation will take place.

This parameter needs to be determined experimentally.
It is always better to set a conservative value (lower value) than an optimistic value.

### Apply Density Correction to Minimum Sink Rate

The minimum sink rate is set in [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

Якщо налаштування [Основного налаштування TECS](../config_fw/position_tuning_guide_fixedwing.md#tecs-tuning-altitude-and-airspeed) не було виконано в стандартних умовах рівня моря, тоді параметр [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) повинен бути змінений шляхом множення на корекційний фактор $P$ (де $\rho$ - густина повітря під час налаштування):

$$P = \sqrt{\rho\over{\rho_{sealevel}}}$$

For more information see [Effect of Density on minimum sink rate](#effect-of-density-on-minimum-sink-rate).

### Apply Density Correction to Trim Throttle

The trim throttle is set using [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM).

Якщо базове налаштування не було виконано в стандартних умовах рівня моря, тоді значення для [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) повинно бути змінено шляхом множення на корекційний фактор $P$:

$$P = \sqrt{\rho\over{\rho_{sealevel}}}$$

Для отримання додаткової інформації див. [Ефект густини на обрізний регулятор](#effect-of-density-on-trim-throttle)

## Weight and Density Compensation Algorithms

У цьому розділі міститься інформація про операції масштабування, виконані PX4.
Це надається лише для цікавості, і може бути цікавим для розробників, які хочуть змінити код масштабування.

### Записка

У наступних розділах ми будемо використовувати позначення $\hat X$ для того, щоб вказати, що це значення є каліброваним значенням змінної $X$.
Під каліброваним ми маємо на увазі значення цієї змінної, виміряне на рівні моря в стандартних атмосферних умовах, коли вага транспортного засобу дорівнювала [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE).

Наприклад, за $\hat{\dot{h}}_{max}$ ми вказуємо максимальну швидкість підйому, яку транспортний засіб може досягти при [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) на рівні моря в стандартних атмосферних умовах.

### Effect of Weight on Maximum Climb Rate

Максимальна швидкість підйому ([FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX)) масштабується як функція відношення ваги.

From the steady state equations of motions of an airplane we find that the maximum climb rate can be written as:

$$\dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}$$

where `V` is the true airspeed and `m` is the vehicle mass.
From this equation we see that the maximum climb rates scales with vehicle mass.

### Effect of Weight on Minimum Sink Rate

The minimum sink rate ([FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN)) is scaled as a function of weight ratio

The minimum sink rate can be written as:

$$\dot{h}_{min} = \sqrt{2mg\over{\rho S}} f(C_L, C_D)$$

where $\rho$ is the air density, S is the wing surface reference area and $f(C_L, C_D)$ is a function of the polars, lift and drag.

From this equation we see that the minimum sink rate scales with the square root of the weight ratio.

### Effect of Weight on Airspeed Limits

The minimum airspeed ([FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)), the stall airspeed ([FW_AIRSPD_STALL](../advanced_config/parameter_reference.md#FW_AIRSPD_STALL)) and trim airspeed ([FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)) are adjusted based on the weight ratio specified by [WEIGHT_BASE](../advanced_config/parameter_reference.md#WEIGHT_BASE) and [WEIGHT_GROSS](../advanced_config/parameter_reference.md#WEIGHT_GROSS).

In steady state flight we can demand that lift should equal weight of the vehicle:

$$Lift = mg = {1\over{2}} \rho V^2 S C_L$$

rearranging this equation for airspeed gives:

$$V = \\sqrt{\\frac{2mg}{\\rho S C_D }}$$

From this equation we see that if we assume a constant angle of attack (which we generally desire), the vehicle weight affects airspeed with a square root relation.
Therefore, the airspeed limits mentioned above are all scaled using the square root of the weight ratio.

### Effect of Density on Maximum Climb Rate

The maximum climb rate is set using [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX).

As we have seen previously, the maximum climb rate can be formulated as:

$$\dot{h}_{max} = { V * ( Thrust - Drag ) \over{m*g}}$$

The air density affects the airspeed, the thrust and the drag and modelling this effects is not straight forward.
However, we can refer to literature and experience, which suggest that for a propeller airplane the maximum climb rate reduces approximately linear with the air density.
Therefore, we can write the maximum climb rate as:

$$\dot{h}_{max} = \hat{\dot{h}} * {\rho_{sealevel} \over{\rho}} K$$

where $\rho_{sealevel}$ is the air density at sea level in the standard atmosphere and K is a scaling factor which determines the slope of the function.
Rather than trying to identify this constants, the usual practice in aviation is to specify a service ceiling altitude at which the vehicle is still able to achieve a minimum specified climb rate.

### Effect of Density on Minimum Sink Rate

The minimum sink rate is set using [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN).

In previous sections we have seen the formula for the minimum sink rate:

$$\dot{h}_{min} = \sqrt{2mg\over{\rho S}} f(C_L, C_D)$$

This shows that the minimum sink rate scales with the square root of the inverse air density.

### Effect of Density on Trim Throttle

TODO: Add derivation here.
