# GPS & Compass

PX4 supports global navigation satellite systems (GNSS) (including GPS, GLONASS, Galileo, BeiDou, QZSS and SBAS) using receivers that communicate via the UBlox, MTK Ashtech or Emlid protocols, or via UAVCAN.
It also supports [Real Time Kinematic (RTK) GPS Receivers](../gps_compass/rtk_gps.md), which extend GPS systems to centimetre-level precision.

PX4 can be used with the following compass parts (magnetometers): Bosch BMM 150 MEMS (via I2C bus), HMC5883 / HMC5983 (I2C or SPI), IST8310 (I2C) and LIS3MDL (I2C or SPI).

> **Note** The set of supported compasses can be inferred from the [magnetometer drivers](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer) in the source code.

Up to 4 internal or external magnetometers can be connected, though only one will actually be used as a heading source.
The system automatically chooses the best available compass based on their internal priority (external magnetometers have a higher priority).
If the primary compass fails in-flight, it will failover to the next one.
If it fails before flight, arming will be denied.

![GPS + Compass](../../assets/hardware/gps/gps_compass.jpg)

> **Tip** When using [Pixhawk-series](../flight_controller/pixhawk_series.md) flight controllers, we recommend using a *combined GPS + Compass* mounted as far away from the motor/ESC power supply lines as possible - typically on a pedestal or wing (for fixed-wing).
  The internal compass *may* be useful on larger vehicles (e.g. VTOL) where it is possible to reduce electromagnetic interference by mounting the Pixhawk a long way from power supply lines.
  On small vehicles an external compass is almost always required.


## Combined GPS/Compass Options

