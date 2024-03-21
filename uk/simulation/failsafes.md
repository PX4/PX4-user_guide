# Симуляція запобігання відмовам

[Запобіжники відмов](../config/safety.md) визначають безпечні межі/умови за яких можна безпечно використовувати PX4, та дію яка буде виконана якщо спрацює запобіжник відмови (наприклад посадка, утримання позиції або повернення до зазначеної точки).

У SITL деякі запобіжники відмов за замовчуванням вимкнені, щоб забезпечити простіше використання симуляції. Ця тема пояснює, як ви можете перевірити критично важливу для безпеки поведінку в симуляції SITL перед тим, як спробувати її в реальному світі.

:::note
Також можна перевірити запобіжники відмов використовуючи [HITL симуляцію](../simulation/hitl.md). HITL використовує нормальні параметри налаштувань вашого контролера польоту.
:::

## Втрата каналу зв'язку

Запобіжник _Втрати каналу зв'язку_ (недоступність зовнішніх даних через MAVLink) увімкнений за замовчуванням. Це робить симуляцію придатною до використання тільки з під'єднаним GCS, SDK або іншим додатком MAVLink.

Встановіть параметр [NAV_DLL_ACT](../advanced_config/parameter_reference.md#NAV_DLL_ACT) на бажану дію запобігання відмові для зміни поведінки. Наприклад встановіть у `0`, щоб вимкнути її.

:::note
Всі параметри в SITL, включаючи цей, скидається якщо ви виконаєте `make clean`.
:::

## Втрата каналу радіо керування

Запобіжник _Втрати каналу РК_ (недоступність зовнішніх даних дистанційного керування) увімкнений за замовчуванням. Це робить симуляцію придатною до використання тільки з активним з'єднанням MAVLink або дистанційного керування.

Встановіть параметр [NAV_RCL_ACT](../advanced_config/parameter_reference.md#NAV_RCL_ACT) на бажану дію запобігання відмові для зміни поведінки. Наприклад встановіть у `0`, щоб вимкнути її.

:::note
Всі параметри в SITL, включаючи цей, скидається якщо ви виконаєте `make clean`.
:::

## Низький заряд батареї

The simulated battery is implemented to never run out of energy, and by default only depletes to 50% of its capacity and hence reported voltage. This enables testing of battery indication in GCS UIs without triggering low battery reactions that might interrupt other testing.

To change this minimal battery percentage value use the parameter [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT).

To control how fast the battery depletes to the minimal value use the parameter [SIM_BAT_DRAIN](../advanced_config/parameter_reference.md#SIM_BAT_DRAIN).

:::tip
By changing [SIM_BAT_MIN_PCT](../advanced_config/parameter_reference.md#SIM_BAT_MIN_PCT) in flight, you can also test regaining capacity to simulate inaccurate battery state estimation or in-air charging technology.
:::

## Sensor/System Failure

[Failure injection](../debug/failure_injection.md) can be used to simulate different types of failures in many sensors and systems. For example, this can be used to simulate absent or intermittent GPS, RC signal that has stopped or got stuck on a particular value, failure of the avoidance system, and much more.

For example, to simulate GPS failure:

1. Enable the parameter [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN).
1. Enter the following commands on the SITL instance _pxh shell_:

   ```sh
   # Turn (all) GPS off
   failure gps off

   # Turn (all) GPS on
   failure gps ok
   ```

See [System Failure Injection](../debug/failure_injection.md) for a list of supported target sensors and failure modes.
