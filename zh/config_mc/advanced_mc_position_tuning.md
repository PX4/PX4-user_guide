# 高级多旋翼位置控制调参

This document provides an overview of the multicopter position-control tuning parameters that change the *user experience*: how fast the vehicle reacts to stick movements, the maximum allowed velocity, etc. (i.e. the parameters that affect the value of a desired setpoint rather than those that affect how well the vehicle *tracks* the setpoint).

> **Warning** 本指南适用于高级用户/专家。

<span></span>

> **Tip** 在做任何该文档中描述的多旋翼高级相关控制调校*之前*，请先按照文档 [多旋翼 PID 调节指南](../config_mc/pid_tuning_guide_multicopter.md)进行相应操作。 请不要尝试使用高级位置控制参数调整来修复飞行器的追踪或飞行抖动。

## 综述

P/PID控制器的输入是飞行器尝试跟踪的*期望设定值*。 [PID调参](../config_mc/pid_tuning_guide_multicopter.md) ("低级"调参) 的目标是减小设定值和估计值之间的误差。 较小的PID增益将导致飞行器的不稳定

传递给 P/PID 控制器的所需设定值本身是根据摇杆位置（在遥控模式下）或从任务指令的要求设定值计算的。 设定值（“更高级别”）调整用于指定所需设定值和所需设定值之间的映射。 较差的的设定值不会导致不稳定，但可能导致对设定值变化的响应速度变慢。

> **Tip** 所要求的设定值可能会很快改变（例如, 如果用户一下子从零设置为到最大价值）。 如果缓慢调整相应的目标设定值, 飞行器的特性就会更好。

