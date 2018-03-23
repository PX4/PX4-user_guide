# Sensor Selection

PX4-based systems use sensors to determine vehicle state (state is required for stabilization and to enable autonomous control). The sensors provide information including: position/altitude, heading, speed, airspeed, orientation (attitude) and rates of rotation in different directions.

The system *minimally requires* a gyroscope, accelerometer, magnetometer (compass) and barometer. A GPS or other positioning system is needed to enable all automatic [modes](../getting_started/flight_modes.md#categories), and some assisted modes. Fixed wing and VTOL-vehicles should additionally include an airspeed sensor (very highly recommended).

The minimal set of sensors is incorporated into [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers (and may also be in other controller platforms). Additional/external sensors can be attached to the controller.

Below we describe some of the sensors. At the end there are links to information about [sensor wiring](#wiring).


## GPS

Many types of GPS can be used with PX4. When using Pixhawk-series flight controllers we recommend using a *combined GPS + Compass*.

> **Tip** The Pixhawk internal compass is close to other electronics, and may be susceptible to electromagnetic noise. An external compass/GPS mounted on a pedestal or wing (for fixed-wing) away from the rest of the system is recommended.

Options include the original 3DR GPS, LEA 6H, NEO 7M, NEO 8 GPS+Compass solutions.

![3DR GPS_Top](../../images/gps_3dr_top_1.jpg) 
![GPS + Compass](../../images/gps_compass.jpg)


## Airspeed

The Airspeed sensor is required for most of fixed-wing frames and for all VTOL frames.

This sensor is so important because the autopilot does not have other means to detect stall. 
For fixed-wing vehicles it is the airspeed that guarantees lift not ground speed!

We recommend using a digital airspeed sensor.

![Digital airspeed sensor](../../images/digital_airspeed_sensor.jpg)

## Distance

Distance sensors are used for precision landing, object avoidance and terrain following.

PX4 supports many affordable distance sensors, using different technologies, and supporting different ranges and features. For more information see: [Rangerfinders](../sensor/rangefinders.md).

<img src="../../images/lidar_lite_1.png" title="lidar_lite_1" width="500px" />

## Optical Flow

Flow is an optical flow smart camera that can track motion, and has as integrated sonar sensor.
PX4 blends the sensor output with information from other position sources (e.g. GPS) to provide a more accurate position lock. 
This sensor can be used indoors, when no GPS signal is available.

![px4flow-bottom](../../images/px4flow_bottom.jpg)


## Sensor Wiring {#wiring}

Sensor wiring information is usually provided in manufacturer documentation for flight controllers and the sensors themselves.

In addition, see:
* [Basic Assembly](../assembly/README.md) contains flight controller quick start guides. These cover wiring of the core sensors to specific flight controller hardware.
* [Flight Controller](../flight_controller/README.md) topics often contain wiring information.
* [Peripheral Hardware](../peripherals/README.md) contains documentation for other sensors.
* [Peripherals](https://pixhawk.org/peripherals/start) (Pixhawk.org)
