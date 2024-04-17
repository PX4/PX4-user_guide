# Барометр

Барометри вимірюють атмосферний тиск і використовуються в дронах як датчики висоти.

Більшість [контролерів польоту](../flight_controller/index.md), на яких працює PX4, включають барометр. За замовчуванням PX4 вибере барометр з найвищим пріоритетом (якщо він є), і налаштує його як джерело даних для [Оцінки висоти](../advanced_config/tuning_the_ecl_ekf.md#height). Якщо виявлено несправність датчика, PX4 перейде на наступний за пріоритетом датчик.

Зазвичай барометри не потребують налаштування користувачем (або думки)!

## Налаштування обладнання

[Стандартні контролери польоту Pixhawk](../flight_controller/autopilot_pixhawk_standard.md) включають барометр, як і [багато інших](../flight_controller/index.md).

Вони також присутні в іншому обладнанні:

- [CUAV NEO 3 Pro GNSS module](https://doc.cuav.net/gps/neo-series-gnss/en/neo-3-pro.html#key-data) ([MS5611](../modules/modules_driver_baro.md#ms5611))

На момент написання водії/частини включають: bmp280, bmp388 (та BMP380), dps310, goertek (spl06), invensense (icp10100, icp10111, icp101xx, icp201xx), lps22hb, lps25h, lps33hw, maiertek (mpc2520), mpl3115a2, ms5611, ms5837, tcbp001ta.

Зверніть увагу, що підтримувані номери частин барометра можуть бути виведені зі списків драйверів, перерахованих у документації [Довідник модулів: Baro (Драйвер)](../modules/modules_driver_baro.md) (та вихідний код драйвера: [PX4-Autopilot/src/drivers/barometer](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer)).

## Налаштування PX4

Зазвичай барометри не потребують налаштування користувачем. Якщо потрібно, ви можете:

- Увімкнення/вимкнення барометрів як джерела даних для [Оцінки висоти](../advanced_config/tuning_the_ecl_ekf.md#height) за допомогою параметра [EKF2_BARO_CTRL](../advanced_config/parameter_reference.md#EKF2_BARO_CTRL).
- Змініть порядок вибору барометрів, використовуючи параметри [CAL_BAROx_PRIO](../advanced_config/parameter_reference.md#CAL_BARO0_PRIO) для кожного барометра.
- Вимкніть барометр, встановивши його значення [CAL_BAROx_PRIO](../advanced_config/parameter_reference.md#CAL_BARO0_PRIO) на `0`.

## Калібрування

Барометри не потребують калібрування.


<!-- Notes:
- Absolute value isn't important since we just use the difference in altitude between "now" and the value when initializing EKF2
- There is usually a scale factor error but it's compensated by the GNSS altitude using a bias estimator in EKF2 (we don't provide a way to calibrate that). This method is fine as long as the height change of the drone isn't too fast (below 200-300km/h probably; don't have real data on that).
- The baro readings can be corrected using a param SENS_BARO_QNH (https://en.wikipedia.org/wiki/Altimeter_setting) parameter, but again, it is only necessary to adjust it if the absolute barometric altitude is required by the pilot.
-->

## Інформація для розробників

- [Вихідний код драйвера Baro](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer)
- [Довідник модулів: Барометр (Драйвер)](../modules/modules_driver_baro.md) документація.
