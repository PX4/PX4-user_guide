---
canonicalUrl: https://docs.px4.io/main/ja/README
---

<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4オートパイロット　ユーザーガイド

[![Releases](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 is the _Professional Autopilot_. 世界中の産業界・アカデミアの開発者によって開発され，世界中のコミュニティによってサポートされており，レーシング用ドローンや運送用ドローンのみならず地上から潜水艇まで，様々なビークルに用いることができます．

このガイドはPX4を搭載する機体を組立て、パラメタを調し、安全に飛ばすために必要な全てのことを含んでいます。 貢献することに興味がありますか？ [開発](development/development.md) セクションを確認してください。 :::

## なにから始めればいいの？

[はじめに](getting_started/README.md) はすべてのユーザーが読むべきです！ 本章は，様々な機能(フライトモードや安全機能) や利用可能なハードウェア(フライトコントローラ，機体，テレメトリーシステム，無線機) など，PX4の概要について説明しています。

貴方の行いたいことに応じて、以下のヒントがこの解説書を探索するのに役に立ちます。

**既にドローンを持っていて，すぐ飛ばしたい：**

PX4をサポートしている，Ready To Fly (RTF) の機体を持っている：

- [基本設定](config/README.md) では，ファームウェアを最新版に更新する方法、主要センサー (コンパス, ジャイロ / IMU, 対気速度計 etc.) のキャリブレーション及びRC機器や安全機能のセットアップについて説明しています．
- [フライト](flying/README.md) では安全に飛行させる方法や，起動・フライト中に発生した問題への対処方法など，飛行に欠かせない事項について説明しています． また，フライトモードの詳細についても解説しています．

**PX4を使用してドローンを最初から作成したい：**

:::tip

The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using _QGroundControl_.

:::

機体を一から手作りしたい：

- フレームの選択 - [機体の組み立て](airframes/README.md) にはサポートされている機体が列挙されています。更に機体を組み立てるための詳細な情報が提供されています．
- フライトコントローラの選択 - [さあ、はじめよう > フライトコントローラ](getting_started/flight_controller_selection.md) と [オートパイロット用ハードウェア](flight_controller/README.md)を参照してください。
- [組み立て](assembly/README.md) では，重要な周辺機器をオートパイロット用機器にどのように接続するか説明しています．
- [基本設定](config/README.md) では，ファームフェアのアップデート方法と，機体に応じた設定方法について説明しています。 また，本章ではメインセンサー (コンパス, ジャイロ/IMU, 機速計等) のキャリブレーション、RC装置や安全機能のセットアップについても説明しています。

飛行させる準備が完了したら、 [フライト](flying/README.md) 章を参照してください。

**ペイロードまたはカメラを追加したい：**

ペイロードセクションでは、カメラを追加する方法、または貨物を配送するためのPX4の設定方法について説明します。

- [ペイロード](payloads/README.md) はペイロードを統合する方法を説明しています

**サポートされた機体を変更したい：**

フライトコントローラと基本的なセンサの変更については、上記のリンクで説明されています。 新しいセンサを使用したり，飛行特性に影響を与える変更をした場合，以下を参照してください:

- [周辺機器](peripherals/README.md) では外部センサを使用するための追加情報を記載しています。
- [基本構成](config/README.md) では、メインセンサーのキャリブレーション方法を説明します。
- [高度な設定](advanced_config/README.md) はより良い調整や微調整に役立ちます．

**PX4を新しいハードウェアで実行し、プラットフォームを拡張したい：**

- [開発](development/development.md) では新しい機体や車両の支援方法、フライトアルゴリズムの改造や，新しいモードの追加，新しいハードウェアの追加，PX4とフライトコントローラーの外部からの通信，さらにPX4の開発への貢献などについて記載しています．

## ヘルプ

[サポート](contribute/support.md) ページでは、コア開発チームとより広いコミュニティからヘルプを得る方法について説明します。

その他にも以下のものをカバーしています:

- [サポートフォーラム](contribute/support.md#forums-and-chat)
- [問題の診断](contribute/support.md#diagnosing-problems)
- [バグを報告する方法](contribute/support.md#issue-bug-reporting)
- [毎週の開発者コール](contribute/support.md#weekly-dev-call)

## バグと問題の報告

もしPX4に関して問題を発見した場合，まず [サポートフォーラム](contribute/support.md#forums-and-chat)に投稿してください (PX4の問題ではなく，機体の設定等が原因かもしれないため)．

そして，開発チームから指示があった場合， [Github](https://github.com/PX4/PX4-Autopilot/issues)にて，問題が報告されるかもしれません． 可能であれば、 [フライトログ](getting_started/flight_reporting.md)や テンプレートで要求された情報をアップロードしてください．

## 貢献

コードとドキュメントにどのように貢献するかについては、 [貢献](contribute/README.md)を参照してください。

- [Code](contribute/README.md)
- [ドキュメント](contribute/docs.md)
- [翻訳](contribute/translation.md)

## 翻訳

このガイドには [翻訳](contribute/translation.md) がいくつかあります。 言語メニューからアクセスできます(右上)。

![言語選択](../assets/vuepress/language_selector.png)

## ライセンス

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). このドキュメントは[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)ライセンスの元に管理されています． 詳細については以下を参照してください: [ライセンス](contribute/licenses.md)。

## カレンダー & イベント

The _Dronecode Calendar_ shows important community events for platform users and developers. タイムゾーンにカレンダーを表示するには、以下のリンクを選択してください (そして自分のカレンダーに追加するには):

- [スイス – チューリッヒ](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
- [太平洋時間 – ティフアナ](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
- [オーストラリア – メルボルン/シドニー/ホバート島](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
The calendar default timezone is Central European Time (CET).

:::

<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### アイコン

本ライブラリで使用されている，以下のアイコンはそれぞれ個別にライセンスされています (以下を参照)：

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> _placeholder_ icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> _camera-automatic-mode_ icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## 管理

PX4 flight stackは， [Dronecode Project](https://www.dronecode.org/)の管理の下でホストされています．

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
