# Повідомлення uORB

## Введення

uORB - це асинхронний `publish()` / `subscribe()` API для обміну повідомленнями, який використовується для міжпотокового / міжпроцесного зв'язку.

Подивіться [посібник](../modules/hello_sky.md), щоб дізнатися, як його використовувати в C++.

uORB автоматично запускається при завантаженні, оскільки багато програм залежать від нього. Запускається за допомогою `uorb start`. Модульні тести можна запустити за допомогою `uorb_tests`.

## Додавання нової теми

Нові теми uORB можуть бути додані або в основний репозиторій PX4/PX4-Autopilot, або до визначень повідомлень поза деревом. Для отримання інформації щодо додавання визначень повідомлень uORB поза деревом, див. [цей розділ](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions).

Щоб додати нову тему, вам потрібно створити новий файл **.msg** у каталозі `msg/` та додати назву файлу до списку `msg/CMakeLists.txt`. З цього автоматично генерується потрібний C/C++ код.

Подивіться на існуючі файли `msg` для визначення підтримуваних типів. Повідомлення також можна використовувати вкладеним в інші повідомлення.

До кожної згенерованої структури C/C++, буде додано поле `uint64_t timestamp`. This is used for the logger, so make sure to fill it in when publishing the message.

Щоб використовувати тему у коді, додайте заголовок:

```
#include <uORB/topics/topic_name.h>
```

Додавши рядок, подібний наступному у файлі `.msg`, одне визначення повідомлення може бути використане для кількох незалежних тем:

```
# TOPICS mission offboard_mission onboard_mission
```

Потім у коді використовуйте їх як ідентифікатор теми: `ORB_ID(offboard_mission)`.


## Публікація

Публікацію теми можна виконати з будь-якого місця в системі, включаючи контекст переривання (функції, які викликаються API `hrt_call`). Однак, перш ніж публікувати тему в контексті переривання, її потрібно оголосити і опублікувати поза контекстом переривання (принаймні, один раз).

## Перелік тем та їх прослуховування

::: info Команда `listener` доступна лише на Pixracer (FMUv4) та Linux / OS X.
:::

Щоб перерахувати всі теми, перерахуйте файлові дескриптори:

```sh
ls /obj
```

Щоб прослухати зміст однієї теми з 5 повідомлень, запустіть команду прослуховувач:

```sh
listener sensor_accel 5
```

На виході виводиться n-кратний вміст теми:

```sh
TOPIC: sensor_accel #3
timestamp: 84978861
integral_dt: 4044
error_count: 0
x: -1
y: 2
z: 100
x_integral: -0
y_integral: 0
z_integral: 0
temperature: 46
range_m_s2: 78
scaling: 0

TOPIC: sensor_accel #4
timestamp: 85010833
integral_dt: 3980
error_count: 0
x: -1
y: 2
z: 100
x_integral: -0
y_integral: 0
z_integral: 0
temperature: 46
range_m_s2: 78
scaling: 0
```

:::tip
На системах на основі NuttX (Pixhawk, Pixracer і т.д.) команду `listener` можна викликати з консолі MAVLink *QGroundControl* для перевірки значень датчиків та інших тем. Це потужний інструмент для відлагодження, оскільки його можна використовувати навіть тоді, коли QGC підключений через бездротове з'єднання (наприклад, коли транспортний засіб летить). Для отримання додаткової інформації дивіться: [Відлагодження сенсорів/тем](../debug/sensor_uorb_topic_debugging.md).
:::

### Команда uorb top

Команда `uorb top` показує частоту публікації кожної теми в реальному часі:

```sh
update: 1s, num topics: 77
TOPIC NAME                        INST #SUB #MSG #LOST #QSIZE
actuator_armed                       0    6    4     0 1
actuator_controls_0                  0    7  242  1044 1
battery_status                       0    6  500  2694 1
commander_state                      0    1   98    89 1
control_state                        0    4  242   433 1
ekf2_innovations                     0    1  242   223 1
ekf2_timestamps                      0    1  242    23 1
estimator_status                     0    3  242   488 1
mc_att_ctrl_status                   0    0  242     0 1
sensor_accel                         0    1  242     0 1
sensor_accel                         1    1  249    43 1
sensor_baro                          0    1   42     0 1
sensor_combined                      0    6  242   636 1
```
The columns are: topic name, multi-instance index, number of subscribers, publishing frequency in Hz, number of lost messages per second (for all subscribers combined), and queue size.


## Multi-instance

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`. It will return an instance index to the publisher. A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance). Having multiple instances is useful for example if the system has several sensors of the same type.

Make sure not to mix `orb_advertise_multi` and `orb_advertise` for the same topic.

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/main/platforms/common/uORB/uORBManager.hpp).

<a id="deprecation"></a>

## Message/Field Deprecation
As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- Changing existing fields or messages that external tools rely on is generally acceptable if there are good reasons for the update. In particular for breaking changes to *Flight Review*, *Flight Review* must be updated before code is merged to `master`.
- In order for external tools to reliably distinguish between two message versions, the following steps must be followed:
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Removed or renamed fields must be commented and marked as deprecated. For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`. This is to ensure that removed fields (or messages) are not re-added in future.
  - In case of a semantic change (e.g. the unit changes from degrees to radians), the field must be renamed as well and the previous one marked as deprecated as above.

