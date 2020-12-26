# 多旋翼的转换速率型轨迹

:::tip
该轨迹类型可以通过设置以下参数：[MPC_POS_MODE=1](../advanced_config/parameter_reference.md#MPC_POS_MODE) 在[定点模式](../flight_modes/position_mc.md)（仅限）下启用。

[多旋翼的加加速度限制型轨迹调整](../config_mc/mc_jerk_limited_type_trajectory.md)是另一种提供更平滑响应的轨迹。
:::

转换速率轨迹类型是一种简单的实现方式，在这种情况下，加加速度和加速度使用转换速率进行限制（加加速度和加速度限制不是硬约束）。

它允许非对称配置的用户意图（平滑加速及快速停止），并且应该在响应快速摇杆输入（可能是“抖动”）优先于保证平滑加减速时使用（例如，对于位置保持状态下的激烈飞行）。

本话题解释了如何调整轨迹类型。

## 定点模式

在[定点模式](../flight_modes/position_mc.md)中， 摇杆输入映射为**位置-控制**或**速度-控制**。

:::note
位置控制器 ([ diagram here ](../flight_stack/controller_diagrams.md#multicopter-position-controller)) 由外环的** P ** 位置控制回路和内环的 ** PID ** 速度控制回路组成。 根据模式和情况启用两个回路或仅启用速度控制回路。

对于本文档的其余部分，** 位置控制 ** 代表两个控制回路都有效的情况，而 ** 速度控制 ** 指的是仅使用速度控制回路的情况。
:::

当摇杆输入在死区 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)内时，位置控制被激活，否则是速度控制。

以下所有参数都是可调节参数，不能被直接映射为物理量。

#### MPC_ACC_HOR_MAX

该参数用于水平方向的位置控制，即飞机理应停留的当前位置。 设定速度的变化速率由[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)来限定。 此参数应设置为大于水平方向上任何其他加速度相关参数。

<span id="mpc_acc_hor-and-mpc_dec_hor_slow"></span>

#### MPC_ACC_HOR 和 MPC_DEC_HOR_SLOW

在速度控制中，速度设定值的速率限制是由摇杆输入到加速度限制值线性映射得到的，摇杆最大值对应[MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR), 最小值对应[MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW). 例如，若摇杆输入在 `MPC_HOLD_DZ`，加速度的限定为 `MPC_DEC_HOR_SLOW`. 如果摇杆输入在最大值 (=`1`), 则加速度限定值为 `MPC_ACC_HOR`，并且任意的摇杆输入都将线性映射到这两个参数之间。 此外，当用户需要沿当前飞行方向减速时，`MPC_DEC_HOR_SLOW` 也会限制速度设定的变化。 例如，当摇杆的输入量从最大值 (=`1`) 变化到 `0.5`时，速度设定的变化将由`MPC_DEC_HOR_SLOW`限定。

当由 **速度-控制** 转为 **位置-控制**时，将会发生一个由 `MPC_ACC_HOR` 到 `MPC_ACC_HOR_MAX` 的强制转变， 并且当前飞行器的速度目标值被被重置为飞机当前速度。 这种重置和强制转变在飞行器试图停止时都可能会引起抖动。 尽管如此，重置也是必需的，因为平滑参数会导致延迟到达设定值，若不重置则可能导致始料不及的飞行动作。

下面给出一个简单例子来解释为什么需要重置。

考虑这样一种情况：用户要求机体从悬停状态转为全速飞行，接着又要求机体停止前飞。 这等效于摇杆以最大值`1`满输入，然后紧跟着一个零摇杆输入。 为了简化这个例子，假设参数 `MPC_ACC_HOR_MAX` 等于 `MPC_ACC_HOR`，因此当从**速度-控制**转为**位置-控制**时，加速限制没有强制转变。 此外，我们假设期望的最大速度为 `4 m/s`。

摇杆满输入时，速度设定值不会直接从`0 m/s`变到`4 m/s`(即阶跃输入)，而是根据参数`MPC_ACC_HOR`的斜率渐变。 然而，飞行器的实际速度不会完美地跟上设定值，而是会稍微滞后。 `MPC_ACC_HOR`的值越大，这个滞后就会越明显。

![Slewrate Reset](../../assets/config/mc/slewrate_reset.svg)

如果没有复位(如顶部图示)，在停止指令的时刻(摇杆输入等于0)，速度设定值将以` MPC_ACC_HOR_MAX `给出的最大速率下降。 由于滞后，飞机将首先在停止指令之前的方向上继续加速，然后缓慢减速至零。 通过将速度设定点重置为当前速度，可以克服在停止指令期间的滞后引起的延迟。

#### MPC_ACC_UP_MAX 和 MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX` >= `MPC_ACC_DOWN_MAX`，否则固件将覆盖给定值。

- **位置-控制：**速度设定值在 z 方向的变化上限由参数 [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX) 给出。
- **速度-控制：**摇杆输入导致的速度设定值的变化极限由两个参数给出， `MPC_ACC_UP_MAX` 为上限， [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) 为下限。

#### MPC_JERK_MAX 和 MPC_JERK_MIN

这两个参数仅在从**速度控制</ 0>到**位置控制</ 0>的转换期间有效。 这两个参数的意义是尽量减小机体从前飞状态到悬停状态导致的加加速度（请参见 [MPC_ACC_HOR 和 MPC_DEC_HOR_SLOW](#mpc_acc_hor-and-mpc_dec_hor_slow)）。</p> 

jerk参数限制加速度达到`MPC_ACC_HOR_MAX`的速率。 实际的“刹车加速度”和飞行器刹车前的速度大小呈线性关系。 最大速度映射到[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) 而最小速度映射到 [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN)。 你可以通过将 `MPC_JERK_MAX` 设置为小于 `MPC_JERK_MIN` 的值来禁用平滑效果。