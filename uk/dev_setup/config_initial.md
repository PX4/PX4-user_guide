# Початкове налаштування та конфігурація

Ми рекомендуємо розробникам отримати базове обладнання та програмне забезпечення, описане нижче (або подібне).

## Базове обладнання

:::tip
PX4 можна використовувати з набагато ширшим діапазоном обладнання, ніж описано тут, але для нових розробників корисніше працювати з одним із стандартних налаштувань.
A Taranis RC and a mid-range Android tablet make a very inexpensive field kit.
:::

Нижченаведене обладнання дуже рекомендується:

- **RC controller** for the safety pilot
  - [Taranis Plus](https://www.frsky-rc.com/product/taranis-x9d-plus-2/) RC control (or equivalent)
- **Development computer**

  ::: info
The listed computers have acceptable performance, but a more recent and powerful computer is recommended.
:::

  - Lenovo Thinkpad with i5-core running Windows 11
  - MacBook Pro (early 2015 and later) with macOS 10.15 or later
  - Lenovo Thinkpad i5 with Ubuntu Linux 20.04 or later

- **Наземна станція керування** (комп'ютер або планшет):
  - iPad (may require Wifi telemetry adapter)
  - Будь-який ноутбук MacBook або Ubuntu Linux (може бути комп'ютером для розробки)
  - A recent mid-range Android tablet or phone with a large enough screen to run _QGroundControl_ effectively (6 inches).
- **Рухомий засіб, здатний до роботи з PX4**:
  - [Візьміть готовий рухомий засіб](../complete_vehicles_mc/index.md)
  - [Створіть свій власний](../frames_multicopter/kits.md)
- **Захисні окуляри**
- **Трос** (тільки для мультикоптерів - для ризикованих експериментів)

## Конфігурація рухомого засобу

Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md) for a **desktop OS**.

Для налаштування засобу:

1. [Встановіть прошивку PX4](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (включаючи "спеціальну" прошивку з вашими змінами).
1. [Почніть з планера](../config/airframe.md) що найбільше підходить до вашого засобу з [довідника планерів](../airframes/airframe_reference.md).
1. [Основне налаштування](../config/README.md) пояснює як виконати основне налаштування.
1. [Налаштування параметрів](../advanced_config/parameters.md) пояснює як знайти та змінити окремі параметри.

:::note

- Варіант _QGroundControl_ для мобільних пристроїв не підтримує налаштування рухомого засобу.
- _Денні збірки_ включають інструменти розробника, а також нові можливості, які недоступні в офіційних релізах.
- Конфігурації в довіднику планерів літали на реальних засобах та є хорошою стартовою точкою для "відриву від землі".

:::
