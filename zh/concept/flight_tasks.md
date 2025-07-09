---
canonicalUrl: https://docs.px4.io/main/zh/concept/flight_tasks
---

# 飞行任务

*飞行任务* 在 [飞行模式](../concept/flight_modes.md) 中用于提供具体的移动行为：例如跟随或飞行平滑。


## Overview

A flight task is a class in the flight task framework derived from the base class [FlightTask](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/flight_mode_manager/tasks/FlightTask/FlightTask.hpp). Its goal is to generate setpoints for the controller from arbitrary input data, where each task implements the desired vehicle behavior for a specific mode. Programmers typically override the `activate()` and `update()` virtual methods by calling the base task's minimal implementation and extending with the implementation of the desired behavior. The `activate()` method is called when switching to the task and allows to initialize its state and take over gently from the passed over setpoints the previous task was just applying.

{% youtube %}

By convention tasks are contained in a subfolder of [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/flight_mode_manager/tasks) named after the task, and the source files are named with the prefix "FlightTask".

:::note
Video overviews from PX4 developer summits are [provided below](#video).
:::


## Creating a Flight Task

The instructions below might be used to create a task named *MyTask*:

1. Create a directory for the new flight task in [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/modules/flight_mode_manager/tasks). By convention the directory is named after the task, so we will call it **/MyTask**.
   ```
   mkdir PX4-Autopilot/src/modules/flight_mode_manager/tasks/MyTask
   ```
2. Create empty source code and *cmake* files for the new flight task in the *MyTask* directory using the prefix "FlightTask":
   - CMakeLists.txt
   - FlightTaskMyTask.hpp
   - FlightTaskMyTask.cpp
3. Update **CMakeLists.txt** for the new task
   - Copy the contents of the **CMakeLists.txt** for another task - e.g. [Orbit/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/flight_mode_manager/tasks/Orbit/CMakeLists.txt)
   - Update the copyright to the current year
     ```cmake   
     ############################################################################
     #
     #   Copyright (c) 2021 PX4 Development Team. All rights reserved.
     #
     ```
   - Modify the code to reflect the new task - e.g. replace `FlightTaskOrbit` with `FlightTaskMyTask`. The code will look something like this:
     ```cmake 
     px4_add_library(FlightTaskMyTask
         FlightTaskMyTask.cpp
     )

     target_link_libraries(FlightTaskMyTask PUBLIC FlightTask)
     target_include_directories(FlightTaskMyTask PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
     ```

4. Update the header file (in this case **FlightTaskMyTask.hpp**): Most tasks reimplement the virtual methods `activate()` and `update()`, and in this example we also have a private variable.
   ```cpp
   #pragma once

   #include "FlightTask.hpp"

   class FlightTaskMyTask : public FlightTask
   {
   public:
     FlightTaskMyTask() = default;
     virtual ~FlightTaskMyTask() = default;

     bool update();
     bool activate(vehicle_local_position_setpoint_s last_setpoint);

   private:
     float _origin_z{0.f};
   };
   ```
4. Update the cpp file as appropriate. This example provides as simple implementation of **FlightTaskMyTask.cpp** that simply indicates that the task methods are called.
   ```cpp
   #include "FlightTaskMyTask.hpp"

   bool FlightTaskMyTask::activate(vehicle_local_position_setpoint_s last_setpoint)
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
5. Add the new task to the list of tasks to be built in [PX4-Autopilot/src/modules/flight_mode_manager/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/flight_mode_manager/CMakeLists.txt#L40):
   ```
   list(APPEND flight_tasks_to_add
      Orbit
      MyTask
   )
   ```
6. Update a flight mode to ensure that the task is called. Usually a parameter is used to select when a particular flight task should be used.

   For example, to enable our new `MyTask` in multicopter Position mode:
   - Update `MPC_POS_MODE` ([multicopter_position_mode_params.c](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/mc_pos_control/multicopter_position_mode_params.c)) to add an option for selecting "MyTask" if the parameter has a previously unused value like 5:
     ```
     ...
      * @value 0 Direct velocity
      * @value 3 Smoothed velocity
      * @value 4 Acceleration based
      * @group Multicopter Position Control
      */
     PARAM_DEFINE_INT32(MPC_POS_MODE, 4);
     ```
   - Add a case for your new option in the switch for the parameter [FlightModeManager.cpp](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/modules/flight_mode_manager/FlightModeManager.cpp#L266-L285) to enable the task when `_param_mpc_pos_mode` has the right value.
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


## Test New Flight Task

To test the flight task you need to run the vehicle with the task enabled. For the example above, this means setting the parameter `MPC_POS_MODE` to 5, taking off, and switching the vehicle to [Position mode](../flight_modes_mc/position.md).

:::note
The task defined above should only be tested on the simulator. The code doesn't actually create setpoints so the vehicle will not fly.
:::


## Video

The following videos provide an overview of flight tasks in PX4. The first covers the state of the flight task framework in PX4 v1.9. The second is an update, which covers the changes in PX4 v1.11.

#### PX4 Flight Task Architecture Overview (PX4 Developer Summit 2019)

A description of how flight modes work in PX4 v1.9 (Dennis Mannhart, Matthias Grob).

@[youtube](https://youtu.be/-dkQG8YLffc) <!-- datestamp:video:youtube:20190704:PX4 Flight Task Architecture Overview — PX4 Developer Summit 2019 -->

#### Overview of multicopter control from sensors to motors (PX4 Developer Summit Virtual 2020)

@[youtube](https://youtu.be/orvng_11ngQ?t=560) <!-- datestamp:video:youtube:20200720:Overview of multicopter control from sensors to motors — PX4 Developer Summit Virtual 2020 From 9min20sec - Section on flight tasks-->

The relevant section of this video is an update of flight tasks in PX4 v11.1 at (9min 20sec). The [slides can be found here (PDF)](https://static.sched.com/hosted_files/px4developersummitvirtual2020/1b/PX4%20Developer%20Summit%202020%20-%20Overview%20of%20multicopter%20control%20from%20sensors%20to%20motors.pdf) - Slides 9 and 12 are relevant.
