# Модуль WiFi ESP32

ESP32 є легкодоступними модулями WiFi з присвяченими інтерфейсами UART, SPI та I2C, повним стеком TCP/IP та можливістю мікроконтролера.
They come without firmware, but _DroneBridge for ESP32_ can be installed to enable them as a transparent and bi-directional serial to WiFi bridge.
Потім вони можуть бути використані в якості модуля WiFi телеметрій, для будь-якого контролера серій Pixhawk.

No configuration is generally required if connected to `TELEM2`.
Типовий діапазон складає приблизно 50 м-200м (залежно від використаної антени).

![DroneBridge for ESP32 connection concept](../../assets/peripherals/telemetry/esp32/db_ESP32_setup.png)

## Рекомендоване обладнання

_DroneBridge for ESP32_ can run on almost every ESP32 development board.
Рекомендується використовувати плати та модулі з зовнішнім роз'ємом антени, оскільки вони забезпечать більший діапазон.

:::warning
Many ESP32 modules support 3.3V and 5V power supply input, while some flight controllers (e.g. Pixhawk 4) output at 5V.
Вам потрібно буде перевірити сумісність та знизити напругу, якщо це потрібно.
:::

Модулі та DevKit-и, які приймають живлення 3,3 В або 5 В:

- [AZ-Delivery — ESP-32 DevKit C](https://www.az-delivery.de/en/products/esp-32-dev-kit-c-v4)
- [TinyPICO — ESP32 Development Board - V2](https://www.adafruit.com/product/4335)
- [Adafruit HUZZAH32 — ESP32 Feather Board](https://www.adafruit.com/product/3405)
- [Adafruit AirLift — ESP32 WiFi Co-Processor Breakout Board](https://www.adafruit.com/product/4201) (requires FTDI adapter for flashing firmware)
- [Adafruit — HUZZAH32](https://www.adafruit.com/product/4172) (requires FTDI adapter for flashing firmware)

## Завантаження та Прошивання Програмного Забезпечення

[Download the firmware from the GitHub repository](https://github.com/DroneBridge/ESP32/releases) and then [follow these flashing instructions](https://github.com/DroneBridge/ESP32#installationflashing-using-precompiled-binaries).

:::tip
The instructions on Github are recommended because they are always up to date.
Note that the parameters may differ between releases of _DroneBridge for ESP32_.
:::

Основними кроками є:

1. [Download the pre-compiled firmware binaries](https://github.com/DroneBridge/ESP32/releases)
2. Підключіть свій DEVKit до комп'ютера за допомогою USB/серійного мосту (більшість DevKits вже мають USB-порт для прошивання та налагодження)
3. Очистіть флеш-пам'ять та прошейте прошивку DroneBridge для ESP32 на свій ESP32
   - Using [Espressif Flash Download Tool](https://www.espressif.com/en/support/download/other-tools) (Windows only)
   - Використання esp-idf/esptool (на всіх платформах)
4. Перезапустіть ESP32
5. [Connect to the "DroneBridge for ESP32" WiFi network and configure the firmware for your application](#configuring-dronebridge-for-esp32)

## Підключення

Проводка дуже проста, і схожа для всіх пристроїв при підключенні до портів Pixhawk TELEM1/2.
Ви можете використовувати роз'єми заголовка з кроком 2,54 мм або припаяти кабелі телеметрії PX4 безпосередньо до плати.

![Example for wiring an ESP32 to the TELEM port](../../assets/peripherals/telemetry/esp32/pixhawk_wiring.png)

1. Підключіть UART ESP32 до UART вашого контролера польоту (наприклад, порту TELEM 1 або TELEM 2).
   Переконайтеся, що рівні напруги відповідають: більшість ESP32 DevKits можуть приймати лише 3,3 В!
   - TX до RX
   - RX до TX
   - GND до GND
   - Забезпечте стабільне живлення 3.3 В або 5 В для ESP32 (в залежності від доступних входів вашого DevKit)
2. Встановіть порт керування польотом на потрібний протокол.
3. Плати з роз'ємом IPEX для зовнішньої антени часто також мають вбудовану антену, яка активується за замовчуванням.
   Можливо, вам знадобиться перепаяти резистор, щоб активувати зовнішній антенний порт.

::: info

- Відповідно до ESP32 для виробників на енергопостачанні.
  Деякі плати можуть мати проблеми, якщо вони одночасно підключені до джерела живлення 5 В та мають підключений кабель USB до USB/серійного мосту (роз'єм USB плати розробника ESP32).
- Деякі виробники ESP32 DevKits використовують неправильні мітки для контактів на своїх продуктах.
  Переконайтеся, що PIN-коди на вашому платі відмічені правильно при зіткненні з проблемами.

:::

## Налаштування QGroundControl

QGroundControl should auto-detect the connection and no further actions should be necessary (_DroneBridge for ESP32_ automatically forwards data from all connected WiFi devices via UDP to port 14550).

Доступні наступні параметри модулів:

- UDP unicast on port `14550` to all connected devices.
- TCP on port `5760`

## Налаштування DroneBridge для ESP32

The _DroneBridge for ESP32_ default configuration should work for connecting to PX4 "out of the box".
Єдине налаштування, яке може бути потрібним, - це забезпечення відповідності швидкостей передачі ESP32 та контролера польоту.

Вам слід змінити ці налаштування, якщо ви хочете використовувати різні контакти на ESP32, іншу конфігурацію WiFi або налаштувати розмір пакета.
Менший розмір пакету означає більше накладних витрат і навантаження на систему, але також менше затримки і швидше відновлення після втраченого пакету.

### Конфігурація за замовчуванням

- SSID: `DroneBridge for ESP32`
- Password: `dronebridge`
- Transparent/MAVLink
- UART baud rate `115200`
- UART TX pin `17`
- UART RX pin `16`
- Gateway IP: `192.168.2.1`

### Custom Settings & Webinterface

Ви можете змінити конфігурацію за замовчуванням через веб-інтерфейс.
Connect to the ESP32 via WiFi and enter `dronebridge.local`, `http://dronebridge.local` or `192.168.2.1` in the address
bar of your browser.

![DroneBridge for ESP32 Webinterface](../../assets/peripherals/telemetry/esp32/dbesp32_webinterface.png)

:::tip
Some settings require you to reboot the ESP32 to take effect.
:::

### API

DroneBridge для ESP32 пропонує REST:API, яке дозволяє вам читати та записувати параметри конфігурації.
Ви не обмежені варіантами, які пропонуються веб-інтерфейсом (наприклад, швидкості передачі даних).
Ви можете використовувати API для встановлення власних швидкостей передачі даних або для інтеграції системи у власне налаштування.

**To request the settings**

```http request
http://dronebridge.local/api/settings/request
```

**To request stats**

```http request
http://dronebridge.local/api/system/stats
```

**Trigger a reboot**

```http request
http://dronebridge.local/api/system/reboot
```

**Trigger a settings change:** Send a valid JSON

```json
{
  "wifi_ssid": "DroneBridge ESP32",
  "wifi_pass": "dronebridge",
  "ap_channel": 6,
  "tx_pin": 17,
  "rx_pin": 16,
  "telem_proto": 4,
  "baud": 115200,
  "msp_ltm_port": 0,
  "ltm_pp": 2,
  "trans_pack_size": 64,
  "ap_ip": "192.168.2.1"
}
```

до

```http request
http://dronebridge.local/api/settings/change
```

## Усунення проблем

- Завжди стерти спалах ESP32 перед прошивкою нового релізу/прошивки
- Перевірте, чи піни на вашій платі ESP правильно позначені.
- Enter the IP address in your browsers address bar `http://192.168.2.1`.
  Немає підтримки https!
  Можливо, вам доведеться відключитися від мобільної мережі при використанні телефону, щоб мати доступ до веб-інтерфейсу.
- If your network is operating in the same IP range as DB for ESP32 you need to change the Gateway IP address in the Webinterface to something like `192.168.5.1`.
