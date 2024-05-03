# Повідомлення MAVLink

[MAVLink](https://mavlink.io/en/) це дуже легкий протокол обміну повідомленнями, який був спроектований для екосистеми дронів.

PX4 використовує _MAVLink_ для зв'язку з наземними станціями і MAVLink SDK, такими як _QGroundControl_ і [MAVSDK](https://mavsdk.mavlink.io/), а також як інтеграційний механізм для підключення до компонентів дрона за межами польотного контролера: комп'ютерів-компаньйонів, камер з підтримкою MAVLink і так далі.

Ця тема надає короткий огляд основних концепцій MAVLink, таких як повідомлення, команди та мікросервіси. Він також надає інструкції посібника про те, як ви можете додати підтримку PX4 для:

- Потокових повідомлень MAVLink
- Обробка вхідних повідомлень MAVLink та запис до теми uORB.

:::info Ця тема не охоплює обробку та надсилання _команд_ або реалізацію власних мікросервісів.
:::

## Огляд MAVLink

MAVLink - це легкий протокол, який був розроблений для ефективної відправки повідомлень по ненадійним радіоканалах з низькою пропускною здатністю.

_Повідомлення_ є найпростішим і найбільш "фундаментальним" визначенням у MAVLink, що складається з назви (наприклад, [ATTITUDE](https://mavlink.io/en/messages/common.html#ATTITUDE)), ідентифікатора та полів, що містять відповідні дані. Вони навмисно легкі, мають обмежений розмір і не мають семантики для повторного надсилання та підтвердження. Окремі повідомлення зазвичай використовуються для потокової передачі телеметрії або інформації про стан, а також для надсилання команд, які не потребують підтвердження - наприклад, команд уставки, що надсилаються з високою швидкістю.

[Command Protocol](https://mavlink.io/en/services/command.html) - це протокол вищого рівня для надсилання команд, які можуть потребувати підтвердження. Конкретні команди визначаються як значення списку [MAV_CMD](https://mavlink.io/en/messages/common.html#mav_commands), наприклад, команда зльоту [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF), і включають до 7 числових значень "param". Протокол надсилає команду, упаковуючи значення параметрів у повідомлення `COMMAND_INT` або `COMMAND_LONG`, і чекає на підтвердження з результатом у `COMMAND_ACK`. Якщо команда не буде отримана, вона буде повторно надіслана автоматично. Зауважте, що визначення [MAV_CMD](https://mavlink.io/en/messages/common.html#mav_commands) також використовуються для визначення дій місії, і що не всі визначення підтримуються для використання у командах/місіях на PX4.

[Мікросервіси](https://mavlink.io/en/services/) - це інші протоколи вищого рівня, побудовані на основі повідомлень MAVLink. Вони використовуються для передачі інформації, яку неможливо надіслати одним повідомленням, а також для забезпечення таких функцій, як надійний зв'язок. Описаний вище командний протокол є одним з таких сервісів. Інші включають [Протокол передачі файлів](https://mavlink.io/en/services/ftp.html), [Протокол камери](https://mavlink.io/en/services/camera.html) і [Протокол місії](https://mavlink.io/en/services/mission.html).

MAVLink повідомлення, команди та переліки визначаються у [XML-файлах визначень](https://mavlink.io/en/guide/define_xml_element.html). Інструментарій MAVLink включає в себе генератори коду, які створюють з цих визначень специфічні для мови програмування бібліотеки для надсилання та отримання повідомлень. Зверніть увагу, що більшість згенерованих бібліотек не створюють код для реалізації мікросервісів.

Проект MAVLink стандартизує ряд повідомлень, команд, переліків та мікросервісів для обміну даними за допомогою наступних файлів визначень (зауважте, що файли вищого рівня _ включають_ визначення файлів нижчого рівня):

- [development.xml](https://mavlink.io/en/messages/development.html) - Визначення, які пропонується включити до стандарту. Визначення переміщуються до `common.xml`, якщо їх прийнято після тестування.
- [common.xml](https://mavlink.io/en/messages/common.html) - "бібліотека" визначень, що відповідають багатьом поширеним випадкам використання БПЛА. Вони підтримуються багатьма польотними стеками, наземними станціями та периферійними пристроями MAVLink. Польотні стеки, які використовують ці визначення, з більшою ймовірністю будуть взаємодіяти.
- [standard.xml](https://mavlink.io/en/messages/standard.html) - Визначення, які є стандартними. Вони присутні на переважній більшості польотних стеків і реалізовані однаково.
- [minimal.xml](https://mavlink.io/en/messages/minimal.html) - Визначення, необхідні для мінімальної реалізації MAVLink.

Проект також містить [діалектні XML-визначення](https://mavlink.io/en/messages/#dialects), які містять визначення MAVLink, специфічні для польотного стеку або інших зацікавлених сторін.

Протокол покладається на те, що кожна сторона комунікації має спільне визначення того, які повідомлення надсилаються. Це означає, що для того, щоб взаємодіяти, обидва кінці комунікації повинні використовувати бібліотеки, створені на основі одного і того ж визначення XML.


<!--
The messages are sent over-the-wire in the "payload" of a [MAVLink packet](https://mavlink.io/en/guide/serialization.html#mavlink2_packet_format).
In order to reduce the amount of information that must be sent, the packet does not include the message metadata, such as what fields are in the message and so on.
Instead, the fields are serialized in a predefined order based on data size and XML definition order, and MAVLink relies on each end of the communication having a shared definition of what messages are being sent.
The shared identity of the message is conveyed by the message id, along with a CRC ("`CRC_EXTRA`") that uniquely identifies the message based on its name and id, and the field names and types.
The receiving end of the communication will discard any packet for which the message id and the `CRC_EXTRA` do not match.
-->

## PX4 та MAVLink

PX4 за замовчуванням випускає збірку `common.xml` визначень MAVLink для забезпечення максимальної сумісності з наземними станціями MAVLink, бібліотеками та зовнішніми компонентами, такими як камери MAVLink. У гілці `main` вони містяться у `development.xml` на SITL та `common.xml` для інших плат.

:::info Щоб бути частиною випуску PX4, всі визначення MAVLink, які ви використовуєте, повинні знаходитися у `common.xml` (або у включених файлах, таких як `standard.xml` та `minimal.xml`). Під час розробки ви можете використовувати визначення в `development.xml`. Вам потрібно буде попрацювати з [командою MAVLink](https://mavlink.io/en/contributing/contributing.html), щоб визначити і внести ці визначення.
:::

PX4 включає репозиторій [mavlink/mavlink](https://github.com/mavlink/mavlink) як підмодуль у [/src/modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink). Тут містяться файли визначень XML у каталозі [/mavlink/messages/1.0/](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/).

Інструментарій збірки генерує заголовні файли MAVLink 2 C під час збірки. XML-файл, для якого генеруються файли заголовків, можна визначити у конфігурації плати [PX4 kconfig](../hardware/porting_guide_config.md#px4-board-configuration-kconfig) для кожної окремої плати за допомогою змінної `CONFIG_MAVLINK_DIALECT`:

- Для SITL `CONFIG_MAVLINK_DIALECT` встановлено у `development` у [boards/px4/sitl/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/sitl/default.px4board#L36). Ви можете змінити його на будь-який інший файл визначення, але він повинен містити `common.xml`.
- Для інших плат `CONFIG_MAVLINK_DIALECT` не встановлено за замовчуванням, і PX4 збирає визначення у `common.xml` (за замовчуванням вони вбудовані у [mavlink module](../modules/modules_communication.md#mavlink) - шукайте `menuconfig MAVLINK_DIALECT` у [src/modules/mavlink/Kconfig](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/Kconfig#L10)).

Файли генеруються до каталогу збірки: `/build/<build target>/mavlink/`.

## Спеціальні повідомлення MAVLink

Користувацьке повідомлення MAVLink - це повідомлення, якого немає у визначеннях за замовчуванням, включених до PX4.

:::info
Якщо ви використовуєте користувацьке визначення, вам потрібно буде підтримувати визначення у PX4, вашій наземній станції та будь-яких інших SDK, які взаємодіють з нею.
Загалом, щоб зменшити тягар обслуговування, слід використовувати (або доповнювати) стандартні визначення, якщо це можливо.
:::

Користувацькі визначення можна додати до нового файлу діалекту у тому самому каталозі, що й стандартні визначення XML. Наприклад, створіть `PX4-Autopilot/src/modules/mavlink/mavlink/mavlink/message_definitions/v1.0/custom_messages.xml` і встановіть `CONFIG_MAVLINK_DIALECT` для створення нового файла для SITL. Цей файл діалекту має містити `development.xml`, щоб до нього було включено всі стандартні визначення.

Для початкового прототипування, або якщо ви плануєте, що ваше повідомлення буде "стандартним", ви також можете додати свої повідомлення до `common.xml` (або `development.xml`). Це спрощує збірку, оскільки вам не потрібно модифікувати вже зібраний діалект.

Посібник розробника MAVLink пояснює, як визначити нові повідомлення у розділі [How to Define MAVLink Messages & Enums](https://mavlink.io/en/guide/define_xml_element.html).

Ви можете перевірити, що ваші нові повідомлення зібрано, переглянувши заголовки, згенеровані у каталозі збірки (`/build/<build target>/mavlink/`). Якщо ваші повідомлення не збираються, вони можуть бути неправильно відформатовані або використовувати конфліктуючі ідентифікатори. Перевірте журнал збірки для отримання інформації.

Після того, як повідомлення створено, ви можете передавати, отримувати або використовувати його в інший спосіб, як описано в наступних розділах.

Посібник [MAVLink Developer Guide](https://mavlink.io/en/getting_started/) містить більше інформації про використання інструментарію MAVLink.
:::

## Потокові повідомлення MAVLink

Повідомлення MAVLink транслюються за допомогою потокового класу, похідного від `MavlinkStream`, який було додано до списку потоків PX4. Клас має фреймворкові методи, які ви реалізуєте, щоб PX4 міг отримати потрібну йому інформацію зі згенерованого визначення повідомлення MAVLink. Він також має метод `send()`, який викликається кожного разу, коли потрібно надіслати повідомлення - ви перевизначаєте його, щоб скопіювати інформацію з підписки uORB в об'єкт повідомлення MAVLink, який потрібно надіслати.

Цей посібник демонструє, як транслювати повідомлення uORB як повідомлення MAVLink, і застосовується як до стандартних, так і до користувацьких повідомлень.

### Передумови

Загалом у вас вже повинно бути повідомлення [uORB](../middleware/uorb.md), яке містить інформацію, яку ви хочете транслювати, та визначення повідомлення MAVLink, з яким ви хочете його транслювати.

У цьому прикладі ми припустимо, що ви хочете перетворити (існуюче) повідомлення [BatteryStatus](../msg_docs/BatteryStatus.md) uORB у нове повідомлення про стан батареї MAVLink, яке ми назвемо `BATTERY_STATUS_DEMO`.

Скопіюйте це повідомлення `BATTERY_STATUS_DEMO` у розділ повідомлень `development.xml` у вихідному коді PX4, який буде розташований за адресою: `\src\modules\mavlink\mavlink\message_definitions\v1.0\development.xml`.

```xml
    <message id="11514" name="BATTERY_STATUS_DEMO">
      <description>Simple demo battery.</description>
      <field type="uint8_t" name="id" instance="true">Battery ID</field>
      <field type="int16_t" name="temperature" units="cdegC" invalid="INT16_MAX">Temperature of the whole battery pack (not internal electronics). INT16_MAX field not provided.</field>
      <field type="uint8_t" name="percent_remaining" units="%" invalid="UINT8_MAX">Remaining battery energy. Values: [0-100], UINT8_MAX: field not provided.</field>
    </message>
```

:::info Зауважте, що це урізана версія ще не реалізованого повідомлення [BATTERY_STATUS_V2](https://mavlink.io/en/messages/development.html#BATTERY_STATUS_V2) з випадково вибраним невикористаним ідентифікатором `11514`. Тут ми помістили повідомлення у `development.xml`, що добре підходить для тестування і якщо повідомлення буде згодом включено до стандартного набору повідомлень, але ви також можете помістити [кастомне повідомлення](#custom-mavlink-messages) у власний діалектний файл.
:::

Зберіть PX4 для SITL і переконайтеся, що відповідне повідомлення згенеровано в `/build/px4_sitl_default/mavlink/common/mavlink_msg_battery_status_demo.h`.

Оскільки `BatteryStatus` вже існує, вам не потрібно нічого робити, щоб створити або зібрати його.

### Об'явлення класу потокового відтворення

Спочатку створіть файл з назвою `BATTERY_STATUS_DEMO.hpp` для вашого класу потокового передавання (названого за повідомленням, яке потрібно передавати) у директорії [/src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink/streams).

Додайте заголовки для повідомлень uORB у верхню частину файлу (необхідні заголовки MAVLink вже мають бути доступними):

```cpp
#include <uORB/topics/battery_status.h>
```

:::info
Заголовний файл уORB-теми у форматі snake-case генерується з імені файлу уORB у форматі CamelCase під час збірки.
:::

Потім скопіюйте визначення класу трансляції нижче у файл:

```cpp
class MavlinkStreamBatteryStatusDemo : public MavlinkStream
{
public:
    static MavlinkStream *new_instance(Mavlink *mavlink)
    {
        return new MavlinkStreamBatteryStatusDemo(mavlink);
    }
    const char *get_name() const
    {
        return MavlinkStreamBatteryStatusDemo::get_name_static();
    }
    static const char *get_name_static()
    {
        return "BATTERY_STATUS_DEMO";
    }
    static uint16_t get_id_static()
    {
        return MAVLINK_MSG_ID_BATTERY_STATUS_DEMO;
    }
    uint16_t get_id()
    {
        return get_id_static();
    }
    unsigned get_size()
    {
        return MAVLINK_MSG_ID_BATTERY_STATUS_DEMO_LEN + MAVLINK_NUM_NON_PAYLOAD_BYTES;
    }

private:
    //Subscription to array of uORB battery status instances
    uORB::SubscriptionMultiArray<battery_status_s, battery_status_s::MAX_INSTANCES> _battery_status_subs{ORB_ID::battery_status};
    // SubscriptionMultiArray subscription is needed because battery has multiple instances.
    // uORB::Subscription is used to subscribe to a single-instance topic

    /* do not allow top copying this class */
    MavlinkStreamBatteryStatusDemo(MavlinkStreamBatteryStatusDemo &);
    MavlinkStreamBatteryStatusDemo& operator = (const MavlinkStreamBatteryStatusDemo &);

protected:
    explicit MavlinkStreamBatteryStatusDemo(Mavlink *mavlink) : MavlinkStream(mavlink)
    {}

    bool send() override
    {
        bool updated = false;

        // Loop through _battery_status_subs (subscription to array of BatteryStatus instances)
        for (auto &battery_sub : _battery_status_subs) {
            // battery_status_s is a struct that can hold the battery object topic
            battery_status_s battery_status;

            // Update battery_status and publish only if the status has changed
            if (battery_sub.update(&battery_status)) {
                // mavlink_battery_status_demo_t is the MAVLink message object
                mavlink_battery_status_demo_t bat_msg{};

                bat_msg.id = battery_status.id - 1;
                bat_msg.battery_remaining = (battery_status.connected) ? roundf(battery_status.remaining * 100.f) : -1;

                // check if temperature valid
                if (battery_status.connected && PX4_ISFINITE(battery_status.temperature)) {
                    bat_msg.temperature = battery_status.temperature * 100.f;
                } else {
                    bat_msg.temperature = INT16_MAX;
                }

                //Send the message
                mavlink_msg_battery_status_demo_send_struct(_mavlink->get_channel(), &bat_msg);
                updated = true;
            }
        }

        return updated;
    }

};
```

Більшість потокових класів дуже схожі (див. приклади у [/src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink/streams)):

- Клас потокового передавання є похідним від [`MavlinkStream`](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_stream.h) і названий за паттерном `MavlinkStream<CamelCaseMessageName>`.
- `Публічні` визначення є "наближеними до шаблону", що дозволяє PX4 отримати екземпляр класу (`new_instance()`), а потім використовувати його для отримання назви, ідентифікатора та розміру повідомлення з заголовків MAVLink (`get_name()`, `get_name_static()`, `get_id_static()`, `get_id()`, `get_size()`). Для ваших власних потокових класів їх можна просто скопіювати і змінити, щоб вони відповідали значенням для вашого повідомлення MAVLink.
- Визначення `private` підписуються на теми uORB, які потрібно опублікувати. У цьому випадку тема uORB має кілька екземплярів: по одному для кожної батареї. Ми використовуємо `uORB::SubscriptionMultiArray` для отримання масиву підписок про стан батареї.

  Тут ми також визначаємо конструктори, щоб уникнути копіювання визначення.

- Секція `protected` - це місце, де відбувається важлива робота!

  Тут ми перевизначаємо метод `send()`, копіюючи значення з підписаних тем uORB у відповідні поля повідомлення MAVLink, а потім надсилаємо повідомлення.

  У цьому конкретному прикладі у нас є масив екземплярів uORB `_battery_status_subs` (тому що у нас є кілька батарей). Ми ітеруємо масив і використовуємо `update()` для кожної підписки, щоб перевірити, чи змінився пов'язаний з нею екземпляр батареї (і оновити структуру поточними даними). Це дозволяє нам надсилати повідомлення MAVLink _лише_, якщо пов'язана з батареєю uORB тема змінилася:

  ```cpp
  // Структура, щоб зберігати дані поточної теми.
  battery_status_s battery_status;

  // update() populates battery_status and returns true if the status has changed
  if (battery_sub.update(&battery_status)) {
     // Use battery_status to populate message and send
  }
  ```

  Якщо ви хочете надіслати повідомлення MAVLink незалежно від того, чи змінилися дані, ми можемо замість цього використати `copy()`, як показано тут:

  ```cpp
  battery_status_s battery_status;
  battery_sub.copy(&battery_status);
  ```

  :::info Для теми з одним екземпляром, наприклад, [VehicleStatus](../msg_docs/VehicleStatus.md), ми підписуємося таким чином:

  ```cpp
  // Create subscription _vehicle_status_sub
  uORB::Subscription _vehicle_status_sub{ORB_ID(vehicle_status)};
  ```

  І ми можемо використовувати отриману підписку так само, з оновленням або копіюванням.

  ```cpp
  vehicle_status_s vehicle_status{}; // vehicle_status_s is the definition of the uORB topic
  if (_vehicle_status_sub.update(&vehicle_status)) {
    // Use the vehicle_status as it has been updated.
  }
  ```


:::

Далі ми включаємо наш новий клас у [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp#L2193). Додайте рядок нижче до частини файлу, де включені всі інші потоки:

```cpp
#include "streams/BATTERY_STATUS_DEMO.hpp"
```

Нарешті додайте клас потоку до `streams_list` у нижній частині [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
#if defined(BATTERY_STATUS_DEMO_HPP)
    create_stream_list_item<MavlinkStreamBatteryStatusDemo>(),
#endif // BATTERY_STATUS_DEMO_HPP
...
}
```

Клас тепер доступний для потокової передачі, але за замовчуванням не буде транслюватися. Ми розглянемо це в наступних розділах.

### Трансляція за замовчуванням

Найлегший спосіб транслювати ваші повідомлення за замовчуванням (як частину збірки) - це додати їх до [mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_main.cpp) у відповідну групу повідомлень.

Якщо ви виконаєте пошук у файлі, то знайдете групи повідомлень, визначені в інструкції switch:

- `MAVLINK_MODE_NORMAL`: Трансляція до GCS.
- `MAVLINK_MODE_ONBOARD`: Трансляція на комп'ютер-супутник через швидке з'єднання, наприклад Ethernet
- `MAVLINK_MODE_ONBOARD_LOW_BANDWIDTH`: передається на комп'ютер-компаньйон для перенаправлення на канал зі зниженим трафіком, наприклад GCS.
- `MAVLINK_MODE_GIMBAL`: Потік на гімбол
- `MAVLINK_MODE_EXTVISION`: Трансляція на систему зовнішнього зору
- `MAVLINK_MODE_EXTVISIONMIN`: Потокове передавання до системи зовнішнього зору на повільнішому каналі
- `MAVLINK_MODE_OSD`: транслюється на OSD, наприклад, на FPV гарнітуру.
- `MAVLINK_MODE_CUSTOM`: Нічого не транслювати за замовчуванням. Використовується при налаштуванні потокового передавання за допомогою MAVLink.
- `MAVLINK_MODE_MAGIC`: Те ж саме, що й `MAVLINK_MODE_CUSTOM`
- `MAVLINK_MODE_CONFIG`: Потік через USB з вищими швидкостями, ніж `MAVLINK_MODE_NORMAL`.
- `MAVLINK_MODE_MINIMAL`: Потік мінімального набору повідомлень. Зазвичай використовується для поганого зв'язку телеметрії.
- `MAVLINK_MODE_IRIDIUM`: Трансляція на супутниковий телефон iridium

Зазвичай ви будете тестувати на GCS, тому ви можете просто додати повідомлення у регістр `MAVLINK_MODE_NORMAL` за допомогою методу `configure_stream_local()`. Наприклад, для трансляції CA_TRAJECTORY з частотою 5 Гц:

```cpp
    case MAVLINK_MODE_CONFIG: // USB
        // Note: streams requiring low latency come first
        ...
        configure_stream_local("BATTERY_STATUS_DEMO", 5.0f);
        ...
```

Також можна додати потік, викликавши модуль [mavlink](../modules/modules_communication.md#mavlink) з аргументом `stream` у [скрипті запуску](../concept/system_startup.md). Наприклад, ви можете додати наступний рядок до [/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink), щоб передавати `BATTERY_STATUS_DEMO` зі швидкістю 50 Гц на UDP-порт `14556` (`-r` налаштовує швидкість передачі, а `-u` ідентифікує канал MAVLink на UDP-порту 14556).

```sh
mavlink stream -r 50 -s BATTERY_STATUS_DEMO -u 14556
```

### Транслювання за запитом

Деякі повідомлення потрібні лише один раз, при підключенні певного обладнання або за інших обставин. Щоб уникнути перевантаження каналів зв'язку непотрібними повідомленнями, ви можете не передавати всі повідомлення за замовчуванням, навіть з низькою швидкістю.

Якщо вам потрібно, GCS або інший API MAVLink може запросити, щоб певні повідомлення передавалися з певною швидкістю за допомогою [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL). Певне повідомлення можна запросити лише один раз за допомогою [MAV_CMD_REQUEST_MESSAGE](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_MESSAGE).

## Отримання повідомлень MAVLink

Цей розділ пояснює, як отримати повідомлення через MAVLink та опублікувати його в uORB.

Припускається, що ми отримуємо повідомлення `BATTERY_STATUS_DEMO` і хочемо оновити (існуюче) [BatteryStatus uORB повідомлення](../msg_docs/BatteryStatus.md) зі збереженою інформацією. Це той тип реалізації, який ви надаєте для підтримки інтеграції батареї MAVLink з PX4.

Додайте заголовки теми uORB для публікації у [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L77):

```cpp
#include <uORB/topics/battery_status.h>
```

Додайте сигнатуру функції, яка обробляє вхідне повідомлення MAVLink у класі `MavlinkReceiver` у [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L126)

```cpp
void handle_message_battery_status_demo(mavlink_message_t *msg);
```

Зазвичай ви додаєте публікатор uORB для публікації теми uORB у класі `MavlinkReceiver` у файлі [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L296). У цьому випадку вже існує тема uORB [BatteryStatus](../msg_docs/BatteryStatus.md):

```cpp
uORB::Publication<battery_status_s> _battery_pub{ORB_ID(battery_status)};
```

Це створить публікацію в одному екземплярі теми uORB, який за замовчуванням буде _першим_ екземпляром.

:::info Ця реалізація не працюватиме в системах з кількома батареями, оскільки декілька батарей можуть публікувати дані до першого екземпляру теми, і немає можливості їх розрізнити. Для підтримки кількох батарей нам потрібно використовувати `PublicationMulti` та відображати ідентифікатори екземплярів повідомлення MAVLink на конкретні екземпляри тем uORB.
:::

Реалізація функції `handle_message_battery_status_demo` в [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp).

```cpp
void
MavlinkReceiver::handle_message_battery_status_demo(mavlink_message_t *msg)
{
    if ((msg->sysid != mavlink_system.sysid) || (msg->compid == mavlink_system.compid)) {
        // ignore battery status coming from other systems or from the autopilot itself
        return;
    }

    // external battery measurements
    mavlink_battery_status_t battery_mavlink;
    mavlink_msg_battery_status_decode(msg, &battery_mavlink);

    battery_status_s battery_status{};
    battery_status.timestamp = hrt_absolute_time();

    battery_status.remaining = (float)battery_mavlink.battery_remaining / 100.0f;
    battery_status.temperature = (float)battery_mavlink.temperature;
    battery_status.connected = true;

    _battery_pub.publish(battery_status);
}
```

:::info
Вище ми записуємо лише поля батареї, які визначені у темі.
На практиці ви оновлювали б всі поля або з дійсними, або з недійсними значеннями: це було скорочено для стислості.
:::

і нарешті, переконайтеся, що він викликається в [MavlinkReceiver:handle_message()](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp#L228)

```cpp
MavlinkReceiver::handle_message(mavlink_message_t *msg)
 {
    switch (msg->msgid) {
        ...
    case MAVLINK_MSG_ID_BATTERY_STATUS_DEMO:
        handle_message_battery_status_demo(msg);
        break;
        ...
    }
 }
```

## Альтернатива створення користувацьких повідомлень MAVLink

Іноді існує потреба в довільному повідомленні MAVLink з вмістом, який не повністю визначений.

Наприклад, при використанні MAVLink для інтерфейсу PX4 з вбудованим пристроєм, повідомлення, якими обмінюються автопілот і пристрій, можуть пройти кілька ітерацій, перш ніж вони будуть стабілізовані. У цьому випадку відновлення заголовків MAVLink може зайняти багато часу і призвести до помилок, а також переконатися, що обидва пристрої використовують одну і ту ж версію протоколу.

Альтернативним - і тимчасовим - рішенням є перепризначення налагоджувальних повідомлень. Замість створення спеціального повідомлення MAVLink `CA_TRAJECTORY`, ви можете надіслати повідомлення `DEBUG_VECT` з рядковим ключем `CA_TRAJ` і даними у полях `x`, `y` і `z`. Приклади використання відладочних повідомлень наведено у [цьому посібнику](../debug/debug_values.md).

:::info
Це рішення не є ефективним, оскільки надсилає символьний рядок через мережу і передбачає порівняння рядків.
Це повинно використовуватися лише для розробки!
:::

## Тестування

Як перший крок і під час відлагодження, зазвичай ви просто хочете переконатися, що всі створені вами повідомлення надсилаються/отримуються так, як ви очікуєте.

Спочатку вам слід скористатися командою `uorb top [<message_name>]` для перевірки у реальному часі того, що ваше повідомлення опубліковано, а також швидкості (див. [uORB Повідомлення](../middleware/uorb.md#uorb-top-command)). Цей підхід також можна використовувати для тестування вхідних повідомлень, які публікують тему uORB (для інших повідомлень ви можете використовувати `printf` у вашому коді і тестувати у SITL).

Існує кілька підходів для перегляду трафіку MAVLink:

- Створіть плагін [Wireshark MAVLink](https://mavlink.io/en/guide/wireshark.html) для вашого діалекту. Це дозволяє перевіряти трафік MAVLink на IP-інтерфейсі - наприклад, між _QGroundControl_ або MAVSDK і вашою реальною або змодельованою версією PX4.

  :::tip
Набагато простіше згенерувати плагін wireshark і перевіряти трафік у Wireshark, ніж збирати QGroundControl з вашим діалектом і використовувати MAVLink Inspector.
:::

- [Теми логу uORB](../dev_log/logging.md) пов'язані з вашим повідомленням MAVLink.
- Перегляд отриманих повідомлень в QGroundControl [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html). Вам потрібно буде перезібрати QGroundControl з користувацькими визначеннями повідомлень, [як описано нижче](h#updating-qgroundcontrol)

### Встановити швидкість передачі за допомогою оболонки

Для тестування іноді корисно збільшити швидкість передачі окремих тем під час виконання (наприклад, для перевірки в QGC). Цього можна досягти за допомогою виклику модуля [mavlink](../modules/modules_communication.md#mavlink) через консоль [QGC MAVLink](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (або іншої оболонки):

```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```

Ви можете отримати номер порту за допомогою `mavlink status`, який виведе (серед іншого) `транспортний протокол: UDP (<port number>)`. Прикладом може бути:

```sh
mavlink stream -u 14556 -s CA_TRAJECTORY -r 300
```

## Оновлення наземних станцій

Зрештою, ви захочете використовувати ваш новий інтерфейс MAVLink, надавши відповідну наземну станцію або реалізацію MAVSDK.

Важливо пам'ятати, що MAVLink вимагає, щоб ви використовували версію бібліотеки, яка побудована за тим самим визначенням (XML-файл). Отже, якщо ви створили власне повідомлення у PX4, ви не зможете його використати, доки не зберете QGC або MAVSDK з тим самим визначенням.

### Оновлення QGroundControl

Вам потрібно [зібрати QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-dev-guide/getting_started/index.html), включно з попередньо зібраною бібліотекою C, яка містить ваші власні повідомлення.

QGC використовує попередньо скомпільовану бібліотеку C, яку має бути розташовано за адресою [/qgroundcontrol/libs/mavlink/include/mavlink](https://github.com/mavlink/qgroundcontrol/tree/master/libs/mavlink/include/mavlink) у вихідному коді QGC.

За замовчуванням її попередньо включено як підмодуль з [https://github.com/mavlink/c_library_v2](https://github.com/mavlink/c_library_v2), але ви можете [згенерувати власні бібліотеки MAVLink](https://mavlink.io/en/getting_started/generate_libraries.html).

За замовчуванням QGC використовує діалект all.xml, який включає **common.xml**. Ви можете додавати свої повідомлення як у файлі, так і у власному діалекті. Однак, якщо ви використовуєте власний діалект, то він має містити ArduPilotMega.xml (інакше буде пропущено всі наявні повідомлення), і вам потрібно буде змінити діалект, встановивши його у [`MAVLINK_CONF`](https://github.com/mavlink/qgroundcontrol/blob/master/QGCExternalLibs.pri#L52) під час запуску _qmake_.

### Оновлення MAVSDK

Дивіться документацію MAVSDK для отримання інформації про роботу з [заголовками та діалектами MAVLink](https://mavsdk.mavlink.io/main/en/cpp/guide/build.html#mavlink-headers-and-dialects).
