# VehicleTrajectoryBezier (Повідомлення UORB)

Опис Vehicle Waypoints Trajectory. Дивіться також MAVLink MAV_TRAJECTORY_REPRESENTATION msg Тема vehicle_trajectory_bezier використовується для надсилання плавної траєкторії польоту від комп'ютера-супутника/модуля уникання перешкод до контролера положення.

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/main/msg/VehicleTrajectoryBezier.msg)

```c
# Опис траєкторії транспортних точок. Дивіться також MAVLink MAV_TRAJECTORY_REPRESENTATION msg
# Тема vehicle_trajectory_bezier використовується для надсилання гладкого шляху польоту від
# компаньйона-комп'ютера/модуля уникання перешкод до контролера положення.

uint64 timestamp        # time since system start (microseconds)

uint8 POINT_0 = 0
uint8 POINT_1 = 1
uint8 POINT_2 = 2
uint8 POINT_3 = 3
uint8 POINT_4 = 4

uint8 NUMBER_POINTS = 5

TrajectoryBezier[5] control_points
uint8 bezier_order

# TOPICS vehicle_trajectory_bezier

```
