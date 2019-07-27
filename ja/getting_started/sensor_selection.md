# Sensors

PX4-based systems use sensors to determine vehicle state (needed for stabilization and to enable autonomous control). The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different directions, battery level, etc.

The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. A GPS or other positioning system is needed to enable all automatic [modes](../getting_started/flight_modes.md#categories), and some assisted modes. Fixed wing and VTOL-vehicles should additionally include an airspeed sensor (very highly recommended).

The minimal set of sensors is incorporated into [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers (and may also be in other controller platforms). Additional/external sensors can be attached to the controller.

Below we describe some of the sensors. At the end there are links to information about [sensor wiring](#wiring).

## GPS & Compass {#gps_compass}

PX4 supports a number of global navigation satellite system (GNSS) receivers and compasses (magnetometers). It also supports [Real Time Kinematic (RTK) GPS Receivers](../gps_compass/rtk_gps.md), which extend GPS systems to centimetre-level precision.

> **Tip** [Pixhawk-series](../flight_controller/pixhawk_series.md) controllers include an *internal* compass. This *may* be useful on larger vehicles (e.g. VTOL) where it is possible to reduce electromagnetic interference by mounting the Pixhawk a long way from power supply lines. On small vehicles an external compass is almost always required.

We recommend the use of an external "combined" compass/GPS module mounted as far away from the motor/ESC power supply lines as possible - typically on a pedestal or wing (for fixed-wing).

Common GPS/compass hardware options are listed in: [GPS/Compass](../gps_compass/README.md).

![GPS + Compass](../../images/gps_compass.jpg)

## Airspeed

Airspeed sensors are *highly recommended* for fixed-wing and VTOL frames.

They are so important because the autopilot does not have other means to detect stall. For fixed-wing flight it is the airspeed that guarantees lift not ground speed!

![Digital airspeed sensor](../../images/digital_airspeed_sensor.jpg)

For more information and recommended hardware see: [Airspeed Sensors](../sensor/airspeed.md).

## Distance

Distance sensors are used for precision landing, object avoidance and terrain following.

PX4 supports many affordable distance sensors, using different technologies, and supporting different ranges and features. For more information see: [Distance Sensors](../sensor/rangefinders.md).

<img src="../../images/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## Optical Flow

[PX4Flow](../sensor/px4flow.md) is an optical flow smart camera that can track motion, and has as integrated sonar sensor. PX4 blends the sensor output with information from other position sources (e.g. GPS) to provide a more accurate position lock. This sensor can be used indoors, when no GPS signal is available.

![px4flow-bottom](../../assets/hardware/sensors/px4flow/px4flow_bottom.jpg)

Some options include:

* [3DR PX4Flow Smart Camera (Optical Flow Sensor)](https://www.unmannedtechshop.co.uk/px4flow-smart-camera-optical-flow-sensor/) (unmannedtechshop)
* [HK Pilot32 Optical Flow Kit With Sonar](https://hobbyking.com/en_us/hk-pilot32-optical-flow-kit-with-sonar.html) (Hobbyking) - Software-compatible, but not connector-compatible.

## Sensor Wiring {#wiring}

Sensor wiring information is usually provided in manufacturer documentation for flight controllers and the sensors themselves.

In addition, see:

* [Basic Assembly](../assembly/README.md) contains flight controller quick start guides. These cover wiring of the core sensors to specific flight controller hardware.
* [Flight Controller](../flight_controller/README.md) topics often contain wiring information.
* [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors.