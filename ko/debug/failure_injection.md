# System Failure Injection

System failure injection allows you to cause different types of sensor and system failures using the [MAVLink shell](../debug/mavlink_shell.md#mavlink-shell) or other PX4 console. This enables easier testing of [safety failsafe](../config/safety.md#safety-configuration-failsafes) behaviour, and more generally, of how PX4 behaves when systems and sensors stop working correctly.

Failure injection is disabled by default, and can be enabled using the [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN) parameter. Failures are then injected using the [failure](../modules/modules_command.md#failure) system command, specifying both the target and type of the failure.

:::warning
Failure injection still in development. At time of writing (PX4 v1.12):
- It can only be used in simulation (support for both failure injection in real flight is planned).
- Many failure types are not broadly implemented. In those cases the command will return with an "unsupported" message.
:::

## Syntax

The full syntax of the [failure](../modules/modules_command.md#failure) command is:
```
failure <component> <failure_type> [-i <instance_number>]
```
where:
- _component_: `gyro` | `accel` | `mag` | `baro` | `gps` | `optical_flow` | `vio` | `distance_sensor` | `airspeed` | `battery` | `motor` | `servo` | `avoidance` | `rc_signal` | `mavlink_signal`
- _failure_type_:
  - `ok`: Publish as normal (Disable failure injection).
  - `off`: Stop publishing.
  - `stuck`: Report same value every time (_could_ indicate a malfunctioning sensor).
  - `garbage`: Publish random noise. This looks like reading uninitialized memory.
  - `wrong`: Publish invalid values (that still look reasonable/aren't "garbage").
  - `slow`: Publish at a reduced rate.
  - `delayed`: Publish valid data with a significant delay.
  - `intermittent`: Publish intermittently.
- _instance number_ (optional): Instance number of affected sensor. 0 (default) indicates all sensors of specified type.


## Example

To simulate losing RC signal without having to turn off your RC controller:

1. Enable the parameter [SYS_FAILURE_EN](../advanced_config/parameter_reference.md#SYS_FAILURE_EN).
1. Enter the following commands on the MAVLink console or SITL *pxh shell*:
   ```bash
   # Fail RC (turn publishing off)
   failure rc_signal off

   # Restart RC publishing
   failure rc_signal ok
   ```