# Holybro H-RTK F9P GNSS

[Holybro H-RTK F9P GNSS](http://www.holybro.com/product/h-rtk-f9p/)는 Holybro에서 출시한 다중 대역 고정밀 [RTK GNSS 시스템](../gps_compass/rtk_gps.md) 시리즈입니다. 이 제품군은 [H-RTK M8P](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md) 시리즈와 유사하지만, 더 빠른 수렴 시간과 안정적인 성능, GPS, GLONASS, Galileo 및 BeiDou의 동시 수신, 높은 업데이트 속도를 제공하는 다중 대역 RTK를 사용합니다. 센티미터 정확도의 동적 대용량 애플리케이션에 적용 가능합니다. u-blox F9P 모듈, IST8310 나침반과 3색 LED 표시기를 사용합니다. 또한, 간단하고 편리하게 작동할 수 있는 통합 안전 스위치가 있습니다.

Holybro H-RTK F9P에는 세 가지 모델이 있으며, 각 모델은 다른 요구 사항을 충족하기 위하여 각각 다른 안테나 설계를 사용합니다. 자세한 내용은 [사양 및 모델 비교 섹션](#specification-and-model-comparison)을 참고하십시오.

Using RTK allows PX4 to get its position with centimeter-level accuracy, which is much more accurate than can be provided by a normal GPS.

![h-rtk](../../assets/hardware/gps/rtk_holybro_h-rtk-f9p_all_label.jpg)

## Purchase

* [H-RTK F9P (Holybro Website)](https://shop.holybro.com/h-rtk-f9p_p1226.html?)
* [H-RTK Accessories (Holybro Website)](https://shop.holybro.com/c/h-rtk_0512)

## Configuration

RTK setup and use on PX4 via _QGroundControl_ is largely plug and play \(see [RTK GPS](../advanced_features/rtk-gps.md) for more information\).

## Wiring and Connections

All H-RTK GNSS models come with a GH 10-pin connector/cable that is compatible with [Pixhawk 4](../flight_controller/pixhawk4.md).

:::note
The cables/connectors may need to be modified in order to connect to other flight controller boards (see [Pin Map](#pin-map) below).
:::

## Pin Map

![h-rtk-f9p_rover_pinmap](../../assets/hardware/gps/rtk_holybro_h-rtk-f9p_pinmap.jpg)


## Specification and Model Comparison

![h-rtk-f9p_spec](../../assets/hardware/gps/rtk_holybro_h-rtk-f9p_spec.png)

## GPS Accessories

[H-RTK Mount (Holybro Website)](https://shop.holybro.com/spare-parts-gps-mount_p1228.html)

![h-rtk](../../assets/hardware/gps/rtk_holybro_h-rtk_mount_3.png)
