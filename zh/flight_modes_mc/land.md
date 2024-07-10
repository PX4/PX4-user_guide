# 着陆模式（多旋翼）

<img src="../../assets/site/position_fixed.svg" title="需要定位估计（例如GPS）" width="30px" />

_着陆_飞行模式使飞机降落在指定点。 这辆车在降落后不久将被解除武装(默认)。

::: info

- 该模式是自动的 - 不 _需要_ 用户干预即可控制无人机。
- 模式需要至少有效的本地位置估计(不需要全球位置)。
  - 没有有效的本地位置，飞行器不能切换到此模式。
  - 飞行器如果失去位置估计，就会失效。
- 模式阻止武装(切换到此模式时车辆必须备用)。
- 遥控器开关可以用于更改任何无人机的飞行模式。
- 在多旋翼中移动遥控器摇杆（或 VTOL 在多旋翼模式下）[默认情况下](#COM_RC_OVERRIDE)会将无人机切换到[位置模式](../flight_modes_mc/position.md)，除非是处理电池失效保护。
- 模式可以使用 [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) MAVLink 命令或明确切换到着陆模式。

<!-- https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/commander/ModeUtil/mode_requirements.cpp -->

:::

## 技术摘要

无人机将降落在模式所指定的位置。 无人机以 [MPC_LAND_SPEED](#MPC_LAND_SPEED) 指定的速度下降，降落后会上锁（[默认](#COM_DISARM_LAND)）。

遥控器摇杆移动会将无人机切换到 [位置模式](../flight_modes_mc/position.md) （[默认](#COM_RC_OVERRIDE)）。

### 参数

着陆模式行为可以使用下面的参数进行配置。

| 参数                                                                                                      | 描述                                                                                                                    |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <a id="MPC_LAND_SPEED"></a>[MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)   | 着陆过程中的下降速率。 鉴于地面情况未知，这个值应该设得相当小。                                                                                      |
| <a id="COM_DISARM_LAND"></a>[COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND) | 降落后自动上锁的超时时间，以秒为单位。 如果设定为 -1，无人机将不会在着陆时上锁。                                                                            |
| <a id="COM_RC_OVERRIDE"></a>[COM_RC_OVERRIDE](../advanced_config/parameter_reference.md#COM_RC_OVERRIDE) | 控制多旋翼（或者多旋翼模式下的 VOTL）的摇杆移动量来切换到 [位置模式](../flight_modes_mc/position.md)。 可以分别为自动模式和 offboard 模式启用此功能，默认情况下在自动模式下启用此功能。 |
| <a id="COM_RC_STICK_OV"></a>[COM_RC_STICK_OV](../advanced_config/parameter_reference.md#COM_RC_STICK_OV) | 导致发射机切换到 [位置模式](../flight_modes_mc/position.md) 的摇杆移动量（如果 [COM_RC_OVERRIDE](#COM_RC_OVERRIDE) 已启用）。                 |

## 另请参阅

- [着陆模式（固定翼）](../flight_modes_fw/land.md)
- [着陆模式（垂直起降）](../flight_modes_vtol/land.md)
