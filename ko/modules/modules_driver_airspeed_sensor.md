---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_driver_airspeed_sensor
---

# Modules Reference: Airspeed Sensor (Driver)
## ets_airspeed
Source: [drivers/differential_pressure/ets](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ets)

<a id="ets_airspeed_usage"></a>

### Usage
```
ets_airspeed <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 117

   stop

   status        print status info
```
## ms4525_airspeed
Source: [drivers/differential_pressure/ms4525](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ms4525)

<a id="ms4525_airspeed_usage"></a>

### Usage
```
ms4525_airspeed <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-T <val>]  Device type
                 values: 4525|4515, default: 4525

   stop

   status        print status info
```
## ms5525_airspeed
Source: [drivers/differential_pressure/ms5525](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ms5525)

<a id="ms5525_airspeed_usage"></a>

### Usage
```
ms5525_airspeed <command> [arguments...]
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
## sdp3x_airspeed
Source: [drivers/differential_pressure/sdp3x](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/sdp3x)

<a id="sdp3x_airspeed_usage"></a>

### Usage
```
sdp3x_airspeed <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 33
     [-k]        if initialization (probing) fails, keep retrying periodically

   stop

   status        print status info
```
