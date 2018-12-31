# Multicopter PID Tuning Guide

本教程介绍如何在 PX4 上整定 [ 多旋翼 ](../airframes/airframe_reference.md#copter) (四、六、八旋翼等) 的 PID 参数 。

通常, 如果您使用的是 [ 已经支持的机型 ](../airframes/airframe_reference.md#copter) (例如, [ QGroundControl ](../config/airframe.md) 中的机身), 则默认参数应足以安全地飞行。 为了获得最好的性能, 最好能整定新飞机的 PID 参数。 例如, 不同的电调或电机需要不同的控制增益, 才能获得最佳飞行效果。

> ** 警告 **本指南仅适用于高级用户。 不合适的参数可能会导致飞行器不稳定，甚至炸机。 确保预先指定保护开关 ( Kill-switch ) 。

## 简介

PX4 使用 ** P ** 比例、** I ** 积分、** D ** 微分 (PID) 控制器, 是使用最广泛的控制技术。

控制器是分级的, 这意味着外环的控制器将其结果传递给内环的控制器。 最内环的控制器是 ** 角速率控制器 **, 然后是 ** 姿态控制器 **, 然后 ** 速度 & 位置控制器 **。 PID 调参需要按相同的顺序进行, 从角速率控制器开始, 因为它将影响其他所有控制器。

## 前置条件

- 您已为您的飞行器选择了最接近的 [ 默认机型配置 ](../config/airframe.md)。 这应该可以让你的飞行器飞起来。
- 您应该已经执行过 [ 电调（ESC）校准 ](../advanced_config/esc_calibration.md)。
- [ PWM_MIN ](../advanced_config/parameter_reference.md#PWM_MIN) 正确设置。 它需要设置一个小值, 但当飞行器解锁时, 需要保证 ** 电机不停转 **。
  
  可以在 [ "Acro 模式" ](../flight_modes/acro_mc.md) 或 [ 手动/自稳模式 ](../flight_modes/manual_stabilized_mc.md) 中进行测试:
  
  - 卸下螺旋桨
  - 解锁，并将油门杆拉到最低
  - 把飞行器倾斜到各个方向, 大约60度
  - 确保没有电机停转
- 可以通过 [ SDLOG_PROFILE ](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 参数，启用高速率日志记录配置文件, 以便使用日志来查看角速率和姿态跟踪性能 (之后可以禁用该选项) 。

> **警告** 在调参过程中，禁用 [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE)。

## 调参步骤

> ** 注意 **出于安全原因, 所有的增益都默认设置为低值.   
> 如果想获得良好的控制响应，必须相应的增加增益值。 

以下是做PID调参时要遵循的一些常规:

- 调整增益时，所有的增益值都应该慢慢增加, 因为增益过大可能会导致危险的振荡! 一般情况下，每次增益值的调整幅度大约在20%到30%，获得最优增益值后，基于最优值再下调5%到10%。
- 在修改参数之前务必先着陆。 慢慢增加油门，观察振荡的现象。
- 调参时的油门值应该在无人机的悬停油门, 并使用 [ 推力曲线参数（Thrust Curve Parameter 或 TPA) ](#thrust_curve) 来观察或判断推力非线性或高推力振荡现象。

### Rate Controller

角速度控制是最内环的控制器，它用三个独立的PID控制来控制角速度

- 滚转角速度控制 ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D)) 
- 俯仰角速度控制 ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P), [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I), [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D))
- 偏航角速度控制([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P), [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I), [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D)) 

> **注意** 把角速度控制器调好是非常重要的，因为它会影响到 *所有的*飞行模式。 角速度控制器跳得好不好可以在[位置模式](../flight_modes/position_mc.md)中显现出来，举个例子，你的飞机可能会「抽搐」（飞行器无法很好地悬停在空中）

角速度控制器可以在[特技模式](../flight_modes/acro_mc.md)或者[手动/自稳模式](../flight_modes/manual_stabilized_mc.md)中调整。

- *我们更推荐特技模式，* 但这种模式比较难飞。 If you choose this mode, disable all stick expo: 
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

**I**(积分增益) 可以「记住误差」。 如果你发现过了一段时间了，角速度还是达不到设定值，那就该增加** I **了。 它很重要(尤其在*特技模式*下) ，但我们不应该把它设得太高。

- 如果积分增益太高：你会看到缓慢的振荡。
- 如果积分增益太低——我们可以在*特技模式*下很好地看到这一点，让飞行器朝一个方向转45度，并保持一会。 他应该始终保持相同的角度。 如果它往回漂移，增加** I **。 通过观察日志我们也可以发现** I **增益太小的问题，可以看到实际的角速度过很久也达不到期望的角速度。

I 增益一般在0.3~0.5之间，俯仰角的一般要大一点。

#### 测试步骤

要测试现在的增益，可以给一个在悬停状况下给一个**脉冲输入**（打一下杆再回来）然后观察飞行器的反应。 他应该反应很快，振荡和超调量都不大。(有种「锁定」的感觉)。

举个例子，你可以把杆迅速打到一边，然后再让杆归位，给一个滚转方向的脉冲输入。(注意，让杆归位的时候不要直接松手，不然的话杆归位会在中间弹一下，这会导致你输入的命令也「弹一下」。)

