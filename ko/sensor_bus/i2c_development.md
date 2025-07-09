---
canonicalUrl: https://docs.px4.io/main/ko/sensor_bus/i2c_development
---

# I2C Bus (Development Overview)

I2C는 2개의 와이어로 연결하여 여러개의 마스터 장치를 여러개의 슬레이브 장치에 연결하는 패킷교환 직렬통신 프로토콜입니다. 보드내의 프로세서와 마이크로컨트롤러에서 저속 주변 장치 IC와의 근거리 통신에 사용됩니다.

픽스호크 PX4는 다음 목적으로 이 프로토콜을 사용합니다:
* Connecting off board components that require higher data rates than provided by a strict serial UART, such as rangefinders.
* I2C만 지원하는 주변기기 호환성
* 여러 장치를 단일 버스에 연결할 수 있습니다(포트 절약에 유용) 예: LED, 지자계센서, 거리센서 등

:::note
The page [Hardware > I2C Peripherals](../sensor_bus/i2c_general.md) contains information about how to _use_ (rather than integrate) I2C peripherals and solve common setup problems.
:::

:::tip IMUs (accelerometers/gyroscopes) should not be attached via I2C (typically the [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) bus is used). The bus is not fast enough even with a single device attached to allow vibration filtering (for instance), and the performance degrades further with every additional device on the bus.
:::

## I2C 장치 통합

Drivers should `#include <drivers/device/i2c.h>` and then provide an implementation of the abstract base class `I2C` defined in **I2C.hpp** for the target hardware (i.e. for NuttX [here](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/drivers/device/nuttx/I2C.hpp)).

A small number of drivers will also need to include headers for their type of device (**drv_*.h**) in [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers) - e.g. [drv_led.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/drivers/drv_led.h).

To include a driver in firmware you must add the driver to the board-specific cmake file that corresponds to the target you want to build for. You can do this for a single driver:
```
drivers/distance_sensor/lightware_laser_i2c
```

You can also include all drivers of a particular type.
```
distance_sensor # all available distance sensor drivers
```

:::tip
For example, you can see/search for `CONFIG_DRIVERS_DISTANCE_SENSOR_LIGHTWARE_LASER_I2C` in the [px4_fmu-v4_default](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.px4board) configuration.
:::

## I2C 드라이버 예제

To find I2C driver examples, search for **i2c.h** in [/src/drivers/](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers).

Just a few examples are:
* [drivers/distance_sensor/lightware_laser_i2c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/lightware_laser_i2c) - [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 I2C 드라이버.
* [drivers/distance_sensor/lightware_laser_serial](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/lightware_laser_serial) - [Lightware SF1XX LIDAR](../sensor/sfxx_lidar.md)용 직렬 드라이버.
* [drivers/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611) - I2C(또는 SPI)로 연결된 MS5611와 MS6507 기압 센서용 I2C 드라이버.

## 추가 정보

* [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (위키피디아) - 영문
* [I2C 비교 개요](https://learn.sparkfun.com/tutorials/i2c) (learn.sparkfun.com)
* [드라이버 프레임워크](../middleware/drivers.md)
