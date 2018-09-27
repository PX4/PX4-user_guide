# LeddarOne Lidar

[LeddarOne](https://leddartech.com/modules/leddarone/) is small-size Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. 
It has a sensing range from 1cm to 40m and needs to be connected to a UART/serial bus.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne Lidar rangefinder" width="200px" />


## Hardware Setup

LeddarOne can be connected to any unused *serial port* (UART), e.g.: TELEM2, TELEM3, GPS2 etc.

Build a cable following your board and pinout and LeddarOne pinout (shown below). You only will need to connect 5V, TX, RX and GND pins.

Pin | LeddarOne
--- | ---
1 | GND 
2 | - 
3 | VCC 
4 | RX 
5 | TX 
6 | - 


## Parameter Setup

To enable LeddarOne configure the serial port on which it will run using [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG).
For more information see: [Serial Port Configuration](../peripherals/serial_configuration.md).

> **Note** PX4 includes the LeddarOne driver by default on many [Pixhawk-series](../flight_controller/pixhawk_series.md) boards, including: px4fmu-v3, px4fmu-v4, px4fmu-v4pro, px4fmu-v5, aerofc-v1, aerocore2, auav-X21, mindpx-v2, nxphlite-v3.
  You can use any other board (e.g. px4fmu-v2) but you will need to [add the driver to the firmware](#firmware).

  
## Add LeddarOne to Firmware {#firmware}

> **Note** This is only required if you want to use LeddarOne on a board that doesn't include it in firmware.

LeddarOne is present if the build configuration includes `drivers/distance_sensor` or `drivers/distance_sensor/leddar_one` (check using [this search](https://github.com/PX4/Firmware/search?utf8=%E2%9C%93&q=%22drivers%2Fdistance_sensor%22)).

If it isn't present you can include the driver in firmware by adding the following line to the [cmake config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target you want to build for:
```
drivers/distance_sensor/leddar_one
```

## Intel Aero {#aero}

The LeddarOne is the recommended rangefinder for the *Intel® Aero Ready to Fly Drone*. For more information on hardware setup and configuration see: [The Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md#leddarone).


## Further Information

<!-- Would be good to add links to topics on adding drivers to firmware -->
* [PX4 Development Guide](https://dev.px4.io/en/)
* [System Startup > Customizing the System Startup](https://dev.px4.io/en/advanced/system_startup.html#customizing-the-system-startup) (PX4 Development Guide)
* [LeddarOne Spec sheet](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf)
