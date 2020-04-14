# 多轴飞行器 PID 调参指南

本教程介绍如何在 PX4 上调整 [ 多轴飞行器 ](../airframes/airframe_reference.md#copter) (四、六、八旋翼等) 的 PID 参数 。

通常, 如果您使用的是 [ 已经支持的机型 ](../airframes/airframe_reference.md#copter) （例如, [ QGroundControl ](../config/airframe.md) 中的机身），则默认参数应足以安全地飞行。 为了获得最好的性能, 最好能整定新飞机的 PID 参数。 例如, 不同的电调或电机需要不同的控制增益, 才能获得最佳飞行效果。

> **Warning** 本指南仅适用于高级用户。 不合适的参数可能会导致飞行器不稳定，甚至炸机。 确保预先指定保护开关 ( Kill-switch ) 。

## 简介

PX4 使用 ** P ** 比例、** I ** 积分、** D ** 微分 (PID) 控制器, 是使用最广泛的控制技术。

The controllers are layered, which means a higher-level controller passes its results to a lower-level controller. The lowest-level controller is the the **rate controller**, then there is the **attitude contoller**, and then the **velocity & position controller**. The PID tuning needs to be done in the same order, starting with the rate controller, as it will affect all other controllers.

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

> **Note** For safety reasons, the default gains are set to low values. You must increase the gains before you can expect good control responses. 

以下是做调参时要遵循的一些一般要点：

- 调整增益时，所有的增益值都应该慢慢增加, 因为增益过大可能会导致危险的振荡! 一般情况下，每次增益值的调整幅度大约在20%到30%，获得最优增益值后，基于最优值再下调5%到10%。
- 在修改参数之前务必先着陆。 慢慢增加油门，观察振荡的现象。
- Tune the vehicle around the hovering thrust point, and use the [thrust curve parameter](#thrust_curve) to account for thrust non-linearities or high-thrust oscillations.

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

- If you notice strong oscillations when first trying to takeoff (to the point where it does not fly), decrease all **P** and **D** gains until it takes off.
- 但如果你的飞行器对遥控器的所有指令都没什么反应的话，可以增加**P**增益试试。

在实际中，*手动模式*和*特技模式*的调参套路差不多：一步步地迭代调整滚转和俯仰的**P**和**D**增益，然后再调**I**增益。 Initially you can use the same values for roll and pitch, and once you have good values, you can fine-tune them by looking at roll and pitch response separately (if your vehicle is symmetric, this is not needed). 偏航那就很简单了，四旋翼对偏航角不是很敏感，我们甚至可以直接把偏航的D设为0。

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
- If the I gain is too low: this is best tested in *Acro mode*, by tilting the vehicle to one side about 45 degrees, and keeping it like that. 他应该始终保持相同的角度。 如果它往回漂移，增加** I **。 通过观察日志我们也可以发现** I **增益太小的问题，可以看到实际的角速度过很久也达不到期望的角速度。

I 增益一般在0.3~0.5之间，俯仰角的一般要大一点。

#### 测试步骤

要测试现在的增益，可以给一个在悬停状况下给一个**脉冲输入**（打一下杆再回来）然后观察飞行器的反应。 他应该反应很快，振荡和超调量都不大。(有种「锁定」的感觉)。

You can create a step-input for example for roll, by quickly pushing the roll stick to one side, and then let it go back quickly (be aware that the stick will oscillate too if you just let go of it, because it is spring-loaded — a well-tuned vehicle will follow these oscillations).

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

### Thrust Curve {#thrust_curve}

以上的调整都是在悬停油门的基础上的。 但当你增大油门的时候，你可能会看到控制性能又不太好了，机体又开始振荡了。

To counteract that adjust the **thrust curve** with the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter.

> **Note** The rate controller might need to be re-tuned if you change this parameter.

The mapping from motor control signals (e.g. PWM) to expected thrust is linear by default — setting `THR_MDL_FAC` to 1 makes it quadratic. Values in between use a linear interpolation of the two. Typical values are between 0.3 and 0.5.

If you have a [thrust stand](https://www.rcbenchmark.com/pages/series-1580-thrust-stand-dynamometer) (or can otherwise *measure* thrust), you can determine the relationship between the PWM control signal and the motor's actual thrust, and fit a function to the data. [This Notebook](https://github.com/PX4/px4_user_guide/blob/master/assets/config/mc/ThrustCurve.ipynb) shows how the thrust model factor `THR_MDL_FAC` may be calculated from previously measured thrust data.

[![Thrust Curve Compensation](../../images/mc_pid_tuning/thrust-curve-compensation.svg)](https://github.com/PX4/px4_user_guide/blob/master/assets/config/mc/ThrustCurve.ipynb)

> **Note** The mapping between PWM and static thrust depends highly on the battery voltage.

If you don't have access to a thrust stand, you can also tune the modeling factor empirically. Start off with 0.3 and increase it by 0.1 at a time. If it is too high, you will start to notice oscillations at lower throttle values. If it is too low you'll notice oscillations at higher throttle values.

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

The rate controller outputs torque commands for all three axis (roll, pitch and yaw) and a scalar thrust value, which need to be converted into individual motor thrust commands. This step is called mixing.

It can happen that one of the motor commands becomes negative, for example for a low thrust and large roll command (and similarly it can go above 100%). This is a mixer saturation. It is physically impossible for the vehicle to execute these commands (except for reversible motors). PX4 has two modes to resolve this:

- Either by reducing the commanded torque for roll such that none of the motor commands is below zero (Airmode disabled). In the extreme case where the commanded thrust is zero, it means that no attitude correction is possible anymore, which is why a minimum thrust is always required for this mode.
- Or by increasing (boosting) the commanded thrust, such that none of the motor commands is negative (Airmode enabled). This has the big advantage that the attitude/rates can be tracked correctly even at low or zero throttle. It generally improves the flight performance.
  
  However it increases the total thrust which can lead to situations where the vehicle continues to ascend even though the throttle is reduced to zero. For a well-tuned, correctly functioning vehicle it is not the case, but for example it can happen when the vehicle strongly oscillates due to too high P tuning gains.

Both modes are shown below with a 2D illustration for two motors and a torque command for roll <span style="color:#9673A6">r</span>. On the left motor <span style="color:#9673A6">r</span> is added to the commanded thrust, while on the right motor it is subtracted from it. The motor thrusts are in <span style="color:#6A9153">green</span>. With Airmode enabled, the commanded thrust is increased by <span style="color:#B85450">b</span>. When it is disabled, <span style="color:#9673A6">r</span> is reduced.

    ![Airmode](../../images/mc_pid_tuning/MC_PID_tuning-Airmode.svg)
    

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

If mixing becomes saturated towards the upper bound the commanded thrust is reduced to ensure that no motor is commanded to deliver more than 100% thrust. This behaviour is similar to the Airmode logic, and is applied whether Airmode is enabled or disabled.

Once your vehicle flies well you can enable Airmode via the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter.