---
canonicalUrl: https://docs.px4.io/main/tr/msg_docs/ekf_gps_drift
---

# ekf_gps_drift (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/ekf_gps_drift.msg)

```c
uint64 timestamp        # time since system start (microseconds)
float32 hpos_drift_rate     # Horizontal position rate magnitude checked using EKF2_REQ_HDRIFT (m/s)
float32 vpos_drift_rate     # Vertical position rate magnitude checked using EKF2_REQ_VDRIFT (m/s)
float32 hspd            # Filtered horizontal velocity magnitude checked using EKF2_REQ_HDRIFT (m/s)

bool blocked            # true when drift calculation is blocked due to IMU movement check

```
