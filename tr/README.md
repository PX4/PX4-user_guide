<div style="float:right; padding:10px; margin-right:20px;"><a href="http://px4.io/"><img src="../assets/site/logo_pro_small.png" title="Px4 Logo" width="180px" /></a></div>

# PX4 Otopilot Kullanıcı Rehberi ({{ $themeConfig.px4_version }})

[![Sürümler](https://img.shields.io/badge/release-master-blue.svg)](https://github.com/PX4/PX4-Autopilot/releases) [![Tartışma](https://img.shields.io/badge/discuss-px4-ff69b4.svg)](http://discuss.px4.io/) [![Slack](https://px4-slack.herokuapp.com/badge.svg)](http://slack.px4.io)

PX4, *Profesyonel Otopilot* yazılımıdır. Akademi ve endüstriden birinci sınıf yazılım geliştiriciler tarafından geliştirilen ve dünyanın dört bir yanına uzanan aktif bir topluluk tarafından desteklenen PX4, yarış ve kargo dronlarından kara ve denizaltı araçlarına kadar birçok çeşit araca hayat vermektedir.

:::tip
Bu rehber, PX4 tabanlı bir aracı kurmak, yapılandırmak ve güvenli bir şekilde uçurmak için ihtiyacınız olan her şeyi içermektedir.
:::

:::note
Rehberi büyütme çalışmaları hala devam ettiğinden bu rehber PX4'ün bütününü henüz kapsamıyor olabilir.
:::

## Nasıl Başlayabilirim?

[Başlangıç](getting_started/README.md) kılavuzu bütün kullanıcılar tarafından okunmalıdır. Bu giriş ile birlikte uçuş modları, güvenlik özellikleri ve desteklenen uçuş kontrolcüsü, telemetri sistemleri ve RC kumanda gibi donanımların da açıklandığı PX4'e genel bir bakış atmış olacaksınız.

Aşağıdaki ipuçları, hedeflerinize ve istediklerinizi göz önünde bulundurarak bu rehberi daha kolay incelemenizde ve gezinmenizde yardımcı olacaktır.

**Halihazırda dronum var ve sadece uçurmak istiyorum:**

Eğer PX4'ü destekleyen uçuşa hazır bir dronunuz varsa:

* [Temel kurulum](config/README.md) aygıt yazılımınızı en son sürüme nasıl güncelleyeceğinizi, pusula ve IMU gibi ana sensörleri nasıl kalibre edeceğinizi ve uzaktan kumanda ile güvenlik özelliklerini nasıl ayarlayacağınızı açıklar.
* [Uçuş](flying/README.md) güvenli bir şekilde nerede ve nasıl aracın uçurulacağı, silahlanma ve uçuş sorunlarının nasıl giderileceği başta olmak üzere uçuşla ilgili temel bilgileri öğretir. Ayrıca bu bölümde uçuş modları da detaylıca açıklanmıştır.

**PX4 ile sıfırdan bir drone yapmak istiyorum:**

:::tip
"Desteklenen" araçlar [Araç Gövdesi](airframes/airframe_reference.md) bölümünde listelenmiştir. Bunlar, *QGroundControl* kullanarak kolayca indirebileceğiniz, yapılandırmaları test edilip ayarlanmış araçlardır.
:::

Eğer en başından bir araç oluşturmak istiyorsanız:

* Bir gövde seçin - [Gövde Yapıları](airframes/README.md) bölümünde desteklenen gövdelerin listesini ve yapım aşaması için detaylı açıklamaları bulabilirsiniz. 
* Bir uçuş kontrolcüsü seçin - bkz [Başlangıç > Uçuş Kontrolcüleri](getting_started/flight_controller_selection.md) ve [Otopilot Donanımı](flight_controller/README.md).
* [Montaj](assembly/README.md), önemli yanbirimleri otopilota nasıl bağlayacağınızı açıklar.
* [Temel Kurulum](config/README.md) aygıt yazılımınızı nasıl güncelleyeceğinizi ve uçak gövdenize uygun ayarlarla nasıl yapılandıracağınızı gösterir. Ayrıca bu bölümde ana sensörlerin nasıl kalibre edileceği ve RC kumanda ile güvenlik özelliklerinin nasıl ayarlanacağı dair açıklamaları da bulabilirsiniz.

Aracınızı uçurmaya hazır olduğunuzda, [Uçuş](flying/README.md) bölümüne geçin.

**Desteklenmekte olan bir aracı değiştiriyorum:**

Uçuş kontrolcüsü ve ana sensörlerin modifikasyonu hakkında gerekli bilgilendirmeler yukarıda yapılmıştı. Yeni sensörler kullanmak istiyorsanız ya da uçuş karakteristiğini etkileyecek ölçüde değişiklikler yaptıysanız:

* [Yanbirim Donanımı](peripherals/README.md) bölümünden harici sensörlerin kullanımı hakkında ilave bilgilere ulaşabilirsiniz.
* [Temel Kurulum](config/README.md) bölümünden ana sensörlerin kalibrasyonu hakkında ayrıntılara ulaşabilirsiniz.
* [Gelişmiş Yapılandırma](advanced_config/README.md) bölümünden araç gövdesinin ince ayarı için detaylı açıklamalara ulaşabilirsiniz.

**PX4'ü yeni bir donanım üzerinde çalıştırmak ve platformu genişletmek istiyorum:**

* [Development](development/development.md) explains how to support new airframes and types of vehicles, modify flight algorithms, add new modes, integrate new hardware, communicate with PX4 from outside the flight controller, and contribute to PX4.

## Getting Help

The [Support](contribute/support.md) page explains how to get help from the core dev team and the wider community.

Among other things it covers:

* [Forums where you can get help](contribute/support.md#forums-and-chat)
* [Diagnosing issues](contribute/support.md#diagnosing-problems)
* [How to report bugs](contribute/support.md#issue-bug-reporting)
* [Weekly dev call](contribute/support.md#weekly-dev-call)

## Reporting Bugs & Issues

If you have any problems using PX4 first post them on the [support forums](contribute/support.md#forums-and-chat) (as they may be caused by vehicle configuration).

If directed by the development team, code issues may be raised on [Github here](https://github.com/PX4/PX4-Autopilot/issues). Where possible provide [flight logs](getting_started/flight_reporting.md) and other information requested in the issue template.

## Contributing

Information on how to contribute to code and documentation can be found in the [Contributing](contribute/README.md) section:

* [Code](contribute/README.md)
* [Documentation](contribute/docs.md)
* [Translation](contribute/translation.md)

## Translations

There are several [translations](contribute/translation.md) of this guide. You can access these from the Languages menu (top right):

![Language Selector](../assets/vuepress/language_selector.png)

## License

PX4 code is free to use and modify under the terms of the permissive [BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause). This documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). For more information see: [Licences](contribute/licenses.md).

## Calendar & Events

The *Dronecode Calendar* shows important community events for platform users and developers. Select the links below to display the calendar in your timezone (and to add it to your own calendar):

* [Switzerland – Zurich](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [Pacific Time – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [Australia – Melbourne/Sydney/Hobart](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
Calendar defaults to CET. ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### Icons

The following icons used in this library are licensed separately (as shown below):

<img src="../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" /> *placeholder* icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *camera-automatic-mode* icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Governance

The PX4 flight stack is hosted under the governance of the [Dronecode Project](https://www.dronecode.org/).

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
