# ModeCompleted (повідомлення UORB)

Результат завершення режиму, опублікований активним режимом. Можливі значення nav_state визначені в повідомленні VehicleStatus. Зверніть увагу, що це не завжди публікується (наприклад, коли користувач переходить у режими або при активації failsafe)

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/ModeCompleted.msg)

```c
# Mode completion result, published by an active mode.
# The possible values of nav_state are defined in the VehicleStatus msg.
# Note that this is not always published (e.g. when a user switches modes or on
# failsafe activation)
uint64 timestamp                 # time since system start (microseconds)


uint8 RESULT_SUCCESS = 0
# [1-99]: reserved
uint8 RESULT_FAILURE_OTHER = 100 # Mode failed (generic error)

uint8 result                     # One of RESULT_*

uint8 nav_state                  # Source mode (values in VehicleStatus)


```
