---
canonicalUrl: https://docs.px4.io/main/tr/sensor/airspeed
---

# Airspeed Sensors

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames. They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)


## Hardware Options

Recommended digital airspeed sensors include:
* Based on [Pitot tube](https://en.wikipedia.org/wiki/Pitot_tube)
  * MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html), [MS5525](https://www.te.com/usa-en/product-CAT-BLPS0003.html))
    * [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
    * [Digital Differential Airspeed Sensor Kit](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).
  * [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems)
  * [Sensirion SDP3X Differential Pressure Sensor]([https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/](https://store-drotek.com/848-sdp3x-airspeed-sensor-kit-sdp33.html))
  * [Holybro Digital Air Speed Sensor](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)
* Based on [Venturi effect](https://en.wikipedia.org/wiki/Venturi_effect)
  * [TFSLOT](./airspeed_tfslot.md) Venturi effect airspeed sensor.

All the above sensors are connected via the I2C bus/port.

:::note
Additionally, the [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) can be connected to the UAVCAN bus to determine not only high-accuracy airspeed, but also true static pressure and air temperature via onboard barometer and an OAT probe.
:::


## Configuration

### Enable Airspeed Sensors

Unlike most other sensor drivers, the airspeed sensor drivers are not automatically started.

Enable each type using its [corresponding parameter](../advanced_config/parameters.md):
- Sensirion SDP3X ([SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X))
- TE MS4525 ([SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO))
- TE MS5525 ([SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS))
- Eagle Tree airspeed sensor ([SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD))

### Calibration

Airspeed calibration information can be found in: [Basic Configuration > Airspeed](../config/airspeed.md).


## Developer Information

- [Airspeed drivers](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/drivers/differential_pressure) (source code)
