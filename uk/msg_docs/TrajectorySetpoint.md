# TrajectorySetpoint (повідомлення UORB)

Traекторія вказівки в рамці NED Вхід до контролера позиції PID. Потрібно мати кінематичну консистентність і бути можливим для плавного польоту. встановлення значення NaN означає, що стан не повинен контролюватися

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/msg/TrajectorySetpoint.msg)

```c
# Trajectory setpoint in NED frame
# Input to PID position controller.
# Needs to be kinematically consistent and feasible for smooth flight.
# setting a value to NaN means the state should not be controlled

uint64 timestamp # time since system start (microseconds)

# NED local world frame
float32[3] position # in meters
float32[3] velocity # in meters/second
float32[3] acceleration # in meters/second^2
float32[3] jerk # in meters/second^3 (for logging only)

float32 yaw # euler angle of desired attitude in radians -PI..+PI
float32 yawspeed # angular velocity around NED frame z-axis in radians/second

```
