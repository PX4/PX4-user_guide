# 속도 센서

고정 회선 및 VTOL 프레임의 경우 속도 센서가 *을 높게 권장합니다. 자동 조종 장치에는 실속을 감지 할 수있는 다른 수단이 없으므로이 신호는 매우 중요합니다. 고정익 비행의 경우 지상 속도가 아닌 양력을 보장하는 속도입니다.</p> 

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

## 하드웨어 옵션

권장 디지털 속도 센서는 다음과 같습니다.

* MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html))
  
  * [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
  * [Digital Differential Airspeed Sensor Kit](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).

* [ EagleTree 항공 속도 MicroSensor V3 ](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (이글트리 시스템)

* [Sensirion SDP3X Differential Pressure Sensor](https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/)
* [Holybro Digital Air Speed Sensor](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)

All the above sensors are connected via the I2C bus/port.

:::note
Additionally, the [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) can be connected to the UAVCAN bus to determine not only high-accuracy airspeed, but also true static pressure and air temperature via onboard barometer and an OAT probe.
:::

## Configuration

PX4 setup information can be found in: [Basic Configuration > Airspeed](../config/airspeed.md).

## Developer Information

* [Airspeed drivers](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure) (source code)