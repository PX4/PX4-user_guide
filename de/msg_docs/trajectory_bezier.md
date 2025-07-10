---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/trajectory_bezier
---

# trajectory_bezier (UORB message)

Bezier Trajectory description. See also Mavlink TRAJECTORY msg The topic trajectory_bezier describe each waypoint defined in vehicle_trajectory_bezier

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/trajectory_bezier.msg)

```c
# Bezier Trajectory description. See also Mavlink TRAJECTORY msg
# The topic trajectory_bezier describe each waypoint defined in vehicle_trajectory_bezier

uint64 timestamp        # time since system start (microseconds)

float32[3] position     # local position x,y,z (metres)
float32 yaw             # yaw angle (rad)
float32 delta           # time it should take to get to this waypoint, if this is the final waypoint (seconds)

```
