# CollisionConstraints (повідомлення UORB)

Локальні обмеження заданих значень у фреймі NED
встановлення чогось у NaN означає, що обмеження не передбачено

[source file](https://github.com/PX4/PX4-Autopilot/blob/main/msg/CollisionConstraints.msg)

```c
# Local setpoint constraints in NED frame
# setting something to NaN means that no limit is provided

uint64 timestamp	# time since system start (microseconds)

float32[2] original_setpoint   # velocities demanded
float32[2] adapted_setpoint    # velocities allowed

```
