---
canonicalUrl: https://docs.px4.io/main/ko/sensor_bus/i2c
---

# I2C 버스 개요

I2C는 선 두가닥만 활용하여 다중 마스터 장비를 다중 슬레이브 장비와 연결할 수 있게 하는 패킷 전환 직렬 통신 프로토콜입니다. 저속 주변기기 IC 칩을 프로세서와 마이크로컨트롤러에 짧은 길이로 연결, 보드내 통신을 수행하기 위한 목적입니다.

픽스호크/PX4는 다음 용도로 이 프로토콜을 지원합니다:
* 제한적인 직렬 UART로 제공하는 데이터 전송률이 필요한 보드 결속 소자. 예: 거리 센서
* I2C만 지원하는 주변 장치와의 호환성 유지
* 단일 버스로의 다중 장치 연결 허용 (포트 절약에 유용함) 예: LED, 지자계센서, 거리센서 등.

:::tip IMUs (accelerometers/gyroscopes) should not be attached via I2C (typically the [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) bus is used). The bus is not fast enough even with a single device attached to allow vibration filtering (for instance), and the performance degrades further with every additional device on the bus.
:::

## I2C 장치 통합

드라이버는 또한 장치 형식별로 [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers)의 헤더(**drv_*.h**)가 필요합니다. 예: [drv_baro.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/drivers/drv_baro.h).

펌웨어에 드라이버를 넣으려면 보드별 cmake 파일에 빌드하려는 대상의 드라이버를 넣어야 합니다:

To include a driver in firmware you must add the driver to the board-specific cmake file that corresponds to the target you want to build for. You can do this for a single driver:
```
drivers/sf1xx
```

You can also include all drivers of a particular type.
```
distance_sensor # all available distance sensor drivers
```


:::tip
For example, you can see/search for `distance_sensor` in the [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake) configuration.
:::

## I2C 드라이버 예제

To find I2C driver examples, search for **i2c.h** in [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers).

Just a few examples are:
* [drivers/sf1xx](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/sf1xx) -  [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 I2C 드라이버.
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C(또는 SPI)로 연결하는 대기압 센서 MS5611과 MS6507용 I2C용 드라이버.
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C Driver for the MS5611 and MS6507 barometric pressure sensor connected via I2C (or SPI).

## 추가 정보

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (위키피디아) - 영문
* [I2C 비교 개요](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [드라이버 프레임워크](../middleware/drivers.md)
