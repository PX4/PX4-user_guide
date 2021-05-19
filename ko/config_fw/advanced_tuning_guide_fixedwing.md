# 고급 고정익 위치 튜닝

이 가이드는 비행 임무와 고도 및 위치 제어 모드에서 고정익 컨트롤러를 정밀 조정에 많은 도움이 됩니다. PX4는 고도 및 대기 속도 제어에 TECS를 사용하고 수평 방향/위치 제어에 L1을 사용합니다.

:::warning
이 가이드는 고급 사용자와 전문가를 위한 것입니다. TECS 튜닝을 이해하지 못하면, 항공기가 추락할 수 있습니다.
:::

:::note
튜닝중 게인을 잘못 설정하면 고도 또는 방향 제어가 불안정해질 수 있습니다. 따라서 TECS 게인 조정시에는 안정된 제어 모드에서 비행기를 비행하고 착륙시킬 수 있어야합니다.
:::

:::tip
모든 매개변수는 [매개변수 정의](../advanced_config/parameter_reference.md#fw-tecs)편에 기술되어 있습니다. 이 가이드에서는 중요한 매개변수들을 설명합니다.
:::

## TECS 튜닝 (고도 및 대기 속도)

TECS (Total Energy Control System)는 항공기의 고도 및 대기 속도를 제어하기 위해 스로틀과 피치 각도 설정점을 조정하는 고정익 가이드 알고리즘입니다. TECS 알고리즘과 제어 다이어그램에 대한 자세한 설명은 [컨트롤러 다이어그램](../flight_stack/controller_diagrams.md)을 참조하십시오.

TECS를 조정하기 전에 잘 튜닝된 자세 컨트롤러가 필요합니다. [PID 조정 가이드](../config_fw/pid_tuning_guide_fixedwing.md).

TECS 튜닝은 주로 기체 제한을 올바르게 설정하는 것입니다. 이러한 제한은 아래에 설명된 일련의 비행 기동으로부터 결정될 수있는 매개변수로 설정할 수 있습니다. 대부분의 기동은 [안정된 비행 모드](../flight_modes/stabilized_fw.md)에서 조종사가 비행기를 조종하여야 했습니다.

:::tip
조종사가 조종하는 동안 원격 측정 데이터를 읽고 기록할 수있는 사람이 있으면 매우 좋습니다. 정확성을 높이기 위해 비행 중에 얻은 데이터를 비행 로그에 기록된 데이터로 확인하는 것이 좋습니다.
:::

#### 1 차 : 트림 조건

Fly in [stabilized mode](../flight_modes/stabilized_fw.md) and find trim values for both throttle and pitch angle for level flight at trim airspeed. Use throttle to adjust airspeed and pitch to keep level flight.

Set the following parameters:

- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) - set to the desired trim airspeed flown during the maneuver.
- [FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE) - set to the throttle required to fly at trim airspeed.
- [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF) - set to the pitch angle required to maintain level flight.

#### 2nd: Airspeed & Throttle Limits

Fly in [stabilized mode](../flight_modes/stabilized_fw.md) and increase throttle while maintaining level flight using pitch control - until the vehicle reaches the maximum allowed airspeed.

Set the following parameters:

- [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX) - set to the throttle you applied to reach maximum airspeed during level flight.
- [FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN) - set to the minimum throttle the plane should fly at.
- [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - set to the maximum airspeed you achieved during level flight at `FW_THR_MAX`.

#### 3rd: Pitch & Climb Rate Limits

Fly in stabilized mode, apply full throttle (`FW_THR_MAX`) and slowly increase the pitch angle of the vehicle until the airspeed reaches `FW_AIRSPD_TRIM`.

- [FW_P_LIM_MAX](../advanced_config/parameter_reference.md#FW_P_LIM_MAX) - set to the pitch angle required to climb at trim airspeed when applying `FW_THR_MAX`.
- [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) - set to the climb rate achieved during the climb at `FW_AIRSPD_TRIM`.

Fly in stabilized mode, reduce the throttle to `FW_THR_MIN` and slowly decrease the pitch angle until the vehicle reaches `FW_AIRSPD_MAX`.

- [FW_P_LIM_MIN](../advanced_config/parameter_reference.md#FW_P_LIM_MIN) - set to the pitch angle required to reach `FW_AIRSPD_MAX` at `FW_THR_MIN`.
- [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) - set to the sink rate achieved during the descent.

Fly in stabilized mode, reduce throttle to `FW_THR_MIN` and adjust the pitch angle such that the plane maintains `FW_AIRSPD_TRIM`.

- [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) - set to the sink rate achieved while maintaining `FW_AIRSPD_TRIM`.

### L1 Controller Tuning (Position)

All L1 parameters are described [here](../advanced_config/parameter_reference.md#fw-l1-control).

- [FW_L1_PERIOD](../advanced_config/parameter_reference.md#FW_L1_PERIOD) - This is the L1 distance and defines the tracking point ahead of the aircraft it's following. A value of 25 meters works for most aircraft. A value of 16-18 will still work, and provide a sharper response. Shorten slowly during tuning until response is sharp without oscillation.