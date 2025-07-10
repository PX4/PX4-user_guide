---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/follow_target_status
---

# follow_target_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/follow_target_status.msg)

```c
uint64 timestamp                  # [microseconds] time since system start

float32 tracked_target_course     # [rad] Tracked target course in NED local frame (North is course zero)
float32 follow_angle              # [rad] Current follow angle setting

float32 orbit_angle_setpoint      # [rad] Current orbit angle setpoint from the smooth trajectory generator
float32 angular_rate_setpoint     # [rad/s] Angular rate commanded from Jerk-limited Orbit Angle trajectory for Orbit Angle

float32[3] desired_position_raw   # [m] Raw 'idealistic' desired drone position if a drone could teleport from place to places

bool in_emergency_ascent          # [bool] True when doing emergency ascent (when distance to ground is below safety altitude)
float32 gimbal_pitch              # [rad] Gimbal pitch commanded to track target in the center of the frame

```
