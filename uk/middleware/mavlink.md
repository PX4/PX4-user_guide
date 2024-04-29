# Повідомлення MAVLink

[MAVLink](https://mavlink.io/en/) це дуже легкий протокол обміну повідомленнями, який був спроектований для екосистеми дронів.

PX4 використовує _MAVLink_ для зв'язку з наземними станціями і MAVLink SDK, такими як _QGroundControl_ і [MAVSDK](https://mavsdk.mavlink.io/), а також як інтеграційний механізм для підключення до компонентів дрона за межами польотного контролера: комп'ютерів-компаньйонів, камер з підтримкою MAVLink і так далі.

Ця тема надає короткий огляд основних концепцій MAVLink, таких як повідомлення, команди та мікросервіси. Він також надає інструкції посібника про те, як ви можете додати підтримку PX4 для:

- Потокових повідомлень MAVLink
- Обробка вхідних повідомлень MAVLink та запис до теми uORB.

::: info Ця тема не охоплює обробку та надсилання _команд_ або реалізацію власних мікросервісів.
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

::: info Щоб бути частиною випуску PX4, всі визначення MAVLink, які ви використовуєте, повинні знаходитися у `common.xml` (або у включених файлах, таких як `standard.xml` та `minimal.xml`). Під час розробки ви можете використовувати визначення в `development.xml`. Вам потрібно буде попрацювати з [командою MAVLink](https://mavlink.io/en/contributing/contributing.html), щоб визначити і внести ці визначення.
:::

PX4 включає репозиторій [mavlink/mavlink](https://github.com/mavlink/mavlink) як підмодуль у [/src/modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink). Тут містяться файли визначень XML у каталозі [/mavlink/messages/1.0/](https://github.com/mavlink/mavlink/blob/master/message_definitions/v1.0/).

Інструментарій збірки генерує заголовні файли MAVLink 2 C під час збірки. XML-файл, для якого генеруються файли заголовків, можна визначити у конфігурації плати [PX4 kconfig](../hardware/porting_guide_config.md#px4-board-configuration-kconfig) для кожної окремої плати за допомогою змінної `CONFIG_MAVLINK_DIALECT`:

- Для SITL `CONFIG_MAVLINK_DIALECT` встановлено у `development` у [boards/px4/sitl/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/sitl/default.px4board#L36). Ви можете змінити його на будь-який інший файл визначення, але він повинен містити `common.xml`.
- Для інших плат `CONFIG_MAVLINK_DIALECT` не встановлено за замовчуванням, і PX4 збирає визначення у `common.xml` (за замовчуванням вони вбудовані у [mavlink module](../modules/modules_communication.md#mavlink) - шукайте `menuconfig MAVLINK_DIALECT` у [src/modules/mavlink/Kconfig](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/Kconfig#L10)).

The files are generated into the build directory: `/build/<build target>/mavlink/`.

## Custom MAVLink Messages

A custom MAVLink message is one that isn't in the default definitions included into PX4.

::: info
If you use a custom definition you will need maintain the definition in PX4, your ground station, and any other SDKs that communicate with it.
Generally you should use (or add to) the standard definitions if at all possible to reduce the maintenance burden.
:::

Custom definitions can be added in a new dialect file in the same directory as the standard XML definitions. For example, create `PX4-Autopilot/src/modules/mavlink/mavlink/message_definitions/v1.0/custom_messages.xml`, and set `CONFIG_MAVLINK_DIALECT` to build the new file for SITL. This dialect file should include `development.xml` so that all the standard definitions are also included.

For initial prototyping, or if you intend your message to be "standard", you can also add your messages to `common.xml` (or `development.xml`). This simplifies building, because you don't need to modify the dialect that is built.

The MAVLink developer guide explains how to define new messages in [How to Define MAVLink Messages & Enums](https://mavlink.io/en/guide/define_xml_element.html).

You can check that your new messages are built by inspecting the headers generated in the build directory (`/build/<build target>/mavlink/`). If your messages are not built they may be incorrectly formatted, or use clashing ids. Inspect the build log for information.

Once the message is being built you can stream, receive, or otherwise use it, as described in the following sections.

::: info The [MAVLink Developer guide](https://mavlink.io/en/getting_started/) has more information about using the MAVLink toolchain.
:::

## Потокові повідомлення MAVLink

MAVLink messages are streamed using a streaming class, derived from `MavlinkStream`, that has been added to the PX4 stream list. The class has framework methods that you implement so PX4 can get information it needs from the generated MAVLink message definition. It also has a `send()` method that is called each time the message needs to be sent — you override this to copy information from a uORB subscription to the MAVLink message object that is to be sent.

This tutorial demonstrates how to stream a uORB message as a MAVLink message, and applies to both standard and custom messages.

### Preconditions

Generally you will already have a [uORB](../middleware/uorb.md) message that contains information you'd like to stream and a definition of a MAVLink message that you'd like to stream it with.

For this example we're going to assume that you want to stream the (existing) [BatteryStatus](../msg_docs/BatteryStatus.md) uORB message to a new MAVLink battery status message, which we will name `BATTERY_STATUS_DEMO`.

Скопіюйте це повідомлення `BATTERY_STATUS_DEMO` у розділ повідомлень `development.xml` у вихідному коді PX4, який буде розташований за адресою: `\src\modules\mavlink\mavlink\message_definitions\v1.0\development.xml`.

```xml
    <message id="11514" name="BATTERY_STATUS_DEMO">
      <description>Simple demo battery.</description>
      <field type="uint8_t" name="id" instance="true">Battery ID</field>
      <field type="int16_t" name="temperature" units="cdegC" invalid="INT16_MAX">Temperature of the whole battery pack (not internal electronics). INT16_MAX field not provided.</field>
      <field type="uint8_t" name="percent_remaining" units="%" invalid="UINT8_MAX">Remaining battery energy. Values: [0-100], UINT8_MAX: field not provided.</field>
    </message>
```

::: info Note that this is a cut-down version of the not-yet-implemented [BATTERY_STATUS_V2](https://mavlink.io/en/messages/development.html#BATTERY_STATUS_V2) message with randomly chosen unused id of `11514`. Here we've put the message in `development.xml`, which is fine for testing and if the message is intended to eventually be part of the standard message set, but you might also put a [custom message](#custom-mavlink-messages) in its own dialect file.
:::

Build PX4 for SITL and confirm that the associated message is generated in `/build/px4_sitl_default/mavlink/common/mavlink_msg_battery_status_demo.h`.

Because `BatteryStatus` already exists you will not need to do anything to create or build it.

### Define the Streaming Class

First create a file named `BATTERY_STATUS_DEMO.hpp` for your streaming class (named after the message to stream) inside the [/src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink/streams) directory.

Add the headers for the uORB message(s) to the top of the file (the required MAVLink headers should already be available):

```cpp
#include <uORB/topics/battery_status.h>
```

::: info
The uORB topic's snake-case header file is generated from the CamelCase uORB filename at build time.
:::

Then copy the streaming class definition below into the file:

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

Most streaming classes are very similar (see examples in [/src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/mavlink/streams)):

- The streaming class derives from [`MavlinkStream`](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_stream.h) and is named using the pattern `MavlinkStream<CamelCaseMessageName>`.
- The `public` definitions are "near-boilerplate", allowing PX4 to get an instance of the class (`new_instance()`), and then to use it to fetch the name, id, and size of the message from the MAVLink headers (`get_name()`, `get_name_static()`, `get_id_static()`, `get_id()`, `get_size()`). For your own streaming classes these can just be copied and modified to match the values for your MAVLink message.
- The `private` definitions subscribe to the uORB topics that need to be published. In this case the uORB topic has multiple instances: one for each battery. We use `uORB::SubscriptionMultiArray` to get an array of battery status subscriptions.

  Here we also define constructors to prevent the definition being copied.

- The `protected` section is where the important work takes place!

  Here we override the `send()` method, copying values from the subscribed uORB topic(s) into appropriate fields in the MAVLink message, and then send the message.

  In this particular example we have an array of uORB instances `_battery_status_subs` (because we have multiple batteries). We iterate the array and use `update()` on each subscription to check if the associated battery instance has changed (and update a structure with the current data). This allows us to send the MAVLink message _only_ if the associated battery uORB topic has changed:

  ```cpp
  // Структура, щоб зберігати дані поточної теми.
  battery_status_s battery_status;

  // update() populates battery_status and returns true if the status has changed
  if (battery_sub.update(&battery_status)) {
     // Use battery_status to populate message and send
  }
  ```

  If wanted to send a MAVLink message whether or not the data changed, we could instead use `copy()` as shown:

  ```cpp
  battery_status_s battery_status;
  battery_sub.copy(&battery_status);
  ```

  ::: info For a single-instance topic like [VehicleStatus](../msg_docs/VehicleStatus.md) we would subscribe like this:

  ```cpp
  // Create subscription _vehicle_status_sub
  uORB::Subscription _vehicle_status_sub{ORB_ID(vehicle_status)};
  ```

  And we could use the resulting subscription in the same way with update or copy.

  ```cpp
  vehicle_status_s vehicle_status{}; // vehicle_status_s is the definition of the uORB topic
  if (_vehicle_status_sub.update(&vehicle_status)) {
    // Use the vehicle_status as it has been updated.
  }
  ```


:::

Next we include our new class in [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp#L2193). Add the line below to the part of the file where all the other streams are included:

```cpp
#include "streams/BATTERY_STATUS_DEMO.hpp"
```

Finally append the stream class to the `streams_list` at the bottom of [mavlink_messages.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_messages.cpp)

```C
StreamListItem *streams_list[] = {
...
#if defined(BATTERY_STATUS_DEMO_HPP)
    create_stream_list_item<MavlinkStreamBatteryStatusDemo>(),
#endif // BATTERY_STATUS_DEMO_HPP
...
}
```

The class is now available for streaming, but won't be streamed by default. We cover that in the next sections.

### Streaming by Default

The easiest way to stream your messages by default (as part of a build) is to add them to [mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_main.cpp) in the appropriate message group.

If you search in the file you'll find groups of messages defined in a switch statement:

- `MAVLINK_MODE_NORMAL`: Streamed to a GCS.
- `MAVLINK_MODE_ONBOARD`: Streamed to a companion computer on a fast link, such as Ethernet
- `MAVLINK_MODE_ONBOARD_LOW_BANDWIDTH`: Streamed to a companion computer for re-routing to a reduced-traffic link, such as a GCS.
- `MAVLINK_MODE_GIMBAL`: Streamed to a gimbal
- `MAVLINK_MODE_EXTVISION`: Streamed to an external vision system
- `MAVLINK_MODE_EXTVISIONMIN`: Streamed to an external vision system on a slower link
- `MAVLINK_MODE_OSD`: Streamed to an OSD, such as an FPV headset.
- `MAVLINK_MODE_CUSTOM`: Stream nothing by default. Used when configuring streaming using MAVLink.
- `MAVLINK_MODE_MAGIC`: Same as `MAVLINK_MODE_CUSTOM`
- `MAVLINK_MODE_CONFIG`: Streaming over USB with higher rates than `MAVLINK_MODE_NORMAL`.
- `MAVLINK_MODE_MINIMAL`: Stream a minimal set of messages. Normally used for poor telemetry links.
- `MAVLINK_MODE_IRIDIUM`: Streamed to an iridium satellite phone

Normally you'll be testing on a GCS, so you could just add the message to the `MAVLINK_MODE_NORMAL` case using the `configure_stream_local()` method. For example, to stream CA_TRAJECTORY at 5 Hz:

```cpp
    case MAVLINK_MODE_CONFIG: // USB
        // Note: streams requiring low latency come first
        ...
        configure_stream_local("BATTERY_STATUS_DEMO", 5.0f);
        ...
```

It is also possible to add a stream by calling the [mavlink](../modules/modules_communication.md#mavlink) module with the `stream` argument in a [startup script](../concept/system_startup.md). For example, you might add the following line to [/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink](https://github.com/PX4/PX4-Autopilot/blob/main/ROMFS/px4fmu_common/init.d-posix/px4-rc.mavlink) in order to stream `BATTERY_STATUS_DEMO` at 50Hz on UDP port `14556` (`-r` configures the streaming rate and `-u` identifies the MAVLink channel on UDP port 14556).

```sh
mavlink stream -r 50 -s BATTERY_STATUS_DEMO -u 14556
```

### Streaming on Request

Some messages are only needed once, when particular hardware is connected, or under other circumstances. In order to avoid clogging communications links with messages that aren't needed you may not stream all messages by default, even at low rate.

If you needed, a GCS or other MAVLink API can request that particular messages are streamed at a particular rate using [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL). A particular message can be requested just once using [MAV_CMD_REQUEST_MESSAGE](https://mavlink.io/en/messages/common.html#MAV_CMD_REQUEST_MESSAGE).

## Receiving MAVLink Messages

This section explains how to receive a message over MAVLink and publish it to uORB.

It assumes that we are receiving the `BATTERY_STATUS_DEMO` message and we want to update the (existing) [BatteryStatus uORB message](../msg_docs/BatteryStatus.md) with the contained information. This is the kind of implementation that you would provide to support a MAVLink battery integration with PX4.

Add the headers for the uORB topic to publish to in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L77):

```cpp
#include <uORB/topics/battery_status.h>
```

Add a function signature for a function that handles the incoming MAVLink message in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L126)

```cpp
void handle_message_battery_status_demo(mavlink_message_t *msg);
```

Normally you would add a uORB publisher for the uORB topic to publish in the `MavlinkReceiver` class in [mavlink_receiver.h](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.h#L296). In this case the [BatteryStatus](../msg_docs/BatteryStatus.md) uORB topic already exists:

```cpp
uORB::Publication<battery_status_s> _battery_pub{ORB_ID(battery_status)};
```

This creates a publication to a single uORB topic instance, which by default will be the _first_ instance.

::: info This implementation won't work on multi-battery systems, because several batteries might be publishing data to the first instance of the topic, and there is no way to differentiate them. To support multiple batteries we'd need to use `PublicationMulti` and map the MAVLink message instance IDs to specific uORB topic instances.
:::

Implement the `handle_message_battery_status_demo` function in [mavlink_receiver.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp).

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

::: info
Above we only write to the battery fields that are defined in the topic.
In practice you'd update all fields with either valid or invalid values: this has been cut back for brevity.
:::

and finally make sure it is called in [MavlinkReceiver::handle_message()](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mavlink/mavlink_receiver.cpp#L228)

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

## Alternative to Creating Custom MAVLink Messages

Sometimes there is the need for a custom MAVLink message with content that is not fully defined.

For example when using MAVLink to interface PX4 with an embedded device, the messages that are exchanged between the autopilot and the device may go through several iterations before they are stabilized. In this case, it can be time-consuming and error-prone to regenerate the MAVLink headers, and make sure both devices use the same version of the protocol.

An alternative - and temporary - solution is to re-purpose debug messages. Instead of creating a custom MAVLink message `CA_TRAJECTORY`, you can send a message `DEBUG_VECT` with the string key `CA_TRAJ` and data in the `x`, `y` and `z` fields. See [this tutorial](../debug/debug_values.md) for an example usage of debug messages.

::: info
This solution is not efficient as it sends character string over the network and involves comparison of strings.
It should be used for development only!
:::

## Testing

As a first step, and while debugging, commonly you'll just want to confirm that any messages you've created are being sent/received as you expect.

You should should first use the `uorb top [<message_name>]` command to verify in real-time that your message is published and the rate (see [uORB Messaging](../middleware/uorb.md#uorb-top-command)). This approach can also be used to test incoming messages that publish a uORB topic (for other messages you might use `printf` in your code and test in SITL).

There are several approaches you can use to view MAVLink traffic:

- Create a [Wireshark MAVLink plugin](https://mavlink.io/en/guide/wireshark.html) for your dialect. This allows you to inspect MAVLink traffic on an IP interface - for example between _QGroundControl_ or MAVSDK and your real or simulated version of PX4.

  :::tip
It is much easier to generate a wireshark plugin and inspect traffic in Wireshark, than to rebuild QGroundControl with your dialect and use MAVLink Inspector.
:::

- [Log uORB topics](../dev_log/logging.md) associate with your MAVLink message.
- View received messages in the QGroundControl [MAVLink Inspector](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html). You will need to rebuild QGroundControl with the custom message definitions, [as described below](h#updating-qgroundcontrol)

### Set Streaming Rate using a Shell

For testing, it is sometimes useful to increase the streaming rate of individual topics at runtime (e.g. for inspection in QGC). This can be achieved using by calling the [mavlink](../modules/modules_communication.md#mavlink) module through the [QGC MAVLink console](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_console.html) (or some other shell):

```sh
mavlink stream -u <port number> -s <mavlink topic name> -r <rate>
```

You can get the port number with `mavlink status` which will output (amongst others) `transport protocol: UDP (<port number>)`. An example would be:

```sh
mavlink stream -u 14556 -s CA_TRAJECTORY -r 300
```

## Updating Ground Stations

Ultimately you'll want to use your new MAVLink interface by providing the corresponding ground station or MAVSDK implementation.

The important thing to remember here is that MAVLink requires that you use a version of the library that is built to the same definition (XML file). So if you have created a custom message in PX4 you won't be able to use it unless you build QGC or MAVSDK with that same definition.

### Updating QGroundControl

You will need to [Build QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-dev-guide/getting_started/index.html) including a pre-built C library that contains your custom messages.

QGC uses a pre-built C library that must be located at [/qgroundcontrol/libs/mavlink/include/mavlink](https://github.com/mavlink/qgroundcontrol/tree/master/libs/mavlink/include/mavlink) in the QGC source.

By default this is pre-included as a submodule from [https://github.com/mavlink/c_library_v2](https://github.com/mavlink/c_library_v2) but you can [generate your own MAVLink Libraries](https://mavlink.io/en/getting_started/generate_libraries.html).

QGC uses the all.xml dialect by default, which includes **common.xml**. You can include your messages in either file or in your own dialect. However if you use your own dialect then it should include ArduPilotMega.xml (or it will miss all the existing messages), and you will need to change the dialect used by setting it in [`MAVLINK_CONF`](https://github.com/mavlink/qgroundcontrol/blob/master/QGCExternalLibs.pri#L52) when running _qmake_.

### Оновлення MAVSDK

See the MAVSDK docs for information about how to work with [MAVLink headers and dialects](https://mavsdk.mavlink.io/main/en/cpp/guide/build.html#mavlink-headers-and-dialects).
