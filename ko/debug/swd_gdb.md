# SWD GDB 하드웨어 디버깅

터미널에서 GDB를 사용하여 하드웨어 대상을 연결하는 방법을 설명합니다. IDE를 사용하려면 [Eclipse](../debug/eclipse_jlink.md) 또는 [VSCode](../dev_setup/vscode.md#hardware-debugging) 사용법을 참고하십시오.

인터페이스 배선에 대해서는 [이 세부 정보](../debug/swd_debug.md)를 참조하십시오.

## Dronecode 프로브 / Blackmagic 프로브 사용

:::note STM32F7 이상(FMUv5 이상)을 디버그하려면, Dronecode 프로브/Blackmagic 프로브에 펌웨어 업데이트해야 할 수 있습니다. [blackmagic probe를 업데이트하는 방법은 여기](https://github.com/blacksphere/blackmagic/wiki/Upgrading-Firmware)를 참고하십시오.
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
