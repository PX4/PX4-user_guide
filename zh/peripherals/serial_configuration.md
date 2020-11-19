# 串口配置

Many serial (UART) ports on a Pixhawk board can be fully configured via parameters: e.g.: `GPS1`, `TELEM1`, `TELEM2`, `TELEM4` (`UART+I2C`).

通过配置，可以轻松地(例如)：

* 更改端口上的波特率
* 在其他端口上运行 MAVLink ，或更改流消息
* 设置双 GPS
* 启用在串口上运行的传感器，例如某些 [距离传感器](../sensor/rangefinders.md) 。

> **Note** Some ports cannot be configured because they are used for a very specific purpose like RC input or the system console (`SERIAL 5`).

<span id="default_port_mapping"></span>

## 端口预配置

以下功能通常映射到所有板上的相同的特定串口，默认情况下映射为：

* MAVLink 被映射到 `Telem 1` 端口，端口的波特率为 57600 (对于[遥测模块](../telemetry/README.md))。
* GPS 1 ([gps driver](../modules/modules_driver.md#gps)) is mapped to the `GPS 1` port with a baudrate *Auto* (with this setting a GPS will automatically detect the baudrate - except for the Trimble MB-Two, which requires 115200 baudrate).

默认情况下，所有其他端口都没有指定的功能(禁用)。

> **Tip** 通过分别将 [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) 和 [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG) 设置为 *Disabled*，可以禁用上述端口映射。

## 如何配置端口

所有串行驱动程序/端口都以相同的方式配置：

1. 将 service/peripheral 的配置参数设置为它将使用的端口 > **Note** Configuration parameter names follow the pattern `\*\_CONFIG` or `\*\_CFG` (*QGroundControl* only displays the parameters for services/drivers that are present in firmware). 在编写本报告时，当前设置为： [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG)。 
2. Reboot the vehicle in order to make the additional configuration parameters visible.
3. 将所选端口的波特率设置为所需值。
4. 配置特定于模块的参数 (如 MAVLink 流和数据速率配置)。

The [GPS/Compass > Secondary GPS](../gps_compass/README.md#dual_gps) section provides a practical example of how to configure a port in *QGroundControl* (it shows how to use `GPS_2_CONFIG` to run a secondary GPS on the `TELEM 2` port).

## 处理端口冲突

端口冲突由系统启动处理，它确保在特定端口上最多运行一个服务。

> **Caution** 在编写本报告时，没有关于端口冲突的用户反馈。

## 故障处理

<span id="parameter_not_in_firmware"></span>

### *QGroundControl* 中缺少的配置参数

*QGroundControl* 只显示固件中存在的 services/drivers 的参数。 如果缺少参数，则可能需要将其添加到固件中。

> **Note** PX4 固件在 [Pixhawk系列](../flight_controller/pixhawk_series.md) 板上默认包含大多数驱动程序。 闪存受限的飞控板可以注释掉/省略驱动程序(在文档编写时，这只会影响基于 FMUv2 的飞控板)。

You can include the missing driver in firmware by uncommenting (or adding) the driver in the **default.cmake** config file that corresponds to the [board](https://github.com/PX4/PX4-Autopilot/tree/master/boards/px4) you want to build for. For example, to enable the sf0x driver, you would remove the `#` at the beginning of the line below.

    #distance_sensor/sf0x
    

You will then need to build the firmware for your platform, as described in [Building PX4 Software](../dev_setup/building_px4.md) (PX4 Development Guide).

## 更多信息

* [MAVLink 外设 (OSD/GCS/机载计算机/等等)](../peripherals/mavlink_peripherals.md)