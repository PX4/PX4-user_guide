# GPS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜이나 UAVCAN 통신 수신기를 사용하여 글로벌 내비게이션 위성시스템(GNSS)(GPS, GLONASS, Galileo, BeiDou, QZSS 및 SBAS 포함)을 지원합니다. PX4는 센티미터 정밀도 GPS 시스템인 [실시간 운동학(RTK) GPS 수신기](../gps_compass/rtk_gps.md)를 지원합니다.

PX4는 Bosch BMM 150 MEMS (I2C 버스를 통해), HMC5883/HMC5983 (I2C 또는 SPI), IST8310 (I2C) 및 LIS3MDL (I2C 또는 SPI)과 같은 나침반 부품(자기계)과 함께 사용할 수 있습니다. 최대 4 개의 내외부 자력계를 연결할 수 있지만, 실제로는 하나만 헤딩 소스로 사용됩니다.

시스템은 *우선 순위*에 따라 자동으로 가장 적합한 나침반을 선택합니다. 외부 자기계는 내부 자기계보다 우선 순위가 높습니다. 기본 나침반이 비행 중에 실패하면, 다음 나침반을 사용하여 장애를 조치합니다. 비행전에 작동하지 않으면, 시동을 걸 수 없습니다.

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

:::tip
[Pixhawk 시리즈](../flight_controller/pixhawk_series.md) 비행 콘트롤러를 사용하는 경우에는 일반적으로 고정익 받침대 또는 날개에 모터/ESC 전원 공급 라인에서 최대한 멀리 떨어진 곳에 장착된 *결합 GPS + 나침반*을 사용하는 것이 좋습니다. 내부 나침반은 전선에서 떨어진 곳에 Pixhawk를 장착하여 전자기 간섭을 줄일 수있는 대형 기체 (예 : VTOL)에 유용할 수 *있습니다*. 대부분의 소형 운송체에서는 외부 나침반이 필수 요구사항입니다.
:::

## 지원되는 GNSS와 나침반

PX4는 u-blox, MTK Ashtech 또는 Emlid 프로토콜 또는 UAVCAN 통신 장치에서 작동합니다. 아래의 목록은 PX4 개발팀에서 테스트하였거나 PX4 커뮤니티에서 인기있는 GNSS/나침반 장치들입니다.

