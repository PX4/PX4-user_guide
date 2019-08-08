# 多轴飞行器 PID 调参指南

本教程介绍如何在 PX4 上调整 [ 多轴飞行器 ](../airframes/airframe_reference.md#copter) (四、六、八旋翼等) 的 PID 参数 。

通常, 如果您使用的是 [ 已经支持的机型 ](../airframes/airframe_reference.md#copter) （例如, [ QGroundControl ](../config/airframe.md) 中的机身），则默认参数应足以安全地飞行。 为了获得最好的性能, 最好能整定新飞机的 PID 参数。 例如, 不同的电调或电机需要不同的控制增益, 才能获得最佳飞行效果。

> **Warning** 本指南仅适用于高级用户。 不合适的参数可能会导致飞行器不稳定，甚至炸机。 确保预先指定保护开关 ( Kill-switch ) 。

## 简介

PX4 使用 ** P ** 比例、** I ** 积分、** D ** 微分 (PID) 控制器, 是使用最广泛的控制技术。

控制器是分级的, 这意味着外环的控制器将其结果传递给内环的控制器。 最内环的控制器是 ** 角速率控制器 **, 然后是 ** 姿态控制器 **, 然后 ** 速度 & 位置控制器 **。 PID 调参需要按相同的顺序进行, 从角速率控制器开始, 因为它将影响其他所有控制器。

## 前置条件

- 您已为您的飞行器选择了最接近的 [ 默认机型配置 ](../config/airframe.md)。 这应该可以让你的飞行器飞起来。
- 您应该已经执行过 [ 电调（ESC）校准 ](../advanced_config/esc_calibration.md)。
- [ PWM_MIN ](../advanced_config/parameter_reference.md#PWM_MIN) 正确设置。 它需要设置一个小值, 但当飞行器解锁时, 需要保证 ** 电机不停转 **。
  
  可以在 [特技 Acro 模式](../flight_modes/acro_mc.md) 或 [ 手动/自稳模式 ](../flight_modes/manual_stabilized_mc.md) 中进行测试：
  
  - 卸下螺旋桨
  - 解锁，并将油门杆拉到最低
  - 把飞行器倾斜到各个方向, 大约60度
  - 确保没有电机停转
- 可以通过 [ SDLOG_PROFILE ](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 参数，启用高速率日志记录配置文件, 以便使用日志来查看角速率和姿态跟踪性能 (之后可以禁用该选项) 。

> **警告** 在调参过程中，禁用 [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE)。

## 调参步骤

> **Note** 出于安全原因, 所有的增益都默认设置为低值。  
> 如果想获得良好的控制响应，必须相应的增加增益值。 

以下是做调参时要遵循的一些一般要点：

- 调整增益时，所有的增益值都应该慢慢增加, 因为增益过大可能会导致危险的振荡! 一般情况下，每次增益值的调整幅度大约在20%到30%，获得最优增益值后，基于最优值再下调5%到10%。
- 在修改参数之前务必先着陆。 慢慢增加油门，观察振荡的现象。
- 调参时的油门值应该在无人机的悬停油门, 并使用 [ 推力曲线参数（Thrust Curve Parameter 或 TPA) ](#thrust_curve) 来观察或判断推力非线性或高推力振荡现象。

### 速率控制器

角速度控制是最内环的控制器，它用三个独立的PID控制来控制角速度

- 滚转角速度控制 ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D)) 
- 俯仰角速度控制 ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P), [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I), [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D))
- 偏航角速度控制([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P), [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I), [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D)) 

> **注意** 把角速度控制器调好是非常重要的，因为它会影响到 *所有的*飞行模式。 角速度控制器跳得好不好可以在[位置模式](../flight_modes/position_mc.md)中显现出来，举个例子，你的飞机可能会「抽搐」（飞行器无法很好地悬停在空中）

角速度控制器可以在[特技模式](../flight_modes/acro_mc.md)或者[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)中调整。

- *我们更推荐特技模式，* 但这种模式比较难飞。 如果你选择特技模式，记得把把特技模式指数因子都禁用了： 
  - `MC_ACRO_EXPO` = 0, `MC_ACRO_EXPO_Y` = 0, `MC_ACRO_SUPEXPO` = 0, `MC_ACRO_SUPEXPOY` = 0
  - `MC_ACRO_P_MAX` = 200, `MC_ACRO_R_MAX` = 200
  - `MC_ACRO_Y_MAX` = 100
