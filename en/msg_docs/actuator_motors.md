# actuator_motors (UORB message)

Motor control message

[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/actuator_motors.msg)

```c
# Motor control message
uint64 timestamp			# time since system start (microseconds)
uint64 timestamp_sample	    # the timestamp the data this control response is based on was sampled

uint8 NUM_CONTROLS = 8
float32[8] control # range: [-1, 1], where 1 means maximum positive thrust,
                   # -1 maximum negative (if not supported by the output, <0 maps to NaN),
                   # and NaN maps to disarmed (stop the motors)

```