设定值调整参数可分为两组: 飞行器[位置](#position_mode)模式相关的参数和飞行器[任务](#mission_mode)模式相关的参数。 某些参数将同时对两种模式产生影响。

### 定义

位置控制器 ([ diagram here ](https://dev.px4.io/en/flight_stack/controller_diagrams.html#multicopter-position-controller)) 由外环的** P ** 位置控制回路和内环的 ** PID ** 速度控制回路组成。 根据 飞行模式, 两个回路都是活动的, 或者只有速度控制回路是活动的。

对于本文档的其余部分，** 位置控制 ** 代表两个控制回路都有效的情况，而 ** 速度控制 ** 指的是仅使用速度控制回路的情况。

## 位置控制模式 {#position_mode}

在[位置控制](../flight_modes/position_mc.md)模式中， 摇杆的输入映射要么为 **位置-控制**，要么为 **速度-控制**.

当摇杆输入在死区 [MPC_HOLD_DZ](../advanced_config/parameter_reference.md#MPC_HOLD_DZ)内时，位置控制被激活，否则是速度控制。 以下参数都是可调节参数，并且不能被直接映射为物理量。

#### MPC_ACC_HOR_MAX

该参数用于水平方向的位置控制，即飞机理应停留的当前位置。 设定速度的变化速率由[MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)来限定。 此参数应设置为大于水平方向上任何其他加速度相关参数。

#### MPC_ACC_HOR and MPC_DEC_HOR_SLOW {#mpc_acc_hor-and-mpc_dec_hor_slow}

在速度控制中，速度设定点的速率限制从线性图从摇杆输入提取到加速度极限，最大值为[MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR), 最小值为[MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW). 例如，若摇杆输入在 `MPC_HOLD_DZ`，加速度的限定为 `MPC_DEC_HOR_SLOW`. 如果摇杆输入在最大值 (=`1`), 则加速度限定值为 `MPC_ACC_HOR`，并且任意的摇杆输入都将线性映射到这两个参数之间。 此外，当用户需要沿当前飞行方向减速时，`MPC_DEC_HOR_SLOW` 也会限制速度设定的变化。 例如，当摇杆的输入量从最大值 (=`1`) 变化到 `0.5`时，速度设定的变化将由`MPC_DEC_HOR_SLOW`限定。

当由 **速度-控制** 转为 **位置-控制**时，将会发生一个由 `MPC_ACC_HOR` 到 `MPC_ACC_HOR_MAX` 的强制转变， 并且当前飞行器的速度设定将会被重置。 这种重置和强制转变在飞行器试图停止时都可能会引起抖动。 尽管如此，重置也是必需的，因为平滑参数对设定值会引入延迟，这可能导致意外的飞行操纵。

下面给出一个简单例子解释为什么需要重置。

考虑这样一种情况: 用户要求从悬停中到全速飞行，紧接着一个停止请求。 这等效于摇杆以最大值`1`满输入，然后紧跟着一个零摇杆输入。 为了简化这个例子，假设参数`MPC_ACC_HOR_MAX`等于`MPC_ACC_HOR`，因此当从**速度控制**转为**位置控制**时，加速限制没有硬切换。 此外，我们假设需求的最大速度为`4 m/s`。

摇杆满输入时，速度设定值不会直接从`0 m/s`变到`4 m/s`(即阶跃输入)，而是根据参数`MPC_ACC_HOR`的斜率渐变。 然而，飞行器的实际速度不会完美地跟上设定值，而是会稍微滞后。 `MPC_ACC_HOR`的值越大，这个滞后就会越明显。

![转向速度重设](../../images/slewrate_reset.svg)

如果没有复位(如顶部图示)，在停止指令的时刻(摇杆输入等于0)，速度设定值将以` MPC_ACC_HOR_MAX `给出的最大速率下降。 由于滞后，飞机将首先在停止指令之前的方向上继续加速，然后缓慢减速至零。 通过将速度设定点重置为当前速度，可以克服在停止指令期间的滞后引起的延迟。

#### MPC_ACC_UP_MAX 和 MPC_ACC_DOWN_MAX

`MPC_ACC_UP_MAX` >= `MPC_ACC_DOWN_MAX`，否则固件将覆盖给定值。

- **位置控制:** 速度设定值在z方向的改变限度由参数[MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)给出。
- **速度控制:**摇杆输入改变速度设定值的限定由两个参数给出， `MPC_ACC_UP_MAX`限制向上的方向， [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)限制向下的方向。 

#### MPC_JERK_MAX 和 MPC_JERK_MIN

这两个参数仅在从**速度控制</ 0>到**位置控制</ 0>的转换期间有效。 这两个参数的目的是让从前飞到悬停引入的加速度尽可能地小（请参阅 MPC_ACC_HOR和MPC_DEC_HOR_SLOW </ 0>）。</p> 

这一类的加速度参数 通过控制最大加速度`MPC_ACC_HOR_MAX`来控制最大速度。 实际的“刹车加速度”和飞行器刹车前的速度大小呈线性关系。 最大速度映射到[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) 而最小速度映射到 [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN)。 你可以通过把 `MPC_JERK_MAX`设的比`MPC_JERK_MIN`更小来关掉“平滑刹车”。

## 任务模式 {#mission_mode}

在[任务模式](../flight_modes/mission.md) 中飞行器总会从上一个航点直线行驶到当前的目标航点。

![任务逻辑](../../images/autologic.png)

$$\mathbf{wp}_{prev}$$ 是上一个目标航点，如果没有上一个目标航点，那就是收到第一个航点时飞行器的位置。

追踪航线过程中的设定点可以分为两部分：

- 位置设定值 $$\mathbf{p}_{sp}$$: 距离飞行器最近的航线上的点。 
- 速度设定值 $$\mathbf{v}_{cruise}$$: 在追踪期间的期望速度。

巡航速度 $$\mathbf{v}*{cruise}$$ 的默认设定为 [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE)。 然而，如果目标航点（小红圈）离前一个航点很近的话，巡航速度也会相应地进行调整。 为了到达巡航速度$$\mathbf{v}*{cruise}$$ ，飞行器会以加速度`MPC_ACC_HOR`进行加速。

当飞行器距离目标航点还有 `1.5 x MPC_XY_CRUISE` 的时候, 飞行器会减速到一个特定的速度（该速度取决于转折角度$$\alpha$$）。 用于计算这个特定速度的函数是一个指数函数。 $$a \times b^{x} + c$$:

![速度 角度](../../images/speed_from_angle.png)

在角度为 `180 度`的时候，对应从上一个航点$$\mathbf{wp}*{prev}$$ 到下一个航点之间的线段上$$\mathbf{wp}*{next}$$ 有一个目标航点的情况，在这个目标航点的速度就会是 `MPC_XY_CRUISE`。 角度是 `0 度`，对应于下一个航点$$\mathbf{wp}*{next}$$ 在上一个航点$$\mathbf{wp}*{prev}$$和当前目标航点组成的线段上，这种情况下目标速度就会被设为最小速度`1 m/s`. 如果角度是 `90 degrees`，那么目标速度就会被设为 [MPC_CRUISE_90](../advanced_config/parameter_reference.md#MPC_CRUISE_90)。 所有其他可能的角度也都会通过这个指数函数来映射到一个特定的速度。 如果当前没有收到下一个航点 $$\mathbf{wp}_{next}$$ ，那么飞行器的速度就会将巡航速度减小到零。

只有当飞行器的位置小于可达半径$$r_{rad}$$时，飞行器才会往目标航点飞（最大可达半径可以通过调参数[NAV_ACC_RAD](../advanced_config/parameter_reference.md#NAV_ACC_RAD)来调整。）

除此之外，飞行器 必须要到达设定的高度（阈值[NAV_MC_ALT_RAD](../advanced_config/parameter_reference.md#NAV_MC_ALT_RAD)）和正确的偏航(阈值 [MIS_YAW_ERR](../advanced_config/parameter_reference.md#MIS_YAW_ERR)). 一旦飞行器进入代表航点的小圈圈，航点就会更新。 $$\mathbf{wp}*{next}$$会变成新的目标航点， $$\mathbf{wp}*{prev}$$ 会被设为刚刚达到的那个航点。同时还会把新的$$\mathbf{wp}_{next}$$ 加进来。