# vehicle_command_ack (UORB message)



[source file](https://github.com/PX4/PX4-Autopilot/blob/master/msg/vehicle_command_ack.msg)

```c
uint64 timestamp		# time since system start (microseconds)
uint8 VEHICLE_RESULT_ACCEPTED = 0
uint8 VEHICLE_RESULT_TEMPORARILY_REJECTED = 1
uint8 VEHICLE_RESULT_DENIED = 2
uint8 VEHICLE_RESULT_UNSUPPORTED = 3
uint8 VEHICLE_RESULT_FAILED = 4
uint8 VEHICLE_RESULT_IN_PROGRESS = 5

uint16 ARM_AUTH_DENIED_REASON_GENERIC = 0
uint16 ARM_AUTH_DENIED_REASON_NONE = 1
uint16 ARM_AUTH_DENIED_REASON_INVALID_WAYPOINT = 2
uint16 ARM_AUTH_DENIED_REASON_TIMEOUT = 3
uint16 ARM_AUTH_DENIED_REASON_AIRSPACE_IN_USE = 4
uint16 ARM_AUTH_DENIED_REASON_BAD_WEATHER = 5

uint8 ORB_QUEUE_LENGTH = 4

uint32 command
uint8 result
bool from_external
uint8 result_param1
int32 result_param2
uint8 target_system
uint8 target_component

```
