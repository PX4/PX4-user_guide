# Gyroscope Hardware & Setup

PX4 uses a gyroscope for estimating the vehicle attitude (orientation).
Most flight controllers, such as those in the [Pixhawk Series](../flight_controller/pixhawk_series.md), include a gyroscope as part of the flight controller's [Inertial Motion Unit (IMU)](https://en.wikipedia.org/wiki/Inertial_measurement_unit).
You should not need to attach one as an external device.

The gyroscope must be calibrated before first use of the vehicle:

- [Gyroscope Calibration](../config/gyroscope.md)
