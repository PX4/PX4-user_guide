# 모듈 참조: 드라이버
하위 카테고리:
- [관성 센서](modules_driver_imu.md)
- [거리 센서](modules_driver_distance_sensor.md)
- [항속 센서](modules_driver_airspeed_sensor.md)
- [기압계](modules_driver_baro.md)
- [광류 센서](modules_driver_optical_flow.md)
- [지자계](modules_driver_magnetometer.md)

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

다음을 지원합니다.
- DShot150, DShot300, DShot600, DShot1200
- 별도의 UART를 통한 텔레메트리와 esc_status 메시지로 게시
- CLI를 통해 DShot 명령 보내기

### 예
모터 1 영구 역회전 :
```
dshot reverse -m 1
dshot save -m 1
```
저장 후, 반대 방향은 정상 방향으로 간주됩니다. 동일한 명령을 반복하면, 회전 방향을 반전합니다.

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
소스: [examples/fake_gps](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_gps)


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
소스: [examples/fake_imu](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_imu)


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
소스: [examples/fake_magnetometer](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/fake_magnetometer)


### 설명
가짜 자력계(sensor_mag)로 지구 자기장을 게시합니다. vehicle_attitude와 vehicle_gps_position이 필요합니다.

<a id="fake_magnetometer_usage"></a>

### 사용법
```
fake_magnetometer <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## gps
소스: [drivers/gps](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/gps)


### 설명
장치와의 통신을 처리하고 uORB를 통해 위치를 게시하는 GPS 드라이버 모듈입니다. 여러 프로토콜(장치 공급업체)을 지원하며, 기본적으로 적절한 프로토콜을 자동으로 선택합니다.

모듈은 `-e` 매개변수를 통하여 지정된 보조 GPS 장치를 지원합니다. 위치는 두 번째 uORB 주제 인스턴스에 게시되지만, 현재 시스템의 나머지 부분에서는 사용되지 않습니다(그러나 데이터는 비교용으로 사용할 수 있도록 기록됩니다).

### 구현
데이터를 폴링하는 각 장치에 대한 스레드가 존재합니다. GPS 프로토콜 클래스는 다른 프로젝트에서도 사용할 수 있도록 콜백으로 구현됩니다(예: QGroundControl에서도 사용).

### 예

2개의 GPS 장치 (/dev/ttyS3의 기본 GPS 및 /dev/ttyS4의 보조 GPS)를 시작합니다:
```
gps start -d /dev/ttyS3 -e /dev/ttyS4
```

GPS 장치를 재시작합니다.
```
gps reset warm
```

<a id="gps_usage"></a>

### 사용법
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
                 values: ubx|mtk|ash|eml|fem

   stop

   status        print status info

   reset         Reset GPS device
     cold|warm|hot Specify reset type
```
## ina226
소스: [drivers/power_monitor/ina226](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/ina226)


### 설명
INA226 전력 모니터용 드라이버.

각 인스턴스에 별도의 버스 또는 I2C 주소가 있는 경우에는 이 드라이버의 여러 인스턴스를 동시에 실행할 수 있습니다.

예를 들어, 하나의 인스턴스는 버스 2의 주소 0x41에서 실행될 수 있고, 다른 인스턴스는 버스 2의 주소 0x43에서 실행할 수 있습니다.

INA226 모듈에 전원이 공급되지 않으면, 기본적으로 드라이버 초기화가 실패합니다. 이를 변경하려면, -f 플래그를 사용하십시오. 이 플래그가 설정되면, 초기화에 실패하면 드라이버는 0.5초마다 초기화를 계속 시도합니다. 이 플래그를 설정하면, 드라이버가 시작된 후 배터리를 연결하면 작동합니다. 이 플래그가 설정되지 않은 경우에는, 드라이버를 시작하기 전에 배터리를 연결해야 합니다.

<a id="ina226_usage"></a>

### 사용법
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
## iridiumsbd
소스: [drivers/telemetry/iridiumsbd](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/telemetry/iridiumsbd)


### 설명
IridiumSBD 드라이버.

다른 모듈에서 통신용으로 사용할 수 있는 가상 직렬 포트를 생성합니다(예: mavlink).

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
소스: [drivers/irlock](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/irlock)

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
소스: [drivers/linux_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/linux_pwm_out)


### 설명
보드별 백엔드를 구현한 Linux PWM 출력 드라이버.

<a id="linux_pwm_out_usage"></a>

