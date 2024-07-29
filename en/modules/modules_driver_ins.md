# Modules Reference: Ins (Driver)

## sbgecom

Source: [drivers/ins/sbgecom](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/ins/sbgecom)

### Description

Serial bus driver for the SBG Systems products.

Most boards are configured to enable/start the driver on a specified UART using the SENS_SBG_CFG parameter.

Setup/usage information: https://docs.px4.io/main/en/sensor/sbgecom.html

### Examples

Attempt to start driver on a specified serial device.
```
sbgecom start -d /dev/ttyS0
```
Attempt to start driver with a specified baudrate.
```
sbgecom start -b 115200
```
Attempt to start driver with a specified INS configuration file.
```
sbgecom start -f /fs/microsd/custom_settings.json
```
Attempt to start driver with a specified INS configuration string.
```
sbgecom start -s {"output":{"comA":{"messages":{"airData":"onChange"}}}}
```
Stop driver
```
sbgecom stop
```

<a id="sbgecom_usage"></a>

### Usage

```
sbgecom <command> [arguments...]
 Commands:

   start         Start driver
     [-d <val>]  Serial device
                 default: /dev/ttyS0
     [-b <val>]  Baudrate device
                 default: 921600
     [-f <val>]  Config JSON file path
                 default: /etc/extras/sbg_settings.json
     [-s <val>]  Config JSON string

   status        Driver status

   stop          Stop driver
```

## vectornav

Source: [drivers/ins/vectornav](https://github.com/PX4/PX4-Autopilot/tree/main/src/drivers/ins/vectornav)

### Description

Serial bus driver for the VectorNav VN-100, VN-200, VN-300.

Most boards are configured to enable/start the driver on a specified UART using the SENS_VN_CFG parameter.

Setup/usage information: https://docs.px4.io/main/en/sensor/vectornav.html

### Examples

Attempt to start driver on a specified serial device.
```
vectornav start -d /dev/ttyS1
```
Stop driver
```
vectornav stop
```

<a id="vectornav_usage"></a>

### Usage

```
vectornav <command> [arguments...]
 Commands:
   start         Start driver
     -d <val>    Serial device

   status        Driver status

   stop          Stop driver

   status        Print driver status
```
