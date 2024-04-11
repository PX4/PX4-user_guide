# GPS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜이나 UAVCAN 통신 수신기를 사용하여 글로벌 내비게이션 위성시스템(GNSS)(GPS, GLONASS, Galileo, BeiDou, QZSS 및 SBAS 포함)을 지원합니다. A GNSS system is needed for missions, and some other automatic and manual/assisted modes.

PX4는 Bosch BMM 150 MEMS (I2C 버스를 통해), HMC5883/HMC5983 (I2C 또는 SPI), IST8310 (I2C) 및 LIS3MDL (I2C 또는 SPI)과 같은 나침반 부품(자기계)과 함께 사용할 수 있습니다. 최대 4 개의 내외부 자력계를 연결할 수 있지만, 실제로는 하나만 헤딩 소스로 사용됩니다.

![GPS와 나침반](../../assets/hardware/gps/gps_compass.jpg)

::: info PX4 also supports [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) and **Post-Processing Kinematic (PPK)** GNSS Receivers, which extend GNSS systems to centimetre-level precision.
:::

## 지원되는 GNSS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜 또는 UAVCAN 통신 장치에서 작동합니다.

This table contains non-RTK GNSS units (most of which also have a compass). These have been tested by the PX4 dev team, or which are popular within the PX4 community.

