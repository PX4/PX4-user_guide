# 串口配置

Pixhawk 飞控板上的大多数串口 (UART) 可以通过参数完全配置 (用于非常特定目的的端口除外，如RC输入，或不可配置的串口，如 `SERIAL 5`)。

通过配置，可以轻松地(例如)：

* 更改端口上的波特率
* 在其他端口上运行 MAVLink ，或更改流消息
* 设置双 GPS
* 启用在串口上运行的传感器，例如某些 [距离传感器](../sensor/rangefinders.md) 。

## 端口预配置 {#default_port_mapping}

以下功能通常映射到所有板上的相同的特定串口，默认情况下映射为：

* MAVLink 被映射到 `Telem 1` 端口，端口的波特率为 57600 (对于[遥测模块](../telemetry/README.md))。
* GPS 1 ([gps driver](https://dev.px4.io/en/middleware/modules_driver.html#gps)) 映射到 `GPS 1` 端口，端口具有*自动* 波特率(在此设置下，GPS 将自动检测波特率-除了 Trimble MB-2，它需要115200的波特率)。

默认情况下，所有其他端口都没有指定的功能(禁用)。

> **Tip** 通过分别将 [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) 和 [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG) 设置为 *Disabled*，可以禁用上述端口映射。

## 如何配置端口

所有串行驱动程序/端口都以相同的方式配置：

1. Set the configuration parameter for the service/peripheral to the port it will use. > **Note** Configuration parameter names follow the pattern `\*\_CONFIG` or `\*\_CFG` (*QGroundControl* only displays the parameters for services/drivers that are present in firmware). At time of writing the current set is: [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG). 
2. Reboot the vehicle in order to make the additional configuration parameters visible.
3. 将所选端口的波特率设置为所需值。
4. 配置特定于模块的参数 (如 MAVLink 流和数据速率配置)。

The [GPS/Compass > Secondary GPS](../gps_compass/README.md#dual_gps) section provides a practical example of how to configure a port in *QGroundControl* (it shows how to use `GPS_2_CONFIG` to run a secondary GPS on the `TELEM 2` port).

## 处理端口冲突

端口冲突由系统启动处理，它确保在特定端口上最多运行一个服务。

> **Caution** At time of writing there is no user feedback about conflicting ports.

## 故障处理

### *QGroundControl* 中缺少的配置参数 {#parameter_not_in_firmware}

*QGroundControl* 只显示固件中存在的 services/drivers 的参数。 如果缺少参数，则可能需要将其添加到固件中。

> **Note** PX4 firmware includes most drivers by default on [Pixhawk-series](../flight_controller/pixhawk_series.md) boards. Flash-limited boards may comment out/omit the driver (at time of writing this only affects boards based on FMUv2).

You can include the missing driver in firmware by uncommenting (or adding) the driver in the **default.cmake** config file that corresponds to the [board](https://github.com/PX4/Firmware/tree/master/boards/px4) you want to build for. For example, to enable the sf0x driver, you would remove the `#` at the beginning of the line below.

    #distance_sensor/sf0x
    

然后，您需要为平台编译固件，如 [编译 PX4 软件](https://dev.px4.io/en/setup/building_px4.html) (PX4 开发指南) 中所述。

## 更多信息

* [MAVLink 外设 (OSD/GCS/机载计算机/等等)](../peripherals/mavlink_peripherals.md)