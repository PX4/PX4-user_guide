# 센서

PX4는 센서를 사용하여 기체의 상태를 결정 (자율 비행시 기체 안정화에 필수적인 과정)합니다. 차량 상태에는 위치 / 고도, 방향, 속도, 대기 속도, 방향 (태도), 다른 방향의 회전 속도, 배터리 잔량 등이 포함됩니다.

자이로스코프 센서, 가속도 센서, 지자기 센서 및 기압 센서는 * 시스템 구동을 위한 최소 요구사항입니다*. 자동 [모드](../getting_started/flight_modes.md#categories) 와 기타 모드를 사용하기 위해서는 GPS나 이와 유사한 위치 확인 시스템이 필요합니다. 고정익 및 수직이착륙기에는 대기속도 센서를 추가되어야 합니다.

최소한의 센서 세트가  Pixhawk 시리즈 < 0> 비행 제어기에 내장되어 있습니다 (다른 컨트롤러 플랫폼에도있을 수 있음). 제어기에 센서를 추가할 수 있습니다.</p> 

주요 센서에 대해 설명합니다. 마지막에는 [ 센서 배선 ](#wiring)에 대한 링크가 있습니다.

<span id="gps_compass"></span>

## GPS와 나침반

PX4는 여러 GNSS(Global Navigation Satellite System) 수신기와 나침반 (자기계)을 지원합니다. PX4는 센티미터 정밀도 GPS 시스템인 [ 실시간 운동학 (RTK) GPS 수신기 ](../gps_compass/rtk_gps.md)를 지원합니다.

:::note
픽스호크 시리즈</ 0> 제어기에는 * 내부 * 나침반이 포함되어 있습니다. Pixhawk를 가능한 배터리나 전선에서 멀리 장착하여 전자기 간섭을 최소화하는 것이 좋습니다. 대부분의 소형 운송체에서는 외부 나침반이 필수적인 요구사항입니다. :::</p> 

모터나 ESC 전원에서 가능한 멀리 떨어진 곳에 장착된 외부 나침반/GPS 수신기을 사용하는 것이 좋습니다. 일반적으로 받침대 또는 고정 날개에 설치합니다.

GPS/나침반의 일반적 옵션은 [ GPS/나침반](../gps_compass/README.md)에 기술되어 있습니다.

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

## 대기속도 센서

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../assets/hardware/sensors/airspeed/digital_airspeed_sensor.jpg)

For more information and recommended hardware see: [Airspeed Sensors](../sensor/airspeed.md).

## Tachometer

Tachometers ([revolution-counter sensors](https://en.wikipedia.org/wiki/Tachometer#In_automobiles,_trucks,_tractors_and_aircraft)) are *highly recommended* for rotor-wing frames because they allow the autopilot to detect stall or another rotor failure (for rotor-wing flight it is the rotation of blades that guarantees lift not airspeed or ground speed).

![Digital RPM Sensor - TFRPM01A](../../assets/hardware/sensors/tfrpm/tfrpm01_electronics.jpg)

For more information and recommended hardware see: [Sensors > Tachometers](../sensor/tachometers.md).

## Distance

Distance sensors are used for precision landing, object avoidance and terrain following.

PX4 supports many affordable distance sensors, using different technologies, and supporting different ranges and features. For more information see: [Distance Sensors](../sensor/rangefinders.md).

<img src="../../assets/hardware/sensors/lidar_lite/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## Optical Flow

[Optical Flow](../sensor/optical_flow.md) sensors use a downward facing camera and a downward facing distance sensor for velocity estimation. PX4 blends the sensor output with information from other position sources (e.g. GPS) to provide a more accurate position lock. This sensor can be used indoors, when no GPS signal is available.

![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

Some options include:

* [PX4Flow](../sensor/px4flow.md) based flow sensors, which have an integrated sonar sensor.
* [PMW3901](../sensor/pmw3901.md) based flow sensors, which have a sensor much like in an optical mouse trackpad.

<span id="wiring"></span>

## Sensor Wiring

Sensor wiring information is usually provided in manufacturer documentation for flight controllers and the sensors themselves.

In addition, see:

* [Basic Assembly](../assembly/README.md) contains flight controller quick start guides. These cover wiring of the core sensors to specific flight controller hardware.
* [Flight Controller](../flight_controller/README.md) topics often contain wiring information.
* [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors.