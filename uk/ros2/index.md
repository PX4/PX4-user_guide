# ROS 2

[ROS 2](https://index.ros.org/doc/ros2/) є найновішою версією [ROS](http://www.ros.org/) (Robot Operating System), загальна мета бібліотеки робототехніки для якої може бути використана - це для створення потужних застосунків для дронів разом з PX4 Autopilot. Він охоплює більшість навчальних функцій і опцій [ROS 1](../ros/ros1.md) та покращує ряд недоліків попередньої версії.

:::warning
Tip
Команда розробників PX4 наполегливо рекомендуємо вам використовувати/перейти на цю версію ROS!
:::

Спілкування між ROS 2 і PX4 використовує проміжне програмне забезпечення, яке реалізує протокол [XRCE-DDS](../middleware/uxrce_dds.md). Цей посередник використовує PX4 повідомлення[uORB messages](../msg_docs/README.md) у вигляді повідомлень та типів ROS 2, що ефективно дозволяє прямий доступ до PX4 з робочих процесів та вузлів ROS 2. Проміжна програма використовує визначення повідомлень uORB для генерації коду для серіалізації та десеріалізації заголовків повідомлень PX4. Ці ж визначення повідомлень використовуються в програмах ROS 2, щоб дозволити інтерпретувати повідомлення.

To use the [ROS 2](../ros2/user_guide.md) over XRCE-DDS effectively, you must (at time of writing) have a reasonable understanding of the PX4 internal architecture and conventions, which differ from those used by ROS. У найближчому майбутньому ми плануємо надати ROS 2 API до абстрактних конвенцій PX4, разом із прикладами, що демонструють їх використання.

Основні теми в цьому розділі є:
- [ROS 2 User Guide](../ros2/user_guide.md): A PX4-centric overview of ROS 2, covering installation, setup, and how to build ROS 2 applications that communicate with PX4.
- [ROS 2 приклад зовнішнього контролю](../ros2/offboard_control.md)

:::info
ROS 2 офіційно підтримується тільки на платформах Linux.
Ubuntu 20.04 LTS є офіційним, підтримуваним дистрибутивом.
:::


:::info ROS 2 також може з’єднуватися з PX4 за допомогою [MAVROS](https://github.com/mavlink/mavros/tree/ros2/mavros) (замість XRCE-DDS). Ця опція підтримується проектом MAVROS.
:::


## Додаткова інформація

- [ROS 2 Посібник користувача](../ros2/user_guide.md)
- [XRCE-DDS (PX4-ROS 2/DDS Bridge)](../middleware/uxrce_dds.md): PX4 проміжне програмне забезпечення для підключення до ROS 2.

