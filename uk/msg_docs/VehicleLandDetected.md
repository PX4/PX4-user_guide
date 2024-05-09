# VehicleLandDetected (повідомлення UORB)



[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleLandDetected.msg)

```c
uint64 timestamp    # time since system start (microseconds)

bool freefall       # true if vehicle is currently in free-fall
bool ground_contact # true if vehicle has ground contact but is not landed (1. stage)
bool maybe_landed   # true if the vehicle might have landed (2. stage)
bool landed     # true if vehicle is currently landed on the ground (3. stage)

bool in_ground_effect # indicates if from the perspective of the landing detector the vehicle might be in ground effect (baro). Цей прапорець стане true, якщо транспортний засіб не рухається горизонтально і опускається (грубе припущення, що користувач приземляється).
bool in_descend

bool has_low_throttle

bool vertical_movement
bool horizontal_movement
bool rotational_movement

bool close_to_ground_or_skipped_check

bool at_rest

```
