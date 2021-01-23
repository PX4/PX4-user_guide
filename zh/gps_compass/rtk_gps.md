# RTK GPS

*RTK GPS* devices can be accurate to centimeter-level, allowing PX4 to be used in applications like precision surveying (where pinpoint accuracy is essential).

:::note GPS
can also be used as a source of yaw/heading information:

- [RTK GPS Heading with Dual u-blox F9P](../gps_compass/u-blox_f9p_heading.md).
- [GPS that Output Yaw](../gps_compass/README.md#gps-that-output-yaw).
:::

## 支持的 RTK 设备

PX4 supports the [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p), [u-blox F9P](https://www.u-blox.com/en/product/zed-f9p-module) and the [Trimble MB-Two](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) GPS, and products that incorporate them.

The RTK compatible devices below have been tested. The table indicates devices that also output yaw, and that can provide yaw when two on-vehicle units are used.

| GPS                                                                                                                         | [Yaw Output](#rtk-gps-that-output-yaw) | [Dual FP9 GPS Heading](../gps_compass/u-blox_f9p_heading.md) |
|:--------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------:|:------------------------------------------------------------:|
| [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)                                                                      |                                        |                                                              |
| [Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md)                                                                    |                                        |                                                              |
| [Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md)                                                              |                                        |                                                              |
| [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) (F9P)                                                                  |                                        |                                                              |
| [Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)                                                                     |                                        |                                                              |
| [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)                                                       |                                        |                                                              |
| [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)                                                       |                                        |                                                              |
| [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136)                                                |                                        |                           &check;                            |
| [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) |                                        |                           &check;                            |
| [mRo u-blox ZED-F9 RTK L1/L2 GPS](https://store.mrobotics.io/product-p/mr-m10020-a.htm)                                     |                                        |                           &check;                            |
| [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)                                                                  |                &check;                 |                                                              |

:::note
Some RTK modules can only be used in a particular role (base or rover), while others can be used interchangeably.
:::

## Positioning Setup/Configuration

RTK positioning requires a *pair* of [RTK GPS devices](#supported-rtk-devices): a "base" for the ground station and a "rover" for the vehicle.

In addition you will need:

- A *laptop/PC* with QGroundControl (QGroundControl for Android/iOS do not support RTK)
- A vehicle with a WiFi or Telemetry radio link to the laptop.

:::note
*QGroundControl* with a base module can theoretically enable RTK GPS for multiple vehicles/rover modules. At time of writing this use case has not been tested.
:::

### Hardware Setup

#### Rover RTK Module (Vehicle)

Connect the vehicle-based module to the flight controller's GPS port (in the same way as any other GPS module).

The actual cables/connectors required will depend on the flight controller and selected RTK module (see [documentation for the selected device](#supported-rtk-devices) for more information).

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

1. 打开*QGroundControl*，使用 USB 连接基站的 RTK GPS 到地面站。 电脑会自动识别设备。
2. 启动飞机，确保飞机连接上*QGroundControl*地面站。
    
    :::tip *QGroundControl* displays an RTK GPS status icon in the top icon bar while an RTK GPS device is connected (in addition to the normal GPS status icon). The icon is red while RTK is being set up, and then changes to white once RTK GPS is active. You can click the icon to see the current state and RTK accuracy.
:::

3. 然后 *QGroundControl* 开始设置 RTK (称为 "测量")。
    
    测量是一个获得基站准确位置的设置过程。 这个过程通常会需要几分钟（在达到[RTK 设置](#rtk-gps-settings)中指定的最小时间和精度后结束）。
    
    你也可以点击 RTK状态按钮查看。
    
    ![survey-in](../../assets/qgc/setup/rtk/qgc_rtk_survey-in.png)

4. 测量完成：

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