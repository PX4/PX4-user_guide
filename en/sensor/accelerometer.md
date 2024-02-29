# Accelerometer Hardware & Setup

PX4 uses accelerometer data for velocity estimation.
Most flight controllers, such as those in the [Pixhawk Series](../flight_controller/pixhawk_series.md), include an accelerometer as part of the flight controller's [Inertial Motion Unit (IMU)](https://en.wikipedia.org/wiki/Inertial_measurement_unit).
You should not need to attach one as an external device.

The accelerometer must be calibrated before first use of the vehicle:

- [Accelerometer Calibration](../config/accelerometer.md)
