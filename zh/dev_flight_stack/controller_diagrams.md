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
* Estimates come from [EKF2](https://docs.px4.io/master/en/advanced_config/tuning_the_ecl_ekf.html).
* 在某些模式，外环(位置回路) 可能会被绕过 (图中在外环之后增加一个多路开关来表示)。 只有在位置保持模式或某轴无速度请求时，位置回路才会发挥作用。

### 空速缩放补偿

![固定翼姿态控制器图解](../../assets/diagrams/mc_angular_rate_diagram.jpg)

* K-PID controller. See [Rate Controller](https://docs.px4.io/master/en/config_mc/pid_tuning_guide_multicopter.html#rate-controller) for more information.
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

### Multicopter Position Controller

![MC Position Control Diagram](../../assets/diagrams/mc_position_diagram.jpg)

* Simple P controller that commands a velocity.
* The commanded velocity is saturated to keep the velocity in certain limits.

#### 静态力矩 (PI) 缩放补偿

![MC Position Controller Diagram](../../assets/diagrams/px4_mc_position_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/open?id=13Mzjks1KqBiZZQs15nDN0r0Y9gM_EjtX
Request access from dev team. -->

## 固定翼姿态控制器

### Total Energy Control System (TECS)
The PX4 implementation of the Total Energy Control System (TECS) enables simultaneous control of true airspeed and altitude of a fixed wing aircraft. The code is implemented as a library which is used in the fixed wing position control module.

![TECS](../../assets/diagrams/tecs_in_context.svg)

As seen in the diagram above, TECS receives as inputs airspeed and altitude setpoints and outputs a throttle and pitch angle setpoint. These two outputs are sent to the fixed wing attitude controller which implements the attitude control solution. It's therefore important to understand that the performance of TECS is directly affected by the performance of the pitch control loop. A poor tracking of airspeed and altitude is often caused by a poor tracking of the aircraft pitch angle.

> **Note** 如果没有安装空速传感器，固定翼姿态控制的增益调整将被禁用 (它是开环的)；您将无法在 TECS (全能量控制系统) 中使用空速反馈。

Simultaneous control of true airspeed and height is not a trivial task. Increasing aircraft pitch angle will cause an increase in height but also a decrease in airspeed. Increasing the throttle will increase airspeed but also height will increase due to the increase in lift. Therefore, we have two inputs (pitch angle and throttle) which both affect the two outputs (airspeed and altitude) which makes the control problem challenging.

TECS offers a solution by respresenting the problem in terms of energies rather than the original setpoints. The total energy of an aircraft is the sum of kinetic and potential energy. Thrust (via throttle control) increases the total energy state of the aircraft. A given total energy state can be achieved by arbitrary combinations of potential and kinetic energies. In other words, flying at a high altitude but at a slow speed can be equivalent to flying at a low altitude but at a faster airspeed in a total energy sense. We refer to this as the specific energy balance and it is calculated from the current altitude and true airspeed setpoint. The specific energy balance is controlled via the aircraft pitch angle. An increase in pitch angle transfers kinetic to potential energy and a negative pitch angle vice versa. The control problem was therefore decoupled by transforming the initial setpoints into energy quantities which can be controlled independently. We use thrust to regulate the specific total energy of the vehicle and pitch maintain a specific balance between potential (height) and kinetic (speed) energy.


#### 角速率回路 (FF) 缩放补偿

![Energy loop](../../assets/diagrams/TECS_throttle.jpg)


#### 总结

![Energy balance loop](../../assets/diagrams/TECS_pitch.jpg)

$$\ell = \frac{1}{2}\rho V_T^2 S b C_\ell = \bar{q} S b C_\ell$$,

$$\ell$$ 代表滚转力矩，$$b$$ 代表飞机翼展，$$S$$ 代表参考面。

无量纲的滚转力矩系数 $$C_\ell$$ 可以通过通过以下几个系数建模得到：副翼效率系数 $$C_{\ell_{\delta_a}}$$，滚转阻尼系数 $$C_{\ell_p}$$ 和二面角系数 $$C_{\ell_\beta}$$。

$$C_\ell = C_{\ell_0} + C_{\ell_\beta}\:\beta + C_{\ell_p}\:\frac{b}{2V_T}\:p + C_{\ell_{\delta_a}} \:\delta_a$$,

$$\beta$$ 代表侧滑角，$$p$$ 代表滚转角速率，$$\delta_a$$ 代表副翼偏转角。

假设一架飞机对称 ($$C_{\ell_0} = 0$$) 且无侧滑 ($$\beta = 0$$) ，上面的方程就可以简化到只有滚转率阻尼和副翼产生的滚转力矩。

where $$\gamma$$ is the flight plan angle. For small $$\gamma$$ we can approximate this as

刚才推导出的这个最终方程，将会作为后面两个小节的基线。

在滚转角速率为0 ($$p = 0$$) 的情况下, 阻尼项将会消失，并得到一个瞬时常量

$$\ell = \frac{1}{2}\rho V_T^2 S b \: C_{\ell_{\delta_a}} \:\delta_a = \bar{q} S b \: C_{\ell_{\delta_a}} \:\delta_a$$.

where T and D are the thrust and drag forces. In level flight, initial thrust is trimmed against the drag and a change in thrust results thus in:

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}} \frac{1}{\rho V_T^2} \ell = \frac{bS}{C_{\ell_{\delta_a}}} \frac{1}{\bar{q}} \ell$$,

观察上面的公式可以知道，第一项是个常值，第二项则取决于空气密度和真实空速的平方。

Elevator control on the other hand is energy conservative, and is thus used for exchanging potentional energy for kinetic energy and vice versa. To this end, a specific energy balance rate is defined as

$$\bar{q} = \frac{1}{2} \rho V_T^2$$,

## Fixed-Wing Attitude Controller

![FW Attitude Controller Diagram](../../assets/diagrams/px4_fw_attitude_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1ibxekmtc6Ljq60DvNMplgnnU-JOvKYLQ/view?usp=sharing
Request access from dev team. -->

姿态控制器由回路级联的方法实现。 外环计算姿态设定值和姿态估计值的误差，然后乘以增益 (比例控制器)，得到角速率设定值。 内环计算角度率误差并使用 PI (比例+积分) 控制器计算角加速度。

然后可以根据期望的角加速度和系统先验信息，通过控制分配 (又叫混控)，计算出执行机构 (副翼，水平尾翼，垂直尾翼，等) 的角偏移量。 另外，由于气动控制面的效率与速度正相关，因此控制率 - 一般在巡航速度下调参 - 按照空速测量值缩放刻度因子 (如果使用了空速传感器的话)。

> **Note** If no airspeed sensor is used then gain scheduling for the FW attitude controller is  disabled (it's open loop); no correction is/can be made in TECS using airspeed feedback.

前馈增益用于补偿空气动力阻尼。 基本上，绕机体轴的两个主要力矩分量分别来自：控制翼面 (副翼，水平尾翼，垂直尾翼 - 驱动机体转动) 和 空气动力阻尼 (与机体角速率成正比 - 阻止机体转动) 。 为了保持恒定的角速率, 可以在速率回路中使用前馈来补偿这种气动阻尼。

滚转和俯仰控制器具有相同的结构，并且假定纵向和侧向气动力相互独立，没有耦合。 但是，为了将飞机侧滑产生的侧向加速度最小化，偏航控制器利用转向协调约束产生偏航速率设定值。 偏航速率控制器同样有助于抵消偏航效应带来的负面影响 (https://youtu.be/sNV_SDDxuWk) 并且可以提供额外的方向阻尼以减小 [荷兰滚效应 (十年没见过这个词了，好激动)](https://en.wikipedia.org/wiki/Dutch_roll)。


## VTOL Flight Controller

![VTOL Attitude Controller Diagram](../../assets/diagrams/VTOL_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1tVpmFhLosYjAtVI46lfZkxBz_vTNi8VH/view?usp=sharing
Request access from dev team. -->

This section gives a short overview on the control structure of Vertical Take-off and Landing (VTOL) aircraft. The VTOL flight controller consists of both the multicopter and fixed-wing controllers, either running separately in the corresponding VTOL modes, or together during transitions. The diagram above presents a simplified control diagram. Note the VTOL attitude controller block, which mainly facilitates the necessary switching and blending logic for the different VTOL modes, as well as VTOL-type-specific control actions during transitions (e.g. ramping up the pusher motor of a standard VTOL during forward transition). The inputs into this block are called "virtual" as, depending on the current VTOL mode, some are ignored by the controller.

For a standard and tilt-rotor VTOL, during transition the fixed-wing attitude controller produces the rate setpoints, which are then fed into the separate rate controllers, resulting in torque commands for the multicopter and fixed-wing actuators. For tailsitters, during transition the multicopter attitude controller is running.

The outputs of the VTOL attitude block are separate torque and force commands for the multicopter (typically `actuator_controls_0`) and fixed-wing (typically `actuator_controls_1`) actuators. These are handled in an airframe-specific mixer file (see [Mixing](../concept/mixing.md)).

For more information on the tuning of the transition logic inside the VTOL block, see [VTOL Configuration](https://docs.px4.io/master/en/config_vtol/).


### Airspeed Scaling

本节的目的是：通过公式来解释怎样根据空速调整角速率回路 (PI) 和前馈控制器 (FF) 的输出，以及为何如此。 我们首先给出简化的滚转轴线性力矩方程，然后说明空速对力矩产生的直接影响，最后是空速对匀速滚转运动的影响。

如上所示的固定翼姿态控制器，角速率控制器输出角加速度设定值，传递给控制分配器 (这里叫“混控”)。 为了达到期望的角加速度，混控必须利用气动控制面 (例如：典型的飞机有两个副翼，两个水平尾翼和一个垂直尾翼) 产生力矩。 气动控制面产生的力矩受以下因素影响最大：飞机的相对空速和空气密度，更准确的说，是气动压力。 如果没有针对空速的刻度化处理，在某一特定巡航速度下调参的控制器，将会使飞机在高速下发生振荡，或者在在低速下达不到理想的随动效果。

$$V_{I_0}$$ 和 $$V_{T_0}$$ 分别代表 IAS 和 TAS。

最终，由于执行器的输出是归一化的，并且假定混控和伺服模块是线性的，我们可以将上述方程重写如下

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$.

$$\rho$$ 代表空气密度，$$V_T$$ 代表真实空速 (TAS)。

以滚转轴为例，带量纲的滚转轴力矩可以表示为：

$$\ell = \frac{1}{2}\rho V_T^2 S b \left [C_{\ell_{\delta_a}} \:\delta_a + C_{\ell_p}\:\frac{b}{2V_T} \: p \right ]$$.

where $$\ell$$ is the roll moment, $$b$$ the wing span and $$S$$ the reference surface.

The nondimensional roll moment derivative $$C_\ell$$ can be modeled using the aileron effectiveness derivative $$C_{\ell_{\delta_a}}$$, the roll damping derivative $$C_{\ell_p}$$ and the dihedral derivative $$C_{\ell_\beta}$$

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$.

where $$\beta$$ is the sideslip angle, $$p$$ the body roll rate and $$\delta_a$$ the aileron deflection.

Assuming a symmetric ($$C_{\ell_0} = 0$$) and coordinated ($$\beta = 0$$) aircraft, the equation can be simplified using only the rollrate damping and the roll moment produced by the ailerons

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$.

This final equation is then taken as a baseline for the two next subsections to determine the airspeed scaling expression required for the PI and the FF controllers.

#### Static torque (PI) scaling

At a zero rates condition ($$p = 0$$), the damping term vanishes and a constant - instantaneous - torque can be generated using:

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$.

转换成 $$\delta_a$$ 的表达式

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$,

where the first fraction is constant and the second one depends on the air density and the true airspeed squared.

更进一步，先不用空气密度和TAS做刻度化，可以发现指示空速 (IAS, $$V_I$$) 在本质上是受空气密度影响的，在低空低速情况下，IAS可以乘以一个简单的密度误差因子转换成TAS

$$V_T = V_I \sqrt{\frac{\rho_0}{\rho}}$$,

$$\rho_o$$ 代表海平面15°C下的空气密度。

经过一系列重组变换，得到 $$\bar{q}$$ 的表达式如下

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$

现在我们能清楚地看到气动压力与IAS的平方成正比

$$\bar{q} \propto V_I^2$$.

之前用TAS和空气密度表示的刻度因数，最终可以用IAS重写成以下形式

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$

#### Rate (FF) scaling

角速率控制器前馈通道的主要作用是补偿转动阻尼。 回到我们的基线方程，这次在匀速滚转的条件下做简化，副翼产生的力矩必须恰好可以补偿阻尼项

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$

公式重组后，得到理想的副翼偏转角方程

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$

第一项给出了理想的前馈值，我们可以看到刻度因数相对TAS是线性的。 请注意那个负号，之后会与滚转阻尼系数的负号相互抵消。

#### Conclusion

角速率回路PI控制器的输出必须由指示空速 (IAS) 的平方刻度化，角速率回路前馈通道 (FF) 必须由真实空速 (TAS) 刻度化。

$$\delta_{a} = \frac{V_{I_0}^2}{V_I^2} \delta_{a_{PI}} + \frac{V_{T_0}}{V_T} \delta_{a_{FF}}$$

where $$V_{I_0}$$ and $$V_{T_0}$$ are the IAS and TAS at trim conditions.

Finally, since the actuator outputs are normalized and that the mixer and the servo blocks are assumed to be linear, we can rewrite this last equation as follows

$$\dot{\mathbf{\omega}}*{sp}^b = \frac{V*{I_0}^2}{V_I^2} \dot{\mathbf{\omega}}*{sp*{PI}}^b + \frac{V_{T_0}}{V_T} \dot{\mathbf{\omega}}*{sp*{FF}}^b$$,

该方程可以直接在滚转速率，俯仰速率和偏航速率控制器中实现

#### 调参建议

这套空速刻度化算法的巧妙之处就是它不需要特别的调参 但是对空速传感器的输出质量将直接影响它的性能

进一步讲，如果要将稳定飞行包线最大化，你应该在最小飞行速度和最大飞行速度的中点进行调参 (例如： 一架飞机的飞行速度在15 ~ 25m/s 之间，则应在20m/s调参)。 However, the quality of the airspeed measurements directly influences its performance.

Furthermore, to get the largest stable flight envelope, one should tune the attitude controllers at an airspeed value centered between the stall speed and the maximum airspeed of the vehicle (e.g.: an airplane that can fly between 15 and 25m/s should be tuned at 20m/s). [FW_AIRSPD_TRIM](../advanced/parameter_reference.md#FW_AIRSPD_TRIM) 参数. 必须被置为这个 "调参" 空速。