- *手动/自稳模式*更好飞，但这种模式也比较难观察姿态和角速度控制器到底调好了没。

万一你的飞行器完全飞不起来，我们给你以下几点建议：

- 如果你发现首次起飞有严重的振荡（严重到根本没法飞），那你可以减小所有的**P**和**D**参数，直到它能够正常起飞。
- 但如果你的飞行器对遥控器的所有指令都没什么反应的话，可以增加**P**增益试试。

在实际中，*手动模式*和*特技模式*的调参套路差不多：一步步地迭代调整滚转和俯仰的**P**和**D**增益，然后再调**I**增益。 一开始你的ROLL和PITCH可以用相同的值，等调的差不多了，细调的时候可以分别再调整滚转和俯仰（如果你的飞行器绕X，Y轴的质量分布差不多一样，那就不用再细调了。） 偏航那就很简单了，四旋翼对偏航角不是很敏感，我们甚至可以直接把偏航的D设为0。

#### P增益

**P**增益(比例增益) 用来减小误差。 它可以加快响应速度，因此应该在不引入震荡的前提下设的尽量的高。

- 如果**P**增益太高了，会有高频率的振荡。
- 如果 **P** 增益太低了: 
  - 飞行器会对遥控器的输入很迟钝。 
  - 如果是在*特技模式*下，飞行器会漂移，你会一直要矫正它来让它水平。

#### D 增益

**D增益**(微分增益) 用来增加阻尼，可以防止超调。 同样地，这个值应该尽量设大一些来避免超调。

- **D增益**太大，电机可能会抽搐、发热(也有可能不会) 。这是因为**D**项同时也会放大震动等带来的噪声。
- **D增益**太低会导致超调，即相比设定的值「冲过头了」。

#### I增益

**I**（积分）增益可以「记住误差」。 如果你发现过了一段时间了，角速度还是达不到设定值，那就该增加** I **了。 它很重要(尤其在*特技模式*下) ，但我们不应该把它设得太高。

- 如果积分增益太高：你会看到缓慢的振荡。
- 如果积分增益太低——我们可以在*特技模式*下很好地看到这一点，让飞行器朝一个方向转45度，并保持一会。 他应该始终保持相同的角度。 如果它往回漂移，增加** I **。 通过观察日志我们也可以发现** I **增益太小的问题，可以看到实际的角速度过很久也达不到期望的角速度。

I 增益一般在0.3~0.5之间，俯仰角的一般要大一点。

#### 测试步骤

要测试现在的增益，可以给一个在悬停状况下给一个**脉冲输入**（打一下杆再回来）然后观察飞行器的反应。 他应该反应很快，振荡和超调量都不大。(有种「锁定」的感觉)。

举个例子，你可以把杆迅速打到一边，然后再让杆归位，给一个滚转方向的脉冲输入。(注意，让杆归位的时候不要直接松手，不然的话杆归位会在中间弹一下，这会导致你输入的命令也「弹一下」。)

> **Note** 一个调得很好的旋翼在*特技模式*不会随便超某个方向倾斜，即使不做任何矫正也能保持姿态几十秒。

#### 日志

看看日志有助于你看看你调的参咋样。 下面是一份调得比较好的滚转和偏航角速度的日志。

![滚转角速度跟踪](../../images/mc_pid_tuning/roll_rate_tracking.png) ![偏航角速度跟踪](../../images/mc_pid_tuning/yaw_rate_tracking.png)

下面这份日志显示了滚转角速度对阶跃输入和脉冲输入的一个比较好的反应。 你可以看到飞行器的超调量非常小。 ![roll rate tracking flips](../../images/mc_pid_tuning/roll_rate_tracking_flip.png)

### 角度控制

角度控制环控制机体的姿态角，并通过设定的角度和实际角度误差来设定期望角速度，反过来想可能会比较直观，即用角速度来补偿角度。该控制环有以下参数可以调：

