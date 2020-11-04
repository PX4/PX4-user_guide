# Modules Reference: Distance Sensor (Driver)
## leddar_one
Source: [drivers/distance_sensor/leddar_one](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/leddar_one)


### Description

Serial bus driver for the LeddarOne LiDAR.

Most boards are configured to enable/start the driver on a specified UART using the SENS_LEDDAR1_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/leddar_one.html

### Examples

Attempt to start driver on a specified serial device.
```
leddar_one start -d /dev/ttyS1
```
Stop driver
```
leddar_one stop
```

### Usage {#leddar_one_usage}
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


### Description

I2C bus driver for Lightware SFxx series LIDAR rangefinders: SF10/a, SF10/b, SF10/c, SF11/c, SF/LW20.

Setup/usage information: https://docs.px4.io/master/en/sensor/sfxx_lidar.html

### Usage {#lightware_laser_i2c_usage}
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


### Description

Serial bus driver for the LightWare SF02/F, SF10/a, SF10/b, SF10/c, SF11/c Laser rangefinders.

Most boards are configured to enable/start the driver on a specified UART using the SENS_SF0X_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/sfxx_lidar.html

### Examples

Attempt to start driver on a specified serial device.
```
lightware_laser_serial start -d /dev/ttyS1
```
Stop driver
```
lightware_laser_serial stop
```

### Usage {#lightware_laser_serial_usage}
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


### Description

I2C bus driver for LidarLite rangefinders.

The sensor/driver must be enabled using the parameter SENS_EN_LL40LS.

Setup/usage information: https://docs.px4.io/master/en/sensor/lidar_lite.html

### Usage {#ll40ls_usage}
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

### Usage {#mappydot_usage}
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

### Usage {#mb12xx_usage}
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
Source: [drivers/distance_sensor/pga460](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/pga460)


### Description
Ultrasonic range finder driver that handles the communication with the device and publishes the distance via uORB.

### Implementation
This driver is implented as a NuttX task. This Implementation was chosen due to the need for polling on a message via UART, which is not supported in the work_queue. This driver continuously takes range measurements while it is running. A simple algorithm to detect false readings is implemented at the driver levelin an attemptto improve the quality of data that is being published. The driver will not publish data at all if it deems the sensor data to be invalid or unstable.

### Usage {#pga460_usage}
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

### Usage {#srf02_usage}
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
## teraranger
Source: [drivers/distance_sensor/teraranger](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/teraranger)


### Description

I2C bus driver for TeraRanger rangefinders.

The sensor/driver must be enabled using the parameter SENS_EN_TRANGER.

Setup/usage information: https://docs.px4.io/master/en/sensor/rangefinders.html#teraranger-rangefinders

### Usage {#teraranger_usage}
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


### Description

Serial bus driver for the Benewake TFmini LiDAR.

Most boards are configured to enable/start the driver on a specified UART using the SENS_TFMINI_CFG parameter.

Setup/usage information: https://docs.px4.io/master/en/sensor/tfmini.html

### Examples

Attempt to start driver on a specified serial device.
```
tfmini start -d /dev/ttyS1
```
Stop driver
```
tfmini stop
```

### Usage {#tfmini_usage}
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


### Description

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

### Usage {#ulanding_radar_usage}
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

### Usage {#vl53l0x_usage}
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

### Usage {#vl53l1x_usage}
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
