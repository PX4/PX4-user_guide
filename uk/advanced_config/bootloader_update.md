# Оновлення завантажувача

_PX4 Bootloader_ використовується для завантаження прошивки для [Pixhawk boards](../flight_controller/pixhawk_series.md) (PX4FMU, PX4IO).

Зазвичай контролери Pixhawk поставляються з попередньо встановленою відповідною версією завантажувача.
Однак у деяких випадках його може бути відсутній, або може бути присутня старіша версія, яку потрібно оновити, або плата може бути відключена і потребує стирання та перевстановлення завантажувача.

Ця тема пояснює, як побудувати завантажувач PX4 та кілька методів для його прошивки на плату.

::: info

- Більшість плат потребують використання [Debug Probe](#debug-probe-bootloader-update) для оновлення завантажувача.
- На [FMUv6X-RT](../flight_controller/pixhawk6x-rt.md) ви можете [встановлювати завантажувач/відновлювати плати через USB](bootloader_update_v6xrt.md).
  Це корисно, якщо у вас немає тесту налагодження.
- У FMUv2 та деяких нестандартних прошивках (тільки) ви можете використовувати [Оновлення завантажувача QGC](#qgc-bootloader-update).

:::

## Створення завантажувача PX4

### PX4 Bootloader FMUv6X та новіші

Плати, що починаються з FMUv6X (STM32H7), використовують вбудований завантажувач PX4.

Це можна побудувати з каталогу [PX4-Autopilot](https://github.com/PX4/PX4-Autopilot), використовуючи команду `make` та конкретну для плати ціль з суфіксом `_bootloader`.

Для FMUv6X команда наступна:

```sh
make px4_fmu-v6x_bootloader
```

Це збудує бінарний файл завантажувача як `build/px4_fmu-v6x_bootloader/px4_fmu-v6x_bootloader.elf`, який можна прошити через SWD або DFU.
Якщо ви збираєте завантажувач, вам вже повинні бути знайомі з одним із цих варіантів.

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

2. Get a [Debug Probe](../debug/swd_debug.md#debug-probes-for-px4-hardware).
   Get a [Debug Probe](../debug/swd_debug. md#debug-probes-for-px4-hardware). Підключіть зонд до комп'ютера за допомогою USB та налаштуйте `gdbserver`.

3. Перейдіть до каталогу, що містить бінарний файл, і запустіть команду для обраного вами завантажувача в терміналі:

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

   ::: info
   H7 Bootloaders from [PX4/PX4-Autopilot](https://github.com/PX4/PX4-Autopilot) are named with pattern `*._bootloader.elf`.
   Bootloaders from [PX4/PX4-Bootloader](https://github.com/PX4/PX4-Bootloader) are named with the pattern `*_bl.elf`.

:::

4. The _gdb terminal_ appears and it should display the following output:

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

5. Find your `<dronecode-probe-id>` by running an `ls` command in the **/dev/serial/by-id** directory.

6. Тепер підключіться до debug probe з наступною командою:

   ```sh
   tar ext /dev/serial/by-id/<dronecode-probe-id>
   ```

7. Power on the Pixhawk with another USB cable and connect the probe to the `FMU-DEBUG` port.

   ::: info
   If using a Dronecode probe you may need to remove the case in order to connect to the `FMU-DEBUG` port (e.g. on Pixhawk 4 you would do this using a T6 Torx screwdriver).

:::

8. Використовуйте таку команду, щоб знайти SWD Pixhawk і підключитися до нього:

   ```sh
   (gdb) mon swdp_scan
   (gdb) attach 1
   ```

9. Завантажте двійковий файл в Pixhawk:

   ```sh
   (gdb) load
   ```

Після оновлення завантажувача ви можете [завантажити прошивку PX4](../config/firmware.md) за допомогою _QGroundControl_.

## Оновлення завантажувача QGC

The easiest approach is to first use _QGroundControl_ to install firmware that contains the desired/latest bootloader.
You can then initiate bootloader update on next restart by setting the parameter: [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

This approach can only be used if [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE) is present in firmware.

:::warning
Currently only FMUv2 and some custom firmware includes the desired bootloader.
:::

Кроки наступні:

1. Вставте SD-карту (це дозволяє реєструвати журнали завантаження для відлагодження будь-яких проблем).

2. [Update the Firmware](../config/firmware.md#custom) with an image containing the new/desired bootloader.

   ::: info
   The updated bootloader might be supplied in custom firmware (i.e. from the dev team), or it or may be included in the latest main branch.

:::

3. Зачекайте, доки транспортний засіб перезавантажиться.

4. [Find and enable](../advanced_config/parameters.md) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

5. Перезавантажте (відключіть / підключіть плату).
   Оновлення завантажувача займе лише кілька секунд.

Generally at this point you may then want to [update the firmware](../config/firmware.md) again using the correct/newly installed bootloader.

Наведений нижче конкретний приклад цього процесу оновлення загрузчика FMUv2.

### Оновлення завантажувача FMUv2

If _QGroundControl_ installs the FMUv2 target (see console during installation), and you have a newer board, you may need to update the bootloader in order to access all the memory on your flight controller.

:::info
Early FMUv2 [Pixhawk-series](../flight_controller/pixhawk_series.md#fmu_versions) flight controllers had a [hardware issue](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata) that restricted them to using 1MB of flash memory.
Проблема виправлена на новіших платах, але вам може знадобитися оновити заводський завантажувальник, щоб встановити прошивку FMUv3 та мати доступ до всієї доступної пам'яті у 2 МБ.
:::

Щоб оновити завантажувач:

1. Вставте SD-карту (це дозволяє реєструвати журнали завантаження для відлагодження будь-яких проблем).

2. [Update the Firmware](../config/firmware.md) to PX4 _master_ version (when updating the firmware, check **Advanced settings** and then select **Developer Build (master)** from the dropdown list).
   _QGroundControl_ will automatically detect that the hardware supports FMUv2 and install the appropriate Firmware.

   ![FMUv2 update](../../assets/qgc/setup/firmware/bootloader_update.jpg)

   Зачекайте, доки транспортний засіб перезавантажиться.

3. [Find and enable](../advanced_config/parameters.md) the parameter [SYS_BL_UPDATE](../advanced_config/parameter_reference.md#SYS_BL_UPDATE).

4. Перезавантажте (відключіть / підключіть плату).
   Оновлення завантажувача займе лише кілька секунд.

5. Then [Update the Firmware](../config/firmware.md) again.
   This time _QGroundControl_ should autodetect the hardware as FMUv3 and update the Firmware appropriately.

   ![FMUv3 update](../../assets/qgc/setup/firmware/bootloader_fmu_v3_update.jpg)

   ::: info
   If the hardware has the [Silicon Errata](../flight_controller/silicon_errata.md#fmuv2-pixhawk-silicon-errata) it will still be detected as FMUv2 and you will see that FMUv2 was re-installed (in console).
   У цьому випадку ви не зможете встановити апаратне забезпечення FMUv3.

:::

## Інші плати (не Pixhawk)

Boards that are not part of the [Pixhawk Series](../flight_controller/pixhawk_series.md) will have their own mechanisms for bootloader update.

For boards that are preflashed with Betaflight, see [Bootloader Flashing onto Betaflight Systems](bootloader_update_from_betaflight.md).
