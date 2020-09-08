# Airspeed Sensors

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames. They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

## Hardware Options

Recommended digital airspeed sensors include:

* MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html))
  
  * [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/mro-classy-arspd-mr.htm) (mRo store)
  * [Digital Differential Airspeed Sensor Kit](https://drotek.com/shop/en/airspeed/793-digital-differential-airspeed-sensor-kit-.html?search_query=airspeed&results=6) (Drotek).

* [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems)

* [mRo Next-Gen MS5525 Airspeed Sensor](https://store.mrobotics.io/mRo-Next-Gen-MS5525-Airspeed-Sensor-NEW-p/mro-ms5525v2-mr.htm)
* [Sensirion SDP3X Differential Pressure Sensor](https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/)
* [Holybro Digital Air Speed Sensor](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)

All the above sensors are connected via the I2C bus/port.

> **Note** Additionally, the [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/) can be connected to the UAVCAN bus to determine not only high-accuracy airspeed, but also true static pressure and air temperature via onboard barometer and an OAT probe.

## 配置

PX4 setup information can be found in: [Basic Configuration > Airspeed](../config/airspeed.md).

## 开发人员信息

* [Airspeed drivers](https://github.com/PX4/Firmware/tree/master/src/drivers/differential_pressure) (source code)