| 장치                                                                                                                                                                                                                                          |     GPS      |       나침반        | [RTK](../gps_compass/rtk_gps.md) | [GPS Yaw 출력](#configuring-gps-as-yaw-heading-source) | [듀얼 FP9 GPS 방향](../gps_compass/u-blox_f9p_heading.md) |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------:|:----------------:|:--------------------------------:|:----------------------------------------------------:|:-----------------------------------------------------:|
| [Avionics Anonymous UAVCAN GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/)                                                                                                                            |   SAM-M8Q    |    MMC5983MA     |                                  |                                                      |                                                       |
| [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/)                                                                                                                            |   &cross;    |     &check;      |                                  |                                                      |                                                       |
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                                                                                                                                      |   M8P/M8N    |     &check;      |             &check;              |                                                      |                                                       |
| [CubePilot Here2 GNSS GPS (M8N)](../gps_compass/gps_hex_here2.md)                                                                                                                                                                           |     M8N      |     ICM20948     |                                  |                                                      |                                                       |
| [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)                                                                                                                                                                           |     M8P      |     HMC5983      |             &check;              |                                                      |                                                       |
| [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3)                                                                                                                                                                |     M8N      |     ICM20948     |                                  |                                                      |                                                       |
| [Drotek DP0804](https://store-drotek.com/920-DP0804.html) (및 기타 [Drotek u-blox GPS/Compasses](https://store-drotek.com/index.php?controller=search&s=ublox+compass))                                                                        |     M9N      |     LIS3MDL      |                                  |                                                      |                                                       |
| [Drotek SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer)                                                                                                          |     F9P      |      RM3100      |             &check;              |                                                      |                        &check;                        |
| [Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md)                                                                                                                                                                                    |     M8U      |     LIS3MDL      |             &check;              |                                                      |                                                       |
| [Emlid Reach M +](https://emlid.com/reach/) - PX4는 이 모듈의 "일반" GPS 기능만 지원합니다. RTK 지원은 빠른 시간내에 지원할 예정입니다.                                                                                                                                     |   &check;    |     &cross;      |                                  |                                                      |                                                       |
| [Femtones MINI2 수신기](../gps_compass/rtk_gps_fem_mini2.md)                                                                                                                                                                                   | FB672, FB6A0 |     &check;      |             &check;              |                                                      |                                                       |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md)                                                                                                                                                                                        |     F9P      |     IST8310      |             &check;              |                                                      |                                                       |
| [Holybro Micro M8N GPS 모듈](https://shop.holybro.com/micro-m8n-gps_p1009.html)                                                                                                                                                               |     M8N      |     IST8310      |                                  |                                                      |                                                       |
| [Holybro Nano Ublox M8 5883 GPS 모듈](https://shop.holybro.com/nano-ublox-m8-5883-gps-module_p1236.html)                                                                                                                                      |  UBX-M8030   |     QMC5883      |                                  |                                                      |                                                       |
| [Holybro Pix32 M8N GPS 모듈](https://shop.holybro.com/pix32-gps-module_p1099.html)                                                                                                                                                            |     M8N      |     IST8310      |                                  |                                                      |                                                       |
| [Holybro Pixhawk 4 GPS 모듈 (10 핀)](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html)                                                                                                                                                 |     M8N      |     IST8310      |                                  |                                                      |                                                       |
| [Holybro Pixhawk 4 2nd GPS Module (6 pin)](https://shop.holybro.com/pixhawk4-2nd-gps-module_p1145.html)                                                                                                                                     |     M8N      |     IST8310      |                                  |                                                      |                                                       |
| [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                                                                                                                                       |     F9P      |     IST8310      |             &check;              |                                                      |                                                       |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                                                                                                                                                                       |     M8P      |     IST8310      |             &check;              |                                                      |                                                       |
| [Hobbyking u-blox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) |     M8N      |     &check;      |                                  |                                                      |                                                       |
| [mRo GPS u-blox Neo-M8N Dual Compass](https://store.mrobotics.io/product-p/m10034-8308.htm)                                                                                                                                                 |     M8N      | LIS3MDL, IST8308 |                                  |                                                      |                                                       |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm)                                                                                                                                                         |     F9P      |     &cross;      |             &check;              |                                                      |                        &check;                        |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                                                                                                                                                                |     F9P      |     &cross;      |             &check;              |                                                      |                        &check;                        |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                                                                                                                                                                  |     F9P      |     &cross;      |             &check;              |                       &check;                        |                                                       |
| [Zubax GNSS 2](https://zubax.com/products/gnss_2)                                                                                                                                                                                           |   MAX-M8Q    |     LIS3MDL      |                                  |                                                      |                                                       |

:::note

- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported. "?" indicates "unknown".
- Where possible and relevant the part name is used (i.e. &check; in the GPS column indicates that a GPS module is present but the part is not known).
- [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) is a compass (not a GPS).
- Some RTK modules can only be used in a particular role (base or rover), while others can be used interchangeably.
- The list may omit some discontinued hardware that is still supported. For example [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md) is discontinued and may be removed from the list in a future release. The original *Here* has already been removed. Check earlier versions if a discontinued module is not mentioned here.
:::

## Hardware Setup

Instructions for connecting the GPS (and compass, if present) are usually provided by the manufacturer (at least for more common [Autopilot Hardware](../flight_controller/README.md)).

[Pixhawk Series](../flight_controller/pixhawk_series.md) controllers typically have a clearly labeled port for connecting the GPS, and the compass is connected to either the I2C or SPI port/bus (depending on the device).

The [Zubax GNSS 2](https://zubax.com/products/gnss_2), [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3), and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [UAVCAN](../uavcan/README.md).

:::warning
Pay attention to pinout when connecting the GPS module. While these are all software-compatible, there are several different pin orderings.
:::

## GNSS Configuration

The "standard" GPS configuration is provided below. Additional device-specific configuration may be provided in PX4 or manufacturer device documentation (e.g. [Trimble MB-Two > Configuration](../gps_compass/rtk_gps_trimble_mb_two.md#configuration)).

:::warning
The GPS protocol expected by PX4 defaults to u-blox (by default other GPS types like Trimble, Emlid, MTK, will not be detected) The protocol can be configured with [GPS_x_PROTOCOL](../advanced_config/parameter_reference.md#GPS_1_PROTOCOL).
:::

### Configuring the Primary GPS

GPS configuration on Pixhawk is handled transparently for the user - simply connect the GPS module to the port labeled **GPS** and everything should work.

:::note
The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) works for most devices. If you are using the *Trimble MB-Two* you will need to modify the configuration to explicitly set the rate to 115200 baud.
:::

<a id="dual_gps"></a>

### Configuring a Secondary GPS (Dual GPS System)

To use a secondary GPS, attach it to any free port, and then perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `TELEM 2` port in *QGroundControl*:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **TELEM 2**. 
  - Open *QGroundControl* and navigate to the **Vehicle Setup > Parameters** section.
  - Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3). ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
2. Reboot the vehicle in order to make the other parameters visible.
3. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*. ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

After setting up the second GPS port:

1. Configure the ECL/EKF2 estimator to blend data from both GPS systems. For detailed instructions see: [Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

### Configuring GPS as Yaw/Heading Source

GPS can be used as a source for yaw fusion when using modules where *yaw output is supported by the device* (e.g. [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)) or when using some [RTK GPS Setups with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).

When using GPS for yaw fusion you will need to configure the following parameters:

| Parameter                                                                    | Setting                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) | The angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)). |
| [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK)   | Set bit position 7 "GPS yaw fusion" to `1` (i.e. add 128 to the parameter value).                                                                                                                               |

:::tip
If using this feature, all other configuration should be setup up as normal (e.g. [RTK Positioning](../gps_compass/rtk_gps.md#positioning-setup-configuration)).
:::

## Compass Configuration

Compass calibration is covered in: [Compass Configuration](../config/compass.md). The process is straightforward and will autodetect, calibrate and prioritise all connected magnetometers.

Further compass configuration should generally not be required.

:::note
All external compasses are given the same priority by default, which is higher than the prority shared by all internal compasses.
:::

### Disable a Compass

As stated above, generally no further configuration should be required.

That said, developers can disable internal compasses if desired using the compass parameters. These are prefixed with [CAL*MAGx*](../advanced_config/parameter_reference.md#CAL_MAG0_ID) (where `x=0-3`).

To disable an internal compass:

- Use [CAL_MAGn_ROT](../advanced_config/parameter_reference.md#CAL_MAG0_ROT) to determine which compasses are internal. A compass is internal if `CAL_MAGn_ROT==1`.
- Then use [CAL\_MAGx\_PRIO](../advanced_config/parameter_reference.md#CAL_MAG0_PRIO) to disable the compass. This can also be used to change the relative priority of a compass.

## Developer Information

- GPS/RTK-GPS 
  - [RTK-GPS](../advanced/rtk_gps.md)
  - [GPS driver](../modules/modules_driver.md#gps)
  - [UAVCAN Example](../uavcan/README.md)
- Compass 
  - [Driver source code](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer) (Compasses)