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

## How to Configure a Rover

### Ackermann Steering Configuration

Setting up a rover with Ackermann steering is straightforward:

1. In the [Airframe](../config/airframe.md) configuration, select the _Generic Ground Vehicle_.

   ![Select Ackermann steered airframe](../../assets/config/airframe/airframe_rover_ackermann.png)

   Select the **Apply and Restart** button.

1. Open the [Actuators Configuration & Testing](../config/actuators.md) to map the steering and throttle functions to flight controller outputs.

### Конфігурація диференційного керування

1. У конфігурації [Airframe](../config/airframe.md) виберіть або _Aion Robotics R1 UGV_, або _NXP Cup car: DF Robot GPX_

   ![Select Differential steered airframe](../../assets/config/airframe/airframe_rover_aion.png)

Select the **Apply and Restart** button.

1. Open the [Actuators Configuration & Testing](../config/actuators.md) and map the left and right motor functions to flight controller outputs.

## Симуляція

[Класичний Газебо](../sim_gazebo_classic/index.md) надає симуляції для обох типів керування:

- Ackermann: [ackermann rover](../sim_gazebo_classic/vehicles.md#ackermann-ugv)
- Differential: [r1 rover](../sim_gazebo_classic/vehicles.md#differential-ugv)

## Відео

Це відео показує [Traxxas Stampede Rover](../frames_rover/traxxas_stampede.md) (автомобіль Акермана).

@[youtube](https://youtu.be/N3HvSKS3nCw)
