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

### 飛行体用RCシステム {#transmitter_modes}

UAV用の最も一般的なRCシステムの *形態* は以下の通りです。 このようなシステムでは，それぞれ独立したコントロール用スティックを持っており，それぞれ，ロール・ピッチ，スロットル・ヨーに割り当てられます(言い換えると，飛行体は4チャンネル以上を必要とします)。

![RC Basic Commands](../../assets/flying/rc_basic_commands.png)

コントロールスティックやスイッチなどの割り当てには，限りなくいくつものパターンが存在します。 中でも一般的ないくつかのレイアウトには，"モード"と呼ばれる番号が割り当てられています。 *モード 1* と *モード 2* (以下参照) はスロットルの配置が違うのみです。

![Mode1-Mode2](../../assets/concepts/mode1_mode2.png)

> **Note** モードの選択は好みで選択されます。 (*モード 2* がより一般的です)。

## 地上機用RCシステム

地上機 (Unmanned Ground Vehicle, UGV) では，ステアリング指令と速度指令を送信するため，送信機には2チャンネル以上のチャンネルが必要です。 一般的には，ホイールとトリガーを持った送信機や，2つの1軸型のスティックを持った送信機，1つの2軸型のスティックを持った送信機などが用いられます。

もちろん，もっと多くのチャンネル・制御機構を持った送信機を用いることで，追加のアクチュエータを動かしたり，オートパイロットのモード切替などを容易にすることができます。

## RCシステムコンポーネントの選択

まず，送信機と受信機は互いに互換性のあるものを選択しなくてはいけません。 さらに受信機は [PX4互換](#compatible_receivers)であり，フライトコントローラと接続可能でなくてはいけません。

互換性を持ったRCシステムはたいていセットで販売されています。 たとえば，,[FrSky Taranis X9D と FrSky X8R](https://hobbyking.com/en_us/frsky-2-4ghz-accst-taranis-x9d-plus-and-x8r-combo-digital-telemetry-radio-system-mode-2.html?___store=en_us) は一般的な組み合わせです。

### 送受信機ペア

最も一般的なRCユニットのひとつは*FrSky Taranis X9D*です。 本ユニットでは， *FrSky X4R-SB* (S-BUS, 低遅延) や *X4R* (PPM-Sum, 従来一般的であった形式) 受信機と通信可能な送信モジュールが同梱されています。 また，カスタム送信モジュール用スロットもあり，改造可能なオープンソースのOpenTXファームウェアによって動作可能です。

> **Note** 本ユニットでは，[FrSky](../peripherals/frsky_telemetry.md) モジュールと組み合わせることで，機体のテレメトリ情報を表示することも可能です。

その他の一般的なRC送受信機の組み合わせは以下の通りです。

* FrSky送受信機を用いた，Turnigyシステム
* Futaba社製送信機と，S-Bus互換受信機
* 900MHz帯を用いた長距離・低遅延システム："Team Black Sheep Crossfire" や "Crossfire Micro" セットを互換送信機 (例：Taranis) と組み合わせたもの。
* 433MHz帯を用いた長距離システム： ImmersionRC EzUHF セットを互換送信機(例：Taranis) と組み合わせたもの。

### PX4互換受信機 {#compatible_receivers}

送信機と互換性があるだけでなく，受信機はPX4およびフライトコントローラ用ハードウェアと互換性を持つ必要があります。

*PX4* と *Pixhawk* は以下のシステムで動作が検証されています:

* すべてのSpektrum DSM RC 受信機
* すべてのFutaba社製 S.BUS および S.BUS2 RC 受信機
* すべてのFrSky社製 PPM および S.Bus 受信機
* Graupner HoTT
* すべてのPPM モデル

## 受信機の接続

一般的な説明として，受信機はそのプロトコルに応じて，フライトコントローラの適切なポートに接続する必要があります:

* Spektrum および DSM 受信機は **SPKT/DSM** 入力ポートに接続してください。
* Graupner HoTT receivers: SUMD output must connect to a **SPKT/DSM** input.
* PPM-Sum and S.BUS receivers must connect directly to the **RC** ground, power and signal pins (typically labeled RC or RCIN)
* PPM receivers that have an individual wire for each channel must connect to the RCIN channel *via* a PPM encoder [like this one](http://www.getfpv.com/radios/radio-accessories/holybro-ppm-encoder-module.html) (PPM-Sum receivers use a single signal wire for all channels).

いくつかのフライトコントローラへの接続例は，以下のクイックスタートガイドにて参照可能です:

* [Pixhawk 1](../assembly/quick_start_pixhawk.md#radio-control)
* [Pixracer](../assembly/quick_start_pixracer.md)
* [Pixhawk 4](../assembly/quick_start_pixhawk4.md)

> **Tip** より詳しい情報は，フライトコントローラの製造者のマニュアルを参照してください。

## 送受信機のバインド {#binding}

RCシステムをキャリブレーション/使用する前に，送受信機をお互いに認識させるため， *バインド* を行う必要があります。 バインドを行う手順はハードウェアによって異なります(ハードウェアのマニュアルを参照してください) 。

もし *Spektrum* 受信機を使用している場合，*QGroundControl*を用いて，バインドモードに移行することが可能です。: [Radio Setup > Spectrum Bind](../config/radio.md#spektrum_bind).

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