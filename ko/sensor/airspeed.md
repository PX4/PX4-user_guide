---
canonicalUrl: https://docs.px4.io/main/ko/sensor/airspeed
---

# 풍속 센서

고정 회선 및 VTOL 프레임의 경우 속도 센서가 *을 높게 권장합니다. 자동 조종 장치에는 실속을 감지 할 수있는 다른 수단이 없으므로이 신호는 매우 중요합니다. 고정익 비행의 경우 지상 속도가 아닌 양력을 보장하는 속도입니다.</p> 

![디지털 풍속 센서](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

## 하드웨어 옵션

권장 디지털 속도 센서는 다음과 같습니다.

* MEAS 사양 시리즈 (예: [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html))
  
  * [mRo I2C 풍속 센서 JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/m10030a.htm) (mRo store)
  * [디지털 차동 풍속 센서 키트](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html) (Drotek).

* [EagleTree Airspeed MicroSensor V3](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (eagletreesystems)

* [Sensirion SDP3X 차압 센서](https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/)
* [Holybro 디지털 풍속 센서](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)

위의 센서들은 I2C 버스/포트를 통해 연결됩니다.

:::note
또한, [Avionics Anonymous Air Data Computer](https://www.tindie.com/products/avionicsanonymous/uavcan-air-data-computer-airspeed-sensor/)를 UAVCAN 버스에 연결하여 고정밀 대기 속도뿐만 아니라 온보드 기압계와 OAT 프로브를 통해 실제 정압 및 대기 온도를 확인할 수 있습니다.
:::

## 설정

PX4 설정 방법은 [기본 설정 &gt; 대기 속도](../config/airspeed.md)를 참고하십시오.

## 개발 정보

* [ Airspeed 드라이버](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure) (소스 코드)