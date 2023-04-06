# 모듈 참조: 기압 센서(드라이버)
## bmp280
소스: [drivers/barometer/bmp280](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/bmp280)

<a id="bmp280_usage"></a>

### 사용법
```
bmp280 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 118
```
## bmp388
소스: [drivers/barometer/bmp388](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/bmp388)

<a id="bmp388_usage"></a>

### 사용법
```
bmp388 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 118

   stop

   status        print status info
```
## dps310
소스: [drivers/barometer/dps310](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/dps310)

<a id="dps310_usage"></a>

### 사용법
```
dps310 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 119

   stop

   status        print status info
```
## icp101xx
Source: [drivers/barometer/invensense/icp101xx](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer/invensense/icp101xx)

<a id="icp101xx_usage"></a>

### 사용법
```
icp101xx <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 99

   stop

   status        print status info
```
## icp201xx
Source: [drivers/barometer/invensense/icp201xx](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/barometer/invensense/icp201xx)

<a id="icp201xx_usage"></a>

### 사용법
```
icp201xx <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 99

   stop

   status        print status info
```
## lps22hb
Source: [drivers/barometer/lps22hb](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/lps22hb)

<a id="lps22hb_usage"></a>

### 사용법
```
lps22hb <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## lps25h
Source: [drivers/barometer/lps25h](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/lps25h)

<a id="lps25h_usage"></a>

### 사용법
```
lps25h <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## lps33hw
Source: [drivers/barometer/lps33hw](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/lps33hw)

<a id="lps33hw_usage"></a>

### 사용법
```
lps33hw <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 93
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
## mpc2520
Source: [drivers/barometer/maiertek/mpc2520](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/maiertek/mpc2520)

<a id="mpc2520_usage"></a>

### Usage
```
mpc2520 <command> [arguments...]
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
## mpl3115a2
Source: [drivers/barometer/mpl3115a2](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/mpl3115a2)

<a id="mpl3115a2_usage"></a>

### Usage
```
mpl3115a2 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 96

   stop

   status        print status info
```
## ms5611
Source: [drivers/barometer/ms5611](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5611)

<a id="ms5611_usage"></a>

### Usage
```
ms5611 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-T <val>]  Device type
                 values: 5607|5611, default: 5611

   stop

   status        print status info
```
## ms5837
Source: [drivers/barometer/ms5837](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/ms5837)

<a id="ms5837_usage"></a>

### Usage
```
ms5837 <command> [arguments...]
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
## spl06
Source: [drivers/barometer/goertek/spl06](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/barometer/goertek/spl06)

<a id="spl06_usage"></a>

### Usage
```
spl06 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 118
     [-s]        Internal SPI bus(es)
     [-S]        External SPI bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-c <val>]  chip-select pin (for internal SPI) or index (for external SPI)
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
