<Redirect to="../flight_modes_fw/manual" />

# Manual Mode (Fixed-wing)

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Manual mode* sends RC stick input directly to control allocation for fully manual control.

:::tip
这是最难飞行的模式，因为什么都不稳定。 Unlike [Acro Mode](../flight_modes_fw/acro.md) if the RP stick is centered the vehicle will not automatically stop rotating around the axis; the pilot actually has to move the stick to apply force in the other direction. :::

:::note
这是唯一忽略 FMU（命令通过安全协处理器发送） 的飞行模式。
该模式提供了一个安全机制，允许在 FMU 固件故障时通过遥控器完全控制油门，升降舵，副翼和方向舵。
:::

## 技术描述

RC mode where stick input is sent directly to control allocation (for "fully" manual control).

这是唯一忽略 FMU（命令通过安全协处理器发送） 的飞行模式。 该模式提供了一个安全机制，允许在 FMU 固件故障时通过遥控器完全控制油门，升降舵，副翼和方向舵。

## 参数

| 参数                                                                                              | 描述                                                         |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="FW_MAN_P_SC"></a>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 手动俯仰控制比例。 在完全手动模式下应用于所需俯仰舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <a id="FW_MAN_R_SC"></a>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 手动滚转控制比例。 在完全手动模式下应用于所需横滚舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <a id="FW_MAN_Y_SC"></a>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 手动偏航控制比例。 在完全手动模式下应用于所需偏航舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
