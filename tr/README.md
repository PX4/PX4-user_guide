---
canonicalUrl: https://docs.px4.io/main/tr/README
---

<div style="float:right; padding:10px; margin-right:20px;"><a href="https://px4.io/"><img src="../assets/site/logo_pro_small.png" title="Px4 Logo" width="180px" /></a></div>

# PX4 Otopilot Kullanıcı Rehberi ({{ $themeConfig.px4_version }})

[![Sürümler](https://img.shields.io/badge/release-main-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Tartışma](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](https://discuss.px4.io//) [![Discord](https://discordapp.com/api/guilds/1022170275984457759/widget.png?style=shield)](https://discord.gg/dronecode)

PX4 is the _Professional Autopilot_. Akademi ve endüstriden birinci sınıf yazılım geliştiriciler tarafından geliştirilen ve dünyanın dört bir yanına uzanan aktif bir topluluk tarafından desteklenen PX4, yarış ve kargo dronlarından kara ve denizaltı araçlarına kadar birçok çeşit araca hayat vermektedir.

:::tip
Bu rehber, PX4 tabanlı bir aracı kurmak, yapılandırmak ve güvenli bir şekilde uçurmak için ihtiyacınız olan her şeyi içermektedir. Katkıda bulunmak ister misiniz?  [Development](development/development.md) bölümünü kontrol edin :::

## Nasıl Başlayabilirim?

[Başlangıç](getting_started/README.md) tüm kullanıcılar tarafından okunmalıdır It provides an overview of PX4, including features provided by the flight stack (flight modes and safety features) and the supported hardware (flight controller, vehicles, airframes, telemetry systems, RC control systems).

Depending on what you want to achieve, the following tips will help you navigate through this guide:

**I already have a drone and I just want to fly:**

If you have a Ready To Fly (RTF) vehicle that supports PX4:

- [Temel kurulum](config/README.md) aygıt yazılımınızı en son sürüme nasıl güncelleyeceğinizi, pusula ve IMU gibi ana sensörleri nasıl kalibre edeceğinizi ve uzaktan kumanda ile güvenlik özelliklerini nasıl ayarlayacağınızı açıklar.
- [Uçuş](flying/README.md) güvenli bir şekilde nerede ve nasıl aracın uçurulacağı, silahlanma ve uçuş sorunlarının nasıl giderileceği başta olmak üzere uçuşla ilgili temel bilgileri öğretir. Ayrıca bu bölümde uçuş modları da detaylıca açıklanmıştır.

**I want to build a drone with PX4 from scratch:**

:::tip

The "supported" vehicles are listed in the [Airframes Reference](airframes/airframe_reference.md). These are vehicles that have tested and tuned configurations that you can download using _QGroundControl_.

:::

If you want to build a vehicle from scratch:

- Bir gövde seçin - [Gövde Yapıları](airframes/README.md) bölümünde desteklenen gövdelerin listesini ve yapım aşaması için detaylı açıklamaları bulabilirsiniz.
- Choose a flight controller - see [Getting Started > Flight Controllers](getting_started/flight_controller_selection.md) and [Autopilot Hardware](flight_controller/README.md).
- [Montaj](assembly/README.md), önemli yanbirimleri otopilota nasıl bağlayacağınızı açıklar.
- [Temel Kurulum](config/README.md) aygıt yazılımınızı nasıl güncelleyeceğinizi ve uçak gövdenize uygun ayarlarla nasıl yapılandıracağınızı gösterir. Ayrıca bu bölümde ana sensörlerin nasıl kalibre edileceği ve RC kumanda ile güvenlik özelliklerinin nasıl ayarlanacağı dair açıklamaları da bulabilirsiniz.

Once you are ready to fly your vehicle, visit the [Flying](flying/README.md) section.

**I want to add payload or a camera:**

The payloads section describes how to add a camera or how to configure PX4 to enable you to deliver packages.

- [Payloads](payloads/README.md) describes how to integrate payloads

**I am modifying a supported vehicle:**

Modifications of the flight controller and basic sensors are covered above. In order to use new sensors, or if you have made changes that significantly affect flight characteristics:

- [Peripheral Hardware](peripherals/README.md) provides additional information about using external sensors.
- [Basic Configuration](config/README.md) explains how to calibrate the main sensors.
- [Advanced Configuration](advanced_config/README.md) should be used to re/fine-tune the airframe.

**I want to run PX4 on new hardware and extend the platform:**

- [Development](development/development.md) explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## Yardım Alma

The [Support](contribute/support.md) page explains how to get help from the core dev team and the wider community.

Among other things it covers:

- [Forums where you can get help](contribute/support.md#forums-and-chat)
- [Diagnosing issues](contribute/support.md#diagnosing-problems)
- [How to report bugs](contribute/support.md#issue-bug-reporting)
- [Weekly dev call](contribute/support.md#weekly-dev-call)

## Bug Bildirme & Sorunlar

If you have any problems using PX4 first post them on the [support forums](contribute/support.md#forums-and-chat) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## Katkıda Bulunma

Information on how to contribute to code and documentation can be found in the [Contributing](contribute/README.md) section:

- [Code](contribute/README.md)
- [Documentation](contribute/docs.md)
- [Translation](contribute/translation.md)

## Çeviri

There are several [translations](contribute/translation.md) of this guide. You can access these from the Languages menu (top right):

![Language Selector](../assets/vuepress/language_selector.png)

## Lisans

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

## Takvim & Etkinlikler

The _Dronecode Calendar_ shows important community events for platform users and developers. Select the links below to display the calendar in your timezone (and to add it to your own calendar):

- [Switzerland – Zurich](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
- [Pacific Time – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
- [Australia – Melbourne/Sydney/Hobart](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
The calendar default timezone is Central European Time (CET).

:::

<iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### Simgeler

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> _placeholder_ icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> _camera-automatic-mode_ icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Yönetim

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px" ><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
