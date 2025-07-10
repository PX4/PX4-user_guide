---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_driver
---

# 모듈 참조: 드라이버
하위 카테고리:
- [관성 센서](modules_driver_imu.md)
- [거리 센서](modules_driver_distance_sensor.md)
- [항속 센서](modules_driver_airspeed_sensor.md)
- [기압계](modules_driver_baro.md)
- [Transponder](modules_driver_transponder.md)
- [Rpm Sensor](modules_driver_rpm_sensor.md)
- [Optical Flow](modules_driver_optical_flow.md)
- [Magnetometer](modules_driver_magnetometer.md)

## adc
소스: [drivers/adc/board_adc](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/adc/board_adc)


### 설명
ADC 드라이버


<a id="adc_usage"></a>

### 사용법
```
adc <command> [arguments...]
 Commands:
   start

   test

   stop

   status        print status info
```
## ads1115
소스: [drivers/adc/ads1115](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/adc/ads1115)

<a id="ads1115_usage"></a>

### 사용법
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
소스: [drivers/osd/atxxxx](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/osd/atxxxx)


### 설명
예를 들어 OmnibusF4SD 보드에 장착된 ATXXXX 칩용 OSD 드라이버.

OSD_ATXXXX_CFG 매개변수로 활성화합니다.

<a id="atxxxx_usage"></a>

### 사용법
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
## batmon
소스: [drivers/smart_battery/batmon](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/smart_battery/batmon)


### 설명
BatMon 지원 스마트 배터리와 SMBUS 통신용 드라이버 설정/사용 정보: https://rotoye.com/batmon-tutorial/
### 예
주소 0x0B에서 시작하려면 버스 4에서
```
batmon start -X -a 11 -b 4
```


<a id="batmon_usage"></a>

### 사용법
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

   suspend       Suspends the driver from rescheduling the cycle.

   resume        Resumes the driver from suspension.

   stop

   status        print status info
```
## batt_smbus
소스: [drivers/batt_smbus](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/batt_smbus)


### 설명
BQ40Z50 연료 게이지 IC용 스마트 배터리 드라이버.

### 예
매개변수를 설정하기 위해 플래시에 쓰기. 주소, number_of_bytes, byte0, ..., byteN
```
batt_smbus -X write_flash 19069 2 27 0
```


<a id="batt_smbus_usage"></a>

### 사용법
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

   seal          Seals the devices flash memory to disbale write_flash commands.

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
소스: [drivers/telemetry/bst](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/telemetry/bst)

<a id="bst_usage"></a>

### 사용법
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
소스: [drivers/dshot](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/dshot)


### 설명
이것은 DShot 출력 드라이버입니다. fmu 드라이버와 유사하며, PWM 대신 ESC 통신 프로토콜로 DShot을 사용하기 위하여 사용할 수 있습니다.

On startup, the module tries to occupy all available pins for DShot output. It skips all pins already in use (e.g. by a camera trigger module).

모터 1 영구 역회전 :
- DShot150, DShot300, DShot600, DShot1200
- 별도의 UART를 통한 텔레메트리와 esc_status 메시지로 게시
- CLI를 통해 DShot 명령 보내기

### 예
Permanently reverse motor 1:
```
dshot reverse -m 1
dshot save -m 1
```
After saving, the reversed direction will be regarded as the normal one. So to reverse again repeat the same commands.

<a id="dshot_usage"></a>

### 사용법
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
## fake_gps
소스: [examples/fake_imu](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_imu)


### 설명


<a id="fake_gps_usage"></a>

### 사용법
```
fake_gps <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fake_imu
소스: [examples/fake_magnetometer](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_magnetometer)


### 설명


<a id="fake_imu_usage"></a>

### 사용법
```
fake_imu <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## fake_magnetometer
Source: [examples/fake_magnetometer](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_magnetometer)


### 설명
Publish the earth magnetic field as a fake magnetometer (sensor_mag). Requires vehicle_attitude and vehicle_gps_position.

<a id="fake_magnetometer_usage"></a>

### 사용법
```
fake_magnetometer <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## gimbal
Source: [modules/gimbal](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/gimbal)


### 설명
Mount/gimbal Gimbal control driver. It maps several different input methods (eg. RC or MAVLink) to a configured output (eg. AUX channels or MAVLink).

