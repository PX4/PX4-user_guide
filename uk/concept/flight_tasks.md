# Польотні завдання

_Flight Tasks_ are used within [Flight Modes](../concept/flight_modes.md) to provide specific movement behaviours: e.g. follow me, or flight smoothing.

## Загальний огляд

A flight task is a class in the flight task framework derived from the base class [FlightTask](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/flight_mode_manager/tasks/FlightTask/FlightTask.hpp). Його мета - генерувати задані значення для контролера з довільних вхідних даних, де кожне завдання реалізує бажану поведінку рухомого засобу для певного режиму.
Programmers typically override the `activate()` and `update()` virtual methods by calling the base task's minimal implementation and extending with the implementation of the desired behavior.
The `activate()` method is called when switching to the task and allows to initialize its state and take over gently from the passed over setpoints the previous task was just applying.

`update()` is called on every loop iteration during the execution and contains the core behavior implementation producing setpoints.

By convention tasks are contained in a subfolder of [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/flight_mode_manager/tasks) named after the task, and the source files are named with the prefix "FlightTask".

:::info
Video overviews from PX4 developer summits are [provided below](#video).
:::

## Створення польотного завдання

The instructions below might be used to create a task named _MyTask_:

1. Create a directory for the new flight task in [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/main/src/modules/flight_mode_manager/tasks).
   By convention the directory is named after the task, so we will call it **/MyTask**.

   ```sh
   mkdir PX4-Autopilot/src/modules/flight_mode_manager/tasks/MyTask
   ```

2. Create empty source code and _cmake_ files for the new flight task in the _MyTask_ directory using the prefix "FlightTask":
   - CMakeLists.txt
   - FlightTaskMyTask.hpp
   - FlightTaskMyTask.cpp

3. Update **CMakeLists.txt** for the new task

   - Copy the contents of the **CMakeLists.txt** for another task - e.g. [Orbit/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/flight_mode_manager/tasks/Orbit/CMakeLists.txt)

   - Оновіть відмітку про авторське право до поточного року

     ```cmake
     ############################################################################
     #
     #   Copyright (c) 2021 PX4 Development Team. All rights reserved.
     #
     ```

   - Modify the code to reflect the new task - e.g. replace `FlightTaskOrbit` with `FlightTaskMyTask`.
     Код буде виглядати приблизно так:

     ```cmake
     px4_add_library(FlightTaskMyTask
         FlightTaskMyTask.cpp
     )

     target_link_libraries(FlightTaskMyTask PUBLIC FlightTask)
     target_include_directories(FlightTaskMyTask PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
     ```

4. Update the header file (in this case **FlightTaskMyTask.hpp**):
   Most tasks reimplement the virtual methods `activate()` and `update()`, and in this example we also have a private variable.

   ```cpp
   #pragma once

   #include "FlightTask.hpp"

   class FlightTaskMyTask : public FlightTask
   {
   public:
     FlightTaskMyTask() = default;
     virtual ~FlightTaskMyTask() = default;

     bool update();
     bool activate(const trajectory_setpoint_s &last_setpoint) override;

   private:
     float _origin_z{0.f};
   };
   ```

5. Оновіть cpp файли відповідно.
   This example provides as simple implementation of **FlightTaskMyTask.cpp** that simply indicates that the task methods are called.

   ```cpp
   #include "FlightTaskMyTask.hpp"

   bool FlightTaskMyTask::activate(const trajectory_setpoint_s &last_setpoint)
   {
     bool ret = FlightTask::activate(last_setpoint);
     PX4_INFO("FlightTaskMyTask activate was called! ret: %d", ret); // report if activation was successful
     return ret;
   }

   bool FlightTaskMyTask::update()
   {
     PX4_INFO("FlightTaskMyTask update was called!"); // report update
     return true;
   }
   ```

6. Add the new task to the list of tasks to be built in [PX4-Autopilot/src/modules/flight_mode_manager/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/flight_mode_manager/CMakeLists.txt#L41).

   ```cmake
   ...
    list(APPEND flight_tasks_all
      Auto
      Descend
      ...
      ManualPositionSmoothVel
      Transition
      MyTask
    )
   ...
   ```

   ::: tip

   The task added above will be built on all boards, including those with constrained flash such as Pixhawk FMUv2.
   If your task is not indended for use on boards with constrained flash it should instead be added to the conditional block shown below (as shown).

   ```cmake
   ...
   if(NOT px4_constrained_flash_build)
      list(APPEND flight_tasks_all
        AutoFollowTarget
        Orbit
        MyTask
      )
    endif()
   ...
   ```


:::

7. Оновіть режим польоту, щоб переконатися, що завдання було викликано.
   Зазвичай для обрання певного польотного завдання використовується параметр.

   For example, to enable our new `MyTask` in multicopter Position mode:

   - Update `MPC_POS_MODE` ([multicopter_position_mode_params.c](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/mc_pos_control/multicopter_position_mode_params.c)) to add an option for selecting "MyTask" if the parameter has a previously unused value like 5:

     ```c
     ...
      * @value 0 Direct velocity
      * @value 3 Smoothed velocity
      * @value 4 Acceleration based
      * @value 5 My task
      * @group Multicopter Position Control
      */
     PARAM_DEFINE_INT32(MPC_POS_MODE, 5);
     ```

   - Add a case for your new option in the switch for the parameter [FlightModeManager.cpp](https://github.com/PX4/PX4-Autopilot/blob/main/src/modules/flight_mode_manager/FlightModeManager.cpp#L266-L285) to enable the task when `_param_mpc_pos_mode` has the right value.

     ```cpp
     ...
     // manual position control
     ...
     switch (_param_mpc_pos_mode.get()) {
       ...
       case 3:
          error = switchTask(FlightTaskIndex::ManualPositionSmoothVel);
          break;
       case 5: // Add case for new task: MyTask
          error = switchTask(FlightTaskIndex::MyTask);
          break;
     case 4:
     ....
     ...
     ```

## Перевірка нового польотного завдання

Щоб перевірити польотне завдання треба запустити рухомий засіб з увімкненим завданням.
For the example above, this means setting the parameter `MPC_POS_MODE` to 5, taking off, and switching the vehicle to [Position mode](../flight_modes_mc/position.md).

:::info
The task defined above should only be tested on the simulator.
Код не створює заданих значень, тому засіб не полетить.
:::

Зберіть симуляцію SITL (gazebo-classic)

```sh
make px4_sitl gazebo-classic
```

Відкрийте QGroundControl (якщо не відкрито, жодне повідомлення не буде надруковано).
В консолі, злетіть та перемкніться у режим позиціювання:

```sh
pxh> commander takeoff
pxh> commander mode posctl
```

The console will continuously display: `INFO [FlightTaskMyTask] FlightTaskMyTask update was called!`.
If you want to change to another flight mode, you can type a command to change the mode, such as `commander mode altctl`.

## Відео

Наступні відео дають огляд польотних завдань в PX4.
Перше охоплює стан програмного каркаса для польотних завдань в PX4 v1.9.
Друге - це оновлення, яке охоплює зміни в PX4 v1.11.

### Огляд архітектури польотних завдань PX4 (PX4 Developer Summit 2019)

Опис того, як працюють режими польоту у PX4 v1.9 (Dennis Mannhart, Matthias Grob).

<lite-youtube videoid="-dkQG8YLffc" title="PX4 Flight Task Architecture Overview"/>

<!-- datestamp:video:youtube:20190704:PX4 Flight Task Architecture Overview — PX4 Developer Summit 2019 -->

### Огляд управління мультикоптером від датчиків до двигунів (PX4 Developer Summit Virtual 2020)

<lite-youtube videoid="orvng_11ngQ" params="start=560" title="Overview of multicopter control from sensors to motors"/>

<!-- datestamp:video:youtube:20200720:Overview of multicopter control from sensors to motors — PX4 Developer Summit Virtual 2020 From 9min20sec - Section on flight tasks-->

Відповідний розділ цього відео з оновленою інформацією про польотні завдання в PX4 v11.1 на (9 мін. 20 сек.).
The [slides can be found here (PDF)](https://static.sched.com/hosted_files/px4developersummitvirtual2020/1b/PX4%20Developer%20Summit%202020%20-%20Overview%20of%20multicopter%20control%20from%20sensors%20to%20motors.pdf) - Slides 9 and 12 are relevant.
