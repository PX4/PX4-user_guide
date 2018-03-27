# Sensor Selection

PX4-based systems use sensors to determine vehicle state (needed for stabilization and to enable autonomous control). The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different directions, battery level, etc.

The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. A GPS or other positioning system is needed to enable all automatic [modes](../getting_started/flight_modes.md#categories), and some assisted modes. Fixed wing and VTOL-vehicles should additionally include an airspeed sensor (very highly recommended).

The minimal set of sensors is incorporated into [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers (and may also be in other controller platforms). Additional/external sensors can be attached to the controller.

Below we describe some of the sensors. At the end there are links to information about [sensor wiring](#wiring).


## GPS

Many types of GPS can be used with PX4. When using Pixhawk-series flight controllers we recommend using a *combined GPS + Compass*.

> **Tip** The Pixhawk internal compass is close to other electronics, and may be susceptible to electromagnetic noise. An external compass/GPS mounted on a pedestal or wing (for fixed-wing) away from the rest of the system is recommended.

![3DR GPS_Top](../../images/gps_3dr_top_1.jpg) 
![GPS + Compass](../../images/gps_compass.jpg)

Some options include:
* [Ublox Neo-M8N GPS with Compass](https://hobbyking.com/en_us/ublox-neo-m8n-gps-with-compass.html?gclid=Cj0KCQjwqM3VBRCwARIsAKcekb3ojv1ZhLz1-GuvCsUuGT8ZZuw8meMIV_I6pgUCj6DJRzHBY9OApekaAgI5EALw_wcB&gclsrc=aw.ds&___store=en_us) (Hobbyking)
* [mRo GPS u-Blox Neo-M8N Dual Compass LIS3MDL+ IST8310](https://store.mrobotics.io/ProductDetails.asp?ProductCode=mro-gps003-mr) (mRo store)
* [Drotek uBlox GPS/Compasses](https://drotek.com/shop/en/184-u-blox) (drotek)
* [Holybro Micro M8N GPS Module](https://www.getfpv.com/holybro-micro-m8n-gps-module.html) (getfpv)
* [Holybro Ublox NEO-M8N GPS Module](https://www.getfpv.com/holybro-ublox-neo-m8n-gps-module.html) (getfpv)
* [Here GNSS GPS (M8N)](https://www.getfpv.com/here-gnss-gps-m8n.html) (getfpv) 
* [3DR uBlox GPS with Compass kit](https://www.getfpv.com/3dr-ublox-gps-with-compass-kit.html) (www.getfpv.com) - Discontinued

> **Tip** Pay attention to pinout when connecting the GPS module. While these are all compatible, there are several different pin orderings.


## Airspeed

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../images/digital_airspeed_sensor.jpg)

Recommended digital airspeed sensors include:
* [mRo I2C Airspeed Sensor JST-GH MS4525DO](https://store.mrobotics.io/mRo-I2C-Airspeed-Sensor-JST-GH-p/mro-classy-arspd-mr.htm) (mRo store)


## Distance

Distance sensors are used for precision landing, object avoidance and terrain following.

PX4 supports many affordable distance sensors, using different technologies, and supporting different ranges and features. For more information see: [Rangerfinders](../sensor/rangefinders.md).

<img src="../../images/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## Optical Flow

[PX4Flow](https://pixhawk.org/modules/px4flow) (pixhawk.org) is an optical flow smart camera that can track motion, and has as integrated sonar sensor.
PX4 blends the sensor output with information from other position sources (e.g. GPS) to provide a more accurate position lock. 
This sensor can be used indoors, when no GPS signal is available.

![px4flow-bottom](../../images/px4flow_bottom.jpg)

Some options include:
* [3DR PX4Flow Smart Camera (Optical Flow Sensor)](https://www.unmannedtechshop.co.uk/px4flow-smart-camera-optical-flow-sensor/) (unmannedtechshop)
* [HK Pilot32 Optical Flow Kit With Sonar](https://hobbyking.com/en_us/hk-pilot32-optical-flow-kit-with-sonar.html) (Hobbyking) - Software-compatible, but not connector-compatible.


## Sensor Wiring {#wiring}

Sensor wiring information is usually provided in manufacturer documentation for flight controllers and the sensors themselves.

In addition, see:
* [Basic Assembly](../assembly/README.md) contains flight controller quick start guides. These cover wiring of the core sensors to specific flight controller hardware.
* [Flight Controller](../flight_controller/README.md) topics often contain wiring information.
* [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors.
* [Peripherals](https://pixhawk.org/peripherals/start) (Pixhawk.org)
