<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="PX4 Logo" width="180px" /></a></div>

# PX4 Autopilot User Guide

[![Releases](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Discuss](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 is the _Professional Autopilot_. 世界中の産業界・アカデミアの開発者によって開発され，世界中のコミュニティによってサポートされており，レーシング用ドローンや運送用ドローンのみならず地上から潜水艇まで，様々なビークルに用いることができます．

このガイドはPX4を搭載する機体を組立て、パラメタを調し、安全に飛ばすために必要な全てのことを含んでいます。 貢献することに興味がありますか？ [開発](development/development.md) セクションを確認してください。

:::

:::warning
This guide is for the _development_ version of PX4 (`main` branch). Use the **Version** selector to find the current _stable_ version.

Documented changes since the stable release are captured in the evolving [release note](releases/main.md). :::

## なにから始めればいいの？

[Basic Concepts](getting_started/px4_basic_concepts.md) should be read by all users! It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicle types, telemetry systems, RC control systems).

貴方の行いたいことに応じて、以下のヒントがこの解説書を探索するのに役に立ちます。

### I want a vehicle that works with PX4

In the [Multicopter](frames_multicopter/index.md), [VTOL](frames_vtol/index.md), and [Plane (Fixed-Wing)](frames_plane/index.md) sections you'll find topics like the following (these links are for multicopter):

- [Complete Vehicles](complete_vehicles_mc/index.md) list "Ready to Fly" (RTF) pre-built vehicles
- [Kits](frames_multicopter/kits.md) lists drones that you have to build yourself from a set of preselected parts
- [DIY Builds](frames_multicopter/diy_builds.md) shows some examples of drones that have been built using parts that were sourced individually

Both kits and complete vehicles usually include everything you need except for a battery and RC System. Kits are usually not hard to build, provide a good introduction to how drones fit together, and are relatively inexpensive. We provide generic instructions for assembly, such as [Assembling a Multicopter](assembly/assembly_mc.md), and most kits come with specific instructions too.

If the kits and complete drones aren't quite right for you then you can build a vehicle from scratch, but this requires more knowledge. [Airframe Builds](airframes/index.md) lists the supported frame starting points to give you some idea of what is possible.

Once you have a vehicle that supports PX4 you will need to configure it and calibrate the sensors. Each vehicle type has its own configuration section that explains the main steps, such as [Multicopter Configuration/Tuning](config_mc/index.md).

### I want to add a payload/camera

The [Payloads](payloads/index.md) section describes how to add a camera and how to configure PX4 to enable you to deliver packages.

### I am modifying a supported vehicle

The [Hardware Selection & Setup](hardware/drone_parts.md) section provides both high level and product-specific information about hardware that you might use with PX4 and its configuration. This is the first place you should look if you want to modify a drone and add new components.

### I want to fly

Before you fly you should read [Operations](config/operations.md) to understand how to set up the safety features of your vehicle and the common behaviours of all frame types. Once you've done that you're ready to fly.

Basic instructions for flying each vehicle type are provided in the respective sections, such as [Basic Flying (Multicopter)](flying/basic_flying_mc.md).

### I want to run PX4 on a new Flight Controller and extend the platform

The [Development](development/development.md) section explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

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

- [Code](contribute/index.md)
- [ドキュメント](contribute/docs.md)
- [翻訳](contribute/translation.md)

## 翻訳

このガイドには [翻訳](contribute/translation.md) がいくつかあります。 言語メニューからアクセスできます(右上)。

![言語選択](../assets/vuepress/language_selector.png)

<!--@include: _contributors.md-->

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
