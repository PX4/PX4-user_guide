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

对真空速和高度的持续跟踪控制不是一个简单的事情。 增加飞行器的俯仰角度不仅会导致高度上升还会导致空速下降。

总能量控制系统通过能量法来解决这个问题，而不是通过之前的那种设定点进行控制。 一架飞行器的总能量包括动能和势能。 推力（通过油门控制）增加整个飞机的总能量。 势能和动能的任意组合可以组成总能量

TECS offers a solution by respresenting the problem in terms of energies rather than the original setpoints. The total energy of an aircraft is the sum of kinetic and potential energy. Thrust (via throttle control) increases the total energy state of the aircraft. A given total energy state can be achieved by arbitrary combinations of potential and kinetic energies. In other words, flying at a high altitude but at a slow speed can be equivalent to flying at a low altitude but at a faster airspeed in a total energy sense. We refer to this as the specific energy balance and it is calculated from the current altitude and true airspeed setpoint. The specific energy balance is controlled via the aircraft pitch angle. An increase in pitch angle transfers kinetic to potential energy and a negative pitch angle vice versa. The control problem was therefore decoupled by transforming the initial setpoints into energy quantities which can be controlled independently. We use thrust to regulate the specific total energy of the vehicle and pitch maintain a specific balance between potential (height) and kinetic (speed) energy.


#### 角速率回路 (FF) 缩放补偿

![能量平衡回路](../../assets/diagrams/TECS_throttle.jpg)


#### 总结

![Energy balance loop](../../assets/diagrams/TECS_pitch.jpg)

$$\ell$$ 代表滚转力矩，$$b$$ 代表飞机翼展，$$S$$ 代表参考面。

无量纲的滚转力矩系数 $$C_\ell$$ 可以通过通过以下几个系数建模得到：副翼效率系数 $$C_{\ell_{\delta_a}}$$，滚转阻尼系数 $$C_{\ell_p}$$ 和二面角系数 $$C_{\ell_\beta}$$。

$$C_\ell = C_{\ell_0} + C_{\ell_\beta}\:\beta + C_{\ell_p}\:\frac{b}{2V_T}\:p + C_{\ell_{\delta_a}} \:\delta_a$$,

$$\beta$$ 代表侧滑角，$$p$$ 代表滚转角速率，$$\delta_a$$ 代表副翼偏转角。

假设一架飞机对称 ($$C_{\ell_0} = 0$$) 且无侧滑 ($$\beta = 0$$) ，上面的方程就可以简化到只有滚转率阻尼和副翼产生的滚转力矩。

$$\dot{E} = \frac{\dot{E_T}}{mgV_T}  = \frac{\dot{V_T}}{g} + \frac{\dot{h}}{V_T} = \frac{\dot{V_T}}{g} + sin(\gamma)$$

where $\gamma{}$ is the flight plan angle. For small $\gamma{}$ we can approximate this as:

在滚转角速率为0 ($$p = 0$$) 的情况下, 阻尼项将会消失，并得到一个瞬时常量

$$\ell = \frac{1}{2}\rho V_T^2 S b \: C_{\ell_{\delta_a}} \:\delta_a = \bar{q} S b \: C_{\ell_{\delta_a}} \:\delta_a$$.

$$T - D = mg(\frac{\dot{V_T}}{g} + sin(\gamma)) \approx mg(\frac{\dot{V_T}}{g} + \gamma)$$

where T and D are the thrust and drag forces. In level flight, initial thrust is trimmed against the drag and a change in thrust results thus in:

观察上面的公式可以知道，第一项是个常值，第二项则取决于空气密度和真实空速的平方。

As can be seen, $\Delta T{}$ is proportional to $\dot{E}{}$, and thus the thrust setpoint should be used for total energy control.

Elevator control on the other hand is energy conservative, and is thus used for exchanging potentional energy for kinetic energy and vice versa. To this end, a specific energy balance rate is defined as:

$$\dot{B} = \gamma - \frac{\dot{V_T}}{g}$$

## 固定翼姿态控制器

