---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_driver_airspeed_sensor
---

# 모듈 참조: 항속 센서(드라이버)
## ets_airspeed
소스: [drivers/differential_pressure/ets](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ets)

<a id="ets_airspeed_usage"></a>

### 사용법
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
## ms4515
Source: [drivers/differential_pressure/ms4515](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ms4515)

<a id="ms4515_usage"></a>

### 사용법
```
ms4515 <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 70

   stop

   status        print status info
```
## ms4525do
Source: [drivers/differential_pressure/ms4525do](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ms4525do)

<a id="ms4525do_usage"></a>

### 사용법
```
ms4525do <command> [arguments...]
 Commands:
   start
     [-I]        Internal I2C bus(es)
     [-X]        External I2C bus(es)
     [-b <val>]  board-specific bus (default=all) (external SPI: n-th bus
                 (default=1))
     [-f <val>]  bus frequency in kHz
     [-q]        quiet startup (no message if no device found)
     [-a <val>]  I2C address
                 default: 40

   stop

   status        print status info
```
## ms5525dso
Source: [drivers/differential_pressure/ms5525dso](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/ms5525dso)

<a id="ms5525dso_usage"></a>

### 사용법
```
ms5525dso <command> [arguments...]
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
## sdp3x
Source: [drivers/differential_pressure/sdp3x](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/differential_pressure/sdp3x)

<a id="sdp3x_usage"></a>

### Usage
```
sdp3x <command> [arguments...]
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
