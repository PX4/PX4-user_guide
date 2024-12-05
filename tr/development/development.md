# PX4 Geliştime

Bu bölümde, yeni araç türlerinin ve varyantlarının nasıl destekleneceği, uçuş algoritmalarının nasıl değiştirileceği, yeni modların nasıl ekleneceği, yeni donanımın nasıl entegre edileceği ve uçuş kontrolcüsünün dışından PX4 ile nasıl iletişim kurulacağı açıklanmaktadır.

:::tip
This section is for software developers and (new) hardware integrators.
Mevcut donanımlarla çalışıp PX4'ü sadece uçuş için kullanmak istiyorsanız bu bölümü incelemenize gerek yoktur.
:::

Bu rehber ile birlikte:

- Get a [minimum developer setup](../dev_setup/config_initial.md), [build PX4 from source](../dev_setup/building_px4.md) and deploy on [numerous supported autopilots](../flight_controller/index.md).
- Understand the [PX4 System Architecture](../concept/architecture.md) and other core concepts.
- Flight stack ve middleware üzerinde değişiklikleri nasıl yapabileceğinizi öğreneceksiniz:
  - Modify flight algorithms and add new [flight modes](../concept/flight_modes.md).
  - Support new [airframes](../dev_airframes/index.md).
- PX4'ü yeni bir donanım ile nasıl entegre edebileceğinizi göreceksiniz.
  - Yeni sensörler ve aktüatörleri entegre etme.
  - PX4'ün yeni bir otopilot donanımında çalışmasını sağlama
- [Simulate](../simulation/index.md), [test](../test_and_ci/index.md) and [debug/log](../debug/index.md) PX4.
- Dilediğiniz harici Robotik API'ı entegre edebileceksiniz.

## Geliştiriciler için bazı ana linkler

- [Support](../contribute/support.md): Get help using the [discussion boards](https://discuss.px4.io//) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/index.md): How to work with our [source code](../contribute/code.md).
