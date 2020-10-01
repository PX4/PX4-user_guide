# 無線操縦システム

無線操縦 (RC) システムは，*マニュアルで* 機体を手持ちの送信機から操縦する場合に必要です。 本章では，無線操縦システムについての概要と，選定の仕方，接続の仕方について解説します。

> **Note** PX4 は自動操縦モードでは無線操縦システムを必要としません。 [パラメータの設定](../advanced_config/parameters.md)によって，RCの接続チェックを無効化することができます。: 無効化するには，[COM_RC_IN_MODE](../advanced_config/parameter_reference.md#COM_RC_IN_MODE) を 1にしてください。

## RCシステムはどのように動作するのか?

*RC システム* はオペレータによって操作される*リモートコントロールユニット* を持っています。 リモートコントロールユニットは機体の運動(例：速度・方位・スロットル・ロール・ピッチ・ヨー他)を指示したり，[フライトモード](../flight_modes/README.md) (例： takeoff, land, return to land, mission 他)を切り替えるための物理的インターフェースによって構成されています。 *テレメトリ対応*RCシステムでは，リモートコントロールユニットは機体の情報(例：バッテリー残量，フライトモード)を表示することができます。

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

リモートコントロールユニットは，機載の受信機と対をなし，通信を行います。 機載受信機は，フライトコントローラと接続されています。 フライトコントローラは機載受信機からの指令を受けて，オートパイロットのフライトモードや，機体の状態を考慮して，機体のモータやアクチュエータを適切に制御・駆動します。

<!-- image showing the different parts here would be nice -->

> **Note** 地上と機載のRCシステムはそれぞれ，(たとえ双方向通信であっても，) 送信機・受信機と呼ばれます。そして，総称して *送受信機*と呼ばれます。 リモートコントロールユニットは，その内部の無線モジュールも含めて，"送信機"と呼ばれます。

RCシステムの性能において，重要なのはいくつの"チャンネル"がサポートされているかです。 チャンネル数は何種類の送信機の物理的スイッチ情報を機体に送信できるかを決定します（スイッチ・ダイヤル・スティックの情報が，実際にどれだけ利用可能かを示します）。

飛行体においては、4チャンネル(ロール・ピッチ・ヨー・推力) 以上をサポートしているシステムが必要です。 地上を走行する機体の場合，2チャンネル(ステアリング・スロットル) 以上が必要です。 8チャンネルや16チャンネルなどをサポートしている送信機の場合，その他の機構の動作を行ったり，オートパイロットから提供される [フライトモード](../flight_modes/README.md) の切替が可能です。

## RCシステムの種別

<span id="transmitter_modes"></span>

### Remote Control Units for Aircraft

The most popular *form* of remote control unit for UAVs is shown below. It has separate control sticks for controlling roll/pitch and for throttle/yaw as shown (i.e. aircraft need at least 4 channels).

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

There are numerous possible layouts for the control sticks, switches, etc. The more common layouts have been given specific "Mode" numbers. *Mode 1* and *Mode 2* (shown below) differ only in the placement of the throttle.

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

> **Note** モードの選択は好みで選択されます。 (*モード 2* がより一般的です)。

## 地上機用RCシステム

An Unmanned Ground Vehicle (UGV)/car minimally requires a 2 channel transmitter in order to send the values for steering and speed. Commonly transmitters set these values using a wheel and trigger, two single-axis control sticks, or a single dual-axis control stick.

There is nothing to stop you using more channels/control mechanisms, and these can be very useful for engaging additional actuators and autopilot modes.

## RCシステムコンポーネントの選択

You will need to select a transmitter/receiver pair that are compatible with each other. In addition, receivers have to be be [compatible with PX4](#compatible_receivers) and the flight controller hardware.

Compatible radio systems are often sold together. For example, [FrSky Taranis X9D and FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) are a popular combination.

### 送受信機ペア

One of the most popular RC units is the *FrSky Taranis X9D*. It has an internal transmitter module can be used with the recommended *FrSky X4R-SB* (S-BUS, low delay) or *X4R* (PPM-Sum, legacy) receivers out of the box. It also has a custom radio transmitter module slot and customizable open source OpenTX Firmware.

> **Note** 本ユニットでは，[FrSky](../peripherals/frsky_telemetry.md) モジュールと組み合わせることで，機体のテレメトリ情報を表示することも可能です。

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

> **Tip** より詳しい情報は，フライトコントローラの製造者のマニュアルを参照してください。

<span id="binding"></span>

## Binding Transmitter/Receiver

Before you can calibrate/use a radio system you must *bind* the receiver and transmitter so that they communicate only with each other. The process for binding a transmitter and receiver pair is hardware specific (see your manual for instructions).

If you are using a *Spektrum* receiver, you can put it into bind mode using *QGroundControl*: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

## Set Signal-Loss Behaviour

RC receivers have different ways of indicating signal loss:

* Output nothing (automatically detected by PX4)
* Output a low throttle value value (you can [configure PX4 to detect this](../config/radio.md#rc_loss_detection)).
* Output the last received signal (PX4 cannot handle this case!)

Choose a receiver that can emit nothing (preferred) when RC is lost, or a low throttle value. This behaviour may require hardware configuration of the receiver (check the manual).

For more information see [Radio Control Setup > RC Loss Detection](../config/radio.md#rc_loss_detection).

## Related Topics

* [Radio Control Setup](../config/radio.md) - Configuring your radio with PX4.
* [Flying 101](../flying/basic_flying.md) - Learn how to fly with a remote control.