---
canonicalUrl: https://docs.px4.io/main/zh/telemetry/README
---

# 数传电台模块

Telemetry Radios can (optionally) be used to provide a wireless MAVLink connection between a ground control station like *QGroundControl* and a vehicle running PX4. 这使得飞机飞行时调试、检查数传、更改任务等等成为了可能。

PX4支持多种类型数传电台：
* [SiK Radio](../telemetry/sik_radio.md) based firmware (more generally, any radio with a UART interface should work).
  * [RFD900 遥测无线电](../telemetry/rfd900_telemetry.md)
  * [HolyBro SiK Telemetry Radio](../telemetry/holybro_sik_radio.md)
  * <del>*HKPilot Telemetry Radio*</del> (Discontinued)
  * <del>*3DR Telemetry Radio*</del> (Discontinued)
* [WiFi 数传](../telemetry/telemetry_wifi.md)
* [Microhard Serial Telemetry Radio](../telemetry/microhard_serial.md)
  * [ARK Electron Microhard Serial Telemetry Radio](../telemetry/ark_microhard_serial.md)
  * [Holybro Microhard P900 Telemetry Radio](../telemetry/holybro_microhard_p900_radio.md)
* CUAV Serial Telemetry Radio
  * [CUAV P8 Telemetry Radio](../telemetry/cuav_p8_radio.md)
* XBee Serial Telemetry Radio
  * [HolyBro XBP9X Telemetry Radio](../telemetry/holybro_xbp9x_radio.md) (Discontinued)

PX4 协议兼容 [SiK 电台](../telemetry/sik_radio.md)，并且可以即插即用（尽管你可能需要使用适当的连接器）。

WIFI 数传通常具有更短的范围、更高的数据速率，并且可以更轻松地支持FPV/视频源。 Wifi电台的一个好处是, 您只需为您的车辆购买一个无线电设备（假设地面站已经有WIFI）。

:::note PX4 does not support connecting an LTE USB module to the flight controller (and sending MAVLink traffic via the Internet). You can however connect an LTE module to a companion computer and use it to route MAVLink traffic from the flight controller. For more information see: [Companion Computer Peripherals > Data Telephony](../companion_computer/companion_computer_peripherals.md#data-telephony-lte).
:::

## Allowed Frequency Bands

Radio bands allowed for use with drones differ between continents, regions, countries, and even states. You should select a telemetry radio that uses a frequency range that is allowed in the areas where you plan on using the drone.

Low power [SiK radios](../telemetry/sik_radio.md), such as the [Holybro Telemetry Radio](../telemetry/holybro_sik_radio.md), are often available in 915 MHz and 433 MHz variants. While you should check applicable laws in your country/state, broadly speaking 915 MHz can be used in the US, while 433 MHz can be used in EU, Africa, Oceania, and most of Asia.
