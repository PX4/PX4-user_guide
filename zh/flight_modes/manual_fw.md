# 手动模式（固定翼）

<!-- this requires review -->

[<img src="../../assets/site/difficulty_hard.png" title="很难飞" width="30px" />](../getting_started/flight_modes.md#key_difficulty)&nbsp;[<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />](../getting_started/flight_modes.md#key_manual)&nbsp;

*手动模式*发送遥控杆指令输入直接发送到输出混频器进行全手动控制。

> 这是最难飞行的模式，因为没有什么能够稳定下来。 不像[特技模式](../flight_modes/acro_fw.md)如果遥控杆居中，飞机将不会自动停止绕轴旋转; 飞行员实际上必须移动杆以向另一个方向施加力。

<span></span>

> 这是覆盖FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。

## 技术描述

遥控模式，其中摇杆输入直接发送到输出混频器（用于 "完全" 手动控制）。

这是覆盖FMU（命令通过安全协处理器发送）的唯一模式。 它提供了一个安全机制，允许在FMU固件出现故障时，通过遥控完全控制油门、电梯、副翼和舵。

## 参数

| 参数                                                                                              | 描述                                                         |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| <span id="FW_MAN_P_SC"></span>[FW_MAN_P_SC](../advanced_config/parameter_reference.md#FW_MAN_P_SC) | 手动俯仰控制比例。 在完全手动模式下应用于所需俯仰舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_R_SC"></span>[FW_MAN_R_SC](../advanced_config/parameter_reference.md#FW_MAN_R_SC) | 手动滚转控制比例。 在完全手动模式下应用于所需滚转舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |
| <span id="FW_MAN_Y_SC"></span>[FW_MAN_Y_SC](../advanced_config/parameter_reference.md#FW_MAN_Y_SC) | 手动偏航控制比例。 在完全手动模式下应用于所需偏航舵机指令的比例因子。 此参数允许调整控制舵偏的偏转。 默认：1.0 |