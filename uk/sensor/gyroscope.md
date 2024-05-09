# Апаратне забезпечення та налаштування гіроскопа

PX4 uses a gyroscope for estimating the vehicle attitude (orientation).

You should not need to attach a gyroscope as a stand-alone external device:

- Більшість польотних контролерів, таких, як в [Pixhawk Series](../flight_controller/pixhawk_series.md), включають гіроскоп як частину польот контролеру [Inertial Motion (IMU)](https://en.wikipedia.org/wiki/Inertial_measurement_unit).
- Gyroscopes are present as part of an [external INS, ARHS or INS-enhanced GNSS system](../sensor/inertial_navigation_systems.md).

Потрібно відкалібрувати гіроскоп перед першим використанням безпілотника:

- [Калібрування гіроскопа](../config/gyroscope.md)
