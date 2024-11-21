# Static Pressure Buildup

Air flowing over an enclosed vehicle can cause the _static pressure_ to change within the canopy/hull.
В залежності від місця розташування отворів/протікань в корпусі, ви можете мати недостатній або зайвий тиск (аналогічно крилу).

Зміна тиску може впливати на виміри барометра, що призводить до неточної оцінки висоти.
This might manifest as the vehicle losing altitude when it stops moving in [Altitude](../flight_modes_mc/altitude.md), [Position](../flight_modes_mc/position.md) or [Mission](../flight_modes_mc/mission.md) modes (when the vehicle stops moving the static pressure drops, the sensor reports a higher altitude, and the vehicle compensates by descending).
Проблема особливо помітна на багтороторних літальних апаратах, оскільки твердокрилі транспортні засоби рухаються з більш постійною швидкістю повітря (і саме зміни швидкості повітря помітні).

Одним із рішень є використання отворів з наповненим пінопластом для зменшення накопичення (наскільки це можливо), а потім спроба динамічної калібрування для усунення будь-яких залишкових ефектів.

:::tip
Before "fixing" the problem you should first check that the Z setpoint tracks the estimated altitude (to verify that there are no controller issues).
:::

:::info
While it is possible to remove the barometer from the altitude estimate (i.e. only use altitude from the GPS), this is not recommended.
Система GPS є неточною в багатьох середовищах, особливо в міських середовищах, де відбувається відбиття сигналу від будівель.
:::

## Аналіз повітряного потоку

Ви можете змінити корпус, просвердливши отвори або заповнивши їх пінопластом.

Один із способів проаналізувати ефекти цих змін - закріпити дрон на автомобілі та їздити навколо (на відносно рівній поверхні) з відкритим корпусом на вітер.
Розглядаючи наземну станцію, ви можете оцінити ефекти змін статичного тиску, спричинених рухом, на виміряну висоту (використовуючи дорогу як "об'єктивну правду").

Цей процес дозволяє швидко вносити зміни без розрядження акумуляторів: модифікуйте дрон, їздіть/переглядайте, повторюйте!

:::tip
Aim for a barometer altitude drop of less than 2 metres at maximum horizontal speed before attempting software-based calibration below.
:::

## Динамічне калібрування

After modifying the hardware, you can then use the [EKF2_PCOEF\_\*](../advanced_config/parameter_reference.md#EKF2_PCOEF_XN) parameters to tune for expected barometer variation based on relative air velocity.
For more information see [ECL/EKF Overview & Tuning > Correction for Static Pressure Position Error](../advanced_config/tuning_the_ecl_ekf.md#correction-for-static-pressure-position-error).

:::info
The approach works well if the relationship between the error due to static pressure and the velocity varies linearly.
Якщо у транспортного засобу є складніша аеродинамічна модель, цей метод буде менш ефективним.
:::
