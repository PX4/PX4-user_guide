# uLanding Radar

The *Aerotenna* [uLanding](https://aerotenna.com/sensors/#ulanding) altimeter is compact microwave rangefinder that has been optimised for use on UAVs. With a sensing range of 45m, it is useful for applications including terrain following, precision hovering (e.g. for photography), anti-collision sensing etc. Particular advantages of this product are that it can operate effectively in all weather conditions and over all terrain types (including water).

<img src="../../assets/hardware/sensors/uLanding_lite_1.jpg" alt="Aerotenna uLanding" width="300px" />

The rangefinder is not automatically included in most firmware, and hence cannot be used just by setting a parameter through *QGroundControl* (as is possible with some other rangefinders). To use it you will need to add the driver to firmware and update a configuration file to start the driver on boot. The sections below explain how.

## Hardware Setup

The rangefinder is supported by any hardware which runs a NuttX or Posix OS and which can offer a serial port for the interface. Minimally this will include most, if not all, [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers.

uLanding can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

## Parameter Setup

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_ULAND_CFG](../advanced_config/parameter_reference.md#SENS_ULAND_CFG). There is no need to set the baud rate for the port, as this is configured by the driver.

> **Note** If the configuration parameter is not available in *QGroundControl* then you may need to [add the driver to the firmware](../peripherals/serial_configuration.md#parameter_not_in_firmware): ```drivers/distance_sensor/ulanding```

## Further Information

* [PX4 Development Guide](https://dev.px4.io/en/)