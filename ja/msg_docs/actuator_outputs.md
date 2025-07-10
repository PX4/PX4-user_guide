---
canonicalUrl: https://docs.px4.io/main/ja/msg_docs/actuator_outputs
---

# actuator_outputs (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/msg/actuator_outputs.msg)

```c
uint64 timestamp                # time since system start (microseconds)
uint8 NUM_ACTUATOR_OUTPUTS      = 16
uint8 NUM_ACTUATOR_OUTPUT_GROUPS    = 4 # for sanity checking
uint32 noutputs             # valid outputs
float32[16] output              # output data, in natural output units

# actuator_outputs_sim is used for SITL, HITL & SIH (with an output range of [-1, 1])
# TOPICS actuator_outputs actuator_outputs_sim

```
