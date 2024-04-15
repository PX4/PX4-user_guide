# ROS 2 Offboard Control Приклад

Наступний приклад на C++ показує, як виконати керування положенням у режимі [offboard mode](../flight_modes/offboard.md) з вузла ROS 2.

Приклад починає відправляти установочні точки, входить у режим offboard, озброюється, піднімається на 5 метрів і чекає. Незважаючи на простоту, він демонструє основні принципи використання offboard control і способи надсилання команд транспортному засобу.

Він був протестований на Ubuntu 20.04 з ROS 2 Foxy та PX4 `main` після PX4 v1.13.

:::warning
*Offboard* керування небезпечне. Якщо ви керуєте реальним транспортним засобом, то обов'язково майте можливість отримати назад ручне керування на випадок, якщо щось піде не так.
:::

:::info ROS та PX4 роблять кілька різних припущень, зокрема щодо [конвенцій кадрів](../ros/external_position_estimation.md#reference-frames-and-ros). Не існує неявного перетворення між типами кадрів при публікації або підписці на теми!

У цьому прикладі публікуються позиції у фреймі NED, як і очікує PX4. Щоб підписатися на дані, що надходять з вузлів, які публікують у іншій системі координат (наприклад, ENU, яка є стандартною системою координат у ROS/ROS 2), скористайтеся допоміжними функціями у бібліотеці [frame_transforms](https://github.com/PX4/px4_ros_com/blob/main/src/lib/frame_transforms.cpp).
:::

## Випробування

Дотримуйтесь інструкцій у [Посібнику користувача ROS 2](../ros/ros2_comm.md), щоб встановити PX і запустити симулятор, встановити ROS 2 і запустити агента XRCE-DDS.

Після цього ми можемо виконати набір кроків, подібних до тих, що наведені у [ROS 2 Посібник користувача > ROS 2 Побудова робочого простору](../ros/ros2_comm.md#build-ros-2-workspace), щоб запустити приклад.

Створити та запустити приклад:

1. Відкрийте новий термінал.
1. Створіть новий каталог робочого простору colcon і перейдіть до нього за допомогою:

   ```sh
   mkdir -p ~/ws_offboard_control/src/
   cd ~/ws_offboard_control/src/
   ```

1. Клонуйте репозиторій [px4_msgs](https://github.com/PX4/px4_msgs) до каталогу `/src` (цей репозиторій потрібен у кожному робочому просторі ROS 2 PX4!):

   ```sh
   git clone https://github.com/PX4/px4_msgs.git
   # checkout the matching release branch if not using PX4 main.
   ```

1. Клонуйте репозиторій з прикладом [px4_ros_com](https://github.com/PX4/px4_ros_com) до каталогу `/src`:

   ```sh
   git clone https://github.com/PX4/px4_ros_com.git
   ```

1. Створіть середовище розробки ROS 2 у поточному терміналі і скомпілюйте робочу область за допомогою `colcon`:

   :::: tabs

   ::: tab humble
   ```sh
   cd ..
   source /opt/ros/humble/setup.bash
   colcon build
   ```

:::

   ::: tab foxy
   ```sh
   cd ..
   source /opt/ros/foxy/setup.bash
   colcon build
   ```

:::

   ::::

1. Джерело `local_setup.bash`:

   ```sh
   source install/local_setup.bash
   ```
1. Запустіть приклад.

   ```
   ros2 run px4_ros_com offboard_control
   ```

Транспортний засіб повинен озброїтися, піднятися на 5 метрів і потім зачекати (вічно).

## Імплементація

Вихідний код прикладу керування позашляховою платформою можна знайти за посиланням [PX4/px4_ros_com](https://github.com/PX4/px4_ros_com) у каталозі [/src/examples/offboard/offboard_control.cpp](https://github.com/PX4/px4_ros_com/blob/main/src/examples/offboard/offboard_control.cpp).

:::info PX4 публікує всі повідомлення, використані в цьому прикладі, як ROS теми за замовчуванням (див. [dds_topics.yaml](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/uxrce_dds_client/dds_topics.yaml)).
:::

PX4 вимагає, щоб транспортний засіб вже отримував повідомлення `OffboardControlMode` перед тим, як він збере в режимі автономного керування, або перед тим, як він перейде в режим автономного керування під час польоту. Крім того, PX4 вийде з offboard mode, якщо частота потоку повідомлень `OffboardControlMode` впаде нижче приблизно 2 Гц. Необхідна поведінка реалізується за допомогою головного циклу, що виконується у вузлі ROS 2, як показано нижче:

```cpp
auto timer_callback = [this]() -> void {

    if (offboard_setpoint_counter_ == 10) {
        // Change to Offboard mode after 10 setpoints
        this->publish_vehicle_command(VehicleCommand::VEHICLE_CMD_DO_SET_MODE, 1, 6);

        // Arm the vehicle
        this->arm();
    }

    // OffboardControlMode needs to be paired with TrajectorySetpoint
    publish_offboard_control_mode();
    publish_trajectory_setpoint();

    // stop the counter after reaching 11
    if (offboard_setpoint_counter_ < 11) {
        offboard_setpoint_counter_++;
    }
};
timer_ = this->create_wall_timer(100ms, timer_callback);
```

Цикл працює на таймері тривалістю 100 мс. Протягом перших 10 циклів він викликає `publish_offboard_control_mode()` і `publish_trajectory_setpoint()`, щоб відправити [OffboardControlMode](../msg_docs/OffboardControlMode.md) та [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) повідомлення до PX4. Повідомлення `OffboardControlMode` транслюються таким чином, що PX4 дозволить озброєння, як тільки перейде в режим offboard, тоді як повідомлення `TrajectorySetpoint` ігноруються (доки транспортний засіб перебуває в режимі offboard).

Після 10 циклів викликається `publish_vehicle_command()` для зміни на режим безпілотного керування, а також викликається `arm()` для озброєння транспортного засобу. Після того, як транспортний засіб озброюється та змінює режим, він починає відстежувати встановлені точки. Задані точки все ще відправляються в кожному циклі, щоб транспортний засіб не виходив з режиму поза платформою.

Реалізації методів `publish_offboard_control_mode()` та `publish_trajectory_setpoint()` показані нижче. Ці публікують повідомлення [OffboardControlMode](../msg_docs/OffboardControlMode.md) та [TrajectorySetpoint](../msg_docs/TrajectorySetpoint.md) до PX4 (відповідно).

Параметр `OffboardControlMode` потрібен для того, щоб повідомити PX4 про _тип_ використовуваного режиму керування offboard. Тут ми використовуємо лише _position control_, тому поле `position` має значення `true`, а всі інші поля мають значення `false`.

```cpp
/**
 * @brief Publish the offboard control mode.
 *        For this example, only position and altitude controls are active.
 */
void OffboardControl::publish_offboard_control_mode()
{
    OffboardControlMode msg{};
    msg.position = true;
    msg.velocity = false;
    msg.acceleration = false;
    msg.attitude = false;
    msg.body_rate = false;
    msg.thrust_and_torque = false;
    msg.direct_actuator = false;
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    offboard_control_mode_publisher_->publish(msg);
}
```

`TrajectorySetpoint` надає задане значення положення. У цьому випадку поля `x`, `y`, `z` і `yaw` жорстко закодовані на певні значення, але вони можуть оновлюватися динамічно за алгоритмом або навіть за допомогою зворотного виклику підписки на повідомлення, що надходять з іншого вузла.

```cpp
/**
 * @brief Publish a trajectory setpoint
 *        For this example, it sends a trajectory setpoint to make the
 *        vehicle hover at 5 meters with a yaw angle of 180 degrees.
 */
void OffboardControl::publish_trajectory_setpoint()
{
    TrajectorySetpoint msg{};
    msg.position = {0.0, 0.0, -5.0};
    msg.yaw = -3.14; // [-PI:PI]
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    trajectory_setpoint_publisher_->publish(msg);
}
```

Функція `publish_vehicle_command()` надсилає повідомлення [VehicleCommand](../msg_docs/VehicleCommand.md) з командами до польотного контролера. Ми використовуємо його вище, щоб змінити режим на режим offboard, а також у `arm()` для озброєння транспортного засобу. Хоча у цьому прикладі ми не викликаємо `disarm()`, він також використовується у реалізації цієї функції.

```cpp
/**
 * @brief Publish vehicle commands
 * @param command   Command code (matches VehicleCommand and MAVLink MAV_CMD codes)
 * @param param1    Command parameter 1
 * @param param2    Command parameter 2
 */
void OffboardControl::publish_vehicle_command(uint16_t command, float param1, float param2)
{
    VehicleCommand msg{};
    msg.param1 = param1;
    msg.param2 = param2;
    msg.command = command;
    msg.target_system = 1;
    msg.target_component = 1;
    msg.source_system = 1;
    msg.source_component = 1;
    msg.from_external = true;
    msg.timestamp = this->get_clock()->now().nanoseconds() / 1000;
    vehicle_command_publisher_->publish(msg);
}
```

:::info [VehicleCommand](../msg_docs/VehicleCommand.md) - один з найпростіших і найпотужніших способів керування PX4, а підписавшись на [VehicleCommandAck](../msg_docs/VehicleCommandAck.md), ви також можете підтвердити, що задавання певної команди було успішним. Поля param і command відображають команди [MAVLink](https://mavlink.io/en/messages/common.html#mav_commands) та їхні значення параметрів.
:::


<!--

## Demo with PX4 SITL and Gazebo Classic

@[youtube](https://youtu.be/Nbc7fzxFlYo)
-->
