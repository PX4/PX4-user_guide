# Stabilized Mode (Fixed-wing)

<img src="../../assets/site/difficulty_medium.png" title="中等飞行难度" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="需要手动或遥控控制" width="30px" />

_Stabilized mode_ is a manual mode were centering the sticks levels the vehicle attitude (roll and pitch) and maintains the horizontal posture.

如果横滚/俯仰摇杆杆不为零，则无人机根据俯仰输入进行爬升/下降并执行协调的转弯。 It is much easier to fly than [Manual mode](../flight_modes_fw/manual.md) because you can't roll or flip it, and if needed it is easy to level the vehicle (by centering the control sticks).
:::

The vehicle climbs/descends based on pitch and throttle input and performs a [coordinated turn](https://en.wikipedia.org/wiki/Coordinated_flight) if the roll stick is non-zero. 横滚和俯仰是角度控制的（不能上下滚动或循环）。

如果油门降至 0％（电机停止），飞机将滑行。 为了执行转弯，必须在整个操纵过程中保持命令，因为如果释放横滚摇杆，则飞机将停止转动并自行调平（对于俯仰和偏航命令也是如此）。

The yaw stick can be used to increase/reduce the yaw rate of the vehicle in turns. If left at center the controller does the turn coordination by itself, meaning that it will apply the necessary yaw rate for the current roll angle to perform a smooth turn.

下图直观的显示了该模式（对于一个[美国手发射机](../getting_started/rc_transmitter_receiver.md#transmitter_modes)）。

![FW Manual Flight](../../assets/flight_modes/stabilized_fw.png)

## 技术描述

Manual mode where centered roll/pitch sticks levels vehicle attitude. The vehicle course and altitude are not maintained, and can drift due to wind.

- Centered Roll/Pitch/Yaw sticks (inside deadband) put vehicle into straight and level flight. The vehicle course and altitude are not maintained, and can drift due to wind.
- Roll stick controls roll angle. Autopilot will maintain <a href="https://en.wikipedia.org/wiki/Coordinated_flight">coordinated flight</a>.
- Pitch stick controls pitch angle around the defined offset [FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF)
- Throttle stick controls throttle directly.
- Yaw stick adds an additional yaw rate setpoint (added to the one calculated by the autopilot to maintain coordinated flight). Can be used to manually change the side slip of the vehicle.
- Manual control input is required (such as RC control, joystick).

## 参数

The mode is affected by the following parameters:

| 参数                                                                                                  | 描述                                                                             |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <a id="FW_MAN_P_MAX"></a>[FW_MAN_P_MAX](../advanced_config/parameter_reference.md#FW_MAN_P_MAX)   | Max pitch for manual control in attitude stabilized mode. Default: 45 degrees. |
| <a id="FW_MAN_R_MAX"></a>[FW_MAN_R_MAX](../advanced_config/parameter_reference.md#FW_MAN_R_MAX)   | Max roll for manual control in attitude stabilized mode. Default: 45 degrees.  |
| <a id="FW_MAN_YR_MAX"></a>[FW_MAN_YR_MAX](../advanced_config/parameter_reference.md#FW_MAN_YR_MAX) | Maximum manually added yaw rate . Default: 30 degrees per second.              |
| <a id="FW_PSP_OFF"></a>[FW_PSP_OFF](../advanced_config/parameter_reference.md#FW_PSP_OFF)       | Pitch setpoint offset (pitch at level flight). Default: 0 degrees.             |

<!-- this document needs to be extended -->