### 사용법
```
linux_pwm_out <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## lsm303agr
소스: [drivers/magnetometer/lsm303agr](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/lsm303agr)

<a id="lsm303agr_usage"></a>

### 사용법
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
소스: [drivers/lights/neopixel](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/lights/neopixel)


### 설명
이 모듈은 네오픽셀 직렬 LED에 인터페이싱을 구동합니다.

### 예
보통 다음 명령으로 시작합니다.
```
neopixel -n 8
```
사용 가능한 모든 LED를 구동합니다.

<a id="newpixel_usage"></a>

### 사용법
```
newpixel <command> [arguments...]
 Commands:
   stop

   status        print status info
```
## paw3902
소스: [drivers/optical_flow/paw3902](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/paw3902)

<a id="paw3902_usage"></a>

### 사용법
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
소스: [drivers/pca9685](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pca9685)

<a id="pca9685_usage"></a>

### 사용법
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
소스: [drivers/pca9685_pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pca9685_pwm_out)


### 설명
이 모듈은 PCA9685 칩으로 PWM 펄스를 생성합니다.

이것은 Actuator_controls 토픽을 듣고 믹싱을 하고 PWM을 출력합니다.

### 구현
이 모듈은 ModuleBase와 OutputModuleInterface에 의존합니다. IIC 통신은 CDev::I2C를 기반으로 합니다.

### 예
보통 다음 명령으로 시작합니다.
```
pca9685_pwm_out start -a 64 -b 1
```

`mixer` 명령을 사용하여, 믹서 파일을 로드합니다. `mixer load /dev/pwm_outputX etc/mixers/quad_x.main.mix` 이 드라이버가 실행 중일 때 `pca9685_pwm_out status`를 실행하여 숫자 X를 얻을 수 있습니다.

<a id="pca9685_pwm_out_usage"></a>

### 사용법
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
소스: [drivers/rpm/pcf8583](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/rpm/pcf8583)

<a id="pcf8583_usage"></a>

### 사용법
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
     [-a <val>]  I2C address
                 default: 80

   stop

   status        print status info
```
## pmw3901
소스: [drivers/optical_flow/pmw3901](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/pmw3901)

<a id="pmw3901_usage"></a>

### 사용법
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
소스: [drivers/pwm_out](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pwm_out)


### 설명
이 모듈은 출력을 구동하고 입력 핀을 읽는 역할을 합니다. 별도의 IO 칩이 없는 보드(예: Pixracer)의 경우에는 메인 채널을 사용합니다. IO 칩이 있는 보드(예: Pixhawk)에서는 AUX 채널을 사용하고, px4io 드라이버는 기본 채널에 사용됩니다.

이것은 Actuator_controls 토픽을 듣고 믹싱을 하고 PWM을 출력합니다.

모듈은 mode_* 명령어로 설정됩니다. 이 명령으로 드라이버에 할당할 최초의 N개의 핀을 정의합니다. 예를 들어, mode_pwm4를 사용하면 핀 5와 6을 카메라 트리거 드라이버나 PWM 거리 측정기 드라이버에서 사용할 수 있습니다. 또는 pwm_out을 캡처 모드 중 하나로 시작한 다음, 드라이버가 ioctl 호출로 캡처 콜백을 등록할 수 있습니다.

### 구현
기본적으로 모듈은 uORB actuator_controls 주제에 대한 콜백을 사용하여 작업 대기열에서 실행됩니다.

### 예
보통 다음 명령으로 시작합니다.
```
pwm_out mode_pwm
```
사용 가능한 모든 PIN을 구동합니다.

입력(상승 및 하강 에지)을 캡처하고, 콘솔에 인쇄합니다. 캡처 모드 중 하나에서 pwm_out을 시작합니다.
```
pwm_out mode_pwm3cap1
```
이렇게 하면 4번째 핀에서 캡처할 수 있습니다. 다음 명령어를 실행하십시오.
```
pwm_out test
```

추가 구성(PWM 속도, 레벨, ...)에는 `pwm` 명령을 사용하고, 믹서 파일을 로드하려면 `mixer` 명령을 사용하십시오.

<a id="pwm_out_usage"></a>

### 사용법
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
## pwm_out_sim
소스: [drivers/pwm_out_sim](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/pwm_out_sim)


### 설명
시뮬레이션된 PWM 출력용 드라이버입니다.

유일한 기능은 `actuator_control` uORB 메시지를 가져와서 로드된 믹서와 혼합하고, 결과를 `actuator_output` uORB 주제로 출력하는 것입니다.

SITL 및 HITL에서 사용됩니다.

<a id="pwm_out_sim_usage"></a>

### 사용법
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
소스: [drivers/optical_flow/px4flow](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/optical_flow/px4flow)

<a id="px4flow_usage"></a>

### 사용법
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
소스: [drivers/rc_input](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/rc_input)


### 설명
이 모듈은 RC 입력 구문 분석과 프로토콜을 자동으로 선택합니다. 지원되는 프로토콜은 다음과 같습니다.
- PPM
- SBUS
- DSM
- SUMD
- ST24
- TBS Crossfire (CRSF)

