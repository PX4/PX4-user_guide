# CAN

[Мережа контролера (CAN)](https://en.wikipedia.org/wiki/CAN_bus) – це надійна дротова мережа, яка дозволяє компонентам дрона, таким як контролер польоту, ESC, датчики та інші периферійні пристрої, спілкуватися один з одним. Так як він розроблений, щоб бути демократичним та використовує диференційну сигналізацію, він є дуже надійним навіть на довгих кабельних ділянках (на великих транспортних засобах) і уникне виникнення однієї точки відмови. CAN також дозволяє отримання зворотного зв'язку від периферійних пристроїв та зручне оновлення прошивки через шину.

PX4 підтримує два програмні протоколи для взаємодії з пристроями CAN:

- [DroneCAN](../dronecan/README.md): PX4 recommends this for most common setups. It is well supported by PX4, is a mature product with extensive peripheral support, and has had years of testing.
- [Cyphal](https://opencyphal.org): PX4 support is a "work in progress". Cyphal is a much newer protocol which allows more flexibility and configuration, especially on larger and more complex vehicles. It has not yet seen significant adoption.

:::note
Both DroneCAN and Cyphal originate from an earlier project named UAVCAN. In 2022 the project split into two: the original version of UAVCAN (UAVCAN v0) was renamed to DroneCAN, and the newer UAVCAN v1 was renamed Cyphal. The differences between the two protocols are outlined in [Cyphal vs. DroneCAN](https://forum.opencyphal.org/t/cyphal-vs-dronecan/1814).
:::

:::warning
У PX4 немає підтримки інших програмних протоколів CAN для безпілотних літальних апаратів, таких як KDECAN (на момент написання).
:::

## Wiring

Проводка для мереж CAN однакова як для DroneCAN, так і для Cyphal/CAN (фактично, для всіх мереж CAN).

Devices are connected in a chain in any order. At either end of the chain, a 120Ω termination resistor should be connected between the two data lines. Польотні контролери та деякі модулі GNSS мають вбудовані резистори завершення для зручності, тому їх слід розміщувати на протилежних кінцях ланцюга. Otherwise, you can use a termination resistor such as [this one from Zubax Robotics](https://shop.zubax.com/products/uavcan-micro-termination-plug?variant=6007985111069), or solder one yourself if you have access to a JST-GH crimper.

Наступна діаграма показує приклад шини CAN, що з'єднує автопілот з 4 контролерами ESC CAN та GNSS.

![CAN Wiring](../../assets/can/uavcan_wiring.svg)

The diagram does not show any power wiring. Для підтвердження, чи компоненти потребують окремого живлення, чи можуть бути живлені від самої шини CAN, звертайтеся до інструкцій виробника.

For more information, see [Cyphal/CAN device interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (kb.zubax.com). While the article is written with the Cyphal protocol in mind, it applies equally to DroneCAN hardware and any other CAN setup. For more advanced scenarios, consult with [On CAN bus topology and termination](https://forum.opencyphal.org/t/on-can-bus-topology-and-termination/1685).

### Connectors

Pixhawk standard compatible CAN devices use 4 pin JST-GH connectors for CAN. Для підключення в ланцюг використовуються два роз'єми: для введення і виведення (крім контролерів польоту та деяких пристроїв GNSS з вбудованим завершенням, які мають лише один роз'єм JST-GH).

Other (non-Pixhawk compatible) devices may use different connectors. However, as long as the device firmware supports DroneCAN or Cyphal, it can be used.

### Redundancy

DroneCAN and Cyphal/CAN support using a second (redundant) CAN interface. This is completely optional but increases the robustness of the connection. All Pixhawk flight controllers come with 2 CAN interfaces; if your peripherals support 2 CAN interfaces as well, it is recommended to wire both up for increased safety.

## Прошивка

CAN peripherals may run proprietary or open source firmware (check manufacturer guides to confirm the required setup).

PX4 can be built to run as open-source DroneCAN firmware on supported CAN hardware. See [PX4 DroneCAN Firmware](../dronecan/px4_cannode_fw.md) for more information.

## Підтримка та конфігурація

[DroneCAN Setup and Configuration](../dronecan/README.md)

[PX4 DroneCAN Firmware](../dronecan/px4_cannode_fw.md)

## Відео

### DroneCAN

Intro to DroneCAN (UAVCANv0) and practical example with setup in QGroundControl:

@[youtube](https://youtu.be/IZMTq9fTiOM)

### Cyphal

UAVCAN v1 for drones — PX4 Developer Summit Virtual 2020

@[youtube](https://youtu.be/6Bvtn_g8liU)

---

Getting started using UAVCAN v1 with PX4 on the NXP UAVCAN Board — PX4 Developer Summit Virtual 2020 @[youtube](https://youtu.be/MwdHwjaXYKs)

---

UAVCAN: a highly dependable publish-subscribe protocol for hard real-time intra-vehicular networking — PX4 Developer Summit Virtual 2019

@[youtube](https://youtu.be/MBtROivYPik)
