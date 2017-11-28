# Rangefinders/Distance Sensors

Rangefinders provide distance measurement that can be used for terrain following, precision hovering (e.g. for photography), warning of regulatory height limits, collision avoidance etc.

The sensors can usually be connected to either a serial (PWM) or I2C port (depending on driver support for the particular rangefinder), and the rangefinder is enabled on a port by setting a particular parameter. 

This section lists the rangefinders supported by PX4 and the generic configuration information. More detailed documentation is linked for some rangefinders.

> **Tip** The drivers for less common rangefinders may not be present by default in all firmware. In this case you may need to add the driver into your *cmake* configuration file and build the firmware yourself. For more information see the [PX4 Development Guide](https://dev.px4.io/en/setup/building_px4.html).


## Supported Rangefinders

### Lidar-Lite

The [Lidar Lite](https://buy.garmin.com/en-AU/AU/p/557294) can be used with either PWM (serial) or I2C (PWM is recommended as some older models do not behave reliably on I2C). The rangefinder/port is enabled using [SENS_EN_LL40LS](../advanced_config/parameter_reference.md#SENS_EN_LL40LS).

Wiring information with Pixhawk can be found here: [Lidar lite](https://pixhawk.org/peripherals/rangefinder#lidar-lite) (pixhawk.org).

The driver for this rangefinder is typically available in firmware (driver added as: `drivers/ll40ls`).


### MaxBotix I2CXL-MaxSonar-EZ

The MaxBotix [I2CXL-MaxSonar-EZ](https://www.maxbotix.com/product-category/i2cxl-maxsonar-ez-products) range has a number of relatively short-ranged sonar based rangefinders that are suitable for assisted takeoff/landing and collision avoidance. These can be connected using an I2C port.

The rangefinders are enabled using the parameter [SENS_EN_MB12XX](../advanced_config/parameter_reference.md#SENS_EN_MB12XX).

### Lightware LIDARs

[Lightware](http://lightware.co.za/shop2017/) provide a range of lightweight "laser altimeters" that are suitable for many drone applications:
* [SF02](http://lightware.co.za/shop2017/proximity-sensors/1-sf02f.html)
* [SF10/A](http://lightware.co.za/shop2017/drone-altimeters/26-sf10a-25-m.html) (25 m)
* [SF10/B](http://lightware.co.za/shop2017/drone-altimeters/25-sf10b-50-m.html) (50 m)
* SF10/C (100m) (Discontinued)
* [SF11/C](http://lightware.co.za/shop2017/drone-altimeters/44-sf11c-120-m.html) (120 m)
* [SF/LW20](http://lightware.co.za/shop2017/drone-altimeters/51-lw20-100-m.html) (100 m) - Waterproofed (IP67) with servo for sense-and-avoid applications

Drivers exist for both I2C and serial ports, which can be configured using the parameters [SENS_EN_SF0X](../advanced_config/parameter_reference.md#SENS_EN_SF0X) and [SENS_EN_SF1XX](../advanced_config/parameter_reference.md#SENS_EN_SF1XX) (respectively).

Wiring and other information for the I2C variants can be found in the topic [Lightware SFxx Lidar](../sensor/sfxx_lidar.md).

> **Tip** Not all devices are supported for both serial and I2C; check the parameters for more information and supported models.


### TeraRanger One

TeraRanger provide a number of lightweight distance measurement sensor based on infrared Time-of-Flight (ToF) technology. They are typically faster and have greater range than sonar, and smaller and lighter than laser-based systems. PX4 supports:
* [TeraRanger One](http://www.teraranger.com/products/teraranger-one/) (0.2 - 14 m)
* [TeraRanger Evo](https://www.terabee.com/portfolio-item/teraranger-evo-infrared-distance-sensor/) (0.5 – 60 m)

These rangefinders must be connected via the I2C bus (using an [I2C adapter](http://www.teraranger.com/product/teraranger-i2c-adapter/)).

The sensors are enabled using the parameter [SENS_EN_TRANGER](../advanced_config/parameter_reference.md#SENS_EN_TRANGER) (you can set the type of sensor or that PX4 should auto-detect the type).


### uLanding Radar

The *Aerotenna* [uLanding](https://aerotenna.com/sensors/#ulanding) altimeter is compact microwave rangefinder that has been optimised for use on UAVs. It has a sensing range of 45m. A particular advantages of this product are that it can operate effectively in all weather conditions and over all terrain types (including water).

The uLanding Radar is not present in "most" firmware by default and must be started by updating a configuration file (rather than by a parameter). More information can be found here: [uLanding Radar](../sensor/ulanding_radar.md).


### Other

PX4 also supports the Bebop rangefinder.


## Rangefinder Configuration

The rangefinder is configured using [EKF2\_RNG\_*](../advanced_config/parameter_reference.md#EKF2_RNG_AID) parameters, e.g. delay, offset of rangefinder from vehicle body, etc.


## Testing

Rangefinder values/performance can be tested using the *QGroundControl Analyse tool*, or in the *QGroundControl MAVLink Console* by observing the `distance_sensor` uORB topic:
```sh
listener distance_sensor 5
```

For more information see: [Sensor/Topic Debugging using the Listener Command](https://dev.px4.io/en/debug/sensor_uorb_topic_debugging.html) (PX4 Development Guide).


## Simulation

Lidar and sonar rangefinders can be used in the [Gazebo Simulator](https://dev.px4.io/en/simulation/gazebo.html) (PX4 Development Guide).

<!-- 
gazebo lidar
gazebo sonar
--> 


## Further Information

* [Rangefinder](https://pixhawk.org/peripherals/rangefinder) (Pixhawk.org) - Rangefinders supported by Pixhawk
