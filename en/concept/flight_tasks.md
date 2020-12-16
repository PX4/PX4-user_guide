# Flight Tasks

*Flight Tasks* are used within [Flight Modes](../concept/flight_modes.md) to provide specific movement behaviours: e.g. follow me, or flight smoothing.

At time of writing the best description of how flight modes work (in PX4 v1.9) is provided in the following video: **PX4 Flight Task Architecture Overview** - Dennis Mannhart, Matthias Grob (*PX4 Developer Summit 2019*).

{% youtube %}
https://youtu.be/-dkQG8YLffc
{% endyoutube %}

## Create and Test new flight task
Description for creating and testing your own flight task.
In this tutorial, the name of the flight task supposes "Test".

### Steps Overview 
#### Create flight task
- Create a directory named with new flight task in `PX4-Autopilot/src/lib/flight_tasks/tasks`
- Create files for new flight task
  - CMakeLists.txt
  - FlightTaskTest.hpp
  - FlightTaskTest.cpp
- Edit CMakeLists.txt
- Edit .hpp and .cpp files
- Edit mc_pos_control_params.c in `PX4-Autopilot/src/modules/mc_pos_control`
- Edit mc_pos_control_main.cpp in `PX4-Autopilot/src/modules/mc_pos_control`
- Edit CMakeLists.txt in `PX4-Autopilot/src/lib/flight_tasks`

#### Test flight task
- Build firmware and launch SITL on gazebo
- Launch QGC
  - Enable virtual joystick, if you have not already configured.
- Launch mavros ( connect SITL and QGC via mavros )
- Set parameter `MPC_POS_MODE` for new flight task
- Takeoff the vehicle
- Switch into Position flight mode. ( new flight task should be applied. )

### Details
#### Create flight task
- Create a directory named with new flight task in `PX4-Autopilot/src/lib/flight_tasks/tasks`  
Create a directory for new flight task.  
    ```:
    (e.g.) mkdir -p PX4-Autopilot/src/lib/flight_tasks/tasks/Test
    ```

- Create files for new flight task  
Create files in `PX4-Autopilot/src/lib/flight_tasks/tasks/Test` with names below.  
  - CMakeLists.txt
  - FlightTaskTest.hpp
  - FlightTaskTest.cpp

