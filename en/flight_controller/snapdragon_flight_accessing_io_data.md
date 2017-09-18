# Accessing I/O Data
Low level bus data can be accessed from code running on the aDSP, using a POSIX-like API called DSPAL.  The header files for this API are maintained
on [github](https://github.com/ATLFlight/dspal) and are commented with Doxygen formatted documentation in each header file.  A description of the API's supported
and links to the applicable header files is provided below. 

## API Overview
* [Serial:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_serial.h)
* [I2C:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_i2c.h)
* [SPI:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_spi.h) 
* [GPIO:](https://github.com/ATLFlight/dspal/blob/master/include/dev_fs_lib_gpio.h)
* Timers: [qurt_timer.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)
* Power Control: [HAP_power.h](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools)

## Sample Source Code
The unit test code to verify each DSPAL function also represent good examples for how to call the functions.  
This code is also on [github](https://github.com/ATLFlight/dspal/tree/master/test/dspal_tester)

### Setting the Serial Data Rate
The serial API does not conform to the termios convention for setting data rate through the tcsetattr() function.  IOCTL codes are used instead and are
described in the header file linked above.

### Timers
Additional functions for more advanced aDSP operations are available with the prefix qurt_.  Timer functions, for example, are available with the qurt_timer prefix
and are documented in the qurt_timer.h header file included with the [Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools).

### Setting the Power Level
Using the HAP functions provided by the Hexagon SDK, it is possible to set the power level of the aDSP.  This will often lead to reduced I/O latencies.
More information on these API's is available in the HAP_power.h header file available in the [Hexagon SDK](https://developer.qualcomm.com/software/hexagon-dsp-sdk/tools).