<a id="rc_input_usage"></a>

### 사용법
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
소스: [drivers/lights/rgbled_ncp5623c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/lights/rgbled_ncp5623c)

<a id="rgbled_usage"></a>

### 사용법
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
소스: [drivers/roboclaw](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/roboclaw)


### 설명

이 드라이버는 UART로 [Roboclaw 모터 드라이버](http://downloads.basicmicro.com/docs/roboclaw_user_manual.pdf)와 통신합니다. 두 가지 작업을 수행합니다.

 - `actuator_controls_0` UOrb 주제를 기반으로 모터를 제어합니다.
 - 휠 인코더를 읽고 `wheel_encoders` UOrb 주제에 원시 데이터를 게시합니다.

이 드라이버를 사용하려면, Roboclaw를 패킷 직렬 모드(링크된 문서 참조)로 설정해야 하며, 문서에 표시된 대로 비행 컨트롤러의 UART 포트가 Roboclaw에 연결되어야 합니다. Pixhawk 4의 경우에는 `/dev/ttyS3`에 해당하는 `UART & I2C B` 포트를 사용합니다.

### 구현

이 모듈의 메인 루프(`RoboClaw.cpp::task_main()`에 있음)는 2가지 작업을 수행합니다.

 1. Roboclaw가 사용 가능해지면, `actuator_controls_0` 메시지를 Roboclaw에 작성하십시오.
 2. 일정한 속도로 Roboclaw에서 인코더 데이터를 읽습니다.

UART의 지연 시간 때문에, 이 드라이버는 모든 단일 `actuator_controls_0` 메시지를 즉시 Roboclaw에 쓰지 않습니다. 대신, `RBCLW_WRITE_PER` 매개변수에 따라 속도가 제한됩니다.

시작시, 이 드라이버는 Roboclaw의 상태를 읽고 연결 여부를 확인합니다. 이 과정이 실패하면, 드라이버는 즉시 종료됩니다.

### 예

이 드라이버를 시작하는 명령은 다음과 같습니다:

 $ roboclaw start <device> <baud>

`<device>`은 UART 포트의 이름입니다. 픽스호크 4에서는 `/dev/ttyS3`입니다. `<baud>`는 초당 비트 전송율입니다.

사용할 수 있는 명령어는 다음과 같습니다:

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
소스: [drivers/safety_button](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/safety_button)


### 설명
이 모듈은 안전 버튼을 담당합니다. 안전 버튼을 빠르게 3번 누르면, GCS 페어링 요청이 실행됩니다.

<a id="safety_button_usage"></a>

### 사용법
```
safety_button <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## tone_alarm
소스: [drivers/tone_alarm](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/tone_alarm)


### 설명
This module controls the TAP_ESC hardware via UART. It listens on the actuator_controls topics, does the mixing and writes the PWM outputs.

### 사용법
소스: [modules/vmount](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/vmount)

### 설명
The module is typically started with: tap_esc start -d /dev/ttyS2 -n <1-8>

<a id="tap_esc_usage"></a>

### 구현
```
tone_alarm <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## vmount
사용 방법은 [gimbal_control](https://dev.px4.io/master/en/advanced/gimbal_control.html)을 참고하십시오.


### 예
This module is responsible for the tone alarm.

<a id="tone_alarm_usage"></a>

### 사용법
```
tone_alarm <command> [arguments...]
 Commands:
   start

   stop

   status        print status info
```
## voxlpm
고정 방위각을 설정한 출력 값을 시험합니다(그리고 다른 축은 0 값을 잡아줍니다):


### 사용법
마운트(짐벌) 콘트롤 드라이버입니다. 다양한 입력 방법(예: RC 또는 MAVLink)을 설정 출력(예: AUX 채널 또는 MAVLink)에 매핑합니다.

사용 방법은 [gimbal_control](https://dev.px4.io/master/en/advanced/gimbal_control.html)을 참고하십시오.

### 구현
각 메소드는 자체 클래스에서 구현되며, 입출력에 대한 공통 기본 클래스가 있습니다. `ControlData` 데이터 구조로 정의된 API를 통하여 연결됩니다. 이 방법은 각 입력 방법을 각 출력 방법과 함께 사용할 수 있고, 최소한의 노력으로 신규 입력/출력을 추가할 수 있습니다.

### 예
고정 방위각을 설정한 출력 값을 시험합니다(그리고 다른 축은 0 값을 잡아줍니다):
```
vmount stop
vmount test yaw 30
```

<a id="vmount_usage"></a>

### 사용법
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
## voxlpm
소스: [drivers/power_monitor/voxlpm](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/power_monitor/voxlpm)

<a id="voxlpm_usage"></a>

### 사용법
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
