# 멀티콥터 PID 튜닝 가이드

이 튜토리얼은 모든 [멀티콥터 설정](../airframes/airframe_reference.md#copter) (Quads, Hexa, Octo 등)에 대해 PX4에서 PID 루프를 조정하는 방법을 설명합니다.

비교적 작은 하드웨어와 어셈블리 변경이 최적의 비행  튜닝 게인에 영향을 미치므로,  새로운 기체 설정에 튜닝이 권장됩니다. 예를 들어, 새로운 ESC 또는 모터에는 다른 튜닝 게인이 필요합니다.
:::

:::tip
일반적으로 적절한 [지원되는 기체 구성](../airframes/airframe_reference.md#copter) ([QGroundControl >기체 ](../config/airframe.md)에서 선택)을 사용하는 경우 기본 튜닝을 통해 기체를 안전하게 비행할 수 있습니다. _최고의_ 성능을 얻으려면 새 기체를 튜닝하는 것이 좋습니다. For example, different ESCs or motors change the optimal tuning gains.


## 소개

PX4 uses **P**roportional, **I**ntegral, **D**erivative (PID) controllers (these are the most widespread control technique).

The _QGroundControl_ **PID Tuning** setup provides real-time plots of the vehicle setpoint and response curves. The goal of tuning is to set the P/I/D values such that the _Response_ curve matches the _Setpoint_ curve as closely as possible (i.e. a fast response without overshoots).

![QGC Rate Controller Tuning UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)

The controllers are layered, which means a higher-level controller passes its results to a lower-level controller. The lowest-level controller is the **rate controller**, followed by the **attitude controller**, and finally the **velocity & position controller**. The PID tuning needs to be done in this same order, starting with the rate controller, as it will affect all other controllers.

컨트롤러는 계층화되어 있어 상위 수준의 컨트롤러 결과를 하위 수준의 컨트롤러로 전달합니다. 가장 낮은 수준의 컨트롤러는 **속도 컨트롤러**, **태도 컨트롤러**, 마지막으로 **속도 & 위치 컨트롤러** 입니다.

:::tip
- 속도 컨트롤러 조정이 가장 중요하며 잘 조정된 경우 다른 컨트롤러는 종종 약간의 조정만 필요하거나 필요하지 않습니다.
- 일반적으로 롤 및 피치에 동일한 튜닝 게인을 사용할 수 있습니다.
- 곡예/안정화/고도 모드를 사용하여 속도 컨트롤러 조정
- [위치 모드](../flight_modes/position_mc.md)를 사용하여 *속도 컨트롤러* 및 *위치 컨트롤러*를 조정합니다. 단계 입력을 생성할 수 있도록 *단순 위치 제어* 모드로 전환하여야 합니다. ![QGC PID tuning: Simple control selector](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)
:::

## 전제 조건:

- You have selected the closest matching [default airframe configuration](../config/airframe.md) for your vehicle. This should give you a vehicle that already flies.
- You should have done an [ESC calibration](../advanced_config/esc_calibration.md).
- If using PWM output: [PWM_MAIN_MIN](../advanced_config/parameter_reference.md#PWM_MAIN_MIN) is set correctly. It needs to be set low, but such that the **motors never stop** when the vehicle is armed.

  This can be tested in [Acro mode](../flight_modes/acro_mc.md) or in [Manual/Stabilized mode](../flight_modes/manual_stabilized_mc.md):
  - Remove propellers
  - Arm the vehicle and lower the throttle to the minimum
  - Tilt the vehicle to all directions, about 60 degrees
  - Check that no motors turn off
- PWM 출력을 사용하는 경우 : [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN)이 올바르게 설정되었습니다. 낮게 설정해야하지만 기체 시동시에는 **모터가 절대 멈추지 않도록**합니다.
- Disable [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) before tuning a vehicle (there is an options for this in the PID tuning screen).

:::warning
Poorly tuned vehicles are likely to be unstable, and easy to crash. Make sure to have assigned a [Kill switch](../config/safety.md#emergency-switches).
:::

## 튜닝 절차

튜닝 절차는 다음과 같습니다.

1. 기체에 시동을 걸고, 이륙 호버링합니다 (일반적으로 [위치 모드](../flight_modes/position_mc.md)에서).
1. _QGroundControl_을 실행합니다. **차량 설정 > PID 튜닝** ![QGC 속도 컨트롤러 튜닝 UI](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_rate_controller.png)
1. **Rate Controller** 탭을 선택하십시오.
1. 에어 모드 선택기가 **사용 안함**으로 설정되어 있는 지 확인합니다.
1. *추력 곡선* 값을 0.3 (PWM, 전력 기반 컨트롤러) 또는 1 (RPM 기반 ESC)로 설정합니다.

   :::note PWM, 전력 기반 및 (일부) UAVCAN 속도 컨트롤러의 경우 추력 관계에 대한 제어 신호가 선형이 아닐 수 있습니다. 그 결과 호버 추력에서 최적의 튜닝은 차량이 강한 추력으로 작동시 최적이 아닐 수 있습니다.

   추력 곡선 값을 사용하여 비선형성을 보상할 수 있습니다.
   - PWM 컨트롤러의 경우 0.3이 좋은 기본값입니다 ([추가 조정](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve)의 이점을 누릴 수 있음).
   - RPM 기반 컨트롤러의 경우 1을 사용합니다 (2 차 추력 곡선이 있으므로 추가 튜닝이 필요하지 않음).

   자세한 내용은 [자세한 PID 튜닝 가이드](../config_mc/pid_tuning_guide_multicopter.md#thrust-curve)를 참조하십시오.
:::
1. *튜닝 선택* 라디오 버튼을 **롤**로 설정합니다.
1. (선택 사항) **자동 비행 모드 전환** 확인란을 선택합니다. **시작** 버튼을 누르면 _자동으로_ [위치 모드](../flight_modes/position_mc.md)에서 [안정화 모드](../flight_modes/manual_stabilized_mc.md)로 전환됩니다.
1. 속도 컨트롤러 튜닝의 경우 *곡예 모드*, *안정화 모드* 또는 *고도 모드*로 전환합니다 (자동 전환이 활성화되지 않은 경우).
1. 설정점과 응답 곡선 추적을 시작하려면 **시작** 버튼을 클릭합니다.
1. *롤 스틱* 전체 범위를 빠르게 이동하고 플롯에서 계단 응답을 관찰합니다. :::tip 플롯을 더 쉽게 검사 할 수 있도록 추적을 중지하십시오. 확대/축소/이동시 자동으로 발생합니다. 플롯을 다시 시작하려면 **시작** 버튼을 사용하고 재설정하려면 **지우기** 버튼을 사용합니다.
:::
1. 슬라이더를 사용하여 3 개의 PID 값을 수정하고 (롤 속도 조정을 위해 `MC_ROLLRATE_K`, `MC_ROLLRATE_I`, `MC_ROLLRATE_D`에 영향을 미칩니다) 단계 응답을 다시 관찰합니다. 슬라이더를 움직이면 값이 기체에 저장됩니다. :::note 목표는 _Response_ 곡선이 _Setpoint_ 곡선과 최대한 가깝게 일치하는 것입니다 (예 : 오버슈트없는 빠른 응답). ::: PID 값은 다음과 같이 조정할 수 있습니다.
   - P (비례) 또는 K 이득 :
     - 더 많은 응답을 위해 이것을 늘리십시오.
     - 응답이 오버 슈팅 및/또는 진동하는 경우 감소합니다 (특정 지점까지 D 게인 증가도 도움이 됨).
   - D (미분) 이득 :
     - 오버슈트 및 진동을 줄이기 위해이 값을 늘릴 수 있습니다.
     - 소음을 증폭하고 모터가 뜨거워 질 수 있으므로 필요한 만큼만 늘리십시오.
   - I (적분) 이득 :
     - 정상 상태 오류를 줄이는 데 사용
     - 너무 낮으면 응답이 설정 값에 도달하지 못할 수 있습니다 (예 : 바람)
     - 너무 높으면 느린 진동이 발생할 수 있습니다.
1. 피치와 요에 대해 위의 튜닝 프로세스를 반복합니다.
   - *튜닝 선택* 라디오 버튼을 사용하여 튜닝 축을 선택합니다.
   - 적절한 스틱을 이동합니다 (예 : 피치 스틱, 요 스틱).
   - 피치 튜닝의 경우 롤과 동일한 값으로 시작하십시오. :::tip 초기 피치 설정에 대한 롤 설정을 복사하려면 **클립 보드에 저장** 및 **클립 보드에서 재설정** 버튼을 사용합니다.
:::
1. 모든 축에서 자세 콘트롤러에 대하여 튜닝 프로세스를 반복하십시오.
1. 속도 및 위치 컨트롤러 (모든 축에서)에 대해 튜닝 프로세스를 반복합니다.
   - 이러한 컨트롤러를 조정할 때 위치 모드를 사용하십시오.
   - *위치 제어 모드 ... * 선택기에서 **간단한 위치 제어** 옵션을 선택합니다 (이렇게하면 단계 입력 생성을 직접 제어할 수 있음).

     ![QGC PID 튜닝 : 간단한 제어 선택기](../../assets/mc_pid_tuning/qgc_mc_pid_tuning_simple_control.png)

완료되었습니다 ! 설정을 종료하기 전에 에어 모드를 다시 활성화하여야 합니다.
