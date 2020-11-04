# Modules Reference: Magnetometer (Driver)
## ak09916
Source: [drivers/magnetometer/akm/ak09916](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/akm/ak09916)

### Usage {#ak09916_usage}
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## ak8963
Source: [drivers/magnetometer/akm/ak8963](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/akm/ak8963)

### Usage {#ak8963_usage}
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## bmm150
Source: [drivers/magnetometer/bmm150](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/bmm150)

### Usage {#bmm150_usage}
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
     [-R <val>]  Rotation
                 default: 0

   reset

   regdump

   selftest

   stop

   status        print status info
```
## hmc5883
Source: [drivers/magnetometer/hmc5883](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/hmc5883)

### Usage {#hmc5883_usage}
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
Source: [drivers/magnetometer/isentek/ist8308](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/isentek/ist8308)

### Usage {#ist8308_usage}
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## ist8310
Source: [drivers/magnetometer/isentek/ist8310](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/isentek/ist8310)

### Usage {#ist8310_usage}
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
Source: [drivers/magnetometer/lis2mdl](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/lis2mdl)

### Usage {#lis2mdl_usage}
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## lis3mdl
Source: [drivers/magnetometer/lis3mdl](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/lis3mdl)

### Usage {#lis3mdl_usage}
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
## lsm9ds1_mag
Source: [drivers/magnetometer/lsm9ds1_mag](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/lsm9ds1_mag)

### Usage {#lsm9ds1_mag_usage}
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
Source: [drivers/magnetometer/qmc5883l](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/qmc5883l)

### Usage {#qmc5883l_usage}
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
     [-R <val>]  Rotation
                 default: 0

   stop

   status        print status info
```
## rm3100
Source: [drivers/magnetometer/rm3100](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer/rm3100)

### Usage {#rm3100_usage}
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
