# LeddarOne Lidar

[LeddarOne](https://leddartech.com/modules/leddarone/) is small-size Lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance, in a robust, reliable, cost-effective package. It has a sensing range from 1cm to 40m and needs to be connected to a UART/serial bus.

<img src="../../assets/hardware/sensors/leddar_one.jpg" alt="LeddarOne Lidar rangefinder" width="200px" />


## Supporting LeddarOne in Firmware

LeddarOne is not automatically included in [most](#aero) firmware. 
To use it you may need to add the driver to firmware and update a configuration file to start the driver on boot. 

To add the driver to firmware, add the following line to the *cmake* [config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) which corresponds to the target you want to build for:
```
drivers/leddar_one
```

### Start the Driver {#start_driver}

Update the system to start the driver for the radar during system startup.
You can simply add the following line to an [extras.txt](https://dev.px4.io/en/advanced/system_startup.html) file located on your SD card.
```
leddar_one start -d /dev/serial_port
```

In the above command you will have to replace the last argument with the id of the serial port used to connect the hardware. 

> **Warning** If you are connecting to **TELEM2** then set the parameter [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) to 0. Otherwise the
serial port may be used by another application and you will get unexpected behaviour.


## Hardware Setup

You can connect to any free serial port (e.g. TELEM2), but you will need to [start the driver](#start_driver) on this port (as above).

Build a cable following your board and pinout and LeddarOne pinout (shown below). You only will need to connect 5V, TX, RX and GND pins.

Pin | LeddarOne
--- | ---
1 | GND 
2 | - 
3 | VCC 
4 | RX 
5 | TX 
6 | - 

## Intel Aero {#aero}

The LeddarOne is the recommended rangefinder for the *Intel® Aero Ready to Fly Drone*. It is present in Aero firmware and can be enabled/started through *QGroundControl* by setting the [SENS_EN_LEDDAR1](../advanced_config/parameter_reference.md#SENS_EN_LEDDAR1) parameter to 1 (and rebooting).

For more information on hardware setup and configuration see: [The Intel® Aero Ready to Fly Drone](../flight_controller/intel_aero.md#leddarone).


## Further Information

<!-- Would be good to add links to topics on adding drivers to firmware -->
* [PX4 Development Guide](https://dev.px4.io/en/)
* [System Startup > Customizing the System Startup](https://dev.px4.io/en/advanced/system_startup.html#customizing-the-system-startup) (PX4 Development Guide)
* [LeddarOne Spec sheet](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf)
