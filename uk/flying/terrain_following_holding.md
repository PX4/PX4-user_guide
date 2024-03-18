# Terrain Following/Holding

PX4 supports [Terrain Following](#terrain_following) and [Terrain Hold](#terrain_hold) in [Position](../flight_modes_mc/position.md) and [Altitude modes](../flight_modes_mc/altitude.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).

:::note PX4 does not "natively" support terrain following in missions. *QGroundControl* can be used to define missions that *approximately* follow terrain (this just sets waypoint altitudes based on height above terrain, where terrain height at waypoints is obtained from a map database).
:::

<a id="terrain_following"></a>

## Terrain Following

*Слідування за місцевістю* дозволяє транспортному засобу автоматично підтримувати відносно сталу висоту над рівнем землі при переміщенні на низьких висотах. Це корисно для уникнення перешкод і для підтримки постійної висоти під час польоту над різноманітним рельєфом (наприклад, для аерофотозйомки).

:::tip
Цю функцію можна активувати в режимах [Положення](../flight_modes_mc/position.md) та [Висота](../flight_modes_mc/altitude.md) на *багтрокерах* та *вертикально-взлітно-посадкових апаратах в режимі MC*, які мають [датчик відстані](../sensor/rangefinders.md).
:::

Коли ввімкнено *слідування за місцевістю*, PX4 використовує вихід оцінювача EKF для надання оцінки висоти, а оцінена висота місцевості (обчислена з вимірів датчиків відстані за допомогою іншого оцінювача) - для надання установленої точки висоти. При зміні відстані до землі установлена точка висоти коригується так, щоб зберегти висоту над землею постійною.

На великих висотах (коли оцінювач повідомляє, що дані від датчика відстані недійсні), транспортний засіб переходить до *слідування за висотою*, і, як правило, літає практично на постійній висоті над середнім рівнем моря (AMSL), використовуючи абсолютний висотомір для даних про висоту.

:::note
More precisely, the vehicle will use the available selected sources of altitude data as defined [here](../advanced_config/tuning_the_ecl_ekf.md#height).
:::

Terrain following is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `1`.


<a id="terrain_hold"></a>

## Terrain Hold

*Terrain hold* uses a distance sensor to help a vehicle to better maintain a constant height above ground in altitude control modes, when horizontally stationary at low altitude. This allows a vehicle to avoid altitude changes due to barometer drift or excessive barometer interference from rotor wash.

:::note
This feature can be enabled in [Position](../flight_modes_mc/position.md) and [Altitude modes](../flight_modes_mc/altitude.md), on *multicopters* and *VTOL vehicles in MC mode* that have a [distance sensor](../sensor/rangefinders.md).
:::

When moving horizontally (`speed >` [MPC_HOLD_MAX_XY](../advanced_config/parameter_reference.md#MPC_HOLD_MAX_XY)), or above the altitude where the distance sensor is providing valid data, the vehicle will switch into *altitude following*.

Terrain holding is enabled by setting [MPC_ALT_MODE](../advanced_config/parameter_reference.md#MPC_ALT_MODE) to `2`.

:::note
*Terrain hold* is implemented similarly to [terrain following](#terrain_following). Вона використовує вихід оцінювача EKF для надання оцінки висоти та оцінку висоти місцевості (розраховану на основі вимірів датчика відстані за допомогою окремого однорівневого оцінювача місцевості), щоб надати точку установки висоти. Якщо відстань до землі змінюється через зовнішні сили, точка установки висоти коригується, щоб забезпечити постійну висоту над землею.
:::
