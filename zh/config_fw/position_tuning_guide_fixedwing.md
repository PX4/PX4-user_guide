---
canonicalUrl: https://docs.px4.io/main/zh/config_fw/position_tuning_guide_fixedwing
---

# Fixed-wing Altitude/Position Controller Tuning

本指南为调整飞行任务和高度/位置控制模式下所需的高级固定翼控制器提供一些帮助。 PX4 uses TECS for altitude and airspeed control, and NPFG for horizontal heading/position control.

调整时增益设置不当会使高度和航向控制不稳定。 因此，调节 TECS 增益的飞行员应该能够以稳定的控制模式飞行和降落飞机。
:::

所有参数都记录在[参数参考](../advanced_config/parameter_reference.md#fw-tecs)中。 本指南将介绍所有重要参数。
:::

## TECS 调节（高度和空速）

TECS（总能量控制系统）是一种用于固定翼飞机的制导算法，该算法通过协调油门和俯仰角设定值来控制飞机的高度和空速。 有关 TECS 算法和控制图的详细说明，请参阅[控制框图](../flight_stack/controller_diagrams.md)。

调整 TECS 之前需要一个调整好的姿态控制器：[PID调整指南](../config_fw/pid_tuning_guide_fixedwing.md)。

调整 TECS 主要是正确地设置机身限制。 这些限制可以通过如下所述的一系列飞行操作确定的参数来指定。 Most of the maneuvers required the plane to be flown by a pilot in [Stabilized flight mode](../flight_modes_fw/stabilized.md).

:::tip
当飞行员飞行时，能有人帮助阅读和记录遥测数据时非常有益的。
为了提高准确性，我们还建议您使用飞行日志中记录的数据来验证飞行期间获得的数据。
:::

#### 1st：平衡条件

Fly in [stabilized mode](../flight_modes_fw/stabilized.md) and find trim values for both throttle and pitch angle for level flight at trim airspeed. 使用油门去调节空速和俯仰以保持水平飞行。

设置以下参数：
- [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) - 设置为操作过程中所需要的平衡空速。
- [FW_THR_CRUISE](../advanced_config/parameter_reference.md#FW_THR_TRIM) - 设置为以配平空速飞行所需要油门。
- [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF) - 设置为维持水平飞行所需要俯仰角。

#### 2nd：空速和油门限制

Fly in [stabilized mode](../flight_modes_fw/stabilized.md) and increase throttle while maintaining level flight using pitch control - until the vehicle reaches the maximum allowed airspeed.

设置以下参数：
- [FW_THR_MAX](../advanced_config/parameter_reference.md#FW_THR_MAX) - 设置水平飞行时到达最大空速所需油门。
- [FW_THR_MIN](../advanced_config/parameter_reference.md#FW_THR_MIN) - 设置为飞行时的最小油门。
- [FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX) - 水平飞行时以`FW_THR_MAX`得到的最大空速。

#### 3rd：俯仰和爬升速率限制

:::warning
请不要使用 [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX), [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) 或 [FW_T_SINK_MINN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) 来指定您希望从飞行器获得的爬升或下降性能！ 这些参数定义了操作限制，应在调试阶段进行设置，如下所述。
:::

以稳定模式飞行，使用最大油门`FW_THR_MAX`并缓慢增加俯仰角直到飞行器空速达到`FW_AIRSPD_TRIM`。
- [FW_P_LIM_MAX](../advanced_config/parameter_reference.md#FW_P_LIM_MAX) - 设置为油门为`FW_THR_MAX`时以配平空速爬升所需要的俯仰角。
- [FW_T_CLMB_MAX](../advanced_config/parameter_reference.md#FW_T_CLMB_MAX) - 设置为以`FW_AIRSPD_TRIM`爬升时的爬升速率。

以稳定模式飞行，减小油门到`FW_THR_MIN`并缓慢减小俯仰角直到飞机达到`FW_AIRSPD_MAX`。
- [FW_P_LIM_MIN](../advanced_config/parameter_reference.md#FW_P_LIM_MIN) - 设定为在`FW_THR_MIN`状态下达到 `FW_AIRSPD_MAX`所需要俯仰角。
- [FW_T_SINK_MAX](../advanced_config/parameter_reference.md#FW_T_SINK_MAX) - 设置为下降期间达到的下降速率。

以稳定模式飞行，减小油门到`FW_THR_MIN`并调整俯仰角使飞机保持`FW_AIRSPD_TRIM`。
- [FW_T_SINK_MIN](../advanced_config/parameter_reference.md#FW_T_SINK_MIN) - 设置为保持`FW_AIRSPD_TRIM`所需的下降速率。

通过调整[FW_T_CLMB_R_SP](../advanced_config/parameter_reference.md#FW_T_CLMB_R_SP)和[FW_T_SINK_R_SP](../advanced_config/parameter_reference.md#FW_T_SINK_R_SP)来确定自动任务的目标爬升率和下降率。 这些参数指定了飞行器改变高度时的爬升率和下降率。 Furthermore, these two values define the height rate limits commanded by the user in [Altitude mode](../flight_modes_fw/altitude.md) and [Position mode](../flight_modes_fw/position.md).


### 固定翼轨迹控制调整（位置）

所有轨迹控制参数都在[这里](../advanced_config/parameter_reference.md#fw-path-control)描述 。

- [NPFG_PERIOD](../advanced_config/parameter_reference.md#NPFG_PERIOD) - 这是之前所称的L1距离，它定义了在其前方飞机跟踪点的位置。 大多数飞机适用于10-20米的数值范围。 调整期间缓慢缩短，直到响应迅速没有振荡。 飞机动态特性缓慢的该数值应该增加。
