# Modules Reference: Baro (Driver)
## bmp280
Source: [drivers/barometer/bmp280](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/bmp280)

### Usage {#bmp280_usage}
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

   stop

   status        print status info
```
## bmp388
Source: [drivers/barometer/bmp388](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/bmp388)

### Usage {#bmp388_usage}
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
Source: [drivers/barometer/dps310](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/dps310)

### Usage {#dps310_usage}
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
## lps22hb
Source: [drivers/barometer/lps22hb](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/lps22hb)

### Usage {#lps22hb_usage}
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
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## lps25h
Source: [drivers/barometer/lps25h](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/lps25h)

### Usage {#lps25h_usage}
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
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)

   stop

   status        print status info
```
## lps33hw
Source: [drivers/barometer/lps33hw](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/lps33hw)

### Usage {#lps33hw_usage}
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
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 93
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
## mpl3115a2
Source: [drivers/barometer/mpl3115a2](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/mpl3115a2)

### Usage {#mpl3115a2_usage}
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

   stop

   status        print status info
```
## ms5611
Source: [drivers/barometer/ms5611](https://github.com/PX4/Firmware/tree/master/src/drivers/barometer/ms5611)

### Usage {#ms5611_usage}
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
     [-c <val>]  chip-select index (for external SPI)
                 default: 1
     [-m <val>]  SPI mode
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-T <val>]  Device type
                 values: 5607|5611, default: 5611

   stop

   status        print status info
```
