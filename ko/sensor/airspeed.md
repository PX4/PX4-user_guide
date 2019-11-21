# 속도 센서

고정 회선 및 VTOL 프레임의 경우 속도 센서가 *을 높게 권장합니다. 자동 조종 장치에는 실속을 감지 할 수있는 다른 수단이 없으므로이 신호는 매우 중요합니다. 고정익 비행의 경우 지상 속도가 아닌 양력을 보장하는 속도입니다.</p> 

![Digital airspeed sensor](../../images/digital_airspeed_sensor.jpg)

## 하드웨어 옵션

권장 디지털 속도 센서는 다음과 같습니다.

* MEAS Spec series (e.g. [MS4525DO](https://www.te.com/usa-en/product-CAT-BLPS0002.html))
  
  * [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/mro-classy-arspd-mr.htm) (mRo store)
  * [Digital Differential Airspeed Sensor Kit](https://drotek.com/shop/en/airspeed/793-digital-differential-airspeed-sensor-kit-.html?search_query=airspeed&results=6) (Drotek).

* [ EagleTree 항공 속도 MicroSensor V3 ](http://www.eagletreesystems.com/index.php?route=product/product&product_id=63) (이글트리 시스템)

* [mRo 차세대 MS5525 속도 센서](https://store.mrobotics.io/mRo-Next-Gen-MS5525-Airspeed-Sensor-NEW-p/mro-ms5525v2-mr.htm)
* [Sensirion SDP3X 차압 센서](https://www.sensirion.com/en/flow-sensors/differential-pressure-sensors/worlds-smallest-differential-pressure-sensor/)
* [Holybro Digital Air Speed Sensor](https://shop.holybro.com/digital-air-speed-sensor_p1029.html)

모든 센서는 I2C 버스 / 포트를 통해 연결됩니다.

## Configuration

PX4 설정 정보는  Basic Configuration> Airspeed </ 0>에서 찾을 수 있습니다.</p> 

## Developer Information

*  대공습 드라이버 </ 0> (소스 코드)</li> </ul>