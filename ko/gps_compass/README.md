---
canonicalUrl: https://docs.px4.io/main/ko/gps_compass/README
---

# GPS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜이나 UAVCAN 통신 수신기를 사용하여 글로벌 내비게이션 위성시스템(GNSS)(GPS, GLONASS, Galileo, BeiDou, QZSS 및 SBAS 포함)을 지원합니다. It also supports [Real Time Kinematic (RTK) ](../gps_compass/rtk_gps.md) and **Post-Processing Kinematic (PPK)** GPS Receivers, which extend GPS systems to centimetre-level precision.

PX4는 Bosch BMM 150 MEMS (I2C 버스를 통해), HMC5883/HMC5983 (I2C 또는 SPI), IST8310 (I2C) 및 LIS3MDL (I2C 또는 SPI)과 같은 나침반 부품(자기계)과 함께 사용할 수 있습니다. 최대 4 개의 내외부 자력계를 연결할 수 있지만, 실제로는 하나만 헤딩 소스로 사용됩니다.

시스템은 *우선 순위*에 따라 자동으로 가장 적합한 나침반을 선택합니다. 외부 자기계는 내부 자기계보다 우선 순위가 높습니다. 기본 나침반이 비행 중에 실패하면, 다음 나침반을 사용하여 장애를 조치합니다. 비행전에 작동하지 않으면, 시동을 걸 수 없습니다.

![GPS와 나침반](../../assets/hardware/gps/gps_compass.jpg)

