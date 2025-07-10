---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/camera_capture
---

# camera_capture (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/camera_capture.msg)

```c
uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_utc        # Capture time in UTC / GPS time
uint32 seq                  # Image sequence number
float64 lat                 # Latitude in degrees (WGS84)
float64 lon                 # Longitude in degrees (WGS84)
float32 alt                 # Altitude (AMSL)
float32 ground_distance         # Altitude above ground (meters)
float32[4] q                    # Attitude of the camera, zero rotation is facing towards front of vehicle
int8 result                 # 1 for success, 0 for failure, -1 if camera does not provide feedback

```
