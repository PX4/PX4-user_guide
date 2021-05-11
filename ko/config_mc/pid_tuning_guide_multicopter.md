# 멀티콥터 PID 튜닝 가이드 (고급/상세) 

PX4 컨트롤러의 튜닝 방법에 대한 자세한 정보를 제공합니다.

:::tip
설명된 접근 방식이 직관적이므로 *호버 추력 지점 주변*의 기체을 튜닝시에는 [기본 PID 튜닝 가이드](pid_tuning_guide_multicopter_basic.md)를 따르는 것이 좋습니다. 이것은 대부분의 기체에 필요합니다.
:::

호버 추력 지점 주변의 튜닝이 충분하지 않을 때 이 가이드를 사용하십시오 (예 : 더 높은 추력에서 비선형성 및 진동이 방생하는 기체). 기본 튜닝을 충분히 이해하는 것이 [airmode](#airmode-mixer-saturation) 설정 사용법을 이해하는데 유용합니다.

## 튜닝 단계

:::note
안전상의 이유로 기본 게인은 낮은 값으로 설정됩니다. 좋은 제어 응답을 기대하기 전에 이득을 증가시켜야 합니다.
:::

튜닝시 지켜야 할 일반적인 사항은 아래와 같습니다.

- 큰 이득은 위험한 진동을 발생시킬 수 있으므로, 모든 이득은 매우 천천히 증가시켜야합니다! 일반적으로 반복당 이득을 20~30%씩 증가시키고, 최종 미세 조정을 위해 5~10%로 줄입니다.
- 매개변수를 변경하기 전에 착륙시키십시오. 스로틀을 천천히 증가시키고 진동을 점검하십시오.
- 호버링 추력 지점을 중심으로 기체를 조정하고, [추력 곡선 매개 변수](#thrust-curve)를 사용하여 추력 비선형성 또는 높은 추력 진동을 설명합니다.
- 선택적으로 [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) 매개변수로 고속 로깅 프로필을 활성화하면 로그를 사용하여 비율과 태도 추적 성능을 평가할 수 있습니다 (이 옵션은 나중에 비활성화 할 수 있음).

:::warning
기체 튜닝시 항상 [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE)를 비활성화 하십시오.
:::

### 속도 컨트롤러

속도 컨트롤러는 기체 속도(요, 피치, 롤)를 제어하는 3 개의 독립적인 PID 컨트롤러를 가지고 있는 가장 안쪽의 루프입니다.

:::note
훌륭하게 튜닝된 속도 컨트롤러는 *모든* 비행 모드에 영향을 미치므로 매우 중요합니다. 예를 들어, 잘못 튜닝한 속도 컨트롤러는 [위치 모드](../flight_modes/position_mc.md)에서 "twitches"로 표시됩니다 (기체가 공중에서 완벽하게 정지하지 않음).
:::

#### 속도 컨트롤러 아키텍처/양식

PX4는 단일 "혼합" 구현([병렬](#parallel-form) 및 [표준](#standard-form))에서 두 가지 (수학적으로 동등한) 형태의 PID 속도 컨트롤러를 지원합니다.

사용자는 다른 형식의 비례 이득을 "1"로 설정하여 사용되는 형식을 선택할 수 있습니다 (즉, 아래 다이어그램에서 병렬 형식의 경우 **K**을 1로 설정하거나 **P** 표준 형식의 경우 1로 설정하여 K 또는 P 블록을 한 줄로 바꿉니다).

![PID_Mixed](../../assets/mc_pid_tuning/PID_algorithm_Mixed.png) <!-- The drawing is on draw.io: https://drive.google.com/file/d/1hXnAJVRyqNAdcreqNa5W4PQFkYnzwgOO/view?usp=sharing -->

- *G(s)*는 기체의 각속도를 나타냅니다.
- *r*은 속도 설정점입니다.
- *y*는 신체 각속도 (자이로로 측정)입니다.
- *e*는 속도 설정값과 측정 속도 사이의 오류입니다.
- *u*는 PID 컨트롤러의 출력입니다.

두 가지 형식이 아래에 기술되어 있습니다.

:::note
미분항(**D**)은 [ 미분 킥](http://brettbeauregard.com/blog/2011/04/improving-the-beginner%E2%80%99s-pid-derivative-kick/)으로 알려진 효과를 피하기 위하여 피드백 경로에 있습니다.
:::

:::tip
자세한 내용은 아래의 내용을 참조하십시오.

- [모든 PID 컨트롤러가 같지 않습니다.](https://www.controleng.com/articles/not-all-pid-controllers-are-the-same/) (www.controleng.com) 
- [PID 컨트롤러 > 표준 대 병렬 (이상적인) PID 형식](https://en.wikipedia.org/wiki/PID_controller#Standard_versus_parallel_(ideal)_PID_form) (Wikipedia)
:::

##### 병렬 형식

*병렬 형식*은 가장 간단한 형식으로 교과서에서 많이 사용됩니다. 이 경우 컨트롤러의 출력은 간단한 비례, 적분 및 미분 동작의 합입니다.

![PID_Parallel](../../assets/mc_pid_tuning/PID_algorithm_Parallel.png)

##### 표준 형식

이 형식은 병렬 형식과 수학적으로 동일하지만 주요 이점은 (반 직관적으로 보일지라도) 비례 이득 튜닝을 적분과 미분 이득에서 분리하는 것입니다. 즉, 비슷한 크기와 관성을 가진 드론의 이득을 취하고 K 이득을 조정하여 적절하게 비행하는 방법으로 새로운 플랫폼을 쉽게 조정할 수 있습니다.

![PID_Standard](../../assets/mc_pid_tuning/PID_algorithm_Standard.png)

#### 속도 PID 튜닝

PID 속도 컨트롤러 튜닝 매개 변수는 다음과 같습니다.

- Roll 속도 제어 ([MC_ROLLRATE_P](../advanced_config/parameter_reference.md#MC_ROLLRATE_P), [MC_ROLLRATE_I](../advanced_config/parameter_reference.md#MC_ROLLRATE_I), [MC_ROLLRATE_D](../advanced_config/parameter_reference.md#MC_ROLLRATE_D), [MC_ROLLRATE_K](../advanced_config/parameter_reference.md#MC_ROLLRATE_K))
- Pitch 속도 제어 ([MC_PITCHRATE_P](../advanced_config/parameter_reference.md#MC_PITCHRATE_P), [MC_PITCHRATE_I](../advanced_config/parameter_reference.md#MC_PITCHRATE_I), [MC_PITCHRATE_D](../advanced_config/parameter_reference.md#MC_PITCHRATE_D), [MC_PITCHRATE_K](../advanced_config/parameter_reference.md#MC_PITCHRATE_K))
- Yaw 속도 제어 ([MC_YAWRATE_P](../advanced_config/parameter_reference.md#MC_YAWRATE_P), [MC_YAWRATE_I](../advanced_config/parameter_reference.md#MC_YAWRATE_I), [MC_YAWRATE_D](../advanced_config/parameter_reference.md#MC_YAWRATE_D), [MC_YAWRATE_K](../advanced_config/parameter_reference.md#MC_YAWRATE_K))

속도 콘트롤러는 [곡예 모드](../flight_modes/acro_mc.md)와 [수동/안정 모드](../flight_modes/manual_stabilized_mc.md)에서 튜닝할 수 있습니다.

- *Acro mode* is preferred, but is harder to fly. If you choose this mode, disable all stick expo: 
  - `MC_ACRO_EXPO` = 0, `MC_ACRO_EXPO_Y` = 0, `MC_ACRO_SUPEXPO` = 0, `MC_ACRO_SUPEXPOY` = 0
  - `MC_ACRO_P_MAX` = 200, `MC_ACRO_R_MAX` = 200
  - `MC_ACRO_Y_MAX` = 100
- *Manual/Stabilized mode* is simpler to fly, but it is also more difficult to see if the attitude or the rate controller needs more tuning.

If the vehicle does not fly at all:

- If there are strong oscillations when first trying to takeoff (to the point where it does not fly), decrease all **P** and **D** gains until it takes off.
- If the reaction to RC movement is minimal, increase the **P** gains.

The actual tuning is roughly the same in *Manual mode* or *Acro mode*: You iteratively tune the **P** and **D** gains for roll and pitch, and then the **I** gain. Initially you can use the same values for roll and pitch, and once you have good values, you can fine-tune them by looking at roll and pitch response separately (if your vehicle is symmetric, this is not needed). For yaw it is very similar, except that **D** can be left at 0.

##### Proportional Gain (P/K)

The proportional gain is used to minimize the tracking error (below we use **P** to refer to both **P** or **K**). It is responsible for a quick response and thus should be set as high as possible, but without introducing oscillations.

- If the **P** gain is too high: you will see high-frequency oscillations.
- If the **P** gain is too low: 
  - the vehicle will react slowly to input changes.
  - In *Acro mode* the vehicle will drift, and you will constantly need to correct to keep it level.

##### Derivative Gain (D)

The **D** (derivative) gain is used for rate damping. It is required but should be set only as high as needed to avoid overshoots.

- If the **D** gain is too high: the motors become twitchy (and maybe hot), because the **D** term amplifies noise.
- If the **D** gain is too low: you see overshoots after a step-input.

Typical values are:

- standard form (**P** = 1): between 0.01 (4" racer) and 0.04 (500 size), for any value of **K**
- parallel form (**K** = 1): between 0.0004 and 0.005, depending on the value of **P**

##### Integral Gain (I)

The **I** (integral) gain keeps a memory of the error. The **I** term increases when the desired rate is not reached over some time. It is important (especially when flying *Acro mode*), but it should not be set too high.

- If the I gain is too high: you will see slow oscillations.
- If the I gain is too low: this is best tested in *Acro mode*, by tilting the vehicle to one side about 45 degrees, and keeping it like that. It should keep the same angle. If it drifts back, increase the **I** gain. A low **I** gain is also visible in a log, when there is an offset between the desired and the actual rate over a longer time.

Typical values are:

- standard form (**P** = 1): between 0.5 (VTOL plane), 1 (500 size) and 8 (4" racer), for any value of **K**
- parallel form (**K** = 1): between 0.3 and 0.5 if **P** is around 0.15 The pitch gain usually needs to be a bit higher than the roll gain.

#### Testing Procedure

To test the current gains, provide a fast **step-input** when hovering and observe how the vehicle reacts. It should immediately follow the command, and neither oscillate, nor overshoot (it feels 'locked-in').

You can create a step-input for example for roll, by quickly pushing the roll stick to one side, and then let it go back quickly (be aware that the stick will oscillate too if you just let go of it, because it is spring-loaded — a well-tuned vehicle will follow these oscillations).

:::note
A well-tuned vehicle in *Acro mode* will not tilt randomly towards one side, but keeps the attitude for tens of seconds even without any corrections.
:::

#### Logs

Looking at a log helps to evaluate tracking performance as well. Here is an example for good roll and yaw rate tracking:

![roll rate tracking](../../assets/mc_pid_tuning/roll_rate_tracking.png) ![yaw rate tracking](../../assets/mc_pid_tuning/yaw_rate_tracking.png)

And here is a good example for the roll rate tracking with several flips, which create an extreme step-input. You can see that the vehicle overshoots only by a very small amount: ![roll rate tracking flips](../../assets/mc_pid_tuning/roll_rate_tracking_flip.png)

### Attitude Controller

This controls the orientation and outputs desired body rates with the following tuning parameters:

- Roll control ([MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P))
- Pitch control ([MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P))
- Yaw control ([MC_YAW_P](../advanced_config/parameter_reference.md#MC_YAW_P))

The attitude controller is much easier to tune. In fact, most of the time the defaults do not need to be changed at all.

To tune the attitude controller, fly in *Manual/Stabilized mode* and increase the **P** gains gradually. If you start to see oscillations or overshoots, the gains are too high.

The following parameters can also be adjusted. These determine the maximum rotation rates around all three axes:

- Maximum roll rate ([MC_ROLLRATE_MAX](../advanced_config/parameter_reference.md#MC_ROLLRATE_MAX))
- Maximum pitch rate ([MC_PITCHRATE_MAX](../advanced_config/parameter_reference.md#MC_PITCHRATE_MAX))
- Maximum yaw rate ([MC_YAWRATE_MAX](../advanced_config/parameter_reference.md#MC_YAWRATE_MAX))

### Thrust Curve

The tuning above optimises performance around the hover throttle. But you may start to see oscillations when going towards full throttle.

To counteract that, adjust the **thrust curve** with the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter.

:::note
The rate controller might need to be re-tuned if you change this parameter.
:::

The mapping from motor control signals (e.g. PWM) to expected thrust is linear by default — setting `THR_MDL_FAC` to 1 makes it quadratic. Values in between use a linear interpolation of the two. Typical values are between 0.3 and 0.5.

If you have a [thrust stand](https://www.rcbenchmark.com/pages/series-1580-thrust-stand-dynamometer) (or can otherwise *measure* thrust and motor commands simultaneously), you can determine the relationship between the motor control signal and the motor's actual thrust, and fit a function to the data. The motor command in PX4 called `actuator_output` can be PWM, Dshot, UAVCAN commands for the respective ESCs in use. [This Notebook](https://github.com/PX4/px4_user_guide/blob/master/assets/config/mc/ThrustCurve.ipynb) shows one way for how the thrust model factor `THR_MDL_FAC` may be calculated from previously measured thrust and PWM data. The curves shown in this plot are parametrized by both &alpha; and k, and also show thrust and PWM in real units (kgf and &mu;s). In order to simplify the curve fit problem, you can normalize the data between 0 and 1 to find `k` without having to estimate &alpha; (&alpha; = 1, when the data is normalized).

[![Thrust Curve Compensation](../../assets/mc_pid_tuning/thrust-curve-compensation.svg)](https://github.com/PX4/px4_user_guide/blob/master/assets/config/mc/ThrustCurve.ipynb)

:::note
The mapping between PWM and static thrust depends highly on the battery voltage.
:::

An alternative way of performing this experiment is to make a scatter plot of the normalized motor command and thrust values, and iteratively tune the thrust curve by experimenting with the `THR_MDL_FAC` parameter. An example of that graph is shown here:

![Graph showing relative thrust and PWM scatter](../../assets/mc_pid_tuning/relative_thrust_and_pwm_scatter.svg)

If raw motor command and thrust data is collected throughout the full-scale range in the experiment, you can normalize the data using the equation:

*normalized_value = ( raw_value - min (raw_value) ) / ( max ( raw_value ) - min ( raw_value ) )*

After you have a scatter plot of the normalized values, you can try and make the curve match by plotting the equation

*rel_thrust = ( `THR_MDL_FAC` ) * rel_signal^2 + ( 1 - `THR_MDL_FAC` ) * rel_signal*

over a linear range of normalized motor command values between 0 and 1. Note that this is the equation that is used in the firmware to map thrust and motor command, as shown in the [THR_MDL_FAC](../advanced_config/parameter_reference.md#THR_MDL_FAC) parameter reference. Here, *rel_thrust* is the normalized thrust value between 0 and 1, and *rel_signal* is the normalized motor command signal value between 0 and 1.

In this example above, the curve seemed to fit best when `THR_MDL_FAC` was set to 0.7.

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

<span id="airmode"></span>

### Airmode & Mixer Saturation

The rate controller outputs torque commands for all three axis (roll, pitch and yaw) and a scalar thrust value, which need to be converted into individual motor thrust commands. This step is called mixing.

It can happen that one of the motor commands becomes negative, for example for a low thrust and large roll command (and similarly it can go above 100%). This is a mixer saturation. It is physically impossible for the vehicle to execute these commands (except for reversible motors). PX4 has two modes to resolve this:

- Either by reducing the commanded torque for roll such that none of the motor commands is below zero (Airmode disabled). In the extreme case where the commanded thrust is zero, it means that no attitude correction is possible anymore, which is why a minimum thrust is always required for this mode.
- Or by increasing (boosting) the commanded thrust, such that none of the motor commands is negative (Airmode enabled). This has the big advantage that the attitude/rates can be tracked correctly even at low or zero throttle. It generally improves the flight performance.
  
  However it increases the total thrust which can lead to situations where the vehicle continues to ascend even though the throttle is reduced to zero. For a well-tuned, correctly functioning vehicle it is not the case, but for example it can happen when the vehicle strongly oscillates due to too high P tuning gains.

Both modes are shown below with a 2D illustration for two motors and a torque command for roll <span style="color:#9673A6">r</span>. On the left motor <span style="color:#9673A6">r</span> is added to the commanded thrust, while on the right motor it is subtracted from it. The motor thrusts are in <span style="color:#6A9153">green</span>. With Airmode enabled, the commanded thrust is increased by <span style="color:#B85450">b</span>. When it is disabled, <span style="color:#9673A6">r</span> is reduced.

![Airmode](../../assets/mc_pid_tuning/MC_PID_tuning-Airmode.svg) <!-- The drawing is on draw.io: https://drive.google.com/file/d/1N0qjbiJX6JuEk2I1-xFvigLEPKJRIjBP/view?usp=sharing
     On the first Tab
-->

If mixing becomes saturated towards the upper bound the commanded thrust is reduced to ensure that no motor is commanded to deliver more than 100% thrust. This behaviour is similar to the Airmode logic, and is applied whether Airmode is enabled or disabled.

Once your vehicle flies well you can enable Airmode via the [MC_AIRMODE](../advanced_config/parameter_reference.md#MC_AIRMODE) parameter.