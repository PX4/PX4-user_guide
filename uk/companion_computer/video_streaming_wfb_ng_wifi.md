# Посилання для передачі відео за допомогою бездротового зв'язку WiFi у режимі Raw (WFB-ng)

Цей посібник показує, як налаштувати [супутній комп'ютер](../companion_computer/README.md) з камерою Logitech C920 або RaspberryPi так, щоб відеопотік передавався з БЛА на земний комп'ютер і відображався в _QGroundControl_. Для налаштування використовується WiFi у режимі непідключеного (транслювання) та програмне забезпечення проекту [WFB-ng](https://github.com/svpcom/wfb-ng).

Канал також може бути використаний як двосторонній [телеметричний](../telemetry/README.md) зв'язок та тунель TCP/IP для керування дроном під час польоту. Якщо ви керуєте дроном вручну за допомогою джойстика з QGroundControl (яке використовує MAVLink), то ви можете використовувати WFB-ng як єдине з'єднання для всіх комунікацій з дроном (відео, телеметрія MAVLink, дистанційне керування за допомогою джойстика).

:::warning
Перш ніж використовувати _WFB-ng_, перевірте, чи дозволяють регулятори такий тип використання WiFi в вашій країні.
:::

## Загальний огляд WFB-ng

Проект _WFB-ng_ надає транспорт даних, який використовує низькорівневі пакети WiFi для уникнення обмежень відстані та затримки звичайного стеку IEEE 802.11.

Основні переваги _WFB-ng_ включають:

- Низька затримка відеозв'язку.
- Двосторонній телеметричний зв'язок (MAVLink).
- TCP/IP тунель.
- Автоматичне різноманіття передавача - використовуйте кілька карт на землі, щоб уникнути відслідковувача антен.
- Повне шифрування та аутентифікація зв'язку (з використанням [libsodium](https://download.libsodium.org/doc/)).
- Агрегація пакетів MAVLink (упаковка невеликих пакетів у партії перед передачею).
- Покращений [OSD](https://github.com/svpcom/wfb-ng-osd) для Raspberry PI або загального лінуксового робочого стола з gstreamer.

Додаткова інформація наведена в [FAQ](#faq) нижче.

## Апаратне забезпечення

### Vehicle Setup

Налаштування транспортного засобу складається з такого:

- Raspberry PI 3B/3B+/ZeroW
- Камера. Були протестовані наступні варіанти:

  - [Камера Raspberry Pi](https://www.raspberrypi.org/products/camera-module-v2/), підключена через CSI.
  - [Камера Logitech C920](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34), підключена через USB

- Модуль WiFi [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) або будь-яка інша карта на основі **RTL8812au**.

### Наземна станція

- Наземний комп'ютер на станції. Ці варіанти були перевірені:

  - Будь-який Linux комп'ютер з USB-портом (протестований на Ubuntu 18.04 x86-64)
  - Комп’ютер із будь-якою ОС із керуванням QGround та Raspberry PI, під’єднаний через Ethernet (RasPi забезпечує з’єднання Wi-Fi).

- Модуль WiFi [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) або будь-яка інша карта на основі **RTL8812au**. Див. вікі [WFB-ng > апаратне забезпечення WiFi](https://github.com/svpcom/wfb-ng/wiki/WiFi-hardware) для отримання додаткової інформації про підтримувані модулі.

## Модифікація апаратного забезпечення

Alpha AWUS036ACH - це карта середньої потужності, яка використовує багато струму під час передачі. Якщо ви живите її від звичайного USB2, то на більшості **ARM-плат** вона скине порт. Якщо ви підключите її до порту **USB3** за допомогою **нативного кабелю USB3** до ноутбука на **Linux**, ви можете використовувати її без модифікацій.

Для **Raspberry PI** (UAV або земля) її необхідно підключити безпосередньо до 5V BEC (або адаптера високої потужності для земельного pi) одним із двох способів:

- Зробіть власний USB-кабель ([відірвіть провід `+5V` від USB-штепселя і підключіть його до BEC])(https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables)
- Відірвіть провід `+5V` на платі поруч із USB-портом і підключіть його до BEC (не робіть цього, якщо сумніваєтеся - використовуйте власний кабель).

Вам також потрібно додати **конденсатор низького опору** з ємністю 470 мкФ (як у ESC) між **+5В карти та землею**, щоб фільтрувати перепади напруги. Ви повинні інтегрувати конденсатор з власним USB-кабелем. Без конденсатора ви можете отримати втрату пакетів або їх порушення. Будьте обережні з петлею маси при використанні декількох земляних проводів. Будьте обережні з [петлею маси](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29) при використанні декількох земляних проводів.

:::note

Якщо ви використовуєте спеціальні "дуже" потужні карти з Taobao/Aliexpress, то ВИ МАЄТЕ живити їх так, як описано вище в БУДЬ-ЯКОМУ випадку.
:::

### Конфігурація UAV

1. Download Raspberry PI image from [latest wfb-ng release](https://github.com/svpcom/wfb-ng/releases/)
2. Flash it to the **UAV** Raspberry PI
3. Reboot it and ssh with standard credentials (pi/raspberry).
4. Run actions for **air** role as displayed in motd.
5. Setup camera pipeline. Open `/etc/systemd/system/fpv-camera.service` and uncomment pipeline according to your camera (PI camera or Logitech camera)
6. Open `/etc/wifibroadcast.cfg` and configure WiFi channel according to your antenna setup (or use default #165 for 5.8GHz)
7. Configure PX4 to output telemetry stream at speed 1500 Kbps (other UART speeds doesn't match well to RPI frequency dividers). Connect Pixhawk UART to Raspberry PI UART. In `/etc/wifibroadcast.cfg` uncomment `peer = 'serial:ttyS0:1500000'` in `[drone_mavlink]` section.

### Using a Linux Laptop as GCS (Harder than using a RasPi)

1. На **наземному** Linux комп'ютері розробки:

   ```sh
   sudo apt install libpcap-dev libsodium-dev python3-all python3-twisted
   git clone -b stable https://github.com/svpcom/wfb-ng.git
   cd wfb-ng && make deb && sudo apt install ./deb_dist/wfb-ng*.deb
   ```

2. Follow the [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO) to complete installation
3. Don't forget to copy `/etc/gs.key` from **UAV** side to **ground** side to bind two setups.
4. Also don't forget to use the same frequency channel as on the UAV side.

### Using Raspberry PI as GCS (Easier)

If you have Windows or OSX, or don't want to setup WFB-ng to your Linux laptop then you can use the same prebuilt image and another Raspberry Pi:

1. Flash image to the **ground** Raspberry Pi.
2. Reboot it and SSH in with standard credentials (pi/raspberry).
3. Run actions for **ground** role as displayed in motd, but skip setup of `fpv-video` service and `osd` service.
4. Connect your laptop and ground RasPi via ethernet and configure IP addresses
5. Edit `/etc/wifibroadcast.cfg` and set the IP address of the laptop in `[gs_mavlink]` and `[gs_video]` sections (replacing `127.0.0.1`).

### QGroundControl Setup

1. Run _QGroundControl_ and set `RTP h264` on port 5600 as video source
2. Use default settings (udp on port 14550) as mavlink source

## Tuning Radio Settings

With default settings WFB use radio channel 165 (5825 MHz), width 20MHz, MCS #1 (QPSK 1/2) with long GI. This provides ~7 mbit/s of **effective** speed (i.e. usable speed after FEC and packet encoding) for **both directions** in sum, because WiFi is half-duplex. So it is suitable for video down stream 720p@49fps (4 mbit/s) + two full-speed telemetry streams (uplink and downlink). If you need a higher bandwidth you can use other MCS index (for example 2 or greater)

## Antennas and Diversity

For simple cases you can use omnidirectional antennas with linear (that bundled with wifi cards) or circular leaf ([circularly polarized Coverleaf Antenna](http://www.antenna-theory.com/antennas/cloverleaf.php)) polarization. If you want to setup long distance link you can use multiple wifi adapters with directional and omnidirectional antennas. TX/RX diversity for multiple adapters supported out of box (just add multiple NICs to `/etc/default/wifibroadcast`). If your WiFi adapter has two antennas (like Alfa AWU036ACH) TX diversity is implemented via [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code). Cards with 4 ports (like Alfa AWUS1900) are currently not supported.

## FAQ

**Q:** _What type of data can be transmitted using wfb-ng?_

**A:** Any UDP with packet size <= 1445. For example x264 inside RTP or MAVLink.

**Q:** _What are transmission guarantees?_

**A:** Wifibroadcast uses FEC (forward error correction). You can tune it (both TX and RX simultaneously!) to fit your needs.

**Q** _How far I can fly and still connect?_

**A** It depends on your antennas and WiFi cards. With Alfa AWU036ACH and 20dBi patch antenna on the ground ~20km is possible.

:::warning
Don't use band that the RC TX operates on!
Or setup RTL properly to avoid model loss.
:::

**Q:** _Is only Raspberry PI supported?_

**A:** WFB-ng is not tied to any GPU - it operates with UDP packets. But to get RTP stream you need a video encoder (which encodes raw data from camera to x264 stream), or you must use a camera with a hardware video codec like Logitech C920 or Ethernet security cameras.

#### What ARM Boards are Recommended for the UAV?

- RPI3b/3b+/ZeroW. Prebuilt images are available, but it supports only h264 video for CSI cameras.
- Jetson Nano. It supports h264 and h265 but you need to setup it yourself according to [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO)

You can use any other Linux ARM board, but you need to use an Ethernet or USB camera with built-in hardware video codecs (such as Logitech C920).

## Theory

WFB-ng puts the WiFi cards into monitor mode. This mode allows to send and receive arbitrary packets without association and waiting for ACK packets. [Analysis of Injection Capabilities and Media Access of IEEE 802.11 Hardware in Monitor Mode](https://github.com/svpcom/wfb-ng/blob/master/doc/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf) [802.11 timings](https://github.com/ewa/802.11-data)
