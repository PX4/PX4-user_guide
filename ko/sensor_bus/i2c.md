---
canonicalUrl: https://docs.px4.io/main/ko/sensor_bus/i2c
---

# I2C 버스 개요

I2C는 2개의 와이어로 연결하여 여러개의 마스터 장치를 여러개의 슬레이브 장치에 연결하는 패킷교환 직렬통신 프로토콜입니다. 보드내의 프로세서와 마이크로컨트롤러에서 저속 주변 장치 IC와의 근거리 통신에 사용됩니다.

픽스호크 PX4는 다음 목적으로 이 프로토콜을 사용합니다:
* 제한된 직렬 UART 보다 더 높은 데이터 속도가 필요한 장치 연결(예: 거리 측정기)
* I2C만 지원하는 주변기기 호환성
* 여러 장치를 단일 버스에 연결할 수 있습니다(포트 절약에 유용) 예: LED, 지자계센서, 거리센서 등

:::tip IMU(가속도계/자이로스코프)는 I2C로 연결하면 안 됩니다(일반적으로 [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) 버스가 사용됨). 버스는 진동 필터링 목적으로 연결된 단일 장치로 충분히 빠르지 않으며, 버스에 장치가 추가시 마다 성능이 저하됩니다.
:::

## I2C 장치 통합

드라이버는 `#include <drivers/device/i2c.h>`한 다음 추상 기본 클래스의 구현을 제공해야 합니다. 클래스는 `I2C`는 대상 하드웨어에 대하여 **I2C.hpp**에 정의되어 있습니다(즉, NuttX의 경우 [여기](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/drivers/device/nuttx/I2C.hpp)).

소수의 드라이버도 [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers)에 장치 유형(**drv_*.h**)에 대한 헤더를 포함하여야 합니다. [drv_airspeed.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/drivers/drv_airspeed.h).

펌웨어에 드라이버를 포함하려면, 빌드 대상 보드 cmake 파일에 드라이버를 추가하여야 합니다. 단일 드라이버에 대해 다음을 수행할 수 있습니다:
```
drivers/distance_sensor/lightware_laser_i2c
```

특정 유형의 모든 드라이버를 포함할 수 있습니다.
```
distance_sensor # all available distance sensor drivers
```


:::tip
예를 들어, [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake) 설정에서 `distance_sensor`를 보거나 검색할 수 있습니다.
:::

## I2C 드라이버 예제

I2C 드라이버 샘플은 [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers)에서 **i2c.h**를 검색하십시오.

몇 가지 샘플은 다음과 같습니다.
* [drivers/distance_sensor/lightware_laser_i2c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/lightware_laser_i2c) - [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 I2C 드라이버.
* [drivers/distance_sensor/lightware_laser_serial](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/lightware_laser_serial) - [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 직렬 드라이버.
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C(또는 SPI)로 연결된 MS5611와 MS6507 기압 센서용 I2C 드라이버.

## 추가 정보

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (위키피디아) - 영문
* [I2C 비교 개요](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [드라이버 프레임워크](../middleware/drivers.md)
