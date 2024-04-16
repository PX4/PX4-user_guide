# Pixhawk 3 Pro (Знято з виробництва)

:::warning PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://store-drotek.com/) щодо питань технічної підтримки або відповідності вимогам.
:::

Pixhawk<sup>&reg;</sup> 3 Pro базується на апаратному дизайні FMUv4 (Pixracer) з деякими оновленнями та додатковими функціями. Плата була спроєктована [Drotek<sup>&reg;</sup>](https://drotek.com) і PX4.

![Pixhawk 3 Pro hero image](../../assets/hardware/hardware-pixhawk3_pro.jpg)

::: info
Основна документація з апаратного забезпечення тут: https://drotek.gitbook.io/pixhawk-3-pro/hardware
:::

:::tip
Цей автопілот [підтримується](../flight_controller/autopilot_pixhawk_standard.md) командами підтримки та тестування PX4.
:::

## Короткий опис

- Мікроконтролер: **STM32F469**; Flash size **2MiB**, RAM size **384KiB**
- **ICM-20608-G** гіроскоп / акселерометр
- **MPU-9250** гіроскоп / акселерометр / магнітометр
- **LIS3MDL** компас
- Датчики, підключені через дві шини SPI (одна високочастотна й одна малошумна шина)
- Два шини I2C
- Два CAN шини
- Показники напруги / батареї з двох блоків живлення
- FrSky<sup>&reg;</sup> інвертор
- 8 Main + 6 AUX виводів PWM (окремий IO чіп, PX4IO)
- microSD (логування)
- S.BUS / Spektrum / SUMD / PPM вхід
- JST GH роз'єми: ті самі роз'єми та розводка, що й у Pixracer

## Де купити

В [Drotek](https://store.drotek.com/) (ЄС) :

- [Pixhawk 3 Pro (Pack)](https://store.drotek.com/autopilots/844-pixhawk-3-pro-pack.html)
- [Pixhawk 3 Pro](https://store.drotek.com/autopilots/821-pixhawk-pro-autopilot-8944595120557.html)

В [readymaderc](https://www.readymaderc.com) (США) :

- [Pixhawk 3 Pro](https://www.readymaderc.com/products/details/pixhawk-3-pro-flight-controller)

## Збірка прошивки

:::tip
Більшості користувачів не потрібно збирати цю прошивку! Вона попередньо зібрана й автоматично встановлюється _QGroundControl_ при підключенні відповідного апаратного забезпечення.
:::

Щоб [ зібрати PX4](../dev_setup/building_px4.md) для цієї цілі:

```
make px4_fmu-v4pro_default
```

## Відладочний порт

Плата має порти FMU та IO для відладки, як показано нижче.

![Відладочні порти](../../assets/flight_controller/pixhawk3pro/pixhawk3_pro_debug_ports.jpg)

Розводка та роз’єм відповідають інтерфейсу [Pixhawk Debug Mini](../debug/swd_debug.md#pixhawk-debug-mini), визначеному в [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) (роз’єм JST SM06B).

| Pin          | Signal           | Volt  |
| ------------ | ---------------- | ----- |
| 1 (червоний) | VCC TARGET SHIFT | +3.3V |
| 2 (чорний)   | CONSOLE TX (OUT) | +3.3V |
| 3 (чорний)   | CONSOLE RX (IN)  | +3.3V |
| 4 (чорний)   | SWDIO            | +3.3V |
| 5 (чорний)   | SWCLK            | +3.3V |
| 6 (чорний)   | GND              | GND   |

Інформацію про підключення та використання цього порту див:

- [Порт відладки SWD](../debug/swd_debug.md)
- [Системна консоль PX4](../debug/system_console.md#pixhawk_debug_port) (Зауважте, що консоль FMU зіставляється з UART7).

## Налаштування послідовного порту

| UART   | Device     | Port                       |
| ------ | ---------- | -------------------------- |
| UART1  | /dev/ttyS0 | WiFi                       |
| USART2 | /dev/ttyS1 | TELEM1 (керування потоком) |
| USART3 | /dev/ttyS2 | TELEM2 (керування потоком) |
| UART4  |            |                            |
| UART7  | CONSOLE    |                            |
| UART8  | SERIAL4    |                            |

<!-- Note: Got ports using https://github.com/PX4/PX4-user_guide/pull/672#issuecomment-598198434 -->
