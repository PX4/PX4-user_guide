# Pixhawk Autopilot Bus & Carriers

[Pixhawk Autopilot Bus (PAB) Standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-010%20Pixhawk%20Autopilot%20Bus%20Standard.pdf) надає стандартний дизайн інтерфейсу, який дозволяє використовувати будь-який сумісний політний контролер Pixhawk як "plug-and-play" з будь-якою сумісною базовою платою.

Ця модульність полегшує інтеграцію політних контролерів в різні конструкції system-on-module. Наприклад, PAB означає, що ви можете використовувати той самий апаратний політний контролер на більш компактній платі з меншою кількістю виводів або на платі, яка інтегрується з супутнім комп'ютером, тощо.

Наступні носії та політні контролери відповідають вимогам PAB і, отже, можуть використовуватися взаємозамінно.

::: info
Розділ "Механічний дизайн" стандарту містить конкретні рекомендації щодо механічної сумісності між вендорами. Політні контролери та базові порти, перераховані тут, очікуються бути сумісними з усіма рекомендаціями.
:::

## PAB сумісні носії

- [ARK Electronics Pixhawk Autopilot Bus Carrier](../flight_controller/arkpab.md)
- [Holybro Pixhawk Standard Baseboard](https://holybro.com/products/pixhawk-baseboards)
- [Holybro Pixhawk Mini Baseboard](https://holybro.com/products/pixhawk-baseboards)
- [Holybro Pixhawk RPi CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md) (інтегрована плата супутнього / політного контролера)

## PAB сумісні політні контролери

- [ARK Electronics ARKV6X](../flight_controller/arkv6x.md)
- [Holybro Pixhawk 5X (FMUv5X)](../flight_controller/pixhawk5x.md)
- [Holybro Pixhawk 6X (FMUv6X)](../flight_controller/pixhawk6x.md)
- [CUAV Pixhawk V6X (FMUv6X)](../flight_controller/cuav_pixhawk_v6x.md)
