# CAN

[Controller Area Network (CAN)](https://en.wikipedia.org/wiki/CAN_bus) is a robust wired network that allows drone components such as flight controller, ESCs, sensors, and other peripherals, to communicate with each other.
Так як він розроблений, щоб бути демократичним та використовує диференційну сигналізацію, він є дуже надійним навіть на довгих кабельних ділянках (на великих транспортних засобах) і уникне виникнення однієї точки відмови.
CAN також дозволяє отримання зворотного зв'язку від периферійних пристроїв та зручне оновлення прошивки через шину.

PX4 підтримує два програмні протоколи для взаємодії з пристроями CAN:

- [DroneCAN](../dronecan/index.md): PX4 recommends this for most common setups.
  Воно має гарну підтримку в PX4, є вже досить зрілим продуктом з широкою підтримкою периферійних пристроїв та багаторічними тестами.
- [Cyphal](https://opencyphal.org): PX4 support is a "work in progress".
  Cyphal - набагато новіший протокол, який надає більше гнучкості та конфігураційних можливостей, особливо на більших і складніших транспортних засобах.
  Він ще не отримав значного впровадження.

:::info
Both DroneCAN and Cyphal originate from an earlier project named UAVCAN.
У 2022 році проект розділився на дві частини: оригінальна версія UAVCAN (UAVCAN v0) була перейменована в DroneCAN, а нова версія UAVCAN v1 отримала назву Cyphal.
The differences between the two protocols are outlined in [Cyphal vs. DroneCAN](https://forum.opencyphal.org/t/cyphal-vs-dronecan/1814).
:::

:::warning
PX4 does not support other CAN software protocols for drones such as KDECAN (at time of writing).
:::

## Підключення

Проводка для мереж CAN однакова як для DroneCAN, так і для Cyphal/CAN (фактично, для всіх мереж CAN).

Пристрої з'єднані у ланцюжку в будь-якому порядку.
На обох кінцях ланцюга між двома лініями передачі даних слід під’єднати термінальний резистор 120 Ом.
Польотні контролери та деякі модулі GNSS мають вбудовані резистори завершення для зручності, тому їх слід розміщувати на протилежних кінцях ланцюга.
Otherwise, you can use a termination resistor such as [this one from Zubax Robotics](https://shop.zubax.com/products/uavcan-micro-termination-plug?variant=6007985111069), or solder one yourself if you have access to a JST-GH crimper.

Наступна діаграма показує приклад шини CAN, що з'єднує автопілот з 4 контролерами ESC CAN та GNSS.

![CAN Wiring](../../assets/can/uavcan_wiring.svg)

На схемі не показано електропроводку.
Для підтвердження, чи компоненти потребують окремого живлення, чи можуть бути живлені від самої шини CAN, звертайтеся до інструкцій виробника.

For more information, see [Cyphal/CAN device interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com).
Хоча стаття написана з урахуванням протоколу Cyphal, вона однаково стосується апаратного забезпечення DroneCAN і будь-яких інших налаштувань CAN.
For more advanced scenarios, consult with [On CAN bus topology and termination](https://forum.opencyphal.org/t/on-can-bus-topology-and-termination/1685).

### З’єднання

Пристрої CAN, сумісні зі стандартом Pixhawk, використовують 4-контактні роз’єми JST-GH для CAN.
Для підключення в ланцюг використовуються два роз'єми: для введення і виведення (крім контролерів польоту та деяких пристроїв GNSS з вбудованим завершенням, які мають лише один роз'єм JST-GH).

Інші пристрої (які несумісні з Pixhawk) можуть використовувати інші роз'єми.
Однак, якщо прошивка пристрою підтримує DroneCAN або Cyphal, його можна використовувати.

### Резервування

DroneCAN та Cyphal/CAN підтримують використання другого (резервного) інтерфейсу CAN.
Це абсолютно необов'язково, але збільшує надійність підключення.
Всі контролери польоту Pixhawk мають 2 інтерфейси CAN; якщо ваші пристрої також підтримують 2 інтерфейси CAN, рекомендується підключити обидва для збільшення безпеки.

## Прошивка

Периферійні пристрої CAN можуть працювати на власній пропрієтарній або відкритій прошивці (перевірте посібники виробника, щоб підтвердити потрібну настройку).

PX4 може бути зібраний для запуску як прошивка DroneCAN з відкритим вихідним кодом на підтримуваному апаратному забезпеченні CAN.
See [PX4 DroneCAN Firmware](../dronecan/px4_cannode_fw.md) for more information.

## Підтримка та конфігурація

[DroneCAN Setup and Configuration](../dronecan/index.md)

[PX4 DroneCAN Firmware](../dronecan/px4_cannode_fw.md)

## Відео

### DroneCAN

Вступ до DroneCAN (UAVCANv0) та практичні приклади з установкою в QGroundControl:

<lite-youtube videoid="IZMTq9fTiOM" title="Intro to DroneCAN (UAVCANv0) and practical example with setup in QGroundControl"/>

### Cyphal

UAVCAN v1 for drones (Cyphal) — PX4 Developer Summit Virtual 2020

<lite-youtube videoid="6Bvtn_g8liU" title="UAVCAN v1 for drones — PX4 Developer Summit Virtual 2020"/>

---

Getting started using UAVCAN v1 with PX4 on the NXP UAVCAN Board — PX4 Developer Summit Virtual 2020

<lite-youtube videoid="MwdHwjaXYKs" title="Getting started using UAVCAN v1 with PX4 on the NXP UAVCAN Board"/>

---

UAVCAN: дуже надійний протокол публікації-підписки для внутрішньоавтомобільних мереж у реальному часі — PX4 Developer Summit Virtual 2019

<lite-youtube videoid="MBtROivYPik" title="UAVCAN: a highly dependable publish-subscribe protocol for hard ..."/>
