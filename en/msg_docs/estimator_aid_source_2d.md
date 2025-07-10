---
canonicalUrl: https://docs.px4.io/main/en/msg_docs/estimator_aid_source_2d
---

# estimator_aid_source_2d (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/estimator_aid_source_2d.msg)

```c
uint64 timestamp             # time since system start (microseconds)
uint64 timestamp_sample      # the timestamp of the raw data (microseconds)

uint8 estimator_instance

uint32 device_id

uint64[2] time_last_fuse

float32[2] observation
float32[2] observation_variance

float32[2] innovation
float32[2] innovation_variance
float32[2] test_ratio

bool[2] fusion_enabled       # true when measurements are being fused
bool[2] innovation_rejected  # true if the observation has been rejected
bool[2] fused                # true if the sample was successfully fused

# TOPICS estimator_aid_source_2d
# TOPICS estimator_aid_src_fake_pos

```
