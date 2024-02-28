# Sensors

This section describes the optional and required sensors and their setup/configuration.

## Overview

PX4-based systems use sensors to determine vehicle state (needed for stabilization and to enable autonomous control).
The vehicle states include: position/altitude, heading, speed, airspeed, orientation (attitude), rates of rotation in different directions, battery level, and so on.

PX4 _minimally requires_ a gyroscope, accelerometer, magnetometer (compass) and barometer.
This minimal set of sensors is incorporated into [Pixhawk Series](../flight_controller/pixhawk_series.md) flight controllers (and may also be in other controller platforms).
Additional/external sensors can be attached to the controller (and is recommended for the compass).

A GPS or other positioning system is needed to enable all automatic modes, and some manual/assisted modes.
Fixed-wing and VTOL-vehicles should additionally include an airspeed sensor (highly recommended).

## Sensor Topics

- Gyroscope
- Accelerometer
- GPS
- [GPS/Compass](../gps_compass/README.md)
- [RTK GPS](../gps_compass/rtk_gps.md)
- [Magnetometer (Compass)](../magnetometer/README.md)
- [Distance Sensors (Rangefinders)](../sensor/rangefinders.md)
- [Airspeed Sensors](../sensor/airspeed.md)
- [Barometers](../sensor/barometers.md)
- [Optical Flow](../sensor/optical_flow.md)
- [Tachometers (Revolution Counters)](../sensor/tachometers.md)
- [IMU Factory Calibration](../advanced_config/imu_factory_calibration.md)
- Sensor Thermal Calibration
