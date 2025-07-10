---
canonicalUrl: https://docs.px4.io/main/ko/uavcan/README
---

# UAVCAN

<img style="float:right; width: 200px ; padding: 10px;" src="../../assets/uavcan/uavcan_logo_transparent.png" alt="UAVCAN 로고" /> [UAVCAN](http://uavcan.org)은 자동조종장치가 주변 장치에 연결하는 온보드 네트워크입니다. 견고한 차동 신호를 사용하고 버스를 통한 펌웨어 업그레이드와 주변 장치의 상태 피드백을 지원합니다.

The [videos section](#videos) contains additional information and guides.

:::note
PX4 requires an SD card for UAVCAN node allocation and firmware upgrade.
It is not used during flight by UAVCAN.
:::

## 지원 하드웨어

It supports hardware like:

- [ESC/모터 콘트롤러](../uavcan/escs.md)
- 항속 센서
  - [Thiemar 항속 센서](https://github.com/thiemar/airspeed)
- GPS 및 GLONASS용 GNSS 수신기
  - [ARK GPS](../uavcan/ark_gps.md)
  - [ARK RTK GPS](../uavcan/ark_rtk_gps.md)
  - [CubePilot Here3](https://www.cubepilot.org/#/here/here3)
  - [Zubax GNSS](https://zubax.com/products/gnss_2)
  - [CUAV NEO v2 Pro GNSS](https://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)
  - [CUAV NEO 3 Pro GNSS](https://doc.cuav.net/gps/neo-series-gnss/en/neo-v2-pro.html)
  - [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk2.md)
- 전원 모니터
  - [Pomegranate 시스템 전원 모듈](../power_module/pomegranate_systems_pm.md)
  - [CUAV CAN PMU 전원 모듈](../power_module/cuav_can_pmu.md)
- 거리 센서
  - [ARK Flow](ark_flow.md)
  - [Avionics Anonymous Laser Altimeter UAVCAN 인터페이스](../uavcan/avanon_laser_interface.md)
- 광류
  - [Ark Flow](ark_flow.md)
- Generic CAN Node (enables use of I2C, SPI, UART sensors on the CAN bus).
  - [ARK CANnode](../uavcan/ark_cannode.md)

:::note
PX4 does not support UAVCAN servos (at time of writing).
:::


## 배선

All UAVCAN components share the same connection architecture/are wired the same way. Connect all on-board UAVCAN devices into a chain and make sure the bus is terminated at the end nodes (the order in which the nodes are connected/chained does not matter).

The following diagram shows this for a flight controller connected to [UAVCAN motor controllers (ESCs)](../uavcan/escs.md) and a UAVCAN GNSS.

![UAVCAN Wiring](../../assets/uavcan/uavcan_wiring.png)

The diagram does not show any power wiring. Refer to your manufacturer instructions to confirm whether components require separate power or can be powered from the CAN bus itself.

For more information about proper bus connections see [Cyphal/CAN Device Interconnection](https://kb.zubax.com/pages/viewpage.action?pageId=2195476) (Zubax KB)) (Zubax KB).

:::note
- 연결은 동일하지만 _커넥터_는 기기마다 다를 수 있습니다.
- 두 번째/이중화" CAN 인터페이스를 위에 표시된 것처럼(CAN2) 사용할 수 있습니다. 이것은 선택 사항이지만, 연결의 견고성을 높일 수 있습니다.
:::


## PX4 설정

In order to use UAVCAN components with PX4 you will first need to enable the UAVCAN driver:

1. 배터리에서 기체에 전원을 공급하고 (비행 콘트롤러뿐만 아니라 전체 기체에 전원을 공급하여야 함) *QGroundControl*을 연결합니다.
1. **기체 설정 > 매개 변수** 화면으로 이동합니다.
1. [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE)은 0이 아닌 값 중 하나로 [설정](../advanced_config/parameters.md)하여야 합니다.

   값들은 다음과 같습니다:
   - `0`: UAVCAN 드라이버가 비활성화되었습니다.
   - `1`: 센서 수동 설정.
   - `2`: 센서 자동 설정.
   - `3`: 센서 및 액츄에이터(ESC) 자동 설정

   연결된 UAVCAN 장치가 자동 구성을 지원하지 _없으면_ `1`, `2` 또는 `3` 사용 _일부_가 자동 구성을 지원하고, UAVCAN ESC를 사용하는 경우 `3`입니다(이는 PWM이 아닌 UAVCAN 버스에 모터 제어를 할당함).

:::note
You will need to manually allocate static ids for any nodes that don't support automatic configuration.
When using dynamic configuration, any manually allocated ids should be given a value greater than the number of UAVCAN devices (to avoid clashes).
:::

Most UAVCAN sensors require no further setup (they are plug'n'play, unless specifically noted in their documentation).

[UAVCAN motor controllers (ESCs)](../uavcan/escs.md) additionally require the motor order be set, and may require a few other parameters be set. Whether this can be done using the simple QGroundControl setup UI depends on the type of ESC (see link for information).


## 문제 해결

### UAVCAN 장치가 노드 ID를 얻지 못함/펌웨어 업데이트 실패

PX4 requires an SD card for UAVCAN node allocation and during firmware update (which happen during boot). Check that there is a (working) SD card present and reboot.

### 시동시 모터가 회전하지 않음

If the PX4 Firmware arms but the motors do not start to rotate, check that parameter `UAVCAN_ENABLE=3` to use UAVCAN ESCs. If the motors do not start spinning before thrust is increased, check `UAVCAN_ESC_IDLT=1`.

## Videos

Intro to UAVCAN and Practical Example with Setup in QGroundControl!

@[youtube](https://youtu.be/IZMTq9fTiOM)

----
UAVCAN for drones — PX4 Developer Summit Virtual 2020

@[youtube](https://youtu.be/6Bvtn_g8liU)

----

Getting started using UAVCAN v1 with PX4 on the NXP UAVCAN Board — PX4 Developer Summit Virtual 2020 @[youtube](https://youtu.be/MwdHwjaXYKs)

----
UAVCAN: a highly dependable publish-subscribe protocol for hard real-time intravehicular networking  — PX4 Developer Summit Virtual 2019

@[youtube](https://youtu.be/MBtROivYPik)


## Developer Information

- [UAVCAN 개발](../uavcan/developer.md): 새로운 UAVCAN 하드웨어의 개발 및 PX4로의 통합과 관련된 주제입니다.
