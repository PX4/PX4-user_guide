# 高级固定翼位置调整

本指南为调整飞行任务和高度/位置控制模式下所需的高级固定翼控制器提供一些帮助。 PX4 使用 TECS 进行高度和空速控制，使用 L1 进行水平航向/位置控制。

本指南仅适合高级用户/专家使用。 如果你不熟悉 TECS 调整，可能会导致您的飞机坠毁。
:::

调整时增益设置不当会使高度和航向控制不稳定。 因此，调节 TECS 增益的飞行员应该能够以稳定的控制模式飞行和降落飞机。
:::

所有参数都记录在[参数参考](../advanced_config/parameter_reference.md#fw-tecs)中。 本指南将介绍所有重要参数。
:::

## TECS 调节（高度和空速）

TECS（总能量控制系统）是一种用于固定翼飞机的制导算法，该算法通过协调油门和俯仰角设定值来控制飞机的高度和空速。 有关 TECS 算法和控制图的详细说明，请参阅[控制图](../flight_stack/controller_diagrams.md)。

调整 TECS 之前需要一个调整好的姿态控制器：[PID调整指南](../config_fw/pid_tuning_guide_fixedwing.md)。

调整 TECS 主要是正确地设置机身限制。 这些限制可以通过如下所述的一系列飞行操作确定的参数来指定。 大多数操作要求飞行员在[稳定飞行模式](../flight_modes/stabilized_fw.md)下飞行。

当飞行员飞行时，能有人帮助阅读和记录遥测数据时非常有益的。 为了提高准确性，我们还建议您使用飞行日志中记录的数据来验证飞行期间获得的数据。
:::

#### 1st：平衡条件

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