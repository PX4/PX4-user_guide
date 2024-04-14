# Телеметрія CRSF (TBS Crossfire Telemetry)

CRSF є телеметричним протоколом, який може бути використаний як для [RC керування](../getting_started/rc_transmitter_receiver.md), так і для отримання телеметричної інформації з транспортного засобу/контролера польоту на сумісному RC передавачі.

Протокол був розроблений [Team BlackSheep](https://www.team-blacksheep.com/) для їхньої системи керування RC Crossfire, але також використовується системами керування RC [ExpressLRS (ELRS)](https://www.expresslrs.org/). Це бідирекціональний протокол, який потребує лише одного UART для обміну даними як з RC, так і з телеметрією.

Підтримувані телеметричні повідомлення перераховані [тут](#telemetry-messages), і включають: режим польоту, рівень заряду батареї, дані GPS, сила сигналу RC, швидкість, висота тощо.

::: info
Якщо вам не потрібна телеметрія, ви можете підключити TBS Crossfire до порту `RCIN` та налаштувати приймач на використання S.BUS. Системи радіозв'язку Crossfire також можуть бути використані як [Телеметричні радіо](../telemetry/index.md).
:::

:::warning
PX4 не включає підтримку протоколу CRSF за замовчуванням. Нижче наведені [інструкції](#px4-configuration) пояснюють, як побудувати та завантажити власну прошивку PX4, яка містить необхідні модулі.
:::

## Налаштування системи радіо

Для використання телеметрії CRSF вам знадобиться [радіосистема TBS Crossfire](#tbs-radio-systems) або [радіосистема ExpressLRS](#expresslrs-radio-systems), яка включає в себе [керування RC](#rc-controllers) з передавачем та приймачем (від того ж виробника).

::: info
Історично радіокерована система RC складалася з контролера на землі, який передавав сигнал отримувачу на транспортному засобі. Навіть якщо багато радіосистем зараз є двосторонніми, земельний модуль все ще може називатися передавачем, а повітряний блок може називатися приймачем.
:::

Зазвичай вам потрібно окремо налаштувати та сконфігурувати передавач та приймач, а потім _прив'язати_ їх разом.

Трансмітер може бути неот'ємною частиною [керування RC](#rc-controllers), або це може бути окремий модуль, який ви вставляєте в контролер. Якщо це окремий модуль, то вам може знадобитися також оновити програмне забезпечення модуля на передавачі на прошивку, яка підтримує CRSF, таку як OpenTX або EdgeTx. У обох випадках вам потрібно налаштувати передавач для активації CRSF.

Ресивер має бути [wired](#wiring) в витрачений порт (UART) на авіаперехоплювачу польоту. Потім ви можете _зв'язати_ передавач та приймач разом.

Інструкції для вищезазначених кроків описані в

- [Посібник TBS Crossfire](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf)
- [Express LRS: Швидкий старт](https://www.expresslrs.org/quick-start/getting-started/)

### Підключення

TX і RX на обраному екрані контролю польоту потрібно підключитися до окремих каналів на приймачі. Сигнал зазвичай є неінвертованим і може бути підключений безпосередньо (в кабелі не потрібна додаткова логіка інвертора). Вам слід перевірити посібник для вашого конкретного приймача, однак!

#### Проводка приймача TBS

Для приймачів TBS ви підключаєте UART і приймач FC, як показано (це передбачає TBS Nano RX).

| FC UART | Nano RX |
| ------- | ------- |
| TX      | Ch2     |
| RX      | Ch1     |

#### Проводка приймача ExpressLRS

Для приймачів ExpressLRS підключіть дріт до UART контролера польоту, як показано нижче (проводка детально описана [тут](https://www.expresslrs.org/quick-start/receivers/wiring-up/)):

| FC UART | ExpressLRS |
| ------- | ---------- |
| TX      | RX         |
| RX      | TX         |
| VCC     | VCC        |
| GND     | GND        |

## Конфігурація PX4

### Конфігурація прошивки/збірка

Підтримка телеметрії CRSF не включена в жодне ПЗ PX4 за замовчуванням. Для використання цієї функції вам потрібно зібрати та завантажити користувацьку прошивку, яка включає [crsf-rc](../modules/modules_driver.md#crsf-rc) та видаляє [rc_input](../modules/modules_driver.md#rc-input).

Кроки наступні:

1. [Налаштуйте середовище розробки](../dev_setup/dev_env.md) для побудови PX4.

   У рамках цього процесу ви використовуватимете `git` для отримання вихідного коду в каталог **PX4-Autopilot**.

1. Відкрийте термінал та виконайте команду `cd` в директорію `PX4-Autopilot`.

   ```sh
   cd PX4-Autopilot
   ```

1. Запустіть інструмент конфігурації плати PX4 (`menuconfig`) для вашої цілі `make` за допомогою параметру `boardconfig` (тут ціль - контролер польоту [ARK Electronics ARKV6X](../flight_controller/arkv6x.md)):

   ```sh
   make ark_fmu-v6x_default boardconfig
   ```

1. У інструменті конфігурації плати PX4:

   - Вимкніть модуль за замовчуванням `rc_input`
     1. Перейдіть до підменю `драйверів`, потім прокрутіть вниз, щоб виділити `rc_input`.
     1. Використовуйте клавішу Enter, щоб видалити `*` з прапорця `rc_input` checkbox.
   - Включити модуль `crsf_rc`
     1. Прокрутіть, щоб виділити підменю `RC`, а потім натисніть Enter, щоб відкрити його.
     1. Прокрутіть, щоб виділити `crsf_rc` і натисніть Enter, щоб увімкнути його.

   Збережіть і вийдіть з інструменту конфігурації плати PX4.

1. [Збудуйте вихідний код PX4](../dev_setup/building_px4.md) зі своїми змінами (знову, припускаючи, що ви використовуєте ARKV6X):

   ```sh
   make ark_fmu-v6x_default
   ```

Це побудує вашу власну прошивку, яку зараз потрібно завантажити на ваш контролер польоту.

### Завантаження прошивки

Щоб завантажити кастомну прошивку, спочатку підключіть ваш контролер польотів до комп’ютера розробки через USB.

Ви можете завантажити прошивку як частину процесу збірки, використовуючи параметри `upload`:

```sh
make ark_fmu-v6x_default upload
```

Альтернативно ви можете використовувати QGroundControl для встановлення прошивки, як описано в [Прошивка > Встановлення PX4 master, beta або власної прошивки](../config/firmware.md#installing-px4-main-beta-or-custom-firmware).

### Налаштування параметрів

[Знайти та встановити](../advanced_config/parameters.md) наступні параметри:

1. [RC_CRSF_PRT_CFG](../advanced_config/parameter_reference.md#RC_CRSF_PRT_CFG) - Встановити в порт, який підключений до приймача CRSF (наприклад, `TELEM1`).

   Цей [налаштує послідовний порт](../peripherals/serial_configuration.md) для використання протоколу CRSF. Зверніть увагу, що деякі послідовні порти можуть вже мати [картографування типового послідовного порту](../peripherals/serial_configuration.md#default-serial-port-configuration) або [типове картографування послідовного порту MAVLink](../peripherals/mavlink_peripherals.md#default-mavlink-ports), яке вам доведеться скасувати, перш ніж ви зможете призначити порт для CRSF. Наприклад, якщо ви хочете використовувати `TELEM1` або `TELEM2`, вам спочатку потрібно змінити [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) або [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), щоб припинити налаштування цих портів.

   Немає потреби встановлювати швидкість передачі для порту, оскільки це налаштовано драйвером.

1. [RC_CRSF_TEL_EN](../advanced_config/parameter_reference.md#RC_CRSF_TEL_EN) - Увімкніть для активації перехресної телеметрії.

### Налаштування радіо

[Налаштування керування радіо](../config/radio.md) пояснює, як відобразити палиці керування атитудою вашого пульту керування RC (крен, тангаж, розворот, газ) на канали, та калібрувати мінімальні, максимальні, обрізки та зворотні налаштування для всіх інших контролерів передавача / каналів RC.

## Контролери RC

Трансмітер може бути неот'ємною частиною керування RC, або це може бути окремий модуль, який ви вставляєте в контролер.

RC Контролери, які підтримують модулі TX TBS Crossfire та ExpressLRS:

- [FrSky Taranis X9D Plus](https://www.frsky-rc.com/product/taranis-x9d-plus-2/) має зовнішній модульний бей, який може бути використаний з передавальними модулями TBS або ExpressLRS, які сумісні з "JR module bay". Вам потрібно буде встановити програмне забезпечення OpenTX, яке підтримує CRSF, та увімкнути зовнішній модуль та CRSF.
- [Radiomaster TX16S](https://www.radiomasterrc.com/collections/tx16s-mkii) має внутрішній модуль передавача ExpressLRS. Він також має зовнішній модульний бей, який може бути використаний з передавальними модулями TBS або ExpressLRS, які сумісні з "JR module bay". Він працює як на програмному забезпеченні OpenTX, так і на програмному забезпеченні EdgeTx, кожне з яких може підтримувати CRSF.

## Радіосистеми TBS

[Системи радіо TBS Crossfire перераховані тут](https://www.team-blacksheep.com/shop/cat:cat_crossfire#product_listing). Нижче наведено кілька опцій «turnkey».

Модулі передавача:

- [TBS CROSSFIRE TX - LONG RANGE R/C TRANSMITTER](https://www.team-blacksheep.com/products/prod:crossfire_tx)

Приймачі:

- [TBS Crossfire Nano RX](http://team-blacksheep.com/products/prod:crossfire_nano_rx) - призначений для невеликих квадкоптерів.

## Системи радіо ExpressLRS

Express LRS надає керівництво з радіосистем на сторінці [Вибір обладнання](https://www.expresslrs.org/hardware/hardware-selection/). Нижче наведено кілька перевірених варіантів.

Модулі передавача:

- TBD

Приймачі:

- [ExpressLRS Matek Diversity RX](http://www.mateksys.com/?portfolio=elrs-r24).

:::note
Використовується в журналі збірки [Reptile Dragon 2](../frames_plane/reptile_dragon_2.md). Дивіться розділи [ELRS Rx](../frames_plane/reptile_dragon_2.md#elrs-rx) та [Налаштування радіо](../frames_plane/reptile_dragon_2.md#radio-setup).
:::

## Телеметричні повідомлення

Підтримуються телеметрійні повідомлення та їх джерело перераховані нижче (ця таблиця повторно створюється з [TBS Crossfire Manual: "Доступні датчики з OpenTX"](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf)).

| Datapoint | Опис                                                     | Джерела даних                    |
| --------- | -------------------------------------------------------- | -------------------------------- |
| 1RSS      | Uplink - отримана сила сигналу антени 1 (RSSI)           | TBS CROSSFIRE RX                 |
| 2RSS      | Uplink - отримана сила сигналу антени 2 (RSSI)           | TBS CROSSFIRE RX                 |
| RQly      | Uplink - якість посилання (дійсні пакети)                | TBS CROSSFIRE RX                 |
| RSNR      | Uplink - відношення сигнал/шум                           | TBS CROSSFIRE RX                 |
| RFMD      | Uplink - частота оновлення, 0 = 4Гц, 1 = 50Гц, 2 = 150Гц | TBS CROSSFIRE RX                 |
| TPWR      | Uplink - потужність передачі                             | TBS CROSSFIRE TX                 |
| TRSS      | Downlink - сила сигналу антени                           | TBS CROSSFIRE TX                 |
| TQly      | Downlink - якість посилання (дійсні пакети)              | TBS CROSSFIRE TX                 |
| TSNR      | Downlink - відношення сигнал/шум                         | TBS CROSSFIRE TX                 |
| ANT       | Датчик лише для налагодження                             | TBS CROSSFIRE TX                 |
| GPS       | GPS координати                                           | TBS GPS / FC                     |
| Alt       | GPS Висоти                                               | TBS GPS / FC                     |
| Sats      | Супутники GPS отримано                                   | TBS GPS / FC                     |
| Hdg       | Магнітна орієнтація                                      | TBS GPS / FC                     |
| RXBt      | Напруга батареї                                          | TBS GPS / FC/ CROSSFIRE RX/ CORE |
| Curr      | Поточне витягування                                      | TBS GPS / FC// CORE              |
| Capa      | Поточне споживання                                       | TBS GPS / FC/ CORE               |
| Ptch      | Кут нахилу поля FC                                       | FC                               |
| Roll      | Кут кочення FC                                           | FC                               |
| Yaw       | Кут курсу FC                                             | FC                               |
| FM        | Режим польоту                                            | FC                               |
| VSPD      | Барометр                                                 | FC                               |

## Дивіться також

- [Посібник TBS Crossfire](https://www.team-blacksheep.com/tbs-crossfire-manual.pdf)
- [Документація ExpressLRS](https://www.expresslrs.org/quick-start/getting-started/)
- [FrSky телеметрія](../peripherals/frsky_telemetry.md)
- [Налаштування керування радіо](../config/radio.md)
- [Системи управління Радіо](../getting_started/rc_transmitter_receiver.md)
