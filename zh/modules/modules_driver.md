---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_driver
---

# 模块参考：驱动
子分类
- [Imu](modules_driver_imu.md)
- [距离传感器](modules_driver_distance_sensor.md)
- [Ins](modules_driver_ins.md)
- [空速传感器](modules_driver_airspeed_sensor.md)
- [气压计](modules_driver_baro.md)
- [Transponder](modules_driver_transponder.md)
- [Rpm Sensor](modules_driver_rpm_sensor.md)
- [Optical Flow](modules_driver_optical_flow.md)
- [Magnetometer](modules_driver_magnetometer.md)

## MCP23009
Source: [drivers/gpio/mcp23009](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/gpio/mcp23009)

<a id="MCP23009_usage"></a>

### 用法
```
MCP23009 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 37
     [-D <val>]  Direction
                 default: 0
     [-O <val>]  Output
                 default: 0
     [-P <val>]  Pullups
                 default: 0
     [-U <val>]  Update Interval [ms]
                 default: 0

   stop

   status        print status info
```
## adc
Source: [drivers/adc/board_adc](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/adc/board_adc)


### 描述
ADC 驱动。


<a id="adc_usage"></a>

### 用法
```
adc <command> [arguments...]
 Commands:
   start

   test
     [-n]        Do not publish ADC report, only system power

   stop

   status        print status info
```
## ads1115
Source: [drivers/adc/ads1115](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/adc/ads1115)


### 描述

