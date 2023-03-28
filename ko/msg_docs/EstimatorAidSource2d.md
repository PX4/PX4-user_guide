# EstimatorAidSource2d (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/EstimatorAidSource2d.msg)

```c
uint64 timestamp             # time since system start (microseconds)
uint64 timestamp_sample      # the timestamp of the raw data (microseconds)

uint8 estimator_instance

uint32 device_id

uint64 time_last_fuse

float32[2] observation
float32[2] observation_variance

float32[2] innovation
float32[2] innovation_variance
float32[2] test_ratio

bool fusion_enabled          # true when measurements are being fused
bool innovation_rejected     # true if the observation has been rejected
bool fused                   # true if the sample was successfully fused

# TOPICS estimator_aid_src_ev_pos estimator_aid_src_fake_pos estimator_aid_src_gnss_pos
# TOPICS estimator_aid_src_aux_vel estimator_aid_src_optical_flow estimator_aid_src_terrain_optical_flow

```
