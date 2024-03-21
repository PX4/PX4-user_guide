# Вибір політного контролера

Політний контролер - це "мізки" безпілотного апарату. PX4 може працювати на [багатьох платах політних контролерів](../flight_controller/README.md).

Вам слід обирати плату, яка відповідає фізичним обмеженням вашого апарату, видам діяльності, які ви хочете виконувати та, звичайно, за вартістю.

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_hero_upright.png" width="130px" title="Holybro Pixhawk6X" /> <img src="../../assets/flight_controller/cuav_pixhawk_v6x/pixhawk_v6x.jpg" width="230px" title="CUAV Pixhawk 6X"  /> <img src="../../assets/flight_controller/cube/orange/cube_orange_hero.jpg" width="300px" title="CubePilot Cube Orange" />


## Pixhawk Series

[Pixhawk Series](../flight_controller/pixhawk_series.md) - це апаратні (hardware) політні контролери з відкритим доступом, що виконують PX4 на операційній системі NuttX. Існують версії, орієнтовані на різні потреби використання та сегменти ринку.

[Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md) використовуються як еталонна платформа PX4. Вони підтримуються та перевіряються командою розробників PX4, і є рекомендованими.

## Контролери від виробників

Інші політні контролери [підтримуються виробниками](../flight_controller/autopilot_manufacturer_supported.md). Сюди входять контролери, які значною мірою базуються на стандарті Pixhawk (але не повністю відповідають йому), та багато інших.

Зверніть увагу, що контролери, які підтримуються виробниками, можуть бути настільки ж "хорошими" (або навіть кращими), ніж ті, що є Pixhawk-стандартом.

## Autopilots для завдань з інтенсивними обчисленнями

Спеціалізовані політні контролери, такі як Pixhawk, зазвичай не дуже добре підходять для обчислень або виконання завдань з інтенсивними обчисленнями. Для збільшення обчислювальної потужності найпоширенішим підходом є запуск таких аплікацій на окремому бортовому [супутньому (companion) комп'ютері](../companion_computer/README.md).

Інтегровані рішення по супутнім комп'ютерам/політним контролерам включають:

- [Holybro Pixhawk RPI CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)
- Інші опції в [Супутній (companion) комп'ютер> Інтегровані супутні плати / плати політного контролера](../companion_computer/README.md#integrated-companion-flight-controller-boards)


PX4 також може нативно виконуватися на Raspberry Pi (цей підхід зазвичай не вважається таким же "надійним", як використання окремого супутнього комп'ютера):

- [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md)


## Комерційні БПЛА, які можуть працювати з PX4

PX4 доступний для багатьох популярних комерційних дронів, включаючи ті, що поставляються з PX4, і ті, які можна оновити до PX4 (що дозволяє додати планування місій та інші режими польоту PX4 на вашому апараті).

Для отримання додаткової інформації див. [Готові до використання рухомі засоби](../complete_vehicles/README.md).

