# uLanding Radar

The uLanding radar is a product from [Aerotenna](http://aerotenna.com/sensors/) and can be used to measure distance to an object.


## Enable the driver for your hardware
Currently, this radar device is supported by any hardware which runs a NuttX or Posix OS and which can offer a serial port for the
interface. Since flash space is small on some hardware you may have to enable building the driver for your target yourself.
To do so add the following line to the cmake config file which corresponds to the target you want to build for:
```
drivers/ulanding
```

All config files are located [here.](https://github.com/PX4/Firmware/tree/master/cmake/configs) If you are running a Posix build
and want to use the uLanding driver, your config file will need to include -D__PX4_POSIX in the add_definitions section. An example
of how to do this is in either of the OcPoc config files (posix_ocpoc_cross.cmake or posix_ocpoc_ubuntu.cmake) but you do not 
need an OcPoc, the driver will run on any Posix build.  

## Start the driver
You will have to tell the sytem to start the driver for the radar during sytem startup.
You can simply add the following line to an [extras.txt](../advanced/system_startup.md) file located on your SD card.
```
ulanding_radar start /dev/serial_port
```

In the above command you will have to replace the last argument with the serial port you have connected the hardware to.
If you don't specify any port the driver will use /dev/ttyS2 which is the TELEM2 port on Pixhawk. If either of the OcPoc config
files are used (posix_ocpoc_cross.cmake or posix_ocpoc_ubuntu.cmake) the default port will be /dev/ttyS6.

> **Warning** If you are connecting the radar device to TELEM2 then make sure to set the parameter SYS_COMPANION to 0. Otherwise the
serial port will be used by a another application and you will get unexpected behaviour.
