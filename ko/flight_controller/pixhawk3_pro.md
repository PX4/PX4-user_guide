# Pixhawk 3 프로

:::warning PX4에서는 이 제품을 제조하지 않습니다. 하드웨어 지원과 호환 문제는 [제조사](https://store-drotek.com/)에 문의하십시오.
:::

Pixhawk<sup>&reg;</sup> 3 Pro는 일부 업그레이드와 기능이 추가된 FMUv4 하드웨어 설계 (Pixracer)를 기반으로합니다. 이 보드는 [Drotek<sup>&reg;</sup>](https://drotek.com)과 PX4에 의해 설계되었습니다.

![Pixhawk 3 Pro hero image](../../assets/hardware/hardware-pixhawk3_pro.jpg)

:::note
주요 하드웨어 문서는 여기를 참고하십시오. https://drotek.gitbook.io/pixhawk-3-pro/hardware
:::

:::tip
이 자동조종장치는 PX4 유지관리 및 테스트 팀에서 [지원](../flight_controller/autopilot_pixhawk_standard.md)합니다.
:::

## 요약

- Microcontroller: **STM32F469**; Flash size is **2MiB**, RAM size is **384KiB**
- **ICM-20608-G** gyro / accelerometer
- **MPU-9250** gyro / accelerometer / magnetometer
- **LIS3MDL** compass
- Sensors connected via two SPI buses (one high rate and one low-noise bus)
- Two I2C buses
- Two CAN buses
- Voltage / battery readings from two power modules
- FrSky<sup>&reg;</sup> Inverter
- 8 Main + 6 AUX PWM outputs (Separate IO chip, PX4IO)
- microSD (logging)
- S.BUS / Spektrum / SUMD / PPM input
- JST GH user-friendly connectors: same connectors and pinouts as Pixracer

## Where to buy

From [Drotek store](https://store.drotek.com/) (EU) :

- [Pixhawk 3 Pro (Pack)](https://store.drotek.com/autopilots/844-pixhawk-3-pro-pack.html)
- [Pixhawk 3 Pro](https://store.drotek.com/autopilots/821-pixhawk-pro-autopilot-8944595120557.html)

From [readymaderc](https://www.readymaderc.com) (USA) :

- [Pixhawk 3 Pro](https://www.readymaderc.com/products/details/pixhawk-3-pro-flight-controller)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by *QGroundControl* when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

    make px4_fmu-v4pro_default
    

## Debug Port

The board has FMU and IO debug ports as shown below.

![Debug Ports](../../assets/flight_controller/pixhawk3pro/pixhawk3_pro_debug_ports.jpg)

The pinouts and connector comply with the [Pixhawk Standard Debug Port](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug) (JST SM06B connector).

| Pin     | Signal           | Volt  |
| ------- | ---------------- | ----- |
| 1 (red) | VCC TARGET SHIFT | +3.3V |
| 2 (blk) | CONSOLE TX (OUT) | +3.3V |
| 3 (blk) | CONSOLE RX (IN)  | +3.3V |
| 4 (blk) | SWDIO            | +3.3V |
| 5 (blk) | SWCLK            | +3.3V |
| 6 (blk) | GND              | GND   |

For information about wiring and using this port see:

- [PX4 System Console](../debug/system_console.md#pixhawk_debug_port) (Note, the FMU console maps to UART7).
- [SWD (JTAG) Hardware Debugging Interface](../debug/swd_debug.md)

## Serial Port Mapping

| UART   | Device     | Port                  |
| ------ | ---------- | --------------------- |
| UART1  | /dev/ttyS0 | WiFi                  |
| USART2 | /dev/ttyS1 | TELEM1 (flow control) |
| USART3 | /dev/ttyS2 | TELEM2 (flow control) |
| UART4  |            |                       |
| UART7  | CONSOLE    |                       |
| UART8  | SERIAL4    |                       |

<!-- Note: Got ports using https://github.com/PX4/px4_user_guide/pull/672#issuecomment-598198434 -->