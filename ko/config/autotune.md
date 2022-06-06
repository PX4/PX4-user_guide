# 자동 튜닝

자동 튜닝은 안정적이고 반응성이 뛰어난 비행을 위한 가장 중요한 컨트롤러인 PX4의 속도 및 자세 컨트롤러 튜닝 프로세스를 자동화합니다(다른 튜닝은 "선택 사항"에 가깝습니다). 현재 멀티콥터, 고정익 및 하이브리드 VTOL 고정익 차량에 사용할 수 있습니다.

튜닝은 한 번 수행으로 충분하며, 제조업체에서 이미 튜닝한(그 이후로 수정하지 않은) 차량을 사용하지 않는 한 권장됩니다.

:::note QGroundControl Autotuning UI는 고정익 기체에 사용할 수 없습니다. [qgroundcontrol#10194](https://github.com/mavlink/qgroundcontrol/issues/10194)를 참조하세요(고정익 비행의 VTOL 기체에 해당). 매개변수 [FW_AT_START](../advanced_config/parameter_reference.md#FW_AT_START)를 설정하여 고정익 자동 튜닝을 시작할 수 있습니다.
:::

:::warning
비행 중에 자동 튜닝이 수행됩니다. 기체는 중간 정도의 교란을 처리할 수 있을 만큼 원할하게 비행해야 하며, 다음 사항에 주의를 기울여야 합니다.
- 기체가 [자동 튜닝을 할 만큼 충분히 안정적인지](#pre-tuning-test) 테스트합니다.
- 리모콘 스틱을 움직여 자동 튜닝 프로세스를 중단할 준비를 하십시오.
- 튜닝 후 기체가 잘 비행하는지 확인하십시오.
:::

@[유투브](https://youtu.be/5xswOhhqrIQ)


## 사전 튜닝 테스트

기체 자동 튜닝을 실행하기 전에 비행할 수 있고 적절하게 안정화되어야 합니다. 이 테스트는 기체의 위치 제어 모드에서 안전하게 비행할 수 있는 지 확인합니다.

:::note
[기체 설정](../config/airframe.md) 중에 귀하의 기체와 가장 근접하게 일치하는 프레임을 미리 선택하여야 합니다. 이것은 일반적으로 비행하기에 충분히 잘 조정되며 자동 조정을 실행하기에 충분히 잘 _조정될 수_ 있습니다.
:::

기체 자동 튜닝을 위해 충분히 안정적인지 확인하는 방법:

1. 비행 구역이 깨끗하고 충분한 공간이 있는지 확인하기 위하여 일반적인 비행 전 안전 체크리스트를 수행합니다.
1. 이륙 및 시험 준비
   - **멀티콥터:** [고도 모드](../flight_modes/altitude_mc.md) 또는 안정화 모드에서 이륙하여 지상 1m에서 호버링합니다.
   - **고정익:** [위치 모드](../flight_modes/position_mc.md) 또는 [고도 모드](../flight_modes/altitude_mc.md)에서 순항 속도로 이륙하고 비행합니다.
1. RC 송신기 롤 스틱을 사용하여 기체를 몇 도만 기울여 다음 기동을 수행하십시오. _좌회전 > 오른쪽 롤 > 중심_ (전체 기동은 약 3초가 소요됩니다). 차량은 2번의 진동 내에서 안정되어야 합니다.
1. 각 시도에서 더 큰 진폭으로 기울이면서 기동을 반복합니다. 기체가 ~20도에서 2번의 진동 내에서 안정화될 수 있으면 다음 단계로 이동합니다.
1. 피치 축에서 동일한 동작을 반복합니다. 위의 A에서 작은 각도로 시작하여  기체의 틸트를 증가시키기 전에 2개의 진동 내에서 스스로 움직일 수 있는지 확인하십시오.

드론이 2번의 진동 내에서 스스로 안정화될 수 있으면 자동 튜닝 절차를 위한 준비가 된 것입니다.

그렇지 않은 경우 자동 튜닝을 위해 기체를 준비하기 위한 최소한의 수동 튜닝을 설명하는 [문제 해결](#troubleshooting) 섹션으로 이동합니다.


### 자동 튜닝 단계

자동 튜닝은 **충분한 공간이 있는 안전한 지역**에서 진행하여야 합니다. 약 40초([19~68초](#how-long-does-autotuning-take)) 가량 걸립니다. 최상의 결과를 얻으려면 날씨가 잔잔할 때 테스트를 실행하는 것이 좋습니다.

:::note
조작자는 RC 컨트롤러의 롤/피치 스틱을 움직여 언제든지 시퀀스를 중단할 수 있습니다.
:::

테스트 단계는 다음과 같습니다:

1. [사전 튜닝 테스트](#pre-tuning-test)를 수행합니다.
1. RC를 사용하여 이륙하고 테스트 준비:
   - **멀티콥터:** [고도 모드](../flight_modes/altitude_mc.md)에서 조종기를 사용하여 이륙합니다. 안전한 거리와 지상에서 몇 미터(4~20m)에서 기체를 호버링하십시오.
   - **고정익:** 순항 속도로 비행하면 [유지 모드](../flight_modes/hold.md)를 활성화합니다. 이렇게 하면 비행기가 일정한 고도와 속도로 원을 그리며 비행합니다.
1. In QGroundControl, open the menu: **Vehicle setup > PID Tuning**

   ![Tuning Setup > Autotune Enabled](../../assets/qgc/setup/autotune/autotune.png)
1. Select either the *Rate Controller* or *Attitude Controller* tabs. Ensure that the **Autotune enabled** button is enabled (this will display the **Autotune** button and remove the manual tuning selectors).
1. Stop moving the joysticks and click on the **Autotune** button. Read the warning popup and click on **OK** to start tuning.
1. The drone will first start to perform quick roll motions followed by pitch and yaw motions. The progress is shown in the progress bar, next to the _Autotune_ button.
1. Apply the tuning:
   - **Fixed Wing:** The tuning will be immediately/automatically be applied and tested in flight (by default). PX4 will then run a 4 second test and revert the new tuning if a problem is detected.
   - **Multicopters:** Manually land and disarm to apply the new tuning parameters. Takeoff carefully and manually test that the vehicle is stable.
1. If any strong oscillations occur, land immediately and follow the instructions in the [Troubleshooting](#troubleshooting) section below.

<br/>

Additional notes:
- **VTOL:** Hybrid VTOL fixed wing vehicles must be tuned twice, following multicopter instructions in MC mode and fixed-wing instructions in FW mode.
- **Multicopter:** The instructions above tune the vehicle in [Altitude mode](../flight_modes/altitude_mc.md). You can instead takeoff in [Takeoff mode](../flight_modes/takeoff.md) and tune in [Position mode](../flight_modes/position_mc.md) if the vehicle is is _known_ to be stable in these modes.
- **Fixed wing:** Autotuning can also be run in [Altitude mode](../flight_modes/altitude_mc.md) or [Position mode](../flight_modes/position_mc.md). However running the test while flying straight requires a larger safe area for tuning, and does not give a significantly better tuning result.
- Whether tuning is applied in-air or after landing can be [configured using parameters](#parameters).

## Troubleshooting

#### The drone oscillates when performing the testing maneuvers prior to the auto-tuning

* slow oscillations (1 oscillation per second or slower): this often occurs on large platforms and means that the attitude loop is too fast compared to the rate loop.
   - **Multicopter:** decrease [MC_ROLL_P](../advanced_config/parameter_reference.md#MC_ROLL_P) and [MC_PITCH_P](../advanced_config/parameter_reference.md#MC_PITCH_P) by steps of 1.0
   - **Fixed-wing:** increase [FW_R_TC](../advanced_config/parameter_reference.md#FW_R_TC), [FW_P_TC](../advanced_config/parameter_reference.md#FW_P_TC), [FW_Y_TC](../advanced_config/parameter_reference.md#FW_Y_TC) by steps of 0.1
* fast oscillations (more than 1 oscillation per second): this is because the gain of the rate loop is too high.
   - **Multicopter:** decrease `MC_[ROLL|PITCH|YAW]RATE_K` by steps of 0.02
   - **Fixed-wing:** decrease [FW_RR_R](../advanced_config/parameter_reference.md#FW_RR_R), [FW_RR_P](../advanced_config/parameter_reference.md#FW_RR_P), [FW_RR_Y](../advanced_config/parameter_reference.md#FW_RR_Y) by steps of 0.01

#### The auto-tuning sequence fails

If the drone was not moving enough during auto-tuning, the system identification algorithm might have issues to find the correct coefficients. Increase the [FW_AT_SYSID_AMP](../advanced_config/parameter_reference.md#FW_AT_SYSID_AMP), [MC_AT_SYSID_AMP](../advanced_config/parameter_reference.md#MC_AT_SYSID_AMP) by steps of 1 and trigger the auto-tune again.

#### The drone oscillates after auto-tuning

Due to effects not included in the mathematical model such as delays, saturation, slew-rate, airframe flexibility, the loop gain can be too high. To fix this, follow the same steps described [when the drone oscillates in the pre-tuning test](#the-drone-oscillates-when-performing-the-testing-maneuvers-prior-to-the-auto-tuning).

#### I still can't get it to work

Attempt manual tuning using the appropriate guides:
- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter_basic.md) (Manual/Simple)
- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) (Advanced/Detailed)
- [Fixed-Wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)


## Parameters

By default MC vehicles land before parameters are applied, while FW vehicles apply the parameters in-air and then test that the controllers work properly. This behaviour can be configured using the [MC_AT_APPLY](../advanced_config/parameter_reference.md#MC_AT_APPLY) and [FW_AT_APPLY](../advanced_config/parameter_reference.md#FW_AT_APPLY) parameters respectively:

* `0`: the gains are not applied. This is used for testing purposes if the user wants to inspect results of the auto-tuning algorithm without using them directly.
* `1`: apply the gains after disarm (default for multirotors). The operator can then test the new tuning while taking-off carefully.
* `2`: apply immediately (default for fixed-fings). The new tuning is applied, disturbances are sent to the controller and the stability is monitored during the next 4 seconds. If the control loop is unstable, the control gains are immediately reverted back to their previous value. If the test passes, the pilot can then use the new tuning.


Fixed wing vehicles (only) can select which axes are tuned using the [FW_AT_AXES](../advanced_config/parameter_reference.md#FW_AT_AXES) bitmask parameter:

* bit `0`: roll (default)
* bit `1`: pitch (default)
* bit `2`: yaw


## Developers/SDKs

Autotuning is started using [MAV_CMD_DO_AUTOTUNE_ENABLE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_AUTOTUNE_ENABLE) MAVLink command.

At time of writing the message is resent at regular intervals to poll PX4 for progress: the `COMMAND_ACK` includes result that the operation is in progress, and also the progress as a percentage. The operation completes when the progress is 100% or the vehicle lands and disarms.

:::note
This is not a MAVLink-compliant implementation of a [command protocol long running command](https://mavlink.io/en/services/command.html#long_running_commands). PX4 should stream progress as the protocol does not allow polling.
:::

The feature is not yet supported by MAVSDK.

## Background/Detail

PX4 uses [PID controllers](../flight_stack/controller_diagrams.md) (rate, attitude, velocity, and position) to calculate the outputs required to move a vehicle from its current estimated state to match a desired setpoint. The controllers must be well tuned in order to get the best performance out of a vehicle. In particular, a poorly tuned rate controller results in less stable flight in all modes, and takes longer to recover from disturbances.

Generally if you use an [airframe configuration](../config/airframe.md) that is similar to your vehicle then the vehicle will be able to fly. However unless the configuration precisely matches your hardware you should tune the rate and attitude controllers. Tuning the velocity and position controllers is less important because they are less affected by vehicle dynamics, and the default tuning configuration for a similar airframe is often sufficient.

Autotuning provides an automatic mechanism to tune the rate and attitude controllers. It can be used to tune fixed wing and multicopter vehicles, and VTOL vehicles when flying as a multicopter or as a fixed wing (transition between modes must be manually tuned). In theory it should work for other vehicle types that have a rate controller, but currently only the above types are supported.

Automatic tuning works well for the multicopter and fixed wing vehicle configurations supported by PX4, provided the frame is not too flexible (see [below for more information](#does-autotuning-work-for-all-supported-airframes)).

The vehicle must be flying in an altitude-stabilized mode ([Altitude mode](../flight_modes/altitude_mc.md), [Hold mode](../flight_modes/hold.md), or [Position mode](../flight_modes/position_mc.md)). The flight stack will apply a small disturbance to the vehicle in each axis and then attempt to calculate the new tuning parameters. For fixed wing vehicles the new tuning is applied in-air by default, after which the vehicle tests the new settings and reverts the tuning if the controllers are not stable. For multicopter, the vehicle lands and applies the new tuning parameters after disarming; the pilot is expected to then take off carefully and test the tuning.

The tuning process takes about 40 seconds ([between 19 and 68 seconds](#how-long-does-autotuning-take)). The default behaviour can be configured using [parameters](#parameters).


### FAQ

#### What frames types are supported?

Autotuning is enabled for multicopter, fixed wing, and hybrid VTOL fixed wing vehicles.

While it is not yet enabled for other frame types, in theory it an be used with any frame that uses a rate controller.

#### Does autotuning work for all supported airframes?

The mathematical model used by autotuning to estimate the dynamics of the drone assumes this it is a linear system with no coupling between the axes (SISO), and with a limited complexity (2 poles and 2 zeros). If the real drone is too far from those conditions, the model will not be able to represent the real dynamics of the drone.

In practise, autotuning generally works well for fixed wing and multicopter, provided the frame is not too flexible.

#### How long does autotuning take?

Tuning takes 5s-20s per axis (aborted if tuning could not be established in 20s) + 2s pause between each axis + 4s of testing if the new gains are applied in air.

A multicopter must tune all three axes, and by default does not test the new gains in-air. Tuning will therefore take between 19s (`5 + 2 + 5 + 2 + 5`) and 64s (`20x3 + 2x2`).

By default a fixed wing vehicle tunes all three axes and then tests the new gains in-air. The range is therefore between 25s (`5 + 2 + 5 + 2 + 5 + 2 + 4`) and 70s (`20x3 + 3x2 + 4`).

Note however that the above settings are defaults. A multicopter can choose to run the tests in air, and a fixed wing can choose not to. Further, a fixed wing can choose to tune fewer axes.

Anecdotally, it usually takes around 40s for either vehicle.


<!-- 
#### How vigorous is the disturbance applied by tuning

This might be added later. I'd like to just point to a video.

If not, perhaps say "not very" but you should expect that the vehicle might deflect by as much as 20degrees and so should be able to cope with that deflection with default tuning.

-->


## See also

- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter_basic.md) (Manual/Simple)
- [Multicopter PID Tuning Guide](../config_mc/pid_tuning_guide_multicopter.md) (Advanced/Detailed)
- [Fixed-Wing PID Tuning Guide](../config_fw/pid_tuning_guide_fixedwing.md)
