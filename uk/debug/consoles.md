# Консолі/Оболонки PX4

PX4 дозволяє термінальний доступ до системи через [Оболонку MAVLink](../debug/mavlink_shell.md) та [Системну консоль](../debug/system_console.md).

Ця сторінка пояснює основні відмінності та як використовується консоль/оболонка.

<a id="console_vs_shell"></a>

## Системна консоль у порівнянні з оболонкою

_Системна консоль_ PX4 забезпечує низькорівневий доступ до системи, виводу налагодження та аналізу процесу завантаження системи.

Є лише одна _Системна консоль _, яка працює на одному конкретному UART (порт налагодження, як налаштовано в NuttX) та зазвичай під'єднана до комп'ютера за допомогою кабелю FTDI (або якогось іншого адаптера для налагодження, наприклад, [зонда Dronecode](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation)).

- Використовується для _низькорівневого налагодження/розробки_: завантаження, NuttX, скриптів запуску, запуску плати, розробки центральних частин PX4 (наприклад uORB).
- Зокрема, це єдине місце, де виводиться весь вивід завантаження (включаючи інформацію про програми, які автоматично запускаються при завантаженні).

Оболонки надають високорівневий доступ до системи:

- Використовується для базового тестування модулів/виконання команд.
- Лише _безпосередньо_ показує вивід модулів, які ви запускаєте.
- Не може _безпосередньо_ показувати вивід завдань, запущених у робочій черзі.
- Не може налагоджувати проблеми, коли система не запускається (оскільки вона ще не працює).

::: info Команда `dmesg` тепер доступна через оболонку на деяких платах, що дозволяє набагато більш низькорівневе налагодження, ніж раніше було можливо. For example, with `dmesg -f &` you also see the output of background tasks.
:::

There can be several shells, either running on a dedicated UART, or via MAVLink. Since MAVLink provides more flexibility, currently only the [MAVLink Shell](../debug/mavlink_shell.md) is used.

The [System Console](../debug/system_console.md) is essential when the system does not boot (it displays the system boot log when power-cycling the board). The [MAVLink Shell](../debug/mavlink_shell.md) is much easier to setup, and so is more generally recommended for most debugging.

<a id="using_the_console"></a>

## Using Consoles/Shells

The MAVLink shell/console and the [System Console](../debug/system_console.md) are used in much the same way.

For example, type `ls` to view the local file system, `free` to see the remaining free RAM, `dmesg` to look at boot output.

```sh
nsh> ls
nsh> free
nsh> dmesg
```

Below are a couple of commands which can be used in the [NuttShell](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=139629410) to get insights of the system.

This NSH command provides the remaining free memory:

```sh
free
```

The top command shows the stack usage per application:

```sh
top
```

Note that stack usage is calculated with stack coloring and is the maximum since the start of the task (not the current usage).

To see what is running in the work queues and at what rate, use:

```sh
work_queue status
```

To debug uORB topics:

```sh
uorb top
```

To inspect a specific uORB topic:

```sh
listener <topic_name>
```

Many other system commands and modules are listed in the [Modules and Command Reference](../modules/modules_main.md) (e.g. `top`, `listener`, etc.).

:::tip
Some commands may be disabled on some boards (i.e. the some modules are not included in firmware for boards with RAM or FLASH constraints). In this case you will see the response: `command not found`
:::
