---
canonicalUrl: https://docs.px4.io/main/ko/getting_started/sensor_selection
---

# 센서

PX4 시스템은 안정화나 자율제어를  위하여 센서를 사용하여 기체의 상태를 파악합니다. 기체 상태에는 위치, 고도, 방향, 속도, 대기 속도, 방향, 회전 속도 및 배터리 잔량 등이 있습니다.

자이로스코프, 가속도 센서, 지자기 센서와 기압 센서는 *시스템 구동을 위한 최소 요구 사항*입니다. 자동 [모드](../getting_started/flight_modes.md#categories)와  기타 모드에는 GPS나 이와 유사한 위치 확인 시스템이 요구됩니다. 고정익과 수직이착륙기에는 대기속도 센서가 필요합니다.

[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 비행 콘트롤러에 최소한의 센서들이 내장되어 있습니다. 필요한 센서들을 콘트롤러에 추가할 수 있습니다.

아래에서 주요  센서들에 대하여 설명합니다. 마지막에는, [센서 배선 방법](#wiring)에 관한 자료들을 설명합니다.


<span id="gps_compass"></span>
## GPS와 나침반

PX4는 다양한 GNSS(Global Navigation Satellite System) 수신기와 나침반(자기계)을 지원합니다. PX4는 센티미터 정밀도를 가진  GPS 시스템인  [실시간 운동학(RTK) GPS 수신기](../gps_compass/rtk_gps.md)를 지원합니다.

:::note
[픽스호크 시리즈](../flight_controller/pixhawk_series.md) 콘트롤러에는 *내부* 나침반이 포함되어 있습니다. Pixhawk를 배터리나 전선에서 가능하면 멀리 장착하여 전자기 간섭을 최소화하는 것이 좋습니다. 소형 운송체에서는 대부분 외부 나침반이 필수 요구사항입니다. :::

나침반이나 GPS 수신기는 모터나 ESC 전원에서 가능한 멀리 장착하여 사용하는 것이 좋습니다. 일반적으로 받침대나 고정 날개에 설치하는 것이 좋습니다.

GPS와 나침반의 일반적인 옵션은 [GPS 및 나침반](../gps_compass/README.md)을 참고하십시오.

![GPS/나침반](../../assets/hardware/gps/gps_compass.jpg)


## 대기속도  센서

고정익과 VTOL에는 대기속도센서를 *사용*이 적극 권장됩니다.

자동조종장치에는 실속을 감지하는 다른 수단이 없으므로,  비행 속도 측정은는 매우 중요합니다. 고정익의 양력을 발생시키는 것은 대지속도가 아니라 대기속도입니다.

![디지털 대기 센서](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

더 자세한 정보와 권장 하드웨어는 [대기속도 센서](../sensor/airspeed.md)를 참고하십시오.

## 타코미터

타코미터([회전 카운터 센서](https://en.wikipedia.org/wiki/Tachometer#In_automobiles,_trucks,_tractors_and_aircraft))는 자동조종장치의 실속 또는 다른 로터 고장을 감지할 수 있기 때문에 로터 윙 프레임에서 *적극 권장*됩니다. 로터 윙 비행의 경우 양력을 발생시키는 것은 대지속도나 지면 속도가 아닌 블레이드의 회전입니다.

![디지털 RPM 센서-TFRPM01A](../../assets/hardware/sensors/tfrpm/tfrpm01_electronics.jpg)

더 자세한 정보와 권장되는 하드웨어는 [센서 &gt; 타코미터](../sensor/tachometers.md)편을 참고하십시오.


## 거리 센서

정확한 착지, 장애물 회피와 등고 비행 등을 위하여 거리 센서가 필요합니다.

여러가지 기술을 사용하여 다양한 범위와 기능을 지원하는 저렴한 거리 센서를 PX4에서 지원합니다. 더 자세한 정보는 [거리 센서](../sensor/rangefinders.md)를 참고하십시오.

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## 광류 센서

[광류 센서](../sensor/optical_flow.md)는 속도 추정을 위하여 하향 카메라와 하향 거리 센서를 사용합니다. PX4는 센서 데이터와 다른 위치 정보(예 : GPS)를 연계하여 정확한 위치를 측정합니다. 광류 센서는 GPS 신호가 잡히지 않는 실내에서도 사용할 수 있습니다.

![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

다른 옵션들은 다음과 같습니다:
- 통합 소나 센서가있는 [ PX4Flow ](../sensor/px4flow.md) 기반 유량 센서.
- 광학 마우스 트랙 패드와 유사한 센서가있는 [ PMW3901 ](../sensor/pmw3901.md) 기반 유량 센서


<span id="wiring"></span>
## 센서 배선

센서들의 배선 방법는 일반적으로 비행 콘트롤러나 센서 제조사에서 매뉴얼로 제공합니다.

추가:
* [기초 초립법](../assembly/README.md)에는 비행 콘틀롤러에 관한 시작 가이드가 포함되어 있습니다. 특정 비행 콘트롤러의 주요 센서들의 배선 방법을 설명합니다.
* [비행 콘트롤러](../flight_controller/README.md) 항목에서는 배선 정보를 설명합니다.
* [ 주변 하드웨어 ](../peripherals/README.md)에는 주요 센서들에 대하여 설명합니다.
