# 多旋翼的冲击有限型轨迹

冲击有限的轨迹类型能响应用户摇杆输入或任务的变化（例如：航拍，测绘，货运）并为机体提供平滑的运动。 它能产生对称的平滑 S 型曲线使冲击和加速度的极限始终得到保证。

此轨迹类型始终在[任务模式](../flight_modes/mission.md)下启用。 若要在[定点模式](../flight_modes/position_mc.md)启用，请设置参数：[MPC_POS_MODE=3](../advanced_config/parameter_reference.md#MPC_POS_MODE)。

> **Note** 在位置模式下，默认使用冲击有限型轨迹。 但它可能不适合需要更快响应的机体/使用案例——例如穿越机。

## 轨迹生成器

下图显示了具有如下约束的典型冲击限制剖面：

- `jMax`：最大冲击
- `jMax`：初始加速度 
- `aMax`：最大加速度
- `a3`：最终加速度（始终为 0）
- `v0`：初始速度
- `vRef`：期望速度

其中，约束 `jMax`、`aMax` 由用户通过参数页配置，在手动定点控制和自动模式下可能有所不同。

The resulting velocity profile is often called "S-Curve".

![Jerk-limited trajectory](../../images/jerk_limited_trajectory_1d.png)

## Manual Mode

In manual position mode, the sticks are mapped to velocity where a full stick deflection corresponds to [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL).

### Constraints

XY-plane:

- `jMax`: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`: [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)

Z-axis:

- `jMax`: [MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax` (upward motion): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax` (downward motion): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

## Auto Mode

In auto mode, the desired velocity is [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE) but this value is automatically adjusted depending on the distance to the next waypoint, the maximum possible velocity in the waypoint and the maximum desired acceleration and jerk.

### Constraints

XY-plane:

- `jMax`: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`: [MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)

Z-axis:

- `jMax`: [MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax` (upward motion): [MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax` (downward motion): [MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

Distance to velocity gains when close to a waypoint:

- [MPC_XY_TRAJ_P](../advanced_config/parameter_reference.md#MPC_XY_TRAJ_P)

### Related Parameters

- [MPC_XY_VEL_MAX](../advanced_config/parameter_reference.md#MPC_XY_VEL_MAX)
- [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP)
- [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN)
- [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)
- [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)
- [MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)
- [MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)