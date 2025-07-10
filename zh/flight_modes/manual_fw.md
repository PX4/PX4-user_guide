---
canonicalUrl: https://docs.px4.io/main/zh/flight_modes/manual_fw
---

# 手动模式（固定翼）

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*手动模式*发送遥控器摇杆输入直接混控器输出进行全手动控制。

:::tip
这是最难飞行的模式，因为什么都不稳定。 不同于[特技模式](../flight_modes/acro_fw.md)，如果 RP （俯仰和横滚） 摇杆居中，无人机不会自动停止绕轴转；飞手实际上必须移动摇杆向另一个方向施力。
:::

:::note
这是唯一忽略 FMU（命令通过安全协处理器发送） 的飞行模式。 该模式提供了一个安全机制，允许在 FMU 固件故障时通过遥控器完全控制油门，升降舵，副翼和方向舵。
:::

## 技术描述

遥控模式，摇杆输入直接发送到混控器输出（用于 "完全" 手动控制）。

这是唯一忽略 FMU（命令通过安全协处理器发送） 的飞行模式。 该模式提供了一个安全机制，允许在 FMU 固件故障时通过遥控器完全控制油门，升降舵，副翼和方向舵。

## 参数

| 参数                                                                                              | 描述                                                         |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <span id="FW_MAN_P_SC"></span>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 手动俯仰控制比例。 在完全手动模式下应用于所需俯仰舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_R_SC"></span>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 手动滚转控制比例。 在完全手动模式下应用于所需横滚舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_Y_SC"></span>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 手动偏航控制比例。 在完全手动模式下应用于所需偏航舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |