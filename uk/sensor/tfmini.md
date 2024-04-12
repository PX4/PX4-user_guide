# Benewake TFmini Lidar

Лідар _Benewake TFmini_ - це крихітний, недорогий та енергоефективний лідар з дальністю 12 м.

PX4 підтримує всі три варіанти серії: TFmini-s, TFmini-i, TFmini Plus. Ці повинні бути підключені до шини UART/серійного порту.

![TFmini LiDAR](../../assets/hardware/sensors/tfmini/tfmini_hero.jpg)

## Де купити

- [TFmini-s](https://en.benewake.com/TFminiS/index_proid_325.html)
- [TFmini-i](https://en.benewake.com/TFminii/index_proid_324.html) (промисловий)
- [TFmini Plus](https://en.benewake.com/TFminiPlus/index_proid_323.html)

## Налаштування обладнання

TFmini може бути підключений до будь-якого не використаного _серійного порту_ (UART), такого як: `TELEM2`, `TELEM3`, `GPS2` тощо.

## Налаштування параметрів

[Налаштуйте послідовний порт](../peripherals/serial_configuration.md) на якому працюватиме лідар, використовуючи [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG). Не потрібно встановлювати швидкість передачі (вона зашита в програму драйвера сенсора, оскільки підтримується лише одна швидкість).

:::note
Якщо параметр конфігурації недоступний у _QGroundControl_, можливо, драйвер [tfmini](../modules/modules_driver_distance_sensor.md#tfmini) не входить до мікропрограми. Для отримання інформації про те, як її додати, див. :

- [Налаштування послідовного порту: Відсутній параметр конфігурації від QGroundControl](../peripherals/serial_configuration.md#parameter_not_in_firmware)
- [Конфігурація дошки PX4 (Kconfig)](../hardware/porting_guide_config.md#px4-menuconfig-setup).

:::
