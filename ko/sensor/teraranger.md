---
canonicalUrl: https://docs.px4.io/main/ko/sensor/teraranger
---

# TeraRanger 거리계

TeraRanger는 적외선 ToF(Time-of-Flight) 기반의 다양한 경량 거리측정 센서입니다. 일반적으로, 소나보다 더 빠르고 범위가 넓으며 레이저 기반 장치보다 작고 가볍습니다.

PX4는 아래 장치들을 지원합니다.

* [TeraRanger Evo 60m](https://www.terabee.com/shop/lidar-tof-range-finders/teraranger-evo-60m/) (0.5 – 60 m)
* [TeraRanger Evo 600Hz](https://www.terabee.com/shop/lidar-tof-range-finders/teraranger-evo-600hz/) (0.75 - 8 m)

:::note PX4는 *TeraRanger One*도 지원합니다 (I2C 어댑터 필요). This has been discontinued.
:::

## 구매처

* TBD

## 핀배열

## 배선

모든 TeraRanger 센서는 I2C 버스로 연결됩니다.

## 소프트웨어 설정

센서는 매개변수 [SENS_EN_TRANGER](../advanced_config/parameter_reference.md#SENS_EN_TRANGER)로 활성화됩니다 (센서 유형을 설정하거나 PX4가 유형을 자동 감지해야 함).

:::note
Evo 센서에 자동 감지를 사용하는 경우에는 범위의 최소/최대 값은 Evo 제품군 전체에서 가능한 최저/최고 판독치(현재 0.5-60m)로 설정됩니다. 올바른 최대/최소 값을 사용하려면 Evo 센서의 적절한 모델을 매개변수에 설정합니다 (자동 감지를 사용하는 대신).
:::

:::tip
이 거리계의 드라이버는 펌웨어에서 제공됩니다. 존재하지 않으면, 보드 설정에 드라이버(`distance_sensor/teraranger`)를 추가하여야 합니다.
:::

## 추가 정보

* [모듈 참조: 거리 센서 (드라이버) : teraranger](../modules/modules_driver_distance_sensor.md#teraranger)