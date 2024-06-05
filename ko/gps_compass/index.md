# GPS와 나침반

A GNSS system is needed for missions, and some other automatic and manual/assisted modes. PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜이나 UAVCAN 통신 수신기를 사용하여 글로벌 내비게이션 위성시스템(GNSS)(GPS, GLONASS, Galileo, BeiDou, QZSS 및 SBAS 포함)을 지원합니다.

Up to two GPS modules can be connected using either a UART or the CAN bus:

- A primary [GNSS module](../gps_compass/#supported-gnss) that usually also includes a [compass/magnetometer](../gps_compass/magnetometer.md), [buzzer](../getting_started/px4_basic_concepts.md#buzzer), [safety switch](../getting_started/px4_basic_concepts.md#safety-switch), and [UI LED](../getting_started/led_meanings.md#ui-led).
- An optional secondary GNSS/compass module that is used as a fallback. This may include a buzzer, safety switch, LEDs, but these are not used by PX4.

![GPS와 나침반](../../assets/hardware/gps/gps_compass.jpg)

::: info PX4 also supports [Real Time Kinematic (RTK)](../gps_compass/rtk_gps.md) and **Post-Processing Kinematic (PPK)** GNSS Receivers, which extend GNSS systems to centimetre-level precision.
:::


## 지원되는 GNSS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜 또는 UAVCAN 통신 장치에서 작동합니다.

This table contains non-RTK GNSS units (most of which also have a compass). These have been tested by the PX4 dev team, or which are popular within the PX4 community.

| 장치                                                                        |     GPS     |            나침반            | [CAN](../dronecan/index.md) | Buzzer / SafeSw / LED | Notes                       |
|:------------------------------------------------------------------------- |:-----------:|:-------------------------:|:---------------------------:|:---------------------:|:--------------------------- |
| [ARK GPS](https://arkelectron.com/product/ark-gps/)                       |     M9N     |         ICM42688p         |           &check;           |        &check;        | + Baro, IMU                 |
| [Avionics Anonymous UAVCAN GNSS/Mag][avionics_anon_can_gnss]              |   SAM-M8Q   |         MMC5983MA         |           &check;           |        &cross;        |                             |
| [CUAV NEO 3 GPS](../gps_compass/gps_cuav_neo_3.md)                        |     M9N     |          IST8310          |                             |        &check;        |                             |
| [CUAV NEO 3 Pro GPS](../gps_compass/gps_cuav_neo_3pro.md)                 |     M9N     |          RM3100           |           &check;           |        &check;        | + Baro                      |
| [CUAV NEO 3X GPS](../gps_compass/gps_cuav_neo_3x.md)                      |     M9N     |          RM3100           |           &check;           | &cross;&check;&check; | + Baro.                     |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)         |     M8N     |         ICM20948          |                             |        &check;        | Superseded by HERE3         |
| [Emlid Reach M+](https://emlid.com/reach/)                                |   &check;   |          &cross;          |                             |        &cross;        | Supports PPK. RTK expected. |
| [Holybro DroneCAN M8N GPS](../dronecan/holybro_m8n_gps.md)                |     M8N     |          BMM150           |           &check;           |        &cross;        | + Baro                      |
| [Holybro Micro M8N GPS](https://holybro.com/products/micro-m8n-gps)       |     M8N     |          IST8310          |                             |        &cross;        |                             |
| [Holybro Nano Ublox M8 5883 GPS][hb_nano_m8_5883]                         |  UBX-M8030  |          QMC5883          |                             |        &cross;        |                             |
| [Holybro M8N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M8N     |          IST8310          |                             |        &check;        |                             |
| [Holybro M9N GPS](../gps_compass/gps_holybro_m8n_m9n.md)                  |     M9N     |          IST8310          |                             |        &check;        |                             |
| [Holybro DroneCAN M9N GPS](https://holybro.com/products/dronecan-m9n-gps) |     M9N     |          BMM150           |           &check;           |        &check;        |                             |
| [Hobbyking u-blox Neo-M8N GPS with Compass][hk_ublox_neo_8mn]             |     M8N     |          &check;          |                             |        &cross;        |                             |
| [LOCOSYS Hawk A1 GNSS receiver](../gps_compass/gps_locosys_hawk_a1.md)    | MC-1612-V2b |         optional          |                             | &cross;&cross;&check; |                             |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                   | MC-1612-V2b |                           |                             | &cross;&cross;&check; |                             |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                   | MC-1612-V2b |          IST8310          |                             | &cross;&cross;&check; |                             |
| [mRo GPS u-blox Neo-M8N Dual Compass][mro_neo8mn_dual_mag]                |     M8N     |     LIS3MDL, IST8308      |                             |        &cross;        |                             |
| [Sky-Drones SmartAP GPS](../gps_compass/gps_smartap.md)                   |     M8N     | HMC5983, IST8310, LIS3MDL |                             |        &check;        | + Baro                      |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                         |   MAX-M8Q   |          LIS3MDL          |                             |        &cross;        | + Baro                      |

<!-- links to improve layout of table for editing -->

Notes:

- &check; 또는 특정 부품 번호는 기능이 지원되는 것을 나타내며, &cross; 또는 비어 있으면 해당 기능이 지원되지 않는 것을 나타냅니다. "?"는 "알 수 없음"을 나타냅니다.
- 가능하고 관련성이있는 경우 부품 이름이 사용됩니다 (예 : GPS 열의 &check; GPS 모듈이 있지만 부품을 알 수 없음을 나타냄).
- The list may omit some discontinued hardware that is still supported (check earlier versions for info about discontinued modules). Removed items include:
  - _Here_ GPS
  - Drotek DP0804

## Mounting the GNSS/Compass

PX4는 Bosch BMM 150 MEMS (I2C 버스를 통해), HMC5883/HMC5983 (I2C 또는 SPI), IST8310 (I2C) 및 LIS3MDL (I2C 또는 SPI)과 같은 나침반 부품(자기계)과 함께 사용할 수 있습니다. 최대 4 개의 내외부 자력계를 연결할 수 있지만, 실제로는 하나만 헤딩 소스로 사용됩니다.

[Mounting the Compass](../assembly/mount_gps_compass.md) explains how to mount a GNSS module that has a compass.

## 하드웨어 설정

The hardware setup depends on the flight controller, the GNSS module, and the connection bus it supports - UART/I2C or CAN.

### Pixhawk Standard Connectors

Connecting GNSS/Compass modules is easiest when using a flight controller that supports the [Pixhawk connector standard](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf). All flight controllers that follow this standard, including most [Pixhawk Standard](../flight_controller/autopilot_pixhawk_standard.md) controllers (and many others) use the same port connectors and wiring for connecting GNSS modules. Because of this standardization, many popular GNSS/Compass modules plug directly into the flight controller "out of the box".

If you're using GNSS/Compass modules that connect via generic UARTs and serial protocols like I2C:

- The primary GNSS/Compass module should be connected to the 10-pin port labelled `GPS1`, `GPS&SAFETY`, or `GPS` (this is port described as "Full GPS + Safety Switch Port" in the connector standard). The GPS should incorporate a [buzzer](../getting_started/px4_basic_concepts.md#buzzer), [safety switch](../getting_started/px4_basic_concepts.md#safety-switch), and [UI LED](../getting_started/led_meanings.md#ui-led).
- An (optional) secondary module can be connected to the 6-pin `GPS2` port, if present (this is "Basic GPS Port" in the standard).
- The ports are generally plug-n-play for u-blox modules (only).

::: info The ports include a UART for the GNSS and an I2C port for connecting the Compass. The "Full GPS + Safety Switch Port" includes additional I2C connectors for LEDs, buzzer and safety switch. There is nothing to stop you from connecting the GPS pins to any other free UART as a GNSS port, and the compass or buzzer to an I2C port. However if you do this then you will need to [configure the ports](../peripherals/serial_configuration.md).
:::

For [DroneCAN](../dronecan/index.md#supported-hardware) GNSS/compass modules:

- DroneCan GPS modules are connected to CAN-bus ports, which are 4-pin ports labeled `CAN1` or `CAN2`.

### Other Flight Controllers/GNSS Modules

If you're working with a flight controller and GNSS module combination that does not comply with the Pixhawk connector standard then you will need to pay particular attention to the connector pinouts on the flight controller and the module. You may need to rewire/solder the connectors.

:::warning
Some flight controllers use ports that are software-compatible but not connector compatible (even if they use the same connector!) because they use different pin orderings.
:::

The pinouts for the connector standard are documented in the standard. Pinouts for other controllers and the GNSS modules should be included in their manufacturer documentation.

## GNSS 설정

The default configuration for GPS module connected via the GPS serial port is provided below. 추가 장치 설정은 PX4 또는 제조업체 장치설명서에서 제공될 수 있습니다 (예 : [Trimble MB-Two &gt; 설정](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

### Primary GPS Configuration (UART)

Primary GPS configuration on Pixhawk is handled transparently for U-Blox GPS modules — simply connect the GPS module to the port labeled `GPS1`, `GPS&SAFETY`, or `GPS` (if there is only one GPS port), and everything should work.

The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) configures `GPS1` as a GPS port using [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), sets the protocol to `u-blox` with [GPS_1_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL), and a baud rate of `0: Auto` with [SER_GPS1_BAUD](../advanced_config/parameter_reference.md#SER_GPS1_BAUD).

For GPS types like Trimble, Emlid, MTK, you will need to change the `GPS_1_PROTOCOL` appropriately. For _Trimble MB-Two_ you will also need to modify `SER_GPS1_BAUD` to set the rate to 115200 baud.

<a id="dual_gps"></a>

### Secondary GPS Configuration (UART)

To use a secondary GPS, you will generally attach it to the port named `GPS2`, if present, and otherwise attach it to any free UART port. The port may be pre-configured, but unlike the primary port, this is not guaranteed.

To ensure the port is set up correctly perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `GPS 2` port in _QGroundControl_:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **GPS 2**.

   - *QGroundControl*에서 **기체 설정 &gt; 매개변수** 섹션으로 이동합니다.
   - Select the **GPS** tab, then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter and select `GPS 2` from the dropdown list.

     ![QGC Serial 예시](../../assets/peripherals/qgc_serial_config_example.png)

1. 다른 매개변수를 표시하려면 기체를 재부팅하십시오.
1. Select the **Serial** tab, and open the [SER_GPS2_BAUD](../advanced_config/parameter_reference.md#SER_GPS2_BAUD) parameter (`GPS 2` port baud rate): set it to _Auto_ (or 115200 for the Trimble).

   ![QGC Serial Baudrate 예시](../../assets/peripherals/qgc_serial_baudrate_example.png)

보조 GPS 포트를 설정 후 :

1. 두 GPS 시스템의 데이터를 혼합하도록 ECL/EKF2 추정기를 설정합니다. 자세한 지침은 [ECL EKF 사용 &gt; 이중 수신기](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers)를 참고하십시오.

### DroneCAN GNSS Configuration

[DroneCAN](../dronecan/index.md#supported-hardware) GNSS configuration is covered in the linked document (and in the documentation for specific modules).

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
