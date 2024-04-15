# ROS (Робототехнічна операційна система)

[ROS](http://www.ros.org/) - загальнопризначена бібліотека робототехніки, яку можна використовувати з PX4 для розробки додатків для дронів.

ROS користується активною екосистемою розробників, які вирішують загальні проблеми робототехніки, а також має доступ до інших бібліотек програмного забезпечення, написаних для Linux. Він використовувався, наприклад, як частина рішень [комп’ютерного зору](../computer_vision/README.md) PX4, включаючи [уникнення перешкод](../computer_vision/obstacle_avoidance.md) і [запобігання зіткненням](../computer_vision/collision_prevention.md).

:::warning
tip [ROS 2](../ros/ros2.md) – це «остання та найкраща» версія ROS. Команда розробників PX4 рекомендує всім користувачам [оновитися до ROS 2](../ros/ros2.md)!
:::


## ROS Установки

PX4 підтримує як ROS 2 так і ROS 1 з наступними конфігураціями:

- **[ROS 2](../ros/ros2.md): (рекомендовано)** PX4 і ROS 2 обмінюються даними через [міст PX4-ROS 2](../ros/ros2_comm.md), інтерфейс, який забезпечує прямий міст між PX4 uORB повідомлення та типи повідомлень/типів ROS 2 DDS. Це забезпечує прямий доступ до внутрішніх елементів PX4 із робочих процесів і вузлів ROS 2 у реальному часі.
- **[ROS 1 через MAVROS](../ros/ros1.md):** PX4 і ROS 1 обмінюються даними через [MAVLink](../middleware/mavlink.md), використовуючи пакет [MAVROS](../ros/mavros_installation.md) для зв’язку тем ROS з MAVLink.

:::info ROS 2 також може з’єднуватися з PX4 за допомогою [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (замість XRCE-DDS). Цей параметр підтримується проектом MAVROS. :::info що ROS 2 може бути встановлена на Ubuntu Linux, macOS, Windows, коли ROS 1 доступний лише на Linux. Хоча він може працювати на інших платформах, PX4 переважно тестує та документує ROS на _Linux_.


## Підтримка ROS

На [PX4 Developer Summit 2020](https://www.youtube.com/watch?v=lZ8crGI16qA) (і [ROS World 2020](https://www.youtube.com/watch?v=8XRkzHqQSf0)), команда розробників PX4 оголосила плани підтримки microROS.

* microRTPS: microRTPS міст з Fast DDS (ROS 2 інтерфейс PX4 v1.13 та попередні)
* micro XRCE-DS: DDS на PX4 (ROS 2 інтерфейс PX4 v1.14 і пізніше)
* micro ROS: ROS 2 працює в PX4 - "microROS" (Наша Ціль!)
