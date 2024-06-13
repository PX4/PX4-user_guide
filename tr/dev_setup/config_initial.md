# İlk Kurulum & Yapılandırma

Geliştiricilerin aşağıda açıklanan temel ekipmanları (veya benzerlerini) edinmelerini de "varsayılan" [gövde](../airframes/airframe_reference.md) konfigürasyonlarını tercih etmelerini öneririz.

## Temel Ekipman:

:::tip
PX4 burada bahsedilenlerden çok daha geniş bir ekipman setiyle de kullanılabilir ancak yeni geliştiricilerin standart kurulumlardan faydalanmaları daha kullanışlı olacaktır.
A Taranis RC and a mid-range Android tablet make a very inexpensive field kit.
:::

Tavsiye edilen ekipmanlar:

- **RC controller** for the safety pilot
  - [Taranis Plus](https://www.frsky-rc.com/product/taranis-x9d-plus-2/) RC control (or equivalent)
- **Development computer**

  ::: info
The listed computers have acceptable performance, but a more recent and powerful computer is recommended.
:::

  - Lenovo Thinkpad with i5-core running Windows 11
  - MacBook Pro (early 2015 and later) with macOS 10.15 or later
  - Lenovo Thinkpad i5 with Ubuntu Linux 20.04 or later

- **Ground control station** (computer or tablet):
  - iPad (may require Wifi telemetry adapter)
  - Herhangi bir MacBook veya Ubuntu Linux dizüstü bilgisayar (geliştirme bilgisayarı da kullanılabilir)
  - A recent mid-range Android tablet or phone with a large enough screen to run _QGroundControl_ effectively (6 inches).
- **Vehicle capable of running PX4**:
  - [Get a prebuilt vehicle](../complete_vehicles_mc/index.md)
  - [Build your own](../frames_multicopter/kits.md)
- **Safety glasses**
- **Tether** (multicopter only - for more risky tests)

## Araç Yapılandırması

Install the [QGroundControl Daily Build](../dev_setup/qgc_daily_build.md) for a **desktop OS**.

Aracı yapılandırmak için:

1. [Install PX4 firmware](../config/firmware.md#installing-px4-main-beta-or-custom-firmware) (including "custom" firmware with your own changes).
1. [Temel Yapılandırma](../config/README.md) bölümünden temel konfigurasyonun nasıl yapılacağına dair açıklamalara ulaşabilirsiniz.
1. [Parametre Konfigürasyonu](../advanced_config/parameters.md) bölümünden parametreleri nasıl bulup özelleştirebileceğinize bakabilirsiniz.
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.

::: info

- _QGroundControl_ mobile variants do not support vehicle configuration.
- The _daily build_ includes development tools and new features that are not available in the official release.
- Configuration in the airframe reference have been flown on real vehicles, and are a good starting point for "getting off the ground".

:::
