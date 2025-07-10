---
canonicalUrl: https://docs.px4.io/main/ko/gps_compass/rtk_gps_holybro_h-rtk-m8p
---

# Holybro H-RTK M8P GNSS

[Holybro H-RTK M8P GNSS](http://www.holybro.com/product/h-rtk-m8p-rover-lite/)는 일반 사용자를 위한 [RTK GNSS 모듈](../gps_compass/rtk_gps.md) 시리즈입니다. 이 제품군은 [H-RTK M9P](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md) 시리즈와 유사하지만, 더 작고 가볍고 저렴한 M8P u-blox RTK GNSS 모듈을 사용합니다 (이전 세대보다 훨씬 우수한 위치 해상도를 제공합니다).

Holybro H-RTK M8P에는 세 가지 모델이 있으며, 각각 다른 요구 사항을 충족하기 위해 서로 다른 안테나 디자인을 사용합니다. 자세한 내용은 [사양 및 모델 비교 섹션](#specification-and-model-comparison)을 참고하십시오.

RTK를 사용하면 PX4는 일반 GPS에서 제공하는 것 보다 훨씬 더 정확한 센티미터 수준의 정확도로 위치를 파악할 수 있습니다.

![h-rtk_rover](../../assets/hardware/gps/rtk_holybro_h-rtk-m8p_all_label.jpg)

## 구매

* [H-RTK M8P (Holybro 웹사이트)](https://shop.holybro.com/h-rtk-m8p_p1221.html)
* [H-RTK 액서사리 (Holybro 웹사이트)](https://shop.holybro.com/c/h-rtk_0512)

## 설정

_QGroundControl_을 통한 PX4의 RTK 설정 및 사용은 대부분 플러그앤플레이입니다 \(자세한 내용은 [RTK GPS](../advanced_features/rtk-gps.md) 참조\).

## 배선

모든 H-RTK GNSS 모델에는 [Pixhawk 4](../flight_controller/pixhawk4.md)와 호환되는 GH 10 핀 커넥터/케이블이  제공됩니다.

:::note
다른 비행 콘트롤러에 연결하기 위하여 케이블/커넥터를 수정하는 경우도 있습니다 (아래 [핀 맵](#pin_map) 참조).
:::

<span id="pin_map"></span>
## 핀 맵

![h-rtk_rover_pinmap](../../assets/hardware/gps/rtk_holybro_h-rtk-m8p_pinmap.jpg)

## 사양과 모델 비교

![h-rtk_spec](../../assets/hardware/gps/rtk_holybro_h-rtk-m8p_spec.png)

## GPS 소품

[H-RTK 소품 (Holybro 웹사이트)](https://shop.holybro.com/c/h-rtk_0512)

![h-rtk](../../assets/hardware/gps/rtk_holybro_h-rtk_mount_3.png)
