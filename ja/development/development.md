# PX4 Development

このセクションでは、新しい機体のサポート方法、飛行アルゴリズムの改造，飛行モードの追加、新しいハードウェアへの統合、フライトコントローラ外部との通信について記述しています．

:::tip
This section is for software developers and (new) hardware integrators.
既存の機体を構築する場合や、PX4の機体を使用して飛行する場合は不要です。
:::

以下の方法を説明します。

- Get a [minimum developer setup](../dev_setup/config_initial.md), [build PX4 from source](../dev_setup/building_px4.md) and deploy on [numerous supported autopilots](../flight_controller/index.md).
- Understand the [PX4 System Architecture](../concept/architecture.md) and other core concepts.
- フライトスタックとミドルウェアを変更する方法を学ぶ：
  - Modify flight algorithms and add new [flight modes](../concept/flight_modes.md).
  - Support new [airframes](../dev_airframes/index.md).
- PX4と新しいハードウェアを統合する方法を学ぶ：
  - カメラ、レンジファインダーなどの新しいセンサーやアクチュエータをサポートする。
  - PX4を新しいハードウェアで実行するように変更する。
- [Simulate](../simulation/index.md), [test](../test_and_ci/index.md) and [debug/log](../debug/index.md) PX4.
- 外部ロボティクスAPIとの通信/統合

## 主要な開発者リンク

- [Support](../contribute/support.md): Get help using the [discussion boards](https://discuss.px4.io//) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/index.md): How to work with our [source code](../contribute/code.md).
