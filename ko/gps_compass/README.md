# GPS & Compass

PX4 supports global navigation satellite systems (GNSS) (including GPS, GLONASS, Galileo, BeiDou, QZSS and SBAS) using receivers that communicate via the UBlox, MTK or Ashtech protocols, or via UAVCAN. It also supports [Real Time Kinematic (RTK) GPS Receivers](../gps_compass/rtk_gps.md), which extends GPS systems to centimetre-level precision.

PX4 can be used with the following compass parts (magnetometers): Bosch BMM 150 MEMS (via I2C bus), HMC5883 / HMC5983 (I2C or SPI), IST8310 (I2C) and LIS3MDL (I2C or SPI).

> **Tip** When using Pixhawk-series flight controllers we recommend using a *combined GPS + Compass* (the Pixhawk internal compass is close to other electronics, and may be susceptible to electromagnetic noise).

![GPS + Compass](../../images/gps_compass.jpg)

## Combined GPS/Compass Options

Some popular GPS/compass options include:

- [Ublox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) (Hobbyking)
- [mRo GPS u-Blox Neo-M8N Dual Compass LIS3MDL+ IST8310](https://store.mrobotics.io/ProductDetails.asp?ProductCode=mro-gps003-mr) (mRo store)
- [Drotek uBlox GPS/Compasses](https://drotek.com/shop/en/184-u-blox) (drotek)
- [Holybro Micro M8N GPS Module](https://www.getfpv.com/holybro-micro-m8n-gps-module.html) (getfpv)
- [Holybro Ublox NEO-M8N GPS Module](https://www.getfpv.com/holybro-ublox-neo-m8n-gps-module.html) (getfpv)
- [Holybro Pixhawk 4 GPS Module](https://shop.holybro.com/pixhawk-4-gps-module_p1094.html) (UBLOX 8MN GPS + IST8310 compass + LED + Safety switch).
- [Here GNSS GPS (M8N)](https://www.getfpv.com/here-gnss-gps-m8n.html) (getfpv) 
- [Zubax GNSS 2](https://zubax.com/products/gnss_2) (zubax.com)
- [3DR uBlox GPS with Compass kit](https://www.getfpv.com/3dr-ublox-gps-with-compass-kit.html) (getfpv) - *Discontinued*

Instructions for connecting the GPS and compass are usually provided by the manufacturer (at least for more common [Autopilot Hardware](../flight_controller/README.md)).

> **Note** [Pixhawk Series](../flight_controller/pixhawk_series.md) controllers usually have a clearly labeled port for connecting the GPS, and the compass is connected to either the I2C or SPI port/bus (depending on the device). The [Zubax GNSS 2](https://zubax.com/products/gnss_2) can also be connected via [UAVCAN](https://dev.px4.io/en/uavcan/).

<span></span>

> **Tip** Pay attention to pinout when connecting the GPS module. While these are all software-compatible, there are several different pin orderings.

GPS configuration is handled transparently for the user (provided the module GPS connector is connected correctly). Compass setup is covered in: [Compass Configuration](../config/compass.md).

## RTK-GPS Devices

Information about supported devices and setup/configuration can be found in the sidebar under: [RTK GPS](../gps_compass/rtk_gps.md).

## Developer Information

- GPS/RTK-GPS 
  - [RTK-GPS](https://dev.px4.io/en/advanced/rtk_gps.html) 
  - [GPS driver](https://dev.px4.io/en/middleware/modules_driver.html#gps)
  - [UAVCAN Example](https://dev.px4.io/en/uavcan/)
- [Magnetometer drivers](https://github.com/PX4/Firmware/tree/master/src/drivers/magnetometer) (source code)