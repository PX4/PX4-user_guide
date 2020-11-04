# Modules Reference: Imu (Driver)
## adis16448
Source: [drivers/imu/adis16448](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/adis16448)

### Usage {#adis16448_usage}
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
## adis16477
Source: [drivers/imu/adis16477](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/adis16477)

### Usage {#adis16477_usage}
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
Source: [drivers/imu/adis16497](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/adis16497)

### Usage {#adis16497_usage}
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
## bma180
Source: [drivers/imu/bma180](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/bma180)

### Usage {#bma180_usage}
```
bma180 <command> [arguments...]
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
Source: [drivers/imu/bosch/bmi055](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/bosch/bmi055)

### Usage {#bmi055_usage}
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
Source: [drivers/imu/bosch/bmi088](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/bosch/bmi088)

### Usage {#bmi088_usage}
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
## bmi160
Source: [drivers/imu/bmi160](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/bmi160)

### Usage {#bmi160_usage}
```
bmi160 <command> [arguments...]
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
## fxas21002c
Source: [drivers/imu/fxas21002c](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/fxas21002c)

### Usage {#fxas21002c_usage}
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
Source: [drivers/imu/fxos8701cq](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/fxos8701cq)

### Usage {#fxos8701cq_usage}
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
Source: [drivers/imu/invensense/icm20602](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm20602)

### Usage {#icm20602_usage}
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
Source: [drivers/imu/invensense/icm20608g](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm20608g)

### Usage {#icm20608g_usage}
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
Source: [drivers/imu/invensense/icm20649](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm20649)

### Usage {#icm20649_usage}
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
Source: [drivers/imu/invensense/icm20689](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm20689)

### Usage {#icm20689_usage}
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
Source: [drivers/imu/invensense/icm20948](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm20948)

### Usage {#icm20948_usage}
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
## icm40609d
Source: [drivers/imu/invensense/icm40609d](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm40609d)

### Usage {#icm40609d_usage}
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
Source: [drivers/imu/invensense/icm42605](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm42605)

### Usage {#icm42605_usage}
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
Source: [drivers/imu/invensense/icm42688p](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/icm42688p)

### Usage {#icm42688p_usage}
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
## ism330dlc
Source: [drivers/imu/st/ism330dlc](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/st/ism330dlc)

### Usage {#ism330dlc_usage}
```
ism330dlc <command> [arguments...]
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

   reset

   stop

   status        print status info
```
## l3gd20
Source: [drivers/imu/l3gd20](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/l3gd20)

### Usage {#l3gd20_usage}
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
Source: [drivers/imu/lsm303d](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/lsm303d)

### Usage {#lsm303d_usage}
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
Source: [drivers/imu/st/lsm9ds1](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/st/lsm9ds1)

### Usage {#lsm9ds1_usage}
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
Source: [drivers/imu/invensense/mpu6000](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/mpu6000)

### Usage {#mpu6000_usage}
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
## mpu9250
Source: [drivers/imu/mpu9250](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/mpu9250)

### Usage {#mpu9250_usage}
```
mpu9250 <command> [arguments...]
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

   stop

   status        print status info
```
## mpu9520
Source: [drivers/imu/invensense/mpu9250](https://github.com/PX4/Firmware/tree/master/src/drivers/imu/invensense/mpu9250)

### Usage {#mpu9520_usage}
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
     [-M]        Enable Magnetometer (AK8963)
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
