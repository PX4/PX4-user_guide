# safety (UORB message)
        


[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/safety.msg)

```c
uint64 timestamp		# time since system start (microseconds)
bool safety_switch_available		# Set to true if a safety switch is connected
bool safety_off			# Set to true if safety is off
bool override_available		# Set to true if external override system is connected
bool override_enabled		# Set to true if override is engaged

```