- Edit CMakeLists.txt  
  Copy and paste contents below.  
    <details>
        <summary>CMakeList.txt</summary>

        ############################################################################
        #
        #   Copyright (c) 2018 PX4 Development Team. All rights reserved.
        #
        # Redistribution and use in source and binary forms, with or without
        # modification, are permitted provided that the following conditions
        # are met:
        #
        # 1. Redistributions of source code must retain the above copyright
        #    notice, this list of conditions and the following disclaimer.
        # 2. Redistributions in binary form must reproduce the above copyright
        #    notice, this list of conditions and the following disclaimer in
        #    the documentation and/or other materials provided with the
        #    distribution.
        # 3. Neither the name PX4 nor the names of its contributors may be
        #    used to endorse or promote products derived from this software
        #    without specific prior written permission.
        #
        # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
        # "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
        # LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
        # FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
        # COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
        # INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
        # BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
        # OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
        # AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
        # LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
        # ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
        # POSSIBILITY OF SUCH DAMAGE.
        #
        ############################################################################

        px4_add_library(FlightTaskTest
          FlightTaskTest.cpp
        )

        target_link_libraries(FlightTaskTest PUBLIC FlightTask)
        target_include_directories(FlightTaskTest PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

    </details>

- Edit .hpp and .cpp files  
  Copy and paste contents below.  
  <details>
      <summary>FlightTaskTest.hpp</summary>

      #pragma once

      #include "FlightTask.hpp"

      class FlightTaskTest : public FlightTask
      {
      public:
        FlightTaskTest() = default;
        virtual ~FlightTaskTest() = default;

        bool update();
        bool activate(vehicle_local_position_setpoint_s last_setpoint);


      private:
        float _origin_z = 0.0f;
      };

  </details>
  <details>
      <summary>FlightTaskTest.cpp</summary>

      #include "FlightTaskTest.hpp"


      bool FlightTaskTest::activate(vehicle_local_position_setpoint_s last_setpoint)
      {
        bool ret = FlightTask::activate(last_setpoint);

        _position_setpoint(0) = _position(0);
        _position_setpoint(1) = _position(1);

        _origin_z = _position(2);

        _yawspeed_setpoint = 45.0f * 3.142f / 180.f;
        _velocity_setpoint(2) = -1.0f; // NED frame

        PX4_INFO("FlightTaskTest activate was called! ret:%d", ret); // for check if engaged this mode.
        return ret;
      }

      bool FlightTaskTest::update()
      {
        float diff_z = _position(2) - _origin_z;

        if (diff_z <= -8.0f) {
          _velocity_setpoint(2) = 1.0f;
          _yawspeed_setpoint = 45.0f * 3.142f / 180.f * -1.0f;

        } else if (diff_z < 0.0f) {
          _velocity_setpoint(2) = -1.0f;
          _yawspeed_setpoint = 45.0f * 3.142f / 180.f;

        }

        return true;
      }

  </details>

- Edit mc_pos_control_params.c in `PX4-Autopilot/src/modules/mc_pos_control`  
  Add value for Manual-Position control sub-mode.  
  Add a line like `@value 2 Test`, since value 2 is not used yet.
  <details>
      <summary>Example</summary>
  
      /**
       * Manual-Position control sub-mode
       *
       * The supported sub-modes are:
       * 0 Simple position control where sticks map directly to velocity setpoints
       *   without smoothing. Useful for velocity control tuning.
       * 1 Smooth position control with maximum acceleration and jerk limits based on slew-rates.
       * 3 Smooth position control with maximum acceleration and jerk limits based on
       *   jerk optimized trajectory generator (different algorithm than 1).
       *
       * @value 0 Simple position control
       * @value 1 Smooth position control
       * @value 2 Test
       * @value 3 Smooth position control (Jerk optimized)
       * @group Multicopter Position Control
       */
       PARAM_DEFINE_INT32(MPC_POS_MODE, 3);
    
  </details>
  
- Edit mc_pos_control_main.cpp in `PX4-Autopilot/src/modules/mc_pos_control`  
  Add switch case in the switch statement for param `MPC_POS_MODE`  
  ```c++
  case 2:
    error = _flight_tasks.switchTask(FlightTaskIndex::Test);
    break;
  ```
  <details>
    <summary>Example</summary>
  
      // manual position control
      if (_vehicle_status.nav_state == vehicle_status_s::NAVIGATION_STATE_POSCTL || task_failure) {
        should_disable_task = false;
        FlightTaskError error = FlightTaskError::NoError;

        switch (_param_mpc_pos_mode.get()) {
        case 1:
          error =  _flight_tasks.switchTask(FlightTaskIndex::ManualPositionSmooth);
          break;

        case 2:
          error =  _flight_tasks.switchTask(FlightTaskIndex::Test);
          break;

        case 3:
          error =  _flight_tasks.switchTask(FlightTaskIndex::ManualPositionSmoothVel);
          break;

        default:
          error =  _flight_tasks.switchTask(FlightTaskIndex::ManualPosition);
          break;
        }

        if (error != FlightTaskError::NoError) {
          if (prev_failure_count == 0) {
            PX4_WARN("Position-Ctrl activation failed with error: %s", _flight_tasks.errorToString(error));
          }

          task_failure = true;
          _task_failure_count++;

        } else {
          check_failure(task_failure, vehicle_status_s::NAVIGATION_STATE_POSCTL);
          task_failure = false;
        }
      }
  </details>
  
- Edit CMakeLists.txt in `PX4-Autopilot/src/lib/flight_tasks`  
  Add the name of the new flight task's directory to core flight task list.  
  In this case, the name is `Test`  
  <details>
      <summary>Example</summary>
  
      # add core flight tasks to list
      list(APPEND flight_tasks_all
        ManualAltitude
        ManualAltitudeSmooth
        ManualAltitudeSmoothVel
        ManualPosition
        ManualPositionSmooth
        ManualPositionSmoothVel
        AutoLineSmoothVel
        AutoFollowMe
        Offboard
        Failsafe
        Descend
        Transition
        Test
        ${flight_tasks_to_add}
      )
  </details>

#### Test flight task  
- Build firmware and launch SITL on gazebo    
  cd into PX4-Autopilot directory. Then, build firmware and launch gazebo with command below.  
  ```
  make px4_sitl gazebo
  ```
  
- Launch QGC  
  - Launch QGC.  
    If you do not have it, download from [here](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html).  
  - Enable virtual joystick, if you have not already configured.  
    - Open `Application Settings` window. ( Click QGC icon on the top-left of the window. )  
    - Open `General` tab.  
    - Check `Virtual joystick` and `Auto-Center Throttle` in `Fly View`.  

- Launch mavros ( connect SITL and QGC via mavros )  
  Launch mavros with command below.  
  ※you should replace `x.x.x.x` of gcs_url to your computer's IP address which is running QGC.  
  ```
  roslaunch mavros px4.launch fcu_url:="udp://:14540@localhost:14557" gcs_url:="udp://@x.x.x.x"
  ```
  <details>
    <summary>Tips</summary>
  
    - Check connection to SITL  
      Type command below on a terminal.  
      ```
      rostopic echo /mavros/state
      ```
      If you can see outputs like below, SITL has connected to mavros properly.  
      ```
      ---
      header: 
        seq: 17206
        stamp: 
          secs: 1608138069
          nsecs: 991425650
        frame_id: ''
      connected: True
      armed: False
      guided: False
      manual_input: True
      mode: "MANUAL"
      system_status: 3
      ```
    - Make sure that QGC is connected to SITL  
      you can see vehicle's information on QGC, if SITL is connected properly.  

  </details>
  
- Set parameter `MPC_POS_MODE` for new flight task  
  Set parameter `MPC_POS_MODE` to `2`(as we decided in previous step) by mavparam.  
  ```
  rosrun mavros mavparam set MPC_POS_MODE 2
  ```
  You can check if the parameter has set properly with command below.  
  ```
  rosrun mavros mavparam get MPC_POS_MODE
  ```
  Or you can set this parameter from QGC. (But the name of new flight task is not been reflected on QGC. You should select the third option from the top. )  
  
- Takeoff the vehicle  
  Make your vehicle take off. ( You can do that from QGC with Takeoff button. )  
  Your vehicle should keep being in the air to properly complete activate function of new flight task in the next step. ( e.g. Hold Mode )  
  
- Switch into Position flight mode. ( new flight task should be applied. )  
  Switch into Position flight mode by selecting `Position` on QGC.    
  Finally, your vehicle should behave going up changing its yaw.  
