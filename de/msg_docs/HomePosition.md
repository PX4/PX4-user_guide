---
canonicalUrl: https://docs.px4.io/main/de/msg_docs/HomePosition
---

# HomePosition (UORB message)

GPS home position in WGS84 coordinates.

[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/msg/HomePosition.msg)

```c
# GPS home position in WGS84 coordinates.

uint64 timestamp            # time since system start (microseconds)

float64 lat             # Latitude in degrees
float64 lon             # Longitude in degrees
float32 alt             # Altitude in meters (AMSL)

float32 x               # X coordinate in meters
float32 y               # Y coordinate in meters
float32 z               # Z coordinate in meters

float32 yaw             # Yaw angle in radians

bool valid_alt      # true when the altitude has been set
bool valid_hpos     # true when the latitude and longitude have been set
bool valid_lpos     # true when the local position (xyz) has been set

bool manual_home    # true when home position was set manually

```
