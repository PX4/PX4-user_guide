# OrbitStatus (UORB повідомлення)

ORBIT_YAW_BEHAVIOUR

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/OrbitStatus.msg)

```c
# ORBIT_YAW_BEHAVIOUR
uint8 ORBIT_YAW_BEHAVIOUR_HOLD_FRONT_TO_CIRCLE_CENTER = 0
uint8 ORBIT_YAW_BEHAVIOUR_HOLD_INITIAL_HEADING = 1
uint8 ORBIT_YAW_BEHAVIOUR_UNCONTROLLED = 2
uint8 ORBIT_YAW_BEHAVIOUR_HOLD_FRONT_TANGENT_TO_CIRCLE = 3
uint8 ORBIT_YAW_BEHAVIOUR_RC_CONTROLLED = 4

uint64 timestamp # time since system start (microseconds)
float32 radius   # Radius of the orbit circle. Позитивні значення обертаються за годинниковою стрілкою, від'ємні значення обертаються проти годинникової стрілки. [m]
uint8 frame      # The coordinate system of the fields: x, y, z.
float64 x        # X coordinate of center point. Coordinate system depends on frame field: local = x position in meters * 1e4, global = latitude in degrees * 1e7.
float64 y        # Y coordinate of center point. Coordinate system depends on frame field: local = y position in meters * 1e4, global = latitude in degrees * 1e7.
float32 z        # Altitude of center point. Coordinate system depends on frame field.
uint8 yaw_behaviour

```