:::tip
[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 비행 콘트롤러를 사용하는 경우에는 일반적으로 고정익 받침대 또는 날개에 모터/ESC 전원 공급 라인에서 최대한 멀리 떨어진 곳에 장착된 *결합 GPS + 나침반*을 사용하는 것이 좋습니다. 내부 나침반은 전선에서 떨어진 곳에 Pixhawk를 장착하여 전자기 간섭을 줄일 수있는 대형 기체 (예 : VTOL)에 유용할 수 *있습니다*. 대부분의 소형 운송체에서는 외부 나침반이 필수 요구사항입니다.
:::

## 지원되는 GNSS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜 또는 UAVCAN 통신 장치에서 작동합니다. 아래의 목록은 PX4 개발팀에서 테스트하였거나 PX4 커뮤니티에서 인기있는 GNSS/나침반 장치들입니다.

| 장치                                                                                                                                                                                                                                          |     GPS      |       나침반        | [RTK](../gps_compass/rtk_gps.md) | [GPS Yaw 출력](#configuring-gps-as-yaw-heading-source) | [Dual F9P GPS Heading](../gps_compass/u-blox_f9p_heading.md) |   PPK   |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------:|:----------------:|:--------------------------------:|:----------------------------------------------------:|:------------------------------------------------------------:|:-------:|
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                                                                                                                                                                                         |     M9N      |    ICM42688p     |                                  |                                                      |                                                              |         |
| [ARK RTK GPS](https://arkelectron.com/product/ark-rtk-gps/)                                                                                                                                                                                 |     F9P      |    ICM42688p     |             &check;              |                                                      |                           &check;                            |         |
| [Avionics Anonymous UAVCAN GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/)                                                                                                                            |   SAM-M8Q    |    MMC5983MA     |                                  |                                                      |                                                              |         |
| [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/)                                                                                                                            |   &cross;    |     &check;      |                                  |                                                      |                                                              |         |
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                                                                                                                                      |   M8P/M8N    |     &check;      |             &check;              |                                                      |                                                              |         |
| [CUAV C-RTK 9Ps GPS](../gps_compass/rtk_gps_cuav_c-rtk-9ps.md)                                                                                                                                                                              |     F9P      |      RM3100      |             &check;              |                                                      |                           &check;                            |         |
| [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                                                                                                                            |     F9P      |      RM3100      |             &check;              |                                                      |                                                              | &check; |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)                                                                                                                                                                           |     M8N      |     ICM20948     |                                  |                                                      |                                                              |         |
| [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)                                                                                                                                                                           |     M8P      |     HMC5983      |             &check;              |                                                      |                                                              |         |
| [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3)                                                                                                                                                                |     M8P      |     ICM20948     |             &check;              |                                                      |                                                              |         |
| [Drotek DP0804](https://store-drotek.com/920-DP0804.html) (and other [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass))                                                                   |     M9N      |     LIS3MDL      |                                  |                                                      |                                                              |         |
| [Drotek SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html)                                                                                                                                           |     F9P      |      RM3100      |             &check;              |                                                      |                           &check;                            |         |
| [Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md)                                                                                                                                                                                    |     M8U      |     LIS3MDL      |             &check;              |                                                      |                                                              |         |
| [Emlid Reach M+](https://emlid.com/reach/)  - PX4 only supports "ordinary" GPS with this module. RTK support is expected in the near future.                                                                                                |   &check;    |     &cross;      |                                  |                                                      |                                                              |         |
| [Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md)                                                                                                                                                                              | FB672, FB6A0 |     &check;      |             &check;              |                                                      |                                                              |         |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md)                                                                                                                                                                                        |     F9P      |     IST8310      |             &check;              |                                                      |                                                              |         |
| [Holybro Micro M8N GPS](https://shop.holybro.com/micro-m8n-gps_p1009.html)                                                                                                                                                                  |     M8N      |     IST8310      |                                  |                                                      |                                                              |         |
| [Holybro Nano Ublox M8 5883 GPS](https://shop.holybro.com/nano-ublox-m8-5883-gps-module_p1236.html)                                                                                                                                         |  UBX-M8030   |     QMC5883      |                                  |                                                      |                                                              |         |
| [Holybro M8N GPS](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html)                                                                                                                                                                 |     M8N      |     IST8310      |                                  |                                                      |                                                              |         |
| [Holybro M9N GPS](http://www.holybro.com/product/holybro-m9n-gps/)                                                                                                                                                                          |     M9N      |     IST8310      |                                  |                                                      |                                                              |         |
| [Holybro H-RTK F9P Helical or Base](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                                                                                                                            |     F9P      |     IST8310      |             &check;              |                                                      |                           &check;                            |         |
| [Holybro H-RTK F9P Rover Lite](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                                                                                                                                 |     F9P      |     IST8310      |             &check;              |                                                      |                                                              |         |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                                                                                                                                                                       |     M8P      |     IST8310      |             &check;              |                                                      |                                                              |         |
| [Hobbyking u-blox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) |     M8N      |     &check;      |                                  |                                                      |                                                              |         |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)                                                                                                                                                                      | MC-1612-V2b  |     optional     |             &cross;              |                                                      |                                                              |         |
| [mRo GPS u-blox Neo-M8N Dual Compass](https://store.mrobotics.io/product-p/m10034-8308.htm)                                                                                                                                                 |     M8N      | LIS3MDL, IST8308 |                                  |                                                      |                                                              |         |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm)                                                                                                                                                         |     F9P      |     &cross;      |             &check;              |                                                      |                           &check;                            |         |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                                                                                                                                                                |     F9P      |     &cross;      |             &check;              |                                                      |                           &check;                            |         |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                                                                                                                                                                  |     F9P      |     &cross;      |             &check;              |                       &check;                        |                                                              |         |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                                                                                                                                                                                           |   MAX-M8Q    |     LIS3MDL      |                                  |                                                      |                                                              |         |

:::note
- &check; 또는 특정 부품 번호는 기능이 지원되는 것을 나타내며, &cross; 또는 비어 있으면 해당 기능이 지원되지 않는 것을 나타냅니다. "?"는 "알 수 없음"을 나타냅니다.
- 가능하고 관련성이있는 경우 부품 이름이 사용됩니다 (예 : GPS 열의 &check; GPS 모듈이 있지만 부품을 알 수 없음을 나타냄).
- [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/)는 나침반 (GPS 아님)입니다.
- 일부 RTK 모듈은 특정 역할 (베이스 또는 로버)에서만 사용할 수 있는 반면, 다른 모듈은 서로 교환하여 사용할 수 있습니다.
- 일부 단종품은 목록에서 생략될 수 있습니다. 예를 들어, [CubePilot Here + RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)는 단종되었으며, 향후 릴리스에서 목록에서 삭제될 수 있습니다. *원본*은 이미 삭제되었습니다. 단종된 모듈이 여기에 언급되지 않은 경우에는 이전 버전에서 확인하십시오.
:::

## 하드웨어 설정

GPS(및 나침반 있는 경우) 연결 방법은 일반적으로 제조업체에서 제공합니다 (일반적인 [Autopilot 하드웨어](../flight_controller/README.md)의 경우).

[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에는 GPS 연결용으로 표시된 포트가 있으며, 나침반은 I2C 또는 SPI 포트/버스(장치에 따라 다름)에 연결됩니다.

The [ARK GPS](../uavcan/ark_gps.md), [ARK RTK GPS](../uavcan/ark_rtk_gps.md), [Zubax GNSS 2](https://zubax.com/products/gnss_2), [CUAV C-RTK2](../gps_compass/rtk_gps_cuav_c-rtk.md), [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3), and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [UAVCAN](../uavcan/README.md).


:::warning
GPS 모듈을 연결시 핀배열에 주의하십시오.
모두 소프트웨어와 호환되지만, 핀 순서를 주의하여 연결하여야 합니다.
:::


## GNSS 설정

"표준" GPS 설정은 다음과 같습니다. 추가 장치 설정은 PX4 또는 제조업체 장치설명서에서 제공될 수 있습니다 (예 : [Trimble MB-Two &gt; 설정](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

:::warning PX4의 GPS 프로토콜은 기본적으로 u-blox로 설정됩니다. 기본적으로 Trimble, Emlid, MTK와 같은 다른 GPS 유형은 자동으로 감지되지 않습니다. 프로토콜은 [GPS_x_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL)에서 설정 가능합니다.
:::

### 메인 GPS 구성

Pixhawk의 GPS 설정은 투명하게 처리됩니다. GPS 모듈을 **GPS**라고 표시된 포트에 연결하기 만하면 작동합니다.

:::note
기본적인 [직렬 포트 설정](../peripherals/serial_configuration.md#default_port_mapping)은 대부분의 장치에서 작동합니다. *Trimble MB-Two*를 사용하는 경우에는 명시적으로 속도를 115200 baud로 설정하여야 합니다.
:::

<a id="dual_gps"></a>

### 보조 GPS 설정(듀얼 GPS 시스템)

보조 GPS를 사용하려면, 포트에 연결후 [직렬 포트 설정](../peripherals/serial_configuration.md)을 수행하여 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG)를 선택 포트를 할당합니다.

아래의 과정은 *QGroundControl*의 `TELEM 2` 포트에서 보조 GPS 설정 방법입니다.

1. [찾기 및 설정](../advanced_config/parameters.md) 매개 변수 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG)에서 **TELEM 2**까지.
   - *QGroundControl*에서 **기체 설정 &gt; 매개변수** 섹션으로 이동합니다.
   - **GPS** 탭 (1)을 선택한 다음 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) 매개변수 (2)를 열고 드롭 다운 목록 (3)에서 *TELEM 2*를 선택합니다. ![QGC Serial 예시](../../assets/peripherals/qgc_serial_config_example.png)
1. 다른 매개변수를 표시하려면 기체를 재부팅하십시오.
1. **Serial** 탭을 선택하고 [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) 매개변수 (`TELEM 2` 포트 전송 속도)를 열어서 *Auto*로 설정합니다. ![QGC Serial Baudrate 예시](../../assets/peripherals/qgc_serial_baudrate_example.png)

보조 GPS 포트를 설정 후 :
1. 두 GPS 시스템의 데이터를 혼합하도록 ECL/EKF2 추정기를 설정합니다. 자세한 지침은 [ECL EKF 사용 &gt; 이중 수신기](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers)를 참고하십시오.

### GPS를 Yaw/Heading 소스로 설정

GPS는 *yaw 출력이 장치에서 지원되는* 모듈 (예 : [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md))을 사용하거나 일부 [듀얼 u-blox F9P RTK를 사용시 요 퓨전 소스로 사용할 수 있습니다.](../gps_compass/u-blox_f9p_heading.md).

요 퓨전에 GPS를 사용시에는 다음 매개변수를 설정하여야 합니다.

| 매개변수                                                                         | 설정                                                                                                                                     |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) | 기체 x 축 ([여기](../config/flight_controller_orientation.md#calculating-orientation)에 표시된 앞/뒤 축)을 기준으로 *기준선* (두 GPS 안테나 사이의 선)이 이루는 각도입니다. |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)   | 비트 위치 7 "GPS yaw fusion"을 `1`로 설정합니다 (즉, 매개변수 값에 128을 추가).                                                                             |


:::tip
이 기능을 사용하는 경우에는 다른 모든 설정이 정상적으로 완료되어야 합니다 (예 : [RTK 포지셔닝](../gps_compass/rtk_gps.md#positioning-setup-configuration)).
:::


## 나침반 설정

나침반 보정은 [나침반 설정](../config/compass.md)을 참고하십시오. The process is straightforward and will autodetect, [set default rotations](../advanced_config/parameter_reference.md#CAL_MAG_ROT_AUTO), calibrate, and prioritise, all connected magnetometers.

일반적으로 추가 나침반 설정은 필요하지 않습니다.

:::note
All external compasses are given the same priority by default, which is higher than the priority shared by all internal compasses.
:::

### 이중 나침반

위에서 언급한 것처럼, 추가 설정이 필요하지 않습니다.

개발자는 원하는 경우에는 나침반 매개변수를 사용하여 내부 나침반을 비활성화할 수 있습니다. 매개변수 이름은 [CAL*MAGx*](../advanced_config/parameter_reference.md#CAL_MAG0_ID)로 시작합니다 (여기서 `x=0-3`).

내부 나침반을 비활성화 하려면 :
- 내부 나침반을 확인하려면 [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG0_ROT)을 사용하십시오. `CAL_MAGn_ROT == 1`  나침반은 내장 나침반입니다.
- 그런 다음 [CAL\_MAGx\_PRIO](../advanced_config/parameter_reference.md#CAL_MAG0_PRIO)를 사용하여 나침반을 비활성화하십시오. 나침반의 상대적 우선 순위 변경시에도 사용할 수 있습니다.


## 개발자 정보

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS 드라이버](../modules/modules_driver.md#gps)
  - [UAVCAN 예제](../uavcan/README.md)
- 나침반
  - [드라이버 소스 코드](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer) (나침반)
