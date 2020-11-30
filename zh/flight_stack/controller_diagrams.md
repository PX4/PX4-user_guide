# 控制器图解

本节包括PX4主要控制器的图解。

图解使用标准的 [PX4 符号](../contribute/notation.md) (附有详细图例注解)。


<!--    The diagrams were created with LaTeX / TikZ.
        The code can be found in assets/diagrams/mc_control_arch_tikz.tex.
        The easiest way to generate the diagrams and edit them is to copy the code and paste it an Overleaf (www.overleaf.com/) document to see the output.
-->

## 多旋翼位置控制器

![多旋翼位置控制器图解](../../assets/diagrams/mc_control_arch.jpg)

* 状态估计来自[EKF2](../tutorials/tuning_the_ecl_ekf.md)模块。
* 这是一个标准的位置-速度级联控制回路。
* 状态估计来自[EKF2](../advanced_config/tuning_the_ecl_ekf.md)模块。
* 在某些模式，外环(位置回路) 可能会被绕过 (图中在外环之后增加一个多路开关来表示)。 只有在位置保持模式或某轴无速度请求时，位置回路才会发挥作用。

### 空速缩放补偿

![固定翼姿态控制器图解](../../assets/diagrams/mc_angular_rate_diagram.jpg)

* K-PID controller. See [Rate Controller](../config_mc/pid_tuning_guide_multicopter.md#rate-controller) for more information.
* The integral authority is limited to prevent wind up.
* A Low Pass Filter (LPF) is used on the derivative path to reduce noise.
* The outputs are limited, usually at -1 and 1.

### Multicopter Attitude Controller

![MC Angle Control Diagram](../../assets/diagrams/mc_angle_diagram.jpg)

* The attitude controller makes use of [quaternions](https://en.wikipedia.org/wiki/Quaternion).
* The controller is implemented from this [article](https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf).
* When tuning this controller, the only parameter of concern is the P gain.
* The rate command is saturated.

### Multicopter Velocity Controller

![MC Velocity Control Diagram](../../assets/diagrams/mc_velocity_diagram.jpg)

* PID controller to stabilise velocity. Commands an acceleration.
* The integrator includes an anti-reset windup (ARW) using a clamping method.
* The commanded acceleration is saturated.

### 多旋翼位置控制器

![MC Position Control Diagram](../../assets/diagrams/mc_position_diagram.jpg)

* Simple P controller that commands a velocity.
* The commanded velocity is saturated to keep the velocity in certain limits.

#### 静态力矩 (PI) 缩放补偿

![多旋翼位置控制器图解](../../assets/diagrams/px4_mc_position_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/open?id=13Mzjks1KqBiZZQs15nDN0r0Y9gM_EjtX
Request access from dev team. -->

## 固定翼姿态控制器

### 总能量控制系统
通过总能量控制系统(TECS)，PX4可以持续得对固定翼飞行器的真空速和高度进行控制。 这其中的代码通过一个用库（这个库是用于固定翼位置控制模块）作为接口。

![总能量控制系统](../../assets/diagrams/tecs_in_context.svg)

从上面的图表可以看出，总能量控制系统接受空速和高度需求量，然后输出油门和俯仰角控制量。 这两个输出控制量输入到固定翼的姿态控制器（姿态控制器实施姿态控制） 因此，总能量控制系统是直接受到俯仰控制逻辑环的性能影响 对飞行器俯仰角度的预测不准往往会导致对空速和高度的预测不准。

> **Note** 如果没有安装空速传感器，固定翼姿态控制的增益调整将被禁用 (它是开环的)；您将无法在 TECS (全能量控制系统) 中使用空速反馈。

对真空速和高度的持续跟踪控制不是一个简单的事情。 增加飞行器的俯仰角度不仅会导致高度上升还会导致空速下降。 增加油门会使空速增加但是也会使升力变大从而使高度也增加。 因此，俯仰角和油门两个输入量都会对空速和高度产生影响，从而使控制问题变得难了。

总能量控制系统通过能量法来解决这个问题，而不是通过之前的那种设定点进行控制。 一架飞行器的总能量包括动能和势能。 推力（通过油门控制）增加整个飞机的总能量。 势能和动能的任意组合可以组成总能量 换句话说，飞行器在高海拔以低空速飞行和在低海拔以高空速飞行时的总能量是等价的 我们称这种情况叫做特殊能量平衡，通过当前高度海拔和真空速设定值来计算 特定能量平衡通过飞行器的俯仰角来控制 俯仰角增加将动能转变为势能，减少则情况相反。 这样就把控制问题解耦成最初的空速设定点转化了多少势能能量，而转化多少能量可以独立控制。 我们利用推力调节飞行器的特定总能量，俯仰角来维持势能（高度）和动能（真空速）的特定平衡点。


#### 角速率回路 (FF) 缩放补偿

![能量回路](../../assets/diagrams/TECS_throttle.jpg)


#### 总结

![能量平衡回路](../../assets/diagrams/TECS_pitch.jpg)

$$\ell = \frac{1}{2}\rho V_T^2 S b C_\ell = \bar{q} S b C_\ell$$,

$$\ell$$ 代表滚转力矩，$$b$$ 代表飞机翼展，$$S$$ 代表参考面。

无量纲的滚转力矩系数 $$C_\ell$$ 可以通过通过以下几个系数建模得到：副翼效率系数 $$C_{\ell_{\delta_a}}$$，滚转阻尼系数 $$C_{\ell_p}$$ 和二面角系数 $$C_{\ell_\beta}$$。

$$C_\ell = C_{\ell_0} + C_{\ell_\beta}\:\beta + C_{\ell_p}\:\frac{b}{2V_T}\:p + C_{\ell_{\delta_a}} \:\delta_a$$,

$$\beta$$ 代表侧滑角，$$p$$ 代表滚转角速率，$$\delta_a$$ 代表副翼偏转角。

假设一架飞机对称 ($$C_{\ell_0} = 0$$) 且无侧滑 ($$\beta = 0$$) ，上面的方程就可以简化到只有滚转率阻尼和副翼产生的滚转力矩。

where $\gamma{}$ is the flight plan angle. For small $\gamma{}$ we can approximate this as:

刚才推导出的这个最终方程，将会作为后面两个小节的基线。

在滚转角速率为0 ($$p = 0$$) 的情况下, 阻尼项将会消失，并得到一个瞬时常量

$$\ell = \frac{1}{2}\rho V_T^2 S b \: C_{\ell_{\delta_a}} \:\delta_a = \bar{q} S b \: C_{\ell_{\delta_a}} \:\delta_a$$.

where T and D are the thrust and drag forces. In level flight, initial thrust is trimmed against the drag and a change in thrust results thus in:

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}} \frac{1}{\rho V_T^2} \ell = \frac{bS}{C_{\ell_{\delta_a}}} \frac{1}{\bar{q}} \ell$$,

观察上面的公式可以知道，第一项是个常值，第二项则取决于空气密度和真实空速的平方。

Elevator control on the other hand is energy conservative, and is thus used for exchanging potentional energy for kinetic energy and vice versa. To this end, a specific energy balance rate is defined as:

$$\bar{q} = \frac{1}{2} \rho V_T^2$$,

## 固定翼姿态控制器

![固定翼姿态控制器图解](../../assets/diagrams/px4_fw_attitude_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1ibxekmtc6Ljq60DvNMplgnnU-JOvKYLQ/view?usp=sharing
Request access from dev team. -->

姿态控制器由回路级联的方法实现。 外环计算姿态设定值和姿态估计值的误差，然后乘以增益 (比例控制器)，得到角速率设定值。 内环计算角度率误差并使用 PI (比例+积分) 控制器计算角加速度。

然后可以根据期望的角加速度和系统先验信息，通过控制分配 (又叫混控)，计算出执行机构 (副翼，水平尾翼，垂直尾翼，等) 的角偏移量。 另外，由于气动控制面的效率与速度正相关，因此控制率 - 一般在巡航速度下调参 - 按照空速测量值缩放刻度因子 (如果使用了空速传感器的话)。

> **Note** 如果没有安装空速传感器，固定翼姿态控制的增益调整将被禁用 (它是开环的)；您将无法在 TECS (全能量控制系统) 中使用空速反馈。

前馈增益用于补偿空气动力阻尼。 基本上，绕机体轴的两个主要力矩分量分别来自：控制翼面 (副翼，水平尾翼，垂直尾翼 - 驱动机体转动) 和 空气动力阻尼 (与机体角速率成正比 - 阻止机体转动) 。 为了保持恒定的角速率, 可以在速率回路中使用前馈来补偿这种气动阻尼。

滚转和俯仰控制器具有相同的结构，并且假定纵向和侧向气动力相互独立，没有耦合。 但是，为了将飞机侧滑产生的侧向加速度最小化，偏航控制器利用转向协调约束产生偏航速率设定值。 偏航速率控制器同样有助于抵消偏航效应带来的负面影响 (https://youtu.be/sNV_SDDxuWk) 并且可以提供额外的方向阻尼以减小 [荷兰滚效应 (十年没见过这个词了，好激动)](https://en.wikipedia.org/wiki/Dutch_roll)。


## VTOL 飞行控制器

![VTOL 姿态控制器图解](../../assets/diagrams/VTOL_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1tVpmFhLosYjAtVI46lfZkxBz_vTNi8VH/view?usp=sharing
Request access from dev team. -->

本节简要介绍垂直起降（VTOL）无人机的控制结构。 垂直起降飞行控制器由多旋翼控制器和固定翼控制器组成，多旋翼控制器在垂直起降模式下运行，固定翼控制器在平飞模式下运行，二者在过渡模式下同时运行。 上图是一个简化的控制流程图。 注意到 VTOL 姿态控制器模块，它主要对不同 VTOL 模式间的必要切换和混控逻辑，以及过渡模式下 VTOL 机型的特定控制动作（例如，在前向过渡期间加速标准 VTOL 的推进马达）起到促进作用。 此模块的输入称为“虚拟输入”，因为控制器会根据当前的 VTOL 模式而忽略一些输入。

对于标准和倾转旋翼 VTOL，在过渡期间，固定翼姿态控制器产生角速率设定值，然后将其输入到单独的角速率控制器中，从而产生多旋翼和固定翼执行器的扭矩指令。 而对尾座式 VTOL，在过渡期间，多旋翼姿态控制器独立运行。

VTOL姿态模块的输出是多旋翼执行器（典型的 `actuator_controls_0`）和固定翼（典型的 `actuator_controls_1`）执行器的独立的扭矩和力指令。 这些是在一个特定机型的混控器文件中处理的（参见[ Mixing](../concept/mixing.md)）。

有关调整 VTOL 模块内部过渡逻辑的更多信息，请参阅 [VTOL 配置](../config_vtol/README.md)。


### 空速缩放补偿

本节的目的是：通过公式来解释怎样根据空速调整角速率回路 (PI) 和前馈控制器 (FF) 的输出，以及为何如此。 我们首先给出简化的滚转轴线性力矩方程，然后说明空速对力矩产生的直接影响，最后是空速对匀速滚转运动的影响。

如上所示的固定翼姿态控制器，角速率控制器输出角加速度设定值，传递给控制分配器 (这里叫“混控”)。 为了达到期望的角加速度，混控必须利用气动控制面 (例如：典型的飞机有两个副翼，两个水平尾翼和一个垂直尾翼) 产生力矩。 气动控制面产生的力矩受以下因素影响最大：飞机的相对空速和空气密度，更准确的说，是气动压力。 如果没有针对空速的刻度化处理，在某一特定巡航速度下调参的控制器，将会使飞机在高速下发生振荡，或者在在低速下达不到理想的随动效果。

$$V_{I_0}$$ 和 $$V_{T_0}$$ 分别代表 IAS 和 TAS。

最终，由于执行器的输出是归一化的，并且假定混控和伺服模块是线性的，我们可以将上述方程重写如下

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$.

$$\rho$$ 代表空气密度，$$V_T$$ 代表真实空速 (TAS)。

以滚转轴为例，带量纲的滚转轴力矩可以表示为：

$$\ell = \frac{1}{2}\rho V_T^2 S b \left [C_{\ell_{\delta_a}} \:\delta_a + C_{\ell_p}\:\frac{b}{2V_T} \: p \right ]$$.

where $\ell{}$ is the roll moment, $b{}$ the wing span and $S{}$ the reference surface.

The nondimensional roll moment derivative $C_\ell{}$ can be modeled using the aileron effectiveness derivative $C_{\ell_{\delta_a}}{}$, the roll damping derivative $C_{\ell_p}{}$ and the dihedral derivative $C_{\ell_\beta}{}$

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$.

where $\beta{}$ is the sideslip angle, $p{}$ the body roll rate and $\delta_a{}$ the aileron deflection.

Assuming a symmetric ($C_{\ell_0} = 0{}$) and coordinated ($\beta = 0{}$) aircraft, the equation can be simplified using only the rollrate damping and the roll moment produced by the ailerons

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$.

刚才推导出的这个最终方程，将会作为后面两个小节的基线。

#### 静态力矩 (PI) 缩放补偿

At a zero rates condition ($p = 0{}$), the damping term vanishes and a constant - instantaneous - torque can be generated using:

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$.

转换成 $$\delta_a$$ 的表达式

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$,

观察上面的公式可以知道，第一项是个常值，第二项则取决于空气密度和真实空速的平方。

更进一步，先不用空气密度和TAS做刻度化，可以发现指示空速 (IAS, $$V_I$$) 在本质上是受空气密度影响的，在低空低速情况下，IAS可以乘以一个简单的密度误差因子转换成TAS

$$V_T = V_I \sqrt{\frac{\rho_0}{\rho}}$$

$$\rho_o$$ 代表海平面15°C下的空气密度。

经过一系列重组变换，得到 $$\bar{q}$$ 的表达式如下

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$

现在我们能清楚地看到气动压力与IAS的平方成正比

$$\bar{q} \propto V_I^2$$

之前用TAS和空气密度表示的刻度因数，最终可以用IAS重写成以下形式

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$

#### 角速率回路 (FF) 缩放补偿

角速率控制器前馈通道的主要作用是补偿转动阻尼。 回到我们的基线方程，这次在匀速滚转的条件下做简化，副翼产生的力矩必须恰好可以补偿阻尼项

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$

公式重组后，得到理想的副翼偏转角方程

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$

第一项给出了理想的前馈值，我们可以看到刻度因数相对TAS是线性的。 请注意那个负号，之后会与滚转阻尼系数的负号相互抵消。

#### 总结

角速率回路PI控制器的输出必须由指示空速 (IAS) 的平方刻度化，角速率回路前馈通道 (FF) 必须由真实空速 (TAS) 刻度化。

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$

where $V_{I_0}{}$ and $V_{T_0}{}$ are the IAS and TAS at trim conditions.

最终，由于执行器的输出是归一化的，并且假定混控和伺服模块是线性的，我们可以将上述方程重写如下:

$$\dot{\mathbf{\omega}}*{sp}^b = \frac{V*{I_0}^2}{V_I^2} \dot{\mathbf{\omega}}*{sp*{PI}}^b + \frac{V_{T_0}}{V_T} \dot{\mathbf{\omega}}*{sp*{FF}}^b$$,

该方程可以直接在滚转速率，俯仰速率和偏航速率控制器中实现

#### 调参建议

这套空速刻度化算法的巧妙之处就是它不需要特别的调参 但是对空速传感器的输出质量将直接影响它的性能

进一步讲，如果要将稳定飞行包线最大化，你应该在最小飞行速度和最大飞行速度的中点进行调参 (例如： 一架飞机的飞行速度在15 ~ 25m/s 之间，则应在20m/s调参)。 但是对空速传感器的输出质量将直接影响它的性能

进一步讲，如果要将稳定飞行包线最大化，你应该在最小飞行速度和最大飞行速度的中点进行调参 (例如： 一架飞机的飞行速度在15 ~ 25m/s 之间，则应在20m/s调参)。 [FW_AIRSPD_TRIM](../advanced/parameter_reference.md#FW_AIRSPD_TRIM) 参数. 必须被置为这个 "调参" 空速。
