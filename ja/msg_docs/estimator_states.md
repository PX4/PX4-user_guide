---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/estimator_states
---

# estimator_states (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/estimator_states.msg)

```c
uint64 timestamp        # time since system start (microseconds)
uint64 timestamp_sample         # the timestamp of the raw data (microseconds)

float32[24] states      # Internal filter states
uint8 n_states      # Number of states effectively used

float32[24] covariances # Diagonal Elements of Covariance Matrix

```
