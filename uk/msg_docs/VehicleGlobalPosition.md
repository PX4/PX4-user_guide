# VehicleGlobalPosition (повідомлення UORB)

Об'єднана глобальна позиція в WGS84. Ця структура містить глобальну оцінку позиції. Це не сирі GPS вимірювання (@see vehicle_gps_position). Ця тема зазвичай публікується позиціонером, який враховує більше джерел інформації, ніж просто GPS, наприклад, керування введеннями транспортного засобу в реалізації фільтра Калмана.

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/msg/VehicleGlobalPosition.msg)

```c
# Об'єднана глобальна позиція в WGS84.
# Ця структура містить глобальну оцінку позиції. Це не сирі GPS
# вимірювання (@see vehicle_gps_position). Ця тема зазвичай публікується позиціонером,
# який враховує більше джерел інформації, ніж просто GPS,
# наприклад, керування введеннями транспортного засобу в реалізації фільтра Калмана.
#

uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_sample         # the timestamp of the raw data (microseconds)

float64 lat         # Latitude, (degrees)
float64 lon         # Longitude, (degrees)
float32 alt         # Altitude AMSL, (meters)
float32 alt_ellipsoid       # Altitude above ellipsoid, (meters)

float32 delta_alt   # Reset delta for altitude
uint8 lat_lon_reset_counter # Counter for reset events on horizontal position coordinates
uint8 alt_reset_counter     # Counter for reset events on altitude

float32 eph         # Standard deviation of horizontal position error, (metres)
float32 epv         # Standard deviation of vertical position error, (metres)

float32 terrain_alt     # Terrain altitude WGS84, (metres)
bool terrain_alt_valid      # Terrain altitude estimate is valid

bool dead_reckoning     # True if this position is estimated through dead-reckoning

# TOPICS vehicle_global_position vehicle_global_position_groundtruth external_ins_global_position
# TOPICS estimator_global_position
# TOPICS aux_global_position

```
