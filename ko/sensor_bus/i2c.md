# I2C 버스 개요

I2C는 선 두가닥만 활용하여 다중 마스터 장비를 다중 슬레이브 장비와 연결할 수 있게 하는 패킷 전환 직렬 통신 프로토콜입니다. 저속 주변기기 IC 칩을 프로세서와 마이크로컨트롤러에 짧은 길이로 연결, 보드내 통신을 수행하기 위한 목적입니다.

픽스호크/PX4는 다음 용도로 이 프로토콜을 지원합니다:
* 제한적인 직렬 UART로 제공하는 데이터 전송률이 필요한 보드 결속 소자. 예: 거리 센서
* I2C만 지원하는 주변 장치와의 호환성 유지
* 단일 버스로의 다중 장치 연결 허용 (포트 절약에 유용함) 예: LED, 지자계센서, 거리센서 등.

> **Tip** IMU (가속계/각속계)는 I2C에 붙이면 안됩니다 (보통 [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) 버스를 활용). 진동 필터링(예)을 하기에는 단일 장치를 붙이더라도 버스가 그렇게 빠르지 않으며 버스의 다른 추가 장치의 성능도 떨어집니다.


## I2C 장치 통합

드라이버 코드에는 반드시 `#include <drivers/device/i2c.h>` 행이 있어야 하며, 대상 하드웨어의 드라이버를 **I2C.hpp** 의 추상 기반 클래스 `I2C` 구현체로 구현해야합니다(예: NuttX 코드는 [여기](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/drivers/device/nuttx/I2C.hpp)에 있습니다).

드라이버는 또한 장치 형식별로 [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers)의 헤더(**drv_*.h**)가 필요합니다. 예: [drv_baro.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/drivers/drv_baro.h).

펌웨어에 드라이버를 넣으려면 보드별 cmake 파일에 빌드하려는 대상의 드라이버를 넣어야 합니다:
```
drivers/sf1xx
```

> **Tip** 예로써 [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake) 설정에서 이 드라이버를 보거나 검색할 수 있습니다.


## I2C 드라이버 예제

I2C 드라이버 예제를 찾아보려면 [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers)에서 **i2c.h**로 찾아보십시오.

몇가지 예제를 찾아볼 수 있습니다:
* [drivers/sf1xx](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/sf1xx) -  [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 I2C 드라이버.
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C(또는 SPI)로 연결하는 대기압 센서 MS5611과 MS6507용 I2C용 드라이버.

## 추가 정보

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (위키피디아) - 영문
* [I2C 비교 개요](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [드라이버 프레임워크](../middleware/drivers.md)
