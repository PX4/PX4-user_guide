---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_driver_magnetometer
---

# 모듈 참조: 자기 센서(드라이버)
## ak09916
소스: [drivers/magnetometer/akm/ak09916](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/akm/ak09916)

<a id="ak09916_usage"></a>

### 사용법
```
ak09916 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 12
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## ak8963
소스: [drivers/magnetometer/akm/ak8963](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/akm/ak8963)

<a id="ak8963_usage"></a>

### 사용법
```
ak8963 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 12
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## bmm150
소스: [drivers/magnetometer/bosch/bmm150](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/bosch/bmm150)

<a id="bmm150_usage"></a>

### 사용법
```
bmm150 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 16
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## hmc5883
소스: [drivers/magnetometer/hmc5883](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/hmc5883)

<a id="hmc5883_usage"></a>

### 사용법
```
hmc5883 <command> [arguments...]
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
     [-R <val>]  Rotation
                 default: 0
     [-T]        Enable temperature compensation

   stop

   status        print status info
```
## ist8308
소스: [drivers/magnetometer/isentek/ist8308](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/isentek/ist8308)

<a id="ist8308_usage"></a>

### 사용법
```
ist8308 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 12
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## ist8310
소스: [drivers/magnetometer/isentek/ist8310](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/isentek/ist8310)

<a id="ist8310_usage"></a>

### 사용법
```
ist8310 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 14
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## lis2mdl
소스: [drivers/magnetometer/lis2mdl](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/lis2mdl)

<a id="lis2mdl_usage"></a>

### 사용법
```
lis2mdl <command> [arguments...]
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
                 default: 30
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## lis3mdl
소스: [drivers/magnetometer/lis3mdl](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/lis3mdl)

<a id="lis3mdl_usage"></a>

### 사용법
```
lis3mdl <command> [arguments...]
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
                 default: 30
     [-R <val>]  Rotation
                 default: 0

   reset

   stop

   status        print status info
```
## lsm9ds1_mag
소스: [drivers/magnetometer/lsm9ds1_mag](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/lsm9ds1_mag)

<a id="lsm9ds1_mag_usage"></a>

### 사용법
```
lsm9ds1_mag <command> [arguments...]
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
## qmc5883l
소스: [drivers/magnetometer/qmc5883l](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/qmc5883l)

<a id="qmc5883l_usage"></a>

### 사용법
```
qmc5883l <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 13
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## rm3100
소스: [drivers/magnetometer/rm3100](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/rm3100)

<a id="rm3100_usage"></a>

### 사용법
```
rm3100 <command> [arguments...]
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## vcm1193l
소스: [drivers/magnetometer/vtrantech/vcm1193l](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/magnetometer/vtrantech/vcm1193l)

<a id="vcm1193l_usage"></a>

### 사용법
```
vcm1193l <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
