---
canonicalUrl: https://docs.px4.io/main/ru/msg_docs/failure_detector_status
---

# failure_detector_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/failure_detector_status.msg)

```c
uint64 timestamp                    # time since system start (microseconds)

# FailureDetector status
bool fd_roll
bool fd_pitch
bool fd_alt
bool fd_ext
bool fd_arm_escs
bool fd_battery
bool fd_imbalanced_prop
bool fd_motor

float32 imbalanced_prop_metric      # Metric of the imbalanced propeller check (low-passed)
uint16 motor_failure_mask           # Bit-mask with motor indices, indicating critical motor failures

```
