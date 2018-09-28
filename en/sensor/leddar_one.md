# LeddarOne Lidar

[LeddarOne](https://leddartech.com/modules/leddarone/) is small Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. 
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

[Configure the serial port](../peripherals/serial_configuration.md) on which the lidar will run using [SENS_LEDDAR1_CFG](../advanced_config/parameter_reference.md#SENS_LEDDAR1_CFG).
There is no need to set the baud rate for the port, as this is configured by the driver.

> **Note** If `SENS_LEDDAR1_CFG` is not available in *QGroundControl* then you will need to [add the driver to the firmware](#firmware).


## Firmware Setup {#firmware}

> **Note** PX4 firmware includes the LeddarOne driver by default on most [Pixhawk-series](../flight_controller/pixhawk_series.md) boards.
  This step is only required for the few boards that don't include it in firmware.

You can include the driver in firmware by adding the following line to the [cmake config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) that corresponds to the target you want to build for:
```
drivers/distance_sensor/leddar_one
```

You will then need to build the firmware for your platform, as described in [Building PX4 Software](https://dev.px4.io/en/setup/building_px4.html) (PX4 Development Guide).

## Intel Aero {#aero}

The LeddarOne is the recommended rangefinder for the *Intel® Aero Ready to Fly Drone*. For more information on hardware setup and configuration see: [The Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md#leddarone).


## Further Information

* [LeddarOne Spec sheet](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf)