> **注** 一个调得很好的旋翼在*特技模式*不会随便超某个方向倾斜，即使不做任何矫正也能保持姿态几十秒。

#### 日志

看看日志有助于你看看你调的参咋样。 下面是一份调得比较好的滚转和偏航角速度的日志。

![roll rate tracking](../../images/mc_pid_tuning/roll_rate_tracking.png) ![yaw rate tracking](../../images/mc_pid_tuning/yaw_rate_tracking.png)

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
- Maximum yaw rate ([MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX))

### Thrust Curve / Throttle PID Attenuation (TPA) {#thrust_curve}

The tuning above optimises performance around the hover throttle. But it can be that you start to see oscillations when going towards full throttle.

There are two ways to counteract that:

- Adjust the **thrust curve** with the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter (preferred method). The thrust to PWM mapping is linear by default — setting `THR_MDL_FAC` to 1 makes it quadratic. Values in between use a linear interpolation of the two. Typical values are between 0.3 and 0.5. You can start off with 0.3 and then increase it by 0.1 at a time. If it is too high, you will start to notice oscillations at lower throttle values.
  
  > **Note** The rate controller must be re-tuned if you change this parameter.

- Enable **Throttle PID Attenuation** (TPA), which is used to linearly reduce the PID gains when the throttle is above a threshold (<span style="color:#6383B0">breakpoint</span>, `MC_TPA_BREAK_*` parameters). The <span style="color:#8D6C9C">attenuation rate</span> is controlled via `MC_TPA_RATE_*` parameters. TPA should generally not be needed, but it can be used in addition to the thrust curve parameter. The following illustration shows the thrust in relationship to the attenuated PID values:
  
  ![TPA](../../images/mc_pid_tuning/MC_PID_tuning-TPA.svg) <!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the second Tab
-->

<!-- TODO: needed?
#### Feed Forward Tuning

Parameters: [MC_YAW_FF](../advanced_config/parameter_reference.md#MC_YAW_FF).

This parameter is not critical and can be tuned in flight, in worst case
yaw response will be sluggish or too fast. Play with FF parameter to get
comfortable response. Valid range is 0…1. Typical value is 0.8…0.9. (For
aerial video optimal value may be much smaller to get smooth response.)

Look at `ATTITUDE.yaw` in *QGroundControl*. Yaw overshoot should be not more
than 2-5% (which is less than the overshoot for roll and pitch angles).
-->

<!-- TODO
### Velocity & Position Controller
The PID-Gains should be chosen such that tracking is as tight as possible. Before doing any position/velocity control related tuning,
turn off all [higher-level position controller tuning gains](../config_mc/advanced_mc_position_tuning.md).

- [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX): 1000
- [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR) : 1000
- [MPC_DEC_HOR_SLOW](../advanced_config/parameter_reference.md#MPC_DEC_HOR_SLOW) : 1000 
- [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX) : 1000 
- [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX) : 1000 
- [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX) : 0 
- [MPC_JERK_MIN](../advanced_config/parameter_reference.md#MPC_JERK_MIN) : 1
 -->

### Airmode & Mixer Saturation {#airmode}

The rate controller outputs torque commands for all three axis (roll, pitch and yaw) and a scalar thrust value, which need to be converted into individual motor thrust commands. This step is called mixing.

It can happen that one of the motor commands becomes negative, for example for a low thrust and large roll command (and similarly it can go above 100%). This is a mixer saturation. It is physically impossible for the vehicle to execute these commands (except for reversible motors). PX4 has two modes to resolve this:

- Either by reducing the commanded torque for roll such that none of the motor commands is below zero (Airmode disabled). In the extreme case where the commanded thrust is zero, it means that no attitude correction is possible anymore, which is why a minimum thrust is always required for this mode.
- Or by increasing (boosting) the commanded thrust, such that none of the motor commands is negative (Airmode enabled). This has the big advantage that the attitude/rates can be tracked correctly even at low or zero throttle. It generally improves the flight performance.
  
  However it increases the total thrust which can lead to situations where the vehicle continues to ascend even though the throttle is reduced to zero. For a well-tuned, correctly functioning vehicle it is not the case, but for example it can happen when the vehicle strongly oscillates due to too high P tuning gains.

Both modes are shown below with a 2D illustration for two motors and a torque command for roll <span style="color:#9673A6">r</span>. On the left motor
<span style="color:#9673A6">r</span> is added to the commanded thrust, while on the right motor it is substracted from it. The motor thrusts are in <span style="color:#6A9153">green</span>. With Airmode enabled, the commanded thrust is increased by
<span style="color:#B85450">b</span>. When it is disabled,
<span style="color:#9673A6">r</span> is reduced.

    ![Airmode](../../images/mc_pid_tuning/MC_PID_tuning-Airmode.svg)
    

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

If mixing becomes saturated towards the upper bound the commanded thrust is reduced to ensure that no motor is commanded to deliver more than 100% thrust. This behaviour is similar to the Airmode logic, and is applied whether Airmode is enabled or disabled.

Once your vehicle flies well you can enable Airmode via the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter.