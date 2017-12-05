# LeddarOne

[LeddarOne](https://leddartech.com/modules/leddarone/) is small-size lidar module with a narrow, yet diffuse beam that offers excellent overall detection range and performance in a robust, reliable, cost-effective package. It has a sensing range is from 1cm to 40m and needs to be connected to a UART/serial bus.

## Supporting LeddarOne in Firmware

Add the following line to the *cmake* [config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) which corresponds to the target you want to build for:
```
drivers/leddar_one
```

### Start the Driver {#start_driver}

Update the system to start the driver for the radar during system startup.
You can simply add the following line to an [extras.txt](https://dev.px4.io/en/advanced/system_startup.html) file located on your SD card.
```
leddar_one start -d /dev/serial_port
```

In the above command you will have to replace the last argument with the serial port you have connected the hardware to. Make sure that there is no MAVLink stream in the serial port choosen, if there is one find the parameter to disable it.

## Hardware Setup

You can connect to any free serial port, but you will need to [start the driver](#start_driver) on this port (as above).
Just build a cable following your board pinout and [LeddarOne pinout](https://leddartech.com/app/uploads/dlm_uploads/2017/05/Spec-Sheets-LeddarOne-27octobre2017-web.pdf) you only will need to connect 5V, TX, RX and GND pins.
