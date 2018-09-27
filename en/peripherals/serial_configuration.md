# Serial Port Configuration

Most serial (UART) ports on a Pixhawk board can be fully configured via parameters
(exceptions are ports that are used for a very specific purpose, e.g. RC input).

The configuration makes it easy to (for example):
- change the baudrate on a port.
- run MAVLink on a different port, or change the streamed messages.
- setup dual GPS.
- enable sensors that run on a serial port, such as some [distance sensors](../sensor/rangefinders.md).

## Pre-configured Ports

The following functions are typically mapped to the same specific serial ports on all boards, and are hence mapped by default:

- MAVLink is mapped to the `TELEM 1` port with baudrate 57600 (for a [telemetry module](../telemetry/README.md)).
- GPS 1 ([gps driver](https://dev.px4.io/en/middleware/modules_driver.html#gps)) is mapped to the `GPS 1` port with a baudrate *Auto* (with this setting a GPS will automatically detect the baudrate - except for the Trimble MB-Two, which requires 115200 baudrate).

All other ports have no assigned functions by default (are disabled).

> **Tip** The ports mappings above can be disabled by setting [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG) and [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG) to *Disabled*, respectively.


## How to Configure a Port

All the serial drivers/ports are configured in the same way:
1. Set the configuration parameter for the service/peripheral to the port it will use.
  Configuration parameter names follow the pattern `\*\_CONFIG` or `\*\_CFG`.
1. Reboot the vehicle.
1. Set the baud rate parameter for the selected port to the desired value. 


The following example provides a practical example: how to run a secondary GPS (`GPS_2_CONFIG`) on the `TELEM 2` port.

1. Go to the Parameters settings
1. Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3).
  ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
1. Reboot the vehicle in order for the other parameters to show up.
1. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*.
  ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)


## Deconficting Ports

At time of writing there is no way to de-conflict ports.

> **Caution** If you assign the same port to multiple services neither service may work properly.


