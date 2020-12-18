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

* [Geliştirme](development/development.md) bölümünden yeni uçak gövdelerinin ve araç türlerinin nasıl desteklenebileceği, uçuş algoritmalarının nasıl değiştirileceği, yeni uçuş modlarının nasıl ekleneceği, yeni donanımın nasıl entegre edileceği, uçuş kontrolcüsü dışından PX4 ile nasıl iletişim kurulacağı ve PX4'e nasıl katkıda bulunabileceğin gibi bilgilere ulaşabilirsiniz.

## Yardım Alma

[Destek](contribute/support.md) sayfası, ana geliştirme ekibinden ve geniş PX4 topluluğundan nasıl yardım alınacağını açıklar.

Ayrıca aşağıdaki konular hakkında da ilave bilgilere ulaşabilirsin:

* [İhtiyaç duyduğunda yardıma başvurabileceğin yer olan forumlar](contribute/support.md#forums-and-chat)
* [Sorunların teşhisi](contribute/support.md#diagnosing-problems)
* [Bugları bildirme](contribute/support.md#issue-bug-reporting)
* [Haftalık geliştiriciler toplantısı](contribute/support.md#weekly-dev-call)

## Bug Bildirme & Sorunlar

Eğer PX4'ü kullanırken herhangi bir sorun yaşarsanız, önce [destek forumları](contribute/support.md#forums-and-chat)nı kullanarak yaşadığınız sorunu sorabilirsiniz (bunun nedeni araç yapılandırmasından kaynaklanıyor olabilir).

Eğer geliştirici ekip tarafından yönlendirilirse, kod sorunları [Github](https://github.com/PX4/PX4-Autopilot/issues)ta gündeme getirilebilir. Mümkün olduğunca [uçuş kayıtları](getting_started/flight_reporting.md) ve şablonda istenen diğer bilgileri sağlamaya çalışın.

## Katkıda Bulunma

Koda ve dokümantasyona nasıl katkıda bulunulacağına ilişkin bilgiler [Katkıda Bulunmak](contribute/README.md) bölümünde bulunabilir:

* [Kod](contribute/README.md)
* [Dokümentasyon](contribute/docs.md)
* [Çeviri](contribute/translation.md)

## Çeviri

Bu rehber için bulunan çevirilere sağ üstte bulunan Diller menüsünden erişebilirsiniz.

![Dil seçme ](../assets/vuepress/language_selector.png)

## Lisans

PX4 kodunun izin verilen şartlar kapsamında kullanılması ve değiştirilmesi serbesttir. [BSD 3-clause lisansı](https://opensource.org/licenses/BSD-3-Clause). Bu dokümantasyon [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) lisansı altında lisanslanmıştır. Daha fazla bilgi için: [Lisanslar](contribute/licenses.md).

## Takvim & Etkinlikler

Platform kullanıcıları ve geliştiriciler için bazı önemli etkinlikler *Dronecode Takvimi*nden takip edilebilir. Takvimi kendi saat diliminizde görüntülemek (ve kendi takviminize eklemek) için aşağıdaki linklerden faydalanabilirsiniz:

* [İsviçre– Zürih](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Europe%2FZurich)
* [Pasifik Zaman Dilimi – Tijuana](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=America%2FTijuana)
* [Avustralya – Melbourne/Sidney/Hobart](https://calendar.google.com/calendar/embed?src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&ctz=Australia%2FSydney)

:::tip
Varsayılan takvim ayarı CET'dir (Central European Time). ::: <iframe src="https://calendar.google.com/calendar/embed?title=Dronecode%20Calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=linuxfoundation.org_g21tvam24m7pm7jhev01bvlqh8%40group.calendar.google.com&amp;color=%23691426&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no" mark="crwd-mark"></iframe> 

### Simgeler

Bu kitaplıkta kullanılan aşağıdaki simgeler aşağıda gözüktüğü gibi ayrı olarak lisanslanmıştır:

<img src="../assets/site/position_fixed.svg" title="Konum sabitleme gerekli (ör. GPS)" width="30px" /> *yertutucu* simgesi <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> (<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>), lisans - <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

<img src="../assets/site/automatic_mode.svg" title="Automatic mode" width="30px" /> *otomatik-kamera-modu* simgesi <a href="http://www.freepik.com" title="Freepik">Freepik</a> (<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>), lisans - <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.

## Yönetim

PX4 uçuş modülü [Dronecode Project](https://www.dronecode.org/) yönetimi altında barındırılmaktadır.

<a href="https://www.dronecode.org/" style="padding:20px"><img src="https://mavlink.io/assets/site/logo_dronecode.png" alt="Dronecode Logo" width="110px"/></a>
<a href="https://www.linuxfoundation.org/projects" style="padding:20px;"><img src="https://mavlink.io/assets/site/logo_linux_foundation.png" alt="Linux Foundation Logo" width="80px" /></a>

<div style="padding:10px">&nbsp;</div>
