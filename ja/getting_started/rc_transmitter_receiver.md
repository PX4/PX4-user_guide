---
canonicalUrl: https://docs.px4.io/main/ja/getting_started/rc_transmitter_receiver
---

# 無線操縦システム

無線操縦 (RC) システムは，*マニュアルで* 機体を手持ちの送信機から操縦する場合に必要です。 本章では，無線操縦システムについての概要と，選定の仕方，接続の仕方について解説します。

:::tip PX4 does not require a remote control system for autonomous flight modes. You can disable RC checks by [setting parameter](../advanced_config/parameters.md): [COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) to 1.
:::

## RCシステムはどのように動作するのか?

An *RC system* has a ground-based *remote control unit* that is used by the operator to command the vehicle. The remote has physical controls that can be used to specify vehicle movement (e.g. speed, direction, throttle, yaw, pitch, roll, etc.) and to enable autopilot [flight modes](../flight_modes/README.md) (e.g. takeoff, land, return to land, mission etc.). On *telemetry-enabled* RC systems, the remote control unit can also receive and display information from the vehicle (e.g. battery level, flight mode).

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

The remote control unit contains a radio module that is bound to, and communicates with, a (compatible) radio module on the vehicle. The vehicle-based unit is connected to the flight controller. The flight controller determines how to interpret the commands based on the current autopilot flight mode and vehicle state, and drives the vehicle motors and actuators appropriately.

<!-- image showing the different parts here would be nice -->

:::note
The ground- and vehicle- based radio modules are referred to as the transmitter and receiver respectively (even if they support bidirectional communication) and are collectively referred to as a *transmitter/receiver pair*. The remote control unit and it's included radio module are also referred to as a "transmitter".
:::

An important quality of an RC system is how many "channels" it supports. The number of channels defines how many different physical controls on the remote control can be used to send commands to the vehicle (e.g. how many switches, dials, control sticks can actually be used).

An aircraft must use a system that supports at least 4 channels (for roll, pitch, yaw, thrust). Ground vehicles need at least two channels (steering + throttle). An 8 or 16 channel transmitter provides additional channels that can be used to control other mechanisms or activate different [flight modes](../flight_modes/README.md) provided by the autopilot.

## RCシステムの種別

<span id="transmitter_modes"></span>

### Remote Control Units for Aircraft

The most popular *form* of remote control unit for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (i.e. aircraft need at least 4 channels).

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

There are numerous possible layouts for the control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

:::note
The choice of mode is largely one of taste (*Mode 2* is more popular).
:::

## 地上機用RCシステム

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## RCシステムコンポーネントの選択

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### 送受信機ペア

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

:::note
This remote control unit can display vehicle telemetry when used with [FrSky](../peripherals/frsky_telemetry.md) radio modules.
:::

Other popular transmitter/receiver pairs

* FrSky送受信機を用いた，Turnigyシステム
* Futaba社製送信機と，S-Bus互換受信機
* 900MHz帯を用いた長距離・低遅延システム："Team Black Sheep Crossfire" や "Crossfire Micro" セットを互換送信機 (例：Taranis) と組み合わせたもの。
* 433MHz帯を用いた長距離システム： ImmersionRC EzUHF セットを互換送信機(例：Taranis) と組み合わせたもの。

<span id="compatible_receivers"></span>

### PX4-Compatible Receivers

In addition to the transmitter/receiver pairs being compatible, the receiver must also be compatible with PX4 and the flight controller hardware.

*PX4* and *Pixhawk* have been validated with:

* すべてのSpektrum DSM RC 受信機
* すべてのFutaba社製 S.BUS および S.BUS2 RC 受信機
* すべてのFrSky社製 PPM および S.Bus 受信機
* Graupner HoTT
* すべてのPPM モデル

## 受信機の接続

As general guidance, receivers connect to the flight controller using the port appropriate to their supported protocol:

* Spektrum および DSM 受信機は **SPKT/DSM** 入力ポートに接続してください。
* Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
* PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
* PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

Instructions for connecting to specific flight controllers are given in the following quick-start guides:

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

:::tip
See the manufacturer's flight controller setup guide for additional information.
:::

<span id="binding"></span>

## Binding Transmitter/Receiver

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value (you can [configure PX4 to detect this](../config/radio.md#rc_loss_detection)).
* Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).

## Related Topics

* [Radio Control Setup](../config/radio.md) - Configuring your radio with PX4.
* [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.