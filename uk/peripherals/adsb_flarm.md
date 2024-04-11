# Приймачі ADS-B/FLARM/UTM: Уникнення повітряного трафіку

PX4 підтримує просте уникнення повітряного трафіку in [ missions ](../flying/missions.md) за допомогою [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance_%E2%80%93_broadcast), [FLARM](https://en.wikipedia.org/wiki/FLARM) або [UTM](https://www.faa.gov/uas/research_development/traffic_management) транспондерів, які використовують стандартні інтерфейси MAVLink.

Якщо виявлено потенційне зіткнення, PX4 може _попередити_, негайно [посадити](../flight_modes_mc/land.md), або [повернутися](../flight_modes_mc/return.md) (залежно від значення [NAV_TRAFF_AVOID](#NAV_TRAFF_AVOID)).

## Підтримуване обладнання

Система уникнення PX4 працює з продуктами ADS-B або FLARM, які постачають дані транспондера за допомогою повідомлення MAVLink [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE), та продуктами UTM, які постачають дані транспондера за допомогою повідомлення MAVLink [UTM_GLOBAL_POSITION](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION).

Було протестовано з наступними пристроями:

- [PingRX ADS-B Receiver](https://uavionix.com/product/pingrx-pro/) (uAvionix)
- [FLARM](https://flarm.com/products/uav/atom-uav-flarm-for-drones/) <!-- I think originally https://flarm.com/products/powerflarm/uav/ -->

## Налаштування програмного забезпечення

Будь-який з пристроїв може бути підключений до будь-якого вільного/не використаного послідовного порту на контролері польоту. Зазвичай вони пов'язані з `TELEM2` (якщо це не використовується для іншої мети).

### PingRX

Порт PingRX MAVLink використовує роз'єм-матинг JST ZHR-4 з роз'ємом, як показано нижче.

| Pin     | Signal   | Volt         |
| ------- | -------- | ------------ |
| 1 (red) | RX (IN)  | +5V tolerant |
| 2 (blk) | TX (OUT) |              |
| 3 (blk) | Power    | +4 to 6V     |
| 4 (blk) | GND      | GND          |

PingRX поставляється з кабелем-перехідником, який можна підключити безпосередньо до порту TELEM2 (DF13-6P) на [mRo Pixhawk](../flight_controller/mro_pixhawk.md). Для інших портів або плат, вам доведеться отримати свій власний кабель.

## FLARM

FLARM має вбудований роз'єм DF-13 6 Pin, який має ідентичну розпіновку з [mRo Pixhawk](../flight_controller/mro_pixhawk.md).

| Pin     | Signal   | Volt        |
| ------- | -------- | ----------- |
| 1 (red) | VCC      | +4V to +36V |
| 2 (blk) | TX (OUT) | +3.3V       |
| 3 (blk) | RX (IN)  | +3.3V       |
| 4 (blk) | -        | +3.3V       |
| 5 (blk) | -        | +3.3V       |
| 6 (blk) | GND      | GND         |

::: інформація
TX та RX на контролері польоту повинні бути підключені до RX та TX на FLARM, відповідно.
:::

## Конфігурація програмного забезпечення

### Port Configuration

Отримувачі налаштовані так само, як будь-який інший [Пристрій MAVLink](../peripherals/mavlink_peripherals.md). Єдине _специфічне_ налаштування полягає в тому, що швидкість передачі даних порту повинна бути встановлена на 57600, а профіль з низькою пропускною здатністю (`MAV_X_MODE`).

Припускаючи, що ви підключили пристрій до порту TELEM2, [встановіть параметри](../advanced_config/parameters.md) так, як показано:

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG) = TELEM 2
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_1_MODE) = Normal
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_1_RATE) = 0 (default sending rate for port).
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_1_FORWARD) = Enabled

Перезавантажте пристрій.

Тепер ви знайдете новий параметр, який називається [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD), який повинен бути встановлений на 57600.

### Налаштування передачі трафіку

Налаштуйте дію у випадку потенційної зіткнення за допомогою параметри нижче:

| Параметр                                                                                                  | Опис                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="NAV_TRAFF_AVOID"></a>[NAV_TRAFF_AVOID](../advanced_config/parameter_reference.md#NAV_TRAFF_AVOID)   | Enable traffic avoidance mode specify avoidance response. 0: Disable, 1: Warn only, 2: Return mode, 3: Land mode.                                                                 |
| <a id="NAV_TRAFF_A_HOR"></a>[NAV_TRAFF_A_HOR](../advanced_config/parameter_reference.md#NAV_TRAFF_A_HOR)   | Horizonal radius of cylinder around the vehicle that defines its airspace (i.e. the airspace in the ground plane).                                                                |
| <a id="NAV_TRAFF_A_VER"></a>[NAV_TRAFF_A_VER](../advanced_config/parameter_reference.md#NAV_TRAFF_A_VER)   | Vertical height above and below vehicle of the cylinder that defines its airspace (also see [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR)).                                               |
| <a id="NAV_TRAFF_COLL_T"></a>[NAV_TRAFF_COLL_T](../advanced_config/parameter_reference.md#NAV_TRAFF_COLL_T) | Collision time threshold. Avoidance will trigger if the estimated time until collision drops below this value (the estimated time is based on relative speed of traffic and UAV). |

## Імплементація

### ADSB/FLARM

PX4 слухає дійсні звіти про транспондери під час місій.

Якщо отримано дійсний звіт від транспондера, PX4 спочатку використовує інформацію про транспондер руху, щоб оцінити, чи показує напрямок та висота руху, що буде перетинатися з повітряним простором БПЛА. Повітряний простір БПЛА складається з оточуючого циліндра, визначеного радіусом [NAV_TRAFF_A_HOR](#NAV_TRAFF_A_HOR) та висотою [NAV_TRAFF_A_VER](#NAV_TRAFF_A_VER), з БПЛА у центрі. Датчик руху перевіряє, чи час до перетину з повітряним простором БПЛА нижче порогу [NAV_TRAFF_COLL_T](#NAV_TRAFF_COLL_T) на основі відносної швидкості. Якщо обидва перевірки виконані, запускається дія [Traffic Avoidance Failsafe](../config/safety.md#traffic-avoidance-failsafe), і транспортний засіб або попереджує, або сідає, або повертається.

The code can be found in `Navigator::check_traffic` ([/src/modules/navigator/navigator_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/navigator/navigator_main.cpp)).

PX4 також передаватиме дані транспондера на GCS, якщо це було налаштовано для екземпляра MAVLink (це рекомендується). Останні 10 цифр GUID відображаються як ідентифіфікація дрона.

### UTM

PX4 прослуховує повідомлення MAVLink `UTM_GLOBAL_POSITION` під час місій. Коли отримано дійсне повідомлення, його прапорці дійсності, позиція та напрямок відображаються в тій же темі UORB `transponder_report`, що використовується для уникнення трафіку _ADS-B_.

The implementation is otherwise _exactly_ as described in the section above.

::: інформація [UTM_GLOBAL_POSITION](https://mavlink.io/en/messages/common.html#UTM_GLOBAL_POSITION) містить додаткові поля, які не надаються транспондером ADSB (див. [ADSB_VEHICLE](https://mavlink.io/en/messages/common.html#ADSB_VEHICLE)). Поточна реалізація просто відкидає додаткові поля (включаючи інформацію про заплановану наступну точку шляху транспортного засобу).
:::

## Тестування/Симульований трафік ADSB

Ви можете симулювати трафік ADS-B для тестування. Зверніть увагу, що для цього потрібно, щоб ви [збудували PX4](../dev_setup/building_px4.md).

::: інформація
Симульований трафік ADS-B може спричинити реальні аварійні дії.
Використовуйте обережно в реальному польоті!
:::

Щоб увімкнути цю функцію:

1. Uncomment the code in `AdsbConflict::run_fake_traffic()`([AdsbConflict.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/adsb/AdsbConflict.cpp#L342C1-L342C1)).
1. Перебудувати та запустити PX4.
1. Execute the [`navigator fake_traffic` command](../modules/modules_controller.md#navigator) in the [QGroundControl MAVLink Shell](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (or some other [PX4 Console or MAVLink shell](../debug/consoles.md), such as the PX4 simulator terminal).

The code in `run_fake_traffic()` is then executed. You should see ADS-B warnings in the Console/MAVLink shell, and QGC should also show an ADS-B traffic popup.

By default `run_fake_traffic()` publishes a number of traffic messages (it calls [`AdsbConflict::fake_traffic()`](#fake-traffic-method) to emit each report). These simulate ADS-B traffic where there may be a conflict, where there won't be a conflict, as well as spamming the traffic buffer.

:: деталі інформації про тестові методи

The relevent methods are defined in [AdsbConflict.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/lib/adsb/AdsbConflict.cpp#L342C1-L342C1).

#### `run_fake_traffic()` method

The `run_fake_traffic()` method is run when the `navigator fake_traffic` command is called.

The method calls the `fake_traffic()` method to generate simulated transponder messages around the current vehicle position. It passes in the current vehicle position, and information about the simulated traffic, such as callsign, distances, directions, altitude differences, velocities, and emitter types.

The (commented out) code in `run_fake_traffic()` simulates a number of different scenarios, including conflicts and non-conflicts, as well as spamming the traffic buffer.

#### `fake_traffic()` method

`AdsbConflict::fake_traffic()` is called by the [`run_fake_traffic()`](#run-fake-traffic-method) to create individual ADS-B transponder reports.

Це приймає кілька параметрів, які вказують на характеристики фальшивого трафіку:

- `callsign`: Callsign of the fake transponder.
- `distance`: Horizontal distance to the fake vehicle from the current vehicle.
- `direction`: Direction in NED from this vehicle to the fake in radians.
- `traffic_heading`: Travel direction of the traffic in NED in radians.
- `altitude_diff`: Altitude difference of the fake traffic. Positive is up.
- `hor_velocity`: Horizontal velocity of fake traffic, in m/s.
- `ver_velocity`: Vertical velocity of fake traffic, in m/s.
- `emitter_type`: Type of fake vehicle, as an enumerated value.
- `icao_address`: ICAO address.
- `lat_uav`: Lat of this vehicle (used to position fake traffic around vehicle)
- `on_uav`: Lon of this vehicle (used to position fake traffic around vehicle)
- `alt_uav`: Altitude of the vehicle (as reference - used to position fake traffic around vehicle)

Метод створює симульоване повідомлення транспондера біля транспортного засобу, використовуючи наступні кроки:

- Обчислює широту та довготу трафіку на основі позиції БПЛА, відстані та напрямку.
- Обчислює нову висоту, додавши різницю висоти до висоти БПЛА.
- Заповнює тему [TransponderReport](../msg_docs/TransponderReport.md) симульованими даними про трафік.
- If the board supports a Universally Unique Identifier (UUID), the method retrieves the UUID using `board_get_px4_guid` and copies it to the `uas_id` field of the structure. В іншому випадку воно генерує симульований GUID.
- Publishes the simulated traffic message using `orb_publish`.

:::

<!-- See also implementation PR: https://github.com/PX4/PX4-Autopilot/pull/21283 -->
<!-- See also bug to make this work without uncommenting: https://github.com/PX4/PX4-Autopilot/issues/21810 -->

## Подальша інформація

- [MAVLink Peripherals](../peripherals/mavlink_peripherals.md)
- [Конфігурація послідовного порту](../peripherals/serial_configuration.md)
