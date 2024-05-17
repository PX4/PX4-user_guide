# Перший додаток (Hello Sky)

У цій темі пояснюється, як створити та запустити свій перший бортовий додаток. Він охоплює всі основні концепції та API, необхідні для розробки додатків на PX4.

:::info Для простоти, більш складні функції, такі як функція запуску/зупинки та аргументи командного рядка, не розглядаються. Це описано в [Шаблоні Застосунку/Модуля](../modules/module_template.md).
:::

## Необхідні умови

Вам знадобиться наступне:

- [PX4 SITL Simulator](../simulation/index.md) _або_ [PX4-сумісний польотний контролер](../flight_controller/index.md).
- [PX4 Development Toolchain](../dev_setup/dev_env.md) для потрібної цілі.
- [Завантажений вихідний код PX4](../dev_setup/building_px4.md#download-the-px4-source-code) з Github

У каталозі вихідного коду [PX4-Autopilot/src/examples/px4_simple_app](https://github.com/PX4/PX4-Autopilot/tree/main/src/examples/px4_simple_app) міститься повна версія цього посібника, яку ви можете переглянути, якщо у вас виникнуть труднощі.

- Перейменуйте (або видаліть) каталог **px4_simple_app**.

## Мінімальна програма

У цьому розділі ми створимо _мінімальну програму_, яка просто виводить `Hello Sky!`. Він складається з одного файлу _C_ та визначення _cmake_ (яке вказує інструментарію, як зібрати програму).

1. Створіть новий каталог **PX4-Autopilot/src/examples/px4_simple_app**.
1. Створіть новий файл C у цьому каталозі з назвою **px4_simple_app.c**:

   - Скопіюйте заголовок за замовчуванням у верхній частині сторінки. Це повинно бути присутнім у всіх розміщених файлах!

     ```c
     /****************************************************************************
      *
      *   Copyright (c) 2012-2022 PX4 Development Team. All rights reserved.
      *
      * Redistribution and use in source and binary forms, with or without
      * modification, are permitted provided that the following conditions
      * are met:
      *
      * 1. Redistributions of source code must retain the above copyright
      *    notice, this list of conditions and the following disclaimer.
      * 2. Redistributions in binary form must reproduce the above copyright
      *    notice, this list of conditions and the following disclaimer in
      *    the documentation and/or other materials provided with the
      *    distribution.
      * 3. Neither the name PX4 nor the names of its contributors may be
      *    used to endorse or promote products derived from this software
      *    without specific prior written permission.
      *
      * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
      * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
      * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
      * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
      * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
      * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
      * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
      * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
      * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
      * POSSIBILITY OF SUCH DAMAGE.
      *
      ****************************************************************************/
     ```

   - Скопіюйте наступний код під заголовком за замовчуванням. Це повинно бути присутнім у всіх розміщених файлах!

     ```c
     /**
      * @file px4_simple_app.c
      * Minimal application example for PX4 autopilot
      *
      * @author Example User <mail@example.com>
      */

     #include <px4_platform_common/log.h>

     __EXPORT int px4_simple_app_main(int argc, char *argv[]);

     int px4_simple_app_main(int argc, char *argv[])
     {
        PX4_INFO("Hello Sky!");
        return OK;
     }
     ```

:::tip
Основна функція повинна мати назву `<module_name>_main` та експортуватися з модулю, як показано.
:::

:::tip
`PX4_INFO` є еквівалентом `printf` для оболонки PX4 (включено з **px4_platform_common/log.h**). Існують різні рівні журналування: `PX4_INFO`, `PX4_WARN`, `PX4_ERR`, `PX4_DEBUG`. Попередження та помилки додатково додаються до [ULog](../dev_log/ulog_file_format.md) та показуються на [Flight Review](https://logs.px4.io/).
:::

1. Створіть та відкрийте новий файл визначення _cmake_ з ім'ям **CMakeLists.txt**. Скопіюйте текст нижче:

   ```cmake
   ############################################################################
   #
   #   Copyright (c) 2015 PX4 Development Team. All rights reserved.
   #
   # Redistribution and use in source and binary forms, with or without
   # modification, are permitted provided that the following conditions
   # are met:
   #
   # 1. Redistributions of source code must retain the above copyright
   #    notice, this list of conditions and the following disclaimer.
   # 2. Redistributions in binary form must reproduce the above copyright
   #    notice, this list of conditions and the following disclaimer in
   #    the documentation and/or other materials provided with the
   #    distribution.
   # 3. Neither the name PX4 nor the names of its contributors may be
   #    used to endorse or promote products derived from this software
   #    without specific prior written permission.
   #
   # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   # "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   # LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
   # FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   # COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
   # INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   # BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
   # OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   # AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
   # LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
   # ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   # POSSIBILITY OF SUCH DAMAGE.
   #
   ############################################################################
   px4_add_module(
    MODULE examples__px4_simple_app
    MAIN px4_simple_app
    STACK_MAIN 2000
    SRCS
        px4_simple_app.c
    DEPENDS
    )
   ```

   Метод `px4_add_module()` створює статичну бібліотеку з опису модуля.

   - Блок `MODULE` - унікальне для прошивки ім'я модуля (за умовчанням, ім'я модуля передує батьківським каталогам назад до `src`).
   - Блок `MAIN` містить точку входу модуля, яка реєструє команду з NuttX, щоб вона могла бути викликана з оболонки PX4 або консолі SITL.

:::tip
Формат `px4_add_module()` документований у [PX4-Autopilot/cmake/px4_add_module.cmake](https://github.com/PX4/PX4-Autopilot/blob/main/cmake/px4_add_module.cmake). <!-- NEED px4_version -->

:::

   :::info Якщо ви вказуєте `DYNAMIC` як параметр для `px4_add_module`, на платформах POSIX замість статичної бібліотеки створюється _спільна бібліотека_ (їх можна завантажувати без перекомпіляції PX4 та ділити з іншими у вигляді бінарних файлів, а не вихідного коду). Ваш додаток не стане вбудованою командою, але виявиться в окремому файлі під назвою `examples__px4_simple_app.px4mod`. Потім ви можете виконати свою команду, завантаживши файл під час виконання за допомогою команди `dyn`: `dyn ./examples__px4_simple_app.px4mod`
:::

1. Створіть та відкрийте новий файл визначення _Kconfig_ з назвою **Kconfig** та визначте свій символ для найменування (див. [Конвенцію найменування Kconfig](../hardware/porting_guide_config.md#px4-kconfig-symbol-naming-convention)). Скопіюйте текст нижче:

   ```
   menuconfig EXAMPLES_PX4_SIMPLE_APP
    bool "px4_simple_app"
    default n
    ---help---
        Enable support for px4_simple_app
   ```

## Побудуйте Програму/прошивку

Додаток завершено. Для запуску його спершу потрібно переконатись, що він побудований як частина PX4. Заявки додаються до збірки / прошивки у відповідному файлі рівня дошки _px4board_ для вашої цілі:

- PX4 SITL (Simulator): [PX4-Autopilot/boards/px4/sitl/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/sitl/default.px4board)
- Pixhawk v1/2: [PX4-Autopilot/boards/px4/fmu-v2/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v2/default.px4board)
- Pixracer (px4/fmu-v4): [PX4-Autopilot/boards/px4/fmu-v4/default.px4board](https://github.com/PX4/PX4-Autopilot/blob/main/boards/px4/fmu-v4/default.px4board)
- _px4board_ files for other boards can be found in [PX4-Autopilot/boards/](https://github.com/PX4/PX4-Autopilot/tree/main/boards)

Для активації компіляції додатка в прошивку додайте відповідний ключ Kconfig `CONFIG_EXAMPLES_PX4_SIMPLE_APP=y` у файл _px4board_ або виконайте [boardconfig](../hardware/porting_guide_config.md#px4-menuconfig-setup) `make px4_fmu-v4_default boardconfig`:

```
examples  --->
    [x] PX4 Simple app  ----
```

::::info
Рядок вже буде присутній у більшості файлів, тому що за замовчуванням приклади включені в прошивку.
:::

Побудуйте приклад, використовуючи команду для конкретної плати:

- jMAVSim Simulator: `make px4_sitl_default jmavsim`
- Pixhawk v1/2: `make px4_fmu-v2_default` (or just `make px4_fmu-v2`)
- Pixhawk v3: `make px4_fmu-v4_default`
- Інші прошивки: [Building the Code](../dev_setup/building_px4.md#building-for-nuttx)

## Тестовий додаток (апаратне забезпечення)

### Завантажте прошивку на вашу плату

Увімкніть завантажувач, а потім скиньте плату:

- Pixhawk v1/2: `make px4_fmu-v2_default upload`
- Pixhawk v3: `make px4_fmu-v4_default upload`

Перед скиданням дошки повинно бути надруковано певну кількість компілювальних повідомлень та в кінці:

```sh
Завантажена прошивка для X, X, очікування на загрузчик...
```

Після скидання дошки та завантаження вона друкує:

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

### Підключіть консоль

Зараз підключіться до [системного консолі](../debug/system_console.md) або через послідовний або USB-порт. Натискання **ENTER** приведе до виведення оболонкового вікна:

```sh
nsh>
```

Введіть ''help'' та натисніть ENTER

```sh
nsh> help
  help usage:  help [-v] [<cmd>]

  [           df          kill        mkfifo      ps          sleep
  ?           echo        losetup     mkrd        pwd         test
  cat         exec        ls          mh          rm          umount
  cd          exit        mb          mount       rmdir       unset
  cp          free        mkdir       mv          set         usleep
  dd          help        mkfatfs     mw          sh          xd

Builtin Apps:
  reboot
  perf
  top
  ..
  px4_simple_app
  ..
  sercon
  serdis
```

Зверніть увагу, що `px4_simple_app` тепер є частиною доступних команд. Почніть його, введіть `px4_simple_app` та натисніть ENTER:

```sh
nsh> px4_simple_app
Hello Sky!
```

Заява зараз правильно зареєстрована в системі і може бути розширена для фактичного виконання корисних завдань.

## Тестовий додаток (SITL)

Якщо ви використовуєте SITL, _консоль PX4_ автоматично запускається (див. [Кодова база > Перше Компілювання (Використання Симулятора jMAVSim)](../dev_setup/building_px4.md#first-build-using-the-jmavsim-simulator)). Так само, як і з _консоллю nsh_ (див. попередній розділ), ви можете ввести `help`, щоб переглянути список вбудованих додатків.

Введіть `px4_simple_app`, щоб запустити мінімальний додаток.

```sh
pxh> px4_simple_app
INFO  [px4_simple_app] Hello Sky!
```

Додаток тепер може бути розширений для фактичного виконання корисних завдань.

## Підписка на дані сенсорів

Для того щоб зробити щось корисне, додаток повинен підписати входи та опублікувати виходи (наприклад, команди для мотору або серводвигуна).

:::tip
Користь від абстракції апаратного забезпечення PX4 виявляється ось тут!
Немає потреби взаємодіяти з драйверами сенсорів та оновлювати додаток, якщо плата або сенсори оновлені.
:::

Індивідуальні канали повідомлень між додатками називаються [темами](../middleware/uorb.md). Для цього навчального посібника нас цікавить тема [SensorCombined](https://github.com/PX4/PX4-Autopilot/blob/main/msg/SensorCombined.msg), яка містить узгоджені дані сенсора всієї системи.

Підписка на тему проста:

```cpp
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
```

`sensor_sub_fd` - це керування темою та його можна використовувати для ефективного виконання блокуючого очікування нових даних. Поточний потік переходить у режим сну і автоматично буде розбуджений планувальником, як тільки буде доступні нові дані, не використовуючи жодних циклів ЦП під час очікування. Для цього ми використовуємо системний виклик POSIX [poll()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/poll.html).

Додавання `poll()` до підписки виглядає як (_псевдокод, дивіться повну реалізацію нижче_):

```cpp
#include <poll.h>
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));

/* one could wait for multiple topics with this technique, just using one here */
px4_pollfd_struct_t fds[] = {
    { .fd = sensor_sub_fd,   .events = POLLIN },
};

while (true) {
    /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
    int poll_ret = px4_poll(fds, 1, 1000);
    ..
    if (fds[0].revents & POLLIN) {
        /* obtained data for the first file descriptor */
        struct sensor_combined_s raw;
        /* copy sensors raw data into local buffer */
        orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
        PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                    (double)raw.accelerometer_m_s2[0],
                    (double)raw.accelerometer_m_s2[1],
                    (double)raw.accelerometer_m_s2[2]);
    }
}
```

Знову скомпілюйте додаток, введіть:

```sh
make
```

### Тестування підписки на uORB

Останнім кроком є запуск вашої програми як фонового процесу / завдання, набираючи наступне у оболонці nsh:

```sh
px4_simple_app &
```

Ваш застосунок відображатиме 5 значень датчиків у консолі, а потім завершить виконання:

```sh
[px4_simple_app] Accelerometer:   0.0483          0.0821          0.0332
[px4_simple_app] Accelerometer:   0.0486          0.0820          0.0336
[px4_simple_app] Accelerometer:   0.0487          0.0819          0.0327
[px4_simple_app] Accelerometer:   0.0482          0.0818          0.0323
[px4_simple_app] Accelerometer:   0.0482          0.0827          0.0331
[px4_simple_app] Accelerometer:   0.0489          0.0804          0.0328
```

:::tip
[Шаблон модуля для повноцінних додатків](../modules/module_template.md) може бути використаний для написання фонових процесів, які можна контролювати з командного рядка.
:::

## Публікація Даних

Для використання розрахованих виходів, наступним кроком є _опублікувати_ результати. Нижче ми покажемо, як опублікувати тему ставлення.

:::info Ми обрали `відношення`, оскільки знаємо, що програма _mavlink_ передає його на земну станцію керування - це забезпечує простий спосіб перегляду результатів.
:::

Інтерфейс досить простий: ініціалізуйте `struct` теми для публікації та рекламуйте тему:

```c
#include <uORB/topics/vehicle_attitude.h>
..
/* advertise attitude topic */
struct vehicle_attitude_s att;
memset(&att, 0, sizeof(att));
orb_advert_t att_pub_fd = orb_advertise(ORB_ID(vehicle_attitude), &att);
```

У головному циклі опублікуйте інформацію, коли вона буде готова:

```c
orb_publish(ORB_ID(vehicle_attitude), att_pub_fd, &att);
```

## Наприклад: Код Повного Прикладу

Повний код прикладу зараз: [посилання на код](https://github.com/PX4/PX4-Autopilot/blob/main/src/examples/px4_simple_app/px4_simple_app.c)

```c
/****************************************************************************
 *
 *   Copyright (c) 2012-2019 PX4 Development Team. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 * 3. Neither the name PX4 nor the names of its contributors may be
 *    used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 ****************************************************************************/

/**
 * @file px4_simple_app.c
 * Minimal application example for PX4 autopilot
 *
 * @author Example User <mail@example.com>
 */

#include <px4_platform_common/px4_config.h>
#include <px4_platform_common/tasks.h>
#include <px4_platform_common/posix.h>
#include <unistd.h>
#include <stdio.h>
#include <poll.h>
#include <string.h>
#include <math.h>

#include <uORB/uORB.h>
#include <uORB/topics/sensor_combined.h>
#include <uORB/topics/vehicle_attitude.h>

__EXPORT int px4_simple_app_main(int argc, char *argv[]);

int px4_simple_app_main(int argc, char *argv[])
{
    PX4_INFO("Hello Sky!");

    /* subscribe to sensor_combined topic */
    int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
    /* limit the update rate to 5 Hz */
    orb_set_interval(sensor_sub_fd, 200);

    /* advertise attitude topic */
    struct vehicle_attitude_s att;
    memset(&att, 0, sizeof(att));
    orb_advert_t att_pub = orb_advertise(ORB_ID(vehicle_attitude), &att);

    /* one could wait for multiple topics with this technique, just using one here */
    px4_pollfd_struct_t fds[] = {
        { .fd = sensor_sub_fd,   .events = POLLIN },
        /* there could be more file descriptors here, in the form like:
         * { .fd = other_sub_fd,   .events = POLLIN },
         */
    };

    int error_counter = 0;

    for (int i = 0; i < 5; i++) {
        /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
        int poll_ret = px4_poll(fds, 1, 1000);

        /* handle the poll result */
        if (poll_ret == 0) {
            /* this means none of our providers is giving us data */
            PX4_ERR("Got no data within a second");

        } else if (poll_ret < 0) {
            /* this is seriously bad - should be an emergency */
            if (error_counter < 10 || error_counter % 50 == 0) {
                /* use a counter to prevent flooding (and slowing us down) */
                PX4_ERR("ERROR return value from poll(): %d", poll_ret);
            }

            error_counter++;

        } else {

            if (fds[0].revents & POLLIN) {
                /* obtained data for the first file descriptor */
                struct sensor_combined_s raw;
                /* copy sensors raw data into local buffer */
                orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
                PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                     (double)raw.accelerometer_m_s2[0],
                     (double)raw.accelerometer_m_s2[1],
                     (double)raw.accelerometer_m_s2[2]);

                /* set att and publish this information for other apps
                 the following does not have any meaning, it's just an example
                */
                att.q[0] = raw.accelerometer_m_s2[0];
                att.q[1] = raw.accelerometer_m_s2[1];
                att.q[2] = raw.accelerometer_m_s2[2];

                orb_publish(ORB_ID(vehicle_attitude), att_pub, &att);
            }

            /* there could be more file descriptors here, in the form like:
             * if (fds[1..n].revents & POLLIN) {}
             */
        }
    }

    PX4_INFO("exiting");

    return 0;
}
```

## Виконання повного прикладу

І, нарешті, запустіть свою програму:

```sh
px4_simple_app
```

Якщо ви почнете _QGroundControl_, ви можете перевірити значення датчиків у реальному часі на графіку ([Аналізувати > Інспектор MAVLink](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/analyze_view/mavlink_inspector.html)).

## Згортання

Цей посібник охоплює все необхідне для розробки базової програми автопілота PX4. Пам'ятайте, що повний список повідомлень/тем uORB доступний [тут](https://github.com/PX4/PX4-Autopilot/tree/main/msg/), а заголовки добре задокументовані і служать для посилання.

Додаткову інформацію та усунення неполадок/типові проблеми можна знайти тут: [uORB](../middleware/uorb.md).

Наступна сторінка презентує шаблон для написання повної програми з можливістю запуску та зупинки.
