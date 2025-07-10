---
canonicalUrl: https://docs.px4.io/main/de/debug/swd_gdb
---

# SWD GDB Hardware Debugging

This page documents how to connect the hardware target using GDB (from a terminal). To use an IDE instead, see the instructions for [Eclipse](../debug/eclipse_jlink.md) or [VSCode](../dev_setup/vscode.md#hardware-debugging).

For the wiring interface setup, please see this detailed information: [SWD/JTAG Debug Interface](../debug/swd_debug.md).

## Using Dronecode probe / Blackmagic probe

:::note
To debug STM32F7 or later (FMUv5 and newer) the Dronecode probe / Blackmagic probe likely requires a firmware update. You can find how to update the [blackmagic probe here](https://github.com/blacksphere/blackmagic/wiki/Upgrading-Firmware).
:::

To use a Dronecode probe with GDB, start GDB with the exact ELF file that is currently flashed on the autopilot:

```bash
arm-none-eabi-gdb build/px4_fmu-v5_default/px4_fmu-v5_default.elf
```

Then, you have to select the Dronecode probe interface, on Linux this is e.g.:
```bash
target ext /dev/serial/by-id/usb-Black_Sphere_Technologies_Black_Magic_Probe_f9414d5_7DB85DAC-if00
```

Then you scan for the target:
```bash
monitor swdp_scan
```

And you should see something like:
```bash
Target voltage: 3.3V
Available Targets:
No. Att Driver
 1      STM32F76x M7
```

Note that for some autopilots it shows 0.0V but the subsequent steps work nevertheless.

You can now attach to that target:
```
attach 1
```

And now you should be connected.

## Using JLink

To use the JLink debugger, you first need to [install the JLink software](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack) containing the JLink GDB server.

The JLink installer should install the JLink GDB server to `/usr/bin/`. Once installed, you can start the server using:

```bash
JLinkGDBServer -if swd
```

It might then prompt you to update the JLink which is recommended, and then to specify which device it is communicating with. Check the docs of your autopilot for the specific device.

Once that's done, the GDB server should be start listening on port `2331`, e.g. like so:
```bash
Checking target voltage...
Target voltage: 3.28 V
Listening on TCP/IP port 2331
Connecting to target...
Connected to target
Waiting for GDB connection...
```

You can now start GDB with the exact elf file that is currently flashed on the autopilot (in a separate terminal):

```bash
arm-none-eabi-gdb build/px4_fmu-v5_default/px4_fmu-v5_default.elf
```

And connect to the GDB server:
```bash
target remote :2331
```

And now you should be connected.

## GDB Quickstart

Once connected, you can use the usual GDB commands such as:
- `continue` to continue program execution
- `run` to start from the beginning
- `backtrace` to see the backtrace
- `break somewhere.cpp:123` to set a breakpoint
- `delete somewhere.cpp:123` to remove it again
- `info locals` to print local variables
- `info registers` to print the registers

And much more, just use your favorite resource to learn more about GDB.

:::tip
To avoid having to type all commands to connect in GDB each time, you can write them into `~/.gdbinit`.
:::
