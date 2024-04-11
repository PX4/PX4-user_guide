# Multi-Vehicle Симуляція з ROS 2

[XRCE-DDS](../middleware/uxrce_dds.md) дозволяє підключати декілька клієнтів до одного агента через UDP. Це особливо корисно в симуляції, якщо потрібно запустити лише один агент.

## Налаштування та вимоги

Єдині вимоги

- To be able to run [multi-vehicle simulation](../simulation/multi-vehicle-simulation.md) without ROS 2 with the desired simulator ([Gazebo](../sim_gazebo_gz/multi_vehicle_simulation.md), [Gazebo Classic](../sim_gazebo_classic/multi_vehicle_simulation.md#multiple-vehicle-with-gazebo-classic), [FlightGear](../sim_flightgear/multi_vehicle.md) and [JMAVSim](../sim_jmavsim/multi_vehicle.md)).
- Можливість використання [ROS 2](./ros2_comm.md) в симуляції одного транспортного засобу.

## Принцип операції

У симуляції кожен екземпляр PX4 отримує унікальний номер `px4_instance`, починаючи з `0`. Це значення використовується для присвоєння унікального значення ключу [UXRCE_DDS_KEY](../advanced_config/parameter_reference.md#UXRCE_DDS_KEY):

```sh
param set UXRCE_DDS_KEY $((px4_instance+1))
```

::: info
By doing so, `UXRCE_DDS_KEY` will always coincide with [MAV_SYS_ID](../advanced_config/parameter_reference.md#MAV_SYS_ID).
:::

Крім того, коли `px4_instance` більше нуля, додається унікальний [префікс простору імен](../middleware/uxrce_dds.md#customizing-the-topic-namespace) ROS 2 у вигляді `px4_$px4_instance`:

```sh
uxrce_dds_ns="-n px4_$px4_instance"
```

::: info
The environment variable `PX4_UXRCE_DDS_NS`, if set, will override the namespace behavior described above.
:::

Перший екземпляр (`px4_instance=0`) не має додаткового простору імен, щоб відповідати стандартній поведінці клієнта `xrce-dds` на реальному транспортному засобі. Цю невідповідність можна виправити вручну за допомогою `PX4_UXRCE_DDS_NS` у першому випадку або почавши додавання транспортних засобів з індексу `1` замість `0` (це поведінка за замовчуванням, прийнята у [sitl_multiple_run.sh](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/simulation/gazebo-classic/sitl_multiple_run.sh) для Gazebo Classic).

Типове налаштування клієнта у симуляції:

| `PX4_UXRCE_DDS_NS` | `px4_instance` | `UXRCE_DDS_KEY`  | client namespace      |
| ------------------ | -------------- | ---------------- | --------------------- |
| not provided       | 0              | `px4_instance+1` | none                  |
| provided           | 0              | `px4_instance+1` | `PX4_UXRCE_DDS_NS`    |
| not provided       | >0             | `px4_instance+1` | `px4_${px4_instance}` |
| provided           | >0             | `px4_instance+1` | `PX4_UXRCE_DDS_NS`    |

## Налаштування значення `target_system`

PX4 приймає повідомлення [VehicleCommand](../msg_docs/VehicleCommand.md) тільки якщо їхнє поле `target_system` дорівнює нулю (широкомовний зв'язок) або збігається з `MAV_SYS_ID`. У всіх інших ситуаціях повідомлення ігноруються. Тому, коли вузли ROS 2 хочуть надіслати `VehicleCommand` до PX4, вони повинні переконатися, що повідомлення заповнені відповідним значенням `target_system`.

Наприклад, якщо ви хочете надіслати команду третьому автомобілю, який має `px4_instance=2`, вам потрібно встановити `target_system=3` у всіх ваших повідомленнях `VehicleCommand`.