- 滚转角控制 ([MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P))
- 俯仰角控制 ([MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P)
- 偏航角控制([MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P))

姿态角控制环调起来就容易多了。 其实大多数时候默认值就够了，完全不用调。

角度控制环可以在*手动/自稳模式*下调，逐渐增大**P**增益。 如果看到有振荡或者超调，就说明调得太高了。

下面这几个参数也可以调整 这些参数决定了绕三个轴的最大角速度：

- 最大滚转角速度 ([MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX))
- 最大俯仰角速度 ([MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX)
- 最大偏航角速度 ([MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX))

### 推力曲线 / 大油门 PID 衰减(Throttle PID Attenuation) {#thrust_curve}

以上的调整都是在悬停油门的基础上的。 但当你增大油门的时候，你可能会看到控制性能又不太好了，机体又开始振荡了。

有两种方法可以搞定这种问题：

- 用 **THR_MDL_FAC**参数来调整[推力曲线](../advanced_config/parameter_reference.md#THR_MDL_FAC)(推荐的方式)。 默认情况下的PWM - 推力 对应关系是线性的。 — 你可以把参数`THR_MDL_FAC`设为1来让这种关系变成二次的。 0~1之间的值表示线性和二次之间的一个插值。 这个参数一般在0.3~0.5之间，你可以每次增加0.1。 如果该参数太大，你可以看到低油门下的振荡现象。
  
  > **Note** 如果你改变这个参数的话，必须要重新调整角速度控制器。

- 使用「**大油门PID衰减**」(TPA)，它会在油门大于某个值的时候线性地降低PID增益。(衰减率由<span style="color:#6383B0">breakpoint</span>和`MC_TPA_RATE_*`这样的一组参数决定)。 <span style="color:#8D6C9C">衰减率</span>可以通过参数 `MC_TPA_RATE_*` 来控制. 我们一般不会用到TPA，但它确实是除了改变推力曲线之外解决大油门振荡的一种方法。 下图是这种方法的图示，显示了推力和PID值之间的关系。
  
  ![TPA](../../images/mc_pid_tuning/MC_PID_tuning-TPA.svg) <!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the second Tab
-->

<!-- TODO
### Velocity & Position Controller
The PID-Gains should be chosen such that tracking is as tight as possible. Before doing any position/velocity control related tuning,
turn off all [higher-level position controller tuning gains](../config_mc/mc_trajectory_tuning.md).

- [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX): 1000
- [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR) : 1000
- [MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW) : 1000 
- [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX) : 1000 
- [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) : 1000 
- [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) : 0 
- [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN) : 1
 -->

### Airmode & 混控器饱和 {#airmode}

角速度控制器输出三个轴的扭矩和推力(滚转、俯仰和偏航) ，而这些输出需要被转换为每个电机的推力命令。 这种转换被称为混控。

可以想象，转化后某个电机的推力命令可能会为负，或者超过100%。 这就是混控器饱和。 对于电机来说执行这样的命令是不可能的(除了可逆式电动机) 。 PX4有两种办法来解决混控器饱和。

- 通过减小沿旋转轴的力矩命令，来让转换后的电机命令都大于零。（关闭Airmode的情况下） 在极端情况下，输出的拉力命令会为零，这意味着不能做任何的姿态调整，这也是为什么我们为什么在这种模式下我们要设一个最小拉力。
- 通过增加拉力命令来让各个电机的拉力不小于零。（启动 Airmode 的情况下）。 这样做的好处是即使在零油门下我们也可以很好地跟踪 角度 / 角速度 的误差。 这种模式一般会提高飞行的性能。
  
  然而在这种模式下会增加总推力，因此也可能会出现问题：即使油门减到零了，飞行器还是在往上跑。 对一个调参调的比较好的飞行器来说，这种问题一般不太会存在。然而在调参调的不好的飞行器上，这个问题就会显现出来，比如因为P调的太大而剧烈振荡的飞行器上，这种问题可能就会比较严重。

下面是这两种模式的示意图（由左右两个电机产生力矩，而期望力矩是 <span style="color:#9673A6">r</span>。 对左边的电机而言，推力增加了<span style="color:#9673A6">r</span>，而右边的电机则减去r。 电机的推力用<span style="color:#6A9153">绿色</span>表示。 在打开Airmode的时候，期望总推力会增加<span style="color:#B85450">b</span>来避免负的力矩。 而当关掉这种模式的时候，我们减小期望力矩<span style="color:#9673A6">r</span>来避免负的推力出现。

    ![Airmode](../../images/mc_pid_tuning/MC_PID_tuning-Airmode.svg)
    

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

如果在混控过程中，某个电机的期望拉力超过了100%，飞控就会减小两个电机的期望总拉力，来满足期望力矩。 这点和「Airmode逻辑」是相同的，并且飞控在Airmode打开和关闭的时候都会这么干。

如果你觉得你的旋翼飞行器已经飞的很好了，可以通过参数[MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE)来启用Airmode。