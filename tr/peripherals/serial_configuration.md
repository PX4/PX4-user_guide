---
canonicalUrl: https://docs.px4.io/main/tr/peripherals/serial_configuration
---

# Serial Port Configuration

Many serial (UART) ports on a Pixhawk board can be fully configured via parameters: e.g.: `GPS1`, `TELEM1`, `TELEM2`, `TELEM4` (`UART+I2C`).

The configuration makes it easy to (for example):
- change the baudrate on a port.
- run MAVLink on a different port, or change the streamed messages.
- setup dual GPS.
- enable sensors that run on a serial port, such as some [distance sensors](../sensor/rangefinders.md).

:::note
Some ports cannot be configured because they are used for a very specific purpose like RC input or the system console (`SERIAL 5`).
:::

<span id="default_port_mapping"></span>
## Pre-configured Ports

The following functions are typically mapped to the same specific serial ports on all boards, and are hence mapped by default:

- MAVLink is mapped to the `TELEM 1` port with baudrate 57600 (for a [telemetry module](../telemetry/README.md)).
- GPS 1 ([gps driver](../modules/modules_driver.md#gps)) is mapped to the `GPS 1` port with a baudrate *Auto* (with this setting a GPS will automatically detect the baudrate - except for the Trimble MB-Two, which requires 115200 baudrate).
- MAVLink is mapped to the Ethernet port using `MAV_2_CONFIG` on Pixhawk devices that have an Ethernet port.

All other ports have no assigned functions by default (are disabled).

:::tip
The port mappings above can be disabled by setting [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), and [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG) to *Disabled*, respectively.
:::


## How to Configure a Port

All the serial drivers/ports are configured in the same way:
1. Set the configuration parameter for the service/peripheral to the port it will use.

:::note
Configuration parameter names follow the pattern `*_CONFIG` or `*_CFG` (*QGroundControl* only displays the parameters for services/drivers that are present in firmware). At time of writing the current set is: [GPS_1_CONFIG](../advanced_config/parameter_reference.md#GPS_1_CONFIG), [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG), [ISBD_CONFIG](../advanced_config/parameter_reference.md#ISBD_CONFIG), [MAV_0_CONFIG](../advanced_config/parameter_reference.md#MAV_0_CONFIG), [MAV_1_CONFIG](../advanced_config/parameter_reference.md#MAV_1_CONFIG), [MAV_2_CONFIG](../advanced_config/parameter_reference.md#MAV_2_CONFIG), [RTPS_CONFIG](../advanced_config/parameter_reference.md#RTPS_CONFIG), [RTPS_MAV_CONFIG](../advanced_config/parameter_reference.md#RTPS_MAV_CONFIG), [TEL_FRSKY_CONFIG](../advanced_config/parameter_reference.md#TEL_FRSKY_CONFIG), [TEL_HOTT_CONFIG](../advanced_config/parameter_reference.md#TEL_HOTT_CONFIG), [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG), [SENS_SF0X_CFG](../advanced_config/parameter_reference.md#SENS_SF0X_CFG), [SENS_TFMINI_CFG](../advanced_config/parameter_reference.md#SENS_TFMINI_CFG), [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG).
:::
1. Reboot the vehicle in order to make the additional configuration parameters visible.
1. Set the baud rate parameter for the selected port to the desired value.
1. Configure module-specific parameters (i.e. MAVLink streams and data rate configuration).

The [GPS/Compass > Secondary GPS](../gps_compass/README.md#dual_gps) section provides a practical example of how to configure a port in *QGroundControl* (it shows how to use `GPS_2_CONFIG` to run a secondary GPS on the `TELEM 2` port).


## Deconflicting Ports

Port conflicts are handled by system startup, which ensures that at most one service is run on a specific port. For example, it is not possible to start a MAVLink instance on a specific serial device, and then launch a driver that uses the same serial device.

:::warning
At time of writing there is no user feedback about conflicting ports.
:::


## Troubleshooting

<span id="parameter_not_in_firmware"></span>
### Configuration Parameter Missing from *QGroundControl*

*QGroundControl* only displays the parameters for services/drivers that are present in firmware. If a parameter is missing, then you may need to add it in firmware.

:::note PX4 firmware includes most drivers by default on [Pixhawk-series](../flight_controller/pixhawk_series.md) boards. Flash-limited boards may comment out/omit the driver (at time of writing this only affects boards based on FMUv2).
:::

You can include the missing driver in firmware by enabling the driver in the **default.px4board** config file that corresponds to the [board](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/boards/px4) you want to build for. For example, to enable the SRF02 driver, you would a the following line to the px4board.
```
CONFIG_DRIVERS_DISTANCE_SENSOR_SRF02=y
```

An easier method would be using boardconfig which launches a GUI where you can easily search, disable and enable modules. To launch boardconfig type `make <vendor>_<board>_<label> boardconfig`

You will then need to build the firmware for your platform, as described in [Building PX4 Software](../dev_setup/building_px4.md).


## Further Information

* [MAVLink Peripherals (OSD/GCS/Companion Computers/etc.)](../peripherals/mavlink_peripherals.md)
