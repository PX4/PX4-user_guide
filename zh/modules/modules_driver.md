# 模块参考：驱动
子分类
- [Imu](modules_driver_imu.md)
- [Source: [drivers/distance_sensor/pga460](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/pga460)](modules_driver_distance_sensor.md)
- [Airspeed Sensor](modules_driver_airspeed_sensor.md)
- [Baro](modules_driver_baro.md)
- [光流](modules_driver_optical_flow.md)
- [磁力计](modules_driver_magnetometer.md)

## adc
Source: [drivers/adc/board_adc](https://github.com/PX4/Firmware/tree/master/src/drivers/adc/board_adc)


### 描述
To write to flash to set parameters. address, number_of_bytes, byte0, ... , byteN

<a id="adc_usage"></a>

### 用法
```
adc <command> [arguments...]
 Commands:
   start

   test

   stop

   status        print status info
```
## fmu
Source: [drivers/px4fmu](https://github.com/PX4/Firmware/tree/master/src/drivers/px4fmu)

<a id="ads1115_usage"></a>

### 用法
```
ads1115 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 72

   stop

   status        print status info
```
## atxxxx
This module is responsible for driving the output and reading the input pins. For boards without a separate IO chip (eg. Pixracer), it uses the main channels. On boards with an IO chip (eg. Pixhawk), it uses the AUX channels, and the px4io driver is used for main ones.


### 描述
例如，安装在OmnibusF4SD板子上的用于OSD驱动的ATXXXX芯片

The module is configured via mode_* commands. This defines which of the first N pins the driver should occupy. By using mode_pwm4 for example, pins 5 and 6 can be used by the camera trigger driver or by a PWM rangefinder driver. Alternatively, the fmu can be started in one of the capture modes, and then drivers can register a capture callback with ioctl calls.

<a id="atxxxx_usage"></a>

### 用法
```
atxxxx <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## batt_smbus
源码位置: [drivers/batt_smbus](https://github.com/PX4/Firmware/tree/master/src/drivers/batt_smbus)


### 描述
用于智能电池的BQ40Z50电量统计芯片

### 示例
通过写入flash来设置它的参数。 address, number_of_bytes, byte0, ... , byteN
```
batt_smbus -X write_flash 19069 2 27 0
```

<a id="batt_smbus_usage"></a>

### 描述
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

   unseal        解锁设备的flash来使能 write_flash 命令

   seal          锁住设备的flash来失能 write_flash 命令.

   suspend       从调度循环中挂起该设备

   resume        将该设备从挂起状态恢复

   write_flash   写入flash。 必须先通过unseal 命令来解锁flash。
     [address]   写入的起始地址
     [number of bytes] 需要写入的字节数
     [data[0]...data[n]] 具体的字节数据，使用空格隔开

   stop          停止设备

   status        打印状态信息
```
## bst
Capture input (rising and falling edges) and print on the console: start the fmu in one of the capture modes:

<a id="bst_usage"></a>

### 用法
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
## dshot
This will enable capturing on the 4th pin. Then do:


### 用法
This is the DShot output driver. It is similar to the fmu driver, and can be used as drop-in replacement to use DShot as ESC communication protocol instead of PWM.

It supports:
- DShot150, DShot300, DShot600, DShot1200
- 通过独立的串口遥控，并且发布esc_status消息
- 通过命令行接口发送 DShot 命令

### 描述
GPS driver module that handles the communication with the device and publishes the position via uORB. It supports multiple protocols (device vendors) and by default automatically selects the correct one.
```
dshot reverse -m 1
dshot save -m 1
```
After saving, the reversed direction will be regarded as the normal one. So to reverse again repeat the same commands.

<a id="dshot_usage"></a>

### 示例
```
dshot <command> [arguments...]
 Commands:
   start         Start the task (without any mode set, use any of the mode_*
                 cmds)

 All of the mode_* commands will start the module if not running already

   mode_gpio

   mode_pwm      Select all available pins as PWM

   mode_pwm14

   mode_pwm12

   mode_pwm8

   mode_pwm6

   mode_pwm5

   mode_pwm5cap1

   mode_pwm4

   mode_pwm4cap1

   mode_pwm4cap2

   mode_pwm3

   mode_pwm3cap1

   mode_pwm2

   mode_pwm2cap2

   mode_pwm1

   telemetry     Enable Telemetry on a UART
     <device>    UART device

   reverse       Reverse motor direction
     [-m <val>]  Motor index (1-based, default=all)

   normal        Normal motor direction
     [-m <val>]  Motor index (1-based, default=all)

   save          Save current settings
     [-m <val>]  Motor index (1-based, default=all)

   3d_on         Enable 3D mode
     [-m <val>]  Motor index (1-based, default=all)

   3d_off        Disable 3D mode
     [-m <val>]  Motor index (1-based, default=all)

   beep1         Send Beep pattern 1
     [-m <val>]  Motor index (1-based, default=all)

   beep2         Send Beep pattern 2
     [-m <val>]  Motor index (1-based, default=all)

   beep3         Send Beep pattern 3
     [-m <val>]  Motor index (1-based, default=all)

   beep4         Send Beep pattern 4
     [-m <val>]  Motor index (1-based, default=all)

   beep5         Send Beep pattern 5
     [-m <val>]  Motor index (1-based, default=all)

   esc_info      Request ESC information
     -m <val>    Motor index (1-based)

   stop

   status        print status info
```
## sf1xx
Source: [examples/fake_gps](https://github.com/PX4/Firmware/tree/master/src/examples/fake_gps)


### 用法

<a id="fake_gps_usage"></a>

### 描述
```
fake_gps <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fmu mode_pwm
Source: [examples/fake_gyro](https://github.com/PX4/Firmware/tree/master/src/examples/fake_gyro)


### 描述

<a id="fake_gyro_usage"></a>

### 描述
```
fake_gyro <command> [arguments...]
 mc_att_control <command> [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
## fake_magnetometer
Starting 2 GPS devices (the main GPS on /dev/ttyS3 and the secondary on /dev/ttyS4): gps start -d /dev/ttyS3 -e /dev/ttyS4


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
## gps
Source: [drivers/gps](https://github.com/PX4/Firmware/tree/master/src/drivers/gps)


### 实现
GPS driver module that handles the communication with the device and publishes the position via uORB. It supports multiple protocols (device vendors) and by default automatically selects the correct one.

模块支持一个辅助（secondary） GPS 设备，可使用 `-e` 参数进行指定。 辅助 GPS 的位置信息会在第二个 uORB 主题实例上发布，但目前为止系统的其它部分暂未使用该数据（但该数据会被记录下来，以方便进行对比）。

### 示例
每个设备都有一个线程轮询数据。 There is a thread for each device polling for data. The GPS protocol classes are implemented with callbacks so that they can be used in other projects as well (eg. QGroundControl uses them too).

### 用法

Starting 2 GPS devices (the main GPS on /dev/ttyS3 and the secondary on /dev/ttyS4):
```
gps start -d /dev/ttyS3 -e /dev/ttyS4
```

pga460 &lt;command&gt; [arguments...] Commands: start &lt;device_path&gt; [device_path] The pga460 sensor device path, (e.g: /dev/ttyS6 status stop help
```
sf1xx stop
```

<a id="gps_usage"></a>

### 描述
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
     [-s]        Enable publication of satellite info
     [-i <val>]  GPS interface
                 values: spi|uart, default: uart
     [-j <val>]  secondary GPS interface
                 values: spi|uart, default: uart
     [-p <val>]  GPS Protocol (default=auto select)
                 values: ubx|mtk|ash|eml

   stop

   status        print status info

   reset         Reset GPS device
     cold|warm|hot Specify reset type
```
## ina226
Source: [drivers/power_monitor/ina226](https://github.com/PX4/Firmware/tree/master/src/drivers/power_monitor/ina226)


### 描述
This module does the RC input parsing and auto-selecting the method. Supported methods are:

By default the module runs on the work queue, to reduce RAM usage. It can also be run in its own thread, specified via start flag -t, to reduce latency. When running on the work queue, it schedules at a fixed frequency.

Source: [drivers/distance_sensor/sf1xx](https://github.com/PX4/Firmware/tree/master/src/drivers/distance_sensor/sf1xx)

If the INA226 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.

<a id="ina226_usage"></a>

### 用法
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
## irlock
Source: [drivers/irlock](https://github.com/PX4/Firmware/tree/master/src/drivers/irlock)

<a id="irlock_usage"></a>

### 用法
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
## fmu mode_pwm3cap1
Attempt to start driver on any bus (start on bus where first sensor found).


### 使用
Stop driver

<a id="linux_pwm_out_usage"></a>

### 描述
```
linux_pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pga460
Source: [drivers/magnetometer/lsm303agr](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/lsm303agr)

<a id="lsm303agr_usage"></a>

### 描述
```
lsm303agr <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## newpixel
This module controls the TAP_ESC hardware via UART. It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.


### 实现
Currently the module is implementd as a threaded version only, meaning that it runs in its own thread instead of on the work queue.

### 示例
The module is typically started with: tap_esc start -d /dev/ttyS2 -n
```
neopixel -n 8
```
该模块监听 actuator_controls 主题，执行混控并写入 PWM 输出。

<a id="newpixel_usage"></a>

### 使用
```
newpixel <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## paw3902
Source: [drivers/optical_flow/paw3902](https://github.com/PX4/Firmware/tree/master/src/drivers/optical_flow/paw3902)

<a id="paw3902_usage"></a>

### 使用
```
paw3902 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-Y <val>]  custom yaw rotation (degrees)
                 default: 0

   stop

   status        print status info
```
## pca9685
通常使用如下命令：

<a id="pca9685_usage"></a>

### 使用
```
pca9685 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   reset

   test          enter test mode

   stop

   status        print status info
```
## pca9685_pwm_out
Source: [drivers/pca9685_pwm_out](https://github.com/PX4/Firmware/tree/master/src/drivers/pca9685_pwm_out)


### 描述
This module is responsible for generate pwm pulse with PCA9685 chip.

It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### 实现
This module depends on ModuleBase and OutputModuleInterface. IIC communication is based on CDev::I2C

### 示例
It is typically started with:
```
pca9685_pwm_out start -a 64 -b 1
```

Use the `mixer` command to load mixer files. `mixer load /dev/pwm_outputX etc/mixers/quad_x.main.mix` The number X can be acquired by executing `pca9685_pwm_out status` when this driver is running.

<a id="pca9685_pwm_out_usage"></a>

### 使用
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
## pcf8583
Source: [drivers/rpm/pcf8583](https://github.com/PX4/Firmware/tree/master/src/drivers/rpm/pcf8583)

<a id="pcf8583_usage"></a>

### 描述
```
pcf8583 <command> [arguments...]
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
## pwm_out_sim
By default the module runs on the work queue, to reduce RAM usage. It can also be run in its own thread, specified via start flag -t, to reduce latency. When running on the work queue, it schedules at a fixed frequency, and the pwm rate limits the update rate of the actuator_controls topics. In case of running in its own thread, the module polls on the actuator_controls topic. Additionally the pwm rate defines the lower-level IO timer rates.

<a id="pmw3901_usage"></a>

### 使用
```
pmw3901 <command> [arguments...]
 Commands:
   start
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## pwm_out
Source: [drivers/pwm_out](https://github.com/PX4/Firmware/tree/master/src/drivers/pwm_out)


### 使用
This module is responsible for driving the output and reading the input pins. For boards without a separate IO chip (eg. Pixracer), it uses the main channels. On boards with an IO chip (eg. Pixhawk), it uses the AUX channels, and the px4io driver is used for main ones.

It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

The module is configured via mode_* commands. This defines which of the first N pins the driver should occupy. By using mode_pwm4 for example, pins 5 and 6 can be used by the camera trigger driver or by a PWM rangefinder driver. Alternatively, pwm_out can be started in one of the capture modes, and then drivers can register a capture callback with ioctl calls.

### 描述
By default the module runs on a work queue with a callback on the uORB actuator_controls topic.

### 使用
源码：[drivers/pwm_out_sim](https://github.com/PX4/Firmware/tree/master/src/drivers/pwm_out_sim)
```
pwm_out mode_pwm
```
针对仿真模拟的 PWM 输出的驱动。

Capture input (rising and falling edges) and print on the console: start pwm_out in one of the capture modes:
```
pwm_out mode_pwm3cap1
```
This will enable capturing on the 4th pin. Then do:
```
pwm_out test
```

Use the `pwm` command for further configurations (PWM rate, levels, ...), and the `mixer` command to load mixer files.

<a id="pwm_out_usage"></a>

### 使用
```
pwm_out <command> [arguments...]
 Commands:
   start         Start the task (without any mode set, use any of the mode_*
                 cmds)

 All of the mode_* commands will start pwm_out if not running already

   mode_gpio

   mode_pwm      Select all available pins as PWM

   mode_pwm14

   mode_pwm12

   mode_pwm8

   mode_pwm6

   mode_pwm5

   mode_pwm5cap1

   mode_pwm4

   mode_pwm4cap1

   mode_pwm4cap2

   mode_pwm3

   mode_pwm3cap1

   mode_pwm2

   mode_pwm2cap2

   mode_pwm1

   sensor_reset  Do a sensor reset (SPI bus)
     [<ms>]      Delay time in ms between reset and re-enabling

   peripheral_reset Reset board peripherals
     [<ms>]      Delay time in ms between reset and re-enabling

   i2c           Configure I2C clock rate
     <bus_id> <rate> Specify the bus id (>=0) and rate in Hz

   test          Test inputs and outputs

   stop

   status        print status info
```
## rc_input
源码：[drivers/rc_input](https://github.com/PX4/Firmware/tree/master/src/drivers/rc_input)


### 描述
Driver for simulated PWM outputs.

Its only function is to take `actuator_control` uORB messages, mix them with any loaded mixer and output the result to the `actuator_output` uORB topic.

It is used in SITL and HITL.

<a id="pwm_out_sim_usage"></a>

### 实现
```
pwm_out_sim <command> [arguments...]
 rc_input <command> [arguments...]
 Commands:
   start         Start the task (without any mode set, use any of the mode_*
                 cmds)
     [-t]        Run as separate task instead of the work queue

   bind          Send a DSM bind command (module must be running)

   stop

   status        print status info
```
## px4flow
Source: [drivers/optical_flow/px4flow](https://github.com/PX4/Firmware/tree/master/src/drivers/optical_flow/px4flow)

<a id="px4flow_usage"></a>

### 示例
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
     [-R <val>]  Rotation (default=downwards)
                 default: 25

   stop

   status        print status info
```
## rc_input
Source: [drivers/rc_input](https://github.com/PX4/Firmware/tree/master/src/drivers/rc_input)


### Description
This module does the RC input parsing and auto-selecting the method. Supported methods are:
- PPM
- SBUS
- DSM
- SUMD
- ST24
- TBS Crossfire (CRSF)

<a id="rc_input_usage"></a>

### Usage
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
Source: [drivers/lights/rgbled_ncp5623c](https://github.com/PX4/Firmware/tree/master/src/drivers/lights/rgbled_ncp5623c)

<a id="rgbled_usage"></a>

### Usage
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

   stop

   status        print status info
```
## roboclaw
Source: [drivers/roboclaw](https://github.com/PX4/Firmware/tree/master/src/drivers/roboclaw)


### Description

This driver communicates over UART with the [Roboclaw motor driver](http://downloads.basicmicro.com/docs/roboclaw_user_manual.pdf). It performs two tasks:

 - Control the motors based on the `actuator_controls_0` UOrb topic.
 - Read the wheel encoders and publish the raw data in the `wheel_encoders` UOrb topic

In order to use this driver, the Roboclaw should be put into Packet Serial mode (see the linked documentation), and your flight controller's UART port should be connected to the Roboclaw as shown in the documentation. For Pixhawk 4, use the `UART & I2C B` port, which corresponds to `/dev/ttyS3`.

### Implementation

The main loop of this module (Located in `RoboClaw.cpp::task_main()`) performs 2 tasks:

 1. Write `actuator_controls_0` messages to the Roboclaw as they become available
 2. Read encoder data from the Roboclaw at a constant, fixed rate.

Because of the latency of UART, this driver does not write every single `actuator_controls_0` message to the Roboclaw immediately. Instead, it is rate limited based on the parameter `RBCLW_WRITE_PER`.

On startup, this driver will attempt to read the status of the Roboclaw to verify that it is connected. If this fails, the driver terminates immediately.

### Examples

The command to start this driver is:

 $ roboclaw start <device> <baud>

`<device>` is the name of the UART port. On the Pixhawk 4, this is `/dev/ttyS3`. `<baud>` is te baud rate.

All available commands are:

 - `$ roboclaw start <device> <baud>`
 - `$ roboclaw status`
 - `$ roboclaw stop`

<a id="roboclaw_usage"></a>

### Usage
```
roboclaw <command> [arguments...]
 Commands:
```
## safety_button
Source: [drivers/safety_button](https://github.com/PX4/Firmware/tree/master/src/drivers/safety_button)


### Description
This module is responsible for the safety button. Pressing the safety button 3 times quickly will trigger a GCS pairing request.

<a id="safety_button_usage"></a>

### Usage
```
safety_button <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## tone_alarm
Source: [drivers/tone_alarm](https://github.com/PX4/Firmware/tree/master/src/drivers/tone_alarm)


### Description
This module is responsible for the tone alarm.

<a id="tone_alarm_usage"></a>

### Usage
```
tone_alarm <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## vmount
Source: [modules/vmount](https://github.com/PX4/Firmware/tree/master/src/modules/vmount)


### Description
Mount (Gimbal) control driver. It maps several different input methods (eg. RC or MAVLink) to a configured output (eg. AUX channels or MAVLink).

Documentation how to use it is on the [gimbal_control](https://dev.px4.io/master/en/advanced/gimbal_control.html) page.

### Implementation
Each method is implemented in its own class, and there is a common base class for inputs and outputs. They are connected via an API, defined by the `ControlData` data structure. This makes sure that each input method can be used with each output method and new inputs/outputs can be added with minimal effort.

### Examples
Test the output by setting a fixed yaw angle (and the other axes to 0):
```
vmount stop
vmount test yaw 30
```

<a id="vmount_usage"></a>

### Usage
```
vmount <command> [arguments...]
 Commands:
   start

   test          Test the output: set a fixed angle for one axis (vmount must
                 not be running)
     roll|pitch|yaw <angle> Specify an axis and an angle in degrees

   stop

   status        print status info
```
## voxlpm
Source: [drivers/power_monitor/voxlpm](https://github.com/PX4/Firmware/tree/master/src/drivers/power_monitor/voxlpm)

<a id="voxlpm_usage"></a>

### Usage
```
voxlpm [arguments...]
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-T <val>]  Type
                 values: VBATT|P5VDC|P12VDC, default: VBATT
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