Driver to enable an external [ADS1115](https://www.adafruit.com/product/1085) ADC connected via I2C.

The driver is included by default in firmware for boards that do not have an internal analog to digital converter, such as [PilotPi](../flight_controller/raspberry_pi_pilotpi.md) or [CUAV Nora](../flight_controller/cuav_nora.md) (search for `CONFIG_DRIVERS_ADC_ADS1115` in board configuration files).

It is enabled/disabled using the [ADC_ADS1115_EN](../advanced_config/parameter_reference.md#ADC_ADS1115_EN) parameter, and is disabled by default. If enabled, internal ADCs are not used.


<a id="ads1115_usage"></a>

### 用法
```
ads1115 <command> [arguments...]
 Commands:
   start
     [-I]        内部I2C总线(们)
     [-X]        外部I2C 总线(们)
     [-b <val>]  指定板总线(default=all) (外部SPI: n条总线
                 (default=1))
     [-f <val>]  总线频率单位kHz
     [-q]       安静启动 (没有设备发现时不输出消息)
     [-a <val>]  I2C 地址
                 默认: 72

   stop

   status        打印状态信息
```
## atxxxx
Source: [drivers/osd/atxxxx](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/osd/atxxxx)


### 描述
例如挂载在OmnibusF4SD板上的针对 ATXXXX 芯片的OSD驱动。

可以通过 OSD_ATXXXX_CFG 参数使能.

<a id="atxxxx_usage"></a>

### 描述
```
atxxxx <command> [arguments...]
 Commands:
   start
     [-s]        内部 SPI 总线(们)
     [-S]        外部SPI 总线(们)
     [-b <val>]  指定板总线 (默认=all) (外部 SPI: n 条总线
                 (默认=1))
     [-c <val>]  片选引脚 (对于内部SPI) 或者索引(对于外部SPI)
     [-m <val>]  SPI 模式
     [-f <val>]  总线频率单位kHz
     [-q]        安静启动 (没有发现设备时无消息输出)

   stop

   status        打印状态信息
```
## batmon
Source: [drivers/smart_battery/batmon](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/smart_battery/batmon)


### 用法
用于智能电池的BQ40Z50电量统计芯片
### 示例
To start at address 0x0B, on bus 4
```
batt_smbus -X write_flash 19069 2 27 0
```


<a id="batmon_usage"></a>

### 描述
```
batmon <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 11

   man_info      Prints manufacturer info.

   unseal        解锁设备的flash来使能 write_flash 命令

   seal          锁住设备的flash来失能 write_flash 命令.

   suspend       从调度循环中挂起该设备
```
## batt_smbus
Source: [drivers/batt_smbus](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/batt_smbus)


### 用法
This will enable capturing on the 4th pin. Then do:

### 用法
To write to flash to set parameters. address, number_of_bytes, byte0, ... , byteN
```
batt_smbus -X write_flash 19069 2 27 0
```


<a id="batt_smbus_usage"></a>

### 示例
```
batt_smbus <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 11

   man_info      Prints manufacturer info.

   unseal        Unseals the devices flash memory to enable write_flash
                 commands.

   seal          Seals the devices flash memory to disable write_flash commands.

   suspend       Suspends the driver from rescheduling the cycle.

   resume        Resumes the driver from suspension.

   write_flash   Writes to flash. The device must first be unsealed with the
                 unseal command.
     [address]   The address to start writing.
     [number of bytes] Number of bytes to send.
     [data[0]...data[n]] One byte of data at a time separated by spaces.

   stop

   status        print status info
```
## bst
Source: [drivers/telemetry/bst](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/telemetry/bst)

<a id="bst_usage"></a>

### 描述
```
bst <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 118

   stop

   status        print status info
```
## crsf_rc
Source: [drivers/rc/crsf_rc](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/rc/crsf_rc)


### 描述
This module parses the CRSF RC uplink protocol and generates CRSF downlink telemetry data


<a id="crsf_rc_usage"></a>

### 描述
```
crsf_rc <command> [arguments...]
 Commands:
   start
     [-d <val>]  RC device
                 values: <file:dev>, default: /dev/ttyS3

   stop

   status        print status info
```
## sf1xx
Source: [drivers/dshot](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/dshot)


### 描述
This is the DShot output driver. It is similar to the fmu driver, and can be used as drop-in replacement to use DShot as ESC communication protocol instead of PWM.

On startup, the module tries to occupy all available pins for DShot output. It skips all pins already in use (e.g. by a camera trigger module).

It supports:
- DShot150, DShot300, DShot600, DShot1200
- 通过独立的串口遥控，并且发布esc_status消息
- 通过命令行接口发送 DShot 命令

### 示例
Permanently reverse motor 1:
```
dshot reverse -m 1
dshot save -m 1
```
After saving, the reversed direction will be regarded as the normal one. So to reverse again repeat the same commands.

<a id="dshot_usage"></a>

### 实现
```
dshot <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## fmu mode_pwm
Source: [examples/fake_gps](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/examples/fake_gps)


### 示例


<a id="fake_gps_usage"></a>

### 用法
```
fake_gps <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fake_imu
Source: [examples/fake_imu](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/examples/fake_imu)


### 描述


<a id="fake_imu_usage"></a>

### 描述
```
fake_imu <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## gps
Source: [examples/fake_magnetometer](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/examples/fake_magnetometer)


### 描述
Publish the earth magnetic field as a fake magnetometer (sensor_mag). Requires vehicle_attitude and vehicle_gps_position.

<a id="fake_magnetometer_usage"></a>

### 描述
```
fake_magnetometer <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## gimbal
Source: [modules/gimbal](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/gimbal)


### 描述
Mount/gimbal Gimbal control driver. It maps several different input methods (eg. RC or MAVLink) to a configured output (eg. AUX channels or MAVLink).

Documentation how to use it is on the [gimbal_control](https://docs.px4.io/main/en/advanced/gimbal_control.html) page.

### 示例
Test the output by setting a angles (all omitted axes are set to 0):
```
gimbal test pitch -45 yaw 30
```

<a id="gimbal_usage"></a>

### Usage
```
gimbal <command> [arguments...]
 Commands:
   start

   status

   primary-control Set who is in control of gimbal
     <sysid> <compid> MAVLink system ID and MAVLink component ID

   test          Test the output: set a fixed angle for one or multiple axes
                 (gimbal must be running)
     roll|pitch|yaw <angle> Specify an axis and an angle in degrees

   stop

   status        print status info
```
## gps
Source: [drivers/gps](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/gps)


### Description
GPS driver module that handles the communication with the device and publishes the position via uORB. It supports multiple protocols (device vendors) and by default automatically selects the correct one.

The module supports a secondary GPS device, specified via `-e` parameter. The position will be published on the second uORB topic instance, but it's currently not used by the rest of the system (however the data will be logged, so that it can be used for comparisons).

### Implementation
There is a thread for each device polling for data. The GPS protocol classes are implemented with callbacks so that they can be used in other projects as well (eg. QGroundControl uses them too).

### 示例

Starting 2 GPS devices (the main GPS on /dev/ttyS3 and the secondary on /dev/ttyS4):
```
gps start -d /dev/ttyS3 -e /dev/ttyS4
```

Initiate warm restart of GPS device
```
gps reset warm
```

<a id="gps_usage"></a>

### Usage
```
gps <command> [arguments...]
 Commands:
   start
     [-d <val>]  GPS device
                 values: <file:dev>, default: /dev/ttyS3
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 0
     [-e <val>]  Optional secondary GPS device
                 values: <file:dev>
     [-g <val>]  Baudrate (secondary GPS, can also be p:<param_name>)
                 default: 0
     [-i <val>]  GPS interface
                 values: spi|uart, default: uart
     [-j <val>]  secondary GPS interface
                 values: spi|uart, default: uart
     [-p <val>]  GPS Protocol (default=auto select)
                 values: ubx|mtk|ash|eml|fem|nmea

   stop

   status        print status info

   reset         Reset GPS device
     cold|warm|hot Specify reset type
```
## gz_bridge
Source: [modules/simulation/gz_bridge](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/simulation/gz_bridge)


### Description


<a id="gz_bridge_usage"></a>

### 描述
```
gz_bridge <command> [arguments...]
 Commands:
   start
     -m <val>    Fuel model name
     -p <val>    Model Pose
     -n <val>    Model name
     -i <val>    PX4 instance
     [-w <val>]  World name

   stop

   status        print status info
```
## ina220
Source: [drivers/power_monitor/ina220](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/ina220)


### 实现
Driver for the INA220 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x41, and one can run on Bus 2, address 0x43.

If the INA220 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina220_usage"></a>

### 示例
```
ina220 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 65
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 2)
                 default: 1
     [-T <val>]  Type
                 values: VBATT|VREG, default: VBATT

   stop

   status        print status info
```
## ina226
Source: [drivers/power_monitor/ina226](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/ina226)


### 描述
Driver for the INA226 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x41, and one can run on Bus 2, address 0x43.

If the INA226 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina226_usage"></a>

### 描述
```
ina226 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 65
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 2)
                 default: 1

   stop

   status        print status info
```
## ina228
Source: [drivers/power_monitor/ina228](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/ina228)


### 描述
Driver for the INA228 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x45, and one can run on Bus 2, address 0x45.

If the INA228 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina228_usage"></a>

### 使用
```
ina228 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 69
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 2)
                 default: 1

   stop

   status        print status info
```
## ina238
Source: [drivers/power_monitor/ina238](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/ina238)


### Description
Driver for the INA238 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x45, and one can run on Bus 2, address 0x45.

If the INA238 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina238_usage"></a>

### Usage
```
ina238 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 69
     [-k]        if initialization (probing) fails, keep retrying periodically
     [-t <val>]  battery index for calibration values (1 or 2)
                 default: 1

   stop

   status        print status info
```
## iridiumsbd
Source: [drivers/telemetry/iridiumsbd](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/telemetry/iridiumsbd)


### 描述
IridiumSBD driver.

Creates a virtual serial port that another module can use for communication (e.g. mavlink).

<a id="iridiumsbd_usage"></a>

### 描述
```
iridiumsbd <command> [arguments...]
 Commands:
   start
     -d <val>    Serial device
                 values: <file:dev>
     [-v]        Enable verbose output

   test
     [s|read|AT <cmd>] Test command

   stop

   status        print status info
```
## irlock
Source: [drivers/irlock](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/irlock)

<a id="irlock_usage"></a>

### Usage
```
irlock <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 84

   stop

   status        print status info
```
## linux_pwm_out
Source: [drivers/linux_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/linux_pwm_out)


### Description
Linux PWM output driver with board-specific backend implementation.

<a id="linux_pwm_out_usage"></a>

### Usage
```
linux_pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## lsm303agr
Source: [drivers/magnetometer/lsm303agr](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/magnetometer/lsm303agr)

<a id="lsm303agr_usage"></a>

### Usage
```
lsm303agr <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## modal_io
Source: [drivers/actuators/modal_io](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/actuators/modal_io)


### 描述
This module is responsible for...

### Implementation
By default the module runs on a work queue with a callback on the uORB actuator_controls topic.

### 示例
It is typically started with:
```
todo
```


<a id="modal_io_usage"></a>

### 描述
```
modal_io <command> [arguments...]
 Commands:
   start         Start the task

   reset         Send reset request to ESC
     -i <val>    ESC ID, 0-3

   version       Send version request to ESC
     -i <val>    ESC ID, 0-3

   version-ext   Send extended version request to ESC
     -i <val>    ESC ID, 0-3

   rpm           Closed-Loop RPM test control request
     -i <val>    ESC ID, 0-3
     -r <val>    RPM, -32,768 to 32,768
     -n <val>    Command repeat count, 0 to INT_MAX
     -t <val>    Delay between repeated commands (microseconds), 0 to INT_MAX

   pwm           Open-Loop PWM test control request
     -i <val>    ESC ID, 0-3
     -r <val>    Duty Cycle value, 0 to 800
     -n <val>    Command repeat count, 0 to INT_MAX
     -t <val>    Delay between repeated commands (microseconds), 0 to INT_MAX

   tone          Send tone generation request to ESC
     -i <val>    ESC ID, 0-3
     -p <val>    Period of sound, inverse frequency, 0-255
     -d <val>    Duration of the sound, 0-255, 1LSB = 13ms
     -v <val>    Power (volume) of sound, 0-100

   led           Send LED control request
     -l <val>    Bitmask 0x0FFF (12 bits) - ESC0 (RGB) ESC1 (RGB) ESC2 (RGB)
                 ESC3 (RGB)

   stop

   status        print status info
```
## msp_osd
Source: [drivers/osd/msp_osd](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/osd/msp_osd)


### 描述
MSP telemetry streamer

### Implementation
Converts uORB messages to MSP telemetry packets

### 示例
CLI usage example:
```
msp_osd
```


<a id="msp_osd_usage"></a>

### Usage
```
msp_osd <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## newpixel
Source: [drivers/lights/neopixel](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/lights/neopixel)


### 描述
This module is responsible for driving interfasing to the Neopixel Serial LED

### 示例
It is typically started with:
```
neopixel -n 8
```
To drive all available leds.

<a id="newpixel_usage"></a>

### Usage
```
newpixel <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## paa3905
Source: [drivers/optical_flow/paa3905](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/optical_flow/paa3905)

<a id="paa3905_usage"></a>

### 描述
```
paa3905 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-Y <val>]  custom yaw rotation (degrees)
                 default: 0

   stop

   status        print status info
```
## paw3902
Source: [drivers/optical_flow/paw3902](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/optical_flow/paw3902)

<a id="paw3902_usage"></a>

### Usage
```
paw3902 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-Y <val>]  custom yaw rotation (degrees)
                 default: 0

   stop

   status        print status info
```
## pca9685_pwm_out
Source: [drivers/pca9685_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/pca9685_pwm_out)


### 描述
This module is responsible for generate pwm pulse with PCA9685 chip.

It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### Implementation
This module depends on ModuleBase and OutputModuleInterface. IIC communication is based on CDev::I2C

### 示例
It is typically started with:
```
pca9685_pwm_out start -a 64 -b 1
```

The number X can be acquired by executing `pca9685_pwm_out status` when this driver is running.

<a id="pca9685_pwm_out_usage"></a>

### 描述
```
pca9685_pwm_out <command> [arguments...]
 Commands:
   start         Start the task
     [-a <val>]  device address on this bus
                 default: 64
     [-b <val>]  bus that pca9685 is connected to
                 default: 1
     [-r <val>]  schedule rate limit
                 default: 400

   stop

   status        print status info
```
## pm_selector_auterion
Source: [drivers/power_monitor/pm_selector_auterion](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/pm_selector_auterion)


### 描述
Driver for starting and auto-detecting different power monitors.


<a id="pm_selector_auterion_usage"></a>

### 描述
```
pm_selector_auterion <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pmw3901
Source: [drivers/optical_flow/pmw3901](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/optical_flow/pmw3901)

<a id="pmw3901_usage"></a>

### 描述
```
pmw3901 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## pps_capture
Source: [drivers/pps_capture](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/pps_capture)


### 描述
This implements capturing PPS information from the GNSS module and calculates the drift between PPS and Real-time clock.


<a id="pps_capture_usage"></a>

### 描述
```
pps_capture <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out
Source: [drivers/pwm_out](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/pwm_out)


### 描述
This module is responsible for driving the output pins. For boards without a separate IO chip (eg. Pixracer), it uses the main channels. On boards with an IO chip (eg. Pixhawk), it uses the AUX channels, and the px4io driver is used for main ones.


<a id="pwm_out_usage"></a>

### 描述
```
pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out_sim
Source: [modules/simulation/pwm_out_sim](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/simulation/pwm_out_sim)


### 描述
Driver for simulated PWM outputs.

Its only function is to take `actuator_control` uORB messages, mix them with any loaded mixer and output the result to the `actuator_output` uORB topic.

It is used in SITL and HITL.


<a id="pwm_out_sim_usage"></a>

### 描述
```
pwm_out_sim <command> [arguments...]
 Commands:
   start         Start the module
     [-m <val>]  Mode
                 values: hil|sim, default: sim

   stop

   status        print status info
```
## px4flow
Source: [drivers/optical_flow/px4flow](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/optical_flow/px4flow)

<a id="px4flow_usage"></a>

### 描述
```
px4flow <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 66

   stop

   status        print status info
```
## px4io
Source: [drivers/px4io](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/px4io)


### 描述
Output driver communicating with the IO co-processor.

<a id="px4io_usage"></a>

### 描述
```
px4io <command> [arguments...]
 Commands:
   start

   checkcrc      Check CRC for a firmware file against current code on IO
     <filename>  Firmware file

   update        Update IO firmware
     [<filename>] Firmware file

   debug         set IO debug level
     <debug_level> 0=disabled, 9=max verbosity

   bind          DSM bind
     dsm2|dsmx|dsmx8 protocol

   sbus1_out     enable sbus1 out

   sbus2_out     enable sbus2 out

   test_fmu_fail test: turn off IO updates

   test_fmu_ok   re-enable IO updates

   stop

   status        print status info
```
## rc_input
Source: [drivers/rc_input](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/rc_input)


### 描述
This module does the RC input parsing and auto-selecting the method. Supported methods are:
- PPM
- SBUS
- DSM
- SUMD
- ST24
- TBS Crossfire (CRSF)


<a id="rc_input_usage"></a>

### 描述
```
rc_input <command> [arguments...]
 Commands:
   start
     [-d <val>]  RC device
                 values: <file:dev>, default: /dev/ttyS3

   bind          Send a DSM bind command (module must be running)

   stop

   status        print status info
```
## rgbled
Source: [drivers/lights/rgbled_ncp5623c](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/lights/rgbled_ncp5623c)

<a id="rgbled_usage"></a>

### 描述
```
rgbled <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 57
     [-o <val>]  RGB PWM Assignment
                 default: 123

   stop

   status        print status info
```
## rgbled_is31fl3195
Source: [drivers/lights/rgbled_is31fl3195](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/lights/rgbled_is31fl3195)

<a id="rgbled_is31fl3195_usage"></a>

### 描述
```
rgbled_is31fl3195 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 84
     [-o <val>]  RGB PWM Assignment
                 default: 123
     [-i <val>]  Current Band
                 default: 0.5

   stop

   status        print status info
```
## rgbled_lp5562
Source: [drivers/lights/rgbled_lp5562](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/lights/rgbled_lp5562)


### 描述
Driver for [LP5562](https://www.ti.com/product/LP5562) LED driver connected via I2C.

This used in some GPS modules by Holybro for [PX4 status notification](../getting_started/led_meanings.md)

The driver is included by default in firmware (KConfig key DRIVERS_LIGHTS_RGBLED_LP5562) and is always enabled.

<a id="rgbled_lp5562_usage"></a>

### 描述
```
rgbled_lp5562 <command> [arguments...]
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
     [-u <val>]  Current in mA
                 default: 17.5

   stop

   status        print status info
```
## safety_button
Source: [drivers/safety_button](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/safety_button)


### 描述
This module is responsible for the safety button. Pressing the safety button 3 times quickly will trigger a GCS pairing request.


<a id="safety_button_usage"></a>

### 描述
```
safety_button <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## sht3x
Source: [drivers/hygrometer/sht3x](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/hygrometer/sht3x)


### 描述
SHT3x Temperature and Humidity Sensor Driver by Senserion.

### 示例
CLI usage example:
```
sht3x start -X
```
  Start the sensor driver on the external bus

```
sht3x status
```
  Print driver status

```
sht3x values
```
  Print last measured values

```
sht3x reset
```
  Reinitialize senzor, reset flags


<a id="sht3x_usage"></a>

### 描述
```
sht3x <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 68
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info

   values        Print actual data

   reset         Reinitialize sensor
```
## tap_esc
Source: [drivers/tap_esc](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/tap_esc)


### 描述

This module controls the TAP_ESC hardware via UART. It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### Implementation

Currently the module is implemented as a threaded version only, meaning that it runs in its own thread instead of on the work queue.

### Example

The module is typically started with:

```
tap_esc start -d /dev/ttyS2 -n <1-8>
```

<a id="tap_esc_usage"></a>

### 描述
```
tap_esc <command> [arguments...]
 Commands:
   start         Start the task
     [-d <val>]  Device used to talk to ESCs
                 values: <device>
     [-n <val>]  Number of ESCs
                 default: 4
```
## tone_alarm
Source: [drivers/tone_alarm](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/tone_alarm)


### 描述
This module is responsible for the tone alarm.


<a id="tone_alarm_usage"></a>

### 描述
```
tone_alarm <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## uwb
Source: [drivers/uwb/uwb_sr150](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/uwb/uwb_sr150)


### 描述

Driver for NXP UWB_SR150 UWB positioning system. This driver publishes a `uwb_distance` message whenever the UWB_SR150 has a position measurement available.

### Example

Start the driver with a given device:

```
uwb start -d /dev/ttyS2
```

<a id="uwb_usage"></a>

### 描述
```
uwb <command> [arguments...]
 Commands:
   start
     -d <val>    Name of device for serial communication with UWB
                 values: <file:dev>
     -b <val>    Baudrate for serial communication
                 values: <int>

   stop

   status
```
## voxlpm
Source: [drivers/power_monitor/voxlpm](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/drivers/power_monitor/voxlpm)

<a id="voxlpm_usage"></a>

### 描述
```
voxlpm [arguments...]
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 68
     [-T <val>]  Type
                 values: VBATT|P5VDC|P12VDC, default: VBATT
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
