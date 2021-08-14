# actuator_outputs (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/actuator_outputs.msg)

```c
uint64 timestamp                # time since system start (microseconds)
uint8 NUM_ACTUATOR_OUTPUTS      = 16
uint8 NUM_ACTUATOR_OUTPUT_GROUPS    = 4 # for sanity checking
uint32 noutputs             # valid outputs
float32[16] output              # output data, in natural output units

```
