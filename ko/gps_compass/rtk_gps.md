# RTK GPS

[Real Time Kinematic (RTK)](https://en.wikipedia.org/wiki/Real_Time_Kinematic) GNSS/GPS systems provide centimeter-level accuracy, allowing PX4 to be used in applications like precision surveying (where pinpoint accuracy is essential).

This feature requires _QGroundControl_ running on a laptop/PC and a vehicle with a WiFi or Telemetry radio link to the ground station laptop.

::: info Some RTK GNSS setups can provide yaw/heading information, as an alternative to the compass:

- [듀얼 u-blox F9P를 사용한 RTK GPS 헤딩](../gps_compass/u-blox_f9p_heading.md).
- GPS directly output yaw (see table below).

PX4는 [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p), [u-blox F9P](https://www.u-blox.com/en/product/zed-f9p-module) 및 [Trimble MB-Two](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) GPS와 통합 제품을 지원합니다.

## 지원되는 RTK 장치

PX4 supports the [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p), [u-blox F9P](https://www.u-blox.com/en/product/zed-f9p-module) and the [Trimble MB-Two](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) GPS, and products that incorporate them.

:::note
일부 RTK 모듈은 특정 기능(베이스 또는 로버)으로만 사용할 수 있는 반면, 다른 모듈은 서로 교환하여 사용할 수 있습니다. The table indicates devices that also output yaw, and that can provide yaw when two on-vehicle units are used. It also highlights devices that connect via the CAN bus, and those which support PPK (Post-Processing Kinematic).

| Device                                                                                            |         GPS          |  Compass  | [DroneCAN](../dronecan/index.md) | [GPS Yaw](#configuring-gps-as-yaw-heading-source) | [Dual F9P GPS Heading](../gps_compass/u-blox_f9p_heading.md) |   PPK   |
|:------------------------------------------------------------------------------------------------- |:--------------------:|:---------:|:--------------------------------:|:-------------------------------------------------:|:------------------------------------------------------------:|:-------:|
| [ARK RTK GPS](https://arkelectron.com/product/ark-rtk-gps/)                                       |         F9P          | ICM42688p |             &check;              |                                                   |                           &check;                            |         |
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                            |       M8P/M8N        |  &check;  |                                  |                                                   |                                                              |         |
| [CUAV C-RTK2](../gps_compass/rtk_gps_cuav_c-rtk2.md)                                              |         F9P          |  &check;  |                                  |                                                   |                           &check;                            |         |
| [CUAV C-RTK 9Ps GPS](../gps_compass/rtk_gps_cuav_c-rtk-9ps.md)                                    |         F9P          |  RM3100   |                                  |                                                   |                           &check;                            |         |
| [CUAV C-RTK2 PPK/RTK GNSS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                  |         F9P          |  RM3100   |                                  |                                                   |                                                              | &check; |
| [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)                                 |         M8P          |  HMC5983  |                                  |                                                   |                                                              |         |
| [CubePilot Here3 CAN GNSS GPS (M8N)](https://www.cubepilot.org/#/here/here3)                      |         M8P          | ICM20948  |             &check;              |                                                   |                                                              |         |
| [Drotek SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html) |         F9P          |  RM3100   |                                  |                                                   |                           &check;                            |         |
| [Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md)                                    |     FB672, FB6A0     |  &check;  |                                  |                                                   |                                                              |         |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md)                                              |         F9P          |  IST8310  |                                  |                                                   |                                                              |         |
| [Holybro H-RTK F9P Ultralight](https://holybro.com/products/h-rtk-f9p-ultralight)                 |         F9P          |  IST8310  |                                  |                                                   |                           &check;                            |         |
| [Holybro H-RTK F9P Helical or Base](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                  |         F9P          |  IST8310  |                                  |                                                   |                           &check;                            |         |
| [Holybro DroneCAN H-RTK F9P Helical](https://holybro.com/products/dronecan-h-rtk-f9p-helical)     |         F9P          |  BMM150   |             &check;              |                                                   |                           &check;                            |         |
| [Holybro H-RTK F9P Rover Lite](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                       |         F9P          |  IST8310  |                                  |                                                   |                                                              |         |
| [Holybro DroneCAN H-RTK F9P Rover](https://holybro.com/products/dronecan-h-rtk-f9p-rover)         |         F9P          |  BMM150   |                                  |                                                   |                           &check;                            |         |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                             |         M8P          |  IST8310  |                                  |                                                   |                                                              |         |
| [Holybro H-RTK Unicore UM982 GPS](../gps_compass/rtk_gps_holybro_unicore_um982.md)                |        UM982         |  IST8310  |                                  |                                                   |                                                              |         |
| [LOCOSYS Hawk R1](../gps_compass/rtk_gps_locosys_r1.md)                                           |     MC-1612-V2b      |           |                                  |                                                   |                                                              |         |
| [LOCOSYS Hawk R2](../gps_compass/rtk_gps_locosys_r2.md)                                           |     MC-1612-V2b      |  IST8310  |                                  |                                                   |                                                              |         |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm)               |         F9P          |  &check;  |                                  |                                                   |                           &check;                            |         |
| [Septentrio AsteRx-m3 Pro](../gps_compass/septentrio_asterx-rib.md)                               |        AsteRx        |  &check;  |                                  |                      &check;                      |               Septentrio dual antenna heading                | &check; |
| [Septentrio mosaic-go](../gps_compass/septentrio_mosaic-go.md)                                    | mosaic X5 / mosaic H |  &check;  |                                  |                      &check;                      |               Septentrio dual antenna heading                | &check; |
| [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-sirius-rtk-gnss-rover-f9p.html)        |         F9P          |  &check;  |                                  |                                                   |                           &check;                            |         |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                      |         F9P          |  &check;  |                                  |                                                   |                           &check;                            |         |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                        |         F9P          |  &check;  |                                  |                      &check;                      |                                                              |         |

RTK GPS 설정은 *QGroundControl* [일반 설정](https://docs.qgroundcontrol.com/en/SettingsView/General.html#rtk_gps) (**SettingsView &gt; 일반 설정 &gt; RTK GPS **)에서 지정됩니다.

- &check; or a specific part number indicate that a features is supported, while &cross; or empty show that the feature is not supported. "?" indicates "unknown".
- Where possible and relevant the part name is used (i.e. &check; in the GPS column indicates that a GPS module is present but the part is not known).
- Some RTK modules can only be used in a particular role (base or rover), while others can be used interchangeably.
- The list may omit some discontinued hardware that is still supported. For example [CubePilot Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md) is discontinued and may be removed from the list in a future release. Check earlier versions if a discontinued module is not mentioned here.


## 포지셔닝 설정

RTK positioning requires a _pair_ of [RTK GNSS devices](#supported-devices): a "base" for the ground station and a "rover" for the vehicle.

추가로 다음과 같은 것들이 필요합니다.

- A _laptop/PC_ with QGroundControl (QGroundControl for Android/iOS do not support RTK)
- 노트북에 WiFi 또는 원격 텔레메트리 링크가 있는 기체.

::: info _QGroundControl_ with a base module can theoretically enable RTK GPS for multiple vehicles/rover modules. 이 문서 작성 시점에서 이것의 사용 사례는 테스트되지 않았습니다.
:::

### 하드웨어 설정

#### 로버 RTK 모듈 (차량)

필요한 연결 방법과 케이블/커넥터는 선택한 RTK 모듈과 [비행 콘트롤러](../flight_controller/README.md)에 따라 달라집니다.

대부분은 다른 GPS 모듈과 같은 방식으로 비행 콘트롤러의 GPS 포트를 통해 연결됩니다. Some are connected to the [CAN](../can/index.md) bus (i.e. using [DroneCAN](../dronecan/index.md)).

See [documentation for the selected device](#supported-devices), general [GNSS Hardware/Configuration Setup](../gps_compass/index.md#hardware-setup), and [DroneCAN](../dronecan/index.md) for more information on wiring and configuration.

#### 기본 RTK 모듈 (접지)

Connect the base module to _QGroundControl_ via USB. 기본 모듈을 사용하는 동안 이동하면 안됩니다.

:::tip
기본 모듈을 이동할 필요가 없는 하늘이 잘 보이고 건물과 잘 분리된 위치를 선택하십시오.
삼각대를 사용하거나 지붕에 장착하여 기본 GPS의 위치를 높이는 것이 도움이되는 경우가 많이 있습니다.
:::

#### 텔레메트리 라디오/WiFi

기체 지상제어용 노트북은 [wifi 또는 무선 텔레메트리 링크](../telemetry/README.md)를 통하여 연결하여야 합니다.

The link _must_ use the MAVLink 2 protocol as it makes more efficient use of the channel. 기본적으로 설정되어야 하지만, 그렇지 않은 경우에는 아래 [MAVLink2 설정 방법](#mavlink2)을 따르십시오.

### RTK 연결 프로세스

RTK GPS 연결은 기본적으로 플러그앤플레이입니다.

1. *QGroundControl*을 실행하고 USB를 통하여 기본 RTK GPS를 지상국에 연결합니다. 장치가 자동으로 인식됩니다.
1. 차량의 시동을 걸고 *QGroundControl*에 연결되어 있는지 확인하십시오.

:::tip
*QGroundControl*은 RTK GPS 장치가 연결되어 있는 동안 상단 아이콘 표시줄에 RTK GPS 상태 아이콘을 표시합니다 (일반 GPS 상태 아이콘 추가). RTK가 설정되는 동안 아이콘은 빨간색으로 표시되고, RTK GPS가 활성화되면 흰색으로 바뀝니다. 아이콘을 클릭하여 현재 상태와 RTK 정확도를 확인할 수 있습니다.
:::

1. 그런 다음 *QGroundControl*은 RTK 설정 프로세스( "Survey-In"이라고 함)를 시작합니다.

   Survey-In은 기지국의 정확한 위치 추정치를 획득을 위한 시작 절차입니다. 이 프로세스는 일반적으로 몇 분 정도 걸립니다 ([RTK 설정](#rtk-gps-settings)에 지정된 최소 시간 및 정확도에 도달하면 종료됨).

   RTK GPS 상태 아이콘을 클릭하여 진행 상황을 추적할 수 있습니다.

   ![survey-in](../../assets/qgc/setup/rtk/qgc_rtk_survey-in.png)

1. Survey-in이 완료되면 :

   - The RTK GPS icon changes to white and _QGroundControl_ starts to stream position data to the vehicle:

     ![RTK 스트리밍](../../assets/qgc/setup/rtk/qgc_rtk_streaming.png)

   - 기체의 GPS가 RTK 모드로 전환됩니다. The new mode is displayed in the _normal_ GPS status icon (`3D RTK GPS Lock`):

     ![RTK GPS 상태](../../assets/qgc/setup/rtk/qgc_rtk_gps_status.png)

### Configuring GPS as Yaw/Heading Source

GPS can be used as a source for yaw fusion when using modules where _yaw output is supported by the device_ (e.g. [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)) or when using some [RTK GPS Setups with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).

When using GPS for yaw fusion you will need to configure the following parameters:

| Parameter                                                                    | Setting                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GPS_YAW_OFFSET](../advanced_config/parameter_reference.md#GPS_YAW_OFFSET) | The angle made by the *baseline* (the line between the two GPS antennas) relative to the vehicle x-axis (front/back axis, as shown [here](../config/flight_controller_orientation.md#calculating-orientation)). |
| [EKF2_GPS_CTRL](../advanced_config/parameter_reference.md#EKF2_GPS_CTRL)   | Set bit position 3 "Dual antenna heading" to `1` (i.e. add 8 to the parameter value).                                                                                                                           |

:::tip
If using this feature, all other configuration should be setup up as normal (e.g. [RTK Positioning](../gps_compass/rtk_gps.md#positioning-setup-configuration)).
:::

### 선택적 PX4 구성

The following settings may need to be changed (using _QGroundControl_).

#### RTK GPS 설정

The RTK GPS settings are specified in the _QGroundControl_ [General Settings](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/settings_view/general.html#rtk_gps) (**SettingsView > General Settings > RTK GPS**).

![RTK GPS 설정](../../assets/qgc/setup/rtk/settings_view_general_rtk_gps.jpg)

이러한 설정은 RTK GPS 설정 프로세스 ( "Survey-In) 완료를 위한 최소 기간과 최소 정확도를 정의합니다.

:::tip
You can save and reuse a base position in order to save time: perform Survey-In once, select _Use Specified Base Position_ and press **Save Current Base Position** to copy in the values for the last survey. 그러면 값이 변경시까지 QGC 재부팅시에도 유지됩니다.
:::

#### MAVLink2

MAVLink2 프로토콜은 낮은 대역폭 채널을 보다 효율적으로 사용하기 때문에 사용하여야합니다. 이것은 최근 빌드에서 기본적으로 활성화되어야 합니다.

MAVLink2가 사용되는 지 확인하려면 :

- Update the telemetry module firmware to the latest version (see [QGroundControl > Setup > Firmware](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/firmware.html)).
- Set [MAV_PROTO_VER](../advanced_config/parameter_reference.md#MAV_PROTO_VER) to 2 (see [QGroundControl Setup > Parameters](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/parameters.html))

#### 튜닝

GPS 정확도를 센티미터가 아닌 미터 단위로 가정하여 기본 매개변수가 조정되므로 일부 매개변수를 조정하여야 할 수도 있습니다. 예를 들어 [EKF2_GPS_V_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_V_NOISE)와 [EKF2_GPS_P_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_P_NOISE)를 0.2로 줄일 수 있습니다.

#### 이중 수신기

두 번째 GPS 수신기는 백업으로 사용할 수 있습니다 (RTK 또는 비 RTK). [EKF2 GPS 설정](../advanced_config/tuning_the_ecl_ekf.md#gps) 섹션을 참고하십시오.


<!--
- Video demonstration would be nice.
- something that shows positioning of base, connection of RTK rover, survey in process. Some sort of short precision survey.
-->

## 추가 정보

- [RTK-GPS (PX4-Integration)](../advanced/rtk_gps.md) : RTK-GPS 지원을 PX4에 통합에 대한 개발자 정보입니다.
- [실시간 운동학](https://en.wikipedia.org/wiki/Real_Time_Kinematic) (Wikipedia)
