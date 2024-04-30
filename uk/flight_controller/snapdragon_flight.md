# Snapdragon Flight автопілот (знятий з виробництва)

<Badge type="error" text="Discontinued" />

:::warning
Польотний автопілот Snapdragon був [знятий з виробництва](../flight_controller/autopilot_experimental.md) і більше не є комерційно доступним. Для отримання інформації про те, як він використовується/використовувався, див. [PX4 Посібник користувача v1.11](https://docs.px4.io/v1.11/en/flight_controller/snapdragon_flight.html)

PX4 не розробляє цей (або будь-який інший) автопілот. Зверніться до [виробника](https://www.intrinsyc.com/) щодо підтримки апаратного забезпечення чи питань відповідності вимогам.
:::

Платформа _Qualcomm Snapdragon Flight_ - це висококласний автопілот / бортовий комп'ютер, який запускає стек PX4 Flight Stack на DSP в операційній системі реального часу QuRT з використанням [DSPAL API](https://github.com/ATLFlight/dspal) для сумісності з POSIX. У порівнянні з [Pixhawk](../flight_controller/pixhawk.md) він має камеру і WiFi, високу обчислювальну потужність і різні типи вводу-виводу.

![Snapdragon Hero Doc](../../assets/hardware/snapdragon/hardware-snapdragon.jpg)
