# Serial Port Mapping

This topic shows how to determine the mapping between serial ports (UART), device (e.g. "ttyS0") and specific functions enabled by PX4 (e.g. TELEM1, TELEM2, GPS1, RC SBUS, Debug console).

:::note
The instructions are used to generate serial port mapping tables in flight controller documentation. For example: [Pixhawk 4 > Serial Port Mapping](../flight_controller/pixhawk4.md#serial-port-mapping).
:::

## NuttX on STMxxyyy

<!-- instructions from DavidS here: https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->

This section shows how to get the mappings for NuttX builds on STMxxyyy architectures by inspecting the board configuration files. The instructions use FMUv5, but can similarly be extended for other FMU versions/NuttX boards.

### default.cmake

The **default.cmake** lists a number of serial port mappings (search for the text "SERIAL_PORTS").

From [/boards/px4/fmu-v5/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake#L13-L17):

```
SERIAL_PORTS
    GPS1:/dev/ttyS0
    TEL1:/dev/ttyS1
    TEL2:/dev/ttyS2
    TEL4:/dev/ttyS3
```

### nsh/defconfig

The *nsh/defconfig* allows you to determine which ports are defined, whether they are UART or USARTs, and the mapping between USART/UART and device. You can also determine which port is used for the [serial/debug console](../debug/system_console.md).

Open the board's defconfig file, for example: [/boards/px4/fmu-v5/nuttx-config/nsh/defconfig](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L191-L197)

Search for the text "ART" until you find a section like with entries formatted like `CONFIG_STM32xx_USARTn=y` (where `xx` is a processor type and `n` is a port number). For example:

```
CONFIG_STM32F7_UART4=y
CONFIG_STM32F7_UART7=y
CONFIG_STM32F7_UART8=y
CONFIG_STM32F7_USART1=y
CONFIG_STM32F7_USART2=y
CONFIG_STM32F7_USART3=y
CONFIG_STM32F7_USART6=y
```

The entries tell you which ports are defined, and whether they are UART or USART.

Copy the section above and reorder numerically by "n". Increment the device number _ttyS**n**_ alongside (zero based) to get the device-to-serial-port mapping.
```
ttyS0 CONFIG_STM32F7_USART1=y
ttyS1 CONFIG_STM32F7_USART2=y
ttyS2 CONFIG_STM32F7_USART3=y
ttyS3 CONFIG_STM32F7_UART4=y
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y
ttyS6 CONFIG_STM32F7_UART8=y
```

To get the DEBUG console mapping we search the [defconfig file](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/nuttx-config/nsh/defconfig#L212) for `SERIAL_CONSOLE`. Below we see that the console is on UART7:

```
CONFIG_UART7_SERIAL_CONSOLE=y
```

### board_config.h

For flight controllers that have an IO board, determine the PX4IO connection from **board_config.h** by searching for `PX4IO_SERIAL_DEVICE`.

For example, [/boards/px4/fmu-v5/src/board_config.h](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/src/board_config.h#L59):
```
#define PX4IO_SERIAL_DEVICE            "/dev/ttyS6"
#define PX4IO_SERIAL_TX_GPIO           GPIO_UART8_TX
#define PX4IO_SERIAL_RX_GPIO           GPIO_UART8_RX
#define PX4IO_SERIAL_BASE              STM32_UART8_BASE
```
So the PX4IO is on `ttyS6` (we can also see that this maps to UART8, which we already knew from the preceding section).

### Putting it all together

The final mapping is:
```
ttyS0 CONFIG_STM32F7_USART1=y GPS1
ttyS1 CONFIG_STM32F7_USART2=y TEL1
ttyS2 CONFIG_STM32F7_USART3=y TEL2
ttyS3 CONFIG_STM32F7_UART4=y TEL4
ttyS4 CONFIG_STM32F7_USART6=y
ttyS5 CONFIG_STM32F7_UART7=y DEBUG
ttyS6 CONFIG_STM32F7_UART8=y PX4IO
```

In the [flight controller docs](../flight_controller/pixhawk4.md#serial-port-mapping) the resulting table is:

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | GPS                   |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  | /dev/ttyS3 | TELEM4                |
| USART6 | /dev/ttyS4 | RC SBUS               |
| UART7  | /dev/ttyS5 | Debug Console         |
| UART8  | /dev/ttyS6 | PX4IO                 |


## Other Architectures

:::note
Contributions welcome!
:::
