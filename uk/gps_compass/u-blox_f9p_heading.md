# Напрямок за допомогою RTK GPS з подвійним u-blox F9P

Два модулі [RTK GPS](../gps_compass/rtk_gps.md) u-blox F9P, встановлені на транспортному засобі, можуть бути використані для точного обчислення кута напрямку (тобто альтернатива оцінці напрямку на основі компасу). У цьому сценарії дві пристрої GPS називаються *Рухомою базою* та *Роувером*.

## Підтримувані транспортні засоби

Ця функція працює на пристроях F9P, які підтримують CAN або надають доступ до порту GPS UART2.

Підтримуються наступні пристрої:
* [ARK RTK GPS](https://arkelectron.com/product/ark-rtk-gps/) (arkelectron.com)
* [Плата SparkFun GPS-RTK2 - ZED-F9P](https://www.sparkfun.com/products/15136) (www.sparkfun.com)
* [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html) (store-drotek.com)
* [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm) (store.mrobotics.io)
* [Holybro H-RTK F9P Гелікальний або Базовий](https://holybro.com/products/h-rtk-f9p-gnss-series) (Магазин Holybro)
* [Holybro ДронCAN H-RTK F9P Ровер або Гелікальний](https://holybro.com/collections/dronecan-h-rtk) (Магазин Holybro)
* [CUAV C-RTK 9Ps](https://store.cuav.net/shop/c-rtk-9ps/) (Магазин CUAV)

:::info
- [RTK GPS Freefly](../gps_compass/rtk_gps_freefly.md) та [Holybro H-RTK F9P Rover Lite](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md) не можуть бути використані, оскільки вони не роблять доступними порт CAN або UART2.
- Підтримувані пристрої також перераховані в [RTK GNSS (GPS) > Підтримувані пристрої](../gps_compass/rtk_gps.md#supported-devices).
:::

## Установка

В ідеалі обидві антени повинні бути ідентичними, знаходитися на одному рівні/горизонталі і бути орієнтованими однаково, а також мати однаковий розмір і форму площини заземлення ([Примітка щодо застосування](https://content.u-blox.com/sites/default/files/documents/ZED-F9P-MovingBase_AppNote_UBX-19009093.pdf), розділ *Розгляди на рівні системи*).
- Довідка із застосування не вказує на мінімально необхідний інтервал між модулями (у тестових транспортних засобах, що працюють з PX4, використовувалася відстань 50 см).
- Антени можуть бути розміщені за необхідністю, але [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) повинен бути налаштований: [RTK GPS > GPS як джерело курсу/прямого ходу](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source).

### Налаштування UART

- UART2 пристроїв GPS потрібно з'єднати разом (TXD2 "Рухомої Бази" з RXD2 "Ровер")
- Підключіть UART1 на кожному з GPS до (окремих) не використовуваних UART на автопілоті, і налаштуйте обидва з них як GPS із швидкістю передачі даних, встановленою на `Auto`. Індексна карта виглядає наступним чином:
  - Головний GPS = Ровер
  - Допоміжний GPS = Рухома База
- Встановіть [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE) на `Heading` (1)
- Параметр [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) повинен бути встановлений на 3 (див. [RTK GPS > GPS як джерело курсового кута](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source)).
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) можливо потрібно встановити (див. [RTK GPS > GPS as Yaw/Heading Source](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source)).
- Перезавантажте та зачекайте, доки обидва пристрої отримають сигнал GPS. `стандарт GPS` повинен показати, що головний GPS переходить у режим RTK, що означає доступний кут курсу.

### CAN Налаштування

Для налаштування відсилайтесь до документації CAN RTK GPS для кожного конкретного пристрою (такого як [ARK RTK GPS > Налаштування Рухомого Базового Лінійного & Орієнтування GPS](../dronecan/ark_rtk_gps.md#setting-up-moving-baseline-gps-heading))

:::info
Якщо використовується RTK з фіксованою базовою станцією, другий GPS буде показувати стан RTK відносно. станція базова.
:::



## Детальна інформація

- [ZED-F9P Moving base applications (Application note)](https://content.u-blox.com/sites/default/files/documents/ZED-F9P-MovingBase_AppNote_UBX-19009093.pdf) - Загальне налаштування/інструкції.
- [RTK GPS > Налаштування GPS як Джерело розділення/Курсування](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source)
