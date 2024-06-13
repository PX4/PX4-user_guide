# ROS 1 з MAVROS

:::tip
The PX4 development team recommend that users migrate to [ROS 2](../ros2/index.md) (i.e. skip this section)!
:::

[ROS](../ros/README.md) (Robot Operating System) це бібліотека загального призначення для робототехніки, яку можна використовувати для створення потужних додатків для дронів разом з PX4 Autopilot.

Цей розділ містить теми, пов'язані з використанням "оригінальної версії ROS" та пакету [MAVROS](../ros/mavros_installation.md) для комунікації з PX4 через [MAVLink](../middleware/mavlink.md) (MAVROS переходить від ROS-тем до протоколу MAVLink та конвенцій PX4).

Основні охоплені тут теми:
- [ROS/MAVROS Installation Guide](../ros/mavros_installation.md): Налаштування середовища розробки PX4 з ROS 1 та MAVROS.
- [ROS/MAVROS (C++)](../ros/mavros_offboard_cpp.md): Розділ, що показує основні концепції, пов'язані з написанням C++ вузла MAVROS/ROS.
- [ROS/MAVROS Надсилання Custom Messages](../ros/mavros_custom_messages.md)
- [ROS з симулятором Gazebo Classic](../simulation/ros_interface.md)
- [Gazebo Classic OctoMap Models з ROS](../sim_gazebo_classic/octomap.md)
- [Встановлення ROS на RPI](../ros/raspberrypi_installation.md)
- [Оцінка зовнішньої позиції (заснована на спостережені/русі)](../ros/external_position_estimation.md)


## Інші ресурси

- [Системи PX4 ROS](../ros/README.md#ros-setups).
- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + середовище симуляцій PX4 для комп'ютерного зору. У посібнику [XTDrone](https://www.yuque.com/xtdrone/manual_en) є все необхідне для початку роботи!
- [Prometheus Autonomous Drone Project](https://github.com/amov-lab/Prometheus/blob/master/README_EN.md) - Prometheus це колекція програмних пакунків з ліцензією BSD-3 від [AMOVLab](https://github.com/amov-lab) на основі ROS 1, який надає повний набір рішень для розумного та автономного польоту дронів, таких як картографування, локалізація, планування, керування та виявлення цілі, повністю інтегроване з Симулятором [Gazebo Classic](../sim_gazebo_classic/README.md).
