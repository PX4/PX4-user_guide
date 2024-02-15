# Вибір польотного контролера

Польотний контролер - це "мізки" безпілотного апарату. PX4 може працювати на [багатьох платах польотних контролерів](../flight_controller/README.md).

Вам слід обирати плату, яка відповідає фізичним обмеженням вашого апарату, видам діяльності, які ви хочете виконувати та, звичайно, за вартістю.

<img src="../../assets/flight_controller/pixhawk6x/pixhawk6x_hero_upright.png" width="130px" title="Holybro Pixhawk6X" /> <img src="../../assets/flight_controller/cuav_pixhawk_v6x/pixhawk_v6x.jpg" width="230px" title="CUAV Pixhawk 6X"  /> <img src="../../assets/flight_controller/cube/orange/cube_orange_hero.jpg" width="300px" title="CubePilot Cube Orange" />


## Pixhawk Series

[Pixhawk Series](../flight_controller/pixhawk_series.md) - це апаратне забезпечення з відкритим доступом, яке запускає PX4 на ОС NuttX. Завдяки багатьом форм-факторам, існують версії, орієнтовані на різні випадки використання та сегменти ринку.

[Pixhawk Standard Autopilots](../flight_controller/autopilot_pixhawk_standard.md) використовуються як еталонна платформа PX4. Вони підтримуються та перевіряються командою розробників PX4, і є рекомендованими.

## Контролери з підтримкою виробника

Інші контролери польоту [підтримуються виробником](../flight_controller/autopilot_manufacturer_supported.md). Сюди входять ПК (польотні контролери), які значною мірою базуються на стандарті Pixhawk (але не повністю відповідають йому), та багато інших.

Зверніть увагу, що контролери, які підтримуються виробником, можуть бути настільки ж "хорошими" (або навіть кращими), ніж ті, що є Pixhawk-стандартом.

## Autopilots для завдань з інтенсивними обчисленнями

Спеціалізовані контролери польоту, такі як Pixhawk, зазвичай не дуже добре підходять для обчислень загального призначення або виконання завдань з інтенсивними обчисленнями. Для збільшення обчислювальної потужності найпоширенішим підходом є запуск цих програм на окремому бортовому [комп'ютері-компаньйоні](../companion_computer/README.md).

Інтегровані рішення для комп'ютера-компаньйона/контролера польоту:

- [Holybro Pixhawk RPI CM4 Baseboard](../companion_computer/holybro_pixhawk_rpi_cm4_baseboard.md)
- Інші опціїї в [компьютер-компаньйон> Інтегровані Компаньойни/Плати управління польотами](../companion_computer/README.md#integrated-companion-flight-controller-boards)


PX4 також може працювати на Raspberry Pi (цей підхід зазвичай не вважається таким же "надійним", як використання окремого компаньйона):

- [Raspberry Pi 2/3 Navio2](../flight_controller/raspberry_pi_navio2.md)
- [Raspberry Pi 2/3/4 PilotPi Shield](../flight_controller/raspberry_pi_pilotpi.md)


## Комерційні БПЛА, які можуть працювати з PX4

PX4 доступний для багатьох популярних комерційних дронів, включаючи ті, що поставляються з PX4, і ті, які можна оновити до PX4 (що дозволяє додати планування місій та інші режими польоту PX4 на вашому апараті).

Для отримання додаткової інформації: [ліцензії](contribute/licenses.md).

