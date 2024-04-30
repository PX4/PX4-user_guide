# Налагодження з GDB

[Налагоджувач GNU (GDB)](https://sourceware.org/gdb/download/onlinedocs/gdb/index.html) інстальовано разом з інструментарієм компілятора у вигляді бінарного файлу `arm-none-eabi-gdb`. Налагоджувач читає символи відладки у файлі формату виконання ELF щоб зрозуміти статичну та динамічну структуру пам'яті прошивки PX4. Для доступу до мікроконтролера автопілота PX4, йому потрібно з'єднатися з [віддаленою ціллю](https://sourceware.org/gdb/download/onlinedocs/gdb/Connecting.html), яка надається [зондом налагодження за протоколом SWD](swd_debug.md).

Плин інформації виглядає таким чином:

```sh
Розробник <=> GDB <=> сервер GDB <=> зонд налагодження <=> SWD <=> автопілот PX4.
```

## Швидкий старт

Для початку сеансу налагодження вам зазвичай потрібно:

1. Спеціалізований [зонд налагодження за протоколом SWD](../debug/swd_debug.md#debug-probes).
2. Знайти та під'єднатися до [порту налагодження SWD](../debug/swd_debug.md#autopilot-debug-ports). Можливо знадобиться [адаптер налагодження](swd_debug.md#debug-adapters).
3. Configure and start the debug probe to create a GDB server.
4. Launch GDB and connect to the GDB server as a remote target.
5. Debug your firmware interactively.

See the debug probe documentation for details on how to setup your debug connection:

- [SEGGER J-Link](probe_jlink.md): commercial probe, no built-in serial console, requires adapter.
- [Black Magic Probe](probe_bmp.md): integrated GDB server and serial console, requires adapter.
- [STLink](probe_stlink): best value, integrated serial console, adapter must be soldered.

We recommend using the J-Link with the Pixhawk Debug Adapter or the STLinkv3-MINIE with a soldered custom cable.

Once connected, you can use the usual GDB commands such as:

- `continue` to continue program execution
- `run` to start from the beginning
- `backtrace` to see the backtrace
- `break somewhere.cpp:123` to set a breakpoint
- `delete somewhere.cpp:123` to remove it again
- `info locals` to print local variables
- `info registers` to print the registers

Consult the [GDB documentation](https://sourceware.org/gdb/download/onlinedocs/gdb/index.html) for more details.

:::tip
To avoid having to type all commands to connect in GDB each time, you can write them into `~/.gdbinit`.
:::

## Наступні кроки

You've now connected the flight controller to an SWD debug probe!

The following topics explain how to start on-target debugging:

- [MCU Eclipse/J-Link Debugging for PX4](eclipse_jlink.md).
- [Visual Studio Code IDE (VSCode)](../dev_setup/vscode.md).

## Embedded Debug Tools

The [Embedded Debug Tools](https://pypi.org/project/emdbg/) connect several software and hardware debugging tools together in a user friendly Python package to more easily enable advanced use cases for ARM Cortex-M microcontrollers and related devices.

The library orchestrates the launch and configuration of hardware debug and trace probes, debuggers, logic analyzers, and waveform generators and provides analysis tools, converters, and plugins to provide significant insight into the software and hardware state during or after execution.

The `emdbg` library contains [many useful GDB plugins](https://github.com/Auterion/embedded-debug-tools/blob/main/src/emdbg/debug/gdb.md#user-commands) that make debugging PX4 easier. It also provides tools for [profiling PX4 in real-time](https://github.com/Auterion/embedded-debug-tools/tree/main/ext/orbetto).
