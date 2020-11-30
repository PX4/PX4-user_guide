# Modules Reference: Distance Sensor (Driver)
## leddar_one
Source: [drivers/distance_sensor/leddar_one](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/leddar_one)


### 说明

Serial bus driver for the LeddarOne LiDAR.

Most boards are configured to enable/start the driver on a specified UART using the SENS_LEDDAR1_CFG parameter.

设置/使用 信息： https://docs.px4.io/master/en/sensor/leddar_one.html

### 示例

Attempt to start driver on a specified serial device.
```
leddar_one start -d /dev/ttyS1
```
停止驱动程序的运行
```
leddar_one stop
```

<a id="leddar_one_usage"></a>

### 用法
```
leddar_one <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device
     [-r <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop          Stop driver
```
## lightware_laser_i2c
Source: [drivers/distance_sensor/lightware_laser_i2c](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/lightware_laser_i2c)


### 参数描述

针对 Lightware SFxx 系列 LIDAR 测距仪的 I2C 总线驱动： SF10/a, SF10/b, SF10/c, SF11/c, SF/LW20。

设置/使用 信息： https://docs.px4.io/master/en/sensor/sfxx_lidar.html

<a id="lightware_laser_i2c_usage"></a>

### 描述
```
lightware_laser_i2c <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## lightware_laser_serial
Source: [drivers/distance_sensor/lightware_laser_serial](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/lightware_laser_serial)


### 参数描述

Serial bus driver for the LightWare SF02/F, SF10/a, SF10/b, SF10/c, SF11/c Laser rangefinders.

Most boards are configured to enable/start the driver on a specified UART using the SENS_SF0X_CFG parameter.

设置/使用 信息： https://docs.px4.io/master/en/sensor/sfxx_lidar.html

### 示例

Attempt to start driver on a specified serial device.
```
lightware_laser_serial start -d /dev/ttyS1
```
停止驱动程序的运行
```
lightware_laser_serial stop
```

<a id="lightware_laser_serial_usage"></a>

### 用法
```
lightware_laser_serial <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop          Stop driver
```
## ll40ls
Source: [drivers/distance_sensor/ll40ls](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/ll40ls)


### 参数描述

I2C bus driver for LidarLite rangefinders.

The sensor/driver must be enabled using the parameter SENS_EN_LL40LS.

设置/使用 信息： https://docs.px4.io/master/en/sensor/lidar_lite.html

<a id="ll40ls_usage"></a>

### 用法
```
ll40ls <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   regdump

   stop

   status        print status info
```
## mappydot
Source: [drivers/distance_sensor/mappydot](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/mappydot)

<a id="mappydot_usage"></a>

### 用法
```
mappydot <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## mb12xx
Source: [drivers/distance_sensor/mb12xx](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/mb12xx)

<a id="mb12xx_usage"></a>

### 用法
```
mb12xx <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 112

   set_address
     [-a <val>]  I2C address
                 default: 112

   stop

   status        print status info
```
## pga460
源码：[drivers/distance_sensor/pga460](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/pga460)


### 示例
超声笔测距仪驱动，负责处理与设备的用心并通过 uORB 将距离信息发布出去。

### 实现
此驱动以 NuttX 任务的形式实现。 选择这个实现方式是阴虚需要通过 UART 对消息进行轮询，而工作队列并不支持这一操作。 驱动在运行时将持续获取测距仪的测量值。 应用了一个简单的检测错误读数的算法以发布出去的数据的质量， 若驱动认为传感器数据无效或者不稳定，那么驱动将不会将数据发布出去。

<a id="pga460_usage"></a>

### 用法
```
pga460 <command> [arguments...]
 Commands:
   start
     [device_path] The pga460 sensor device path, (e.g: /dev/ttyS6)

   status

   stop

   help
```
## srf02
Source: [drivers/distance_sensor/srf02](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/srf02)

<a id="srf02_usage"></a>

### 用法
```
srf02 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## srf05
Source: [drivers/distance_sensor/srf05](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/srf05)


  ### Description

  Driver for HY-SRF05 / HC-SR05 and HC-SR04 rangefinders.

  The sensor/driver must be enabled using the parameter SENS_EN_HXSRX0X.

<a id="srf05_usage"></a>

### 使用
```
srf05 <command> [arguments...]
 Commands:
   start         Start driver
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   status        Print driver status information

   stop          Stop driver

   stop

   status        print status info
```
## teraranger
Source: [drivers/distance_sensor/teraranger](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/teraranger)


### 参数描述

I2C bus driver for TeraRanger rangefinders.

The sensor/driver must be enabled using the parameter SENS_EN_TRANGER.

Setup/usage information: https://docs.px4.io/master/en/sensor/rangefinders.html#teraranger-rangefinders

<a id="teraranger_usage"></a>

### 使用
```
teraranger <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## tfmini
Source: [drivers/distance_sensor/tfmini](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/tfmini)


### 描述

Serial bus driver for the Benewake TFmini LiDAR.

Most boards are configured to enable/start the driver on a specified UART using the SENS_TFMINI_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/tfmini.html

### 示例

Attempt to start driver on a specified serial device.
```
tfmini start -d /dev/ttyS1
```
停止驱动程序的运行
```
tfmini stop
```

<a id="tfmini_usage"></a>

### 使用
```
tfmini <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   status        Driver status

   stop          Stop driver

   test          Test driver (basic functional tests)

   status        Print driver status
```
## ulanding_radar
Source: [drivers/distance_sensor/ulanding_radar](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/ulanding_radar)


### 描述

Serial bus driver for the Aerotenna uLanding radar.

Setup/usage information: https://docs.px4.io/v1.9.0/en/sensor/ulanding_radar.html

### 示例

Attempt to start driver on a specified serial device.
```
ulanding_radar start -d /dev/ttyS1
```
停止驱动程序的运行
```
ulanding_radar stop
```

<a id="ulanding_radar_usage"></a>

### 描述
```
ulanding_radar <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device
                 values: <file:dev>, default: /dev/ttyS3
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop          Stop driver
```
## vl53l0x
Source: [drivers/distance_sensor/vl53l0x](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/vl53l0x)

<a id="vl53l0x_usage"></a>

### 用法
```
vl53l0x <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## vl53l1x
Source: [drivers/distance_sensor/vl53l1x](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/vl53l1x)

<a id="vl53l1x_usage"></a>

### 用法
```
vl53l1x <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
