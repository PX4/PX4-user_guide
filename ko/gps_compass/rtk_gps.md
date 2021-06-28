# RTK GPS

PX4에서는 *RTK GPS* 장치의 센티미터 수준의 정확도로 정밀측량이 가능합니다.

:::note GPS는 요/방향 정보의 소스로 사용할 수 있습니다.

- [듀얼 u-blox F9P를 사용한 RTK GPS 헤딩](../gps_compass/u-blox_f9p_heading.md).
- 일부 GPS 출력 요 (아래 표 참조).
:::

## 지원되는 RTK 장치

PX4는 [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p), [u-blox F9P](https://www.u-blox.com/en/product/zed-f9p-module) 및 [Trimble MB-Two](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) GPS와 통합 제품을 지원합니다.

PX4에서 작동하는 RTK 호환 장치(단종 된 장치 제외)는 아래와 같습니다. 표는 편요각를 출력하는 장치를 나타내며 두 개의 장치를 사용하여 편요각를 제공할 수 있습니다.

| GPS                                                                                                                         | 편요각 출력  | [듀얼 FP9 GPS 방향각](../gps_compass/u-blox_f9p_heading.md) | [CAN](../uavcan/README.md) |
|:--------------------------------------------------------------------------------------------------------------------------- |:-------:|:------------------------------------------------------:|:--------------------------:|
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                      |         |                                                        |                            |
| [Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md)                                                                    |         |                                                        |                            |
| [Femtones MINI2 수신기](../gps_compass/rtk_gps_fem_mini2.md)                                                                   |         |                                                        |                            |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) (F9P)                                                                  |         |                                                        |                            |
| [CubePilot Here3](https://www.cubepilot.org/#/here/here3)                                                                   |         |                                                        |          &check;           |
| [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                       |         |                                                        |                            |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                                                       |         |                                                        |                            |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                                                |         |                        &check;                         |                            |
| [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) |         |                        &check;                         |                            |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/m10020d.htm)                                         |         |                        &check;                         |                            |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                                                  | &check; |                                                        |                            |

:::note
일부 RTK 모듈은 특정 기능(베이스 또는 로버)으로만 사용할 수 있는 반면, 다른 모듈은 서로 교환하여 사용할 수 있습니다.
:::

## 포지셔닝 설정

RTK 포지셔닝에는 [RTK GPS 장치](#supported-rtk-devices)의 *쌍*이 필요합니다. 지상국을 위한 "베이스"와 차량을 위한 "로버"입니다.

추가로 다음과 같은 것들이 필요합니다.

- QGroundControl 실행 가능한 *노트북/PC* (Android/iOS 용 QGroundControl은 RTK를 지원하지 않음)
- 노트북에 WiFi 또는 원격 텔레메트리 링크가 있는 기체.

:::note
기본 모듈이있는 *QGroundControl*은 이론적으로 여러 기체/로버 모듈에 RTK GPS를 활성화 가능합니다. 이 문서 작성 시점에서 이것의 사용 사례는 테스트되지 않았습니다.
:::

### 하드웨어 설정

#### 로버 RTK 모듈 (차량)

The connection method and cables/connectors required depends on the selected RTK module (and on the [flight controller](../flight_controller/README.md)).

Most are connected via the flight controller's GPS port, in the same way as any other GPS module. Some are connected to the [UAVCAN](../uavcan/README.md) bus.

See [documentation for the selected device](#supported-rtk-devices) and [UAVCAN](../uavcan/README.md) for more information on wiring and configuration.

#### Base RTK Module (Ground)

Connect the base module to *QGroundControl* via USB. The base module must not be moved while it is being used.

:::tip
Choose a position where the base module won't need to be moved, has a clear view of the sky, and is well separated from any buildings. Often it is helpful to elevate the base GPS, by using a tripod or mounting it on a roof.
:::

#### Telemetry Radio/WiFi

The vehicle and ground control laptop must be connected via [wifi or a radio telemetry link](../telemetry/README.md).

The link *must* use the MAVLink 2 protocol as it makes more efficient use of the channel. This should be set by default, but if not, follow the [MAVLink2 configuration instructions](#mavlink2) below.

### RTK Connection Process

The RTK GPS connection is essentially plug and play:

1. Start *QGroundControl* and attach the base RTK GPS via USB to the ground station. The device is recognized automatically.
2. Start the vehicle and make sure it is connected to *QGroundControl*.
    
:::tip
*QGroundControl* displays an RTK GPS status icon in the top icon bar while an RTK GPS device is connected (in addition to the normal GPS status icon). The icon is red while RTK is being set up, and then changes to white once RTK GPS is active. You can click the icon to see the current state and RTK accuracy.
:::

3. *QGroundControl* then starts the RTK setup process (known as "Survey-In").
    
    Survey-In is a startup procedure to get an accurate position estimate of the base station. The process typically takes several minutes (it ends after reaching the minimum time and accuracy specified in the [RTK settings](#rtk-gps-settings)).
    
    You can track the progress by clicking the RTK GPS status icon.
    
    ![survey-in](../../assets/qgc/setup/rtk/qgc_rtk_survey-in.png)

4. Once Survey-in completes:

- The RTK GPS icon changes to white and *QGroundControl* starts to stream position data to the vehicle:
    
    ![RTK streaming](../../assets/qgc/setup/rtk/qgc_rtk_streaming.png)

- Vehicle GPS switches to RTK mode. The new mode is displayed in the *normal* GPS status icon (`3D RTK GPS Lock`):
    
    ![RTK GPS Status](../../assets/qgc/setup/rtk/qgc_rtk_gps_status.png)

### Optional PX4 Configuration

The following settings may need to be changed (using *QGroundControl*).

#### RTK GPS settings

The RTK GPS settings are specified in the *QGroundControl* [General Settings](https://docs.qgroundcontrol.com/en/SettingsView/General.html#rtk_gps) (**SettingsView > General Settings > RTK GPS**).

![RTK GPS Setup](../../assets/qgc/setup/rtk/settings_view_general_rtk_gps.jpg)

These settings define the minimum duration and minimum accuracy for completing the RTK GPS setup process (known as "Survey-In).

:::tip
You can save and reuse a base position in order to save time: perform Survey-In once, select *Use Specified Base Position* and press **Save Current Base Position** to copy in the values for the last survey. The values will then persist across QGC reboots until they are changed.
:::

#### MAVLink2

The MAVLink2 protocol must be used because it makes more efficient use of lower-bandwidth channels. This should be enabled by default on recent builds.

To ensure MAVLink2 is used:

- Update the telemetry module firmware to the latest version (see [QGroundControl > Setup > Firmware](https://docs.qgroundcontrol.com/en/SetupView/Firmware.html)).
- Set [MAV_PROTO_VER](../advanced_config/parameter_reference.md#MAV_PROTO_VER) to 2 (see [QGroundControl Setup > Parameters](https://docs.qgroundcontrol.com/en/SetupView/Parameters.html))

#### Tuning

You may also need to tune some parameters as the default parameters are tuned assuming a GPS accuracy in the order of meters, not centimeters. For example, you can decrease [EKF2_GPS_V_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_V_NOISE) and [EKF2_GPS_P_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_P_NOISE) to 0.2.

#### Dual Receivers

A second GPS receiver can be used as a backup (either RTK or non RTK). See the [EKF2 GPS Configuration](../advanced_config/tuning_the_ecl_ekf.md#gps) section.

<!--

- Video demonstration would be nice.
- something that shows positioning of base, connection of RTK rover, survey in process. Some sort of short precision survey.
-->

### Vehicle Setup Example

The airframe build topic [DJI Flamewheel 450 with distance sensor and RTK GPS](../frames_multicopter/dji_flamewheel_450.md) describes an airframe setup with the Here+ RTK GPS and a Pixhawk 3 Pro.

## Further Information

- [RTK-GPS (PX4-Integration)](../advanced/rtk_gps.md): Developer information about integrating RTK-GPS support into PX4.
- [Real Time Kinematic](https://en.wikipedia.org/wiki/Real_Time_Kinematic) (Wikipedia)