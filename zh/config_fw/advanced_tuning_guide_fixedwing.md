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

以[稳定模式](../flight_modes/stabilized_fw.md)飞行并找到以平衡速度水平飞行的油门和俯仰角。 使用油门去调节空速和俯仰以保持水平飞行。

设置以下参数：

- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)设置为操作过程中所需要的平衡空速。
- [FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_CRUISE)设置为以平衡空速飞行所需要油门。
- [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF)设置为维持水平飞行所需要俯仰角。

#### 2nd：空速和油门限制

以[稳定模式](../flight_modes/stabilized_fw.md)飞行并增加油门，同时使用俯仰控制保持水平飞行-直到飞行器到达最大允许空速。

设置以下参数：

- [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX) - 设置水平飞行时到达最大空速所需油门。
- [FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN) - 设置为飞行时的最小油门。
- [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - 水平飞行时以`FW_THR_MAX`得到的最大空速。

#### 3rd：俯仰和爬升速率限制

以稳定模式飞行时，使用全油门（`FW_THR_MAX`）并缓慢增加俯仰角，直至空速达到`FW_AIRSPD_TRIM`。

- [FW_P_LIM_MAX](../advanced_config/parameter_reference.md#FW_P_LIM_MAX) - 设置为应用`FW_THR_MAX`时以平衡空速爬升所需要的俯仰角。
- [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) - 设置为以`FW_AIRSPD_TRIM`爬升时的爬升速率。

以稳定模式飞行，降低油门至`FW_THR_MIN`并缓慢减小俯仰角直到飞行器达到`FW_AIRSPD_MAX`。

- [FW_P_LIM_MIN](../advanced_config/parameter_reference.md#FW_P_LIM_MIN) - 设定为从`FW_THR_MIN`到达 `FW_AIRSPD_MAX`所需要俯仰角。
- [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) - set to the sink rate achieved during the descent.

Fly in stabilized mode, reduce throttle to `FW_THR_MIN` and adjust the pitch angle such that the plane maintains `FW_AIRSPD_TRIM`.

- [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) - set to the sink rate achieved while maintaining `FW_AIRSPD_TRIM`.

### L1 Controller Tuning (Position)

All L1 parameters are described [here](../advanced_config/parameter_reference.md#fw-l1-control).

- [FW_L1_PERIOD](../advanced_config/parameter_reference.md#FW_L1_PERIOD) - This is the L1 distance and defines the tracking point ahead of the aircraft it's following. A value of 25 meters works for most aircraft. A value of 16-18 will still work, and provide a sharper response. Shorten slowly during tuning until response is sharp without oscillation.