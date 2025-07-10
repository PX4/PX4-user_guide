---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/magnetometer_bias_estimate
---

# magnetometer_bias_estimate (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/magnetometer_bias_estimate.msg)

```c
uint64 timestamp                # time since system start (microseconds)

float32[4] bias_x		# estimated X-bias of all the sensors
float32[4] bias_y		# estimated Y-bias of all the sensors
float32[4] bias_z		# estimated Z-bias of all the sensors

bool[4] valid			# true if the estimator has converged
bool[4] stable

```
