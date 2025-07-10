---
canonicalUrl: https://docs.px4.io/main/tr/development/development
---

# PX4 Geliştime

Bu bölümde, yeni araç türlerinin ve varyantlarının nasıl destekleneceği, uçuş algoritmalarının nasıl değiştirileceği, yeni modların nasıl ekleneceği, yeni donanımın nasıl entegre edileceği ve uçuş kontrolcüsünün dışından PX4 ile nasıl iletişim kurulacağı açıklanmaktadır.

::: tip
Bu bölüm, yazılım geliştiriciler ve (yeni) donanım entegre etmek isteyen mühendisler içindir.
Mevcut donanımlarla çalışıp PX4'ü sadece uçuş için kullanmak istiyorsanız bu bölümü incelemenize gerek yoktur.
:::

Bu rehber ile birlikte:

* Çalıştığınız bilgisayar için [geliştirici ortamınızı](../dev_setup/config_initial.md) kurmayı, [ PX4'ü kaynak kodundan build etmeyi](../dev_setup/building_px4.md) ve  [desteklenen otopilotlar ](../flight_controller/README.md)  üzerinde uygulamayı öğreneceksiniz.
* [PX4 Sistem Mimarisini](../concept/architecture.md) ve diğer temel konseptleri anlayacaksınız.
* Flight stack ve middleware üzerinde değişiklikleri nasıl yapabileceğinizi öğreneceksiniz:
  - Uçuş algoritmalarını değiştirme ve yeni [uçuş modları](../concept/flight_modes.md) ekleme.
  - Yeni araç [gövdelerini](../dev_airframes/README.md) destekleme.
* PX4'ü yeni bir donanım ile nasıl entegre edebileceğinizi göreceksiniz.
  - Yeni sensörler ve aktüatörleri entegre etme.
  - PX4'ün yeni bir otopilot donanımında çalışmasını sağlama
* PX4'ü [simüle](../simulation/README.md) ve [test](../test_and_ci/README.md) edip [debug/log](../debug/README.md)'u öğreneceksiniz.
* Dilediğiniz harici Robotik API'ı entegre edebileceksiniz.


## Geliştiriciler için bazı ana linkler

- [Destek](contribute/support.md): [Tartışma panolarını](http://discuss.px4.io/) ve diğer destek kanallarını kullanarak yardım isteyebilirsiniz.
- [Haftalık geliştirici toplantıları](../contribute/dev_call.md): PX4 geliştirici takımıyla tanışıp teknik detayları (pull requestler, önemli sorunlar ve genel soru&cevap vb.) tartışabilirsiniz.
- [Lisanslar](../contribute/licenses.md): Kaynak kod ile yapabileceklerinizi öğrenmek için lisans ayrıntılarına bakabilirsiniz (ücretsiz kullanıp [BSD 3-clause lisansı](https://opensource.org/licenses/BSD-3-Clause) şartları altında değişiklik yapılabilir).
- [Katkıda Bulunma](../contribute/README.md): [Kaynak kodumuzla](../contribute/code.md) nasıl çalışabileceğinizi görebilirsiniz.
