# Ekf2Timestamps (повідомлення UORB)

це повідомлення містить (відносні) відмітки часу введення датчиків, які використовує EKF2. Це може бути використано для відтворення.

поле мітки часу - це посилання на час ekf2 і відповідає мітці часу теми sensor_combined.

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/Ekf2Timestamps.msg)

```c
# це повідомлення містить (відносні) відмітки часу введення датчиків, які використовує EKF2.
# Це може бути використано для відтворення.

# поле мітки часу - це посилання на час ekf2 і відповідає мітці часу теми sensor_combined.

uint64 timestamp             # time since system start (microseconds)

int16 RELATIVE_TIMESTAMP_INVALID = 32767 # (0x7fff) If one of the relative timestamps
                                         # is set to this value, it means the associated sensor values did not update

# timestamps are relative to the main timestamp and are in 0.1 ms (timestamp +
# *_timestamp_rel = absolute timestamp). Для int16 це дозволяє максимальну різницю +-3.2s для теми sensor_combined.

int16 airspeed_timestamp_rel
int16 distance_sensor_timestamp_rel
int16 optical_flow_timestamp_rel
int16 vehicle_air_data_timestamp_rel
int16 vehicle_magnetometer_timestamp_rel
int16 visual_odometry_timestamp_rel

# Note: this is a high-rate logged topic, so it needs to be as small as possible

```
