# 多旋翼的加加速度限制型轨迹

加加速度有限的轨迹类型能响应用户摇杆输入或任务的变化（例如：航拍，测绘，货运）并为机体提供平滑的运动。 它能产生对称的平滑 S-曲线使加加速度和加速度的极限始终得到保证。

此轨迹类型始终在[任务模式](../flight_modes/mission.md)下启用。 若要在[定点模式](../flight_modes/position_mc.md)启用，请设置参数：[MPC_POS_MODE=3](../advanced_config/parameter_reference.md#MPC_POS_MODE)。

:::note
The jerk-limited type is used *by default* in position mode. It may not be suitable for vehicles/use-cases that require a faster response - e.g. racer quads.
:::

## 轨迹生成器

其中，约束 `jMax`、`aMax` 由用户通过参数页配置，在手动定点控制和自动模式下可能有所不同。

- `jMax`：最大抖动
- `jMax`：初始加速度 
- `aMax`：最大加速度
- `a3`：最终加速度（始终为 0）
- `v0`：初始速度
- `vRef`：期望速度

所得的速度剖面通常称为“S-曲线”。

The resulting velocity profile is often called "S-Curve".

![Jerk-limited trajectory](../../assets/config/mc/jerk_limited_trajectory_1d.png)

## 手动模式

XY平面：

### 约束

Z轴：

- `jMax`：[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`: [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)

在自动模式下，所需的速度是 [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE)，但该值会根据到下一个航点的距离、航线中可能的最大速度以及所需的最大加速度和加加速度自动调整。

- `jMax`：[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`（上升动作）：[MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax`（下降动作）：[MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

## 自动模式

XY平面：

### 约束

Z轴：

- `jMax`：[MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`：[MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)

渐进某个航点时的距离-速度增益：

- `jMax`：[MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`（上升动作）：[MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax`（下降动作）：[MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

Distance to velocity gains when close to a waypoint:

- [MPC_XY_TRAJ_P](../advanced_config/parameter_reference.md#MPC_XY_TRAJ_P)

### 相关参数

- [MPC_XY_VEL_MAX](../advanced_config/parameter_reference.md#MPC_XY_VEL_MAX)
- [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP)
- [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN)
- [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)
- [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)
- [MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)
- [MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)