# Апаратне забезпечення та налаштування акселерометра

PX4 uses accelerometer data for velocity estimation.

You should not need to attach an accelometer as a stand-alone external device:

- Більшість польотних контролерів, таких, як в [Pixhawk Series](/flight_controller/pixhawk_series.md), включають в себе акселерометр як частину польот контролеру [Inertial Motion (IMU)](https://en.wikipedia.org/wiki/Inertial_measurement_unit).
- Gyroscopes are present as part of an [external INS, ARHS or INS-enhanced GNSS system](../sensor/inertial_navigation_systems.md).

Потрібно відкалібрувати акселерометр перед першим використанням безпілотника:

- [Accelerometer Calibration](../config/accelerometer.md)
