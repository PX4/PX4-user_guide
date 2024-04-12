# Апаратне забезпечення та налаштування датчика

Цей розділ описує обов'язкові та необов'язкові датчики та їх налаштування/конфігурацію.

## Загальний огляд

Системи на основі PX4 використовують датчики для оцінки стану транспортного засобу, що необхідно для стабілізації та увімкнення автономного керування.
Інформація про стан транспортного засобу включає: позицію/висоту, курс, швидкість, швидкість польоту, орієнтацію (відносно чогось), швидкість обертання в різних напрямках, рівень заряду батареї тощо.

PX4 _мінімально потребує_ гіроскоп, акселерометр, магнетометр (компас) та барометр для вимірювання вищевказаних станів.
Дрони літакового типу, а також апарати VTOL _повинні_ також включати датчик швидкості польоту.
Для увімкнення усіх автоматичних режимів, а також деяких ручних/допоміжних режимів, потрібна GPS або інша позиційна система.

[Серія Pixhawk](../flight_controller/pixhawk_series.md) контролерів польоту вже має мінімальний набір сенсорів (часто також це мають і інші платформи контролерів).
До контролера можна підключити додаткові/зовнішні датчики — рекомендовано зовнішній GPS та компас, а також датчик швидкості повітря для ВПП та літаків з фіксованим крилом.

## Теми датчиків

Mandatory (included in Pixhawk series FCs):

- [Accelerometer](../sensor/accelerometer.md) — Measures changing acceleration.
- [Gyroscope](../sensor/gyroscope.md) — Measures orientation.
- [Magnetometer (Compass)](../gps_compass/magnetometer.md) — Measures heading/direction.
  External compass recommended!
- [Barometers](../sensor/barometer.md) — Measures altitude (via air pressure).

Recommended:

- [Airspeed Sensors](../sensor/airspeed.md) — Measures airspeed.
  Highly recommended for VTOL and Fixed-wing as they are the only mechanism to detect stall.
- [GNSS (GPS)](../gps_compass/index.md) — Measures global position.
  Needed for missions, and some other automatic and manual/assisted modes.
- [RTK GNSS (GPS)](../gps_compass/rtk_gps.md) — GNSS with centimetre-level accuracy.
  Some setups also allow heading to be determine from GNSS rather than a magnetometer.

Optional:

- [Distance Sensors (Rangefinders)](../sensor/rangefinders.md) — Measures distance to target.
  Aids landing, object avoidance, and terrain following.
- [Optical Flow](../sensor/optical_flow.md) — Estimates velocity using a downward facing camera and a downward facing distance sensor.
  Enables a more accurate position lock than GPS alone, and can be used indoors when no GPS signal is available.
- [Tachometers (Revolution Counters)](../sensor/tachometers.md) — Only used for logging.

Other optional:

- [IMU/Compass Factory Calibration](../advanced_config/imu_factory_calibration.md) — Save calibration settings to persistent storage.
- [Sensor Thermal Compensation](../advanced_config/sensor_thermal_calibration.md) — Compensate sensors for temperature variations.
