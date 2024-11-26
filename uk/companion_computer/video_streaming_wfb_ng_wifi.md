# Потокова передача відео через канал зв'язку WiFi в режимі Raw (WFB-ng)

This tutorial shows how to set up a [companion computer](../companion_computer/index.md) with a Logitech C920 or RaspberryPi camera, such that the video stream is transferred from the UAV to a ground computer and displayed in _QGroundControl_.
The setup uses WiFi in unconnected (broadcast) mode and software from the [WFB-ng project](https://github.com/svpcom/wfb-ng).

The channel can also be used as a bidirectional [telemetry](../telemetry/index.md) link and TCP/IP tunnel for drone control during flight.
Якщо ви керуєте дроном вручну за допомогою джойстика з QGroundControl (яке використовує MAVLink), то ви можете використовувати WFB-ng як єдине з'єднання для всіх комунікацій з дроном (відео, телеметрія MAVLink, дистанційне керування за допомогою джойстика).

:::warning
Before using _WFB-ng_ check regulators allow this kind of WiFi use in your country.
:::

## Загальний огляд WFB-ng

The _WFB-ng project_ provides a data transport that use low-level WiFi packets to avoid the distance and latency limitations of the ordinary IEEE 802.11 stack.

The high level benefits of _WFB-ng_ include:

- Низька затримка відеозв'язку.
- Двосторонній телеметричний зв'язок (MAVLink).
- TCP/IP тунель.
- Автоматичне різноманіття передавача - використовуйте кілька карт на землі, щоб уникнути відслідковувача антен.
- Full link encryption and authentication (using [libsodium](https://download.libsodium.org/doc/)).
- Агрегація пакетів MAVLink (упаковка невеликих пакетів у партії перед передачею).
- Enhanced [OSD](https://github.com/svpcom/wfb-ng-osd) for Raspberry PI or generic linux desktop with gstreamer.

Additional information is provided in the [FAQ](#faq) below.

## Апаратне забезпечення(Hardware)

### Налаштування транспорту

Налаштування транспортного засобу складається з такого:

- Raspberry PI 3B/3B+/ZeroW

- Камера.
  Були протестовані наступні варіанти:

  - [Raspberry Pi camera](https://www.raspberrypi.org/products/camera-module-v2/) connected via CSI.
  - [Logitech camera C920](https://www.logitech.com/en-us/product/hd-pro-webcam-c920?crid=34) connected via USB

- WiFi module [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card.

### Наземна станція

- Наземний комп'ютер на станції.
  Ці варіанти були перевірені:

  - Будь-який Linux комп'ютер з USB-портом (протестований на Ubuntu 18.04 x86-64)
  - A computer with any OS running QGround control and Raspberry PI connected via Ethernet (RPi provides the wifi connection).

- WiFi module [ALPHA AWUS036ACH](https://www.alfa.com.tw/products_detail/1.htm) or any other **RTL8812au** card.
  See [WFB-ng wiki > WiFi hardware](https://github.com/svpcom/wfb-ng/wiki/WiFi-hardware) for more information on supported modules.

## Модифікація апаратного забезпечення

Alpha AWUS036ACH - це карта середньої потужності, яка використовує багато струму під час передачі.
If you power it from ordinary USB2 it will reset the port on most **ARM boards**.
If you connect it to **USB3** port via **native USB3 cable** to a **Linux laptop** you can use it without modification.

For **Raspberry PI** (UAV or ground) it must be directly connected to 5V BEC (or high current power adapter in case of ground pi) in one of two ways:

- Make a custom USB cable ([cut `+5V` wire from USB plug and connect it to BEC])(https://electronics.stackexchange.com/questions/218500/usb-charge-and-data-separate-cables)
- Cut a `+5V` wire on PCB near USB port and wire it to BEC (don't do this if doubt - use custom cable instead).

You must also add a 470uF **low ESR capacitor** (like ESC has) between **card +5v and ground** to filter voltage spikes.
Ви повинні інтегрувати конденсатор з власним USB-кабелем.
Без конденсатора ви можете отримати втрату пакетів або їх порушення. Будьте обережні з петлею маси при використанні декількох земляних проводів.
Be aware of [ground loop](https://en.wikipedia.org/wiki/Ground_loop_%28electricity%29) when using several ground wires.

:::info
If you use a special "very" high power cards from Taobao/Aliexpress then you MUST power it as described above in ANY case.
:::

### Конфігурація UAV

1. Download Raspberry PI image from [latest wfb-ng release](https://github.com/svpcom/wfb-ng/releases/)
2. Flash it to the **UAV** Raspberry PI
3. Перезавантажте його і підключіться через ssh зі стандартними обліковими даними (pi/raspberry).
4. Run actions for **air** role as displayed in motd.
5. Налаштуйте камерний канал. Open `/etc/systemd/system/fpv-camera.service` and uncomment pipeline according to your camera (PI camera or Logitech camera)
6. Open `/etc/wifibroadcast.cfg` and configure WiFi channel according to your antenna setup (or use default #165 for 5.8GHz)
7. Configure PX4 to output telemetry stream at speed 1500 Kbps (other UART speeds doesn't match well to RPi frequency dividers).
   Connect Pixhawk UART to Raspberry Pi UART.
   In `/etc/wifibroadcast.cfg` uncomment `peer = 'serial:ttyS0:1500000'` in `[drone_mavlink]` section.

### Using a Linux Laptop as GCS (Harder than using a RPi)

1. On **ground** Linux development computer:

   ```sh
   sudo apt install libpcap-dev libsodium-dev python3-all python3-twisted
   git clone -b stable https://github.com/svpcom/wfb-ng.git
   cd wfb-ng && make deb && sudo apt install ./deb_dist/wfb-ng*.deb
   ```

2. Follow the [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO) to complete installation

3. Don't forget to copy `/etc/gs.key` from **UAV** side to **ground** side to bind two setups.

4. Також не забудьте використовувати той самий канал частоти, що й на боці UAV.

### Використання Raspberry PI як БЗК (легше)

Якщо у вас є Windows або OSX, або ви не хочете налаштовувати WFB-ng на свій ноутбук з Linux, тоді ви можете використовувати той самий готовий образ і ще один Raspberry Pi:

1. Flash image to the **ground** Raspberry Pi.
2. Перезавантажте його і підключіться через SSH за стандартними обліковими даними (pi/raspberry).
3. Run actions for **ground** role as displayed in motd, but skip setup of `fpv-video` service and `osd` service.
4. Connect your laptop and ground RPi via ethernet and configure IP addresses
5. Edit `/etc/wifibroadcast.cfg` and set the IP address of the laptop in `[gs_mavlink]` and `[gs_video]` sections (replacing `127.0.0.1`).

### Налаштування QGroundControl

1. Run _QGroundControl_ and set `RTP h264` on port 5600 as video source
2. Використовуйте налаштування за замовчуванням (udp на порту 14550) як джерело mavlink

## Налаштування радіо

З настройками WFB за замовчуванням використовуйте радіоканал 165 (5825 МГц), ширину 20 МГц, MCS #1 (QPSK 1/2) з довгим GI.
This provides ~7 mbit/s of **effective** speed (i.e. usable speed after FEC and packet encoding) for **both directions** in sum, because WiFi is half-duplex.
Таким чином, він підходить для потокового відео 720p@49fps (4 мбіт/с) + два потоки телеметрії з повною швидкістю (вгору та вниз).
Якщо вам потрібна вища пропускна здатність, ви можете використовувати індекси MCS (наприклад, 2 або більше)

## Антени та інше

For simple cases you can use omnidirectional antennas with linear (that bundled with wifi cards) or circular leaf ([circularly polarized Coverleaf Antenna](http://www.antenna-theory.com/antennas/cloverleaf.php)) polarization.
Якщо ви хочете налаштувати зв'язок на велику відстань, ви можете використовувати кілька WiFi адаптерів з напрямними та всенапрямленими антенами. TX/RX diversity for multiple adapters supported out of box (just add multiple NICs to `/etc/default/wifibroadcast`).
If your WiFi adapter has two antennas (like Alfa AWU036ACH) TX diversity is implemented via [STBC](https://en.wikipedia.org/wiki/Space%E2%80%93time_block_code).
Карти з 4 портами (наприклад, Alfa AWUS1900) наразі не підтримуються.

## Часто Запитувані Питання

**Q:** _What type of data can be transmitted using wfb-ng?_

**A:** Any UDP with packet size <= 1445.
Наприклад, x264 в середині RTP або MAVLink.

**Q:** _What are transmission guarantees?_

**A:** Wifibroadcast uses FEC (forward error correction).
You can tune it (both TX and RX simultaneously!) to fit your needs.

**Q** _How far I can fly and still connect?_

**A** It depends on your antennas and WiFi cards.
З Alfa AWU036ACH і направленою антеною 20dBi на землі можливий польот на відстань приблизно 20 км.

:::warning
Don't use band that the RC TX operates on!
Або налаштуйте RTL належним чином, щоб уникнути втрати моделі.
:::

**Q:** _Is only Raspberry PI supported?_

**A:** WFB-ng is not tied to any GPU - it operates with UDP packets.
Але для отримання потоку RTP вам потрібен відеокодер (який кодує вихідні дані з камери у потік x264) або ви повинні використовувати камеру з апаратним відеокодеком, таку як Logitech C920 або камери спостереження з Ethernet.

#### Які ARM-плати рекомендуються для БПЛА?

- RPI3b/3b+/ZeroW.
  Існують готові образи, але вони підтримують лише відео h264 для камер CSI.
- Jetson Nano.
  It supports h264 and h265 but you need to setup it yourself according to [Setup HOWTO](https://github.com/svpcom/wfb-ng/wiki/Setup-HOWTO)

Ви можете використовувати будь-яку іншу ARM-плату з Linux, але вам потрібно використовувати камеру Ethernet або USB з вбудованими апаратними відеокодеками (наприклад, Logitech C920).

## Теорія

WFB-ng переводить WiFi-карти у режим монітору. Цей режим дозволяє надсилати та отримувати довільні пакети без асоціації та очікування підтвердження (ACK).
[Analysis of Injection Capabilities and Media Access of IEEE 802.11 Hardware in Monitor Mode](https://github.com/svpcom/wfb-ng/blob/master/doc/Analysis%20of%20Injection%20Capabilities%20and%20Media%20Access%20of%20IEEE%20802.11%20Hardware%20in%20Monitor%20Mode.pdf)
[802.11 timings](https://github.com/ewa/802.11-data)
