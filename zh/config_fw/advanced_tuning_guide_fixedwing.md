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
- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) - 设置为操作过程中所需要的平衡空速。
- [FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM) - set to the throttle required to fly at trim airspeed.
- [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF) - 设置为维持水平飞行所需要俯仰角。

#### 2nd：空速和油门限制

以[稳定模式](../flight_modes/stabilized_fw.md)飞行并增加油门，同时使用俯仰控制保持水平飞行-直到飞行器到达最大允许空速。

设置以下参数：
- [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX) - 设置水平飞行时到达最大空速所需油门。
- [FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN) - 设置为飞行时的最小油门。
- [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - 水平飞行时以`FW_THR_MAX`得到的最大空速。

#### 3rd：俯仰和爬升速率限制

:::warning
Do not use [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX), [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) or [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) to specify the desired climb or sink performance you would like to get from the vehicle! The parameters define the operating limitations and they should be set during the tuning phase, as described below.
:::

以稳定模式飞行，降低油门至`FW_THR_MIN`并缓慢减小俯仰角直到飞行器达到`FW_AIRSPD_MAX`。
- [FW_P_LIM_MAX](../advanced_config/parameter_reference.md#FW_P_LIM_MAX) - 设置为应用`FW_THR_MAX`时以平衡空速爬升所需要的俯仰角。
- [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) - 设置为以`FW_AIRSPD_TRIM`爬升时的爬升速率。

以稳定模式飞行，减小油门到`FW_THR_MIN`并调整俯仰角使飞机保持`FW_AIRSPD_TRIM`。
- [FW_P_LIM_MIN](../advanced_config/parameter_reference.md#FW_P_LIM_MIN) - 设定为从`FW_THR_MIN`到达 `FW_AIRSPD_MAX`所需要俯仰角。
- [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) - 设置为下降期间达到的下沉速率。

L1所有的参数在[此](../advanced_config/parameter_reference.md#fw-l1-control)描述
- [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) - 设置为保持`FW_AIRSPD_TRIM`达到的下沉速率。

Specify the target climb and sink rate for autonomous missions by adjusting [FW_T_CLMB_R_SP](../advanced_config/parameter_reference.md#FW_T_CLMB_R_SP) and [FW_T_SINK_R_SP](../advanced_config/parameter_reference.md#FW_T_SINK_R_SP). These specify the height rates at which the vehicle will climb or descend in order to change altitude. Furthermore, these two values define the height rate limits commanded by the user in [Altitude mode](../flight_modes/altitude_fw.md) and [Position mode](../flight_modes/position_fw.md).


### FW Path Control Tuning (Position)

All path control parameters are described [here](../advanced_config/parameter_reference.md#fw-path-control).

- [NPFG_PERIOD](../advanced_config/parameter_reference.md#NPFG_PERIOD) - This is the previously called L1 distance and defines the tracking point ahead of the aircraft it's following. A value of 10-20 meters works for most aircraft. 调整期间缓慢缩短，直到响应迅速没有振荡。 Vehicles with a slow roll dynamic should have this value increased.
