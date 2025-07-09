---
canonicalUrl: https://docs.px4.io/main/zh/uart/user_configurable_serial_driver
---

# 将串口驱动程序设计为用户可配置

本主题介绍了如何设置一个串行驱动程序，使其能够被最终用户配置(通过参数) 在飞行控制器板的任何可配置串行端口上运行。

## 操作前提

假定驱动程序已经存在，并使用命令语法在shell中启动:
```sh
<driver_name> start -d <serial_port> [-b <baudrate> | -b p:<param_name>]
```
上述命令中：
- `-d`：串口名称
- `-b`：波特率(可选) 如果驱动程序支持多个波特率。 如果支持，驱动程序必须允许您在`-b p:<param_name>`(可以用`px4_get_parameter_value()`解析) 中将速率指定为一个baudrate和一个参数名。 :::tip See the [gps driver](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/drivers/gps/gps.cpp#L1023) for an example.
:::


## 使驱动程序可配置

使驱动程序可配置：
1. 创建一个YAML模块配置文件
   - 在驱动文件目录中新建一个名为**module.yaml**的文件。
   - 插入以下文本并根据需要进行调整： ``` module_name: uLanding Radar serial_config:
     ```
     command: ulanding_radar start -d ${SERIAL_DEV} -b p:${BAUD_PARAM} port_config_param: name: SENS_ULAND_CFG group: Sensors ``` &#062; <strong x-id="1">Note</strong> The full documentation of the module configuration file can be found in the <a href="https://github.com/PX4/Firmware/blob/master/validation/module_schema.yaml">validation/module_schema.yaml</a> file. This is also used to validate all configuration files in CI.
     ```
:::note
The full documentation of the module configuration file can be found in the [validation/module_schema.yaml](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/validation/module_schema.yaml) file. This is also used to validate all configuration files in CI.
:::
1. 将模块配置添加到名为**CMakeLists.txt**的驱动模块文件中: px4_add_module( MODULE drivers__ulanding MAIN ulanding_radar SRCS ulanding.cpp MODULE_CONFIG module.yaml )
   ```
   px4_add_module(
    MODULE drivers__ulanding
    MAIN ulanding_radar
    SRCS
        ulanding.cpp
    MODULE_CONFIG
        module.yaml
    )
   ```

