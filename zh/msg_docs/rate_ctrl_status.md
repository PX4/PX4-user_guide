# rate_ctrl_status (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/rate_ctrl_status.msg)

```c
uint64 timestamp        # time since system start (microseconds)

# rate controller integrator status
float32 rollspeed_integ
float32 pitchspeed_integ
float32 yawspeed_integ
float32 additional_integ1   # FW: wheel rate integrator (optional)

```
