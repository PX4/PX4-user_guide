---
canonicalUrl: https://docs.px4.io/main/ko/concept/flight_tasks
---

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
3. 새 작업을 위해 **CMakeLists.txt** 업데이트 합니다.
   - 다른 작업(예: [Orbit/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/tasks/Orbit/CMakeLists.txt))을 위해 **CMakeLists.txt**의 내용을 복사합니다.
   - 현재 연도로 저작권을 업데이트 합니다.
     ```cmake   
     ############################################################################
     #
     #   Copyright (c) 2021 PX4 Development Team. All rights reserved.
     #
     ```
   - 새 작업을 반영하도록 코드를 수정하십시오. 예: `FlightTaskOrbit`를 `FlightTaskMyTask`로 변경합니다. 코드는 아래와 같습니다.
     ```cmake 
     px4_add_library(FlightTaskMyTask
         FlightTaskMyTask.cpp
     )

     target_link_libraries(FlightTaskMyTask PUBLIC FlightTask)
     target_include_directories(FlightTaskMyTask PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
     ```

4. 헤더 파일 업데이트(이 경우 **FlightTaskMyTask.hpp**): 대부분의 작업은 가상 메서드 `activate()` 및 `update()`를 다시 구현하며, 이 예에서는 개인 변수도 있습니다.
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
4. cpp 파일을 적절하게 업데이트 합니다. 이 예는 단순히 작업 메서드가 호출되었음을 나타내는 **FlightTaskMyTask.cpp**의 간단한 구현을 제공합니다.
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
5. [PX4-Autopilot/src/modules/flight_mode_manager/CMakeLists.txt](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/CMakeLists.txt#L40)에 새 작업을 빌드할 작업 목록에 추가합니다.
   ```
   list(APPEND flight_tasks_to_add
      Orbit
      MyTask
   )
   )
   ```
6. 작업이 호출되도록 비행 모드를 업데이트합니다. 일반적으로, 매개변수는 특정 비행 작업을 사용해야 하는 시기를 선택합니다.

   예를 들어, 멀티콥터 위치 모드에서 새로운 `MyTask`를 활성화하려면:
   - 매개변수에 5와 같이 이전에 사용하지 않은 값이 있는 경우 "MyTask"를 선택하는 옵션을 추가하려면 `MPC_POS_MODE`([mc_pos_control_params.c](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/mc_pos_control/mc_pos_control_params.c#L706-L721))를 업데이트 하십시오.
     ```
     ...
     * @value 4 Acceleration based input
     * @value 5 MyTask position mode implementation
     * @group Multicopter Position Control
     */
     PARAM_DEFINE_INT32(MPC_POS_MODE, 4);
     ```
   - `_param_mpc_pos_mode`에 올바른 값이 있을 때 작업을 활성화하려면 [FlightModeManager.cpp](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/flight_mode_manager/FlightModeManager.cpp#L266-L285) 매개변수의 스위치에 새 옵션에 대한 사례를 추가하십시오.
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


## 신규 비행 작업 테스트

비행 작업을 테스트하려면, 작업이 활성화된 상태에서 기체를 실행하여야 합니다. 위의 예에서 이것은 매개변수 `MPC_POS_MODE`를 5로 설정하고 이륙하고 차량을 [위치 모드](../flight_modes/position_mc.md)로 전환하는 것을 의미합니다.

:::note
위에 정의된 작업은 시뮬레이터에서만 테스트하여야 합니다. 코드는 실제로 설정값을 생성하지 않으므로 기체는 비행하지 않습니다.
:::


## 비디오

다음 비디오는 PX4의 비행 작업에 대한 개요를 제공합니다. 첫 번째는 PX4 v1.9의 비행 작업 프레임워크 상태를 다룹니다. 두 번째는 PX4 v1.11의 변경 사항을 다루는 업데이트입니다.

#### PX4 Flight Task Architecture 개요(PX4 개발자 회의 2019)

PX4 v1.9의 비행 모드 작동 방식 설명(Dennis Mannhart, Matthias Grob).

@[유투브](https://youtu.be/-dkQG8YLffc) <!-- datestamp:video:youtube:20190704:PX4 Flight Task Architecture Overview — PX4 Developer Summit 2019 -->

#### 센서에서 모터에 이르는 멀티콥터 제어 개요(PX4 가상 개발자 회의 2020)

@[유투브](https://youtu.be/orvng_11ngQ?t=560) <!-- datestamp:video:youtube:20200720:Overview of multicopter control from sensors to motors — PX4 Developer Summit Virtual 2020 From 9min20sec - Section on flight tasks-->

이 비디오의 관련 섹션은 (9분 20초) PX4 v11.1의 비행 작업 업데이트입니다. [슬라이드는 이 PDF을 참고하십시오.](https://static.sched.com/hosted_files/px4developersummitvirtual2020/1b/PX4%20Developer%20Summit%202020%20-%20Overview%20of%20multicopter%20control%20from%20sensors%20to%20motors.pdf) - 슬라이드 9와 12가 관련이 있습니다.
