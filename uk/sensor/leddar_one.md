# LeddarOne Lidar

[LeddarOne](https://leddartech.com/solutions/leddarone/) - це невеликий модуль Lidar з вузьким, але розсіяним променем, який пропонує відмінний загальний діапазон виявлення та продуктивність в міцному, надійному та економічному пакеті. Він має діапазон сенсора від (5см - 40м) і може бути підключений до портів PWM або I2C.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne Lidar rangefinder" width="200px" />

## Налаштування обладнання

LeddarOne може бути підключений до будь-якого не використаного _серійного порту_ (UART), наприклад: TELEM2, TELEM3, GPS2 тощо.

Побудуйте кабель, використовуючи плату та роз'єм, а також роз'єм LeddarOne (показаний нижче). Вам лише потрібно буде підключити контакти 5V, TX, RX та GND.

| Pin | LeddarOne |
| --- | --------- |
| 1   | GND       |
| 2   | -         |
| 3   | VCC       |
| 4   | RX        |
| 5   | TX        |
| 6   | -         |

## Налаштування параметрів

[Налаштуйте послідовний порт](../peripherals/serial_configuration.md) на якому працюватиме лідар, використовуючи [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG). Немає потреби встановлювати швидкість передачі для порту, оскільки це налаштовано драйвером.

:::info Якщо параметр конфігурації недоступний у _QGroundControl_, можливо, вам доведеться [додати драйвер до мікропрограми](../peripherals/serial_configuration.md#parameter_not_in_firmware):

```plain
CONFIG_DRIVERS_DISTANCE_SENSOR_LEDDAR_ONE=y
```

:::

## Додаткова інформація

- [Специфікація LeddarOne](https://leddartech.com/app/uploads/dlm_uploads/2021/04/Spec-Sheet_LeddarOne_V10.0_EN-1.pdf)