![FW Attitude Controller Diagram](../../assets/diagrams/px4_fw_attitude_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1ibxekmtc6Ljq60DvNMplgnnU-JOvKYLQ/view?usp=sharing
Request access from dev team. -->

然后可以根据期望的角加速度和系统先验信息，通过控制分配 (又叫混控)，计算出执行机构 (副翼，水平尾翼，垂直尾翼，等) 的角偏移量。 另外，由于气动控制面的效率与速度正相关，因此控制率 - 一般在巡航速度下调参 - 按照空速测量值缩放刻度因子 (如果使用了空速传感器的话)。 The inner loop then computes the error in rates and uses a PI (proportional + integral) controller to generate the desired angular acceleration.

前馈增益用于补偿空气动力阻尼。 基本上，绕机体轴的两个主要力矩分量分别来自：控制翼面 (副翼，水平尾翼，垂直尾翼 - 驱动机体转动) 和 空气动力阻尼 (与机体角速率成正比 - 阻止机体转动) 。

滚转和俯仰控制器具有相同的结构，并且假定纵向和侧向气动力相互独立，没有耦合。 但是，为了将飞机侧滑产生的侧向加速度最小化，偏航控制器利用转向协调约束产生偏航速率设定值。

The feedforward gain is used to compensate for aerodynamic damping. Basically, the two main components of body-axis moments on an aircraft are produced by the control surfaces (ailerons, elevators, rudders, - producing the motion) and the aerodynamic damping (proportional to the body rates - counteracting the motion). In order to keep a constant rate, this damping can be compensated using feedforward in the rate loop.

The roll and pitch controllers have the same structure and the longitudinal and lateral dynamics are assumed to be uncoupled enough to work independently. The yaw controller, however, generates its yaw rate setpoint using the turn coordination constraint in order to minimize lateral acceleration, generated when the aircraft is slipping. The yaw rate controller also helps to counteract adverse yaw effects (https://youtu.be/sNV_SDDxuWk) and to damp the [Dutch roll mode](https://en.wikipedia.org/wiki/Dutch_roll) by providing extra directional damping.


## VTOL 飞行控制器

![VTOL Attitude Controller Diagram](../../assets/diagrams/VTOL_controller_diagram.png)


<!-- The drawing is on draw.io: https://drive.google.com/file/d/1tVpmFhLosYjAtVI46lfZkxBz_vTNi8VH/view?usp=sharing
Request access from dev team. -->

VTOL姿态模块的输出是多旋翼执行器（典型的 `actuator_controls_0`）和固定翼（典型的 `actuator_controls_1`）执行器的独立的扭矩和力指令。 这些是在一个特定机型的混控器文件中处理的（参见[ Mixing](../concept/mixing.md)）。 The diagram above presents a simplified control diagram. Note the VTOL attitude controller block, which mainly facilitates the necessary switching and blending logic for the different VTOL modes, as well as VTOL-type-specific control actions during transitions (e.g. ramping up the pusher motor of a standard VTOL during forward transition). The inputs into this block are called "virtual" as, depending on the current VTOL mode, some are ignored by the controller.

For a standard and tilt-rotor VTOL, during transition the fixed-wing attitude controller produces the rate setpoints, which are then fed into the separate rate controllers, resulting in torque commands for the multicopter and fixed-wing actuators. For tailsitters, during transition the multicopter attitude controller is running.

本节的目的是：通过公式来解释怎样根据空速调整角速率回路 (PI) 和前馈控制器 (FF) 的输出，以及为何如此。 我们首先给出简化的滚转轴线性力矩方程，然后说明空速对力矩产生的直接影响，最后是空速对匀速滚转运动的影响。

For more information on the tuning of the transition logic inside the VTOL block, see [VTOL Configuration](../config_vtol/README.md).


### 空速缩放补偿

The objective of this section is to explain with the help of equations why and how the output of the rate PI and feedforward (FF) controllers can be scaled with airspeed to improve the control performance. We will first present the simplified linear dimensional moment equation on the roll axis, then show the influence of airspeed on the direct moment generation and finally, the influence of airspeed during a constant roll.

As shown in the fixed-wing attitude controller above, the rate controllers produce angular acceleration setpoints for the control allocator (here named "mixer"). In order to generate these desired angular accelerations, the mixer produces torques using available aerodynamic control surfaces (e.g.: a standard airplane typically has two ailerons, two elevators and a rudder). The torques generated by those control surfaces is highly influenced by the relative airspeed and the air density, or more precisely, by the dynamic pressure. If no airspeed scaling is made, a controller tightly tuned for a certain cruise airspeed will make the aircraft oscillate at higher airspeed or will give bad tracking performance at low airspeed.

$$\bar{q} = \frac{1}{2} \rho V_T^2 = \frac{1}{2} V_I^2 \rho_0$$.

$$\rho$$ 代表空气密度，$$V_T$$ 代表真实空速 (TAS)。

以滚转轴为例，带量纲的滚转轴力矩可以表示为：

$$\ell = \frac{1}{2}\rho V_T^2 S b \left [C_{\ell_{\delta_a}} \:\delta_a + C_{\ell_p}\:\frac{b}{2V_T} \: p \right ]$$.

Taking the roll axis for the rest of this section as an example, the dimensional roll moment can be written

$$\ell = \frac{1}{2}\rho V_T^2 S b C_\ell = \bar{q} S b C_\ell$$

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$.

The nondimensional roll moment derivative $C_\ell{}$ can be modeled using the aileron effectiveness derivative $C_{\ell_{\delta_a}}{}$, the roll damping derivative $C_{\ell_p}{}$ and the dihedral derivative $C_{\ell_\beta}{}$

$$C_\ell = C_{\ell_0} + C_{\ell_\beta}\:\beta + C_{\ell_p}\:\frac{b}{2V_T}\:p + C_{\ell_{\delta_a}} \:\delta_a$$

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$.

刚才推导出的这个最终方程，将会作为后面两个小节的基线。

$$\ell = \frac{1}{2}\rho V_T^2 S b \left [C_{\ell_{\delta_a}} \:\delta_a + C_{\ell_p}\:\frac{b}{2V_T} \: p \right ]$$

$$\delta_a = \frac{2bS}{C_{\ell_{\delta_a}}\rho_0} \frac{1}{V_I^2} \ell$$.

#### 静态力矩 (PI) 缩放补偿

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

The scaler previously containing TAS and the air density can finally be written using IAS only

$$- C_{\ell_{\delta_a}} \:\delta_a = C_{\ell_p} \frac{b}{2 V_T} \: p$$

#### 角速率回路 (FF) 缩放补偿

The main use of the feedforward of the rate controller is to compensate for the natural rate damping. Starting again from the baseline dimensional equation but this time, during a roll at constant speed, the torque produced by the ailerons should exactly compensate for the damping such as

$$\delta_a = -\frac{b \: C_{\ell_p}}{2 \: C_{\ell_{\delta_a}}} \frac{1}{V_T} \: p$$

Rearranging to extract the ideal ailerons deflection gives

角速率回路PI控制器的输出必须由指示空速 (IAS) 的平方刻度化，角速率回路前馈通道 (FF) 必须由真实空速 (TAS) 刻度化。

The first fraction gives the value of the ideal feedforward and we can see that the scaling is linear to the TAS. Note that the negative sign is then absorbed by the roll damping derivative which is also negative.

#### 总结

The output of the rate PI controller has to be scaled with the indicated airspeed (IAS) squared and the output of the rate feedforward (FF) has to be scaled with the true airspeed (TAS)

最终，由于执行器的输出是归一化的，并且假定混控和伺服模块是线性的，我们可以将上述方程重写如下:

where $V_{I_0}{}$ and $V_{T_0}{}$ are the IAS and TAS at trim conditions.

Finally, since the actuator outputs are normalized and that the mixer and the servo blocks are assumed to be linear, we can rewrite this last equation as follows:

$$\dot{\mathbf{\omega}}_{sp}^b = \frac{V_{I_0}^2}{V_I^2} \dot{\mathbf{\omega}}_{sp_{PI}}^b + \frac{V_{T_0}}{V_T} \dot{\mathbf{\omega}}_{sp_{FF}}^b$$

and implement it directly in the rollrate, pitchrate and yawrate controllers.

#### Tuning recommendations

The beauty of this airspeed scaling algorithm is that it does not require any specific tuning. However, the quality of the airspeed measurements directly influences its performance.

Furthermore, to get the largest stable flight envelope, one should tune the attitude controllers at an airspeed value centered between the stall speed and the maximum airspeed of the vehicle (e.g.: an airplane that can fly between 15 and 25m/s should be tuned at 20m/s). This "tuning" airspeed should be set in the [FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM) parameter.
