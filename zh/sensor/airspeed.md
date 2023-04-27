# 空速传感器

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames. 它们非常重要，因为自驾仪没有其他方法来检测失速。 对于固定翼飞行来说，保证升力的是空速而不是地速。

![数字空速传感器](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

## Hardware Options

Recommended digital airspeed sensors include:

- Based on [Pitot tube](https://en.wikipedia.org/wiki/Pitot_tube)
  - MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html), [MS5525](https://www.te.com/usa-en/product-CAT-BLPS0003.html))
    - [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
    - [Digital Differential Airspeed Sensor Kit](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).
  - [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems)
  - [Sensirion SDP3x Airspeed Sensor Kit](https://store-drotek.com/848-sdp3x-airspeed-sensor-kit-sdp33.html)
  - [Holybro Digital Air Speed Sensor](https://holybro.com/products/digital-air-speed-sensor)
- Based on [Venturi effect](https://en.wikipedia.org/wiki/Venturi_effect)
  - [TFSLOT](airspeed_tfslot.md) Venturi effect airspeed sensor.

All the above sensors are connected via the I2C bus/port.

:::note
Additionally, the [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) can be connected to the CAN bus to determine not only high-accuracy airspeed, but also true static pressure and air temperature via onboard barometer and an OAT probe.
:::

## 配置

### Enable Airspeed Sensors

Airspeed sensor drivers are not started automatically. Enable each type using its [corresponding parameter](../advanced_config/parameters.md):

- **Sensirion SDP3X:** [SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X)
- **TE MS4525:** [SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO)
- **TE MS5525:** [SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS)
- **Eagle Tree airspeed sensor:** [SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD)

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

## 开发人员信息

- [Airspeed drivers](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/differential_pressure) (source code)
