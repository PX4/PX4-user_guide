# Марсоходи (UGVs)

<LinkedBadge type="warning" text="Experimental" url="../airframes/#experimental-vehicles"/>

:::warning
Підтримка для ровера є [експериментальною](../airframes/index.md#experimental-vehicles). Волонтери та контрибютори, [внесення](../contribute/index.md) нових функцій, нових конфігурацій каркасів або інших вдосконалень дуже вітається!
:::

PX4 підтримує ровери (безпілотні наземні транспортні засоби - UGVs) з керуванням [акермана та диференційним](#rover-types).

У цьому розділі містяться журнали збірки/інструкції щодо складання та налаштування ряду UGV фреймів.

![Traxxas Rover Picture](../../assets/airframes/rover/traxxas_stampede_vxl/final_side.jpg)

## Типи Марсоходів

PX4 підтримує рухомі з використанням:

- **Диференційне керування**: напрямок контролюється шляхом руху лівих і правих коліс з різною швидкістю. Цей вид керування часто використовується на бульдозерах, танках та інших гусеничних транспортних засобах.
- **Кермування Акермана**: напрямок керування контролюється спрямуванням коліс у напрямку руху ([геометрія кермування Акермана](https://en.wikipedia.org/wiki/Ackermann_steering_geometry) компенсує той факт, що колеса на внутрішньому та зовнішньому повороті рухаються з різними швидкостями). Цей вид керування використовується на більшості комерційних транспортних засобів, включаючи автомобілі, вантажівки тощо.

Підтримувані каркаси можна переглянути в [Довіднику про планери  >  Rover(Рухавець)](../airframes/airframe_reference.md#rover).

## Як налаштувати Rover

### Конфігурація керування Акермана

Налаштування ровера з керуванням Аккермана просте:

1. У конфігурації [Airframe](../config/airframe.md) виберіть _Загальний наземний транспортний засіб_.

   ![Select Ackermann steered airframe](../../assets/config/airframe/airframe_rover_ackermann.png)

   Виберіть кнопку **Застосувати та перезапустити**.

1. Відкрийте [Конфігурацію та  & тестування приводів](../config/actuators.md) для відображення функцій керування та регулювання на виходи контролера польоту.

### Конфігурація диференційного керування

1. У конфігурації [Airframe](../config/airframe.md) виберіть або _Aion Robotics R1 UGV_, або _NXP Cup car: DF Robot GPX_

   ![Select Differential steered airframe](../../assets/config/airframe/airframe_rover_aion.png)

Виберіть кнопку **Застосувати та перезапустити**.

1. Відкрийте [Конфігурацію та & тестування приводів](../config/actuators.md) та відобразіть функції лівого та правого двигуна на виходи контролера польоту.

## Симуляція

[Класичний Газебо](../sim_gazebo_classic/index.md) надає симуляції для обох типів керування:

- Ackermann: [акерманський ровер](../sim_gazebo_classic/vehicles.md#ackermann-ugv)
- Диференціал: [роувер r1](../sim_gazebo_classic/vehicles.md#differential-ugv)

## Відео

Це відео показує [Traxxas Stampede Rover](../frames_rover/traxxas_stampede.md) (автомобіль Акермана).

<lite-youtube videoid="N3HvSKS3nCw" title="Traxxas Stampede VXL Autonomous navigation with Pixhawk Mini"/>
