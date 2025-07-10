---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/trajectory_waypoint
---

# trajectory_waypoint (UORB message)

Waypoint Trajectory description. See also Mavlink TRAJECTORY msg The topic trajectory_waypoint describe each waypoint defined in vehicle_trajectory_waypoint

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/trajectory_waypoint.msg)

```c
# Waypoint Trajectory description. See also Mavlink TRAJECTORY msg
# The topic trajectory_waypoint describe each waypoint defined in vehicle_trajectory_waypoint

uint64 timestamp        # time since system start (microseconds)

float32[3] position
float32[3] velocity
float32[3] acceleration
float32 yaw
float32 yaw_speed

bool point_valid
uint8 type

```
