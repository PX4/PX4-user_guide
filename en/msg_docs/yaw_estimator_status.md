---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/yaw_estimator_status
---

# yaw_estimator_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/yaw_estimator_status.msg)

```c
uint64 timestamp		# time since system start (microseconds)
uint64 timestamp_sample         # the timestamp of the raw data (microseconds)

float32 yaw_composite	# composite yaw from GSF (rad)
float32 yaw_variance	# composite yaw variance from GSF (rad^2)
bool yaw_composite_valid

float32[5] yaw		# yaw estimate for each model in the filter bank (rad)
float32[5] innov_vn	# North velocity innovation for each model in the filter bank (m/s)
float32[5] innov_ve	# East velocity innovation for each model in the filter bank (m/s)
float32[5] weight	# weighting for each model in the filter bank

```
