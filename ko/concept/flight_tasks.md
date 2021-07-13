# 비행 작업

*비행 작업*은 [비행 모드](../concept/flight_modes.md)에서 정해진 이동 동작(예: 사람 추적, 비행 평활화)을 수행합니다.


## 개요

비행 작업은 기본 클래스 [FlightTask](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/tasks/FlightTask/FlightTask.hpp)에서 파생된 비행 작업 프레임워크의 클래스입니다. 목표는 각 작업이 특정 모드의 기체 동작을 구현하는 임의의 입력 데이터에서 콘트롤러에 대한 설정값을 생성하는 것입니다. 프로그래머는 일반적으로 기본 작업의 최소 구현을 호출하고 원하는 동작의 구현으로 확장하여 `activate()` 및 `update()` 가상 메서드를 재정의합니다. `activate()` 메서드는 작업 전환시에 호출되며, 상태를 초기화하고 이전 작업이 방금 적용한 전달된 설정점에서 부드럽게 인계되도록 합니다.

`update()`는 실행 중 모든 루프 반복에서 호출되며, 설정값을 생성하는 핵심 기능을 구현합니다.

규칙에 따라 작업은 작업 이름을 따서 명명된 [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/flight_mode_manager/tasks)의 하위 폴더에 포함되며, 소스 파일에는 접두사 "FlightTask"로 이름이 지정됩니다.

:::note PX4 개발자 회의의 비디오 개요는 [아래에서](#video)  제공합니다.
:::


## 비행 작업 생성

아래 지침을 사용하여 *MyTask*라는 작업을 만들 수 있습니다.

1. [PX4-Autopilot/src/modules/flight_mode_manager/tasks](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/flight_mode_manager/tasks)에 새 비행 작업에 대한 디렉터리를 생성합니다. 규칙에 따라 디렉토리 이름은 작업 이름을 따서 지정되므로 **/MyTask**라고 합니다.
   ```
   mkdir PX4-Autopilot/src/lib/flight_tasks/tasks/MyTask
   ```
2. "FlightTask" 접두사를 사용하여 *MyTask* 디렉토리에 새 비행 작업에 대한 빈 소스 코드 및 *cmake* 파일을 만듭니다.
   - CMakeLists.txt
   - FlightTaskMyTask.hpp
   - FlightTaskMyTask.cpp
3. Update **CMakeLists.txt** for the new task
   - Copy the contents of the **CMakeLists.txt** for another task - e.g. [Orbit/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/tasks/Orbit/CMakeLists.txt)
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
     PX4_INFO("FlightTaskMyTask activate was called! ret: %d", ret); // report if activation was succesful
     return ret;
   }

   bool FlightTaskMyTask::update()
   {
     PX4_INFO("FlightTaskMyTask update was called!"); // report update
     return true;
   }
   ```
5. Add the new task to the list of tasks to be built in [PX4-Autopilot/src/modules/flight_mode_manager/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/CMakeLists.txt#L40):
   ```
   list(APPEND flight_tasks_to_add
      Orbit
      MyTask
   )
   )
   ```
6. Update a flight mode to ensure that the task is called. Usually a parameter is used to select when a particular flight task should be used.

   For example, to enable our new `MyTask` in multicopter Position mode:
   - Update `MPC_POS_MODE` ([mc_pos_control_params.c](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mc_pos_control/mc_pos_control_params.c#L706-L721)) to add an option for selecting "MyTask" if the parameter has a previously unused value like 5:
     ```
     ...
     * @value 4 Acceleration based input
     * @value 5 MyTask position mode implementation
     * @group Multicopter Position Control
     */
     PARAM_DEFINE_INT32(MPC_POS_MODE, 4);
     ```
   - Add a case for your new option in the switch for the parameter [FlightModeManager.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/FlightModeManager.cpp#L266-L285) to enable the task when `_param_mpc_pos_mode` has the right value.
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
          error =  _flight_tasks.switchTask(FlightTaskIndex::MyTask);
          break;
    case 4:
    ....
     ...
     ```


## Test New Flight Task

To test the flight task you need to run the vehicle with the task enabled. For the example above, this means setting the parameter `MPC_POS_MODE` to 5, taking off, and switching the vehicle to [Position mode](../flight_modes/position_mc.md).

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

The relevent section of this video is an update of flight tasks in PX4 v11.1 at (9min 20sec). The [slides can be found here (PDF)](https://static.sched.com/hosted_files/px4developersummitvirtual2020/1b/PX4%20Developer%20Summit%202020%20-%20Overview%20of%20multicopter%20control%20from%20sensors%20to%20motors.pdf) - Slides 9 and 12 are relevant.
