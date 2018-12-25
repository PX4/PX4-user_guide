# Manual Mode (Fixed Wing)

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*Manual mode* sends RC stick input directly to the output mixer for fully manual control.

> **Tip** This is the hardest mode to fly, because nothing is stabilized. Unlike [Acro Mode](../flight_modes/acro_fw.md) if the RP stick is centered the vehicle will not automatically stop rotating around the axis; the pilot actually has to move the stick to apply force in the other direction.

<span></span>

> **Note** This is the only mode that overrides the FMU (commands are sent via the safety coprocessor). 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。

## 技术描述

遥控模式，其中摇杆输入直接发送到输出混频器（用于 "完全" 手动控制）。

这是覆盖FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。

## 参数

| 参数                                                                                              | 描述                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span id="FW_MAN_P_SC"></span>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | Manual pitch scale. Scale factor applied to the desired pitch actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces. Default: 1.0 norm. |
| <span id="FW_MAN_R_SC"></span>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | Manual roll scale. Scale factor applied to the desired roll actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces. Default: 1.0 norm.   |
| <span id="FW_MAN_Y_SC"></span>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | Manual yaw scale. Scale factor applied to the desired yaw actuator command in full manual mode. This parameter allows to adjust the throws of the control surfaces. Default: 1.0 norm.     |