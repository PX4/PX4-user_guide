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

1. 将 service/peripheral 的配置参数设置为它将使用的端口
2. 重启飞行器
3. 将所选端口的波特率设置为所需值。
4. 配置特定于模块的参数 (如 MAVLink 流和数据速率配置)。

> **Note** 配置参数名称遵循模式 `\*\_CONFIG` 或 `\*\_CFG` (*QGroundControl* 只显示固件中存在的 services/drivers 的参数。 在编写本报告时，当前设置为： [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG)。

以下步骤提供了如何在 *QGroundControl* 中配置端口的实例。 它展示了如何在 `TELEM 2` 端口上运行第二个 GPS (`GPS_2_CONFIG`) 。

1. 转到飞行器参数设置中的 **参数** 部分。
2. 选择 **GPS** 选项卡(1)，然后打开 [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) 参数(2)，并从下拉列表(3) 中选择 *TELEM 2*。 ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
3. 重启飞行器，以便其他参数显示。
4. 选择 **串口** 选项卡，并打开 [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) 参数 (`TELEM 2`端口波特率)：将其设置为 *Auto*。 ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

## 处理端口冲突

端口冲突由系统启动处理，它确保在特定端口上最多运行一个服务。

> **Caution** 在编写本报告时，没有关于端口冲突的用户反馈。

## 故障处理

### *QGroundControl* 中缺少的配置参数 {#parameter_not_in_firmware}

*QGroundControl* 只显示固件中存在的 services/drivers 的参数。 如果缺少参数，则可能需要将其添加到固件中。

> **Note** PX4 固件在 [Pixhawk系列](../flight_controller/pixhawk_series.md) 板上默认包含大多数驱动程序。 闪存受限的飞控板可以注释掉/省略驱动程序(在文档编写时，这只会影响基于 FMUv2 的飞控板)。

您可以在固件中包含缺少的驱动程序，方法是在 [ cmake 配置文件](https://github.com/PX4/Firmware/tree/master/cmake/configs) 中取消(或添加) 驱动程序，该文件对应于为之编译的目标。 例如，为了启用 leddar_one 驱动程序，您将删除下面行开头的 `#` 。

    #drivers/distance_sensor/leddar_one
    

You will then need to build the firmware for your platform, as described in [Building PX4 Software](https://dev.px4.io/en/setup/building_px4.html) (PX4 Development Guide).

## 更多信息

* [MAVLink Peripherals (OSD/GCS/Companion Computers/etc.)](../peripherals/mavlink_peripherals.md)