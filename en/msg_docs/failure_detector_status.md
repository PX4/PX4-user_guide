# failure_detector_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/failure_detector_status.msg)

```c
uint64 timestamp                    # time since system start (microseconds)

# FailureDetector status
bool fd_roll
bool fd_pitch
bool fd_alt
bool fd_ext
bool fd_arm_escs
bool fd_high_wind
bool fd_battery
bool fd_imbalanced_prop

float32 imbalanced_prop_metric      # Metric of the imbalanced propeller check (low-passed)

```
