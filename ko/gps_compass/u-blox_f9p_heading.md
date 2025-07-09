---
canonicalUrl: https://docs.px4.io/main/ko/gps_compass/u-blox_f9p_heading
---

# 듀얼 u-blox F9P를 사용한 RTK GPS 헤딩

기체에 장착한 두 개의 u-blox F9P [RTK GPS](../gps_compass/rtk_gps.md) 모듈을 사용하여 방향각을 정확하게 계산할 수 있습니다 (즉, 나침반 기반 방향 추정의 대안). 이 시나리오에서 두 개의 GPS 장치를 *무빙베이스*와 *로버*라고 합니다.

## 지원 장치

This feature works on F9P devices that support CAN or expose the GPS UART2 port.

The following devices are supported:
* [ARK RTK GPS](https://arkelectron.com/product/ark-rtk-gps/) (arkelectron.com)
* [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136) (www.sparkfun.com)
* [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html) (store-drotek.com)
* [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm) (store.mrobotics.io)
* [Holybro H-RTK F9P Helical or Base](https://holybro.com/products/h-rtk-f9p-gnss-series) (Holybro Store)
* [Holybro DroneCAN H-RTK F9P Rover or Helical](https://holybro.com/collections/dronecan-h-rtk) (Holybro Store)
* [CUAV C-RTK 9Ps](https://store.cuav.net/shop/c-rtk-9ps/) (CUAV Store)

:::note
- [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) and [Holybro H-RTK F9P Rover Lite](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md) cannot be used because they do not expose the CAN or UART2 port.
- Supported devices are also listed in [GPS/Compass > Supported GPS and/or Compass](../gps_compass/README.md#supported-gnss-and-or-compass).
:::

## 설정

이상적으로 두 안테나는 동일한 레벨/수평면에서 동일한 방향으로, 동일한 접지면 크기와 모양을 가지고 있어야합니다 ([애플리케이션 노트](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf), 섹션 *시스템 레벨 고려 사항*).
- 애플리케이션 노트에는 모듈 사이에 필요한 최소 간격이 명시되어 있지 않습니다 (PX4를 실행하는 테스트 차량에 50cm가 사용되었습니다).
- The antennas can be positioned as needed, but the [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) must be configured: [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source).

### UART Setup

- The UART2 of the GPS devices need to be connected together (TXD2 of the "Moving Base" to RXD2 of the "Rover")
- Connect UART1 on each of the GPS to (separate) unused UART's on the autopilot, and configure both of them as GPS with baudrate set to `Auto`. The mapping is as follows:
  - Main GPS = Rover
  - Secondary GPS = Moving Base
- Set [GPS_UBX_MODE](../advanced_config/parameter_reference.md#GPS_UBX_MODE) to `Heading` (1)
- [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL) parameter bit 3 must be set (see [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)).
- [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) may need to be set (see [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)).
- Reboot and wait until both devices have GPS reception. `gps status` should then show the Main GPS going into RTK mode, which means the heading angle is available.

### CAN Setup

Refer to the CAN RTK GPS documentation for each specific device for the setup instructions (such as [ARK RTK GPS > Setting Up Moving Baseline & GPS Heading](../dronecan/ark_rtk_gps.md#setting-up-moving-baseline-gps-heading))

:::note
If using RTK with a fixed base station the secondary GPS will show the RTK state w.r.t. the base station.
:::



## Further Information

- [ZED-F9P Moving base applications (Application note)](https://www.u-blox.com/sites/default/files/ZED-F9P-MovingBase_AppNote_%28UBX-19009093%29.pdf) - General setup/instructions.
- [GPS > Configuration > GPS as Yaw/Heading Source](../gps_compass/README.md#configuring-gps-as-yaw-heading-source)
