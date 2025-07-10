---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_driver_imu
---

# 모듈 참조: 관성 센서(드라이버)
## adis16448
소스: [drivers/imu/analog_devices/adis16448](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/analog_devices/adis16448)

<a id="adis16448_usage"></a>

### 사용법
```
adis16448 <command> [arguments...]
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
## adis16470
소스: [drivers/imu/analog_devices/adis16470](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/analog_devices/adis16470)

<a id="adis16470_usage"></a>

### 사용법
```
adis16470 <command> [arguments...]
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
## adis16477
소스: [drivers/imu/adis16477](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/adis16477)

<a id="adis16477_usage"></a>

### 사용법
```
adis16477 <command> [arguments...]
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
## adis16497
소스: [drivers/imu/adis16497](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/adis16497)

<a id="adis16497_usage"></a>

### 사용법
```
adis16497 <command> [arguments...]
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
## bmi055
소스: [drivers/imu/bosch/bmi055](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/bosch/bmi055)

<a id="bmi055_usage"></a>

### 사용법
```
bmi055 <command> [arguments...]
 Commands:
   start
     [-A]        Accel
     [-G]        Gyro
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
## bmi088
소스: [drivers/imu/bosch/bmi088](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/bosch/bmi088)

<a id="bmi088_usage"></a>

### 사용법
```
bmi088 <command> [arguments...]
 Commands:
   start
     [-A]        Accel
     [-G]        Gyro
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
## bmi088_i2c
소스: [drivers/imu/bosch/bmi088/bmi088_i2c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/bosch/bmi088/bmi088_i2c)

<a id="bmi088_i2c_usage"></a>

### 사용법
```
bmi088_i2c <command> [arguments...]
 Commands:
   start
     [-A]        Accel
     [-G]        Gyro
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 24
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## fxas21002c
소스: [drivers/imu/fxas21002c](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/fxas21002c)

<a id="fxas21002c_usage"></a>

### 사용법
```
fxas21002c <command> [arguments...]
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
                 default: 32
     [-R <val>]  Rotation
                 default: 0

   regdump

   testerror

   stop

   status        print status info
```
## fxos8701cq
소스: [drivers/imu/fxos8701cq](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/fxos8701cq)

<a id="fxos8701cq_usage"></a>

### 사용법
```
fxos8701cq <command> [arguments...]
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

   regdump

   testerror

   stop

   status        print status info
```
## icm20602
소스: [drivers/imu/invensense/icm20602](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20602)

<a id="icm20602_usage"></a>

### 사용법
```
icm20602 <command> [arguments...]
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
## icm20608g
소스: [drivers/imu/invensense/icm20608g](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20608g)

<a id="icm20608g_usage"></a>

### 사용법
```
icm20608g <command> [arguments...]
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
## icm20649
소스: [drivers/imu/invensense/icm20649](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20649)

<a id="icm20649_usage"></a>

### 사용법
```
icm20649 <command> [arguments...]
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
## icm20689
소스: [drivers/imu/invensense/icm20689](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20689)

<a id="icm20689_usage"></a>

### 사용법
```
icm20689 <command> [arguments...]
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
## icm20948
소스: [drivers/imu/invensense/icm20948](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20948)

<a id="icm20948_usage"></a>

### 사용법
```
icm20948 <command> [arguments...]
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
     [-M]        Enable Magnetometer (AK8963)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## icm20948_i2c_passthrough
소스: [drivers/imu/invensense/icm20948](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm20948)

<a id="icm20948_i2c_passthrough_usage"></a>

### 사용법
```
icm20948_i2c_passthrough <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 105

   stop

   status        print status info
```
## icm40609d
소스: [drivers/imu/invensense/icm40609d](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm40609d)

<a id="icm40609d_usage"></a>

### 사용법
```
icm40609d <command> [arguments...]
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
## icm42605
소스: [drivers/imu/invensense/icm42605](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm42605)

<a id="icm42605_usage"></a>

### 사용법
```
icm42605 <command> [arguments...]
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
## icm42688p
소스: [drivers/imu/invensense/icm42688p](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/icm42688p)

<a id="icm42670p_usage"></a>

### 사용법
```
icm42688p <command> [arguments...]
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
## l3gd20
소스: [drivers/imu/l3gd20](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/l3gd20)

<a id="icm42688p_usage"></a>

### 사용법
```
l3gd20 <command> [arguments...]
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

   regdump

   testerror

   stop

   status        print status info
```
## lsm303d
소스: [drivers/imu/lsm303d](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/lsm303d)

<a id="l3gd20_usage"></a>

### 사용법
```
lsm303d <command> [arguments...]
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
## lsm9ds1
소스: [drivers/imu/st/lsm9ds1](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/st/lsm9ds1)

<a id="lsm303d_usage"></a>

### 사용법
```
lsm9ds1 <command> [arguments...]
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
## mpu6000
소스: [drivers/imu/invensense/mpu6000](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/mpu6000)

<a id="lsm9ds1_usage"></a>

### 사용법
```
mpu6000 <command> [arguments...]
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
## mpu9520
소스: [drivers/imu/invensense/mpu6500](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/mpu6500)

<a id="mpu6000_usage"></a>

### 사용법
```
mpu9520 <command> [arguments...]
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
## mpu9520_i2c
소스: [drivers/imu/invensense/mpu9250](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/mpu9250)

<a id="mpu9520_usage"></a>

### 사용법
```
mpu9520_i2c <command> [arguments...]
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## mpu9520_i2c
Source: [drivers/imu/invensense/mpu9250](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/imu/invensense/mpu9250)

<a id="mpu9520_i2c_usage"></a>

### Usage
```
mpu9520_i2c <command> [arguments...]
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
