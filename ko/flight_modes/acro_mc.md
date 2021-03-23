# 아크로 모드(멀티콥터)

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

* 아크로 모드 *는 뒤집기, 롤 및 루프등과 같은 곡예 비행을 위한 RC 모드입니다.

롤, 피치 및 요 스틱은 각 축을 중심으로 한 각도 회전 속도를 제어하고 조절판은 직접 출력 믹서로 전달됩니다. 스틱이 중앙에 놓여지면 기체는 회전을 멈추지만 현재 방향 (측면, 반전 등)과 현재 모멘텀에 따라 움직입니다.

![MC Manual Acrobatic Flight](../../assets/flight_modes/manual_acrobatic_MC.png)

<!-- image above incorrect: https://github.com/PX4/px4_user_guide/issues/182 -->

## 기술적 설명

RC/manual mode for performing acrobatic maneuvers e.g. flips, rolls and loops.

RC RPY stick inputs control the rate of angular rotation around the respective axes. When sticks are centered the vehicle will stop rotating, but remain in its current orientation (not necessarily level).

## Stick Input Mapping

The default roll, pitch, and yaw input stick mapping for Acro mode is shown below. The curve enables a high turn rate at maximum stick input for performing acrobatic maneuvers, and a zone of lower sensitivity close to the stick center for small corrections.

![Acro mode - default input curve](../../assets/flight_modes/acro_mc_input_curve_expo_superexpo_default.png)

This roll and pitch input stick response can be tuned using the [MC_ACRO_EXPO](#MC_ACRO_EXPO) and [MC_ACRO_SUPEXPO](#MC_ACRO_SUPEXPO) "exponential" parameters, while the yaw stick input response is tuned using [MC_ACRO_EXPO_Y](#MC_ACRO_EXPO_Y) and [MC_ACRO_SUPEXPOY](#MC_ACRO_SUPEXPOY). `MC_ACRO_EXPO` and `MC_ACRO_EXPO_Y` tune the curve(s) between a linear and cubic curve as shown below. `MC_ACRO_SUPEXPO` and `MC_ACRO_SUPEXPOY` allow the shape to be further tuned, modifying the width of the area of reduced sensitivity.

![Acro mode - expo - pure linear input curve](../../assets/flight_modes/acro_mc_input_curve_expo_linear.png) ![Acro mode - expo - pure cubic input curve](../../assets/flight_modes/acro_mc_input_curve_expo_cubic.png)

:::note
The mathematical relationship is:

$$\mathrm{y} = r(f \cdot x^3 + x(1-f)) (1-g)/(1-g |x|)$$, where `f = MC_ACRO_EXPO` or `MC_ACRO_EXPO_Y`, `g = MC_ACRO_SUPEXPO` or `MC_ACRO_SUPEXPOY`,and `r` is the maximum rate.

You can experiment with the relationships [here](https://www.desmos.com/calculator/yty5kgurmc).
:::

## Parameters

| Parameter                                                                                                 | Description                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="MC_ACRO_EXPO"></span>[MC_ACRO_EXPO](../advanced_config/parameter_reference.md#MC_ACRO_EXPO)         | Acro mode "exponential" factor for tuning the stick input curve shape for roll and pitch. Values: 0 Purely linear input curve 1 Purely cubic input curve. Default: 0.69.                                                                                                                          |
| <span id="MC_ACRO_EXPO_Y"></span>[MC_ACRO_EXPO_Y](../advanced_config/parameter_reference.md#MC_ACRO_EXPO_Y)     | Acro mode "exponential" factor for tuning the stick input curve shape for yaw. Values: 0 Purely linear input curve 1 Purely cubic input curve. Default: 0.69.                                                                                                                                     |
| <span id="MC_ACRO_SUPEXPO"></span>[MC_ACRO_SUPEXPO](../advanced_config/parameter_reference.md#MC_ACRO_SUPEXPO)   | Acro mode "SuperExpo" factor for refining stick input curve shape for the roll and pitch axes (tuned using `MC_ACRO_EXPO`. Values: 0 Pure Expo function, 0.7 reasonable shape enhancement for intuitive stick feel, 0.95 very strong bent input curve only near maxima have effect. Default: 0.7. |
| <span id="MC_ACRO_SUPEXPOY"></span>[MC_ACRO_SUPEXPOY](../advanced_config/parameter_reference.md#MC_ACRO_SUPEXPOY) | Acro mode "SuperExpo" factor for refining stick input curve shape for the yaw axis (tuned using `MC_ACRO_EXPO_Y`. Values: 0 Pure Expo function, 0.7 reasonable shape enhancement for intuitive stick feel, 0.95 very strong bent input curve only near maxima have effect. Default: 0.7.          |
| <span id="MC_ACRO_P_MAX"></span>[MC_ACRO_P_MAX](../advanced_config/parameter_reference.md#MC_ACRO_P_MAX)       | Max acro pitch rate. Default: 2 turns per second (720.0 deg/s).                                                                                                                                                                                                                                   |
| <span id="MC_ACRO_R_MAX"></span>[MC_ACRO_R_MAX](../advanced_config/parameter_reference.md#MC_ACRO_R_MAX)       | Max acro roll rate. Default: 2 turns per second (720.0 deg/s).                                                                                                                                                                                                                                    |
| <span id="MC_ACRO_Y_MAX"></span>[MC_ACRO_Y_MAX](../advanced_config/parameter_reference.md#MC_ACRO_Y_MAX)       | Max acro yaw rate. Default: 1.5 turns per second (540.0 degrees/s).                                                                                                                                                                                                                               |