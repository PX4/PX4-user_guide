# Оновлення завантажувача

Завантажувач PX4 використовується для завантаження прошивки для плат [Pixhawk](../flight_controller/pixhawk_series.md) (PX4FMU, PX4IO).

Зазвичай контролери Pixhawk поставляються з попередньо встановленою відповідною версією завантажувача. Однак у деяких випадках його може бути відсутній, або може бути присутня старіша версія, яку потрібно оновити, або плата може бути відключена і потребує стирання та перевстановлення завантажувача.

Ця тема пояснює, як побудувати завантажувач PX4 та кілька методів для його прошивки на плату.

:::note

- Most boards will need to use the [Debug Probe](#debug-probe-bootloader-update) to update the bootloader.
- On [FMUv6X-RT](../flight_controller/pixhawk6x-rt.md) you can [install bootloader/unbrick boards via USB](bootloader_update_v6xrt.md). This is useful if you don't have a debug probe.
- On FMUv2 and some custom firmware (only) you can use [QGC Bootloader Update](#qgc-bootloader-update).
:::

## Building the PX4 Bootloader

### PX4 Bootloader FMUv6X та новіші

Плати, що починаються з FMUv6X (STM32H7), використовують вбудований завантажувач PX4.

Це можна побудувати з каталогу [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot), використовуючи команду `make` та конкретну для плати ціль з суфіксом `_bootloader`.

Для FMUv6X команда наступна:

```sh
make px4_fmu-v6x_bootloader
```

Це збудує бінарний файл завантажувача як `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf`, який можна прошити через SWD або DFU. Якщо ви збираєте завантажувач, вам вже повинні бути знайомі з одним із цих варіантів.

Якщо вам потрібний файл у форматі HEX замість ELF файлу, використовуйте objcopy:

```sh
arm-none-eabi-objcopy -O ihex build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf px4_fmu-v6x_bootloader.hex
```

### PX4 Bootloader FMUv5X та раніші версії

Плата PX4 до FMUv5X (до STM32H7) використовувала репозиторій [завантажувача PX4](https://github.com/PX4/Bootloader).

Інструкції в README репозиторію пояснюють, як його використовувати.

## Оновлення завантажувача Debug Probe

Наступні кроки пояснюють, як ви можете "вручну" оновити завантажувач за допомогою сумісного [Відладного пристрою](../debug/swd_debug.md#debug-probes-for-px4-hardware):

1. Отримайте бінарний файл, який містить завантажувальник (або від команди розробників, або [зіберіть його самостійно](#building-the-px4-bootloader)).

1. Get a [Debug Probe](../debug/swd_debug.md#debug-probes-for-px4-hardware). Підключіть зонд до комп'ютера за допомогою USB та налаштуйте `gdbserver`.

1. Перейдіть до каталогу, що містить бінарний файл, і запустіть команду для обраного вами завантажувача в терміналі:

   - FMUv6X

     ```sh
     arm-none-eabi-gdb px4_fmu-v6x_bootloader.elf
     ```

   - FMUv6X-RT

     ```sh
     arm-none-eabi-gdb px4_fmu-v6xrt_bootloader.elf
     ```

   - FMUv5

     ```sh
     arm-none-eabi-gdb px4fmuv5_bl.elf
     ```

:::note
H7 Завантажувачі з [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) мають назву за шаблоном `*._bootloader.elf`. Завантажувачі з [PX4/PX4-Bootloader](https://github.com/PX4/PX4-Bootloader) мають назву за шаблоном `*_bl.elf`.
:::

1. Термінал _gdb_ з'являється, і він повинен відображати такий вивід:

   ```sh
   GNU gdb (GNU Tools for Arm Embedded Processors 7-2017-q4-major) 8.0.50.20171128-git
   Copyright (C) 2017 Free Software Foundation, Inc.
   License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
   This is free software: you are free to change and redistribute it.
   There is NO WARRANTY, to the extent permitted by law.
   Type "show copying"    and "show warranty" for details.
   This GDB was configured as "--host=x86_64-linux-gnu --target=arm-none-eabi".
   Type "show configuration" for configuration details.
   For bug reporting instructions, please see:
   <http://www.gnu.org/software/gdb/bugs/>.
   Find the GDB manual and other documentation resources online at:
   <http://www.gnu.org/software/gdb/documentation/>.
   For help, type "help".
   Type "apropos word" to search for commands related to "word"...
   Reading symbols from px4fmuv5_bl.elf...done.
   ```

1. Find your `<dronecode-probe-id>` by running an `ls` command in the **/dev/serial/by-id** directory.

1. Тепер підключіться до debug probe з наступною командою:

   ```sh
   tar ext /dev/serial/by-id/<dronecode-probe-id>
   ```

1. Power on the Pixhawk with another USB cable and connect the probe to the `FMU-DEBUG` port.

:::note
If using a Dronecode probe you may need to remove the case in order to connect to the `FMU-DEBUG` port (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).
:::

1. Use the following command to scan for the Pixhawk`s SWD and connect to it:

   ```sh
   (gdb) mon swdp_scan
   (gdb) attach 1
   ```

1. Завантажте двійковий файл в Pixhawk:

   ```sh
   (gdb) load
   ```

After the bootloader has updated you can [Load PX4 Firmware](../config/firmware.md) using _QGroundControl_.

## Оновлення завантажувача QGC

Найпростіший підхід - спочатку використовуйте _QGroundControl_, щоб встановити прошивку, яка містить потрібний/останній завантажувач. Ви можете ініціювати оновлення завантажувача при наступному перезавантаженні, встановивши параметр: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

Такий підхід можна використовувати лише у випадку, якщо параметр [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) присутній у прошивці.

:::warning
Наразі бажаний завантажувач міститься лише в FMUv2 та деяких спеціальних програмних вибірках.
:::

Кроки такі:

1. Вставте SD-карту (це дозволяє реєструвати журнали завантаження для відлагодження будь-яких проблем).
1. [Оновіть прошивку](../config/firmware.md#custom) з образом, що містить новий/потрібний завантажувач.

   :::note
Оновлений завантажувач може бути постачений у власній прошивці (наприклад, від команди розробників), або він може бути включений у останню головну гілку.
:::

1. Зачекайте, доки транспортний засіб перезавантажиться.
1. [Знайдіть](../advanced_config/parameters.md) та увімкніть параметр [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
1. Перезавантажте (відключіть / підключіть плату). The bootloader update will only take a few seconds.

Зазвичай на цьому етапі ви можливо захочете [оновити прошивку](../config/firmware.md) ще раз, використовуючи правильно/ново встановлений загрузчик.

An specific example of this process for updating the FMUv2 bootloader is given below.

### Оновлення завантажувача FMUv2

Якщо _QGroundControl_ встановлює ціль FMUv2 (див. консоль під час встановлення), і у вас є новіша плата, вам може знадобитися оновити завантажувальник, щоб мати доступ до всієї пам'яті на вашому контролері польоту.

:::note
Ранні контролери польоту FMUv2 [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu_versions) мали [апаратну проблему](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata), яка обмежувала їх використання 1 Мб флеш-пам’яті. Проблема виправлена на новіших платах, але вам може знадобитися оновити заводський завантажувальник, щоб встановити прошивку FMUv3 та мати доступ до всієї доступної пам'яті у 2 МБ.
:::

Щоб оновити завантажувач:

1. Вставте карту SD (це дозволить вести журналювання завантаження для відлагодження будь-яких проблем).
1. [Оновіть програмне забезпечення](../config/firmware.md) до версії PX4 _master_ (під час оновлення програмного забезпечення перевірте **Розширені налаштування** і виберіть **Розробницьку збірку (master)** із випадаючого списку). _QGroundControl_ автоматично виявить, що апаратне забезпечення підтримує FMUv2 і встановить відповідне програмне забезпечення.

   ![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)

   Зачекайте, доки  пристрій перезавантажиться.

1. [Знайдіть та увімкніть](../advanced_config/parameters.md) параметр [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).
1. Перезавантажте (відключіть / підключіть плату). Оновлення завантажувача займе лише кілька секунд.
1. Тоді знову [Оновити програмне забезпечення](../config/firmware.md). На цей раз _QGroundControl_ повинен автоматично визначити обладнання як FMUv3 і відповідним чином оновити програмне забезпечення.

   ![FMUv3 update](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)

:::note
Якщо апаратне забезпечення має [Помилки в кремнієвій мікросхемі](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata), воно все одно буде виявлене як FMUv2, і ви побачите, що FMUv2 було знову встановлено (у консолі). У цьому випадку ви не зможете встановити апаратне забезпечення FMUv3.
:::

## Інші плати (не Pixhawk)

Плати, які не є частиною серії [Pixhawk](../flight_controller/pixhawk_series.md), матимуть власні механізми оновлення завантажувача.

Для плат, які передвстановлені за допомогою Betaflight, дивіться [Flash пусковика на системи Betaflight](bootloader_update_from_betaflight.md).
