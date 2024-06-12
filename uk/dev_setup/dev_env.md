# Налаштування середовища розробника (Інструментарію)

_Платформи що підтримуються_ для розробки з PX4:

- [Ubuntu Linux](../dev_setup/dev_env_linux_ubuntu.md) (рекомендовано)
- [Windows (10/11)](../dev_setup/dev_env_windows_wsl.md)
- [Mac OS](../dev_setup/dev_env_mac.md)

## Цільові платформи що підтримуються

Таблиця нижче показує, які цільові платформи PX4 можна побудувати на кожній ОС.

| Цільова платформа                                                                                                                                     | Linux (Ubuntu) |   Mac   | Windows |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------:|:-------:|:-------:|
| **Апаратне забезпечення на базі NuttX:** [Pixhawk Series](../flight_controller/pixhawk_series.md), [Crazyflie](../complete_vehicles_mc/crazyflie2.md) |    &check;     | &check; | &check; |
| **Апаратне забезпечення на базі Linux:** [Raspberry Pi 2/3](../flight_controller/raspberry_pi_navio2.md)                                              |    &check;     |         |         |
| **Симуляція:** [Gazebo SITL](../sim_gazebo_gz/README.md)                                                                                              |    &check;     | &check; | &check; |
| **Симуляція:** [Gazebo Classic SITL](../sim_gazebo_classic/README.md)                                                                                 |    &check;     | &check; | &check; |
| **Симуляція:** [jMAVSim SITL](../sim_jmavsim/README.md)                                                                                               |    &check;     | &check; | &check; |
| **Симуляція:** [ROS з Gazebo Classic](../simulation/ros_interface.md)                                                                                 |    &check;     |         | &check; |
| **Симуляція:** ROS 2 із Gazebo                                                                                                                        |    &check;     |         | &check; |

Досвідчені користувачі Docker можуть робити збірки за допомогою контейнерів, які використовуються в нашій системі безперервної інтеграції : [Docker контейнери](../test_and_ci/docker.md)

## Наступні кроки

Після того, як ви закінчите налаштування одного з інструментаріїв вище:

- Встановіть [VSCode](../dev_setup/vscode.md) (якщо ви надаєте перевагу IDE ніж командному рядку).
- Встановіть [денну збірку QGroundControl](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/releases/daily_builds.html).
- Продовжуйте [збірку програмного забезпечення PX4](../dev_setup/building_px4.md).
