# Датчики швидкості польоту

Сенсори швидкості в повітрі _дуже рекомендовані_ для безпілотників із фіксованим крилом та вертикального зльоту. Це важливо, туму що автопілот не має інших засобів для виявлення звалювання. Для польоту на безпілотнику з фіксованим крилом це саме швидкість у повітрі, що забезпечує зліт, а не швидкість на землі!

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

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

:::note

Додатково, [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) може бути підключений до CAN шини, щоб визначити не лише високоточну швидкість у повітрі, але й справжній статичний тиск і температуру повітря за допомогою вбудованого барометра та датчика температури повітря.

:::

## Конфігурація

### Увімкнення датчиків швидкості у повітрі

Драйвери датчика швидкості в польоті не запускаються автоматично. Увімкніть кожен тип, використовуючи його [відповідний параметр](../advanced_config/parameters.md):

- **Sensirion SDP3X:** [SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X)
- **TE MS4525:** [SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO)
- **TE MS5525:** [SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS)
- **Датчик швидкості в повітрі Eagle Tree:** [SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD)

You should also check [ASPD_PRIMARY](../advanced_config/parameter_reference.md#ASPD_PRIMARY) is `1` (see next section - this is the default).

### Multiple Airspeed Sensors

If you have multiple airspeed sensors then you can select which sensor is _preferred_ as the primary source using [ASPD_PRIMARY](../advanced_config/parameter_reference.md#ASPD_PRIMARY), where `1`, `2` and `3` reflect the order in which the airspeed sensors were started:

- `-1`: Disabled (no airspeed information used).
- `0`: Synthetic airspeed estimation (groundspeed minus windspeed)
- `1`: First airspeed sensor started (default)
- `2`: Second airspeed sensor started
- `3`: Third airspeed sensor started

The airspeed selector validates the indicated sensor _first_ and only falls back to other sensors if the indicated sensor fails airspeed checks ([ASPD_DO_CHECKS](../advanced_config/parameter_reference.md#ASPD_DO_CHECKS) is used to configure the checks).

The selected sensor is then used to supply data to the estimator (EKF2). The EKF fuses the airspeed data if it's above [EKF2_ARSP_THR](../advanced_config/parameter_reference.md#EKF2_ARSP_THR) and has a low innovation compared to groundspeed minus windspeed.

### Sensor-specific Configuration

Other than enabling the sensor, sensor-specific configuration is often not required. If it is needed, it should be covered in the appropriate sensor page (for example [TFSLOT > Configuration](airspeed_tfslot.md#configuration)).

The specific configuration for sensors that do not have a separate page is listed below:

- **Sensirion SDP3X:** [CAL_AIR_CMODEL](../advanced_config/parameter_reference.md#CAL_AIR_CMODEL) (provides overview of required settings), [CAL_AIR_TUBED_MM](../advanced_config/parameter_reference.md#CAL_AIR_TUBED_MM), [CAL_AIR_TUBELEN](../advanced_config/parameter_reference.md#CAL_AIR_TUBELEN).

## Calibration

Airspeed sensors should be calibrated by following the instructions: [Basic Configuration > Airspeed](../config/airspeed.md).

## Developer Information

- [Airspeed drivers](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/differential_pressure) (source code)
