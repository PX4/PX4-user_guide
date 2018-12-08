# 特技模式（固定翼）

[<img src="../../assets/site/difficulty_hard.png" title="Hard to fly" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Acro模式*是用于执行特技动作的遥控模式，例如滚转，翻转，失速和杂技动作。

滚动、俯仰和偏航杆控制围绕相应轴的旋转角速率，并且油门直接传递到输出混合器。 当操纵杆居中时，飞机将停止旋转，但保持其当前朝向（在其侧面，倒置或任何其他方向）并根据当前动量移动。

![固定翼手动特技飞行](../../images/flight_modes/manual_acrobatic_FW.png)

## 技术描述

RC mode for performing acrobatic maneuvers e.g. rolls, flips, stalls and acrobatic figures.

RPY stick inputs are translated to angular rate commands that are stabilized by autopilot. Throttle is passed directly to the output mixer.

## 参数

| Parameter                                                                                           | Description                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| <span id="FW_ACRO_X_MAX"></span>[FW_ACRO_X_MAX](../advanced_config/parameter_reference.md#FW_ACRO_X_MAX) | 机体轴x轴最大速率（用户在acro模式下施加滚转轴满杆操纵时，控制器试图达到的机体轴x轴速率） 默认：90度 |
| <span id="FW_ACRO_Y_MAX"></span>[FW_ACRO_Y_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Y_MAX) | 机体轴y轴最大速率（用户在acro模式下施加俯仰轴满杆操纵时，控制器试图达到的机体轴y轴速率） 默认：90度 |
| <span id="FW_ACRO_Z_MAX"></span>[FW_ACRO_Z_MAX](../advanced_config/parameter_reference.md#FW_ACRO_Z_MAX) | 机体轴z轴最大速率（用户在acro模式下施加偏航轴满杆操纵时，控制器试图达到的机体轴z轴速率） 默认：45度 |