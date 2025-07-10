---
canonicalUrl: https://docs.px4.io/main/ko/debug/swd_debug
---

# SWD (JTAG) 하드웨어 디버깅 인터페이스

PX4는 일반적으로 ARM *직렬 와이어 디버그(SWD)* 인터페이스를 제공하는 자동조종장치 컨트롤러에서 실행됩니다. SWD는 ARM 프로세서에서 JTAG 디버깅을 위한 핀 수가 적은 물리적 인터페이스입니다. SWD 호환 디버그 프로브(예: [Segger J-Link EDU Mini](#segger_jlink_edu_mini), [Dronecode Probe](#dronecode_probe) 등)와 함께 사용하여 PX4에서 중단점을 설정하고, 실제 장치에서 실행중인 코드를 단계별로 실행할 수 있습니다.

SWD 인터페이스를 사용하여 완전히 비어 있는 보드(USB 부트로더가 설치되지 않은 보드)에 새 부트로더나 펌웨어를 추가할 수 있습니다.

This topic explains how to connect the SWD interface on different boards (debugging itself is then covered in the associated [debugging topics](#debugging_topics)).

<a id="swd_interface"></a>

## SWD 인터페이스 정의

SWD 인터페이스는 다음과 같은 핀으로 구성됩니다.

| 핀       | 신호 형식 | 설명                                                                                                                                              |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Vref`  | 출력    | 목표 기준 전압: <br>일부 JTAG 어댑터는 SWD 라인의 전압을 설정하기 위하여 `Vref` 전압이 필요합니다. 예를 들어, [SEGGER J-Link 디버그 프로브](#segger_jlink_edu_mini)에는 `Vref`가 필요합니다. |
| `SWDIO` | 입출력   | 단일 양방향 데이터 핀.                                                                                                                                   |
| `SWCLK` | 출력    | 클록 신호                                                                                                                                           |
| `GND`   | -     | 접지 핀                                                                                                                                            |


SWD의 "일부"는 아니지만, 자동조종장치에는 *직렬 와이어 출력(SWO)* 추적 출력 핀이 있을 수 있습니다. 이 핀이 있는 경우에는 이것을 연결하여야 합니다.

| 핀     | 신호 형식 | 설명                                                          |
| ----- | ----- | ----------------------------------------------------------- |
| `SWO` | 출력    | 직렬 와이어 출력 트레이스 출력 핀. 실시간 추적 데이터를 내보내는 *SWD*와 함께 사용할 수 있습니다. |


## SWD 디버거를 PX4 하드웨어에 연결

Flight controllers commonly provide a single debug port that exposes both the [SWD Interface](#swd_interface) and [System Console](../debug/system_console.md). This must be connected to an SWD [debug probe](#debug_probes) using an "appropriate" connector.

This connector may come with your flight controller or debug probe. Other options are given below.

### Holybro Pixhawk Debug Adapter

The [Holybro Pixhawk Debug Adapter](https://shop.holybro.com/pixhawk-debug-adapter_p1318.html) is _highly recommended_ when debugging controllers that use one of the Pixhawk-standard debug connectors.

It is the easiest way to connect:
- Flight controllers that use either the [Pixhawk Debug Full](#pixhawk_debug_port_10_pin_sh) (10-pin SH) or [Pixhawk Debug Mini](#pixhawk-debug-mini-6-pin-sh-debug-port) (6-pin SH) debug port, and
- SWD debug probes that support the 10-pin ARM compatible interface standard used by the [Segger JLink Mini](#segger-jlink-edu-mini-debug-probe) or 20-pin compatible with the Segger Jlink or STLink.

![Holybro Pixhawk Debug Adapter](../../assets/debug/holybro_pixhawk_debug_adapter.png)

### Debug Probe Adapters

Some SWD [debug probes](#debug_probes) come with adapters/cables for connecting to common Pixhawk [debug ports](#debug_ports). Probes that are known to come with connectors are listed below:

- [DroneCode Probe](#dronecode-probe): comes with a connector for attaching to the [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)

### Board-specific Adapters

Some manufacturers provide cables to make it easy to connect the SWD interface and [System Console](../debug/system_console.md).

- [CUAV V5nano](../flight_controller/cuav_v5_nano.md#debug_port) and [CUAV V5+](../flight_controller/cuav_v5_plus.md#debug-port) include this debug cable:

![6-pin JST SH Cable](../../assets/debug/cuav_v5_debug_cable.jpg)

### Custom Cables

You can also create custom cables for connecting to different boards or probes:
- Connect `SWDIO`, `SWCLK` and `GND` pins on the debug probe to the corresponding pins on the autopilot.
- Connect the `VRef` pin, if required by the debug adapter that is being used.
- Connect the `SWO` pin, if present.

:::tip
Where possible, we highly recommend that you create or obtain an adapter board rather than custom cables for connecting to SWD/JTAG debuggers and computers.
This reduces the risk or poor wiring contributing to debugging problems, and has the benefit that adapters usually provide a common interface for connecting to multiple popular flight controller boards.
:::

<a id="debug_ports"></a>

## 자동비행장치 디버그 포트

Flight controllers commonly provide a single debug port that exposes both the [SWD Interface](#swd_interface) and [System Console](../debug/system_console.md).

The [Pixhawk Connector Standards](#pixhawk_standard_debug_ports) formalize the port that must be used in each FMU version. However there are still many boards that use different pinouts or connectors, so we recommend you check the [documentation for your autopilot](../flight_controller/README.md) to confirm port location and pinout.

The debug port location and pinouts for a subset of autopilots are linked below:

<a id="port_information"></a>

| 자동조종장치                                                                              | 커넥터                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Holybro Pixhawk 5X](../flight_controller/pixhawk5x.md#debug-port) (FMUv5x)         | [Pixhawk Debug Full](#pixhawk-debug-full-10-pin-sh-debug-port)                                                                                                                                                                              |
| [Holybro Durandal](../flight_controller/durandal.md#debug-port)                     | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)                                                                                                                                                                                          |
| [Holybro Kakute F7](../flight_controller/kakutef7.md#debug-port)                    | Solder pads                                                                                                                                                                                                                                 |
| [Holybro Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md#debug-port) (FMUv5)  | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)                                                                                                                                                                                          |
| [Holybro Pixhawk 4](../flight_controller/pixhawk4.md#debug_port) (FMUv5)            | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)                                                                                                                                                                                          |
| [Drotek Pixhawk 3 Pro](../flight_controller/pixhawk3_pro.md#debug-port) (FMU-v4pro) | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)                                                                                                                                                                                          |
| [CUAV V5+](../flight_controller/cuav_v5_plus.md#debug-port)                         | 6-pin JST GH<br>Digikey: [BM06B-GHS-TBT(LF)(SN)(N)](https://www.digikey.com/products/en?keywords=455-1582-1-ND) (vertical mount), [SM06B-GHS-TBT(LF)(SN)(N)](https://www.digikey.com/products/en?keywords=455-1568-1-ND) (side mount) |
| [CUAV V5nano](../flight_controller/cuav_v5_nano.md#debug_port)                      | 6-pin JST GH<br>Digikey: [BM06B-GHS-TBT(LF)(SN)(N)](https://www.digikey.com/products/en?keywords=455-1582-1-ND) (vertical mount), [SM06B-GHS-TBT(LF)(SN)(N)](https://www.digikey.com/products/en?keywords=455-1568-1-ND) (side mount) |
| [3DR Pixhawk](../flight_controller/pixhawk.md#swd-port)                             | ARM 10-pin JTAG Connector (also used for FMUv2 boards including: *mRo Pixhawk*, *HobbyKing HKPilot32*).                                                                                                                                     |



<a id="pixhawk_standard_debug_ports"></a>

## Pixhawk Connector Standard Debug Ports

The Pixhawk project has defines a standard pinout and connector type for different Pixhawk FMU releases:

:::tip
Check your [specific board](#port_information) to confirm the port used.
:::

| FMU 버전 | Pixhawk 버전                                                      | 디버그 인터페이스                                                      |
| ------ | --------------------------------------------------------------- | -------------------------------------------------------------- |
| FMUv2  | [Pixhawk / Pixhawk 1](../flight_controller/pixhawk.md#swd-port) | 10핀 ARM 디버그                                                    |
| FMUv3  | Pixhawk 2                                                       | 6핀 SUR 디버그                                                     |
| FMUv4  | Pixhawk 3                                                       | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)             |
| FMUv5  | Pixhawk 4 FMUv5                                                 | [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh)             |
| FMUv5X | Pixhawk 5X                                                      | [Pixhawk Debug Full](#pixhawk-debug-full-10-pin-sh-debug-port) |
| FMUv6  | Pixhawk 6                                                       | [Pixhawk Debug Full](#pixhawk-debug-full-10-pin-sh-debug-port) |
| FMUv6X | Pixhawk 6X                                                      | [Pixhawk Debug Full](#pixhawk-debug-full-10-pin-sh-debug-port) |

:::note
There FMU and Pixhawk versions are (only) consistent after FMUv5X.
:::

<a id="pixhawk_debug_port_6_pin_sh"></a>

### Pixhawk Debug Mini (6-Pin SH Debug Port)

The [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) defines the _Pixhawk Debug Mini_, a *6-Pin SH Debug Port* that provides access to both SWD pins and the [System Console](../debug/system_console.md).

This is used in FMUv4 and FMUv5.

The pinout is as shown below (SWD pins highlighted):

| 디버그 포트 | 핀        |
| ------ | -------- |
| 1      | `Vtref`  |
| 2      | 콘솔 TX    |
| 3      | 콘솔 RX    |
| 4      | `SWDIO`  |
| 5      | `SWDCLK` |
| 6      | `GND`    |

The debug port definition includes the following solder pads (on board next to connector):

| 디버그 포트 | 핀                | 전압    |
| ------ | ---------------- | ----- |
| 패드     | 신호               | 볼트    |
| 1      | NRST (reset)     | +3.3V |
| 2      | GPIO1 (여분의 GPIO) | +3.3V |
| 3      | GPIO2 (여분의 GPIO) | +3.3V |

The socket is a *6-pin JST SH* - Digikey number: [BM06B-SRSS-TBT(LF)(SN)](https://www.digikey.com/products/en?keywords=455-2875-1-ND) (vertical mount), [SM06B-SRSS-TBT(LF)(SN)](https://www.digikey.com/products/en?keywords=455-1806-1-ND)(side mount).

You can connect to the debug port using a [cable like this one](https://www.digikey.com/products/en?keywords=A06SR06SR30K152A).

![6-pin JST SH Cable](../../assets/debug/cable_6pin_jst_sh.jpg)


<a id="pixhawk_debug_port_10_pin_sh"></a>

### Pixhawk Debug Full (10-Pin SH Debug Port)

The [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) defines _Pixhawk Debug Full_, a *10-Pin SH Debug Port* that provides access to both SWD pins and the [System Console](../debug/system_console.md). This essentially moves the solder pads from beside the [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh) into the connector, and also adds an SWO pin.

This port is specified for use in FMUv5x, FMUv6, FMUv6x.

The pinout is as shown below (SWD pins highlighted):

| 디버그 포트 | 핀        |
| ------ | -------- |
| 1      | `Vtref`  |
| 2      | 콘솔 TX    |
| 3      | 콘솔 RX    |
| 4      | `SWDIO`  |
| 5      | `SWDCLK` |
| 6      | *SWO*    |
| 7      | NFC GPIO |
| 8      | PH11     |
| 9      | nRST     |
| 10     | `GND`    |

The socket is a *10-pin JST SH* - Digikey number: [BM10B-SRSS-TB(LF)(SN)](https://www.digikey.com/products/en?keywords=455-1796-2-ND) (vertical mount) or [SM10B-SRSS-TB(LF)(SN)](https://www.digikey.com/products/en?keywords=455-1810-2-ND) (side mount).

You can connect to the debug port using a [cable like this one](https://www.digikey.com/products/en?keywords=A10SR10SR30K203A).

![10-pin JST SH Cable](../../assets/debug/cable_10pin_jst_sh.jpg) <!-- better to have image showing proper connections for SWD+SWO -->


<a id="debug_probes"></a>

## 디버그 프로브

The following section outlines some popular debug probes and adaptors for connecting them to autopilots running PX4.


<a id="segger_jlink_edu_mini"></a>

### Segger JLink EDU Mini Debug Probe

The [Segger JLink EDU Mini](https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/) is an inexpensive and popular SWD debug probe. The probe's connector pinout looks like the image below (connect to this using an ARM 10-pin mini connector like [FTSH-105-01-F-DV-K](https://www.digikey.com/products/en?keywords=SAM8796-ND)).

![connector_jlink_mini.png](../../assets/debug/connector_jlink_mini.png)

The pin mapping to connect the J-Link Edu Mini to [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh) is shown below (note, the `-` indicates a pin that is not required for SWD).

| 디버그 포트     | J-Link Mini |
| ---------- | ----------- |
| 1 (Vtref)  | 1           |
| 2 (콘솔 TX)  | -           |
| 3 (콘솔 RX)  | -           |
| 4 (SWDIO)  | 2           |
| 5 (SWDCLK) | 4           |
| 6 (GND)    | 3 또는 5      |

:::tip
From the table above you can infer the connections for autopilots that do not use the standard port.
:::

<!-- Image of SWD cable and connector to debug port? -->


<a id="dronecode_probe"></a>

### Dronecode Probe

The [Dronecode Probe](https://kb.zubax.com/display/MAINKB/Dronecode+Probe+documentation) is a generic JTAG/SWD + UART console adapter compatible with most ARM Cortex based designs, and in particular with Pixhawk series flight controllers (and other hardware that PX4 supports).

The probe's USB interface exposes two separate virtual serial port interfaces: one for connecting to the [System Console](../debug/system_console.md) (UART) and the other for an embedded GDB server (SWD interface).

The probe provides a DCD-M connector cable for attaching to the [Pixhawk Debug Mini](#pixhawk_debug_port_6_pin_sh).

:::note
The *6-pos DF13* connector that comes with the probe cannot be used for SWD debugging (it is for using the System Console).
:::

:::note
The *Dronecode Probe* is based on the [Black Magic Probe](#black_magic_probe).
:::

<a id="black_magic_probe"></a>

### Black Magic Probe

The [Black Magic Probe](https://github.com/blacksphere/blackmagic/wiki) is much like the [Dronecode probe](#dronecode_probe) but does not come with the same adapters for directly connecting to Pixhawk series flight controllers.

Adapters can be purchased separately:
- [Drone Code Debug Adapter](https://1bitsquared.com/products/drone-code-debug-adapter) (1 BIT SQUARED).


<a id="debugging_topics"></a>

## 다음 단계

You've now connected the flight controller to an SWD debug probe!

The following topics explain how to start on-target debugging:

- [MCU Eclipse/J-Link Debugging for PX4](../debug/eclipse_jlink.md)
- [Visual Studio Code IDE (VSCode)](../dev_setup/vscode.md)
- [SWD GDB Hardware Debugging](../debug/swd_gdb.md)
