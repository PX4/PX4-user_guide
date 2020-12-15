# 手动模式（固定翼）

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*手动模式*发送遥控器摇杆输入直接混控器输出进行全手动控制。

:::tip
这是最难飞行的模式，因为什么都不稳定。 Unlike [Acro Mode](../flight_modes/acro_fw.md) if the RP stick is centered the vehicle will not automatically stop rotating around the axis; the pilot actually has to move the stick to apply force in the other direction.
:::

:::note
This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.
:::

## 技术描述

RC mode where stick input is sent directly to the output mixer (for "fully" manual control).

This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). It provides a safety mechanism that allows full control of throttle, elevator, ailerons and rudder via RC in the event of an FMU firmware malfunction.

## 参数

| 参数                                                                                              | 描述                                                         |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <span id="FW_MAN_P_SC"></span>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 手动俯仰控制比例。 在完全手动模式下应用于所需俯仰舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_R_SC"></span>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 手动滚转控制比例。 在完全手动模式下应用于所需滚转舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_Y_SC"></span>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 手动偏航控制比例。 在完全手动模式下应用于所需偏航舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |