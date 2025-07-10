---
canonicalUrl: https://docs.px4.io/main/ko/sensor/airspeed
---

# 풍속 센서

고정 회선 및 VTOL 프레임의 경우 속도 센서가 *을 높게 권장합니다. 자동 조종 장치에는 실속을 감지 할 수있는 다른 수단이 없으므로이 신호는 매우 중요합니다. 고정익 비행의 경우 지상 속도가 아닌 양력을 보장하는 속도입니다.

![디지털 풍속 센서](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)


## 하드웨어 옵션

권장 디지털 속도 센서는 다음과 같습니다.
* Based on [Pitot tube](https://en.wikipedia.org/wiki/Pitot_tube)
  * MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html), [MS5525](https://www.te.com/usa-en/product-CAT-BLPS0003.html))
    * [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
    * [Digital Differential Airspeed Sensor Kit](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).
  * [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems)
  * [Sensirion SDP3X Differential Pressure Sensor]([https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/](https://store-drotek.com/848-sdp3x-airspeed-sensor-kit-sdp33.html))
  * [Holybro Digital Air Speed Sensor](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)
* Based on [Venturi effect](https://en.wikipedia.org/wiki/Venturi_effect)
  * [TFSLOT](./airspeed_tfslot.md) Venturi effect airspeed sensor.

위의 센서들은 I2C 버스/포트를 통해 연결됩니다.

:::note
또한, [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/)를 UAVCAN 버스에 연결하여 고정밀 대기 속도뿐만 아니라 온보드 기압계와 OAT 프로브를 통해 실제 정압 및 대기 온도를 확인할 수 있습니다.
:::


## 설정

### Enable Airspeed Sensors

Unlike most other sensor drivers, the airspeed sensor drivers are not automatically started.

Enable each type using its [corresponding parameter](../advanced_config/parameters.md):
- Sensirion SDP3X ([SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X))
- TE MS4525 ([SENS_EN_MS4525DO](../advanced_config/parameter_reference.md#SENS_EN_MS4525DO))
- TE MS5525 ([SENS_EN_MS5525DS](../advanced_config/parameter_reference.md#SENS_EN_MS5525DS))
- Eagle Tree airspeed sensor ([SENS_EN_ETSASPD](../advanced_config/parameter_reference.md#SENS_EN_ETSASPD))

### Calibration

Airspeed calibration information can be found in: [Basic Configuration > Airspeed](../config/airspeed.md).


## 개발 정보

- [Airspeed drivers](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure) (source code)
