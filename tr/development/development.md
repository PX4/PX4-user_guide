# PX4 Geliştime

Bu bölümde, yeni araç türlerinin ve varyantlarının nasıl destekleneceği, uçuş algoritmalarının nasıl değiştirileceği, yeni modların nasıl ekleneceği, yeni donanımın nasıl entegre edileceği ve uçuş kontrolcüsünün dışından PX4 ile nasıl iletişim kurulacağı açıklanmaktadır.

::: tip
Bu bölüm, yazılım geliştiriciler ve (yeni) donanım entegre etmek isteyen mühendisler içindir. Mevcut donanımlarla çalışıp PX4'ü sadece uçuş için kullanmak istiyorsanız bu bölümü incelemenize gerek yoktur.
:::

Bu rehber ile birlikte:

* Çalıştığınız bilgisayar için [geliştirici ortamınızı](../dev_setup/config_initial.md) kurmayı, [ PX4'ü kaynak kodundan build etmeyi](../dev_setup/building_px4.md) ve  [desteklenen otopilotlar ](../flight_controller/README.md)  üzerinde uygulamayı öğreneceksiniz.
* [PX4 Sistem Mimarisini](../concept/architecture.md) ve diğer temel konseptleri anlayacaksınız.
* Flight stack ve middleware üzerinde değişiklikleri nasıl yapabileceğinizi öğreneceksiniz.
  - Uçuş algoritmalarını değiştirme ve yeni [uçuş modları](../concept/flight_modes.md) ekleme.
  - Yeni araç [gövdelerini](../dev_airframes/README.md) destekleme.
* PX4'ü yeni bir donanım ile nasıl entegre edebileceğinizi göreceksiniz.
  - Support new sensors and actuators, including cameras, rangefinders, etc.
  - Modify PX4 to run on new autopilot hardware.
* [Simulate](../simulation/README.md), [test](../test_and_ci/README.md) and [debug/log](../debug/README.md) PX4.
* Communicate/integrate with external robotics APIs.


## Key Developer Links

- [Support](contribute/support.md): Get help using the [discussion boards](http://discuss.px4.io/) and other support channels.
- [Weekly Dev Call](../contribute/dev_call.md): A great opportunity to meet the PX4 dev team and discuss platform technical details (including pull requests, major issues, general Q&A).
- [Licences](../contribute/licenses.md): What you can do with the code (free to use and modify under terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)!)
- [Contributing](../contribute/README.md): How to work with our [source code](../contribute/code.md).
