# 基本コンセプト

本章では，ドローンの簡単な解説と，PX4の使い方について説明します。(初心者向けの内容ですが，熟練者にも良い紹介になると思われます)。

もし，すでに基本コンセプトについてご存知であれば，[基本構成](../assembly/README.md)にジャンプし，オートパイロット用機器の接続方法について学ぶことができます。 *QGroundControl*を用いてファームウェアを書き込んだり，機体のセットアップを行うには，[Basic Configuration](../config/README.md)を参照してください。

## ドローンってなに？

ドローンは遠隔操縦または自律操縦可能な無人の”ロボット型”移動体です。

ドローンは産業用や軍用等，[様々な用途で](http://px4.io/applications/)多くの人に利用されています。 その活用例としては以下などがあります。(もちろん，これに限られません): 空撮．運送，レース，探査，調査等

> **Tip** ドローンには空，水上，海中用のものがあります。 これらは (より正確に言うと) Unmanned Aerial Vehicles (UAV), Unmanned Aerial Systems (UAS), Unmanned Ground Vehicles (UGV), Unmanned Surface Vehicles (USV), Unmanned Underwater Vehicles (UUV) などと呼ばれます。

ドローンの"頭脳"はオートパイロットと呼ばれます。 オートパイロットは *ビークルコントローラ* ("フライトコントローラ") と呼ばれるハードウェアと，そのうえで走る*フライトスタック* というソフトウェアで構成されています。

## PX4 オートパイロット {#autopilot}

[PX4](http://px4.io/) は強力なオープンソースのオートパイロット用 *フライトスタック*です。

PX4の主な特徴は以下の通りです:

- [様々な構造/タイプの機体](../airframes/airframe_reference.md)を制御することができます。例: 航空機 (マルチコプター, 固定翼機，VTOL機), 地上走行型ロボット，水中ドローン。 
- [ビークルコントローラ](#vehicle_controller)，センサー，周辺機器には，様々な選択肢があります。
- 柔軟かつパワフルな [フライトモード](#flight_modes) と [安全機能](#safety)。

PX4は地上局ソフト [QGroundControl](#qgc) や，[Pixhawk ハードウェア](https://pixhawk.org/)，機載PCやカメラ等の周辺機器とのMAVLink通信に用いられる[MAVSDK](http://mavsdk.mavlink.io) などの幅広いドローン用プラットフォームのコアとなります。 PX4は[Dronecode プロジェクト](https://www.dronecode.org/)によってサポートされています。

## QGroundControl {#qgc}

ドローンコードにおける地上局ソフトは [QGroundControl](http://qgroundcontrol.com/)と呼ばれています。 *QGroundControl* を用いることで，[コントローラ用ハードウェア](flight_controller_selection.md)にPX4のソフトウェアを書き込んだり，機体のセットアップ，パラメータの設定，リアルタイムでの機体情報取得，自動操縦の経路設定・実行などができます。

*QGroundControl* は，Windows・Android・MacOS・Linuxで動作します。 ダウンロード・インストールは [こちら](http://qgroundcontrol.com/downloads/)から。

![QGCメインスクリーン](../../images/qgc_main_screen.jpg)

## 機体コントローラ {#vehicle_controller}

PX4 は元々[Pixhawk シリーズ](../flight_controller/pixhawk_series.md) で動作するよう設計されていましたが, 現在ではLinuxコンピュータをはじめ，様々なハードウェアで動作可能です。 機体の物理的制約や，実現したい機能，そしてもちろんコストを考慮して，適切なハードウェアを選定してください。

より詳しい情報は以下を参照してください。: [コントローラの選択](flight_controller_selection.md).

## センサー

PX4 は機体の状態推定を行うために複数のセンサーを使用しています (安定化や，自動制御を行うために必要です)。 システムは *最低限* ジャイロセンサー，加速度センサー，磁気センサー (コンパス) ，気圧計を必要とします。 GPSやその他の測位システムは自動航行用の[モード](../getting_started/flight_modes.md#categories)を適用する場合や，各種操縦補助モードを適用する場合に必要です。 さらに，固定翼機やVTOL機では，大気速度センサーを使用するべきです (強く推奨します)。

詳細は以下を参照ください：

- [センサー](../getting_started/sensor_selection.md) 
- [周辺機器](../peripherals/README.md)

## ESC & モータ

多くのPX4ドローンでは，Electronic Speed Controller (ESC) によって駆動される，ブラシレスモータを使用します。 (ESCはフライトコントローラからの信号を受けて，モータへ供給する動力を適切に制御します)。

PX4によってサポートされているESC/モータについて，詳しくは以下をご参照ください：

- [ESC & モータ](../peripherals/esc_motors.md)
- [ESCキャリブレーション](../advanced_config/esc_calibration.md)
- [ESC ファームウェアとプロトコルの概要](https://oscarliang.com/esc-firmware-protocols/) (oscarliang.com)

## バッテリー/動力源

PX4ドローンの多くはリチウムポリマー(LiPo) バッテリーによって駆動されています。 バッテリーは多くの場合， *パワーモジュール* や *パワーマネージメント基板*を介してシステムに接続され，これらからフライトコントローラやESCへの電源供給が行われます。

バッテリーおよびバッテリーに関する設定については [バッテリー設定](../config/battery.md)および [基本構成](../assembly/README.md) に記載されています。(例： [Pixhawk 4 簡易設定 > 電源](../assembly/quick_start_pixhawk4.md#power)).

## 無線操縦 (RC) {#rc_systems}

[無線操縦 \(RC\)](../getting_started/rc_transmitter_receiver.md) システムは *手動で* 機体を制御するために使用します。 無線操縦システムはスティックやスイッチの情報を送る送信機と，機体に取り付けられた受信機によって構成されます。 一部の無線操縦システムでは，オートパイロットからのテレメトリー情報を受信することもできます。

> **Note** PX4 は自動操縦モードでは無線操縦システムを必要としません。

![Taranis X9D Transmitter](../../assets/hardware/transmitters/frsky_taranis_x9d_transmitter.jpg)

[RCシステムの選択](../getting_started/rc_transmitter_receiver.md) ではどのように無線操縦システムの選択方法について説明しています。 その他，以下の関連コンテンツがあります。

- [無線/遠隔操縦のセットアップ](../config/radio.md) - *QGroundControl*を用いた遠隔操縦システムの設定について
- [Flying 101](../flying/basic_flying.md) - 遠隔操縦を使用しての飛行方法。
- [FrSky テレメトリー](../peripherals/frsky_telemetry.md) - RC送信機を用いたPX4からのテレメトリー・ステータス情報の受信設定方法。

## セーフティスイッチ {#safety_switch}

[アーミング](#arming) (アーミングを行うと，ロータが回転し始めます) を行う前に押さなければならない*セーフティスイッチ* を設けることが一般的です。 多くの場合，セーフティスイッチはGPSユニットに統合されていますが，別々のコンポーネントになっていることもあります。

> **Note** アーミングされた機体は危険です。 そのため，不意にアーミングされてしまうことがないよう，セーフティスイッチが設けられています。

## データ/テレメトリー 無線

[データ/テレメトリー無線](../telemetry/README.md) を用いると，*QGroundControl* などの地上局と，PX4が動作している機体の間でMAVLinkを用いた無線通信が可能となります。 これによって，フライト中にパラメータのチューニングを行ったり，リアルタイムでの機体状態の確認，ミッションの変更などが可能になります。

## オフボード/コンパニオン コンピュータ

PX4 は，機載のコンピュータからシリアル通信やwifi通信を介して制御することが可能です。 機載コンピュータは通常，MAVSDKやMAVROSといったMAVLink APIを用いて通信を行います。

> **Note** ロボティクスAPIを使用するにはソフトウェア開発に関するスキルが必要です。本スキルについては本ガイドの対象外です。

- [オフボードモード](../flight_modes/offboard.md) - 地上局(GCS) や機載コンピュータからPX4を用いて飛行を行うためのモード。 
- [Robotics APIs](https://dev.px4.io/master/en/robotics/) (PX4 Developer Guide)

## 取り外し可能メモリー/ロギング

PX4 は[flight logs](../getting_started/flight_reporting.md) の保存にSDカードを使用します(一部のフライトコントローラでは，SDカードの使用が不可能な場合があります)。

> **Tip** Pixhawk でサポートされているSDカードの容量は最大 32GBです。

推奨SDカードの一覧は以下にあります: [Developer Guide > ロギング](http://dev.px4.io/en/log/logging.html#sd-cards)

## Arming and Disarming {#arming}

機体は多くの可動部を持っており，その一部(特にモータやプロペラ) は潜在的な危険性を持っています。

To reduce the chance of accidents:

- PX4 vehicles are *disarmed* (unpowered) when not in use, and must be explicitly *armed* before taking off.
- Some vehicles additionally require a [safety switch](../getting_started/px4_basic_concepts.md#safety_switch) be disengaged before arming can succeed.
- Arming is prevented if the vehicle is not in a "healthy" state.
- A vehicle will also usually revert to the disarmed state after landing or if a pilot does not take off quickly enough.

Arming is triggered by default (Mode 2 transmitters) by holding the RC throttle/yaw stick on the *bottom right* for one second (to disarm, hold stick on bottom left). It is also possible to configure PX4 to arm using an RC button on the RC control (and arming commands can be sent from a ground station).

A detailed overview of arming and arming configuration can be found here: [Prearm, Arm, Disarm Configuration](../advanced_config/prearm_arm_disarm.md).

## フライトモード {#flight_modes}

必要な自動操縦のタイプや，ユーザ(操縦者) のレベルに応じて，様々なフライトモードの選択が可能です。 *Autonomousモード* ではオートパイロットによって完全に制御が行われ，パイロットからの遠隔操縦は不要です。 これらは，例えば離陸やホームポジションへの帰還，着陸などの共通タスクを自動化するために使用されます。 他のautonomousモードは，GPS位置情報を用いた設定経路の自動飛行や，オフボードコンピュータ/地上局からの命令 にそった飛行などが可能です。

*Manual モード* はオートパイロットからの補助を利用しつつ，(RCシステムやジョイスティックを介した) ユーザからの指令で操縦する場合に使用されます。 適切なマニュアルモードを選択することで，目的に沿った飛行特性を実現することができます。例えば，一部のモードでは宙返りなどのアクロバティックな動作が可能な一方で，他のモードでは風に対して自動で位置/飛行コースの保持が可能であったりします。

> **Tip** Not all flight modes are available on all vehicle types, and some modes can only be used when specific conditions have been met (e.g. many modes require a global position estimate).

フライトモードの概要については[こちら](../getting_started/flight_modes.md)をご参照ください。 無線操縦のスイッチを用いたフライトモードの切り替え方法については [Flight Mode Configuration](../config/flight_mode.md)に記載があります。

## セーフティ設定 (フェイルセーフ) {#safety}

PX4では機体に問題が発生した際に，不具合からシステムを保護・回復するためのフェールセーフシステムを設定可能です。 安全に飛行可能なエリアや条件を設定し，もし当該条件から外れるイベントが発生した場合，フェールセーフアクション(例：着陸・一時停止・設定箇所への帰還) がトリガーされます。

> **Note** You can only specify the action for the *first* failsafe event. Once a failsafe occurs the system will enter special handling code, such that subsequent failsafe triggers are managed by separate system level and vehicle specific code.

主なフェイルセーフ項目は以下の通りです。:

- バッテリー残量低下
- 無線通信 (RC) ロスト
- 位置情報ロスト (自己位置推定精度の低下)
- オフボード通信のロスト (例： 機載コンピュータからの通信ロスト)
- データリンクのロスト (例： GCSとのテレメトリー通信ロスト).
- ジオフェンス逸脱(円柱状のエリアに飛行範囲を制限します)
- ミッションフェイルセーフ (前回設定した自動飛行経路が，新しい環境で実行されるのを防ぎます) 。
- 航空機回避 (ADSB等のトランスポンダからのデータを受けて起動されます) 。

より詳しくは，以下を参照してください: [セーフティ](../config/safety.md) (基本設定).

## 機首と方位

すべての機体，ボート，飛行機には機種方位または，前進方向として定められた向きがあります。

![Frame Heading](../../images/frame_heading.png)

オートパイロットの向きを機体の運動方向と一致させるために，機体の機首方向を把握することは重要です。 マルチコプターもすべての方向に対称的な構造をしていますが，機首方向を持っています。 通常，色付きのプロペラや，色付きのアームで機首方向は表示されています。

![Frame Heading TOP](../../images/frame_heading_top.png)

本ドキュメント中の図では，赤色のプロペラが機体の機首方向を示します。

機首についての詳細は， [フライトコントローラの方向](../config/flight_controller_orientation.md)で記述しています。