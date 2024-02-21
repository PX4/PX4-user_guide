# İlk Kurulum & Yapılandırma

Geliştiricilerin aşağıda açıklanan temel ekipmanları (veya benzerlerini) edinmelerini de "varsayılan" [gövde](../airframes/airframe_reference.md) konfigürasyonlarını tercih etmelerini öneririz.

## Temel Ekipman:

:::tip
PX4 burada bahsedilenlerden çok daha geniş bir ekipman setiyle de kullanılabilir ancak yeni geliştiricilerin standart kurulumlardan faydalanmaları daha kullanışlı olacaktır.
A Taranis RC + Note 4 tablet kullanarak cebinizi yakmayan oldukça ucuz bir kit oluşturabilirsiniz.
:::

Tavsiye edilen ekipmanlar:

- **Remote control** for the safety pilot
  - Taranis Plus remote control (or equivalent)
- **Development computer**
  - MacBook Pro (2015 ve sonraki modellerinden) - OSX 10.15 veya sonraki bir sürümü yüklü
  - Lenovo Thinkpad 450 (i5) - Ubuntu Linux 18.04 veya sonraki bir sürümü yüklü
- **Ground control station** (computer or tablet):
  - iPad (Wifi telemetri adaptörü gerektirir)
  - Herhangi bir MacBook veya Ubuntu Linux dizüstü bilgisayar (geliştirme bilgisayarı da kullanılabilir)
  - Samsung Note 4 or equivalent (any recent Android tablet or phone with a large enough screen to run _QGroundControl_ effectively).
- **Vehicle capable of running PX4**:
  - [Get a prebuilt vehicle](../complete_vehicles_mc/README.md)
  - [Build your own](../airframes/README.md)
- **Safety glasses**
- **Tether** (multicopter only - for more risky tests)

## Araç Yapılandırması

Install the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html) for a **desktop OS**.

Aracı yapılandırmak için:

1. [Install PX4 firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (including "custom" firmware with your own changes).
1. [Temel Yapılandırma](../config/README.md) bölümünden temel konfigurasyonun nasıl yapılacağına dair açıklamalara ulaşabilirsiniz.
1. [Parametre Konfigürasyonu](../advanced_config/parameters.md) bölümünden parametreleri nasıl bulup özelleştirebileceğinize bakabilirsiniz.
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

:::note

- _QGroundControl_ mobile variants do not support vehicle configuration.
- The _daily build_ includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".

:::
