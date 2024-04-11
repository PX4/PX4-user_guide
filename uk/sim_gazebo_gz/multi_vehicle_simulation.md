# Симуляція кількох рухомих засобів з Gazebo

Цей розділ пояснює як моделювати кілька безпілотних рухомих засобів використовуючи [Gazebo (Gz)](../sim_gazebo_gz/index.md) та SITL.

::: info
Multi-Vehicle Simulation with Gazebo is only supported on Linux.
:::

У Gazebo дуже легко налаштувати сценарії з кількома рухомими засобами (у порівнянні з іншими симуляторами).

Спочатку зберіть код PX4 SITL:

```sh
make px4_sitl
```

Кожен екземпляр PX4 можна запустити у своєму власному терміналі вказавши унікальний номер екземпляра та бажану комбінацію [змінних середовища](../sim_gazebo_gz/index.md#usage-configuration-options):

```sh
ARGS ./build/px4_sitl_default/bin/px4 [-i <instance>]
```

- `<instance>`: Номер екземпляра рухомого засобу.
  - Кожен рухомий засіб повинен мати унікальний номер екземпляру. Якщо він не вказаний, номер екземпляру за замовчуванням - нуль.
  - При використанні з `PX4_SIM_MODEL`, Gazebo автоматично обере унікальне ім'я моделі у формі `${PX4_SIM_MODEL}_instance`.
- `ARGS`: Перелік змінних середовища, як описано у [Симуляція Gazebo > Варіанти використання/налаштування](../sim_gazebo_gz/index.md#usage-configuration-options).

Це дозволяє підвищити гнучкість та адаптивність.

## Кілька рухомих засобів з ROS 2 та Gazebo

Існує можливість [кількох засобів з ROS 2](../ros/ros2_multi_vehicle.md).

- Спочатку дотримуйтесь інструкцій по встановленню [Gazebo](../sim_gazebo_gz/index.md).
- Потім налаштуйте систему для [ROS 2 / операцій PX4](../ros/ros2_comm.md#installation-setup).
- В різних терміналах вручну запустіть симуляцію декількох рухомих засобів. Цей приклад відтворює 2 квадрокоптери X500 та літак з фіксованим крилом aFPX:

  ```sh
  PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4 -i 1
  ```

  ```sh
  PX4_SYS_AUTOSTART=4001 PX4_GZ_MODEL_POSE="0,1" PX4_SIM_MODEL=gz_x500 ./build/px4_sitl_default/bin/px4 -i 2
  ```

  ```sh
  PX4_SYS_AUTOSTART=4003 PX4_GZ_MODEL_POSE="0,2" PX4_SIM_MODEL=gz_rc_cessna ./build/px4_sitl_default/bin/px4 -i 3
  ```

- Запустіть агента:

  ```sh
  MicroXRCEAgent udp4 -p 8888
  ```

  Агент автоматично з'єднається з усіма клієнтами.

- Виконайте `ros2 topic list`, щоб побачити список усіх рубрик, який буде виглядати приблизно так:

```sh
/parameter_events
/px4_1/fmu/in/obstacle_distance
/px4_1/fmu/in/offboard_control_mode
/px4_1/fmu/in/onboard_computer_status
/px4_1/fmu/in/sensor_optical_flow
/px4_1/fmu/in/telemetry_status
/px4_1/fmu/in/trajectory_setpoint
/px4_1/fmu/in/vehicle_attitude_setpoint
/px4_1/fmu/in/vehicle_command
/px4_1/fmu/in/vehicle_mocap_odometry
/px4_1/fmu/in/vehicle_rates_setpoint
/px4_1/fmu/in/vehicle_trajectory_bezier
/px4_1/fmu/in/vehicle_trajectory_waypoint
/px4_1/fmu/in/vehicle_visual_odometry
/px4_1/fmu/out/failsafe_flags
/px4_1/fmu/out/sensor_combined
/px4_1/fmu/out/timesync_status
/px4_1/fmu/out/vehicle_attitude
/px4_1/fmu/out/vehicle_control_mode
/px4_1/fmu/out/vehicle_global_position
/px4_1/fmu/out/vehicle_gps_position
/px4_1/fmu/out/vehicle_local_position
/px4_1/fmu/out/vehicle_odometry
/px4_1/fmu/out/vehicle_status
/px4_2/fmu/in/obstacle_distance
/px4_2/fmu/in/offboard_control_mode
/px4_2/fmu/in/onboard_computer_status
/px4_2/fmu/in/sensor_optical_flow
/px4_2/fmu/in/telemetry_status
/px4_2/fmu/in/trajectory_setpoint
/px4_2/fmu/in/vehicle_attitude_setpoint
/px4_2/fmu/in/vehicle_command
/px4_2/fmu/in/vehicle_mocap_odometry
/px4_2/fmu/in/vehicle_rates_setpoint
/px4_2/fmu/in/vehicle_trajectory_bezier
/px4_2/fmu/in/vehicle_trajectory_waypoint
/px4_2/fmu/in/vehicle_visual_odometry
/px4_2/fmu/out/failsafe_flags
/px4_2/fmu/out/sensor_combined
/px4_2/fmu/out/timesync_status
/px4_2/fmu/out/vehicle_attitude
/px4_2/fmu/out/vehicle_control_mode
/px4_2/fmu/out/vehicle_global_position
/px4_2/fmu/out/vehicle_gps_position
/px4_2/fmu/out/vehicle_local_position
/px4_2/fmu/out/vehicle_odometry
/px4_2/fmu/out/vehicle_status
/px4_3/fmu/in/obstacle_distance
/px4_3/fmu/in/offboard_control_mode
/px4_3/fmu/in/onboard_computer_status
/px4_3/fmu/in/sensor_optical_flow
/px4_3/fmu/in/telemetry_status
/px4_3/fmu/in/trajectory_setpoint
/px4_3/fmu/in/vehicle_attitude_setpoint
/px4_3/fmu/in/vehicle_command
/px4_3/fmu/in/vehicle_mocap_odometry
/px4_3/fmu/in/vehicle_rates_setpoint
/px4_3/fmu/in/vehicle_trajectory_bezier
/px4_3/fmu/in/vehicle_trajectory_waypoint
/px4_3/fmu/in/vehicle_visual_odometry
/px4_3/fmu/out/failsafe_flags
/px4_3/fmu/out/sensor_combined
/px4_3/fmu/out/timesync_status
/px4_3/fmu/out/vehicle_attitude
/px4_3/fmu/out/vehicle_control_mode
/px4_3/fmu/out/vehicle_global_position
/px4_3/fmu/out/vehicle_gps_position
/px4_3/fmu/out/vehicle_local_position
/px4_3/fmu/out/vehicle_odometry
/px4_3/fmu/out/vehicle_status
/rosout
```
