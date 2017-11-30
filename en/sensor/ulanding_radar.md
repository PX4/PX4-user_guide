# uLanding Radar

The *Aerotenna* [uLanding](https://aerotenna.com/sensors/#ulanding) altimeter is compact microwave rangefinder that has been optimised for use on UAVs. With a sensing range of 45m, it is useful for applications including terrain following, precision hovering (e.g. for photography), anti-collision sensing etc. Particular advantages of this product are that it can operate effectively in all weather conditions and over all terrain types (including water).

<img src="../../assets/hardware/sensors/uLanding_lite_1.jpg" alt="Aerotenna uLanding" width="300px" />

> **Note** Due to flash space limitations on some flight controllers the driver may not be built into all firmware. 
> In order to use this rangefinder you will need to build PX4 and add the firmware yourself. 
> This is requires an understanding of the build system. For more information see the [PX4 Development Guide](https://dev.px4.io/en/).


## Supporting uLanding in Firmware
 
### Add the Driver to the Firmware

Add the following line to the *cmake* [config file](https://github.com/PX4/Firmware/tree/master/cmake/configs) which corresponds to the target you want to build for:
```
drivers/ulanding
```

If you are running a Posix build and want to use the uLanding driver, 
your config file will need to include `-D__PX4_POSIX` in the `add_definitions` section. 
An example of how to do this is in either of the OcPoc config files 
(**posix_ocpoc_cross.cmake** or **posix_ocpoc_ubuntu.cmake**) - but you do not 
need an OcPoc as the driver will run on any Posix build.  

### Start the Driver {#start_driver}

Update the system to start the driver for the radar during system startup.
You can simply add the following line to an [extras.txt](https://dev.px4.io/en/advanced/system_startup.html) file located on your SD card.
```
ulanding_radar start /dev/serial_port
```

In the above command you will have to replace the last argument with the serial port you have connected the hardware to.
If you don't specify any port the driver will use `/dev/ttyS2` which is the **TELEM2** port on Pixhawk. If either of the OcPoc config
files are used (**posix_ocpoc_cross.cmake** or **posix_ocpoc_ubuntu.cmake**) the default port will be `/dev/ttyS6`.

> **Warning** If you are connecting the radar device to **TELEM2** then make sure to set the parameter [SYS_COMPANION](../advanced_config/parameter_reference.md#SYS_COMPANION) to 0. Otherwise the
serial port will be used by a another application and you will get unexpected behaviour.

## Hardware Setup

The rangefinder is supported by any hardware which runs a NuttX or Posix OS and which can offer a serial port for the
interface. Minimally this will include most, if not all, [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers.

You can connect to any free serial port - e.g. **TELEM2**, but you will need to [start the driver](#start_driver) on this port (as above).
