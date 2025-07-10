---
canonicalUrl: https://docs.px4.io/main/zh/config_mc/mc_jerk_limited_type_trajectory
---

# 多旋翼的加加速度限制型轨迹

加加速度有限的轨迹类型能响应用户摇杆输入或任务的变化（例如：航拍，测绘，货运）并为机体提供平滑的运动。 它能产生对称的平滑 S-曲线使加加速度和加速度的极限始终得到保证。

此轨迹类型始终在[任务模式](../flight_modes/mission.md)下启用。 若要在[定点模式](../flight_modes/position_mc.md)启用，请设置参数：[MPC_POS_MODE=3](../advanced_config/parameter_reference.md#MPC_POS_MODE)。

:::note
在位置模式下，默认使用加加速度限制型轨迹。 但它可能不适合于那些需要较快响应的机体/使用案例——例如穿越机。
:::

## 轨迹生成器

下图显示了具有如下约束的典型加加速度限制剖面：

- `jMax`：最大抖动
- `a0`：初始加速度 
- `aMax`：最大加速度
- `a3`：最终加速度（始终为 0）
- `v0`：初始速度
- `vRef`：期望速度

其中，约束 `jMax`、`aMax` 由用户通过参数页配置，在手动定点控制和自动模式下可能有所不同。

所得的速度剖面通常称为“S-曲线”。

![加加速度限制型轨迹](../../assets/config/mc/jerk_limited_trajectory_1d.png)

## 手动模式

在手动定点模式下，通过摇杆控制速度，摇杆的最大行程对应 [MPC_VEL_MANUAL](../advanced_config/parameter_reference.md#MPC_VEL_MANUAL) 定义的最大速度。

### 约束

XY平面：

- `jMax`：[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`: [MPC_ACC_HOR_MAX](../advanced_config/parameter_reference.md#MPC_ACC_HOR_MAX)

Z轴：

- `jMax`：[MPC_JERK_MAX](../advanced_config/parameter_reference.md#MPC_JERK_MAX)
- `aMax`（上升动作）：[MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax`（下降动作）：[MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

## 自动模式

在自动模式下，所需的速度是 [MPC_XY_CRUISE](../advanced_config/parameter_reference.md#MPC_XY_CRUISE)，但该值会根据到下一个航点的距离、航线中可能的最大速度以及所需的最大加速度和加加速度自动调整。

### 约束

XY平面：

- `jMax`：[MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`：[MPC_ACC_HOR](../advanced_config/parameter_reference.md#MPC_ACC_HOR)

Z轴：

- `jMax`：[MPC_JERK_AUTO](../advanced_config/parameter_reference.md#MPC_JERK_AUTO)
- `aMax`（上升动作）：[MPC_ACC_UP_MAX](../advanced_config/parameter_reference.md#MPC_ACC_UP_MAX)
- `aMax`（下降动作）：[MPC_ACC_DOWN_MAX](../advanced_config/parameter_reference.md#MPC_ACC_DOWN_MAX)

渐进某个航点时的距离-速度增益：

- [MPC_XY_TRAJ_P](../advanced_config/parameter_reference.md#MPC_XY_TRAJ_P)

### 相关参数

- [MPC_XY_VEL_MAX](../advanced_config/parameter_reference.md#MPC_XY_VEL_MAX)
- [MPC_Z_VEL_MAX_UP](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_UP)
- [MPC_Z_VEL_MAX_DN](../advanced_config/parameter_reference.md#MPC_Z_VEL_MAX_DN)
- [MPC_TKO_SPEED](../advanced_config/parameter_reference.md#MPC_TKO_SPEED)
- [MPC_LAND_SPEED](../advanced_config/parameter_reference.md#MPC_LAND_SPEED)
- [MPC_LAND_ALT1](../advanced_config/parameter_reference.md#MPC_LAND_ALT1)
- [MPC_LAND_ALT2](../advanced_config/parameter_reference.md#MPC_LAND_ALT2)