Some popular GPS/compass options include:
* [Ublox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) (Hobbyking)
* [mRo GPS u-Blox Neo-M8N Dual Compass LIS3MDL+ IST8310](https://store.mrobotics.io/ProductDetails.asp?ProductCode=mro-gps003-mr) (mRo store)
* [Drotek uBlox GPS/Compasses](https://drotek.com/shop/en/184-u-blox) (drotek)
* [Holybro Pix32 M8N GPS Module](https://shop.holybro.com/pix32-gps-module_p1099.html) ([Holybro Shop](https://shop.holybro.com/pix32-gps-module_p1099.html))) ([getfpv](https://www.getfpv.com/holybro-pix32-neo-m8n-gps.html))
* [Holybro Micro M8N GPS Module](https://shop.holybro.com/micro-m8n-gps_p1009.html) ([Holybro Shop](https://shop.holybro.com/micro-m8n-gps_p1009.html))) ([getfpv](https://www.getfpv.com/holybro-micro-m8n-gps-module.html))
* [Holybro Pixhawk 4 GPS Module (10 pin)](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html) ([Holybro Shop](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html))) ([getfpv](https://www.getfpv.com/holybro-pixhawk-4-neo-m8n-gps.html))
* [Holybro Pixhawk 4 2nd GPS Module (6 pin)](https://shop.holybro.com/pixhawk4-2nd-gps-module_p1145.html) (Holybro Shop)
* [Here GNSS GPS (M8N)](https://www.getfpv.com/here-gnss-gps-m8n.html) (getfpv)
* [Zubax GNSS 2](https://zubax.com/products/gnss_2) (zubax.com)
* [Avionics Anonymous UAVCAN GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) (Tindie)
* [3DR uBlox GPS with Compass kit](https://www.getfpv.com/3dr-ublox-gps-with-compass-kit.html) (getfpv) - *Discontinued*

Instructions for connecting the GPS and compass are usually provided by the manufacturer (at least for more common [Autopilot Hardware](../flight_controller/README.md)).

> **Note** [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers usually have a clearly labeled port for connecting the GPS, and the compass is connected to either the I2C or SPI port/bus (depending on the device). 
  The [Zubax GNSS 2](https://zubax.com/products/gnss_2) and [Avionics Anonymous GNSS/Mag](https://www.tindie.com/products/avionicsanonymous/uavcan-gps-magnetometer/) can also be connected via [UAVCAN](https://dev.px4.io/master/en/uavcan/).

<span></span>
> **Tip** Pay attention to pinout when connecting the GPS module.
  While these are all software-compatible, there are several different pin orderings.

## GPS (Only) Options

* [Emlid Reach M+](https://emlid.com/reach/) (emlid.com)
  > **Note** At time of writing PX4 does not support RTK GPS with this module (only "ordinary" GPS).
    Support is expected in the near future.

## Compass (Only) Options

* [Avionics Anonymous UAVCAN Magnetometer](https://www.tindie.com/products/avionicsanonymous/uavcan-magnetometer/) (Tindie)

## RTK-GPS Devices

Information about supported devices and setup/configuration can be found in the sidebar under: [RTK GPS](../gps_compass/rtk_gps.md).


## Configuration

### Primary GPS

GPS configuration on Pixhawk is handled transparently for the user - simply connect the GPS module to the port labeled **GPS** and everything should work.

> **Note** The default [Serial Port Configuration](../peripherals/serial_configuration.md#default_port_mapping) works for most devices.
  If you are using the *Trimble MB-Two* you will need to modify the configuration to explicitly set the rate to 115200 baud.


### Secondary GPS (Dual GPS System) {#dual_gps}

To use a secondary GPS, attach it to any free port, and then perform a [Serial Port Configuration](../peripherals/serial_configuration.md) to assign [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to the selected port.

The following steps show how to configure a secondary GPS on the `TELEM 2` port in *QGroundControl*:

1. [Find and set](../advanced_config/parameters.md) the parameter [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) to **TELEM 2**.
   - Open *QGroundControl* and navigate to the **Vehicle Setup > Parameters** section.
   - Select the **GPS** tab (1), then open the [GPS_2_CONFIG](../advanced_config/parameter_reference.md#GPS_2_CONFIG) parameter (2) and select *TELEM 2* from the dropdown list (3).
     ![QGC Serial Example](../../assets/peripherals/qgc_serial_config_example.png)
1. Reboot the vehicle in order to make the other parameters visible.
1. Select the **Serial** tab, and open the [SER_TEL2_BAUD](../advanced_config/parameter_reference.md#SER_TEL2_BAUD) parameter (`TELEM 2` port baud rate): set it to *Auto*.
  ![QGC Serial Baudrate Example](../../assets/peripherals/qgc_serial_baudrate_example.png)

After setting up the second GPS port:
1. Configure the ECL/EKF2 estimator to blend data from both GPS systems.
   For detailed instructions see: [Using the ECL EKF > Dual Receivers](../advanced_config/tuning_the_ecl_ekf.md#dual-receivers).

### Compass

Compass calibration is covered in: [Compass Configuration](../config/compass.md).
The process is straightforward and will calibrate all connected magnetometers.

Additional configuration can be [performed](../advanced_config/parameters.md) using the [CAL\_MAGx\_](../advanced_config/parameter_reference.md#CAL_MAG0_EN) parameters (where `x=0-3`).
Generally you will not need to *modify* these as compasses are autodetected, prioritised and are all calibrated at the same time
(a possible exception is [CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN) which might be used to disable an internal compass).
You may however wish to read them, as they will let you know which magnetometers are internal or external ([CAL\_MAGx\_EN](../advanced_config/parameter_reference.md#CAL_MAG0_EN)) and which is being uses as the main heading source ([CAL_MAG_PRIME](../advanced_config/parameter_reference.md#CAL_MAG_PRIME)).


## Developer Information

- GPS/RTK-GPS
  - [RTK-GPS](https://dev.px4.io/master/en/advanced/rtk_gps.html)
  - [GPS driver](https://dev.px4.io/master/en/middleware/modules_driver.html#gps)
  - [UAVCAN Example](https://dev.px4.io/master/en/uavcan/)
- [Driver source code](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer) (Compasses)
