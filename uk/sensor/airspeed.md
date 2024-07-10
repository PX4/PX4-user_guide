# Датчики швидкості польоту

Сенсори швидкості в повітрі _дуже рекомендовані_ для безпілотників із фіксованим крилом та вертикального зльоту. Це важливо, туму що автопілот не має інших засобів для виявлення звалювання. Так як швидкість польоту літака відносно повітря гарантує підіймальну силу, а не швидкість відносно землі!

![Цифровий датчик швидкості польоту](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

## Варіанти устаткування

Рекомендовані цифрові сенсори швидкості в повітрі включають:

- На основі [Трубки Піто](https://en.wikipedia.org/wiki/Pitot_tube)
  - MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html), [MS5525](https://www.te.com/usa-en/product-CAT-BLPS0003.html))
    - [mRo I2C Сенсор швидкості польоту JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
    - [Цифровий диференційний датчик швидкості польоту](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).
  - [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems) <!-- link not working 20230830 -->
  - [Sensirion SDP3x Airspeed Sensor Kit](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html)
  - [Holybro Digital Air Speed Sensor](https://holybro.com/products/digital-air-speed-sensor)
- На базі [Ефекту Вентурі](https://en.wikipedia.org/wiki/Venturi_effect)
  - [TFSLOT](airspeed_tfslot.md) датчик швидкості польоту ефекту Вентурі.

Усі зазначені вище сенсори підключені через I2C bus/port.

:::info

Додатково, [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) може бути підключений до CAN шини, щоб визначити не лише високоточну швидкість у повітрі, але й справжній статичний тиск і температуру повітря за допомогою вбудованого барометра та датчика температури повітря.

:::

## Конфігурація

### Увімкнення датчиків швидкості у повітрі

Драйвери датчика швидкості в польоті не запускаються автоматично. Увімкніть кожен тип, використовуючи його [відповідний параметр](../advanced_config/parameters.md):

- **Sensirion SDP3X:** [SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X)
- **TE MS4525:** [SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO)
- **TE MS5525:** [SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS)
- **Датчик швидкості в повітрі Eagle Tree:** [SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD)

Ви також повинні перевірити [ASPD_PRIMARY](../advanced_config/parameter_reference.md#ASPD_PRIMARY) це `1` (див. наступний розділ - це значення за замовчуванням).

### Множинні датчики швидкості польоту

:::warning

Експериментальний
Використання кількох датчиків швидкості повітря є експериментальним.
:::

Якщо у вас є кілька датчиків швидкості повітря, то ви можете вибрати, який датчик є _перевідний_ як основне джерело, використовуючи [ASPD_PRIMARY](../advanced_config/parameter_reference.md#ASPD_PRIMARY), де `1`, `2` та `3` відображають порядок запуску датчиків швидкості повітря:

- `0`: Синтетична оцінка швидкості повітря (швидкість на землі мінус швидкість вітру)
- `1`: Перший датчик швидкості повітря запущено (за замовчуванням)
- `2`: Другий датчик швидкості повітря запущено
- `3`: Третій датчик швидкості повітря запущено

Селектор швидкості повітря перевіряє вказаний датчик _спочатку_ і лише переходить до інших датчиків, якщо вказаний датчик не проходить перевірку швидкості повітря ([ASPD_DO_CHECKS](../advanced_config/parameter_reference.md#ASPD_DO_CHECKS) використовується для налаштування перевірок).

Вибраний датчик потім використовується для [постачання даних оцінювачу (EKF2)](../advanced_config/tuning_the_ecl_ekf.md#airspeed) та контролерам.

### Налаштування датчика

Крім активації датчика, часто не потрібна конфігурація, специфічна для датчика. Якщо це потрібно, це повинно бути охоплено на відповідній сторінці сенсора (наприклад [TFSLOT > Configuration](airspeed_tfslot.md#configuration)).

Конкретна конфігурація для датчиків, які не мають окремої сторінки, перерахована нижче:

- **Sensirion SDP3X:** [CAL_AIR_CMODEL](../advanced_config/parameter_reference.md#CAL_AIR_CMODEL) (надає огляд необхідних налаштувань), [CAL_AIR_TUBED_MM](../advanced_config/parameter_reference.md#CAL_AIR_TUBED_MM), [CAL_AIR_TUBELEN](../advanced_config/parameter_reference.md#CAL_AIR_TUBELEN).

## Калібрування

Датчики швидкості повітря повинні бути калібровані відповідно до інструкцій: [Базова Конфігурація > Швидкість Повітря](../config/airspeed.md).

## Дивіться також

- [Використання ECL EKF > Швидкість повітря](../advanced_config/tuning_the_ecl_ekf.md#airspeed)
- [Драйвери швидкості повітря](https://github.com/PX4/PX4-Autopilot/tree/release/1.15/src/drivers/differential_pressure) (вихідний код)
- [VTOL з/без датчика швидкості повітря](../config_vtol/vtol_without_airspeed_sensor.md)
