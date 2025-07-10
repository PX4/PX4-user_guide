---
canonicalUrl: https://docs.px4.io/main/ko/gps_compass/u-blox_f9p_heading
---

# 듀얼 u-blox F9P를 사용한 RTK GPS 헤딩

기체에 장착한 두 개의 u-blox F9P [RTK GPS](../gps_compass/rtk_gps.md) 모듈을 사용하여 방향각을 정확하게 계산할 수 있습니다 (즉, 나침반 기반 방향 추정의 대안). 이 시나리오에서 두 개의 GPS 장치를 *무빙베이스*와 *로버*라고 합니다.

## 지원 장치

이 기능은 GPS UART2 포트기 노출된 F9P 장치에서 작동합니다 (설정을 위하여 포트에 액세스하여야 함).

이 사용 사례에 대하여 다음 장치들이 지원됩니다.
* [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136) (www.sparkfun.com)
* [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) (store-drotek.com)
* [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm) (store.mrobotics.io)

:::note
- [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md)와 [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)는 UART2 포트를 노출하지 않으므로 사용할 수 없습니다.
- 지원되는 장치는 [지원되는 GPS 및 나침반](../gps_compass/README.md#supported-gps-and-or-compass)을 참고하십시오.
:::

## 설정

이상적으로 두 안테나는 동일한 레벨/수평면에서 동일한 방향으로, 동일한 접지면 크기와 모양을 가지고 있어야합니다 ([애플리케이션 노트](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf), 섹션 *시스템 레벨 고려 사항*).
- 애플리케이션 노트에는 모듈 사이에 필요한 최소 간격이 명시되어 있지 않습니다 (PX4를 실행하는 테스트 차량에 50cm가 사용되었습니다).
- 필요에 따라 안테나를 배치 할 수 있지만 [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET)을 설정하여야합니다. [GPS > 구성 > 요/헤딩 소스로서의 GPS](../gps_compass/README.md#configuring-gps-as-yaw-heading-source).

개요:
- GPS 장치의 UART2를 함께 연결하여야합니다 ( "Moving Base"의 TXD2를 "Rover"의 RXD2).
- 각 GPS의 UART1을 자동조종장치의 미사용 UART에 (별도의) 연결하고 전송 속도를 `자동`으로 설정하여 둘 다 GPS로 설정합니다. 매핑은 다음과 같습니다.
  - 주 GPS = 로버
  - 보조 GPS = 무빙베이스
- [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE)를 `방향각`으로 설정합니다 (1).
- [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) 매개 변수에 비트 7을 설정하여합니다 ([GPS &# 062; 구성 > 요/헤딩 소스로서의 GPS](../gps_compass/README.md#configuring-gps-as-yaw-heading-source) 참조).
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET)을 설정하여야 할 수 있습니다 ([GPS > 설정 > 요/방향 소스로 GPS](../gps_compass/README.md#configuring-gps-as-yaw-heading-source) 참조).
- 재부팅하고 두 장치가 모두 GPS를 수신할 때까지 기다립니다. 그러면 `gps 상태`에 주 GPS가 RTK 모드로 들어가는 것으로 표시되어야하며, 이는 방향각을 사용할 수 있음을 의미합니다.


:::note
고정 기지국과 함께 RTK를 사용하는 경우 보조 GPS는 RTK 상태  w.r.t를 표시합니다.
:::



## 추가 정보

- [ZED-F9P 무빙베이스 애플리케이션 (애플리케이션 노트)](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf) -일반 설정/지침.
- [GPS > 설정 > GPS 요/방향각 소스로 사용](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)