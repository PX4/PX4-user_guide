# 多旋翼PID调参（手动/高级）

本主题提供有关 PX4 控制器以及如何调参的详细信息。

:::tip
[Autotune](../config/autotune_mc.md) is recommended for tuning the vehicles _around the hover thrust point_, as the approach described is intuitive, easy, and fast. 这就是许多机体所需要的全部。
:::

当调整悬停推力点不足时使用自动调参（例如，在机体上，在更高推力时存在非线性和振荡）。 它还有助于更深入地了解基本调参原理的工作方式，并了解如何使用[airmode](#airmode-mixer-saturation)设置。

## 调参步骤

::: info
出于安全原因，这些默认参数增益都比较低。
您必须增加增益才能得到良好的控制响应。
:::

以下是做调参时要遵循的一些要点：

- 调整增益时，所有的增益值都应该慢慢增加, 因为增益过大可能会导致危险的振荡! 一般情况下，每次增益值的调整幅度大约在20%到30%，获得最优增益值后，基于最优值再下调5%到10%。
- 在修改参数之前务必先着陆。 慢慢增加油门，观察振荡的现象。
- 调参时的油门值应该在无人机的悬停油门, 并使用 [ 推力曲线参数 ](#thrust-curve) 来观察或判断推力非线性或高推力振荡现象。
- 可以通过 [ SDLOG_PROFILE ](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 参数，启用高速率日志记录配置文件, 以便使用日志来查看角速率和姿态跟踪性能  (之后可以禁用该选项) 。

::warning 在调参过程中，禁用 [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE)。
:::

### 角速度控制器

角速度控制是最内环的控制器，它用三个独立的PID控制来控制机身角速度(航向，俯仰，横滚)。

::: info 把角速度控制器调好非常重要，因为它会影响 _所有_ 飞行模式。 角速度控制器调得好不好可以在[位置模式](../flight_modes_mc/position.md)中体现出来，举个例子，你的飞机可能会「抽搐」（飞行器无法很好地悬停在空中）
:::

#### 速率控制器架构/形式

PX4 supports two (mathematically equivalent) forms of the PID rate controller in a single "mixed" implementation: [Parallel](#parallel-form) and [Standard](#standard-form).

Users can select the form that is used by setting the proportional gain for the other form to "1" (i.e. in the diagram below set **K** to 1 for the parallel form, or **P** to 1 for the standard form - this will replace either the K or P blocks with a line).

![PID_Mixed](../../assets/mc_pid_tuning/PID_algorithm_Mixed.png)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1hXnAJVRyqNAdcreqNa5W4PQFkYnzwgOO/view?usp=sharing -->

- _G(s)_ represents the angular rates dynamics of a vehicle
- _r_ is the rate setpoint
- _y_ is the body angular rate (measured by a gyro)
- _e_ is the error between the rate setpoint and the measured rate
- _u_ is the output of the PID controller

这两种形式将在后面介绍。

::: info The derivative term (**D**) is on the feedback path in order to avoid an effect known as the [derivative kick](http://brettbeauregard.com/blog/2011/04/improving-the-beginner%E2%80%99s-pid-derivative-kick/).
:::

:::tip
For more information see:

- [Not all PID controllers are the same](https://www.controleng.com/articles/not-all-pid-controllers-are-the-same/) (www.controleng.com)
- [PID controller > Standard versus parallel (ideal) PID form](https://en.wikipedia.org/wiki/PID_controller#Standard_versus_parallel_(ideal)_form) (Wikipedia)

:::

##### 并行模式

_并行模式_ 是最简单的形式，也是教科书中最常用的形式。 在这种情况下，控制器的输出只是简单的将比例，积分和微分项相加。

![PID_Parallel](../../assets/mc_pid_tuning/PID_algorithm_Parallel.png)

##### 标准模式

这种形式在数学上等同于并行形式。 但主要的优点是（即使似乎有点反直觉）将比例增益的调试与积分、微分增益分离开了。 这意味着一个新的平台通过使用同样大小/推力 无人机的增益，使它更易于调试，只是简单地调整K增益就可正常飞行。

![PID_Standard](../../assets/mc_pid_tuning/PID_algorithm_Standard.png)

#### 角速度 PID 调试

调试角速度PID控制器的相关参数是：

- 滚转速率控制 ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D), [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K))
- Pitch rate control ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P), [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I), [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D), [MC_PITCHRATE_K](../advanced_config/parameter_reference.md#MC_PITCHRATE_K))
- Yaw rate control ([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P), [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I), [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D), [MC_YAWRATE_K](../advanced_config/parameter_reference.md#MC_YAWRATE_K))

速率控制器可以在 [特技 Acro 模式](../flight_modes_mc/acro.md) 或 [手动/自稳模式](../flight_modes_mc/manual_stabilized.md) 中进行调校：

- _Acro mode_ 更推荐使用，但这种模式比较难飞。 如果你选择特技模式，记得把特技模式指数因子都禁用了：
  - `MC_ACRO_EXPO` = 0, `MC_ACRO_EXPO_Y` = 0, `MC_ACRO_SUPEXPO` = 0, `MC_ACRO_SUPEXPOY` = 0
  - `MC_ACRO_P_MAX` = 200, `MC_ACRO_R_MAX` = 200
  - `MC_ACRO_Y_MAX` = 100
- _手动/自稳模式_更好飞，但这种模式也比较难观察姿态和角速度控制器到底调好了没。

万一你的飞行器完全飞不起来：

- 如果你发现首次起飞有严重的振荡（严重到根本没法飞），那你可以减小所有的**P**和**D**参数，直到它能够正常起飞。
- 如果对遥控器的响应微小，增加 **P** 增益。

_手动模式_和_特技模式_的调参套路差不多：一步步地迭代调整滚转和俯仰的**P**和**D**增益，然后再调**I**增益。 一开始你的ROLL和PITCH可以用相同的值，等调的差不多了，细调的时候可以分别再调整滚转和俯仰（如果你的飞行器是对称的，那就不用再细调了。） 偏航调试也是同样的方法，除了偏航的**D**可以为0

##### 比例增益 (P/K)

比例增益用于最小化跟踪误差 (下面我们使用 **P** 来代指 **P** 或 **K**)。 它可以加快响应速度，因此应该在不引入震荡的前提下设的尽量的高。

- 如果**P**增益太高了，会有高频振荡。
- 如果 **P** 增益太低了:
  - 飞行器会对遥控器的输入很迟钝。
  - 如果是在_特技模式_下，飞行器会漂移，你会一直要矫正它来让它水平。

##### 微分增益 (D)

**D增益**(微分增益) 用来增加阻尼，可以防止超调。 同样地，这个值应该尽量设大一些来避免超调。

- **D增益**太大，电机可能会抽搐、发热(也有可能不会) 。这是因为**D**项同时也会放大震动等带来的噪声。
- **D增益**太低会导致超调，在一个阶跃输入后看到超调。

典型值是：

- 标准模式 (**P** = 1): 在 0.01 (4" racer) 和 0.04 (500 size) 之间, 不管 **K**是多少
- 并行模式 (**K** = 1): 0.0004 到0.005之间, 取决于 **P**的值

##### 积分增益 (I)

**I**（积分）增益可以「记住误差」。 当一段时间后没有达到目的角速度，积分项 **I**就会增加 它很重要(尤其在_特技模式_下) ，但我们不应该把它设得太高。

- 如果积分增益太高：你会看到缓慢的振荡。
- 如果积分增益太低：我们可以在_特技模式_下很好地看到这一点，让飞行器朝一个方向转45度，并保持一会。 他应该始终保持相同的角度。 如果它往回漂移，增加** I **。 通过观察日志我们也可以发现** I **增益太小的问题，可以看到实际的角速度过很久也达不到期望的角速度。

典型值是：

- 标准模式 (**P** = 1): 在 0.5 (VTOL 飞机), 1 (500 size) and 8 (4" 竞速机) 之间, 不管 **K**是多少
- 并行模式 (**K** = 1): 如果 **P** 是差不多 0.15，那在0.3 和 0.5之间。 俯仰的增益一般要比横滚的高一点。

#### 测试步骤

要测试现在的增益，可以给一个在悬停状况下给一个**脉冲输入**（打一下杆再回来）然后观察飞行器的反应。 他应该反应很快，振荡和超调量都不大。(有种「锁定」的感觉)。

比如在横滚方向上来一个阶跃输入，把横滚杆推向一侧，然后让它迅速回中（注意如果你直接松手的话，由于它的弹簧结构，杆会振荡 - 调好的无人机会跟随这些振荡）。

::: info A well-tuned vehicle in _Acro mode_ will not tilt randomly towards one side, but keeps the attitude for tens of seconds even without any corrections.
:::

#### 日志

看看日志有助于你看看你调的参咋样。 下面是一份调得比较好的滚转和偏航角速度的日志。

![roll rate tracking](../../assets/mc_pid_tuning/roll_rate_tracking.png) ![yaw rate tracking](../../assets/mc_pid_tuning/yaw_rate_tracking.png)

下面这份日志的滚转角速度调试的很好，它有几个翻转，也就是很极限的阶跃输入。 你可以看到飞行器的超调量非常小。 ![roll rate tracking flips](../../assets/mc_pid_tuning/roll_rate_tracking_flip.png)

### 角度控制

角度控制环控制机体的姿态角，并通过以下参数输出目标角速度：

- 滚转角控制 ([MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P))
- 俯仰角控制（[MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P)）
- 偏航角控制 ([MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P))

姿态角控制环调起来就容易多了。 其实大多数时候默认值就够了，完全不用调。

角度控制环可以在_手动/自稳模式_下调，逐渐增大**P**增益。 如果看到有振荡或者超调，就说明增益调得太高了。

下面这几个参数也可以调整 这些参数决定了绕三个轴的最大角速度：

- Maximum roll rate ([MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX))
- Maximum pitch rate ([MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX))
- Maximum yaw rate ([MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX))

### 推力曲线

以上的调整都是在悬停油门的基础上的。 但当你逐渐增大到满油门时，机体可能又开始振荡了。

To counteract that, adjust the **thrust curve** with the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter.

::: info
The rate controller might need to be re-tuned if you change this parameter.
:::

The mapping from motor control signals (e.g. PWM) to expected thrust is linear by default — setting `THR_MDL_FAC` to 1 makes it quadratic. Values in between use a linear interpolation of the two. Typical values are between 0.3 and 0.5.

If you have a [thrust stand](https://www.tytorobotics.com/pages/series-1580-1585) <!-- RCbenchmark Series 1580/1585 Test Stand --> (or can otherwise _measure_ thrust and motor commands simultaneously), you can determine the relationship between the motor control signal and the motor's actual thrust, and fit a function to the data. The motor command in PX4 called `actuator_output` can be PWM, Dshot, UAVCAN commands for the respective ESCs in use. [This Notebook][THR_MDL_FAC_Calculation] shows one way for how the thrust model factor `THR_MDL_FAC` may be calculated from previously measured thrust and PWM data. The curves shown in this plot are parametrized by both &alpha; and k, and also show thrust and PWM in real units (kgf and &mu;s). In order to simplify the curve fit problem, you can normalize the data between 0 and 1 to find `k` without having to estimate &alpha; (&alpha; = 1, when the data is normalized).

![Thrust Curve Compensation](../../assets/mc_pid_tuning/thrust-curve-compensation.svg)] <!-- removed link to THR_MDL_FAC_Calculation as causes problems for link checker -->

::: info
The mapping between PWM and static thrust depends highly on the battery voltage.
:::

An alternative way of performing this experiment is to make a scatter plot of the normalized motor command and thrust values, and iteratively tune the thrust curve by experimenting with the `THR_MDL_FAC` parameter. An example of that graph is shown here:

![Graph showing relative thrust and PWM scatter](../../assets/mc_pid_tuning/relative_thrust_and_pwm_scatter.svg)

If raw motor command and thrust data is collected throughout the full-scale range in the experiment, you can normalize the data using the equation:

_normalized_value = ( raw_value - min (raw_value) ) / ( max ( raw_value ) - min ( raw_value ) )_

After you have a scatter plot of the normalized values, you can try and make the curve match by plotting the equation

_rel_thrust = ( `THR_MDL_FAC` ) _ rel*signal^2 + ( 1 - `THR_MDL_FAC` ) * rel*signal*

over a linear range of normalized motor command values between 0 and 1. Note that this is the equation that is used in the firmware to map thrust and motor command, as shown in the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter reference. Here, _rel_thrust_ is the normalized thrust value between 0 and 1, and _rel_signal_ is the normalized motor command signal value between 0 and 1.

In this example above, the curve seemed to fit best when `THR_MDL_FAC` was set to 0.7.

If you don't have access to a thrust stand, you can also tune the modeling factor empirically. Start off with 0.3 and increase it by 0.1 at a time. If it is too high, you will start to notice oscillations at lower throttle values. If it is too low you'll notice oscillations at higher throttle values.

<a id="airmode"></a>

### Airmode & 混控器饱和

The rate controller outputs torque commands for all three axis (roll, pitch and yaw) and a scalar thrust value, which need to be converted into individual motor thrust commands. This step is called mixing.

It can happen that one of the motor commands becomes negative, for example for a low thrust and large roll command (and similarly it can go above 100%). This is a mixer saturation. It is physically impossible for the vehicle to execute these commands (except for reversible motors). PX4 has two modes to resolve this:

- Either by reducing the commanded torque for roll such that none of the motor commands is below zero (Airmode disabled). In the extreme case where the commanded thrust is zero, it means that no attitude correction is possible anymore, which is why a minimum thrust is always required for this mode.
- Or by increasing (boosting) the commanded thrust, such that none of the motor commands is negative (Airmode enabled). This has the big advantage that the attitude/rates can be tracked correctly even at low or zero throttle. It generally improves the flight performance.

  However it increases the total thrust which can lead to situations where the vehicle continues to ascend even though the throttle is reduced to zero. For a well-tuned, correctly functioning vehicle it is not the case, but for example it can happen when the vehicle strongly oscillates due to too high P tuning gains.

Both modes are shown below with a 2D illustration for two motors and a torque command for roll <span style="color:#9673A6">r</span>. On the left motor <span style="color:#9673A6">r</span> is added to the commanded thrust, while on the right motor it is subtracted from it. The motor thrusts are in <span style="color:#6A9153">green</span>. With Airmode enabled, the commanded thrust is increased by <span style="color:#B85450">b</span>. When it is disabled, <span style="color:#9673A6">r</span> is reduced.

![Airmode](../../assets/mc_pid_tuning/MC_PID_tuning-Airmode.svg)

<!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

If mixing becomes saturated towards the upper bound the commanded thrust is reduced to ensure that no motor is commanded to deliver more than 100% thrust. This behaviour is similar to the Airmode logic, and is applied whether Airmode is enabled or disabled.

Once your vehicle flies well you can enable Airmode via the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter.

[THR_MDL_FAC_Calculation]: https://github.com/PX4/PX4-user_guide/blob/main/assets/config/mc/ThrustCurve.ipynb