Documentation how to use it is on the [gimbal_control](https://docs.px4.io/master/en/advanced/gimbal_control.html) page.

### Examples
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

   test          Test the output: set a fixed angle for one or multiple axes
                 (gimbal must be running)
     roll|pitch|yaw <angle> Specify an axis and an angle in degrees

   stop

   status        print status info
```
## gps
Source: [drivers/gps](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/gps)


### Description
GPS driver module that handles the communication with the device and publishes the position via uORB. It supports multiple protocols (device vendors) and by default automatically selects the correct one.

The module supports a secondary GPS device, specified via `-e` parameter. The position will be published on the second uORB topic instance, but it's currently not used by the rest of the system (however the data will be logged, so that it can be used for comparisons).

### Implementation
There is a thread for each device polling for data. The GPS protocol classes are implemented with callbacks so that they can be used in other projects as well (eg. QGroundControl uses them too).

### Examples

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
## ina226
Source: [drivers/power_monitor/ina226](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/ina226)


### Description
Driver for the INA226 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x41, and one can run on Bus 2, address 0x43.

If the INA226 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina226_usage"></a>

### Usage
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
Source: [drivers/power_monitor/ina228](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/ina228)


### Description
Driver for the INA228 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x45, and one can run on Bus 2, address 0x45.

If the INA228 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina228_usage"></a>

### Usage
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
Source: [drivers/power_monitor/ina238](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/ina238)


### Description
Driver for the INA238 power monitor.

Multiple instances of this driver can run simultaneously, if each instance has a separate bus OR I2C address.

For example, one instance can run on Bus 2, address 0x45, and one can run on Bus 2, address 0x45.

If the INA238 module is not powered, then by default, initialization of the driver will fail. To change this, use the -f flag. If this flag is set, then if initialization fails, the driver will keep trying to initialize again every 0.5 seconds. With this flag set, you can plug in a battery after the driver starts, and it will work. Without this flag set, the battery must be plugged in before starting the driver.


<a id="ina238_usage"></a>

### 설명
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
Source: [drivers/telemetry/iridiumsbd](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/telemetry/iridiumsbd)


### 예
IridiumSBD driver.

Creates a virtual serial port that another module can use for communication (e.g. mavlink).

<a id="iridiumsbd_usage"></a>

### 사용법
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
Source: [drivers/irlock](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/irlock)

<a id="irlock_usage"></a>

### 사용법
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
Source: [drivers/linux_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/linux_pwm_out)


### 사용법
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
Source: [drivers/magnetometer/lsm303agr](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/lsm303agr)

<a id="lsm303agr_usage"></a>

### 구현
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
## newpixel
Source: [drivers/lights/neopixel](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/lights/neopixel)


### Description
This module is responsible for driving interfasing to the Neopixel Serial LED

### Examples
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
Source: [drivers/optical_flow/paa3905](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/paa3905)

<a id="paa3905_usage"></a>

### Usage
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
Source: [drivers/optical_flow/paw3902](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/paw3902)

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
## pca9685
Source: [drivers/pca9685](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pca9685)

<a id="pca9685_usage"></a>

### Usage
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
     [-a <val>]  I2C address
                 default: 64

   reset

   test          enter test mode

   stop

   status        print status info
```
## pca9685_pwm_out
Source: [drivers/pca9685_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pca9685_pwm_out)


### Description
This module is responsible for generate pwm pulse with PCA9685 chip.

It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### Implementation
This module depends on ModuleBase and OutputModuleInterface. IIC communication is based on CDev::I2C

### Examples
It is typically started with:
```
pca9685_pwm_out start -a 64 -b 1
```

Use the `mixer` command to load mixer files. `mixer load /dev/pwm_outputX etc/mixers/quad_x.main.mix` The number X can be acquired by executing `pca9685_pwm_out status` when this driver is running.

<a id="pca9685_pwm_out_usage"></a>

### Usage
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
## pmw3901
Source: [drivers/optical_flow/pmw3901](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/pmw3901)

<a id="pmw3901_usage"></a>

### Usage
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
Source: [drivers/pps_capture](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pps_capture)


### Description
This implements capturing PPS information from the GNSS module and calculates the drift between PPS and Real-time clock.


<a id="pps_capture_usage"></a>

### Usage
```
pps_capture <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out
Source: [drivers/pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pwm_out)


### Description
This module is responsible for driving the output pins. For boards without a separate IO chip (eg. Pixracer), it uses the main channels. On boards with an IO chip (eg. Pixhawk), it uses the AUX channels, and the px4io driver is used for main ones.

It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

On startup, the module tries to occupy all available pins for PWM/Oneshot output. It skips all pins already in use (e.g. by a camera trigger module).

### Implementation
By default the module runs on a work queue with a callback on the uORB actuator_controls topic.

<a id="pwm_out_usage"></a>

### Usage
```
pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## pwm_out_sim
Source: [drivers/pwm_out_sim](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pwm_out_sim)


### Description
Driver for simulated PWM outputs.

Its only function is to take `actuator_control` uORB messages, mix them with any loaded mixer and output the result to the `actuator_output` uORB topic.

It is used in SITL and HITL.


<a id="pwm_out_sim_usage"></a>

### Usage
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
Source: [drivers/optical_flow/px4flow](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/px4flow)

<a id="px4flow_usage"></a>

### Usage
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
Source: [drivers/px4io](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/px4io)


### Description
Output driver communicating with the IO co-processor.

<a id="px4io_usage"></a>

### Usage
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
Source: [drivers/rc_input](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/rc_input)


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
Source: [drivers/lights/rgbled_ncp5623c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/lights/rgbled_ncp5623c)

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
     [-o <val>]  RGB PWM Assignment
                 default: 123

   stop

   status        print status info
```
## roboclaw
Source: [drivers/roboclaw](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/roboclaw)


### Description

This driver communicates over UART with the [Roboclaw motor driver](http://downloads.basicmicro.com/docs/roboclaw_user_manual.pdf). It performs two tasks:

 - `actuator_controls_0` UOrb 주제를 기반으로 모터를 제어합니다.
 - 휠 인코더를 읽고 `wheel_encoders` UOrb 주제에 원시 데이터를 게시합니다.

In order to use this driver, the Roboclaw should be put into Packet Serial mode (see the linked documentation), and your flight controller's UART port should be connected to the Roboclaw as shown in the documentation. For Pixhawk 4, use the `UART & I2C B` port, which corresponds to `/dev/ttyS3`.

### Implementation

The main loop of this module (Located in `RoboClaw.cpp::task_main()`) performs 2 tasks:

 1. Roboclaw가 사용 가능해지면, `actuator_controls_0` 메시지를 Roboclaw에 작성하십시오.
 2. 일정한 속도로 Roboclaw에서 인코더 데이터를 읽습니다.

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

### 사용법
```
roboclaw <command> [arguments...]
 Commands:
```
## safety_button
Source: [drivers/safety_button](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/safety_button)


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
## sht3x
Source: [drivers/hygrometer/sht3x](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/hygrometer/sht3x)


### Description
SHT3x Temperature and Humidity Sensor Driver by Senserion.

### Examples
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

### Usage
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
Source: [drivers/tap_esc](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/tap_esc)


### Description
This module controls the TAP_ESC hardware via UART. It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### Implementation
Currently the module is implementd as a threaded version only, meaning that it runs in its own thread instead of on the work queue.

### Example
The module is typically started with: tap_esc start -d /dev/ttyS2 -n <1-8>


<a id="tap_esc_usage"></a>

### Usage
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
Source: [drivers/tone_alarm](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/tone_alarm)


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
## uwb
Source: [drivers/uwb/uwb_sr150](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/uwb/uwb_sr150)


### Description

Driver for NXP UWB_SR150 UWB positioning system. This driver publishes a `uwb_distance` message whenever the UWB_SR150 has a position measurement available.

### Example

Start the driver with a given device:

```
uwb start -d /dev/ttyS2
```

<a id="uwb_usage"></a>

### Usage
```
uwb <command> [arguments...]
 Commands:
   start
     -d <val>    Name of device for serial communication with UWB
                 values: <file:dev>
     -b <val>    Baudrate for serial communication
                 values: <int>
     -p <val>    Position Debug: displays errors in Multilateration
                 values: <int>

   stop

   status
```
## voxlpm
Source: [drivers/power_monitor/voxlpm](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/voxlpm)

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
     [-a <val>]  I2C address
                 default: 68
     [-T <val>]  Type
                 values: VBATT|P5VDC|P12VDC, default: VBATT
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
