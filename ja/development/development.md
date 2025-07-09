---
canonicalUrl: https://docs.px4.io/main/ja/development/development
---

# PX4 Development

このセクションでは、新しい機体のサポート方法、飛行アルゴリズムの改造，飛行モードの追加、新しいハードウェアへの統合、フライトコントローラ外部との通信について記述しています．

:::tip
This section is for software developers and (new) hardware integrators.
既存の機体を構築する場合や、PX4の機体を使用して飛行する場合は不要です。
:::

以下の方法を説明します。

* [最小の開発者設定](../dev_setup/config_initial.md)を取得し、[ソースからPX4をビルドして](../dev_setup/building_px4.md) 、[サポートされた数多くの自動操縦装置](../flight_controller/README.md) にデプロイする。
* [PX4システムアーキテクチャ](../concept/architecture.md) およびその他のコアコンセプトを理解する。
* フライトスタックとミドルウェアを変更する方法を学ぶ：
  - フライトアルゴリズムを変更し、新しい [フライトモード](../concept/flight_modes.md)を追加します。
  - 新しい [機体](../dev_airframes/README.md)をサポートする。
* PX4と新しいハードウェアを統合する方法を学ぶ：
  - カメラ、レンジファインダーなどの新しいセンサーやアクチュエータをサポートする。
  - PX4を新しいハードウェアで実行するように変更する。
* PX4の[シミュレーション](../simulation/README.md)、[テスト](../test_and_ci/README.md)、[デバッグ/ログ](../debug/README.md)
* 外部ロボティクスAPIとの通信/統合


## 主要な開発者リンク

- [サポート](../contribute/support.md): [掲示板](https://discuss.px4.io//) およびその他のサポートチャネルを使用してヘルプを得る。
- [毎週の開発コール](../contribute/dev_call.md)：PX4開発チームに会い、プラットフォームの技術的な詳細（プルリクエスト、主要な問題、一般的なQ&Aなど）について話し合う機会です。
- [ライセンス](../contribute/licenses.md): ソースコードの2次利用 ( [BSD 3節ライセンス](https://opensource.org/licenses/BSD-3-Clause) の条件の下で自由に使用し、変更することができます!)
- [貢献](../contribute/README.md): [ソースコード](../contribute/code.md) の使い方。
