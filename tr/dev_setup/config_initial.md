# İlk Kurulum & Yapılandırma

Geliştiricilerin aşağıda açıklanan temel ekipmanları (veya benzerlerini) edinmelerini de "varsayılan" [gövde](../airframes/airframe_reference.md) konfigürasyonlarını tercih etmelerini öneririz.

## Temel Ekipman:

:::tip PX4 burada bahsedilenlerden çok daha geniş bir ekipman setiyle de kullanılabilir ancak yeni geliştiricilerin standart kurulumlardan faydalanmaları daha kullanışlı olacaktır. A Taranis RC + Note 4 tablet kullanarak cebinizi yakmayan oldukça ucuz bir kit oluşturabilirsiniz.
:::

Tavsiye edilen ekipmanlar:

* Güvenlik pilotu için bir Taranis Plus (veya eşdeğeri) RC kumanda
* Geliştirme bilgisayarı:
  * MacBook Pro (2015 ve sonraki modellerinden) - OSX 10.15 veya sonraki bir sürümü yüklü
  * Lenovo Thinkpad 450 (i5) - Ubuntu Linux 18.04 veya sonraki bir sürümü yüklü
* Yer kontrol istasyonu cihazı:
  * iPad (Wifi telemetri adaptörü gerektirir)
  * Herhangi bir MacBook veya Ubuntu Linux dizüstü bilgisayar (geliştirme bilgisayarı da kullanılabilir)
  * Samsung Note 4 veya eşdeğeri (*QGroundControl *'ı etkili bir şekilde çalıştırmak için yeterince büyük ekrana sahip herhangi bir yeni Android tablet veya telefon).
* Safety glasses
* For multicopters - tether for more risky tests

## Vehicle Configuration

:::tip
*QGroundControl* for a **desktop OS** is required for vehicle configuration. You should use (and regularly update) the daily build in order to take advantage of the latest features in PX4.
:::

To configure the vehicle:

1. Download the [QGroundControl Daily Build](https://docs.qgroundcontrol.com/en/releases/daily_builds.html) for your development platform.
1. [Basic Configuration](../config/README.md) explains how to perform basic configuration.
1. [Parameter Configuration](../advanced_config/parameters.md) explains how you can find and modify individual parameters.
