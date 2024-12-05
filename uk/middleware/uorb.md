# Повідомлення uORB

## Введення

The uORB is an asynchronous `publish()` / `subscribe()` messaging API used for inter-thread/inter-process communication.

Look at the [tutorial](../modules/hello_sky.md) to learn how to use it in C++.

uORB автоматично запускається при завантаженні, оскільки багато програм залежать від нього.
It is started with `uorb start`. Unit tests can be started with `uorb_tests`.

## Додавання нової теми

Нові теми uORB можуть бути додані або в основний репозиторій PX4/PX4-Autopilot, або до визначень повідомлень поза деревом.
For information on adding out-of-tree uORB message definitions, please see [this section](../advanced/out_of_tree_modules.md#out-of-tree-uorb-message-definitions).

To add a new topic, you need to create a new **.msg** file in the `msg/` directory and add the file name to the `msg/CMakeLists.txt` list.
З цього автоматично генерується потрібний C/C++ код.

Have a look at the existing `msg` files for supported types.
Повідомлення також можна використовувати вкладеним в інші повідомлення.

To each generated C/C++ struct, a field `uint64_t timestamp` will be added.
Це використовується в логері, тому переконайтеся, що він заповнюється при публікації повідомлення.

Щоб використовувати тему у коді, додайте заголовок:

```cpp
#include <uORB/topics/topic_name.h>
```

By adding a line like the following in the `.msg` file, a single message definition can be used for multiple independent topics:

```cpp
# TOPICS mission offboard_mission onboard_mission
```

Then in the code, use them as topic id: `ORB_ID(offboard_mission)`.

## Публікація

Publishing a topic can be done from anywhere in the system, including interrupt context (functions called by the `hrt_call` API).
Однак, перш ніж публікувати тему в контексті переривання, її потрібно оголосити і опублікувати поза контекстом переривання (принаймні, один раз).

## Перелік тем та їх прослуховування

:::info
The `listener` command is only available on Pixracer (FMUv4) and Linux / OS X.
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
On NuttX-based systems (Pixhawk, Pixracer, etc) the `listener` command can be called from within the _QGroundControl_ MAVLink Console to inspect the values of sensors and other topics.
Це потужний інструмент для відлагодження, оскільки його можна використовувати навіть тоді, коли QGC підключений через бездротове з'єднання (наприклад, коли транспортний засіб летить).
For more information see: [Sensor/Topic Debugging](../debug/sensor_uorb_topic_debugging.md).
:::

### Команда uorb top

The command `uorb top` shows the publishing frequency of each topic in real-time:

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

Колонки: назва теми, індекс, кількість підписників, частота публікації в Гц, кількість втрачених повідомлень за секунду (для всіх підписників разом) і розмір черги.

## Plotting Changes in Topics

Topic changes can be plotted in realtime using PlotJuggler and the PX4 ROS 2 integration (note that this actually plots ROS topics that correspond to uORB topics, but the effect is the same).

For more information see: [Plotting uORB Topic Data in Real Time using PlotJuggler](../debug/plotting_realtime_uorb_data.md).

<video src="../../assets/debug/realtime_debugging/realtime_debugging.mp4" width="720" controls></video>

## Багатоекземплярний режим

uORB provides a mechanism to publish multiple independent instances of the same topic through `orb_advertise_multi`.
Він поверне публікувачу індекс екземпляра.
A subscriber will then have to choose to which instance to subscribe to using `orb_subscribe_multi` (`orb_subscribe` subscribes to the first instance).
Наявність декількох екземплярів корисна, наприклад, якщо система має кілька сенсорів одного типу.

Make sure not to mix `orb_advertise_multi` and `orb_advertise` for the same topic.

The full API is documented in [platforms/common/uORB/uORBManager.hpp](https://github.com/PX4/PX4-Autopilot/blob/main/platforms/common/uORB/uORBManager.hpp).

## Message/Field Deprecation {#deprecation}

As there are external tools using uORB messages from log files, such as [Flight Review](https://github.com/PX4/flight_review), certain aspects need to be considered when updating existing messages:

- Зміна існуючих полів або повідомлень, на які покладаються зовнішні інструменти, зазвичай є прийнятною, якщо для оновлення є вагомі причини.
  In particular for breaking changes to _Flight Review_, _Flight Review_ must be updated before code is merged to `master`.
- Для того, щоб зовнішні інструменти могли надійно розрізняти дві версії повідомлень, необхідно виконати наступні кроки:
  - Removed or renamed messages must be added to the `deprecated_msgs` list in [msg/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/c5a6a60903455c3600f47e3c45ecaa48614559c8/msg/CMakeLists.txt#L189) and the **.msg** file needs to be deleted.
  - Видалені або перейменовані поля повинні бути закоментовані та позначені як застарілі.
    For example `uint8 quat_reset_counter` would become `# DEPRECATED: uint8 quat_reset_counter`.
    Це робиться для того, щоб гарантувати, що видалені поля (або повідомлення) не будуть додані повторно в майбутньому.
  - У разі семантичної зміни (наприклад, одиниця виміру змінюється з градусів на радіани), поле також має бути перейменоване, а попереднє позначене як застаріле, як зазначено вище.
