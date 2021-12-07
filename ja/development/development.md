# PX4 Development

このセクションでは、新しい機体のサポート方法、飛行アルゴリズムの改造，飛行モードの追加、新しいハードウェアへの統合、フライトコントローラ外部との通信について記述しています．

::: tip
このセクションは、ソフトウェア開発者とハードウェアインテグレータ向けのセクションです。 既存の機体を構築する場合や、PX4の機体を使用して飛行する場合は不要です。
:::

以下の方法を説明します。

* Get a [minimum developer setup](../dev_setup/config_initial.md), [build PX4 from source](../dev_setup/building_px4.md) and deploy on [numerous supported autopilots](../flight_controller/README.md).
* Understand the [PX4 System Architecture](../concept/architecture.md) and other core concepts.
* Learn how to modify the flight stack and middleware:
  - Modify flight algorithms and add new [flight modes](../concept/flight_modes.md).
  - Support new [airframes](../dev_airframes/README.md).
* Learn how to integrate PX4 with new hardware:
  - Support new sensors and actuators, including cameras, rangefinders, etc.
  - Modify PX4 to run on new autopilot hardware.
* [Simulate](../simulation/README.md), [test](../test_and_ci/README.md) and [debug/log](../debug/README.md) PX4.
* Communicate/integrate with external robotics APIs.


## Key Developer Links

- [Support](../contribute/support.md): Get help using the [discussion boards](https://discuss.px4.io//) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/README.md): How to work with our [source code](../contribute/code.md).
