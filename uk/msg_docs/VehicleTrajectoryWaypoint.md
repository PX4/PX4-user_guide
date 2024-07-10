# VehicleTrajectoryWaypoint (повідомлення UORB)

Опис траєкторії транспортних точок. Дивіться також MAVLink MAV_TRAJECTORY_REPRESENTATION msg Тема vehicle_trajectory_waypoint_desired використовується для надсилання користувачем бажаних точок шляху від контролера положення до комп'ютера-супутника/модуля уникання перешкод. Тема vehicle_trajectory_waypoint використовується для надсилання відкоригованих точок маршруту від комп'ютера-супутника/модуля уникання перешкод до контролера положення.

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/msg/VehicleTrajectoryWaypoint.msg)

```c
# Опис траєкторії транспортних точок. Дивіться також MAVLink MAV_TRAJECTORY_REPRESENTATION msg
# Тема vehicle_trajectory_waypoint_desired використовується для надсилання бажаних користувачем точок маршруту від контролера положення до комп'ютера-супутника/модуля уникання перешкод.
# Тема vehicle_trajectory_waypoint використовується для надсилання коригованих точок маршруту від комп'ютера-супутника/модуля уникання перешкод до контролера положення.

uint64 timestamp        # time since system start (microseconds)

uint8 MAV_TRAJECTORY_REPRESENTATION_WAYPOINTS = 0

uint8 type # Type from MAV_TRAJECTORY_REPRESENTATION enum.

uint8 POINT_0 = 0
uint8 POINT_1 = 1
uint8 POINT_2 = 2
uint8 POINT_3 = 3
uint8 POINT_4 = 4

uint8 NUMBER_POINTS = 5

TrajectoryWaypoint[5] waypoints

# TOPICS vehicle_trajectory_waypoint vehicle_trajectory_waypoint_desired

```
