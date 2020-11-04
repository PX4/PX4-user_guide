<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4 Autopilot ユーザーガイド ({{ book.px4_version }})

[![Releases](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4 は *本格的なオートパイロットシステムです*. 世界中の産業界・アカデミアの開発者によって開発され，世界中のコミュニティによってサポートされており，レーシング用ドローンや運送用ドローンのみならず地上から潜水艇まで，様々なビークルに用いることができます．

> **Tip** 本ガイドはPX4を搭載した機体の組み立て・設定から安全な運用までに必要なすべての情報を含んでいます.

<span></span>

> **Note** 本ガイドはまだ作成途中です! そのため，PX4のすべてをまだカバーしていません．

## なにから始めればいいの？

[さあ、はじめよう](getting_started/README.md) はすべてのユーザーが読むべきです! 本章は，様々な機能(フライトモードや安全機能) や利用可能なハードウェア(フライトコントローラ，機体，テレメトリーシステム，無線機) など，PX4の概要について説明しています。

あなたが実現したいことに応じて，次の情報が本ガイドの活用に役立つと思われます:

**既にドローンを持っていて，すぐ飛ばしたいという方:**

PX4をサポートした，Ready To Fly (RTF) の機体を持っている:

- [基本設定](config/README.md) では，ファームウェアを最新版に更新する方法・メインセンサー (コンパス, ジャイロ/IMU, 機速計etc.) のキャリブレーション・RC装置や安全機能のセットアップについて説明しています．
- [フライト](flying/README.md) では安全に飛行させる方法や，起動・フライト中に発生した問題への対処方法など，飛行に欠かせない事項について説明しています． また，フライトモードに関する詳細についても解説しています．

**PX4準拠のドローンを手作りしたい方:**

> **Tip** "サポートされている" 機体のリストは [機体構造一覧](airframes/airframe_reference.md)にあります. これらの機体はテストされており，調整された設定値を*QGroundControl*を通して書き込むことができます.

機体を手作りしたい方:

- フレームの選択 - [機体の組み立て](airframes/README.md) では，すべてのサポートされているフレームが列挙されており，機体を構築するための詳細な情報が提供されています．
- フライトコントローラの選択 - [さあ、はじめよう > フライトコントローラ](getting_started/flight_controller_selection.md) と [オートパイロット用ハードウェア](flight_controller/README.md)を参照のこと．
- [基本構成](assembly/README.md) では，重要な周辺機器を，オートパイロット用機器にどのように接続するか，説明しています．
- [基本設定](config/README.md) では，ファームフェアのアップデート方法と，機体構造に応じた設定方法について説明しています． また，本章ではメインセンサー (コンパス, ジャイロ/IMU, 機速計etc.) のキャリブレーション・RC装置や安全機能のセットアップについても説明しています．

飛行させる準備が完了したら， [フライト](flying/README.md) 章を参照してください．

**標準機を改造する場合:**

フライトコントローラや，基本的なセンサの改造については上記の通りです． 新しいセンサを使用したり，飛行の特性に影響を与える改造をした場合，以下を参照してください:

- [周辺機器](peripherals/README.md) では，外部センサを使用するための追加情報を記載しています．
- [基本設定](config/README.md) ではメインセンサのキャリブレーションについて説明しています．
- [応用設定](advanced_config/README.md) はより良いチューニング・再チューニングに役立ちます．

**PX4を新しいハードウェアで動かしたり，プラットフォームを拡張したい方:**

- [PX4 Developer Guide](http://dev.px4.io/) ではフライトアルゴリズムの改造や，新しいモードの追加，新しいハードウェアの追加，PX4の外部からの通信，さらにPX4の開発への貢献などについて記述しています．

<span id="support"></span>

## Forums and Chat

The core development team and community are active on the following forums and chat channels:

- [PX4 Discuss](http://discuss.px4.io/) (*推奨*)
- [Slack](http://slack.px4.io) (sign up)

## バグ & 問題提起

If you have any problems using PX4 first post them on the [support channels above](#support) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## 貢献

Information on how to contribute to code and documentation can be found in the Developer Guide:

- [コード](https://dev.px4.io/master/en/contribute/)
- [ドキュメント](https://dev.px4.io/master/en/contribute/docs.html)
- [翻訳](https://dev.px4.io/master/en/contribute/docs.html)

## ライセンス

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [PX4 Development Guide > Licences](https://dev.px4.io/master/en/contribute/licenses.html).

### アイコン

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 管理

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