| 장치                                                                        |     GPS     |            나침반            | Notes                                                                                                              |
|:------------------------------------------------------------------------- |:-----------:|:-------------------------:|:------------------------------------------------------------------------------------------------------------------ |
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                       |     M9N     |         ICM42688p         |                                                                                                                    |
| [Avionics Anonymous UAVCAN GNSS/Mag][avionics_anon_can_gnss]              |   SAM-M8Q   |         MMC5983MA         |                                                                                                                    |
| [CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md)                        |     M9N     |          IST8310          |                                                                                                                    |
| [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)                 |     M9N     |          RM3100           |                                                                                                                    |
| [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)                      |     M9N     |          RM3100           |                                                                                                                    |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)         |     M8N     |         ICM20948          |                                                                                                                    |
| [Drotek DP0804](https://store-drotek.com/920-DP0804.html)                 |     M9N     |          LIS3MDL          | Also see other [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass) |
| [Emlid Reach M+](https://emlid.com/reach/)                                |   &check;   |          &cross;          | Supports PPK. RTK expected.                                                                                        |
| [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)                |     M8N     |          BMM150           |                                                                                                                    |
| [Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps)       |     M8N     |          IST8310          |                                                                                                                    |
| [Holybro Nano Ublox M8 5883 GPS][hb_nano_m8_5883]                         |  UBX-M8030  |          QMC5883          |                                                                                                                    |
| [Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M8N     |          IST8310          |                                                                                                                    |
| [Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M9N     |          IST8310          |                                                                                                                    |
| [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps) |     M9N     |          BMM150           |                                                                                                                    |
| [Hobbyking u-blox Neo-M8N GPS with Compass][hk_ublox_neo_8mn]             |     M8N     |          &check;          |                                                                                                                    |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)    | MC-1612-V2b |         optional          |                                                                                                                    |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                   | MC-1612-V2b |                           |                                                                                                                    |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                   | MC-1612-V2b |          IST8310          |                                                                                                                    |
| [mRo GPS u-blox Neo-M8N Dual Compass][mro_neo8mn_dual_mag]                |     M8N     |     LIS3MDL, IST8308      |                                                                                                                    |
| [Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md)                   |     M8N     | HMC5983, IST8310, LIS3MDL |                                                                                                                    |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                         |   MAX-M8Q   |          LIS3MDL          |                                                                                                                    | 

<!-- links to improve layout of table for editing -->
Notes:

- &check; 또는 특정 부품 번호는 기능이 지원되는 것을 나타내며, &cross; 또는 비어 있으면 해당 기능이 지원되지 않는 것을 나타냅니다. "?"는 "알 수 없음"을 나타냅니다.
- 가능하고 관련성이있는 경우 부품 이름이 사용됩니다 (예 : GPS 열의 &check; GPS 모듈이 있지만 부품을 알 수 없음을 나타냄).
- 일부 단종품은 목록에서 생략될 수 있습니다. The original _Here_ has already been removed. 단종된 모듈이 여기에 언급되지 않은 경우에는 이전 버전에서 확인하십시오.

## Mounting the GNSS/Compass

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a GNSS module that has a compass (it is the compass part that is affected by electromagnetic radiation).

## 하드웨어 설정

GPS(및 나침반 있는 경우) 연결 방법은 일반적으로 제조업체에서 제공합니다 (일반적인 [Autopilot 하드웨어](../flight_controller/README.md)의 경우).

[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 컨트롤러에는 GPS 연결용으로 표시된 포트가 있으며, 나침반은 I2C 또는 SPI 포트/버스(장치에 따라 다름)에 연결됩니다.

The [ARK GPS](../dronecan/ark_gps.md), [ARK RTK GPS](../dronecan/ark_rtk_gps.md), [Zubax GNSS 2](https://zubax.com/products/gnss_2), [CUAV C-RTK2](../gps_compass/rtk_gps_cuav_c-rtk.md), [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3), and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [DroneCAN](../dronecan/index.md).

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

::: info The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) works for most devices. If you are using the _Trimble MB-Two_ you will need to modify the configuration to explicitly set the rate to 115200 baud.
:::

<a id="dual_gps"></a>

### 보조 GPS 설정(듀얼 GPS 시스템)

보조 GPS를 사용하려면, 포트에 연결후 [직렬 포트 설정](../peripherals/serial_configuration.md)을 수행하여 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG)를 선택 포트를 할당합니다.

The following steps show how to configure a secondary GPS on the `TELEM 2` port in _QGroundControl_:

1. [찾기 및 설정](../advanced_config/parameters.md) 매개 변수 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG)에서 **TELEM 2**까지.
   - *QGroundControl*에서 **기체 설정 &gt; 매개변수** 섹션으로 이동합니다.
   - **GPS** 탭 (1)을 선택한 다음 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) 매개변수 (2)를 열고 드롭 다운 목록 (3)에서 *TELEM 2*를 선택합니다. ![QGC Serial 예시](../../assets/peripherals/qgc_serial_config_example.png)
1. 다른 매개변수를 표시하려면 기체를 재부팅하십시오.
1. **Serial** 탭을 선택하고 [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) 매개변수 (`TELEM 2` 포트 전송 속도)를 열어서 *Auto*로 설정합니다. ![QGC Serial Baudrate 예시](../../assets/peripherals/qgc_serial_baudrate_example.png)

보조 GPS 포트를 설정 후 :

1. 두 GPS 시스템의 데이터를 혼합하도록 ECL/EKF2 추정기를 설정합니다. 자세한 지침은 [ECL EKF 사용 &gt; 이중 수신기](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers)를 참고하십시오.

### GPS를 Yaw/Heading 소스로 설정

GPS can be used as a source for yaw fusion when using modules where _yaw output is supported by the device_. This is documented in [RTK GPS > Configuring GPS as Yaw/Heading Source](../gps_compass/rtk_gps.md#configuring-gps-as-yaw-heading-source).

## 나침반 설정

Compass calibration for an included compass part is covered in: [Compass Configuration](../config/compass.md).

## 개발자 정보

- GPS/RTK-GPS
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS 드라이버](../modules/modules_driver.md#gps)
  - [DroneCAN Example](../dronecan/index.md)
- 나침반
  - [드라이버 소스 코드](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer) (나침반)

[avionics_anon_can_gnss]: https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/
[hk_ublox_neo_8mn]: https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html
[mro_neo8mn_dual_mag]: https://store.mrobotics.io/product-p/m10034-8308.htm
[hb_nano_m8_5883]: https://holybro.com/products/nano-m8-5883-gps-module
