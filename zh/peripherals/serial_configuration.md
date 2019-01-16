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

> **Note** Configuration parameter names follow the pattern `\*\_CONFIG` or `\*\_CFG` (*QGroundControl* only displays the parameters for services/drivers that are present in firmware). At time of writing the current set is: [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG).

The following steps provide a practical example of how to configure a port in *QGroundControl*. It shows how to run a secondary GPS (`GPS_2_CONFIG`) on the `TELEM 2` port.

1. Go to the **Parameters** section in vehicle setup.
2. Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3). ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
3. Reboot the vehicle in order for the other parameters to show up.
4. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*. ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

## Deconficting Ports

Port conflicts are handled by system startup, which ensures that at most one service is run on a specific port.

> **Caution** At time of writing there is no user feedback about conflicting ports.

## 故障处理

### Configuration Parameter Missing from *QGroundControl* {#parameter_not_in_firmware}

*QGroundControl* only displays the parameters for services/drivers that are present in firmware. If a parameter is missing, then you may need to add it in firmware.

> **Note** PX4 firmware includes most drivers by default on [Pixhawk-series](../flight_controller/pixhawk_series.md) boards. Flash-limited boards may comment out/omit the driver (at time of writing this only affects boards based on FMUv2).

You can include the missing driver in firmware by uncommenting (or adding) the driver in the [cmake config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target you want to build for. For example, to enable the leddar_one driver, you would remove the `#` at the beginning of the line below.

    #drivers/distance_sensor/leddar_one
    

You will then need to build the firmware for your platform, as described in [Building PX4 Software](https://dev.px4.io/en/setup/building_px4.html) (PX4 Development Guide).

## 更多信息

* [MAVLink Peripherals (OSD/GCS/Companion Computers/etc.)](../peripherals/mavlink_peripherals.md)