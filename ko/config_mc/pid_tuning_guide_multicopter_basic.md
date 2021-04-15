# 멀티콥터 PID 튜닝 가이드

이 튜토리얼은 모든 [멀티콥터 설정](../airframes/airframe_reference.md#copter) (Quads, Hexa, Octo 등)에 대해 PX4에서 PID 루프를 조정하는 방법을 설명합니다.

비교적 작은 하드웨어와 어셈블리 변경이 최적의 비행  튜닝 게인에 영향을 미치므로,  새로운 기체 설정에 튜닝이 권장됩니다. 예를 들어, 새로운 ESC 또는 모터에는 다른 튜닝 게인이 필요합니다.

:::tip
일반적으로 적절한 [지원되는 기체 구성](../airframes/airframe_reference.md#copter) ([QGroundControl >기체 ](../config/airframe.md)에서 선택)을 사용하는 경우 기본 튜닝을 통해 기체를 안전하게 비행할 수 있습니다. _최고의_ 성능을 얻으려면 새 기체를 튜닝하는 것이 좋습니다.
:::

:::warning
잘못 튜닝된 기체는 불안정하고 충돌하기 쉽습니다. [킬 스위치](../config/safety.md#emergency-switches)를 지정했는 지 확인하십시오.
:::

## 소개

PX4는 **P**roportional, **I**ntegral, **D**erivative (PID) 컨트롤러를 사용합니다 (보편화된 제어 기술).

_QGroundControl_ **PID 튜닝** 설정은 기체 설정점과 응답 곡선의 실시간 플롯을 제공합니다. 튜닝의 목표는 _Response_ 곡선이 _Setpoint_ 곡선과 최대한 가깝게 일치하도록 P/I/D 값을 설정하는 것입니다 (예 : 오버슈트없는 빠른 응답).

![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)

컨트롤러는 계층화되어 있어 상위 수준의 컨트롤러 결과를 하위 수준의 컨트롤러로 전달합니다. 가장 낮은 수준의 컨트롤러는 **속도 컨트롤러**, **태도 컨트롤러**, 마지막으로 **속도 & 위치 컨트롤러** 입니다. PID 튜닝은 다른 모든 컨트롤러에 영향을 미치므로 속도 컨트롤러부터 시작하여 동일한 순서로 수행해야합니다.

각 컨트롤러 (속도, 자세, 속도/위치) 및 축 (요, 롤, 피치)에 대한 테스트 절차는 항상 동일합니다. 스틱을 매우 빠르게 움직여 빠른 설정값을 변경하고 응답을 관찰합니다. 그런 다음 슬라이더 (아래 설명 참조)를 조정하여 설정점에 대한 응답 추적을 개선합니다.

:::tip
- 속도 컨트롤러 조정이 가장 중요하며 잘 조정된 경우 다른 컨트롤러는 종종 약간의 조정만 필요하거나 필요하지 않습니다.
- 일반적으로 롤 및 피치에 동일한 튜닝 게인을 사용할 수 있습니다.
- 곡예/안정화/고도 모드를 사용하여 속도 컨트롤러 조정
- [위치 모드](../flight_modes/position_mc.md)를 사용하여 *속도 컨트롤러* 및 *위치 컨트롤러*를 조정합니다. 단계 입력을 생성할 수 있도록 *단순 위치 제어* 모드로 전환하여야 합니다. ![QGC PID tuning: Simple control selector](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)
:::

## 전제 조건:

- QGroundControl [ **일일 빌드**](https://docs.qgroundcontrol.com/master/en/releases/daily_builds.html)를 사용 중입니다 (최신 튜닝 UI는 2021년 3월 이후의 다음 릴리스 빌드에 있을 예정입니다).
- 기체에 가장 일치하는 [기본 기체 구성](../config/airframe.md)을 선택하였습니다. 이것은 이미 비행한 기체를 제공할 것입니다.
- You should have done an [ESC calibration](../advanced_config/esc_calibration.md).
- If using PWM output: [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) is set correctly. It needs to be set low, but such that the **motors never stop** when the vehicle is armed.

  This can be tested in [Acro mode](../flight_modes/acro_mc.md) or in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md):
  - Remove propellers
  - Arm the vehicle and lower the throttle to the minimum
  - Tilt the vehicle to all directions, about 60 degrees
  - Check that no motors turn off
- Use a high-rate telemetry link such as WiFi if at all possible (a typical low-range telemetry radio is not fast enough for real-time feedback and plots). This is particularly important for the rate controller.
- Disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) before tuning a vehicle (there is an options for this in the PID tuning screen).

## Tuning Procedure

The tuning procedure is:

1. Arm the vehicle, takeoff, and hover (typically in [Position mode](../flight_modes/position_mc.md)).
1. Open _QGroundControl_ **Vehicle Setup > PID Tuning** ![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)
1. Select the **Rate Controller** tab.
1. Confirm that the airmode selector is set to **Disabled**
1. Set the *Thrust curve* value to: 0.3 (PWM, power-based controllers) or 1 (RPM-based ESCs)

:::note
For PWM, power-based and (some) UAVCAN speed controllers, the control signal to thrust relationship may not be linear. As a result, the optimal tuning at hover thrust may not be ideal when the vehicle is operating at higher thrust.

   The thrust curve value can be used to compensate for this non-linearity:
   - For PWM controllers, 0.3 is a good default (which may benefit from [further tuning](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve)).
   - For RPM-based controllers, use 1 (no further tuning is required as these have a quadratic thrust curve).

   For more information see the [detailed PID tuning guide](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve).
:::
1. Set the *Select Tuning* radio button to: **Roll**.
1. (Optionally) Select the **Automatic Flight Mode Switching** checkbox. This will _automatically_ switch from [Position mode](../flight_modes/position_mc.md) to [Stabilised mode](../flight_modes/manual_stabilized_mc.md) when you press the **Start** button
1. For rate controller tuning switch to *Acro mode*, *Stabilized mode* or *Altitude mode* (unless automatic switching is enabled).
1. Select the **Start** button in order to start tracking the setpoint and response curves.
1. Rapidly move the *roll stick* full range and observe the step response on the plots. :::tip Stop tracking to enable easier inspection of the plots. This happens automatically when you zoom/pan. Use the **Start** button to restart the plots, and **Clear** to reset them.
:::
1. Modify the three PID values using the sliders (for roll rate-tuning these affect `MC_ROLLRATE_K`, `MC_ROLLRATE_I`, `MC_ROLLRATE_D`) and observe the step response again. The values are saved to the vehicle as soon as the sliders are moved. :::note The goal is for the _Response_ curve to match the _Setpoint_ curve as closely as possible (i.e. a fast response without overshoots). ::: The PID values can be adjusted as follows:
   - P (proportional) or K gain:
     - increase this for more responsiveness
     - reduce if the response is overshooting and/or oscillating (up to a certain point increasing the D gain also helps).
   - D (derivative) gain:
     - this can be increased to dampen overshoots and oscillations
     - increase this only as much as needed, as it amplifies noise (and can lead to hot motors)
   - I (integral) gain:
     - used to reduce steady-state error
     - if too low, the response might never reach the setpoint (e.g. in wind)
     - if too high, slow oscillations can occur
1. Repeat the tuning process above for the pitch and yaw:
   - Use *Select Tuning* radio button to select the axis to tune
   - Move the appropriate sticks (i.e. pitch stick for pitch, yaw stick for yaw).
   - For pitch tuning, start with the same values as for roll. :::tip Use the **Save to Clipboard** and **Reset from Clipboard** buttons to copy the roll settings for initial pitch settings.
:::
1. Repeat the tuning process for the attitude controller on all the axes.
1. Repeat the tuning process for the velocity and positions controllers (on all the axes).
   - Use Position mode when tuning these controllers
   - Select the **Simple position control** option in the *Position control mode ...* selector (this allows direct control for the generation of step inputs)

     ![QGC PID tuning: Simple control selector](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)

All done! Remember to re-enable airmode before leaving the setup.
