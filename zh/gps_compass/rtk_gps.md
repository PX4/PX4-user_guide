# RTK GPS

实时差分可以将 GNSS/GPS 的精度提高到厘米级。 装备 RTK 后可以将 PX4 应用到需要精确定位的精确测绘中。

你需要：

- 一对[RTK GPS 设备](#supported-rtk-devices)（地面站和移动站）
- 一台装有 QGroundControl 的 *PC 或笔记本*（Android/iOS 的 QGroundControl 地面站不支持 RTK）
- 一架连接有 WiFi 或数传的飞机

> **Note***QGroundControl*理论上可以在多台飞机启用 RTK GPS（每台设备上都安装一个移动站）。 在编写本文时, 此用发还未进行测试。

## 支持的 RTK 设备

PX4 supports the [u-blox M8P](https://www.u-blox.com/en/product/neo-m8p), [u-blox F9P](https://www.u-blox.com/en/product/zed-f9p-module) and the [Trimble MB-Two](https://www.trimble.com/Precision-GNSS/MB-Two-Board.aspx) GPS and products that incorporate it.

The following RTK-compatible devices have been tested.

- [CUAV C-RTK GPS](../gps_compass/rtk_gps_cuav_c-rtk.md)
- [Drotek XL RTK GPS](../gps_compass/rtk_gps_drotek_xl.md)
- [Femtones MINI2 Receiver](../gps_compass/rtk_gps_fem_mini2.md) 
- [Freefly RTK GPS](../gps_compass/rtk_gps_freefly.md) (F9P)
- [Here+ RTK GPS](../gps_compass/rtk_gps_hex_hereplus.md)
- [Holybro H-RTK F9P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)
- [Holybro H-RTK M8P GNSS](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)
- [SparkFun GPS-RTK2 Board - ZED-F9P](https://www.sparkfun.com/products/15136) (www.sparkfun.com)
- [SIRIUS RTK GNSS ROVER (F9P)](https://store-drotek.com/911-1010-sirius-rtk-gnss-rover-f9p.html#/158-sensor-no_magnetometer) (store-drotek.com)
- [Trimble MB-Two](../gps_compass/rtk_gps_trimble_mb_two.md)

> **Note**有一些 RTK 模块只能作为基站或移动站，有的则可以两用。

## 硬件安装

### RTK 移动站（飞机）

Connect the vehicle-based module to the flight controller's GPS port (in the same way as any other GPS module).

The actual cables/connectors required will depend on the flight controller and selected RTK module (see [documentation for the selected device](#supported-rtk-devices) for more information).

### RTK 基站（地面端）

Connect the base module to *QGroundControl* via USB. The base module must not be moved while it is being used.

> **Tip**选择一个不会移动的地方，上方开阔，最好避开建筑物。 使用三脚架或安装在屋顶，效果更好。

### 电台/WiFi

The vehicle and ground control laptop must be connected via [wifi or a radio telemetry link](../telemetry/README.md).

The link *must* use the MAVLink2 protocol as it makes more efficient use of the channel. This should be set by default, but if not, follow the [MAVLink2 configuration instructions](#mavlink2) below.

## RTK 连接步骤

The RTK GPS connection is essentially plug and play:

1. 打开*QGroundControl*，使用 USB 连接基站的 RTK GPS 到地面站。 电脑会自动识别设备。
2. 启动飞机，确保飞机连接上*QGroundControl*地面站。
    
    > **Tip**当 RTK GPS 设备连接上，在上面工具栏的正常显示GPS的位置，会显示 RTK GPS 的状态。 当 RTK 正在被设置，会显示为红色，RTK GPS 激活后会变为白色。 点击图标，可以查看当前状态和 RTK 的精度。

3. 然后 *QGroundControl* 开始设置 RTK (称为 "测量")。
    
    测量是一个获得基站准确位置的设置过程。 这个过程通常会需要几分钟（在达到[RTK 设置](#rtk-gps-settings)中指定的最小时间和精度后结束）。
    
    你也可以点击 RTK状态按钮查看。
    
    <img src="../../assets/qgc/setup/rtk/qgc_rtk_survey-in.png" width="200px" title="测量" />

4. 测量完成：

- RTK GPS 图标变为白色，*QGroundControl*开始传送位置数据到飞机。
    
    <img src="../../assets/qgc/setup/rtk/qgc_rtk_streaming.png" width="200px" title="RTK数据流" />

- 飞机的 GPS 切换到 RTK 模式。 新的模式会显示在*普通*GPS 状态按钮的位置（` 3D RTK GPS 锁定`）：
    
    ![RTK GPS状态](../../assets/qgc/setup/rtk/qgc_rtk_gps_status.png)

## PX4 可用的设置

The following settings may need to be changed (using *QGroundControl*).

### RTK GPS 设置

The RTK GPS settings are specified in the *QGroundControl* [General Settings](https://docs.qgroundcontrol.com/en/SettingsView/General.html#rtk_gps) (**SettingsView > General Settings > RTK GPS**).

![RTK GPS Setup](../../assets/qgc/setup/rtk/settings_view_general_rtk_gps.jpg)

These settings define the minimum duration and minimum accuracy for completing the RTK GPS setup process (known as "Survey-In).

<span></span>

> **Tip** You can save and reuse a base position in order to save time: perform Survey-In once, select *Use Specified Base Position* and press **Save Current Base Position** to copy in the values for the last survey. The values will then persist across QGC reboots until they are changed.

### MAVLink2

The MAVLink2 protocol must be used because it makes more efficient use of lower-bandwidth channels. This should be enabled by default on recent builds.

To ensure MAVLink2 is used:

- 将遥测模块固件更新到最新版本 (请参阅 QGroundControl> 设置 > 固件 </a0 >)。</li> 
    
    - 将 [MAV_PROTO_VER](../advanced_config/parameter_reference.md#MAV_PROTO_VER) 设置为 2 (请参阅 < 1>QGroundControl 设置 > 参数 </1 >)</ul> 
    
    ### 调试
    
    You may also need to tune some parameters as the default parameters are tuned assuming a GPS accuracy in the order of meters, not centimeters. For example, you can decrease [EKF2_GPS_V_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_V_NOISE) and [EKF2_GPS_P_NOISE](../advanced_config/parameter_reference.md#EKF2_GPS_P_NOISE) to 0.2.
    
    ### Use RTK GPS for Yaw
    
    Some RTK GPS units (i.e. with multiple antennas) can output a yaw angle, which can be used instead of the heading from the magnetic compass. To enable this, set bit position 7 in [EKF2_AID_MASK](../advanced_config/parameter_reference.md#EKF2_AID_MASK) to 1 (add 128 to the parameter value).
    
    ### Dual Receivers
    
    A second GPS receiver can be used as a backup (either RTK or non RTK). See the [EKF2 GPS Configuration](../advanced_config/tuning_the_ecl_ekf.md#gps) section.
    
    <!--

- Video demonstration would be nice.
- something that shows positioning of base, connection of RTK rover, survey in process. Some sort of short precision survey.
-->
    
    ## 飞机设置示例
    
    The airframe build topic [DJI Flamewheel 450 with distance sensor and RTK GPS](https://dev.px4.io/master/en/airframes_multicopter/dji_flamewheel_450.html) describes an airframe setup with the Here+ RTK GPS and a Pixhawk 3 Pro.