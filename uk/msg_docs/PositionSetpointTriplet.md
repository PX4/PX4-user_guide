# PositionSetpointTriplet (Повідомлення UORB)

Глобальний набір точки встановлення у форматі координат WGS84. Ось наступні три способи вказівань (або просто наступні два або один).

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/PositionSetpointTriplet.msg)

```c
# Глобальний набір точки встановлення у форматі координат WGS84.
# Ось наступні три способи вказівань (або просто наступні два або один).

uint64 timestamp        # time since system start (microseconds)

PositionSetpoint previous
PositionSetpoint current
PositionSetpoint next

```
