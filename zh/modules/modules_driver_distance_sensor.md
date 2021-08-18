# Modules Reference: Distance Sensor (Driver)
## afbrs50
Source: [drivers/distance_sensor/broadcom/afbrs50](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/broadcom/afbrs50)


### 说明

Driver for the Broadcom AFBRS50.

### 示例

Attempt to start driver on a specified serial device.
```
afbrs50 start
```
设置/使用 信息： https://docs.px4.io/master/en/sensor/leddar_one.html
```
afbrs50 stop
```

<a id="afbrs50_usage"></a>

### 用法
```
afbrs50 <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device
     [-r <val>]  Sensor rotation - downward facing by default
                 default: 25

   test          Test driver

   stop          Stop driver
```
## gy_us42
Source: [drivers/distance_sensor/gy_us42](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/gy_us42)

<a id="gy_us42_usage"></a>

### 参数描述
```
gy_us42 <command> [arguments...]
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
## leddar_one
停止驱动程序的运行


### 描述

Serial bus driver for the LeddarOne LiDAR.

针对 Lightware SFxx 系列 LIDAR 测距仪的 I2C 总线驱动： SF10/a, SF10/b, SF10/c, SF11/c, SF/LW20。

设置/使用 信息： https://docs.px4.io/master/en/sensor/sfxx_lidar.html

### 参数描述

Attempt to start driver on a specified serial device.
```
leddar_one start -d /dev/ttyS1
```
Stop driver
```
leddar_one stop
```

<a id="leddar_one_usage"></a>

### 示例
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
Source: [drivers/distance_sensor/lightware_laser_i2c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/lightware_laser_i2c)


### 用法

设置/使用 信息： https://docs.px4.io/master/en/sensor/sfxx_lidar.html

Setup/usage information: https://docs.px4.io/master/en/sensor/sfxx_lidar.html

<a id="lightware_laser_i2c_usage"></a>

### 参数描述
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
     [-a <val>]  I2C address
                 default: 102
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## lightware_laser_serial
停止驱动程序的运行


### 用法

Serial bus driver for the LightWare SF02/F, SF10/a, SF10/b, SF10/c, SF11/c Laser rangefinders.

Most boards are configured to enable/start the driver on a specified UART using the SENS_SF0X_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/sfxx_lidar.html

### 用法

设置/使用 信息： https://docs.px4.io/master/en/sensor/lidar_lite.html
```
lightware_laser_serial start -d /dev/ttyS1
```
Stop driver
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
Source: [drivers/distance_sensor/ll40ls](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/ll40ls)


### 示例

源码：[drivers/distance_sensor/pga460](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/pga460)

超声笔测距仪驱动，负责处理与设备的用心并通过 uORB 将距离信息发布出去。

Setup/usage information: https://docs.px4.io/master/en/sensor/lidar_lite.html

<a id="ll40ls_usage"></a>

### 实现
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
     [-a <val>]  I2C address
                 default: 98
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   regdump

   stop

   status        print status info
```
## pga460
Source: [drivers/distance_sensor/mappydot](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/mappydot)

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
Source: [drivers/distance_sensor/mb12xx](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/mb12xx)

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

   set_address
     [-a <val>]  I2C address
                 default: 112

   stop

   status        print status info
```
## pga460
Source: [drivers/distance_sensor/pga460](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/pga460)


### 使用
Ultrasonic range finder driver that handles the communication with the device and publishes the distance via uORB.

### 参数描述
This driver is implented as a NuttX task. This Implementation was chosen due to the need for polling on a message via UART, which is not supported in the work_queue. This driver continuously takes range measurements while it is running. A simple algorithm to detect false readings is implemented at the driver levelin an attemptto improve the quality of data that is being published. The driver will not publish data at all if it deems the sensor data to be invalid or unstable.

<a id="pga460_usage"></a>

### 使用
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
Source: [drivers/distance_sensor/srf02](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/srf02)

<a id="srf02_usage"></a>

### 描述
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
     [-a <val>]  I2C address
                 default: 112
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## srf05
Source: [drivers/distance_sensor/srf05](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/srf05)


  ### Description

  Driver for HY-SRF05 / HC-SR05 and HC-SR04 rangefinders.

  The sensor/driver must be enabled using the parameter SENS_EN_HXSRX0X.

<a id="srf05_usage"></a>

### 示例
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
Source: [drivers/distance_sensor/teraranger](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/teraranger)


### 使用

I2C bus driver for TeraRanger rangefinders.

The sensor/driver must be enabled using the parameter SENS_EN_TRANGER.

Setup/usage information: https://docs.px4.io/master/en/sensor/rangefinders.html#teraranger-rangefinders

<a id="teraranger_usage"></a>

### 描述
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
     [-a <val>]  I2C address
                 default: 48
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## tfmini
停止驱动程序的运行


### 示例

Serial bus driver for the Benewake TFmini LiDAR.

Most boards are configured to enable/start the driver on a specified UART using the SENS_TFMINI_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/tfmini.html

### 描述

Attempt to start driver on a specified serial device.
```
tfmini start -d /dev/ttyS1
```
停止驱动程序的运行
```
tfmini stop
```

<a id="tfmini_usage"></a>

### 用法
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
Source: [drivers/distance_sensor/ulanding_radar](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/ulanding_radar)


### 用法

Serial bus driver for the Aerotenna uLanding radar.

Setup/usage information: https://docs.px4.io/v1.9.0/en/sensor/ulanding_radar.html

### Examples

Attempt to start driver on a specified serial device.
```
ulanding_radar start -d /dev/ttyS1
```
Stop driver
```
ulanding_radar stop
```

<a id="ulanding_radar_usage"></a>

### Usage
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
Source: [drivers/distance_sensor/vl53l0x](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/vl53l0x)

<a id="vl53l0x_usage"></a>

### Usage
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
     [-a <val>]  I2C address
                 default: 41
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
## vl53l1x
Source: [drivers/distance_sensor/vl53l1x](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/distance_sensor/vl53l1x)

<a id="vl53l1x_usage"></a>

### Usage
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
     [-a <val>]  I2C address
                 default: 41
     [-R <val>]  Sensor rotation - downward facing by default
                 default: 25

   stop

   status        print status info
```
