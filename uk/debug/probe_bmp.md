# Black Magic Probe (and Dronecode Probe)

[Чорна Магія Зонд](https://black-magic.org) - це простий у використанні, в основному готовий до роботи, відладчик JTAG/SWD для вбудованих мікроконтролерів. Since the Black Magic Probe is a generic debug probe, you will need an adapter to connect to Pixhawk flight controllers, which can be purchased here:

- [Drone Code Debug Adapter](https://1bitsquared.com/products/drone-code-debug-adapter) (1 BIT SQUARED).

## Dronecode Probe

The [Dronecode Probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation) is a specialization of the Black Magic Probe for debugging PX4 autopilots.

Інтерфейс USB-зонда викриває два окремі віртуальні інтерфейси послідовного порту: один для підключення до [System Console](system_console.md) (UART), а інший - для вбудованого GDB-сервера (SWD-інтерфейс).

Датчик надає кабель з'єднувача DCD-M для підключення до [Pixhawk Debug Mini](swd_debug.md#pixhawk-debug-mini).

::: інформація
Роз'єм _6-pos DF13_, який поставляється з зондом, не може бути використаний для налагодження SWD (він призначений для використання System Console).
:::

## Використання зонда

::: інформація
Для відлагодження STM32F7 або пізніших (FMUv5 та новіших) ймовірно потрібне оновлення прошивки пристрою Dronecode probe / Blackmagic probe. Ви можете знайти, як оновити [blackmagic probe](https://github.com/blacksphere/blackmagic/wiki/Upgrading-Firmware) тут.
:::

Щоб використовувати зонд Dronecode з GDB, запустіть GDB з точним ELF-файлом, який в даний момент прошивається на автопілоті:

```sh
arm-none-eabi-gdb build/px4_fmu-v2_default/px4_fmu-v2_default.elf
```

Then, you have to select the Dronecode probe interface, on Linux this is e.g.:

```sh
цільовий ext /dev/serial/by-id/usb-Black_Sphere_Technologies_Black_Magic_Probe_f9414d5_7DB85DAC-if00
```

Потім проскануйте ціль:

```sh
monitor swdp_scan
```

Перед вами відобразиться приблизно такий вивід:

```sh
Target voltage: 3.3V
Available Targets:
No. Target voltage: 3.3V
Available Targets:
No.
```

Зверніть увагу, що для деяких автопілотів він показує 0.0V, але наступні кроки все одно працюють.

Тепер ви можете підключитися до цієї цілі:

```sh
attach 1
```

Тепер ви відключилися.
