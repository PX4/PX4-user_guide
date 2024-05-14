# CAUV CAN PMU

CAN PMU<sup>&reg;</sup> - це високоточний модуль живлення [DroneCAN](index.md), розроблений компанією CUAV<sup>&reg;</sup>. Він використовує алгоритм компенсації CUAV ITT, який дозволяє дронам отримувати більш точні дані про заряд батареї.

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu.jpg)

Рекомендується для використання у великих комерційних транспортних засобах, але також може застосовуватися для дослідницьких транспортних засобів.

## Де придбати

- [CUAV store](https://store.cuav.net/index.php)
- [CUAV aliexpress ](https://www.aliexpress.com/item/4000369700535.html)

## Характеристики обладнання

- **Процесор:** STM32F412
- **Вхідна напруга**: 6~62V\(2-15S\)
- **Максимальний струм:** 110A
- **Точність напруги:** ±0.05V
- **Точність струму:** ±0.1A
- **Роздільна здатність:** 0.01A/V
- **Максимальна вихідна потужність:** 6000W/90S
- **Максимальна стабільна потужність:** 5000W
- **Вихід порту живлення:** 5.4V/5A
- **Робоча температура:** -20~+100
- **Оновлення прошивки:** Підтримується.
- **Калібрування:** не потрібно.
- **Тип інтерфейсу:**
  - **IN/OUT:** XT90\(Кабель）/Amass 8.0\(Модуль）
  - **Порт живлення:** 5025850670
  - **CAN:** GHR-04V-S
- **Зовнішній вигляд:**
  - **Розмір:** 46.5мм \* 38.5мм \* 22.5мм
  - **Вага:** 76g

## Встановлення обладнання

### Вміст набору

![CAN PMU list](../../assets/hardware/power_module/cuav_can/can_pmu_list.png)

### Розпіновка

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_pinouts_en.png)

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_pinouts_en2.png)

## Підключення

![CAN PMU](../../assets/hardware/power_module/cuav_can/can_pmu_connection_en.png)

Кроки підключення:

- Підключіть керування польотом CAN1/2 та інтерфейс CAN модуля.
- Підключіть кабель живлення серії V5 до живлення керування польотом V5 Power2 (якщо інші керуючі пристрої підключені до інтерфейсу живлення) та інтерфейсу живлення модуля.

## Налаштування польотного контролера

Встановіть такі параметри у _QGroundControl_ [Vehicle Setup > Parameters](../advanced_config/parameters.md), а потім перезапустіть:

- [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE): встановить на: _Sensors Automatic Config_

  ![qgc set](../../assets/hardware/power_module/cuav_can/qgc_set_en.png)

- [UAVCAN_SUB_BAT](../advanced_config/parameter_reference.md#UAVCAN_SUB_BAT): встановить на: _Raw data_

  ![QGC - Set UAVCAN_SUB_BAT parameter to raw data](../../assets/hardware/power_module/cuav_can/qgc_set_usavcan_sub_bat.png)

## Додаткова інформація

[Керівництво користувача CAN PMU](http://manual.cuav.net/power-module/CAN-PMU.pdf)

[Модуль виявлення живлення CAN PMU > Увімкніть CAN PMU > Прошивка PX4](http://doc.cuav.net/power-module/can-pmu/en/) (документи CUAV)
