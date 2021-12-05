# landing_target_innovations (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/landing_target_innovations.msg)

```c
uint64 timestamp        # time since system start (microseconds)
# Innovation of landing target position estimator
float32 innov_x
float32 innov_y

# Innovation covariance of landing target position estimator
float32 innov_cov_x
float32 innov_cov_y

```
