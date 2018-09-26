# Serial Port Configuration

Most serial (UART) ports on a Pixhawk board can be fully configured via parameters
(Exceptions are ports that are used for a very specific purpose, e.g. RC input).

The configuration allows for example to:
- change the baudrate,
- run MAVLink on a different port, or change the streamed messages,
- setup dual GPS,
- enable sensors that run on a serial port, such as some [distance sensors](../sensor/rangefinders.md).

The following ports are mostly used for a specific purpose and thus are configured as:
- MAVLink on the Telem1 port with baudrate 57600 for a [telemetry module](../telemetry/README.md).
- The gps driver on the GPS port.
  > **Note** The GPS baudrate can be set to *Auto* as it will automatically detect the baudrate. Except for the Trimble MB-Two, which requires 115200 baudrate.

All other ports are disabled by default as their configuration depends on the use-case.

## Example Configuration
The following example illustrates how to run a secondary GPS on the Telem2 port.
> **Note** Other drivers are configured in the same way and the configuration parameter names follow the pattern \*\_CONFIG or \*\_CFG.

- Go to the Parameters settings and select the *GPS* tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3).
  ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
- Reboot the vehicle in order for the other parameters to show up.
- Configure the baudrate on the *Serial* tab for the Telem2 port: set it to *Auto*.
  ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

