---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/geofence_result
---

# geofence_result (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/geofence_result.msg)

```c
uint64 timestamp                # time since system start (microseconds)
uint8 GF_ACTION_NONE = 0        # no action on geofence violation
uint8 GF_ACTION_WARN = 1        # critical mavlink message
uint8 GF_ACTION_LOITER = 2      # switch to AUTO|LOITER
uint8 GF_ACTION_RTL = 3         # switch to AUTO|RTL
uint8 GF_ACTION_TERMINATE = 4   # flight termination
uint8 GF_ACTION_LAND = 5        # switch to AUTO|LAND

bool geofence_violated          # true if the geofence is violated
uint8 geofence_action           # action to take when geofence is violated

bool home_required              # true if the geofence requires a valid home position

```
