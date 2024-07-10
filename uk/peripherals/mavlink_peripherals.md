# Пристрої MAVLink (GCS/OSD/Супутник)

Станції земного контролю (GCS), екрани на екрані (OSD), супутні комп'ютери, отримувачі ADS-B та інші периферійні пристрої MAVLink взаємодіють з PX4 за допомогою окремих потоків MAVLink, які надсилаються через різні послідовні порти.

Для налаштування того, щоб конкретний послідовний порт використовувався для трафіку MAVLink з певним периферійним пристроєм, ми використовуємо [Конфігурацію послідовного порту](../peripherals/serial_configuration.md), призначаючи один з абстрактних параметрів конфігурації "екземпляр MAVLink" в потрібний порт. Потім ми встановлюємо інші властивості каналу MAVLink, використовуючи параметри, пов'язані з обраним екземпляром MAVLink, щоб вони відповідали вимогам нашого конкретного периферійного пристрою.

Найбільш актуальні параметри описані нижче (повний набір перераховано в [Посилання на параметри >  MAVLink](../advanced_config/parameter_reference.md#mavlink)).

## Екземпляри MAVLink

Для того щоб призначити певний периферійний пристрій до послідовного порту ми використовуємо концепцію _екземпляру MAVLink_.

Кожен екземпляр MAVLink представляє певну конфігурацію MAVLink, яку ви можете застосувати до певного порту. На момент написання визначено три екземпляри MAVLink, кожен з яких представлений параметром [MAV_X_CONFIG](#MAV_X_CONFIG), де X - 0, 1, 2.

Кожен екземпляр має пов'язані параметри, які ви можете використовувати для визначення властивостей екземпляра на цьому порту, таких як набір переданих повідомлень (див. [MAV_X_MODE](#MAV_X_MODE) нижче), швидкість передачі даних ([MAV_X_RATE](#MAV_X_RATE)), чи пересилається вхідний трафік до інших екземплярів MAVLink ([MAV_X_FORWARD](#MAV_X_FORWARD)), тощо.

:::info
Інстанції MAVLink - абстрактне поняття для конкретної конфігурації MAVLink.
Число в назві нічого не означає; ви можете призначити будь-який екземпляр до будь-якого порту.
:::

Параметри для кожного екземпляру є:

- <a id="MAV_X_CONFIG"></a>[MAV_X_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) - Встановлює послідовний порт (UART) для цього екземпляру "X", де X - 0, 1, 2. Це може бути будь-який не використаний порт, наприклад: `TELEM2`, `TELEM3`, `GPS2` тощо. Для отримання додаткової інформації дивіться [Конфігурація послідовного порту](../peripherals/serial_configuration.md).
- <a id="MAV_X_MODE"></a>[MAV_X_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Вкажіть режим телеметрії / ціль (набір повідомлень для поточного екземпляра та їхню швидкість). Значення за замовчуванням:

  - _Звичайний_: Стандартний набір повідомлень для GCS.
  - _Спеціальний_ або _Магія_: Нічого (у типовій реалізації PX4 за замовчуванням). Режими можуть бути використані для тестування при розробці нового режиму.
  - _На борту_: Стандартний набір повідомлень для компаньйонного комп'ютера.
  - _OSD_: Стандартний набір повідомлень для системи OSD.
  - _Конфігурація_: Стандартний набір повідомлень та конфігурація швидкого зв'язку (наприклад, USB).
  - _Мінімальний_: Мінімальний набір повідомлень для використання з GCS, підключеним через високолатентне з'єднання.
  - _ExtVision_ або _ExtVisionMin_: Повідомлення для зовнішніх систем візуалізації (ExtVision необхідний для VIO).
  - _Іридій_: Повідомлення для [супутникової комунікаційної системи Iridium](../advanced_features/satcom_roadblock.md).

  ::: info Якщо вам потрібно знайти конкретний набір повідомлень для кожного режиму, виконайте пошук `MAVLINK_MODE_` у [/src/modules/mavlink/mavlink_main.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/mavlink/mavlink_main.cpp).
:::

:::tip
Режим визначає _типові_ повідомлення та тарифи. Підключена система MAVLink все ще може запитувати потоки/швидкості, які вона хоче, використовуючи [MAV_CMD_SET_MESSAGE_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_SET_MESSAGE_INTERVAL).
:::

- <a id="MAV_X_RATE"></a>[MAV_X_RATE](../advanced_config/parameter_reference.md#MAV_0_MODE) - Встановіть максимальну швидкість передачі даних для цього екземпляра (байт/секунду).
  - Це комбінована ставка для всіх потоків окремого повідомлення (ставки для окремих повідомлень зменшуються, якщо загальна ставка перевищує це значення).
  - За замовчуванням налаштування, як правило, буде прийнятним, але може бути зменшено, якщо телеметричний зв'язок стає насиченим і занадто багато повідомлень втрачається.
  - Значення 0 встановлює швидкість передачі даних вдвічі менше теоретичного значення.
- <a id="MAV_X_FORWARD"></a>[MAV_X_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) - Увімкніть пересилання пакетів MAVLink, отриманих поточним екземпляром, на інші інтерфейси. Це може бути використано, наприклад, для передачі повідомлень між GCS та супутнім комп'ютером, щоб GCS міг спілкуватися з камерою, підключеною до супутнього комп'ютера, яка підтримує MAVLink.

Далі вам потрібно встановити швидкість передачі для послідовного порту, який ви призначили вище (у `MAV_X_CONFIG`).

:::tip
Потрібно перезавантажити PX4, щоб параметр став доступним (тобто в QGroundControl).
:::

Використовуваний параметр буде залежати від [призначеного послідовного порту](../advanced_config/parameter_reference.md#serial) - наприклад: `SER_GPS1_BAUD`, `SER_TEL2_BAUD` і т. д. Значення, яке ви використовуєте, буде залежати від типу підключення та можливостей підключеного периферійного пристрою MAVLink.

<a id="default_ports"></a>

## Порти MAVLink за замовчуванням

### TELEM1

Порт `TELEM 1` майже завжди налаштовується за замовчуванням для потоку телеметрії GCS ("Нормальний").

Для підтримки цього існує [типове відображення послідовного порту](../peripherals/serial_configuration.md#default_port_mapping) екземпляра MAVLink 0, як показано нижче:

- [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 1`
- [MAV_0_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Normal`
- [MAV_0_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `1200` Bytes/s
- [MAV_0_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `True`
- [SER_TEL1_BAUD](../advanced_config/parameter_reference.md#SER_TEL1_BAUD) = `57600`

### TELEM2

Порт `TELEM 2` зазвичай налаштовується за замовчуванням для потоку телеметрії супутнього комп'ютера ("На борту").

Для підтримки цього існує [типове відображення послідовного порту](../peripherals/serial_configuration.md#default_port_mapping) екземпляра MAVLink 0, як показано нижче:

- [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) = `TELEM 2`
- [MAV_1_MODE](../advanced_config/parameter_reference.md#MAV_0_MODE) = `Onboard`
- [MAV_1_RATE](../advanced_config/parameter_reference.md#MAV_0_RATE)= `0` (Half maximum)
- [MAV_1_FORWARD](../advanced_config/parameter_reference.md#MAV_0_FORWARD) = `Disabled`
- [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) = `921600`

### ETHERNET

Пристрої Pixhawk 5x (і пізніші), які мають порт Ethernet, за замовчуванням налаштовані на підключення до GCS:

На цьому обладнанні є [типове відображення послідовного порту](../peripherals/serial_configuration.md#default_port_mapping) екземпляра MAVLink 2, як показано нижче:

- [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) = `Ethernet` (1000)
- [MAV_2_BROADCAST](../advanced_config/parameter_reference.md#MAV_2_BROADCAST) = `1`
- [MAV_2_MODE](../advanced_config/parameter_reference.md#MAV_2_MODE) = `0` (normal/GCS)
- [MAV_2_RADIO_CTL](../advanced_config/parameter_reference.md#MAV_2_RADIO_CTL) = `0`
- [MAV_2_RATE](../advanced_config/parameter_reference.md#MAV_2_RATE) = `100000`
- [MAV_2_REMOTE_PRT](../advanced_config/parameter_reference.md#MAV_2_REMOTE_PRT)= `14550` (GCS)
- [MAV_2_UDP_PRT](../advanced_config/parameter_reference.md#MAV_2_UDP_PRT) = `14550` (GCS)

Для отримання додаткової інформації див. : [Налаштування Ethernet PX4](../advanced_config/ethernet_setup.md)

## Дивіться також

- [Конфігурація послідовних портів](../peripherals/serial_configuration.md)
- [Налаштування Ethernet PX4 > Конфігурація послідовного порту PX4 MAVLink](../advanced_config/ethernet_setup.md#px4-mavlink-serial-port-configuration)
- [Налаштування послідовного порту](../hardware/serial_port_mapping.md)
