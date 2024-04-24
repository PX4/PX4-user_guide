# Holybro Pix32 v5

:::warning
PX4 не виробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://holybro.com/) щодо підтримки апаратного забезпечення чи відповідності вимогам.
:::

_Pix32 v6_<sup>&reg;</sup> є останньою оновленою версією контролерів польоту pix32 v5. Це варіант Pixhawk 6C з модульним дизайном та спільною ціллю з FMUv6C. Він складається з окремого контролера польоту та базової плати, які з'єднані [100-контактним роз'ємом](https://docs.holybro.com/autopilot/pix32-v6/download). Це призначено для тих пілотів, які потребують потужної, гнучкої та настроюваної системи керування польотами.

Він оснащений високопродуктивним процесором H7, і має резервування IMU, з контролем температури, і економічно вигідний дизайн, що забезпечує неймовірну продуктивність та надійність. Він відповідає [Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).

<img src="../../assets/flight_controller/pix32v6/pix32v6_fc_only.png" width="550px" title="pix32v6 Upright Image" />


<!--
:::tip
This autopilot is [supported](../flight_controller/autopilot_pixhawk_standard.md) by the PX4 maintenance and test teams.
:::  
-->

## Вступ

Всередині Pix32 v6 ви можете знайти STM32H743 на базі STMicroelectronics®, у поєднанні з технологією сенсорів від Bosch® & InvenSense®, що надає гнучкість і надійність для керування будь-яким автономним апаратом, придатним як для академічних, так і для комерційних застосувань.

Pix32 v6’s H7 MCU містить ядро Arm® Cortex®-M7 до 480 MHz, має 2MB flash пам’яті та 1MB RAM. Завдяки оновленій потужності обробки розробники можуть бути більш продуктивними та ефективними у своїй роботі з розробкою, що дозволяє використовувати складні алгоритми та моделі. Це включає високопродуктивні, низькошумні IMU на платі, розроблені, щоб бути ефективними з точки зору вартості, при цьому мати резерв IMU. Система ізоляції вібрації для фільтрації високочастотної вібрації та зменшення шуму для забезпечення точних вимірювань, що дозволяє транспортним засобам досягти кращих загальних польотних характеристик.

Цей контролер польоту ідеально підходить для людей, які шукають доступний та модульний контролер польоту, який може використовувати настроювану базову плату. Ми зробили [схеми базової плати pix32 v6 загальнодоступними](https://docs.holybro.com/autopilot/pix32-v6/download), ви можете або зробити власну несучу плату, або просто дозвольте нам допомогти вам з цим. За допомогою налаштованої базової плати ви можете впевнитися, що фізичний розмір, виводи і вимоги до розподілу живлення відповідають вашому безпілотнику належним чином, забезпечуючи, що у вас є всі необхідні з'єднання і ніяких витрат і масштабу з'єднувачів, яких вам не потрібно.

**Ключові пункти дизайну**

- Високопродуктивний процесор STM32H743 з більшою обчислювальною потужністю & оперативною пам'яттю
- Новий економічно ефективний дизайн із низькопрофільним форм-фактором
- Інтегрована система ізоляції вібрацій для фільтрації високочастотних вібрацій та зменшення шуму для забезпечення точних вимірювань
- IMU температурно контролюються за допомогою вбудованих нагрівальних резисторів, що дозволяє досягти оптимальної робочої температури IMU

# Технічна специфікація

### **Процесори & датчики**

- Процесор FMU: STM32H743&#x20;
  - 32 Bit Arm® Cortex®-M7, 480MHz, 2MB memory, 1MB SRAM&#x20;
- IO процесор: STM32F103
  - &#x20;32 Bit Arm® Cortex®-M3, 72MHz, 64KB SRAM&#x20;
- Бортові сенсори&#x20;
  - &#x20;Accel/Gyro: ICM-42688-P &#x20;
  - Accel/Gyro: BMI055&#x20;
  - Mag: IST8310&#x20;
  - Барометр: MS5611

### **Електричні дані**

- Номінальна напруга:
  - Максимальна вхідна напруга: 6 В
  - Вхід USB Power: 4.75\~5.25В
  - Вхід сервоприводу: 0\~36В
- Поточні рейтинги:
  - TELEM1 Максимальний обмежувач вихідного струму: 1.5A
  - Комбінований обмежувач вихідного струму всіх інших портів: 1.5A

### **Механічні характеристики**

- Розміри модуля FC: 44.8 x 44.8 x 13.5
- Вага модуля FC: 36г

### **Інтерфейси**

- 16- PWM серво виводів (8 з IO, 8 з FMU)
- 3 загальних послідовних портів
  - `TELEM1` - Повний контроль потоку, повністю розділений поточним лімітом 1.5A
  - `TELEM2` - Full flow control
  - `TELEM3`
- 2 GPS ports
  - `GPS1` - Full GPS port (GPS plus safety switch)
  - `GPS2` - Basic GPS port
- 1 I2C port
  - Supports dedicated I2C calibration EEPROM located on sensor module
- 2 CAN Buses
  - CAN Bus has individual silent controls or ESC RX-MUX control
- 2 Debug ports:
  - FMU Debug
  - I/O Debug
- Dedicated R/C input for Spektrum / DSM and S.BUS, CPPM, analog / PWM RSSI
- Dedicated S.BUS output
- 2 Power input ports (Analog)

- Other Characteristics:
  - Operating & storage temperature: -40 ~ 85°c

## Де купити

Order from [Holybro](https://holybro.com/collections/autopilot-flight-controllers/products/pix32-v6).

## Pinouts

- [Holybro Pix32 v6 Baseboard Ports Pinout](https://docs.holybro.com/autopilot/pix32-v6/pix32-v6-baseboard-ports)
- [Holybro Pix32 v6 Baseboard Ports Pinout](https://docs.holybro.com/autopilot/pix32-v6/pix32-v6-mini-base-ports)

## Зіставлення послідовних портів

| UART   | Device     | Port          |
| ------ | ---------- | ------------- |
| USART1 | /dev/ttyS0 | GPS1          |
| USART2 | /dev/ttyS1 | TELEM3        |
| USART3 | /dev/ttyS2 | Debug Console |
| UART5  | /dev/ttyS3 | TELEM2        |
| USART6 | /dev/ttyS4 | PX4IO         |
| UART7  | /dev/ttyS5 | TELEM1        |
| UART8  | /dev/ttyS6 | GPS2          |

## Розміри

- [Pix32v6 Dimensions](https://docs.holybro.com/autopilot/pix32-v6/dimensions)

## Voltage Ratings

_Pix32 v6_ can be triple-redundant on the power supply if three power sources are supplied. The three power rails are: **USB**, **POWER1**, **POWER2** (N/A on Pix32 v6 Mini-Baseboard) .

**Normal Operation Maximum Ratings**

Under these conditions all power sources will be used in this order to power the system:

1. **POWER1** and **POWER2** inputs (4.9V to 5.5V)
1. **USB** input (4.75V to 5.25V)

**Absolute Maximum Ratings**

Under these conditions the system will not draw any power (will not be operational), but will remain intact.

1. **POWER1** and **POWER2** inputs (operational range 4.1V to 5.7V, 0V to 10V undamaged)
1. **USB** input (operational range 4.1V to 5.7V, 0V to 6V undamaged)
1. Servo input: VDD_SERVO pin of **FMU PWM OUT** and **I/O PWM OUT** (0V to 42V undamaged)

**Voltage monitoring**

Pix32 v6 uses analog power modules.

Holybro makes various analog [power modules](../power_module/index.md) for different need.

- [PM02 Power Module](../power_module/holybro_pm02.md)
- [PM06 Power Module](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
- [PM07 Power Module](../power_module/holybro_pm07_pixhawk4_power_module.md)

## Building Firmware

:::tip
Most users will not need to build this firmware! It is pre-built and automatically installed by _QGroundControl_ when appropriate hardware is connected.
:::

To [build PX4](../dev_setup/building_px4.md) for this target:

```
make px4_fmu-v6c_default
```

<a id="debug_port"></a>

## Debug Port

The [PX4 System Console](../debug/system_console.md) and [SWD interface](../debug/swd_debug.md) run on the **FMU Debug** port.

The pinouts and connector comply with the [Pixhawk Debug Full](../debug/swd_debug.md#pixhawk-debug-full) interface defined in the [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) interface (JST SM10B connector).

| Pin      | Сигнал           | Volt  |
| -------- | ---------------- | ----- |
| 1 (red)  | `Vtref`          | +3.3V |
| 2 (blk)  | Console TX (OUT) | +3.3V |
| 3 (blk)  | Console RX (IN)  | +3.3V |
| 4 (blk)  | `SWDIO`          | +3.3V |
| 5 (blk)  | `SWCLK`          | +3.3V |
| 6 (blk)  | `SWO`            | +3.3V |
| 7 (blk)  | NFC GPIO         | +3.3V |
| 8 (blk)  | PH11             | +3.3V |
| 9 (blk)  | nRST             | +3.3V |
| 10 (blk) | `GND`            | GND   |

For information about using this port see:

- [SWD Debug Port](../debug/swd_debug.md)
- [PX4 System Console](../debug/system_console.md) (Note, the FMU console maps to USART3).

## Периферія

- [Digital Airspeed Sensor](https://holybro.com/products/digital-air-speed-sensor)
- [Telemetry Radio Modules](https://holybro.com/collections/telemetry-radios?orderby=date)
- [Rangefinders/Distance sensors](../sensor/rangefinders.md)

## Підтримувані платформи / Airframes

Any multicopter / airplane / rover or boat that can be controlled with normal RC servos or Futaba S-Bus servos. The complete set of supported configurations can be seen in the [Airframes Reference](../airframes/airframe_reference.md).

## Подальша інформація

- [Holybro Docs](https://docs.holybro.com/) (Holybro)
- [Reference: Pixhawk 6C Wiring QuickStart](../assembly/quick_start_pixhawk6c.md)
- [PM02 Power Module](../power_module/holybro_pm02.md)
- [PM06 Power Module](../power_module/holybro_pm06_pixhawk4mini_power_module.md)
- [PM07 Power Module](../power_module/holybro_pm07_pixhawk4_power_module.md)
- [FMUv6C reference design pinout](https://docs.google.com/spreadsheets/d/1FcmWRKd6zjdz3-cnjEDYEmANKZOFzNSc/edit?usp=sharing&ouid=113251442407318461574&rtpof=true&sd=true).
- [Pixhawk Connector Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf).
